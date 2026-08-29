import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE COMPREHENSIVE POLISH V30
   Final Warfare-only gameplay authority.
   - 20 second MOVE + LOOT grace period; no shooting or damage
   - far-spread opening spawns
   - 5 minute one-life rounds
   - slower, explicit human + AI weapon cadence
   - humanized AI reaction/aim/burst behavior
   - unmistakable held guns + visible Classic melee props
   - natural per-arm run / gun / melee animation
   - strong muzzle flash + tracer feedback
   - Fortnite/Krunker-style directional damage arc
   - family loot callouts + extra themed containers
   - elimination: REMATCH / SPECTATE / RETURN TO WARFARE / HOME
   - live spectator camera + fighter cycling
   - rooftop player visibility hardening
*/

const previousRender = THREE.WebGLRenderer.prototype.render;
const states = new WeakMap();
const actorMemory = new WeakMap();
let activeScene = null;
let activeCamera = null;
let activeState = null;
let pendingRematch = null;
let firingMouse = false;
let firingKey = false;
let fireTimer = 0;
let audioCtx = null;

const MATCH_SECONDS = 300;
const GRACE_SECONDS = 20;
const WEAPON = {
  pistol:{name:'PISTOL',rate:430,mag:12,reserve:48,color:0xb9c1cc},
  smg:{name:'SMG',rate:175,mag:30,reserve:120,color:0x4f83cc},
  rifle:{name:'ASSAULT RIFLE',rate:210,mag:30,reserve:90,color:0x5bb56b},
  shotgun:{name:'SHOTGUN',rate:980,mag:6,reserve:30,color:0xcf8a42},
  lmg:{name:'LMG',rate:190,mag:60,reserve:120,color:0x9270cf},
  sniper:{name:'SNIPER',rate:1250,mag:4,reserve:16,color:0x5cc7ce},
  launcher:{name:'LAUNCHER',rate:1350,mag:1,reserve:5,color:0xd55757}
};
const BOT_EXTRA = {pistol:260,smg:330,rifle:390,shotgun:520,lmg:360,sniper:720,launcher:780};

const mat=(c,r=.55,m=.12)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
const basic=(c,opacity=1)=>new THREE.MeshBasicMaterial({color:c,transparent:opacity<1,opacity,depthWrite:opacity>=1});

function actors(scene){
  const out=[];
  scene?.traverse(o=>{const a=o.userData?.actor;if(a&&!out.includes(a))out.push(a);});
  return out;
}
function human(scene){return actors(scene).find(a=>!a.isBot)||null;}
function mapId(scene){
  const label=(document.getElementById('modeLabel')?.textContent||'').toUpperCase();
  if(label.includes('HAUNTED')) return 'haunted';
  if(label.includes('CITY')||label.includes('ROOFTOP')) return 'city';
  const bg=scene?.background?.isColor?scene.background.getHex():0;
  if(bg===0x020711||bg===0x080d20) return 'haunted';
  if(bg===0x091226||bg===0x111d44) return 'city';
  return null;
}
function isMatch(scene){return !!mapId(scene)&&actors(scene).length>1;}
function now(){return performance.now();}
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
function currentWeapon(a){return a?.weapons?.[a.slot]||null;}
function feed(text){
  const f=document.getElementById('feed'); if(!f)return;
  const e=document.createElement('div');e.className='feed-item';e.textContent=text;f.prepend(e);
  while(f.children.length>6)f.lastChild?.remove(); setTimeout(()=>e.remove(),3600);
}

