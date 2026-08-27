/* =====================================================
   BLOODLINE BRAWL — SAFE ADDITIVE PATCHES
   Loaded after script.js so the working base game stays intact.
===================================================== */

/* =====================================================
   2 PLAYER — PLAYER 1 R/E CONTROL FIX
   R = BASIC / MELEE
   E = SPECIAL
   F = ULTIMATE remains handled by the base game.
===================================================== */

document.addEventListener(
  "keydown",
  event => {

    if (
      gameMode !== "2P" ||
      !fightScreen.classList.contains("active") ||
      event.repeat
    ) {
      return;
    }

    const key =
      event.key.toLowerCase();

    if (
      key !== "r" &&
      key !== "e"
    ) {
      return;
    }

    /*
      Stop the older 2P R/E handler in script.js from also firing.
      This keeps the base file untouched while correcting the controls.
    */
    event.preventDefault();
    event.stopImmediatePropagation();

    if (
      key === "r"
    ) {
      basicAttack(
        P1,
        P2
      );
      return;
    }

    specialAttack(
      P1,
      P2
    );
  },
  true
);
