/* =====================================================
   BLOODLINE BRAWL — ONLINE CONTROLS FIX V4
   Online-only input ownership with no extra animation loop.
   - Host controls ONLY P1
   - Full 1P key set on host
   - Arrow aliases map into the game's existing P1 movement loop
   - Old local P2 I/J/K/L keys are blocked online
===================================================== */

(() => {
  if (window.__bbOnlineControlsFixV4Loaded) return;
  window.__bbOnlineControlsFixV4Loaded = true;

  const held = new Set();
  const legacyP2Keys = new Set(["i", "j", "k", "l"]);

  const isHostFight = () =>
    document.body.classList.contains("bb-online-active") &&
    document.body.classList.contains("bb-online-host") &&
    fightScreen &&
    fightScreen.classList.contains("active");

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

  const syncMovementKeys = () => {
    const onlineHost = isHostFight();

    keys["a"] = onlineHost && (held.has("a") || held.has("arrowleft"));
    keys["d"] = onlineHost && (held.has("d") || held.has("arrowright"));

    /* Never let the old same-keyboard P2 movement path see arrows. */
    if (onlineHost) {
      keys["arrowleft"] = false;
      keys["arrowright"] = false;
    }
  };

  window.addEventListener("keydown", event => {
    if (!isHostFight()) return;

    const key = event.key.toLowerCase();
    const input = inputFromKey(key);

    if (!input && legacyP2Keys.has(key)) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return;
    }

    if (!input) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    held.add(key);
    syncMovementKeys();

    if (
      (input === "jump" ||
       input === "basic" ||
       input === "special" ||
       input === "ultimate") &&
      event.repeat
    ) {
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
    if (!isHostFight()) return;

    const key = event.key.toLowerCase();
    const input = inputFromKey(key);

    if (!input && legacyP2Keys.has(key)) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return;
    }

    if (!input) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    held.delete(key);
    syncMovementKeys();

    if (input === "crouch") {
      crouch(P1, held.has("s") || held.has("arrowdown"));
    } else if (input === "block") {
      block(P1, false);
    }
  }, true);

  window.addEventListener("blur", () => {
    held.clear();
    keys["a"] = false;
    keys["d"] = false;
    keys["arrowleft"] = false;
    keys["arrowright"] = false;

    if (document.body.classList.contains("bb-online-host")) {
      try { crouch(P1, false); } catch (_) {}
      try { block(P1, false); } catch (_) {}
    }
  });

  function updateGuide() {
    if (!document.body.classList.contains("bb-online-active")) return;
    const guide = document.querySelector(".bb-online-fight-guide");
    if (!guide) return;

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
  }

  const previousBeginMatchOnlineControlsV4 = beginMatch;
  beginMatch = function() {
    const result = previousBeginMatchOnlineControlsV4.apply(this, arguments);
    setTimeout(updateGuide, 0);
    setTimeout(updateGuide, 250);
    return result;
  };
})();
