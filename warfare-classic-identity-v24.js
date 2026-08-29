import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE CLASSIC IDENTITY V24
   Makes the 3D Warfare roster visually mirror established Classic Brawl designs.
   Adds Classic melee props and character-specific outfit/details without changing hitboxes. */

const prevRender=THREE.WebGLRenderer.prototype.render;
const done=new WeakSet();
const C={
 sean:{shirt:0x3e7d3b,pants:0x64472f,hair:0x101010,melee:'ICE CREAM CONE'},
 shannan:{shirt:0x597c9b,pants:0x3d4652,hair:0x7b4c2c,melee:'SYRINGE'},
 erin:{shirt:0xf7f7f7,pants:0x3971a8,hair:0xe5c35c,melee:'HAIRBRUSH'},
 liam:{shirt:0x101010,pants:0x315b93,hair:0x51331f,melee:'SHOULDER CHECK'},
 connor:{shirt:0x8e2727,pants:0x777b82,hair:0x583a25,melee:'PAINTBRUSH'},
 kelly:{shirt:0x161616,pants:0x7b7f86,hair:0x6a4328,melee:'SHOVEL'}
};
const mat=(c,r=.6,m=.02)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
function box(g,x,y,z,w,h,d,c){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c));o.position.set(x,y,z);o.castShadow=true;g.add(o);return o;}
function cyl(g,x,y,z,r,h,c){const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,12),mat(c));o.position.set(x,y,z);o.castShadow=true;g.add(o);return o;}
function sphere(g,x,y,z,r,c,sx=1,sy=1,sz=1){const o=new THREE.Mesh(new THREE.SphereGeometry(r,14,10),mat(c));o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.castShadow=true;g.add(o);return o;}
function recolorBase(actor,cfg){const p=actor.mesh.userData.parts||{};if(p.torso?.material)p.torso.material.color.setHex(cfg.shirt);p.legs?.children?.forEach(x=>x.material?.color?.setHex(cfg.pants));}
function addGlasses(g){for(const x of [-.15,.15]){const t=new THREE.Mesh(new THREE.TorusGeometry(.105,.018,6,16),mat(0x171717,.45,.1));t.position.set(x,2.49,.37);g.add(t);}box(g,0,2.49,.37,.09,.025,.025,0x171717);}
function addConnorStubble(g){const m=mat(0x6a4a38,.9,0);m.transparent=true;m.opacity=.62;const chin=new THREE.Mesh(new THREE.SphereGeometry(.30,14,9,0,Math.PI*2,Math.PI*.46,Math.PI*.42),m);chin.position.set(0,2.31,.14);chin.scale.set(.92,.72,.82);g.add(chin);}
function addSeanGuitar(g){sphere(g,.43,1.45,-.28,.27,0xb87832,.72,1.15,.42);cyl(g,.43,1.82,-.29,.055,.82,0x754725);}
function addPaintbrush(g){const w=new THREE.Group();w.name='BB_CLASSIC_MELEE';w.position.set(.62,1.45,.03);w.rotation.z=-.30;g.add(w);cyl(w,0,.20,0,.045,.70,0x7b4b2a);box(w,0,.61,0,.22,.18,.10,0xd9d0b2);box(w,0,.71,.01,.20,.08,.11,0x3ba6d8);}
function addHairbrush(g){const w=new THREE.Group();w.name='BB_CLASSIC_MELEE';w.position.set(.62,1.45,.03);w.rotation.z=-.38;g.add(w);cyl(w,0,.18,0,.045,.62,0xe58aa5);box(w,0,.58,0,.23,.34,.12,0xe58aa5);for(let x=-.07;x<=.07;x+=.07)for(let y=.48;y<=.68;y+=.08)cyl(w,x,y,.075,.012,.08,0x333333);}
function addSyringe(g){const w=new THREE.Group();w.name='BB_CLASSIC_MELEE';w.position.set(.62,1.48,.03);w.rotation.z=-.34;g.add(w);const barrel=cyl(w,0,.24,0,.07,.54,0xdff8ff);barrel.material.transparent=true;barrel.material.opacity=.88;box(w,0,-.06,0,.24,.05,.10,0x728f9b);cyl(w,0,.69,0,.012,.38,0xc5c5c5);box(w,0,-.16,0,.14,.05,.08,0xe7f8fb);}
function addIceCreamCone(g){const w=new THREE.Group();w.name='BB_CLASSIC_MELEE';w.position.set(.62,1.47,.03);w.rotation.z=-.30;g.add(w);const cone=new THREE.Mesh(new THREE.ConeGeometry(.12,.42,14),mat(0xd6a05a,.9,0));cone.position.y=.13;cone.rotation.z=Math.PI;cone.castShadow=true;w.add(cone);sphere(w,0,.42,0,.15,0xf3d7ad);sphere(w,-.065,.49,.015,.10,0xf5b6c8,.9,.9,.9);sphere(w,.07,.50,-.01,.095,0xf7efe2,.9,.9,.9);}
function addShovel(g){const w=new THREE.Group();w.name='BB_CLASSIC_MELEE';w.position.set(.62,1.44,.03);w.rotation.z=-.34;g.add(w);cyl(w,0,.18,0,.045,.86,0x8a6239);const blade=new THREE.Mesh(new THREE.ConeGeometry(.19,.38,5),mat(0x8c959b,.42,.55));blade.position.y=.72;blade.rotation.z=Math.PI;blade.scale.z=.45;blade.castShadow=true;w.add(blade);}
function addRugbyDetail(g){const ball=sphere(g,.47,1.55,.22,.18,0xe9e6dc,1.35,.78,.72);ball.rotation.z=-.28;box(g,.47,1.56,.385,.16,.025,.025,0x222222);}
function addShoes(g,key){const white=['erin','liam'].includes(key);for(const x of [-.24,.24])box(g,x,.12,.13,.34,.17,.52,white?0xf5f5f2:0x292b2e);}
function addIdentity(actor){if(!actor?.mesh||done.has(actor.mesh))return;const key=actor.charId,cfg=C[key];if(!cfg)return;done.add(actor.mesh);recolorBase(actor,cfg);const g=new THREE.Group();g.name='BB_CLASSIC_IDENTITY_V24';actor.mesh.add(g);actor.mesh.children.forEach(ch=>{if(ch.name==='BB_CHARACTER_DETAIL_V8')ch.traverse(o=>{if(o.isMesh&&o.position.y>1&&o.position.y<2.15&&Math.abs(o.position.x)<.5&&o.geometry?.type==='BoxGeometry')o.visible=false;});});box(g,0,1.57,.285,.86,1.04,.07,cfg.shirt);addShoes(g,key);if(key==='connor'){addConnorStubble(g);addPaintbrush(g);}if(key==='erin')addHairbrush(g);if(key==='shannan')addSyringe(g);if(key==='liam')addRugbyDetail(g);if(key==='sean'){addGlasses(g);addSeanGuitar(g);addIceCreamCone(g);}if(key==='kelly')addShovel(g);actor.mesh.userData.bbClassicMelee=cfg.melee;actor.classicMelee=cfg.melee;}
function syncRoster(){document.querySelectorAll('.fighter-choice').forEach(b=>{const name=b.querySelector('strong')?.textContent?.trim().toLowerCase();const cfg=C[name];if(!cfg)return;b.dataset.classicMelee=cfg.melee;b.title=`Classic melee: ${cfg.melee}`;});}
syncRoster();new MutationObserver(syncRoster).observe(document.documentElement,{childList:true,subtree:true});
THREE.WebGLRenderer.prototype.render=function(scene,camera){scene?.traverse(o=>{const a=o.userData?.actor;if(a)addIdentity(a);});return prevRender.call(this,scene,camera);};
window.__bbClassicIdentityV24={version:24,identities:C};
