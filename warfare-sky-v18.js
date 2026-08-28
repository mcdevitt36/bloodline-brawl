import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE SKY V18
   Cinematic sky pass:
   - Hub: Westhampton-inspired sunset over the ocean
   - Haunted: stormy moonlit violet-blue sky
   - City: electric blue/purple urban twilight
   Purely visual; no combat or collision changes.
*/
const prevRender=THREE.WebGLRenderer.prototype.render;
const states=new WeakMap();

function mapType(scene){
  const bg=scene?.background?.isColor?scene.background.getHex():0;
  if(bg===0x071526)return 'hub';
  if(bg===0x020711)return 'haunted';
  if(bg===0x091226)return 'city';
  return null;
}

function domeMaterial(type){
  const palettes={
    hub:{top:0x17345f,upper:0x49679a,mid:0xe58a88,horizon:0xffbb70,bottom:0xe98a62},
    haunted:{top:0x05091a,upper:0x111936,mid:0x31294f,horizon:0x75668d,bottom:0x152033},
    city:{top:0x08122d,upper:0x1b2c61,mid:0x5a4a8f,horizon:0xf07d90,bottom:0x27355d}
  };
  const p=palettes[type];
  return new THREE.ShaderMaterial({
    side:THREE.BackSide,depthWrite:false,fog:false,
    uniforms:{
      topColor:{value:new THREE.Color(p.top)},upperColor:{value:new THREE.Color(p.upper)},midColor:{value:new THREE.Color(p.mid)},horizonColor:{value:new THREE.Color(p.horizon)},bottomColor:{value:new THREE.Color(p.bottom)}
    },
    vertexShader:`varying vec3 vWorld; void main(){vec4 wp=modelMatrix*vec4(position,1.0);vWorld=wp.xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader:`
      uniform vec3 topColor;uniform vec3 upperColor;uniform vec3 midColor;uniform vec3 horizonColor;uniform vec3 bottomColor;varying vec3 vWorld;
      void main(){
        float h=normalize(vWorld).y;
        vec3 c;
        if(h>0.42)c=mix(upperColor,topColor,smoothstep(0.42,0.93,h));
        else if(h>0.08)c=mix(midColor,upperColor,smoothstep(0.08,0.42,h));
        else if(h>-0.09)c=mix(horizonColor,midColor,smoothstep(-0.09,0.08,h));
        else c=mix(bottomColor,horizonColor,smoothstep(-0.40,-0.09,h));
        float horizonGlow=exp(-pow((h+0.035)*8.0,2.0));
        c+=horizonColor*horizonGlow*0.17;
        gl_FragColor=vec4(c,1.0);
      }`
  });
}

function makeCloudMaterial(color,opacity){return new THREE.MeshBasicMaterial({color,transparent:true,opacity,depthWrite:false,side:THREE.DoubleSide,fog:false});}
function cloudBand(scene,x,y,z,w,h,color,opacity,rot=0){
  const g=new THREE.Group();
  for(let i=0;i<6;i++){
    const m=new THREE.Mesh(new THREE.PlaneGeometry(w*(.34+Math.random()*.25),h*(.55+Math.random()*.45)),makeCloudMaterial(color,opacity*(.65+Math.random()*.35)));
    m.position.set((i-2.5)*w*.13,(Math.random()-.5)*h*.35,Math.random()*.7);m.rotation.z=(Math.random()-.5)*.08;g.add(m);
  }
  g.position.set(x,y,z);g.rotation.y=rot;scene.add(g);return g;
}
function disc(scene,pos,r,color,opacity=1){const m=new THREE.Mesh(new THREE.CircleGeometry(r,48),new THREE.MeshBasicMaterial({color,transparent:opacity<1,opacity,depthWrite:false,fog:false,side:THREE.DoubleSide}));m.position.copy(pos);m.lookAt(0,8,0);scene.add(m);return m;}
function stars(scene,count=120){const arr=new Float32Array(count*3);for(let i=0;i<count;i++){const a=Math.random()*Math.PI*2,e=.16+Math.random()*1.15,r=300;arr[i*3]=Math.cos(a)*Math.cos(e)*r;arr[i*3+1]=Math.sin(e)*r;arr[i*3+2]=Math.sin(a)*Math.cos(e)*r;}const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(arr,3));const pts=new THREE.Points(geo,new THREE.PointsMaterial({color:0xeaf2ff,size:.75,sizeAttenuation:false,transparent:true,opacity:.7,depthWrite:false,fog:false}));scene.add(pts);return pts;}

function setupHub(scene,state){
  scene.background=new THREE.Color(0x243d68);
  const dome=new THREE.Mesh(new THREE.SphereGeometry(360,40,24),domeMaterial('hub'));dome.position.y=18;scene.add(dome);state.objects.push(dome);
  // Sunset is placed over the ocean side of the hub (west/left side).
  const sunPos=new THREE.Vector3(-250,35,-75);
  const halo=disc(scene,sunPos.clone().multiplyScalar(.985),16,0xff8a54,.22);halo.material.blending=THREE.AdditiveBlending;
  const sun=disc(scene,sunPos,9.5,0xffd17c,1);state.objects.push(halo,sun);
  state.sun=sun;state.halo=halo;
  cloudBand(scene,-170,58,-145,95,17,0xffc2b0,.18,.18);
  cloudBand(scene,-95,78,-210,120,20,0xd8a4b0,.16,-.15);
  cloudBand(scene,70,102,-230,135,19,0x8194bc,.14,.10);
  cloudBand(scene,170,65,-150,100,18,0xd88f9d,.14,-.18);
  // Warm low-angle light + cool sky fill to sell sunset on characters/buildings.
  const sunset=new THREE.DirectionalLight(0xff9a68,2.2);sunset.position.set(-90,25,-35);sunset.target.position.set(0,0,10);scene.add(sunset,sunset.target);state.objects.push(sunset,sunset.target);
  const fill=new THREE.HemisphereLight(0x8eace0,0x5d3b32,.55);scene.add(fill);state.objects.push(fill);
  // Long warm reflection over the ocean surface.
  const refl=new THREE.Mesh(new THREE.PlaneGeometry(18,120),new THREE.MeshBasicMaterial({color:0xffa66f,transparent:true,opacity:.15,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}));
  refl.rotation.x=-Math.PI/2;refl.rotation.z=.08;refl.position.set(-54,.02,-28);scene.add(refl);state.objects.push(refl);state.reflection=refl;
}
function setupHaunted(scene,state){
  scene.background=new THREE.Color(0x080d20);
  const dome=new THREE.Mesh(new THREE.SphereGeometry(330,36,22),domeMaterial('haunted'));dome.position.y=20;scene.add(dome);state.objects.push(dome);
  stars(scene,75);
  const moonPos=new THREE.Vector3(-235,145,-165);const halo=disc(scene,moonPos.clone().multiplyScalar(.99),14,0x95a9ff,.14);halo.material.blending=THREE.AdditiveBlending;const moon=disc(scene,moonPos,8,0xe8efff,1);state.objects.push(halo,moon);
  cloudBand(scene,-160,105,-185,125,24,0x596080,.15,.12);cloudBand(scene,95,90,-210,145,28,0x303955,.22,-.12);cloudBand(scene,180,68,-135,110,22,0x4a4166,.16,.17);
  const rim=new THREE.DirectionalLight(0x697cff,1.1);rim.position.set(-70,35,-45);scene.add(rim);state.objects.push(rim);
}
function setupCity(scene,state){
  scene.background=new THREE.Color(0x111d44);
  const dome=new THREE.Mesh(new THREE.SphereGeometry(380,40,24),domeMaterial('city'));dome.position.y=25;scene.add(dome);state.objects.push(dome);
  stars(scene,45);
  const sunPos=new THREE.Vector3(-285,30,-170);const glow=disc(scene,sunPos.clone().multiplyScalar(.99),11,0xff7b7f,.15);glow.material.blending=THREE.AdditiveBlending;const sun=disc(scene,sunPos,5.8,0xffb071,.92);state.objects.push(glow,sun);
  cloudBand(scene,-180,72,-230,135,22,0xd47891,.13,.15);cloudBand(scene,20,100,-280,165,22,0x6674a9,.13,-.08);cloudBand(scene,190,80,-190,115,19,0x5b5f8d,.12,.12);
  const dusk=new THREE.DirectionalLight(0xff8190,.8);dusk.position.set(-80,22,-65);scene.add(dusk);state.objects.push(dusk);
}
function setup(scene){const type=mapType(scene),state={type,objects:[],t:Math.random()*100};states.set(scene,state);if(type==='hub')setupHub(scene,state);else if(type==='haunted')setupHaunted(scene,state);else if(type==='city')setupCity(scene,state);return state;}

THREE.WebGLRenderer.prototype.render=function(scene,camera){
  let s=states.get(scene);if(!s)s=setup(scene);
  if(s?.type){const now=performance.now()*.00003;s.t=now;for(const o of s.objects){if(o?.isGroup&&o.children?.length)o.position.x+=Math.sin(now+o.id)*.0007;}if(s.halo)s.halo.material.opacity=.18+Math.sin(performance.now()*.0012)*.035;if(s.reflection)s.reflection.material.opacity=.12+Math.sin(performance.now()*.0008)*.025;}
  return prevRender.call(this,scene,camera);
};

window.__bbSkyV18={version:18,hub:'Westhampton-inspired sunset',haunted:'stormy moonlit dusk',city:'electric urban twilight'};