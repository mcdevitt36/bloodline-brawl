/* =====================================================
   BLOODLINE BRAWL — TITLE ART POLISH V10
   Late additive UI-only refinement.
   - Leave toddler/title character sizing alone
   - Nudge matchup slightly lower for balance
   - Add subtle inward yellow/red versus lighting
   - Tighten and align the bottom controls as one footer row
===================================================== */

(() => {
  if (window.__bbTitleArtPolishV10Loaded) return;
  window.__bbTitleArtPolishV10Loaded = true;

  const style = document.createElement("style");

  style.textContent = `
    /* -------------------------------------------------
       MATCHUP — A TOUCH LOWER, NOT A REDESIGN
    ------------------------------------------------- */
    .title-versus-panel {
      transform: translateY(-8px) !important;
    }

    /* -------------------------------------------------
       SUBTLE VS LIGHTING
       Yellow grows inward from P1, red grows inward from P2.
    ------------------------------------------------- */
    .title-fighter:first-child {
      background:
        radial-gradient(
          circle at 100% 48%,
          rgba(255,213,42,.20) 0%,
          rgba(255,213,42,.075) 27%,
          transparent 55%
        ),
        linear-gradient(
          180deg,
          rgba(255,255,255,.15),
          rgba(10,18,27,.13) 49%,
          rgba(5,10,16,.56) 100%
        ) !important;
      box-shadow:
        0 9px 0 rgba(0,0,0,.22),
        inset -20px 0 34px rgba(255,213,42,.055),
        inset 0 0 0 2px rgba(255,255,255,.05) !important;
    }

    .title-fighter:last-child {
      background:
        radial-gradient(
          circle at 0% 48%,
          rgba(239,53,43,.20) 0%,
          rgba(239,53,43,.075) 27%,
          transparent 55%
        ),
        linear-gradient(
          180deg,
          rgba(255,255,255,.15),
          rgba(10,18,27,.13) 49%,
          rgba(5,10,16,.56) 100%
        ) !important;
      box-shadow:
        0 9px 0 rgba(0,0,0,.22),
        inset 20px 0 34px rgba(239,53,43,.055),
        inset 0 0 0 2px rgba(255,255,255,.05) !important;
    }

    /* -------------------------------------------------
       FOOTER — TIGHTER HORIZONTAL RHYTHM + MATCHED HEIGHTS
    ------------------------------------------------- */
    .title-content {
      grid-template-columns:
        minmax(145px,1fr)
        340px
        238px
        minmax(225px,1fr) !important;
      column-gap: 8px !important;
    }

    .mode-title,
    .mode-buttons,
    .title-start,
    .challenge-button {
      align-self: center !important;
    }

    .mode-title {
      margin-right: 4px !important;
    }

    .mode-buttons {
      gap: 6px !important;
    }

    .mode-button {
      min-height: 58px !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
    }

    .title-start {
      min-height: 58px !important;
      height: 58px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    .challenge-button {
      min-height: 58px !important;
      height: 58px !important;
      margin-left: 4px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    @media (max-height: 780px) {
      .title-versus-panel {
        transform: translateY(-4px) !important;
      }

      .mode-button,
      .title-start,
      .challenge-button {
        min-height: 54px !important;
        height: 54px !important;
      }
    }
  `;

  document.head.appendChild(style);
})();
