import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE COMBAT HARDFIX V32
   Final Warfare-only correction for the live 3D mode.
   Fixes the practical issues exposed after V30/V31:
   - V31's accidental 999-second spawn protection is neutralized
   - guaranteed 20-second move/loot grace countdown
   - combat becomes live immediately at FIGHT
   - far, deliberate opening spawns
   - visible guns held at chest/shoulder height instead of hip lasers
   - two-hand weapon pose with independent aim direction
   - tracer origins corrected to the visible gun muzzle
   - Classic Brawl melee props are always readable while unarmed
   - floating Fortnite/Krunker-style outgoing damage numbers
   - brighter muzzle feedback / recoil
   - bot anti-stuck nudges
   - rooftop human visibility hardened
   This module is additive and only runs on Warfare match scenes.
*/

const previousRender = THREE.WebGLRenderer.prototype.render;
const previousSceneAdd = THREE.Scene.prototype.add;
const sceneState = new WeakMap();
const actorState = new WeakMap();
const traceAmmo = new WeakMap();

const GRACE_MS = 20000;
const ROUND_MS = 300000;
const SAFE_SPAWNS = {
  haunted: [
    [-12,-47],[43,45],[44,-43],[-12,45],
    [18,8],[38,10],[1,32],[4,-32]
  ],
  city: [
    [-34,8],[34,-5],[7,36],[-20,-30],
    [34,28],[27,-34],[-30,28],[4,-34]
  ]
};
const GUN_COLOR = {
  pistol:0xb9c1cc, smg:0x4f83cc, rifle:0x5bb56b,
  shotgun:0xcf8a42, lmg:0x9270cf, sniper:0x5cc7ce,
  launcher:0xd55757
};

const mat=(color,rough=.46,metal=.24)=>new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal});

function now(){ return performance.now(); }
function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }
function mapId(){
  const label=(document.getElementById('modeLabel')?.textContent||'').toUpperCase();
  if(label.includes('HAUNTED')) return 'haunted';
  if(label.includes('CITY')||label.includes('ROOFTOP')) return 'city';
  return null;
}
function actors(scene){
  const out=[];
  scene?.traverse(o=>{
    const a=o.userData?.actor;
    if(a&&!out.includes(a)) out.push(a);
  });
  return out;
}
function player(scene){ return actors(scene).find(a=>!a.isBot)||null; }
function currentWeapon(a){ return a?.weapons?.[a.slot]||null; }
function isMatch(scene){ return !!mapId() && actors(scene).length>1; }
function normalizeAngle(a){
  while(a>Math.PI)a-=Math.PI*2;
  while(a<-Math.PI)a+=Math.PI*2;
  return a;
}
function actorMem(a){
  let m=actorState.get(a);
  if(!m){
    m={
      lastAmmo:null,lastType:null,lastHealth:a.health??100,lastMelee:a.lastMelee||0,
      shotAt:0,swingAt:0,recoil:0,lastMovePos:a.mesh.position.clone(),lastMoveAt:now(),
      gunRig:null,gunType:null,meleeRig:null,baseArmMaterials:[],lastPlayerAttackAt:0
    };
    actorState.set(a,m);
  }
  return m;
}

function addBox(g,x,y,z,w,h,d,color,rough=.46,metal=.24){
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(color,rough,metal));
  mesh.position.set(x,y,z);mesh.castShadow=true;g.add(mesh);return mesh;
}
function addCylinder(g,x,y,z,r,h,color,rough=.55,metal=.12){
  const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,12),mat(color,rough,metal));
  mesh.position.set(x,y,z);mesh.castShadow=true;g.add(mesh);return mesh;
}
function addSphere(g,x,y,z,r,color){
  const mesh=new THREE.Mesh(new THREE.SphereGeometry(r,12,8),mat(color,.62,.04));
  mesh.position.set(x,y,z);mesh.castShadow=true;g.add(mesh);return mesh;
}

