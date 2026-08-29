import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* WARFARE UI STATE V28
   Presentation-only metadata for the polished fighter cards/loadout HUD.
   Caches the human actor per scene and only touches DOM when state changes. */
const prevRender=THREE.WebGLRenderer.prototype.render;
const sceneState=new WeakMap();
const R={basic:'BASIC',rare:'RARE',legendary:'LEGENDARY'};
const MELEE={sean:'ICE CREAM CONE',shannan:'SYRINGE',erin:'HAIRBRUSH',liam:'SHOULDER CHECK',connor:'PAINTBRUSH',kelly:'SHOVEL'};

function human(sc){
 let s=sceneState.get(sc);if(!s){s={player:null,last:''};sceneState.set(sc,s);}
 if(s.player?.mesh?.parent===sc&&!s.player.isBot)return s.player;
 let found=null;sc?.traverse(o=>{if(!found&&o.userData?.actor&&!o.userData.actor.isBot)found=o.userData.actor;});s.player=found;return found;
}
function syncRoster(){
 document.querySelectorAll('.fighter-choice').forEach(b=>{
  const key=b.querySelector('strong')?.textContent?.trim().toLowerCase();
  if(!key)return;b.dataset.character=key;
  if(MELEE[key])b.dataset.classicMelee=MELEE[key];
 });
}
function syncLoadout(p,sc){
 if(!p)return;const s=sceneState.get(sc),w=p.weapons?.[p.slot];
 const sig=`${p.slot}|${p.weapons?.map(x=>`${x.type}:${x.rarity||'basic'}:${x.ammo}:${x.reserve}`).join('|')||''}|${p.health}`;
 if(sig===s.last)return;s.last=sig;
 [['slotOne',0],['slotTwo',1]].forEach(([id,i])=>{
  const el=document.getElementById(id),x=p.weapons?.[i];if(!el)return;
  if(!x){delete el.dataset.rarity;delete el.dataset.weapon;delete el.dataset.ammo;return;}
  const rr=R[String(x.rarity||'basic').toLowerCase()]||'BASIC';
  el.dataset.rarity=rr;el.dataset.weapon=x.type.toUpperCase();el.dataset.ammo=`${x.ammo} / ${x.reserve}`;
  el.setAttribute('aria-label',`Slot ${i+1}: ${rr} ${x.type}, ${x.ammo} rounds, ${x.reserve} reserve`);
 });
 const right=document.querySelector('.hud-block.right');if(right)right.dataset.loadout=w?'armed':'melee';
 const name=document.getElementById('weaponName');if(name&&w)name.dataset.rarity=R[String(w.rarity||'basic').toLowerCase()]||'BASIC';
}

syncRoster();
THREE.WebGLRenderer.prototype.render=function(sc,cam){syncRoster();syncLoadout(human(sc),sc);return prevRender.call(this,sc,cam);};
window.__bbUIStateV28={version:28,role:'fighter-card-and-loadout-metadata'};
