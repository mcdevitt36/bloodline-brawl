import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE CHARACTER POLISH V8
   Additive visual-only pass. Keeps actor roots, hitboxes, combat and animation logic intact. */

const prevRender=THREE.WebGLRenderer.prototype.render;
const polished=new WeakSet();

const CFG={
  sean:{shirt:0x2f66c8,accent:0xd9e7ff,pants:0x2b2e34,skin:0xf0c7a5,hair:0x3a271b,style:'polo',shoe:0x26292f},
  shannan:{shirt:0x8a4fb3,accent:0xd7b9eb,pants:0x20232b,skin:0xf1c8aa,hair:0x553329,style:'blouse',shoe:0x26242b},
  erin:{shirt:0xe35b8f,accent:0xffb1cc,pants:0x4a4f59,skin:0xf2c9aa,hair:0x68422e,style:'fitted',shoe:0xf0ede8},
  liam:{shirt:0x284c8f,accent:0xe9edf5,pants:0x162638,skin:0xefc4a2,hair:0x4a3021,style:'rugby',shoe:0xe7e9ed},
  connor:{shirt:0x4e9a5b,accent:0xd7ead8,pants:0x313640,skin:0xefc6a5,hair:0x3f2a20,style:'polo',shoe:0x24272c},
  kelly:{shirt:0xe3b84f,accent:0xfff0b8,pants:0x3a3444,skin:0xf2c9aa,hair:0x74513b,style:'polo',shoe:0xf1eee6}
};

const mat=(c,r=.58,m=.03)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
const box=(g,x,y,z,w,h,d,c,r=.58,m=.03)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c,r,m));o.position.set(x,y,z);o.castShadow=true;g.add(o);return o;};
const sphere=(g,x,y,z,r,c,sx=1,sy=1,sz=1)=>{const o=new THREE.Mesh(new THREE.SphereGeometry(r,16,12),mat(c,.6,.01));o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.castShadow=true;g.add(o);return o;};
const cyl=(g,x,y,z,r,h,c)=>{const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,14),mat(c));o.position.set(x,y,z);o.castShadow=true;g.add(o);return o;};