/* ------------------------------------------------------
   20-second opening flow + far spawns
------------------------------------------------------ */
function stateFor(scene){
  let s=sceneState.get(scene);
  if(!s){
    s={start:now(),spawned:false,fightShown:false,playerAttackAt:0};
    sceneState.set(scene,s);
  }
  return s;
}
function countdownNode(){
  let e=document.getElementById('bbWarfareGrace');
  if(!e){
    e=document.createElement('div');e.id='bbWarfareGrace';document.body.appendChild(e);
  }
  e.dataset.bbV32='1';
  e.style.zIndex='300';
  e.style.display='block';
  return e;
}
function spreadSpawns(scene,s){
  if(s.spawned)return;
  const map=mapId(),pts=SAFE_SPAWNS[map],list=actors(scene),p=list.find(a=>!a.isBot);
  if(!pts||!p)return;
  const ordered=[p,...list.filter(a=>a!==p)];
  ordered.forEach((a,i)=>{
    const q=pts[i%pts.length];
    a.mesh.position.set(q[0],0,q[1]);
    a.velocity?.set?.(0,0,0);
    a.mesh.visible=true;
    /* V31 mistakenly injects 999 seconds. Replace, do not Math.max. */
    a.spawnProtection=1.25;
    a.lastShot=now()+350;
    a.lastMelee=now()+350;
  });
  s.spawned=true;
}
function updateOpening(scene,s){
  const t=now(),elapsed=t-s.start,left=GRACE_MS-elapsed,list=actors(scene);
  document.getElementById('matchIntro')?.classList.add('hidden');
  const timer=document.getElementById('matchTimer');

  if(left>0){
    const e=countdownNode();
    e.classList.remove('fight');
    e.innerHTML=`<div class="label">GET READY</div><div class="count">${Math.max(1,Math.ceil(left/1000))}</div><div class="note">MOVE • LOOT • SPREAD OUT • NO DAMAGE YET</div>`;
    for(const a of list){
      /* Maintain only short frame-to-frame protection. V30 also blocks firing.
         This removes V31's 999-second invulnerability while keeping grace safe. */
      a.spawnProtection=1.25;
      if(a.isBot)a.lastShot=t+350;
      a.lastMelee=t+350;
    }
    if(timer)timer.textContent='5:00';
  }else{
    /* Combat is live the instant FIGHT appears. */
    for(const a of list){ if(!a.dead) a.spawnProtection=0; }
    if(!s.fightShown){
      s.fightShown=true;
      const e=countdownNode();e.classList.add('fight');
      e.innerHTML='<div class="label">WARFARE</div><div class="count">FIGHT!</div><div class="note">WEAPONS + MELEE LIVE</div>';
      setTimeout(()=>{const n=document.getElementById('bbWarfareGrace');if(n?.dataset.bbV32==='1')n.remove();},1050);
    }
    if(timer){
      const rem=Math.max(0,ROUND_MS-(elapsed-GRACE_MS));
      const sec=Math.ceil(rem/1000);timer.textContent=`${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`;
    }
  }
}

