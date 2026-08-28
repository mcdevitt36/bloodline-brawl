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
  sean:{name:'SEAN',shirt:0x2f66c8,pants:0x2b2e34,skin:0xf0c7a5,hair:0x3a271b,melee:'HEAVY SWING',meleeDamage:27,meleeRange:2.55},
  shannan:{name:'SHANNAN',shirt:0x8a4fb3,pants:0x20232b,skin:0xf1c8aa,hair:0x553329,melee:'QUICK STRIKE',meleeDamage:20,meleeRange:2.25},
  erin:{name:'ERIN',shirt:0xe35b8f,pants:0x4a4f59,skin:0xf2c9aa,hair:0x68422e,melee:'BRUSH BASH',meleeDamage:23,meleeRange:2.4},
  liam:{name:'LIAM',shirt:0x284c8f,pants:0x162638,skin:0xefc4a2,hair:0x4a3021,melee:'SHOULDER CHECK',meleeDamage:25,meleeRange:2.7},
  connor:{name:'CONNOR',shirt:0x4e9a5b,pants:0x313640,skin:0xefc6a5,hair:0x3f2a20,melee:'PAINT SWIPE',meleeDamage:22,meleeRange:2.5},
  kelly:{name:'KELLY',shirt:0xe3b84f,pants:0x3a3444,skin:0xf2c9aa,hair:0x74513b,melee:'FAST JAB',meleeDamage:19,meleeRange:2.2}
};

const WEAPONS = {
  pistol:{name:'PISTOL',damage:19,fireRate:290,mag:12,reserve:48,spread:.004,adsSpread:.002,range:95,reload:900,color:0xb9c1cc,auto:false},
  smg:{name:'SMG',damage:10,fireRate:92,mag:30,reserve:120,spread:.022,adsSpread:.011,range:68,reload:1150,color:0x4f83cc,auto:true},
  rifle:{name:'ASSAULT RIFLE',damage:16,fireRate:135,mag:30,reserve:90,spread:.011,adsSpread:.0045,range:118,reload:1250,color:0x5bb56b,auto:true},
  shotgun:{name:'SHOTGUN',damage:12,pellets:7,fireRate:720,mag:6,reserve:30,spread:.09,adsSpread:.065,range:38,reload:1350,color:0xcf8a42,auto:false},
  lmg:{name:'LMG',damage:13,fireRate:112,mag:60,reserve:120,spread:.025,adsSpread:.013,range:98,reload:1900,color:0x9270cf,auto:true},
  sniper:{name:'SNIPER',damage:78,fireRate:1180,mag:4,reserve:16,spread:.0015,adsSpread:.0003,range:190,reload:1650,color:0x5cc7ce,auto:false},
  launcher:{name:'LAUNCHER',damage:64,fireRate:1180,mag:1,reserve:5,spread:.012,adsSpread:.006,range:86,reload:1800,color:0xd55757,auto:false}
};

let selectedCharacter=null;
let renderer,scene,camera,clock;
let player=null;
let bots=[];
let pickups=[];
let obstacles=[];
let worldMeshes=[];
let currentMode='boot';
let currentMap=null;
let yaw=Math.PI;
let pitch=-.12;
let matchRemaining=420;
let matchActive=false;
let countdownActive=false;
let reloading=false;
let reloadToken=0;
let mouseDown=false;
let ads=false;
let lastHumanShot=0;
let cameraKick=0;
let hitMarkerUntil=0;
let damageFlashUntil=0;
const keys={};
const raycaster=new THREE.Raycaster();

Object.entries(CHARACTERS).forEach(([id,c])=>{
  const b=document.createElement('button');
  b.className='fighter-choice';
  b.innerHTML=`<span class="fighter-swatch" style="background:#${c.shirt.toString(16).padStart(6,'0')}"></span><strong>${c.name}</strong><small>${c.melee}</small>`;
  b.addEventListener('click',()=>{
    selectedCharacter=id;
    document.querySelectorAll('.fighter-choice').forEach(x=>x.classList.remove('selected'));
    b.classList.add('selected');
    enterButton.disabled=false;
  });
  rosterEl.appendChild(b);
});

enterButton.addEventListener('click',()=>{bootScreen.classList.add('hidden');hud.classList.remove('hidden');init3D();buildHub();});
returnHub.addEventListener('click',()=>{resultScreen.classList.add('hidden');buildHub();});

