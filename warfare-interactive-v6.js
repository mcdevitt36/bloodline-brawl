import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE INTERACTIVE V6
   Additive interaction layer: breakables, doors, jump pads, elevators and hazards.
   Core weapon stats, bot logic and match rules stay untouched. */

const originalRender = THREE.WebGLRenderer.prototype.render;
const states = new WeakMap();
let activeScene=null, activeCamera=null;
const shootRay = new THREE.Raycaster();

const mat=(c,op=1,em=0)=>new THREE.MeshStandardMaterial({color:c,roughness:.5,metalness:.08,transparent:op<1,opacity:op,emissive:em});
function box(g,x,y,z,w,h,d,c,op=1,em=0){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c,op,em));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;g.add(m);return m;}
function cyl(g,x,y,z,r,h,c){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,20),mat(c));m.position.set(x,y,z);m.castShadow=true;g.add(m);return m;}
function ring(g,x,y,z,r,c){const m=new THREE.Mesh(new THREE.TorusGeometry(r,.16,10,30),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.9}));m.position.set(x,y,z);m.rotation.x=Math.PI/2;g.add(m);return m;}
function glow(g,x,y,z,c,i=2,r=8){const l=new THREE.PointLight(c,i,r,2);l.position.set(x,y,z);g.add(l);return l;}

function kind(scene){const h=scene?.background?.isColor?scene.background.getHex():0;return h===0x020711?'haunted':h===0x091226?'city':h===0x071526?'hub':'unknown';}
function findActors(scene){const out=[];scene.traverse(o=>{const a=o.userData?.actor;if(a&&!out.includes(a))out.push(a);});return out;}
function human(scene){return findActors(scene).find(a=>!a.isBot)||null;}
function actorNear(scene,p,r=2.4){return findActors(scene).filter(a=>!a.dead&&a.mesh?.position?.distanceTo(p)<r);}

function glassPane(g,x,y,z,w,h,axis='z'){
  const geo=axis==='z'?new THREE.BoxGeometry(w,h,.09):new THREE.BoxGeometry(.09,h,w);
  const m=new THREE.Mesh(geo,new THREE.MeshPhysicalMaterial({color:0x8fc7e7,transparent:true,opacity:.34,roughness:.08,metalness:.02,transmission:.25}));
  m.position.set(x,y,z);m.userData.bbBreakable=true;m.userData.hp=2;g.add(m);return m;
}
function breakObject(obj,state){if(!obj||obj.userData.bbBroken)return;obj.userData.hp=(obj.userData.hp||1)-1;if(obj.userData.hp>0){obj.scale.multiplyScalar(.92);return;}obj.userData.bbBroken=true;obj.visible=false;
  const p=obj.getWorldPosition(new THREE.Vector3());
  for(let i=0;i<7;i++){const s=new THREE.Mesh(new THREE.BoxGeometry(.09+Math.random()*.08,.09+Math.random()*.12,.025),new THREE.MeshBasicMaterial({color:0xaad9ef,transparent:true,opacity:.75}));s.position.copy(p).add(new THREE.Vector3((Math.random()-.5)*.8,(Math.random()-.5)*.7,(Math.random()-.5)*.5));s.rotation.set(Math.random(),Math.random(),Math.random());state.group.add(s);state.shards.push({m:s,v:new THREE.Vector3((Math.random()-.5)*2,1+Math.random()*2,(Math.random()-.5)*2),life:1});}
}
function door(g,x,y,z,w=2.2,h=3.1,axis='z',color=0x4a382f){const d=axis==='z'?box(g,x,y,z,w,h,.22,color):box(g,x,y,z,.22,h,w,color);d.userData.bbDoor=true;d.userData.open=0;return d;}
function jumpPad(g,x,z,c=0x55c8ff,power=11){const group=new THREE.Group();group.position.set(x,.08,z);const base=new THREE.Mesh(new THREE.CylinderGeometry(1.45,1.6,.25,24),mat(0x202b36));group.add(base);ring(group,0,.18,0,1.05,c);glow(group,0,.45,0,c,2.4,7);group.userData.bbJumpPad=true;group.userData.power=power;group.userData.cooldown=new WeakMap();g.add(group);return group;}
function hazard(g,x,z,type='vent'){
  const group=new THREE.Group();group.position.set(x,0,z);group.userData.bbHazard=type;
  if(type==='vent'){cyl(group,0,.35,0,1,.7,0x4c5963);for(let i=0;i<5;i++){const b=box(group,0,.78,0,.18,.05,1.25,0x88939d);b.rotation.y=i*Math.PI/5;}glow(group,0,1,0,0x8be8ff,1.4,5);}
  else{box(group,0,.18,0,3,.18,1.8,0x302a35);for(let i=-1;i<=1;i++){const s=box(group,i*.85,.4,0,.5,.08,.9,0xa3355f,1,0x601535);s.rotation.z=i*.12;}glow(group,0,.6,0,0xff4d9b,2,7);}
  g.add(group);return group;
}
function elevator(g,x,z){const e=new THREE.Group();e.position.set(x,0,z);box(e,0,.18,0,4.5,.35,4.5,0x394552);box(e,-2.1,1.2,0,.15,2.2,4.2,0x687580);box(e,2.1,1.2,0,.15,2.2,4.2,0x687580);const doorL=box(e,-.72,1.55,-2.2,1.4,3,.18,0x28333f);const doorR=box(e,.72,1.55,-2.2,1.4,3,.18,0x28333f);e.userData.bbElevator=true;e.userData.doors=[doorL,doorR];glow(e,0,2,-2,0x67d8ff,1.5,7);g.add(e);return e;}

