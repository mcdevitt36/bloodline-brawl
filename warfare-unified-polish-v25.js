import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE UNIFIED POLISH V25
   Consolidated quality pass without replacing the v4 core:
   - Classic melee animation/readability
   - rarity actually adds bonus firearm damage
   - tactical bot retreat/flanking/loot seeking
   - crouch movement reduction + reliable landing feedback
   - extra anti-sniper / route cover
   - lively coastal hub ambience
   - character layer cleanup and rarity weapon glow
*/
const prevRender=THREE.WebGLRenderer.prototype.render;
const sceneState=new WeakMap();
const actorState=new WeakMap();
const keys={};
document.addEventListener('keydown',e=>keys[e.code]=true,true);
document.addEventListener('keyup',e=>keys[e.code]=false,true);

const HAIR={sean:0x101010,shannan:0x7b4c2c,erin:0xe5c35c,liam:0x51331f,connor:0x583a25,kelly:0x74513b};
const RARITY={basic:{mult:1,color:0xd7dde6},rare:{mult:1.08,color:0x4fa8ff},legendary:{mult:1.16,color:0xffc83d}};
function actors(sc){const out=[];sc?.traverse(o=>{const a=o.userData?.actor;if(a&&!out.includes(a))out.push(a);});return out;}
function human(sc){return actors(sc).find(a=>!a.isBot)||null;}
function mapId(sc){const bg=sc?.background?.isColor?sc.background.getHex():0;if([0x071526,0x243d68].includes(bg))return'hub';if([0x020711,0x080d20].includes(bg))return'haunted';if([0x091226,0x111d44].includes(bg))return'city';if(sc?.getObjectByName('BB_GRANDADDY_TOOLBOX'))return'match';return null;}
function getState(sc){let s=sceneState.get(sc);if(!s){s={id:mapId(sc),ready:false,last:performance.now(),prevPlayer:null,ambient:[],recentShots:[],cover:[]};sceneState.set(sc,s);}return s;}
function mat(c,r=.64,m=.08){return new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});}

function addCover(sc,x,z,w,d,h=1.05,c=0x505a64){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c,.7,.14));m.position.set(x,h/2,z);m.castShadow=m.receiveShadow=true;m.name='BB_V15_COVER';m.userData.bbV25=true;sc.add(m);return m;}
function setupCombatCover(sc,id,s){
 const pts=id==='haunted'?
 [[-7,10,2.8,.9,1.05],[12,4,2.6,.9,1.05],[25,-7,2.8,.9,1.05],[-19,18,2.5,1.0,1.05],[8,25,3.0,.9,1.05],[34,17,2.7,.9,1.05],[-32,23,2.5,.9,1.05],[20,-23,2.7,.9,1.05]]:
 [[-6,8,3,1,1.05],[17,7,2.8,1,1.05],[-29,-1,2.6,1,1.05],[4,31,3,1,1.05],[29,21,2.7,1,1.05],[-18,-26,2.8,1,1.05],[25,-29,2.8,1,1.05],[-37,11,2.5,1,1.05]];
 s.cover=pts.map(p=>addCover(sc,...p));
}
function person(color=0x596d7c){const g=new THREE.Group();const body=new THREE.Mesh(new THREE.BoxGeometry(.52,1.05,.34),mat(color));body.position.y=.95;const head=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),mat(0xe9bf9f));head.position.y=1.65;g.add(body,head);return g;}
function setupHub(sc,s){
 // Small moving groups make the boardwalk feel inhabited without adding gameplay collision.
 const pts=[[-5,7],[11,18],[-8,29],[17,-7],[5,-18]];
 pts.forEach((p,i)=>{const g=person([0x496a8c,0x8e5252,0x6b8453,0x82649a,0x9b704a][i]);g.position.set(p[0],0,p[1]);g.rotation.y=Math.random()*Math.PI*2;sc.add(g);s.ambient.push({g,base:g.position.clone(),phase:i*1.4});});
 // Distant gull silhouettes above the ocean.
 for(let i=0;i<5;i++){const g=new THREE.Group();for(const side of [-1,1]){const wing=new THREE.Mesh(new THREE.PlaneGeometry(.55,.12),new THREE.MeshBasicMaterial({color:0xf3f0e7,side:THREE.DoubleSide}));wing.position.x=side*.25;wing.rotation.z=side*.25;g.add(wing);}g.position.set(-38-Math.random()*22,8+Math.random()*8,-24+Math.random()*50);sc.add(g);s.ambient.push({g,gull:true,phase:Math.random()*6});}
}
function setup(sc,s){if(s.ready)return;s.ready=true;const id=mapId(sc);s.id=id;if(id==='haunted'||id==='city')setupCombatCover(sc,id,s);else if(id==='hub')setupHub(sc,s);}