function init3D(){
  if(renderer)return;
  renderer=new THREE.WebGLRenderer({canvas,antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.05;
  camera=new THREE.PerspectiveCamera(67,innerWidth/innerHeight,.1,650);
  clock=new THREE.Clock();
  addEventListener('resize',resize);resize();
  document.addEventListener('keydown',e=>{keys[e.code]=true;if(e.code==='KeyR')reload();if(e.code==='Digit1')switchWeapon(0);if(e.code==='Digit2')switchWeapon(1);if(e.code==='KeyE')interact();});
  document.addEventListener('keyup',e=>keys[e.code]=false);
  canvas.addEventListener('mousedown',e=>{if(document.pointerLockElement!==canvas){canvas.requestPointerLock?.();return;}if(e.button===0){mouseDown=true;attack();}if(e.button===2)ads=true;});
  document.addEventListener('mouseup',e=>{if(e.button===0)mouseDown=false;if(e.button===2)ads=false;});
  canvas.addEventListener('contextmenu',e=>e.preventDefault());
  document.addEventListener('mousemove',e=>{if(document.pointerLockElement!==canvas)return;const sensitivity=ads?.0015:.00225;yaw-=e.movementX*sensitivity;pitch-=e.movementY*sensitivity*.82;pitch=THREE.MathUtils.clamp(pitch,-.72,.42);});
  animate();
}

function resize(){if(!renderer)return;renderer.setSize(innerWidth,innerHeight,false);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();}
function resetScene(bg=0x101827,fog=0x101827){scene=new THREE.Scene();scene.background=new THREE.Color(bg);scene.fog=new THREE.Fog(fog,42,155);pickups=[];obstacles=[];worldMeshes=[];bots=[];const hemi=new THREE.HemisphereLight(0xbfd4ff,0x20232a,1.25);scene.add(hemi);const sun=new THREE.DirectionalLight(0xffffff,1.55);sun.position.set(18,30,10);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-60;sun.shadow.camera.right=60;sun.shadow.camera.top=60;sun.shadow.camera.bottom=-60;scene.add(sun);}
const material=(color,rough=.72,metal=.05,emissive=0x000000)=>new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal,emissive});
function box(x,y,z,w,h,d,color,collide=true,shootBlock=true){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material(color));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;scene.add(m);if(collide)obstacles.push({mesh:m,half:new THREE.Vector3(w/2,h/2,d/2)});if(shootBlock)worldMeshes.push(m);return m;}
function cylinder(x,y,z,r,h,color,collide=false){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,18),material(color));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;scene.add(m);if(collide){obstacles.push({mesh:m,half:new THREE.Vector3(r,h/2,r)});worldMeshes.push(m);}return m;}
function ground(color=0x283040,size=130){return box(0,-.55,0,size,1,size,color,false,true);}
function pointLight(x,y,z,color,intensity=3,range=14){const l=new THREE.PointLight(color,intensity,range,2);l.position.set(x,y,z);scene.add(l);return l;}
function windowGlow(x,y,z,w=1.1,h=.9,color=0x7aa8c9){const m=box(x,y,z,w,h,.12,color,false,false);m.material.emissive.set(color);m.material.emissiveIntensity=.45;return m;}
function crate(x,z,w=2,d=2,h=1.4,color=0x5a4a3d){return box(x,h/2,z,w,h,d,color,true,true);}
function bench(x,z,rot=0){const seat=box(x,.65,z,2.5,.25,.75,0x55483b,true,true);seat.rotation.y=rot;return seat;}
function tree(x,z,s=1){cylinder(x,1.4*s,z,.28*s,2.8*s,0x403329,true);const crown=new THREE.Mesh(new THREE.SphereGeometry(1.15*s,10,8),material(0x1f3e34));crown.position.set(x,3*s,z);crown.castShadow=true;scene.add(crown);}
function railing(x,z,w,d){if(w)box(x,.7,z,w,1.4,.32,0x6b7078,true,true);if(d)box(x,.7,z,.32,1.4,d,0x6b7078,true,true);}

function makeHumanoid(charId,isBot=false){const c=CHARACTERS[charId],root=new THREE.Group();const torso=new THREE.Mesh(new THREE.BoxGeometry(.92,1.15,.5),material(c.shirt));torso.position.y=1.55;torso.castShadow=true;const head=new THREE.Mesh(new THREE.SphereGeometry(.38,18,14),material(c.skin));head.position.y=2.42;head.castShadow=true;const hair=new THREE.Mesh(new THREE.SphereGeometry(.392,18,10,0,Math.PI*2,0,Math.PI*.52),material(c.hair));hair.position.y=2.56;hair.castShadow=true;const legs=new THREE.Group();[-.24,.24].forEach(x=>{const l=new THREE.Mesh(new THREE.BoxGeometry(.28,.85,.32),material(c.pants));l.position.set(x,.58,0);l.castShadow=true;legs.add(l);});const arms=new THREE.Group();[-.6,.6].forEach(x=>{const a=new THREE.Mesh(new THREE.BoxGeometry(.22,.92,.25),material(c.skin));a.position.set(x,1.52,0);a.rotation.z=x>0?-.12:.12;a.castShadow=true;arms.add(a);});root.add(torso,head,hair,legs,arms);const ring=new THREE.Mesh(new THREE.RingGeometry(.61,.7,24),new THREE.MeshBasicMaterial({color:isBot?0xff6c60:0x72a8ff,side:THREE.DoubleSide,transparent:true,opacity:.72}));ring.rotation.x=-Math.PI/2;ring.position.y=.025;root.add(ring);root.userData.parts={torso,head,arms,legs};return root;}
function makeActor(charId,pos,isBot=false,label=''){const mesh=makeHumanoid(charId,isBot);mesh.position.copy(pos);scene.add(mesh);const actor={charId,name:label||CHARACTERS[charId].name,mesh,isBot,health:100,maxHealth:100,velocity:new THREE.Vector3(),onGround:true,weapons:[],slot:0,kills:0,deaths:0,special:0,ultra:0,spawnProtection:0,dead:false,respawnAt:0,target:null,thinkAt:0,lastShot:0,lastMelee:0,strafe:Math.random()<.5?-1:1,aggression:.85+Math.random()*.3,preferred:Math.random()<.35?'close':Math.random()<.5?'range':'balanced'};mesh.userData.actor=actor;return actor;}