/* ------------------------------------------------------
   DOM overlays
------------------------------------------------------ */
function injectStyle(){
  if(document.getElementById('bbWarfareV30Style'))return;
  const s=document.createElement('style');s.id='bbWarfareV30Style';s.textContent=`
    #bbWarfareGrace{position:fixed;left:50%;top:84px;transform:translateX(-50%);z-index:90;min-width:300px;padding:10px 20px 11px;border:3px solid #61c7ff;border-radius:10px;background:linear-gradient(180deg,rgba(7,22,38,.96),rgba(4,11,21,.95));box-shadow:0 8px 30px rgba(0,0,0,.42),0 0 25px rgba(76,177,255,.24);text-align:center;color:#fff;pointer-events:none;font-family:Arial,sans-serif}
    #bbWarfareGrace .label{font-size:10px;font-weight:1000;letter-spacing:2.5px;color:#75d3ff}
    #bbWarfareGrace .count{margin:1px 0;font:1000 34px/1 Impact,'Arial Black',sans-serif;color:#fff;text-shadow:3px 3px #111}
    #bbWarfareGrace .note{font-size:8px;font-weight:900;letter-spacing:1.35px;color:#bcd0de}
    #bbWarfareGrace.fight{border-color:#ffd52a;animation:bbV30Fight .8s ease-out forwards}#bbWarfareGrace.fight .label{color:#ffd52a}.bb-v30-hidden{display:none!important}
    @keyframes bbV30Fight{0%{transform:translateX(-50%) scale(.8);opacity:0}24%{transform:translateX(-50%) scale(1.08);opacity:1}100%{transform:translateX(-50%) scale(1);opacity:0}}
    #bbV30Damage{position:fixed;left:50%;top:50%;width:230px;height:230px;transform:translate(-50%,-50%);z-index:88;pointer-events:none;opacity:0;transition:opacity .06s}
    #bbV30Damage.active{opacity:1}#bbV30Damage .arc{position:absolute;left:50%;top:0;width:88px;height:24px;transform:translateX(-50%);border-top:9px solid #ff3b32;border-radius:70% 70% 0 0;filter:drop-shadow(0 0 7px #ff2c21)}
    #bbV30Damage .arc:after{content:'';position:absolute;left:35px;top:-13px;border-left:9px solid transparent;border-right:9px solid transparent;border-top:12px solid #ff3b32}
    #bbV30Damage .amount{position:absolute;left:50%;top:23px;transform:translateX(-50%);padding:2px 6px;border-radius:4px;background:rgba(16,6,7,.72);color:#fff;font:1000 12px/1 Arial,sans-serif;text-shadow:1px 1px #111;white-space:nowrap}
    .bb-v30-overlay{position:fixed;inset:0;z-index:120;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 42%,rgba(24,48,66,.45),rgba(4,8,13,.92) 62%);font-family:Arial,sans-serif;color:#fff}
    .bb-v30-card{width:min(680px,92vw);padding:28px;border:4px solid #111;border-left:8px solid #ef352b;border-right:8px solid #ffd52a;border-radius:10px;background:linear-gradient(150deg,#172735,#08111a);box-shadow:0 12px 0 rgba(0,0,0,.32),0 28px 55px rgba(0,0,0,.45);text-align:center}
    .bb-v30-card .eyebrow{color:#ff726a;font-size:10px;font-weight:1000;letter-spacing:3px}.bb-v30-card h2{margin:6px 0 5px;font:1000 clamp(38px,6vw,64px)/.95 Impact,'Arial Black',sans-serif;letter-spacing:1px;text-shadow:4px 4px #111}.bb-v30-card .sub{color:#b8c8d4;font-size:13px;font-weight:800}.bb-v30-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:18px 0}.bb-v30-stat{padding:11px;border:2px solid #344958;border-radius:6px;background:#0c1822}.bb-v30-stat strong{display:block;color:#ffd52a;font-size:18px}.bb-v30-stat span{display:block;margin-top:3px;color:#9fb2c0;font-size:8px;font-weight:1000;letter-spacing:1px}
    .bb-v30-buttons{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.bb-v30-buttons button{min-height:48px;padding:10px;border:3px solid #111;border-radius:7px;background:#1b2b37;color:#fff;font-weight:1000;cursor:pointer}.bb-v30-buttons button.primary{background:#ffd52a;color:#111}.bb-v30-buttons button.spectate{background:#246fa8}.bb-v30-buttons button.home{background:#762f2d}.bb-v30-buttons button:hover{filter:brightness(1.12);transform:translateY(-1px)}
    #bbV30Spectate{position:fixed;left:50%;bottom:26px;transform:translateX(-50%);z-index:95;padding:9px 16px;border:2px solid #5aaee4;border-radius:8px;background:rgba(5,15,25,.9);color:#fff;text-align:center;pointer-events:none;font-family:Arial,sans-serif}#bbV30Spectate strong{display:block;font-size:12px;letter-spacing:1px}#bbV30Spectate span{display:block;margin-top:2px;color:#a9c1d1;font-size:8px;font-weight:900;letter-spacing:1px}
    @media(max-width:620px){.bb-v30-buttons{grid-template-columns:1fr}.bb-v30-stats{grid-template-columns:1fr 1fr 1fr}#bbWarfareGrace{top:68px;min-width:240px}}
  `;document.head.appendChild(s);
}
injectStyle();
function graceEl(){let e=document.getElementById('bbWarfareGrace');if(!e){e=document.createElement('div');e.id='bbWarfareGrace';e.innerHTML='<div class="label">GET READY</div><div class="count">20</div><div class="note">MOVE • LOOT • SPREAD OUT • WEAPONS LOCKED</div>';document.body.appendChild(e);}return e;}
function hideGrace(){document.getElementById('bbWarfareGrace')?.remove();}
function showGrace(sec){const e=graceEl();e.classList.remove('fight');e.querySelector('.label').textContent='GET READY';e.querySelector('.count').textContent=String(Math.max(0,Math.ceil(sec)));e.querySelector('.note').textContent='MOVE • LOOT • SPREAD OUT • WEAPONS LOCKED';}
function showFight(){const e=graceEl();e.classList.add('fight');e.querySelector('.label').textContent='WARFARE';e.querySelector('.count').textContent='FIGHT!';e.querySelector('.note').textContent='WEAPONS LIVE';setTimeout(hideGrace,850);}

function damageUI(){let w=document.getElementById('bbV30Damage');if(!w){w=document.createElement('div');w.id='bbV30Damage';w.innerHTML='<div class="arc"></div><div class="amount"></div>';document.body.appendChild(w);}return w;}
function showDamageDirection(state,source,amount){
  const p=state.player,c=activeCamera;if(!p||!source?.mesh||!c)return;
  const forward=new THREE.Vector3(0,0,-1).applyQuaternion(c.quaternion).setY(0).normalize();
  const to=source.mesh.position.clone().sub(p.mesh.position).setY(0).normalize();
  const angle=Math.atan2(forward.x*to.z-forward.z*to.x,clamp(forward.dot(to),-1,1));
  const ui=damageUI();ui.style.transform=`translate(-50%,-50%) rotate(${angle}rad)`;
  const amountEl=ui.querySelector('.amount');amountEl.textContent=`-${Math.max(1,Math.round(amount))}`;amountEl.style.transform=`translateX(-50%) rotate(${-angle}rad)`;
  ui.classList.add('active');clearTimeout(ui._t);ui._t=setTimeout(()=>ui.classList.remove('active'),520);
}

