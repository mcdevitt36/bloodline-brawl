/* =====================================================
   BLOODLINE BRAWL — ONLINE GUEST INPUT HARDFIX V5
   Online guest only.
   - Consume the guest's physical controls before ANY old local handlers
   - Re-dispatch one protected copy directly into the online input handler
   - Prevent P1/host attack animations from ever being triggered locally
   - Keep the existing guest movement/jump/block prediction intact
===================================================== */

(() => {
  if (window.__bbOnlineGuestInputHardfixV5Loaded) return;
  window.__bbOnlineGuestInputHardfixV5Loaded = true;

  const controlKeys = new Set([
    "a", "d", "w", "s", "q", "r", "e", "f",
    "arrowleft", "arrowright", "arrowup", "arrowdown", " "
  ]);

  const isGuestFight = () =>
    document.body.classList.contains("bb-online-active") &&
    document.body.classList.contains("bb-online-guest") &&
    fightScreen &&
    fightScreen.classList.contains("active");

  function forwardToOnlineHandler(originalEvent, eventType) {
    const key = originalEvent.key.toLowerCase();
    if (!controlKeys.has(key)) return;

    /* The old local game handlers are built around gameMode === "2P".
       Keep them inert for the synthetic dispatch while allowing the later
       online-mode document listener to receive the exact same key. */
    const savedMode = gameMode;
    gameMode = "ONLINE";

    try {
      const forwarded = new KeyboardEvent(eventType, {
        key: originalEvent.key,
        code: originalEvent.code,
        location: originalEvent.location,
        ctrlKey: originalEvent.ctrlKey,
        shiftKey: originalEvent.shiftKey,
        altKey: originalEvent.altKey,
        metaKey: originalEvent.metaKey,
        repeat: originalEvent.repeat,
        bubbles: true,
        cancelable: true
      });

      Object.defineProperty(forwarded, "__bbGuestForwardedV5", {
        value: true,
        configurable: false
      });

      document.dispatchEvent(forwarded);
    } finally {
      gameMode = savedMode;
    }
  }

  function intercept(event, eventType) {
    if (event.__bbGuestForwardedV5) return;
    if (!isGuestFight()) return;

    const key = event.key.toLowerCase();
    if (!controlKeys.has(key)) return;

    /* Hard ownership boundary: nothing below window capture gets the
       physical guest event. This is what prevents P1 from attacking. */
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    forwardToOnlineHandler(event, eventType);
  }

  window.addEventListener(
    "keydown",
    event => intercept(event, "keydown"),
    true
  );

  window.addEventListener(
    "keyup",
    event => intercept(event, "keyup"),
    true
  );
})();
