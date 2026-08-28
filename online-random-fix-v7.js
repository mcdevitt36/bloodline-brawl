/* =====================================================
   BLOODLINE BRAWL — ONLINE RANDOM FIGHTER FIX V7
   Online/private-match only.
   - Random never gets submitted as a literal character id
   - Host and guest both resolve RANDOM to a real unlocked fighter
   - Offline 1P / local 2P random behavior remains untouched
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

  const getCandidates = randomCard => {
    const grid = randomCard.closest(".fighter-select");
    if (!grid) return [];

    return Array.from(
      grid.querySelectorAll('.fighter-card[data-character]:not(.bb-random-card)')
    ).filter(card => {
      const character = card.dataset.character;
      if (!character || character === "random") return false;
      if (card.classList.contains("locked")) return false;

      if (
        character === "martin" &&
        typeof isMartinUnlocked === "function" &&
        !isMartinUnlocked()
      ) {
        return false;
      }

      return true;
    });
  };

  const flashCard = card => {
    if (!card) return;
    const oldOutline = card.style.outline;
    const oldOffset = card.style.outlineOffset;
    card.style.outline = "3px solid #ffd52a";
    card.style.outlineOffset = "-3px";

    setTimeout(() => {
      card.style.outline = oldOutline;
      card.style.outlineOffset = oldOffset;
    }, 72);
  };

  document.addEventListener(
    "click",
    event => {
      if (!isOnlineSelect()) return;

      const randomCard = event.target.closest(".bb-random-card");
      if (!randomCard) return;

      /* Beat the older online document handler before it can submit
         character: "random" over the network. */
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      if (rolling) return;

      const candidates = getCandidates(randomCard);
      if (!candidates.length) return;

      rolling = true;
      randomCard.classList.add("bb-random-rolling");

      let flashes = 0;
      const totalFlashes = 5;

      const timer = setInterval(() => {
        flashCard(
          candidates[Math.floor(Math.random() * candidates.length)]
        );

        flashes += 1;

        if (flashes >= totalFlashes) {
          clearInterval(timer);

          const chosen =
            candidates[Math.floor(Math.random() * candidates.length)];

          setTimeout(() => {
            randomCard.classList.remove("bb-random-rolling");
            rolling = false;

            /* This is now a real roster card, so the normal online
               selection/sync path handles it for host or guest. */
            chosen.click();
          }, 85);
        }
      }, 78);
    },
    true
  );
})();