/* ------------------------------------------------------
   spawn spread + map population
------------------------------------------------------ */
const SPAWNS={
  haunted:[[-13,-45],[43,45],[45,-43],[-12,44],[18,3],[38,3],[5,29],[7,-29]],
  city:[[-33,8],[34,-5],[7,36],[-20,-30],[34,28],[27,-34],[0,0],[-11,-21]]
};
function repositionOpeners(state,list){
  const p=state.player,bots=list.filter(a=>a!==p),pts=SPAWNS[state.map];if(!pts)return;
  const ordered=[p,...bots];ordered.forEach((a,i)=>{const q=pts[i%pts.length];a.mesh.position.set(q[0],0,q[1]);a.velocity?.set?.(0,0,0);a.mesh.visible=true;a.spawnProtection=Math.max(a.spawnProtection||0,GRACE_SECONDS+2);});
}

function textSprite(text,color='#ffffff'){
  const cv=document.createElement('canvas'),ctx=cv.getContext('2d');cv.width=512;cv.height=96;ctx.clearRect(0,0,512,96);ctx.font='900 28px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineWidth=8;ctx.strokeStyle='rgba(0,0,0,.85)';ctx.strokeText(text,256,48);ctx.fillStyle=color;ctx.fillText(text,256,48);const tex=new THREE.CanvasTexture(cv);tex.colorSpace=THREE.SRGBColorSpace;const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:false}));sp.scale.set(5.5,1.03,1);return sp;
}
function addBox(g,x,y,z,w,h,d,c){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c));m.position.set(x,y,z);m.castShadow=true;g.add(m);return m;}
function familyContainer(kind){
  const g=new THREE.Group();g.name=`BB_V30_FAMILY_${kind.toUpperCase()}`;
  if(kind==='erin'){
    addBox(g,0,.36,0,1.35,.68,.92,0xe9edf0);for(const x of [-.45,-.15,.15,.45])addBox(g,x,.38,.47,.12,.42,.05,0x9db2c2);addBox(g,0,.74,0,1.42,.10,.98,0xd5dce1);
  }else if(kind==='brendan'){
    const bag=new THREE.Mesh(new THREE.CylinderGeometry(.34,.46,1.25,12),mat(0x173a2e));bag.position.y=.65;bag.rotation.z=.05;g.add(bag);for(const x of [-.18,0,.18]){const club=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,1.25,7),mat(0xc4c8cc,.35,.65));club.position.set(x,1.42,0);g.add(club);addBox(g,x,2.05,0,.18,.12,.10,0x555b62);}
  }else if(kind==='grandmommy'){
    addBox(g,0,.34,0,1.25,.64,.86,0xb9834f);for(const x of [-.34,0,.34]){const q=new THREE.Mesh(new THREE.SphereGeometry(.14,10,7),mat(x===0?0xe7d15d:0xc94e48));q.position.set(x,.82,.08);g.add(q);}const h=new THREE.Mesh(new THREE.TorusGeometry(.48,.06,8,18,Math.PI),mat(0x7b5537));h.rotation.z=Math.PI;h.position.y=.9;g.add(h);
  }else{
    const can=new THREE.Mesh(new THREE.CylinderGeometry(.42,.35,.82,14),mat(0x3d79aa,.15,.25));can.position.y=.42;g.add(can);addBox(g,0,.85,0,.65,.07,.10,0x20272d);const brush=new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,.9,8),mat(0x9b6435));brush.position.set(.3,1.05,0);brush.rotation.z=-.35;g.add(brush);addBox(g,.46,1.42,0,.28,.12,.12,0x48a9dc);
  }
  return g;
}
const FAMILY_DATA={
  erin:{label:"ERIN'S LAUNDRY BASKET",color:'#f2a7c4'},
  brendan:{label:"BRENDAN'S GOLF BAG",color:'#8fd6a8'},
  grandmommy:{label:"GRANDMOMMY'S BASKET",color:'#ffd48a'},
  connor:{label:"CONNOR'S PAINT BUCKET",color:'#77c8ff'}
};
const FAMILY_POS={
  haunted:{erin:[5,-15],brendan:[33,20],grandmommy:[-8,22],connor:[28,-27]},
  city:{erin:[0,10],brendan:[33,-5],grandmommy:[7,36],connor:[-20,-30]}
};
function enhanceExistingLoot(scene){
  scene.traverse(o=>{
    if((o.name==='BB_GRANDADDY_TOOLBOX'||o.name==='BB_BARRETT_TOY_CHEST')&&!o.userData.bbV30Label){
      const label=o.name.includes('GRANDADDY')?"GRANDADDY'S TOOLBOX":"BARRETT'S TOY CHEST",color=o.name.includes('GRANDADDY')?'#ffd86b':'#7bc4ff';
      const sp=textSprite(label,color);sp.position.set(0,1.55,0);o.add(sp);o.userData.bbV30Label=true;o.scale.multiplyScalar(1.10);
    }
  });
}
function addFamilyLoot(scene,state){
  const pos=FAMILY_POS[state.map]||{};
  for(const [kind,p] of Object.entries(pos)){
    const g=familyContainer(kind);g.position.set(p[0],0,p[1]);const d=FAMILY_DATA[kind];const label=textSprite(d.label,d.color);label.position.set(0,2.15,0);g.add(label);scene.add(g);state.family.push({kind,label:d.label,mesh:g,opened:false});
  }
  enhanceExistingLoot(scene);
}
function grantFamilyLoot(state,item){
  if(item.opened)return;item.opened=true;item.mesh.scale.y=.72;item.mesh.rotation.z=.08;
  const p=state.player,kind=item.kind;
  if(kind==='erin'){
    p.health=Math.min(p.maxHealth||100,p.health+28);for(const w of p.weapons||[]){const d=WEAPON[w.type];if(d)w.reserve=Math.min(d.reserve,w.reserve+Math.ceil(d.mag*.8));}feed("Erin's Laundry Basket • +28 health + ammo");
  }else if(kind==='grandmommy'){
    p.health=Math.min(p.maxHealth||100,p.health+38);feed("Grandmommy's Basket • +38 health");
  }else{
    const type=kind==='brendan'?(Math.random()<.48?'sniper':'rifle'):(Math.random()<.55?'smg':'shotgun'),d=WEAPON[type];const loot={type,ammo:d.mag,reserve:Math.ceil(d.reserve*.65)};
    if(p.weapons.length<2){p.weapons.push(loot);p.slot=p.weapons.length-1;}else p.weapons[p.slot]=loot;
    if(kind==='connor')p.spawnProtection=Math.max(p.spawnProtection||0,2.5);
    feed(`${item.label} • ${d.name}${kind==='connor'?' + brief paint shield':''}`);
  }
  const sp=item.mesh.children.find(c=>c.isSprite);if(sp)sp.material.opacity=.36;
}
function nearestFamily(state,max=3.2){
  if(!state?.player||state.player.dead)return null;let best=null,bd=max;
  for(const f of state.family){if(f.opened)continue;const d=f.mesh.position.distanceTo(state.player.mesh.position);if(d<bd){bd=d;best=f;}}
  return best;
}