function buildHub(){
  currentMode='hub';currentMap=null;matchActive=false;countdownActive=false;reloading=false;mouseDown=false;
  resetScene(0x0a1726,0x0a1726);ground(0x314637,120);
  box(-27,-.18,-23,60,.25,28,0x1e5f88,false,true);box(-12,-.27,-7,46,.35,13,0xbba879,false,true);
  box(-18,2,-10,13,5,8,0x494451);box(-18,5.4,-10,14,1.4,9,0x242330);box(-18,1.2,-5.85,3,2.4,.3,0x11141b,false);for(let i=0;i<4;i++)windowGlow(-22+i*2.7,2.7,-5.8,1.25,1.2,0x6686a0);
  const housePortal=new THREE.Mesh(new THREE.BoxGeometry(4,3.2,.4),new THREE.MeshBasicMaterial({color:0x8c66ff,transparent:true,opacity:.24}));housePortal.position.set(-18,1.6,-5.25);scene.add(housePortal);
  box(18,8,3,12,17,12,0x253143);for(let y=2;y<15;y+=2.4)for(let x=14.5;x<=21.5;x+=2.3)windowGlow(x,y,-3.05,1.15,.9,0x5f9ec4);box(18,1.35,-3.2,3.4,2.7,.28,0x11161d,false);const cityPortal=new THREE.Mesh(new THREE.BoxGeometry(4,3.2,.4),new THREE.MeshBasicMaterial({color:0x5fd0ff,transparent:true,opacity:.24}));cityPortal.position.set(18,1.6,-3.45);scene.add(cityPortal);
  cylinder(0,1,2,1.4,2,0x6b6a5f);cylinder(0,2.2,2,2.8,.18,0x8a8373);box(0,.25,13,18,.5,5,0x555b61,false,true);
  player=makeActor(selectedCharacter,new THREE.Vector3(0,0,19),false);player.mesh.rotation.y=Math.PI;yaw=Math.PI;pitch=-.14;hudName.textContent=player.name;modeLabel.textContent='WARFARE HUB';matchTimer.textContent='HUB';placement.textContent='EXPLORE';addFeed('Haunted Beach House ←     City Rooftop →');updateHud();
}

function startMatch(mapId){
  currentMode='match';currentMap=mapId;matchRemaining=420;matchActive=false;countdownActive=true;reloading=false;reloadToken++;
  mapId==='haunted'?buildHaunted():buildCity();
  const chars=Object.keys(CHARACTERS),spawns=spawnPoints(mapId);player=makeActor(selectedCharacter,spawns[0],false);player.kills=0;player.deaths=0;
  for(let i=1;i<8;i++){let id=chars[(i-1)%chars.length];if(id===selectedCharacter)id=chars[i%chars.length];const suffix=i>6?' II':'';bots.push(makeActor(id,spawns[i%spawns.length],true,CHARACTERS[id].name+suffix));}
  spawnWeapons(mapId);modeLabel.textContent=mapId==='haunted'?'HAUNTED BEACH HOUSE':'CITY ROOFTOP';introMap.textContent=modeLabel.textContent;intro.classList.remove('hidden');runCountdown();updateHud();
}

function buildHaunted(){
  resetScene(0x030812,0x07101c);scene.fog=new THREE.Fog(0x07101c,26,108);ground(0x213027,122);
  box(-40,-.2,0,34,.28,100,0x174c70,false,true);box(-21,-.25,0,13,.32,100,0xb29d6d,false,true);
  for(let z=-38;z<=38;z+=12){const dune=box(-14,.25,z,6,.7,4.8,0x9f8c61,true,true);dune.rotation.y=(z%24===0?.18:-.18);}
  for(let z=-34;z<=34;z+=17)tree(-8,z,.8);

  const floor=0x685849,wall=0x443f49,trim=0x675d67;
  box(7,.08,0,34,.22,30,floor,false,true);
  // Outer shell with intentional door/window gaps rather than one solid box.
  box(-10,2.1,-10,1,4.2,10,wall);box(-10,2.1,10,1,4.2,10,wall);box(-10,2.1,0,1,4.2,4.5,wall);
  box(24,2.1,-9.5,1,4.2,11,wall);box(24,2.1,10,1,4.2,9,wall);
  box(7,2.1,-15,34,4.2,1,wall);box(-3,2.1,15,14,4.2,1,wall);box(17,2.1,15,14,4.2,1,wall);
  // Central foyer / hall spine.
  box(4,2.1,-5,.5,4.2,8,trim);box(4,2.1,7,.5,4.2,8,trim);
  box(12,2.1,-9,15,4.2,.45,trim);box(12,2.1,8.5,15,4.2,.45,trim);
  // Living room: open sightlines plus fireplace cover.
  box(-1,1.25,-2,3,2.5,1.1,0x51443d,true,true);crate(-4,-6,2.2,1.6,1.3,0x594638);bench(-3,5,.05);
  // Kitchen island creates a close-range loop.
  box(15,.8,-3,5.5,1.6,2.2,0x5f6264,true,true);box(18,.55,-10,8,1.1,1.3,0x3c4044,true,true);crate(10,-12,1.8,1.8,1.4,0x6a5845);
  // Study / bedroom side rooms.
  box(16,.75,12,4,1.5,2,0x4a3f38,true,true);box(8,.55,12,2.2,1.1,1.4,0x5b4b42,true,true);crate(22,5,1.7,1.7,1.5,0x4c4239);
  // Haunted visual second-story facade and attic silhouette (visual only, no fake collision).
  box(7,5.1,0,35,.35,30,0x4f453c,false,false);box(7,7.1,-15,35,4,1,0x393640,false,false);box(7,7.1,15,35,4,1,0x393640,false,false);box(-10,7.1,0,1,4,30,0x393640,false,false);box(24,7.1,0,1,4,30,0x393640,false,false);
  for(const x of [-5,2,9,16,22]){windowGlow(x,7.3,-14.45,1.4,1.2,x===9?0xa47cff:0x657d96);windowGlow(x,7.3,14.45,1.4,1.2,0x6c8398);}
  // Deck wraps beach side; pool and garage form two exterior combat pockets.
  box(-15,.18,-4,10,.4,28,0x71543d,false,true);for(let z=-15;z<=8;z+=5)railing(-19.5,z,0,4.2);
  box(12,.04,24,16,.16,8,0x1d617c,false,true);railing(4.2,24,0,8);railing(19.8,24,0,8);
  box(26,1.7,-22,12,3.4,10,0x353b42,true,true);box(20,.7,-22,2.5,1.4,4,0x4c5157,true,true);crate(31,-19,2.1,2.1,1.6,0x60503e);
  // Pier is an exposed high-value weapon route.
  box(-28,.12,18,17,.3,3.4,0x6d523b,false,true);for(let x=-35;x<=-21;x+=4)cylinder(x,-.25,19.2,.18,1.5,0x4b382d,false);
  // Attic/roof silhouette and moon.
  const roof=new THREE.Mesh(new THREE.ConeGeometry(25,6,4),material(0x252531));roof.position.set(7,10.2,0);roof.rotation.y=Math.PI/4;roof.scale.z=.65;scene.add(roof);
  const moon=new THREE.Mesh(new THREE.SphereGeometry(4.5,24,18),new THREE.MeshBasicMaterial({color:0xe7eeff}));moon.position.set(-43,31,-39);scene.add(moon);
  pointLight(7,4,0,0x7453ff,11,26);pointLight(-4,2.8,-5,0xffad72,4,13);pointLight(16,2.8,-7,0xffc47b,3,12);pointLight(13,2.5,22,0x4d9ee8,5,16);pointLight(-28,2,18,0x6b83ff,3,14);
}

