/* =====================================================
   BLOODLINE BRAWL — ONLINE CONTROL LABELS V8
   Private-match UI authority.

   VERIFIED AGAINST ACTUAL ONLINE INPUT HANDLERS:
   - MOVE: A/D or LEFT/RIGHT
   - JUMP: W / UP / SPACE
   - DUCK: S / DOWN
   - BLOCK: Q
   - MELEE: R
   - SPECIAL: E
   - ULTIMATE: F

   Both host and guest use this same physical key map on their own device.
   Local 1P / local 2P labels are restored outside online mode.
===================================================== */

(() => {
  if (window.__bbOnlineControlLabelsV8Loaded) return;
  window.__bbOnlineControlLabelsV8Loaded = true;

  const p1SpecialKey = document.getElementById("player1SpecialKey");
  const p1UltimateKey = document.getElementById("player1UltimateKey");
  const p2SpecialKey = document.getElementById("player2SpecialKey");
  const p2UltimateKey = document.getElementById("player2UltimateKey");

  const onePlayerPanel = document.getElementById("onePlayerControls");
  const twoPlayerPanel = document.getElementById("twoPlayerControls");
  const p1Side = twoPlayerPanel?.querySelector(".two-player-control-side:not(.right)") || null;
  const p2Side = twoPlayerPanel?.querySelector(".two-player-control-side.right") || null;

  const oneAttack = onePlayerPanel?.querySelector("#onePlayerAttackButton small") || null;
  const oneSpecial = onePlayerPanel?.querySelector("#onePlayerSpecialButton small") || null;
  const oneUltimate = onePlayerPanel?.querySelector("#onePlayerUltimateButton small") || null;

  const p1Movement = p1Side?.querySelector(":scope > span") || null;
  const p1Melee = p1Side?.querySelector(".two-player-action-row .two-control-button:first-child small") || null;
  const p1Special = p1Side?.querySelector(".two-player-action-row .two-control-button.special small") || null;
  const p1Ultimate = p1Side?.querySelector(".ultimate-key-note") || null;

  const p2Movement = p2Side?.querySelector(":scope > span") || null;
  const p2Melee = p2Side?.querySelector(".two-player-action-row .two-control-button:first-child small") || null;
  const p2Special = p2Side?.querySelector(".two-player-action-row .two-control-button.special small") || null;
  const p2Ultimate = p2Side?.querySelector(".ultimate-key-note") || null;

  const isOnline = () =>
    document.body.classList.contains("bb-online-active");

  const setText = (element, value) => {
    if (!element) return;
    if (element.textContent.trim() !== value) element.textContent = value;
  };

  function applyOnlineLabels() {
    if (!isOnline()) return;

    /* Arena HUD ability letters: BOTH online fighters use E / F on their
       own computer. The base 2P engine otherwise resets P2 to K / L. */
    setText(p1SpecialKey, "E");
    setText(p1UltimateKey, "F");
    setText(p2SpecialKey, "E");
    setText(p2UltimateKey, "F");

    /* Any control panel that becomes visible during an online match must
       also show the exact physical private-match keys. */
    setText(oneAttack, "R");
    setText(oneSpecial, "E");
    setText(oneUltimate, "F");

    setText(p1Movement, "A/D OR ARROWS • Q BLOCK");
    setText(p1Melee, "R");
    setText(p1Special, "E");
    setText(p1Ultimate, "F = ULTIMATE");

    setText(p2Movement, "A/D OR ARROWS • Q BLOCK");
    setText(p2Melee, "R");
    setText(p2Special, "E");
    setText(p2Ultimate, "F = ULTIMATE");

    const guide = document.querySelector(".bb-online-fight-guide");
    if (guide) {
      const player = document.body.classList.contains("bb-online-host")
        ? "P1"
        : "P2";

      setText(
        guide,
        "YOU ARE " + player +
        "  •  A/D OR ←/→ MOVE" +
        "  •  W/↑/SPACE JUMP" +
        "  •  S/↓ DUCK" +
        "  •  Q BLOCK" +
        "  •  R ATTACK" +
        "  •  E SPECIAL" +
        "  •  F ULTIMATE"
      );
    }
  }

  function restoreOfflineLabels() {
    if (isOnline()) return;

    setText(p1SpecialKey, "E");
    setText(p1UltimateKey, "F");
    setText(oneAttack, "R");
    setText(oneSpecial, "E");
    setText(oneUltimate, "F");

    setText(p1Movement, "WASD • Q BLOCK");
    setText(p1Melee, "R");
    setText(p1Special, "E");
    setText(p1Ultimate, "F = ULTIMATE");

    setText(p2Movement, "ARROWS • I BLOCK");
    setText(p2Melee, "J");
    setText(p2Special, "K");
    setText(p2Ultimate, "L = ULTIMATE");

    if (typeof gameMode !== "undefined" && gameMode === "1P") {
      setText(p2SpecialKey, "CPU");
      setText(p2UltimateKey, "CPU");
    } else {
      setText(p2SpecialKey, "K");
      setText(p2UltimateKey, "L");
    }
  }

  /* beginMatch runs through the normal 2P engine for online play, which is
     exactly where K / L get written back onto P2. Wrap it last and reassert
     the real online mapping immediately and after late UI passes. */
  const previousBeginMatchOnlineLabelsV8 = beginMatch;
  beginMatch = function() {
    const result = previousBeginMatchOnlineLabelsV8.apply(this, arguments);

    if (isOnline()) {
      applyOnlineLabels();
      setTimeout(applyOnlineLabels, 0);
      setTimeout(applyOnlineLabels, 100);
      setTimeout(applyOnlineLabels, 300);
      setTimeout(applyOnlineLabels, 750);
      setTimeout(applyOnlineLabels, 1200);
    } else {
      restoreOfflineLabels();
    }

    return result;
  };

  /* Catch role changes and any late text reset without watching style/class
     animation churn. Text-only observation is enough for these labels. */
  const roleObserver = new MutationObserver(() => {
    if (isOnline()) applyOnlineLabels();
    else restoreOfflineLabels();
  });

  roleObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"]
  });

  const labelRoot = document.getElementById("fightScreen");
  if (labelRoot) {
    const textObserver = new MutationObserver(() => {
      if (isOnline()) applyOnlineLabels();
    });

    textObserver.observe(labelRoot, {
      subtree: true,
      childList: true,
      characterData: true
    });
  }

  if (isOnline()) applyOnlineLabels();
  else restoreOfflineLabels();
})();
