import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE GAMEPLAY V12
   Additive gameplay-quality layer:
   1 held weapon visuals + recoil/reload/swap motion
   2 slide / landing / movement feel polish
   3 elimination weapon drops + ammo pickups
   4 stronger hit reactions
   5 directional damage indicator
   6 camera collision
   7 smarter bot decisions / pickup seeking / retreat behavior
   8 lethal Special/Ultra bridge so V9 abilities can finish eliminations
*/

const prevRender=THREE.WebGLRenderer.prototype.render;
const sceneStates=new WeakMap();
let activeScene=null,activeCamera=null;
const held=new WeakMap(),actorState=new WeakMap();
let abilityWindow=0,abilityCaster=null;

const W={
 pistol:{name:'PISTOL',mag:12,reserve:48,color:0xb9c1cc},smg:{name:'SMG',mag:30,reserve:120,color:0x4f83cc},
 rifle:{name:'ASSAULT RIFLE',mag:30,reserve:90,color:0x5bb56b},shotgun:{name:'SHOTGUN',mag:6,reserve:30,color:0xcf8a42},
 lmg:{name:'LMG',mag:60,reserve:120,color:0x9270cf},sniper:{name:'SNIPER',mag:4,reserve:16,color:0x5cc7ce},launcher:{name:'LAUNCHER',mag:1,reserve:5,color:0xd55757}
};
const mat=(c,metal=.35)=>new THREE.MeshStandardMaterial({color:c,roughness:.38,metalness:metal});
const glow=(c,op=.9)=>new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:op,depthWrite:false});
function actors(scene){const out=[];scene?.traverse(o=>{const a=o.userData?.actor;if(a&&!out.includes(a))out.push(a);});return out;}
function human(scene){return actors(scene).find(a=>!a.isBot)||null;}
function isMatch(scene){const bg=scene?.background?.isColor?scene.background.getHex():0;return bg===0x020711||bg===0x091226;}
function topActor(obj){let o=obj;while(o&&!o.userData?.actor)o=o.parent;return o?.userData?.actor||null;}

function gunModel(type){const d=W[type]||W.pistol,g=new THREE.Group();g.name='BB_HELD_GUN';const dark=mat(0x20252c,.72),body=mat(d.color,.55);
 const add=(geo,m,x,y,z,rx=0,ry=0,rz=0)=>{const q=new THREE.Mesh(geo,m);q.position.set(x,y,z);q.rotation.set(rx,ry,rz);q.castShadow=true;g.add(q);return q;};
 const long=type==='sniper'||type==='rifle'||type==='lmg'||type==='shotgun'||type==='launcher';
 add(new THREE.BoxGeometry(long?1.05:.62,.20,.22),body,.36,0,0);
 add(new THREE.CylinderGeometry(.045,.055,long?.82:.48,10),dark,long?1.26:.88,0,0,0,0,-Math.PI/2);
 add(new THREE.BoxGeometry(.22,.46,.18),dark,.22,-.27,0,0,0,-.14);
 if(type!=='pistol')add(new THREE.BoxGeometry(.58,.18,.24),dark,-.43,.02,0);
 if(type==='rifle'||type==='smg'||type==='lmg')add(new THREE.BoxGeometry(.22,.48,.20),body,.12,-.31,0,.08,0,0);
 if(type==='shotgun')add(new THREE.CylinderGeometry(.07,.07,.66,10),mat(0x7b5030,.15),.55,-.12,0,0,0,-Math.PI/2);
 if(type==='sniper'){add(new THREE.CylinderGeometry(.09,.09,.46,12),dark,.34,.20,0,0,0,-Math.PI/2);add(new THREE.BoxGeometry(.16,.12,.18),body,.34,.14,0);}
 if(type==='launcher')add(new THREE.CylinderGeometry(.17,.20,1.15,14),body,.45,.03,0,0,0,-Math.PI/2);
 if(type==='lmg')add(new THREE.BoxGeometry(.42,.42,.26),body,.05,-.34,0);
 const muzzle=new THREE.Object3D();muzzle.name='BB_MUZZLE';muzzle.position.set(long?1.7:1.18,0,0);g.add(muzzle);
 g.rotation.order='YXZ';g.rotation.y=Math.PI/2;g.scale.setScalar(.72);return g;
}
function ensureHeld(a){if(!a?.mesh)return;const type=a.weapons?.[a.slot]?.type||null;let h=held.get(a);if(!type){if(h?.group)h.group.visible=false;return;}if(!h||h.type!==type){if(h?.group)h.group.removeFromParent();const group=gunModel(type);a.mesh.add(group);h={group,type,recoil:0,swap:1,reload:0,lastAmmo:a.weapons[a.slot]?.ammo??0,lastReserve:a.weapons[a.slot]?.reserve??0};held.set(a,h);}h.group.visible=!a.dead&&a.mesh.visible!==false;
 const w=a.weapons[a.slot],ammo=w?.ammo??0,res=w?.reserve??0;if(ammo<h.lastAmmo)h.recoil=1;if(ammo>h.lastAmmo&&res<h.lastReserve)h.reload=1;h.lastAmmo=ammo;h.lastReserve=res;
}
function updateHeld(a,dt){ensureHeld(a);const h=held.get(a);if(!h?.group?.visible)return;h.recoil=Math.max(0,h.recoil-dt*8);h.swap=Math.max(0,h.swap-dt*5);h.reload=Math.max(0,h.reload-dt*1.8);const recoil=h.recoil,swap=h.swap,reload=h.reload;
 h.group.position.set(.48,1.58,-.10);h.group.position.z+=recoil*.10;h.group.position.y-=swap*.28;h.group.rotation.x=-.08-recoil*.18+Math.sin((1-reload)*Math.PI)*reload*.65;h.group.rotation.z=Math.sin((1-reload)*Math.PI*2)*reload*.35;
}

