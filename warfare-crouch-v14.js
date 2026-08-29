import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE CROUCH V14
   Reliable hold-to-crouch owner.
   X or CTRL = crouch. C remains slide.
   Crouch now changes the actor's actual root scale between frames so shots
   raycast against the lowered body instead of being only a visual pose. */

const previousRender = THREE.WebGLRenderer.prototype.render;
const MATCH_BACKGROUNDS = new Set([0x020711,0x080d20,0x091226,0x111d44]);
const actorState = new WeakMap();
let crouchHeld = false;

function actors(scene){
  const out=[];
  scene?.traverse(obj=>{
    const actor=obj.userData?.actor;
    if(actor&&!out.includes(actor))out.push(actor);
  });
  return out;
}

function human(scene){
  return actors(scene).find(actor=>!actor.isBot)||null;
}

function isMatch(scene){
  const hex=scene?.background?.isColor?scene.background.getHex():0;
  return MATCH_BACKGROUNDS.has(hex);
}

function isCrouchKey(event){
  return event.code==='KeyX'||event.code==='ControlLeft'||event.code==='ControlRight';
}

function setHeld(value){
  crouchHeld=value;
  if(window.__bbWarfareCrouch) window.__bbWarfareCrouch.held=value;
}

document.addEventListener('keydown',event=>{
  if(!isCrouchKey(event))return;
  setHeld(true);
  event.preventDefault();
},true);

document.addEventListener('keyup',event=>{
  if(!isCrouchKey(event))return;
  setHeld(false);
  event.preventDefault();
},true);

window.addEventListener('blur',()=>setHeld(false));

window.__bbWarfareCrouch={
  version:14,
  held:false,
  amount:0,
  active:false,
  keys:['X','CTRL']
};

THREE.WebGLRenderer.prototype.render=function(scene,camera){
  const player=human(scene);

  if(player&&isMatch(scene)&&!player.dead){
    let state=actorState.get(player);
    if(!state){
      state={amount:0,last:performance.now(),baseScaleY:player.mesh.scale.y||1};
      actorState.set(player,state);
    }

    const now=performance.now();
    const dt=Math.min(.04,(now-state.last)/1000||.016);
    state.last=now;

    const target=crouchHeld&&player.onGround?1:0;
    state.amount=THREE.MathUtils.damp(state.amount,target,18,dt);

    const active=state.amount>.5;
    window.__bbWarfareCrouch.amount=state.amount;
    window.__bbWarfareCrouch.active=active;

    /* Persist the root scale so the next gameplay/raycast frame sees the
       shorter crouched body too. */
    player.mesh.scale.y=state.baseScaleY*(1-state.amount*.27);
    player.userData=player.userData||{};
    player.userData.bbCrouching=active;

    /* Core camera gets rebuilt every frame, so lower it only for this render. */
    const cameraY=camera.position.y;
    camera.position.y-=state.amount*.48;

    const result=previousRender.call(this,scene,camera);
    camera.position.y=cameraY;
    return result;
  }

  if(player){
    const state=actorState.get(player);
    if(state)player.mesh.scale.y=state.baseScaleY;
  }
  window.__bbWarfareCrouch.amount=0;
  window.__bbWarfareCrouch.active=false;
  return previousRender.call(this,scene,camera);
};

window.__bbCrouchV14={version:14,key:'X / CTRL',mode:'hold',singleOwner:true,realBodyScale:true};
