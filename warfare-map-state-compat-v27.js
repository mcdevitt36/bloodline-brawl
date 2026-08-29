import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* WARFARE MAP STATE COMPAT V27
   Sky V18 uses richer background colors, while several mature gameplay modules
   historically identify maps by the original canonical colors. This wrapper is
   deliberately loaded immediately BEFORE Sky V18: Sky may build its dome and
   atmosphere, then V27 restores the canonical state color before collision,
   vertical traversal, smoothing, audio, feedback and gameplay wrappers run.
   The visible sky comes from the dome, not scene.background, so nothing visual is lost. */
const prevRender=THREE.WebGLRenderer.prototype.render;
const CANON={hub:0x071526,haunted:0x020711,city:0x091226};
function identify(sc){
 const h=sc?.background?.isColor?sc.background.getHex():0;
 if(h===0x071526||h===0x243d68)return'hub';
 if(h===0x020711||h===0x080d20)return'haunted';
 if(h===0x091226||h===0x111d44)return'city';
 if(sc?.userData?.bbMapId)return sc.userData.bbMapId;
 if(sc?.getObjectByName('BB_GRANDADDY_TOOLBOX')){
   // Loot only exists in matches; distinguish by known world markers when possible.
   if(sc.getObjectByName('BB_V16_WORLD'))return sc.userData.bbMapId||'match';
 }
 return null;
}
THREE.WebGLRenderer.prototype.render=function(sc,cam){
 const id=identify(sc);
 if(id&&CANON[id]){
   sc.userData.bbMapId=id;
   if(sc.background?.isColor&&sc.background.getHex()!==CANON[id])sc.background.setHex(CANON[id]);
 }
 return prevRender.call(this,sc,cam);
};
window.__bbMapStateV27={version:27,canonical:CANON,role:'sky/gameplay compatibility'};