/* ------------------------------------------------------
   visible guns, melee, arms, recoil
------------------------------------------------------ */
function fallbackGun(type){
  const d=WEAPON[type]||WEAPON.pistol,g=new THREE.Group();g.name='BB_V30_HELD_GUN';
  const dark=mat(0x1d242b,.32,.72),body=mat(d.color,.38,.52),long=['rifle','shotgun','lmg','sniper','launcher'].includes(type);
  const b=addBox(g,.35,0,0,long?1.18:.68,.24,.28,d.color);b.material=body;addBox(g,long?1.15:.82,.01,0,long?.62:.38,.09,.11,0x20252b).material=dark;addBox(g,.10,-.30,0,.22,.48,.20,0x242a30).rotation.z=-.14;
  if(type==='sniper'){const scope=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,.48,10),dark);scope.rotation.z=Math.PI/2;scope.position.set(.35,.22,0);g.add(scope);}if(type==='shotgun')addBox(g,.55,-.13,0,.62,.11,.24,0x7d5232);if(type==='launcher'){const tube=new THREE.Mesh(new THREE.CylinderGeometry(.18,.21,1.18,12),body);tube.rotation.z=Math.PI/2;tube.position.set(.4,.03,0);g.add(tube);}if(type==='lmg')addBox(g,.02,-.36,0,.43,.40,.28,d.color);
  const muzzle=new THREE.Object3D();muzzle.name='BB_V30_MUZZLE';muzzle.position.set(long?1.55:1.08,0,0);g.add(muzzle);g.rotation.y=Math.PI/2;g.scale.setScalar(.78);return g;
}
function actorMem(a){let m=actorMemory.get(a);if(!m){m={lastPos:a.mesh.position.clone(),phase:0,lastMelee:a.lastMelee||0,lastAmmo:null,lastType:null,shotPulse:0,gun:null,gunType:null,proxy:null,actualTarget:null,aimRefresh:0,burst:0,pauseUntil:0,deadAt:0};actorMemory.set(a,m);}return m;}
function ensureVisibleWeapon(a){
  const m=actorMem(a),w=currentWeapon(a),type=w?.type||null;
  const stock=a.mesh.getObjectByName('BB_HELD_GUN');if(stock)stock.visible=!!type&&!a.dead;
  if(type){
    if(!m.gun||m.gunType!==type){m.gun?.removeFromParent();m.gun=fallbackGun(type);m.gunType=type;a.mesh.add(m.gun);}m.gun.visible=!a.dead;
  }else if(m.gun)m.gun.visible=false;
  const melees=[];a.mesh.traverse(o=>{if(o.name==='BB_CLASSIC_MELEE')melees.push(o);});
  melees.forEach(o=>{o.visible=!type&&!a.dead;o.scale.setScalar(a.charId==='sean'?1.25:1.12);});
}
function updateArms(a,dt,t){
  const parts=a.mesh.userData.parts,m=actorMem(a);if(!parts?.arms)return;
  ensureVisibleWeapon(a);parts.arms.rotation.set(0,0,0);
  const left=parts.arms.children?.[0],right=parts.arms.children?.[1];if(!left||!right)return;
  const pos=a.mesh.position,dist=new THREE.Vector2(pos.x-m.lastPos.x,pos.z-m.lastPos.z).length();m.phase+=dist*4.8;m.lastPos.copy(pos);m.shotPulse=Math.max(0,m.shotPulse-dt*7.5);
  const w=currentWeapon(a);
  if(w){
    left.rotation.x=-.88-m.shotPulse*.12;right.rotation.x=-1.05-m.shotPulse*.20;left.rotation.z=-.22;right.rotation.z=.14;
    if(m.gun){m.gun.position.set(.48,1.58,.07);m.gun.rotation.x=-.08-m.shotPulse*.12;m.gun.position.z-=m.shotPulse*.08;}
  }else{
    if((a.lastMelee||0)!==m.lastMelee){m.lastMelee=a.lastMelee||0;m.swingAt=t;}
    const swing=m.swingAt?clamp((t-m.swingAt)/330,0,1):1;
    if(swing<1){const arc=Math.sin(swing*Math.PI);right.rotation.x=-arc*1.45;right.rotation.z=-arc*.32;left.rotation.x=arc*.20;}
    else if(dist>.004){const s=Math.sin(m.phase);left.rotation.x=s*.52;right.rotation.x=-s*.52;left.rotation.z=.08;right.rotation.z=-.08;}
    else{left.rotation.x*=.72;right.rotation.x*=.72;left.rotation.z*=.72;right.rotation.z*=.72;}
  }
}

