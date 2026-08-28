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
const hitMarker = $('hitMarker');
const damageFlash = $('damageFlash');
const slotOne = $('slotOne');
const slotTwo = $('slotTwo');
const adsLabel = $('adsLabel');

const CHARACTERS = {
  sean:    {name:'SEAN', shirt:0x2f66c8, pants:0x2b2e34, skin:0xf0c7a5, hair:0x3a271b, melee:'HEAVY SWING', meleeDamage:27, meleeRange:2.55},
  shannan: {name:'SHANNAN', shirt:0x8a4fb3, pants:0x20232b, skin:0xf1c8aa, hair:0x553329, melee:'QUICK STRIKE', meleeDamage:20, meleeRange:2.25},
  erin:    {name:'ERIN', shirt:0xe35b8f, pants:0x4a4f59, skin:0xf2c9aa, hair:0x68422e, melee:'BRUSH BASH', meleeDamage:23, meleeRange:2.4},
  liam:    {name:'LIAM', shirt:0x284c8f, pants:0x162638, skin:0xefc4a2, hair:0x4a3021, melee:'SHOULDER CHECK', meleeDamage:25, meleeRange:2.7},
  connor:  {name:'CONNOR', shirt:0x4e9a5b, pants:0x313640, skin:0xefc6a5, hair:0x3f2a20, melee:'PAINT SWIPE', meleeDamage:22, meleeRange:2.5},
  kelly:   {name:'KELLY', shirt:0xe3b84f, pants:0x3a3444, skin:0xf2c9aa, hair:0x74513b, melee:'FAST JAB', meleeDamage:19, meleeRange:2.2}
};

const WEAPONS = {
  pistol:  {name:'PISTOL', damage:19, fireRate:290, mag:12, reserve:48, spread:.004, adsSpread:.002, range:95, reload:900, color:0xb9c1cc, auto:false},
  smg:     {name:'SMG', damage:10, fireRate:92, mag:30, reserve:120, spread:.022, adsSpread:.011, range:68, reload:1150, color:0x4f83cc, auto:true},
  rifle:   {name:'ASSAULT RIFLE', damage:16, fireRate:135, mag:30, reserve:90, spread:.011, adsSpread:.0045, range:118, reload:1250, color:0x5bb56b, auto:true},
  shotgun: {name:'SHOTGUN', damage:12, pellets:7, fireRate:720, mag:6, reserve:30, spread:.09, adsSpread:.065, range:38, reload:1350, color:0xcf8a42, auto:false},
  lmg:     {name:'LMG', damage:13, fireRate:112, mag:60, reserve:120, spread:.025, adsSpread:.013, range:98, reload:1900, color:0x9270cf, auto:true},
  sniper:  {name:'SNIPER', damage:78, fireRate:1180, mag:4, reserve:16, spread:.0015, adsSpread:.0003, range:190, reload:1650, color:0x5cc7ce, auto:false},
  launcher:{name:'LAUNCHER', damage:64, fireRate:1180, mag:1, reserve:5, spread:.012, adsSpread:.006, range:86, reload:1800, color:0xd55757, auto:false}
};

let selectedCharacter = null;
let renderer, scene, camera, clock;
let player = null;
let bots = [];
let pickups = [];
let obstacles = [];
let worldMeshes = [];
let currentMode = 'boot';
let currentMap = null;
let yaw = Math.PI;
let pitch = -0.12;
let matchRemaining = 420;
let matchActive = false;
let countdownActive = false;
let reloading = false;
let reloadToken = 0;
let mouseDown = false;
let ads = false;
let lastHumanShot = 0;
let cameraKick = 0;
let hitMarkerUntil = 0;
let damageFlashUntil = 0;
const keys = {};
const raycaster = new THREE.Raycaster();

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
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  camera = new THREE.PerspectiveCamera(67, innerWidth/innerHeight, .1, 650);
  clock = new THREE.Clock();
  addEventListener('resize', resize);
  resize();

  document.addEventListener('keydown', e => {
    keys[e.code] = true;
    if(e.code==='KeyR') reload();
    if(e.code==='Digit1') switchWeapon(0);
    if(e.code==='Digit2') switchWeapon(1);
    if(e.code==='KeyE') interact();
  });
  document.addEventListener('keyup', e => keys[e.code] = false);
  canvas.addEventListener('mousedown', e => {
    if(document.pointerLockElement !== canvas){ canvas.requestPointerLock?.(); return; }
    if(e.button===0){ mouseDown=true; attack(); }
    if(e.button===2) ads=true;
  });
  document.addEventListener('mouseup', e => {
    if(e.button===0) mouseDown=false;
    if(e.button===2) ads=false;
  });
  canvas.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('mousemove', e => {
    if(document.pointerLockElement !== canvas) return;
    const sensitivity = ads ? .0015 : .00225;
    yaw -= e.movementX * sensitivity;
    pitch -= e.movementY * sensitivity * .82;
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
  scene.fog = new THREE.Fog(fog, 42, 155);
  pickups=[]; obstacles=[]; worldMeshes=[]; bots=[];
  const hemi = new THREE.HemisphereLight(0xbfd4ff,0x20232a,1.25); scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffffff,1.55); sun.position.set(18,30,10); sun.castShadow=true;
  sun.shadow.mapSize.set(2048,2048); sun.shadow.camera.left=-60; sun.shadow.camera.right=60; sun.shadow.camera.top=60; sun.shadow.camera.bottom=-60; scene.add(sun);
}

