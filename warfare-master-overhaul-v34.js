import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* ==========================================================
   BLOODLINE BRAWL — WARFARE MASTER OVERHAUL V34
   Consolidated presentation / game-feel authority.

   V30/V32 remain authoritative for match rules + damage.
   V33 remains authoritative for modern body geometry.
   V34 owns the remaining cohesive layer:
   - HUD/readability
   - alive counter + local damage stat
   - character material / silhouette finishing
   - locomotion posture + landing/crouch/sprint feel
   - weapon stance/readability finishing
   - camera collision / shoulder presentation
   - map lighting/material identity + dense authored dressing
   - lightweight weapon audio hierarchy
   - legacy visual conflict suppression

   Warfare-only. No Classic Brawl globals are modified.
========================================================== */

const previousRender = THREE.WebGLRenderer.prototype.render;
const sceneMemory = new WeakMap();
const actorMemory = new WeakMap();
const keys = new Set();
const ray = new THREE.Raycaster();
let audioContext = null;

window.addEventListener('keydown',e=>keys.add(e.code),true);
window.addEventListener('keyup',e=>keys.delete(e.code),true);
window.addEventListener('blur',()=>keys.clear());

const $=id=>document.getElementById(id);
const now=()=>performance.now();
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

function actorFromObject(o){
  let n=o;
  while(n){if(n.userData?.actor)return n.userData.actor;n=n.parent;}
  return null;
}
function actors(scene){
  const out=[];
  scene?.traverse(o=>{const a=o.userData?.actor;if(a&&!out.includes(a))out.push(a);});
  return out;
}
function human(scene){return actors(scene).find(a=>!a.isBot)||null;}
function mapId(){
  const t=($('modeLabel')?.textContent||'').toUpperCase();
  if(t.includes('HAUNTED'))return 'haunted';
  if(t.includes('CITY')||t.includes('ROOFTOP'))return 'city';
  if(t.includes('WARFARE HUB'))return 'hub';
  return null;
}
function isBattle(){const m=mapId();return m==='haunted'||m==='city';}
function weapon(a){return a?.weapons?.[a.slot]||null;}

