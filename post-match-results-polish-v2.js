/* =====================================================
   BLOODLINE BRAWL — POST MATCH RESULTS POLISH V2
   Tiny additive cleanup only.
   - Remove the Match MVP block
   - Keep all other results stats, colors, timing and buttons unchanged
===================================================== */

(() => {
  if (window.__bbPostMatchResultsPolishV2Loaded) return;
  window.__bbPostMatchResultsPolishV2Loaded = true;

  const style = document.createElement("style");
  style.textContent = `
    .bb-results-mvp {
      display: none !important;
    }
  `;

  document.head.appendChild(style);
})();
