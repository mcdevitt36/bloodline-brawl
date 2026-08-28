import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE INTERACTIVE V7
   Stability pass over V6: predictable jump impulses, stable elevator carry,
   hinged/debounced doors, weapon-gated glass breaking, softer hazards. */

const originalRender=THREE.WebGLRenderer.prototype.render;
const states=new WeakMap();
let activeScene=null,activeCamera=null,lastFrame=performance.now();
const ray=new THREE.Raycaster();
const center=new THREE.Vector2(0,0);
const weaponLabel=()=>document.getElementById('weaponName')?.textContent||'UNARMED';
const prompt=()=>document.getElementById('interactionPrompt');
const damageFlash=()=>document.getElementById('damageFlash');

const mat=(c,op=1,em=0)=>new THREE.MeshStandardMaterial({color:c,roughness:.48,metalness:.1,transparent:op<1,opacity:op,emissive:em});
function box(g,x,y,z,w,h,d,c,op=1,em=0){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c,op,em));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;g.add(m);return m;}
function cyl(g,x,y,z,r,h,c){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,20),mat(c));m.position.set(x,y,z);m.castShadow=true;g.add(m);return m;}
function ring(g,x,y,z,r,c){const m=new THREE.Mesh(new THREE.TorusGeometry(r,.16,10,30),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.92}));m.position.set(x,y,z);m.rotation.x=Math.PI/2;g.add(m);return m;}
function glow(g,x,y,z,c,i=2,r=8){const l=new THREE.PointLight(c,i,r,2);l.position.set(x,y,z);g.add(l);return l;}
function kind(scene){const h=scene?.background?.isColor?scene.background.getHex():0;return h===0x020711?'haunted':h===0x091226?'city':h===0x071526?'hub':'unknown';}
function actors(scene){const out=[];scene.traverse(o=>{const a=o.userData?.actor;if(a&&!out.includes(a))out.push(a);});return out;}
function human(scene){return actors(scene).find(a=>!a.isBot)||null;}
function horizontal(a,b){const dx=a.x-b.x,dz=a.z-b.z;return Math.hypot(dx,dz);}

function glass(g,x,y,z,w,h,axis='z'){
  const geo=axis==='z'?new THREE.BoxGeometry(w,h,.09):new THREE.BoxGeometry(.09,h,w);
  const m=new THREE.Mesh(geo,new THREE.MeshPhysicalMaterial({color:0x9cd4ef,transparent:true,opacity:.38,roughness:.06,metalness:.02,transmission:.2}));
  m.position.set(x,y,z);m.userData.bbBreakable=true;g.add(m);return m;
}
function shatter(obj,s){if(!obj||!obj.visible)return;obj.visible=false;const p=obj.getWorldPosition(new THREE.Vector3());for(let i=0;i<9;i++){const shard=new THREE.Mesh(new THREE.BoxGeometry(.08+Math.random()*.12,.08+Math.random()*.14,.025),new THREE.MeshBasicMaterial({color:0xb9e6f7,transparent:true,opacity:.82}));shard.position.copy(p).add(new THREE.Vector3((Math.random()-.5)*.8,(Math.random()-.5)*.7,(Math.random()-.5)*.45));shard.rotation.set(Math.random(),Math.random(),Math.random());s.group.add(shard);s.shards.push({m:shard,v:new THREE.Vector3((Math.random()-.5)*2.5,1.4+Math.random()*2.2,(Math.random()-.5)*2.5),life:.9+Math.random()*.35});}}
function hingedDoor(g,x,y,z,w=2.2,h=3.1,axis='z',color=0x4a382f){const pivot=new THREE.Group();pivot.position.set(x,y,z);const mesh=axis==='z'?box(pivot,w/2,0,0,w,h,.22,color):box(pivot,0,0,w/2,.22,h,w,color);pivot.userData.bbDoor=true;pivot.userData.open=false;pivot.userData.axis=axis;pivot.userData.lastUse=0;g.add(pivot);return pivot;}
function jumpPad(g,x,z,c=0x55c8ff,power=11,forward=2.4){const p=new THREE.Group();p.position.set(x,.08,z);const base=new THREE.Mesh(new THREE.CylinderGeometry(1.45,1.6,.25,24),mat(0x202b36));p.add(base);ring(p,0,.18,0,1.05,c);glow(p,0,.45,0,c,2.4,7);p.userData.bbJumpPad=true;p.userData.power=power;p.userData.forward=forward;p.userData.cooldown=new WeakMap();g.add(p);return p;}
function hazard(g,x,z,type='vent'){const h=new THREE.Group();h.position.set(x,0,z);h.userData.bbHazard=type;if(type==='vent'){cyl(h,0,.35,0,1,.7,0x4c5963);for(let i=0;i<5;i++){const b=box(h,0,.78,0,.18,.05,1.25,0x88939d);b.rotation.y=i*Math.PI/5;}glow(h,0,1,0,0x8be8ff,1.4,5);}else{box(h,0,.18,0,3,.18,1.8,0x302a35);for(let i=-1;i<=1;i++){const s=box(h,i*.85,.4,0,.5,.08,.9,0xa3355f,1,0x601535);s.rotation.z=i*.12;}glow(h,0,.6,0,0xff4d9b,2,7);}g.add(h);return h;}
function elevator(g,x,z){const e=new THREE.Group();e.position.set(x,0,z);box(e,0,.18,0,4.5,.35,4.5,0x394552);box(e,-2.1,1.2,0,.15,2.2,4.2,0x687580);box(e,2.1,1.2,0,.15,2.2,4.2,0x687580);const l=box(e,-.72,1.55,-2.2,1.4,3,.18,0x28333f),r=box(e,.72,1.55,-2.2,1.4,3,.18,0x28333f);e.userData.doors=[l,r];e.userData.riders=new WeakSet();e.userData.lastY=0;glow(e,0,2,-2,0x67d8ff,1.5,7);g.add(e);return e;}

