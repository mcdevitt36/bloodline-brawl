/* BLOODLINE BRAWL — WARFARE V6 LOADER
   Fresh-load authority for the major Warfare overhaul.
   - every module receives a new build cache key
   - one failed enhancement can no longer cancel the rest of the module chain
   - exposes visible/runtime build state for deployment verification
*/

const BUILD = '36';
const failures = [];

window.__bbWarfareBuild = `V${BUILD}`;
window.__bbWarfareModuleFailures = failures;
document.documentElement.dataset.warfareBuild = BUILD;

function ensureBadge() {
  let badge = document.getElementById('warfareBuildBadge');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'warfareBuildBadge';
    const panel = document.querySelector('#bootScreen .boot-panel') || document.body;
    panel.appendChild(badge);
  }
  Object.assign(badge.style, {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    margin: '0 auto 12px',
    padding: '6px 10px',
    border: '1px solid rgba(97,203,255,.55)',
    borderRadius: '999px',
    background: 'rgba(6,24,39,.86)',
    color: '#8edcff',
    font: '900 9px/1 Arial,sans-serif',
    letterSpacing: '1.4px',
    boxShadow: '0 5px 18px rgba(0,0,0,.22)',
    position: 'relative',
    zIndex: '9999'
  });
  badge.textContent = `OVERHAUL V${BUILD} • LOADING`;
  return badge;
}

const badge = ensureBadge();

const modules = [
  './warfare-weapon-polish-v5.js?v=1',
  './warfare-map-polish-v5.js?v=1',
  './warfare-interactive-v7.js?v=1',
  './warfare-character-polish-v8.js?v=1',
  './warfare-character-appearance-v22.js?v=1',
  './warfare-hair-upgrade-v23.js?v=1',
  './warfare-classic-identity-v24.js?v=3',
  './warfare-specials-v9.js?v=1',
  './warfare-hub-polish-v10.js?v=1',
  './warfare-keyboard-fire-v11.js?v=1',
  './warfare-scroll-lock-v12.js?v=1',
  './warfare-smoothing-v13.js?v=2',
  './warfare-crouch-v14.js?v=3',
  './warfare-loot-cover-v15.js?v=4',
  './warfare-stability-v17.js?v=1',
  './warfare-vertical-combat-v16.js?v=1',
  './warfare-map-state-compat-v27.js?v=1',
  './warfare-sky-v18.js?v=2',
  './warfare-hub-amenities-v19.js?v=1',
  './warfare-gameplay-audio-v20.js?v=3',
  './warfare-combat-feedback-v21.js?v=2',
  './warfare-classic-sync-v26.js?v=1',
  './warfare-unified-polish-v25.js?v=2',
  './warfare-ui-state-v28.js?v=2',
  './warfare-gameplay-v12.js?v=1',
  './warfare-v4.js?v=2',
  './warfare-comprehensive-polish-v30.js?v=1',
  './warfare-v30-hardening-v31.js?v=3',
  './warfare-combat-hardfix-v32.js?v=1',
  './warfare-character-body-v33.js?v=1',
  './warfare-master-overhaul-v34.js?v=1',
  './warfare-countdown-authority-v35.js?v=1'
];

for (const source of modules) {
  const separator = source.includes('?') ? '&' : '?';
  const freshSource = `${source}${separator}build=${BUILD}`;
  try {
    await import(freshSource);
  } catch (error) {
    failures.push({ source, message: error?.message || String(error) });
    console.error(`[WARFARE V${BUILD}] module failed: ${source}`, error);
  }
}

if (failures.length) {
  badge.textContent = `OVERHAUL V${BUILD} • ${failures.length} MODULE ISSUE${failures.length === 1 ? '' : 'S'}`;
  badge.style.color = '#ffd08a';
  badge.style.borderColor = 'rgba(255,169,77,.7)';
  badge.style.background = 'rgba(48,27,8,.88)';
} else {
  badge.textContent = `OVERHAUL V${BUILD} • GAME-UPDATES LIVE`;
  badge.style.color = '#9cf4c8';
  badge.style.borderColor = 'rgba(78,226,151,.65)';
  badge.style.background = 'rgba(7,40,27,.88)';
}

window.dispatchEvent(new CustomEvent('bb-warfare-build-ready', {
  detail: { build: BUILD, failures: failures.slice() }
}));
