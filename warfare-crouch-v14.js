import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE CROUCH V14
   X = hold crouch. C remains slide.
   This module is the single owner of crouch input/state. Other polish modules
   consume window.__bbWarfareCrouch instead of registering duplicate X listeners. */
const prevRender=THREE.WebGLRenderer.prototype.render;
let xHeld=false;
const states=new WeakMap();
function actors(scene){const out=[];scene?.traverse(o=>{const a=o.userData?.actor;if(a&&!out.includes(a))out.push(a);});return out;}
function human(scene){return actors(scene).find(a=>!a.isBot)||null;}
function match(scene){const h=scene?.background?.isColor?scene.background.getHex():0;return h===0x020711||h===0x080d20||h===0x091226||h===0x111d44;}
function setHeld(v){xHeld=v;window.__bbWarfareCrouch.held=v;}
document.addEventListener('keydown',e=>{if(e.code==='KeyX'){setHeld(true);e.preventDefault();}},true);
document.addEventListener('keyup',e=>{if(e.code==='KeyX'){setHeld(false);e.preventDefault();}},true);
window.addEventListener('blur',()=>setHeld(false));
window.__bbWarfareCrouch={version:14,held:false,amount:0,active:false};

THREE.WebGLRenderer.prototype.render=function(scene,camera){
 const p=human(scene);
 if(p&&match(scene)&&!p.dead){
  let s=states.get(p);if(!s){s={amount:0,last:performance.now()};states.set(p,s);}const now=performance.now(),dt=Math.min(.04,(now-s.last)/1000||.016);s.last=now;
  const target=xHeld&&p.onGround?1:0;s.amount=THREE.MathUtils.damp(s.amount,target,14,dt);
  window.__bbWarfareCrouch.amount=s.amount;window.__bbWarfareCrouch.active=s.amount>.55;
  const parts=p.mesh.userData.parts||{},torso=parts.torso,head=parts.head,arms=parts.arms;
  const saved={camY:camera.position.y,torsoY:torso?.position.y,headY:head?.position.y,armsY:arms?.position.y,scaleY:p.mesh.scale.y};
  camera.position.y-=s.amount*.52;
  p.mesh.scale.y=saved.scaleY*(1-s.amount*.16);
  if(torso)torso.position.y=saved.torsoY-s.amount*.10;
  if(head)head.position.y=saved.headY-s.amount*.16;
  if(arms)arms.position.y=saved.armsY-s.amount*.10;
  p.userData=p.userData||{};p.userData.bbCrouching=s.amount>.55;
  const r=prevRender.call(this,scene,camera);
  camera.position.y=saved.camY;p.mesh.scale.y=saved.scaleY;
  if(torso)torso.position.y=saved.torsoY;if(head)head.position.y=saved.headY;if(arms)arms.position.y=saved.armsY;
  return r;
 }
 window.__bbWarfareCrouch.amount=0;window.__bbWarfareCrouch.active=false;
 return prevRender.call(this,scene,camera);
};
window.__bbCrouchV14={version:14,key:'X',mode:'hold',singleOwner:true};