const material = (color, rough=.72, metal=.05, emissive=0x000000) => new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal,emissive});
function box(x,y,z,w,h,d,color,collide=true,shootBlock=true){
  const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material(color));
  m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;scene.add(m);
  if(collide) obstacles.push({mesh:m,half:new THREE.Vector3(w/2,h/2,d/2)});
  if(shootBlock) worldMeshes.push(m);
  return m;
}
function cylinder(x,y,z,r,h,color,collide=false){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,18),material(color));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;scene.add(m);if(collide){obstacles.push({mesh:m,half:new THREE.Vector3(r,h/2,r)});worldMeshes.push(m);}return m;}
function ground(color=0x283040,size=130){return box(0,-.55,0,size,1,size,color,false,true);}

function makeHumanoid(charId,isBot=false){
  const c=CHARACTERS[charId]; const root=new THREE.Group();
  const torso=new THREE.Mesh(new THREE.BoxGeometry(.92,1.15,.5),material(c.shirt)); torso.position.y=1.55; torso.castShadow=true;
  const head=new THREE.Mesh(new THREE.SphereGeometry(.38,18,14),material(c.skin)); head.position.y=2.42; head.castShadow=true;
  const hair=new THREE.Mesh(new THREE.SphereGeometry(.392,18,10,0,Math.PI*2,0,Math.PI*.52),material(c.hair)); hair.position.y=2.56; hair.castShadow=true;
  const legs=new THREE.Group();[-.24,.24].forEach(x=>{const l=new THREE.Mesh(new THREE.BoxGeometry(.28,.85,.32),material(c.pants));l.position.set(x,.58,0);l.castShadow=true;legs.add(l);});
  const arms=new THREE.Group();[-.6,.6].forEach(x=>{const a=new THREE.Mesh(new THREE.BoxGeometry(.22,.92,.25),material(c.skin));a.position.set(x,1.52,0);a.rotation.z=x>0?-.12:.12;a.castShadow=true;arms.add(a);});
  root.add(torso,head,hair,legs,arms);
  const ring=new THREE.Mesh(new THREE.RingGeometry(.61,.7,24),new THREE.MeshBasicMaterial({color:isBot?0xff6c60:0x72a8ff,side:THREE.DoubleSide,transparent:true,opacity:.72}));ring.rotation.x=-Math.PI/2;ring.position.y=.025;root.add(ring);
  root.userData.parts={torso,head,arms,legs};
  return root;
}

function makeActor(charId,pos,isBot=false,label=''){
  const mesh=makeHumanoid(charId,isBot);mesh.position.copy(pos);scene.add(mesh);
  const actor={charId,name:label||CHARACTERS[charId].name,mesh,isBot,health:100,maxHealth:100,velocity:new THREE.Vector3(),onGround:true,weapons:[],slot:0,kills:0,deaths:0,special:0,ultra:0,spawnProtection:0,dead:false,respawnAt:0,target:null,thinkAt:0,lastShot:0,lastMelee:0,strafe:Math.random()<.5?-1:1,aggression:.85+Math.random()*.3,preferred:Math.random()<.35?'close':Math.random()<.5?'range':'balanced'};
  mesh.userData.actor=actor; return actor;
}

