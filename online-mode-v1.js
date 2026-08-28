/* =====================================================
   BLOODLINE BRAWL — ONLINE MODE V1
   Additive family-only WebRTC mode using PeerJS Cloud signaling.
   - ONLINE title option -> Create Game / Join Game
   - Short 4-character join code
   - Host is authoritative for combat state
   - Guest uses the same WASD/Q/R/E/F controls on their own device
   - Character picks, map choice, rounds, celebrations and results sync
===================================================== */

(() => {
  if (window.__bbOnlineModeV1Loaded) return;
  window.__bbOnlineModeV1Loaded = true;

  const PEER_SRC = "https://unpkg.com/peerjs@1.5.5/dist/peerjs.min.js";
  const PEER_PREFIX = "bloodline-brawl-family-";
  const CODE_CHARS = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

  let onlineActive = false;
  let onlineRole = null;
  let peer = null;
  let connection = null;
  let roomCode = "";
  let intentionalDisconnect = false;
  let reconnectAttempt = 0;
  let guestHeld = { left: false, right: false };
  let guestPredictedHeld = { left: false, right: false };
  let replayingRemoteAction = false;
  let stateTimer = null;
  let resultSyncTimer = null;
  let joinTimeout = null;

  const game = document.getElementById("game");
  const modeButtons = document.querySelector(".mode-buttons");
  if (!game || !modeButtons) return;

  const style = document.createElement("style");
  style.textContent = `
    .mode-buttons.bb-online-mode-ready { gap:5px!important; }
    .mode-buttons.bb-online-mode-ready .mode-button { min-width:104px!important; padding-left:8px!important; padding-right:8px!important; }
    .bb-online-mode-button { border-color:#4fc3ff!important; }
    .bb-online-mode-button:hover { box-shadow:0 0 16px rgba(79,195,255,.55); }
    .bb-online-screen { position:relative; overflow:hidden; background:radial-gradient(circle at 50% 8%,rgba(79,195,255,.20),transparent 30%),linear-gradient(180deg,#173c59,#09131d 72%)!important; }
    .bb-online-screen::before { content:""; position:absolute; inset:0; pointer-events:none; background:repeating-linear-gradient(90deg,rgba(255,255,255,.025) 0 1px,transparent 1px 54px),repeating-linear-gradient(0deg,rgba(255,255,255,.02) 0 1px,transparent 1px 54px); }
    .bb-online-shell { position:relative; z-index:2; width:min(720px,92vw); padding:28px; border:4px solid #111; border-radius:12px; background:linear-gradient(180deg,rgba(24,58,82,.97),rgba(7,18,28,.98)); box-shadow:0 10px 0 rgba(0,0,0,.30),0 0 0 3px rgba(79,195,255,.14); text-align:center; color:#fff; }
    .bb-online-kicker { color:#63d4ff; font:1000 11px Arial,sans-serif; letter-spacing:4px; margin-bottom:5px; }
    .bb-online-title { margin:0; font:1000 clamp(36px,7vw,62px)/.95 Impact,"Arial Black",sans-serif; color:#ffd83d; text-shadow:5px 5px #111; }
    .bb-online-subtitle { margin:10px auto 20px; max-width:520px; color:#bfd2de; font:800 13px Arial,sans-serif; letter-spacing:.5px; line-height:1.45; }
    .bb-online-choice-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    .bb-online-choice,.bb-online-action,.bb-online-back,.bb-online-copy { border:3px solid #111; border-radius:8px; font-family:Arial,sans-serif; font-weight:1000; cursor:pointer; box-shadow:0 5px 0 rgba(0,0,0,.28); }
    .bb-online-choice { min-height:74px; font-size:18px; letter-spacing:1px; }
    .bb-online-create { background:#ffd83d; color:#111; }
    .bb-online-join { background:#e84a42; color:#fff; }
    .bb-online-choice small { display:block; margin-top:4px; font-size:9px; letter-spacing:2px; opacity:.78; }
    .bb-online-panel { display:none; margin-top:16px; padding:16px; border:2px solid rgba(255,255,255,.10); border-radius:9px; background:rgba(0,0,0,.20); }
    .bb-online-panel.bb-online-open { display:block; }
    .bb-online-code-label { color:#9fb8c8; font:1000 10px Arial,sans-serif; letter-spacing:3px; }
    .bb-online-code { margin:7px 0 11px; color:#fff; font:1000 clamp(44px,9vw,70px)/1 Impact,"Arial Black",sans-serif; letter-spacing:10px; text-shadow:0 4px #111,0 0 18px rgba(79,195,255,.35); }
    .bb-online-code-row { display:flex; justify-content:center; gap:8px; flex-wrap:wrap; }
    .bb-online-copy,.bb-online-action { min-height:44px; padding:8px 17px; background:#2b536e; color:#fff; font-size:12px; letter-spacing:1px; }
    .bb-online-code-input { width:min(280px,75vw); height:58px; box-sizing:border-box; border:4px solid #111; border-radius:8px; background:#f4f7f8; color:#111; text-align:center; text-transform:uppercase; font:1000 30px Arial,sans-serif; letter-spacing:8px; outline:none; }
    .bb-online-code-input:focus { border-color:#63d4ff; box-shadow:0 0 0 3px rgba(99,212,255,.18); }
    .bb-online-status { min-height:21px; margin-top:12px; color:#c8d8e2; font:900 12px Arial,sans-serif; letter-spacing:.5px; }
    .bb-online-status.bb-online-good { color:#76e78a; }
    .bb-online-status.bb-online-bad { color:#ff7770; }
    .bb-online-back { margin-top:18px; min-height:40px; padding:7px 16px; background:#172835; color:#cbd8df; font-size:11px; letter-spacing:1px; }
    .bb-online-screen button:hover { transform:translateY(-1px); filter:brightness(1.06); }
    .bb-online-wait-note { margin-top:8px; color:#8fa8b7; font:800 10px Arial,sans-serif; letter-spacing:1px; }
    .bb-online-fight-guide { position:absolute; left:50%; bottom:8px; transform:translateX(-50%); z-index:420; padding:6px 11px; border:2px solid rgba(255,255,255,.15); border-radius:7px; background:rgba(5,12,18,.78); color:#e7f0f5; font:900 10px Arial,sans-serif; letter-spacing:.8px; white-space:nowrap; pointer-events:none; }
    .bb-online-connection-lost { position:absolute; inset:0; z-index:1400; display:flex; align-items:center; justify-content:center; background:rgba(3,8,12,.88); }
    .bb-online-lost-card { width:min(430px,86vw); padding:22px; border:4px solid #111; border-radius:10px; background:#172b3a; color:#fff; text-align:center; box-shadow:0 0 0 3px rgba(232,74,66,.35); }
    .bb-online-lost-card strong { display:block; color:#ff766f; font:1000 28px Impact,"Arial Black",sans-serif; letter-spacing:1px; margin-bottom:7px; }
    .bb-online-lost-card button { margin-top:15px; min-height:44px; padding:8px 18px; border:3px solid #111; border-radius:7px; background:#ffd83d; color:#111; font-weight:1000; cursor:pointer; }
    @media (max-width:700px) {
      .mode-buttons.bb-online-mode-ready .mode-button { min-width:92px!important; font-size:11px!important; }
      .bb-online-choice-row { grid-template-columns:1fr; }
      .bb-online-shell { padding:20px 15px; }
      .bb-online-fight-guide { max-width:94vw; overflow:hidden; text-overflow:ellipsis; }
    }
  `;
  document.head.appendChild(style);

  modeButtons.classList.add("bb-online-mode-ready");
  const onlineButton = document.createElement("button");
  onlineButton.id = "onlineButton";
  onlineButton.className = "mode-button bb-online-mode-button";
  onlineButton.innerHTML = `ONLINE<small>PRIVATE MATCH</small>`;
  modeButtons.appendChild(onlineButton);

  const onlineScreen = document.createElement("section");
  onlineScreen.id = "onlineScreen";
  onlineScreen.className = "screen bb-online-screen";
  onlineScreen.innerHTML = `
    <div class="bb-online-shell">
      <div class="bb-online-kicker">PRIVATE FAMILY BATTLE</div>
      <h2 class="bb-online-title">ONLINE</h2>
      <div class="bb-online-subtitle">Create a game, send the short code to a family member, and fight from two different browsers.</div>
      <div class="bb-online-choice-row">
        <button class="bb-online-choice bb-online-create" type="button">CREATE GAME<small>GET A JOIN CODE</small></button>
        <button class="bb-online-choice bb-online-join" type="button">JOIN GAME<small>ENTER A CODE</small></button>
      </div>
      <div class="bb-online-panel bb-online-create-panel">
        <div class="bb-online-code-label">YOUR JOIN CODE</div>
        <div class="bb-online-code">----</div>
        <div class="bb-online-code-row"><button class="bb-online-copy" type="button">COPY CODE</button></div>
        <div class="bb-online-status">Creating private game...</div>
        <div class="bb-online-wait-note">Keep this page open while your family member joins.</div>
      </div>
      <div class="bb-online-panel bb-online-join-panel">
        <div class="bb-online-code-label">ENTER JOIN CODE</div>
        <div style="margin:10px 0 12px"><input class="bb-online-code-input" maxlength="4" autocomplete="off" spellcheck="false" inputmode="text" aria-label="Join code"></div>
        <button class="bb-online-action bb-online-join-submit" type="button">JOIN</button>
        <div class="bb-online-status">Enter the 4-character code from the host.</div>
      </div>
      <button class="bb-online-back" type="button">BACK TO MENU</button>
    </div>
  `;
  game.appendChild(onlineScreen);

  const createChoice = onlineScreen.querySelector(".bb-online-create");
  const joinChoice = onlineScreen.querySelector(".bb-online-join");
  const createPanel = onlineScreen.querySelector(".bb-online-create-panel");
  const joinPanel = onlineScreen.querySelector(".bb-online-join-panel");
  const codeEl = onlineScreen.querySelector(".bb-online-code");
  const joinInput = onlineScreen.querySelector(".bb-online-code-input");
  const joinSubmit = onlineScreen.querySelector(".bb-online-join-submit");
  const copyButton = onlineScreen.querySelector(".bb-online-copy");
  const backButton = onlineScreen.querySelector(".bb-online-back");

  function panelStatus(panel, text, kind = "") {
    const status = panel.querySelector(".bb-online-status");
    if (!status) return;
    status.textContent = text;
    status.classList.toggle("bb-online-good", kind === "good");
    status.classList.toggle("bb-online-bad", kind === "bad");
  }

  function generateCode() {
    let code = "";
    for (let i = 0; i < 4; i++) code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
    return code;
  }

  function normalizeCode(value) {
    return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4);
  }

  function ensurePeerJS() {
    if (window.Peer) return Promise.resolve(window.Peer);
    if (window.__bbPeerJSPromise) return window.__bbPeerJSPromise;
    window.__bbPeerJSPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = PEER_SRC;
      script.async = true;
      script.onload = () => window.Peer ? resolve(window.Peer) : reject(new Error("PeerJS unavailable"));
      script.onerror = () => reject(new Error("Could not load online connection library"));
      document.head.appendChild(script);
    });
    return window.__bbPeerJSPromise;
  }

  function send(message) {
    if (!connection || !connection.open) return false;
    try { connection.send(message); return true; } catch (_) { return false; }
  }

  function clearNetworkLoops() {
    if (stateTimer) { clearInterval(stateTimer); stateTimer = null; }
    if (resultSyncTimer) { clearInterval(resultSyncTimer); resultSyncTimer = null; }
    if (joinTimeout) { clearTimeout(joinTimeout); joinTimeout = null; }
  }

  function removeOnlineGuide() { document.querySelectorAll(".bb-online-fight-guide").forEach(el => el.remove()); }

  function addOnlineGuide() {
    removeOnlineGuide();
    const guide = document.createElement("div");
    guide.className = "bb-online-fight-guide";
    guide.textContent = onlineRole === "host"
      ? "YOU ARE P1  •  A/D MOVE  •  W JUMP  •  Q BLOCK  •  R ATTACK  •  E SPECIAL  •  F ULTIMATE"
      : "YOU ARE P2  •  A/D OR ←/→ MOVE  •  W/↑/SPACE JUMP  •  Q BLOCK  •  R ATTACK  •  E SPECIAL  •  F ULTIMATE";
    fightScreen.appendChild(guide);
  }

  function removeConnectionLost() { document.querySelectorAll(".bb-online-connection-lost").forEach(el => el.remove()); }

  function showConnectionLost() {
    if (intentionalDisconnect || !onlineActive) return;
    actionLock = true;
    removeConnectionLost();
    const overlay = document.createElement("div");
    overlay.className = "bb-online-connection-lost";
    overlay.innerHTML = `<div class="bb-online-lost-card"><strong>CONNECTION LOST</strong><div>The other player disconnected. You can return to the menu and create a new game.</div><button type="button">MAIN MENU</button></div>`;
    fightScreen.appendChild(overlay);
    overlay.querySelector("button").onclick = () => exitOnlineToMenu();
  }

  function closePeerObjects() {
    try { connection?.close(); } catch (_) {}
    try { peer?.destroy(); } catch (_) {}
    connection = null;
    peer = null;
  }

  function resetOnlineFlags() {
    onlineActive = false;
    onlineRole = null;
    roomCode = "";
    reconnectAttempt = 0;
    guestHeld.left = false;
    guestHeld.right = false;
    guestPredictedHeld.left = false;
    guestPredictedHeld.right = false;
    keys["a"] = false;
    keys["d"] = false;
    keys["arrowleft"] = false;
    keys["arrowright"] = false;
    removeOnlineGuide();
    removeConnectionLost();
    document.body.classList.remove("bb-online-active", "bb-online-host", "bb-online-guest");
  }

  function disconnectOnline() {
    intentionalDisconnect = true;
    clearNetworkLoops();
    closePeerObjects();
    resetOnlineFlags();
    setTimeout(() => { intentionalDisconnect = false; }, 50);
  }

  function exitOnlineToMenu() {
    disconnectOnline();
    challengeMode = false;
    challengeResult = null;
    try { resetSelection(); } catch (_) {}
    setGameMode("1P");
    onlineButton.classList.remove("selected");
    showScreen(titleScreen);
  }

  function openOnlineLobby() {
    disconnectOnline();
    onePlayerButton.classList.remove("selected");
    twoPlayerButton.classList.remove("selected");
    onlineButton.classList.add("selected");
    createPanel.classList.remove("bb-online-open");
    joinPanel.classList.remove("bb-online-open");
    codeEl.textContent = "----";
    joinInput.value = "";
    panelStatus(createPanel, "Creating private game...");
    panelStatus(joinPanel, "Enter the 4-character code from the host.");
    showScreen(onlineScreen);
  }

  function markOnlineConnected(role) {
    onlineActive = true;
    onlineRole = role;
    gameMode = "2P";
    challengeMode = false;
    challengeResult = null;
    document.body.classList.add("bb-online-active");
    document.body.classList.toggle("bb-online-host", role === "host");
    document.body.classList.toggle("bb-online-guest", role === "guest");
    onePlayerButton.classList.remove("selected");
    twoPlayerButton.classList.remove("selected");
    onlineButton.classList.add("selected");
    startNetworkLoops();
    enterOnlineCharacterSelect(true);
  }

  function setupConnection(conn, role) {
    if (!conn) return;
    if (connection && connection.open) { try { conn.close(); } catch (_) {} return; }
    connection = conn;
    conn.on("open", () => {
      if (joinTimeout) { clearTimeout(joinTimeout); joinTimeout = null; }
      if (role === "host") panelStatus(createPanel, "PLAYER 2 CONNECTED!", "good");
      else panelStatus(joinPanel, "CONNECTED!", "good");
      conn.send({ type: "hello", version: 1 });
      setTimeout(() => markOnlineConnected(role), 400);
    });
    conn.on("data", data => handleMessage(data));
    conn.on("close", () => { if (!intentionalDisconnect) showConnectionLost(); });
    conn.on("error", () => { if (!intentionalDisconnect) showConnectionLost(); });
  }

  async function createOnlineGame() {
    createPanel.classList.add("bb-online-open");
    joinPanel.classList.remove("bb-online-open");
    createChoice.disabled = true;
    joinChoice.disabled = false;
    intentionalDisconnect = true;
    clearNetworkLoops();
    closePeerObjects();
    resetOnlineFlags();
    intentionalDisconnect = false;
    try { await ensurePeerJS(); }
    catch (_) {
      panelStatus(createPanel, "Online service could not load. Check your connection and try again.", "bad");
      createChoice.disabled = false;
      return;
    }
    const attempt = () => {
      reconnectAttempt++;
      roomCode = generateCode();
      codeEl.textContent = roomCode;
      panelStatus(createPanel, "Waiting for Player 2...");
      peer = new Peer(PEER_PREFIX + roomCode, { debug: 0 });
      peer.on("open", () => { panelStatus(createPanel, "Waiting for Player 2..."); createChoice.disabled = false; });
      peer.on("connection", conn => setupConnection(conn, "host"));
      peer.on("error", error => {
        if (error && error.type === "unavailable-id" && reconnectAttempt < 5) {
          try { peer.destroy(); } catch (_) {}
          peer = null;
          attempt();
          return;
        }
        panelStatus(createPanel, "Could not create the game. Try again.", "bad");
        createChoice.disabled = false;
      });
    };
    attempt();
  }

  async function joinOnlineGame() {
    const code = normalizeCode(joinInput.value);
    joinInput.value = code;
    if (code.length !== 4) {
      panelStatus(joinPanel, "Enter all 4 characters from the host's code.", "bad");
      return;
    }
    joinSubmit.disabled = true;
    panelStatus(joinPanel, "Connecting...");
    intentionalDisconnect = true;
    clearNetworkLoops();
    closePeerObjects();
    resetOnlineFlags();
    intentionalDisconnect = false;
    try { await ensurePeerJS(); }
    catch (_) {
      panelStatus(joinPanel, "Online service could not load. Check your connection and try again.", "bad");
      joinSubmit.disabled = false;
      return;
    }
    roomCode = code;
    peer = new Peer(undefined, { debug: 0 });
    peer.on("open", () => {
      const conn = peer.connect(PEER_PREFIX + roomCode, { reliable: true, metadata: { game: "bloodline-brawl", version: 1 } });
      setupConnection(conn, "guest");
      joinTimeout = setTimeout(() => {
        if (!connection || !connection.open) {
          panelStatus(joinPanel, "Game not found. Check the code and try again.", "bad");
          joinSubmit.disabled = false;
          try { connection?.close(); } catch (_) {}
          connection = null;
        }
      }, 9000);
    });
    peer.on("error", () => {
      panelStatus(joinPanel, "Could not connect. Check the code and try again.", "bad");
      joinSubmit.disabled = false;
    });
  }

  function resetOnlineSelection() {
    player1Character = null;
    player2Character = null;
    selectionStage = 1;
    document.querySelectorAll(".fighter-card").forEach(card => card.classList.remove("p1-selected", "p2-selected"));
    syncOnlineSelectionUI();
  }

  function enterOnlineCharacterSelect(reset = false) {
    if (!onlineActive) return;
    if (reset) resetOnlineSelection();
    selectModeLabel.textContent = "ONLINE";
    fightButton.disabled = onlineRole === "guest";
    fightButton.textContent = onlineRole === "guest" ? "WAITING FOR HOST" : "FIGHT";
    syncOnlineSelectionUI();
    showScreen(selectScreen);
  }

  function syncOnlineSelectionUI() {
    if (!onlineActive) return;
    document.querySelectorAll(".fighter-card").forEach(card => {
      card.classList.toggle("p1-selected", !!player1Character && card.dataset.character === player1Character);
      card.classList.toggle("p2-selected", !!player2Character && card.dataset.character === player2Character);
    });
    const p1Text = player1Character ? displayName(player1Character) : "NOT SELECTED";
    const p2Text = player2Character ? displayName(player2Character) : "NOT SELECTED";
    selectionText.textContent = "P1: " + p1Text + "  |  P2: " + p2Text;
    selectModeLabel.textContent = "ONLINE";
    const bothReady = !!player1Character && !!player2Character;
    if (onlineRole === "host") {
      if (!player1Character) selectionPrompt.textContent = "YOU ARE PLAYER 1 — CHOOSE YOUR FIGHTER";
      else if (!player2Character) selectionPrompt.textContent = "WAITING FOR PLAYER 2 TO CHOOSE";
      else selectionPrompt.textContent = "BOTH READY — CHOOSE THE MAP";
      mapSelectButton.disabled = !bothReady;
      mapSelectButton.textContent = bothReady ? "CHOOSE MAP" : "WAITING FOR PLAYER 2";
    } else {
      if (!player2Character) selectionPrompt.textContent = "YOU ARE PLAYER 2 — CHOOSE YOUR FIGHTER";
      else if (!player1Character) selectionPrompt.textContent = "WAITING FOR PLAYER 1 TO CHOOSE";
      else selectionPrompt.textContent = "READY — HOST CHOOSES THE MAP";
      mapSelectButton.disabled = true;
      mapSelectButton.textContent = "WAITING FOR HOST";
    }
  }

  function selectOnlineFighter(card) {
    const character = card?.dataset?.character;
    if (!character) return;
    if (character === "martin" && !isMartinUnlocked()) {
      selectionPrompt.textContent = "MARTIN IS LOCKED ON THIS DEVICE";
      return;
    }
    if (onlineRole === "host") player1Character = character;
    else player2Character = character;
    send({ type: "pick", role: onlineRole, character });
    syncOnlineSelectionUI();
  }

  function openOnlineMapScreen() {
    if (!onlineActive) return;
    mapModeLabel.textContent = "ONLINE";
    fightButton.disabled = onlineRole === "guest";
    fightButton.textContent = onlineRole === "guest" ? "WAITING FOR HOST" : "FIGHT";
    showScreen(mapScreen);
  }

  function selectOnlineMap(card) {
    if (onlineRole !== "host") return;
    selectedMap = card.dataset.map;
    document.querySelectorAll(".map-card").forEach(x => x.classList.remove("selected"));
    card.classList.add("selected");
    mapSelectionText.textContent = "MAP: " + MAP_NAMES[selectedMap];
    send({ type: "map", map: selectedMap });
  }

  function prepareOnlineFightLabels() {
    if (!onlineActive) return;
    onePlayerControls.classList.add("hidden");
    twoPlayerControls.classList.add("hidden");
    if (onlineRole === "host") {
      player1Name.textContent = "YOU — " + displayName(P1.character);
      player2Name.textContent = "P2 — " + displayName(P2.character);
    } else {
      player1Name.textContent = "P1 — " + displayName(P1.character);
      player2Name.textContent = "YOU — " + displayName(P2.character);
    }
    addOnlineGuide();
  }

  function startOnlineMatchLocal(payload = null) {
    if (!onlineActive) return;
    if (payload) {
      player1Character = payload.p1;
      player2Character = payload.p2;
      selectedMap = payload.map;
    }
    if (!player1Character || !player2Character || !selectedMap) return;
    gameMode = "2P";
    challengeMode = false;
    challengeResult = null;
    beginMatch();
    prepareOnlineFightLabels();
  }

  function hostStartMatch() {
    if (onlineRole !== "host" || !player1Character || !player2Character) return;
    send({ type: "start", p1: player1Character, p2: player2Character, map: selectedMap });
    startOnlineMatchLocal();
  }

  function packPlayer(player) {
    return {
      x: player.x, y: player.y, vy: player.vy, facing: player.facing,
      health: player.health, maxHealth: player.maxHealth, ultimate: player.ultimate,
      jumping: player.jumping, crouching: player.crouching, blocking: player.blocking,
      stunned: player.stunned, attackCooldown: player.attackCooldown, specialCooldown: player.specialCooldown,
      specialReadyIn: player.specialReadyAt ? Math.max(0, player.specialReadyAt - Date.now()) : 0,
      specialDuration: player.__bbSpecialCooldownDurationV12 || 5000
    };
  }

  function sendHostState() {
    if (!onlineActive || onlineRole !== "host" || !connection?.open) return;
    if (!fightScreen.classList.contains("active")) return;
    send({ type: "state", p1: packPlayer(P1), p2: packPlayer(P2), player1Wins, player2Wins, currentRound, matchActive, fightStarted, roundOver, gameOver, actionLock });
  }

  function applyPackedPlayer(player, data) {
    if (!data) return;
    player.x = Number(data.x) || 0;
    player.y = Number(data.y) || 0;
    player.vy = Number(data.vy) || 0;
    player.facing = data.facing === -1 ? -1 : 1;
    player.health = Number.isFinite(data.health) ? data.health : player.health;
    player.maxHealth = Number.isFinite(data.maxHealth) ? data.maxHealth : player.maxHealth;
    player.ultimate = Number.isFinite(data.ultimate) ? data.ultimate : player.ultimate;
    player.jumping = !!data.jumping;
    player.crouching = !!data.crouching;
    player.blocking = !!data.blocking;
    player.stunned = !!data.stunned;
    player.attackCooldown = !!data.attackCooldown;
    player.specialCooldown = !!data.specialCooldown;
    player.specialReadyAt = data.specialCooldown ? Date.now() + Math.max(0, data.specialReadyIn || 0) : 0;
    player.__bbSpecialCooldownDurationV12 = data.specialDuration || 5000;
    player.fighter.classList.toggle("crouching", player.crouching);
    player.fighter.classList.toggle("blocking", player.blocking);
    player.fighter.classList.toggle("stunned", player.stunned);
  }

  function applyHostState(data) {
    if (!onlineActive || onlineRole !== "guest") return;
    if (!fightScreen.classList.contains("active")) return;
    applyPackedPlayer(P1, data.p1);
    applyPackedPlayer(P2, data.p2);
    player1Wins = Number(data.player1Wins) || 0;
    player2Wins = Number(data.player2Wins) || 0;
    currentRound = Number(data.currentRound) || currentRound;
    matchActive = !!data.matchActive;
    fightStarted = !!data.fightStarted;
    roundOver = !!data.roundOver;
    gameOver = !!data.gameOver;
    actionLock = !!data.actionLock;
    roundScore.textContent = player1Wins + " - " + player2Wins;
    roundLabel.textContent = "ROUND " + currentRound;
    updatePositions();
    updateHUD(true);
  }

  function replayActionMessage(data, predicted = false) {
    if (!onlineActive || onlineRole !== "guest") return;
    const attacker = data.side === 1 ? P1 : P2;
    const target = data.side === 1 ? P2 : P1;
    const action = data.action;
    replayingRemoteAction = true;
    try {
      if (action === "jump") {
        if (!attacker.jumping) {
          const savedLock = actionLock;
          const savedStun = attacker.stunned;
          actionLock = false;
          attacker.stunned = false;
          jump(attacker);
          attacker.stunned = savedStun;
          actionLock = savedLock;
        }
        return;
      }
      if (action === "crouch") { crouch(attacker, !!data.on); return; }
      if (action === "block") { block(attacker, !!data.on); return; }
      if (predicted) return;
      const savedLock = actionLock;
      const savedStun = attacker.stunned;
      actionLock = false;
      attacker.stunned = false;
      if (action === "basic") { attacker.attackCooldown = false; basicAttack(attacker, target); }
      else if (action === "special") { attacker.specialCooldown = false; specialAttack(attacker, target); }
      else if (action === "ultimate") { attacker.ultimate = Math.max(100, attacker.ultimate || 0); ultimateAttack(attacker, target); }
      attacker.stunned = savedStun;
      if (!actionLock) actionLock = savedLock;
    } finally {
      replayingRemoteAction = false;
    }
  }

  function processGuestInput(data) {
    if (!onlineActive || onlineRole !== "host") return;
    const input = data.input;
    const down = !!data.down;
    if (input === "left") guestHeld.left = down;
    else if (input === "right") guestHeld.right = down;
    else if (input === "jump" && down) jump(P2);
    else if (input === "crouch") crouch(P2, down);
    else if (input === "block") block(P2, down);
    else if (input === "basic" && down) basicAttack(P2, P1);
    else if (input === "special" && down) specialAttack(P2, P1);
    else if (input === "ultimate" && down) ultimateAttack(P2, P1);
  }

  function renderRemoteResults(html) {
    if (!onlineActive || onlineRole !== "guest") return;
    document.querySelectorAll(".bb-results-overlay").forEach(el => el.remove());
    const overlay = document.createElement("div");
    overlay.className = "bb-results-overlay bb-online-remote-results";
    overlay.innerHTML = html;
    fightScreen.appendChild(overlay);
  }

  function hostChangeFighters() {
    if (!onlineActive || onlineRole !== "host") return;
    send({ type: "changeFighters" });
    resetOnlineSelection();
    enterOnlineCharacterSelect(false);
  }

  function hostRematch() {
    if (!onlineActive || onlineRole !== "host") return;
    send({ type: "start", p1: player1Character, p2: player2Character, map: selectedMap });
    startOnlineMatchLocal();
  }

  function handleMessage(data) {
    if (!data || typeof data !== "object") return;
    if (data.type === "pick") {
      if (data.role === "host") player1Character = data.character;
      else if (data.role === "guest") player2Character = data.character;
      syncOnlineSelectionUI();
      return;
    }
    if (data.type === "screen" && data.screen === "map") { openOnlineMapScreen(); return; }
    if (data.type === "screen" && data.screen === "select") { enterOnlineCharacterSelect(false); return; }
    if (data.type === "map") {
      selectedMap = data.map;
      document.querySelectorAll(".map-card").forEach(card => card.classList.toggle("selected", card.dataset.map === selectedMap));
      mapSelectionText.textContent = "MAP: " + MAP_NAMES[selectedMap];
      return;
    }
    if (data.type === "start") { startOnlineMatchLocal(data); return; }
    if (data.type === "input") { processGuestInput(data); return; }
    if (data.type === "action") { replayActionMessage(data); return; }
    if (data.type === "state") { applyHostState(data); return; }
    if (data.type === "roundEnd" && onlineRole === "guest") {
      replayingRemoteAction = true;
      try { finishRound(data.winnerSide === 1 ? P1 : P2); }
      finally { replayingRemoteAction = false; }
      return;
    }
    if (data.type === "results") { renderRemoteResults(data.html || ""); return; }
    if (data.type === "requestRematch" && onlineRole === "host") { hostRematch(); return; }
    if (data.type === "requestChangeFighters" && onlineRole === "host") { hostChangeFighters(); return; }
    if (data.type === "changeFighters") { resetOnlineSelection(); enterOnlineCharacterSelect(false); }
  }

  function startNetworkLoops() {
    clearNetworkLoops();
    if (onlineRole === "host") stateTimer = setInterval(sendHostState, 33);
    resultSyncTimer = setInterval(() => {
      if (!onlineActive) return;
      if (onlineRole === "host") {
        const overlay = document.querySelector(".bb-results-overlay");
        if (overlay && !overlay.classList.contains("bb-online-results-sent")) {
          overlay.classList.add("bb-online-results-sent");
          send({ type: "results", html: overlay.innerHTML });
        }
      } else {
        document.querySelectorAll(".bb-results-overlay:not(.bb-online-remote-results)").forEach(el => el.remove());
      }
    }, 220);
  }

  function onlineMovementLoop() {
    if (onlineActive && fightScreen.classList.contains("active")) {
      if (onlineRole === "host" && canAct(P2) && !P2.blocking && !P2.crouching) {
        if (guestHeld.left && !guestHeld.right) movePlayer(P2, -6);
        if (guestHeld.right && !guestHeld.left) movePlayer(P2, 6);
      }
      if (onlineRole === "guest" && canAct(P2) && !P2.blocking && !P2.crouching) {
        if (guestPredictedHeld.left && !guestPredictedHeld.right) movePlayer(P2, -6);
        if (guestPredictedHeld.right && !guestPredictedHeld.left) movePlayer(P2, 6);
      }
    }
    requestAnimationFrame(onlineMovementLoop);
  }
  onlineMovementLoop();

  function inputFromKey(key) {
    if (key === "a" || key === "arrowleft") return "left";
    if (key === "d" || key === "arrowright") return "right";
    if (key === "w" || key === "arrowup" || key === " ") return "jump";
    if (key === "s" || key === "arrowdown") return "crouch";
    if (key === "q") return "block";
    if (key === "r") return "basic";
    if (key === "e") return "special";
    if (key === "f") return "ultimate";
    return null;
  }

  document.addEventListener("keydown", event => {
    if (!onlineActive || !fightScreen.classList.contains("active")) return;
    const key = event.key.toLowerCase();
    if (onlineRole === "host") {
      if (["arrowleft","arrowright","arrowup","arrowdown","i","j","k","l"].includes(key)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      return;
    }
    const input = inputFromKey(key);
    if (!input) { event.stopImmediatePropagation(); return; }
    event.preventDefault();
    event.stopImmediatePropagation();
    if ((input === "jump" || input === "basic" || input === "special" || input === "ultimate") && event.repeat) return;
    send({ type: "input", input, down: true });
    if (input === "left") guestPredictedHeld.left = true;
    else if (input === "right") guestPredictedHeld.right = true;
    else if (input === "jump") replayActionMessage({ side: 2, action: "jump" }, true);
    else if (input === "crouch") replayActionMessage({ side: 2, action: "crouch", on: true }, true);
    else if (input === "block") replayActionMessage({ side: 2, action: "block", on: true }, true);
  }, true);

  document.addEventListener("keyup", event => {
    if (!onlineActive || !fightScreen.classList.contains("active")) return;
    const key = event.key.toLowerCase();
    if (onlineRole === "host") {
      if (["arrowleft","arrowright","arrowup","arrowdown","i","j","k","l"].includes(key)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      return;
    }
    const input = inputFromKey(key);
    if (!input) { event.stopImmediatePropagation(); return; }
    event.preventDefault();
    event.stopImmediatePropagation();
    if (input === "left") { guestPredictedHeld.left = false; send({ type: "input", input, down: false }); }
    else if (input === "right") { guestPredictedHeld.right = false; send({ type: "input", input, down: false }); }
    else if (input === "crouch") { send({ type: "input", input, down: false }); replayActionMessage({ side: 2, action: "crouch", on: false }, true); }
    else if (input === "block") { send({ type: "input", input, down: false }); replayActionMessage({ side: 2, action: "block", on: false }, true); }
  }, true);

  const previousDealDamageOnlineV1 = dealDamage;
  dealDamage = function(attacker, target, amount, options = {}) {
    if (onlineActive && onlineRole === "guest") return;
    return previousDealDamageOnlineV1(attacker, target, amount, options);
  };

  const previousBasicAttackOnlineV1 = basicAttack;
  basicAttack = function(attacker, target) {
    const allowed = canAct(attacker) && !attacker.attackCooldown;
    if (onlineActive && onlineRole === "host" && !replayingRemoteAction && allowed) send({ type: "action", side: attacker === P1 ? 1 : 2, action: "basic" });
    return previousBasicAttackOnlineV1(attacker, target);
  };

  const previousSpecialAttackOnlineV1 = specialAttack;
  specialAttack = function(attacker, target) {
    const allowed = canAct(attacker) && !attacker.specialCooldown;
    if (onlineActive && onlineRole === "host" && !replayingRemoteAction && allowed) send({ type: "action", side: attacker === P1 ? 1 : 2, action: "special" });
    return previousSpecialAttackOnlineV1(attacker, target);
  };

  const previousUltimateAttackOnlineV1 = ultimateAttack;
  ultimateAttack = function(attacker, target) {
    const allowed = canAct(attacker) && attacker.ultimate >= 100;
    if (onlineActive && onlineRole === "host" && !replayingRemoteAction && allowed) send({ type: "action", side: attacker === P1 ? 1 : 2, action: "ultimate" });
    return previousUltimateAttackOnlineV1(attacker, target);
  };

  const previousJumpOnlineV1 = jump;
  jump = function(player) {
    const allowed = canAct(player) && !player.jumping && !player.crouching && !player.blocking;
    if (onlineActive && onlineRole === "host" && !replayingRemoteAction && allowed) send({ type: "action", side: player === P1 ? 1 : 2, action: "jump" });
    return previousJumpOnlineV1(player);
  };

  const previousCrouchOnlineV1 = crouch;
  crouch = function(player, on) {
    if (onlineActive && onlineRole === "host" && !replayingRemoteAction) send({ type: "action", side: player === P1 ? 1 : 2, action: "crouch", on: !!on });
    return previousCrouchOnlineV1(player, on);
  };

  const previousBlockOnlineV1 = block;
  block = function(player, on) {
    if (onlineActive && onlineRole === "host" && !replayingRemoteAction) send({ type: "action", side: player === P1 ? 1 : 2, action: "block", on: !!on });
    return previousBlockOnlineV1(player, on);
  };

  const previousFinishRoundOnlineV1 = finishRound;
  finishRound = function(winner) {
    if (onlineActive && onlineRole === "host" && !replayingRemoteAction) send({ type: "roundEnd", winnerSide: winner === P1 ? 1 : 2 });
    return previousFinishRoundOnlineV1(winner);
  };

  document.addEventListener("click", event => {
    if (!onlineActive) return;
    const fighterCard = event.target.closest(".fighter-card");
    if (fighterCard && selectScreen.classList.contains("active")) {
      event.preventDefault(); event.stopImmediatePropagation(); selectOnlineFighter(fighterCard); return;
    }
    const mapCard = event.target.closest(".map-card");
    if (mapCard && mapScreen.classList.contains("active")) {
      event.preventDefault(); event.stopImmediatePropagation(); if (onlineRole === "host") selectOnlineMap(mapCard); return;
    }
    if (event.target.closest("#mapSelectButton")) {
      event.preventDefault(); event.stopImmediatePropagation();
      if (onlineRole === "host" && player1Character && player2Character) { send({ type: "screen", screen: "map" }); openOnlineMapScreen(); }
      return;
    }
    if (event.target.closest("#fightButton")) {
      event.preventDefault(); event.stopImmediatePropagation(); if (onlineRole === "host") hostStartMatch(); return;
    }
    if (event.target.closest("#backToTitleButton")) {
      event.preventDefault(); event.stopImmediatePropagation(); exitOnlineToMenu(); return;
    }
    if (event.target.closest("#backToFighterButton")) {
      event.preventDefault(); event.stopImmediatePropagation();
      if (onlineRole === "host") send({ type: "screen", screen: "select" });
      enterOnlineCharacterSelect(false); return;
    }
    if (event.target.closest(".bb-results-rematch")) {
      event.preventDefault(); event.stopImmediatePropagation();
      document.querySelectorAll(".bb-results-overlay").forEach(el => el.remove());
      if (onlineRole === "host") hostRematch(); else send({ type: "requestRematch" });
      return;
    }
    if (event.target.closest(".bb-results-change")) {
      event.preventDefault(); event.stopImmediatePropagation();
      document.querySelectorAll(".bb-results-overlay").forEach(el => el.remove());
      if (onlineRole === "host") hostChangeFighters(); else send({ type: "requestChangeFighters" });
      return;
    }
    if (event.target.closest(".bb-results-menu")) {
      event.preventDefault(); event.stopImmediatePropagation(); exitOnlineToMenu();
    }
  }, true);

  onlineButton.addEventListener("click", event => { event.preventDefault(); event.stopImmediatePropagation(); openOnlineLobby(); });
  createChoice.onclick = () => createOnlineGame();
  joinChoice.onclick = () => { joinPanel.classList.add("bb-online-open"); createPanel.classList.remove("bb-online-open"); setTimeout(() => joinInput.focus(), 20); };
  joinInput.addEventListener("input", () => { joinInput.value = normalizeCode(joinInput.value); });
  joinInput.addEventListener("keydown", event => { if (event.key === "Enter") joinOnlineGame(); });
  joinSubmit.onclick = () => joinOnlineGame();
  copyButton.onclick = async () => {
    if (!roomCode) return;
    try {
      await navigator.clipboard.writeText(roomCode);
      copyButton.textContent = "COPIED!";
      setTimeout(() => { copyButton.textContent = "COPY CODE"; }, 1200);
    } catch (_) { copyButton.textContent = roomCode; }
  };
  backButton.onclick = () => exitOnlineToMenu();
  window.addEventListener("beforeunload", () => {
    intentionalDisconnect = true;
    try { connection?.close(); } catch (_) {}
    try { peer?.destroy(); } catch (_) {}
  });
})();
