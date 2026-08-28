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
              /* Nick's fighter/combat definitions load BEFORE Family Challenges.
                 That way the existing challenge wrapper sees Nick's real melee,
                 special and ultimate just like every other fighter. Nick remains
                 hidden from character select until Erin's reveal unlocks him. */
              const nickFighter = document.createElement("script");
              nickFighter.src = "nick-fighter-v1.js?v=1";
              document.body.appendChild(nickFighter);

              nickFighter.addEventListener(
                "load",
                () => {
                  /* Bridge the older closed fighter-profile move list so Nick's
                     unlocked card gets a complete profile and responsive sizing. */
                  const nickIntegrationPolish = document.createElement("script");
                  nickIntegrationPolish.src = "nick-integration-polish-v2.js?v=1";
                  document.body.appendChild(nickIntegrationPolish);

                  /* Existing rotating progression remains the authority for
                     Daily/Weekly Family XP and cosmetic rewards. */
                  const familyChallenges = document.createElement("script");
                  familyChallenges.src = "challenge-system-v1.js?v=1";
                  document.body.appendChild(familyChallenges);

                  familyChallenges.addEventListener(
                    "load",
                    () => {
                      /* Erin's permanent quest exists ONLY inside the existing
                         Challenges hub. No extra title/menu button is created. */
                      const erinChallenge = document.createElement("script");
                      erinChallenge.src = "erin-nick-challenge-v1.js?v=1";
                      document.body.appendChild(erinChallenge);

                      /* Final visual authority for Westhampton Sunset stays
                         after the challenge system's base map-variant CSS. */
                      const sunsetPolish = document.createElement("script");
                      sunsetPolish.src = "westhampton-sunset-polish-v2.js?v=1";
                      document.body.appendChild(sunsetPolish);
                    },
                    { once: true }
                  );

                  /* Important performance change: the heavy WebRTC/private-match
                     code is NOT loaded during normal 1P/2P play anymore. This
                     lightweight button loads it only after ONLINE is clicked. */
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
  modeLauncher.src = "mode-launcher-v11.js?v=1";
  document.body.appendChild(modeLauncher);
})();