function buildHub(){
  currentMode='hub';currentMap=null;matchActive=false;countdownActive=false;reloading=false;mouseDown=false;
  resetScene(0x0a1726,0x0a1726);ground(0x314637,120);
  box(-27,-.18,-23,60,.25,28,0x1e5f88,false,true);box(-12,-.27,-7,46,.35,13,0xbba879,false,true);
  // Haunted house silhouette
  box(-18,2,-10,13,5,8,0x494451);box(-18,5.4,-10,14,1.4,9,0x242330);
  box(-18,1.2,-5.85,3,2.4,.3,0x11141b,false);for(let i=0;i<4;i++){const w=box(-22+i*2.7,2.7,-5.8,1.25,1.2,.22,0x6686a0,false,false);w.material.emissive.set(0x182438);w.material.emissiveIntensity=.8;}
  const housePortal=new THREE.Mesh(new THREE.BoxGeometry(4,3.2,.4),new THREE.MeshBasicMaterial({color:0x8c66ff,transparent:true,opacity:.24}));housePortal.position.set(-18,1.6,-5.25);scene.add(housePortal);
  // City tower
  box(18,8,3,12,17,12,0x253143);for(let y=2;y<15;y+=2.4)for(let x=14.5;x<=21.5;x+=2.3){const w=box(x,y,-3.05,1.15,.9,.12,0x5f9ec4,false,false);w.material.emissive.set(0x153655);w.material.emissiveIntensity=.65;}
  box(18,1.35,-3.2,3.4,2.7,.28,0x11161d,false);const cityPortal=new THREE.Mesh(new THREE.BoxGeometry(4,3.2,.4),new THREE.MeshBasicMaterial({color:0x5fd0ff,transparent:true,opacity:.24}));cityPortal.position.set(18,1.6,-3.45);scene.add(cityPortal);
  cylinder(0,1,2,1.4,2,0x6b6a5f);cylinder(0,2.2,2,2.8,.18,0x8a8373);box(0,.25,13,18,.5,5,0x555b61,false,true);
  player=makeActor(selectedCharacter,new THREE.Vector3(0,0,19),false);player.mesh.rotation.y=Math.PI;yaw=Math.PI;pitch=-.14;
  hudName.textContent=player.name;modeLabel.textContent='WARFARE HUB';matchTimer.textContent='HUB';placement.textContent='EXPLORE';
  addFeed('Haunted Beach House ←     City Rooftop →');updateHud();
}

function startMatch(mapId){
  currentMode='match';currentMap=mapId;matchRemaining=420;matchActive=false;countdownActive=true;reloading=false;reloadToken++;
  mapId==='haunted'?buildHaunted():buildCity();
  const chars=Object.keys(CHARACTERS),spawns=spawnPoints(mapId);
  player=makeActor(selectedCharacter,spawns[0],false);player.kills=0;player.deaths=0;
  for(let i=1;i<8;i++){let id=chars[(i-1)%chars.length];if(id===selectedCharacter)id=chars[i%chars.length];const suffix=i>6?' II':'';bots.push(makeActor(id,spawns[i%spawns.length],true,CHARACTERS[id].name+suffix));}
  spawnWeapons(mapId);modeLabel.textContent=mapId==='haunted'?'HAUNTED BEACH HOUSE':'CITY ROOFTOP';introMap.textContent=modeLabel.textContent;intro.classList.remove('hidden');runCountdown();updateHud();
}

function buildHaunted(){
  resetScene(0x050b14,0x07101c);scene.fog=new THREE.Fog(0x07101c,22,92);ground(0x26332a,112);
  box(-31,-.15,0,28,.25,82,0x205d83,false,true);box(-18,-.25,0,15,.3,82,0xb4a171,false,true);
  box(8,.1,0,31,.3,25,0x695b4c,false,true);const wall=0x48424e;
  box(8,2.25,-12,31,4.5,.6,wall);box(8,2.25,12,31,4.5,.6,wall);box(-7.5,2.25,0,.6,4.5,24,wall);box(23.5,2.25,0,.6,4.5,24,wall);
  box(8,4.55,0,31,.3,25,0x574a40,false,true);box(8,6.5,-12,31,4,.6,wall);box(8,6.5,12,31,4,.6,wall);box(-7.5,6.5,0,.6,4,24,wall);box(23.5,6.5,0,.6,4,24,wall);
  box(1,2.2,-4,.5,4.2,8,0x56505a);box(13,2.2,5,.5,4.2,9,0x56505a);box(7,2.2,2,8,4.2,.45,0x56505a);box(2,6.3,5,.5,3.5,8,0x56505a);box(14,6.3,-3,.5,3.5,9,0x56505a);
  box(-2,.18,-18,24,.4,8,0x735941,false,true);box(17,1,-20,10,2,6,0x373e46);box(2,.05,20,13,.25,6,0x236f8b,false,true);
  for(let z=-28;z<=28;z+=14)box(-13,.6,z,2.5,1.2,5,0x9a8c69);
  const moon=new THREE.Mesh(new THREE.SphereGeometry(4,24,18),new THREE.MeshBasicMaterial({color:0xdde8ff}));moon.position.set(-38,28,-35);scene.add(moon);
  const spooky=new THREE.PointLight(0x795cff,9,22,2);spooky.position.set(8,5,0);scene.add(spooky);
  for(let i=0;i<6;i++){const lamp=new THREE.PointLight(i%2?0x7ea6ff:0xffb078,3.2,12,2);lamp.position.set(-2+i*4.5,2.8,(i%2?7:-7));scene.add(lamp);}
}

