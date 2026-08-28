import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE CHARACTER APPEARANCE V22
   - Removes attack-name subtitles from Warfare character select cards.
   - Gives Shannan, Erin and Kelly longer 3D hair.
   - Overrides Erin to blonde in the 3D Warfare mode.
   Visual-only; does not touch combat logic/hitboxes. */

const previousRender=THREE.WebGLRenderer.prototype.render;
const done=new WeakSet();

const HAIR={
  shannan:0x553329,
  erin:0xd9b35d,
  kelly:0x74513b
};

function material(color){return new THREE.MeshStandardMaterial({color,roughness:.58,metalness:.01});}
function strand(g,x,y,z,sx,sy,sz,color,rz=0){
  const m=new THREE.Mesh(new THREE.SphereGeometry(.22,16,12),material(color));
  m.position.set(x,y,z);m.scale.set(sx,sy,sz);m.rotation.z=rz;m.castShadow=true;g.add(m);return m;
}
function addLongHair(actor){
  if(!actor?.mesh||done.has(actor.mesh)||!HAIR[actor.charId])return;
  done.add(actor.mesh);
  const color=HAIR[actor.charId];
  const g=new THREE.Group();g.name='BB_FEMALE_LONG_HAIR_V22';
  g.userData.bbFemaleHairV22=true;
  actor.mesh.add(g);

  // Crown and side volume cover the original short cap, then taper into shoulder-length strands.
  strand(g,0,2.62,-.10,1.62,.92,1.28,color);
  strand(g,-.31,2.45,-.10,.72,1.95,.82,color,-.05);
  strand(g,.31,2.45,-.10,.72,1.95,.82,color,.05);
  strand(g,-.36,2.12,-.12,.62,2.15,.72,color,-.06);
  strand(g,.36,2.12,-.12,.62,2.15,.72,color,.06);
  strand(g,-.27,1.82,-.16,.52,1.8,.62,color,-.04);
  strand(g,.27,1.82,-.16,.52,1.8,.62,color,.04);
  // Back sheet gives a readable long-hair silhouette from third-person camera.
  const back=new THREE.Mesh(new THREE.SphereGeometry(.36,18,14),material(color));
  back.position.set(0,2.13,-.22);back.scale.set(1.05,2.25,.55);back.castShadow=true;g.add(back);

  // Slightly different silhouettes so the three women don't look identical.
  if(actor.charId==='shannan'){
    strand(g,-.18,1.65,-.20,.42,1.25,.55,color,-.10);strand(g,.18,1.65,-.20,.42,1.25,.55,color,.10);
  } else if(actor.charId==='erin'){
    // Erin: lighter blonde, fuller shoulder-length shape.
    strand(g,-.40,1.94,-.08,.48,1.35,.56,color,-.12);strand(g,.40,1.94,-.08,.48,1.35,.56,color,.12);
    const shine=new THREE.Mesh(new THREE.SphereGeometry(.25,14,10),new THREE.MeshStandardMaterial({color:0xf2d986,roughness:.46,metalness:.01}));
    shine.position.set(-.10,2.55,.03);shine.scale.set(.75,.35,.5);g.add(shine);
  } else if(actor.charId==='kelly'){
    strand(g,-.42,2.18,-.10,.50,1.55,.62,color,-.14);strand(g,.42,2.18,-.10,.50,1.55,.62,color,.14);
  }
}

function simplifyRoster(){
  document.querySelectorAll('.fighter-choice small').forEach(el=>{el.style.display='none';});
}

simplifyRoster();
const observer=new MutationObserver(simplifyRoster);
observer.observe(document.documentElement,{childList:true,subtree:true});

THREE.WebGLRenderer.prototype.render=function(scene,camera){
  scene?.traverse(o=>{const a=o.userData?.actor;if(a)addLongHair(a);});
  return previousRender.call(this,scene,camera);
};

window.__bbCharacterAppearanceV22={version:22,features:['clean-roster-cards','longer-female-hair','erin-blonde']};
