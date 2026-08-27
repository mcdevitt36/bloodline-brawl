/* =====================================================
   BLOODLINE BRAWL
   QUALITY-PRESERVING BUILD
===================================================== */

const $ = id =>
  document.getElementById(id);


/* =====================================================
   ELEMENTS
===================================================== */

const titleScreen =
  $("titleScreen");

const selectScreen =
  $("selectScreen");

const challengeScreen =
  $("challengeScreen");

const mapScreen =
  $("mapScreen");

const fightScreen =
  $("fightScreen");


const onePlayerButton =
  $("onePlayerButton");

const twoPlayerButton =
  $("twoPlayerButton");

const startButton =
  $("startButton");

const martinChallengeButton =
  $("martinChallengeButton");


const backToTitleButton =
  $("backToTitleButton");

const mapSelectButton =
  $("mapSelectButton");

const backToFighterButton =
  $("backToFighterButton");

const fightButton =
  $("fightButton");


const selectModeLabel =
  $("selectModeLabel");

const mapModeLabel =
  $("mapModeLabel");

const selectionPrompt =
  $("selectionPrompt");

const selectionText =
  $("selectionText");

const mapSelectionText =
  $("mapSelectionText");


const fighterCards =
  document.querySelectorAll(
    ".fighter-card"
  );

const martinCard =
  $("martinCard");

const mapCards =
  document.querySelectorAll(
    ".map-card"
  );


const challengeBackButton =
  $("challengeBackButton");

const challengeFighterGrid =
  $("challengeFighterGrid");

const challengeMartinPreview =
  $("challengeMartinPreview");


const titleLeftCharacter =
  $("titleLeftCharacter");

const titleRightCharacter =
  $("titleRightCharacter");

const titleLeftName =
  $("titleLeftName");

const titleRightName =
  $("titleRightName");


const arena =
  $("arena");

const effects =
  $("effects");


const battleIntro =
  $("battleIntro");

const battleMapName =
  $("battleMapName");

const battleIntroRound =
  $("battleIntroRound");

const battleIntroWord =
  $("battleIntroWord");


const player1Fighter =
  $("player1Fighter");

const player2Fighter =
  $("player2Fighter");


const player1ModelSlot =
  player1Fighter.querySelector(
    ".fighter-model-slot"
  );

const player2ModelSlot =
  player2Fighter.querySelector(
    ".fighter-model-slot"
  );


const player1Name =
  $("player1Name");

const player2Name =
  $("player2Name");


const player1HealthBar =
  $("player1Health");

const player2HealthBar =
  $("player2Health");


const player1DamageTrail =
  $("player1DamageTrail");

const player2DamageTrail =
  $("player2DamageTrail");


const player1UltimateBar =
  $("player1Ultimate");

const player2UltimateBar =
  $("player2Ultimate");


const player1SpecialOrb =
  $("player1SpecialOrb");

const player2SpecialOrb =
  $("player2SpecialOrb");

const player1UltimateOrb =
  $("player1UltimateOrb");

const player2UltimateOrb =
  $("player2UltimateOrb");


const player1SpecialIcon =
  $("player1SpecialIcon");

const player2SpecialIcon =
  $("player2SpecialIcon");

const player1UltimateIcon =
  $("player1UltimateIcon");

const player2UltimateIcon =
  $("player2UltimateIcon");


const player1SpecialKey =
  $("player1SpecialKey");

const player2SpecialKey =
  $("player2SpecialKey");

const player1UltimateKey =
  $("player1UltimateKey");

const player2UltimateKey =
  $("player2UltimateKey");


const roundScore =
  $("roundScore");

const roundLabel =
  $("roundLabel");

const roundText =
  $("roundText");


const koOverlay =
  $("koOverlay");

const winnerText =
  $("winnerText");

const matchStatus =
  $("matchStatus");

const newGameButton =
  $("newGameButton");


const onePlayerControls =
  $("onePlayerControls");

const twoPlayerControls =
  $("twoPlayerControls");


const onePlayerAttackButton =
  $("onePlayerAttackButton");

const onePlayerSpecialButton =
  $("onePlayerSpecialButton");

const onePlayerUltimateButton =
  $("onePlayerUltimateButton");


/* =====================================================
   ROSTER / MAPS
===================================================== */

const BASE_ROSTER = [
  "brendan",
  "grandaddy",
  "connor",
  "erin",
  "shannan",
  "liam",
  "grandmommy",
  "sean"
];


const ALL_ROSTER = [
  ...BASE_ROSTER,
  "martin"
];


const MAP_NAMES = {

  virginia:
    "SUBURBAN VIRGINIA",

  westhampton:
    "WESTHAMPTON BEACH",

  newcanaan:
    "NEW CANAAN",

  madrid:
    "MADRID"

};


/* =====================================================
   FINAL BALANCE
===================================================== */

const STATS = {

  brendan: {
    hp: 100,
    basic: 6,
    range: 138,
    recovery: 800,
    specialDamage: 12,
    ultimateDamage: 24
  },

  grandaddy: {
    hp: 100,
    basic: 6,
    range: 108,
    recovery: 390,
    specialDamage: 12,
    ultimateStun: 3250
  },

  connor: {
    hp: 100,
    basic: 5.5,
    range: 122,
    recovery: 530,
    specialDamage: 14,
    heal: 30
  },

  erin: {
    hp: 100,
    basic: 5.5,
    range: 90,
    recovery: 440,
    specialStun: 2500,
    ultimateDamage: 26
  },

  shannan: {
    hp: 100,
    basic: 5,
    range: 95,
    recovery: 455,
    specialStun: 3250,
    ultimateDamage: 24
  },

  liam: {
    hp: 100,
    basic: 5.5,
    range: 112,
    recovery: 470,
    specialDamage: 11,
    ultimateDamage: 26
  },

  grandmommy: {
    hp: 100,
    basic: 4.5,
    range: 96,
    recovery: 430,
    specialDamage: 13,
    ultimateDamage: 30
  },

  sean: {
    hp: 100,
    basic: 5.5,
    range: 118,
    recovery: 500,
    specialDamage: 12,
    ultimateDamage: 26
  },

  martin: {
    hp: 115,
    basic: 5.5,
    range: 84,
    recovery: 410,
    specialStun: 3250,
    ultimateDamage: 32
  }

};


/* =====================================================
   STATE
===================================================== */

let gameMode =
  "1P";

let challengeMode =
  false;

let challengeResult =
  null;


let player1Character =
  null;

let player2Character =
  null;


let selectionStage =
  1;


let selectedMap =
  "virginia";


let currentRound =
  1;

let player1Wins =
  0;

let player2Wins =
  0;


let matchId =
  0;

let roundId =
  0;


let matchActive =
  false;

let fightStarted =
  false;

let roundOver =
  false;

let gameOver =
  false;

let actionLock =
  false;


const keys = {};


/* =====================================================
   PLAYER OBJECTS
===================================================== */

function createPlayer(
  side,
  fighter
) {

  return {

    side,
    fighter,

    character:
      null,

    health:
      100,

    maxHealth:
      100,

    ultimate:
      0,

    x:
      side === 1
        ? 100
        : 700,

    y:
      0,

    vy:
      0,

    facing:
      side === 1
        ? 1
        : -1,

    jumping:
      false,

    crouching:
      false,

    blocking:
      false,

    stunned:
      false,

    attackCooldown:
      false,

    specialCooldown:
      false,

    specialReadyAt:
      0

  };

}


const P1 =
  createPlayer(
    1,
    player1Fighter
  );


const P2 =
  createPlayer(
    2,
    player2Fighter
  );


/* =====================================================
   NAMES
===================================================== */

function displayName(
  character
) {

  const names = {

    brendan:
      "BRENDAN",

    grandaddy:
      "GRANDADDY",

    connor:
      "CONNOR",

    erin:
      "ERIN",

    shannan:
      "SHANNAN",

    liam:
      "LIAM",

    grandmommy:
      "GRANDMOMMY",

    sean:
      "SEAN",

    martin:
      "MARTIN"

  };


  return names[
    character
  ];

}


/* =====================================================
   MARTIN UNLOCK
===================================================== */

function isMartinUnlocked() {

  return (
    localStorage.getItem(
      "martinUnlocked"
    ) ===
    "true"
  );

}


function unlockMartin() {

  localStorage.setItem(
    "martinUnlocked",
    "true"
  );


  updateMartinUI();

}


function unlockedRoster() {

  return isMartinUnlocked()
    ? ALL_ROSTER
    : BASE_ROSTER;

}


function updateMartinUI() {

  const unlocked =
    isMartinUnlocked();


  martinCard.classList.toggle(
    "locked",
    !unlocked
  );


  martinChallengeButton.textContent =
    unlocked
      ? "MARTIN UNLOCKED"
      : "MARTIN'S CHALLENGE";

}


/* =====================================================
   CHARACTER HTML
===================================================== */