function buildCity(){
  resetScene(0x111a31,0x172038);scene.fog=new THREE.Fog(0x172038,62,185);
  for(let x=-90;x<=90;x+=18)for(let z=-90;z<=90;z+=18){if(Math.abs(x)<45&&Math.abs(z)<45)continue;const h=8+Math.random()*28;const b=box(x,-6+h/2,z,12,h,12,0x273247,false,true);if(Math.random()>.6){b.material.emissive.set(0x071120);b.material.emissiveIntensity=.45;}}
  box(0,-.6,0,30,1,30,0x4a5360,false,true);box(29,-.6,-5,20,1,20,0x414b59,false,true);box(-29,-.6,7,20,1,22,0x424a56,false,true);box(5,-.6,31,20,1,20,0x46505c,false,true);
  box(18,.05,-3,10,.4,4,0x6b7078,false,true);box(-18,.05,5,10,.4,4,0x6b7078,false,true);box(4,.05,20,4,.4,10,0x6b7078,false,true);
  const barrier=0x69717d;[[0,0,30,30],[29,-5,20,20],[-29,7,20,22],[5,31,20,20]].forEach(([cx,cz,w,d])=>{box(cx,.65,cz-d/2,w,1.3,.5,barrier);box(cx,.65,cz+d/2,w,1.3,.5,barrier);box(cx-w/2,.65,cz,.5,1.3,d,barrier);box(cx+w/2,.65,cz,.5,1.3,d,barrier);});
  for(let i=0;i<12;i++)box(-12+Math.random()*24,.8,-12+Math.random()*24,2.5,1.6,2.5,0x59616c);
  box(30,2,-5,5,4,5,0x303944);cylinder(-29,1.7,8,2.1,3.4,0x505a68,true);box(5,1.2,31,8,2.4,4,0x39434f);
  const sign=box(2,3.5,-13.8,12,5,.4,0x202738,false,true);sign.material.emissive.set(0x243b73);sign.material.emissiveIntensity=.8;
  const cityGlow=new THREE.PointLight(0x4e78ff,8,55,2);cityGlow.position.set(4,18,18);scene.add(cityGlow);
}

function spawnPoints(mapId){
  return mapId==='haunted'?[new THREE.Vector3(-2,0,-18),new THREE.Vector3(8,0,0),new THREE.Vector3(18,0,-5),new THREE.Vector3(0,0,14),new THREE.Vector3(-15,0,12),new THREE.Vector3(-16,0,-14),new THREE.Vector3(15,0,15),new THREE.Vector3(-15,0,27)]:[new THREE.Vector3(0,0,8),new THREE.Vector3(9,0,-8),new THREE.Vector3(29,0,-5),new THREE.Vector3(-29,0,7),new THREE.Vector3(5,0,31),new THREE.Vector3(-8,0,-8),new THREE.Vector3(10,0,10),new THREE.Vector3(-9,0,9)];
}

function spawnWeapons(mapId){
  const list=mapId==='haunted'?[['pistol',5,-7],['smg',-3,7],['rifle',-3,-19],['shotgun',18,-20],['lmg',10,9],['sniper',18,7],['launcher',-16,20],['rifle',-14,-12],['shotgun',3,15]]:[['pistol',-7,-7],['smg',8,7],['rifle',29,-5],['shotgun',-29,7],['lmg',5,31],['sniper',0,-10],['launcher',31,-8],['rifle',-25,13],['smg',10,28]];
  list.forEach(([type,x,z])=>createPickup(type,new THREE.Vector3(x,.45,z)));
}

function createPickup(type,pos){
  const def=WEAPONS[type],group=new THREE.Group();
  const body=new THREE.Mesh(new THREE.BoxGeometry(1.18,.25,.3),material(def.color,.3,.45));body.castShadow=true;group.add(body);
  const barrel=new THREE.Mesh(new THREE.BoxGeometry(.7,.1,.12),material(0x1f2329,.25,.65));barrel.position.x=.75;group.add(barrel);
  const grip=new THREE.Mesh(new THREE.BoxGeometry(.22,.45,.2),material(0x25282e));grip.position.set(.15,-.28,0);grip.rotation.z=-.18;group.add(grip);
  const glow=new THREE.PointLight(def.color,1.4,5,2);glow.position.y=.5;group.add(glow);
  group.position.copy(pos);scene.add(group);pickups.push({type,mesh:group,baseY:pos.y,phase:Math.random()*Math.PI*2,available:true,respawnAt:0});
}

function nearestPickup(actor,max=2.6){let best=null,dist=max;for(const p of pickups){if(!p.available)continue;const d=p.mesh.position.distanceTo(actor.mesh.position);if(d<dist){dist=d;best=p;}}return best;}
function pickupWeapon(actor,p){if(!p||!p.available)return;const d=WEAPONS[p.type],item={type:p.type,ammo:d.mag,reserve:d.reserve};if(actor.weapons.length<2){actor.weapons.push(item);actor.slot=actor.weapons.length-1;}else actor.weapons[actor.slot]=item;p.available=false;p.mesh.visible=false;p.respawnAt=performance.now()+18000;if(!actor.isBot)addFeed(`Picked up ${d.name}`);updateHud();}