/* --------------------------- UI --------------------------- */
function injectUI(){
  if($('bbV34Style'))return;
  const style=document.createElement('style');style.id='bbV34Style';style.textContent=`
    :root{--bb-ui-bg:rgba(6,13,22,.82);--bb-ui-line:rgba(158,205,238,.28);--bb-yellow:#ffd52a;--bb-blue:#68c8ff}
    #hud .hud-top{gap:14px;align-items:flex-start;padding:14px 16px}
    #hud .hud-block,#hud .hud-center{backdrop-filter:blur(8px);background:linear-gradient(180deg,rgba(13,29,44,.88),rgba(6,14,23,.76));border:1px solid var(--bb-ui-line);box-shadow:0 8px 24px rgba(0,0,0,.22);border-radius:8px;padding:9px 12px}
    #hud .hud-block strong{font-size:15px;letter-spacing:.8px}#hud .hud-block span{opacity:.78;letter-spacing:1px}
    #hud .hud-center{min-width:128px;text-align:center}#matchTimer{font-weight:1000;font-size:21px;letter-spacing:1px}#placement{font-size:9px;letter-spacing:1.7px;color:#a8c9df}
    #bbV34Alive{position:fixed;left:50%;top:76px;transform:translateX(-50%);z-index:55;padding:6px 12px;border:1px solid rgba(255,255,255,.18);border-radius:999px;background:rgba(4,11,18,.76);box-shadow:0 6px 20px rgba(0,0,0,.25);color:#fff;font:900 11px/1 Arial,sans-serif;letter-spacing:1.5px;pointer-events:none}
    #bbV34Alive b{color:var(--bb-yellow);font-size:13px}
    .bottom-left{filter:drop-shadow(0 7px 15px rgba(0,0,0,.28))}.meter{border:1px solid rgba(255,255,255,.18)!important;background:rgba(4,9,14,.72)!important}
    .weapon-slot{backdrop-filter:blur(7px);background:rgba(7,16,25,.82)!important;border-color:rgba(146,197,230,.26)!important}.weapon-slot.active{box-shadow:0 0 0 2px rgba(255,213,42,.3),0 7px 18px rgba(0,0,0,.25)!important}
    .crosshair{filter:drop-shadow(0 1px 3px #000)}.crosshair span{box-shadow:0 0 4px rgba(255,255,255,.45)}
    #interactionPrompt{backdrop-filter:blur(8px);border:1px solid rgba(255,213,42,.45)!important;box-shadow:0 8px 24px rgba(0,0,0,.28)}
    #feed{max-width:340px}.feed-item{background:linear-gradient(90deg,rgba(5,13,21,.86),rgba(5,13,21,.25));border-left:3px solid rgba(104,200,255,.75);padding:5px 8px!important;text-shadow:0 1px 2px #000}
    #bbV34DamageDealt{position:fixed;left:18px;bottom:190px;z-index:54;color:#b8cad7;font:800 9px/1 Arial,sans-serif;letter-spacing:1px;text-shadow:0 2px 3px #000;pointer-events:none}#bbV34DamageDealt b{color:#fff;font-size:12px}
    .bb-v30-card{backdrop-filter:blur(12px)}.bb-v30-card .bb-v30-stats{grid-template-columns:repeat(4,1fr)!important}
    @media(max-width:650px){#bbV34Alive{top:65px}.bb-v30-card .bb-v30-stats{grid-template-columns:repeat(2,1fr)!important}#bbV34DamageDealt{display:none}}
  `;document.head.appendChild(style);
  const alive=document.createElement('div');alive.id='bbV34Alive';alive.innerHTML='<b>8</b> ALIVE';document.body.appendChild(alive);
  const dmg=document.createElement('div');dmg.id='bbV34DamageDealt';dmg.innerHTML='DAMAGE <b>0</b>';document.body.appendChild(dmg);
}
injectUI();

function updateHUD(scene,sm){
  const list=actors(scene),alive=list.filter(a=>!a.dead).length;
  const node=$('bbV34Alive');if(node){node.style.display=isBattle()?'block':'none';node.innerHTML=`<b>${alive}</b> ALIVE`;}
  const d=$('bbV34DamageDealt');if(d){d.style.display=isBattle()?'block':'none';d.innerHTML=`DAMAGE <b>${Math.round(sm.damageDealt||0)}</b>`;}
  const place=$('placement');if(place&&isBattle())place.textContent=`${alive} FIGHTER${alive===1?'':'S'} REMAINING`;
  const special=$('specialFill'),ultra=$('ultraFill'),p=human(scene);
  if(p&&special&&ultra){special.style.boxShadow=(p.special||0)>=99?'0 0 12px rgba(81,186,255,.9)':'none';ultra.style.boxShadow=(p.ultra||0)>=99?'0 0 15px rgba(255,213,42,.95)':'none';}
}

function patchResultStats(sm){
  const panels=[...document.querySelectorAll('.bb-v30-stats')];
  for(const p of panels){
    if(p.querySelector('[data-bb-v34-damage]'))continue;
    const item=document.createElement('div');item.className='bb-v30-stat';item.dataset.bbV34Damage='1';item.innerHTML=`<strong>${Math.round(sm.damageDealt||0)}</strong><span>DAMAGE DEALT</span>`;p.appendChild(item);
  }
}