/* ------------------------------------------------------
   weapon rig — guns visibly held in hands
------------------------------------------------------ */
function weaponDimensions(type){
  if(type==='pistol')return {len:.82,body:.50,barrel:.34,scale:.90};
  if(type==='smg')return {len:1.20,body:.74,barrel:.55,scale:1};
  if(type==='shotgun')return {len:1.62,body:.84,barrel:.90,scale:1};
  if(type==='sniper')return {len:1.82,body:.92,barrel:1.04,scale:1};
  if(type==='launcher')return {len:1.55,body:.88,barrel:.88,scale:1.08};
  if(type==='lmg')return {len:1.48,body:.92,barrel:.72,scale:1.04};
  return {len:1.48,body:.84,barrel:.78,scale:1};
}
function makeGunModel(type){
  const g=new THREE.Group();g.name='BB_V32_GUN_MODEL';
  const d=weaponDimensions(type),c=GUN_COLOR[type]||0xaab2b9,dark=0x20262c;
  if(type==='launcher'){
    const tube=new THREE.Mesh(new THREE.CylinderGeometry(.17,.20,d.len,14),mat(c,.34,.45));
    tube.rotation.x=Math.PI/2;tube.position.z=d.len*.35;g.add(tube);
    addBox(g,0,-.23,.12,.25,.43,.25,dark,.48,.4);
  }else{
    addBox(g,0,0,.30,.30,.28,d.body,c,.34,.5);
    addBox(g,0,.01,.30+d.body*.5+d.barrel*.5,.13,.13,d.barrel,dark,.28,.7);
    const grip=addBox(g,.02,-.25,.16,.22,.43,.23,dark,.58,.3);grip.rotation.x=-.18;
    if(type==='shotgun')addBox(g,0,-.09,.42,.34,.16,.62,0x7e5232,.72,.05);
    if(type==='lmg')addBox(g,0,-.31,.33,.42,.42,.34,c,.42,.42);
    if(type==='sniper'){
      const scope=new THREE.Mesh(new THREE.CylinderGeometry(.085,.085,.48,10),mat(0x181d22,.26,.68));
      scope.rotation.x=Math.PI/2;scope.position.set(0,.22,.36);g.add(scope);
    }
  }
  const muzzle=new THREE.Object3D();muzzle.name='BB_V32_MUZZLE';muzzle.position.set(0,.01,d.len+.08);g.add(muzzle);
  g.scale.setScalar(d.scale);return g;
}
function skinColor(a){
  const arms=a.mesh.userData.parts?.arms;
  const c=arms?.children?.[0]?.material?.color;
  return c?.isColor?c.getHex():0xefc3a3;
}
function makeWeaponRig(a,type){
  const rig=new THREE.Group();rig.name='BB_V32_WEAPON_RIG';
  const skin=skinColor(a),armMat=mat(skin,.72,.02);
  const left=new THREE.Mesh(new THREE.BoxGeometry(.22,.22,.92),armMat.clone());
  const right=new THREE.Mesh(new THREE.BoxGeometry(.22,.22,.92),armMat.clone());
  left.position.set(-.38,1.56,.43);right.position.set(.38,1.56,.43);
  left.rotation.y=-.20;right.rotation.y=.20;left.castShadow=right.castShadow=true;
  rig.add(left,right);
  addSphere(rig,-.18,1.53,.84,.13,skin);addSphere(rig,.22,1.53,.84,.13,skin);
  const gun=makeGunModel(type);gun.position.set(.14,1.55,.72);rig.add(gun);
  rig.userData.gun=gun;rig.userData.leftArm=left;rig.userData.rightArm=right;
  a.mesh.add(rig);return rig;
}
function setBaseArms(a,show){
  const arms=a.mesh.userData.parts?.arms;
  if(!arms)return;
  arms.visible=true;
  arms.children?.forEach(mesh=>{
    if(!mesh.isMesh||!mesh.material)return;
    if(mesh.userData.bbV32OrigOpacity===undefined){
      mesh.userData.bbV32OrigOpacity=mesh.material.opacity??1;
      mesh.userData.bbV32OrigTransparent=!!mesh.material.transparent;
    }
    mesh.material.transparent=show?mesh.userData.bbV32OrigTransparent:true;
    mesh.material.opacity=show?mesh.userData.bbV32OrigOpacity:0;
    mesh.material.needsUpdate=true;
  });
}
function hideLegacyWeaponMeshes(a){
  a.mesh.traverse(o=>{
    if(o.name!=='BB_HELD_GUN'&&o.name!=='BB_V30_HELD_GUN')return;
    o.traverse(m=>{
      if(!m.isMesh||!m.material)return;
      m.material.transparent=true;m.material.opacity=0;m.material.depthWrite=false;m.material.needsUpdate=true;
    });
  });
}
function desiredAimYaw(a,camera){
  let dir=null;
  if(!a.isBot&&camera){
    dir=new THREE.Vector3(0,0,-1).applyQuaternion(camera.quaternion);dir.y=0;
  }else if(a.target?.mesh){dir=a.target.mesh.position.clone().sub(a.mesh.position);dir.y=0;}
  if(!dir||dir.lengthSq()<.001)return 0;
  dir.normalize();const world=Math.atan2(dir.x,dir.z);
  return clamp(normalizeAngle(world-a.mesh.rotation.y),-1.15,1.15);
}
function muzzleWorld(a){
  const rig=actorMem(a).gunRig,m=rig?.getObjectByName('BB_V32_MUZZLE');
  if(!m)return null;const p=new THREE.Vector3();m.getWorldPosition(p);return p;
}
function muzzleBurst(scene,a){
  const p=muzzleWorld(a);if(!p)return;
  const flash=new THREE.Mesh(new THREE.SphereGeometry(.16,8,6),new THREE.MeshBasicMaterial({color:0xffe7a0,transparent:true,opacity:.98,depthTest:false}));
  flash.position.copy(p);flash.renderOrder=3000;scene.add(flash);
  const light=new THREE.PointLight(0xffc467,7,8,2);light.position.copy(p);scene.add(light);
  setTimeout(()=>{flash.removeFromParent();light.removeFromParent();flash.geometry.dispose();flash.material.dispose();},70);
}
function updateWeaponRig(scene,camera,a){
  const m=actorMem(a),w=currentWeapon(a),type=w?.type||null;
  hideLegacyWeaponMeshes(a);
  if(!type||a.dead){
    if(m.gunRig)m.gunRig.visible=false;
    setBaseArms(a,true);
    return;
  }
  setBaseArms(a,false);
  if(!m.gunRig||m.gunType!==type){
    m.gunRig?.removeFromParent();m.gunRig=makeWeaponRig(a,type);m.gunType=type;
  }
  m.gunRig.visible=true;
  m.gunRig.rotation.y=desiredAimYaw(a,camera);
  m.recoil=Math.max(0,m.recoil-.16);
  const gun=m.gunRig.userData.gun;
  if(gun){gun.position.z=.72-m.recoil*.14;gun.rotation.x=-m.recoil*.10;}
  const ammo=w.ammo??0;
  if(m.lastAmmo!==null&&m.lastType===type&&ammo<m.lastAmmo){
    m.recoil=1;m.shotAt=now();muzzleBurst(scene,a);
  }
  m.lastAmmo=ammo;m.lastType=type;
}