function findMeleeGroup(a){let found=null;a.mesh?.traverse(o=>{if(!found&&o.name==='BB_CLASSIC_MELEE')found=o;});return found;}
function cleanCharacterLayers(a){
 if(a._bbV25Clean)return;a._bbV25Clean=true;
 // Force every underlying scalp/crown piece to the established color so older layers cannot peek through.
 const hc=HAIR[a.charId];if(hc!=null)a.mesh.children.forEach(o=>{if(o.isMesh&&o.position.y>2.48&&o.material?.color)o.material.color.setHex(hc);});
 a.mesh.children.forEach(o=>{if(o.name==='BB_FEMALE_LONG_HAIR_V22')o.visible=false;});
}
function animateMelee(a,now){
 cleanCharacterLayers(a);const st=actorState.get(a)||{};const melee=findMeleeGroup(a);const armed=!!a.weapons?.[a.slot];if(melee)melee.visible=!armed&&!a.dead;
 if(a.lastMelee&&a.lastMelee!==st.lastMelee){st.lastMelee=a.lastMelee;st.swingStart=now;}
 const t=st.swingStart?Math.min(1,(now-st.swingStart)/300):1;
 if(melee){if(!st.base){st.base={p:melee.position.clone(),r:melee.rotation.clone()};}melee.position.copy(st.base.p);melee.rotation.copy(st.base.r);if(t<1){const q=Math.sin(t*Math.PI);if(a.charId==='shannan'){melee.position.z-=q*.38;melee.rotation.x=-q*.18;}else if(a.charId==='sean'){melee.rotation.z=st.base.r.z-q*1.15;melee.rotation.x=q*.28;}else if(a.charId==='erin'){melee.rotation.z=st.base.r.z-q*.9;melee.rotation.x=q*.22;}else if(a.charId==='connor'){melee.rotation.z=st.base.r.z-q*.82;melee.rotation.y=q*.30;}else{melee.rotation.z=st.base.r.z-q*.55;}}}
 if(a.charId==='liam'&&t<1&&!armed){const p=a.mesh.userData.parts;const q=Math.sin(t*Math.PI);if(p?.torso)p.torso.rotation.x=-q*.18;if(p?.arms)p.arms.rotation.x=-q*.55;}else if(a.charId==='liam'){const p=a.mesh.userData.parts;if(p?.torso)p.torso.rotation.x*=.65;}
 actorState.set(a,st);
}

function rarityOf(w){const r=(w?.rarity||'basic').toLowerCase();return RARITY[r]||RARITY.basic;}
function detectRarityDamage(list,now,s){
 const frameShots=[];
 for(const a of list){let st=actorState.get(a)||{};const w=a.weapons?.[a.slot];const ammo=w?.ammo;if(typeof ammo==='number'&&typeof st.ammo==='number'&&ammo<st.ammo&&w){const r=rarityOf(w);if(r.mult>1)frameShots.push({a,mult:r.mult,time:now});}st.ammo=ammo;actorState.set(a,st);}
 s.recentShots=s.recentShots.concat(frameShots).filter(x=>now-x.time<150);
 for(const v of list){let st=actorState.get(v)||{};const old=st.health;if(typeof old==='number'&&v.health<old&&!v.dead){const drop=old-v.health;const shooter=s.recentShots.filter(x=>x.a!==v).sort((x,y)=>y.time-x.time)[0];if(shooter&&shooter.mult>1){const bonus=drop*(shooter.mult-1);v.health=Math.max(1,v.health-bonus);v._bbRarityBonus=(v._bbRarityBonus||0)+bonus;}}st.health=v.health;actorState.set(v,st);}
}
function rarityGlow(a){const w=a.weapons?.[a.slot];let held=null;a.mesh?.traverse(o=>{if(!held&&o.name==='BB_HELD_GUN')held=o;});if(!held)return;const r=rarityOf(w);held.traverse(o=>{if(o.isMesh&&o.material?.emissive){o.material.emissive.set(r.color);o.material.emissiveIntensity=r.mult>1?(r.mult>1.1?.18:.08):0;}});}

