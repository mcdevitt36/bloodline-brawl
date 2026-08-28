import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

const $ = id => document.getElementById(id);
const canvas = $('gameCanvas');
const bootScreen = $('bootScreen');
const rosterEl = $('roster');
const enterButton = $('enterWarfare');
const hud = $('hud');
const modeLabel = $('modeLabel');
const hudName = $('hudName');
const weaponName = $('weaponName');
const ammoText = $('ammoText');
const healthFill = $('healthFill');
const healthText = $('healthText');
const specialFill = $('specialFill');
const ultraFill = $('ultraFill');
const interactionPrompt = $('interactionPrompt');
const matchTimer = $('matchTimer');
const placement = $('placement');
const feed = $('feed');
const intro = $('matchIntro');
const introMap = $('introMap');
const introCount = $('introCount');
const resultScreen = $('resultScreen');
const resultTitle = $('resultTitle');
const resultTable = $('resultTable');
const returnHub = $('returnHub');

const CHARACTERS = {
  sean:    {name:'SEAN',    shirt:0x2f66c8, pants:0x2b2e34, skin:0xf0c7a5, hair:0x3a271b, melee:'HEAVY SWING'},
  shannan: {name:'SHANNAN', shirt:0x8a4fb3, pants:0x20232b, skin:0xf1c8aa, hair:0x553329, melee:'QUICK STRIKE'},
  erin:    {name:'ERIN',    shirt:0xe35b8f, pants:0x4a4f59, skin:0xf2c9aa, hair:0x68422e, melee:'BRUSH BASH'},
  liam:    {name:'LIAM',    shirt:0x284c8f, pants:0x162638, skin:0xefc4a2, hair:0x4a3021, melee:'SHOULDER CHECK'},
  connor:  {name:'CONNOR',  shirt:0x4e9a5b, pants:0x313640, skin:0xefc6a5, hair:0x3f2a20, melee:'PAINT SWIPE'},
  kelly:   {name:'KELLY',   shirt:0xe3b84f, pants:0x3a3444, skin:0xf2c9aa, hair:0x74513b, melee:'FAST JAB'}
};

const WEAPONS = {
  pistol:  {name:'PISTOL', damage:18, fireRate:320, mag:12, reserve:48, spread:.006, range:90, color:0xa9b1bd},
  smg:     {name:'SMG', damage:10, fireRate:95, mag:28, reserve:112, spread:.018, range:65, color:0x4f83cc},
  rifle:   {name:'ASSAULT RIFLE', damage:15, fireRate:145, mag:30, reserve:90, spread:.009, range:110, color:0x5bb56b},
  shotgun: {name:'SHOTGUN', damage:12, pellets:7, fireRate:780, mag:6, reserve:30, spread:.075, range:34, color:0xcf8a42},
  lmg:     {name:'LMG', damage:13, fireRate:120, mag:55, reserve:110, spread:.018, range:95, color:0x9270cf},
  sniper:  {name:'SNIPER', damage:70, fireRate:1250, mag:4, reserve:16, spread:.0015, range:180, color:0x5cc7ce},
  launcher:{name:'LAUNCHER', damage:55, fireRate:1200, mag:1, reserve:5, spread:.015, range:80, color:0xd55757}
};

let selectedCharacter = null;
let renderer, scene, camera, clock;
let player = null;
let bots = [];
let pickups = [];
let obstacles = [];
let currentMode = 'boot';
let currentMap = null;
let yaw = 0;
let pitch = -0.12;
let matchRemaining = 420;
let matchActive = false;
let countdownActive = false;
let lastShot = 0;
let reloading = false;
let feedTimer = 0;
const keys = {};
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(0, 0);

Object.entries(CHARACTERS).forEach(([id,c]) => {
  const b = document.createElement('button');
  b.className = 'fighter-choice';
  b.innerHTML = `<span class="fighter-swatch" style="background:#${c.shirt.toString(16).padStart(6,'0')}"></span><strong>${c.name}</strong><small>${c.melee}</small>`;
  b.addEventListener('click', () => {
    selectedCharacter = id;
    document.querySelectorAll('.fighter-choice').forEach(x => x.classList.remove('selected'));
    b.classList.add('selected');
    enterButton.disabled = false;
  });
  rosterEl.appendChild(b);
});

