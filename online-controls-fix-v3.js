/* =====================================================
   BLOODLINE BRAWL — ONLINE CONTROLS FIX V3
   Tiny additive online-only correction.
   - Each device controls ONLY its own fighter
   - Both players get the full 1P control set
   - Host no longer falls through to the old local-2P E/R mapping
   - Arrow keys are aliases for the host too, not P2 controls
===================================================== */

(() => {
  if (window.__bbOnlineControlsFixV3Loaded) return;
  window.__bbOnlineControlsFixV3Loaded = true;

  const heldKeys = new Set();
  const legacyTwoPlayerKeys = new Set(["i", "j", "k", "l"]);

  const isOnlineHostFight = () =>
    document.body.classList.contains("bb-online-active") &&
    document.body.classList.contains("bb-online-host") &&
    fightScreen &&
    fightScreen.classList.contains("active");

  const normalize = event => event.key.toLowerCase();

  const inputFromKey = key => {
    if (key === "a" || key === "arrowleft") return "left";
    if (key === "d" || key === "arrowright") return "right";
    if (key === "w" || key === "arrowup" || key === " ") return "jump";
    if (key === "s" || key === "arrowdown") return "crouch";
    if (key === "q") return "block";
    if (key === "r") return "basic";
    if (key === "e") return "special";
    if (key === "f") return "ultimate";
    return null;
  };

  const leftHeld = () => heldKeys.has("a") || heldKeys.has("arrowleft");
  const rightHeld = () => heldKeys.has("d") || heldKeys.has("arrowright");
  const crouchHeld = () => heldKeys.has("s") || heldKeys.has("arrowdown");

  /* Window capture runs BEFORE the older document-level online/core
     listeners. That lets the host use one clean 1P control scheme
     without any input leaking into the old same-keyboard 2P scheme. */
  window.addEventListener("keydown", event => {
    if (!isOnlineHostFight()) return;

    const key = normalize(event);
    const input = inputFromKey(key);

    /* Old local P2 attack keys must never control the remote fighter
       during an online match. */
    if (!input && legacyTwoPlayerKeys.has(key)) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return;
    }

    if (!input) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    heldKeys.add(key);

    if ((input === "jump" || input === "basic" || input === "special" || input === "ultimate") && event.repeat) {
      return;
    }

    if (input === "jump") jump(P1);
    else if (input === "crouch") crouch(P1, true);
    else if (input === "block") block(P1, true);
    else if (input === "basic") basicAttack(P1, P2);
    else if (input === "special") specialAttack(P1, P2);
    else if (input === "ultimate") ultimateAttack(P1, P2);
  }, true);

  window.addEventListener("keyup", event => {
    if (!isOnlineHostFight()) return;

    const key = normalize(event);
    const input = inputFromKey(key);

    if (!input && legacyTwoPlayerKeys.has(key)) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return;
    }

    if (!input) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    heldKeys.delete(key);

    if (input === "crouch") crouch(P1, crouchHeld());
    else if (input === "block") block(P1, false);
  }, true);

  window.addEventListener("blur", () => {
    heldKeys.clear();
    if (document.body.classList.contains("bb-online-host")) {
      try { crouch(P1, false); } catch (_) {}
      try { block(P1, false); } catch (_) {}
    }
  });

  function hostMovementLoop() {
    if (isOnlineHostFight()) {
      /* Keep core movement flags off so the old local 2P loop cannot
         add a second movement or accidentally touch the wrong side. */
      keys["a"] = false;
      keys["d"] = false;
      keys["arrowleft"] = false;
      keys["arrowright"] = false;

      if (canAct(P1) && !P1.blocking && !P1.crouching) {
        const left = leftHeld();
        const right = rightHeld();
        if (left && !right) movePlayer(P1, -6);
        if (right && !left) movePlayer(P1, 6);
      }
    } else if (heldKeys.size) {
      heldKeys.clear();
    }

    requestAnimationFrame(hostMovementLoop);
  }
  hostMovementLoop();

  function updateOnlineGuide() {
    const guide = document.querySelector(".bb-online-fight-guide");
    if (!guide || !document.body.classList.contains("bb-online-active")) return false;

    const player = document.body.classList.contains("bb-online-host") ? "P1" : "P2";
    guide.textContent =
      "YOU ARE " + player +
      "  •  A/D OR ←/→ MOVE" +
      "  •  W/↑/SPACE JUMP" +
      "  •  S/↓ DUCK" +
      "  •  Q BLOCK" +
      "  •  R ATTACK" +
      "  •  E SPECIAL" +
      "  •  F ULTIMATE";
    return true;
  }

  function refreshGuideBounded() {
    let tries = 0;
    const check = () => {
      tries++;
      updateOnlineGuide();
      if (tries < 12 && document.body.classList.contains("bb-online-active")) {
        setTimeout(check, 180);
      }
    };
    check();
  }

  const previousBeginMatchOnlineControlsV3 = beginMatch;
  beginMatch = function() {
    const result = previousBeginMatchOnlineControlsV3.apply(this, arguments);
    refreshGuideBounded();
    return result;
  };

  refreshGuideBounded();
})();
