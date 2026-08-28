import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE MAP POLISH V5
   Additive visual/atmosphere layer. It deliberately does not touch combat,
   collision, weapon stats, bot AI, or spawn logic. */

const originalRender = THREE.WebGLRenderer.prototype.render;
const sceneStates = new WeakMap();

const mat = (color, rough=.65, metal=.05, emissive=0x000000) =>
  new THREE.MeshStandardMaterial({color, roughness:rough, metalness:metal, emissive});

function addBox(g,x,y,z,w,h,d,color,em=0){
  const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(color,.62,.08,em));
  m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;g.add(m);return m;
}
function addSphere(g,x,y,z,r,color,em=0){
  const m=new THREE.Mesh(new THREE.SphereGeometry(r,16,12),mat(color,.58,.04,em));
  m.position.set(x,y,z);m.castShadow=true;g.add(m);return m;
}
function addCyl(g,x,y,z,r,h,color,rotZ=0){
  const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,16),mat(color,.58,.18));
  m.position.set(x,y,z);m.rotation.z=rotZ;m.castShadow=true;g.add(m);return m;
}
function glow(g,x,y,z,color,intensity=2,range=10){
  const l=new THREE.PointLight(color,intensity,range,2);l.position.set(x,y,z);g.add(l);return l;
}
function textSign(g,text,x,y,z,w=7,h=2,color='#7bd8ff',bg='rgba(7,12,24,.88)'){
  const c=document.createElement('canvas');c.width=512;c.height=160;const ctx=c.getContext('2d');
  ctx.fillStyle=bg;ctx.fillRect(0,0,c.width,c.height);ctx.strokeStyle=color;ctx.lineWidth=10;ctx.strokeRect(7,7,c.width-14,c.height-14);
  ctx.fillStyle=color;ctx.font='900 56px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,c.width/2,c.height/2);
  const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tex,transparent:true,side:THREE.DoubleSide}));
  m.position.set(x,y,z);g.add(m);return m;
}
function umbrella(g,x,z,color){
  addCyl(g,x,1,z,.07,2,0xe8dfcf);
  const top=new THREE.Mesh(new THREE.ConeGeometry(1.4,.7,16,1,true),mat(color,.7,.02));top.position.set(x,2.15,z);top.rotation.x=Math.PI;g.add(top);
  addBox(g,x,.24,z,1.8,.18,.72,0x6f553e);return top;
}
function palm(g,x,z,s=1){
  addCyl(g,x,2.3*s,z,.18*s,4.6*s,0x74583b,.04);
  const leaves=[];for(let i=0;i<7;i++){const leaf=addBox(g,x,4.7*s,z,2.1*s,.09,.35*s,0x2f6d4d);leaf.rotation.y=i*Math.PI*2/7;leaf.rotation.z=(i%2?.18:-.12);leaves.push(leaf);}return leaves;
}
function boat(g,x,z,scale=.8){
  const hull=new THREE.Mesh(new THREE.CylinderGeometry(1.3*scale,1.7*scale,.65*scale,4),mat(0xf0efe7,.45,.05));hull.position.set(x,.12,z);hull.rotation.y=Math.PI/4;g.add(hull);
  addBox(g,x,.7,z,.12,2.7*scale,.12,0x6b5137);const sail=new THREE.Mesh(new THREE.BufferGeometry().setFromPoints([]),mat(0xffffff));
  const shape=new THREE.Shape();shape.moveTo(0,0);shape.lineTo(0,2.4*scale);shape.lineTo(1.7*scale,.4*scale);shape.closePath();const sm=new THREE.Mesh(new THREE.ShapeGeometry(shape),new THREE.MeshBasicMaterial({color:0xf7f1df,side:THREE.DoubleSide}));sm.position.set(x+.08,.75,z);sm.rotation.y=Math.PI/2;g.add(sm);return {hull,sail:sm,baseZ:z};
}
function gull(g,x,y,z,s=.45){
  const group=new THREE.Group();group.position.set(x,y,z);for(const dir of [-1,1]){const wing=new THREE.Mesh(new THREE.BoxGeometry(1.1*s,.05,.25*s),new THREE.MeshBasicMaterial({color:0xf1f2f4}));wing.position.x=dir*.48*s;wing.rotation.z=dir*.25;group.add(wing);}g.add(group);return group;
}
function ghost(g,x,y,z,s=1){
  const group=new THREE.Group();group.position.set(x,y,z);
  const body=new THREE.Mesh(new THREE.SphereGeometry(.7*s,16,12),new THREE.MeshBasicMaterial({color:0xb7a8ff,transparent:true,opacity:.25,depthWrite:false}));body.scale.y=1.35;group.add(body);
  for(const dx of [-.22,.22]){const eye=new THREE.Mesh(new THREE.SphereGeometry(.07*s,8,6),new THREE.MeshBasicMaterial({color:0x211742}));eye.position.set(dx*s,.12*s,.62*s);group.add(eye);}g.add(group);return group;
}
function bat(g,x,y,z,s=.6){
  const group=new THREE.Group();group.position.set(x,y,z);for(const d of [-1,1]){const w=new THREE.Mesh(new THREE.BoxGeometry(.65*s,.06,.28*s),new THREE.MeshBasicMaterial({color:0x17151d}));w.position.x=d*.3*s;w.rotation.z=d*.35;group.add(w);}g.add(group);return group;
}
function fan(g,x,y,z,r=.8){
  const group=new THREE.Group();group.position.set(x,y,z);group.rotation.x=-Math.PI/2;for(let i=0;i<5;i++){const b=addBox(group,0,r*.48,0,.18,r,.06,0x343b43);b.rotation.z=i*Math.PI*2/5;}g.add(group);return group;
}
function drone(g,x,y,z){
  const group=new THREE.Group();group.position.set(x,y,z);addBox(group,0,0,0,1.2,.25,.8,0x282f39);for(const [dx,dz] of [[-.8,-.55],[.8,-.55],[-.8,.55],[.8,.55]]){addBox(group,dx,0,dz,.7,.06,.08,0x3b4650);const p=new THREE.Mesh(new THREE.TorusGeometry(.28,.04,6,16),new THREE.MeshBasicMaterial({color:0x7fe1ff}));p.position.set(dx,.08,dz);p.rotation.x=Math.PI/2;group.add(p);}glow(group,0,-.15,0,0x55bfff,1.2,5);g.add(group);return group;
}
function basketballHoop(g,x,z,rot=0){
  const group=new THREE.Group();group.position.set(x,0,z);group.rotation.y=rot;addCyl(group,0,1.6,0,.07,3.2,0x333a44);addBox(group,0,3,.16,1.6,1,.12,0xe9edf2);const rim=new THREE.Mesh(new THREE.TorusGeometry(.38,.045,8,20),new THREE.MeshBasicMaterial({color:0xe86c2c}));rim.position.set(0,2.7,.55);rim.rotation.x=Math.PI/2;group.add(rim);g.add(group);return group;
}
function vending(g,x,z,color=0xd54d68){
  const v=addBox(g,x,1.15,z,1.2,2.3,.8,color);addBox(g,x,1.45,z+.41,.78,.9,.03,0x18212b,0x162c46);glow(g,x,1.5,z+.7,0x7bcfff,1,4);return v;
}
function beachFloat(g,x,z){
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.95,.26,10,24),mat(0xff78b7,.5,.02,0x28121f));ring.position.set(x,.28,z);ring.rotation.x=Math.PI/2;g.add(ring);return ring;
}

