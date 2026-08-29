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
  combatTuning.src = "combat-tuning-v12.js?v=3";
  document.body.appendChild(combatTuning);

  combatTuning.addEventListener(
    "load",
    () => {
      const postMatchResults = document.createElement("script");
      postMatchResults.src = "post-match-results-v1.js?v=1";
      document.body.appendChild(postMatchResults);

      postMatchResults.addEventListener(
        "load",
        () => {
          const postMatchResultsPolish = document.createElement("script");
          postMatchResultsPolish.src = "post-match-results-polish-v2.js?v=1";
          document.body.appendChild(postMatchResultsPolish);

          postMatchResultsPolish.addEventListener(
            "load",
            () => {
              const nickFighter = document.createElement("script");
              nickFighter.src = "nick-fighter-v1.js?v=1";
              document.body.appendChild(nickFighter);

              nickFighter.addEventListener(
                "load",
                () => {
                  const nickIntegrationPolish = document.createElement("script");
                  nickIntegrationPolish.src = "nick-integration-polish-v2.js?v=1";
                  document.body.appendChild(nickIntegrationPolish);

                  const familyChallenges = document.createElement("script");
                  familyChallenges.src = "challenge-system-v1.js?v=1";
                  document.body.appendChild(familyChallenges);

                  familyChallenges.addEventListener(
                    "load",
                    () => {
                      const erinChallenge = document.createElement("script");
                      erinChallenge.src = "erin-nick-challenge-v1.js?v=1";
                      document.body.appendChild(erinChallenge);

                      const martinChallengesIntegration = document.createElement("script");
                      martinChallengesIntegration.src = "martin-challenges-integration-v1.js?v=1";
                      document.body.appendChild(martinChallengesIntegration);

                      const sunsetPolish = document.createElement("script");
                      sunsetPolish.src = "westhampton-sunset-polish-v2.js?v=1";
                      document.body.appendChild(sunsetPolish);
                    },
                    { once: true }
                  );

                  const onlineLazyLoader = document.createElement("script");
                  onlineLazyLoader.src = "online-lazy-loader-v4.js?v=4";
                  document.body.appendChild(onlineLazyLoader);
                },
                { once: true }
              );
            },
            { once: true }
          );
        },
        { once: true }
      );
    },
    { once: true }
  );

  const martinChallengeModernize = document.createElement("script");
  martinChallengeModernize.src = "martin-challenge-modernize-v1.js?v=1";
  document.body.appendChild(martinChallengeModernize);

  const modeLauncher = document.createElement("script");
  modeLauncher.src = "mode-launcher-v11.js?v=3";
  document.body.appendChild(modeLauncher);
})();