function characterHTML(
  c
) {

  if (
    c === "brendan"
  ) {

    return `
      <div class="pixel-person brendan-model">

        <div class="brendan-hair"></div>

        <div class="face">
          <div class="eye eye-left"></div>
          <div class="eye eye-right"></div>
          <div class="mouth"></div>
        </div>

        <div class="brendan-shirt"></div>

        <div class="arm left-arm"></div>

        <div class="arm right-arm weapon-arm">
          <div class="golf-club"></div>
        </div>

        <div class="khaki leg left-leg"></div>
        <div class="khaki leg right-leg"></div>

        <div class="white-shoe left-shoe"></div>
        <div class="white-shoe right-shoe"></div>

      </div>
    `;

  }


  if (
    c === "grandaddy"
  ) {

    return `
      <div class="pixel-person grandaddy-model">

        <div class="grandaddy-hair"></div>

        <div class="face">
          <div class="eye eye-left"></div>
          <div class="eye eye-right"></div>
          <div class="mouth"></div>
        </div>

        <div class="glasses glasses-left"></div>
        <div class="glasses glasses-right"></div>
        <div class="glasses-bridge"></div>

        <div class="orange-hat"></div>
        <div class="orange-brim"></div>

        <div class="hat-letter">
          S
        </div>

        <div class="grandaddy-shirt"></div>

        <div class="arm left-arm"></div>

        <div class="arm right-arm weapon-arm">
          <div class="hammer">
            <div class="hammer-square"></div>
          </div>
        </div>

        <div class="black-pants leg left-leg"></div>
        <div class="black-pants leg right-leg"></div>

        <div class="white-shoe left-shoe"></div>
        <div class="white-shoe right-shoe"></div>

      </div>
    `;

  }


  if (
    c === "connor"
  ) {

    return `
      <div class="pixel-person connor-model">

        <div class="connor-hair"></div>

        <div class="face">
          <div class="eye eye-left"></div>
          <div class="eye eye-right"></div>
          <div class="mouth"></div>
        </div>

        <div class="connor-stubble"></div>

        <div class="connor-shirt"></div>

        <div class="arm left-arm"></div>

        <div class="arm right-arm weapon-arm">
          <div class="paintbrush"></div>
        </div>

        <div class="gray-pants leg left-leg"></div>
        <div class="gray-pants leg right-leg"></div>

        <div class="dark-shoe left-shoe"></div>
        <div class="dark-shoe right-shoe"></div>

      </div>
    `;

  }


  if (
    c === "erin"
  ) {

    return `
      <div class="pixel-person erin-model">

        <div class="erin-hair"></div>

        <div class="face">
          <div class="eye eye-left"></div>
          <div class="eye eye-right"></div>
          <div class="mouth"></div>
        </div>

        <div class="erin-shirt"></div>

        <div class="arm left-arm"></div>

        <div class="arm right-arm weapon-arm">
          <div class="hairbrush"></div>
        </div>

        <div class="blue-jeans leg left-leg"></div>
        <div class="blue-jeans leg right-leg"></div>

        <div class="white-shoe left-shoe"></div>
        <div class="white-shoe right-shoe"></div>

      </div>
    `;

  }


  if (
    c === "shannan"
  ) {

    return `
      <div class="pixel-person shannan-model">

        <div class="shannan-hair"></div>

        <div class="face">
          <div class="eye eye-left"></div>
          <div class="eye eye-right"></div>
          <div class="mouth"></div>
        </div>

        <div class="shannan-shirt"></div>

        <div class="arm left-arm"></div>

        <div class="arm right-arm weapon-arm">

          <div class="syringe">
            <div class="syringe-plunger"></div>
          </div>

        </div>

        <div class="shannan-pants leg left-leg"></div>
        <div class="shannan-pants leg right-leg"></div>

        <div class="dark-shoe left-shoe"></div>
        <div class="dark-shoe right-shoe"></div>

      </div>
    `;

  }


  if (
    c === "liam"
  ) {

    return `
      <div class="pixel-person liam-model">

        <div class="liam-hair"></div>

        <div class="face">
          <div class="eye eye-left"></div>
          <div class="eye eye-right"></div>
          <div class="mouth"></div>
        </div>

        <div class="liam-shirt"></div>

        <div class="arm left-arm"></div>

        <div class="arm right-arm weapon-arm">
          <div class="rugby-ball"></div>
        </div>

        <div class="liam-blue-pants leg left-leg"></div>
        <div class="liam-blue-pants leg right-leg"></div>

        <div class="white-shoe left-shoe"></div>
        <div class="white-shoe right-shoe"></div>

      </div>
    `;

  }


  if (
    c === "grandmommy"
  ) {

    return `
      <div class="pixel-person grandmommy-model">

        <div class="grandmommy-hair"></div>

        <div class="face">
          <div class="eye eye-left"></div>
          <div class="eye eye-right"></div>
          <div class="mouth"></div>
        </div>

        <div class="grandmommy-shirt"></div>

        <div class="arm left-arm"></div>

        <div class="arm right-arm weapon-arm">
          <div class="spatula"></div>
        </div>

        <div class="grandmommy-pants leg left-leg"></div>
        <div class="grandmommy-pants leg right-leg"></div>

        <div class="dark-shoe left-shoe"></div>
        <div class="dark-shoe right-shoe"></div>

      </div>
    `;

  }


  if (
    c === "sean"
  ) {

    return `
      <div class="pixel-person sean-model">

        <div class="guitar-back"></div>

        <div class="sean-hair"></div>

        <div class="face">
          <div class="eye eye-left"></div>
          <div class="eye eye-right"></div>
          <div class="mouth"></div>
        </div>

        <div class="sean-glasses sean-glasses-left"></div>
        <div class="sean-glasses sean-glasses-right"></div>
        <div class="sean-glasses-bridge"></div>

        <div class="sean-shirt"></div>

        <div class="arm left-arm"></div>

        <div class="arm right-arm weapon-arm">
          <div class="baseball-bat"></div>
        </div>

        <div class="sean-pants leg left-leg"></div>
        <div class="sean-pants leg right-leg"></div>

        <div class="dark-shoe left-shoe"></div>
        <div class="dark-shoe right-shoe"></div>

      </div>
    `;

  }


  return `
    <div class="martin-model">

      <div class="martin-tail"></div>

      <div class="martin-body"></div>

      <div class="martin-chest"></div>

      <div class="martin-head">

        <div class="martin-face-light"></div>

        <div class="martin-eye left"></div>
        <div class="martin-eye right"></div>

        <div class="martin-nose"></div>

        <div class="martin-ear left"></div>
        <div class="martin-ear right"></div>

      </div>

      <div class="martin-leg leg-one"></div>
      <div class="martin-leg leg-two"></div>
      <div class="martin-leg leg-three"></div>
      <div class="martin-leg leg-four"></div>

    </div>
  `;

}


/* =====================================================
   ICONS
===================================================== */

function specialIconHTML(
  c
) {

  const icons = {

    brendan:
      `<div class="mini-golf-icon"></div>`,

    grandaddy:
      `<div class="mini-ladder-icon"></div>`,

    connor:
      `<div class="mini-paint-icon"></div>`,

    erin:
      `<div class="mini-patch-icon"></div>`,

    shannan:
      `<div class="mini-phone-icon"></div>`,

    liam:
      `<div class="mini-rugby-icon"></div>`,

    grandmommy:
      `<div class="mini-don-icon">DON</div>`,

    sean:
      `<div class="mini-dish-icon"></div>`,

    martin:
      `<div class="mini-breath-icon"></div>`

  };


  return icons[c];

}


function ultimateIconHTML(
  c
) {

  const icons = {

    brendan:
      `<div class="mini-ipo-icon">IPO</div>`,

    grandaddy:
      `<div class="mini-yap-icon">YAP!</div>`,

    connor:
      `<div class="mini-chicken-icon">🍗</div>`,

    erin:
      `<div class="mini-laundry-icon">👕</div>`,

    shannan:
      `<div class="mini-ufo-icon"></div>`,

    liam:
      `<div class="mini-splash-icon"></div>`,

    grandmommy:
      `<div class="mini-chair-icon"></div>`,

    sean:
      `<div class="mini-deer-icon">Y</div>`,

    martin:
      `<div class="mini-clyde-icon">C</div>`

  };


  return icons[c];

}


/* =====================================================
   SCREENS / PREVIEWS
===================================================== */

function showScreen(
  screen
) {

  document
    .querySelectorAll(
      ".screen"
    )
    .forEach(
      s =>
        s.classList.remove(
          "active"
        )
    );


  screen.classList.add(
    "active"
  );

}


function renderPreviews() {

  document
    .querySelectorAll(
      "[data-preview]"
    )
    .forEach(
      el => {

        el.innerHTML =
          characterHTML(
            el.dataset.preview
          );

      }
    );


  challengeMartinPreview.innerHTML =
    characterHTML(
      "martin"
    );

}


function generateTitleMatchup() {

  const roster =
    unlockedRoster();


  let left =
    roster[
      Math.floor(
        Math.random() *
        roster.length
      )
    ];


  let right =
    roster[
      Math.floor(
        Math.random() *
        roster.length
      )
    ];


  while (
    right === left
  ) {

    right =
      roster[
        Math.floor(
          Math.random() *
          roster.length
        )
      ];

  }


  titleLeftCharacter.innerHTML =
    characterHTML(
      left
    );


  titleRightCharacter.innerHTML =
    characterHTML(
      right
    );


  titleLeftName.textContent =
    displayName(
      left
    );


  titleRightName.textContent =
    displayName(
      right
    );

}


/* =====================================================
   GAME MODE
===================================================== */

function setGameMode(
  mode
) {

  gameMode =
    mode;


  onePlayerButton.classList.toggle(
    "selected",
    mode === "1P"
  );


  twoPlayerButton.classList.toggle(
    "selected",
    mode === "2P"
  );

}


onePlayerButton.onclick =
  () =>
    setGameMode(
      "1P"
    );


twoPlayerButton.onclick =
  () =>
    setGameMode(
      "2P"
    );


/* =====================================================
   CHARACTER SELECT
===================================================== */

function resetSelection() {

  player1Character =
    null;

  player2Character =
    null;

  selectionStage =
    1;


  fighterCards.forEach(
    card => {

      card.classList.remove(
        "p1-selected",
        "p2-selected"
      );

    }
  );


  selectModeLabel.textContent =
    gameMode === "1P"
      ? "1 PLAYER"
      : "2 PLAYER";


  selectionPrompt.textContent =
    "PLAYER 1 — CHOOSE YOUR FIGHTER";


  selectionText.textContent =
    "PLAYER 1: NOT SELECTED";


  mapSelectButton.disabled =
    true;

}


