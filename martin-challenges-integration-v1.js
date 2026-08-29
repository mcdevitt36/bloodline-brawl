/* BLOODLINE BRAWL — MARTIN CHALLENGE / FAMILY CHALLENGES INTEGRATION V1
   Player-facing Challenges integration for the existing Martin boss fight.
   Uses the game's existing martinUnlocked state as the single source of truth. */
(() => {
  if (window.__bbMartinChallengesIntegrationV1Loaded) return;
  window.__bbMartinChallengesIntegrationV1Loaded = true;

  function martinUnlocked() {
    try {
      if (typeof isMartinUnlocked === 'function') return isMartinUnlocked();
    } catch (_) {}
    return localStorage.getItem('martinUnlocked') === 'true';
  }

  const style = document.createElement('style');
  style.textContent = `
    #titleScreen .bb-mode-launcher{grid-template-columns:1.15fr 1fr!important}
    #titleScreen .bb-mode-card.challenge{display:none!important}
    #titleScreen .bb-martin-feature{position:absolute;right:clamp(14px,2.4vw,34px);top:clamp(76px,9.5vh,96px);z-index:89;width:min(245px,31vw);padding:10px 12px;border:2px solid rgba(255,213,42,.52);border-radius:10px;background:linear-gradient(145deg,rgba(29,35,44,.97),rgba(11,16,23,.97));box-shadow:0 8px 22px rgba(0,0,0,.32);color:#fff;text-align:left;cursor:pointer}
    #titleScreen .bb-martin-feature small{display:block;color:#ffd52a;font-size:8px;font-weight:1000;letter-spacing:1.5px}.bb-martin-feature strong{display:block;margin-top:3px;font-size:13px;letter-spacing:.5px}.bb-martin-feature span{display:block;margin-top:2px;color:#aebbc6;font-size:8px;font-weight:800}
    #titleScreen .bb-martin-feature.complete{border-color:rgba(83,218,127,.72);background:linear-gradient(145deg,rgba(20,55,41,.97),rgba(10,22,18,.97))}
    #titleScreen .bb-martin-feature.complete small{color:#72e69a}
    #titleScreen .bb-martin-feature.complete::after{content:"✓";position:absolute;right:10px;top:9px;width:22px;height:22px;display:grid;place-items:center;border:2px solid #111;border-radius:50%;background:#55d67f;color:#08120c;font-size:13px;font-weight:1000}

    .bb-tab-button.bb-martin-tab{border-color:#7d6330;color:#f1d990}.bb-tab-button.bb-martin-tab.active{background:linear-gradient(135deg,#ffd52a,#ef8e2f);color:#111}
    .bb-tab-button.bb-martin-tab.complete{border-color:#4ca36a;color:#9be4b3}.bb-tab-button.bb-martin-tab.complete.active{background:linear-gradient(135deg,#69dc91,#2b9c58);color:#08120c}

    .bb-martin-panel-card{position:relative;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:22px;align-items:center;padding:clamp(20px,3vw,36px);border:4px solid #111;border-left:8px solid #ffd52a;background:radial-gradient(circle at 88% 20%,rgba(255,213,42,.13),transparent 32%),linear-gradient(135deg,#172a38,#0a1219);box-shadow:0 7px 0 rgba(0,0,0,.28);overflow:hidden}
    .bb-martin-panel-card::after{content:"M";position:absolute;right:28%;top:50%;transform:translateY(-50%) rotate(-8deg);color:rgba(255,213,42,.045);font:1000 180px/1 Impact,'Arial Black',sans-serif;pointer-events:none}
    .bb-martin-panel-card .kicker{position:relative;z-index:1;color:#ffd52a;font-size:10px;font-weight:1000;letter-spacing:2px}.bb-martin-panel-card h3{position:relative;z-index:1;margin:5px 0 8px;font:1000 clamp(30px,4vw,48px) Impact,'Arial Black',sans-serif;letter-spacing:1px}.bb-martin-panel-card p{position:relative;z-index:1;max-width:700px;margin:0;color:#c3ced6;font-size:13px;line-height:1.5;font-weight:750}.bb-martin-panel-card .bb-martin-meta{position:relative;z-index:1;display:flex;gap:8px;flex-wrap:wrap;margin-top:13px}.bb-martin-panel-card .bb-martin-pill{padding:6px 9px;border:2px solid #314756;border-radius:999px;background:#0c1821;color:#d6e0e7;font-size:9px;font-weight:1000;letter-spacing:.8px}.bb-martin-panel-card .bb-martin-pill.reward{border-color:#806b25;color:#ffe36b}
    .bb-martin-panel-card button{position:relative;z-index:2;min-width:205px;padding:15px 20px;border:3px solid #111;border-radius:7px;background:#ffd52a;color:#111;box-shadow:0 5px 0 #111;font-size:12px;font-weight:1000;letter-spacing:1px;cursor:pointer}
    .bb-martin-panel-card button:hover{filter:brightness(1.08);transform:translateY(-1px)}

    .bb-martin-panel-card.complete{border-left-color:#55d67f;background:radial-gradient(circle at 88% 20%,rgba(85,214,127,.13),transparent 32%),linear-gradient(135deg,#153326,#091813)}
    .bb-martin-panel-card.complete::after{color:rgba(85,214,127,.05)}
    .bb-martin-panel-card.complete .kicker{color:#72e69a}
    .bb-martin-panel-card.complete .bb-martin-pill.reward{border-color:#438b5b;color:#9cf0b8}
    .bb-martin-panel-card.complete button{background:#55d67f;color:#08120c;cursor:default;box-shadow:0 5px 0 #111}
    .bb-martin-panel-card.complete button:hover{filter:none;transform:none}

    @media(max-width:900px){#titleScreen .bb-mode-launcher{grid-template-columns:1fr 1fr!important}#titleScreen .bb-martin-feature{width:min(220px,38vw)}}
    @media(max-width:620px){#titleScreen .bb-mode-launcher{grid-template-columns:1fr!important}#titleScreen .bb-martin-feature{position:relative;right:auto;top:auto;width:100%;margin-top:8px}.bb-martin-panel-card{grid-template-columns:1fr}.bb-martin-panel-card button{width:100%}}
  `;
  document.head.appendChild(style);

  function startMartin() {
    if (martinUnlocked()) return;
    const original = document.getElementById('martinChallengeButton');
    if (original) original.click();
  }

  function setTabState(tab, complete) {
    if (!tab) return;
    const stateKey = complete ? 'complete' : 'open';
    if (tab.dataset.martinState === stateKey) return;
    tab.dataset.martinState = stateKey;
    tab.classList.toggle('complete', complete);
    tab.textContent = complete ? "MARTIN'S CHALLENGE ✓" : "MARTIN'S CHALLENGE";
  }

  function renderPanel(panel, tab) {
    if (!panel) return;
    const complete = martinUnlocked();
    const stateKey = complete ? 'complete' : 'open';
    panel.dataset.martinState = stateKey;
    panel.classList.toggle('complete', complete);
    setTabState(tab, complete);

    panel.innerHTML = complete
      ? '<div><div class="kicker">CHALLENGE COMPLETE</div><h3>MARTIN\'S CHALLENGE</h3><p>You defeated Martin and earned the ultimate reward: Martin is permanently unlocked as a playable fighter.</p><div class="bb-martin-meta"><span class="bb-martin-pill">BOSS DEFEATED</span><span class="bb-martin-pill reward">REWARD • MARTIN UNLOCKED</span></div></div><button type="button" id="bbLaunchMartinChallenge" disabled>✓ COMPLETED</button>'
      : '<div><div class="kicker">PERMANENT FIGHTER CHALLENGE</div><h3>MARTIN\'S CHALLENGE</h3><p>Defeat a tougher Martin in his special boss battle to unlock him permanently as a playable fighter.</p><div class="bb-martin-meta"><span class="bb-martin-pill">115 HP • TOUGHER AI</span><span class="bb-martin-pill reward">REWARD • UNLOCK MARTIN</span></div></div><button type="button" id="bbLaunchMartinChallenge">CHALLENGE MARTIN</button>';

    const launch = panel.querySelector('#bbLaunchMartinChallenge');
    if (launch && !complete) {
      launch.addEventListener('click', () => {
        window.BBFamilyChallenges?.close?.();
        setTimeout(startMartin, 0);
      });
    }
  }

  function refreshMartinStatus() {
    const complete = martinUnlocked();
    const stateKey = complete ? 'complete' : 'open';
    const feature = document.querySelector('.bb-martin-feature');
    if (feature && feature.dataset.martinState !== stateKey) {
      feature.dataset.martinState = stateKey;
      feature.classList.toggle('complete', complete);
      feature.innerHTML = complete
        ? '<small>FEATURED CHALLENGE • COMPLETE</small><strong>MARTIN\'S CHALLENGE</strong><span>Martin unlocked ✓</span>'
        : '<small>FEATURED CHALLENGE</small><strong>MARTIN\'S CHALLENGE</strong><span>Defeat the boss • unlock Martin</span>';
    }

    const tab = document.querySelector('[data-bb-tab="martin"]');
    const panel = document.getElementById('bbMartinChallengePanel');
    if (panel && panel.dataset.martinState !== stateKey) renderPanel(panel, tab);
    else setTabState(tab, complete);
  }

  function installTitleFeature() {
    const titleRoot = document.querySelector('#titleScreen .title-content');
    const challengeButton = document.querySelector('.bb-challenges-title-button');
    if (!titleRoot || !challengeButton) return;

    let feature = document.querySelector('.bb-martin-feature');
    if (!feature) {
      feature = document.createElement('button');
      feature.type = 'button';
      feature.className = 'bb-martin-feature';
      feature.addEventListener('click', () => window.BBFamilyChallenges?.open?.('martin'));
      titleRoot.appendChild(feature);
    }
    refreshMartinStatus();
  }

  function installHubTab() {
    const tabs = document.querySelector('.bb-challenge-tabs');
    const shell = document.querySelector('.bb-challenge-shell');
    if (!tabs || !shell) return;

    let tab = document.querySelector('[data-bb-tab="martin"]');
    let panel = document.getElementById('bbMartinChallengePanel');

    if (!tab) {
      tab = document.createElement('button');
      tab.className = 'bb-tab-button bb-martin-tab';
      tab.dataset.bbTab = 'martin';
      tab.type = 'button';
      tabs.appendChild(tab);
    }

    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'bbMartinChallengePanel';
      panel.className = 'bb-challenge-panel';
      const rewards = document.getElementById('bbRewardsPanel');
      if (rewards) rewards.insertAdjacentElement('afterend', panel); else shell.appendChild(panel);
      renderPanel(panel, tab);

      // The original hub only knows its native tabs. Extend it without changing
      // the Daily/Weekly progression engine.
      tabs.addEventListener('click', e => {
        const button = e.target.closest('[data-bb-tab]');
        if (!button) return;
        const key = button.dataset.bbTab;
        requestAnimationFrame(() => {
          tabs.querySelectorAll('.bb-tab-button').forEach(b => b.classList.toggle('active', b.dataset.bbTab === key));
          document.getElementById('bbChallengePanel')?.classList.toggle('active', key === 'challenges');
          document.getElementById('bbRewardsPanel')?.classList.toggle('active', key === 'rewards');
          panel.classList.toggle('active', key === 'martin');
          refreshMartinStatus();
        });
      }, true);
    }

    const api = window.BBFamilyChallenges;
    if (api && !api.__martinWrapped) {
      const oldOpen = api.open.bind(api);
      api.open = tabName => {
        oldOpen(tabName === 'martin' ? 'challenges' : tabName);
        if (tabName === 'martin') requestAnimationFrame(() => tab.click());
      };
      api.__martinWrapped = true;
    }

    refreshMartinStatus();
  }

  const observer = new MutationObserver(() => {
    installTitleFeature();
    installHubTab();
    refreshMartinStatus();
  });
  observer.observe(document.documentElement,{childList:true,subtree:true,characterData:true});

  window.addEventListener('storage', event => {
    if (event.key === 'martinUnlocked') refreshMartinStatus();
  });

  installTitleFeature();
  installHubTab();
  refreshMartinStatus();
  setTimeout(()=>{installTitleFeature();installHubTab();refreshMartinStatus();},500);
  setTimeout(()=>{installTitleFeature();installHubTab();refreshMartinStatus();},1500);
})();