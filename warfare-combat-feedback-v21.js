import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* WARFARE V21.1 — visual/event combat feedback only.
   V20 is the single audio owner. V21 detects confirmed hits/kills/movement
   feedback, renders the compact banner, and dispatches semantic audio events. */
const previousRender=THREE.WebGLRenderer.prototype.render;
const seen=new WeakMap();
let activeScene=null,lastHumanShot=0,lastStep=0;
function match(scene){const h=scene?.background?.isColor?scene.background.getHex():0;return h===0x020711||h===0x080d20||h===0x091226||h===0x111d44;}
function actors(scene){const out=[];scene?.traverse(o=>{const a=o.userData?.actor;if(a&&!out.includes(a))out.push(a);});return out;}
function human(list){return list.find(a=>!a.isBot)||null;}
function emit(type,detail={}){document.dispatchEvent(new CustomEvent('bb:combat-feedback',{detail:{type,...detail}}));}
function banner(text,kind='info'){
 let e=document.getElementById('bbKillConfirm');if(!e){e=document.createElement('div');e.id='bbKillConfirm';e.className='bb-combat-banner';document.body.appendChild(e);}
 e.textContent=text;e.dataset.kind=kind;e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('show'),650);
}
function snap(a){return{health:a.health??100,dead:!!a.dead,onGround:!!a.onGround,pos:a.mesh.position.clone(),slot:a.slot||0,weapons:(a.weapons||[]).map(w=>({type:w.type,ammo:w.ammo??0,reserve:w.reserve??0,rarity:w.rarity||'basic'}))};}
function update(scene){
 const list=actors(scene),p=human(list),now=performance.now();if(!p)return;
 for(const a of list){
  const old=seen.get(a),cur=snap(a);if(!old){seen.set(a,cur);continue;}
  const ow=old.weapons[old.slot],nw=cur.weapons[cur.slot];
  if(a===p&&ow&&nw&&ow.type===nw.type&&nw.ammo<ow.ammo)lastHumanShot=now;
  if(a!==p&&cur.health<old.health&&now-lastHumanShot<170){emit('hit');if(cur.dead&&!old.dead){emit('kill');banner('ELIM CONFIRMED','kill');}}
  if(a===p&&ow&&nw&&ow.type===nw.type&&ow.rarity!==nw.rarity){emit('rarity',{rarity:nw.rarity,typeName:nw.type});banner(`${String(nw.rarity).toUpperCase()} ${nw.type.toUpperCase()}`,'rarity');}
  if(a===p&&!old.onGround&&cur.onGround&&old.pos.y-cur.pos.y<2.6)emit('land');
  if(a===p&&cur.onGround){const d=cur.pos.clone().sub(old.pos).setY(0).length();if(d>.06&&now-lastStep>390){lastStep=now;emit('step');}}
  seen.set(a,cur);
 }
}
document.addEventListener('keydown',e=>{if(e.code==='KeyC'&&!e.repeat&&activeScene&&match(activeScene))emit('slide');},true);
THREE.WebGLRenderer.prototype.render=function(scene,camera){activeScene=scene;if(match(scene))update(scene);return previousRender.call(this,scene,camera);};
window.__bbCombatFeedbackV21={version:'21.1',features:['confirmed-hit','kill-confirm','rarity-banner','landing','slide','soft-footsteps'],audioOwner:'warfare-gameplay-audio-v20'};