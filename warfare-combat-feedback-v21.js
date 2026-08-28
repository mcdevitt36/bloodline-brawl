import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* WARFARE V21 — final combat-feedback cleanup.
   Adds confirmed-hit and kill cues, same-type rarity pickup cue fallback,
   landing/slide movement audio, and a compact elimination confirmation banner. */
const previousRender=THREE.WebGLRenderer.prototype.render;
const seen=new WeakMap();
let ctx=null,master=null,activeScene=null,lastHumanShot=0,lastStep=0;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function match(scene){const h=scene?.background?.isColor?scene.background.getHex():0;return h===0x020711||h===0x091226;}
function actors(scene){const out=[];scene?.traverse(o=>{const a=o.userData?.actor;if(a&&!out.includes(a))out.push(a);});return out;}
function human(scene){return actors(scene).find(a=>!a.isBot)||null;}
function audio(){if(ctx)return ctx;const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;ctx=new C();master=ctx.createGain();master.gain.value=.42;master.connect(ctx.destination);return ctx;}
function wake(){const c=audio();if(c?.state==='suspended')c.resume();}addEventListener('pointerdown',wake,{passive:true});addEventListener('keydown',wake,{passive:true});
function tone(f=600,d=.06,g=.09,slide=1,delay=0,type='triangle'){const c=audio();if(!c)return;const t=c.currentTime+delay,o=c.createOscillator(),a=c.createGain();o.type=type;o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(Math.max(30,f*slide),t+d);a.gain.setValueAtTime(g,t);a.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(a);a.connect(master);o.start(t);o.stop(t+d+.02);}
function noise(d=.05,g=.05,cut=1600){const c=audio();if(!c)return;const n=Math.floor(c.sampleRate*d),b=c.createBuffer(1,n,c.sampleRate),data=b.getChannelData(0);for(let i=0;i<n;i++)data[i]=Math.random()*2-1;const s=c.createBufferSource(),f=c.createBiquadFilter(),a=c.createGain();s.buffer=b;f.type='lowpass';f.frequency.value=cut;a.gain.setValueAtTime(g,c.currentTime);a.gain.exponentialRampToValueAtTime(.001,c.currentTime+d);s.connect(f);f.connect(a);a.connect(master);s.start();}
function hitCue(){tone(980,.04,.08,.7);tone(1380,.035,.05,.76,.018);}
function killCue(){tone(420,.07,.1,1.3);tone(620,.08,.11,1.25,.065);tone(900,.14,.1,1.1,.135);}
function pickupCue(){tone(440,.07,.09,1.24);tone(690,.10,.1,1.16,.06);}
function landCue(){noise(.055,.06,650);tone(82,.075,.06,.55);}
function slideCue(){noise(.14,.07,1200);tone(180,.09,.035,.5);}
function banner(text){let e=document.getElementById('bbKillConfirm');if(!e){e=document.createElement('div');e.id='bbKillConfirm';Object.assign(e.style,{position:'fixed',left:'50%',top:'42%',transform:'translate(-50%,-50%)',padding:'8px 14px',borderRadius:'999px',font:'800 13px Arial',letterSpacing:'1.3px',background:'rgba(12,18,28,.76)',border:'1px solid rgba(255,255,255,.35)',color:'#fff',zIndex:'35',pointerEvents:'none',opacity:'0',transition:'opacity .1s, transform .1s'});document.body.appendChild(e);}e.textContent=text;e.style.opacity='1';e.style.transform='translate(-50%,-50%) scale(1.06)';clearTimeout(e._t);e._t=setTimeout(()=>{e.style.opacity='0';e.style.transform='translate(-50%,-50%) scale(1)'},650);}
function snap(a){return {health:a.health??100,dead:!!a.dead,onGround:!!a.onGround,pos:a.mesh.position.clone(),slot:a.slot||0,weapons:(a.weapons||[]).map(w=>({type:w.type,ammo:w.ammo??0,reserve:w.reserve??0,rarity:w.rarity||'basic'}))};}
function update(scene){const list=actors(scene),p=human(scene),now=performance.now();if(!p)return;for(const a of list){const old=seen.get(a),cur=snap(a);if(!old){seen.set(a,cur);continue;}const ow=old.weapons[old.slot],nw=cur.weapons[cur.slot];if(a===p&&ow&&nw&&ow.type===nw.type&&nw.ammo<ow.ammo)lastHumanShot=now;if(a!==p&&cur.health<old.health&&now-lastHumanShot<150){hitCue();if(cur.dead&&!old.dead){killCue();banner('ELIM CONFIRMED');}}if(a===p&&ow&&nw&&ow.type===nw.type&&ow.rarity!==nw.rarity){pickupCue();banner(`${String(nw.rarity).toUpperCase()} ${nw.type.toUpperCase()}`);}if(a===p&&!old.onGround&&cur.onGround&&old.pos.y-cur.pos.y<2.4)landCue();if(a===p&&cur.onGround){const d=cur.pos.clone().sub(old.pos).setY(0).length();if(d>.06&&now-lastStep>390){lastStep=now;noise(.028,.018,900);}}seen.set(a,cur);}}
document.addEventListener('keydown',e=>{if(e.code==='KeyC'&&!e.repeat&&activeScene&&match(activeScene))slideCue();},true);
THREE.WebGLRenderer.prototype.render=function(scene,camera){activeScene=scene;if(match(scene))update(scene);return previousRender.call(this,scene,camera);};
window.__bbCombatFeedbackV21={version:21,features:['confirmed-hit','kill-confirm','rarity-pickup-fallback','landing','slide','soft-footsteps']};