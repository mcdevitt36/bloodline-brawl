import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/* BLOODLINE BRAWL — WARFARE OPENING FLOW V29
   - 20 second post-countdown spawn protection
   - Bots remain passive/frozen during protection
   - Bots re-enter combat gradually after protection ends
   - Human movement gets a clean +20% speed boost without replacing core movement
*/

const previousRender = THREE.WebGLRenderer.prototype.render;
const sceneState = new WeakMap();
const keyState = new Set();
const MATCH_BACKGROUNDS = new Set([0x020711, 0x080d20, 0x091226, 0x111d44]);

function actors(scene) {
  const out = [];
  scene?.traverse(obj => {
    const actor = obj.userData?.actor;
    if (actor && !out.includes(actor)) out.push(actor);
  });
  return out;
}

function human(scene) {
  return actors(scene).find(actor => !actor.isBot) || null;
}

function bots(scene) {
  return actors(scene).filter(actor => actor.isBot);
}

function isMatch(scene) {
  const hex = scene?.background?.isColor ? scene.background.getHex() : 0;
  return MATCH_BACKGROUNDS.has(hex);
}

function movementHeld() {
  return keyState.has('KeyW') || keyState.has('KeyA') || keyState.has('KeyS') || keyState.has('KeyD') ||
         keyState.has('ArrowUp') || keyState.has('ArrowLeft') || keyState.has('ArrowDown') || keyState.has('ArrowRight');
}

function ensureOverlay() {
  let wrap = document.getElementById('bbSpawnProtection');
  if (wrap) return wrap;

  wrap = document.createElement('div');
  wrap.id = 'bbSpawnProtection';
  wrap.innerHTML = `
    <div class="bb-spawn-protection-label">SPAWN PROTECTION</div>
    <div class="bb-spawn-protection-time">20</div>
    <div class="bb-spawn-protection-note">LOOK AROUND • MOVE • FIND A WEAPON</div>
  `;

  Object.assign(wrap.style, {
    position: 'fixed',
    left: '50%',
    top: '88px',
    transform: 'translateX(-50%)',
    zIndex: '45',
    minWidth: '250px',
    padding: '10px 16px 9px',
    border: '2px solid rgba(108,184,255,.72)',
    borderRadius: '10px',
    background: 'linear-gradient(180deg,rgba(8,24,40,.94),rgba(4,13,24,.92))',
    boxShadow: '0 8px 28px rgba(0,0,0,.35),0 0 22px rgba(72,154,255,.18)',
    color: '#fff',
    textAlign: 'center',
    pointerEvents: 'none',
    fontFamily: 'Arial,sans-serif'
  });

  const label = wrap.querySelector('.bb-spawn-protection-label');
  const time = wrap.querySelector('.bb-spawn-protection-time');
  const note = wrap.querySelector('.bb-spawn-protection-note');
  Object.assign(label.style,{fontSize:'9px',fontWeight:'1000',letterSpacing:'2.4px',color:'#70c8ff'});
  Object.assign(time.style,{fontSize:'28px',lineHeight:'1',fontWeight:'1000',margin:'2px 0'});
  Object.assign(note.style,{fontSize:'8px',fontWeight:'900',letterSpacing:'1.4px',color:'#b8cad8'});

  document.body.appendChild(wrap);
  return wrap;
}

function hideOverlay() {
  document.getElementById('bbSpawnProtection')?.remove();
}

function showReadyOverlay() {
  const wrap = ensureOverlay();
  wrap.querySelector('.bb-spawn-protection-label').textContent = 'GET READY';
  wrap.querySelector('.bb-spawn-protection-time').textContent = '—';
  wrap.querySelector('.bb-spawn-protection-note').textContent = 'YOU CAN MOVE AND LOOK AROUND NOW';
}

function showProtection(seconds) {
  const wrap = ensureOverlay();
  wrap.querySelector('.bb-spawn-protection-label').textContent = 'SPAWN PROTECTION';
  wrap.querySelector('.bb-spawn-protection-time').textContent = String(Math.max(0, Math.ceil(seconds)));
  wrap.querySelector('.bb-spawn-protection-note').textContent = 'LOOK AROUND • MOVE • FIND A WEAPON';
}