/* ------------------------------------------------------
   Classic melee props + readable swing
------------------------------------------------------ */
function makeMeleeProp(charId){
  const pivot=new THREE.Group();pivot.name='BB_V32_MELEE_RIG';pivot.position.set(.58,1.72,.10);
  const g=new THREE.Group();g.position.set(0,-.37,.12);pivot.add(g);
  if(charId==='sean'){
    const cone=new THREE.Mesh(new THREE.ConeGeometry(.13,.46,12),mat(0xd6a05a,.9,.02));cone.position.y=.05;cone.rotation.z=Math.PI;g.add(cone);
    addSphere(g,0,.33,0,.16,0xf3d7ad);addSphere(g,-.07,.42,.01,.105,0xf5b6c8);addSphere(g,.07,.43,-.01,.10,0xf7efe2);
  }else if(charId==='shannan'){
    const barrel=addCylinder(g,0,.08,0,.075,.58,0xdff8ff,.28,.05);barrel.material.transparent=true;barrel.material.opacity=.88;
    addBox(g,0,-.23,0,.26,.06,.11,0x758f9c,.45,.2);addCylinder(g,0,.54,0,.014,.42,0xc8cbd0,.25,.7);
  }else if(charId==='erin'){
    addCylinder(g,0,.02,0,.05,.66,0xe58aa5,.64,.02);addBox(g,0,.45,0,.25,.34,.13,0xe58aa5,.62,.02);
    for(let x=-.08;x<=.08;x+=.08)for(let y=.34;y<=.56;y+=.10)addCylinder(g,x,y,.09,.013,.10,0x25282c,.65,.05);
  }else if(charId==='connor'){
    addCylinder(g,0,.03,0,.05,.74,0x7b4b2a,.72,.02);addBox(g,0,.50,0,.24,.19,.11,0xd9d0b2,.7,.02);addBox(g,0,.61,.01,.22,.09,.12,0x3ba6d8,.5,.05);
  }else if(charId==='kelly'){
    addCylinder(g,0,.05,0,.05,.92,0x8a6239,.72,.02);const blade=new THREE.Mesh(new THREE.ConeGeometry(.20,.40,5),mat(0x8c959b,.42,.58));blade.position.y=.68;blade.rotation.z=Math.PI;blade.scale.z=.45;g.add(blade);
  }else{
    /* Liam's Classic melee is Shoulder Check, so there is intentionally no held prop. */
    pivot.visible=false;
  }
  return pivot;
}
function hideLegacyMelee(a){
  a.mesh.traverse(o=>{
    if(o.name!=='BB_CLASSIC_MELEE')return;
    o.traverse(m=>{if(m.isMesh&&m.material){m.material.transparent=true;m.material.opacity=0;m.material.needsUpdate=true;}});
  });
}
function updateMelee(a){
  const m=actorMem(a),armed=!!currentWeapon(a);
  hideLegacyMelee(a);
  if(armed||a.dead){if(m.meleeRig)m.meleeRig.visible=false;return;}
  if(!m.meleeRig){m.meleeRig=makeMeleeProp(a.charId);a.mesh.add(m.meleeRig);}
  if(a.charId!=='liam')m.meleeRig.visible=true;
  const lm=a.lastMelee||0;
  if(lm!==m.lastMelee){m.lastMelee=lm;m.swingAt=now();}
  const t=clamp((now()-(m.swingAt||0))/420,0,1),arc=Math.sin(t*Math.PI);
  if(m.meleeRig){m.meleeRig.rotation.x=-arc*1.05;m.meleeRig.rotation.z=-.22-arc*.62;}
}

