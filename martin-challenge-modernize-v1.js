/* =====================================================
   BLOODLINE BRAWL — MARTIN CHALLENGE MODERNIZE V1
   Small additive UI/navigation correction only.
   - Martin's Challenge now uses the SAME modern fighter-select screen
     as normal 1P / 2P instead of the old separate challenge picker.
   - Challenge map selection uses the SAME modern map screen too.
   - Keeps Martin as the challenge opponent and preserves boss logic.
===================================================== */

(() => {
  if (window.__bbMartinChallengeModernizeV1Loaded) return;
  window.__bbMartinChallengeModernizeV1Loaded = true;

  const selectHeading = selectScreen && selectScreen.querySelector(".screen-heading");

  const style = document.createElement("style");
  style.textContent = `
    /* Same select/map layouts as the normal game — only a tiny challenge accent. */
    .select-screen.bb-martin-challenge-select .screen-kicker,
    .map-screen.bb-martin-challenge-map .screen-kicker {
      color: #ff665c !important;
    }

    .select-screen.bb-martin-challenge-select .selection-prompt {
      border-left-color: #ffd52a !important;
      border-right-color: #ff665c !important;
    }

    .select-screen.bb-martin-challenge-select [data-character="martin"] {
      filter: grayscale(.28) brightness(.72) !important;
    }

    .select-screen.bb-martin-challenge-select [data-character="martin"]::before {
      content: "BOSS";
      position: absolute;
      left: 6px;
      top: 6px;
      z-index: 55;
      padding: 3px 6px;
      border: 2px solid #111;
      border-radius: 4px;
      background: #ef352b;
      color: #fff;
      font: 1000 8px Arial, sans-serif;
      letter-spacing: 1px;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);

  function applyChallengeSelectLabels() {
    if (!challengeMode) return;

    selectScreen.classList.add("bb-martin-challenge-select");
    mapScreen.classList.remove("bb-martin-challenge-map");

    selectModeLabel.textContent = "MARTIN'S CHALLENGE";
    if (selectHeading) selectHeading.textContent = "SELECT YOUR FIGHTER";

    if (!player1Character) {
      selectionPrompt.textContent = "CHOOSE WHO WILL TAKE ON MARTIN";
    } else {
      selectionPrompt.textContent = displayName(player1Character) + " VS MARTIN — CHOOSE THE BATTLEFIELD";
    }

    mapSelectButton.textContent = "CHOOSE MAP";
  }

  function applyChallengeMapLabels() {
    if (!challengeMode) return;

    selectScreen.classList.remove("bb-martin-challenge-select");
    mapScreen.classList.add("bb-martin-challenge-map");
    mapModeLabel.textContent = "MARTIN'S CHALLENGE";
    fightButton.textContent = "FIGHT MARTIN";
  }

  function restoreNormalChallengeUI() {
    selectScreen.classList.remove("bb-martin-challenge-select");
    mapScreen.classList.remove("bb-martin-challenge-map");
    fightButton.textContent = "FIGHT";
    mapSelectButton.textContent = "CHOOSE MAP";
    if (selectHeading) selectHeading.textContent = "SELECT YOUR FIGHTER";
  }

  /* Replace only the challenge entry route. The actual fighter cards,
     detail ribbon and selection logic remain the same modern 1P screen. */
  openMartinChallenge = function() {
    challengeMode = true;
    challengeResult = null;
    gameMode = "1P";

    resetSelection();
    applyChallengeSelectLabels();
    showScreen(selectScreen);
  };

  /* Martin is the opponent here, never a selectable challenge fighter.
     All other current roster cards — including later-added fighters and
     Random — keep their normal 1P behavior. */
  selectScreen.addEventListener(
    "click",
    event => {
      if (!challengeMode) return;

      const card = event.target.closest(".fighter-card");
      if (!card) return;

      if (card.dataset.character === "martin") {
        event.preventDefault();
        event.stopImmediatePropagation();
        selectionPrompt.textContent = "MARTIN IS THE BOSS — CHOOSE SOMEONE ELSE";
        return;
      }

      setTimeout(applyChallengeSelectLabels, 0);
    },
    true
  );

  /* The normal map button already opens the shared modern map screen.
     Just give that shared screen the correct challenge labels. */
  const previousMapSelectChallengeV1 = mapSelectButton.onclick;
  mapSelectButton.onclick = function(...args) {
    const result = previousMapSelectChallengeV1 &&
      previousMapSelectChallengeV1.apply(this, args);

    if (challengeMode) applyChallengeMapLabels();
    return result;
  };

  /* In the old flow BACK from the map returned to the obsolete challenge
     picker. Challenge mode now returns to the same modern select screen. */
  const previousBackToFighterChallengeV1 = backToFighterButton.onclick;
  backToFighterButton.onclick = function(...args) {
    if (challengeMode) {
      showScreen(selectScreen);
      applyChallengeSelectLabels();
      return;
    }

    return previousBackToFighterChallengeV1 &&
      previousBackToFighterChallengeV1.apply(this, args);
  };

  /* Leaving the modern challenge select should cleanly restore normal UI. */
  const previousBackToTitleChallengeV1 = backToTitleButton.onclick;
  backToTitleButton.onclick = function(...args) {
    if (challengeMode) {
      challengeMode = false;
      challengeResult = null;
      restoreNormalChallengeUI();
    }

    return previousBackToTitleChallengeV1 &&
      previousBackToTitleChallengeV1.apply(this, args);
  };

  /* TRY AGAIN previously reopened the old challenge picker. Keep the
     existing match cleanup, then route the retry into the modern select. */
  const previousNewGameChallengeV1 = newGameButton.onclick;
  newGameButton.onclick = function(...args) {
    const wasChallenge = challengeMode;
    const previousResult = challengeResult;

    const result = previousNewGameChallengeV1 &&
      previousNewGameChallengeV1.apply(this, args);

    if (wasChallenge && previousResult === "lost") {
      challengeMode = true;
      challengeResult = null;
      gameMode = "1P";
      resetSelection();
      applyChallengeSelectLabels();
      showScreen(selectScreen);
    } else if (wasChallenge && previousResult === "won") {
      restoreNormalChallengeUI();
    }

    return result;
  };
})();