function shotFlash(scene,a,type,camera){
  const m=actorMem(a);m.shotPulse=1;const gun=m.gun||a.mesh.getObjectByName('BB_HELD_GUN');let origin=a.mesh.position.clone().add(new THREE.Vector3(0,1.6,0));const muzzle=gun?.getObjectByName('BB_V30_MUZZLE')||gun?.getObjectByName('BB_MUZZLE');if(muzzle)muzzle.getWorldPosition(origin);
  const col=WEAPON[type]?.color||0xffe7a0;const flash=new THREE.Mesh(new THREE.SphereGeometry(.13,8,6),basic(0xffe8a5,.96));flash.position.copy(origin);scene.add(flash);const light=new THREE.PointLight(0xffcc78,5.5,7,2);light.position.copy(origin);scene.add(light);setTimeout(()=>{flash.removeFromParent();light.removeFromParent();flash.geometry.dispose();flash.material.dispose();},75);
  let end;if(!a.isBot&&camera){end=origin.clone().add(new THREE.Vector3(0,0,-1).applyQuaternion(camera.quaternion).multiplyScalar(35));}
  else if(a.target?.mesh){end=a.target.mesh.position.clone().add(new THREE.Vector3(0,1.25,0));}
  else end=origin.clone().add(new THREE.Vector3(Math.sin(a.mesh.rotation.y),0,Math.cos(a.mesh.rotation.y)).multiplyScalar(30));
  const geo=new THREE.BufferGeometry().setFromPoints([origin,end]),line=new THREE.Line(geo,new THREE.LineBasicMaterial({color:col,transparent:true,opacity:.95}));line.renderOrder=999;scene.add(line);setTimeout(()=>{line.removeFromParent();geo.dispose();line.material.dispose();},105);
}
function softShotSound(type,a){
  if(a!==activeState?.player)return; // existing mix handles world/AI shots; avoid audio spam
  try{audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='square';o.frequency.value=type==='sniper'||type==='shotgun'?88:120;g.gain.setValueAtTime(.018,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+.045);o.connect(g).connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+.05);}catch(_){ }
}

/* ------------------------------------------------------
   AI humanization
------------------------------------------------------ */
function nearestEnemy(a,list){let best=null,bd=Infinity;for(const x of list){if(x===a||x.dead)continue;const d=x.mesh.position.distanceTo(a.mesh.position);if(d<bd){bd=d;best=x;}}return best;}
function humanizeBot(b,list,t){
  const m=actorMem(b),w=currentWeapon(b);if(!w)return;
  const actual=nearestEnemy(b,list);if(!actual){b.target=null;return;}
  if(actual!==m.actualTarget){m.actualTarget=actual;m.proxy={mesh:new THREE.Object3D(),dead:false};m.proxy.mesh.position.copy(actual.mesh.position);m.aimRefresh=t+450+Math.random()*350;b.lastShot=Math.max(b.lastShot||0,t+500+Math.random()*400);}
  const dist=b.mesh.position.distanceTo(actual.mesh.position);
  if(t>=m.aimRefresh){
    const err=dist<8?.35:dist<18?1.05:dist<32?2.1:3.6;const movePenalty=b.mesh.position.distanceTo(m.lastBotAimPos||b.mesh.position)>.08?1.35:1;
    m.aimOffset=new THREE.Vector3((Math.random()-.5)*err*movePenalty,(Math.random()-.5)*err*.28,(Math.random()-.5)*err*movePenalty);m.aimRefresh=t+420+Math.random()*520;
  }
  const desired=actual.mesh.position.clone().add(m.aimOffset||new THREE.Vector3());m.proxy.mesh.position.lerp(desired,.17);m.proxy.dead=false;b.target=m.proxy;b.thinkAt=Math.max(b.thinkAt||0,t+280);m.lastBotAimPos=b.mesh.position.clone();
  if(t<m.pauseUntil)b.lastShot=Math.max(b.lastShot||0,m.pauseUntil);
}
function shotCadence(scene,state,a,t){
  const m=actorMem(a),w=currentWeapon(a),ammo=w?.ammo??null,type=w?.type||null;
  if(ammo!==null&&m.lastAmmo!==null&&type===m.lastType&&ammo<m.lastAmmo){
    shotFlash(scene,a,type,activeCamera);softShotSound(type,a);state.lastShooter={actor:a,at:t};
    if(a.isBot){m.burst++;const extra=BOT_EXTRA[type]??380;a.lastShot=t+extra+Math.random()*180;if(m.burst>=2+Math.floor(Math.random()*2)){m.burst=0;m.pauseUntil=t+650+Math.random()*850;a.lastShot=Math.max(a.lastShot,m.pauseUntil);}}
  }
  m.lastAmmo=ammo;m.lastType=type;
}