function setupHaunted(s){const g=s.group;s.breakables=[glass(g,-9.48,2.3,-11,2.2,1.7,'x'),glass(g,-9.48,2.3,11,2.2,1.7,'x'),glass(g,27.48,2.35,-11,2.2,1.7,'x'),glass(g,27.48,2.35,11,2.2,1.7,'x'),glass(g,2.5,2.5,-16.48,2.4,1.7),glass(g,17.5,2.5,-16.48,2.4,1.7),glass(g,2.5,2.5,16.48,2.4,1.7),glass(g,18,2.5,16.48,2.4,1.7)];s.doors=[hingedDoor(g,-9.35,1.55,-1.2,2.4,3.1,'x',0x47382f),hingedDoor(g,8,1.55,16.35,2.2,3.1,'z',0x4a392f)];const fl=new THREE.Mesh(new THREE.TorusGeometry(1.05,.28,10,26),mat(0xff63ae));fl.position.set(14,.4,28);fl.rotation.x=Math.PI/2;g.add(fl);s.float=fl;s.floatBase=.4;s.pads=[jumpPad(g,37,14,0xb07aff,10.5,2)];s.hazards=[hazard(g,40,7,'shock')];}
function setupCity(s){const g=s.group;s.pads=[jumpPad(g,12,12,0x4be0ff,12,2.2),jumpPad(g,-28,14,0x8d7cff,13,1.8),jumpPad(g,30,-29,0xff65c2,12.5,1.8)];s.hazards=[hazard(g,30,-11,'vent'),hazard(g,7,39,'vent'),hazard(g,-27,1,'shock')];s.elevator=elevator(g,27,-34);s.breakables=[glass(g,26,2,-27.1,4,2.5),glass(g,35,2,-6.1,3.2,2.2),glass(g,7,2,31.1,4.5,2.3)];s.doors=[hingedDoor(g,33,1.55,-1.8,2.2,3.1,'z',0x27323d)];}
function setupHub(s){s.pads=[jumpPad(s.group,-8,38,0xffcf5a,9.5,1.8)];}
function ensure(scene){if(states.has(scene))return states.get(scene);const s={kind:kind(scene),group:new THREE.Group(),breakables:[],doors:[],pads:[],hazards:[],shards:[],impulses:new WeakMap(),lastHazard:new WeakMap(),lastPrompt:''};s.group.name='BB_INTERACTIVE_V7';scene.add(s.group);states.set(scene,s);if(s.kind==='haunted')setupHaunted(s);else if(s.kind==='city')setupCity(s);else if(s.kind==='hub')setupHub(s);return s;}

function nearestDoor(scene,s,max=2.9){const p=human(scene);if(!p)return null;let best=null,bestD=max;for(const d of s.doors){const wp=d.getWorldPosition(new THREE.Vector3()),dd=horizontal(p.mesh.position,wp);if(dd<bestD&&Math.abs(p.mesh.position.y-wp.y)<2.2){best=d;bestD=dd;}}return best;}
document.addEventListener('keydown',e=>{if(e.code!=='KeyE'||e.repeat||!activeScene)return;const s=states.get(activeScene);if(!s)return;const d=nearestDoor(activeScene,s);if(!d)return;const now=performance.now();if(now-d.userData.lastUse<320)return;d.userData.lastUse=now;d.userData.open=!d.userData.open;},true);
document.addEventListener('mousedown',e=>{if(e.button!==0||!activeScene||!activeCamera)return;if(document.pointerLockElement!==document.getElementById('gameCanvas'))return;if(weaponLabel()==='UNARMED')return;const s=states.get(activeScene);if(!s?.breakables.length)return;ray.setFromCamera(center,activeCamera);const hit=ray.intersectObjects(s.breakables.filter(o=>o.visible),false)[0];if(hit&&hit.distance<90)shatter(hit.object,s);},true);