startButton.onclick =
  () => {

    challengeMode =
      false;

    resetSelection();

    showScreen(
      selectScreen
    );

  };


backToTitleButton.onclick =
  () => {

    showScreen(
      titleScreen
    );

  };


fighterCards.forEach(
  card => {

    card.onclick =
      () => {

        const c =
          card.dataset.character;


        if (
          c === "martin" &&
          !isMartinUnlocked()
        ) {

          if (
            gameMode ===
            "1P"
          ) {

            openMartinChallenge();

          }

          return;

        }


        if (
          gameMode ===
          "1P"
        ) {

          player1Character =
            c;


          fighterCards.forEach(
            x =>
              x.classList.remove(
                "p1-selected"
              )
          );


          card.classList.add(
            "p1-selected"
          );


          selectionText.textContent =
            "PLAYER 1: " +
            displayName(c);


          mapSelectButton.disabled =
            false;


          return;

        }


        if (
          selectionStage ===
          1
        ) {

          player1Character =
            c;


          fighterCards.forEach(
            x =>
              x.classList.remove(
                "p1-selected"
              )
          );


          card.classList.add(
            "p1-selected"
          );


          selectionStage =
            2;


          selectionPrompt.textContent =
            "PLAYER 2 — CHOOSE YOUR FIGHTER";


          selectionText.textContent =
            "PLAYER 1: " +
            displayName(
              player1Character
            ) +
            "  |  PLAYER 2: NOT SELECTED";


          return;

        }


        player2Character =
          c;


        fighterCards.forEach(
          x =>
            x.classList.remove(
              "p2-selected"
            )
        );


        card.classList.add(
          "p2-selected"
        );


        selectionText.textContent =
          "PLAYER 1: " +
          displayName(
            player1Character
          ) +
          "  |  PLAYER 2: " +
          displayName(
            player2Character
          );


        mapSelectButton.disabled =
          false;

      };

  }
);


/* =====================================================
   MAP SELECT
===================================================== */

mapSelectButton.onclick =
  () => {

    mapModeLabel.textContent =
      gameMode === "1P"
        ? "1 PLAYER"
        : "2 PLAYER";


    showScreen(
      mapScreen
    );

  };


mapCards.forEach(
  card => {

    card.onclick =
      () => {

        selectedMap =
          card.dataset.map;


        mapCards.forEach(
          x =>
            x.classList.remove(
              "selected"
            )
        );


        card.classList.add(
          "selected"
        );


        mapSelectionText.textContent =
          "MAP: " +
          MAP_NAMES[
            selectedMap
          ];

      };

  }
);


backToFighterButton.onclick =
  () => {

    if (
      challengeMode
    ) {

      showScreen(
        challengeScreen
      );

      return;

    }


    showScreen(
      selectScreen
    );

  };


/* =====================================================
   MARTIN CHALLENGE
===================================================== */

function openMartinChallenge() {

  challengeMode =
    true;

  gameMode =
    "1P";


  renderChallengeChoices();


  showScreen(
    challengeScreen
  );

}


martinChallengeButton.onclick =
  () => {

    if (
      isMartinUnlocked()
    ) {

      setGameMode(
        "1P"
      );

      resetSelection();

      showScreen(
        selectScreen
      );

      return;

    }


    openMartinChallenge();

  };


challengeBackButton.onclick =
  () => {

    challengeMode =
      false;

    showScreen(
      titleScreen
    );

  };


function renderChallengeChoices() {

  challengeFighterGrid.innerHTML =
    "";


  BASE_ROSTER.forEach(
    c => {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "challenge-choice-card";


      button.innerHTML = `
        <div class="challenge-choice-model">
          ${characterHTML(c)}
        </div>

        <strong>
          ${displayName(c)}
        </strong>
      `;


      button.onclick =
        () => {

          player1Character =
            c;

          player2Character =
            "martin";

          selectedMap =
            "virginia";


          fightButton.textContent =
            "FIGHT MARTIN";


          showScreen(
            mapScreen
          );

        };


      challengeFighterGrid.appendChild(
        button
      );

    }
  );

}


/* =====================================================
   CPU
===================================================== */

function chooseCPU() {

  const choices =
    unlockedRoster()
      .filter(
        c =>
          c !==
          player1Character
      );


  return choices[
    Math.floor(
      Math.random() *
      choices.length
    )
  ];

}


/* =====================================================
   BEGIN MATCH
===================================================== */

fightButton.onclick =
  () => {

    if (
      challengeMode
    ) {

      player2Character =
        "martin";

    }

    else if (
      gameMode ===
      "1P"
    ) {

      player2Character =
        chooseCPU();

    }


    beginMatch();

  };


function beginMatch() {

  matchId++;


  currentRound =
    1;

  player1Wins =
    0;

  player2Wins =
    0;


  gameOver =
    false;

  roundOver =
    false;

  matchActive =
    true;


  P1.character =
    player1Character;

  P2.character =
    player2Character;


  P1.maxHealth =
    STATS[
      P1.character
    ].hp;


  P2.maxHealth =
    STATS[
      P2.character
    ].hp;


  player1ModelSlot.innerHTML =
    characterHTML(
      P1.character
    );


  player2ModelSlot.innerHTML =
    characterHTML(
      P2.character
    );


  player1Name.textContent =
    gameMode === "2P"
      ? "P1 — " +
        displayName(
          P1.character
        )
      : displayName(
          P1.character
        );


  player2Name.textContent =
    gameMode === "2P"
      ? "P2 — " +
        displayName(
          P2.character
        )
      : displayName(
          P2.character
        );


  player1SpecialIcon.innerHTML =
    specialIconHTML(
      P1.character
    );


  player2SpecialIcon.innerHTML =
    specialIconHTML(
      P2.character
    );


  player1UltimateIcon.innerHTML =
    ultimateIconHTML(
      P1.character
    );


  player2UltimateIcon.innerHTML =
    ultimateIconHTML(
      P2.character
    );


  if (
    gameMode ===
    "2P"
  ) {

    player1SpecialKey.textContent =
      "E";

    player1UltimateKey.textContent =
      "F";

    player2SpecialKey.textContent =
      "K";

    player2UltimateKey.textContent =
      "L";


    onePlayerControls.classList.add(
      "hidden"
    );


    twoPlayerControls.classList.remove(
      "hidden"
    );

  }

  else {

    player1SpecialKey.textContent =
      "E";

    player1UltimateKey.textContent =
      "F";

    player2SpecialKey.textContent =
      "CPU";

    player2UltimateKey.textContent =
      "CPU";


    onePlayerControls.classList.remove(
      "hidden"
    );


    twoPlayerControls.classList.add(
      "hidden"
    );

  }


  arena.className =
    "arena map-" +
    selectedMap;


  showScreen(
    fightScreen
  );


  koOverlay.classList.add(
    "hidden"
  );


  newGameButton.classList.add(
    "hidden"
  );


  startRound();

}


/* =====================================================
   PLAYER RESET
===================================================== */

function resetPlayerState(
  p
) {

  p.health =
    p.maxHealth;

  p.ultimate =
    0;

  p.y =
    0;

  p.vy =
    0;

  p.jumping =
    false;

  p.crouching =
    false;

  p.blocking =
    false;

  p.stunned =
    false;

  p.attackCooldown =
    false;

  p.specialCooldown =
    false;

  p.specialReadyAt =
    0;


  p.fighter.classList.remove(
    "walking",
    "crouching",
    "blocking",
    "stunned",
    "ko-loser",
    "face-left"
  );


  p.fighter.style.bottom =
    "25px";


  const model =
    p.fighter.querySelector(
      ".pixel-person, .martin-model"
    );


  if (
    model
  ) {

    model.classList.remove(
      "weapon-attacking"
    );

  }

}


/* =====================================================
   ROUND START
===================================================== */

function startRound() {

  roundId++;


  const thisMatch =
    matchId;

  const thisRound =
    roundId;


  roundOver =
    false;

  fightStarted =
    false;

  actionLock =
    true;


  resetPlayerState(
    P1
  );


  resetPlayerState(
    P2
  );


  P1.x =
    Math.max(
      50,
      arena.clientWidth *
      0.17
    );


  P2.x =
    Math.min(
      arena.clientWidth -
      120,
      arena.clientWidth *
      0.74
    );


  P1.facing =
    1;

  P2.facing =
    -1;


  effects.innerHTML =
    "";


  updateFacing();

  updatePositions();

  updateHUD(
    true
  );


  roundScore.textContent =
    player1Wins +
    " - " +
    player2Wins;


  roundLabel.textContent =
    "ROUND " +
    currentRound;


  battleMapName.textContent =
    MAP_NAMES[
      selectedMap
    ];


  battleIntroRound.textContent =
    "ROUND " +
    currentRound;


  battleIntroWord.textContent =
    "READY...";


  battleIntro.classList.remove(
    "hidden"
  );


  setTimeout(
    () => {

      if (
        thisMatch !==
          matchId ||
        thisRound !==
          roundId
      ) {

        return;

      }


      battleIntroWord.textContent =
        "BEGIN!";

    },
    1000
  );


  setTimeout(
    () => {

      if (
        thisMatch !==
          matchId ||
        thisRound !==
          roundId
      ) {

        return;

      }


      battleIntro.classList.add(
        "hidden"
      );


      fightStarted =
        true;

      actionLock =
        false;


      if (
        gameMode ===
          "1P"
      ) {

        cpuLoop(
          thisMatch,
          thisRound
        );

      }

    },
    1850
  );

}


/* =====================================================
   HUD
===================================================== */

