/* =====================================================
   BLOODLINE BRAWL — CONNOR LIGHT BEARD POLISH V4
   Visual-only additive patch.
   Uses Connor's existing beard element so the same beard appears
   anywhere characterHTML("connor") is rendered: title, select,
   previews, battle, and celebrations.
===================================================== */

(() => {
  if (window.__bbConnorBeardPolishV4Loaded) return;
  window.__bbConnorBeardPolishV4Loaded = true;

  const style = document.createElement("style");

  style.textContent = `
    /* Remove any older face-overlay beard. */
    .connor-model .face::after {
      content: none !important;
      display: none !important;
    }

    /*
      Short connected beard, now clearly darker than V3 without
      becoming a thick/full beard.
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
          rgba(67,43,31,.32) 0%,
          rgba(67,43,31,.48) 42%,
          rgba(61,38,28,.61) 100%
        ) !important;

      border-left: 2px solid rgba(57,35,26,.66) !important;
      border-right: 2px solid rgba(57,35,26,.66) !important;
      border-bottom: 2px solid rgba(57,35,26,.74) !important;
      border-top: 0 !important;
      border-radius: 0 0 13px 13px !important;
    }

    /* Sideburns stay connected directly into the jaw beard. */
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
          rgba(62,39,28,.72),
          rgba(62,39,28,.56)
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
