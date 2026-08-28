import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE SMOOTHING V13
   Render-only smoothing pass. Keeps gameplay coordinates authoritative while
   softening camera snaps, bot stepping, held-gun jitter, and abrupt rotations.
   Import BEFORE gameplay-v12 so this wrapper runs after V12's gameplay update
   but immediately before the actual Three.js draw call. */

const prevRender=THREE.WebGLRenderer.prototype.render;
const sceneState=new WeakMap();
const actorVisual=new WeakMap();
const gunVisual=new WeakMap();
const tmpQ=new THREE.Quaternion();

function actors(scene){
  const out=[];
  scene?.traverse(o=>{const a=o.userData?.actor;if(a&&!out.includes(a))out.push(a);});
  return out;
}
function human(scene){return actors(scene).find(a=>!a.isBot)||null;}
function isWarfare(scene){
  const bg=scene?.background?.isColor?scene.background.getHex():0;
  return bg===0x071526||bg===0x020711||bg===0x091226;
}
function expAlpha(rate,dt){return 1-Math.exp(-rate*dt);}
function angleLerp(a,b,t){
  let d=(b-a+Math.PI)%(Math.PI*2)-Math.PI;
  if(d<-Math.PI)d+=Math.PI*2;
  return a+d*t;
}

function smoothCamera(scene,camera,state,dt){
  const p=human(scene);
  if(!p||p.dead)return;
  if(!state.camReady){
    state.camPos.copy(camera.position);
    state.camQuat.copy(camera.quaternion);
    state.camFov=camera.fov;
    state.camReady=true;
    return;
  }
  // Faster while ADS so aiming remains responsive; softer in normal traversal.
  const ads=document.getElementById('adsLabel')?.textContent!=='HIP FIRE';
  const posA=expAlpha(ads?22:16,dt),rotA=expAlpha(ads?27:20,dt),fovA=expAlpha(18,dt);
  state.camPos.lerp(camera.position,posA);
  state.camQuat.slerp(camera.quaternion,rotA);
  state.camFov=THREE.MathUtils.lerp(state.camFov,camera.fov,fovA);
  camera.position.copy(state.camPos);
  camera.quaternion.copy(state.camQuat);
  camera.fov=state.camFov;
  camera.updateProjectionMatrix();
}

function softenHeldGuns(scene,dt){
  scene.traverse(o=>{
    if(o.name!=='BB_HELD_GUN'||!o.visible)return;
    let s=gunVisual.get(o);
    if(!s){s={p:o.position.clone(),q:o.quaternion.clone()};gunVisual.set(o,s);return;}
    const a=expAlpha(24,dt);
    s.p.lerp(o.position,a);
    s.q.slerp(o.quaternion,a);
    o.position.copy(s.p);
    o.quaternion.copy(s.q);
  });
}

function prepareActorVisuals(scene,dt){
  const restores=[];
  for(const a of actors(scene)){
    if(!a?.mesh||a.dead||a.mesh.visible===false)continue;
    let s=actorVisual.get(a);
    if(!s){s={pos:a.mesh.position.clone(),yaw:a.mesh.rotation.y};actorVisual.set(a,s);continue;}
    const originalPos=a.mesh.position.clone(),originalYaw=a.mesh.rotation.y;
    // Human stays highly responsive. Bots get more interpolation because their
    // think/steering updates are naturally coarser and are the main visible jitter.
    const posRate=a.isBot?11:28,rotRate=a.isBot?10:24;
    s.pos.lerp(originalPos,expAlpha(posRate,dt));
    s.yaw=angleLerp(s.yaw,originalYaw,expAlpha(rotRate,dt));
    a.mesh.position.copy(s.pos);
    a.mesh.rotation.y=s.yaw;
    restores.push({mesh:a.mesh,pos:originalPos,yaw:originalYaw});
  }
  return restores;
}

function restoreActors(restores){
  for(const r of restores){r.mesh.position.copy(r.pos);r.mesh.rotation.y=r.yaw;}
}

THREE.WebGLRenderer.prototype.render=function(scene,camera){
  if(!isWarfare(scene))return prevRender.call(this,scene,camera);
  let s=sceneState.get(scene);
  if(!s){s={last:performance.now(),camReady:false,camPos:new THREE.Vector3(),camQuat:new THREE.Quaternion(),camFov:camera.fov};sceneState.set(scene,s);}
  const now=performance.now(),dt=Math.min(.033,Math.max(.001,(now-s.last)/1000||.016));s.last=now;

  // V12 (the outer wrapper) has already performed gameplay changes when this
  // executes. We only soften what is drawn, then restore authoritative actor
  // transforms immediately after drawing so combat/collision are unchanged.
  smoothCamera(scene,camera,s,dt);
  softenHeldGuns(scene,dt);
  const restores=prepareActorVisuals(scene,dt);
  try{return prevRender.call(this,scene,camera);}finally{restoreActors(restores);}
};

window.__bbSmoothingV13={version:13,features:['camera-damping','bot-interpolation','held-gun-damping','rotation-smoothing']};