enterButton.addEventListener('click', () => {
  bootScreen.classList.add('hidden');
  hud.classList.remove('hidden');
  init3D();
  buildHub();
});

returnHub.addEventListener('click', () => {
  resultScreen.classList.add('hidden');
  buildHub();
});

function init3D(){
  if(renderer) return;
  renderer = new THREE.WebGLRenderer({canvas, antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  camera = new THREE.PerspectiveCamera(67, innerWidth/innerHeight, .1, 600);
  clock = new THREE.Clock();
  addEventListener('resize', resize);
  resize();
  document.addEventListener('keydown', e => {keys[e.code] = true; if(e.code==='KeyR') reload(); if(e.code==='Digit1') switchWeapon(0); if(e.code==='Digit2') switchWeapon(1); if(e.code==='KeyE') interact();});
  document.addEventListener('keyup', e => keys[e.code] = false);
  canvas.addEventListener('click', () => {
    if(document.pointerLockElement !== canvas) canvas.requestPointerLock?.();
    else attack();
  });
  document.addEventListener('mousemove', e => {
    if(document.pointerLockElement !== canvas) return;
    yaw -= e.movementX * .0023;
    pitch -= e.movementY * .0019;
    pitch = THREE.MathUtils.clamp(pitch, -0.72, 0.42);
  });
  animate();
}

function resize(){
  if(!renderer) return;
  renderer.setSize(innerWidth, innerHeight, false);
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
}

function resetScene(bg=0x101827, fog=0x101827){
  scene = new THREE.Scene();
  scene.background = new THREE.Color(bg);
  scene.fog = new THREE.Fog(fog, 38, 150);
  pickups = []; obstacles = []; bots = [];
  const hemi = new THREE.HemisphereLight(0xbfd4ff, 0x20232a, 1.65);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffffff, 1.35);
  sun.position.set(18,30,10); sun.castShadow = true;
  sun.shadow.mapSize.set(2048,2048); sun.shadow.camera.left=-55; sun.shadow.camera.right=55; sun.shadow.camera.top=55; sun.shadow.camera.bottom=-55;
  scene.add(sun);
}

function mat(color, rough=.75, metal=.05){return new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal});}
function box(x,y,z,w,h,d,color, collide=true){
  const m = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), mat(color));
  m.position.set(x,y,z); m.castShadow = true; m.receiveShadow = true; scene.add(m);
  if(collide) obstacles.push({mesh:m, half:new THREE.Vector3(w/2,h/2,d/2)});
  return m;
}
function cylinder(x,y,z,r,h,color){
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,18),mat(color));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;scene.add(m);return m;
}
function ground(color=0x283040,size=130){const g=box(0,-.55,0,size,1,size,color,false);g.receiveShadow=true;return g;}

function makeHumanoid(charId, isBot=false){
  const c = CHARACTERS[charId];
  const root = new THREE.Group();
  const torso = new THREE.Mesh(new THREE.BoxGeometry(.9,1.15,.48),mat(c.shirt)); torso.position.y=1.55; torso.castShadow=true;
  const head = new THREE.Mesh(new THREE.SphereGeometry(.38,16,12),mat(c.skin)); head.position.y=2.42; head.castShadow=true;
  const hair = new THREE.Mesh(new THREE.SphereGeometry(.39,16,8,0,Math.PI*2,0,Math.PI*.52),mat(c.hair)); hair.position.y=2.56; hair.castShadow=true;
  const legs = new THREE.Group();
  [-.24,.24].forEach(x=>{const l=new THREE.Mesh(new THREE.BoxGeometry(.28,.85,.32),mat(c.pants));l.position.set(x,.58,0);l.castShadow=true;legs.add(l);});
  const arms = new THREE.Group();
  [-.6,.6].forEach(x=>{const a=new THREE.Mesh(new THREE.BoxGeometry(.22,.92,.25),mat(c.skin));a.position.set(x,1.52,0);a.rotation.z=x>0?-.12:.12;a.castShadow=true;arms.add(a);});
  root.add(torso,head,hair,legs,arms);
  const ring = new THREE.Mesh(new THREE.RingGeometry(.62,.72,24),new THREE.MeshBasicMaterial({color:isBot?0xff685e:0x6aa0ff,side:THREE.DoubleSide,transparent:true,opacity:.8}));ring.rotation.x=-Math.PI/2;ring.position.y=.02;root.add(ring);
  root.userData.parts = {torso,head,arms};
  return root;
}