/* ---------------------- scene dressing ---------------------- */
const mstd=(c,r=.65,m=.03,em=0)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:em,emissiveIntensity:em?0.25:0});
function addBox(g,x,y,z,w,h,d,c,r=.65,m=.03){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mstd(c,r,m));o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;g.add(o);return o;}
function addCyl(g,x,y,z,rt,rb,h,c,r=.6,m=.04,n=14){const o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,n),mstd(c,r,m));o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;g.add(o);return o;}
function neon(g,x,y,z,w,h,c){const o=addBox(g,x,y,z,w,h,.08,c,.28,.08);o.material.emissive.setHex(c);o.material.emissiveIntensity=.75;return o;}
function dressCity(scene){
  const g=new THREE.Group();g.name='BB_V34_CITY_DRESS';scene.add(g);
  // Rooftop utilities / cover clusters.
  for(const [x,z,s] of [[-27,18,1],[18,14,.9],[28,-22,1.15],[-12,-16,.85],[8,30,.95]]){
    addBox(g,x,.72,z,3.5*s,1.45,2.4*s,0x45515b,.82,.18);addBox(g,x,.76,z,2.9*s,1.1,2.45*s,0x5d6871,.68,.22);
    for(let i=-1;i<=1;i++)addBox(g,x+i*.65*s,1.36,z+1.26*s,.34,.17,.16,0x202a32,.5,.45);
  }
  // vents
  for(const [x,z] of [[-5,11],[13,-20],[31,8],[-29,-8],[0,-29]]){addCyl(g,x,.6,z,.38,.46,1.2,0x58646e,.55,.32,16);addCyl(g,x,1.22,z,.54,.34,.18,0x78838b,.5,.36,16);}
  // water tower silhouette
  const tower=new THREE.Group();tower.position.set(-25,0,-25);g.add(tower);for(const x of [-1.25,1.25])for(const z of [-1.25,1.25]){const leg=addCyl(tower,x,2.3,z,.08,.11,4.6,0x3a4248,.5,.45,10);leg.rotation.z=(x+z)*.012;}addCyl(tower,0,5.15,0,2.0,1.72,2.2,0x5a4a3e,.78,.08,20);addCyl(tower,0,6.35,0,2.04,2.04,.18,0x373d42,.5,.4,20);
  // satellite dishes
  for(const [x,z,r] of [[23,20,.25],[-19,24,-.5]]){const stem=addCyl(g,x,1.2,z,.07,.08,2.4,0x4f5962,.5,.45,10);const dish=new THREE.Mesh(new THREE.SphereGeometry(.95,18,10,0,Math.PI*2,0,.52),mstd(0x7b8790,.48,.35));dish.scale.z=.22;dish.rotation.x=-.85;dish.rotation.z=r;dish.position.set(x,2.2,z);g.add(dish);}
  // distant skyline, non-colliding visual mass
  for(let i=0;i<42;i++){
    const ang=(i/42)*Math.PI*2,rad=78+Math.sin(i*3.7)*14,h=13+(i*13%28),w=5+(i%4)*1.3,x=Math.cos(ang)*rad,z=Math.sin(ang)*rad;
    const b=addBox(g,x,h/2-1,z,w,h,w*.78,0x172334,.84,.04);b.castShadow=false;
    if(i%3===0){for(let y=3;y<h-2;y+=4)neon(g,x,y,z-(w*.4+.05),w*.55,.18,i%2?0x5aaeff:0xffbd67);}
  }
  // signage and warm/cool pools
  neon(g,15,4.5,-35,7,.65,0x5fc8ff);neon(g,-31,3.8,12,5,.5,0xff6e9c);
  for(const [x,z,c] of [[15,-35,0x5fc8ff],[-31,12,0xff6e9c],[29,25,0xffbc63]]){const l=new THREE.PointLight(c,4.2,18,2);l.position.set(x,4,z);g.add(l);}
}
function dressHaunted(scene){
  const g=new THREE.Group();g.name='BB_V34_HAUNTED_DRESS';scene.add(g);
  // boardwalk strips / fences / driftwood / rocks
  for(let z=-42;z<=42;z+=6){addBox(g,-24,.08,z,7,.12,.18,0x6e543c,.88,.01);}
  for(let z=-40;z<=40;z+=8){addBox(g,-14,.55,z,.12,1.1,.12,0x564437,.86,.01);addBox(g,-14,.9,z+4,.12,.12,8,0x564437,.86,.01);}
  for(const [x,z,r] of [[-29,-31,.4],[-31,17,-.7],[-26,34,.9],[-34,-8,-.3]]){const log=addCyl(g,x,.28,z,.14,.19,2.8,0x67503d,.9,.01,10);log.rotation.z=Math.PI/2;log.rotation.y=r;}
  for(const [x,z,s] of [[-20,-25,.7],[-18,21,.5],[-7,-34,.65],[4,35,.5],[32,-31,.55]]){const rock=new THREE.Mesh(new THREE.DodecahedronGeometry(s,0),mstd(0x4f5960,.94,.01));rock.position.set(x,s*.45,z);rock.scale.y=.65;rock.castShadow=true;g.add(rock);}
  // moon + moonlight
  const moon=new THREE.Mesh(new THREE.SphereGeometry(4.2,24,18),new THREE.MeshBasicMaterial({color:0xdbe8ff}));moon.position.set(-52,34,-78);g.add(moon);
  const ml=new THREE.DirectionalLight(0x9fc5ff,.75);ml.position.set(-45,38,-28);g.add(ml);
  // warm path lanterns
  for(const [x,z] of [[-8,-29],[-8,-15],[-8,0],[-8,15],[-8,29],[18,-25],[18,26]]){addCyl(g,x,1.25,z,.06,.08,2.5,0x31383e,.55,.35,10);const lamp=new THREE.PointLight(0xffbd72,2.8,11,2);lamp.position.set(x,2.5,z);g.add(lamp);const bulb=new THREE.Mesh(new THREE.SphereGeometry(.16,10,8),new THREE.MeshBasicMaterial({color:0xffd49a}));bulb.position.copy(lamp.position);g.add(bulb);}
}
function enhanceWorldMaterials(scene,map){
  scene.traverse(o=>{
    if(!o.isMesh||actorFromObject(o)||o.name?.startsWith('BB_V'))return;
    const mat=o.material;if(!mat||Array.isArray(mat)||!mat.isMeshStandardMaterial)return;
    mat.envMapIntensity=.55;
    if(map==='city'){mat.roughness=clamp(mat.roughness*.92,.32,.9);mat.metalness=clamp(mat.metalness*1.12,0,.58);}
    if(map==='haunted'){mat.roughness=clamp(mat.roughness*1.04,.48,.96);}
  });
}
function setupScene(scene,renderer,map){
  if(sceneMemory.has(scene))return sceneMemory.get(scene);
  const sm={map,damageDealt:0,lastPlayerAmmo:null,lastPlayerMelee:0,lastHealth:new WeakMap(),lastY:0,landAt:0,decorated:false,lastShotAt:0};sceneMemory.set(scene,sm);
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=map==='haunted'?1.05:1.12;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  if(map==='city'){scene.fog=new THREE.FogExp2(0x101a2d,.0095);dressCity(scene);}
  if(map==='haunted'){scene.fog=new THREE.FogExp2(0x07111f,.012);dressHaunted(scene);}
  enhanceWorldMaterials(scene,map);sm.decorated=true;return sm;
}

