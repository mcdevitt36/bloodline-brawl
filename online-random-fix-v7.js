/* =====================================================
   BLOODLINE BRAWL — ONLINE RANDOM FIGHTER FIX V7
   Online/private-match only.
   Reuse the exact RANDOM button handler already used by 1P / local 2P.
===================================================== */

(() => {
  if (window.__bbOnlineRandomFixV7Loaded) return;
  window.__bbOnlineRandomFixV7Loaded = true;

  let replayingThroughBaseRandomHandler = false;

  const isOnlineSelect = () =>
    document.body.classList.contains("bb-online-active") &&
    typeof selectScreen !== "undefined" &&
    selectScreen &&
    selectScreen.classList.contains("active");

  document.addEventListener(
    "click",
    event => {
      if (!isOnlineSelect()) return;

      const randomCard = event.target.closest(".bb-random-card");
      if (!randomCard) return;

      /* The replayed click is allowed to continue normally. It reaches the
         original ui-random-title.js card listener — the same Random logic
         used by 1P and local 2P. That existing handler rolls the roster and
         eventually clicks a REAL fighter card. The normal online selector
         then receives only that real fighter and syncs it to the opponent. */
      if (replayingThroughBaseRandomHandler) {
        replayingThroughBaseRandomHandler = false;
        return;
      }

      /* Stop this first online click before the online document selector can
         ever interpret data-character="random" as a fighter id. */
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      replayingThroughBaseRandomHandler = true;

      setTimeout(() => {
        try {
          randomCard.click();
        } finally {
          /* If the synthetic click was blocked for any unusual reason,
             never leave the bypass armed for a future user click. */
          setTimeout(() => {
            replayingThroughBaseRandomHandler = false;
          }, 0);
        }
      }, 0);
    },
    true
  );
})();