function updateHUD(
  immediate = false
) {

  const p1Percent =
    Math.max(
      0,
      P1.health /
      P1.maxHealth *
      100
    );


  const p2Percent =
    Math.max(
      0,
      P2.health /
      P2.maxHealth *
      100
    );


  player1HealthBar.style.width =
    p1Percent +
    "%";


  player2HealthBar.style.width =
    p2Percent +
    "%";


  if (
    immediate
  ) {

    player1DamageTrail.style.width =
      p1Percent +
      "%";


    player2DamageTrail.style.width =
      p2Percent +
      "%";

  }

  else {

    setTimeout(
      () => {

        player1DamageTrail.style.width =
          p1Percent +
          "%";


        player2DamageTrail.style.width =
          p2Percent +
          "%";

      },
      180
    );

  }


  player1UltimateBar.style.width =
    Math.min(
      100,
      P1.ultimate
    ) +
    "%";


  player2UltimateBar.style.width =
    Math.min(
      100,
      P2.ultimate
    ) +
    "%";

}


/* =====================================================
   FACING
===================================================== */

function updateFacing() {

  if (
    P1.x <
    P2.x
  ) {

    P1.facing =
      1;

    P2.facing =
      -1;

  }

  else {

    P1.facing =
      -1;

    P2.facing =
      1;

  }


  P1.fighter.classList.toggle(
    "face-left",
    P1.facing ===
      -1
  );


  P2.fighter.classList.toggle(
    "face-left",
    P2.facing ===
      -1
  );

}


/* =====================================================
   POSITIONS / COLLISION
===================================================== */

function updatePositions() {

  const max =
    arena.clientWidth -
    105;


  P1.x =
    Math.max(
      0,
      Math.min(
        max,
        P1.x
      )
    );


  P2.x =
    Math.max(
      0,
      Math.min(
        max,
        P2.x
      )
    );


  /*
    Grounded fighters cannot walk through each other.
    Airborne fighter can cross.
  */

  const bothGrounded =
    !P1.jumping &&
    !P2.jumping;


  if (
    bothGrounded &&
    Math.abs(
      P1.x -
      P2.x
    ) <
    62
  ) {

    if (
      P1.x <
      P2.x
    ) {

      P1.x =
        P2.x -
        62;

    }

    else {

      P1.x =
        P2.x +
        62;

    }

  }


  P1.fighter.style.left =
    P1.x +
    "px";


  P2.fighter.style.left =
    P2.x +
    "px";


  P1.fighter.style.bottom =
    25 +
    P1.y +
    "px";


  P2.fighter.style.bottom =
    25 +
    P2.y +
    "px";


  updateFacing();

}


/* =====================================================
   DISTANCE
===================================================== */

function horizontalDistance() {

  return Math.abs(
    P2.x -
    P1.x
  );

}


function verticalDistance() {

  return Math.abs(
    P2.y -
    P1.y
  );

}


/* =====================================================
   CAN ACT
===================================================== */

function canAct(
  p
) {

  return (
    matchActive &&
    fightStarted &&
    !roundOver &&
    !gameOver &&
    !actionLock &&
    !p.stunned
  );

}


/* =====================================================
   MOVEMENT
===================================================== */

function movePlayer(
  p,
  amount
) {

  if (
    !canAct(p) ||
    p.blocking ||
    p.crouching
  ) {

    return;

  }


  p.x +=
    amount;


  updatePositions();

}


/* =====================================================
   PHYSICS JUMP
===================================================== */

function jump(
  p
) {

  if (
    !canAct(p) ||
    p.jumping ||
    p.crouching ||
    p.blocking
  ) {

    return;

  }


  p.jumping =
    true;


  p.vy =
    13.5;

}


/* =====================================================
   PHYSICS LOOP
===================================================== */

function physicsLoop() {

  [
    P1,
    P2
  ].forEach(
    p => {

      if (
        p.jumping
      ) {

        p.vy -=
          0.72;


        p.y +=
          p.vy;


        if (
          p.y <=
          0
        ) {

          p.y =
            0;

          p.vy =
            0;

          p.jumping =
            false;

        }

      }

    }
  );


  updatePositions();


  requestAnimationFrame(
    physicsLoop
  );

}


physicsLoop();


/* =====================================================
   CROUCH
===================================================== */

function crouch(
  p,
  on
) {

  if (
    on &&
    (
      !canAct(p) ||
      p.jumping ||
      p.blocking
    )
  ) {

    return;

  }


  p.crouching =
    on;


  p.fighter.classList.toggle(
    "crouching",
    on
  );

}


/* =====================================================
   BLOCK
===================================================== */

function block(
  p,
  on
) {

  if (
    on &&
    (
      !canAct(p) ||
      p.jumping
    )
  ) {

    return;

  }


  p.blocking =
    on;


  p.fighter.classList.toggle(
    "blocking",
    on
  );

}


/* =====================================================
   DIRECTIONAL BLOCK
===================================================== */

function isFacingAttacker(
  target,
  attacker
) {

  if (
    target.facing ===
      1
  ) {

    return (
      attacker.x >
      target.x
    );

  }


  return (
    attacker.x <
    target.x
  );

}


/* =====================================================
   DODGE CHECKS
===================================================== */

function targetCanBeHitByGroundAttack(
  target
) {

  /*
    Jumping high enough means low melee/projectiles miss.
  */

  return (
    target.y <
    45
  );

}


function projectileCanHit(
  target,
  projectileHeight =
    "mid"
) {

  if (
    projectileHeight ===
    "low"
  ) {

    return (
      target.y <
      55
    );

  }


  if (
    projectileHeight ===
    "mid"
  ) {

    return (
      target.y <
      95
    );

  }


  return true;

}


/* =====================================================
   EFFECT HELPERS
===================================================== */

function addComicText(
  text,
  colorClass =
    "yellow-text",
  duration =
    1600
) {

  const el =
    document.createElement(
      "div"
    );


  el.className =
    "effect comic-text " +
    colorClass;


  el.textContent =
    text;


  effects.appendChild(
    el
  );


  setTimeout(
    () =>
      el.remove(),
    duration
  );


  return el;

}


function hitSpark(
  target,
  type =
    "normal"
) {

  const spark =
    document.createElement(
      "div"
    );


  spark.className =
    "effect " +
    (
      type === "ultimate"
        ? "hit-spark-ultimate"
        : type === "special"
          ? "hit-spark-special"
          : "hit-spark-normal"
    );


  spark.style.left =
    target.x +
    30 +
    "px";


  spark.style.bottom =
    105 +
    target.y +
    "px";


  effects.appendChild(
    spark
  );


  setTimeout(
    () =>
      spark.remove(),
    350
  );

}


/* =====================================================
   DAMAGE
===================================================== */

function dealDamage(
  attacker,
  target,
  amount,
  options = {}
) {

  if (
    roundOver ||
    !fightStarted
  ) {

    return;

  }


  let damage =
    amount;


  const type =
    options.type ||
    "normal";


  const blockable =
    !options.ignoreBlock;


  const validBlock =
    target.blocking &&
    blockable &&
    isFacingAttacker(
      target,
      attacker
    );


  if (
    validBlock
  ) {

    if (
      type === "special"
    ) {

      damage *=
        0.5;

    }

    else {

      damage *=
        0.25;

    }

  }

  else {

    hitSpark(
      target,
      type
    );

  }


  target.health -=
    damage;


  attacker.ultimate =
    Math.min(
      100,
      attacker.ultimate +
      14
    );


  target.ultimate =
    Math.min(
      100,
      target.ultimate +
      7
    );


  updateHUD();


  checkKO();

}


/* =====================================================
   BASIC ATTACK
===================================================== */

function basicAttack(
  attacker,
  target
) {

  if (
    !canAct(attacker) ||
    attacker.attackCooldown
  ) {

    return;

  }


  const stats =
    STATS[
      attacker.character
    ];


  attacker.attackCooldown =
    true;


  const model =
    attacker.fighter.querySelector(
      ".pixel-person, .martin-model"
    );


  if (
    model
  ) {

    model.classList.add(
      "weapon-attacking"
    );

  }


  setTimeout(
    () => {

      const inRange =
        horizontalDistance() <=
        stats.range;


      const correctVertical =
        verticalDistance() <
        75;


      if (
        inRange &&
        correctVertical
      ) {

        dealDamage(
          attacker,
          target,
          stats.basic,
          {
            type:
              "normal"
          }
        );

      }

    },
    220
  );


  setTimeout(
    () => {

      attacker.attackCooldown =
        false;


      if (
        model
      ) {

        model.classList.remove(
          "weapon-attacking"
        );

      }

    },
    stats.recovery
  );

}


/* =====================================================
   STUN
===================================================== */

function stunTarget(
  target,
  duration
) {

  target.stunned =
    true;


  target.fighter.classList.add(
    "stunned"
  );


  setTimeout(
    () => {

      target.stunned =
        false;


      target.fighter.classList.remove(
        "stunned"
      );

    },
    duration
  );

}


/* =====================================================
   SPECIAL COOLDOWN
===================================================== */

function beginSpecialCooldown(
  p
) {

  p.specialCooldown =
    true;


  p.specialReadyAt =
    Date.now() +
    5000;


  setTimeout(
    () => {

      p.specialCooldown =
        false;


      p.specialReadyAt =
        0;

    },
    5000
  );

}


/* =====================================================
   SPECIAL ROUTER
===================================================== */

function specialAttack(
  attacker,
  target
) {

  if (
    !canAct(attacker) ||
    attacker.specialCooldown
  ) {

    return;

  }


  beginSpecialCooldown(
    attacker
  );


  switch (
    attacker.character
  ) {

    case "brendan":
      bigDrive(
        attacker,
        target
      );
      break;

    case "grandaddy":
      ladderAttack(
        attacker,
        target
      );
      break;

    case "connor":
      paintBeast(
        attacker,
        target
      );
      break;

    case "erin":
      pimplePatch(
        attacker,
        target
      );
      break;

    case "shannan":
      brainrot(
        attacker,
        target
      );
      break;

    case "liam":
      rugbyPass(
        attacker,
        target
      );
      break;

    case "grandmommy":
      donAssist(
        attacker,
        target
      );
      break;

    case "sean":
      daddyHungry(
        attacker,
        target
      );
      break;

    case "martin":
      dogBreath(
        attacker,
        target
      );
      break;

  }

}


