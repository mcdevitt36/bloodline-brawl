/* =====================================================
   BLOODLINE BRAWL — LIVE VISUAL LOADER
   Forces the newest map refinement pass, then loads the
   final direct visual fixes so the live build cannot miss them.
===================================================== */

(() => {
  window.setTimeout(
    () => {
      try {
        delete window.__bbMapRefineLoaded;
      } catch (error) {
        window.__bbMapRefineLoaded = false;
      }

      const latest =
        document.createElement("script");

      latest.src =
        "map-refine.js?v=4";

      document.body.appendChild(
        latest
      );

      latest.addEventListener(
        "load",
        () => {
          const finalFixes =
            document.createElement("script");

          finalFixes.src =
            "visual-fixes-v4.js?v=1";

          document.body.appendChild(
            finalFixes
          );
        },
        {
          once: true
        }
      );
    },
    1200
  );
})();
