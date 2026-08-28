import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE SKY V18.2
   Cinematic sky pass with a stronger mobile-safe Hub sunset.
   Purely visual; no combat or collision changes. */
const prevRender=THREE.WebGLRenderer.prototype.render;
const states=new WeakMap();

function mapType(scene){
  const bg=scene?.background?.isColor?scene.background.getHex():0;
  const fog=scene?.fog?.color?.getHex?.()||0;
  if(bg===0x071526||fog===0x0b2134)return 'hub';
  if(bg===0x020711||fog===0x080d20)return 'haunted';
  if(bg===0x091226||fog===0x121a30)return 'city';
  return null;
}

function domeMaterial(type){
  const palettes={
    hub:{top:0x17345f,upper:0x536fa0,mid:0xf08c8d,horizon:0xffbd72,bottom:0xf06f4f},
    haunted:{top:0x05091a,upper:0x111936,mid:0x31294f,horizon:0x75668d,bottom:0x152033},
    city:{top:0x08122d,upper:0x1b2c61,mid:0x5a4a8f,horizon:0xf07d90,bottom:0x27355d}
  };
  const p=palettes[type];
  return new THREE.ShaderMaterial({
    side:THREE.BackSide,depthWrite:false,depthTest:false,fog:false,
    uniforms:{topColor:{value:new THREE.Color(p.top)},upperColor:{value:new THREE.Color(p.upper)},midColor:{value:new THREE.Color(p.mid)},horizonColor:{value:new THREE.Color(p.horizon)},bottomColor:{value:new THREE.Color(p.bottom)}},
    vertexShader:`varying vec3 vWorld;void main(){vec4 wp=modelMatrix*vec4(position,1.0);vWorld=wp.xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader:`uniform vec3 topColor;uniform vec3 upperColor;uniform vec3 midColor;uniform vec3 horizonColor;uniform vec3 bottomColor;varying vec3 vWorld;void main(){float h=normalize(vWorld).y;vec3 c;if(h>0.42)c=mix(upperColor,topColor,smoothstep(0.42,0.93,h));else if(h>0.08)c=mix(midColor,upperColor,smoothstep(0.08,0.42,h));else if(h>-0.12)c=mix(horizonColor,midColor,smoothstep(-0.12,0.08,h));else c=mix(bottomColor,horizonColor,smoothstep(-0.42,-0.12,h));float glow=exp(-pow((h+0.025)*7.0,2.0));c+=horizonColor*glow*.27;gl_FragColor=vec4(c,1.0);}`
  });
}

function cloudMat(c,o){return new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:o,depthWrite:false,depthTest:false,side:THREE.DoubleSide,fog:false});}
function cloudBand(scene,state,x,y,z,w,h,c,o,rot=0){const g=new THREE.Group();for(let i=0;i<6;i++){const m=new THREE.Mesh(new THREE.PlaneGeometry(w*(.34+Math.random()*.25),h*(.55+Math.random()*.45)),cloudMat(c,o*(.65+Math.random()*.35)));m.position.set((i-2.5)*w*.13,(Math.random()-.5)*h*.35,Math.random()*.7);m.rotation.z=(Math.random()-.5)*.08;g.add(m);}g.position.set(x,y,z);g.rotation.y=rot;scene.add(g);state.objects.push(g);return g;}
function disc(scene,state,pos,r,c,o=1){const m=new THREE.Mesh(new THREE.CircleGeometry(r,48),new THREE.MeshBasicMaterial({color:c,transparent:o<1,opacity:o,depthWrite:false,depthTest:false,fog:false,side:THREE.DoubleSide}));m.position.copy(pos);m.lookAt(0,6,0);m.renderOrder=-5;scene.add(m);state.objects.push(m);return m;}
function stars(scene,state,count=120){const arr=new Float32Array(count*3);for(let i=0;i<count;i++){const a=Math.random()*Math.PI*2,e=.16+Math.random()*1.15,r=300;arr[i*3]=Math.cos(a)*Math.cos(e)*r;arr[i*3+1]=Math.sin(e)*r;arr[i*3+2]=Math.sin(a)*Math.cos(e)*r;}const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(arr,3));const pts=new THREE.Points(geo,new THREE.PointsMaterial({color:0xeaf2ff,size:.75,sizeAttenuation:false,transparent:true,opacity:.7,depthWrite:false,fog:false}));scene.add(pts);state.objects.push(pts);return pts;}

function setupHub(scene,state){
  scene.background=new THREE.Color(0x6b5f82);
  const dome=new THREE.Mesh(new THREE.SphereGeometry(360,40,24),domeMaterial('hub'));dome.position.y=12;dome.renderOrder=-20;scene.add(dome);state.objects.push(dome);

  // Large, low sun over the ocean. It is intentionally oversized so it remains readable on small phone screens.
  const sunPos=new THREE.Vector3(-285,22,-40);
  const halo=disc(scene,state,sunPos.clone().multiplyScalar(.985),30,0xff704d,.28);halo.material.blending=THREE.AdditiveBlending;
  const halo2=disc(scene,state,sunPos.clone().multiplyScalar(.992),19,0xffa35f,.34);halo2.material.blending=THREE.AdditiveBlending;
  const sun=disc(scene,state,sunPos,11.5,0xffe39a,1);state.sun=sun;state.halo=halo;state.halo2=halo2;

  // Broad ocean-horizon glow: gives the Hub a visible sunset even when the sun disc is just outside a narrow mobile FOV.
  const horizon=new THREE.Mesh(new THREE.PlaneGeometry(170,42),new THREE.MeshBasicMaterial({color:0xff8a61,transparent:true,opacity:.23,depthWrite:false,depthTest:false,fog:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}));
  horizon.position.set(-295,20,0);horizon.rotation.y=Math.PI/2;horizon.renderOrder=-6;scene.add(horizon);state.objects.push(horizon);state.horizon=horizon;

  cloudBand(scene,state,-205,47,-120,110,18,0xffc4ae,.22,.15);
  cloudBand(scene,state,-150,68,-190,130,21,0xe7a7b3,.19,-.13);
  cloudBand(scene,state,45,96,-230,145,20,0x8194bc,.14,.10);
  cloudBand(scene,state,165,63,-145,105,18,0xdc929d,.15,-.18);

  const sunset=new THREE.DirectionalLight(0xff8c5f,2.8);sunset.position.set(-95,24,-30);sunset.target.position.set(0,0,10);scene.add(sunset,sunset.target);state.objects.push(sunset,sunset.target);
  const fill=new THREE.HemisphereLight(0x9cb5e7,0x7a4435,.72);scene.add(fill);state.objects.push(fill);
  const warmAmbient=new THREE.AmbientLight(0xffb18a,.26);scene.add(warmAmbient);state.objects.push(warmAmbient);

  const refl=new THREE.Mesh(new THREE.PlaneGeometry(23,135),new THREE.MeshBasicMaterial({color:0xffa66f,transparent:true,opacity:.23,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}));
  refl.rotation.x=-Math.PI/2;refl.rotation.z=.08;refl.position.set(-54,.03,-22);scene.add(refl);state.objects.push(refl);state.reflection=refl;
}
function setupHaunted(scene,state){scene.background=new THREE.Color(0x080d20);const dome=new THREE.Mesh(new THREE.SphereGeometry(330,36,22),domeMaterial('haunted'));dome.position.y=20;scene.add(dome);state.objects.push(dome);stars(scene,state,75);const moonPos=new THREE.Vector3(-235,145,-165);const halo=disc(scene,state,moonPos.clone().multiplyScalar(.99),14,0x95a9ff,.14);halo.material.blending=THREE.AdditiveBlending;disc(scene,state,moonPos,8,0xe8efff,1);cloudBand(scene,state,-160,105,-185,125,24,0x596080,.15,.12);cloudBand(scene,state,95,90,-210,145,28,0x303955,.22,-.12);const rim=new THREE.DirectionalLight(0x697cff,1.1);rim.position.set(-70,35,-45);scene.add(rim);state.objects.push(rim);}
function setupCity(scene,state){scene.background=new THREE.Color(0x111d44);const dome=new THREE.Mesh(new THREE.SphereGeometry(380,40,24),domeMaterial('city'));dome.position.y=25;scene.add(dome);state.objects.push(dome);stars(scene,state,45);const sunPos=new THREE.Vector3(-285,30,-170);const glow=disc(scene,state,sunPos.clone().multiplyScalar(.99),11,0xff7b7f,.15);glow.material.blending=THREE.AdditiveBlending;disc(scene,state,sunPos,5.8,0xffb071,.92);cloudBand(scene,state,-180,72,-230,135,22,0xd47891,.13,.15);cloudBand(scene,state,20,100,-280,165,22,0x6674a9,.13,-.08);const dusk=new THREE.DirectionalLight(0xff8190,.8);dusk.position.set(-80,22,-65);scene.add(dusk);state.objects.push(dusk);}
function setup(scene){const type=mapType(scene),state={type,objects:[],t:0};states.set(scene,state);if(type==='hub')setupHub(scene,state);else if(type==='haunted')setupHaunted(scene,state);else if(type==='city')setupCity(scene,state);return state;}

THREE.WebGLRenderer.prototype.render=function(scene,camera){let s=states.get(scene);if(!s)s=setup(scene);if(s?.type){const t=performance.now();if(s.halo)s.halo.material.opacity=.25+Math.sin(t*.0012)*.035;if(s.halo2)s.halo2.material.opacity=.31+Math.sin(t*.001)*.025;if(s.reflection)s.reflection.material.opacity=.19+Math.sin(t*.0008)*.035;if(s.horizon)s.horizon.material.opacity=.20+Math.sin(t*.00055)*.025;}return prevRender.call(this,scene,camera);};

window.__bbSkyV18={version:'18.2',hub:'strong mobile-safe Westhampton sunset',haunted:'stormy moonlit dusk',city:'electric urban twilight'};