function setImpulse(s,a,v){s.impulses.set(a,{v:v.clone(),until:performance.now()+650});}
function updateImpulses(scene,s,dt,now){for(const a of actors(scene)){const im=s.impulses.get(a);if(!im||now>im.until||a.dead)continue;a.mesh.position.x+=im.v.x*dt;a.mesh.position.z+=im.v.z*dt;im.v.multiplyScalar(Math.pow(.075,dt));}}
function updateDoors(s,dt){const blend=1-Math.pow(.0008,dt);for(const d of s.doors){const target=d.userData.open?Math.PI*.52:0;d.rotation.y=THREE.MathUtils.lerp(d.rotation.y,target,blend);}}
function updatePads(scene,s,now){for(const p of s.pads){p.rotation.y=Math.sin(now*.002)*.08;const wp=p.getWorldPosition(new THREE.Vector3());for(const a of actors(scene)){if(a.dead||!a.mesh)continue;const last=p.userData.cooldown.get(a)||0;if(horizontal(a.mesh.position,wp)<1.45&&Math.abs(a.mesh.position.y-wp.y)<1.1&&now>last){a.velocity.y=Math.max(a.velocity.y||0,p.userData.power);a.onGround=false;const f=new THREE.Vector3(Math.sin(a.mesh.rotation.y||0),0,Math.cos(a.mesh.rotation.y||0)).multiplyScalar(p.userData.forward);setImpulse(s,a,f);p.userData.cooldown.set(a,now+1350);}}}}
function updateHazards(scene,s,now){for(const h of s.hazards){h.rotation.y+=h.userData.bbHazard==='vent'?.018:.004;const wp=h.getWorldPosition(new THREE.Vector3());for(const a of actors(scene)){if(a.dead||!a.mesh)continue;const last=s.lastHazard.get(a)||0;if(horizontal(a.mesh.position,wp)>2||Math.abs(a.mesh.position.y-wp.y)>1.5||now<last)continue;s.lastHazard.set(a,now+1350);const push=a.mesh.position.clone().sub(wp).setY(0);if(push.lengthSq()<.01)push.set(1,0,0);push.normalize().multiplyScalar(h.userData.bbHazard==='vent'?4.5:3.2);setImpulse(s,a,push);a.velocity.y=Math.max(a.velocity.y,h.userData.bbHazard==='vent'?4.5:2.5);a.onGround=false;if(h.userData.bbHazard==='shock'&&typeof a.health==='number')a.health=Math.max(5,a.health-4);if(a===human(scene)){const df=damageFlash();if(df){df.classList.add('active');setTimeout(()=>df.classList.remove('active'),90);}}}}}
function updateElevator(scene,s,now){const e=s.elevator;if(!e)return;const phase=now*.00042;const newY=(Math.sin(phase-Math.PI/2)+1)*1.1;const dy=newY-e.userData.lastY;e.userData.lastY=newY;e.position.y=newY;const atStop=newY<.18||newY>2.02;const [l,r]=e.userData.doors;l.position.x=THREE.MathUtils.lerp(l.position.x,atStop?-1.35:-.72,.12);r.position.x=THREE.MathUtils.lerp(r.position.x,atStop?1.35:.72,.12);const wp=e.getWorldPosition(new THREE.Vector3());for(const a of actors(scene)){if(a.dead||!a.mesh)continue;const hd=horizontal(a.mesh.position,wp);if(newY<.3&&hd<1.9&&a.mesh.position.y<.55)e.userData.riders.add(a);if(e.userData.riders.has(a)){if(hd>2.25||a.velocity.y>2.2){e.userData.riders.delete(a);continue;}a.mesh.position.y=Math.max(0,newY+.36);a.velocity.y=0;a.onGround=true;}}}
function updateFloat(s,now){if(!s.float)return;s.float.position.y=s.floatBase+Math.sin(now*.003)*.16;s.float.rotation.z=Math.sin(now*.0023)*.12;s.float.rotation.y+=.0025;}
function updateShards(s,dt){for(let i=s.shards.length-1;i>=0;i--){const q=s.shards[i];q.life-=dt;q.v.y-=7*dt;q.m.position.addScaledVector(q.v,dt);q.m.rotation.x+=dt*5;q.m.rotation.y+=dt*4;q.m.material.opacity=Math.max(0,q.life);if(q.life<=0){s.group.remove(q.m);q.m.geometry.dispose();q.m.material.dispose();s.shards.splice(i,1);}}}
function updatePrompt(scene,s){const el=prompt();if(!el)return;const d=nearestDoor(scene,s);if(d){el.textContent=d.userData.open?'E — CLOSE DOOR':'E — OPEN DOOR';el.classList.remove('hidden');s.lastPrompt='door';}else if(s.lastPrompt==='door'){el.textContent='';el.classList.add('hidden');s.lastPrompt='';}}

THREE.WebGLRenderer.prototype.render=function(scene,camera){activeScene=scene;activeCamera=camera;const now=performance.now(),dt=Math.min((now-lastFrame)/1000,.04);lastFrame=now;const s=ensure(scene);updateDoors(s,dt);updateImpulses(scene,s,dt,now);updatePads(scene,s,now);updateHazards(scene,s,now);updateElevator(scene,s,now);updateFloat(s,now);updateShards(s,dt);updatePrompt(scene,s);return originalRender.call(this,scene,camera);};
window.__bbInteractiveV7={version:7};
