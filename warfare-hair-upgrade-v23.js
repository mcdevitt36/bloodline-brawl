import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE HAIR UPGRADE V23
   Visual-only hair silhouette upgrade.
   Women: clearly longer, fuller hair.
   Men: medium-length textured/swept-back movie-star style rather than buzz cuts.
   Preserves each established Warfare hair color; Erin remains blonde. */

const previousRender=THREE.WebGLRenderer.prototype.render;
const done=new WeakSet();
const HAIR={
  sean:0x3a271b,
  shannan:0x553329,
  erin:0xd9b35d,
  liam:0x4a3021,
  connor:0x3f2a20,
  kelly:0x74513b
};
const WOMEN=new Set(['shannan','erin','kelly']);

function mat(c){return new THREE.MeshStandardMaterial({color:c,roughness:.62,metalness:.005});}
function blob(g,x,y,z,r,sx,sy,sz,c,rz=0,rx=0){
  const m=new THREE.Mesh(new THREE.SphereGeometry(r,14,10),mat(c));
  m.position.set(x,y,z);m.scale.set(sx,sy,sz);m.rotation.z=rz;m.rotation.x=rx;m.castShadow=true;g.add(m);return m;
}
function lock(g,x,y,z,c,rz=0){return blob(g,x,y,z,.17,.70,1.42,.62,c,rz,.08);}

function addMensHair(g,c){
  // Dense crown: enough height/volume to eliminate the buzz-cut silhouette.
  blob(g,0,2.72,-.04,.27,1.38,.82,1.05,c);
  blob(g,-.23,2.70,-.02,.21,1.05,.86,.92,c,-.12);
  blob(g,.22,2.72,-.01,.21,1.08,.90,.92,c,.13);
  blob(g,-.34,2.60,-.04,.18,.72,1.08,.78,c,-.12);
  blob(g,.34,2.60,-.04,.18,.72,1.08,.78,c,.12);
  // Longer textured top swept back and slightly to the side, Hemsworth-inspired without copying a face.
  const tufts=[[-.28,2.82,.04,-.24],[-.13,2.88,.05,-.15],[.03,2.90,.04,.02],[.18,2.87,.02,.16],[.31,2.80,-.01,.25]];
  tufts.forEach(([x,y,z,r])=>blob(g,x,y,z,.15,.72,1.38,.70,c,r,-.16));
  // Temple/back length makes it read as medium hair from third-person angles.
  lock(g,-.35,2.48,-.09,c,-.08);lock(g,.35,2.48,-.09,c,.08);
  blob(g,0,2.49,-.27,.23,1.22,1.22,.58,c);
}

function addWomensHair(g,c,key){
  // Fuller crown and face-framing volume.
  blob(g,0,2.68,-.08,.30,1.42,.86,1.08,c);
  blob(g,-.30,2.53,-.08,.22,.82,1.42,.80,c,-.07);
  blob(g,.30,2.53,-.08,.22,.82,1.42,.80,c,.07);
  // Long locks extend well below shoulders so the silhouette is unmistakably long-haired.
  const bottom=key==='shannan'?1.36:key==='erin'?1.48:1.42;
  for(const side of [-1,1]){
    lock(g,.35*side,2.25,-.12,c,.06*side);
    lock(g,.39*side,1.95,-.14,c,.08*side);
    lock(g,.34*side,1.65,-.17,c,.10*side);
    blob(g,.29*side,bottom,-.18,.17,.62,1.45,.58,c,.12*side);
  }
  // Back mass gives flowing length from the over-shoulder gameplay camera.
  blob(g,0,2.05,-.29,.36,1.02,2.20,.54,c);
  blob(g,0,1.55,-.27,.27,.92,1.72,.50,c);
  // Character variation.
  if(key==='erin'){
    const hi=0xf2d986;blob(g,-.12,2.72,.06,.13,.72,.62,.55,hi,-.12);
    lock(g,-.43,1.88,-.08,c,-.13);lock(g,.43,1.88,-.08,c,.13);
  }
  if(key==='shannan'){
    lock(g,-.18,1.40,-.22,c,-.10);lock(g,.18,1.40,-.22,c,.10);
  }
  if(key==='kelly'){
    blob(g,-.43,2.15,-.09,.17,.60,1.55,.58,c,-.14);blob(g,.43,2.15,-.09,.17,.60,1.55,.58,c,.14);
  }
}

function upgrade(actor){
  if(!actor?.mesh||done.has(actor.mesh))return;
  const key=actor.charId,c=HAIR[key];if(!c)return;
  done.add(actor.mesh);
  // Hide only the earlier additive hair groups; base character geometry remains untouched.
  actor.mesh.children.forEach(ch=>{
    if(ch.name==='BB_FEMALE_LONG_HAIR_V22')ch.visible=false;
  });
  const g=new THREE.Group();g.name='BB_HAIR_UPGRADE_V23';g.userData.bbHairUpgradeV23=true;actor.mesh.add(g);
  WOMEN.has(key)?addWomensHair(g,c,key):addMensHair(g,c);
}

THREE.WebGLRenderer.prototype.render=function(scene,camera){
  scene?.traverse(o=>{const a=o.userData?.actor;if(a)upgrade(a);});
  return previousRender.call(this,scene,camera);
};
window.__bbHairUpgradeV23={version:23};
