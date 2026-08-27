/* =====================================================
   BLOODLINE BRAWL — AUDIO V3
   Calmer title/select themes + richer combat/map identity.
   Original WebAudio synthesis + browser speech for Donn callout.
===================================================== */

(() => {
  if (window.__bbAudioV3Loaded) return;
  window.__bbAudioV3Loaded = true;

  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;

  const A = {
    c:null, master:null, music:null, sfx:null, ambience:null,
    on:false, track:null, timer:null, step:0, next:0,
    ambNodes:[], ambTimers:[], last:{}, lastScreen:null,
    v:{
      master:+(localStorage.bbMaster ?? .82),
      music:+(localStorage.bbMusic ?? .30),
      sfx:+(localStorage.bbSfx ?? .82)
    }
  };

  const hz = m => 440 * 2 ** ((m - 69) / 12);

  function init(){
    if (A.c) return;
    const c=A.c=new AC();
    A.master=c.createGain(); A.music=c.createGain(); A.sfx=c.createGain(); A.ambience=c.createGain();
    A.music.connect(A.master); A.sfx.connect(A.master); A.ambience.connect(A.master); A.master.connect(c.destination);
    volumes();
  }

  function volumes(){
    if(!A.c) return;
    const t=A.c.currentTime;
    A.master.gain.setTargetAtTime(A.v.master,t,.03);
    A.music.gain.setTargetAtTime(A.v.music,t,.03);
    A.sfx.gain.setTargetAtTime(A.v.sfx,t,.03);
    A.ambience.gain.setTargetAtTime(Math.min(.24,A.v.music*.62),t,.04);
  }

  function unlock(){
    init(); A.on=true;
    if(A.c.state==='suspended') A.c.resume().catch(()=>{});
    sync();
  }

  function allowed(k,g=45){
    const n=performance.now();
    if(A.last[k] && n-A.last[k]<g) return false;
    A.last[k]=n; return true;
  }

  function tone(f,d=.1,v=.05,type='triangle',to=0,dest=null,when=0){
    if(!A.on) return;
    const c=A.c,t=Math.max(c.currentTime,when||c.currentTime),e=t+d;
    const o=c.createOscillator(),g=c.createGain();
    o.type=type; o.frequency.setValueAtTime(Math.max(20,f),t);
    if(to) o.frequency.exponentialRampToValueAtTime(Math.max(20,to),e);
    g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(v,t+.008); g.gain.exponentialRampToValueAtTime(.0001,e);
    o.connect(g); g.connect(dest||A.sfx); o.start(t); o.stop(e+.03);
  }

  function noise(d=.1,v=.06,lo=80,hi=4500,dest=null,when=0){
    if(!A.on) return;
    const c=A.c,t=Math.max(c.currentTime,when||c.currentTime);
    const b=c.createBuffer(1,Math.max(1,Math.floor(c.sampleRate*d)),c.sampleRate),x=b.getChannelData(0);
    for(let i=0;i<x.length;i++) x[i]=Math.random()*2-1;
    const s=c.createBufferSource(),hp=c.createBiquadFilter(),lp=c.createBiquadFilter(),g=c.createGain();
    s.buffer=b; hp.type='highpass'; hp.frequency.value=lo; lp.type='lowpass'; lp.frequency.value=hi;
    g.gain.setValueAtTime(v,t); g.gain.exponentialRampToValueAtTime(.0001,t+d);
    s.connect(hp); hp.connect(lp); lp.connect(g); g.connect(dest||A.sfx); s.start(t);
  }

  function thump(f=75,v=.12,d=.14,when=0){
    const t=when||A.c.currentTime;
    tone(f,d,v,'sine',Math.max(34,f*.42),A.sfx,t);
    noise(d*.6,v*.38,40,850,A.sfx,t);
  }

  function clickWood(t=A.c.currentTime){
    noise(.035,.04,600,2800,A.sfx,t); tone(370,.045,.025,'triangle',220,A.sfx,t);
  }

  const S={
    hover(){ tone(430,.035,.020,'sine',520); },
    select(){ const t=A.c.currentTime; tone(260,.07,.045,'triangle',330,null,t); tone(520,.08,.028,'sine',620,null,t+.035); },
    back(){ tone(390,.10,.045,'triangle',220); },
    random(){ tone(440+Math.random()*320,.035,.027,'triangle'); },

    jump(){ const t=A.c.currentTime; noise(.05,.023,380,2200,null,t); tone(135,.14,.048,'triangle',285,null,t); },
    land(){ thump(66,.058,.08); },
    block(){ const t=A.c.currentTime; noise(.055,.09,1050,6800,null,t); tone(1050,.075,.055,'triangle',510,null,t); thump(105,.05,.07,t); },
    hit(){ const t=A.c.currentTime; noise(.085,.12,70,2100,null,t); tone(100,.12,.095,'sine',48,null,t); },
    heavy(){ const t=A.c.currentTime; noise(.13,.15,45,2700,null,t); thump(76,.145,.18,t); tone(185,.09,.04,'triangle',82,null,t); },
    sharp(){ const t=A.c.currentTime; noise(.07,.095,700,6500,null,t); tone(680,.07,.048,'triangle',300,null,t); thump(105,.055,.08,t); },

    swing(){ noise(.075,.052,900,6500); tone(205,.08,.025,'triangle',115); },
    golf(){ const t=A.c.currentTime; noise(.11,.075,950,8500,null,t); tone(1120,.065,.048,'triangle',680,null,t+.012); },
    metal(){ const t=A.c.currentTime; noise(.085,.058,800,7000,null,t); tone(830,.10,.045,'triangle',390,null,t); },
    cone(){ const t=A.c.currentTime; noise(.07,.038,650,4200,null,t); tone(360,.075,.032,'triangle',230,null,t); },
    needles(){ const t=A.c.currentTime; tone(1350,.05,.030,'triangle',900,null,t); tone(1620,.045,.025,'triangle',1080,null,t+.02); },
    bite(){ const t=A.c.currentTime; noise(.06,.105,230,3500,null,t); tone(125,.09,.082,'square',58,null,t); },

    special(){ const t=A.c.currentTime; tone(205,.12,.052,'sawtooth',410,null,t); tone(610,.08,.020,'triangle',470,null,t+.045); },
    ultimate(){ const t=A.c.currentTime; noise(.30,.055,50,2100,null,t); tone(62,.42,.105,'sawtooth',128,null,t); tone(185,.30,.035,'triangle',350,null,t+.09); },
    ko(){ const t=A.c.currentTime; [60,55,48,41].forEach((m,i)=>tone(hz(m),.22,.082,'sawtooth',hz(m-4),null,t+i*.12)); thump(52,.15,.20,t+.12); },
    ready(){ tone(hz(48),.18,.055,'triangle',hz(52)); },
    fight(){ const t=A.c.currentTime; [60,64,67].forEach((m,i)=>tone(hz(m),.16,.058,'triangle',0,null,t+i*.055)); thump(70,.07,.09,t+.08); },

    ladder(){ const t=A.c.currentTime; noise(.19,.095,250,4000,null,t); tone(118,.24,.08,'square',66,null,t); tone(480,.12,.042,'triangle',260,null,t+.08); },
    chair(){ const t=A.c.currentTime; noise(.14,.095,80,2200,null,t); tone(88,.18,.095,'triangle',44,null,t); clickWood(t+.05); },
    donnImpact(){ const t=A.c.currentTime; noise(.12,.13,70,2600,null,t); thump(72,.14,.18,t); },
    deer(){ const t=A.c.currentTime; tone(132,.32,.075,'sawtooth',63,null,t); tone(170,.23,.035,'square',78,null,t+.04); noise(.15,.03,80,900,null,t); },
    paint(){ const t=A.c.currentTime; noise(.16,.052,100,900,null,t); tone(190,.15,.038,'sine',120,null,t); },
    pills(){ const t=A.c.currentTime; for(let i=0;i<6;i++) tone(760+Math.random()*900,.022,.024,'triangle',0,null,t+i*.023); },
    yarn(){ const t=A.c.currentTime; for(let i=0;i<4;i++) tone(320+i*45,.065,.024,'triangle',0,null,t+i*.032); },
    plates(){ const t=A.c.currentTime; [960,1270,1580].forEach((f,i)=>tone(f,.13,.036,'triangle',f*.64,null,t+i*.03)); },
    glitch(){ const t=A.c.currentTime; for(let i=0;i<5;i++) tone(i%2?690:230,.035,.025,'square',0,null,t+i*.035); },
    breath(){ const t=A.c.currentTime; noise(.26,.065,220,2400,null,t); tone(86,.26,.035,'sine',44,null,t); },
    rugby(){ const t=A.c.currentTime; noise(.075,.043,620,5400,null,t); tone(245,.105,.035,'triangle',140,null,t); },
    pimple(){ const t=A.c.currentTime; tone(650,.09,.036,'sine',1020,null,t); noise(.045,.029,1200,6800,null,t+.035); },
    ufo(){ const t=A.c.currentTime; tone(165,.48,.050,'sine',470,null,t); tone(330,.48,.024,'sine',920,null,t); },
    laundry(){ const t=A.c.currentTime; noise(.17,.048,180,1700,null,t); tone(155,.18,.038,'triangle',88,null,t+.05); }
  };

  function play(k,g=45){ if(A.on&&S[k]&&allowed(k,g)) S[k](); }

  function character(side){ try{return side===1?player1Character:player2Character}catch(_){return null} }
  function meleeFor(c){
    if(c==='brendan') return 'golf';
    if(['grandaddy','grandmommy','kelly'].includes(c)) return 'metal';
    if(c==='sean') return 'cone'; if(c==='leah') return 'needles'; if(c==='martin') return 'bite';
    return 'swing';
  }
  function specialFor(c){return ({brendan:'golf',grandaddy:'ladder',connor:'paint',erin:'pimple',shannan:'glitch',liam:'rugby',grandmommy:'chair',sean:'plates',martin:'breath',kelly:'pills',leah:'yarn'})[c]||'special'}
  function ultimateFor(c){return ({grandmommy:'donnImpact',sean:'deer',martin:'bite',connor:'paint',erin:'laundry',shannan:'ufo',kelly:'breath',leah:'yarn'})[c]||'ultimate'}
  function act(c,k){
    if(k==='melee') return play(meleeFor(c),65);
    if(k==='special'){play('special',75); return setTimeout(()=>play(specialFor(c),100),45)}
    play('ultimate',150); setTimeout(()=>play(ultimateFor(c),140),110);
  }

  /* Browser speech gives Grandmommy an actual human-like callout without shipping a copyrighted sample. */
  function donnVoice(){
    if(!('speechSynthesis' in window) || !allowed('donnVoice',2200)) return false;
    try{
      const u=new SpeechSynthesisUtterance('Donn! Get over here!');
      const voices=speechSynthesis.getVoices();
      const preferred=['Samantha','Victoria','Karen','Moira','Tessa','Fiona','Serena','Ava'];
      u.voice=preferred.map(n=>voices.find(v=>v.name.includes(n))).find(Boolean) || voices.find(v=>/female|woman/i.test(v.name)) || voices[0] || null;
      u.rate=.92; u.pitch=1.28; u.volume=Math.min(1,A.v.master*A.v.sfx*1.15);
      speechSynthesis.cancel(); speechSynthesis.speak(u); return true;
    }catch(_){return false}
  }

  function fallbackDonnYell(){
    const t=A.c.currentTime;
    // Raspy rising/falling formant-like shout if browser speech is unavailable.
    [235,470,705].forEach((f,i)=>tone(f,.62,.040/(i+1),'sawtooth',f*.78,null,t+i*.008));
    noise(.55,.032,180,1800,null,t);
    setTimeout(()=>{[270,540,810].forEach((f,i)=>tone(f,.42,.038/(i+1),'sawtooth',f*.68,null,A.c.currentTime+i*.008));},420);
  }

  function grandmommyCall(){ if(!donnVoice()) fallbackDonnYell(); }

  /* ---------------- MUSIC: relaxed menus, energy saved for fights ---------------- */
  const THEMES={
    title:{bpm:90,bass:[40,null,null,null,43,null,null,null,45,null,null,null,38,null,null,null],lead:[59,null,null,62,null,null,64,null,62,null,null,59,null,null,57,null],root:[52,55,57,50],wave:'sine',leadV:.022,bassV:.032},
    select:{bpm:108,bass:[40,null,47,null,43,null,47,null,45,null,52,null,43,null,47,null],lead:[64,null,67,null,null,69,null,67,62,null,64,null,67,null,64,null],root:[52,55,57,55],wave:'triangle',leadV:.028,bassV:.037},
    mapselect:{bpm:102,bass:[38,null,45,null,41,null,45,null,43,null,50,null,41,null,45,null],lead:[62,null,null,65,null,67,null,65,60,null,null,62,null,65,null,62],root:[50,53,55,53],wave:'sine',leadV:.024,bassV:.034},
    virginia:{bpm:116,bass:[40,null,47,null,45,null,47,null,40,null,47,null,43,null,45,null],lead:[64,null,67,69,null,67,64,null,62,null,64,67,null,64,62,null],root:[52,57,55,57],wave:'triangle',leadV:.034,bassV:.046},
    westhampton:{bpm:128,bass:[40,47,null,52,40,47,null,55,43,50,null,55,43,50,null,47],lead:[64,null,69,71,72,null,69,67,64,null,71,74,72,null,69,67],root:[52,55,57,55],wave:'triangle',leadV:.035,bassV:.046},
    newcanaan:{bpm:112,bass:[45,null,52,null,48,null,52,null,45,null,50,null,48,null,47,null],lead:[69,null,72,null,76,null,74,null,69,null,71,null,74,null,71,null],root:[57,60,62,59],wave:'sine',leadV:.029,bassV:.039},
    madrid:{bpm:126,bass:[45,null,52,45,48,null,52,48,45,null,50,52,48,null,45,40],lead:[69,72,null,72,69,68,null,72,76,null,72,69,68,null,67,64],root:[57,60,57,55],wave:'triangle',leadV:.034,bassV:.044}
  };

  function musicStep(th,i,t){
    const half=(60/th.bpm)/2,b=th.bass[i],l=th.lead[i];
    if(b!=null) tone(hz(b),half*.8,th.bassV,'triangle',0,A.music,t);
    if(l!=null) tone(hz(l),half*.78,th.leadV,th.wave,0,A.music,t);
    if(i%4===0){
      const r=th.root[(i/4)%4];
      [r,r+4,r+7].forEach((m,j)=>tone(hz(m),(60/th.bpm)*1.7,.008,'sine',0,A.music,t+j*.006));
    }
    // Map-specific rhythmic identity without returning to frantic chiptune beeps.
    if(A.track==='westhampton' && i%4===2) noise(.035,.010,1200,5000,A.music,t);
    if(A.track==='madrid' && (i%4===1||i%4===3)) clickWood(t);
    if(A.track==='virginia' && i%8===4) tone(hz(76),.09,.010,'sine',hz(74),A.music,t);
    if(A.track==='newcanaan' && i%8===0) tone(hz(81),.20,.010,'sine',hz(76),A.music,t);
  }

  function scheduler(){
    if(!A.on||!A.track) return;
    const th=THEMES[A.track],half=(60/th.bpm)/2;
    while(A.next<A.c.currentTime+.30){musicStep(th,A.step,A.next);A.next+=half;A.step=(A.step+1)%16}
  }
  function music(name){
    if(!A.on||!THEMES[name]||A.track===name) return;
    if(A.timer) clearInterval(A.timer);
    A.track=name; A.step=0; A.next=A.c.currentTime+.05; scheduler(); A.timer=setInterval(scheduler,95);
  }
  function stopMusic(){if(A.timer)clearInterval(A.timer);A.timer=null;A.track=null}

  function clearAmb(){
    A.ambTimers.forEach(clearTimeout); A.ambTimers=[];
    A.ambNodes.forEach(n=>{try{n.stop?.()}catch(_){} try{n.disconnect?.()}catch(_){}}); A.ambNodes=[];
  }
  function loopNoise(lo,hi,v){
    const c=A.c,b=c.createBuffer(1,c.sampleRate*2,c.sampleRate),x=b.getChannelData(0);
    for(let i=0;i<x.length;i++)x[i]=Math.random()*2-1;
    const s=c.createBufferSource(),hp=c.createBiquadFilter(),lp=c.createBiquadFilter(),g=c.createGain();
    s.buffer=b;s.loop=true;hp.type='highpass';hp.frequency.value=lo;lp.type='lowpass';lp.frequency.value=hi;g.gain.value=v;
    s.connect(hp);hp.connect(lp);lp.connect(g);g.connect(A.ambience);s.start();A.ambNodes.push(s,hp,lp,g);
  }
  function ambRepeat(fn,min,max){
    const tick=()=>{if(!A.on)return;fn();const id=setTimeout(tick,min+Math.random()*(max-min));A.ambTimers.push(id)};
    const id=setTimeout(tick,min+Math.random()*(max-min));A.ambTimers.push(id);
  }
  function currentMap(){try{return selectedMap||'virginia'}catch(_){return document.querySelector('.map-card.selected')?.dataset.map||'virginia'}}
  function ambience(){
    clearAmb(); const m=currentMap();
    if(m==='westhampton'){
      loopNoise(70,1000,.075); loopNoise(900,5200,.010);
      ambRepeat(()=>{tone(1200,.20,.010,'sine',1550,A.ambience);tone(1450,.16,.008,'sine',1100,A.ambience,A.c.currentTime+.08)},5000,10000);
    }else if(m==='virginia'){
      loopNoise(120,1300,.020);
      ambRepeat(()=>{const t=A.c.currentTime;tone(1750,.11,.008,'sine',2200,A.ambience,t);tone(2100,.10,.006,'sine',1650,A.ambience,t+.09)},4500,9000);
      ambRepeat(()=>{const t=A.c.currentTime;tone(165,.30,.012,'sawtooth',120,A.ambience,t);tone(215,.24,.008,'triangle',150,A.ambience,t+.07)},12000,22000);
    }else if(m==='newcanaan'){
      loopNoise(150,950,.018); loopNoise(1000,3200,.006);
      ambRepeat(()=>{const t=A.c.currentTime;[76,79,83].forEach((mm,i)=>tone(hz(mm),.45,.008,'sine',0,A.ambience,t+i*.18))},10000,18000);
    }else{
      loopNoise(100,1450,.022); loopNoise(900,3500,.008);
      ambRepeat(()=>{const t=A.c.currentTime;clickWood(t);clickWood(t+.11)},3500,7500);
      ambRepeat(()=>{const t=A.c.currentTime;[69,72,76,72].forEach((mm,i)=>tone(hz(mm),.13,.008,'triangle',0,A.ambience,t+i*.10))},6000,11000);
    }
  }

  function sync(){
    if(!A.on) return;
    const id=document.querySelector('.screen.active')?.id;
    if(id===A.lastScreen && id!=='fightScreen') return;
    A.lastScreen=id;
    if(id==='titleScreen'){clearAmb();music('title')}
    else if(id==='selectScreen'||id==='challengeScreen'){clearAmb();music('select')}
    else if(id==='mapScreen'){clearAmb();music('mapselect')}
    else if(id==='fightScreen'){const m=currentMap();clearAmb();music(m);ambience()}
  }

  const css=document.createElement('style');
  css.textContent=`.bb-sound{position:fixed;top:10px;right:12px;z-index:9999;font:900 10px Arial}.bb-sound button{padding:7px 10px;color:#fff;background:#09131ddd;border:2px solid #637789;border-radius:6px;cursor:pointer}.bb-sound-panel{position:absolute;right:0;top:37px;width:210px;padding:9px 11px;background:#09131df5;border:2px solid #637789;border-radius:7px}.bb-sound-panel.hide{display:none}.bb-sound-row{display:grid;grid-template-columns:52px 1fr 28px;gap:6px;align-items:center;margin:6px 0;color:#fff}.bb-sound-row input{width:100%;accent-color:#ffd52a}.bb-sound-val{color:#9edcff;text-align:right}`;
  document.head.appendChild(css);
  document.querySelectorAll('.bb-sound').forEach(n=>n.remove());
  const box=document.createElement('div');box.className='bb-sound';
  box.innerHTML=`<button>SOUND</button><div class="bb-sound-panel hide"><div class="bb-sound-row">MASTER<input data-v="master" type="range" min="0" max="100"><span class="bb-sound-val"></span></div><div class="bb-sound-row">MUSIC<input data-v="music" type="range" min="0" max="100"><span class="bb-sound-val"></span></div><div class="bb-sound-row">SFX<input data-v="sfx" type="range" min="0" max="100"><span class="bb-sound-val"></span></div></div>`;
  document.body.appendChild(box);
  const panel=box.querySelector('.bb-sound-panel');
  function ui(){box.querySelectorAll('input').forEach(i=>{i.value=Math.round(A.v[i.dataset.v]*100);i.nextElementSibling.textContent=i.value})}
  ui();
  box.querySelector('button').onclick=e=>{e.stopPropagation();unlock();panel.classList.toggle('hide');play('select',70)};
  box.oninput=e=>{const i=e.target.closest('input');if(!i)return;unlock();A.v[i.dataset.v]=+i.value/100;localStorage['bb'+i.dataset.v[0].toUpperCase()+i.dataset.v.slice(1)]=A.v[i.dataset.v];volumes();ui()};

  let hov=null;
  document.addEventListener('pointerover',e=>{const b=e.target.closest('button');if(!b||b===hov)return;hov=b;if(A.on)play('hover',45)},true);
  document.addEventListener('pointerout',e=>{if(e.target.closest('button')===hov)hov=null},true);
  document.addEventListener('pointerdown',e=>{if(!e.target.closest('.bb-sound'))unlock()},{capture:true,passive:true});
  document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.closest('.bb-sound'))return;play(['backToTitleButton','backToFighterButton','challengeBackButton'].includes(b.id)?'back':'select',70);if(b.classList.contains('bb-random-card')){let n=0,q=setInterval(()=>{play('random',20);if(++n>5)clearInterval(q)},65)}setTimeout(sync,45)},true);

  document.addEventListener('keydown',e=>{
    if(e.repeat)return;unlock();
    if(!document.getElementById('fightScreen')?.classList.contains('active'))return;
    const k=e.key.toLowerCase();
    if(k==='w'||e.key==='ArrowUp')play('jump',90);
    if(k==='q'||k==='i')play('block',90);
    if(k==='r')act(character(1),'melee'); if(k==='j')act(character(2),'melee');
    if(k==='e')act(character(1),'special'); if(k==='k')act(character(2),'special');
    if(k==='f'){if(character(1)==='grandmommy')grandmommyCall();act(character(1),'ultimate')}
    if(k==='l'){if(character(2)==='grandmommy')grandmommyCall();act(character(2),'ultimate')}
  },true);

  function health(id){
    const b=document.getElementById(id);if(!b)return;let old=100;
    new MutationObserver(()=>{const n=parseFloat(b.style.width||'100');if(n<old-.05){play(old-n>18?'heavy':'hit',50);if(n<=.05)setTimeout(()=>play('ko',900),70)}old=n}).observe(b,{attributes:true,attributeFilter:['style']});
  }
  health('player1Health');health('player2Health');

  const intro=document.getElementById('battleIntroWord');
  if(intro){let old='';new MutationObserver(()=>{const t=intro.textContent.toUpperCase();if(t===old)return;old=t;if(t.includes('READY'))play('ready',300);if(t.includes('BEGIN')||t.includes('FIGHT'))play('fight',300)}).observe(intro,{childList:true,subtree:true,characterData:true})}

  const effects=document.getElementById('effects');
  if(effects)new MutationObserver(rs=>{for(const r of rs)for(const n of r.addedNodes){if(!(n instanceof Element))continue;const s=`${n.className} ${n.textContent} ${n.innerHTML}`;if(/DONN?, GET OVER HERE/i.test(s))grandmommyCall();else if(s.includes('zombie-deer'))play('deer',220);else if(s.includes('clyde'))play('bite',190);else if(s.includes('yoga-chair'))play('chair',190);else if(s.includes('ladder'))play('ladder',190);else if(s.includes('bb-pill'))play('pills',160);else if(s.includes('bb-yarn'))play('yarn',160);else if(s.includes('paint'))play('paint',160)}}).observe(effects,{childList:true,subtree:true});

  // Keep soundtrack synced with screen changes without mutating the page.
  setInterval(()=>{if(A.on)sync()},350);
  window.BloodlineAudio={play,sync,music,stop:stopMusic,grandmommyCall};
})();
