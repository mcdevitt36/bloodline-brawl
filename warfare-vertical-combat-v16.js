import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE V16
   Real vertical-combat pass for Haunted Beach House + City Rooftop.
   Adds playable elevated platforms, ramps/stairs, sniper perches, rail/cover,
   platform-aware player/bot grounding, and registers V16 geometry with raycasts
   so cover actually blocks shots/LOS instead of being decorative only.
*/

const previousRender = THREE.WebGLRenderer.prototype.render;
const originalIntersectObjects = THREE.Raycaster.prototype.intersectObjects;
const sceneState = new WeakMap();
let activeState = null;

const mat=(color,metal=.12)=>new THREE.MeshStandardMaterial({color,roughness:.62,metalness:metal});
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

function mapId(scene){
  const bg=scene?.background?.isColor?scene.background.getHex():0;
  return bg===0x020711?'haunted':bg===0x091226?'city':null;
}
function actors(scene){const out=[];scene?.traverse(o=>{const a=o.userData?.actor;if(a&&!out.includes(a))out.push(a);});return out;}
function human(scene){return actors(scene).find(a=>!a.isBot)||null;}

function meshBox(scene,state,x,y,z,w,h,d,color=0x505862,shootBlock=true){
  const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(color,.28));
  m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;m.name='BB_V16_WORLD';scene.add(m);
  if(shootBlock)state.blockers.push(m);
  return m;
}
function platform(scene,state,x,z,w,d,y,color){
  const m=meshBox(scene,state,x,y-.18,z,w,.36,d,color,true);
  state.platforms.push({x,z,hw:w/2,hd:d/2,y,mesh:m});return m;
}
function cover(scene,state,x,z,w,d,y,h=1.15,color=0x59616a){
  const m=meshBox(scene,state,x,y+h/2,z,w,h,d,color,true);
  state.solids.push({x,z,hw:w/2,hd:d/2,minY:y,maxY:y+h});return m;
}
function rail(scene,state,x,z,w,d,y,color=0x343a43){
  return cover(scene,state,x,z,w||.18,d||.18,y,1.05,color);
}
function ramp(scene,state,x,z,w,len,y0,y1,axis='z',color=0x626872){
  const rise=y1-y0,ang=Math.atan2(rise,len),actual=Math.sqrt(len*len+rise*rise);
  const geo=axis==='z'?new THREE.BoxGeometry(w,.28,actual):new THREE.BoxGeometry(actual,.28,w);
  const m=new THREE.Mesh(geo,mat(color,.32));m.position.set(x,(y0+y1)/2-.08,z);if(axis==='z')m.rotation.x=-ang;else m.rotation.z=ang;m.castShadow=m.receiveShadow=true;m.name='BB_V16_RAMP';scene.add(m);state.blockers.push(m);
  state.ramps.push({x,z,halfW:w/2,halfL:len/2,y0,y1,axis});return m;
}
function stairs(scene,state,x,z,width,steps,y0,y1,dir='z',color=0x625c58){
  const total=7.2,stepH=(y1-y0)/steps,stepL=total/steps;
  for(let i=0;i<steps;i++){
    const h=stepH*(i+1),off=-total/2+stepL*(i+.5);
    const sx=dir==='x'?x+off:x,sz=dir==='z'?z+off:z;
    meshBox(scene,state,sx,y0+h/2-.05,sz,dir==='x'?stepL+.04:width,h,dir==='z'?stepL+.04:width,color,true);
  }
  state.stairs.push({x,z,width,total,y0,y1,dir});
}
function highSign(scene,state,x,y,z,w,h,color){const m=meshBox(scene,state,x,y,z,w,h,.16,color,false);m.material.emissive.set(color);m.material.emissiveIntensity=.42;return m;}