/* ------------------------------------------------------
   human paced fire input
------------------------------------------------------ */
function canFire(){const s=activeState,p=s?.player;if(!s||!p||p.dead||s.ended||s.spectating)return false;return now()>=s.graceEnd;}
function pace(){const w=currentWeapon(activeState?.player);return w?(WEAPON[w.type]?.rate||420):650;}
function dispatchMouse(type,button=0){const c=document.getElementById('gameCanvas');if(!c)return;const e=new MouseEvent(type,{button,bubbles:true,cancelable:true,view:window});Object.defineProperty(e,'__bbV30Paced',{value:true});c.dispatchEvent(e);}
function pulseFire(){
  clearTimeout(fireTimer);if(!(firingMouse||firingKey))return;
  const c=document.getElementById('gameCanvas');if(!c)return;
  if(document.pointerLockElement!==c){c.requestPointerLock?.();fireTimer=setTimeout(pulseFire,160);return;}
  if(canFire()){dispatchMouse('mousedown',0);setTimeout(()=>dispatchMouse('mouseup',0),24);}else if(activeState&&!activeState.ended&&!activeState.spectating){const left=Math.max(0,(activeState.graceEnd-now())/1000);if(left>0&&(!activeState.lastLockedNote||now()-activeState.lastLockedNote>1200)){activeState.lastLockedNote=now();feed(`Weapons locked • ${Math.ceil(left)}s`);}}
  fireTimer=setTimeout(pulseFire,pace());
}
window.addEventListener('mousedown',e=>{if(e.button!==0||e.__bbV30Paced||!activeState||activeState.ended)return;e.preventDefault();e.stopImmediatePropagation();firingMouse=true;pulseFire();},true);
window.addEventListener('mouseup',e=>{if(e.button!==0||e.__bbV30Paced||!activeState)return;e.preventDefault();e.stopImmediatePropagation();firingMouse=false;dispatchMouse('mouseup',0);if(!firingKey)clearTimeout(fireTimer);},true);
document.addEventListener('keydown',e=>{
  if(e.code==='KeyJ'&&activeState){e.preventDefault();e.stopImmediatePropagation();if(!e.repeat){firingKey=true;pulseFire();}return;}
  if(e.code==='KeyE'&&activeState&&!e.repeat){const item=nearestFamily(activeState);if(item){e.preventDefault();e.stopImmediatePropagation();grantFamilyLoot(activeState,item);return;}}
  if(activeState?.spectating&&!e.repeat&&['ArrowLeft','ArrowRight','KeyA','KeyD'].includes(e.code)){e.preventDefault();e.stopImmediatePropagation();cycleSpectate(activeState,(e.code==='ArrowLeft'||e.code==='KeyA')?-1:1);}
},true);
document.addEventListener('keyup',e=>{if(e.code==='KeyJ'&&activeState){e.preventDefault();e.stopImmediatePropagation();firingKey=false;dispatchMouse('mouseup',0);if(!firingMouse)clearTimeout(fireTimer);}},true);
window.addEventListener('blur',()=>{firingMouse=firingKey=false;clearTimeout(fireTimer);dispatchMouse('mouseup',0);});

