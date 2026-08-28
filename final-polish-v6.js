/* =====================================================
   BLOODLINE BRAWL — FINAL POLISH V6
   Tiny additive Kelly headphone fit tweak only.
===================================================== */

(() => {
  if (window.__bbFinalPolishV6Loaded) return;
  window.__bbFinalPolishV6Loaded = true;

  const style = document.createElement("style");
  style.textContent = `
    /* Lift the full headset a touch more. */
    .kelly-model .bb4-headphones {
      top: 3px !important;
    }

    /* Move the ear cups slightly farther out from Kelly's head. */
    .kelly-model .bb4-headphones::before {
      left: -14px !important;
    }

    .kelly-model .bb4-headphones::after {
      right: -14px !important;
    }
  `;

  document.head.appendChild(style);
})();
