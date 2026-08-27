/* =====================================================
   BLOODLINE BRAWL — SELECTION / PRESENTATION BOOTSTRAP
   Loads the stable character-select overhaul first, then the
   safe presentation layer after it finishes.
===================================================== */

(() => {
  const core =
    document.createElement("script");

  core.src =
    "selection-overhaul-core.js?v=2";

  document.body.appendChild(
    core
  );

  core.addEventListener(
    "load",
    () => {
      const presentation =
        document.createElement("script");

      presentation.src =
        "presentation-upgrades.js?v=3";

      document.body.appendChild(
        presentation
      );
    },
    {
      once: true
    }
  );
})();