/* ------------------------------------------------------
   post death / spectate / results
------------------------------------------------------ */
function formatTime(sec){const s=Math.max(0,Math.floor(sec));return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;}
function closeCustomOverlays(){document.getElementById('bbV30Elim')?.remove();document.getElementById('bbV30Results')?.remove();document.getElementById('bbV30Spectate')?.remove();}
function returnToHub(){closeCustomOverlays();hideGrace();activeState=null;pendingRematch=null;document.getElementById('resultScreen')?.classList.add('hidden');document.getElementById('returnHub')?.click();}
function home(){window.location.href='index.html';}
function queueRematch(state){pendingRematch=state.map;closeCustomOverlays();hideGrace();activeState=null;document.getElementById('resultScreen')?.classList.add('hidden');document.getElementById('returnHub')?.click();}
function eliminationOverlay(state){
  if(document.getElementById('bbV30Elim')||state.ended)return;
  if(document.pointerLockElement)document.exitPointerLock?.();
  const alive=actors(activeScene).filter(a=>!a.dead).length,place=alive+1,survived=(now()-state.graceEnd)/1000;
  const o=document.createElement('div');o.id='bbV30Elim';o.className='bb-v30-overlay';o.innerHTML=`<div class="bb-v30-card"><div class="eyebrow">WARFARE</div><h2>ELIMINATED</h2><div class="sub">Your run is over — the battle is still going.</div><div class="bb-v30-stats"><div class="bb-v30-stat"><strong>#${place}</strong><span>PLACEMENT</span></div><div class="bb-v30-stat"><strong>${state.player.kills||0}</strong><span>ELIMINATIONS</span></div><div class="bb-v30-stat"><strong>${formatTime(survived)}</strong><span>SURVIVED</span></div></div><div class="bb-v30-buttons"><button class="primary" data-a="rematch">REMATCH</button><button class="spectate" data-a="spectate">SPECTATE</button><button data-a="return">RETURN TO WARFARE</button><button class="home" data-a="home">HOME</button></div></div>`;
  o.addEventListener('click',e=>{const a=e.target.closest('button')?.dataset.a;if(a==='rematch')queueRematch(state);if(a==='spectate'){o.remove();startSpectate(state);}if(a==='return')returnToHub();if(a==='home')home();});document.body.appendChild(o);
}
function liveSpectateTargets(state){return actors(activeScene).filter(a=>a!==state.player&&!a.dead);}
function startSpectate(state){state.spectating=true;state.spectateIndex=0;updateSpectateHud(state);}
function cycleSpectate(state,dir){const list=liveSpectateTargets(state);if(!list.length)return;state.spectateIndex=(state.spectateIndex+dir+list.length)%list.length;updateSpectateHud(state);}
function updateSpectateHud(state){
  const list=liveSpectateTargets(state);let h=document.getElementById('bbV30Spectate');if(!list.length){h?.remove();return;}state.spectateIndex=clamp(state.spectateIndex,0,list.length-1);const t=list[state.spectateIndex];if(!h){h=document.createElement('div');h.id='bbV30Spectate';document.body.appendChild(h);}h.innerHTML=`<strong>SPECTATING — ${t.name}</strong><span>A / D OR ← / → TO SWITCH • ${list.length} FIGHTERS LEFT</span>`;
}
function spectateCamera(state,camera){
  if(!state.spectating)return;const list=liveSpectateTargets(state);if(!list.length)return;state.spectateIndex%=list.length;const t=list[state.spectateIndex],r=t.mesh.rotation.y,focus=t.mesh.position.clone().add(new THREE.Vector3(0,1.45,0)),off=new THREE.Vector3(-Math.sin(r)*5.3,2.6,-Math.cos(r)*5.3);camera.position.lerp(focus.clone().add(off),.18);camera.lookAt(focus);camera.fov=63;camera.updateProjectionMatrix();updateSpectateHud(state);
}
function ranking(state){
  return actors(activeScene).slice().sort((a,b)=>{const ma=actorMem(a),mb=actorMem(b);if(a.dead!==b.dead)return a.dead?1:-1;if(!a.dead)return (b.kills||0)-(a.kills||0);return (mb.deadAt||0)-(ma.deadAt||0)||(b.kills||0)-(a.kills||0);});
}
function resultsOverlay(state,reason){
  document.getElementById('bbV30Elim')?.remove();document.getElementById('bbV30Spectate')?.remove();if(document.getElementById('bbV30Results'))return;
  if(document.pointerLockElement)document.exitPointerLock?.();const ranked=ranking(state),place=Math.max(1,ranked.indexOf(state.player)+1),suffix=place===1?'ST':place===2?'ND':place===3?'RD':'TH';
  const rows=ranked.map((a,i)=>`<div style="display:grid;grid-template-columns:44px 1fr 90px;gap:8px;padding:7px 9px;margin-top:5px;border:1px solid ${a===state.player?'#ffd52a':'#314552'};background:${a===state.player?'rgba(255,213,42,.08)':'#0b1620'};text-align:left"><strong>${i+1}</strong><span>${a.name}${a===state.player?' • YOU':''}</span><span>${a.kills||0} ELIMS</span></div>`).join('');
  const o=document.createElement('div');o.id='bbV30Results';o.className='bb-v30-overlay';o.innerHTML=`<div class="bb-v30-card"><div class="eyebrow">WARFARE COMPLETE • ${reason}</div><h2>${place}${suffix} PLACE</h2><div style="margin:15px 0;max-height:280px;overflow:auto">${rows}</div><div class="bb-v30-buttons"><button class="primary" data-a="rematch">REMATCH</button><button data-a="return">RETURN TO WARFARE</button><button class="home" data-a="home">HOME</button></div></div>`;o.addEventListener('click',e=>{const a=e.target.closest('button')?.dataset.a;if(a==='rematch')queueRematch(state);if(a==='return')returnToHub();if(a==='home')home();});document.body.appendChild(o);
}
function endCustom(state,reason){if(state.ended)return;state.ended=true;firingMouse=firingKey=false;clearTimeout(fireTimer);dispatchMouse('mouseup',0);for(const a of actors(activeScene)){a.spawnProtection=9999;a.target=null;a.thinkAt=now()+999999;a.lastShot=now()+999999;a.velocity?.set?.(0,0,0);}resultsOverlay(state,reason);}

