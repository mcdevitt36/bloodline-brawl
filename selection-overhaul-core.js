/* =====================================================
   BLOODLINE BRAWL — CHARACTER SELECT OVERHAUL
   Additive UI-only patch. Keeps the existing selection logic intact.
===================================================== */

(() => {
  const bbSelectScreen =
    document.getElementById("selectScreen");

  const bbFighterGrid =
    bbSelectScreen &&
    bbSelectScreen.querySelector(
      ".fighter-select"
    );

  const bbSelectionText =
    document.getElementById(
      "selectionText"
    );

  if (
    !bbSelectScreen ||
    !bbFighterGrid ||
    !bbSelectionText
  ) {
    return;
  }


  /* ===================================================
     MOVE DATA SHOWN IN THE RIGHT-SIDE DETAIL PANEL
  =================================================== */

  const bbSelectMoves = {
    brendan: {
      melee: "Golf Club",
      special: "Big Drive",
      ultimate: "IPO"
    },

    grandaddy: {
      melee: "Hammer",
      special: "Ladder",
      ultimate: "Yap Alert"
    },

    connor: {
      melee: "Paintbrush",
      special: "Paint Beast",
      ultimate: "Fried Chicken"
    },

    erin: {
      melee: "Hairbrush",
      special: "Pimple Patch",
      ultimate: "Laundry Avalanche"
    },

    shannan: {
      melee: "Syringe",
      special: "Brainrot",
      ultimate: "Conspiracy"
    },

    liam: {
      melee: "Shoulder Check",
      special: "Rugby Pass",
      ultimate: "Splash Zone"
    },

    grandmommy: {
      melee: "Spatula",
      special: "Donn Assist",
      ultimate: "Chair Yoga"
    },

    sean: {
      melee: "Ice Cream Cone",
      special: "Plates",
      ultimate: "Zombie Deer"
    },

    kelly: {
      melee: "Shovel",
      special: "Take Your Meds!",
      ultimate: "Patient Zero"
    },

    leah: {
      melee: "Knitting Needles",
      special: "Tangled!",
      ultimate: "Yarnageddon!"
    },

    martin: {
      melee: "Paws",
      special: "Dog Breath",
      ultimate: "Clyde Returns"
    }
  };


  /* ===================================================
     STYLE — SAME BLOODLINE BRAWL VISUAL LANGUAGE
  =================================================== */

  const bbSelectStyle =
    document.createElement(
      "style"
    );

  bbSelectStyle.textContent = `
    .select-screen.bb-select-overhauled {
      justify-content: flex-start;
      padding-top: 16px;
      padding-bottom: 16px;
      min-height: 100vh;
    }

    .bb-select-overhauled .screen-kicker {
      margin-bottom: 3px;
    }

    .bb-select-overhauled .screen-heading {
      margin-bottom: 8px;
      font-size: clamp(31px, 4vw, 48px);
    }

    .bb-select-overhauled .selection-prompt {
      margin-bottom: 10px;
      padding: 6px 16px;
    }

    .bb-select-layout {
      width: min(1120px, 100%);
      min-height: 500px;
      display: grid;
      grid-template-columns: minmax(0, 1.7fr) minmax(310px, .95fr);
      gap: 18px;
      align-items: stretch;
    }

    .bb-roster-panel,
    .bb-fighter-detail {
      position: relative;
      background:
        linear-gradient(
          180deg,
          rgba(27,57,84,.97),
          rgba(11,22,33,.98)
        );
      border: 4px solid #53697d;
      border-radius: 11px;
      box-shadow:
        0 8px 0 rgba(0,0,0,.32),
        inset 0 0 0 2px rgba(255,255,255,.035);
      overflow: hidden;
    }

    .bb-roster-panel::before,
    .bb-fighter-detail::before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 7px;
      background: #2c9ce8;
      box-shadow: 0 2px 0 #0b1722;
    }

    .bb-roster-panel {
      padding: 19px 14px 14px;
    }

    .bb-roster-title,
    .bb-detail-kicker {
      color: #a9dfff;
      font-size: 10px;
      font-weight: 1000;
      letter-spacing: 4px;
      text-transform: uppercase;
    }

    .bb-roster-title {
      margin: 0 2px 10px;
    }

    .bb-select-overhauled .fighter-select {
      width: 100%;
      max-width: none;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 9px;
    }

    .bb-select-overhauled .fighter-card {
      min-height: 137px;
      padding: 8px 6px 7px;
      border-width: 3px;
      border-radius: 7px;
      justify-content: flex-end;
      background:
        linear-gradient(
          180deg,
          #20394e,
          #101922
        );
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.035);
    }

    .bb-select-overhauled .fighter-card:hover,
    .bb-select-overhauled .fighter-card:focus-visible {
      border-color: #9ddaff;
      transform: translateY(-2px);
      box-shadow:
        0 0 13px rgba(80,180,255,.26),
        inset 0 0 0 1px rgba(255,255,255,.06);
      outline: none;
    }

    .bb-select-overhauled .fighter-card.p1-selected {
      border-color: #44b9ff;
      box-shadow: 0 0 18px rgba(68,185,255,.55);
    }

    .bb-select-overhauled .fighter-card.p2-selected {
      border-color: #ff665c;
      box-shadow: 0 0 18px rgba(255,102,92,.52);
    }

    .bb-select-overhauled .card-model-holder {
      width: 100%;
      height: 91px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      overflow: visible;
    }

    .bb-select-overhauled .card-model-holder .pixel-person,
    .bb-select-overhauled .card-model-holder .martin-model {
      transform: scale(.47) !important;
      transform-origin: bottom center !important;
    }

    .bb-select-overhauled .fighter-card > strong {
      width: 100%;
      margin-top: 3px;
      font-family: Impact, "Arial Black", sans-serif;
      font-size: 14px;
      letter-spacing: .5px;
      text-align: center;
      text-shadow: 2px 2px #080b0e;
    }

    .bb-select-overhauled .fighter-card > small {
      display: none;
    }

    .bb-select-overhauled .lock-overlay {
      z-index: 80;
      padding: 4px;
    }

    .bb-select-overhauled .lock-overlay strong {
      font-size: 15px;
    }

    .bb-select-overhauled .lock-overlay small {
      display: block;
      min-height: 0;
      margin-top: 4px;
      font-size: 7px;
      text-align: center;
    }

    .bb-fighter-detail {
      min-height: 500px;
      padding: 21px 18px 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .bb-fighter-detail::before {
      background: #ffd52a;
    }

    .bb-detail-kicker {
      color: #ffd52a;
      align-self: stretch;
      text-align: center;
      margin-bottom: 1px;
    }

    .bb-detail-name {
      width: 100%;
      min-height: 48px;
      margin-top: 2px;
      color: #fff;
      font-family: Impact, "Arial Black", sans-serif;
      font-size: 34px;
      letter-spacing: 1px;
      text-align: center;
      text-shadow:
        3px 3px #090d11,
        0 0 10px rgba(255,213,42,.16);
    }

    .bb-detail-preview {
      width: 100%;
      height: 210px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      position: relative;
      margin: 0 0 6px;
      background:
        radial-gradient(
          circle at 50% 66%,
          rgba(67,155,210,.22),
          rgba(15,27,38,.05) 57%,
          transparent 58%
        );
      border-bottom: 2px solid rgba(127,157,181,.28);
    }

    .bb-detail-preview::after {
      content: "";
      position: absolute;
      width: 150px;
      height: 22px;
      left: 50%;
      bottom: 2px;
      transform: translateX(-50%);
      border-radius: 50%;
      background: rgba(0,0,0,.28);
      filter: blur(2px);
      z-index: 0;
    }

    .bb-detail-preview .pixel-person,
    .bb-detail-preview .martin-model {
      position: relative;
      z-index: 2;
      transform: scale(1.02) !important;
      transform-origin: bottom center !important;
    }

    .bb-detail-moves {
      width: 100%;
      display: grid;
      gap: 7px;
      margin-top: 7px;
    }

    .bb-detail-move {
      min-height: 50px;
      display: grid;
      grid-template-columns: 76px 1fr;
      align-items: center;
      gap: 10px;
      padding: 7px 10px;
      background: #111c26;
      border: 2px solid #354b5e;
      border-radius: 7px;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.025);
    }

    .bb-detail-move-type {
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      color: #0b1015;
      font-size: 9px;
      font-weight: 1000;
      letter-spacing: 1px;
    }

    .bb-detail-move.melee .bb-detail-move-type {
      background: #ff9b3f;
    }

    .bb-detail-move.special .bb-detail-move-type {
      background: #55c7ff;
    }

    .bb-detail-move.ultimate .bb-detail-move-type {
      background: #d88dff;
    }

    .bb-detail-move-name {
      color: #f5f8fa;
      font-size: 14px;
      font-weight: 900;
      line-height: 1.1;
    }

    .bb-select-overhauled .selection-summary {
      width: 100%;
      min-height: 24px;
      margin: 10px 0 0;
      color: #b7c7d4;
      font-size: 11px;
      text-align: center;
      letter-spacing: 1px;
    }

    .bb-select-overhauled .screen-button-row {
      margin-top: 12px;
    }

    @media (max-width: 950px) {
      .bb-select-layout {
        grid-template-columns: 1.4fr .9fr;
        gap: 12px;
      }

      .bb-select-overhauled .fighter-select {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .bb-select-overhauled .fighter-card {
        min-height: 125px;
      }

      .bb-select-overhauled .card-model-holder {
        height: 80px;
      }

      .bb-fighter-detail {
        min-height: 470px;
      }
    }

    @media (max-width: 760px) {
      .select-screen.bb-select-overhauled {
        overflow-y: auto;
      }

      .bb-select-layout {
        grid-template-columns: 1fr;
      }

      .bb-fighter-detail {
        min-height: 470px;
      }
    }
  `;

  document.head.appendChild(
    bbSelectStyle
  );


  /* ===================================================
     BUILD THE TWO-COLUMN SELECT LAYOUT
  =================================================== */

  bbSelectScreen.classList.add(
    "bb-select-overhauled"
  );

  const bbSelectLayout =
    document.createElement(
      "div"
    );

  bbSelectLayout.className =
    "bb-select-layout";


  const bbRosterPanel =
    document.createElement(
      "div"
    );

  bbRosterPanel.className =
    "bb-roster-panel";

  bbRosterPanel.innerHTML = `
    <div class="bb-roster-title">
      FAMILY ROSTER
    </div>
  `;


  const bbDetailPanel =
    document.createElement(
      "div"
    );

  bbDetailPanel.className =
    "bb-fighter-detail";

  bbDetailPanel.innerHTML = `
    <div class="bb-detail-kicker">
      FIGHTER PROFILE
    </div>

    <div
      id="bbDetailName"
      class="bb-detail-name"
    >
      CHOOSE A FIGHTER
    </div>

    <div
      id="bbDetailPreview"
      class="bb-detail-preview"
    ></div>

    <div
      id="bbDetailMoves"
      class="bb-detail-moves"
    ></div>
  `;


  bbFighterGrid.parentNode.insertBefore(
    bbSelectLayout,
    bbFighterGrid
  );

  bbSelectLayout.appendChild(
    bbRosterPanel
  );

  bbSelectLayout.appendChild(
    bbDetailPanel
  );

  bbRosterPanel.appendChild(
    bbFighterGrid
  );

  bbDetailPanel.appendChild(
    bbSelectionText
  );


  const bbDetailName =
    document.getElementById(
      "bbDetailName"
    );

  const bbDetailPreview =
    document.getElementById(
      "bbDetailPreview"
    );

  const bbDetailMoves =
    document.getElementById(
      "bbDetailMoves"
    );


  /* ===================================================
     DONN ASSIST SPELLING — EXISTING CARD TEXT TOO
  =================================================== */

  const bbGrandmommyCard =
    bbFighterGrid.querySelector(
      '[data-character="grandmommy"]'
    );

  if (
    bbGrandmommyCard
  ) {
    const bbGrandmommyDescription =
      Array.from(
        bbGrandmommyCard.children
      ).find(
        child =>
          child.tagName ===
          "SMALL"
      );

    if (
      bbGrandmommyDescription
    ) {
      bbGrandmommyDescription.textContent =
        bbGrandmommyDescription.textContent.replace(
          "Don Assist",
          "Donn Assist"
        );
    }
  }


  /* ===================================================
     DETAIL-PANEL RENDERING
  =================================================== */

  let bbLastPickedCharacter =
    null;


  function bbCharacterName(
    character
  ) {
    if (
      character === "kelly"
    ) {
      return "KELLY";
    }

    return displayName(
      character
    ) ||
      character.toUpperCase();
  }


  function bbRenderFighterDetail(
    character
  ) {
    const data =
      bbSelectMoves[
        character
      ];

    if (
      !data
    ) {
      return;
    }

    bbDetailName.textContent =
      bbCharacterName(
        character
      );

    bbDetailPreview.innerHTML =
      characterHTML(
        character
      );

    bbDetailMoves.innerHTML = `
      <div class="bb-detail-move melee">
        <div class="bb-detail-move-type">
          MELEE
        </div>
        <div class="bb-detail-move-name">
          ${data.melee}
        </div>
      </div>

      <div class="bb-detail-move special">
        <div class="bb-detail-move-type">
          SPECIAL
        </div>
        <div class="bb-detail-move-name">
          ${data.special}
        </div>
      </div>

      <div class="bb-detail-move ultimate">
        <div class="bb-detail-move-type">
          ULTIMATE
        </div>
        <div class="bb-detail-move-name">
          ${data.ultimate}
        </div>
      </div>
    `;
  }


  function bbCurrentPickedCharacter() {
    if (
      gameMode === "2P" &&
      player2Character
    ) {
      return player2Character;
    }

    if (
      player1Character
    ) {
      return player1Character;
    }

    return bbLastPickedCharacter;
  }


  function bbRestorePickedDetail() {
    const current =
      bbCurrentPickedCharacter();

    if (
      current
    ) {
      bbRenderFighterDetail(
        current
      );
      return;
    }

    bbRenderFighterDetail(
      "brendan"
    );
  }


  function bbBindRosterCards() {
    bbFighterGrid
      .querySelectorAll(
        ".fighter-card"
      )
      .forEach(
        card => {
          if (
            card.dataset.bbDetailBound ===
            "true"
          ) {
            return;
          }

          card.dataset.bbDetailBound =
            "true";

          card.addEventListener(
            "mouseenter",
            () => {
              bbRenderFighterDetail(
                card.dataset.character
              );
            }
          );

          card.addEventListener(
            "focus",
            () => {
              bbRenderFighterDetail(
                card.dataset.character
              );
            }
          );

          card.addEventListener(
            "mouseleave",
            () => {
              bbRestorePickedDetail();
            }
          );

          card.addEventListener(
            "click",
            () => {
              setTimeout(
                () => {
                  if (
                    card.classList.contains(
                      "p1-selected"
                    ) ||
                    card.classList.contains(
                      "p2-selected"
                    )
                  ) {
                    bbLastPickedCharacter =
                      card.dataset.character;
                  }

                  bbRenderFighterDetail(
                    card.dataset.character
                  );
                },
                0
              );
            }
          );
        }
      );
  }


  bbBindRosterCards();


  /* If a late-added card ever appears, keep the new layout behavior. */
  const bbRosterObserver =
    new MutationObserver(
      () => {
        bbBindRosterCards();
      }
    );

  bbRosterObserver.observe(
    bbFighterGrid,
    {
      childList: true
    }
  );


  /* Reset the detail panel cleanly whenever a new selection begins. */
  const bbStartButton =
    document.getElementById(
      "startButton"
    );

  if (
    bbStartButton
  ) {
    bbStartButton.addEventListener(
      "click",
      () => {
        setTimeout(
          () => {
            bbLastPickedCharacter =
              null;

            bbRestorePickedDetail();
          },
          0
        );
      }
    );
  }


  const bbBackToFighterButton =
    document.getElementById(
      "backToFighterButton"
    );

  if (
    bbBackToFighterButton
  ) {
    bbBackToFighterButton.addEventListener(
      "click",
      () => {
        setTimeout(
          () => {
            bbRestorePickedDetail();
          },
          0
        );
      }
    );
  }


  /* Start with a real fighter visible, like a classic character-select screen. */
  bbRestorePickedDetail();
})();
