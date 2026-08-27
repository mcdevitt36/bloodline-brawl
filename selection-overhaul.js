/* =====================================================
   BLOODLINE BRAWL — SELECTION / PRESENTATION BOOTSTRAP
   Keeps the original select overhaul intact, then loads the
   latest presentation upgrades after it finishes.
===================================================== */

(() => {
  const core =
    document.createElement("script");

  core.src =
    "selection-overhaul-core.js?v=1";

  document.body.appendChild(
    core
  );

  core.addEventListener(
    "load",
    () => {
      const presentation =
        document.createElement("script");

      presentation.src =
        "presentation-upgrades.js?v=1";

      document.body.appendChild(
        presentation
      );
    },
    {
      once: true
    }
  );
})();