/* ------------------------------------------------------
   scene lifecycle / master update
------------------------------------------------------ */
function setupMatch(scene,camera){
  const p=human(scene),list=actors(scene),map=mapId(scene),t=now();const st={scene,camera,player:p,map,created:t,graceEnd:t+GRACE_SECONDS*1000,matchEnd:t+(GRACE_SECONDS+MATCH_SECONDS)*1000,family:[],lastHealth:p?.health??100,lastShooter:null,spectating:false,spectateIndex:0,ended:false,fightAnnounced:false};states.set(scene,st);activeState=st;
  document.getElementById('matchIntro')?.classList.add('hidden');document.getElementById('resultScreen')?.classList.add('hidden');repositionOpeners(st,list);addFamilyLoot(scene,st);showGrace(GRACE_SECONDS);feed('20 seconds to move, spread out and loot • no damage');
  list.forEach(a=>{const m=actorMem(a);m.lastAmmo=currentWeapon(a)?.ammo??null;m.lastType=currentWeapon(a)?.type??null;});return st;
}
function handleHub(scene){
  if(!pendingRematch)return;const p=human(scene);if(!p)return;const target=pendingRematch;pendingRematch=null;setTimeout(()=>{const portal=target==='haunted'?[-15,-13.1]:[31,-11.3];p.mesh.position.set(portal[0],0,portal[1]);const kd=new KeyboardEvent('keydown',{code:'KeyE',key:'e',bubbles:true});document.dispatchEvent(kd);setTimeout(()=>document.dispatchEvent(new KeyboardEvent('keyup',{code:'KeyE',key:'e',bubbles:true})),20);},90);
}
function freezeDead(state,t){
  for(const a of actors(activeScene)){const m=actorMem(a);if(a.dead){if(!m.deadAt)m.deadAt=t;a.respawnAt=Infinity;a.mesh.visible=false;}else if(!state.ended){a.mesh.visible=true;}}
}
function updateInteractionLabel(state){
  const item=nearestFamily(state),el=document.getElementById('interactionPrompt');if(item&&el){el.textContent=`E — OPEN ${item.label}`;el.classList.remove('hidden');}
}
function update(scene,camera){
  activeScene=scene;activeCamera=camera;
  if(!isMatch(scene)){activeState=null;hideGrace();document.getElementById('bbV30Damage')?.classList.remove('active');handleHub(scene);return;}
  let st=states.get(scene);if(!st)st=setupMatch(scene,camera);activeState=st;const t=now(),list=actors(scene),p=st.player;
  enhanceExistingLoot(scene);freezeDead(st,t);
  if(p&&!p.dead){p.mesh.visible=true;const parts=p.mesh.userData.parts||{};for(const key of ['torso','head','arms','legs'])if(parts[key])parts[key].visible=true;}

  const grace=t<st.graceEnd;
  if(grace){
    const remaining=(st.graceEnd-t)/1000;showGrace(remaining);for(const a of list){a.spawnProtection=Math.max(a.spawnProtection||0,remaining+1);a.lastMelee=t+250;if(a.isBot)a.lastShot=t+320;}
  }else if(!st.fightAnnounced){st.fightAnnounced=true;showFight();feed('FIGHT! • 5 minute round • one life');}

  for(const a of list){
    if(a.isBot&&!grace&&!st.ended&&!a.dead)humanizeBot(a,list,t);
    if(a.isBot&&grace)a.lastShot=t+320;
    shotCadence(scene,st,a,t);updateArms(a,.016,t);
  }

  // Damage source / Klunker-Fortnite directional wedge.
  if(p){const hp=p.health??0;if(hp<st.lastHealth-.01){const src=st.lastShooter&&t-st.lastShooter.at<1000?st.lastShooter.actor:list.filter(a=>a.isBot&&!a.dead).sort((a,b)=>a.mesh.position.distanceTo(p.mesh.position)-b.mesh.position.distanceTo(p.mesh.position))[0];showDamageDirection(st,src,st.lastHealth-hp);}st.lastHealth=hp;}

  updateInteractionLabel(st);spectateCamera(st,camera);

  // Override the old 7 minute HUD with an actual five-minute live clock.
  const timer=document.getElementById('matchTimer');if(timer){if(grace)timer.textContent='5:00';else timer.textContent=formatTime((st.matchEnd-t)/1000);}

  if(p?.dead&&!st.ended&&!st.spectating)eliminationOverlay(st);
  const alive=list.filter(a=>!a.dead);
  if(!grace&&!st.ended&&alive.length<=1)endCustom(st,'LAST FIGHTER STANDING');
  else if(!st.ended&&t>=st.matchEnd)endCustom(st,'TIME');
  if(st.ended){for(const a of list){a.spawnProtection=9999;a.target=null;a.thinkAt=t+999999;a.lastShot=t+999999;}}
}

THREE.WebGLRenderer.prototype.render=function(scene,camera){
  try{update(scene,camera);}catch(err){console.warn('Warfare comprehensive polish v30:',err);}
  return previousRender.call(this,scene,camera);
};

window.__bbWarfareComprehensiveV30={version:30,graceSeconds:GRACE_SECONDS,roundSeconds:MATCH_SECONDS,features:['grace','far-spawns','one-life','five-minute-rounds','paced-fire','humanized-ai','visible-weapons','visible-melee','arm-animation','shot-feedback','damage-direction','family-loot','spectate','rematch','return-warfare','home','rooftop-visibility']};