function makeActor(charId, position, isBot=false, label=''){
  const mesh = makeHumanoid(charId,isBot); mesh.position.copy(position); scene.add(mesh);
  const actor = {charId,name:label||CHARACTERS[charId].name,mesh,isBot,health:100,maxHealth:100,velocity:new THREE.Vector3(),onGround:true,weapons:[],slot:0,kills:0,deaths:0,special:0,ultra:0,spawnProtection:0,dead:false,respawnAt:0,target:null,thinkAt:0,lastShot:0,strafe:Math.random()<.5?-1:1};
  mesh.userData.actor = actor;
  return actor;
}

function buildHub(){
  currentMode='hub'; currentMap=null; matchActive=false; countdownActive=false;
  resetScene(0x0d1a29,0x0d1a29); ground(0x314637,120);
  // Ocean and beach
  box(-26,-.2,-23,58,.25,28,0x2d6d9a,false);
  box(-12,-.28,-7,45,.35,13,0xbda97a,false);
  // Haunted beach house
  box(-18,2,-10,13,5,8,0x4a4650);
  box(-18,5.4,-10,14,1.4,9,0x262532);
  box(-18,1.2,-5.85,3,2.4,.3,0x151821,false);
  for(let i=0;i<4;i++) box(-22+i*2.7,2.7,-5.8,1.25,1.2,.22,0x7aa0b8,false);
  const housePortal = new THREE.Mesh(new THREE.BoxGeometry(4,3.2,.4),new THREE.MeshBasicMaterial({color:0x8c66ff,transparent:true,opacity:.28}));housePortal.position.set(-18,1.6,-5.25);housePortal.userData.portal='haunted';scene.add(housePortal);
  // City tower
  box(18,8,3,12,17,12,0x263142);
  for(let y=2;y<15;y+=2.4) for(let x=14.5;x<=21.5;x+=2.3) box(x,y,-3.05,1.15,.9,.12,0x65a8c8,false);
  box(18,1.35,-3.2,3.4,2.7,.28,0x171b22,false);
  const cityPortal = new THREE.Mesh(new THREE.BoxGeometry(4,3.2,.4),new THREE.MeshBasicMaterial({color:0x5fd0ff,transparent:true,opacity:.28}));cityPortal.position.set(18,1.6,-3.45);cityPortal.userData.portal='city';scene.add(cityPortal);
  // hub detail
  cylinder(0,1,2,1.4,2,0x6b6a5f); cylinder(0,2.2,2,2.8,.18,0x8a8373);
  box(0,.25,13,18,.5,5,0x555b61,false);
  player = makeActor(selectedCharacter,new THREE.Vector3(0,0,19),false,CHARACTERS[selectedCharacter].name);
  player.mesh.rotation.y=Math.PI;
  player.weapons=[]; player.health=100; player.special=0; player.ultra=0;
  yaw=Math.PI; pitch=-.14;
  hudName.textContent=player.name; modeLabel.textContent='WARFARE HUB'; matchTimer.textContent='HUB'; placement.textContent='EXPLORE';
  addFeed('Explore the hub. Haunted Beach House is left; City Rooftop is right.');
  updateHud();
}

function startMatch(mapId){
  currentMode='match'; currentMap=mapId; matchRemaining=420; matchActive=false; countdownActive=true;
  if(mapId==='haunted') buildHaunted(); else buildCity();
  const chars=Object.keys(CHARACTERS);
  const spawns = spawnPoints(mapId);
  player = makeActor(selectedCharacter,spawns[0],false,CHARACTERS[selectedCharacter].name);
  player.weapons=[]; player.kills=0; player.deaths=0; player.special=0; player.ultra=0;
  for(let i=1;i<8;i++){
    let id=chars[(i-1)%chars.length]; if(id===selectedCharacter) id=chars[i%chars.length];
    const suffix=i>6?' II':'';
    const b=makeActor(id,spawns[i%spawns.length],true,CHARACTERS[id].name+suffix); bots.push(b);
  }
  spawnWeapons(mapId);
  modeLabel.textContent=mapId==='haunted'?'HAUNTED BEACH HOUSE':'CITY ROOFTOP';
  introMap.textContent=modeLabel.textContent; intro.classList.remove('hidden');
  runCountdown(); updateHud();
}