/* =====================================================
   PROJECTILE HELPER
===================================================== */

function moveProjectile(
  element,
  attacker,
  target,
  speed,
  hitDistance,
  onHit,
  projectileHeight =
    "mid"
) {

  let x =
    attacker.x +
    (
      attacker.facing ===
        1
        ? 60
        : -10
    );


  const direction =
    attacker.facing;


  element.style.left =
    x +
    "px";


  effects.appendChild(
    element
  );


  const loop =
    setInterval(
      () => {

        x +=
          speed *
          direction;


        element.style.left =
          x +
          "px";


        if (
          Math.abs(
            x -
            target.x
          ) <
          hitDistance
        ) {

          if (
            projectileCanHit(
              target,
              projectileHeight
            )
          ) {

            clearInterval(
              loop
            );


            element.remove();


            onHit();


            return;

          }

        }


        if (
          x <
            -150 ||
          x >
            arena.clientWidth +
            150
        ) {

          clearInterval(
            loop
          );


          element.remove();

        }

      },
      28
    );

}


/* =====================================================
   BRENDAN SPECIAL
===================================================== */

function bigDrive(
  attacker,
  target
) {

  addComicText(
    "BIG DRIVE!",
    "yellow-text",
    1600
  );


  const ball =
    document.createElement(
      "div"
    );


  ball.className =
    "effect golf-ball";


  ball.style.bottom =
    70 +
    attacker.y +
    "px";


  setTimeout(
    () => {

      moveProjectile(
        ball,
        attacker,
        target,
        14,
        28,
        () => {

          dealDamage(
            attacker,
            target,
            12,
            {
              type:
                "special"
            }
          );

        },
        "low"
      );

    },
    350
  );

}


/* =====================================================
   GRANDADDY LADDER
===================================================== */

function ladderAttack(
  attacker,
  target
) {

  actionLock =
    true;


  addComicText(
    "HOLD THIS LADDER!",
    "yellow-text",
    1700
  );


  const ladder =
    document.createElement(
      "div"
    );


  ladder.className =
    "effect";


  ladder.textContent =
    "🪜";


  ladder.style.fontSize =
    "100px";


  ladder.style.left =
    target.x -
    5 +
    "px";


  ladder.style.bottom =
    20 +
    target.y +
    "px";


  effects.appendChild(
    ladder
  );


  setTimeout(
    () => {

      if (
        target.y <
        55
      ) {

        dealDamage(
          attacker,
          target,
          12,
          {
            type:
              "special"
          }
        );

      }


      ladder.animate(
        [
          {
            transform:
              "rotate(0deg)"
          },
          {
            transform:
              "rotate(78deg)"
          }
        ],
        {
          duration:
            550,
          fill:
            "forwards"
        }
      );

    },
    900
  );


  setTimeout(
    () => {

      ladder.remove();


      actionLock =
        false;

    },
    1700
  );

}


/* =====================================================
   CONNOR SPECIAL — RESTORED PAINT BEAST
===================================================== */

function dinosaurHTML() {

  return `
    <div class="pixel-dino-tail"></div>
    <div class="pixel-dino-body"></div>
    <div class="pixel-dino-head"></div>
    <div class="pixel-dino-eye"></div>
    <div class="pixel-dino-teeth"></div>
    <div class="pixel-dino-arm"></div>
    <div class="pixel-dino-leg-one"></div>
    <div class="pixel-dino-leg-two"></div>
    <div class="pixel-dino-paint-one"></div>
    <div class="pixel-dino-paint-two"></div>
    <div class="pixel-dino-paint-three"></div>
  `;

}


function paintBeast(
  attacker,
  target
) {

  addComicText(
    "PAINT BEAST!",
    "blue-text",
    1700
  );


  const splash =
    document.createElement(
      "div"
    );


  splash.className =
    "effect paint-splash";


  splash.style.left =
    attacker.x +
    50 +
    "px";


  splash.style.bottom =
    100 +
    attacker.y +
    "px";


  effects.appendChild(
    splash
  );


  setTimeout(
    () => {

      splash.remove();


      const dino =
        document.createElement(
          "div"
        );


      dino.className =
        "effect pixel-dino";


      dino.innerHTML =
        dinosaurHTML();


      dino.style.bottom =
        "44px";


      if (
        attacker.facing ===
        -1
      ) {

        dino.style.transform =
          "scaleX(-1)";

      }


      moveProjectile(
        dino,
        attacker,
        target,
        10,
        38,
        () => {

          dealDamage(
            attacker,
            target,
            14,
            {
              type:
                "special"
            }
          );

        },
        "low"
      );

    },
    800
  );

}


/* =====================================================
   ERIN PIMPLE PATCH — RESTORED
===================================================== */

function pimplePatch(
  attacker,
  target
) {

  addComicText(
    "PIMPLE PATCH ATTACK",
    "pink-text",
    1800
  );


  const patch =
    document.createElement(
      "div"
    );


  patch.className =
    "effect pimple-projectile";


  patch.style.bottom =
    110 +
    attacker.y +
    "px";


  setTimeout(
    () => {

      moveProjectile(
        patch,
        attacker,
        target,
        13,
        30,
        () => {

          const stuck =
            document.createElement(
              "div"
            );


          stuck.className =
            "effect pimple-stuck";


          stuck.style.left =
            target.x +
            "px";


          stuck.style.bottom =
            65 +
            target.y +
            "px";


          effects.appendChild(
            stuck
          );


          stunTarget(
            target,
            2500
          );


          setTimeout(
            () =>
              stuck.remove(),
            2500
          );

        },
        "mid"
      );

    },
    350
  );

}


/* =====================================================
   SHANNAN BRAINROT
===================================================== */

function brainrot(
  attacker,
  target
) {

  addComicText(
    "BRAINROT",
    "red-text",
    1950
  );


  const phone =
    document.createElement(
      "div"
    );


  phone.className =
    "effect brainrot-phone";


  phone.innerHTML =
    `<div class="brainrot-screen"></div>`;


  phone.style.left =
    Math.max(
      10,
      Math.min(
        arena.clientWidth -
        160,
        target.x -
        20
      )
    ) +
    "px";


  phone.style.top =
    "90px";


  effects.appendChild(
    phone
  );


  phone.animate(
    [
      {
        transform:
          "scale(.2) rotate(-10deg)",
        opacity:
          0
      },
      {
        transform:
          "scale(1.05) rotate(3deg)",
        opacity:
          1
      },
      {
        transform:
          "scale(1) rotate(-2deg)",
        opacity:
          1
      }
    ],
    {
      duration:
        700,
      fill:
        "forwards"
    }
  );


  stunTarget(
    target,
    3250
  );


  setTimeout(
    () =>
      phone.remove(),
    3250
  );

}


/* =====================================================
   LIAM RUGBY PASS
===================================================== */

function rugbyPass(
  attacker,
  target
) {

  addComicText(
    "RUGBY PASS!",
    "blue-text",
    1600
  );


  const handBall =
    attacker.fighter.querySelector(
      ".rugby-ball"
    );


  if (
    handBall
  ) {

    handBall.style.visibility =
      "hidden";

  }


  const ball =
    document.createElement(
      "div"
    );


  ball.className =
    "effect rugby-projectile";


  ball.style.bottom =
    105 +
    attacker.y +
    "px";


  setTimeout(
    () => {

      moveProjectile(
        ball,
        attacker,
        target,
        14,
        32,
        () => {

          dealDamage(
            attacker,
            target,
            11,
            {
              type:
                "special"
            }
          );


          if (
            handBall
          ) {

            setTimeout(
              () => {

                handBall.style.visibility =
                  "visible";

              },
              300
            );

          }

        },
        "mid"
      );

    },
    400
  );

}


/* =====================================================
   GRANDMOMMY DON ASSIST
===================================================== */

function donAssist(
  attacker,
  target
) {

  actionLock =
    true;


  addComicText(
    "DON, GET OVER HERE!",
    "red-text",
    1800
  );


  const assist =
    document.createElement(
      "div"
    );


  assist.className =
    "effect";


  assist.innerHTML =
    characterHTML(
      "grandaddy"
    );


  let x =
    attacker.facing ===
      1
      ? -120
      : arena.clientWidth +
        120;


  const direction =
    attacker.facing;


  assist.style.left =
    x +
    "px";


  assist.style.bottom =
    "25px";


  if (
    direction ===
    -1
  ) {

    assist.style.transform =
      "scaleX(-1)";

  }


  effects.appendChild(
    assist
  );


  setTimeout(
    () => {

      const loop =
        setInterval(
          () => {

            x +=
              18 *
              direction;


            assist.style.left =
              x +
              "px";


            if (
              Math.abs(
                x -
                target.x
              ) <
              42
            ) {

              clearInterval(
                loop
              );


              if (
                target.y <
                60
              ) {

                dealDamage(
                  attacker,
                  target,
                  13,
                  {
                    type:
                      "special"
                  }
                );

              }


              setTimeout(
                () => {

                  assist.remove();


                  actionLock =
                    false;

                },
                500
              );

            }

          },
          25
        );

    },
    450
  );

}


/* =====================================================
   SEAN DADDY'S HUNGRY
===================================================== */

function daddyHungry(
  attacker,
  target
) {

  addComicText(
    "DADDY'S HUNGRY",
    "red-text",
    1900
  );


  const damagePerPlate =
    4;


  [
    0,
    1,
    2
  ]
  .forEach(
    index => {

      setTimeout(
        () => {

          const dish =
            document.createElement(
              "div"
            );


          dish.className =
            "effect flying-dish";


          dish.style.bottom =
            90 +
            index *
            22 +
            "px";


          moveProjectile(
            dish,
            attacker,
            target,
            12,
            30,
            () => {

              dealDamage(
                attacker,
                target,
                damagePerPlate,
                {
                  type:
                    "special"
                }
              );

            },
            "mid"
          );

        },
        400 +
        index *
        360
      );

    }
  );

}