function buildHaunted(scene,state){
  // Real second floor over the central house footprint, deliberately broken into wings so sightlines aren't unlimited.
  platform(scene,state,8,-3,31,18,4.35,0x5d5048);
  platform(scene,state,13,10,20,8,4.35,0x5a4b45);
  // Balcony overlooking pool/backyard and beach-side balcony.
  platform(scene,state,23,18,11,4.2,4.35,0x665343);
  platform(scene,state,-8,-4,5,14,4.35,0x604e42);
  // Attic combat platform: smaller, valuable, exposed from two approaches.
  platform(scene,state,10,-5,13,9,7.55,0x463b38);
  // Two independent routes to second floor + two to attic.
  stairs(scene,state,-4,8,2.6,11,0,4.35,'z');
  stairs(scene,state,24,-7,2.6,11,0,4.35,'z');
  ramp(scene,state,-8,-12,2.4,8,0,4.35,'z',0x67584d);
  stairs(scene,state,7,-11,2.4,9,4.35,7.55,'z');
  ramp(scene,state,15,3,2.3,7,4.35,7.55,'x',0x544843);
  // Balcony rails leave intentional peek gaps.
  rail(scene,state,23,20.05,11,.18,4.35);rail(scene,state,17.55,18,.18,4.2,4.35);rail(scene,state,28.45,18,.18,4.2,4.35);
  rail(scene,state,-10.45,-4,.18,14,4.35);rail(scene,state,-5.55,-4,.18,14,4.35);
  // Second-floor room cover / bedroom silhouettes.
  cover(scene,state,1,-5,3.4,.85,4.35,1.15,0x78675c);cover(scene,state,15,-5,3.2,.8,4.35,1.1,0x6e625c);
  cover(scene,state,7,8,2.8,1,4.35,1.05,0x5a5557);cover(scene,state,21,11,2.6,.9,4.35,1.15,0x6a5b50);
  cover(scene,state,9,-3,.85,5.2,4.35,1.2,0x4b4547);
  // Attic beams/crates: enough concealment to snipe, not enough to camp forever.
  cover(scene,state,6,-6,2.2,1.1,7.55,1.2,0x493a31);cover(scene,state,13,-2,2.4,1,7.55,1.25,0x493a31);
  rail(scene,state,3.55,-5,.18,9,7.55);rail(scene,state,16.45,-5,.18,9,7.55);
  highSign(scene,state,10,9.15,-5,5,.7,0x7b5a72);
}

function buildCity(scene,state){
  // Four meaningful combat elevations. Existing roof network remains the base layer.
  platform(scene,state,-33,8,20,22,3.0,0x46515d);       // lower raised roof
  platform(scene,state,7,35,21,19,4.8,0x4b5662);       // garden / north roof
  platform(scene,state,34,27,14,14,6.4,0x414b58);      // high helipad-side roof
  platform(scene,state,-20,-30,16,14,5.0,0x434d59);    // construction roof
  platform(scene,state,27,-34,16,13,7.2,0x3e4855);     // penthouse/sniper roof
  platform(scene,state,-32,16,7,7,8.7,0x3b4653);       // water-tower sniper deck
  // Connections: every strong perch has >=2 practical approaches.
  ramp(scene,state,-24,8,3,11,0,3.0,'x');
  stairs(scene,state,-36,-3,2.5,10,0,3.0,'z');
  ramp(scene,state,7,23,3,11,0,4.8,'z');
  stairs(scene,state,18,35,2.4,11,0,4.8,'x');
  ramp(scene,state,27,21,2.8,9,0,6.4,'z');
  stairs(scene,state,41,18,2.4,12,0,6.4,'z');
  ramp(scene,state,-14,-22,2.8,9,0,5.0,'z');
  stairs(scene,state,-28,-21,2.4,11,0,5.0,'x');
  ramp(scene,state,21,-27,2.6,9,0,7.2,'x');
  stairs(scene,state,36,-29,2.3,12,0,7.2,'x');
  stairs(scene,state,-32,9,2.2,10,3.0,8.7,'z');
  ramp(scene,state,-26,16,2.2,7,3.0,8.7,'x');
  // High cover and controlled sightline blockers.
  cover(scene,state,-33,6,4,1.5,3.0,1.2,0x59636e);cover(scene,state,-29,13,2.8,1,3.0,1.15,0x4c5661);
  cover(scene,state,4,34,4.4,1.3,4.8,1.15,0x52606a);cover(scene,state,12,39,3,1.1,4.8,1.1,0x59646e);
  cover(scene,state,34,25,4,1.2,6.4,1.15,0x505b65);cover(scene,state,38,30,2.3,1.1,6.4,1.1,0x46515c);
  cover(scene,state,-20,-31,4,1.2,5.0,1.15,0x5b5b58);cover(scene,state,-15,-27,2.6,1.1,5.0,1.2,0x67645d);
  cover(scene,state,27,-36,4,1.1,7.2,1.15,0x4d5660);cover(scene,state,31,-31,2.4,1.1,7.2,1.1,0x59636c);
  rail(scene,state,-32,12.55,7,.18,8.7);rail(scene,state,-35.55,16,.18,7,8.7);rail(scene,state,-28.45,16,.18,7,8.7);
  highSign(scene,state,-32,10.7,16,4.4,.65,0x5aa8ff);
}

