import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE HUB POLISH V10
   Additive hub-only detail pass. Visual atmosphere, landmarks and ambient animation.
   Does not alter combat, portals, collision, weapons or match logic. */

const previousRender=THREE.WebGLRenderer.prototype.render;
const states=new WeakMap();
const mat=(c,r=.62,m=.05,e=0)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e});
const basic=(c,o=1)=>new THREE.MeshBasicMaterial({color:c,transparent:o<1,opacity:o,side:THREE.DoubleSide});
function box(g,x,y,z,w,h,d,c,e=0){const q=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c,.62,.05,e));q.position.set(x,y,z);q.castShadow=true;q.receiveShadow=true;g.add(q);return q;}
function sphere(g,x,y,z,r,c,e=0){const q=new THREE.Mesh(new THREE.SphereGeometry(r,14,10),mat(c,.58,.03,e));q.position.set(x,y,z);q.castShadow=true;g.add(q);return q;}
function cyl(g,x,y,z,r,h,c){const q=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,12),mat(c));q.position.set(x,y,z);q.castShadow=true;g.add(q);return q;}
function light(g,x,y,z,c,i=1.2,d=8){const q=new THREE.PointLight(c,i,d,2);q.position.set(x,y,z);g.add(q);return q;}
function sign(g,text,x,y,z,w=5,h=1.3,color='#ffd36b',rot=0){const c=document.createElement('canvas');c.width=512;c.height=150;const ctx=c.getContext('2d');ctx.fillStyle='rgba(8,16,27,.92)';ctx.fillRect(0,0,512,150);ctx.strokeStyle=color;ctx.lineWidth=8;ctx.strokeRect(6,6,500,138);ctx.fillStyle=color;ctx.font='900 48px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,256,76);const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;const q=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tex,transparent:true,side:THREE.DoubleSide}));q.position.set(x,y,z);q.rotation.y=rot;g.add(q);return q;}
function chair(g,x,z,rot=0,c=0x2d6f85){const q=new THREE.Group();box(q,0,.52,0,.85,.12,.8,c);box(q,0,.95,.34,.85,.78,.10,c);for(const dx of [-.32,.32])for(const dz of [-.25,.25])box(q,dx,.25,dz,.08,.5,.08,0x4b5159);q.position.set(x,0,z);q.rotation.y=rot;g.add(q);}
function table(g,x,z){cyl(g,x,.52,z,.62,.10,0xd8d0c2);cyl(g,x,.25,z,.08,.5,0x555d66);}
function trash(g,x,z){cyl(g,x,.55,z,.38,1.1,0x343b42);const rim=new THREE.Mesh(new THREE.TorusGeometry(.38,.045,7,16),basic(0x737b83));rim.position.set(x,1.1,z);rim.rotation.x=Math.PI/2;g.add(rim);}
function bike(g,x,z,rot=0){const q=new THREE.Group();for(const dx of [-.72,.72]){const w=new THREE.Mesh(new THREE.TorusGeometry(.43,.055,8,20),basic(0x20252a));w.position.set(dx,.48,0);w.rotation.y=Math.PI/2;q.add(w);}const frame=box(q,0,.62,0,1.25,.06,.06,0xe34f55);frame.rotation.z=.08;box(q,.25,.82,0,.65,.055,.055,0xe34f55).rotation.z=-.75;box(q,-.25,.82,0,.65,.055,.055,0xe34f55).rotation.z=.75;cyl(q,.63,.92,0,.035,.6,0x343b42).rotation.z=-.15;q.position.set(x,0,z);q.rotation.y=rot;g.add(q);}
function lifeguard(g,x,z){const q=new THREE.Group();for(const dx of [-.75,.75])box(q,dx,.8,0,.12,1.6,.12,0xe7e0d2);box(q,0,1.45,0,1.8,.16,1.2,0xe7e0d2);box(q,0,2.15,.42,1.8,1.1,.12,0xf1eee7);box(q,0,2.15,.49,1.45,.2,.04,0xe84b45);q.position.set(x,0,z);g.add(q);return q;}
function kiosk(g,x,z,label,color){const q=new THREE.Group();box(q,0,1,0,4,2,2.8,0xe8e0d1);box(q,0,2.15,0,4.5,.35,3.3,color);box(q,0,1.2,1.43,2.6,.75,.08,0x2d3844);sign(q,label,0,2.75,1.68,3.6,.85,'#fff2c7');q.position.set(x,0,z);g.add(q);return q;}
function fountain(g,x,z){const q=new THREE.Group();const basin=new THREE.Mesh(new THREE.CylinderGeometry(3.2,3.5,.55,32),mat(0x9aa6ad,.45,.12));basin.position.y=.28;q.add(basin);const water=new THREE.Mesh(new THREE.CylinderGeometry(2.85,2.85,.08,32),new THREE.MeshStandardMaterial({color:0x3f9fc4,roughness:.2,metalness:.05,emissive:0x092b3a,transparent:true,opacity:.88}));water.position.y=.6;q.add(water);cyl(q,0,1.25,0,.38,1.4,0xb4bec4);const top=sphere(q,0,2.05,0,.45,0xd4dde1);q.position.set(x,0,z);g.add(q);return {group:q,water};}
function flag(g,x,z,c1,c2){cyl(g,x,2,z,.045,4,0x6d737a);const f=new THREE.Mesh(new THREE.PlaneGeometry(1.6,.8),basic(c1,.95));f.position.set(x+.8,3.45,z);f.userData.alt=c2;g.add(f);return f;}
function planter(g,x,z){box(g,x,.42,z,2.6,.84,1.0,0x555c5d);for(const dx of [-.75,0,.75]){sphere(g,x+dx,1.05,z,.36,0x39724e);sphere(g,x+dx*.9,1.34,z,.16,dx===0?0xf4cf58:0xe56d85);}}
function addHub(scene){const g=new THREE.Group();g.name='BB_HUB_POLISH_V10';scene.add(g);const s={group:g,start:performance.now(),flags:[],water:null,tram:null,tramBase:0};
  // Arrival plaza: make the spawn feel like a destination rather than an empty strip.
  const f=fountain(g,7,12);s.water=f.water;
  for(const [x,z,r] of [[1,7,0],[13,7,Math.PI],[1,17,0],[13,17,Math.PI]]){chair(g,x,z,r,0x315d73);table(g,x+(r?-.9:.9),z);}
  for(const [x,z] of [[-1,4],[15,4],[-1,20],[15,20]])planter(g,x,z);
  sign(g,'WARFARE PLAZA',7,5.4,2.8,8,1.5,'#7fe4ff');
  // Boardwalk storefronts and small social spaces.
  kiosk(g,-3,-18,'BRAWL BITES',0xd65d52);kiosk(g,7,-18,'GEAR SHACK',0x3f82b5);kiosk(g,17,-18,'ARCADE',0x8a55b8);
  for(const x of [-3,7,17]){chair(g,x-1.1,-14.8,Math.PI,0x9a634d);chair(g,x+1.1,-14.8,Math.PI,0x9a634d);}
  sign(g,'BOARDWALK ROW',7,5,-22,10,1.5,'#ffd36e');
  // Beach zone: lifeguard, volleyball court, towels and coolers.
  lifeguard(g,-29,39);sign(g,'BLOODLINE BEACH',-29,4.3,44,7,1.4,'#ffcf68');
  for(const [x,z,c] of [[-31,26,0xf26f61],[-27,28,0x5ab8df],[-31,12,0xf0ca62],[-27,-2,0x9c79d8]])box(g,x,.06,z,2.4,.08,1.1,c);
  for(const x of [-33,-25])cyl(g,x,1.2,20,.06,2.4,0xe6e2d9);const net=new THREE.Mesh(new THREE.PlaneGeometry(8,1.25,8,4),new THREE.MeshBasicMaterial({color:0xf3f1e8,wireframe:true,transparent:true,opacity:.55,side:THREE.DoubleSide}));net.position.set(-29,1.35,20);net.rotation.y=Math.PI/2;g.add(net);
  box(g,-24,.35,32,1.2,.7,.8,0x55a8d3);box(g,-24,.78,32,1.05,.08,.68,0xf5f0e7);
  // Marina / pier detail with bollards, lamps and a little rental booth.
  kiosk(g,-14,43,'SURF RENTALS',0x3b9a91);for(let z=35;z<=54;z+=4){cyl(g,-9,.38,z,.13,.76,0x5b5146);sphere(g,-9,.82,z,.11,0xffd78a,0xffa84f);}
  // City-side arrival lane and parked decorative vehicles.
  for(const [x,z,c] of [[25,27,0x2f6eb0],[31,27,0xd35b55],[37,27,0xe2b64d]]){const car=new THREE.Group();box(car,0,.45,0,3.2,.65,1.55,c);box(car,.2,.92,0,1.65,.55,1.3,0x263747);for(const dx of [-1,1])for(const dz of [-.62,.62]){const w=new THREE.Mesh(new THREE.CylinderGeometry(.28,.28,.18,12),mat(0x1d2125));w.position.set(dx,.28,dz);w.rotation.x=Math.PI/2;car.add(w);}car.position.set(x,0,z);g.add(car);}
  sign(g,'CITY TRANSIT',31,3.8,31.5,7,1.2,'#76b8ff');
  // Haunted approach gets its own themed forecourt.
  for(const [x,z] of [[-18,-7],[-12,-7],[-18,-19],[-12,-19]]){cyl(g,x,1.4,z,.08,2.8,0x272c32);sphere(g,x,2.85,z,.18,0xa78cff,0x5e3ca6);light(g,x,2.8,z,0x8d6cff,.75,5);}
  sign(g,'BEWARE THE BEACH HOUSE',-15,4.5,-5,8,1.35,'#bd9cff');
  // Extra street furniture and lived-in clutter.
  for(const [x,z] of [[-2,34],[5,34],[12,34],[20,34],[24,8],[24,15]])trash(g,x,z);
  bike(g,19,22,.2);bike(g,21,23,-.25);bike(g,-1,24,.1);
  for(const [x,z,c1,c2] of [[-6,5,0x4fa2d5,0xffffff],[20,5,0xe45c66,0xffffff],[-6,27,0xf0bf4e,0x284d8b],[20,27,0x8e68c5,0xffffff]])s.flags.push(flag(g,x,z,c1,c2));
  // A tiny boardwalk tram continually loops through the hub as ambient life.
  const tram=new THREE.Group();box(tram,0,.65,0,5.2,1.25,2.1,0xd94f55);box(tram,0,1.45,0,4.5,.55,1.8,0xf2dfc5);for(const dx of [-1.8,1.8])for(const dz of [-.8,.8]){const w=new THREE.Mesh(new THREE.CylinderGeometry(.28,.28,.18,12),mat(0x202429));w.position.set(dx,.28,dz);w.rotation.x=Math.PI/2;tram.add(w);}sign(tram,'BRAWL BUS',0,1.45,1.08,3.4,.7,'#fff0b0');tram.position.set(-5,0,48);g.add(tram);s.tram=tram;
  // Warm string-light corridor connecting destinations.
  s.bulbs=[];for(let z=-32;z<=36;z+=4){for(const x of [-5,19]){const b=sphere(g,x,4.2,z,.09,0xffd27b,0xffb64a);s.bulbs.push(b);}}
  return s;
}
function identify(scene){return scene?.background?.isColor&&scene.background.getHex()===0x071526;}
function ensure(scene){if(states.has(scene))return states.get(scene);const s=identify(scene)?addHub(scene):null;states.set(scene,s);return s;}
function animate(s,t){if(!s)return;const time=t*.001;if(s.water){s.water.material.emissiveIntensity=.25+Math.sin(time*2)*.08;s.water.rotation.y=time*.05;}if(s.tram){const p=(time*.055)%1;const a=p*Math.PI*2;s.tram.position.x=7+Math.cos(a)*29;s.tram.position.z=12+Math.sin(a)*39;s.tram.rotation.y=-a;}s.flags.forEach((f,i)=>{f.rotation.y=Math.sin(time*1.5+i)*.08;f.rotation.z=Math.sin(time*2+i)*.035;});s.bulbs.forEach((b,i)=>{b.material.emissiveIntensity=.7+Math.sin(time*3+i*.7)*.25;});}
THREE.WebGLRenderer.prototype.render=function(scene,camera){const s=ensure(scene);animate(s,performance.now());return previousRender.call(this,scene,camera);};
