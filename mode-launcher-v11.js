/* BLOODLINE BRAWL — MODE LAUNCHER V11
   Restored compact title menu.
   Keeps the original 1P / 2P / START flow, preserves the .mode-buttons
   container for the lazy ONLINE loader, and adds WARFARE as a fourth mode. */
(() => {
  if (window.__bbModeLauncherV11Loaded) return;
  window.__bbModeLauncherV11Loaded = true;

  const title = document.getElementById('titleScreen');
  const content = title?.querySelector('.title-content');
  const one = document.getElementById('onePlayerButton');
  const two = document.getElementById('twoPlayerButton');
  const start = document.getElementById('startButton');
  const martin = document.getElementById('martinChallengeButton');
  const versus = title?.querySelector('.title-versus-panel');
  const modeTitle = content?.querySelector('.mode-title');
  const modeWrap = content?.querySelector('.mode-buttons');

  if (!title || !content || !one || !two || !start || !modeTitle || !modeWrap) return;

  title.classList.add('bb-title-menu-restored');

  const style = document.createElement('style');
  style.id = 'bb-mode-launcher-restored-style';
  style.textContent = `
    #titleScreen.bb-title-menu-restored .title-content{
      width:min(1180px,96vw)!important;
      height:100%!important;
      display:grid!important;
      grid-template-rows:auto auto minmax(245px,1fr) auto!important;
      align-items:start!important;
      justify-items:center!important;
      gap:4px!important;
      padding:10px 20px 14px!important;
      overflow:visible!important;
    }

    #titleScreen.bb-title-menu-restored .game-logo{
      margin:0!important;
      line-height:.82!important;
    }

    #titleScreen.bb-title-menu-restored .tagline{
      margin:8px 0 0!important;
    }

    #titleScreen.bb-title-menu-restored .title-versus-panel{
      grid-row:3!important;
      align-self:center!important;
      margin:0 auto!important;
      transform:translateY(-4px)!important;
      max-height:none!important;
    }

    #titleScreen.bb-title-menu-restored .bb-title-controls{
      grid-row:4!important;
      width:min(760px,94vw)!important;
      display:flex!important;
      flex-direction:column!important;
      align-items:center!important;
      justify-content:center!important;
      gap:7px!important;
      margin:0 auto!important;
      padding:0!important;
    }

    #titleScreen.bb-title-menu-restored .mode-title{
      position:static!important;
      margin:0!important;
      color:#fff!important;
      font-size:10px!important;
      font-weight:1000!important;
      letter-spacing:4px!important;
      text-shadow:2px 2px #111!important;
    }

    #titleScreen.bb-title-menu-restored .mode-buttons{
      position:static!important;
      width:100%!important;
      display:flex!important;
      align-items:stretch!important;
      justify-content:center!important;
      flex-wrap:nowrap!important;
      gap:8px!important;
      margin:0!important;
    }

    #titleScreen.bb-title-menu-restored .mode-buttons .mode-button{
      position:relative!important;
      order:1;
      flex:1 1 0!important;
      min-width:0!important;
      max-width:180px!important;
      min-height:54px!important;
      padding:8px 12px!important;
      margin:0!important;
      border:3px solid #71808c!important;
      border-radius:7px!important;
      background:rgba(8,15,23,.92)!important;
      color:#fff!important;
      box-shadow:0 4px 0 rgba(0,0,0,.28)!important;
      font-size:13px!important;
      font-weight:1000!important;
      letter-spacing:.2px!important;
      transform:none!important;
      cursor:pointer!important;
    }

    #titleScreen.bb-title-menu-restored .mode-buttons .mode-button small{
      display:block!important;
      margin-top:3px!important;
      color:#aeb8c1!important;
      font-size:7px!important;
      letter-spacing:1.5px!important;
    }

    #titleScreen.bb-title-menu-restored #onePlayerButton{order:1!important}
    #titleScreen.bb-title-menu-restored #twoPlayerButton{order:2!important}
    #titleScreen.bb-title-menu-restored .bb-online-lazy-button,
    #titleScreen.bb-title-menu-restored #onlineButton{order:3!important;border-color:#4fc3ff!important}
    #titleScreen.bb-title-menu-restored .bb-warfare-launch-button{
      order:4!important;
      border-color:#7089ff!important;
      background:linear-gradient(180deg,#20355c,#101a31)!important;
    }

    #titleScreen.bb-title-menu-restored .mode-buttons .mode-button.selected{
      border-color:#ffd529!important;
      box-shadow:0 0 15px rgba(255,213,41,.58),0 4px 0 rgba(0,0,0,.28)!important;
    }

    #titleScreen.bb-title-menu-restored .mode-buttons .mode-button:hover,
    #titleScreen.bb-title-menu-restored .mode-buttons .mode-button:focus-visible{
      filter:brightness(1.12)!important;
      transform:translateY(-1px)!important;
      outline:none!important;
    }

    #titleScreen.bb-title-menu-restored #startButton{
      position:static!important;
      width:220px!important;
      min-width:220px!important;
      min-height:43px!important;
      margin:0!important;
      padding:8px 30px!important;
      border-radius:7px!important;
      font-size:18px!important;
      transform:none!important;
    }

    /* Martin is surfaced through the Challenges feature card/hub now.
       Keep the original button in the DOM because the integration uses its
       existing click handler to launch the boss challenge. */
    #titleScreen.bb-title-menu-restored #martinChallengeButton{
      display:none!important;
    }

    /* V11 used to create these large cards. Never allow a stale copy to
       remain visible if a browser restores DOM state during navigation. */
    #titleScreen.bb-title-menu-restored .bb-mode-launcher,
    #titleScreen.bb-title-menu-restored .bb-mode-card{
      display:none!important;
    }

    @media(max-height:780px){
      #titleScreen.bb-title-menu-restored .title-content{
        grid-template-rows:auto auto minmax(205px,1fr) auto!important;
        padding-top:7px!important;
        padding-bottom:8px!important;
      }
      #titleScreen.bb-title-menu-restored .title-versus-panel{transform:translateY(0)!important}
      #titleScreen.bb-title-menu-restored .mode-buttons .mode-button{min-height:48px!important;padding-top:6px!important;padding-bottom:6px!important}
      #titleScreen.bb-title-menu-restored #startButton{min-height:39px!important;padding-top:6px!important;padding-bottom:6px!important}
    }

    @media(max-width:720px){
      #titleScreen.bb-title-menu-restored .title-content{overflow:auto!important;grid-template-rows:auto auto auto auto!important}
      #titleScreen.bb-title-menu-restored .title-versus-panel{grid-row:3!important;transform:none!important;min-height:210px!important}
      #titleScreen.bb-title-menu-restored .bb-title-controls{grid-row:4!important;width:96vw!important;padding-bottom:10px!important}
      #titleScreen.bb-title-menu-restored .mode-buttons{display:grid!important;grid-template-columns:1fr 1fr!important}
      #titleScreen.bb-title-menu-restored .mode-buttons .mode-button{max-width:none!important}
    }
  `;
  document.head.appendChild(style);

  let controls = content.querySelector('.bb-title-controls');
  if (!controls) {
    controls = document.createElement('div');
    controls.className = 'bb-title-controls';
    content.appendChild(controls);
  }

  controls.append(modeTitle, modeWrap, start);
  modeTitle.textContent = 'CHOOSE MODE';

  let warfare = modeWrap.querySelector('.bb-warfare-launch-button');
  if (!warfare) {
    warfare = document.createElement('button');
    warfare.type = 'button';
    warfare.className = 'mode-button bb-warfare-launch-button';
    warfare.innerHTML = 'WARFARE<small>3D ARENA</small>';
    warfare.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      window.location.href = 'warfare.html';
    });
    modeWrap.appendChild(warfare);
  }

  /* Keep original classic mode behavior untouched. */
  one.type = 'button';
  two.type = 'button';
  if (versus) versus.style.gridRow = '3';

  /* Remove any card launcher produced by a prior in-page execution. */
  content.querySelectorAll('.bb-mode-launcher').forEach(node => node.remove());
})();