/* BLOODLINE BRAWL — MODE LAUNCHER V11 */
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
  if (!title || !content || !one || !two || !start || !martin) return;

  const style = document.createElement('style');
  style.textContent = `
    #titleScreen .title-content{width:min(1220px,96vw)!important;height:min(900px,96vh)!important;display:grid!important;grid-template-rows:auto auto minmax(150px,1fr) auto!important;align-items:start!important;gap:10px!important;padding:18px 26px 22px!important}
    #titleScreen .game-logo{margin:0!important;line-height:.86!important}
    #titleScreen .tagline{margin:0!important}
    #titleScreen .title-versus-panel{grid-row:3!important;align-self:center!important;transform:translateY(-6px)!important;max-height:300px!important;margin:0 auto!important}
    #titleScreen .bb-mode-launcher{grid-row:4;display:grid;grid-template-columns:1.2fr 1fr .9fr;gap:14px;width:100%;align-items:stretch}
    #titleScreen .bb-mode-card{position:relative;min-height:176px;padding:18px;border:1px solid rgba(255,255,255,.15);border-radius:24px;background:linear-gradient(180deg,rgba(17,24,36,.94),rgba(7,10,17,.96));box-shadow:0 18px 50px rgba(0,0,0,.34);overflow:hidden;text-align:left}
    #titleScreen .bb-mode-card::before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 85% 0,rgba(255,255,255,.11),transparent 40%)}
    #titleScreen .bb-mode-card.classic{border-color:rgba(255,184,72,.38)}
    #titleScreen .bb-mode-card.warfare{border-color:rgba(92,145,255,.5);background:linear-gradient(160deg,rgba(17,31,60,.97),rgba(7,11,22,.97))}
    #titleScreen .bb-mode-card.challenge{border-color:rgba(233,80,92,.45)}
    #titleScreen .bb-card-kicker{font-size:10px;letter-spacing:.22em;font-weight:900;color:#aab5c7;margin-bottom:5px}
    #titleScreen .bb-mode-card h3{margin:0 0 5px;font-size:clamp(22px,2.2vw,34px);letter-spacing:-.04em;color:#fff}
    #titleScreen .bb-mode-card p{margin:0 0 12px;color:#aeb8c8;font-size:12px;line-height:1.35;max-width:34ch}
    #titleScreen .bb-classic-controls{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}
    #titleScreen .bb-classic-controls .mode-button{min-height:52px!important;margin:0!important;border-radius:12px!important;font-size:13px!important}
    #titleScreen .bb-classic-controls .mode-button small{font-size:9px!important}
    #titleScreen #startButton{position:static!important;display:block!important;width:100%!important;margin:8px 0 0!important;min-height:46px!important;border-radius:13px!important;transform:none!important}
    #titleScreen .bb-warfare-button{position:relative;z-index:2;width:100%;min-height:58px;margin-top:18px;border:0;border-radius:15px;background:linear-gradient(135deg,#4778ef,#7958ff);color:#fff;font-weight:1000;letter-spacing:.08em;box-shadow:0 12px 30px rgba(66,104,230,.35);cursor:pointer}
    #titleScreen .bb-warfare-preview{height:48px;margin:4px 0 8px;border-radius:12px;background:linear-gradient(90deg,#0e1d35,#263d68 52%,#10162a);position:relative;overflow:hidden}
    #titleScreen .bb-warfare-preview::before{content:"HAUNTED HOUSE   •   CITY ROOFTOP";position:absolute;inset:0;display:grid;place-items:center;font-size:9px;font-weight:900;letter-spacing:.13em;color:#d8e2ff;text-shadow:0 2px 10px #000}
    #titleScreen #martinChallengeButton{position:static!important;width:100%!important;margin:28px 0 0!important;min-height:58px!important;border-radius:15px!important;transform:none!important}
    #titleScreen .mode-title,#titleScreen>.mode-title,#titleScreen .title-content>.mode-buttons,#titleScreen .title-content>#startButton,#titleScreen .title-content>#martinChallengeButton{margin:0}
    @media(max-width:900px){#titleScreen .bb-mode-launcher{grid-template-columns:1fr 1fr}.bb-mode-card.challenge{grid-column:1/-1}#titleScreen .title-versus-panel{transform:none!important;max-height:220px!important}}
    @media(max-width:620px){#titleScreen .bb-mode-launcher{grid-template-columns:1fr}#titleScreen .bb-mode-card{min-height:auto}#titleScreen .title-versus-panel{display:none!important}#titleScreen .title-content{grid-template-rows:auto auto auto!important;overflow:auto!important}.bb-mode-card.challenge{grid-column:auto}}
  `;
  document.head.appendChild(style);

  const oldModeTitle = content.querySelector('.mode-title');
  const oldModeWrap = content.querySelector('.mode-buttons');

  const launcher = document.createElement('div');
  launcher.className = 'bb-mode-launcher';

  const classic = document.createElement('section');
  classic.className = 'bb-mode-card classic';
  classic.innerHTML = '<div class="bb-card-kicker">ORIGINAL MODE</div><h3>CLASSIC BRAWL</h3><p>Pick a fighter and settle it the old-fashioned Bloodline way.</p><div class="bb-classic-controls"></div>';
  const classicControls = classic.querySelector('.bb-classic-controls');
  classicControls.append(one, two);
  classic.append(start);

  const warfare = document.createElement('section');
  warfare.className = 'bb-mode-card warfare';
  warfare.innerHTML = '<div class="bb-card-kicker">NEW 3D MODE</div><h3>WARFARE</h3><p>Explore the hub, hunt for weapons, and battle seven opponents in 3D.</p><div class="bb-warfare-preview"></div><button class="bb-warfare-button" type="button">ENTER WARFARE</button>';
  warfare.querySelector('.bb-warfare-button').addEventListener('click', () => { window.location.href = 'warfare.html'; });

  const challenge = document.createElement('section');
  challenge.className = 'bb-mode-card challenge';
  challenge.innerHTML = '<div class="bb-card-kicker">SPECIAL MODE</div><h3>MARTIN\'S CHALLENGE</h3><p>Take on the boss fight, earn the unlock, and prove who runs the family.</p>';
  challenge.append(martin);

  launcher.append(classic, warfare, challenge);
  content.appendChild(launcher);
  oldModeTitle?.remove();
  oldModeWrap?.remove();

  if (versus) versus.style.gridRow = '3';
})();