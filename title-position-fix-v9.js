/* =====================================================
   BLOODLINE BRAWL — TITLE POSITION FIX V9
   Late additive UI-only correction.
   - Remove the FAMILY SHOWDOWN addition
   - Move the matchup back down to a balanced middle position
   - Keep the newer red/yellow panel polish and character-select work
===================================================== */

(() => {
  if (window.__bbTitlePositionFixV9Loaded) return;
  window.__bbTitlePositionFixV9Loaded = true;

  const style = document.createElement("style");

  style.textContent = `
    /* Restore a flexible center row so the matchup is not jammed
       directly under the logo/tagline. */
    .title-content {
      grid-template-rows:
        auto
        auto
        minmax(0, 1fr)
        76px !important;
    }

    /* Remove the extra label and decorative line from V8. */
    .title-versus-panel::before,
    .title-versus-panel::after {
      content: none !important;
      display: none !important;
    }

    /* Middle ground between the old overly-large gap and V8 being
       pushed too high. */
    .title-versus-panel {
      grid-row: 3 !important;
      align-self: center !important;
      margin: 0 auto !important;
      transform: translateY(-20px) !important;
    }

    .mode-title,
    .mode-buttons,
    .title-start,
    .challenge-button {
      grid-row: 4 !important;
      align-self: center !important;
      margin-bottom: 0 !important;
    }

    @media (max-height: 780px) {
      .title-versus-panel {
        transform: translateY(-10px) !important;
      }
    }
  `;

  document.head.appendChild(style);

  const v10 = document.createElement("script");
  v10.src = "title-art-polish-v10.js?v=1";
  document.body.appendChild(v10);

  v10.addEventListener(
    "load",
    () => {
      const connorStubblePolish = document.createElement("script");
      connorStubblePolish.src = "connor-stubble-polish-v1.js?v=5";
      document.body.appendChild(connorStubblePolish);
    },
    { once: true }
  );

  const singlePlayerControls = document.createElement("script");
  singlePlayerControls.src = "single-player-controls-v1.js?v=1";
  document.body.appendChild(singlePlayerControls);

  const combatTuning = document.createElement("script");
  combatTuning.src = "combat-tuning-v12.js?v=2";
  document.body.appendChild(combatTuning);
})();
