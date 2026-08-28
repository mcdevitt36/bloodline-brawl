/* =====================================================
   BLOODLINE BRAWL — ONLINE STABILITY V2
   Small additive online-only safety layer.
   - Fresh matches restore fighters hidden by the final-KO celebration
   - Load efficient host controls with no extra animation loop
   - Guard guest inputs from the older local-2P R/E capture handler
===================================================== */

(() => {
  if (window.__bbOnlineStabilityV2Loaded) return;
  window.__bbOnlineStabilityV2Loaded = true;

  const previousBeginMatchOnlineStabilityV2 = beginMatch;

  beginMatch = function() {
    player1Fighter.classList.remove("bb-final-ko-cleared");
    player2Fighter.classList.remove("bb-final-ko-cleared");
    koOverlay.classList.add("hidden");
    newGameButton.classList.add("hidden");

    document
      .querySelectorAll(".bb-results-overlay, .bb-online-connection-lost")
      .forEach(el => el.remove());

    return previousBeginMatchOnlineStabilityV2();
  };

  const onlineControlsFix = document.createElement("script");
  onlineControlsFix.src = "online-controls-fix-v4.js?v=1";
  document.body.appendChild(onlineControlsFix);

  onlineControlsFix.addEventListener(
    "load",
    () => {
      const guestInputGuard = document.createElement("script");
      guestInputGuard.src = "online-guest-input-guard-v4.js?v=1";
      document.body.appendChild(guestInputGuard);
    },
    { once: true }
  );
})();
