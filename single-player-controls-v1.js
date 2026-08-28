/* =====================================================
   BLOODLINE BRAWL — SINGLE PLAYER ALT CONTROLS V1
   Additive controls-only patch.
   1P movement can use WASD or arrow keys.
   Jump can use W, ArrowUp, or Space.
===================================================== */

(() => {
  if (window.__bbSinglePlayerAltControlsV1Loaded) return;
  window.__bbSinglePlayerAltControlsV1Loaded = true;

  const fightScreenEl = document.getElementById("fightScreen");

  const held = {
    a: false,
    d: false,
    s: false,
    left: false,
    right: false,
    down: false
  };

  const onePlayerActive = () =>
    typeof gameMode !== "undefined" &&
    gameMode === "1P" &&
    fightScreenEl &&
    fightScreenEl.classList.contains("active");

  const syncHorizontal = () => {
    if (typeof keys === "undefined") return;

    if (typeof gameMode !== "undefined" && gameMode === "1P") {
      // Feed the arrow keys into the game's existing P1 movement loop.
      // Tracking the physical keys separately prevents double speed and
      // lets A/D and arrows be mixed without one release cancelling another.
      keys["a"] = held.a || held.left;
      keys["d"] = held.d || held.right;
    } else {
      keys["a"] = held.a;
      keys["d"] = held.d;
    }
  };

  document.addEventListener("keydown", event => {
    const key = event.key.toLowerCase();

    if (key === "a") held.a = true;
    if (key === "d") held.d = true;
    if (key === "s") held.s = true;
    if (key === "arrowleft") held.left = true;
    if (key === "arrowright") held.right = true;
    if (key === "arrowdown") held.down = true;

    syncHorizontal();

    if (!onePlayerActive()) return;

    if (["arrowleft", "arrowright", "arrowup", "arrowdown", " "].includes(key)) {
      event.preventDefault();
    }

    if ((key === "arrowup" || key === " ") && !event.repeat) {
      jump(P1);
    }

    if (key === "arrowdown") {
      crouch(P1, true);
    }
  });

  document.addEventListener("keyup", event => {
    const key = event.key.toLowerCase();

    if (key === "a") held.a = false;
    if (key === "d") held.d = false;
    if (key === "s") held.s = false;
    if (key === "arrowleft") held.left = false;
    if (key === "arrowright") held.right = false;
    if (key === "arrowdown") held.down = false;

    syncHorizontal();

    if (!onePlayerActive()) return;

    if (key === "s" || key === "arrowdown") {
      crouch(P1, held.s || held.down);
    }
  });

  // Keep the visible 1P guide accurate without touching the 2P controls.
  const guideItems = document.querySelectorAll(
    "#onePlayerControls .keyboard-guide span"
  );

  if (guideItems.length >= 4) {
    guideItems[0].innerHTML = "A / D or ← / →<b>MOVE</b>";
    guideItems[1].innerHTML = "W / ↑ / SPACE<b>JUMP</b>";
    guideItems[2].innerHTML = "S / ↓<b>DUCK</b>";
  }
})();