/* =====================================================
   MARTIN DOG BREATH
===================================================== */

function dogBreath(
  attacker,
  target
) {

  addComicText(
    "DOG BREATH!",
    "green-text",
    1800
  );


  const gas =
    document.createElement(
      "div"
    );


  gas.className =
    "effect dog-breath-cloud";


  gas.style.left =
    attacker.facing ===
      1
      ? attacker.x +
        40 +
        "px"
      : attacker.x -
        145 +
        "px";


  gas.style.bottom =
    55 +
    attacker.y +
    "px";


  effects.appendChild(
    gas
  );


  gas.animate(
    [
      {
        transform:
          "scale(.2)",
        opacity:
          0
      },
      {
        transform:
          "scale(1.15)",
        opacity:
          .9
      }
    ],
    {
      duration:
        750,
      fill:
        "forwards"
    }
  );


  setTimeout(
    () => {

      if (
        horizontalDistance() <=
          185 &&
        target.y <
          80
      ) {

        stunTarget(
          target,
          3250
        );

      }

    },
    650
  );


  setTimeout(
    () =>
      gas.remove(),
    1800
  );

}


/* =====================================================
   ULTIMATE ROUTER
===================================================== */

function ultimateAttack(
  attacker,
  target
) {

  if (
    !canAct(attacker) ||
    attacker.ultimate <
      100
  ) {

    return;

  }


  attacker.ultimate =
    0;


  updateHUD();


  switch (
    attacker.character
  ) {

    case "brendan":
      ipo(
        attacker,
        target
      );
      break;

    case "grandaddy":
      yapAlert(
        attacker,
        target
      );
      break;

    case "connor":
      friedChicken(
        attacker
      );
      break;

    case "erin":
      laundry(
        attacker,
        target
      );
      break;

    case "shannan":
      conspiracy(
        attacker,
        target
      );
      break;

    case "liam":
      splashZone(
        attacker,
        target
      );
      break;

    case "grandmommy":
      chairYoga(
        attacker,
        target
      );
      break;

    case "sean":
      zombieDeer(
        attacker,
        target
      );
      break;

    case "martin":
      clydeReturns(
        attacker,
        target
      );
      break;

  }

}


/* =====================================================
   BRENDAN IPO — RESTORED GRAPHICS / NEW TIMING
===================================================== */

function ipo(
  attacker,
  target
) {

  actionLock =
    true;


  const hits =
    [
      7,
      8,
      9
    ];


  const labels =
    [
      "FUNDING ROUND!",
      "GROWTH!",
      "IPO!"
    ];


  const icons =
    [
      "📱",
      "📈",
      "💰"
    ];


  hits.forEach(
    (
      damage,
      index
    ) => {

      setTimeout(
        () => {

          const card =
            document.createElement(
              "div"
            );


          card.className =
            "effect ipo-card";


          card.innerHTML =
            icons[index] +
            "<br>" +
            labels[index];


          card.style.left =
            38 +
            index *
            8 +
            "%";


          card.style.top =
            80 +
            index *
            35 +
            "px";


          effects.appendChild(
            card
          );


          dealDamage(
            attacker,
            target,
            damage,
            {
              type:
                "ultimate",
              ignoreBlock:
                true
            }
          );


          setTimeout(
            () =>
              card.remove(),
            850
          );

        },
        300 +
        index *
        700
      );

    }
  );


  setTimeout(
    () => {

      actionLock =
        false;

    },
    2700
  );

}


/* =====================================================
   GRANDADDY YAP ALERT
===================================================== */

function yapAlert(
  attacker,
  target
) {

  actionLock =
    true;


  function alertWave(
    delay
  ) {

    setTimeout(
      () => {

        const alert =
          document.createElement(
            "div"
          );


        alert.className =
          "effect yap-alert";


        alert.textContent =
          "YAP ALERT! YAP ALERT!";


        alert.style.left =
          "50%";


        alert.style.top =
          "120px";


        alert.style.transform =
          "translateX(-50%)";


        effects.appendChild(
          alert
        );


        const siren1 =
          document.createElement(
            "div"
          );


        const siren2 =
          document.createElement(
            "div"
          );


        siren1.className =
          "effect yap-siren";


        siren2.className =
          "effect yap-siren";


        siren1.style.left =
          "10%";


        siren2.style.right =
          "10%";


        siren1.style.top =
          "95px";


        siren2.style.top =
          "95px";


        effects.appendChild(
          siren1
        );


        effects.appendChild(
          siren2
        );


        setTimeout(
          () => {

            alert.remove();

            siren1.remove();

            siren2.remove();

          },
          800
        );

      },
      delay
    );

  }


  alertWave(
    150
  );


  alertWave(
    1150
  );


  setTimeout(
    () => {

      stunTarget(
        target,
        3250
      );


      actionLock =
        false;

    },
    1900
  );

}


/* =====================================================
   CONNOR FRIED CHICKEN
===================================================== */

function friedChicken(
  attacker
) {

  actionLock =
    true;


  addComicText(
    "FRIED CHICKEN FEAST!",
    "yellow-text",
    1900
  );


  const bucket =
    document.createElement(
      "div"
    );


  bucket.className =
    "effect chicken-bucket";


  bucket.textContent =
    "🍗 🍗";


  bucket.style.left =
    attacker.x +
    20 +
    "px";


  bucket.style.bottom =
    95 +
    attacker.y +
    "px";


  effects.appendChild(
    bucket
  );


  setTimeout(
    () => {

      attacker.health =
        Math.min(
          attacker.maxHealth,
          attacker.health +
          30
        );


      updateHUD();


      bucket.remove();


      actionLock =
        false;

    },
    2600
  );

}


/* =====================================================
   ERIN LAUNDRY — KEEP CURRENT
===================================================== */

function laundry(
  attacker,
  target
) {

  actionLock =
    true;


  addComicText(
    "LAUNDRY AVALANCHE!",
    "pink-text",
    1900
  );


  const clothes =
    [
      "👕",
      "🧦",
      "👖",
      "👚"
    ];


  const damages =
    [
      5,
      5,
      7,
      9
    ];


  clothes.forEach(
    (
      item,
      index
    ) => {

      setTimeout(
        () => {

          const cloth =
            document.createElement(
              "div"
            );


          cloth.className =
            "effect laundry-item";


          cloth.textContent =
            item;


          cloth.style.left =
            target.x +
            (
              index % 2 ===
                0
                ? -10
                : 30
            ) +
            "px";


          cloth.style.top =
            "-100px";


          effects.appendChild(
            cloth
          );


          cloth.animate(
            [
              {
                transform:
                  "translateY(0)"
              },
              {
                transform:
                  "translateY(390px)"
              }
            ],
            {
              duration:
                700,
              fill:
                "forwards"
            }
          );


          setTimeout(
            () => {

              dealDamage(
                attacker,
                target,
                damages[index],
                {
                  type:
                    "ultimate",
                  ignoreBlock:
                    true
                }
              );

            },
            650
          );


          setTimeout(
            () =>
              cloth.remove(),
            1100
          );

        },
        index *
        420
      );

    }
  );


  setTimeout(
    () => {

      actionLock =
        false;

    },
    2700
  );

}


/* =====================================================
   SHANNAN CONSPIRACY
===================================================== */

function conspiracy(
  attacker,
  target
) {

  actionLock =
    true;


  addComicText(
    "CONSPIRACY",
    "green-text",
    2000
  );


  const ufo =
    document.createElement(
      "div"
    );


  ufo.className =
    "effect ufo";


  ufo.innerHTML = `
    <div class="ufo-dome"></div>
    <div class="ufo-body"></div>
    <div class="ufo-light one"></div>
    <div class="ufo-light two"></div>
    <div class="ufo-light three"></div>
  `;


  ufo.style.left =
    "-210px";


  ufo.style.top =
    "35px";


  effects.appendChild(
    ufo
  );


  const destination =
    Math.max(
      40,
      Math.min(
        arena.clientWidth -
        200,
        target.x -
        45
      )
    );


  ufo.animate(
    [
      {
        transform:
          "translateX(0)"
      },
      {
        transform:
          `translateX(${destination + 210}px)`
      }
    ],
    {
      duration:
        850,
      fill:
        "forwards"
    }
  );


  setTimeout(
    () => {

      const beam =
        document.createElement(
          "div"
        );


      beam.className =
        "effect ufo-beam";


      beam.style.left =
        destination +
        35 +
        "px";


      beam.style.top =
        "90px";


      effects.appendChild(
        beam
      );


      setTimeout(
        () => {

          dealDamage(
            attacker,
            target,
            24,
            {
              type:
                "ultimate",
              ignoreBlock:
                true
            }
          );

        },
        350
      );


      setTimeout(
        () =>
          beam.remove(),
        1000
      );

    },
    950
  );


  setTimeout(
    () => {

      ufo.remove();


      actionLock =
        false;

    },
    2500
  );

}


/* =====================================================
   LIAM SPLASH ZONE
===================================================== */