function hudFeed(text){const f=document.getElementById('feed');if(!f)return;const e=document.createElement('div');e.className='feed-item';e.textContent=text;f.prepend(e);setTimeout(()=>e.remove(),2600);}
function updateHudWeapon(a){if(!a||a.isBot)return;const w=a.weapons?.[a.slot],name=document.getElementById('weaponName'),ammo=document.getElementById('ammoText'),s1=document.getElementById('slotOne'),s2=document.getElementById('slotTwo');if(name)name.textContent=w?(W[w.type]?.name||w.type.toUpperCase()):'UNARMED';if(ammo)ammo.textContent=w?`${w.ammo} / ${w.reserve}`:'MELEE READY';[s1,s2].forEach((el,i)=>{if(!el)return;const x=a.weapons?.[i];el.textContent=x?`${i+1} ${(W[x.type]?.name||x.type).replace('ASSAULT ','')}`:`${i+1} EMPTY`;el.classList.toggle('active',i===a.slot&&!!x);});}

function dropModel(type){const g=gunModel(type);g.scale.multiplyScalar(.9);g.rotation.set(0,Math.random()*Math.PI*2,0);const ring=new THREE.Mesh(new THREE.TorusGeometry(.72,.055,8,28),glow(W[type]?.color||0xffffff,.72));ring.rotation.x=Math.PI/2;ring.position.y=-.25;g.add(ring);return g;}
function ammoModel(){const g=new THREE.Group();const b=new THREE.Mesh(new THREE.BoxGeometry(.72,.48,.54),mat(0x365e8f,.3));b.castShadow=true;g.add(b);for(const x of [-.18,0,.18]){const r=new THREE.Mesh(new THREE.CylinderGeometry(.045,.045,.34,8),mat(0xd6af52,.65));r.rotation.z=Math.PI/2;r.position.set(x,.10,.30);g.add(r);}return g;}
function ensureWorldLoot(scene,state){if(state.lootReady||!isMatch(scene))return;state.lootReady=true;const bg=scene.background.getHex(),pts=bg===0x020711?[[-8,6],[12,-4],[27,15],[-28,18],[8,29]]:[[-9,13],[18,5],[31,23],[-27,-12],[5,-28]];for(const [x,z] of pts){const m=ammoModel();m.position.set(x,.35,z);scene.add(m);state.loot.push({kind:'ammo',mesh:m,available:true,phase:Math.random()*6.2});}}
function spawnDrops(scene,state,a,loadout){if(!isMatch(scene)||!loadout?.length)return;loadout.slice(0,2).forEach((w,i)=>{if(!W[w.type])return;const m=dropModel(w.type);m.position.copy(a.mesh.position).add(new THREE.Vector3((i?1:-1)*.6,.55,(Math.random()-.5)*.8));scene.add(m);state.loot.push({kind:'gun',type:w.type,ammo:Math.max(1,w.ammo||Math.ceil(W[w.type].mag*.45)),reserve:Math.max(0,w.reserve||0),mesh:m,available:true,phase:Math.random()*6.2,expires:performance.now()+28000});});}
function takeLoot(a,l){if(!l?.available)return false;if(l.kind==='ammo'){if(!a.weapons?.length){hudFeed('Need a weapon for ammo');return false;}for(const w of a.weapons){const d=W[w.type];w.reserve=Math.min(d.reserve,w.reserve+Math.ceil(d.mag*1.6));}hudFeed('Ammo restocked');}
 else {const item={type:l.type,ammo:l.ammo||W[l.type].mag,reserve:l.reserve||Math.ceil(W[l.type].reserve*.35)};if(a.weapons.length<2){a.weapons.push(item);a.slot=a.weapons.length-1;}else a.weapons[a.slot]=item;hudFeed(`Picked up dropped ${W[l.type].name}`);}
 l.available=false;l.mesh.visible=false;updateHudWeapon(a);return true;
}
function nearestLoot(state,a,max=2.7){let best=null,bd=max;for(const l of state.loot){if(!l.available||!l.mesh.visible)continue;const d=l.mesh.position.distanceTo(a.mesh.position);if(d<bd){bd=d;best=l;}}return best;}