function buildCity(){
  resetScene(0x0b1224,0x111a31);scene.fog=new THREE.Fog(0x121a30,75,220);
  // Dense skyline rings the arena but never blocks gameplay paths.
  for(let x=-108;x<=108;x+=18)for(let z=-108;z<=108;z+=18){if(Math.abs(x)<52&&Math.abs(z)<55)continue;const h=10+Math.random()*38;const b=box(x,-8+h/2,z,12,h,12,0x222d42,false,true);if(Math.random()>.55){b.material.emissive.set(0x06101c);b.material.emissiveIntensity=.55;}for(let wy=-1;wy<h-3;wy+=5)windowGlow(x,wy,z-6.05,1.1,.65,Math.random()>.65?0xffcf7a:0x4984b8);}

  // Four major roofs plus two smaller tactical roofs.
  box(0,-.6,0,32,1,32,0x47515e,false,true);box(31,-.6,-5,22,1,22,0x3f4957,false,true);box(-31,-.6,8,22,1,24,0x414a56,false,true);box(6,-.6,34,22,1,20,0x46515e,false,true);box(31,-.6,26,14,1,14,0x3c4653,false,true);box(-18,-.6,-27,16,1,14,0x414956,false,true);
  // Bridges create a readable loop around the whole map.
  box(19,.05,-3,10,.4,4,0x70757d,false,true);box(-19,.05,5,10,.4,4,0x70757d,false,true);box(5,.05,21,4,.4,12,0x70757d,false,true);box(22,.05,27,10,.4,3.6,0x70757d,false,true);box(-10,.05,-20,4,.4,14,0x70757d,false,true);

  const barrier=0x68717d;
  [[0,0,32,32],[31,-5,22,22],[-31,8,22,24],[6,34,22,20],[31,26,14,14],[-18,-27,16,14]].forEach(([cx,cz,w,d])=>{railing(cx,cz-d/2,w,0);railing(cx,cz+d/2,w,0);railing(cx-w/2,cz,0,d);railing(cx+w/2,cz,0,d);});
  // Central roof: helipad landmark and HVAC maze.
  const helipad=new THREE.Mesh(new THREE.CylinderGeometry(7,7,.12,40),material(0x343c48));helipad.position.set(0,.05,0);scene.add(helipad);const hRing=new THREE.Mesh(new THREE.TorusGeometry(4.6,.18,8,48),new THREE.MeshBasicMaterial({color:0xf0d46b}));hRing.rotation.x=Math.PI/2;hRing.position.set(0,.15,0);scene.add(hRing);box(0,.17,0,.8,.12,6,0xf0d46b,false,false);box(0,.17,0,4,.12,.8,0xf0d46b,false,false);
  [[-11,-10],[-11,10],[11,-10],[11,10],[-5,12],[7,-12]].forEach(([x,z],i)=>crate(x,z,i%2?3:2.3,i%2?2:3,1.6,0x59616c));
  // East roof: maintenance building and pipes; close-range hotspot.
  box(32,2,-5,7,4,6,0x2d3744,true,true);box(31,.65,4,8,1.3,2,0x555d68,true,true);for(let x=24;x<=38;x+=4)cylinder(x,.75,-13,.45,1.5,0x6c737b,true);
  // West roof: water tower / sniper contest.
  cylinder(-31,2.2,9,3,4.4,0x4c5967,true);for(const dx of [-2.2,2.2])for(const dz of [-2.2,2.2])cylinder(-31+dx,1,9+dz,.18,2,0x323843,false);crate(-25,15,2.2,2.2,1.4,0x565b63);
  // North roof: garden + glass shelter.
  for(const p of [[0,30],[4,31],[10,38],[12,31]])tree(p[0],p[1],.65);bench(1,38,0);bench(10,29,Math.PI/2);box(7,1.4,35,7,2.8,4,0x2b3f44,true,true);windowGlow(7,1.7,32.95,5,1.6,0x4e8e9a);
  // Construction roof: exposed launcher area with scaffolding.
  for(let y=1;y<=6;y+=2.2){box(28,y,26,.25,2,12,0x987b51,false,true);box(34,y,26,.25,2,12,0x987b51,false,true);box(31,y,20,.25,2,12,0x987b51,false,true);box(31,y,32,.25,2,12,0x987b51,false,true);}box(31,.9,26,7,1.8,2,0x70553b,true,true);
  // South-west billboard roof and huge neon sign.
  box(-18,2.4,-31,11,4.6,.55,0x1a2130,true,true);const sign=box(-18,2.4,-30.65,9,3.3,.14,0x233462,false,false);sign.material.emissive.set(0x335dca);sign.material.emissiveIntensity=1.25;pointLight(-18,4,-27,0x446cff,6,18);
  // Crane silhouette over the construction roof.
  cylinder(37,6,27,.42,12,0x8f7049,false);box(31,12,27,13,.5,.5,0x9b7b50,false,false);box(25,10.5,27,.6,3,.6,0x9b7b50,false,false);
  pointLight(3,18,19,0x4d72ff,9,65);pointLight(31,5,-5,0xffb45c,3,14);pointLight(-31,5,9,0x72b8ff,4,18);pointLight(6,4,34,0x66d9b3,3,16);
}

