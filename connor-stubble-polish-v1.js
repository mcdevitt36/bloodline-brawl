/* =====================================================
   BLOODLINE BRAWL — CONNOR LIGHT BEARD POLISH V2
   Visual-only additive patch.
===================================================== */

(() => {
  if (window.__bbConnorBeardPolishV2Loaded) return;
  window.__bbConnorBeardPolishV2Loaded = true;

  const style = document.createElement("style");

  style.textContent = `
    /* Hide the old heavy outlined stubble treatment. */
    .connor-model .connor-stubble {
      display: none !important;
    }

    /* Light, soft jaw/chin beard — visible but intentionally not thick. */
    .connor-model .face::after {
      content: "";
      position: absolute;
      left: 2px;
      right: 2px;
      bottom: 1px;
      height: 17px;
      border-radius: 2px 2px 9px 9px;
      background:
        linear-gradient(
          180deg,
          rgba(92,61,43,.08) 0%,
          rgba(92,61,43,.20) 32%,
          rgba(92,61,43,.30) 100%
        );
      border-left: 1px solid rgba(79,51,36,.28);
      border-right: 1px solid rgba(79,51,36,.28);
      border-bottom: 2px solid rgba(79,51,36,.34);
      box-sizing: border-box;
      pointer-events: none;
      z-index: 1;
    }

    /* Keep Connor's facial features crisp above the beard shading. */
    .connor-model .face .eye,
    .connor-model .face .mouth {
      position: absolute;
      z-index: 3;
    }
  `;

  document.head.appendChild(style);
})();
