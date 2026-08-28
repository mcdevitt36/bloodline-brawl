import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE GAMEPLAY + AUDIO V20
   Event-driven polish layer using actor state already exposed by Warfare.
   Adds distinct synthesized SFX for all seven firearms, reloads, gun pickup,
   ammo pickup, empty click, swap, hit/damage/elimination cues, plus shell/smoke
   and clearer reload/low-ammo HUD feedback. No external audio assets required. */

const previousRender=THREE.WebGLRenderer.prototype.render;
const states=new WeakMap();
const actorState=new WeakMap();
let activeScene=null,activeCamera=null,audioCtx=null,master=null,noiseBuffer=null;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const MAG={pistol:12,smg:30,rifle:30,shotgun:6,lmg:60,sniper:4,launcher:1};
const RELOAD_MS={pistol:900,smg:1150,rifle:1250,shotgun:1350,lmg:1900,sniper:1650,launcher:1800};

function isMatch(scene){const h=scene?.background?.isColor?scene.background.getHex():0;return h===0x020711||h===0x091226;}
function actors(scene){const out=[];scene?.traverse(o=>{const a=o.userData?.actor;if(a&&!out.includes(a))out.push(a);});return out;}
function human(scene){return actors(scene).find(a=>!a.isBot)||null;}

function ensureAudio(){
 if(audioCtx)return audioCtx;
 const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;
 audioCtx=new C();master=audioCtx.createGain();master.gain.value=.62;master.connect(audioCtx.destination);
 const len=Math.floor(audioCtx.sampleRate*.7),buf=audioCtx.createBuffer(1,len,audioCtx.sampleRate),d=buf.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;noiseBuffer=buf;return audioCtx;
}
function wake(){const c=ensureAudio();if(c?.state==='suspended')c.resume();}
addEventListener('pointerdown',wake,{passive:true});addEventListener('keydown',wake,{passive:true});

function spatial(actor,base=.5){if(!activeCamera||!actor?.mesh)return {gain:base,pan:0};const rel=actor.mesh.position.clone().sub(activeCamera.position).applyQuaternion(activeCamera.quaternion.clone().invert()),dist=rel.length();return {gain:base*clamp(1-dist/95,.12,1),pan:clamp(rel.x/22,-.9,.9)};}
function bus(gain=.5,pan=0){const c=ensureAudio();if(!c)return null;const g=c.createGain();g.gain.value=gain;let tail=g;if(c.createStereoPanner){const p=c.createStereoPanner();p.pan.value=pan;g.connect(p);tail=p;}tail.connect(master);return g;}
function osc(type,freq,dur,gain=.2,pan=0,slide=1,delay=0){const c=ensureAudio();if(!c)return;const t=c.currentTime+delay,o=c.createOscillator(),g=bus(gain,pan);o.type=type;o.frequency.setValueAtTime(freq,t);o.frequency.exponentialRampToValueAtTime(Math.max(25,freq*slide),t+dur);g.gain.setValueAtTime(gain,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);o.connect(g);o.start(t);o.stop(t+dur+.02);}
function noise(dur=.12,gain=.25,pan=0,low=3000,delay=0){const c=ensureAudio();if(!c||!noiseBuffer)return;const t=c.currentTime+delay,s=c.createBufferSource(),f=c.createBiquadFilter(),g=bus(gain,pan);s.buffer=noiseBuffer;f.type='lowpass';f.frequency.value=low;g.gain.setValueAtTime(gain,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);s.connect(f);f.connect(g);s.start(t);s.stop(t+dur+.02);}
function click(g=.08,pan=0,pitch=1050,delay=0){osc('square',pitch,.035,g,pan,.72,delay);noise(.022,g*.6,pan,5000,delay);}

