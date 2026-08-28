/* =====================================================
   BLOODLINE BRAWL — ONLINE RANDOM FIGHTER FIX V7
   Private-match only.
   Replicates the original ui-random-title.js Random-card logic exactly,
   but runs at WINDOW capture so it executes before online-mode's DOCUMENT
   capture handler can mistake data-character="random" for a real fighter.
===================================================== */

(() => {
  if (window.__bbOnlineRandomFixV7Loaded) return;
  window.__bbOnlineRandomFixV7Loaded = true;

  let rolling = false;

  const isOnlineSelect = () =>
    document.body.classList.contains("bb-online-active") &&
    typeof selectScreen !== "undefined" &&
    selectScreen &&
    selectScreen.classList.contains("active");

  window.addEventListener(
    "click",
    event => {
      if (!isOnlineSelect()) return;

      const card = event.target.closest(".bb-random-card");
      if (!card) return;

      /* This must happen on window capture. online-mode-v1.js owns fighter
         clicks on document capture, so any later document listener loses.
         Taking RANDOM here guarantees only the final REAL fighter click
         reaches the online selection/sync handler. */
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      if (rolling) return;

      const grid = card.closest(".fighter-select");
      if (!grid) return;

      /* Same candidate logic used by the original 1P / 2P Random button. */
      const candidates = Array.from(
        grid.querySelectorAll(
          '.fighter-card[data-character]:not(.bb-random-card)'
        )
      ).filter(candidate => {
        const character = candidate.dataset.character;

        if (!character) return false;
        if (candidate.classList.contains("locked")) return false;

        if (
          character === "martin" &&
          typeof isMartinUnlocked === "function" &&
          !isMartinUnlocked()
        ) {
          return false;
        }

        return true;
      });

      if (!candidates.length) return;

      rolling = true;
      card.classList.add("bb-random-rolling");

      let flashes = 0;
      const totalFlashes = 5;

      /* Same 5-flash / 78ms roll cadence as ui-random-title.js. */
      const flashTimer = window.setInterval(() => {
        const flashCard =
          candidates[Math.floor(Math.random() * candidates.length)];

        candidates.forEach(candidate => {
          candidate.classList.remove("bb-random-flash");
        });

        flashCard.style.outline = "3px solid #ffd52a";
        flashCard.style.outlineOffset = "-3px";

        window.setTimeout(() => {
          flashCard.style.outline = "";
          flashCard.style.outlineOffset = "";
        }, 72);

        flashes += 1;

        if (flashes >= totalFlashes) {
          window.clearInterval(flashTimer);

          const chosen =
            candidates[Math.floor(Math.random() * candidates.length)];

          window.setTimeout(() => {
            card.classList.remove("bb-random-rolling");
            rolling = false;

            /* chosen is a normal fighter card. Its new click starts at
               window again, this handler ignores it, and online-mode's
               document-capture selector receives the real character id. */
            chosen.click();
          }, 85);
        }
      }, 78);
    },
    true
  );
})();
