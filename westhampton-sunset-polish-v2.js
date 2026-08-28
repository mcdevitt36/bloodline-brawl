/* =====================================================
   BLOODLINE BRAWL — WESTHAMPTON SUNSET POLISH V2
   Visual-only override for the unlockable Westhampton Sunset variant.
   Makes the whole sky read as sunset and lowers the sun toward the horizon.
===================================================== */

(() => {
  if (window.__bbWesthamptonSunsetPolishV2Loaded) return;
  window.__bbWesthamptonSunsetPolishV2Loaded = true;

  const style = document.createElement("style");
  style.id = "bb-westhampton-sunset-polish-v2";

  style.textContent = `
    /* Strong sunset sky wash: deep violet up top, pink/coral through the
       middle, then orange/gold at the horizon. It fades before the beach so
       the existing Westhampton scenery remains readable. */
    .bb-map-variant-layer.sunset {
      background:
        linear-gradient(
          180deg,
          rgba(72, 41, 119, .72) 0%,
          rgba(139, 54, 126, .70) 16%,
          rgba(218, 73, 121, .72) 32%,
          rgba(248, 104, 92, .74) 47%,
          rgba(255, 151, 78, .68) 59%,
          rgba(255, 202, 103, .52) 69%,
          rgba(255, 221, 145, .24) 76%,
          transparent 84%
        ) !important;
      mix-blend-mode: normal !important;
      opacity: 1 !important;
    }

    /* Warm horizon band plus a subtle reflection toward the water/beach. */
    .bb-map-variant-layer.sunset::before {
      content: "" !important;
      position: absolute !important;
      inset: 0 !important;
      pointer-events: none !important;
      background:
        radial-gradient(
          ellipse at 78% 70%,
          rgba(255, 210, 121, .42) 0 9%,
          rgba(255, 164, 88, .24) 18%,
          rgba(255, 108, 92, .10) 29%,
          transparent 43%
        ),
        linear-gradient(
          180deg,
          transparent 0 57%,
          rgba(255, 178, 91, .08) 65%,
          rgba(255, 125, 82, .13) 73%,
          transparent 84%
        ) !important;
    }

    /* Sunset sun: lower, warmer and visibly descending instead of a white
       circle high in the sky. */
    .bb-map-variant-layer.sunset::after {
      content: "" !important;
      position: absolute !important;
      right: 12% !important;
      top: auto !important;
      bottom: 24% !important;
      width: 92px !important;
      height: 92px !important;
      border-radius: 50% !important;
      transform: none !important;
      background:
        radial-gradient(
          circle at 42% 38%,
          #fff0b0 0 12%,
          #ffd36b 25%,
          #ffad4d 52%,
          #f47b4c 74%,
          #db5364 100%
        ) !important;
      box-shadow:
        0 0 18px rgba(255, 208, 100, .68),
        0 0 42px rgba(255, 144, 75, .52),
        0 0 82px rgba(226, 79, 103, .34) !important;
      opacity: .98 !important;
    }

    /* Keep the foreground from looking washed out while the sky stays rich. */
    #arena.map-westhampton:has(.bb-map-variant-layer.sunset) .map-decor {
      filter: saturate(1.08) contrast(1.03) !important;
    }

    @media (max-width: 760px) {
      .bb-map-variant-layer.sunset::after {
        width: 72px !important;
        height: 72px !important;
        right: 10% !important;
        bottom: 27% !important;
      }
    }
  `;

  document.head.appendChild(style);
})();
