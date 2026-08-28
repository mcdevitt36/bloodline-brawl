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

  const isOnline = () =>
    document.body.classList.contains("bb-online-active");

  const isGuest = () =>
    isOnline() && document.body.classList.contains("bb-online-guest");

  const setText = (element, value) => {
    if (!element) return;
    if (element.textContent.trim() !== value) element.textContent = value;
  };

  /* Resolve the CURRENT nodes on every pass. Some late fight/UI polish can
     rebuild control markup after ONLINE first loads; cached node references
     would then point at detached elements and leave a visible old key behind. */
  function currentNodes() {
    const onePlayerPanel = document.getElementById("onePlayerControls");
    const twoPlayerPanel = document.getElementById("twoPlayerControls");
    const p1Side = twoPlayerPanel?.querySelector(".two-player-control-side:not(.right)") || null;
    const p2Side = twoPlayerPanel?.querySelector(".two-player-control-side.right") || null;

    const actionKey = (side, label) => {
      if (!side) return null;
      const buttons = Array.from(side.querySelectorAll(".two-control-button"));
      const button = buttons.find(el =>
        el.textContent.toUpperCase().includes(label)
      );
      return button?.querySelector("small") || null;
    };

    return {
      /* These two are the orange arena melee-orb labels created by
         character-updates.js. P2 is the exact J visible in the screenshot. */
      p1MeleeArenaKey: document.getElementById("player1MeleeKey"),
      p2MeleeArenaKey: document.getElementById("player2MeleeKey"),

      p1SpecialKey: document.getElementById("player1SpecialKey"),
      p1UltimateKey: document.getElementById("player1UltimateKey"),
      p2SpecialKey: document.getElementById("player2SpecialKey"),
      p2UltimateKey: document.getElementById("player2UltimateKey"),

      oneAttack: onePlayerPanel?.querySelector("#onePlayerAttackButton small") || null,
      oneSpecial: onePlayerPanel?.querySelector("#onePlayerSpecialButton small") || null,
      oneUltimate: onePlayerPanel?.querySelector("#onePlayerUltimateButton small") || null,

      p1Movement: p1Side?.querySelector(":scope > span") || null,
      p1Melee: actionKey(p1Side, "MELEE"),
      p1Special: actionKey(p1Side, "SPECIAL"),
      p1Ultimate: p1Side?.querySelector(".ultimate-key-note") || null,

      p2Movement: p2Side?.querySelector(":scope > span") || null,
      p2Melee: actionKey(p2Side, "MELEE"),
      p2Special: actionKey(p2Side, "SPECIAL"),
      p2Ultimate: p2Side?.querySelector(".ultimate-key-note") || null
    };
  }

  function applyOnlineLabels() {
    if (!isOnline()) return;

    const n = currentNodes();

    /* Exact arena HUD letters. Private matches use R / E / F on each
       player's own device, even though the engine internally uses 2P mode. */
    setText(n.p1MeleeArenaKey, "R");
    setText(n.p2MeleeArenaKey, "R");
    setText(n.p1SpecialKey, "E");
    setText(n.p1UltimateKey, "F");
    setText(n.p2SpecialKey, "E");
    setText(n.p2UltimateKey, "F");

    /* Private-match action controls. */
    setText(n.oneAttack, "R");
    setText(n.oneSpecial, "E");
    setText(n.oneUltimate, "F");

    setText(n.p1Movement, "A/D OR ARROWS • Q BLOCK");
    setText(n.p1Melee, "R");
    setText(n.p1Special, "E");
    setText(n.p1Ultimate, "F = ULTIMATE");

    setText(n.p2Movement, "A/D OR ARROWS • Q BLOCK");
    setText(n.p2Melee, "R");
    setText(n.p2Special, "E");
    setText(n.p2Ultimate, "F = ULTIMATE");

    /* Guest-only belt-and-suspenders guard for any rebuilt bottom panel. */
    if (isGuest()) {
      setText(document.getElementById("player2MeleeKey"), "R");

      const p2Side = document.querySelector(
        "#twoPlayerControls .two-player-control-side.right"
      );

      if (p2Side) {
        Array.from(p2Side.querySelectorAll(".two-control-button")).forEach(button => {
          if (!button.textContent.toUpperCase().includes("MELEE")) return;
          setText(button.querySelector("small"), "R");
        });
      }
    }

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

    const n = currentNodes();
    const onePlayer = typeof gameMode !== "undefined" && gameMode === "1P";

    setText(n.p1MeleeArenaKey, "R");
    setText(n.p1SpecialKey, "E");
    setText(n.p1UltimateKey, "F");
    setText(n.oneAttack, "R");
    setText(n.oneSpecial, "E");
    setText(n.oneUltimate, "F");

    setText(n.p1Movement, "WASD • Q BLOCK");
    setText(n.p1Melee, "R");
    setText(n.p1Special, "E");
    setText(n.p1Ultimate, "F = ULTIMATE");

    setText(n.p2MeleeArenaKey, onePlayer ? "CPU" : "J");
    setText(n.p2Movement, "ARROWS • I BLOCK");
    setText(n.p2Melee, "J");
    setText(n.p2Special, "K");
    setText(n.p2Ultimate, "L = ULTIMATE");

    if (onePlayer) {
      setText(n.p2SpecialKey, "CPU");
      setText(n.p2UltimateKey, "CPU");
    } else {
      setText(n.p2SpecialKey, "K");
      setText(n.p2UltimateKey, "L");
    }
  }

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
      setTimeout(applyOnlineLabels, 2000);
    } else {
      restoreOfflineLabels();
    }

    return result;
  };

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