function collarPiece(g,x,y,z,flip,c){
  const shape=new THREE.Shape();shape.moveTo(0,0);shape.lineTo(.24,0);shape.lineTo(.05,-.28);shape.closePath();
  const m=new THREE.Mesh(new THREE.ShapeGeometry(shape),mat(c,.5,.02));m.position.set(x,y,z);m.rotation.y=flip?Math.PI:0;g.add(m);return m;
}
function addFace(g,cfg,key){
  // ears, nose, eyes, brows and mouth; all slightly raised so they read at gameplay distance.
  sphere(g,-.39,2.43,.01,.11,cfg.skin,.7,1.1,.55);sphere(g,.39,2.43,.01,.11,cfg.skin,.7,1.1,.55);
  sphere(g,0,2.39,.355,.075,cfg.skin,.72,1.05,.9);
  for(const x of [-.14,.14]){sphere(g,x,2.49,.337,.055,0xf7f7f2,1.15,.72,.45);sphere(g,x,2.49,.373,.025,key==='liam'?0x52758c:0x3e5360,1,1,.55);box(g,x,2.585,.354,.16,.025,.025,cfg.hair);}
  box(g,0,2.27,.365,.22,.028,.022,0x914f4f);
}
function addHair(g,cfg,key){
  // layered hair cap + small tufts makes the old hemisphere look less helmet-like.
  const color=cfg.hair;
  for(const [x,y,z,s] of [[-.2,2.72,.08,.17],[0,2.76,.1,.19],[.2,2.72,.08,.17],[-.3,2.63,.02,.15],[.3,2.63,.02,.15]])sphere(g,x,y,z,s,color,1.25,.65,.8);
  if(key==='shannan'||key==='erin'||key==='kelly'){
    sphere(g,-.32,2.38,-.03,.22,color,.65,1.75,.7);sphere(g,.32,2.38,-.03,.22,color,.65,1.75,.7);
  }
  if(key==='liam'||key==='connor'){
    for(const x of [-.22,-.07,.08,.23]){const t=box(g,x,2.79,.05,.12,.20,.12,color);t.rotation.z=(x<0?-.16:.16);}
  }
}
function addShoes(g,cfg){
  for(const x of [-.24,.24]){const s=box(g,x,.14,.10,.34,.20,.58,cfg.shoe,.42,.08);s.position.z=.09;box(g,x,.08,.30,.35,.07,.18,0xd9d9d9,.55,.02);}
}
function addClothes(g,cfg,key){
  // front shirt layer softens the original box torso and adds seams.
  const front=box(g,0,1.57,.265,.86,1.05,.055,cfg.shirt,.62,.02);front.scale.x=.98;
  box(g,0,1.02,.265,.88,.08,.06,cfg.accent,.55,.02);
  // neckline / collar treatment per character.
  if(cfg.style==='polo'||cfg.style==='rugby'){
    collarPiece(g,-.23,2.03,.30,false,cfg.accent);collarPiece(g,.23,2.03,.30,true,cfg.accent);
    box(g,0,1.88,.305,.12,.38,.035,cfg.accent,.55,.02);
    for(const y of [1.98,1.86,1.74])sphere(g,0,y,.335,.035,0xf1efe8,.8,.8,.45);
  }
  if(cfg.style==='rugby'){
    box(g,0,1.38,.305,.82,.14,.035,cfg.accent,.55,.02);
    box(g,-.43,1.72,.01,.10,.45,.54,cfg.accent,.55,.02);box(g,.43,1.72,.01,.10,.45,.54,cfg.accent,.55,.02);
  }
  if(cfg.style==='blouse'){
    const neck=new THREE.Mesh(new THREE.TorusGeometry(.18,.035,8,18,Math.PI),mat(cfg.accent));neck.position.set(0,2.02,.31);neck.rotation.z=Math.PI;g.add(neck);
    for(const x of [-.41,.41])sphere(g,x,1.82,0,.16,cfg.shirt,1.05,.75,1.1);
  }
  if(cfg.style==='fitted'){
    box(g,0,2.02,.30,.52,.055,.04,cfg.accent,.55,.02);
    for(const x of [-.41,.41])box(g,x,1.78,0,.15,.30,.52,cfg.shirt,.58,.02);
  }
  // sleeve cuffs, belt/waist detail and subtle pockets.
  for(const x of [-.60,.60])box(g,x,1.19,.01,.235,.10,.275,cfg.shirt,.6,.02);
  box(g,0,.96,.04,.88,.09,.46,key==='erin'?0x31343a:0x24272c,.42,.12);
  if(['sean','connor','kelly'].includes(key))box(g,.20,1.48,.296,.18,.20,.025,cfg.accent,.62,.02);
}
function improveBase(actor,cfg){
  const parts=actor.mesh.userData.parts;
  if(!parts)return;
  // Make the existing block proportions less toy-like while keeping root/hit behavior unchanged.
  if(parts.torso){parts.torso.scale.set(.92,1.04,.92);parts.torso.position.y=1.58;}
  if(parts.head){parts.head.scale.set(.96,1.08,.92);parts.head.position.y=2.43;}
  if(parts.legs){parts.legs.children.forEach(l=>{l.scale.set(.88,1.08,.92);l.position.y=.60;});}
  if(parts.arms){parts.arms.children.forEach(a=>a.scale.set(.90,1.02,.92));}
}
function polish(actor){
  if(!actor?.mesh||polished.has(actor.mesh))return;
  const key=actor.charId,cfg=CFG[key];if(!cfg)return;
  polished.add(actor.mesh);improveBase(actor,cfg);
  const g=new THREE.Group();g.name='BB_CHARACTER_DETAIL_V8';g.userData.bbCharacterDetail=true;actor.mesh.add(g);
  // neck and jaw/chin add more human transition between torso/head.
  cyl(g,0,2.08,0,.15,.30,cfg.skin);sphere(g,0,2.20,.03,.22,cfg.skin,1.05,.55,.82);
  addClothes(g,cfg,key);addFace(g,cfg,key);addHair(g,cfg,key);addShoes(g,cfg);
  // Character-specific tiny touches.
  if(key==='sean') box(g,-.27,1.58,.305,.13,.09,.025,0xd7e6ff,.45,.02);
  if(key==='connor') sphere(g,.26,1.53,.335,.045,0xe6d96f,.9,.9,.5);
  if(key==='kelly') box(g,-.27,1.58,.305,.13,.09,.025,0xffe7a0,.45,.02);
  if(key==='liam'){
    box(g,0,1.60,.31,.28,.20,.025,0xe7ebf4,.52,.02);box(g,0,1.60,.333,.06,.15,.015,0x284c8f,.52,.02);
  }
  if(key==='erin') sphere(g,.30,1.63,.325,.045,0xf3d7df,.9,.9,.5);
  if(key==='shannan') sphere(g,0,1.88,.335,.04,0xf1d3f4,.9,.9,.5);
}

THREE.WebGLRenderer.prototype.render=function(scene,camera){
  scene.traverse(o=>{const a=o.userData?.actor;if(a&&!a.isBot?true:a)polish(a);});
  return prevRender.call(this,scene,camera);
};
window.__bbCharacterPolishV8={version:8};
