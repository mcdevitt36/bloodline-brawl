import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE V17 STABILITY PASS
   Runs after V16 grounding but before the final render.
   Fixes elevated drop-off snapping, makes V15 cover physically solid,
   and guarantees V15 cover participates in weapon / LOS raycasts.
*/
const previousRender = THREE.WebGLRenderer.prototype.render;
const previousIntersectObjects = THREE.Raycaster.prototype.intersectObjects;
const sceneState = new WeakMap();
let activeCovers = [];

function mapId(scene){
  const bg=scene?.background?.isColor?scene.background.getHex():0;
  return bg===0x020711?'haunted':bg===0x091226?'city':null;
}
function actors(scene){
  const out=[];
  scene?.traverse(o=>{const a=o.userData?.actor;if(a&&!out.includes(a))out.push(a);});
  return out;
}
function human(scene){return actors(scene).find(a=>!a.isBot)||null;}
function getState(scene){
  let s=sceneState.get(scene);
  if(!s){s={last:new WeakMap(),covers:[],coverRefresh:0};sceneState.set(scene,s);}
  return s;
}
function refreshCovers(scene,state,now){
  if(now<state.coverRefresh)return;
  state.coverRefresh=now+500;
  const covers=[];
  scene.traverse(o=>{if(o.name==='BB_V15_COVER'&&o.visible!==false)covers.push(o);});
  state.covers=covers;
  activeCovers=covers;
}
function coverBounds(m){
  const p=m.geometry?.parameters||{};
  return {hw:(p.width||1)/2,hh:(p.height||1)/2,hd:(p.depth||1)/2};
}
function collideLegacyCover(actor,state){
  const p=actor.mesh?.position;if(!p)return;
  const rec=state.last.get(actor);if(!rec)return;
  for(const c of state.covers){
    const b=coverBounds(c),bottom=c.position.y-b.hh,top=c.position.y+b.hh;
    if(p.y>top+.35||p.y+2.55<bottom)continue;
    if(Math.abs(p.x-c.position.x)<b.hw+.44&&Math.abs(p.z-c.position.z)<b.hd+.44){
      p.x=rec.pos.x;p.z=rec.pos.z;
      break;
    }
  }
}
function fixDropSnap(actor,camera,isPlayer,state){
  const p=actor.mesh?.position;if(!p)return;
  const rec=state.last.get(actor);
  if(actor.dead||actor.mesh.visible===false){state.last.delete(actor);return;}
  if(!rec){state.last.set(actor,{y:p.y,pos:p.clone()});return;}

  // A real 30–60 fps frame cannot naturally fall 2+ world units. If V16/core
  // collapses an elevated actor to ground in one frame, restore the prior height
  // and hand control back to gravity so the drop feels physical instead of teleporting.
  const snappedDown=rec.y>1.6&&p.y<0.18&&(rec.y-p.y)>1.8;
  if(snappedDown){
    const snappedY=p.y;
    const restored=Math.max(.22,rec.y-.10);
    p.y=restored;
    actor.onGround=false;
    if(actor.velocity){actor.velocity.y=Math.min(actor.velocity.y??0,-1.8);}
    if(isPlayer&&camera)camera.position.y+=restored-snappedY;
  }

  collideLegacyCover(actor,state);
  state.last.set(actor,{y:p.y,pos:p.clone()});
}

// V15 cover was visually present but not guaranteed to be in the core worldMeshes array.
// Add it only when absent so bullets and bot LOS cannot pass straight through waist-high cover.
THREE.Raycaster.prototype.intersectObjects=function(objects,recursive=false,optionalTarget){
  let list=objects;
  if(activeCovers.length&&Array.isArray(objects)){
    const extra=activeCovers.filter(c=>!objects.includes(c));
    if(extra.length)list=objects.concat(extra);
  }
  return previousIntersectObjects.call(this,list,recursive,optionalTarget);
};

THREE.WebGLRenderer.prototype.render=function(scene,camera){
  const id=mapId(scene);
  if(id){
    const state=getState(scene),now=performance.now();
    refreshCovers(scene,state,now);
    const list=actors(scene),p=human(scene);
    for(const a of list)fixDropSnap(a,camera,a===p,state);
  }else activeCovers=[];
  return previousRender.call(this,scene,camera);
};

window.__bbWarfareStabilityV17={
  version:17,
  fixes:['elevated-drop-fall','v15-cover-collision','v15-cover-raycast']
};