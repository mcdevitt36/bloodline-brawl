/* =====================================================
   BLOODLINE BRAWL — CONNOR LIGHT STUBBLE POLISH
   Visual-only additive patch.
===================================================== */

(() => {
  if (window.__bbConnorStubblePolishV1Loaded) return;
  window.__bbConnorStubblePolishV1Loaded = true;

  const style = document.createElement("style");

  style.textContent = `
    /* Retire the older outlined beard treatment if it is present. */
    .connor-model .connor-stubble {
      display: none !important;
    }

    /* Very light pixel stubble across Connor's lower cheeks/chin. */
    .connor-model .face::after {
      content: "";
      position: absolute;
      left: 4px;
      right: 4px;
      bottom: 3px;
      height: 15px;
      border-radius: 0 0 10px 10px;
      background-image:
        radial-gradient(circle, rgba(92,61,43,.52) 0 1px, transparent 1.2px);
      background-size: 6px 5px;
      background-position: 1px 0;
      opacity: .42;
      pointer-events: none;
      z-index: 1;
    }

    .connor-model .face .eye,
    .connor-model .face .mouth {
      z-index: 3;
    }
  `;

  document.head.appendChild(style);
})();
