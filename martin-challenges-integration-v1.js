/* BLOODLINE BRAWL — MARTIN CHALLENGE / FAMILY CHALLENGES INTEGRATION V1
   Navigation/UI only. Keeps the existing Martin Challenge button and gameplay handler intact. */
(() => {
  if (window.__bbMartinChallengesIntegrationV1Loaded) return;
  window.__bbMartinChallengesIntegrationV1Loaded = true;

  const style = document.createElement('style');
  style.textContent = `
    #titleScreen .bb-mode-launcher{grid-template-columns:1.15fr 1fr!important}
    #titleScreen .bb-mode-card.challenge{display:none!important}
    #titleScreen .bb-martin-feature{position:absolute;right:clamp(14px,2.4vw,34px);top:clamp(76px,9.5vh,96px);z-index:89;width:min(245px,31vw);padding:10px 12px;border:2px solid rgba(255,213,42,.52);border-radius:10px;background:linear-gradient(145deg,rgba(29,35,44,.97),rgba(11,16,23,.97));box-shadow:0 8px 22px rgba(0,0,0,.32);color:#fff;text-align:left;cursor:pointer}
    #titleScreen .bb-martin-feature small{display:block;color:#ffd52a;font-size:8px;font-weight:1000;letter-spacing:1.5px}.bb-martin-feature strong{display:block;margin-top:3px;font-size:13px;letter-spacing:.5px}.bb-martin-feature span{display:block;margin-top:2px;color:#aebbc6;font-size:8px;font-weight:800}
    .bb-tab-button.bb-martin-tab{border-color:#7d6330;color:#f1d990}.bb-tab-button.bb-martin-tab.active{background:linear-gradient(135deg,#ffd52a,#ef8e2f);color:#111}
    .bb-martin-panel-card{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:18px;align-items:center;padding:clamp(18px,3vw,34px);border:4px solid #111;border-left:8px solid #ffd52a;background:radial-gradient(circle at 88% 20%,rgba(255,213,42,.13),transparent 32%),linear-gradient(135deg,#172a38,#0a1219);box-shadow:0 7px 0 rgba(0,0,0,.28)}
    .bb-martin-panel-card .kicker{color:#ffd52a;font-size:10px;font-weight:1000;letter-spacing:2px}.bb-martin-panel-card h3{margin:5px 0 7px;font:1000 clamp(27px,4vw,46px) Impact,'Arial Black',sans-serif;letter-spacing:1px}.bb-martin-panel-card p{max-width:680px;margin:0;color:#b9c5cf;font-size:12px;line-height:1.5;font-weight:700}.bb-martin-panel-card button{min-width:190px;padding:14px 18px;border:3px solid #111;border-radius:7px;background:#ffd52a;color:#111;box-shadow:0 5px 0 #111;font-weight:1000;letter-spacing:1px;cursor:pointer}
    @media(max-width:900px){#titleScreen .bb-mode-launcher{grid-template-columns:1fr 1fr!important}#titleScreen .bb-martin-feature{width:min(220px,38vw)}}
    @media(max-width:620px){#titleScreen .bb-mode-launcher{grid-template-columns:1fr!important}#titleScreen .bb-martin-feature{position:relative;right:auto;top:auto;width:100%;margin-top:8px}.bb-martin-panel-card{grid-template-columns:1fr}.bb-martin-panel-card button{width:100%}}
  `;
  document.head.appendChild(style);

  function startMartin() {
    const original = document.getElementById('martinChallengeButton');
    if (original) original.click();
  }

  function installTitleFeature() {
    const titleRoot = document.querySelector('#titleScreen .title-content');
    const challengeButton = document.querySelector('.bb-challenges-title-button');
    if (!titleRoot || !challengeButton || document.querySelector('.bb-martin-feature')) return;
    const feature = document.createElement('button');
    feature.type = 'button';
    feature.className = 'bb-martin-feature';
    feature.innerHTML = '<small>FEATURED CHALLENGE</small><strong>MARTIN\'S CHALLENGE</strong><span>Boss fight • special unlock</span>';
    feature.addEventListener('click', () => window.BBFamilyChallenges?.open?.('martin'));
    titleRoot.appendChild(feature);
  }

  function installHubTab() {
    const tabs = document.querySelector('.bb-challenge-tabs');
    const shell = document.querySelector('.bb-challenge-shell');
    if (!tabs || !shell || document.querySelector('[data-bb-tab="martin"]')) return;

    const tab = document.createElement('button');
    tab.className = 'bb-tab-button bb-martin-tab';
    tab.dataset.bbTab = 'martin';
    tab.type = 'button';
    tab.textContent = "MARTIN'S CHALLENGE";
    tabs.appendChild(tab);

    const panel = document.createElement('div');
    panel.id = 'bbMartinChallengePanel';
    panel.className = 'bb-challenge-panel';
    panel.innerHTML = '<div class="bb-martin-panel-card"><div><div class="kicker">PERMANENT FEATURED CHALLENGE</div><h3>MARTIN\'S CHALLENGE</h3><p>Take on Martin in the existing boss challenge and earn his unlock. This launches the original challenge exactly as before—progression and gameplay are unchanged.</p></div><button type="button" id="bbLaunchMartinChallenge">START CHALLENGE</button></div>';
    const rewards = document.getElementById('bbRewardsPanel');
    if (rewards) rewards.insertAdjacentElement('afterend', panel); else shell.appendChild(panel);
    panel.querySelector('#bbLaunchMartinChallenge')?.addEventListener('click', () => {
      window.BBFamilyChallenges?.close?.();
      setTimeout(startMartin, 0);
    });

    // The original hub only knows two tabs. Extend its UI without changing challenge-system internals.
    tabs.addEventListener('click', e => {
      const button = e.target.closest('[data-bb-tab]');
      if (!button) return;
      const key = button.dataset.bbTab;
      requestAnimationFrame(() => {
        tabs.querySelectorAll('.bb-tab-button').forEach(b => b.classList.toggle('active', b.dataset.bbTab === key));
        document.getElementById('bbChallengePanel')?.classList.toggle('active', key === 'challenges');
        document.getElementById('bbRewardsPanel')?.classList.toggle('active', key === 'rewards');
        panel.classList.toggle('active', key === 'martin');
      });
    }, true);

    const api = window.BBFamilyChallenges;
    if (api && !api.__martinWrapped) {
      const oldOpen = api.open.bind(api);
      api.open = tabName => {
        oldOpen(tabName === 'martin' ? 'challenges' : tabName);
        if (tabName === 'martin') requestAnimationFrame(() => tab.click());
      };
      api.__martinWrapped = true;
    }
  }

  const observer = new MutationObserver(() => { installTitleFeature(); installHubTab(); });
  observer.observe(document.documentElement,{childList:true,subtree:true});
  installTitleFeature(); installHubTab();
  setTimeout(()=>{installTitleFeature();installHubTab();},500);
  setTimeout(()=>{installTitleFeature();installHubTab();},1500);
})();