function decorateHub(scene,state){
  const g=new THREE.Group();g.name='BB_MAP_POLISH_HUB_V5';scene.add(g);state.group=g;
  // Beach life and boardwalk personality.
  umbrella(g,-31,-28,0xffca63);umbrella(g,-30,-8,0x63c9ff);umbrella(g,-31,18,0xff789d);
  for(const [x,z,c] of [[-28,-35,0xf26c5e],[-29,-18,0x56b6d8],[-28,3,0xf0c765],[-29,31,0x8e73d8]]){addBox(g,x,.35,z,.32,2.2,.14,c);}
  state.boats=[boat(g,-53,-20,.8),boat(g,-61,16,.65),boat(g,-49,38,.55)];
  state.gulls=[gull(g,-36,11,-20),gull(g,-45,14,8),gull(g,-22,10,34)];
  textSign(g,'BLOODLINE BOARDWALK',-8,4.2,-43,11,2.1,'#ffd66e');
  textSign(g,'WARFARE',17,6,-6,6.5,2,'#79d8ff');
  // Ice-cream cart easter egg.
  addBox(g,-4,.85,29,3,1.6,1.8,0xf1e9df);addBox(g,-4,1.72,29,3.4,.18,2.2,0xff6f8d);for(const dx of [-1,1])addCyl(g,-4+dx,.3,29.75,.35,.25,0x20242a,Math.PI/2);textSign(g,'ICE CREAM',-4,1.15,30,2.4,.7,'#ff7aa2','rgba(255,248,240,.92)');
  // String-light plaza canopy.
  for(let x=-2;x<=22;x+=4){addSphere(g,x,4,19,.11,0xffd36e,0xffb14d);glow(g,x,4,19,0xffc46b,.5,3);}
  for(const p of [[-16,44],[30,47],[-18,-48],[35,-43]])palm(g,p[0],p[1],.75);
  state.start=performance.now()/1000;
}
function decorateHaunted(scene,state){
  const g=new THREE.Group();g.name='BB_MAP_POLISH_HAUNTED_V5';scene.add(g);state.group=g;
  // Playful spooky details instead of pure horror.
  state.ghosts=[ghost(g,2,7,-14,.9),ghost(g,17,8,15,.75),ghost(g,38,4,4,.8)];
  state.bats=[];for(let i=0;i<8;i++)state.bats.push(bat(g,-35+i*2.1,24+(i%3),-35+i*.7,.7));
  // Pool-party remnants and backyard props.
  state.poolFloat=beachFloat(g,14,28);addBox(g,25,.45,30,2.8,.9,1.6,0x6e4c36);umbrella(g,27,31,0x7759c9);
  // Haunted arcade cabinet and vending machine in garage/yard.
  vending(g,32,-22,0x533a78);textSign(g,'HIGH SCORE',32,2.7,-21.55,2.1,.7,'#b98cff');
  // Silly skeleton-like lawn-chair figure made from simple bones.
  const sk=new THREE.Group();sk.position.set(-7,0,8);addSphere(sk,0,1.8,0,.32,0xd9d5c8);addCyl(sk,0,1.15,0,.09,1.2,0xd9d5c8);for(const d of [-1,1]){const a=addCyl(sk,d*.38,1.15,0,.06,.8,0xd9d5c8);a.rotation.z=d*.65;}g.add(sk);
  // More warm windows and tiny graveyard candles.
  for(const [x,z] of [[35,12],[40,14],[44,10],[37,17]]){addSphere(g,x,.45,z+.4,.09,0xffd07c,0xffa43d);glow(g,x,.55,z+.4,0xff9f45,.7,3);}
  textSign(g,'NO GHOSTS AFTER 10',40,2.5,6.7,5.2,1.2,'#b69aff');
  state.start=performance.now()/1000;
}
function decorateCity(scene,state){
  const g=new THREE.Group();g.name='BB_MAP_POLISH_CITY_V5';scene.add(g);state.group=g;
  // Rooftop personality: sports, vending, signage, fans, drones.
  basketballHoop(g,8,13,Math.PI);basketballHoop(g,-6,-13,0);
  vending(g,39,-1,0x256bb0);vending(g,-26,16,0xd04c55);
  textSign(g,'BLOODLINE',-20,5,-29.6,9,2.6,'#6f91ff');
  textSign(g,'BRAWL FM',29,6,-33,6.5,1.8,'#ff6ba8');
  state.fans=[fan(g,12,1.3,9,.8),fan(g,28,1.3,-12,.7),fan(g,-28,1.25,1,.7),fan(g,7,1.2,39,.7)];
  state.drones=[drone(g,-15,11,3),drone(g,41,14,18)];
  // Rooftop party leftovers / colorful seating.
  for(const [x,z,c] of [[0,38,0xffc45d],[4,40,0x65d0ba],[11,39,0xe86e8f]])addBox(g,x,.4,z,1.6,.8,1.6,c);
  // Blinking antenna beacons.
  state.beacons=[];for(const [x,z,y] of [[-33,9,7],[34,28,10],[27,-34,8],[7,36,8]]){addCyl(g,x,y-2,z,.06,4,0x68717b);const l=addSphere(g,x,y,z,.16,0xff4050,0xff2035);const pl=glow(g,x,y,z,0xff3045,1.3,8);state.beacons.push({mesh:l,light:pl});}
  // Giant rooftop inflatable duck far outside combat center as a goofy skyline landmark.
  const duck=new THREE.Group();duck.position.set(52,3,42);addSphere(duck,0,0,0,2.4,0xffcf3f);addSphere(duck,0,2.1,.4,1.35,0xffcf3f);addBox(duck,0,1.95,1.7,1.2,.45,.9,0xf28a2d);for(const dx of [-.4,.4])addSphere(duck,dx,2.45,1.25,.12,0x16181c);g.add(duck);state.duck=duck;
  state.start=performance.now()/1000;
}