function runCountdown(){let n=3;introCount.textContent=n;const timer=setInterval(()=>{n--;if(n>0)introCount.textContent=n;else if(n===0)introCount.textContent='BRAWL!';else{clearInterval(timer);intro.classList.add('hidden');countdownActive=false;matchActive=true;addFeed('First to 20 eliminations wins.');}},700);}

function interact(){
  if(!player||player.dead)return;
  if(currentMode==='hub'){
    if(player.mesh.position.distanceTo(new THREE.Vector3(-18,0,-5.3))<4.5)startMatch('haunted');
    else if(player.mesh.position.distanceTo(new THREE.Vector3(18,0,-3.4))<4.5)startMatch('city');
  } else {const p=nearestPickup(player);if(p)pickupWeapon(player,p);}
}

function switchWeapon(slot){if(!player||slot>=player.weapons.length)return;player.slot=slot;reloading=false;reloadToken++;updateHud();}
function reload(){
  if(!player||reloading||player.dead)return;const w=player.weapons[player.slot];if(!w)return;const d=WEAPONS[w.type];if(w.ammo>=d.mag||w.reserve<=0)return;
  reloading=true;const token=++reloadToken;ammoText.textContent='RELOADING…';
  setTimeout(()=>{if(token!==reloadToken||!player||player.dead)return;const active=player.weapons[player.slot];if(active!==w)return;const need=d.mag-w.ammo,take=Math.min(need,w.reserve);w.ammo+=take;w.reserve-=take;reloading=false;updateHud();},d.reload);
}

function attack(){
  if(!player||player.dead||countdownActive||currentMode==='hub')return;
  const w=player.weapons[player.slot];if(!w){melee(player);return;}if(reloading)return;
  const d=WEAPONS[w.type],now=performance.now();if(now-lastHumanShot<d.fireRate)return;lastHumanShot=now;if(w.ammo<=0){reload();return;}w.ammo--;fireGun(player,w,true);cameraKick=Math.min(cameraKick+.035,.12);if(w.ammo===0&&w.reserve>0)setTimeout(reload,180);updateHud();
}

function melee(actor){
  const now=performance.now();if(now-actor.lastMelee<620)return;actor.lastMelee=now;const cfg=CHARACTERS[actor.charId];
  const forward=new THREE.Vector3(Math.sin(actor.mesh.rotation.y),0,Math.cos(actor.mesh.rotation.y));
  let target=null,best=cfg.meleeRange;for(const a of [player,...bots]){if(a===actor||a.dead)continue;const delta=a.mesh.position.clone().sub(actor.mesh.position),dist=delta.length();if(dist<best&&delta.normalize().dot(forward)>.05){best=dist;target=a;}}
  const arms=actor.mesh.userData.parts?.arms;if(arms){arms.rotation.x=-.8;setTimeout(()=>{if(arms)arms.rotation.x=0;},130);}
  if(target){damageActor(target,cfg.meleeDamage,actor,true);const push=target.mesh.position.clone().sub(actor.mesh.position).setY(0).normalize().multiplyScalar(actor.charId==='liam'?7:4.5);target.velocity.add(push);}
}

function fireGun(actor,w,isHuman=false){
  const d=WEAPONS[w.type];if(w.type==='launcher'){fireLauncher(actor,d,isHuman);return;}
  const shots=d.pellets||1;
  for(let i=0;i<shots;i++){
    let origin,dir;
    if(isHuman){origin=camera.position.clone();dir=new THREE.Vector3(0,0,-1).applyQuaternion(camera.quaternion);}else{if(!actor.target)return;origin=actor.mesh.position.clone().add(new THREE.Vector3(0,1.65,0));dir=actor.target.mesh.position.clone().add(new THREE.Vector3(0,1.35,0)).sub(origin).normalize();}
    const spread=(isHuman&&ads?d.adsSpread:d.spread)*(isHuman?1:(1.7+Math.random()*.7));dir.x+=(Math.random()-.5)*spread;dir.y+=(Math.random()-.5)*spread;dir.z+=(Math.random()-.5)*spread;dir.normalize();
    raycaster.set(origin,dir);raycaster.far=d.range;
    const actorMeshes=[player,...bots].filter(a=>a!==actor&&!a.dead).map(a=>a.mesh);const actorHits=raycaster.intersectObjects(actorMeshes,true);const worldHits=raycaster.intersectObjects(worldMeshes,false);
    const actorHit=actorHits[0],worldHit=worldHits[0];let end=origin.clone().add(dir.clone().multiplyScalar(Math.min(d.range,38)));
    if(worldHit&&(!actorHit||worldHit.distance<actorHit.distance))end.copy(worldHit.point);
    else if(actorHit){end.copy(actorHit.point);let obj=actorHit.object;while(obj&&!obj.userData.actor)obj=obj.parent;const victim=obj?.userData.actor;if(victim)damageActor(victim,d.damage,actor,false);}
    tracer(origin,end,d.color);
  }
  muzzleFlash(actor,d.color);
}