/* ---------------- character / animation finishing ---------------- */
function mem(a){let m=actorMemory.get(a);if(!m){m={lastPos:a.mesh.position.clone(),speed:0,lastY:a.mesh.position.y||0,landAt:0,lastAmmo:null,lastType:null};actorMemory.set(a,m);}return m;}
function suppressLegacy(a){
  a.mesh.children.forEach(ch=>{if(['BB_CHARACTER_DETAIL_V8','BB_CLASSIC_IDENTITY_V24','BB_CHARACTER_APPEARANCE_V22','BB_HAIR_UPGRADE_V23'].includes(ch.name))ch.visible=false;});
  a.mesh.traverse(o=>{if((o.name==='BB_HELD_GUN'||o.name==='BB_V30_HELD_GUN')&&!o.name.includes('V32'))o.visible=false;});
}
function finishBody(a,dt){
  suppressLegacy(a);const rig=a.mesh.getObjectByName('BB_V33_MODERN_BODY');if(!rig)return;
  const m=mem(a),p=a.mesh.position,dist=Math.hypot(p.x-m.lastPos.x,p.z-m.lastPos.z),raw=dt>0?dist/dt:0;m.speed=THREE.MathUtils.lerp(m.speed,raw,.18);m.lastPos.copy(p);
  const sprint=!a.isBot&&(keys.has('ShiftLeft')||keys.has('ShiftRight'))&&m.speed>4.5;
  const crouch=!a.isBot&&(keys.has('KeyX')||keys.has('ControlLeft')||keys.has('ControlRight'));
  const sliding=!a.isBot&&keys.has('KeyC')&&m.speed>4;
  const airborne=(p.y||0)>.08;
  if(m.lastY>.10&&(p.y||0)<=.04)m.landAt=now();m.lastY=p.y||0;
  let pitch=0,y=0,scaleY=rig.scale.y;
  if(sprint)pitch=-.075;if(sliding){pitch=-.22;y=-.24;}else if(crouch){pitch=-.05;y=-.18;scaleY=Math.min(scaleY,.90);}if(airborne)pitch=.045;
  const landAge=now()-m.landAt;if(landAge<170){const k=Math.sin((landAge/170)*Math.PI);y-=k*.13;scaleY-=k*.045;}
  rig.rotation.x=THREE.MathUtils.lerp(rig.rotation.x,pitch,.18);rig.position.y=THREE.MathUtils.lerp(rig.position.y,y,.20);rig.scale.y=THREE.MathUtils.lerp(rig.scale.y,scaleY,.14);
  // finish modern body materials with stronger stylized response
  if(!rig.userData.bbV34Mat){rig.userData.bbV34Mat=true;rig.traverse(o=>{if(!o.isMesh||!o.material||Array.isArray(o.material))return;o.material.roughness=clamp(o.material.roughness??.6,.38,.78);o.material.envMapIntensity=.72;o.material.needsUpdate=true;});}
}
function finishWeapon(a){
  const rig=a.mesh.getObjectByName('BB_V32_WEAPON_RIG');const w=weapon(a);if(!rig)return;
  rig.visible=!!w&&!a.dead;if(!w)return;
  rig.position.y=THREE.MathUtils.lerp(rig.position.y,.035,.22);rig.position.z=THREE.MathUtils.lerp(rig.position.z,.035,.22);
  const model=rig.getObjectByName('BB_V32_GUN_MODEL');if(model&&!model.userData.bbV34){model.userData.bbV34=true;model.traverse(o=>{if(o.isMesh&&o.material&&!Array.isArray(o.material)){o.material.roughness=clamp(o.material.roughness??.5,.25,.62);o.material.metalness=clamp((o.material.metalness??.15)*1.25,.08,.72);o.material.needsUpdate=true;}});}
}

