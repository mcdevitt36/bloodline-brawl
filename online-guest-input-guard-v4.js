/* =====================================================
   BLOODLINE BRAWL — ONLINE GUEST INPUT GUARD V4
   Online-only compatibility fix.
   The older local-2P R/E capture handler loads before online mode and
   can steal the guest's attack keys, making P1 attack on the guest's
   screen. During a guest key event, temporarily mark the mode as ONLINE
   so that old local-2P handler ignores it; the online handler then sends
   the input normally to the host-authoritative P2 fighter.
===================================================== */

(() => {
  if (window.__bbOnlineGuestInputGuardV4Loaded) return;
  window.__bbOnlineGuestInputGuardV4Loaded = true;

  const onlineKeys = new Set([
    "a", "d", "w", "s", "q", "r", "e", "f",
    "arrowleft", "arrowright", "arrowup", "arrowdown", " "
  ]);

  const isGuestFight = () =>
    document.body.classList.contains("bb-online-active") &&
    document.body.classList.contains("bb-online-guest") &&
    fightScreen &&
    fightScreen.classList.contains("active");

  let restoreQueued = false;
  let savedMode = null;

  function guardEvent(event) {
    if (!isGuestFight()) return;

    const key = event.key.toLowerCase();
    if (!onlineKeys.has(key)) return;

    /* Do not stop propagation here. We WANT the online-mode listener
       to receive the event; we only need the old local 2P listener to
       see a non-2P mode for this one synchronous event dispatch. */
    if (gameMode === "2P") {
      if (!restoreQueued) savedMode = gameMode;
      gameMode = "ONLINE";

      if (!restoreQueued) {
        restoreQueued = true;
        queueMicrotask(() => {
          if (
            document.body.classList.contains("bb-online-active") &&
            gameMode === "ONLINE"
          ) {
            gameMode = savedMode || "2P";
          }
          savedMode = null;
          restoreQueued = false;
        });
      }
    }
  }

  /* Window capture runs before the older document capture handler. */
  window.addEventListener("keydown", guardEvent, true);
  window.addEventListener("keyup", guardEvent, true);
})();
