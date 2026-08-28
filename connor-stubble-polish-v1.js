/* =====================================================
   BLOODLINE BRAWL — CONNOR LIGHT BEARD POLISH V5
   Visual-only additive patch.
   Uses Connor's existing beard element so the same beard appears
   anywhere characterHTML("connor") is rendered: title, select,
   previews, battle, and celebrations.
===================================================== */

(() => {
  if (window.__bbConnorBeardPolishV5Loaded) return;
  window.__bbConnorBeardPolishV5Loaded = true;

  const style = document.createElement("style");

  style.textContent = `
    /* Remove any older face-overlay beard. */
    .connor-model .face::after {
      content: none !important;
      display: none !important;
    }

    /*
      Same short connected beard shape, darkened roughly two visual
      steps from V4 while staying brown rather than near-black.
    */
    .connor-model .connor-stubble {
      display: block !important;
      position: absolute !important;
      width: 39px !important;
      height: 19px !important;
      left: 31px !important;
      top: 50px !important;
      box-sizing: border-box !important;
      z-index: 9 !important;
      pointer-events: none !important;

      background:
        linear-gradient(
          180deg,
          rgba(50,32,24,.46) 0%,
          rgba(50,32,24,.62) 42%,
          rgba(44,28,21,.76) 100%
        ) !important;

      border-left: 2px solid rgba(42,26,20,.78) !important;
      border-right: 2px solid rgba(42,26,20,.78) !important;
      border-bottom: 2px solid rgba(42,26,20,.86) !important;
      border-top: 0 !important;
      border-radius: 0 0 13px 13px !important;
    }

    /* Sideburns remain connected directly into the jaw beard. */
    .connor-model .connor-stubble::before,
    .connor-model .connor-stubble::after {
      content: "" !important;
      position: absolute !important;
      top: -13px !important;
      width: 5px !important;
      height: 15px !important;
      background:
        linear-gradient(
          180deg,
          rgba(46,29,22,.86),
          rgba(46,29,22,.70)
        ) !important;
      border-radius: 2px 2px 1px 1px !important;
    }

    .connor-model .connor-stubble::before {
      left: -2px !important;
    }

    .connor-model .connor-stubble::after {
      right: -2px !important;
    }

    /* Keep his eyes and mouth clean above the beard shading. */
    .connor-model .face .eye,
    .connor-model .face .mouth {
      position: absolute !important;
      z-index: 12 !important;
    }
  `;

  document.head.appendChild(style);
})();
