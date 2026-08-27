/* =====================================================
   BLOODLINE BRAWL — AUDIO V2
   Richer combat SFX + distinct map battle soundscapes.
   Original WebAudio synthesis: no external audio assets required.
===================================================== */

(() => {
  if (window.__bbAudioV2Loaded) return;
  window.__bbAudioV2Loaded = true;

  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;

  const A = {
    c: null,
    master: null,
    music: null,
    sfx: null,
    ambience: null,
    on: false,
    track: null,
    timer: null,
    step: 0,
    next: 0,
    ambNodes: [],
    ambTimers: [],
    last: {},
    v: {
      master: +(localStorage.bbMaster ?? .82),
      music: +(localStorage.bbMusic ?? .30),
      sfx: +(localStorage.bbSfx ?? .80)
    }
  };

  const hz = m => 440 * 2 ** ((m - 69) / 12);

  function init() {
    if (A.c) return;
    const c = A.c = new AC();
    A.master = c.createGain();
    A.music = c.createGain();
    A.sfx = c.createGain();
    A.ambience = c.createGain();
    A.music.connect(A.master);
    A.sfx.connect(A.master);
    A.ambience.connect(A.master);
    A.master.connect(c.destination);
    setVolumes();
  }

  function setVolumes() {
    if (!A.c) return;
    const t = A.c.currentTime;
    A.master.gain.setTargetAtTime(A.v.master, t, .025);
    A.music.gain.setTargetAtTime(A.v.music, t, .025);
    A.sfx.gain.setTargetAtTime(A.v.sfx, t, .025);
    A.ambience.gain.setTargetAtTime(Math.min(.25, A.v.music * .66), t, .03);
  }

  function unlock() {
    init();
    A.on = true;
    if (A.c.state === "suspended") A.c.resume().catch(() => {});
    sync();
  }

  function allowed(key, gap = 45) {
    const now = performance.now();
    if (A.last[key] && now - A.last[key] < gap) return false;
    A.last[key] = now;
    return true;
  }

  function tone(freq, duration = .1, volume = .06, type = "square", endFreq = 0, dest = null, when = 0) {
    if (!A.on) return;
    const c = A.c;
    const t = Math.max(c.currentTime, when || c.currentTime);
    const end = t + duration;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(Math.max(20, freq), t);
    if (endFreq) o.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), end);
    g.gain.setValueAtTime(.0001, t);
    g.gain.exponentialRampToValueAtTime(volume, t + .005);
    g.gain.exponentialRampToValueAtTime(.0001, end);
    o.connect(g);
    g.connect(dest || A.sfx);
    o.start(t);
    o.stop(end + .025);
  }

  function noise(duration = .1, volume = .07, low = 100, high = 5000, dest = null, when = 0) {
    if (!A.on) return;
    const c = A.c;
    const t = Math.max(c.currentTime, when || c.currentTime);
    const buffer = c.createBuffer(1, Math.max(1, Math.floor(c.sampleRate * duration)), c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource();
    const hp = c.createBiquadFilter();
    const lp = c.createBiquadFilter();
    const g = c.createGain();
    src.buffer = buffer;
    hp.type = "highpass";
    hp.frequency.value = low;
    lp.type = "lowpass";
    lp.frequency.value = high;
    g.gain.setValueAtTime(volume, t);
    g.gain.exponentialRampToValueAtTime(.0001, t + duration);
    src.connect(hp); hp.connect(lp); lp.connect(g); g.connect(dest || A.sfx);
    src.start(t);
  }

  function thump(freq = 80, volume = .12, duration = .12) {
    const t = A.c.currentTime;
    tone(freq, duration, volume, "sine", Math.max(35, freq * .45), A.sfx, t);
    noise(duration * .55, volume * .45, 45, 900, A.sfx, t);
  }

  const S = {
    hover() { tone(620, .028, .026, "square", 780); },
    select() { const t=A.c.currentTime; tone(330,.055,.06,"square",470,null,t); tone(690,.07,.04,"triangle",900,null,t+.025); },
    back() { tone(430,.09,.055,"triangle",210); },
    random() { tone(650 + Math.random()*500,.03,.035,"square"); },

    jump() { const t=A.c.currentTime; noise(.055,.025,450,2500,null,t); tone(145,.13,.055,"triangle",330,null,t); },
    land() { thump(72,.065,.075); },
    block() { const t=A.c.currentTime; noise(.055,.09,1200,7200,null,t); tone(1320,.07,.065,"triangle",690,null,t); tone(220,.08,.035,"sine",120,null,t); },
    fleshHit() { const t=A.c.currentTime; noise(.09,.14,70,2200,null,t); tone(105,.12,.115,"sine",52,null,t); },
    heavyHit() { const t=A.c.currentTime; noise(.13,.16,55,2800,null,t); tone(84,.17,.15,"sine",39,null,t); tone(205,.08,.055,"triangle",90,null,t); },
    sharpHit() { const t=A.c.currentTime; noise(.075,.11,650,6500,null,t); tone(760,.075,.055,"triangle",330,null,t); tone(118,.09,.07,"sine",62,null,t); },

    swingSoft() { noise(.075,.06,1000,7000); tone(230,.075,.028,"triangle",130); },
    swingHeavy() { noise(.12,.09,500,5200); tone(155,.11,.055,"triangle",72); },
    golf() { const t=A.c.currentTime; noise(.12,.085,1000,9000,null,t); tone(1250,.06,.05,"triangle",720,null,t+.015); },
    metalSwing() { const t=A.c.currentTime; noise(.085,.06,850,7200,null,t); tone(920,.09,.045,"triangle",430,null,t); },
    iceCream() { const t=A.c.currentTime; noise(.07,.045,700,4500,null,t); tone(410,.075,.04,"triangle",250,null,t); },
    needles() { const t=A.c.currentTime; tone(1550,.045,.035,"triangle",980,null,t); tone(1750,.04,.028,"triangle",1200,null,t+.018); },

    special() { const t=A.c.currentTime; tone(220,.12,.065,"sawtooth",480,null,t); tone(880,.065,.025,"triangle",620,null,t+.055); },
    ultimate() { const t=A.c.currentTime; noise(.32,.06,55,2200,null,t); tone(68,.4,.12,"sawtooth",145,null,t); tone(220,.3,.045,"triangle",440,null,t+.08); },
    ko() { const t=A.c.currentTime; [62,57,50,43].forEach((m,i)=>tone(hz(m),.21,.095,"sawtooth",hz(m-4),null,t+i*.11)); thump(55,.16,.19); },
    ready() { tone(hz(52),.11,.065,"square",hz(55)); },
    fight() { const t=A.c.currentTime; [64,69,76].forEach((m,i)=>tone(hz(m),.13,.07,"square",0,null,t+i*.045)); },

    ladder() { const t=A.c.currentTime; noise(.18,.10,300,4200,null,t); tone(125,.22,.09,"square",70,null,t); tone(530,.11,.045,"triangle",290,null,t+.08); },
    chair() { const t=A.c.currentTime; noise(.15,.11,90,2500,null,t); tone(92,.18,.11,"triangle",48,null,t); },
    donn() { const t=A.c.currentTime; tone(95,.13,.08,"sawtooth",62,null,t); noise(.11,.07,90,2500,null,t+.08); tone(72,.18,.12,"sine",40,null,t+.16); },
    deer() { const t=A.c.currentTime; tone(138,.3,.09,"sawtooth",67,null,t); tone(176,.23,.04,"square",82,null,t+.035); noise(.16,.035,90,1000,null,t); },
    bite() { const t=A.c.currentTime; noise(.065,.12,250,3700,null,t); tone(132,.09,.09,"square",61,null,t); },
    paint() { const t=A.c.currentTime; noise(.14,.055,120,1000,null,t); tone(205,.14,.045,"sine",130,null,t); },
    pills() { const t=A.c.currentTime; for(let i=0;i<6;i++) tone(850+Math.random()*1100,.02,.028,"square",0,null,t+i*.022); },
    yarn() { const t=A.c.currentTime; for(let i=0;i<5;i++) tone(350+i*48,.055,.028,"triangle",0,null,t+i*.027); },
    plates() { const t=A.c.currentTime; [1080,1420,1760].forEach((f,i)=>tone(f,.12,.04,"triangle",f*.66,null,t+i*.025)); },
    glitch() { const t=A.c.currentTime; for(let i=0;i<6;i++) tone(i%2?820:245,.028,.03,"square",0,null,t+i*.027); },
    breath() { const t=A.c.currentTime; noise(.24,.075,250,2600,null,t); tone(92,.26,.04,"sine",48,null,t); },
    rugby() { const t=A.c.currentTime; noise(.08,.05,700,6000,null,t); tone(260,.1,.04,"triangle",150,null,t); },
    pimple() { const t=A.c.currentTime; tone(720,.08,.045,"sine",1180,null,t); noise(.045,.035,1300,7500,null,t+.03); },
    ufo() { const t=A.c.currentTime; tone(180,.45,.055,"sine",520,null,t); tone(360,.45,.028,"sine",1050,null,t); },
    laundry() { const t=A.c.currentTime; noise(.18,.055,200,1800,null,t); tone(170,.18,.045,"triangle",95,null,t+.05); }
  };

  function play(name, gap = 45) {
    if (!A.on || !S[name] || !allowed(name, gap)) return;
    S[name]();
  }

  function currentCharacter(side) {
    try { return side === 1 ? player1Character : player2Character; }
    catch (_) { return null; }
  }

  function meleeFor(c) {
    if (c === "brendan") return "golf";
    if (["grandaddy","grandmommy","kelly"].includes(c)) return "metalSwing";
    if (c === "sean") return "iceCream";
    if (c === "leah") return "needles";
    if (c === "martin") return "bite";
    return "swingSoft";
  }

  function specialFor(c) {
    return ({
      grandaddy:"ladder", connor:"paint", erin:"pimple", shannan:"glitch",
      liam:"rugby", grandmommy:"chair", sean:"plates", martin:"breath",
      kelly:"pills", leah:"yarn", brendan:"golf"
    })[c] || "special";
  }

  function ultimateFor(c) {
    return ({
      grandmommy:"donn", sean:"deer", martin:"bite", connor:"paint",
      erin:"laundry", shannan:"ufo", kelly:"breath", leah:"yarn"
    })[c] || "ultimate";
  }

  function act(c, kind) {
    if (kind === "melee") return play(meleeFor(c), 65);
    if (kind === "special") { play("special", 75); return setTimeout(()=>play(specialFor(c),90),35); }
    play("ultimate", 130);
    setTimeout(()=>play(ultimateFor(c),120),90);
  }

  /* ---------------- MUSIC ---------------- */
  const THEMES = {
    title:{ bpm:110, bass:[40,40,47,40,43,43,47,43,45,45,52,47,43,47,40,35], lead:[64,null,67,null,71,null,67,64,62,null,64,67,71,69,67,null], root:[52,55,57,55], wave:"square" },
    select:{ bpm:134, bass:[45,45,52,45,48,48,52,48,50,50,57,52,48,52,45,40], lead:[69,72,76,72,69,72,77,76,72,74,76,79,77,76,72,69], root:[57,60,62,60], wave:"square" },
    virginia:{ bpm:112, bass:[40,null,47,null,45,null,47,null,40,null,47,null,43,null,45,null], lead:[64,null,67,69,null,67,64,null,62,null,64,67,null,64,62,null], root:[52,57,55,57], wave:"triangle" },
    westhampton:{ bpm:142, bass:[40,40,47,52,40,40,47,55,43,43,50,55,43,43,50,47], lead:[64,67,69,71,72,71,69,67,64,67,71,74,72,71,69,67], root:[52,55,57,55], wave:"square" },
    newcanaan:{ bpm:118, bass:[45,null,52,null,48,null,52,null,45,null,50,null,48,null,47,null], lead:[69,null,72,76,null,74,72,null,69,null,71,74,null,72,71,null], root:[57,60,62,59], wave:"sine" },
    madrid:{ bpm:132, bass:[45,45,52,45,48,48,52,48,45,45,50,52,48,47,45,40], lead:[69,72,73,72,69,68,69,72,76,73,72,69,68,69,67,64], root:[57,60,57,55], wave:"triangle" }
  };

  function musicStep(th, i, t) {
    const half = (60 / th.bpm) / 2;
    const b = th.bass[i], l = th.lead[i];
    if (b != null) tone(hz(b), half*.68, .048, "square", 0, A.music, t);
    if (l != null) tone(hz(l), half*.46, A.track === "title" ? .032 : .040, th.wave, 0, A.music, t);

    if (i % 4 === 0) {
      const r = th.root[(i/4)%4];
      [r,r+4,r+7].forEach((m,j)=>tone(hz(m),(60/th.bpm)*1.18,.011,"sine",0,A.music,t+j*.005));
    }

    if (A.track === "westhampton" && i % 2 === 1) noise(.025,.008,2500,9000,A.music,t);
    if (A.track === "madrid" && [2,6,10,14].includes(i)) {
      noise(.035,.018,1800,9000,A.music,t);
      tone(1500,.03,.014,"triangle",900,A.music,t+.012);
    }
    if (A.track === "newcanaan" && i % 8 === 4) tone(hz(81),.13,.012,"sine",hz(76),A.music,t);
    if (A.track === "virginia" && i % 8 === 6) tone(hz(76),.08,.012,"triangle",hz(72),A.music,t);
  }

  function musicLookahead() {
    if (!A.on || !A.track) return;
    const th = THEMES[A.track];
    if (!th) return;
    const half = (60/th.bpm)/2;
    while (A.next < A.c.currentTime + .28) {
      musicStep(th, A.step, A.next);
      A.next += half;
      A.step = (A.step + 1) % 16;
    }
  }

  function music(name) {
    if (!A.on || A.track === name) return;
    if (A.timer) clearInterval(A.timer);
    A.track = name;
    A.step = 0;
    A.next = A.c.currentTime + .04;
    musicLookahead();
    A.timer = setInterval(musicLookahead, 90);
  }

  function stopMusic() {
    if (A.timer) clearInterval(A.timer);
    A.timer = null;
    A.track = null;
  }

  /* ---------------- MAP AMBIENCE ---------------- */
  function clearAmbience() {
    A.ambTimers.forEach(clearInterval);
    A.ambTimers = [];
    A.ambNodes.forEach(n => { try { n.stop?.(); } catch(_) {} try { n.disconnect?.(); } catch(_) {} });
    A.ambNodes = [];
  }

  function loopNoise(low, high, volume) {
    const c=A.c, b=c.createBuffer(1,c.sampleRate*2,c.sampleRate), d=b.getChannelData(0);
    for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1;
    const s=c.createBufferSource(), hp=c.createBiquadFilter(), lp=c.createBiquadFilter(), g=c.createGain();
    s.buffer=b; s.loop=true; hp.type="highpass"; hp.frequency.value=low; lp.type="lowpass"; lp.frequency.value=high; g.gain.value=volume;
    s.connect(hp); hp.connect(lp); lp.connect(g); g.connect(A.ambience); s.start();
    A.ambNodes.push(s,hp,lp,g);
  }

  function ambTone(freq, dur, vol, type="sine", end=0) { tone(freq,dur,vol,type,end,A.ambience); }

  function occasional(fn, min, max) {
    const schedule = () => {
      const delay = min + Math.random()*(max-min);
      const id = setTimeout(() => { if (A.on) fn(); schedule(); }, delay);
      A.ambTimers.push(id);
    };
    schedule();
  }

  function mapName() {
    try { return selectedMap || "virginia"; }
    catch (_) { return document.querySelector(".map-card.selected")?.dataset.map || "virginia"; }
  }

  function startMapAmbience(map) {
    clearAmbience();

    if (map === "westhampton") {
      loopNoise(70, 950, .065);   // surf bed
      loopNoise(1300, 6500, .011); // airy shore
      occasional(() => { ambTone(1250,.12,.018,"sine",1550); ambTone(980,.16,.012,"sine",1250); }, 4500, 8500); // gull-like chirp
    }
    else if (map === "virginia") {
      loopNoise(180, 1700, .016); // soft wind
      occasional(() => { ambTone(1850,.06,.012,"sine",2200); ambTone(2100,.05,.009,"sine",1750); }, 3200, 7000); // birds
      occasional(() => { ambTone(170,.28,.018,"sawtooth",110); }, 9000, 15000); // distant horse
    }
    else if (map === "newcanaan") {
      loopNoise(120, 850, .014);  // distant street bed
      loopNoise(1200, 3600, .006);
      occasional(() => { ambTone(880,.18,.014,"sine",660); ambTone(660,.22,.010,"sine",440); }, 7000, 12000); // town clock/chime
      occasional(() => noise(.11,.006,500,2500,A.ambience), 5000, 9000); // distant passing car texture
    }
    else {
      loopNoise(120, 1300, .018); // plaza murmur texture
      loopNoise(900, 4300, .007);
      occasional(() => { noise(.04,.018,1600,9000,A.ambience); tone(1450,.035,.010,"triangle",900,A.ambience); }, 2500, 5200); // clap/castanet-like
      occasional(() => { ambTone(520,.10,.008,"triangle",650); ambTone(660,.12,.007,"triangle",520); }, 5000, 8500); // distant guitar-like pluck
    }
  }

  function sync() {
    if (!A.on) return;
    const id = document.querySelector(".screen.active")?.id;
    if (id === "titleScreen") {
      clearAmbience();
      music("title");
    }
    else if (["selectScreen","challengeScreen","mapScreen"].includes(id)) {
      clearAmbience();
      music("select");
    }
    else if (id === "fightScreen") {
      const map = mapName();
      music(map);
      startMapAmbience(map);
    }
  }

  /* ---------------- SOUND PANEL ---------------- */
  const css=document.createElement("style");
  css.textContent=`.bb-sound{position:fixed;top:10px;right:12px;z-index:9999;font:900 10px Arial}.bb-sound button{padding:7px 10px;color:#fff;background:#09131ddd;border:2px solid #637789;border-radius:6px;cursor:pointer}.bb-sound-panel{position:absolute;right:0;top:37px;width:210px;padding:9px 11px;background:#09131df5;border:2px solid #637789;border-radius:7px}.bb-sound-panel.hide{display:none}.bb-sound-row{display:grid;grid-template-columns:52px 1fr 28px;gap:6px;align-items:center;margin:6px 0;color:#fff}.bb-sound-row input{width:100%;accent-color:#ffd52a}.bb-sound-val{color:#9edcff;text-align:right}`;
  document.head.appendChild(css);

  document.querySelectorAll(".bb-sound").forEach(n=>n.remove());
  const box=document.createElement("div");
  box.className="bb-sound";
  box.innerHTML=`<button>SOUND</button><div class="bb-sound-panel hide"><div class="bb-sound-row">MASTER<input data-v="master" type="range" min="0" max="100"><span class="bb-sound-val"></span></div><div class="bb-sound-row">MUSIC<input data-v="music" type="range" min="0" max="100"><span class="bb-sound-val"></span></div><div class="bb-sound-row">SFX<input data-v="sfx" type="range" min="0" max="100"><span class="bb-sound-val"></span></div></div>`;
  document.body.appendChild(box);
  const panel=box.querySelector(".bb-sound-panel");
  function updatePanel(){box.querySelectorAll("input").forEach(i=>{const v=A.v[i.dataset.v];i.value=Math.round(v*100);i.nextElementSibling.textContent=i.value;});}
  updatePanel();
  box.querySelector("button").onclick=e=>{e.stopPropagation();unlock();panel.classList.toggle("hide");play("select",60);};
  box.oninput=e=>{const i=e.target.closest("input");if(!i)return;unlock();A.v[i.dataset.v]=+i.value/100;localStorage["bb"+i.dataset.v[0].toUpperCase()+i.dataset.v.slice(1)]=A.v[i.dataset.v];setVolumes();updatePanel();};

  /* ---------------- INPUT / UI HOOKS ---------------- */
  let hover=null;
  document.addEventListener("pointerover",e=>{const b=e.target.closest("button");if(!b||b===hover)return;hover=b;if(A.on)play("hover",30);},true);
  document.addEventListener("pointerout",e=>{if(e.target.closest("button")===hover)hover=null;},true);
  document.addEventListener("pointerdown",e=>{if(!e.target.closest(".bb-sound"))unlock();},{capture:true,passive:true});
  document.addEventListener("click",e=>{const b=e.target.closest("button");if(!b||b.closest(".bb-sound"))return;play(["backToTitleButton","backToFighterButton","challengeBackButton"].includes(b.id)?"back":"select",60);if(b.classList.contains("bb-random-card")){let n=0,q=setInterval(()=>{play("random",15);if(++n>6)clearInterval(q);},50);}setTimeout(sync,40);},true);

  document.addEventListener("keydown",e=>{
    if(e.repeat)return;
    unlock();
    if(!document.getElementById("fightScreen")?.classList.contains("active"))return;
    const k=e.key.toLowerCase();
    if(k==="w"||e.key==="ArrowUp")play("jump",70);
    if(k==="q"||k==="i")play("block",80);
    if(k==="r")act(currentCharacter(1),"melee");
    if(k==="j")act(currentCharacter(2),"melee");
    if(k==="e")act(currentCharacter(1),"special");
    if(k==="k")act(currentCharacter(2),"special");
    if(k==="f")act(currentCharacter(1),"ultimate");
    if(k==="l")act(currentCharacter(2),"ultimate");
  },true);

  /* ---------------- TARGETED GAME EVENTS ---------------- */
  function healthWatch(id) {
    const bar=document.getElementById(id);
    if(!bar)return;
    let old=100;
    new MutationObserver(()=>{
      const n=parseFloat(bar.style.width||"100");
      if(n<old-.05){
        const delta=old-n;
        play(delta>20?"heavyHit":delta>7?"fleshHit":"sharpHit",35);
        if(n<=.05)setTimeout(()=>play("ko",700),60);
      }
      old=n;
    }).observe(bar,{attributes:true,attributeFilter:["style"]});
  }
  healthWatch("player1Health"); healthWatch("player2Health");

  const intro=document.getElementById("battleIntroWord");
  if(intro){let old="";new MutationObserver(()=>{const t=intro.textContent.toUpperCase();if(t===old)return;old=t;if(t.includes("READY"))play("ready",250);if(t.includes("BEGIN")||t.includes("FIGHT"))play("fight",250);}).observe(intro,{childList:true,subtree:true,characterData:true});}

  const effects=document.getElementById("effects");
  if(effects)new MutationObserver(records=>{
    for(const r of records)for(const n of r.addedNodes){
      if(!(n instanceof Element))continue;
      const s=`${n.className} ${n.innerHTML}`;
      if(s.includes("zombie-deer"))play("deer",180);
      else if(s.includes("clyde"))play("bite",160);
      else if(s.includes("yoga-chair"))play("chair",160);
      else if(s.includes("bb-ladder-rig")||s.includes("ladder"))play("ladder",160);
      else if(s.includes("bb-pill"))play("pills",130);
      else if(s.includes("bb-yarn"))play("yarn",130);
      else if(s.includes("paint"))play("paint",130);
      else if(s.includes("flying-dish"))play("plates",120);
      else if(s.includes("ufo"))play("ufo",160);
      else if(s.includes("laundry"))play("laundry",160);
    }
  }).observe(effects,{childList:true,subtree:true});

  window.BloodlineAudio={play,sync,music,stop:stopMusic};
})();