/* ------------------------------------------------------
   tracer origin correction — no more hip lasers
------------------------------------------------------ */
function likelyShooter(scene){
  let best=null,bestDrop=0;
  for(const a of actors(scene)){
    const w=currentWeapon(a);if(!w)continue;
    const ammo=w.ammo??0,old=traceAmmo.get(a);
    if(old!==undefined&&old-ammo>bestDrop){bestDrop=old-ammo;best=a;}
  }
  return best;
}
THREE.Scene.prototype.add=function(...objects){
  const result=previousSceneAdd.apply(this,objects);
  if(isMatch(this)){
    const shooter=likelyShooter(this),origin=shooter?muzzleWorld(shooter):null;
    if(origin){
      for(const o of objects){
        if(!o?.isLine||!o.geometry?.attributes?.position)continue;
        const pos=o.geometry.attributes.position;
        if(pos.count<2)continue;
        pos.setXYZ(0,origin.x,origin.y,origin.z);pos.needsUpdate=true;
        o.renderOrder=2500;
        if(o.material){o.material.opacity=1;o.material.transparent=true;o.material.depthTest=false;o.material.needsUpdate=true;}
      }
    }
  }
  return result;
};

/* ------------------------------------------------------
   outgoing damage numbers
------------------------------------------------------ */
function damageSprite(scene,victim,amount){
  if(amount<=0)return;
  const cv=document.createElement('canvas');cv.width=256;cv.height=128;const ctx=cv.getContext('2d');
  ctx.clearRect(0,0,256,128);ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='1000 68px Arial';ctx.lineWidth=12;ctx.strokeStyle='rgba(0,0,0,.92)';ctx.strokeText(String(Math.max(1,Math.round(amount))),128,62);ctx.fillStyle='#ffd84a';ctx.fillText(String(Math.max(1,Math.round(amount))),128,62);
  const tex=new THREE.CanvasTexture(cv);tex.colorSpace=THREE.SRGBColorSpace;
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:false,depthWrite:false}));
  sp.position.copy(victim.mesh.position).add(new THREE.Vector3((Math.random()-.5)*.45,2.95,(Math.random()-.5)*.25));sp.scale.set(1.7,.85,1);sp.renderOrder=4000;scene.add(sp);
  const start=now(),base=sp.position.y;
  const tick=()=>{const p=(now()-start)/720;if(p>=1){sp.removeFromParent();sp.material.dispose();tex.dispose();return;}sp.position.y=base+p*.9;sp.position.x+=.003;sp.material.opacity=1-p;requestAnimationFrame(tick);};requestAnimationFrame(tick);
}
function updateDamageNumbers(scene,s){
  const list=actors(scene),p=list.find(a=>!a.isBot);if(!p)return;
  const pm=actorMem(p),w=currentWeapon(p),ammo=w?.ammo??null,lm=p.lastMelee||0;
  let attacked=false;
  if(ammo!==null&&pm._damageAmmo!==undefined&&ammo<pm._damageAmmo)attacked=true;
  if(lm!==pm._damageMelee&&pm._damageMelee!==undefined)attacked=true;
  if(attacked)s.playerAttackAt=now();
  pm._damageAmmo=ammo;pm._damageMelee=lm;
  for(const a of list){
    const m=actorMem(a),hp=a.health??0;
    if(m.lastHealth===undefined)m.lastHealth=hp;
    const lost=m.lastHealth-hp;
    if(a!==p&&lost>.01&&now()-s.playerAttackAt<420)damageSprite(scene,a,lost);
    m.lastHealth=hp;
  }
}

