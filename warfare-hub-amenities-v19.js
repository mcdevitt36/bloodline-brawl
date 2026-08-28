import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE HUB AMENITIES V19
   Adds picnic/hangout detail to the Warfare hub and aliases Arrow keys to WASD.
   Visual-only hub props; no portal or combat logic changes. */

const previousRender=THREE.WebGLRenderer.prototype.render;
const states=new WeakMap();
const mat=(c,r=.68,m=.04,e=0)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e});
const basic=(c,o=1)=>new THREE.MeshBasicMaterial({color:c,transparent:o<1,opacity:o,side:THREE.DoubleSide});
function box(g,x,y,z,w,h,d,c){const q=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c));q.position.set(x,y,z);q.castShadow=q.receiveShadow=true;g.add(q);return q;}
function cyl(g,x,y,z,r,h,c){const q=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,14),mat(c));q.position.set(x,y,z);q.castShadow=true;g.add(q);return q;}
function sphere(g,x,y,z,r,c,e=0){const q=new THREE.Mesh(new THREE.SphereGeometry(r,14,10),mat(c,.6,.03,e));q.position.set(x,y,z);q.castShadow=true;g.add(q);return q;}
function picnicTable(g,x,z,rot=0){const q=new THREE.Group();const wood=0x8c6648,dark=0x474a4e;box(q,0,.82,0,3.1,.18,1.05,wood);for(const zz of [-.92,.92])box(q,0,.52,zz,3.2,.16,.42,wood);for(const xx of [-1.05,1.05]){const l1=box(q,xx,.42,-.35,.16,.85,.16,dark);l1.rotation.z=.35;const l2=box(q,xx,.42,.35,.16,.85,.16,dark);l2.rotation.z=-.35;}q.position.set(x,0,z);q.rotation.y=rot;g.add(q);return q;}
function umbrella(g,x,z,color=0xe86b61){const pole=cyl(g,x,1.45,z,.055,2.9,0x6d7176);const canopy=new THREE.Mesh(new THREE.ConeGeometry(1.55,.55,18),mat(color,.6,.02));canopy.position.set(x,2.75,z);canopy.rotation.y=Math.PI/18;g.add(canopy);return {pole,canopy};}
function grill(g,x,z,rot=0){const q=new THREE.Group();cyl(q,0,.95,0,.62,.42,0x252a2e);const lid=new THREE.Mesh(new THREE.SphereGeometry(.62,16,10,0,Math.PI*2,0,Math.PI/2),mat(0x2c3236,.38,.38));lid.position.y=1.17;q.add(lid);for(const xx of [-.36,.36])cyl(q,xx,.42,0,.055,.86,0x4c5155);box(q,.78,.92,0,.7,.08,.38,0x3f4448);q.position.set(x,0,z);q.rotation.y=rot;g.add(q);return q;}
function cooler(g,x,z,color=0x4d98c7){const q=new THREE.Group();box(q,0,.32,0,1.0,.62,.65,color);box(q,0,.66,0,1.04,.09,.69,0xf2efe8);box(q,0,.51,.35,.42,.08,.05,0xd0d3d5);q.position.set(x,0,z);g.add(q);return q;}
function adirondack(g,x,z,rot=0,color=0x5b88a5){const q=new THREE.Group();box(q,0,.48,0,.95,.14,.78,color);const back=box(q,0,1.05,.3,.95,1.0,.13,color);back.rotation.x=-.16;for(const xx of [-.37,.37]){box(q,xx,.26,0,.10,.55,.10,0x4e555a);box(q,xx,.66,-.12,.12,.11,.72,color);}q.position.set(x,0,z);q.rotation.y=rot;g.add(q);return q;}
function planter(g,x,z,c=0x4f5958){box(g,x,.32,z,2.1,.64,.85,c);for(const dx of [-.62,0,.62]){sphere(g,x+dx,.88,z,.29,0x34704b);sphere(g,x+dx,.99,z,.10,dx===0?0xffcf66:0xec7a9f);}}
function cornhole(g,x,z,rot=0,color=0xd66b4c){const q=new THREE.Group();const board=box(q,0,.22,0,1.15,.12,2.0,color);board.rotation.x=-.12;const hole=new THREE.Mesh(new THREE.RingGeometry(.16,.25,20),basic(0x20252a));hole.position.set(0,.34,-.55);hole.rotation.x=-Math.PI/2-.12;q.add(hole);q.position.set(x,0,z);q.rotation.y=rot;g.add(q);}
function stringLights(g,x1,z1,x2,z2,y=3.5,count=8){for(let i=0;i<count;i++){const t=i/(count-1),x=THREE.MathUtils.lerp(x1,x2,t),z=THREE.MathUtils.lerp(z1,z2,t),sag=Math.sin(Math.PI*t)*.34;const b=sphere(g,x,y-sag,z,.075,0xffd79b,0xffa84c);b.material.emissiveIntensity=1.05;const l=new THREE.PointLight(0xffc477,.32,3,2);l.position.set(x,y-sag,z);g.add(l);}}
function addHub(scene){const g=new THREE.Group();g.name='BB_HUB_AMENITIES_V19';scene.add(g);
  // Sunset picnic lawn east of the boardwalk, clear of Haunted/City portals.
  for(const [x,z,r] of [[2,26,.10],[9,27,-.08],[16,25,.06],[2,34,-.06],[10,35,.08],[18,34,-.05]])picnicTable(g,x,z,r);
  umbrella(g,2,26,0xe96f5f);umbrella(g,16,25,0x5aa6cf);umbrella(g,10,35,0xe5b84e);
  grill(g,21,29,-.25);grill(g,-2,30,.2);cooler(g,19.8,31,0x4b99c9);cooler(g,-.8,32,0xe65f65);
  for(const [x,z,r,c] of [[-1,24,.35,0x5f8fa9],[5,22,-.25,0xd0835f],[15,22,.25,0x5b89a8],[21,24,-.35,0xe1b351]])adirondack(g,x,z,r,c);
  for(const [x,z] of [[-4,21],[23,21],[-4,38],[23,38]])planter(g,x,z);
  // Lawn games beside the picnic area.
  cornhole(g,22,36,.12,0xd66b4c);cornhole(g,22,40,Math.PI+.12,0x4c85bd);corndeco(g,20,38);
  // Beach-side shaded hangout area.
  for(const [x,z,r] of [[-24,8,Math.PI/2],[-24,2,Math.PI/2],[-24,-4,Math.PI/2]])picnicTable(g,x,z,r);
  umbrella(g,-24,8,0xf3c85b);umbrella(g,-24,-4,0x78a7d6);cooler(g,-27,5,0x58a8d3);cooler(g,-27,-2,0xe46d66);
  // Small boardwalk cafe tables near storefronts.
  for(const [x,z] of [[-1,-12],[6,-12],[13,-12],[20,-12]]){cyl(g,x,.48,z,.48,.10,0xd7d0c3);cyl(g,x,.24,z,.07,.48,0x555b61);for(const a of [0,Math.PI])adirondack(g,x+Math.cos(a)*1.05,z+Math.sin(a)*1.05,a+Math.PI/2,0x8b6854);}
  // Soft string-light canopy over picnic lawn.
  for(const x of [0,10,20]){cyl(g,x,2.0,20,.055,4,0x4f555b);cyl(g,x,2.0,40,.055,4,0x4f555b);stringLights(g,x,20,x,40,4.1,9);}
  stringLights(g,0,20,20,20,4.1,8);stringLights(g,0,40,20,40,4.1,8);
  return {group:g,start:performance.now()};
}
function corndeco(g,x,z){for(const [dx,dz,c] of [[-.35,-.25,0xe55e58],[.2,.15,0x5d8fd2],[.4,-.2,0xf2c85c],[-.15,.35,0x7f68b7]]){const b=new THREE.Mesh(new THREE.BoxGeometry(.22,.07,.22),mat(c));b.position.set(x+dx,.08,z+dz);b.rotation.y=Math.random()*Math.PI;g.add(b);}}
function identify(scene){if(!scene)return false;const bg=scene.background;if(bg?.isColor&&bg.getHex()===0x071526)return true;let found=false;scene.traverse(o=>{if(o.name==='BB_HUB_POLISH_V10')found=true;});return found;}
function ensure(scene){if(states.has(scene))return states.get(scene);const s=identify(scene)?addHub(scene):null;states.set(scene,s);return s;}
THREE.WebGLRenderer.prototype.render=function(scene,camera){ensure(scene);return previousRender.call(this,scene,camera);};

// Arrow keys mirror WASD, preserving the core movement implementation.
const arrowMap={ArrowUp:'KeyW',ArrowDown:'KeyS',ArrowLeft:'KeyA',ArrowRight:'KeyD'};
function mirrorArrow(e,type){const code=arrowMap[e.code];if(!code||e.__bbArrowAlias)return;e.preventDefault();const ev=new KeyboardEvent(type,{code,key:code==='KeyW'?'w':code==='KeyS'?'s':code==='KeyA'?'a':'d',bubbles:true,cancelable:true,repeat:e.repeat});Object.defineProperty(ev,'__bbArrowAlias',{value:true});document.dispatchEvent(ev);}
document.addEventListener('keydown',e=>mirrorArrow(e,'keydown'),true);
document.addEventListener('keyup',e=>mirrorArrow(e,'keyup'),true);

window.__bbHubAmenitiesV19={version:19,features:['picnic-tables','grills','umbrellas','coolers','adirondack-seating','lawn-games','string-lights','arrow-key-movement']};