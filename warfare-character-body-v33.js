import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* =====================================================
   BLOODLINE BRAWL — WARFARE CHARACTER BODY V33
   Visual-only replacement rig for Warfare characters.

   Goals:
   - replace the legacy block bodies with a rounded stylized 3D silhouette
   - more Fortnite-like proportions/readability without copying assets
   - segmented shoulders, upper/lower arms, hands, thighs, calves and shoes
   - shaped torso / hips / neck / jaw instead of stacked boxes
   - richer facial construction, layered hair and clothing forms
   - responsive run / idle / melee body animation
   - preserve actor roots, hit detection, weapons, Classic melee and combat logic
===================================================== */

const previousRender = THREE.WebGLRenderer.prototype.render;
const built = new WeakSet();
const memory = new WeakMap();

const CFG = {
  sean:{shirt:0x3e7d3b,shirt2:0x315f31,pants:0x64472f,skin:0xf0c7a5,hair:0x15110e,shoe:0x20242a,style:'polo',build:1.04},
  shannan:{shirt:0x597c9b,shirt2:0x45647e,pants:0x3d4652,skin:0xf1c8aa,hair:0x7b4c2c,shoe:0x24272d,style:'blouse',build:.96},
  erin:{shirt:0xf1f1ee,shirt2:0xdcdedb,pants:0x3971a8,skin:0xf2c9aa,hair:0xe1bc55,shoe:0xf1eee7,style:'fitted',build:.93},
  liam:{shirt:0x111317,shirt2:0x222831,pants:0x315b93,skin:0xefc4a2,hair:0x51331f,shoe:0xf0f2f4,style:'athletic',build:1.03},
  connor:{shirt:0x8e2727,shirt2:0x6f1f1f,pants:0x777b82,skin:0xefc6a5,hair:0x583a25,shoe:0x24272c,style:'polo',build:1.00},
  kelly:{shirt:0x17191d,shirt2:0x292d33,pants:0x7b7f86,skin:0xf2c9aa,hair:0x6a4328,shoe:0xf1eee6,style:'polo',build:.95}
};

const standard=(color,rough=.58,metal=.02)=>new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal});
const skinMat=c=>standard(c,.68,.01);

function shadows(o){o.castShadow=true;o.receiveShadow=true;return o;}
function sphere(g,x,y,z,r,c,sx=1,sy=1,sz=1,segments=20){
  const m=shadows(new THREE.Mesh(new THREE.SphereGeometry(r,segments,Math.max(10,segments-6)),standard(c,.61,.015)));
  m.position.set(x,y,z);m.scale.set(sx,sy,sz);g.add(m);return m;
}
function box(g,x,y,z,w,h,d,c,r=.56,m=.02,bevel=false){
  let geo;
  if(bevel){
    const sh=new THREE.Shape();const rx=w/2,ry=h/2,rad=Math.min(w,h)*.16;
    sh.moveTo(-rx+rad,-ry);sh.lineTo(rx-rad,-ry);sh.quadraticCurveTo(rx,-ry,rx,-ry+rad);sh.lineTo(rx,ry-rad);sh.quadraticCurveTo(rx,ry,rx-rad,ry);sh.lineTo(-rx+rad,ry);sh.quadraticCurveTo(-rx,ry,-rx,ry-rad);sh.lineTo(-rx,-ry+rad);sh.quadraticCurveTo(-rx,-ry,-rx+rad,-ry);
    geo=new THREE.ExtrudeGeometry(sh,{depth:d,bevelEnabled:true,bevelThickness:.025,bevelSize:.025,bevelSegments:2});geo.center();
  } else geo=new THREE.BoxGeometry(w,h,d);
  const mesh=shadows(new THREE.Mesh(geo,standard(c,r,m)));mesh.position.set(x,y,z);g.add(mesh);return mesh;
}
function tapered(g,x,y,z,rTop,rBottom,h,c,segments=14){
  const mesh=shadows(new THREE.Mesh(new THREE.CylinderGeometry(rTop,rBottom,h,segments,1,false),standard(c,.60,.015)));
  mesh.position.set(x,y,z);g.add(mesh);return mesh;
}
function limb(parent,len,rTop,rBottom,color){
  const m=shadows(new THREE.Mesh(new THREE.CylinderGeometry(rBottom,rTop,len,12,1,false),skinMat(color)));
  m.position.y=-len/2;parent.add(m);return m;
}
function clothingLimb(parent,len,rTop,rBottom,color){
  const m=shadows(new THREE.Mesh(new THREE.CylinderGeometry(rBottom,rTop,len,12,1,false),standard(color,.63,.01)));
  m.position.y=-len/2;parent.add(m);return m;
}