function fireLauncher(actor,d,isHuman){
  let origin,dir;if(isHuman){origin=camera.position.clone();dir=new THREE.Vector3(0,0,-1).applyQuaternion(camera.quaternion);}else{origin=actor.mesh.position.clone().add(new THREE.Vector3(0,1.5,0));if(!actor.target)return;dir=actor.target.mesh.position.clone().sub(origin).normalize();}
  raycaster.set(origin,dir);raycaster.far=d.range;const worldHit=raycaster.intersectObjects(worldMeshes,false)[0];const end=worldHit?worldHit.point.clone():origin.clone().add(dir.multiplyScalar(Math.min(d.range,30)));tracer(origin,end,0xff755d);
  const blast=new THREE.Mesh(new THREE.SphereGeometry(.4,12,8),new THREE.MeshBasicMaterial({color:0xff8a4d,transparent:true,opacity:.9}));blast.position.copy(end);scene.add(blast);let scale=.4;const started=performance.now();
  const grow=()=>{const t=(performance.now()-started)/220;scale=1+t*7;blast.scale.setScalar(scale);blast.material.opacity=1-t;if(t<1)requestAnimationFrame(grow);else{scene.remove(blast);blast.geometry.dispose();blast.material.dispose();}};grow();
  for(const a of [player,...bots]){if(a===actor||a.dead)continue;const dist=a.mesh.position.distanceTo(end);if(dist<7.5)damageActor(a,d.damage*Math.max(.18,1-dist/8.5),actor,false);}
}

function tracer(a,b,color){const geo=new THREE.BufferGeometry().setFromPoints([a,b]);const line=new THREE.Line(geo,new THREE.LineBasicMaterial({color,transparent:true,opacity:.88}));scene.add(line);setTimeout(()=>{scene.remove(line);geo.dispose();line.material.dispose();},65);}
function muzzleFlash(actor,color){const p=new THREE.PointLight(color,4,4,2);p.position.copy(actor.mesh.position).add(new THREE.Vector3(0,1.6,0));scene.add(p);setTimeout(()=>scene.remove(p),55);}

function damageActor(victim,amount,attacker,isMelee=false){
  if(!victim||victim.dead||victim.spawnProtection>0)return;victim.health-=amount;attacker.special=Math.min(100,attacker.special+amount*.17);attacker.ultra=Math.min(100,attacker.ultra+amount*.04);
  const torso=victim.mesh.userData.parts?.torso;if(torso){torso.material.emissive.set(0xffffff);setTimeout(()=>torso.material.emissive.set(0x000000),75);}
  if(attacker===player){hitMarkerUntil=performance.now()+95;hitMarker?.classList.add('active');}
  if(victim===player){damageFlashUntil=performance.now()+120;damageFlash?.classList.add('active');}
  if(victim.health<=0)eliminate(victim,attacker);if(victim===player||attacker===player)updateHud();
}

function eliminate(victim,attacker){
  if(victim.dead)return;victim.dead=true;victim.health=0;victim.deaths++;attacker.kills++;victim.mesh.visible=false;victim.respawnAt=performance.now()+2300;victim.weapons=[];addFeed(`${attacker.name} eliminated ${victim.name}`);if(attacker.kills>=20){endMatch(attacker);return;}updateHud();
}

function safestSpawn(actor){
  const pts=spawnPoints(currentMap),enemies=[player,...bots].filter(a=>a!==actor&&!a.dead);let best=pts[0],bestScore=-Infinity;
  for(const p of pts){let nearest=999;for(const e of enemies)nearest=Math.min(nearest,p.distanceTo(e.mesh.position));if(nearest>bestScore){bestScore=nearest;best=p;}}
  return best.clone();
}
function respawn(actor){actor.mesh.position.copy(safestSpawn(actor));actor.health=100;actor.dead=false;actor.mesh.visible=true;actor.spawnProtection=2;actor.velocity.set(0,0,0);actor.weapons=[];if(actor===player)addFeed('Respawn protection: 2 seconds');}

function endMatch(){
  if(!matchActive)return;matchActive=false;mouseDown=false;const ranked=[player,...bots].slice().sort((a,b)=>b.kills-a.kills||a.deaths-b.deaths),place=ranked.indexOf(player)+1;const suffix=place===1?'ST':place===2?'ND':place===3?'RD':'TH';resultTitle.textContent=`${place}${suffix} PLACE`;resultTable.innerHTML=ranked.map((a,i)=>`<div class="result-row ${a===player?'you':''}"><strong>${i+1}</strong><span>${a.name}${a===player?' • YOU':''}</span><span>${a.kills} ELIMS</span><span>${a.deaths} DEATHS</span></div>`).join('');resultScreen.classList.remove('hidden');if(document.pointerLockElement===canvas)document.exitPointerLock?.();
}