function buildHaunted(){
  resetScene(0x07101c,0x07101c); scene.fog = new THREE.Fog(0x07101c,24,95); ground(0x26332a,110);
  box(-31,-.15,0,28,.25,80,0x2c688e,false); box(-18,-.25,0,15,.3,80,0xb5a172,false);
  // House shell and rooms: two open floors with partial walls for playability
  box(8,.1,0,31,.3,25,0x6d5d4d,false);
  const wall=0x4b4550;
  box(8,2.25,-12,31,4.5,.6,wall); box(8,2.25,12,31,4.5,.6,wall); box(-7.5,2.25,0,.6,4.5,24,wall); box(23.5,2.25,0,.6,4.5,24,wall);
  box(8,4.55,0,31,.3,25,0x584c43,false);
  box(8,6.5,-12,31,4,.6,wall); box(8,6.5,12,31,4,.6,wall); box(-7.5,6.5,0,.6,4,24,wall); box(23.5,6.5,0,.6,4,24,wall);
  // partial internal walls / cover
  box(1,2.2,-4,.5,4.2,9,0x59515b); box(13,2.2,5,.5,4.2,10,0x59515b); box(7,2.2,2,9,4.2,.45,0x59515b);
  box(2,6.3,5,.5,3.5,9,0x59515b); box(14,6.3,-3,.5,3.5,10,0x59515b);
  // deck, pool, garage-ish cover and dunes
  box(-2,.18,-18,24,.4,8,0x745941,false); box(17,1,-20,10,2,6,0x3a4047); box(2,.05,20,13,.25,6,0x2d7f99,false);
  for(let z=-28;z<=28;z+=14) box(-13,.6,z,2.5,1.2,5,0x9e906b);
  // ramps standing in for stairs
  const ramp=box(19,2.3,7,3,.35,10,0x6c5a49,false); ramp.rotation.x=-.43;
  // lightning moon
  const moon=new THREE.Mesh(new THREE.SphereGeometry(4,24,18),new THREE.MeshBasicMaterial({color:0xdde8ff}));moon.position.set(-38,28,-35);scene.add(moon);
}

function buildCity(){
  resetScene(0x172038,0x172038); scene.fog = new THREE.Fog(0x172038,60,180);
  // distant city blocks
  for(let x=-90;x<=90;x+=18) for(let z=-90;z<=90;z+=18){if(Math.abs(x)<45&&Math.abs(z)<45) continue; const h=8+Math.random()*26; box(x,-6+h/2,z,12,h,12,0x273247,false);}
  // playable rooftops at y=0 plane illusion
  box(0,-.6,0,30,1,30,0x4a5360,false); box(29,-.6,-5,20,1,20,0x414b59,false); box(-29,-.6,7,20,1,22,0x424a56,false); box(5,-.6,31,20,1,20,0x46505c,false);
  // bridges
  box(18,.05,-3,10,.4,4,0x6b7078,false); box(-18,.05,5,10,.4,4,0x6b7078,false); box(4,.05,20,4,.4,10,0x6b7078,false);
  // edge barriers & cover
  const barrier=0x69717d;
  [[0,0,30,30],[29,-5,20,20],[-29,7,20,22],[5,31,20,20]].forEach(([cx,cz,w,d])=>{
    box(cx,.65,cz-d/2,w,1.3,.5,barrier); box(cx,.65,cz+d/2,w,1.3,.5,barrier); box(cx-w/2,.65,cz,.5,1.3,d,barrier); box(cx+w/2,.65,cz,.5,1.3,d,barrier);
  });
  for(let i=0;i<12;i++){const x=-12+Math.random()*24,z=-12+Math.random()*24;box(x,.8,z,2.5,1.6,2.5,0x59616c);}
  box(30,2,-5,5,4,5,0x303944); cylinder(-29,1.7,8,2.1,3.4,0x505a68); box(5,1.2,31,8,2.4,4,0x39434f);
  const sign=box(2,3.5,-13.8,12,5,.4,0x202738,false); sign.material.emissive=new THREE.Color(0x243b73); sign.material.emissiveIntensity=.6;
}