/* ---------------- damage stat + audio ---------------- */
function weaponAudio(type,volume=.06){
  try{
    audioContext=audioContext||new (window.AudioContext||window.webkitAudioContext)();if(audioContext.state==='suspended')audioContext.resume();
    const t=audioContext.currentTime,o=audioContext.createOscillator(),gain=audioContext.createGain(),filter=audioContext.createBiquadFilter();
    const map={pistol:[155,'square',.055],smg:[190,'square',.035],rifle:[120,'sawtooth',.055],shotgun:[72,'square',.095],sniper:[58,'sawtooth',.12],lmg:[96,'square',.06],launcher:[48,'sawtooth',.14]};const [hz,wave,len]=map[type]||map.rifle;
    o.type=wave;o.frequency.setValueAtTime(hz,t);o.frequency.exponentialRampToValueAtTime(Math.max(32,hz*.55),t+len);filter.type='lowpass';filter.frequency.value=type==='sniper'?1700:1100;gain.gain.setValueAtTime(volume,t);gain.gain.exponentialRampToValueAtTime(.0001,t+len);o.connect(filter).connect(gain).connect(audioContext.destination);o.start(t);o.stop(t+len+.01);
  }catch(_){ }
}
function trackCombat(scene,sm){
  const list=actors(scene),p=human(scene);if(!p)return;
  const w=weapon(p),ammo=w?.ammo??null;
  if(ammo!==null&&sm.lastPlayerAmmo!==null&&ammo<sm.lastPlayerAmmo){sm.lastShotAt=now();weaponAudio(w.type,.075);}
  sm.lastPlayerAmmo=ammo;
  if((p.lastMelee||0)!==sm.lastPlayerMelee){sm.lastPlayerMelee=p.lastMelee||0;sm.lastShotAt=now();}
  for(const a of list){
    if(a===p)continue;const prev=sm.lastHealth.has(a)?sm.lastHealth.get(a):(a.health??100),cur=a.health??0;
    if(cur<prev&&now()-sm.lastShotAt<240)sm.damageDealt+=Math.max(0,prev-cur);
    sm.lastHealth.set(a,cur);
    const am=mem(a),aw=weapon(a),aa=aw?.ammo??null;if(aa!==null&&am.lastAmmo!==null&&aa<am.lastAmmo)weaponAudio(aw.type,.018);am.lastAmmo=aa;
  }
}

