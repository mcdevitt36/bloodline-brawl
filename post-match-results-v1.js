/* =====================================================
   BLOODLINE BRAWL — POST MATCH RESULTS V1
   Late additive results/stat tracking only.
   - Appears after the full winner celebration
   - Tracks total damage, total hits, match time and final blow
   - Higher head-to-head stat is green; lower is red; ties stay neutral
   - Match MVP always goes to the match winner
   - Rematch / Change Fighters / Main Menu actions
===================================================== */

(() => {
  if (window.__bbPostMatchResultsV1Loaded) return;
  window.__bbPostMatchResultsV1Loaded = true;

  const style = document.createElement("style");
  style.textContent = `
    .bb-results-overlay {
      position: absolute;
      inset: 0;
      z-index: 1200;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 18px;
      background:
        radial-gradient(circle at 50% 20%, rgba(255,216,61,.18), transparent 30%),
        rgba(4,10,16,.90);
      backdrop-filter: blur(3px);
      box-sizing: border-box;
    }

    .bb-results-panel {
      width: min(940px, 94vw);
      max-height: 94%;
      overflow: auto;
      padding: 22px 24px 20px;
      box-sizing: border-box;
      background:
        linear-gradient(180deg, rgba(31,64,88,.98), rgba(8,19,29,.99));
      border: 4px solid #111;
      border-radius: 12px;
      box-shadow:
        0 10px 0 rgba(0,0,0,.34),
        0 0 0 3px rgba(255,216,61,.30),
        0 0 34px rgba(0,0,0,.52);
      color: #fff;
      font-family: Arial, sans-serif;
      text-align: center;
    }

    .bb-results-kicker {
      color: #ffd83d;
      font-size: 13px;
      font-weight: 900;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 3px;
    }

    .bb-results-title {
      margin: 0;
      font-size: clamp(31px, 5vw, 55px);
      line-height: .98;
      font-weight: 1000;
      letter-spacing: 1px;
      text-shadow: 0 4px 0 #111, 0 0 18px rgba(255,216,61,.35);
    }

    .bb-results-score {
      margin-top: 7px;
      color: #ffd83d;
      font-size: 19px;
      font-weight: 1000;
      letter-spacing: 2px;
    }

    .bb-results-fighters {
      display: grid;
      grid-template-columns: minmax(0,1fr) minmax(0,1fr);
      gap: 15px;
      margin-top: 18px;
    }

    .bb-results-fighter {
      position: relative;
      overflow: hidden;
      padding: 13px 14px 14px;
      border: 3px solid #263b4a;
      border-radius: 9px;
      background: linear-gradient(180deg, rgba(255,255,255,.07), rgba(0,0,0,.22));
    }

    .bb-results-fighter.bb-results-winner {
      border-color: #ffd83d;
      box-shadow: inset 0 0 24px rgba(255,216,61,.09), 0 0 13px rgba(255,216,61,.16);
    }

    .bb-results-name {
      font-size: clamp(19px, 3vw, 28px);
      font-weight: 1000;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }

    .bb-results-winner-tag {
      display: inline-block;
      margin-left: 7px;
      padding: 2px 6px;
      vertical-align: 3px;
      border: 2px solid #111;
      border-radius: 4px;
      background: #ffd83d;
      color: #111;
      font-size: 9px;
      letter-spacing: 1px;
    }

    .bb-results-stat {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 10px;
      align-items: center;
      min-height: 42px;
      padding: 7px 10px;
      margin-top: 7px;
      border: 2px solid rgba(255,255,255,.08);
      border-radius: 6px;
      background: rgba(0,0,0,.18);
      text-align: left;
    }

    .bb-results-stat-label {
      color: #c7d4dd;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 1.2px;
      text-transform: uppercase;
    }

    .bb-results-stat-value {
      font-size: 25px;
      font-weight: 1000;
      line-height: 1;
    }

    .bb-results-stat-value.bb-stat-high {
      color: #72e681;
      text-shadow: 0 0 8px rgba(114,230,129,.22);
    }

    .bb-results-stat-value.bb-stat-low {
      color: #ff6b67;
      text-shadow: 0 0 8px rgba(255,107,103,.20);
    }

    .bb-results-stat-value.bb-stat-tie {
      color: #ffe36a;
    }

    .bb-results-meta {
      display: grid;
      grid-template-columns: 1fr 1.45fr;
      gap: 12px;
      margin-top: 14px;
    }

    .bb-results-meta-card {
      padding: 10px 12px;
      border: 2px solid rgba(255,255,255,.12);
      border-radius: 7px;
      background: rgba(0,0,0,.22);
    }

    .bb-results-meta-label {
      display: block;
      color: #9eb2c0;
      font-size: 10px;
      font-weight: 900;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .bb-results-meta-value {
      color: #fff;
      font-size: 18px;
      font-weight: 1000;
    }

    .bb-results-final-blow .bb-results-meta-value {
      color: #ffd83d;
    }

    .bb-results-mvp {
      margin: 14px auto 0;
      width: min(520px, 100%);
      padding: 9px 14px;
      border: 3px solid #ffd83d;
      border-radius: 7px;
      background: linear-gradient(180deg, rgba(255,216,61,.17), rgba(255,216,61,.05));
      font-weight: 1000;
      letter-spacing: 1px;
    }

    .bb-results-mvp small {
      display: block;
      color: #ffd83d;
      font-size: 10px;
      letter-spacing: 2px;
      margin-bottom: 2px;
    }

    .bb-results-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 9px;
      margin-top: 16px;
    }

    .bb-results-button {
      min-height: 52px;
      border: 3px solid #111;
      border-radius: 7px;
      font: 1000 15px Arial, sans-serif;
      letter-spacing: 1px;
      cursor: pointer;
      box-shadow: 0 5px 0 rgba(0,0,0,.35);
    }

    .bb-results-rematch {
      background: #ffd83d;
      color: #111;
    }

    .bb-results-change {
      background: #e84a42;
      color: #fff;
    }

    .bb-results-menu {
      grid-column: 1 / -1;
      width: min(260px, 100%);
      justify-self: center;
      min-height: 42px;
      background: #253a49;
      color: #dce7ee;
      font-size: 12px;
    }

    .bb-results-button:hover {
      transform: translateY(-1px);
      filter: brightness(1.08);
    }

    @media (max-width: 650px), (max-height: 700px) {
      .bb-results-panel { padding: 14px 15px 13px; }
      .bb-results-fighters { gap: 8px; margin-top: 11px; }
      .bb-results-fighter { padding: 9px; }
      .bb-results-stat { min-height: 34px; padding: 5px 7px; }
      .bb-results-stat-value { font-size: 20px; }
      .bb-results-meta { margin-top: 9px; gap: 7px; }
      .bb-results-mvp { margin-top: 9px; padding: 6px 10px; }
      .bb-results-actions { margin-top: 10px; }
      .bb-results-button { min-height: 44px; }
    }
  `;
  document.head.appendChild(style);

  const moveNames = {
    brendan:    { normal:"GOLF CLUB", special:"BIG DRIVE", ultimate:"IPO" },
    grandaddy:  { normal:"HAMMER", special:"LADDER", ultimate:"YAP ALERT" },
    connor:     { normal:"PAINTBRUSH", special:"PAINT BEAST", ultimate:"FRIED CHICKEN FEAST" },
    erin:       { normal:"HAIRBRUSH", special:"PIMPLE PATCH", ultimate:"LAUNDRY AVALANCHE" },
    shannan:    { normal:"SYRINGE", special:"BRAINROT", ultimate:"CONSPIRACY" },
    liam:       { normal:"SHOULDER CHECK", special:"RUGBY PASS", ultimate:"SPLASH ZONE" },
    grandmommy: { normal:"SPATULA", special:"CHAIR YOGA", ultimate:"CHAIR YOGA" },
    sean:       { normal:"ICE CREAM CONE", special:"PLATES", ultimate:"ZOMBIE DEER" },
    martin:     { normal:"PAWS", special:"DOG BREATH", ultimate:"CLYDE RETURNS" },
    kelly:      { normal:"SHOVEL", special:"TAKE YOUR MEDS!", ultimate:"PATIENT ZERO" },
    leah:       { normal:"CROCHET HOOKS", special:"TANGLED!", ultimate:"YARNAGEDDON!" },
    alice:      { normal:"FAIRY WAND", special:"GRAPE LOLLIPOP", ultimate:"FAIRY PRINCESS" },
    leo:        { normal:"DINO CLAWS", special:"DINO STOMP", ultimate:"DINO STAMPEDE" },
    barrett:    { normal:"HEADBUTT", special:"RC RAMPAGE", ultimate:"BEAR DRIVER" }
  };

  let matchStats = null;
  let matchStartedAt = 0;
  let matchEndedAt = 0;
  let finalBlow = "—";
  let resultTimer = null;

  function freshStats() {
    return {
      p1: { damage: 0, hits: 0 },
      p2: { damage: 0, hits: 0 }
    };
  }

  function resetMatchStats() {
    matchStats = freshStats();
    matchStartedAt = Date.now();
    matchEndedAt = 0;
    finalBlow = "—";
    if (resultTimer) {
      clearTimeout(resultTimer);
      resultTimer = null;
    }
    removeResults();
  }

  function statForPlayer(player) {
    if (!matchStats) matchStats = freshStats();
    return player === P1 ? matchStats.p1 : matchStats.p2;
  }

  function attackName(attacker, options) {
    const type = options && options.type === "ultimate"
      ? "ultimate"
      : options && options.type === "special"
        ? "special"
        : "normal";

    const names = moveNames[attacker && attacker.character];
    if (names && names[type]) return names[type];
    return "FINAL HIT";
  }

  function formatMatchTime(ms) {
    const totalSeconds = Math.max(0, Math.round(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return minutes + ":" + String(seconds).padStart(2, "0");
  }

  function compareClass(a, b) {
    if (a === b) return "bb-stat-tie";
    return a > b ? "bb-stat-high" : "bb-stat-low";
  }

  function removeResults() {
    const old = document.querySelector(".bb-results-overlay");
    if (old) old.remove();
  }

  function restoreFightShell() {
    player1Fighter.classList.remove("bb-final-ko-cleared");
    player2Fighter.classList.remove("bb-final-ko-cleared");
    koOverlay.classList.add("hidden");
    newGameButton.classList.add("hidden");
  }

  function goToFighterSelect() {
    removeResults();
    restoreFightShell();
    challengeMode = false;
    challengeResult = null;
    resetSelection();
    showScreen(selectScreen);
  }

  function goToMainMenu() {
    removeResults();
    restoreFightShell();
    challengeMode = false;
    challengeResult = null;
    resetSelection();
    showScreen(titleScreen);
  }

  function rematchSameFight() {
    removeResults();
    restoreFightShell();
    challengeMode = false;
    challengeResult = null;
    beginMatch();
  }

  function renderResults(winner) {
    if (!winner || challengeMode) return;
    if (!matchStats) matchStats = freshStats();

    removeResults();
    restoreFightShell();

    const p1Name = displayName(P1.character);
    const p2Name = displayName(P2.character);
    const winnerName = displayName(winner.character);
    const p1Won = winner === P1;
    const p2Won = winner === P2;
    const elapsed = (matchEndedAt || Date.now()) - matchStartedAt;

    const p1Damage = Math.round(matchStats.p1.damage * 10) / 10;
    const p2Damage = Math.round(matchStats.p2.damage * 10) / 10;
    const p1Hits = matchStats.p1.hits;
    const p2Hits = matchStats.p2.hits;

    const overlay = document.createElement("div");
    overlay.className = "bb-results-overlay";
    overlay.innerHTML = `
      <div class="bb-results-panel" role="dialog" aria-label="Post match results">
        <div class="bb-results-kicker">MATCH COMPLETE</div>
        <h2 class="bb-results-title">${winnerName} WINS!</h2>
        <div class="bb-results-score">${player1Wins}–${player2Wins} VICTORY</div>

        <div class="bb-results-fighters">
          <section class="bb-results-fighter ${p1Won ? "bb-results-winner" : ""}">
            <div class="bb-results-name">
              ${p1Name}${p1Won ? '<span class="bb-results-winner-tag">WINNER</span>' : ""}
            </div>
            <div class="bb-results-stat">
              <span class="bb-results-stat-label">Damage Dealt</span>
              <strong class="bb-results-stat-value ${compareClass(p1Damage,p2Damage)}">${p1Damage}</strong>
            </div>
            <div class="bb-results-stat">
              <span class="bb-results-stat-label">Hits Landed</span>
              <strong class="bb-results-stat-value ${compareClass(p1Hits,p2Hits)}">${p1Hits}</strong>
            </div>
          </section>

          <section class="bb-results-fighter ${p2Won ? "bb-results-winner" : ""}">
            <div class="bb-results-name">
              ${p2Name}${p2Won ? '<span class="bb-results-winner-tag">WINNER</span>' : ""}
            </div>
            <div class="bb-results-stat">
              <span class="bb-results-stat-label">Damage Dealt</span>
              <strong class="bb-results-stat-value ${compareClass(p2Damage,p1Damage)}">${p2Damage}</strong>
            </div>
            <div class="bb-results-stat">
              <span class="bb-results-stat-label">Hits Landed</span>
              <strong class="bb-results-stat-value ${compareClass(p2Hits,p1Hits)}">${p2Hits}</strong>
            </div>
          </section>
        </div>

        <div class="bb-results-meta">
          <div class="bb-results-meta-card">
            <span class="bb-results-meta-label">Match Time</span>
            <strong class="bb-results-meta-value">${formatMatchTime(elapsed)}</strong>
          </div>
          <div class="bb-results-meta-card bb-results-final-blow">
            <span class="bb-results-meta-label">Final Blow</span>
            <strong class="bb-results-meta-value">${finalBlow}</strong>
          </div>
        </div>

        <div class="bb-results-mvp">
          <small>MATCH MVP</small>
          ${winnerName}
        </div>

        <div class="bb-results-actions">
          <button class="bb-results-button bb-results-rematch" type="button">REMATCH</button>
          <button class="bb-results-button bb-results-change" type="button">CHANGE FIGHTERS</button>
          <button class="bb-results-button bb-results-menu" type="button">MAIN MENU</button>
        </div>
      </div>
    `;

    fightScreen.appendChild(overlay);

    overlay.querySelector(".bb-results-rematch").onclick = rematchSameFight;
    overlay.querySelector(".bb-results-change").onclick = goToFighterSelect;
    overlay.querySelector(".bb-results-menu").onclick = goToMainMenu;
  }

  /* Track the actual health removed. Blocked hits therefore count their
     reduced damage, and overkill damage is capped at the target's remaining HP. */
  const previousDealDamageResultsV1 = dealDamage;
  dealDamage = function(attacker, target, amount, options = {}) {
    const before = target ? Math.max(0, target.health) : 0;

    const result = previousDealDamageResultsV1(
      attacker,
      target,
      amount,
      options
    );

    if (!attacker || !target || !matchStats) return result;

    const after = Math.max(0, target.health);
    const actualDamage = Math.max(0, before - after);

    if (actualDamage > 0) {
      const stats = statForPlayer(attacker);
      stats.damage += actualDamage;
      stats.hits += 1;

      if (before > 0 && after <= 0) {
        finalBlow = attackName(attacker, options);
      }
    }

    return result;
  };

  const previousBeginMatchResultsV1 = beginMatch;
  beginMatch = function() {
    resetMatchStats();
    return previousBeginMatchResultsV1();
  };

  const previousFinishRoundResultsV1 = finishRound;
  finishRound = function(winner) {
    previousFinishRoundResultsV1(winner);

    const matchWon = player1Wins >= 2 || player2Wins >= 2;
    if (!matchWon) return;

    matchEndedAt = Date.now();

    /* V4's final celebration begins after 900ms and lasts 5000ms.
       Show the results only after that full celebration has finished. */
    if (!challengeMode) {
      resultTimer = setTimeout(() => {
        resultTimer = null;
        renderResults(winner);
      }, 6025);
    }
  };
})();