function spawnPoints(mapId){
  if(mapId==='haunted') return [new THREE.Vector3(-2,0,-18),new THREE.Vector3(8,0,0),new THREE.Vector3(18,0,-5),new THREE.Vector3(0,0,14),new THREE.Vector3(-15,0,12),new THREE.Vector3(-16,0,-14),new THREE.Vector3(15,0,15),new THREE.Vector3(-15,0,27)];
  return [new THREE.Vector3(0,0,8),new THREE.Vector3(9,0,-8),new THREE.Vector3(29,0,-5),new THREE.Vector3(-29,0,7),new THREE.Vector3(5,0,31),new THREE.Vector3(-8,0,-8),new THREE.Vector3(10,0,10),new THREE.Vector3(-9,0,9)];
}

function spawnWeapons(mapId){
  const list=mapId==='haunted'?
    [['pistol',5,0,-7],['smg',-3,0,7],['rifle',-3,0,-19],['shotgun',18,0,-20],['lmg',10,0,9],['sniper',18,4.8,7],['launcher',-16,0,20],['rifle',-14,0,-12],['shotgun',3,0,15]]:
    [['pistol',-7,0,-7],['smg',8,0,7],['rifle',29,0,-5],['shotgun',-29,0,7],['lmg',5,0,31],['sniper',0,0,-10],['launcher',31,0,-8],['rifle',-25,0,13],['smg',10,0,28]];
  list.forEach(([type,x,y,z])=>createPickup(type,new THREE.Vector3(x,y+.45,z)));
}

function createPickup(type,pos){
  const def=WEAPONS[type];
  const group=new THREE.Group();
  const body=new THREE.Mesh(new THREE.BoxGeometry(1.15,.26,.3),mat(def.color,.35,.35)); body.castShadow=true; group.add(body);
  const grip=new THREE.Mesh(new THREE.BoxGeometry(.22,.45,.2),mat(0x25282e));grip.position.set(.18,-.28,0);grip.rotation.z=-.18;group.add(grip);
  group.position.copy(pos); group.userData.pickupType=type; scene.add(group);
  pickups.push({type,mesh:group,baseY:pos.y,phase:Math.random()*Math.PI*2,available:true,respawnAt:0});
}

function nearestPickup(actor, max=2.4){let best=null,dist=max;for(const p of pickups){if(!p.available)continue;const d=p.mesh.position.distanceTo(actor.mesh.position);if(d<dist){dist=d;best=p;}}return best;}
function pickupWeapon(actor,p){
  if(!p||!p.available)return;
  const def=WEAPONS[p.type];
  const item={type:p.type,ammo:def.mag,reserve:def.reserve};
  if(actor.weapons.length<2) actor.weapons.push(item); else actor.weapons[actor.slot]=item;
  actor.slot=actor.weapons.length-1;
  p.available=false;p.mesh.visible=false;p.respawnAt=performance.now()+18000;
  if(!actor.isBot)addFeed(`Picked up ${def.name}`);
  updateHud();
}

function runCountdown(){
  let n=3; introCount.textContent=n;
  const timer=setInterval(()=>{n--;if(n>0)introCount.textContent=n;else if(n===0)introCount.textContent='BRAWL!';else{clearInterval(timer);intro.classList.add('hidden');countdownActive=false;matchActive=true;}},700);
}

function interact(){
  if(!player||player.dead)return;
  if(currentMode==='hub'){
    if(player.mesh.position.distanceTo(new THREE.Vector3(-18,0,-5.3))<4.4) startMatch('haunted');
    else if(player.mesh.position.distanceTo(new THREE.Vector3(18,0,-3.4))<4.4) startMatch('city');
  }else if(currentMode==='match'){
    const p=nearestPickup(player);if(p)pickupWeapon(player,p);
  }
}

function switchWeapon(slot){if(!player||slot>=player.weapons.length)return;player.slot=slot;reloading=false;updateHud();}
function reload(){
  if(!player||reloading||player.dead)return; const w=player.weapons[player.slot]; if(!w)return; const d=WEAPONS[w.type]; if(w.ammo>=d.mag||w.reserve<=0)return;
  reloading=true; ammoText.textContent='RELOADING...'; setTimeout(()=>{if(!player||!w)return;const need=d.mag-w.ammo,take=Math.min(need,w.reserve);w.ammo+=take;w.reserve-=take;reloading=false;updateHud();},950);
}

