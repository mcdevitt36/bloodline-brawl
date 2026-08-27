/* =====================================================
   BLOODLINE BRAWL — CHARACTER SELECT BOOTSTRAP
   Stability-first loader. Keeps the working character-select
   overhaul enabled while the newer presentation layer is disabled.
===================================================== */

(() => {
  const core =
    document.createElement("script");

  core.src =
    "selection-overhaul-core.js?v=2";

  document.body.appendChild(
    core
  );
})();