function externalEliminate(victim,attacker,label='ability'){if(!victim||victim.dead||!attacker)return;victim.dead=true;victim.health=0;victim.deaths=(victim.deaths||0)+1;attacker.kills=(attacker.kills||0)+1;victim.mesh.visible=false;victim.respawnAt=performance.now()+2300;victim.weapons=[];hudFeed(`${attacker.name} eliminated ${victim.name} • ${label}`);updateHudWeapon(attacker);}
function externalDamage(victim,amount,attacker){if(!victim||victim.dead||victim.spawnProtection>0)return;victim.health-=amount;if(victim.health<=0)externalEliminate(victim,attacker,'melee');}

function damageArc(){let wrap=document.getElementById('bbDamageDir');if(wrap)return wrap;wrap=document.createElement('div');wrap.id='bbDamageDir';Object.assign(wrap.style,{position:'fixed',left:'50%',top:'50%',width:'150px',height:'150px',transform:'translate(-50%,-50%)',pointerEvents:'none',zIndex:'28'});const arc=document.createElement('div');arc.id='bbDamageDirArc';Object.assign(arc.style,{position:'absolute',left:'50%',top:'0',width:'58px',height:'8px',transform:'translateX(-50%)',borderRadius:'999px',background:'linear-gradient(90deg,transparent,#ff4657,transparent)',boxShadow:'0 0 12px #ff273d',opacity:'0',transition:'opacity .08s'});wrap.appendChild(arc);document.body.appendChild(wrap);return wrap;}
function showDamageDirection(player,scene){const candidates=actors(scene).filter(a=>a!==player&&!a.dead);if(!candidates.length)return;const recent=candidates.filter(a=>performance.now()-(a.lastShot||0)<650);const src=(recent.length?recent:candidates).sort((a,b)=>a.mesh.position.distanceTo(player.mesh.position)-b.mesh.position.distanceTo(player.mesh.position))[0];if(!src)return;const f=new THREE.Vector3(0,0,-1).applyQuaternion(activeCamera.quaternion).setY(0).normalize(),to=src.mesh.position.clone().sub(player.mesh.position).setY(0).normalize();const cross=f.x*to.z-f.z*to.x,dot=THREE.MathUtils.clamp(f.dot(to),-1,1),ang=Math.atan2(cross,dot);const wrap=damageArc(),arc=wrap.firstChild;wrap.style.transform=`translate(-50%,-50%) rotate(${ang}rad)`;arc.style.opacity='1';clearTimeout(wrap._t);wrap._t=setTimeout(()=>arc.style.opacity='0',330);}

function hitReact(a,amount){const s=actorState.get(a)||{};s.hit=Math.min(1,(s.hit||0)+(amount>45?1:amount>24?.72:.38));s.heavy=amount>35;actorState.set(a,s);}
function updateReaction(a,dt){const s=actorState.get(a);if(!s?.hit||a.dead)return;s.hit=Math.max(0,s.hit-dt*(s.heavy?2.4:4.8));const p=a.mesh.userData.parts;if(p?.torso)p.torso.rotation.z=Math.sin(s.hit*Math.PI)*.10*(s.heavy?1.8:1);if(p?.head)p.head.rotation.x=-Math.sin(s.hit*Math.PI)*.12;if(p?.arms)p.arms.rotation.x=Math.sin(s.hit*Math.PI)*.20;if(s.hit<=0){if(p?.torso)p.torso.rotation.z=0;if(p?.head)p.head.rotation.x=0;}}

