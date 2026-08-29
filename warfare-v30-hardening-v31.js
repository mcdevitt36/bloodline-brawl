import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE V30 HARDENING V31
   Small final guard around the comprehensive Warfare rules.
   - Protect newly-created match actors before the first animation tick.
   - Block Special / Ultra input during the 20-second no-damage grace period.
   - Make Grandaddy's Toolbox / Barrett's Toy Chest interaction prompts explicit.
   - Reassert the living human fighter's visibility, especially on City Rooftop.
   - Keep the legacy 7-minute results panel from resurfacing under V30 results.
*/

const previousAdd = THREE.Scene.prototype.add;
const previousRender = THREE.WebGLRenderer.prototype.render;
let activeScene = null;
const pendingRoots = new WeakSet();

function actors(scene){
  const out=[];
  scene?.traverse(o=>{const a=o.userData?.actor;if(a&&!out.includes(a))out.push(a);});
  return out;
}
function player(scene){return actors(scene).find(a=>!a.isBot)||null;}
function isMatch(scene){
  const label=(document.getElementById('modeLabel')?.textContent||'').toUpperCase();
  return (label.includes('HAUNTED')||label.includes('CITY')||label.includes('ROOFTOP'))&&actors(scene).length>1;
}

/* makeActor() adds the mesh to the scene immediately before assigning
   mesh.userData.actor. A microtask therefore sees the completed actor while
   still running before the browser gets its next animation frame. */
THREE.Scene.prototype.add=function(...objects){
  const result=previousAdd.apply(this,objects);
  for(const root of objects){
    if(!root||pendingRoots.has(root))continue;
    pendingRoots.add(root);
    queueMicrotask(()=>{
      root.traverse?.(o=>{
        const a=o.userData?.actor;
        if(!a)return;
        const label=(document.getElementById('modeLabel')?.textContent||'').toUpperCase();
        if(label.includes('HAUNTED')||label.includes('CITY')||label.includes('ROOFTOP')){
          /* First-frame safety only. V30/V32 own the real 20-second grace.
             This used to be 999 seconds, which made all hit registration
             appear broken for the entire round. */
          a.spawnProtection=Math.max(a.spawnProtection||0,22);
          a.lastShot=Math.max(a.lastShot||0,performance.now()+22000);
          a.lastMelee=Math.max(a.lastMelee||0,performance.now()+22000);
          a.mesh.visible=true;
        }
      });
    });
  }
  return result;
};

function graceActive(){
  const overlay=document.getElementById('bbWarfareGrace');
  if(!overlay)return false;
  return !overlay.classList.contains('fight');
}

/* No ability should sneak damage through the grace period. */
document.addEventListener('keydown',event=>{
  if(!activeScene||!isMatch(activeScene)||!graceActive())return;
  if(event.code==='KeyQ'||event.code==='KeyF'){
    event.preventDefault();
    event.stopImmediatePropagation();
    const feed=document.getElementById('feed');
    if(feed&&(!feed._bbV31LockedAt||performance.now()-feed._bbV31LockedAt>1000)){
      feed._bbV31LockedAt=performance.now();
      const item=document.createElement('div');
      item.className='feed-item';
      item.textContent='Abilities locked until FIGHT!';
      feed.prepend(item);
      setTimeout(()=>item.remove(),1800);
    }
  }
},true);

function nearestLegacyContainer(scene,p,max=3.25){
  if(!p||p.dead)return null;
  let best=null,bd=max;
  scene.traverse(o=>{
    if(o.name!=='BB_GRANDADDY_TOOLBOX'&&o.name!=='BB_BARRETT_TOY_CHEST')return;
    if(!o.visible)return;
    const lid=o.userData?.lid;
    /* V15 rotates the lid when opened. Don't keep prompting an already-open box. */
    if(lid&&Math.abs(lid.rotation.x)>.4)return;
    const world=new THREE.Vector3();o.getWorldPosition(world);
    const d=world.distanceTo(p.mesh.position);
    if(d<bd){bd=d;best={mesh:o,label:o.name==='BB_GRANDADDY_TOOLBOX'?"GRANDADDY'S TOOLBOX":"BARRETT'S TOY CHEST"};}
  });
  return best;
}

function ensureHumanVisible(scene){
  const p=player(scene);if(!p||p.dead)return;
  p.mesh.visible=true;
  p.mesh.traverse(o=>{
    if(o.name==='BB_HELD_GUN'||o.name==='BB_V30_HELD_GUN'||o.name==='BB_CLASSIC_MELEE')return;
    /* Only re-show core body / identity meshes. Do not revive deliberately hidden loot. */
    if(o.isMesh&&o.parent&&o.parent!==scene)o.visible=true;
  });
  const parts=p.mesh.userData?.parts||{};
  for(const k of ['torso','head','arms','legs'])if(parts[k])parts[k].visible=true;
}

function updatePrompt(scene){
  if(!isMatch(scene))return;
  const p=player(scene),legacy=nearestLegacyContainer(scene,p),prompt=document.getElementById('interactionPrompt');
  if(!legacy||!prompt)return;
  /* V30 themed containers are already handled by the main layer; this only
     fills the gap for the existing V15 Grandaddy / Barrett containers. */
  const current=(prompt.textContent||'').trim();
  if(!current||current.startsWith('E — PICK UP')){
    prompt.textContent=`E — OPEN ${legacy.label}`;
    prompt.classList.remove('hidden');
  }
}

function suppressLegacyResults(){
  if(document.getElementById('bbV30Elim')||document.getElementById('bbV30Results')||document.getElementById('bbV30Spectate')){
    document.getElementById('resultScreen')?.classList.add('hidden');
  }
}

THREE.WebGLRenderer.prototype.render=function(scene,camera){
  activeScene=scene;
  try{
    if(isMatch(scene)){
      ensureHumanVisible(scene);
      updatePrompt(scene);
      suppressLegacyResults();
    }
  }catch(error){console.warn('Warfare V31 hardening:',error);}
  return previousRender.call(this,scene,camera);
};

window.__bbWarfareHardeningV31={version:31,features:['first-frame-grace','ability-grace-lock','legacy-family-loot-prompts','rooftop-human-visibility','legacy-results-suppression']};