function identify(scene){
  if(!scene?.background?.isColor)return 'unknown';
  const h=scene.background.getHex();
  if(h===0x071526)return 'hub';
  if(h===0x020711)return 'haunted';
  if(h===0x091226)return 'city';
  return 'unknown';
}
function ensure(scene){
  if(sceneStates.has(scene))return sceneStates.get(scene);
  const state={kind:identify(scene)};sceneStates.set(scene,state);
  if(state.kind==='hub')decorateHub(scene,state);
  else if(state.kind==='haunted')decorateHaunted(scene,state);
  else if(state.kind==='city')decorateCity(scene,state);
  return state;
}
function animateState(state,time){
  if(!state||state.kind==='unknown')return;
  const t=time/1000;
  if(state.kind==='hub'){
    state.boats?.forEach((b,i)=>{b.hull.position.y=.12+Math.sin(t*.8+i)*.12;b.sail.position.y=.75+Math.sin(t*.8+i)*.12;b.hull.rotation.z=Math.sin(t*.55+i)*.04;b.sail.rotation.z=Math.sin(t*.55+i)*.04;});
    state.gulls?.forEach((g,i)=>{g.position.x+=Math.sin(t*.7+i)*.004;g.position.y+=Math.sin(t*1.3+i)*.003;g.rotation.y=t*.12+i;});
  } else if(state.kind==='haunted'){
    state.ghosts?.forEach((g,i)=>{g.position.y+=Math.sin(t*1.2+i)*.004;g.rotation.y=Math.sin(t*.5+i)*.2;g.visible=((Math.floor(t*1.5+i)%9)!==0);});
    state.bats?.forEach((b,i)=>{b.position.x+=Math.sin(t*1.5+i)*.006;b.position.y+=Math.sin(t*2+i)*.004;b.rotation.y=t*.4+i;});
    if(state.poolFloat){state.poolFloat.rotation.z=t*.2;state.poolFloat.position.y=.28+Math.sin(t*1.4)*.08;}
  } else if(state.kind==='city'){
    state.fans?.forEach((f,i)=>f.rotation.z=t*(2.3+i*.35));
    state.drones?.forEach((d,i)=>{d.position.x+=Math.sin(t*.6+i)*.006;d.position.y+=Math.sin(t*1.2+i)*.004;d.rotation.y=t*.35+i;});
    state.beacons?.forEach((b,i)=>{const on=(Math.sin(t*3+i)>0);b.mesh.visible=on;b.light.intensity=on?1.5:.08;});
    if(state.duck)state.duck.rotation.y=Math.sin(t*.25)*.12;
  }
}

THREE.WebGLRenderer.prototype.render=function(scene,camera){
  const state=ensure(scene);animateState(state,performance.now());return originalRender.call(this,scene,camera);
};
