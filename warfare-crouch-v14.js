import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE CROUCH V14
   X = hold crouch. Keeps C dedicated to slide.
   Visual stance + camera lowering are smoothed and additive so existing combat remains intact. */
const prevRender=THREE.WebGLRenderer.prototype.render;
let xHeld=false;
const states=new WeakMap();
function actors(scene){const out=[];scene?.traverse(o=>{const a=o.userData?.actor;if(a&&!out.includes(a))out.push(a);});return out;}
function human(scene){return actors(scene).find(a=>!a.isBot)||null;}
function match(scene){const h=scene?.background?.isColor?scene.background.getHex():0;return h===0x020711||h===0x091226;}
document.addEventListener('keydown',e=>{if(e.code==='KeyX'){xHeld=true;e.preventDefault();}},true);
document.addEventListener('keyup',e=>{if(e.code==='KeyX'){xHeld=false;e.preventDefault();}},true);
window.addEventListener('blur',()=>xHeld=false);
THREE.WebGLRenderer.prototype.render=function(scene,camera){
 const p=human(scene);
 if(p&&match(scene)&&!p.dead){
  let s=states.get(p);if(!s){s={amount:0,last:performance.now()};states.set(p,s);}const now=performance.now(),dt=Math.min(.04,(now-s.last)/1000||.016);s.last=now;
  const target=xHeld&&p.onGround?1:0;s.amount=THREE.MathUtils.damp(s.amount,target,14,dt);
  const parts=p.mesh.userData.parts||{},torso=parts.torso,head=parts.head,arms=parts.arms;
  const saved={camY:camera.position.y,torsoY:torso?.position.y,headY:head?.position.y,armsY:arms?.position.y,scaleY:p.mesh.scale.y};
  // Lower viewpoint and compress the rendered stance. Restore immediately after rendering so gameplay coordinates remain authoritative.
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
 return prevRender.call(this,scene,camera);
};
window.__bbCrouchV14={version:14,key:'X',mode:'hold'};