function hideLegacy(actor){
  const parts=actor.mesh.userData.parts||{};
  for(const key of ['torso','head','legs','arms']){
    const o=parts[key];if(!o)continue;
    o.traverse?.(n=>{if(n.isMesh){n.visible=false;n.castShadow=false;}});
  }
  actor.mesh.children.forEach(ch=>{
    if(['BB_CHARACTER_DETAIL_V8','BB_CLASSIC_IDENTITY_V24','BB_CHARACTER_APPEARANCE_V22','BB_HAIR_UPGRADE_V23'].includes(ch.name))ch.visible=false;
  });
}

function createHead(rig,cfg,key){
  const head=new THREE.Group();head.name='BB_V33_HEAD';head.position.set(0,2.43,0);rig.add(head);
  const face=shadows(new THREE.Mesh(new THREE.SphereGeometry(.39,24,18),skinMat(cfg.skin)));face.scale.set(.94,1.06,.90);head.add(face);

  // jaw + ears give the face a less spherical/toy silhouette.
  sphere(head,0,-.17,.06,.29,cfg.skin,.91,.58,.83,18);
  sphere(head,-.39,-.01,0,.10,cfg.skin,.63,1.05,.55,14);
  sphere(head,.39,-.01,0,.10,cfg.skin,.63,1.05,.55,14);

  // eyes with sclera, iris and subtle brow volume.
  for(const x of [-.145,.145]){
    sphere(head,x,.045,.342,.062,0xf8f7f2,1.18,.74,.43,16);
    const iris=key==='liam'?0x5b7f92:key==='erin'?0x647b86:0x3c4c4c;
    sphere(head,x,.044,.381,.029,iris,1,1,.55,12);
    sphere(head,x+.007,.053,.397,.010,0x151719,1,1,.5,10);
    const brow=box(head,x,.145,.335,.17,.035,.035,cfg.hair,.72,.01,true);brow.rotation.z=x<0?-.06:.06;
  }
  sphere(head,0,-.035,.355,.077,cfg.skin,.72,1.06,.90,14);
  const mouth=box(head,0,-.145,.354,.19,.026,.025,0x8a4d4d,.7,.01,true);mouth.rotation.x=.05;

  // layered hair volume; no helmet hemisphere.
  const hc=cfg.hair;
  const hair=new THREE.Group();hair.name='BB_V33_HAIR';head.add(hair);
  for(const [x,y,z,sx,sy,sz] of [
    [-.23,.28,.00,.82,.56,.78],[0,.34,.02,1,.60,.82],[.23,.28,.00,.82,.56,.78],
    [-.31,.17,-.02,.60,.82,.68],[.31,.17,-.02,.60,.82,.68]
  ]) sphere(hair,x,y,z,.22,hc,sx,sy,sz,16);
  if(['shannan','erin','kelly'].includes(key)){
    sphere(hair,-.34,-.10,-.07,.21,hc,.70,1.72,.66,16);
    sphere(hair,.34,-.10,-.07,.21,hc,.70,1.72,.66,16);
    sphere(hair,-.30,-.34,-.10,.17,hc,.64,1.40,.60,14);
    sphere(hair,.30,-.34,-.10,.17,hc,.64,1.40,.60,14);
  } else {
    for(const [x,r] of [[-.22,-.17],[-.07,-.06],[.09,.08],[.24,.18]]){
      const tuft=tapered(hair,x,.43,.02,.055,.09,.25,hc,10);tuft.rotation.z=r;
    }
  }
  return head;
}