function attack(){
  if(!player||player.dead||countdownActive||currentMode==='hub')return;
  const w=player.weapons[player.slot]; if(!w){melee(player);return;} if(reloading)return;
  const d=WEAPONS[w.type],now=performance.now(); if(now-lastShot<d.fireRate)return; lastShot=now;
  if(w.ammo<=0){reload();return;} w.ammo--; fireGun(player,w,true); updateHud();
}

function melee(actor){
  const now=performance.now(); if(now-actor.lastShot<650)return; actor.lastShot=now;
  const candidates=[player,...bots].filter(a=>a!==actor&&!a.dead);
  let target=null,best=2.35; for(const a of candidates){const d=a.mesh.position.distanceTo(actor.mesh.position);if(d<best){best=d;target=a;}}
  if(target){damageActor(target,22,actor); target.velocity.add(target.mesh.position.clone().sub(actor.mesh.position).normalize().multiplyScalar(5));}
}

function fireGun(actor,w,isHuman=false){
  const d=WEAPONS[w.type];
  if(w.type==='launcher'){fireLauncher(actor,d);return;}
  const shots=d.pellets||1;
  for(let i=0;i<shots;i++){
    let origin,dir;
    if(isHuman){origin=camera.position.clone();dir=new THREE.Vector3(0,0,-1).applyQuaternion(camera.quaternion);}
    else{origin=actor.mesh.position.clone().add(new THREE.Vector3(0,1.7,0));const target=actor.target;if(!target)return;dir=target.mesh.position.clone().add(new THREE.Vector3(0,1.4,0)).sub(origin).normalize();}
    dir.x+=(Math.random()-.5)*d.spread;dir.y+=(Math.random()-.5)*d.spread;dir.z+=(Math.random()-.5)*d.spread;dir.normalize();
    raycaster.set(origin,dir);raycaster.far=d.range;
    const targets=[player,...bots].filter(a=>a!==actor&&!a.dead).map(a=>a.mesh);
    const hits=raycaster.intersectObjects(targets,true);
    if(hits.length){let obj=hits[0].object;while(obj&&!obj.userData.actor)obj=obj.parent;const hitActor=obj?.userData.actor;if(hitActor)damageActor(hitActor,d.damage,actor);}
    tracer(origin,origin.clone().add(dir.multiplyScalar(Math.min(d.range,28))),d.color);
  }
}

function fireLauncher(actor,d){
  const origin=actor.mesh.position.clone().add(new THREE.Vector3(0,1.5,0));let dir;
  if(actor.isBot&&actor.target) dir=actor.target.mesh.position.clone().sub(origin).normalize(); else dir=new THREE.Vector3(0,0,-1).applyQuaternion(camera.quaternion);
  const end=origin.clone().add(dir.multiplyScalar(18)); tracer(origin,end,0xff755d,5);
  setTimeout(()=>{for(const a of [player,...bots]){if(a===actor||a.dead)continue;const dist=a.mesh.position.distanceTo(end);if(dist<7)damageActor(a,d.damage*(1-dist/9),actor);}},100);
}

function tracer(a,b,color,width=1){
  const geo=new THREE.BufferGeometry().setFromPoints([a,b]);const line=new THREE.Line(geo,new THREE.LineBasicMaterial({color,transparent:true,opacity:.8,linewidth:width}));scene.add(line);setTimeout(()=>{scene.remove(line);geo.dispose();line.material.dispose();},55);
}

function damageActor(victim,amount,attacker){
  if(victim.dead||victim.spawnProtection>0)return;
  victim.health-=amount; attacker.special=Math.min(100,attacker.special+amount*.18); attacker.ultra=Math.min(100,attacker.ultra+amount*.045);
  victim.mesh.userData.parts?.torso.material.emissive?.set?.(0xffffff);
  setTimeout(()=>{if(victim.mesh.userData.parts?.torso?.material?.emissive)victim.mesh.userData.parts.torso.material.emissive.set(0x000000);},80);
  if(victim.health<=0) eliminate(victim,attacker);
  if(victim===player)updateHud();
}