function cameraCollision(scene,camera,p){if(!p||p.dead)return;const target=p.mesh.position.clone().add(new THREE.Vector3(0,1.65,0)),v=camera.position.clone().sub(target),dist=v.length();if(dist<.7)return;const ray=new THREE.Raycaster(target,v.normalize(),.35,dist);const hits=ray.intersectObjects(scene.children,true).filter(h=>{if(topActor(h.object))return false;if(h.object.name?.startsWith('BB_'))return false;if(h.object.type==='Line'||h.object.isPoints)return false;const bs=h.object.geometry?.boundingSphere;if(!bs&&h.object.geometry)h.object.geometry.computeBoundingSphere?.();return (h.object.geometry?.boundingSphere?.radius||0)>.45;});if(hits[0]&&hits[0].distance<dist-.2)camera.position.copy(hits[0].point).addScaledVector(v.normalize(),-.38);}

function updateMovementFeel(a,scene,camera,dt,now,state){if(!a||a.dead)return;const s=actorState.get(a)||{};if(!a.isBot){if(s.slideUntil>now){const f=s.slideDir||new THREE.Vector3(0,0,-1);const old=a.mesh.position.clone();a.mesh.position.addScaledVector(f,dt*8.5);a.mesh.rotation.z=THREE.MathUtils.lerp(a.mesh.rotation.z,-.18,.22);s.slideDust=(s.slideDust||0)-dt;if(s.slideDust<=0){s.slideDust=.08;const dust=new THREE.Mesh(new THREE.SphereGeometry(.08,6,4),glow(0xc5c1b0,.35));dust.position.copy(a.mesh.position).add(new THREE.Vector3(0,.08,0));scene.add(dust);state.temp.push({o:dust,t:.35});}}else a.mesh.rotation.z=THREE.MathUtils.lerp(a.mesh.rotation.z,0,.22);
 if(s.wasAir&&!a.onGround){/* keep */}if(s.wasAir&&!s.lastGround&&a.onGround){camera.position.y-=.08;s.landKick=.11;}s.lastGround=!!a.onGround;if(s.landKick>0){camera.position.y-=Math.sin((s.landKick/.11)*Math.PI)*.035;s.landKick=Math.max(0,s.landKick-dt);} }
 actorState.set(a,s);
}
function beginSlide(){if(!activeScene||!isMatch(activeScene))return;const p=human(activeScene);if(!p||p.dead||!p.onGround)return;const s=actorState.get(p)||{},now=performance.now();if((s.slideCooldown||0)>now)return;const f=new THREE.Vector3(0,0,-1).applyQuaternion(activeCamera.quaternion).setY(0).normalize();s.slideDir=f;s.slideUntil=now+520;s.slideCooldown=now+1050;s.slideDust=0;actorState.set(p,s);}

document.addEventListener('keydown',e=>{if(e.repeat)return;if(e.code==='KeyC')beginSlide();if((e.code==='KeyQ'||e.code==='KeyF')&&activeScene&&isMatch(activeScene)){abilityCaster=human(activeScene);abilityWindow=performance.now()+(e.code==='KeyF'?2500:1500);}if(e.code==='KeyE'&&activeScene&&isMatch(activeScene)){const st=sceneStates.get(activeScene),p=human(activeScene),l=st&&p?nearestLoot(st,p):null;if(l&&takeLoot(p,l)){e.preventDefault();e.stopImmediatePropagation();}}},true);