function nearestLootObject(sc,a){let best=null,bd=32;sc.traverse(o=>{if(o.visible===false)return;if(o.name!=='BB_GRANDADDY_TOOLBOX'&&o.name!=='BB_BARRETT_TOY_CHEST'&&o.name!=='BB_V15_LOOT')return;const d=o.getWorldPosition(new THREE.Vector3()).distanceTo(a.mesh.position);if(d<bd){bd=d;best=o;}});return best;}
function tacticalBots(sc,list,dt,now){
 for(const b of list){if(!b.isBot||b.dead)continue;const target=b.target;if(!target||target.dead)continue;const to=target.mesh.position.clone().sub(b.mesh.position).setY(0),dist=to.length();if(!dist)continue;to.normalize();let nudge=new THREE.Vector3();
   if(b.health<34&&dist<18)nudge.addScaledVector(to,-1.45); // disengage when hurt
   else if(dist>6&&dist<24){const side=new THREE.Vector3(-to.z,0,to.x).multiplyScalar(b.strafe||1);nudge.addScaledVector(side,.48);} // less robotic straight-line pursuit
   if(!b.weapons?.length){const loot=nearestLootObject(sc,b);if(loot){const lp=loot.getWorldPosition(new THREE.Vector3()).sub(b.mesh.position).setY(0);if(lp.lengthSq())nudge.add(lp.normalize().multiplyScalar(1.15));}}
   if(nudge.lengthSq()){nudge.normalize();b.mesh.position.addScaledVector(nudge,dt*1.8);}
   if(Math.random()<dt*.35)b.strafe=(b.strafe||1)*-1;
 }
}
function playerMovement(sc,p,cam,s,dt){
 if(!p||p.dead)return;const cur=p.mesh.position.clone();if(s.prevPlayer){const delta=cur.clone().sub(s.prevPlayer);if(keys.KeyX&&Math.abs(delta.y)<.3){p.mesh.position.x=s.prevPlayer.x+delta.x*.72;p.mesh.position.z=s.prevPlayer.z+delta.z*.72;}
   // Extra landing cue that does not rely on the older wasAir flag.
   if(s.playerAir&&!p.onGround){/* still airborne */}
   if(s.playerAir&&p.onGround){cam.position.y-=.055;const ring=new THREE.Mesh(new THREE.RingGeometry(.18,.42,18),new THREE.MeshBasicMaterial({color:0xd7d0be,transparent:true,opacity:.28,side:THREE.DoubleSide,depthWrite:false}));ring.rotation.x=-Math.PI/2;ring.position.copy(p.mesh.position).add(new THREE.Vector3(0,.025,0));sc.add(ring);const born=performance.now();const tick=()=>{const t=(performance.now()-born)/260;if(t>=1){ring.removeFromParent();return;}ring.scale.setScalar(1+t*1.8);ring.material.opacity=.28*(1-t);requestAnimationFrame(tick);};tick();}
 }
 s.playerAir=!p.onGround;s.prevPlayer=p.mesh.position.clone();
}
function animateAmbient(s,now){for(const a of s.ambient){if(a.gull){a.g.position.x+=.006;a.g.position.y+=Math.sin(now*.0015+a.phase)*.002;a.g.rotation.y=Math.sin(now*.00035+a.phase)*.15;}else{a.g.position.x=a.base.x+Math.sin(now*.00018+a.phase)*1.3;a.g.position.z=a.base.z+Math.cos(now*.00015+a.phase)*.7;a.g.rotation.y=now*.00018+a.phase;}}}

THREE.WebGLRenderer.prototype.render=function(sc,cam){
 const s=getState(sc);setup(sc,s);const now=performance.now(),dt=Math.min(.04,(now-s.last)/1000||.016);s.last=now;const list=actors(sc),p=list.find(a=>!a.isBot)||null;
 for(const a of list){animateMelee(a,now);rarityGlow(a);}if(s.id==='haunted'||s.id==='city'){detectRarityDamage(list,now,s);tacticalBots(sc,list,dt,now);playerMovement(sc,p,cam,s,dt);}if(s.id==='hub')animateAmbient(s,now);
 return prevRender.call(this,sc,cam);
};
window.__bbUnifiedPolishV25={version:25,features:['classic-melee-motion','rarity-damage','bot-tactics','crouch-speed','landing-feedback','combat-cover','hub-ambience','layer-cleanup']};
