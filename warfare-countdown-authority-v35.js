import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE COUNTDOWN AUTHORITY V35
   Small final rules authority for match opening only.
   Guarantees a real 20-second move/loot grace period on the game-updates branch,
   regardless of the legacy 3-second countdown still present in warfare-v4.js.
*/

const previousRender = THREE.WebGLRenderer.prototype.render;
const previousAdd = THREE.Scene.prototype.add;
const matchState = new WeakMap();
const pendingRoots = new WeakSet();
let activeState = null;

const GRACE_MS = 20000;
const ROUND_MS = 300000;

function now(){ return performance.now(); }
function fighters(scene){
  const list=[];
  scene?.traverse(o=>{const a=o.userData?.actor;if(a&&!list.includes(a))list.push(a);});
  return list;
}
function mapName(){
  const label=(document.getElementById('modeLabel')?.textContent||'').toUpperCase();
  if(label.includes('HAUNTED'))return 'HAUNTED BEACH HOUSE';
  if(label.includes('CITY')||label.includes('ROOFTOP'))return 'CITY ROOFTOP';
  return null;
}
function isBattle(scene){return !!mapName()&&fighters(scene).length>1;}

function installStyles(){
  if(document.getElementById('bbV35CountdownStyle'))return;
  const style=document.createElement('style');
  style.id='bbV35CountdownStyle';
  style.textContent=`
    #bbV35Countdown{position:fixed;left:50%;top:86px;transform:translateX(-50%);z-index:9999;min-width:330px;padding:12px 24px 13px;border:3px solid #62caff;border-radius:12px;background:linear-gradient(180deg,rgba(8,24,39,.97),rgba(4,10,18,.96));box-shadow:0 14px 36px rgba(0,0,0,.48),0 0 30px rgba(73,183,255,.22);text-align:center;color:#fff;font-family:Arial,sans-serif;pointer-events:none}
    #bbV35Countdown .eyebrow{font-size:10px;font-weight:1000;letter-spacing:3px;color:#71d0ff}
    #bbV35Countdown .number{margin:1px 0 2px;font:1000 42px/1 Impact,'Arial Black',sans-serif;text-shadow:3px 3px #101820}
    #bbV35Countdown .note{font-size:9px;font-weight:900;letter-spacing:1.4px;color:#c1d3df}
    #bbV35Countdown.fight{border-color:#ffd52a;animation:bbV35Fight 1.05s ease-out forwards}
    #bbV35Countdown.fight .eyebrow{color:#ffd52a}
    @keyframes bbV35Fight{0%{opacity:0;transform:translateX(-50%) scale(.75)}20%{opacity:1;transform:translateX(-50%) scale(1.10)}70%{opacity:1;transform:translateX(-50%) scale(1)}100%{opacity:0;transform:translateX(-50%) scale(1)}}
    @media(max-width:620px){#bbV35Countdown{top:68px;min-width:245px;padding:10px 16px}#bbV35Countdown .number{font-size:36px}}
  `;
  document.head.appendChild(style);
}
installStyles();

function node(){
  let el=document.getElementById('bbV35Countdown');
  if(!el){el=document.createElement('div');el.id='bbV35Countdown';document.body.appendChild(el);}
  return el;
}
function showCountdown(leftMs,state){
  const el=node();el.classList.remove('fight');
  const sec=Math.max(1,Math.ceil(leftMs/1000));
  el.innerHTML=`<div class="eyebrow">GET READY</div><div class="number">${sec}</div><div class="note">MOVE • LOOT • SPREAD OUT • WEAPONS LOCKED</div>`;
  const timer=document.getElementById('matchTimer');if(timer)timer.textContent='5:00';
  const legacy=document.getElementById('matchIntro');legacy?.classList.add('hidden');
  const older=document.getElementById('bbWarfareGrace');if(older)older.style.display='none';
  state.lastShown=sec;
}
function showFight(state){
  const el=node();el.classList.add('fight');
  el.innerHTML='<div class="eyebrow">WARFARE</div><div class="number">FIGHT!</div><div class="note">WEAPONS • MELEE • ABILITIES LIVE</div>';
  const older=document.getElementById('bbWarfareGrace');if(older)older.style.display='none';
  state.fightShown=true;
  setTimeout(()=>{const n=document.getElementById('bbV35Countdown');if(n)n.remove();},1100);
}

