/* =====================================================
   BLOODLINE BRAWL — LIVE UI / VISUAL / AUDIO / COMBAT LOADER
===================================================== */

(() => {
  const audio = document.createElement("script");
  audio.src = "audio.js?v=1";
  document.body.appendChild(audio);

  const ui = document.createElement("script");
  ui.src = "ui-random-title.js?v=1";
  document.body.appendChild(ui);

  window.setTimeout(
    () => {
      try {
        delete window.__bbMapRefineLoaded;
      } catch (error) {
        window.__bbMapRefineLoaded = false;
      }

      const latest = document.createElement("script");
      latest.src = "map-refine.js?v=4";
      document.body.appendChild(latest);

      latest.addEventListener(
        "load",
        () => {
          const v4 = document.createElement("script");
          v4.src = "visual-fixes-v4.js?v=1";
          document.body.appendChild(v4);

          v4.addEventListener(
            "load",
            () => {
              const v5 = document.createElement("script");
              v5.src = "visual-fixes-v5.js?v=1";
              document.body.appendChild(v5);

              v5.addEventListener(
                "load",
                () => {
                  const combat = document.createElement("script");
                  combat.src = "combat-smoothing.js?v=1";
                  document.body.appendChild(combat);
                },
                { once: true }
              );
            },
            { once: true }
          );
        },
        { once: true }
      );
    },
    1200
  );
})();