function pickupVisuals(scene){const out=[];scene.traverse(o=>{if(o.userData?.weaponVisualType&&o.visible)out.push({mesh:o,type:o.userData.weaponVisualType});});return out;}
function smartBots(scene,state,dt,now){const aa=actors(scene),p=human(scene),visualPickups=pickupVisuals(scene);for(const b of aa.filter(x=>x.isBot&&!x.dead)){
 const bs=actorState.get(b)||{};if((bs.nextThink||0)<now){bs.nextThink=now+650+Math.random()*550;const enemies=aa.filter(x=>x!==b&&!x.dead);const weak=enemies.filter(x=>x.health<42).sort((x,y)=>x.health-y.health)[0],near=enemies.sort((x,y)=>x.mesh.position.distanceTo(b.mesh.position)-y.mesh.position.distanceTo(b.mesh.position))[0];b.target=weak&&weak.mesh.position.distanceTo(b.mesh.position)<18?weak:near;
 if(b.health<28)bs.mode='retreat';else if(!b.weapons?.length)bs.mode='loot';else bs.mode='fight';actorState.set(b,bs);}
 if(bs.mode==='retreat'&&b.target){const d=b.mesh.position.clone().sub(b.target.mesh.position).setY(0).normalize();b.mesh.position.addScaledVector(d,dt*2.2);b.strafe*=-1;}
 if(bs.mode==='loot'&&visualPickups.length){const q=visualPickups.sort((x,y)=>x.mesh.position.distanceTo(b.mesh.position)-y.mesh.position.distanceTo(b.mesh.position))[0];if(q){const d=q.mesh.position.clone().sub(b.mesh.position).setY(0),dist=d.length();if(dist>1.2)b.mesh.position.addScaledVector(d.normalize(),dt*1.7);else if(W[q.type]&&!q.mesh.userData.bbV12Taken){b.weapons.push({type:q.type,ammo:W[q.type].mag,reserve:W[q.type].reserve});b.slot=0;q.mesh.userData.bbV12Taken=true;q.mesh.visible=false;}}}
 if(b.target&&!b.weapons?.length&&b.mesh.position.distanceTo(b.target.mesh.position)<2.15&&(bs.nextMelee||0)<now){bs.nextMelee=now+900+Math.random()*300;externalDamage(b.target,12+Math.random()*8,b);hitReact(b.target,18);}
 if(b.health<40&&b.target&&b.mesh.position.distanceTo(b.target.mesh.position)<7)b.strafe*=-1;
 }}

function ensureState(scene){let s=sceneStates.get(scene);if(s)return s;s={last:performance.now(),loot:[],lootReady:false,temp:[]};sceneStates.set(scene,s);return s;}
function update(scene,camera){activeScene=scene;activeCamera=camera;const s=ensureState(scene),now=performance.now(),dt=Math.min(.04,(now-s.last)/1000||.016);s.last=now;ensureWorldLoot(scene,s);const aa=actors(scene),p=human(scene);
 for(const a of aa){let as=actorState.get(a)||{};const hp=a.health??100;if(as.health===undefined)as.health=hp;if(hp<as.health){const amount=as.health-hp;hitReact(a,amount);if(a===p)showDamageDirection(p,scene);}if(!a.dead&&as.dead){as.dead=false;}if(a.dead&&!as.dead){spawnDrops(scene,s,a,as.loadout||[]);as.dead=true;}if(!a.dead)as.loadout=(a.weapons||[]).map(w=>({...w}));as.health=hp;actorState.set(a,as);updateHeld(a,dt);updateReaction(a,dt);updateMovementFeel(a,scene,camera,dt,now,s);}
 if(abilityCaster&&now<abilityWindow){const fx=scene.getObjectByName('BB_SPECIALS_V9');if(fx?.children?.length){for(const v of aa){if(v!==abilityCaster&&!v.dead&&v.health<=1.01&&v.spawnProtection<=0)externalEliminate(v,abilityCaster,'ability');}}}else if(now>=abilityWindow){abilityCaster=null;}
 smartBots(scene,s,dt,now);if(p)cameraCollision(scene,camera,p);
 for(const l of s.loot){if(l.available&&l.mesh.visible){l.phase+=dt*2;l.mesh.position.y+=(Math.sin(l.phase)*.004);l.mesh.rotation.y+=dt*.65;}if(l.expires&&now>l.expires&&l.available){l.available=false;l.mesh.removeFromParent();}}
 for(let i=s.temp.length-1;i>=0;i--){const t=s.temp[i];t.t-=dt;if(t.o?.material)t.o.material.opacity=Math.max(0,t.t/.35*.35);if(t.t<=0){t.o?.removeFromParent();s.temp.splice(i,1);}}
}
THREE.WebGLRenderer.prototype.render=function(scene,camera){try{update(scene,camera);}catch(err){console.warn('Warfare gameplay v12:',err);}return prevRender.call(this,scene,camera);};

window.__bbGameplayV12={version:12,features:['held-guns','slide-land-feel','weapon-drops-ammo','hit-reactions','damage-direction','camera-collision','smarter-bots','lethal-abilities']};