function protectActor(a,leftMs){
  if(!a||a.dead)return;
  /* Core damageActor checks spawnProtection > 0. Keep a tiny positive amount
     throughout grace and replace any stale 999-style protection. */
  a.spawnProtection=Math.max(.25,leftMs/1000+.15);
  a.lastMelee=now()+Math.max(350,leftMs+100);
  if(a.isBot)a.lastShot=now()+Math.max(400,leftMs+150);
}
function releaseActor(a){
  if(!a||a.dead)return;
  a.spawnProtection=0;
  if(a.lastShot>now()+1500)a.lastShot=now()+180;
  if(a.lastMelee>now()+1500)a.lastMelee=now()+180;
}

function getState(scene){
  let s=matchState.get(scene);
  if(!s){
    s={startedAt:now(),graceEnd:now()+GRACE_MS,roundEnd:now()+GRACE_MS+ROUND_MS,fightShown:false,lastShown:20};
    matchState.set(scene,s);
  }
  return s;
}

/* Newly created actors are protected before the first useful combat frame. */
THREE.Scene.prototype.add=function(...objects){
  const result=previousAdd.apply(this,objects);
  for(const root of objects){
    if(!root||pendingRoots.has(root))continue;
    pendingRoots.add(root);
    queueMicrotask(()=>{
      if(!mapName())return;
      root.traverse?.(o=>{
        const a=o.userData?.actor;if(!a)return;
        a.spawnProtection=20.25;
        a.lastShot=now()+20500;
        a.lastMelee=now()+20500;
        a.mesh.visible=true;
      });
    });
  }
  return result;
};

function graceActive(){return !!activeState&&now()<activeState.graceEnd;}
function blockCombatEvent(event){
  if(!graceActive())return;
  if(event.type==='mousedown'&&event.button!==0)return;
  if(event.type==='keydown'&&!['KeyJ','KeyQ','KeyF'].includes(event.code))return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const feed=document.getElementById('feed');
  if(feed&&(!feed._bbV35NoteAt||now()-feed._bbV35NoteAt>1100)){
    feed._bbV35NoteAt=now();
    const item=document.createElement('div');item.className='feed-item';
    item.textContent=`Weapons locked • ${Math.max(1,Math.ceil((activeState.graceEnd-now())/1000))}s`;
    feed.prepend(item);setTimeout(()=>item.remove(),1500);
  }
}
window.addEventListener('mousedown',blockCombatEvent,true);
document.addEventListener('keydown',blockCombatEvent,true);

function update(scene){
  if(!isBattle(scene)){
    activeState=null;
    document.getElementById('bbV35Countdown')?.remove();
    const older=document.getElementById('bbWarfareGrace');if(older)older.style.display='';
    return;
  }
  const s=getState(scene);activeState=s;
  const t=now(),left=s.graceEnd-t,list=fighters(scene);
  if(left>0){
    showCountdown(left,s);
    for(const a of list)protectActor(a,left);
  }else{
    for(const a of list)releaseActor(a);
    if(!s.fightShown)showFight(s);
    const timer=document.getElementById('matchTimer');
    if(timer){const rem=Math.max(0,s.roundEnd-t),sec=Math.ceil(rem/1000);timer.textContent=`${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`;}
  }
}

THREE.WebGLRenderer.prototype.render=function(scene,camera){
  try{update(scene);}catch(err){console.warn('Warfare countdown authority V35:',err);}
  return previousRender.call(this,scene,camera);
};

window.__bbWarfareCountdownAuthorityV35={version:35,graceSeconds:20,roundSeconds:300,branch:'game-updates'};