function updatePlayer(dt,time){
  if(!player||player.dead)return;
  const camForward=new THREE.Vector3(-Math.sin(yaw),0,-Math.cos(yaw)),right=new THREE.Vector3(-camForward.z,0,camForward.x),move=new THREE.Vector3();
  if(keys.KeyW)move.add(camForward);if(keys.KeyS)move.addScaledVector(camForward,-1);if(keys.KeyA)move.addScaledVector(right,-1);if(keys.KeyD)move.add(right);
  if(move.lengthSq()>0){move.normalize();const speed=(keys.ShiftLeft||keys.ShiftRight)?9.8:6.4,old=player.mesh.position.clone();player.mesh.position.addScaledVector(move,speed*dt);player.mesh.rotation.y=Math.atan2(move.x,move.z);resolveWorld(player,old);animateRun(player,time,speed>8);}
  if(keys.Space&&player.onGround){player.velocity.y=7.5;player.onGround=false;keys.Space=false;}
  player.velocity.y-=18*dt;player.mesh.position.y+=player.velocity.y*dt;if(player.mesh.position.y<=0){player.mesh.position.y=0;player.velocity.y=0;player.onGround=true;}
  if(player.spawnProtection>0)player.spawnProtection=Math.max(0,player.spawnProtection-dt);
  const target=player.mesh.position.clone().add(new THREE.Vector3(0,1.72,0)),dist=ads?3.25:5.3,cp=Math.cos(pitch),kick=cameraKick;cameraKick*=.82;
  const offset=new THREE.Vector3(Math.sin(yaw)*cp*dist,1.0+Math.sin(-pitch-kick)*dist,Math.cos(yaw)*cp*dist);if(ads)offset.add(new THREE.Vector3(Math.cos(yaw)*.55,0,-Math.sin(yaw)*.55));camera.position.copy(target).add(offset);camera.lookAt(target.clone().add(new THREE.Vector3(-Math.sin(yaw)*9,Math.sin(pitch+kick)*9,-Math.cos(yaw)*9)));camera.fov=THREE.MathUtils.lerp(camera.fov,ads?54:67,.18);camera.updateProjectionMatrix();
  if(mouseDown){const w=player.weapons[player.slot];if(w&&WEAPONS[w.type].auto)attack();}
}

function animateRun(actor,time,sprinting=false){const parts=actor.mesh.userData.parts;if(!parts)return;const s=Math.sin(time*.012*(sprinting?1.35:1));parts.arms.rotation.x=s*.25;parts.legs.rotation.x=-s*.12;}

function resolveWorld(actor,old){
  const p=actor.mesh.position;if(currentMode==='match'&&currentMap==='city'){const zones=[[0,0,15,15],[29,-5,10,10],[-29,7,10,11],[5,31,10,10],[18,-3,7,3],[-18,5,7,3],[4,20,3,7]];if(!zones.some(([x,z,hw,hd])=>Math.abs(p.x-x)<=hw&&Math.abs(p.z-z)<=hd)){p.copy(old);return;}}else{p.x=THREE.MathUtils.clamp(p.x,-52,52);p.z=THREE.MathUtils.clamp(p.z,-52,52);}
  for(const o of obstacles){if(Math.abs(p.x-o.mesh.position.x)<o.half.x+.46&&Math.abs(p.z-o.mesh.position.z)<o.half.z+.46&&p.y<o.mesh.position.y+o.half.y){p.x=old.x;p.z=old.z;break;}}
}

function hasLineOfSight(a,b){const origin=a.mesh.position.clone().add(new THREE.Vector3(0,1.5,0)),target=b.mesh.position.clone().add(new THREE.Vector3(0,1.35,0)),dir=target.clone().sub(origin),dist=dir.length();dir.normalize();raycaster.set(origin,dir);raycaster.far=dist;const hit=raycaster.intersectObjects(worldMeshes,false)[0];return !hit||hit.distance>dist-.4;}

function botTryPickup(b){const p=nearestPickup(b,7);if(p&&(b.weapons.length<2||Math.random()<.12))pickupWeapon(b,p);}
function botReload(b,w){const d=WEAPONS[w.type];if(w.ammo>0||w.reserve<=0)return false;const take=Math.min(d.mag,w.reserve);w.ammo=take;w.reserve-=take;return true;}