function createTorso(rig,cfg,key){
  const torso=new THREE.Group();torso.name='BB_V33_TORSO';rig.add(torso);
  tapered(torso,0,1.58,0,.44*cfg.build,.50*cfg.build,1.05,cfg.shirt,16);
  // chest front panel and side shading create readable clothing depth.
  const front=box(torso,0,1.60,.435,.69*cfg.build,.82,.045,cfg.shirt2,.68,.01,true);
  front.scale.y=.98;
  tapered(torso,0,1.03,0,.34*cfg.build,.42*cfg.build,.24,key==='erin'?0x33455f:0x242931,14);
  tapered(torso,0,2.10,0,.14,.16,.26,cfg.skin,14);

  if(['polo','athletic'].includes(cfg.style)){
    const collarL=box(torso,-.13,2.01,.44,.24,.12,.04,0xe8e5dc,.64,.01,true);collarL.rotation.z=-.32;
    const collarR=box(torso,.13,2.01,.44,.24,.12,.04,0xe8e5dc,.64,.01,true);collarR.rotation.z=.32;
    box(torso,0,1.85,.45,.065,.28,.035,0xe8e5dc,.64,.01,true);
    for(const y of [1.94,1.83,1.72])sphere(torso,0,y,.472,.025,0xf5f2e8,1,1,.58,10);
  }
  if(key==='liam'){
    box(torso,0,1.52,.45,.73,.13,.035,0xe5e9ee,.65,.01,true);
    box(torso,0,1.58,.475,.18,.18,.025,0xe5e9ee,.65,.01,true);
  }
  if(key==='shannan'){
    const neck=new THREE.Mesh(new THREE.TorusGeometry(.17,.025,7,20,Math.PI),standard(0xd5e5ef,.58,.01));neck.position.set(0,2.02,.445);neck.rotation.z=Math.PI;torso.add(neck);
  }
  return torso;
}

function createArm(rig,cfg,side){
  const s=side<0?-1:1;
  const shoulder=new THREE.Group();shoulder.name=s<0?'BB_V33_ARM_L':'BB_V33_ARM_R';shoulder.position.set(.53*s,1.91,0);rig.add(shoulder);
  sphere(shoulder,0,0,0,.19,cfg.shirt,1,.88,1,14);
  clothingLimb(shoulder,.39,.145,.135,cfg.shirt);
  const elbow=new THREE.Group();elbow.position.y=-.39;shoulder.add(elbow);
  sphere(elbow,0,0,0,.135,cfg.skin,1,.88,1,12);
  limb(elbow,.43,.12,.105,cfg.skin);
  sphere(elbow,0,-.45,.015,.14,cfg.skin,.90,.95,.76,14);
  shoulder.rotation.z=s*.06;
  return {shoulder,elbow};
}

function createLeg(rig,cfg,side){
  const s=side<0?-1:1;
  const hip=new THREE.Group();hip.name=s<0?'BB_V33_LEG_L':'BB_V33_LEG_R';hip.position.set(.23*s,1.00,0);rig.add(hip);
  sphere(hip,0,0,0,.18,cfg.pants,1,.78,.90,14);
  clothingLimb(hip,.48,.165,.145,cfg.pants);
  const knee=new THREE.Group();knee.position.y=-.48;hip.add(knee);
  sphere(knee,0,0,0,.145,cfg.pants,1,.78,.92,12);
  clothingLimb(knee,.47,.135,.115,cfg.pants);
  const shoe=box(knee,0,-.52,.13,.33,.19,.52,cfg.shoe,.50,.05,true);shoe.rotation.x=.03;
  box(knee,0,-.57,.29,.34,.07,.22,key==='liam'||key==='erin'?0xdcdfe2:0x16191e,.58,.02,true);
  return {hip,knee};
}

function build(actor){
  const cfg=CFG[actor.charId];if(!cfg||built.has(actor.mesh))return;
  built.add(actor.mesh);hideLegacy(actor);

  const rig=new THREE.Group();rig.name='BB_V33_MODERN_BODY';actor.mesh.add(rig);
  createTorso(rig,cfg,actor.charId);
  const head=createHead(rig,cfg,actor.charId);
  const leftArm=createArm(rig,cfg,-1),rightArm=createArm(rig,cfg,1);
  const leftLeg=createLeg(rig,cfg,-1),rightLeg=createLeg(rig,cfg,1);

  // subtle character stature variation without changing gameplay size.
  const height=actor.charId==='shannan'||actor.charId==='erin'||actor.charId==='kelly'?.97:1;
  rig.scale.set(1,height,1);

  memory.set(actor,{rig,head,leftArm,rightArm,leftLeg,rightLeg,lastPos:actor.mesh.position.clone(),phase:Math.random()*6.28,lastMelee:actor.lastMelee||0,swingAt:0});
  actor.mesh.userData.bbModernBody=rig;
}

