/* =====================================================
   BLOODLINE BRAWL — ERIN'S CHALLENGE V1
   Permanent special quest INSIDE the existing Challenges hub.
   No title-screen button. No separate game mode. No rotation.
===================================================== */

(() => {
  if (window.__bbErinNickChallengeV1Loaded) return;
  window.__bbErinNickChallengeV1Loaded = true;

  const STORAGE_KEY = "bb-erin-challenge-v1";
  const TARGETS = {
    erinWins: 2,
    aliceWins: 2,
    meleeHits: 20,
    uniqueWinningFighters: 5,
    damage: 1500
  };

  const CHALLENGES = [
    { id:"firstImpression", title:"FIRST IMPRESSION", text:"Win 2 offline matches as Erin.", metric:"erinWins", target:2 },
    { id:"fairyWingwoman", title:"FAIRY WINGWOMAN", text:"Win 2 offline matches as Alice.", metric:"aliceWins", target:2 },
    { id:"makeSomeNoise", title:"MAKE SOME NOISE", text:"Land 20 melee hits in offline matches using any fighter.", metric:"meleeHits", target:20 },
    { id:"meetTheFamily", title:"MEET THE FAMILY", text:"Win an offline match with 5 different fighters.", metric:"uniqueWinningFighters", target:5 },
    { id:"makeAnImpression", title:"MAKE AN IMPRESSION", text:"Deal 1,500 total damage in offline matches.", metric:"damage", target:1500 }
  ];

  const defaultState = () => ({
    erinWins: 0,
    aliceWins: 0,
    meleeHits: 0,
    damage: 0,
    uniqueWinningFighters: [],
    completed: {
      firstImpression: false,
      fairyWingwoman: false,
      makeSomeNoise: false,
      meetTheFamily: false,
      makeAnImpression: false
    },
    revealReady: false,
    nickUnlocked: false
  });

  function loadState() {
    let raw = {};
    try { raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {}; } catch (_) {}
    const base = defaultState();
    const state = {
      ...base,
      ...raw,
      erinWins: Math.max(0, Number(raw.erinWins) || 0),
      aliceWins: Math.max(0, Number(raw.aliceWins) || 0),
      meleeHits: Math.max(0, Number(raw.meleeHits) || 0),
      damage: Math.max(0, Number(raw.damage) || 0),
      uniqueWinningFighters: Array.isArray(raw.uniqueWinningFighters) ? [...new Set(raw.uniqueWinningFighters.filter(Boolean))] : [],
      completed: { ...base.completed, ...(raw.completed || {}) },
      revealReady: Boolean(raw.revealReady),
      nickUnlocked: Boolean(raw.nickUnlocked)
    };

    if (localStorage.getItem("nickUnlocked") === "true" || window.BBNickFighter?.isUnlocked?.()) {
      state.nickUnlocked = true;
      state.revealReady = true;
      state.erinWins = Math.max(state.erinWins, TARGETS.erinWins);
      state.aliceWins = Math.max(state.aliceWins, TARGETS.aliceWins);
      state.meleeHits = Math.max(state.meleeHits, TARGETS.meleeHits);
      state.damage = Math.max(state.damage, TARGETS.damage);
      while (state.uniqueWinningFighters.length < TARGETS.uniqueWinningFighters) {
        state.uniqueWinningFighters.push(`legacy-${state.uniqueWinningFighters.length}`);
      }
      Object.keys(state.completed).forEach(key => { state.completed[key] = true; });
    }

    return state;
  }

  let state = loadState();
  let activeMatch = null;
  let toastQueue = [];
  let toastBusy = false;
  let revealRunning = false;

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
  }

  function metricValue(challenge) {
    const value = state[challenge.metric];
    return Array.isArray(value) ? value.length : Math.max(0, Number(value) || 0);
  }

  function completeCount() {
    return CHALLENGES.reduce((total, challenge) => total + (state.completed[challenge.id] ? 1 : 0), 0);
  }

  function isOnline() {
    return document.body.classList.contains("bb-online-active");
  }

  function offlineFightActive() {
    return !isOnline() && typeof fightScreen !== "undefined" && fightScreen?.classList.contains("active");
  }

  function trackedAttacker(attacker) {
    if (!offlineFightActive() || !attacker) return false;
    if (typeof gameMode !== "undefined" && gameMode === "2P" && !challengeMode) return attacker === P1 || attacker === P2;
    return attacker === P1;
  }

  const style = document.createElement("style");
  style.id = "bb-erin-nick-challenge-style-v1";
  style.textContent = `
    .bb-erin-tab{position:relative;border-color:#345d83!important;background:linear-gradient(90deg,#15385f,#172431 54%,#57321c)!important;color:#eef6ff!important}
    .bb-erin-tab::after{content:"";position:absolute;left:0;right:0;bottom:-3px;height:3px;background:linear-gradient(90deg,#2d71b8,#f07a2c)}
    .bb-erin-tab.active{background:linear-gradient(90deg,#2369aa,#ee7c2f)!important;color:#fff!important;border-color:#111!important;box-shadow:inset 0 0 0 2px rgba(255,255,255,.13)}
    .bb-erin-panel{padding-bottom:8px}
    .bb-erin-quest{display:grid;grid-template-columns:minmax(300px,.82fr) minmax(0,1.55fr);gap:14px;align-items:stretch}
    .bb-erin-mystery,.bb-erin-objectives{border:4px solid #111;background:linear-gradient(145deg,#112435,#08131d);box-shadow:0 6px 0 rgba(0,0,0,.28)}
    .bb-erin-mystery{position:relative;overflow:hidden;min-height:590px;padding:18px;display:flex;flex-direction:column;align-items:center;text-align:center;border-top:7px solid #2e70af}
    .bb-erin-mystery::before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 20% 10%,rgba(40,112,184,.2),transparent 30%),radial-gradient(circle at 85% 17%,rgba(239,121,44,.16),transparent 30%)}
    .bb-erin-kicker{position:relative;color:#f28a3c;font:1000 10px/1 Arial,sans-serif;letter-spacing:3px}
    .bb-erin-title{position:relative;margin-top:7px;font:1000 clamp(28px,3.5vw,44px)/.95 Impact,"Arial Black",sans-serif;letter-spacing:1px;text-shadow:4px 4px #111}
    .bb-erin-subtitle{position:relative;margin-top:8px;color:#9fc5e7;font:1000 12px/1 Arial,sans-serif;letter-spacing:2.5px}
    .bb-erin-description{position:relative;margin-top:10px;max-width:330px;color:#aebdca;font:800 10px/1.45 Arial,sans-serif;letter-spacing:.5px}
    .bb-mystery-stage{position:relative;width:250px;height:260px;margin:16px auto 5px;display:flex;align-items:flex-end;justify-content:center}
    .bb-mystery-halo{position:absolute;left:50%;bottom:15px;width:205px;height:205px;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle,rgba(51,114,176,.2),rgba(238,122,45,.08) 48%,transparent 70%);animation:bbMysteryPulse 1.8s ease-in-out infinite alternate}
    @keyframes bbMysteryPulse{to{transform:translateX(-50%) scale(1.08);filter:brightness(1.25)}}
    .bb-mystery-figure{position:relative;width:118px;height:222px;filter:drop-shadow(0 0 15px rgba(57,119,181,.2))}
    .bb-mystery-head{position:absolute;left:35px;top:24px;width:50px;height:51px;border:4px solid #05080b;border-radius:4px;background:#080b0f}
    .bb-mystery-cap{position:absolute;left:25px;top:5px;width:70px;height:32px;border:4px solid #05080b;border-radius:18px 18px 5px 5px;background:#080b0f;transform:rotate(-2deg)}
    .bb-mystery-cap::after{content:"";position:absolute;left:-17px;top:21px;width:38px;height:10px;border:4px solid #05080b;background:#080b0f;transform:rotate(-6deg)}
    .bb-mystery-body{position:absolute;left:24px;top:73px;width:72px;height:79px;border:4px solid #05080b;background:#080b0f}
    .bb-mystery-leg{position:absolute;top:148px;width:27px;height:68px;border:4px solid #05080b;background:#080b0f}.bb-mystery-leg.a{left:28px}.bb-mystery-leg.b{right:28px}
    .bb-mystery-arm{position:absolute;right:11px;top:79px;width:18px;height:71px;border:4px solid #05080b;background:#080b0f;transform:rotate(-8deg)}
    .bb-mystery-bat{position:absolute;right:-3px;top:21px;width:13px;height:132px;border:4px solid #05080b;border-radius:8px;background:#080b0f;transform:rotate(24deg);transform-origin:bottom center}
    .bb-mystery-name{position:relative;margin-top:0;color:#fff;font:1000 21px/1 Impact,"Arial Black",sans-serif;letter-spacing:2px;text-shadow:3px 3px #111}
    .bb-erin-lights{position:relative;display:flex;gap:9px;margin-top:12px}
    .bb-erin-light{width:18px;height:18px;transform:rotate(45deg);border:3px solid #111;background:#25313c;box-shadow:0 0 0 2px #44515d}
    .bb-erin-light.on{background:linear-gradient(135deg,#2d76b8 0 48%,#ee7a2e 49%);box-shadow:0 0 12px rgba(70,137,205,.55),0 0 17px rgba(238,122,46,.3)}
    .bb-erin-total{position:relative;margin-top:13px;color:#d9e4ec;font:1000 12px/1 Arial,sans-serif;letter-spacing:1.5px}
    .bb-erin-reveal-button{position:relative;margin-top:15px;min-width:210px;padding:12px 19px;border:4px solid #111;border-radius:6px;background:linear-gradient(90deg,#2b70b2,#ef7b2f);color:#fff;box-shadow:0 5px 0 #111;font:1000 14px/1 Arial,sans-serif;letter-spacing:1.6px;cursor:pointer;animation:bbRevealButton 1s ease-in-out infinite alternate}
    @keyframes bbRevealButton{to{filter:brightness(1.18);transform:translateY(-2px)}}
    .bb-nick-unlocked-model{position:relative;height:260px;display:flex;align-items:flex-end;justify-content:center}.bb-nick-unlocked-model .nick-model{transform:scale(1.2);transform-origin:bottom center;filter:drop-shadow(0 0 15px rgba(238,122,46,.25))}

    .bb-erin-objectives{padding:14px;border-top:7px solid #ef7b2e}
    .bb-erin-objectives-head{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;padding:3px 3px 11px;border-bottom:2px solid #344a5a}
    .bb-erin-objectives-head h3{margin:0;font:1000 24px/1 Impact,"Arial Black",sans-serif;letter-spacing:1.2px}.bb-erin-objectives-head span{color:#8fa6b8;font:1000 9px/1 Arial,sans-serif;letter-spacing:1.3px}
    .bb-erin-objective{display:grid;grid-template-columns:46px minmax(0,1fr) auto;gap:11px;align-items:center;min-height:92px;margin-top:9px;padding:10px 11px;border:3px solid #354b5b;border-left:6px solid #526778;background:linear-gradient(135deg,#142738,#0b161f)}
    .bb-erin-objective.complete{border-left-color:#ed7b30;background:linear-gradient(135deg,#16304b,#171b20)}
    .bb-erin-number{width:40px;height:40px;display:grid;place-items:center;border:3px solid #111;border-radius:50%;background:#223545;color:#9fb0be;font:1000 15px/1 Arial,sans-serif}.bb-erin-objective.complete .bb-erin-number{background:linear-gradient(135deg,#2a6fae,#ed7c30);color:#fff}
    .bb-erin-objective-title{font:1000 13px/1 Arial,sans-serif;letter-spacing:1px}.bb-erin-objective-text{margin-top:5px;color:#b6c2cc;font:700 10px/1.3 Arial,sans-serif}
    .bb-erin-progress-row{display:flex;justify-content:space-between;gap:10px;margin-top:7px;color:#d8e2e8;font:900 9px/1 Arial,sans-serif}.bb-erin-progress-state{color:#f08a3f}
    .bb-erin-progress{height:8px;margin-top:6px;border:2px solid #111;background:#222d35;overflow:hidden}.bb-erin-progress-fill{height:100%;background:linear-gradient(90deg,#2f75b5,#ef7c2f);transition:width .18s ease}
    .bb-erin-auto{min-width:76px;padding:7px 8px;border:2px solid #111;border-radius:4px;background:#25333f;color:#8fa0ad;text-align:center;font:1000 8px/1 Arial,sans-serif}.bb-erin-objective.complete .bb-erin-auto{background:#2d6d4b;color:#e7fff0}
    .bb-erin-footnote{margin-top:11px;padding:10px 12px;border:3px solid #111;background:#0a131b;color:#95a8b7;font:900 9px/1.35 Arial,sans-serif;letter-spacing:.7px}.bb-erin-footnote strong{color:#f0a05c}

    .bb-erin-toast{position:fixed;left:50%;top:24px;z-index:9000;min-width:300px;max-width:min(650px,90vw);padding:12px 18px;transform:translate(-50%,-18px);opacity:0;border:4px solid #111;border-left:8px solid #2f73b3;border-right:8px solid #ed7a2f;background:#0d1b28;color:#fff;box-shadow:0 8px 0 rgba(0,0,0,.3);text-align:center;font:1000 12px/1.35 Arial,sans-serif;letter-spacing:1px;pointer-events:none;transition:opacity .15s ease,transform .15s ease}.bb-erin-toast.show{opacity:1;transform:translate(-50%,0)}

    .bb-nick-reveal-overlay{position:fixed;inset:0;z-index:9500;display:none;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 45%,rgba(35,93,147,.26),transparent 32%),rgba(2,7,12,.94);overflow:hidden}.bb-nick-reveal-overlay.open{display:flex}
    .bb-nick-reveal-overlay::before,.bb-nick-reveal-overlay::after{content:"";position:absolute;inset:-20%;opacity:0;background:linear-gradient(110deg,transparent 42%,rgba(45,113,184,.5) 48%,transparent 54%);transform:translateX(-55%)}.bb-nick-reveal-overlay::after{background:linear-gradient(70deg,transparent 42%,rgba(239,122,46,.5) 48%,transparent 54%);transform:translateX(55%)}
    .bb-nick-reveal-overlay.flashing::before{animation:bbRevealBlue .65s ease-out 2}.bb-nick-reveal-overlay.flashing::after{animation:bbRevealOrange .65s .12s ease-out 2}
    @keyframes bbRevealBlue{50%{opacity:1;transform:translateX(28%)}}@keyframes bbRevealOrange{50%{opacity:1;transform:translateX(-28%)}}
    .bb-reveal-card{position:relative;z-index:2;width:min(480px,92vw);min-height:570px;padding:22px;border:5px solid #111;border-top:8px solid #2f74b4;border-bottom:8px solid #ed7c31;background:linear-gradient(180deg,#11283d,#07111a);box-shadow:0 0 50px rgba(27,86,140,.2);text-align:center}
    .bb-reveal-kicker{color:#f08a3c;font:1000 10px/1 Arial,sans-serif;letter-spacing:3px}.bb-reveal-heading{margin-top:8px;font:1000 35px/1 Impact,"Arial Black",sans-serif;text-shadow:4px 4px #111}
    .bb-reveal-figure-wrap{height:335px;display:flex;align-items:flex-end;justify-content:center;position:relative}
    .bb-reveal-figure{position:relative;width:150px;height:275px;transform:scale(1.12);transform-origin:bottom center;transition:opacity .2s ease}
    .bb-reveal-figure .bb-mystery-head{left:50px;top:42px}.bb-reveal-figure .bb-mystery-cap{left:38px;top:19px}.bb-reveal-figure .bb-mystery-body{left:39px;top:91px}.bb-reveal-figure .bb-mystery-leg{top:166px}.bb-reveal-figure .bb-mystery-leg.a{left:43px}.bb-reveal-figure .bb-mystery-leg.b{right:43px}.bb-reveal-figure .bb-mystery-arm{right:22px;top:96px}.bb-reveal-figure .bb-mystery-bat{right:8px;top:32px}
    .bb-nick-reveal-overlay.cap .bb-reveal-figure .bb-mystery-cap,.bb-nick-reveal-overlay.cap .bb-reveal-figure .bb-mystery-cap::after{background:#123252;border-color:#06101a;box-shadow:0 0 18px rgba(53,126,198,.65)}
    .bb-nick-reveal-overlay.bat .bb-reveal-figure .bb-mystery-bat{background:linear-gradient(#d6a162,#9b612f);border-color:#111;box-shadow:0 0 18px rgba(239,139,60,.55)}
    .bb-reveal-real{position:absolute;left:50%;bottom:13px;transform:translateX(-50%) scale(1.38);transform-origin:bottom center;opacity:0;filter:drop-shadow(0 0 23px rgba(239,126,49,.32));transition:opacity .32s ease,transform .38s cubic-bezier(.2,.8,.2,1)}
    .bb-nick-reveal-overlay.full .bb-reveal-figure{opacity:0}.bb-nick-reveal-overlay.full .bb-reveal-real{opacity:1;transform:translateX(-50%) scale(1.48)}
    .bb-reveal-name{opacity:0;margin-top:0;font:1000 48px/.9 Impact,"Arial Black",sans-serif;letter-spacing:2px;color:#fff;text-shadow:5px 5px #111;transform:translateY(12px);transition:opacity .25s ease,transform .25s ease}.bb-reveal-name span{display:block;margin-top:10px;color:#f08a3e;font:1000 14px/1 Arial,sans-serif;letter-spacing:4px}.bb-nick-reveal-overlay.named .bb-reveal-name{opacity:1;transform:translateY(0)}

    @media(max-width:850px){.bb-erin-quest{grid-template-columns:1fr}.bb-erin-mystery{min-height:520px}.bb-mystery-stage{height:225px}.bb-erin-objective{grid-template-columns:40px minmax(0,1fr)}.bb-erin-auto{grid-column:2;justify-self:start}.bb-erin-objectives-head{align-items:flex-start;flex-direction:column}}
  `;
  document.head.appendChild(style);

  const hub = document.querySelector(".bb-challenge-hub");
  const tabs = hub?.querySelector(".bb-challenge-tabs");
  const shell = hub?.querySelector(".bb-challenge-shell");
  if (!hub || !tabs || !shell) return;

  const specialTab = document.createElement("button");
  specialTab.className = "bb-tab-button bb-erin-tab";
  specialTab.type = "button";
  specialTab.setAttribute("aria-controls","bbErinChallengePanel");
  tabs.appendChild(specialTab);

  const panel = document.createElement("div");
  panel.id = "bbErinChallengePanel";
  panel.className = "bb-challenge-panel bb-erin-panel";
  shell.appendChild(panel);

  const toast = document.createElement("div");
  toast.className = "bb-erin-toast";
  document.body.appendChild(toast);

  const revealOverlay = document.createElement("div");
  revealOverlay.className = "bb-nick-reveal-overlay";
  revealOverlay.innerHTML = `<div class="bb-reveal-card"><div class="bb-reveal-kicker">ERIN'S CHALLENGE</div><div class="bb-reveal-heading">SOMEONE'S HERE...</div><div class="bb-reveal-figure-wrap"><div class="bb-reveal-figure"><div class="bb-mystery-head"></div><div class="bb-mystery-cap"></div><div class="bb-mystery-body"></div><div class="bb-mystery-arm"></div><div class="bb-mystery-leg a"></div><div class="bb-mystery-leg b"></div><div class="bb-mystery-bat"></div></div><div class="bb-reveal-real">${characterHTML("nick")}</div></div><div class="bb-reveal-name">NICK<span>UNLOCKED</span></div></div>`;
  document.body.appendChild(revealOverlay);

  function queueToast(message) {
    toastQueue.push(message);
    if (toastBusy) return;
    const next = () => {
      const text = toastQueue.shift();
      if (!text) { toastBusy = false; return; }
      toastBusy = true;
      toast.innerHTML = text;
      requestAnimationFrame(() => toast.classList.add("show"));
      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(next,220);
      },1900);
    };
    next();
  }

  function evaluateCompletions({ notify = true } = {}) {
    const newly = [];
    CHALLENGES.forEach(challenge => {
      const complete = metricValue(challenge) >= challenge.target;
      if (complete && !state.completed[challenge.id]) {
        state.completed[challenge.id] = true;
        newly.push(challenge);
      }
    });

    const count = completeCount();
    if (count === CHALLENGES.length) state.revealReady = true;
    saveState();

    if (notify) {
      newly.forEach(challenge => queueToast(`ERIN'S CHALLENGE<br>${challenge.title} COMPLETE`));
      if (newly.length && count === CHALLENGES.length && !state.nickUnlocked) {
        queueToast("ERIN'S CHALLENGE COMPLETE<br>A MYSTERY FIGHTER IS WAITING...");
      }
    }

    render();
  }

  function progressHTML(challenge,index) {
    const value = metricValue(challenge);
    const shown = Math.min(challenge.target,value);
    const percent = Math.min(100,value/challenge.target*100);
    const complete = Boolean(state.completed[challenge.id]);
    return `<div class="bb-erin-objective ${complete ? "complete" : ""}"><div class="bb-erin-number">${complete ? "✓" : index+1}</div><div><div class="bb-erin-objective-title">${challenge.title}</div><div class="bb-erin-objective-text">${challenge.text}</div><div class="bb-erin-progress-row"><span>${Math.floor(shown).toLocaleString()} / ${challenge.target.toLocaleString()}</span><span class="bb-erin-progress-state">${complete ? "COMPLETE" : "IN PROGRESS"}</span></div><div class="bb-erin-progress"><div class="bb-erin-progress-fill" style="width:${percent}%"></div></div></div><div class="bb-erin-auto">${complete ? "DONE" : "AUTO TRACK"}</div></div>`;
  }

  function mysteryFigureHTML() {
    if (state.nickUnlocked) {
      return `<div class="bb-nick-unlocked-model">${characterHTML("nick")}</div>`;
    }
    return `<div class="bb-mystery-stage"><div class="bb-mystery-halo"></div><div class="bb-mystery-figure"><div class="bb-mystery-head"></div><div class="bb-mystery-cap"></div><div class="bb-mystery-body"></div><div class="bb-mystery-arm"></div><div class="bb-mystery-leg a"></div><div class="bb-mystery-leg b"></div><div class="bb-mystery-bat"></div></div></div>`;
  }

  function render() {
    const count = completeCount();
    const remaining = CHALLENGES.length - count;
    specialTab.textContent = `ERIN'S CHALLENGE • ${count}/5`;

    let mysteryLabel = "MYSTERY FIGHTER";
    if (state.nickUnlocked) mysteryLabel = "NICK UNLOCKED";
    else if (state.revealReady) mysteryLabel = "SOMEONE'S HERE...";
    else if (remaining === 1) mysteryLabel = "ALMOST HERE...";

    const lights = CHALLENGES.map((challenge,index) => `<span class="bb-erin-light ${state.completed[challenge.id] ? "on" : ""}" title="Challenge ${index+1}"></span>`).join("");
    const revealButton = state.revealReady && !state.nickUnlocked ? '<button id="bbRevealNick" class="bb-erin-reveal-button" type="button">REVEAL FIGHTER</button>' : "";

    panel.innerHTML = `<div class="bb-erin-quest"><section class="bb-erin-mystery"><div class="bb-erin-kicker">PERMANENT SPECIAL CHALLENGE</div><div class="bb-erin-title">ERIN'S CHALLENGE</div><div class="bb-erin-subtitle">A SPECIAL SOMEONE</div><div class="bb-erin-description">Complete all 5 permanent offline challenges to reveal the Mystery Fighter.</div>${mysteryFigureHTML()}<div class="bb-mystery-name">${mysteryLabel}</div><div class="bb-erin-lights">${lights}</div><div class="bb-erin-total">${count} / 5 COMPLETE</div>${revealButton}</section><section class="bb-erin-objectives"><div class="bb-erin-objectives-head"><h3>5 OBJECTIVES</h3><span>PERMANENT • ALL PROGRESS TOGETHER</span></div>${CHALLENGES.map(progressHTML).join("")}<div class="bb-erin-footnote"><strong>OFFLINE ONLY:</strong> progress counts in 1P, local 2P, and Martin Challenge. Private ONLINE matches never advance Erin's Challenge. Objectives complete automatically and never reset.</div></section></div>`;
  }

  function openSpecialTab() {
    hub.querySelectorAll(".bb-tab-button").forEach(button => button.classList.remove("active"));
    specialTab.classList.add("active");
    hub.querySelectorAll(".bb-challenge-panel").forEach(item => item.classList.remove("active"));
    panel.classList.add("active");
    render();
  }

  specialTab.addEventListener("click",openSpecialTab);

  hub.addEventListener("click",event => {
    if (event.target.closest("[data-bb-tab]")) {
      panel.classList.remove("active");
      specialTab.classList.remove("active");
    }

    const revealButton = event.target.closest("#bbRevealNick");
    if (revealButton) runReveal();
  });

  const hubObserver = new MutationObserver(() => {
    if (!hub.classList.contains("open")) {
      panel.classList.remove("active");
      specialTab.classList.remove("active");
    }
  });
  hubObserver.observe(hub,{attributes:true,attributeFilter:["class"]});

  function runReveal() {
    if (revealRunning || !state.revealReady || state.nickUnlocked) return;
    revealRunning = true;

    /* Clicking REVEAL is the permanent claim. Persist immediately so a
       refresh during the animation can never lose the unlock. */
    state.nickUnlocked = true;
    saveState();
    localStorage.setItem("nickUnlocked","true");

    revealOverlay.className = "bb-nick-reveal-overlay open";
    void revealOverlay.offsetWidth;

    setTimeout(() => revealOverlay.classList.add("flashing"),280);
    setTimeout(() => revealOverlay.classList.add("cap"),780);
    setTimeout(() => revealOverlay.classList.add("bat"),1350);
    setTimeout(() => revealOverlay.classList.add("full"),2050);
    setTimeout(() => {
      revealOverlay.classList.add("named");
      window.BBNickFighter?.unlock?.();
    },2700);
    setTimeout(() => {
      revealOverlay.className = "bb-nick-reveal-overlay";
      revealRunning = false;
      render();
    },4550);
  }

  function addUniqueWinner(character) {
    if (!character || state.uniqueWinningFighters.includes(character)) return;
    state.uniqueWinningFighters.push(character);
  }

  function addMetric(metric,amount) {
    if (state.nickUnlocked) return;
    state[metric] = Math.max(0,Number(state[metric]) || 0) + Math.max(0,Number(amount) || 0);
    evaluateCompletions({notify:true});
  }

  /* =====================================================
     COMBAT TRACKING — wraps Family Challenges, so both systems
     see the same real damage without double-counting each other.
  ===================================================== */
  const previousDealDamageErinChallenge = dealDamage;
  dealDamage = function(attacker,target,amount,options = {}) {
    const shouldTrack = !state.nickUnlocked && trackedAttacker(attacker);
    const before = target ? Math.max(0,Number(target.health) || 0) : 0;
    const type = options?.type || "normal";
    const result = previousDealDamageErinChallenge.apply(this,arguments);

    if (shouldTrack && target && !isOnline()) {
      const after = Math.max(0,Number(target.health) || 0);
      const actual = Math.max(0,before-after);
      if (actual > 0) {
        state.damage += actual;
        if (type === "normal") state.meleeHits += 1;
        evaluateCompletions({notify:true});
      }
    }
    return result;
  };

  const previousBeginMatchErinChallenge = beginMatch;
  beginMatch = function() {
    const result = previousBeginMatchErinChallenge.apply(this,arguments);
    if (!isOnline() && !state.nickUnlocked) {
      activeMatch = {
        id: typeof matchId !== "undefined" ? matchId : Date.now(),
        counted: false
      };
    } else {
      activeMatch = null;
    }
    return result;
  };

  function finishMatchProgress() {
    if (!activeMatch || activeMatch.counted || isOnline() || state.nickUnlocked) return;
    activeMatch.counted = true;

    const p1WinsNow = Number(player1Wins) || 0;
    const p2WinsNow = Number(player2Wins) || 0;
    const winner = p1WinsNow >= p2WinsNow ? P1 : P2;
    const humanWin = (gameMode === "2P" && !challengeMode) || winner === P1;
    if (!humanWin || !winner?.character) return;

    if (winner.character === "erin") state.erinWins += 1;
    if (winner.character === "alice") state.aliceWins += 1;
    addUniqueWinner(winner.character);
    evaluateCompletions({notify:true});
  }

  setInterval(() => {
    if (!activeMatch || activeMatch.counted || isOnline() || state.nickUnlocked) return;
    if (typeof gameOver !== "undefined" && gameOver === true) finishMatchProgress();
  },180);

  document.addEventListener("bb:nick-unlocked",() => {
    state.nickUnlocked = true;
    state.revealReady = true;
    saveState();
    render();
  });

  evaluateCompletions({notify:false});
  saveState();
  render();

  window.BBErinChallenge = {
    getState: () => JSON.parse(JSON.stringify(state)),
    open: openSpecialTab
  };
})();