function splashZone(
  attacker,
  target
) {

  actionLock =
    true;


  addComicText(
    "SPLASH ZONE",
    "blue-text",
    2000
  );


  const handBall =
    attacker.fighter.querySelector(
      ".rugby-ball"
    );


  if (
    handBall
  ) {

    handBall.style.visibility =
      "hidden";

  }


  const foods =
    [
      "🍕",
      "🍔",
      "🍟",
      "🌭",
      "🍩",
      "🍦"
    ];


  const damages =
    [
      4,
      4,
      4,
      4,
      5,
      5
    ];


  foods.forEach(
    (
      food,
      index
    ) => {

      setTimeout(
        () => {

          const projectile =
            document.createElement(
              "div"
            );


          projectile.className =
            "effect food-projectile";


          projectile.textContent =
            food;


          projectile.style.bottom =
            80 +
            (
              index %
              3
            ) *
            28 +
            "px";


          moveProjectile(
            projectile,
            attacker,
            target,
            14,
            35,
            () => {

              const splat =
                document.createElement(
                  "div"
                );


              splat.className =
                "effect food-splat";


              splat.style.left =
                target.x +
                "px";


              splat.style.bottom =
                100 +
                target.y +
                "px";


              effects.appendChild(
                splat
              );


              setTimeout(
                () =>
                  splat.remove(),
                350
              );


              dealDamage(
                attacker,
                target,
                damages[index],
                {
                  type:
                    "ultimate",
                  ignoreBlock:
                    true
                }
              );

            },
            "high"
          );

        },
        350 +
        index *
        330
      );

    }
  );


  setTimeout(
    () => {

      if (
        handBall
      ) {

        handBall.style.visibility =
          "visible";

      }


      actionLock =
        false;

    },
    3000
  );

}


/* =====================================================
   GRANDMOMMY CHAIR YOGA — RESTORED VISUAL
===================================================== */

function chairYoga(
  attacker,
  target
) {

  actionLock =
    true;


  addComicText(
    "CHAIR YOGA",
    "purple-text",
    2100
  );


  const chair =
    document.createElement(
      "div"
    );


  chair.className =
    "effect yoga-chair";


  chair.innerHTML = `
    <div class="yoga-chair-back"></div>
    <div class="yoga-chair-seat"></div>
  `;


  chair.style.left =
    attacker.x +
    "px";


  chair.style.bottom =
    "20px";


  effects.appendChild(
    chair
  );


  const visual =
    attacker.fighter.querySelector(
      ".visual-layer"
    );


  visual.animate(
    [
      {
        transform:
          "translateY(0)"
      },
      {
        transform:
          "translateY(18px) scaleY(.82)"
      },
      {
        transform:
          "translateY(18px) rotate(-7deg) scaleY(.82)"
      },
      {
        transform:
          "translateY(18px) rotate(7deg) scaleY(.82)"
      },
      {
        transform:
          "translateY(0)"
      }
    ],
    {
      duration:
        1800,
      fill:
        "forwards"
    }
  );


  setTimeout(
    () => {

      let x =
        attacker.x;


      const direction =
        attacker.facing;


      const loop =
        setInterval(
          () => {

            x +=
              17 *
              direction;


            chair.style.left =
              x +
              "px";


            chair.style.transform =
              `rotate(${x * 4}deg)`;


            if (
              Math.abs(
                x -
                target.x
              ) <
              40
            ) {

              clearInterval(
                loop
              );


              chair.remove();


              dealDamage(
                attacker,
                target,
                30,
                {
                  type:
                    "ultimate",
                  ignoreBlock:
                    true
                }
              );

            }

          },
          27
        );

    },
    1900
  );


  setTimeout(
    () => {

      actionLock =
        false;

    },
    3200
  );

}


/* =====================================================
   SEAN ZOMBIE DEER — RESTORED QUALITY
===================================================== */

function deerHTML() {

  return `
    <div class="deer-body"></div>

    <div class="deer-head">
      <div class="deer-eye left"></div>
      <div class="deer-eye right"></div>
    </div>

    <div class="deer-leg one"></div>
    <div class="deer-leg two"></div>
    <div class="deer-leg three"></div>
    <div class="deer-leg four"></div>
  `;

}


function zombieDeer(
  attacker,
  target
) {

  actionLock =
    true;


  addComicText(
    "ZOMBIE DEER",
    "green-text",
    1900
  );


  [
    0,
    1
  ].forEach(
    index => {

      const grave =
        document.createElement(
          "div"
        );


      grave.className =
        "effect deer-grave";


      grave.textContent =
        "RIP";


      const start =
        attacker.facing ===
          1
          ? 70 +
            index *
            100
          : arena.clientWidth -
            260 +
            index *
            100;


      grave.style.left =
        start +
        "px";


      grave.style.bottom =
        "20px";


      effects.appendChild(
        grave
      );


      setTimeout(
        () => {

          const deer =
            document.createElement(
              "div"
            );


          deer.className =
            "effect zombie-deer";


          deer.innerHTML =
            deerHTML();


          let x =
            start;


          const direction =
            attacker.facing;


          deer.style.left =
            x +
            "px";


          deer.style.bottom =
            "30px";


          if (
            direction ===
            -1
          ) {

            deer.style.transform =
              "scaleX(-1)";

          }


          effects.appendChild(
            deer
          );


          const loop =
            setInterval(
              () => {

                x +=
                  12 *
                  direction;


                deer.style.left =
                  x +
                  "px";


                if (
                  Math.abs(
                    x -
                    target.x
                  ) <
                  45
                ) {

                  clearInterval(
                    loop
                  );


                  if (
                    target.y <
                    60
                  ) {

                    dealDamage(
                      attacker,
                      target,
                      13,
                      {
                        type:
                          "ultimate",
                        ignoreBlock:
                          true
                      }
                    );

                  }


                  setTimeout(
                    () =>
                      deer.remove(),
                    350
                  );

                }

              },
              30
            );

        },
        700 +
        index *
        200
      );


      setTimeout(
        () =>
          grave.remove(),
        2500
      );

    }
  );


  setTimeout(
    () => {

      actionLock =
        false;

    },
    2900
  );

}


/* =====================================================
   CLYDE — RESTORED QUALITY
===================================================== */

function clydeHTML() {

  return `
    <div class="clyde-tail"></div>

    <div class="clyde-body">
      <div class="clyde-zombie-side"></div>
    </div>

    <div class="clyde-head">

      <div class="clyde-face-light"></div>

      <div class="clyde-eye normal-eye"></div>
      <div class="clyde-eye zombie-eye"></div>

      <div class="clyde-nose"></div>

      <div class="clyde-ear left"></div>
      <div class="clyde-ear right"></div>

    </div>

    <div class="clyde-leg one"></div>
    <div class="clyde-leg two"></div>
    <div class="clyde-leg three"></div>
    <div class="clyde-leg four"></div>
  `;

}


function clydeReturns(
  attacker,
  target
) {

  actionLock =
    true;


  addComicText(
    "CLYDE RETURNS!",
    "green-text",
    1900
  );


  const grave =
    document.createElement(
      "div"
    );


  grave.className =
    "effect grave";


  grave.textContent =
    "CLYDE";


  grave.style.left =
    attacker.x +
    (
      attacker.facing ===
        1
        ? 60
        : -70
    ) +
    "px";


  grave.style.bottom =
    "20px";


  effects.appendChild(
    grave
  );


  setTimeout(
    () => {

      const clyde =
        document.createElement(
          "div"
        );


      clyde.className =
        "effect clyde-model";


      clyde.innerHTML =
        clydeHTML();


      let x =
        attacker.x +
        (
          attacker.facing ===
            1
            ? 50
            : -45
        );


      const direction =
        attacker.facing;


      clyde.style.left =
        x +
        "px";


      clyde.style.bottom =
        "45px";


      if (
        direction ===
        -1
      ) {

        clyde.style.transform =
          "scaleX(-1)";

      }


      effects.appendChild(
        clyde
      );


      const loop =
        setInterval(
          () => {

            x +=
              12 *
              direction;


            clyde.style.left =
              x +
              "px";


            if (
              Math.abs(
                x -
                target.x
              ) <
              40
            ) {

              clearInterval(
                loop
              );


              if (
                target.y <
                70
              ) {

                dealDamage(
                  attacker,
                  target,
                  32,
                  {
                    type:
                      "ultimate",
                    ignoreBlock:
                      true
                  }
                );

              }


              setTimeout(
                () =>
                  clyde.remove(),
                350
              );

            }

          },
          30
        );

    },
    850
  );


  setTimeout(
    () => {

      grave.remove();


      actionLock =
        false;

    },
    2600
  );

}


/* =====================================================
   CPU AI
===================================================== */

function cpuLoop(
  thisMatch,
  thisRound
) {

  if (
    gameMode !==
      "1P" ||
    thisMatch !==
      matchId ||
    thisRound !==
      roundId ||
    roundOver ||
    gameOver
  ) {

    return;

  }


  if (
    !canAct(P2)
  ) {

    setTimeout(
      () =>
        cpuLoop(
          thisMatch,
          thisRound
        ),
      160
    );


    return;

  }


  const stats =
    STATS[
      P2.character
    ];


  const distance =
    horizontalDistance();


  const roll =
    Math.random();


  const boss =
    challengeMode &&
    P2.character ===
      "martin";


  /*
    Dodge sometimes when opponent is attacking.
  */

  if (
    P1.attackCooldown &&
    distance <
      150 &&
    roll <
      0.18
  ) {

    jump(
      P2
    );

  }


  else if (
    P2.character ===
      "connor" &&
    P2.ultimate >=
      100 &&
    P2.health <=
      P2.maxHealth *
      0.58
  ) {

    ultimateAttack(
      P2,
      P1
    );

  }


  else if (
    P2.ultimate >=
      100 &&
    roll <
      (
        boss
          ? 0.38
          : 0.3
      )
  ) {

    ultimateAttack(
      P2,
      P1
    );

  }


  else if (
    distance >
    stats.range +
    12
  ) {

    movePlayer(
      P2,
      P2.facing *
      (
        boss
          ? 32
          : 27
      )
    );

  }


  else if (
    roll <
      0.58
  ) {

    basicAttack(
      P2,
      P1
    );

  }


  else if (
    roll <
      0.82 &&
    !P2.specialCooldown
  ) {

    specialAttack(
      P2,
      P1
    );

  }


  else if (
    roll <
      0.91
  ) {

    block(
      P2,
      true
    );


    setTimeout(
      () =>
        block(
          P2,
          false
        ),
      500
    );

  }


  else {

    jump(
      P2
    );

  }


  setTimeout(
    () =>
      cpuLoop(
        thisMatch,
        thisRound
      ),
    boss
      ? 330 +
        Math.random() *
        110
      : 410 +
        Math.random() *
        140
  );

}