/* ---------------- camera collision / presentation ---------------- */
function worldCandidates(scene){
  const out=[];scene.traverse(o=>{if(!o.isMesh||!o.visible||actorFromObject(o)||o.name?.startsWith('BB_V34_'))return;if(o.material?.transparent&&o.material.opacity<.35)return;out.push(o);});return out;
}
function cameraPolish(scene,camera){
  if(!isBattle())return;const p=human(scene);if(!p||p.dead)return;
  const target=p.mesh.position.clone().add(new THREE.Vector3(0,1.65,0)),delta=camera.position.clone().sub(target),desired=delta.length();if(desired<.4)return;
  const dir=delta.normalize();ray.set(target,dir);ray.far=desired;const hit=ray.intersectObjects(worldCandidates(scene),false)[0];if(hit&&hit.distance<desired-.18){camera.position.copy(target).addScaledVector(dir,Math.max(.85,hit.distance-.22));}
  const sprint=keys.has('ShiftLeft')||keys.has('ShiftRight'),ads=document.getElementById('adsLabel')?.textContent?.toUpperCase().includes('AIM');const targetFov=ads?54:sprint?71:67;camera.fov=THREE.MathUtils.lerp(camera.fov,targetFov,.10);camera.updateProjectionMatrix();
}

/* ---------------- main ---------------- */
THREE.WebGLRenderer.prototype.render=function(scene,camera){
  try{
    const map=mapId();
    if(map){const sm=setupScene(scene,this,map);const dt=Math.min(.05,this.info?.render?.frame?1/60:1/60);for(const a of actors(scene)){finishBody(a,dt);finishWeapon(a);}if(isBattle()){trackCombat(scene,sm);cameraPolish(scene,camera);updateHUD(scene,sm);patchResultStats(sm);}else{const alive=$('bbV34Alive'),d=$('bbV34DamageDealt');if(alive)alive.style.display='none';if(d)d.style.display='none';}}
  }catch(err){console.warn('Warfare master overhaul V34:',err);}
  return previousRender.call(this,scene,camera);
};

window.__bbWarfareMasterV34={version:34,authorities:['hud','map-presentation','camera','animation-finishing','weapon-finishing','audio','legacy-visual-suppression']};