function initSceneState(scene, player, enemyList) {
  const now = performance.now();
  const state = {
    player,
    phase: 'countdown',
    protectionEndsAt: 0,
    lastPlayerPos: player.mesh.position.clone(),
    botAnchors: new Map(),
    botReleaseTimes: new Map(),
    announced: false,
    finished: false
  };

  enemyList.forEach(bot => {
    state.botAnchors.set(bot, bot.mesh.position.clone());
    bot.target = null;
    bot.thinkAt = now + 60000;
    bot.lastShot = now + 60000;
  });

  player.spawnProtection = Math.max(player.spawnProtection || 0, 999);
  sceneState.set(scene, state);
  showReadyOverlay();
  return state;
}

function freezeBot(bot, state, now) {
  const anchor = state.botAnchors.get(bot);
  if (anchor && !bot.dead) bot.mesh.position.copy(anchor);
  bot.target = null;
  bot.velocity?.set?.(0, 0, 0);
  bot.thinkAt = Math.max(bot.thinkAt || 0, now + 220);
  bot.lastShot = Math.max(bot.lastShot || 0, now + 220);
}

function beginProtection(state, enemyList, now) {
  state.phase = 'protected';
  state.protectionEndsAt = now + 20000;
  state.announced = true;
  state.botReleaseTimes.clear();
  enemyList.forEach((bot, index) => {
    state.botReleaseTimes.set(bot, state.protectionEndsAt + index * 1700);
  });
  state.player.spawnProtection = 20;

  const feed = document.getElementById('feed');
  if (feed) {
    const item = document.createElement('div');
    item.className = 'feed-item';
    item.textContent = 'Spawn protection active • 20 seconds to gear up';
    feed.prepend(item);
    setTimeout(() => item.remove(), 4500);
  }
}

function applyMovementBoost(state, player) {
  const current = player.mesh.position.clone();
  const delta = current.clone().sub(state.lastPlayerPos);
  const horizontal = new THREE.Vector3(delta.x, 0, delta.z);
  const distance = horizontal.length();

  if (movementHeld() && !player.dead && distance > 0.0001 && distance < 0.5) {
    player.mesh.position.addScaledVector(horizontal, 0.20);
    current.copy(player.mesh.position);
  }

  state.lastPlayerPos.copy(current);
}

function updateOpening(scene, camera) {
  if (!isMatch(scene)) {
    hideOverlay();
    return;
  }

  const player = human(scene);
  if (!player) return;
  const enemyList = bots(scene);
  const now = performance.now();
  let state = sceneState.get(scene);
  if (!state || state.player !== player) state = initSceneState(scene, player, enemyList);

  applyMovementBoost(state, player);

  const intro = document.getElementById('matchIntro');
  const countdownVisible = !!intro && !intro.classList.contains('hidden');

  if (state.phase === 'countdown') {
    player.spawnProtection = Math.max(player.spawnProtection || 0, 999);
    enemyList.forEach(bot => freezeBot(bot, state, now));
    showReadyOverlay();
    if (!countdownVisible) beginProtection(state, enemyList, now);
    return;
  }

  if (state.phase === 'protected') {
    const remaining = Math.max(0, (state.protectionEndsAt - now) / 1000);
    player.spawnProtection = Math.max(player.spawnProtection || 0, remaining);
    enemyList.forEach(bot => freezeBot(bot, state, now));
    showProtection(remaining);

    if (remaining <= 0) {
      state.phase = 'release';
      hideOverlay();
      const feed = document.getElementById('feed');
      if (feed) {
        const item = document.createElement('div');
        item.className = 'feed-item';
        item.textContent = 'Protection ended • enemies entering the fight';
        feed.prepend(item);
        setTimeout(() => item.remove(), 4200);
      }
    }
    return;
  }

  if (state.phase === 'release') {
    player.spawnProtection = Math.max(0, player.spawnProtection || 0);
    let waiting = 0;
    enemyList.forEach(bot => {
      const releaseAt = state.botReleaseTimes.get(bot) || state.protectionEndsAt;
      if (now < releaseAt) {
        freezeBot(bot, state, now);
        waiting++;
      } else if ((bot.thinkAt || 0) > now + 1000) {
        bot.thinkAt = now;
        bot.lastShot = now;
      }
    });
    if (!waiting) state.phase = 'live';
  }
}

document.addEventListener('keydown', event => {
  keyState.add(event.code);
}, true);

document.addEventListener('keyup', event => {
  keyState.delete(event.code);
}, true);

window.addEventListener('blur', () => keyState.clear());

THREE.WebGLRenderer.prototype.render = function(scene, camera) {
  updateOpening(scene, camera);
  return previousRender.call(this, scene, camera);
};

window.__bbWarfareOpeningFlowV29 = {
  version: 29,
  protectionSeconds: 20,
  movementMultiplier: 1.20,
  staggerMs: 1700
};