function gunSound(type,actor){
 const s=spatial(actor,actor?.isBot?.34:.58),g=s.gain,p=s.pan;
 if(type==='pistol'){noise(.085,g*.62,p,5200);osc('triangle',170,.11,g*.55,p,.45);click(g*.22,p,1450,.006);}
 else if(type==='smg'){noise(.052,g*.54,p,6100);osc('square',145,.065,g*.42,p,.58);click(g*.28,p,1750,.004);}
 else if(type==='rifle'){noise(.09,g*.72,p,4900);osc('triangle',112,.13,g*.68,p,.42);osc('square',760,.035,g*.16,p,.75,.005);}
 else if(type==='shotgun'){noise(.19,g*.92,p,3000);osc('sine',72,.26,g*.92,p,.32);noise(.08,g*.38,p,700,.025);}
 else if(type==='lmg'){noise(.105,g*.78,p,3900);osc('square',82,.14,g*.75,p,.4);click(g*.3,p,720,.01);}
 else if(type==='sniper'){noise(.12,g,p,6200);osc('sine',64,.34,g,p,.28);osc('triangle',980,.075,g*.28,p,.44,.006);noise(.26,g*.22,p,1500,.055);}
 else if(type==='launcher'){noise(.15,g*.72,p,1500);osc('sine',58,.38,g,p,.24);osc('triangle',115,.18,g*.55,p,.38,.018);}
}
function reloadSound(type,actor,finish=false){const {gain:g,pan:p}=spatial(actor,actor?.isBot?.18:.34);if(finish){click(g,p,type==='shotgun'?820:1250);osc('triangle',type==='launcher'?95:220,.08,g*.42,p,1.25,.035);return;}click(g*.75,p,640);if(type==='shotgun'){click(g*.72,p,950,.18);click(g*.72,p,1020,.38);click(g*.85,p,720,.62);}else if(type==='lmg'){noise(.055,g*.5,p,1600,.08);click(g*.75,p,430,.22);click(g,p,760,.54);}else if(type==='sniper'){click(g*.75,p,520,.08);noise(.045,g*.45,p,2100,.18);click(g,p,930,.46);}else if(type==='launcher'){noise(.07,g*.5,p,900,.06);click(g*.85,p,360,.28);click(g,p,610,.62);}else{click(g*.72,p,920,.14);noise(.035,g*.32,p,2300,.24);click(g*.95,p,1180,.46);}}
function pickupGunSound(){osc('triangle',420,.08,.16,0,1.35);osc('triangle',620,.09,.17,0,1.26,.07);osc('sine',880,.14,.16,0,1.08,.14);}
function pickupAmmoSound(){click(.13,0,850);click(.12,0,1120,.055);osc('triangle',310,.08,.1,0,1.18,.025);}
function swapSound(){noise(.035,.08,0,1800);click(.09,0,740,.025);}
function emptySound(){click(.11,0,390);click(.07,0,300,.06);}
function hitSound(){osc('sine',760,.045,.075,0,.72);click(.05,0,1350);}
function hurtSound(){osc('sine',115,.12,.12,0,.58);noise(.06,.07,0,750);}
function elimSound(){osc('triangle',350,.08,.12,0,1.4);osc('triangle',520,.1,.14,0,1.35,.07);osc('sine',760,.17,.12,0,1.18,.15);}

function casing(scene,actor,type){if(!scene||!actor?.mesh||type==='launcher')return;const c=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,.09,6),new THREE.MeshStandardMaterial({color:0xcaa24a,metalness:.72,roughness:.32}));c.rotation.z=Math.PI/2;c.position.copy(actor.mesh.position).add(new THREE.Vector3(.28,1.65,.06));scene.add(c);const v=new THREE.Vector3((Math.random()-.25)*2,1.5+Math.random(),(Math.random()-.5)*2),start=performance.now();(function tick(){const dt=.016;v.y-=7.5*dt;c.position.addScaledVector(v,dt);c.rotation.x+=.25;c.rotation.z+=.33;const age=performance.now()-start;if(age<650&&c.position.y>0)requestAnimationFrame(tick);else{c.removeFromParent();c.geometry.dispose();c.material.dispose();}})();}
function smoke(scene,actor,type){if(!scene||!actor?.mesh)return;const q=new THREE.Mesh(new THREE.SphereGeometry(type==='shotgun'? .13:.08,7,5),new THREE.MeshBasicMaterial({color:0xbcc3c8,transparent:true,opacity:.28,depthWrite:false}));q.position.copy(actor.mesh.position).add(new THREE.Vector3(0,1.72,.3));scene.add(q);const start=performance.now();(function tick(){const t=(performance.now()-start)/360;q.position.y+=.004;q.scale.setScalar(1+t*3);q.material.opacity=.28*(1-t);if(t<1)requestAnimationFrame(tick);else{q.removeFromParent();q.geometry.dispose();q.material.dispose();}})();}