function eliminate(victim,attacker){
  victim.dead=true;victim.health=0;victim.deaths++;attacker.kills++;
  victim.mesh.visible=false; victim.respawnAt=performance.now()+2200;
  if(victim.weapons.length){victim.weapons=[];}
  addFeed(`${attacker.name} eliminated ${victim.name}`);
  if(attacker.kills>=20){endMatch(attacker);return;}
  updateHud();
}

function respawn(actor){
  const pts=spawnPoints(currentMap);let p=pts[Math.floor(Math.random()*pts.length)].clone();
  actor.mesh.position.copy(p);actor.health=100;actor.dead=false;actor.mesh.visible=true;actor.spawnProtection=2;actor.velocity.set(0,0,0);actor.weapons=[];
}

function endMatch(winner=null){
  if(!matchActive)return;matchActive=false;
  const ranked=[player,...bots].sort((a,b)=>b.kills-a.kills||a.deaths-b.deaths);const place=ranked.indexOf(player)+1;
  resultTitle.textContent=`${place}${place===1?'ST':place===2?'ND':place===3?'RD':'TH'} PLACE`;
  resultTable.innerHTML=ranked.slice(0,8).map((a,i)=>`<div class="result-row"><strong>${i+1}</strong><span>${a.name}</span><span>${a.kills} ELIMS</span><span>${a.deaths} DEATHS</span></div>`).join('');
  resultScreen.classList.remove('hidden'); if(document.pointerLockElement===canvas)document.exitPointerLock?.();
}

function updatePlayer(dt){
  if(!player||player.dead)return;
  const forward=new THREE.Vector3(Math.sin(yaw),0,Math.cos(yaw));
  const right=new THREE.Vector3(forward.z,0,-forward.x);
  const move=new THREE.Vector3();
  if(keys.KeyW)move.addScaledVector(forward,-1);if(keys.KeyS)move.add(forward);if(keys.KeyA)move.addScaledVector(right,-1);if(keys.KeyD)move.add(right);
  if(move.lengthSq()>0){move.normalize();const speed=keys.ShiftLeft||keys.ShiftRight?9.4:6.2;const old=player.mesh.position.clone();player.mesh.position.addScaledVector(move,speed*dt);player.mesh.rotation.y=Math.atan2(move.x,move.z);resolveWorld(player,old);}
  if(keys.Space&&player.onGround){player.velocity.y=7.4;player.onGround=false;keys.Space=false;}
  player.velocity.y-=18*dt;player.mesh.position.y+=player.velocity.y*dt;if(player.mesh.position.y<=0){player.mesh.position.y=0;player.velocity.y=0;player.onGround=true;}
  if(player.spawnProtection>0)player.spawnProtection=Math.max(0,player.spawnProtection-dt);
  // camera
  const target=player.mesh.position.clone().add(new THREE.Vector3(0,1.7,0));const dist=5.2;const cp=Math.cos(pitch);const offset=new THREE.Vector3(Math.sin(yaw)*cp*dist,1.0+Math.sin(-pitch)*dist,Math.cos(yaw)*cp*dist);camera.position.copy(target).add(offset);camera.lookAt(target.clone().add(new THREE.Vector3(-Math.sin(yaw)*8,Math.sin(pitch)*8,-Math.cos(yaw)*8)));
}

function resolveWorld(actor,old){
  const p=actor.mesh.position;
  if(currentMode==='match'&&currentMap==='city'){
    const zones=[[0,0,15,15],[29,-5,10,10],[-29,7,10,11],[5,31,10,10],[18,-3,7,3],[-18,5,7,3],[4,20,3,7]];
    const safe=zones.some(([x,z,hw,hd])=>Math.abs(p.x-x)<=hw&&Math.abs(p.z-z)<=hd); if(!safe)p.copy(old);
  }else{p.x=THREE.MathUtils.clamp(p.x,-52,52);p.z=THREE.MathUtils.clamp(p.z,-52,52);}
  for(const o of obstacles){if(Math.abs(p.x-o.mesh.position.x)<o.half.x+.45&&Math.abs(p.z-o.mesh.position.z)<o.half.z+.45&&p.y<o.mesh.position.y+o.half.y){p.x=old.x;p.z=old.z;break;}}
}