/* ------------------------------------------------------
   bot anti-stuck + rooftop visibility
------------------------------------------------------ */
function ensurePlayerVisible(scene){
  const p=player(scene);if(!p||p.dead)return;
  p.mesh.visible=true;
  const parts=p.mesh.userData.parts||{};
  for(const key of ['torso','head','legs']){
    const part=parts[key];if(!part)continue;part.visible=true;
    part.traverse?.(m=>{if(m.isMesh&&m.material){m.visible=true;m.material.opacity=1;m.material.depthWrite=true;m.material.needsUpdate=true;}});
  }
  /* Arms are handled separately so weapon-mode hiding is preserved. */
  if(!currentWeapon(p)&&parts.arms)parts.arms.visible=true;
  if(p.mesh.position.y<-1.2||p.mesh.position.y>7){p.mesh.position.y=0;p.velocity?.set?.(p.velocity.x||0,0,p.velocity.z||0);}
}
function unstickBots(scene,grace){
  if(grace)return;const t=now();
  for(const a of actors(scene)){
    if(!a.isBot||a.dead)continue;const m=actorMem(a),moved=a.mesh.position.distanceTo(m.lastMovePos);
    if(moved>.16){m.lastMovePos.copy(a.mesh.position);m.lastMoveAt=t;continue;}
    const target=a.target?.mesh,far=target?target.position.distanceTo(a.mesh.position)>5:true;
    if(far&&t-m.lastMoveAt>2400){
      let dir=target?target.position.clone().sub(a.mesh.position).setY(0):new THREE.Vector3(Math.random()-.5,0,Math.random()-.5);
      if(dir.lengthSq()<.01)dir.set(1,0,0);dir.normalize();
      const side=new THREE.Vector3(-dir.z,0,dir.x).multiplyScalar((Math.random()<.5?-1:1)*(1.4+Math.random()*1.1));
      a.mesh.position.add(side).addScaledVector(dir,.8);a.mesh.position.y=0;a.velocity?.set?.(0,0,0);m.lastMovePos.copy(a.mesh.position);m.lastMoveAt=t;
    }
  }
}

function preFrame(scene,camera){
  if(!isMatch(scene))return;
  for(const a of actors(scene)){
    updateWeaponRig(scene,camera,a);updateMelee(a);
  }
  ensurePlayerVisible(scene);
}
function postFrame(scene,camera){
  if(!isMatch(scene))return;
  const s=stateFor(scene);spreadSpawns(scene,s);updateOpening(scene,s);updateDamageNumbers(scene,s);
  const grace=now()-s.start<GRACE_MS;unstickBots(scene,grace);ensurePlayerVisible(scene);
  for(const a of actors(scene)){
    const w=currentWeapon(a);traceAmmo.set(a,w?.ammo??0);
  }
}

THREE.WebGLRenderer.prototype.render=function(scene,camera){
  try{preFrame(scene,camera);}catch(err){console.warn('Warfare V32 pre-frame:',err);}
  const result=previousRender.call(this,scene,camera);
  try{postFrame(scene,camera);}catch(err){console.warn('Warfare V32 post-frame:',err);}
  return result;
};

window.__bbWarfareCombatHardfixV32={
  version:32,
  graceSeconds:20,
  roundSeconds:300,
  features:[
    'damage-registration-fix','20s-loot-grace','far-spawns','visible-held-guns','two-hand-gun-pose',
    'muzzle-tracer-origin','classic-melee-props','floating-damage-numbers','recoil-flash','bot-unstuck','rooftop-player-visibility'
  ]
};