function spawnPoints(mapId){
  return mapId==='haunted'?
    [new THREE.Vector3(-3,0,-10),new THREE.Vector3(14,0,-12),new THREE.Vector3(20,0,10),new THREE.Vector3(-15,0,7),new THREE.Vector3(-27,0,18),new THREE.Vector3(12,0,22),new THREE.Vector3(29,0,-19),new THREE.Vector3(-14,0,-26)]:
    [new THREE.Vector3(-10,0,10),new THREE.Vector3(10,0,-10),new THREE.Vector3(31,0,-5),new THREE.Vector3(-31,0,8),new THREE.Vector3(6,0,34),new THREE.Vector3(31,0,26),new THREE.Vector3(-18,0,-27),new THREE.Vector3(2,0,12)];
}
function spawnWeapons(mapId){
  const list=mapId==='haunted'?
    [['pistol',-2,-5],['smg',15,-3],['rifle',-15,-8],['shotgun',28,-22],['lmg',20,11],['sniper',-29,18],['launcher',11,24],['rifle',-14,26],['shotgun',1,7],['smg',21,-11]]:
    [['pistol',-8,-8],['smg',10,8],['rifle',31,-4],['shotgun',-31,8],['lmg',6,35],['sniper',-31,15],['launcher',31,26],['rifle',-18,-27],['smg',4,27],['shotgun',35,-12]];
  list.forEach(([type,x,z])=>createPickup(type,new THREE.Vector3(x,.45,z)));
}
function createPickup(type,pos){const def=WEAPONS[type],group=new THREE.Group();const body=new THREE.Mesh(new THREE.BoxGeometry(1.18,.25,.3),material(def.color,.3,.45));body.castShadow=true;group.add(body);const barrel=new THREE.Mesh(new THREE.BoxGeometry(.7,.1,.12),material(0x1f2329,.25,.65));barrel.position.x=.75;group.add(barrel);const grip=new THREE.Mesh(new THREE.BoxGeometry(.22,.45,.2),material(0x25282e));grip.position.set(.15,-.28,0);grip.rotation.z=-.18;group.add(grip);const glow=new THREE.PointLight(def.color,1.4,5,2);glow.position.y=.5;group.add(glow);group.position.copy(pos);scene.add(group);pickups.push({type,mesh:group,baseY:pos.y,phase:Math.random()*Math.PI*2,available:true,respawnAt:0});}
function nearestPickup(actor,max=2.6){let best=null,dist=max;for(const p of pickups){if(!p.available)continue;const d=p.mesh.position.distanceTo(actor.mesh.position);if(d<dist){dist=d;best=p;}}return best;}
function pickupWeapon(actor,p){if(!p||!p.available)return;const d=WEAPONS[p.type],item={type:p.type,ammo:d.mag,reserve:d.reserve};if(actor.weapons.length<2){actor.weapons.push(item);actor.slot=actor.weapons.length-1;}else actor.weapons[actor.slot]=item;p.available=false;p.mesh.visible=false;p.respawnAt=performance.now()+18000;if(!actor.isBot)addFeed(`Picked up ${d.name}`);updateHud();}
function runCountdown(){let n=3;introCount.textContent=n;const timer=setInterval(()=>{n--;if(n>0)introCount.textContent=n;else if(n===0)introCount.textContent='BRAWL!';else{clearInterval(timer);intro.classList.add('hidden');countdownActive=false;matchActive=true;addFeed('First to 20 eliminations wins.');}},700);}
function interact(){if(!player||player.dead)return;if(currentMode==='hub'){if(player.mesh.position.distanceTo(new THREE.Vector3(-18,0,-5.3))<4.5)startMatch('haunted');else if(player.mesh.position.distanceTo(new THREE.Vector3(18,0,-3.4))<4.5)startMatch('city');}else{const p=nearestPickup(player);if(p)pickupWeapon(player,p);}}
function switchWeapon(slot){if(!player||slot>=player.weapons.length)return;player.slot=slot;reloading=false;reloadToken++;updateHud();}
function reload(){if(!player||reloading||player.dead)return;const w=player.weapons[player.slot];if(!w)return;const d=WEAPONS[w.type];if(w.ammo>=d.mag||w.reserve<=0)return;reloading=true;const token=++reloadToken;ammoText.textContent='RELOADING…';setTimeout(()=>{if(token!==reloadToken||!player||player.dead)return;const active=player.weapons[player.slot];if(active!==w)return;const need=d.mag-w.ammo,take=Math.min(need,w.reserve);w.ammo+=take;w.reserve-=take;reloading=false;updateHud();},d.reload);}
function attack(){if(!player||player.dead||countdownActive||currentMode==='hub')return;const w=player.weapons[player.slot];if(!w){melee(player);return;}if(reloading)return;const d=WEAPONS[w.type],now=performance.now();if(now-lastHumanShot<d.fireRate)return;lastHumanShot=now;if(w.ammo<=0){reload();return;}w.ammo--;fireGun(player,w,true);cameraKick=Math.min(cameraKick+.035,.12);if(w.ammo===0&&w.reserve>0)setTimeout(reload,180);updateHud();}
function melee(actor){const now=performance.now();if(now-actor.lastMelee<620)return;actor.lastMelee=now;const cfg=CHARACTERS[actor.charId],forward=new THREE.Vector3(Math.sin(actor.mesh.rotation.y),0,Math.cos(actor.mesh.rotation.y));let target=null,best=cfg.meleeRange;for(const a of [player,...bots]){if(a===actor||a.dead)continue;const delta=a.mesh.position.clone().sub(actor.mesh.position),dist=delta.length();if(dist<best&&delta.normalize().dot(forward)>.05){best=dist;target=a;}}const arms=actor.mesh.userData.parts?.arms;if(arms){arms.rotation.x=-.8;setTimeout(()=>{if(arms)arms.rotation.x=0;},130);}if(target){damageActor(target,cfg.meleeDamage,actor,true);const push=target.mesh.position.clone().sub(actor.mesh.position).setY(0).normalize().multiplyScalar(actor.charId==='liam'?7:4.5);target.velocity.add(push);}}
function fireGun(actor,w,isHuman=false){const d=WEAPONS[w.type];if(w.type==='launcher'){fireLauncher(actor,d,isHuman);return;}const shots=d.pellets||1;for(let i=0;i<shots;i++){let origin,dir;if(isHuman){origin=camera.position.clone();dir=new THREE.Vector3(0,0,-1).applyQuaternion(camera.quaternion);}else{if(!actor.target)return;origin=actor.mesh.position.clone().add(new THREE.Vector3(0,1.65,0));dir=actor.target.mesh.position.clone().add(new THREE.Vector3(0,1.35,0)).sub(origin).normalize();}const spread=(isHuman&&ads?d.adsSpread:d.spread)*(isHuman?1:(1.7+Math.random()*.7));dir.x+=(Math.random()-.5)*spread;dir.y+=(Math.random()-.5)*spread;dir.z+=(Math.random()-.5)*spread;dir.normalize();raycaster.set(origin,dir);raycaster.far=d.range;const actorMeshes=[player,...bots].filter(a=>a!==actor&&!a.dead).map(a=>a.mesh),actorHits=raycaster.intersectObjects(actorMeshes,true),worldHits=raycaster.intersectObjects(worldMeshes,false),actorHit=actorHits[0],worldHit=worldHits[0];let end=origin.clone().add(dir.clone().multiplyScalar(Math.min(d.range,38)));if(worldHit&&(!actorHit||worldHit.distance<actorHit.distance))end.copy(worldHit.point);else if(actorHit){end.copy(actorHit.point);let obj=actorHit.object;while(obj&&!obj.userData.actor)obj=obj.parent;const victim=obj?.userData.actor;if(victim)damageActor(victim,d.damage,actor,false);}tracer(origin,end,d.color);}muzzleFlash(actor,d.color);}
function fireLauncher(actor,d,isHuman){let origin,dir;if(isHuman){origin=camera.position.clone();dir=new THREE.Vector3(0,0,-1).applyQuaternion(camera.quaternion);}else{origin=actor.mesh.position.clone().add(new THREE.Vector3(0,1.5,0));if(!actor.target)return;dir=actor.target.mesh.position.clone().sub(origin).normalize();}raycaster.set(origin,dir);raycaster.far=d.range;const worldHit=raycaster.intersectObjects(worldMeshes,false)[0],end=worldHit?worldHit.point.clone():origin.clone().add(dir.multiplyScalar(Math.min(d.range,30)));tracer(origin,end,0xff755d);const blast=new THREE.Mesh(new THREE.SphereGeometry(.4,12,8),new THREE.MeshBasicMaterial({color:0xff8a4d,transparent:true,opacity:.9}));blast.position.copy(end);scene.add(blast);const started=performance.now();const grow=()=>{const t=(performance.now()-started)/220;blast.scale.setScalar(.4+t*7);blast.material.opacity=1-t;if(t<1)requestAnimationFrame(grow);else{scene.remove(blast);blast.geometry.dispose();blast.material.dispose();}};grow();for(const a of [player,...bots]){if(a===actor||a.dead)continue;const dist=a.mesh.position.distanceTo(end);if(dist<7.5)damageActor(a,d.damage*Math.max(.18,1-dist/8.5),actor,false);}}
function tracer(a,b,color){const geo=new THREE.BufferGeometry().setFromPoints([a,b]),line=new THREE.Line(geo,new THREE.LineBasicMaterial({color,transparent:true,opacity:.88}));scene.add(line);setTimeout(()=>{scene.remove(line);geo.dispose();line.material.dispose();},65);}
function muzzleFlash(actor,color){const p=new THREE.PointLight(color,4,4,2);p.position.copy(actor.mesh.position).add(new THREE.Vector3(0,1.6,0));scene.add(p);setTimeout(()=>scene.remove(p),55);}
function damageActor(victim,amount,attacker,isMelee=false){if(!victim||victim.dead||victim.spawnProtection>0)return;victim.health-=amount;attacker.special=Math.min(100,attacker.special+amount*.17);attacker.ultra=Math.min(100,attacker.ultra+amount*.04);const torso=victim.mesh.userData.parts?.torso;if(torso){torso.material.emissive.set(0xffffff);setTimeout(()=>torso.material.emissive.set(0x000000),75);}if(attacker===player){hitMarkerUntil=performance.now()+95;hitMarker?.classList.add('active');}if(victim===player){damageFlashUntil=performance.now()+120;damageFlash?.classList.add('active');}if(victim.health<=0)eliminate(victim,attacker);if(victim===player||attacker===player)updateHud();}
function eliminate(victim,attacker){if(victim.dead)return;victim.dead=true;victim.health=0;victim.deaths++;attacker.kills++;victim.mesh.visible=false;victim.respawnAt=performance.now()+2300;victim.weapons=[];addFeed(`${attacker.name} eliminated ${victim.name}`);if(attacker.kills>=20){endMatch(attacker);return;}updateHud();}
function safestSpawn(actor){const pts=spawnPoints(currentMap),enemies=[player,...bots].filter(a=>a!==actor&&!a.dead);let best=pts[0],bestScore=-Infinity;for(const p of pts){let nearest=999;for(const e of enemies)nearest=Math.min(nearest,p.distanceTo(e.mesh.position));if(nearest>bestScore){bestScore=nearest;best=p;}}return best.clone();}
function respawn(actor){actor.mesh.position.copy(safestSpawn(actor));actor.health=100;actor.dead=false;actor.mesh.visible=true;actor.spawnProtection=2;actor.velocity.set(0,0,0);actor.weapons=[];if(actor===player)addFeed('Respawn protection: 2 seconds');}
function endMatch(){if(!matchActive)return;matchActive=false;mouseDown=false;const ranked=[player,...bots].slice().sort((a,b)=>b.kills-a.kills||a.deaths-b.deaths),place=ranked.indexOf(player)+1,suffix=place===1?'ST':place===2?'ND':place===3?'RD':'TH';resultTitle.textContent=`${place}${suffix} PLACE`;resultTable.innerHTML=ranked.map((a,i)=>`<div class="result-row ${a===player?'you':''}"><strong>${i+1}</strong><span>${a.name}${a===player?' • YOU':''}</span><span>${a.kills} ELIMS</span><span>${a.deaths} DEATHS</span></div>`).join('');resultScreen.classList.remove('hidden');if(document.pointerLockElement===canvas)document.exitPointerLock?.();}
function updatePlayer(dt,time){if(!player||player.dead)return;const camForward=new THREE.Vector3(-Math.sin(yaw),0,-Math.cos(yaw)),right=new THREE.Vector3(-camForward.z,0,camForward.x),move=new THREE.Vector3();if(keys.KeyW)move.add(camForward);if(keys.KeyS)move.addScaledVector(camForward,-1);if(keys.KeyA)move.addScaledVector(right,-1);if(keys.KeyD)move.add(right);if(move.lengthSq()>0){move.normalize();const speed=(keys.ShiftLeft||keys.ShiftRight)?9.8:6.4,old=player.mesh.position.clone();player.mesh.position.addScaledVector(move,speed*dt);player.mesh.rotation.y=Math.atan2(move.x,move.z);resolveWorld(player,old);animateRun(player,time,speed>8);}if(keys.Space&&player.onGround){player.velocity.y=7.5;player.onGround=false;keys.Space=false;}player.velocity.y-=18*dt;player.mesh.position.y+=player.velocity.y*dt;if(player.mesh.position.y<=0){player.mesh.position.y=0;player.velocity.y=0;player.onGround=true;}if(player.spawnProtection>0)player.spawnProtection=Math.max(0,player.spawnProtection-dt);const target=player.mesh.position.clone().add(new THREE.Vector3(0,1.72,0)),dist=ads?3.25:5.3,cp=Math.cos(pitch),kick=cameraKick;cameraKick*=.82;const offset=new THREE.Vector3(Math.sin(yaw)*cp*dist,1+Math.sin(-pitch-kick)*dist,Math.cos(yaw)*cp*dist);if(ads)offset.add(new THREE.Vector3(Math.cos(yaw)*.55,0,-Math.sin(yaw)*.55));camera.position.copy(target).add(offset);camera.lookAt(target.clone().add(new THREE.Vector3(-Math.sin(yaw)*9,Math.sin(pitch+kick)*9,-Math.cos(yaw)*9)));camera.fov=THREE.MathUtils.lerp(camera.fov,ads?54:67,.18);camera.updateProjectionMatrix();if(mouseDown){const w=player.weapons[player.slot];if(w&&WEAPONS[w.type].auto)attack();}}
function animateRun(actor,time,sprinting=false){const parts=actor.mesh.userData.parts;if(!parts)return;const s=Math.sin(time*.012*(sprinting?1.35:1));parts.arms.rotation.x=s*.25;parts.legs.rotation.x=-s*.12;}
function resolveWorld(actor,old){const p=actor.mesh.position;if(currentMode==='match'&&currentMap==='city'){const zones=[[0,0,16,16],[31,-5,11,11],[-31,8,11,12],[6,34,11,10],[31,26,7,7],[-18,-27,8,7],[19,-3,6,3],[-19,5,6,3],[5,21,3,7],[22,27,6,3],[-10,-20,3,8]];if(!zones.some(([x,z,hw,hd])=>Math.abs(p.x-x)<=hw&&Math.abs(p.z-z)<=hd)){p.copy(old);return;}}else{p.x=THREE.MathUtils.clamp(p.x,-56,56);p.z=THREE.MathUtils.clamp(p.z,-56,56);}for(const o of obstacles){if(Math.abs(p.x-o.mesh.position.x)<o.half.x+.46&&Math.abs(p.z-o.mesh.position.z)<o.half.z+.46&&p.y<o.mesh.position.y+o.half.y){p.x=old.x;p.z=old.z;break;}}}
function hasLineOfSight(a,b){const origin=a.mesh.position.clone().add(new THREE.Vector3(0,1.5,0)),target=b.mesh.position.clone().add(new THREE.Vector3(0,1.35,0)),dir=target.clone().sub(origin),dist=dir.length();dir.normalize();raycaster.set(origin,dir);raycaster.far=dist;const hit=raycaster.intersectObjects(worldMeshes,false)[0];return !hit||hit.distance>dist-.4;}
function botTryPickup(b){const p=nearestPickup(b,7);if(p&&(b.weapons.length<2||Math.random()<.12))pickupWeapon(b,p);}
function botReload(b,w){const d=WEAPONS[w.type];if(w.ammo>0||w.reserve<=0)return false;const take=Math.min(d.mag,w.reserve);w.ammo=take;w.reserve-=take;return true;}
function updateBots(dt,time){for(const b of bots){if(b.dead){if(time>b.respawnAt)respawn(b);continue;}if(b.spawnProtection>0)b.spawnProtection=Math.max(0,b.spawnProtection-dt);if(time>b.thinkAt){b.thinkAt=time+260+Math.random()*420;const enemies=[player,...bots].filter(a=>a!==b&&!a.dead);enemies.sort((a,c)=>a.mesh.position.distanceTo(b.mesh.position)-c.mesh.position.distanceTo(b.mesh.position));b.target=enemies.find(e=>hasLineOfSight(b,e))||enemies[0]||null;botTryPickup(b);if(Math.random()<.08)b.strafe*=-1;}if(!b.target)continue;const delta=b.target.mesh.position.clone().sub(b.mesh.position),dist=delta.length();delta.y=0;if(delta.lengthSq())delta.normalize();const old=b.mesh.position.clone();let desired;if(!b.weapons.length)desired=dist>2.1?delta.clone():new THREE.Vector3(-delta.z,0,delta.x).multiplyScalar(b.strafe);else{const ideal=b.preferred==='close'?7:b.preferred==='range'?18:12;desired=new THREE.Vector3(-delta.z,0,delta.x).multiplyScalar(b.strafe).addScaledVector(delta,dist>ideal?1:dist<ideal*.55?-.8:.08).normalize();}b.mesh.position.addScaledVector(desired,(4*b.aggression)*dt);b.mesh.rotation.y=Math.atan2(delta.x,delta.z);resolveWorld(b,old);animateRun(b,time,false);if(dist<CHARACTERS[b.charId].meleeRange&&(!b.weapons.length||Math.random()<.012))melee(b);if(b.weapons.length&&hasLineOfSight(b,b.target)){let w=b.weapons[b.slot],d=WEAPONS[w.type];if(w.ammo<=0){if(!botReload(b,w)){b.weapons.splice(b.slot,1);b.slot=0;}continue;}if(dist<d.range*.72&&time-b.lastShot>d.fireRate*(1.25+Math.random()*.65)){b.lastShot=time;w.ammo--;fireGun(b,w,false);if(w.ammo===0)botReload(b,w);}}}}
function updatePickups(time){for(const p of pickups){if(!p.available&&time>p.respawnAt){p.available=true;p.mesh.visible=true;}if(p.available){p.mesh.rotation.y+=.012;p.mesh.position.y=p.baseY+Math.sin(time*.002+p.phase)*.12;}}}
function updateInteraction(){let text='';if(currentMode==='hub'&&player){if(player.mesh.position.distanceTo(new THREE.Vector3(-18,0,-5.3))<4.5)text='E — ENTER HAUNTED BEACH HOUSE';else if(player.mesh.position.distanceTo(new THREE.Vector3(18,0,-3.4))<4.5)text='E — TAKE ELEVATOR TO CITY ROOFTOP';}else if(currentMode==='match'&&player){const p=nearestPickup(player);if(p)text=`E — PICK UP ${WEAPONS[p.type].name}`;}interactionPrompt.textContent=text;interactionPrompt.classList.toggle('hidden',!text);}
function updateHud(){if(!player)return;healthFill.style.width=`${Math.max(0,player.health)}%`;healthText.textContent=Math.ceil(Math.max(0,player.health));specialFill.style.width=`${player.special}%`;ultraFill.style.width=`${player.ultra}%`;const w=player.weapons[player.slot];weaponName.textContent=w?WEAPONS[w.type].name:'UNARMED';ammoText.textContent=reloading?'RELOADING…':w?`${w.ammo} / ${w.reserve}`:CHARACTERS[player.charId].melee;slotOne.textContent=player.weapons[0]?`1  ${WEAPONS[player.weapons[0].type].name}`:'1  EMPTY';slotTwo.textContent=player.weapons[1]?`2  ${WEAPONS[player.weapons[1].type].name}`:'2  EMPTY';slotOne.classList.toggle('active',player.slot===0&&player.weapons.length>0);slotTwo.classList.toggle('active',player.slot===1&&player.weapons.length>1);adsLabel.textContent=ads?'AIMING':'HIP FIRE';if(currentMode==='match'){const ranked=[player,...bots].slice().sort((a,b)=>b.kills-a.kills||a.deaths-b.deaths),p=ranked.indexOf(player)+1;placement.textContent=`#${p} • ${player.kills} ELIMS`;}}
function addFeed(text){const e=document.createElement('div');e.className='feed-item';e.textContent=text;feed.prepend(e);while(feed.children.length>5)feed.lastChild.remove();setTimeout(()=>e.remove(),4500);}
function animate(){requestAnimationFrame(animate);if(!renderer||!scene)return;const dt=Math.min(clock.getDelta(),.033),time=performance.now();updatePlayer(dt,time);updateBots(dt,time);updatePickups(time);updateInteraction();if(matchActive){matchRemaining-=dt;matchTimer.textContent=`${Math.floor(matchRemaining/60)}:${Math.floor(matchRemaining%60).toString().padStart(2,'0')}`;if(matchRemaining<=0)endMatch();}if(hitMarker&&time>hitMarkerUntil)hitMarker.classList.remove('active');if(damageFlash&&time>damageFlashUntil)damageFlash.classList.remove('active');updateHud();renderer.render(scene,camera);}