function weaponEquipped(actor){return !!actor?.weapons?.[actor.slot];}
function animate(actor,time){
  const m=memory.get(actor);if(!m)return;
  const pos=actor.mesh.position,dx=pos.x-m.lastPos.x,dz=pos.z-m.lastPos.z,dist=Math.hypot(dx,dz);
  m.phase+=dist*4.6;m.lastPos.copy(pos);

  if((actor.lastMelee||0)!==m.lastMelee){m.lastMelee=actor.lastMelee||0;m.swingAt=time;}
  const armed=weaponEquipped(actor);
  m.leftArm.shoulder.visible=!armed;m.rightArm.shoulder.visible=!armed;

  if(actor.dead){m.rig.visible=false;return;}m.rig.visible=true;
  const running=dist>.0035;
  const stride=running?Math.sin(m.phase):0;
  const bounce=running?Math.abs(Math.sin(m.phase*2))*.018:Math.sin(time*.0022)*.008;
  m.rig.position.y=bounce;

  // legs: opposing thigh/calf motion, much less robotic than whole-leg blocks.
  m.leftLeg.hip.rotation.x=stride*.55;m.rightLeg.hip.rotation.x=-stride*.55;
  m.leftLeg.knee.rotation.x=Math.max(0,-stride)*.42;m.rightLeg.knee.rotation.x=Math.max(0,stride)*.42;

  if(!armed){
    const swingAge=(time-m.swingAt)/360;
    if(swingAge>=0&&swingAge<1){
      const arc=Math.sin(swingAge*Math.PI);
      m.rightArm.shoulder.rotation.x=-.35-arc*1.55;
      m.rightArm.shoulder.rotation.z=-.08-arc*.42;
      m.rightArm.elbow.rotation.x=-arc*.70;
      m.leftArm.shoulder.rotation.x=.15+arc*.20;
    } else if(running){
      m.leftArm.shoulder.rotation.x=-stride*.55;m.rightArm.shoulder.rotation.x=stride*.55;
      m.leftArm.elbow.rotation.x=-.10-Math.max(0,stride)*.18;
      m.rightArm.elbow.rotation.x=-.10-Math.max(0,-stride)*.18;
      m.leftArm.shoulder.rotation.z=-.06;m.rightArm.shoulder.rotation.z=.06;
    } else {
      m.leftArm.shoulder.rotation.x=Math.sin(time*.0018)*.035;
      m.rightArm.shoulder.rotation.x=-Math.sin(time*.0018)*.035;
      m.leftArm.shoulder.rotation.z=-.055;m.rightArm.shoulder.rotation.z=.055;
      m.leftArm.elbow.rotation.x=-.08;m.rightArm.elbow.rotation.x=-.08;
    }
  }

  // slight head/body counter movement gives idle and locomotion more life.
  m.head.rotation.y=running?Math.sin(m.phase*.5)*.025:Math.sin(time*.0012)*.025;
  m.head.rotation.z=running?-stride*.012:0;
}

function improveScene(scene,renderer){
  if(!scene||scene.userData.bbV33Lighting)return;scene.userData.bbV33Lighting=true;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.12;
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;

  // Soft cool key/fill + warm rim, kept restrained so existing maps retain identity.
  const fill=new THREE.HemisphereLight(0xb9dcff,0x35402d,.34);fill.name='BB_V33_FILL';scene.add(fill);
  const rim=new THREE.DirectionalLight(0xffd3a3,.38);rim.name='BB_V33_RIM';rim.position.set(-18,24,-16);scene.add(rim);
}

THREE.WebGLRenderer.prototype.render=function(scene,camera){
  try{
    improveScene(scene,this);
    const seen=new Set();
    scene?.traverse(o=>{const a=o.userData?.actor;if(a&&!seen.has(a)){seen.add(a);build(a);hideLegacy(a);animate(a,performance.now());}});
  }catch(err){console.warn('Warfare character body V33:',err);}
  return previousRender.call(this,scene,camera);
};

window.__bbWarfareCharacterBodyV33={version:33,style:'rounded-stylized-hero'};