function heightFromRamp(r,p){
  if(r.axis==='z'){
    if(Math.abs(p.x-r.x)>r.halfW+.45||Math.abs(p.z-r.z)>r.halfL+.6)return null;
    const t=clamp((p.z-(r.z-r.halfL))/(r.halfL*2),0,1);return r.y0+(r.y1-r.y0)*t;
  }
  if(Math.abs(p.z-r.z)>r.halfW+.45||Math.abs(p.x-r.x)>r.halfL+.6)return null;
  const t=clamp((p.x-(r.x-r.halfL))/(r.halfL*2),0,1);return r.y0+(r.y1-r.y0)*t;
}
function heightFromStair(s,p){
  if(s.dir==='z'){
    if(Math.abs(p.x-s.x)>s.width/2+.45||Math.abs(p.z-s.z)>s.total/2+.6)return null;
    const t=clamp((p.z-(s.z-s.total/2))/s.total,0,1);return s.y0+(s.y1-s.y0)*t;
  }
  if(Math.abs(p.z-s.z)>s.width/2+.45||Math.abs(p.x-s.x)>s.total/2+.6)return null;
  const t=clamp((p.x-(s.x-s.total/2))/s.total,0,1);return s.y0+(s.y1-s.y0)*t;
}
function floorHeight(state,p,currentY){
  let best=0;
  for(const pl of state.platforms){if(Math.abs(p.x-pl.x)<=pl.hw+.25&&Math.abs(p.z-pl.z)<=pl.hd+.25&&currentY>=pl.y-1.2)best=Math.max(best,pl.y);}
  for(const r of state.ramps){const y=heightFromRamp(r,p);if(y!=null&&currentY>=y-1.35)best=Math.max(best,y);}
  for(const s of state.stairs){const y=heightFromStair(s,p);if(y!=null&&currentY>=y-1.35)best=Math.max(best,y);}
  return best;
}
function collideSolids(state,a,old){const p=a.mesh.position;for(const s of state.solids){if(p.y>s.maxY+.35||p.y+2.65<s.minY)continue;if(Math.abs(p.x-s.x)<s.hw+.43&&Math.abs(p.z-s.z)<s.hd+.43){p.x=old.x;p.z=old.z;break;}}}
function applyGrounding(state,a,camera,isPlayer){
  if(!a||a.dead||!a.mesh?.visible)return;
  const p=a.mesh.position,old=state.lastPos.get(a)||p.clone();
  collideSolids(state,a,old);
  const floor=floorHeight(state,p,p.y);
  // Core gravity assumes y=0. Correct it after core update while retaining jumps above elevated floors.
  if(p.y<floor+.08||a.onGround){const delta=floor-p.y;if(Math.abs(delta)<2.0||a.onGround){p.y=floor;if(a.velocity?.y<0)a.velocity.y=0;a.onGround=true;if(isPlayer&&camera)camera.position.y+=delta;}}
  else if(p.y>floor+.15)a.onGround=false;
  state.lastPos.set(a,p.clone());
}
function elevateLoot(state,scene){
  // Move selected V15 containers onto meaningful upper routes when their spawn lies beneath one.
  if(state.lootAdjusted)return;
  const boxes=[];scene.traverse(o=>{if(o.name==='BB_GRANDADDY_TOOLBOX'||o.name==='BB_BARRETT_TOY_CHEST')boxes.push(o);});
  if(!boxes.length)return;
  for(const b of boxes){let y=0;for(const pl of state.platforms){if(Math.abs(b.position.x-pl.x)<pl.hw-1&&Math.abs(b.position.z-pl.z)<pl.hd-1)y=Math.max(y,pl.y);}if(y>0)b.position.y=y;}
  state.lootAdjusted=true;
}
function setup(scene){
  const id=mapId(scene),state={id,blockers:[],platforms:[],ramps:[],stairs:[],solids:[],lastPos:new WeakMap(),lootAdjusted:false};sceneState.set(scene,state);
  if(id==='haunted')buildHaunted(scene,state);else if(id==='city')buildCity(scene,state);
  return state;
}

// Add V16 structural meshes to world raycasts. This makes new cover/platforms stop bullets and LOS checks.
THREE.Raycaster.prototype.intersectObjects=function(objects,recursive=false,optionalTarget){
  let list=objects;
  if(activeState?.blockers?.length&&Array.isArray(objects)&&!objects.some(o=>o?.name==='BB_V16_WORLD'||o?.name==='BB_V16_RAMP')){
    list=objects.concat(activeState.blockers);
  }
  return originalIntersectObjects.call(this,list,recursive,optionalTarget);
};

THREE.WebGLRenderer.prototype.render=function(scene,camera){
  let state=sceneState.get(scene);if(!state)state=setup(scene);activeState=state;
  if(state.id){
    elevateLoot(state,scene);
    const list=actors(scene),p=human(scene);
    // Bots participate in real elevations too; player camera is corrected by the same vertical delta.
    for(const a of list)applyGrounding(state,a,camera,a===p);
  }
  return previousRender.call(this,scene,camera);
};

window.__bbVerticalCombatV16={version:16,features:['playable-second-floor','attic','balconies','multi-height-rooftops','sniper-perches','multi-route-access','shot-blocking-cover','platform-grounding']};