function hudPolish(p){const ammo=document.getElementById('ammoText'),name=document.getElementById('weaponName');if(!ammo||!name||!p)return;const w=p.weapons?.[p.slot];if(!w){ammo.style.color='';name.style.textShadow='';return;}const mag=MAG[w.type]||1,ratio=w.ammo/mag;ammo.style.transition='color .12s, text-shadow .12s';if(w.ammo===0){ammo.style.color='#ff6b6b';ammo.style.textShadow='0 0 10px rgba(255,70,70,.6)';}else if(ratio<=.25){ammo.style.color='#ffd166';ammo.style.textShadow='0 0 9px rgba(255,209,102,.45)';}else{ammo.style.color='';ammo.style.textShadow='';}}
function reloadBar(show,type,duration=900){let el=document.getElementById('bbReloadBar');if(!el){el=document.createElement('div');el.id='bbReloadBar';Object.assign(el.style,{position:'fixed',left:'50%',bottom:'18%',width:'180px',height:'6px',transform:'translateX(-50%)',borderRadius:'999px',background:'rgba(255,255,255,.15)',overflow:'hidden',zIndex:'30',display:'none',pointerEvents:'none'});const fill=document.createElement('div');fill.id='bbReloadFill';Object.assign(fill.style,{height:'100%',width:'0%',background:'#f3d37a'});el.appendChild(fill);document.body.appendChild(el);}if(!show){el.style.display='none';return;}el.style.display='block';const f=el.firstChild;f.style.transition='none';f.style.width='0%';requestAnimationFrame(()=>{f.style.transition=`width ${duration}ms linear`;f.style.width='100%';});}

function snapshot(a){return {slot:a.slot||0,health:a.health??100,dead:!!a.dead,weapons:(a.weapons||[]).map(w=>({type:w.type,ammo:w.ammo??0,reserve:w.reserve??0,rarity:w.rarity||'basic'}))};}
function compareActor(scene,a,p){const prev=actorState.get(a),now=snapshot(a);if(!prev){actorState.set(a,now);return;}
 const oldW=prev.weapons[prev.slot],newW=now.weapons[now.slot];
 if(a===p&&prev.slot!==now.slot&&newW)swapSound();
 const max=Math.max(prev.weapons.length,now.weapons.length);for(let i=0;i<max;i++){const o=prev.weapons[i],n=now.weapons[i];if(!n)continue;if(!o||o.type!==n.type){if(a===p)pickupGunSound();continue;}if(n.ammo<o.ammo){gunSound(n.type,a);casing(scene,a,n.type);smoke(scene,a,n.type);if(a===p&&n.ammo===0&&n.reserve>0){setTimeout(()=>{reloadSound(n.type,a,false);reloadBar(true,n.type,RELOAD_MS[n.type]||1000);},170);}}if(n.ammo>o.ammo&&n.reserve<o.reserve){reloadSound(n.type,a,true);if(a===p)reloadBar(false,n.type);}else if(n.reserve>o.reserve&&n.ammo===o.ammo){if(a===p)pickupAmmoSound();}}
 if(a===p&&now.health<prev.health)hurtSound();
 if(a===p&&now.dead&&!prev.dead){elimSound();reloadBar(false);}
 actorState.set(a,now);
}

// Manual reload / empty-mag feedback happens immediately; completion is detected from state.
document.addEventListener('keydown',e=>{if(e.repeat||!activeScene||!isMatch(activeScene))return;const p=human(activeScene);if(!p||p.dead)return;const w=p.weapons?.[p.slot];if(e.code==='KeyR'&&w&&w.ammo<(MAG[w.type]||w.ammo+1)&&w.reserve>0){reloadSound(w.type,p,false);reloadBar(true,w.type,RELOAD_MS[w.type]||1000);}if((e.code==='KeyJ')&&w&&w.ammo<=0)emptySound();},true);
document.addEventListener('mousedown',e=>{if(e.button!==0||!activeScene||!isMatch(activeScene))return;const p=human(activeScene),w=p?.weapons?.[p.slot];if(w&&w.ammo<=0)emptySound();},true);

THREE.WebGLRenderer.prototype.render=function(scene,camera){activeScene=scene;activeCamera=camera;let st=states.get(scene);if(!st){st={lastHealth:new WeakMap()};states.set(scene,st);}if(isMatch(scene)){const list=actors(scene),p=human(scene);for(const a of list)compareActor(scene,a,p);hudPolish(p);}return previousRender.call(this,scene,camera);};

window.__bbGameplayAudioV20={version:20,guns:['pistol','smg','rifle','shotgun','lmg','sniper','launcher'],features:['distinct-gun-sfx','spatial-bot-gunfire','reload-start-finish','gun-pickup','ammo-pickup','empty-click','swap-cue','damage-elim-cues','casings','muzzle-smoke','low-ammo-hud','reload-progress']};