/* =====================================================
   KO
===================================================== */

function checkKO() {

  if (
    roundOver
  ) {

    return;

  }


  if (
    P1.health <=
    0
  ) {

    finishRound(
      P2
    );

  }


  else if (
    P2.health <=
    0
  ) {

    finishRound(
      P1
    );

  }

}


function finishRound(
  winner
) {

  roundOver =
    true;

  fightStarted =
    false;

  actionLock =
    true;


  if (
    winner ===
    P1
  ) {

    player1Wins++;

  }

  else {

    player2Wins++;

  }


  roundScore.textContent =
    player1Wins +
    " - " +
    player2Wins;


  winnerText.textContent =
    displayName(
      winner.character
    ) +
    " WINS ROUND " +
    currentRound;


  setTimeout(
    () => {

      koOverlay.classList.remove(
        "hidden"
      );


      if (
        player1Wins >=
          2 ||
        player2Wins >=
          2
      ) {

        gameOver =
          true;

        matchActive =
          false;


        if (
          challengeMode &&
          player1Wins >=
            2
        ) {

          challengeResult =
            "won";


          unlockMartin();


          matchStatus.textContent =
            "MARTIN DEFEATED — MARTIN UNLOCKED";


          newGameButton.textContent =
            "CONTINUE";


          newGameButton.classList.remove(
            "hidden"
          );


          return;

        }


        if (
          challengeMode &&
          player2Wins >=
            2
        ) {

          challengeResult =
            "lost";


          matchStatus.textContent =
            "MARTIN WINS — TRY AGAIN";


          newGameButton.textContent =
            "TRY AGAIN";


          newGameButton.classList.remove(
            "hidden"
          );


          return;

        }


        matchStatus.textContent =
          displayName(
            winner.character
          ) +
          " WINS THE MATCH";


        newGameButton.textContent =
          "NEW GAME";


        newGameButton.classList.remove(
          "hidden"
        );


        return;

      }


      matchStatus.textContent =
        player1Wins +
        " - " +
        player2Wins;


      setTimeout(
        () => {

          currentRound++;


          koOverlay.classList.add(
            "hidden"
          );


          startRound();

        },
        1900
      );

    },
    650
  );

}


/* =====================================================
   NEW GAME
===================================================== */

newGameButton.onclick =
  () => {

    matchId++;

    roundId++;


    effects.innerHTML =
      "";


    koOverlay.classList.add(
      "hidden"
    );


    if (
      challengeMode &&
      challengeResult ===
        "lost"
    ) {

      challengeResult =
        null;


      renderChallengeChoices();


      showScreen(
        challengeScreen
      );


      return;

    }


    if (
      challengeMode &&
      challengeResult ===
        "won"
    ) {

      challengeMode =
        false;

      challengeResult =
        null;


      setGameMode(
        "1P"
      );


      resetSelection();


      showScreen(
        selectScreen
      );


      return;

    }


    challengeMode =
      false;


    resetSelection();


    showScreen(
      selectScreen
    );

  };


/* =====================================================
   ONSCREEN BUTTONS
===================================================== */

onePlayerAttackButton.onclick =
  () =>
    basicAttack(
      P1,
      P2
    );


onePlayerSpecialButton.onclick =
  () =>
    specialAttack(
      P1,
      P2
    );


onePlayerUltimateButton.onclick =
  () =>
    ultimateAttack(
      P1,
      P2
    );


/* =====================================================
   KEYBOARD
===================================================== */

document.addEventListener(
  "keydown",
  event => {

    if (
      !fightScreen.classList.contains(
        "active"
      )
    ) {

      return;

    }


    const key =
      event.key.toLowerCase();


    keys[key] =
      true;


    if (
      [
        "arrowleft",
        "arrowright",
        "arrowup",
        "arrowdown",
        " "
      ].includes(
        key
      )
    ) {

      event.preventDefault();

    }


    /* =================================================
       ONE PLAYER
       WASD + Q/E/R/F
    ================================================= */

    if (
      gameMode ===
      "1P"
    ) {

      if (
        key === "w" &&
        !event.repeat
      ) {

        jump(
          P1
        );

      }


      if (
        key === "s"
      ) {

        crouch(
          P1,
          true
        );

      }


      if (
        key === "q"
      ) {

        block(
          P1,
          true
        );

      }


     if (
  key === "r" &&
  !event.repeat
) {

  basicAttack(
    P1,
    P2
  );

}


if (
  key === "e" &&
  !event.repeat
) {

  specialAttack(
    P1,
    P2
  );

}



      if (
        key === "f" &&
        !event.repeat
      ) {

        ultimateAttack(
          P1,
          P2
        );

      }


      return;

    }


    /* =================================================
       TWO PLAYER P1
       WASD + Q/E/R/F
    ================================================= */

    if (
      key === "w" &&
      !event.repeat
    ) {

      jump(
        P1
      );

    }


    if (
      key === "s"
    ) {

      crouch(
        P1,
        true
      );

    }


    if (
      key === "q"
    ) {

      block(
        P1,
        true
      );

    }


    if (
      key === "e" &&
      !event.repeat
    ) {

      basicAttack(
        P1,
        P2
      );

    }


    if (
      key === "r" &&
      !event.repeat
    ) {

      specialAttack(
        P1,
        P2
      );

    }


    if (
      key === "f" &&
      !event.repeat
    ) {

      ultimateAttack(
        P1,
        P2
      );

    }


    /* =================================================
       TWO PLAYER P2
       ARROWS + I/J/K/L
    ================================================= */

    if (
      key === "arrowup" &&
      !event.repeat
    ) {

      jump(
        P2
      );

    }


    if (
      key === "arrowdown"
    ) {

      crouch(
        P2,
        true
      );

    }


    if (
      key === "i"
    ) {

      block(
        P2,
        true
      );

    }


    if (
      key === "j" &&
      !event.repeat
    ) {

      basicAttack(
        P2,
        P1
      );

    }


    if (
      key === "k" &&
      !event.repeat
    ) {

      specialAttack(
        P2,
        P1
      );

    }


    if (
      key === "l" &&
      !event.repeat
    ) {

      ultimateAttack(
        P2,
        P1
      );

    }

  }
);


document.addEventListener(
  "keyup",
  event => {

    const key =
      event.key.toLowerCase();


    keys[key] =
      false;


    if (
      gameMode ===
      "1P"
    ) {

      if (
        key === "s"
      ) {

        crouch(
          P1,
          false
        );

      }


      if (
        key === "q"
      ) {

        block(
          P1,
          false
        );

      }


      return;

    }


    if (
      key === "s"
    ) {

      crouch(
        P1,
        false
      );

    }


    if (
      key === "q"
    ) {

      block(
        P1,
        false
      );

    }


    if (
      key === "arrowdown"
    ) {

      crouch(
        P2,
        false
      );

    }


    if (
      key === "i"
    ) {

      block(
        P2,
        false
      );

    }

  }
);


/* =====================================================
   MOVEMENT LOOP
===================================================== */

function movementLoop() {

  let p1Moving =
    false;

  let p2Moving =
    false;


  if (
    canAct(P1)
  ) {

    if (
      keys["a"]
    ) {

      movePlayer(
        P1,
        -6
      );


      p1Moving =
        true;

    }


    if (
      keys["d"]
    ) {

      movePlayer(
        P1,
        6
      );


      p1Moving =
        true;

    }

  }


  if (
    gameMode ===
      "2P" &&
    canAct(P2)
  ) {

    if (
      keys["arrowleft"]
    ) {

      movePlayer(
        P2,
        -6
      );


      p2Moving =
        true;

    }


    if (
      keys["arrowright"]
    ) {

      movePlayer(
        P2,
        6
      );


      p2Moving =
        true;

    }

  }


  P1.fighter.classList.toggle(
    "walking",
    p1Moving &&
    !P1.jumping &&
    !P1.crouching
  );


  P2.fighter.classList.toggle(
    "walking",
    p2Moving &&
    !P2.jumping &&
    !P2.crouching
  );


  requestAnimationFrame(
    movementLoop
  );

}


movementLoop();


/* =====================================================
   ABILITY ORBS
===================================================== */

function orbLoop() {

  const p1Special =
    P1.specialCooldown
      ? 1 -
        Math.max(
          0,
          P1.specialReadyAt -
          Date.now()
        ) /
        5000
      : 1;


  const p2Special =
    P2.specialCooldown
      ? 1 -
        Math.max(
          0,
          P2.specialReadyAt -
          Date.now()
        ) /
        5000
      : 1;


  player1SpecialOrb.style.setProperty(
    "--fill",
    p1Special *
    360 +
    "deg"
  );


  player2SpecialOrb.style.setProperty(
    "--fill",
    p2Special *
    360 +
    "deg"
  );


  player1UltimateOrb.style.setProperty(
    "--fill",
    P1.ultimate *
    3.6 +
    "deg"
  );


  player2UltimateOrb.style.setProperty(
    "--fill",
    P2.ultimate *
    3.6 +
    "deg"
  );


  requestAnimationFrame(
    orbLoop
  );

}


orbLoop();


/* =====================================================
   RESIZE
===================================================== */

window.addEventListener(
  "resize",
  updatePositions
);


/* =====================================================
   INITIALIZE
===================================================== */

renderPreviews();

updateMartinUI();

generateTitleMatchup();

setGameMode(
  "1P"
);
