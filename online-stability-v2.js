/* =====================================================
   BLOODLINE BRAWL — ONLINE STABILITY V2
   Tiny additive safety fix.
   A fresh match must always restore fighters hidden by the final-KO
   celebration before rematch / synced online start.
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
})();