function updateBots(dt,time){
  for(const b of bots){
    if(b.dead){if(time>b.respawnAt)respawn(b);continue;} if(b.spawnProtection>0)b.spawnProtection=Math.max(0,b.spawnProtection-dt);
    if(time>b.thinkAt){b.thinkAt=time+300+Math.random()*450;const enemies=[player,...bots].filter(a=>a!==b&&!a.dead);enemies.sort((a,c)=>a.mesh.position.distanceTo(b.mesh.position)-c.mesh.position.distanceTo(b.mesh.position));b.target=enemies[0]||null;const p=nearestPickup(b,7);if(p&&b.weapons.length<2)pickupWeapon(b,p);}
    if(!b.target)continue;const delta=b.target.mesh.position.clone().sub(b.mesh.position);const dist=delta.length();delta.y=0;if(delta.lengthSq())delta.normalize();
    const old=b.mesh.position.clone(); let desired=dist>11?delta.clone():new THREE.Vector3(-delta.z,0,delta.x).multiplyScalar(b.strafe).addScaledVector(delta,dist<5?-.8:.15).normalize();b.mesh.position.addScaledVector(desired,4.1*dt);b.mesh.rotation.y=Math.atan2(delta.x,delta.z);resolveWorld(b,old);
    if(dist<2.2&&!b.weapons.length)melee(b);
    if(b.weapons.length&&dist<WEAPONS[b.weapons[b.slot].type].range*.65){const w=b.weapons[b.slot],d=WEAPONS[w.type];if(time-b.lastShot>d.fireRate*(1.15+Math.random()*.45)){b.lastShot=time;b.target=b.target;fireGun(b,w,false);}}
  }
}

function updatePickups(time){for(const p of pickups){if(!p.available&&time>p.respawnAt){p.available=true;p.mesh.visible=true;}if(p.available){p.mesh.rotation.y+=.012;p.mesh.position.y=p.baseY+Math.sin(time*.002+p.phase)*.12;}}}
function updateInteraction(){
  let text='';if(currentMode==='hub'&&player){if(player.mesh.position.distanceTo(new THREE.Vector3(-18,0,-5.3))<4.4)text='E — ENTER HAUNTED BEACH HOUSE';else if(player.mesh.position.distanceTo(new THREE.Vector3(18,0,-3.4))<4.4)text='E — TAKE ELEVATOR TO CITY ROOFTOP';}
  else if(currentMode==='match'&&nearestPickup(player)) text=`E — PICK UP ${WEAPONS[nearestPickup(player).type].name}`;
  interactionPrompt.textContent=text;interactionPrompt.classList.toggle('hidden',!text);
}

function updateHud(){
  if(!player)return;healthFill.style.width=`${Math.max(0,player.health)}%`;healthText.textContent=Math.ceil(Math.max(0,player.health));specialFill.style.width=`${player.special}%`;ultraFill.style.width=`${player.ultra}%`;
  const w=player.weapons[player.slot];weaponName.textContent=w?WEAPONS[w.type].name:'UNARMED';ammoText.textContent=w?`${w.ammo} / ${w.reserve}`:CHARACTERS[player.charId].melee;
  if(currentMode==='match'){const ranked=[player,...bots].sort((a,b)=>b.kills-a.kills||a.deaths-b.deaths);const p=ranked.indexOf(player)+1;placement.textContent=`#${p} • ${player.kills} ELIMS`;}
}

function addFeed(text){const e=document.createElement('div');e.className='feed-item';e.textContent=text;feed.prepend(e);while(feed.children.length>5)feed.lastChild.remove();setTimeout(()=>e.remove(),4500);}

function animate(){
  requestAnimationFrame(animate); if(!renderer||!scene)return; const dt=Math.min(clock.getDelta(),.033),time=performance.now();
  updatePlayer(dt);updateBots(dt,time);updatePickups(time);updateInteraction();
  if(matchActive){matchRemaining-=dt;matchTimer.textContent=`${Math.floor(matchRemaining/60)}:${Math.floor(matchRemaining%60).toString().padStart(2,'0')}`;if(matchRemaining<=0)endMatch();}
  updateHud();renderer.render(scene,camera);
}
