import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* WARFARE CLASSIC SYNC V26
   Final identity sync layer. Loaded immediately before V25 so V25 calls through
   this layer after its own updates and before the actual scene draw. */
const prevRender=THREE.WebGLRenderer.prototype.render;
const MELEE={sean:'ICE CREAM CONE',shannan:'SYRINGE',erin:'HAIRBRUSH',liam:'SHOULDER CHECK',connor:'PAINTBRUSH',kelly:'SHOVEL'};
const KELLY_HAIR=0x6a4328;
function actors(sc){const out=[];sc?.traverse(o=>{const a=o.userData?.actor;if(a&&!out.includes(a))out.push(a);});return out;}
function syncKelly(a){if(a.charId!=='kelly')return;a.mesh?.traverse(o=>{if(!o.isMesh||!o.material?.color)return;let p=o.parent,insideHair=false;while(p&&p!==a.mesh){if(p.name==='BB_HAIR_UPGRADE_V23'||p.name==='BB_FEMALE_LONG_HAIR_V22'){insideHair=true;break;}p=p.parent;}if(insideHair||(o.parent===a.mesh&&o.position.y>2.48))o.material.color.setHex(KELLY_HAIR);});}
function syncHud(sc){const p=actors(sc).find(a=>!a.isBot);if(!p)return;const melee=MELEE[p.charId];if(!melee)return;if(!p.weapons?.[p.slot]){const ammo=document.getElementById('ammoText');if(ammo)ammo.textContent=melee;}p.mesh.userData.bbClassicMelee=melee;p.classicMelee=melee;}
THREE.WebGLRenderer.prototype.render=function(sc,cam){for(const a of actors(sc))syncKelly(a);syncHud(sc);return prevRender.call(this,sc,cam);};
window.__bbClassicSyncV26={version:26,melee:MELEE};