function setupHaunted(scene,state){const g=state.group;
  state.breakables=[glassPane(g,-9.48,2.3,-11,2.2,1.7,'x'),glassPane(g,-9.48,2.3,11,2.2,1.7,'x'),glassPane(g,27.48,2.35,-11,2.2,1.7,'x'),glassPane(g,27.48,2.35,11,2.2,1.7,'x'),glassPane(g,2.5,2.5,-16.48,2.4,1.7),glassPane(g,17.5,2.5,-16.48,2.4,1.7),glassPane(g,2.5,2.5,16.48,2.4,1.7),glassPane(g,18,2.5,16.48,2.4,1.7)];
  state.doors=[door(g,-9.35,1.55,-1.2,2.4,3.1,'x',0x47382f),door(g,8,1.55,16.35,2.2,3.1,'z',0x4a392f)];
  const fl=new THREE.Mesh(new THREE.TorusGeometry(1.05,.28,10,26),mat(0xff63ae));fl.position.set(14,.4,28);fl.rotation.x=Math.PI/2;g.add(fl);state.float=fl;state.floatBase=.4;
  state.pads=[jumpPad(g,37,14,0xb07aff,10.5)];state.hazards=[hazard(g,40,7,'shock')];
}
function setupCity(scene,state){const g=state.group;
  state.pads=[jumpPad(g,12,12,0x4be0ff,12),jumpPad(g,-28,14,0x8d7cff,13),jumpPad(g,30,-29,0xff65c2,12.5)];
  state.hazards=[hazard(g,30,-11,'vent'),hazard(g,7,39,'vent'),hazard(g,-27,1,'shock')];state.elevator=elevator(g,27,-34);
  state.breakables=[glassPane(g,26,2,-27.1,4,2.5),glassPane(g,35,2,-6.1,3.2,2.2),glassPane(g,7,2,31.1,4.5,2.3)];state.doors=[door(g,33,1.55,-1.8,2.2,3.1,'z',0x27323d)];
}
function setupHub(scene,state){state.pads=[jumpPad(state.group,-8,38,0xffcf5a,9.5)];}
function ensure(scene){if(states.has(scene))return states.get(scene);const s={kind:kind(scene),group:new THREE.Group(),breakables:[],doors:[],pads:[],hazards:[],shards:[],lastHazard:new WeakMap()};s.group.name='BB_INTERACTIVE_V6';scene.add(s.group);states.set(scene,s);if(s.kind==='haunted')setupHaunted(scene,s);else if(s.kind==='city')setupCity(scene,s);else if(s.kind==='hub')setupHub(scene,s);return s;}

