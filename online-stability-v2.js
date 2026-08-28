/* =====================================================
   BLOODLINE BRAWL — ONLINE STABILITY V2
   Online-only match reset safety.
   Supporting online scripts are loaded sequentially by online-lazy-loader-v4.
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

    return previousBeginMatchOnlineStabilityV2.apply(this, arguments);
  };
})();
