/* =====================================================
   BLOODLINE BRAWL — CONNOR LIGHT BEARD POLISH V3
   Visual-only additive patch.
   Uses Connor's existing beard element so the same beard appears
   anywhere characterHTML("connor") is rendered: title, select,
   previews, battle, and celebrations.
===================================================== */

(() => {
  if (window.__bbConnorBeardPolishV3Loaded) return;
  window.__bbConnorBeardPolishV3Loaded = true;

  const style = document.createElement("style");

  style.textContent = `
    /* Remove the previous face-overlay beard. */
    .connor-model .face::after {
      content: none !important;
      display: none !important;
    }

    /*
      Light connected beard.
      Slightly darker than V2, but still translucent enough to read
      as a short/light beard instead of a heavy full beard.
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
          rgba(82,53,37,.18) 0%,
          rgba(82,53,37,.31) 42%,
          rgba(76,48,34,.43) 100%
        ) !important;

      border-left: 2px solid rgba(72,45,32,.48) !important;
      border-right: 2px solid rgba(72,45,32,.48) !important;
      border-bottom: 2px solid rgba(72,45,32,.56) !important;
      border-top: 0 !important;
      border-radius: 0 0 13px 13px !important;
    }

    /* Connected sideburns beginning just under Connor's hairline. */
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
          rgba(78,49,34,.50),
          rgba(78,49,34,.38)
        ) !important;
      border-radius: 2px 2px 1px 1px !important;
    }

    .connor-model .connor-stubble::before {
      left: -2px !important;
    }

    .connor-model .connor-stubble::after {
      right: -2px !important;
    }

    /* Keep his facial features crisp and clearly above the beard. */
    .connor-model .face .eye,
    .connor-model .face .mouth {
      position: absolute !important;
      z-index: 12 !important;
    }
  `;

  document.head.appendChild(style);
})();