function useDoor(scene,state){const p=human(scene);if(!p)return;let best=null,dist=3.2;for(const d of state.doors){const wp=d.getWorldPosition(new THREE.Vector3()),dd=wp.distanceTo(p.mesh.position);if(dd<dist){dist=dd;best=d;}}if(best)best.userData.open=best.userData.open>.5?0:1;}
document.addEventListener('keydown',e=>{if(e.code==='KeyE'&&activeScene){const s=states.get(activeScene);if(s)useDoor(activeScene,s);}},true);
document.addEventListener('mousedown',e=>{if(e.button!==0||!activeScene||!activeCamera)return;const s=states.get(activeScene);if(!s||!s.breakables.length)return;shootRay.setFromCamera(new THREE.Vector2(0,0),activeCamera);const hits=shootRay.intersectObjects(s.breakables.filter(x=>x.visible),false);if(hits[0]&&hits[0].distance<90)breakObject(hits[0].object,s);},true);

function updateDoors(state){for(const d of state.doors){const target=d.userData.open?Math.PI*.48:0;d.rotation.y=THREE.MathUtils.lerp(d.rotation.y,target,.14);}}
function updatePads(scene,state,time){const actors=findActors(scene);for(const p of state.pads){p.rotation.y=Math.sin(time*.002)*.08;const pp=p.getWorldPosition(new THREE.Vector3());for(const a of actors){if(a.dead||!a.mesh)continue;const d=a.mesh.position.distanceTo(pp);const prev=p.userData.cooldown.get(a)||0;if(d<1.65&&time>prev){a.velocity.y=Math.max(a.velocity.y||0,p.userData.power);a.onGround=false;const dir=a.mesh.position.clone().sub(pp).setY(0);if(dir.lengthSq()<.01)dir.set(0,0,1);dir.normalize().multiplyScalar(3.2);a.velocity.add(dir);p.userData.cooldown.set(a,time+1100);}}}}
function updateHazards(scene,state,time){const actors=findActors(scene);for(const h of state.hazards){h.rotation.y+=h.userData.bbHazard==='vent'?.025:.006;const hp=h.getWorldPosition(new THREE.Vector3());for(const a of actors){if(a.dead||!a.mesh)continue;const d=a.mesh.position.distanceTo(hp);const last=state.lastHazard.get(a)||0;if(d<2.2&&time>last){state.lastHazard.set(a,time+900);const push=a.mesh.position.clone().sub(hp).setY(0);if(push.lengthSq()<.01)push.set(1,0,0);push.normalize().multiplyScalar(h.userData.bbHazard==='vent'?7:5);a.velocity.add(push);a.velocity.y=Math.max(a.velocity.y,h.userData.bbHazard==='vent'?5:3);a.onGround=false;if(typeof a.health==='number')a.health=Math.max(5,a.health-(h.userData.bbHazard==='shock'?7:3));}}}}
function updateElevator(scene,state,time){const e=state.elevator;if(!e)return;const t=time*.00045;e.position.y=Math.max(0,Math.sin(t))*2.2;const open=Math.sin(t)>.65;const [l,r]=e.userData.doors;l.position.x=THREE.MathUtils.lerp(l.position.x,open?-1.35:-.72,.08);r.position.x=THREE.MathUtils.lerp(r.position.x,open?1.35:.72,.08);for(const a of actorNear(scene,e.getWorldPosition(new THREE.Vector3()),3.1)){if(a.mesh.position.y<e.position.y+.75)a.mesh.position.y=e.position.y+.36;}}
function updateFloat(state,time){if(!state.float)return;state.float.position.y=state.floatBase+Math.sin(time*.003)*.18;state.float.rotation.z=Math.sin(time*.0023)*.14;state.float.rotation.y+=.003;}
function updateShards(state,dt){for(let i=state.shards.length-1;i>=0;i--){const s=state.shards[i];s.life-=dt;s.v.y-=7*dt;s.m.position.addScaledVector(s.v,dt);s.m.rotation.x+=dt*5;s.m.rotation.y+=dt*4;s.m.material.opacity=Math.max(0,s.life);if(s.life<=0){state.group.remove(s.m);state.shards.splice(i,1);}}}

THREE.WebGLRenderer.prototype.render=function(scene,camera){activeScene=scene;activeCamera=camera;const state=ensure(scene),now=performance.now();updateDoors(state);updatePads(scene,state,now);updateHazards(scene,state,now);updateElevator(scene,state,now);updateFloat(state,now);updateShards(state,.016);return originalRender.call(this,scene,camera);};
window.__bbInteractiveV6={version:6};