function updateBots(dt,time){
  for(const b of bots){
    if(b.dead){if(time>b.respawnAt)respawn(b);continue;}if(b.spawnProtection>0)b.spawnProtection=Math.max(0,b.spawnProtection-dt);
    if(time>b.thinkAt){b.thinkAt=time+260+Math.random()*420;const enemies=[player,...bots].filter(a=>a!==b&&!a.dead);enemies.sort((a,c)=>a.mesh.position.distanceTo(b.mesh.position)-c.mesh.position.distanceTo(b.mesh.position));b.target=enemies.find(e=>hasLineOfSight(b,e))||enemies[0]||null;botTryPickup(b);if(Math.random()<.08)b.strafe*=-1;}
    if(!b.target)continue;const delta=b.target.mesh.position.clone().sub(b.mesh.position),dist=delta.length();delta.y=0;if(delta.lengthSq())delta.normalize();const old=b.mesh.position.clone();let desired;
    if(!b.weapons.length)desired=dist>2.1?delta.clone():new THREE.Vector3(-delta.z,0,delta.x).multiplyScalar(b.strafe);
    else{const ideal=b.preferred==='close'?7:b.preferred==='range'?18:12;desired=new THREE.Vector3(-delta.z,0,delta.x).multiplyScalar(b.strafe).addScaledVector(delta,dist>ideal?1:dist<ideal*.55?-.8:.08).normalize();}
    b.mesh.position.addScaledVector(desired,(4.0*b.aggression)*dt);b.mesh.rotation.y=Math.atan2(delta.x,delta.z);resolveWorld(b,old);animateRun(b,time,false);
    if(dist<CHARACTERS[b.charId].meleeRange&&( !b.weapons.length || Math.random()<.012))melee(b);
    if(b.weapons.length&&hasLineOfSight(b,b.target)){
      let w=b.weapons[b.slot],d=WEAPONS[w.type];if(w.ammo<=0){if(!botReload(b,w)){b.weapons.splice(b.slot,1);b.slot=0;}continue;}
      if(dist<d.range*.72&&time-b.lastShot>d.fireRate*(1.25+Math.random()*.65)){b.lastShot=time;w.ammo--;fireGun(b,w,false);if(w.ammo===0)botReload(b,w);}
    }
  }
}

function updatePickups(time){for(const p of pickups){if(!p.available&&time>p.respawnAt){p.available=true;p.mesh.visible=true;}if(p.available){p.mesh.rotation.y+=.012;p.mesh.position.y=p.baseY+Math.sin(time*.002+p.phase)*.12;}}}
function updateInteraction(){let text='';if(currentMode==='hub'&&player){if(player.mesh.position.distanceTo(new THREE.Vector3(-18,0,-5.3))<4.5)text='E — ENTER HAUNTED BEACH HOUSE';else if(player.mesh.position.distanceTo(new THREE.Vector3(18,0,-3.4))<4.5)text='E — TAKE ELEVATOR TO CITY ROOFTOP';}else if(currentMode==='match'&&player){const p=nearestPickup(player);if(p)text=`E — PICK UP ${WEAPONS[p.type].name}`;}interactionPrompt.textContent=text;interactionPrompt.classList.toggle('hidden',!text);}

function updateHud(){
  if(!player)return;healthFill.style.width=`${Math.max(0,player.health)}%`;healthText.textContent=Math.ceil(Math.max(0,player.health));specialFill.style.width=`${player.special}%`;ultraFill.style.width=`${player.ultra}%`;const w=player.weapons[player.slot];weaponName.textContent=w?WEAPONS[w.type].name:'UNARMED';ammoText.textContent=reloading?'RELOADING…':w?`${w.ammo} / ${w.reserve}`:CHARACTERS[player.charId].melee;
  slotOne.textContent=player.weapons[0]?`1  ${WEAPONS[player.weapons[0].type].name}`:'1  EMPTY';slotTwo.textContent=player.weapons[1]?`2  ${WEAPONS[player.weapons[1].type].name}`:'2  EMPTY';slotOne.classList.toggle('active',player.slot===0&&player.weapons.length>0);slotTwo.classList.toggle('active',player.slot===1&&player.weapons.length>1);adsLabel.textContent=ads?'AIMING':'HIP FIRE';
  if(currentMode==='match'){const ranked=[player,...bots].slice().sort((a,b)=>b.kills-a.kills||a.deaths-b.deaths),p=ranked.indexOf(player)+1;placement.textContent=`#${p} • ${player.kills} ELIMS`;}
}

function addFeed(text){const e=document.createElement('div');e.className='feed-item';e.textContent=text;feed.prepend(e);while(feed.children.length>5)feed.lastChild.remove();setTimeout(()=>e.remove(),4500);}

function animate(){
  requestAnimationFrame(animate);if(!renderer||!scene)return;const dt=Math.min(clock.getDelta(),.033),time=performance.now();updatePlayer(dt,time);updateBots(dt,time);updatePickups(time);updateInteraction();
  if(matchActive){matchRemaining-=dt;matchTimer.textContent=`${Math.floor(matchRemaining/60)}:${Math.floor(matchRemaining%60).toString().padStart(2,'0')}`;if(matchRemaining<=0)endMatch();}
  if(hitMarker&&time>hitMarkerUntil)hitMarker.classList.remove('active');if(damageFlash&&time>damageFlashUntil)damageFlash.classList.remove('active');updateHud();renderer.render(scene,camera);
}
