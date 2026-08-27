/* =====================================================
   BLOODLINE BRAWL
   FULL 1P + 2P BUILD
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


const onePlayerBlockButton =
  $("onePlayerBlockButton");

const onePlayerAttackButton =
  $("onePlayerAttackButton");

const onePlayerSpecialButton =
  $("onePlayerSpecialButton");

const onePlayerUltimateButton =
  $("onePlayerUltimateButton");


/* =====================================================
   ROSTER
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
   GLOBAL GAME STATE
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
   PLAYER STATE OBJECTS
===================================================== */

const P1 = {

  side: 1,

  character: null,

  fighter: player1Fighter,

  health: 100,

  maxHealth: 100,

  ultimate: 0,

  x: 100,

  jumping: false,

  crouching: false,

  blocking: false,

  stunned: false,

  attackCooldown: false,

  specialCooldown: false,

  specialReadyAt: 0

};


const P2 = {

  side: 2,

  character: null,

  fighter: player2Fighter,

  health: 100,

  maxHealth: 100,

  ultimate: 0,

  x: 700,

  jumping: false,

  crouching: false,

  blocking: false,

  stunned: false,

  attackCooldown: false,

  specialCooldown: false,

  specialReadyAt: 0

};


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

        <div class="arm right-arm">
          <div class="golf-club"></div>
        </div>

        <div class="leg left-leg khaki"></div>
        <div class="leg right-leg khaki"></div>

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
        <div class="hat-letter">S</div>

        <div class="grandaddy-shirt"></div>

        <div class="arm left-arm"></div>

        <div class="arm right-arm">
          <div class="hammer">
            <div class="hammer-square"></div>
          </div>
        </div>

        <div class="leg left-leg black-pants"></div>
        <div class="leg right-leg black-pants"></div>

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

        <div class="arm right-arm">
          <div class="paintbrush"></div>
        </div>

        <div class="leg left-leg gray-pants"></div>
        <div class="leg right-leg gray-pants"></div>

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

        <div class="arm right-arm">
          <div class="hairbrush"></div>
        </div>

        <div class="leg left-leg blue-jeans"></div>
        <div class="leg right-leg blue-jeans"></div>

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

        <div class="arm right-arm">
          <div class="syringe"></div>
        </div>

        <div class="leg left-leg shannan-pants"></div>
        <div class="leg right-leg shannan-pants"></div>

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

        <div class="arm right-arm">
          <div class="rugby-ball"></div>
        </div>

        <div class="leg left-leg liam-blue-pants"></div>
        <div class="leg right-leg liam-blue-pants"></div>

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

        <div class="arm right-arm">
          <div class="spatula"></div>
        </div>

        <div class="leg left-leg grandmommy-pants"></div>
        <div class="leg right-leg grandmommy-pants"></div>

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

        <div class="arm right-arm">
          <div class="baseball-bat"></div>
        </div>

        <div class="leg left-leg sean-pants"></div>
        <div class="leg right-leg sean-pants"></div>

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
   SCREEN CONTROL
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


/* =====================================================
   PREVIEWS
===================================================== */

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


/* =====================================================
   TITLE MATCHUP
===================================================== */

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
   CHARACTER SELECT RESET
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


/* =====================================================
   TITLE START
===================================================== */

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


/* =====================================================
   CHARACTER CARDS
===================================================== */

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


          selectionPrompt.textContent =
            "FIGHTER SELECTED";


          selectionText.textContent =
            "PLAYER 1: " +
            displayName(c);


          mapSelectButton.disabled =
            false;


          return;

        }


        /* TWO PLAYER */

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
   MAP
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

          mapModeLabel.textContent =
            "MARTIN'S CHALLENGE";

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
   CPU CHOICE
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
   FIGHT START
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
      "G";

    player1UltimateKey.textContent =
      "H";

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
      "K";

    player1UltimateKey.textContent =
      "L";

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


  battleMapName.textContent =
    MAP_NAMES[
      selectedMap
    ];


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
   ROUND RESET
===================================================== */

function resetPlayerState(
  p
) {

  p.health =
    p.maxHealth;

  p.ultimate =
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
    "jumping",
    "crouching",
    "stunned",
    "ko-loser"
  );


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


  effects.innerHTML =
    "";


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
   POSITION
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


  if (
    P1.x + 62 >
    P2.x
  ) {

    const middle =
      (
        P1.x +
        P2.x
      ) /
      2;


    P1.x =
      middle -
      32;

    P2.x =
      middle +
      32;

  }


  P1.fighter.style.left =
    P1.x +
    "px";


  P2.fighter.style.left =
    P2.x +
    "px";

}


function fighterDistance() {

  return Math.abs(
    P2.x -
    P1.x
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


function jump(
  p
) {

  if (
    !canAct(p) ||
    p.jumping ||
    p.crouching
  ) {

    return;

  }


  p.jumping =
    true;


  p.fighter.classList.add(
    "jumping"
  );


  setTimeout(
    () => {

      p.fighter.classList.remove(
        "jumping"
      );

      p.jumping =
        false;

    },
    620
  );

}


function crouch(
  p,
  on
) {

  if (
    on &&
    !canAct(p)
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


function block(
  p,
  on
) {

  if (
    on &&
    !canAct(p)
  ) {

    return;

  }


  p.blocking =
    on;

}


/* =====================================================
   EFFECT HELPERS
===================================================== */

function addComicText(
  text,
  colorClass =
    "yellow-text",
  duration =
    1500
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
  target
) {

  const spark =
    document.createElement(
      "div"
    );


  spark.className =
    "effect hit-spark";


  spark.style.left =
    target.x +
    30 +
    "px";


  spark.style.bottom =
    "100px";


  effects.appendChild(
    spark
  );


  setTimeout(
    () =>
      spark.remove(),
    360
  );

}


/* =====================================================
   DAMAGE
===================================================== */

function dealDamage(
  attacker,
  target,
  amount,
  ignoreBlock = false
) {

  if (
    roundOver ||
    !fightStarted
  ) {

    return;

  }


  let damage =
    amount;


  if (
    target.blocking &&
    !ignoreBlock
  ) {

    damage *=
      0.25;

  }

  else {

    hitSpark(
      target
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

      if (
        fighterDistance() <=
          stats.range &&
        !target.jumping
      ) {

        dealDamage(
          attacker,
          target,
          stats.basic
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
   BRENDAN SPECIAL
===================================================== */

function bigDrive(
  attacker,
  target
) {

  addComicText(
    "BIG DRIVE!",
    "yellow-text",
    1500
  );


  const ball =
    document.createElement(
      "div"
    );


  ball.className =
    "effect golf-ball";


  let x =
    attacker.x +
    (
      attacker.side === 1
        ? 70
        : 0
    );


  const direction =
    attacker.side === 1
      ? 1
      : -1;


  ball.style.left =
    x +
    "px";


  ball.style.bottom =
    "70px";


  effects.appendChild(
    ball
  );


  setTimeout(
    () => {

      const loop =
        setInterval(
          () => {

            x +=
              14 *
              direction;


            ball.style.left =
              x +
              "px";


            if (
              Math.abs(
                x -
                target.x
              ) <
              30
            ) {

              clearInterval(
                loop
              );


              ball.remove();


              dealDamage(
                attacker,
                target,
                12
              );

            }

          },
          24
        );

    },
    350
  );

}


/* =====================================================
   GRANDADDY SPECIAL
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
    1600
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
    "20px";


  effects.appendChild(
    ladder
  );


  setTimeout(
    () => {

      dealDamage(
        attacker,
        target,
        12
      );


      ladder.animate(
        [
          {
            transform:
              "rotate(0deg)"
          },
          {
            transform:
              "rotate(80deg)"
          }
        ],
        {
          duration:
            600,
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
   CONNOR SPECIAL
===================================================== */

function paintBeast(
  attacker,
  target
) {

  addComicText(
    "PAINT BEAST!",
    "blue-text",
    1600
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
    "105px";


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


      let x =
        attacker.x;


      const direction =
        attacker.side === 1
          ? 1
          : -1;


      dino.style.left =
        x +
        "px";


      dino.style.bottom =
        "45px";


      if (
        attacker.side === 2
      ) {

        dino.style.transform =
          "scaleX(-1)";

      }


      effects.appendChild(
        dino
      );


      const loop =
        setInterval(
          () => {

            x +=
              9 *
              direction;


            dino.style.left =
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


              dealDamage(
                attacker,
                target,
                14
              );


              setTimeout(
                () =>
                  dino.remove(),
                300
              );

            }

          },
          38
        );

    },
    800
  );

}


/* =====================================================
   ERIN SPECIAL
===================================================== */

function pimplePatch(
  attacker,
  target
) {

  addComicText(
    "PIMPLE PATCH ATTACK",
    "pink-text",
    1700
  );


  const patch =
    document.createElement(
      "div"
    );


  patch.className =
    "effect pimple-projectile";


  let x =
    attacker.x +
    45;


  const direction =
    attacker.side === 1
      ? 1
      : -1;


  patch.style.left =
    x +
    "px";


  patch.style.bottom =
    "110px";


  effects.appendChild(
    patch
  );


  setTimeout(
    () => {

      const loop =
        setInterval(
          () => {

            x +=
              13 *
              direction;


            patch.style.left =
              x +
              "px";


            if (
              Math.abs(
                x -
                target.x
              ) <
              30
            ) {

              clearInterval(
                loop
              );


              patch.remove();


              stunTarget(
                target,
                2500
              );

            }

          },
          28
        );

    },
    350
  );

}


/* =====================================================
   SHANNAN SPECIAL
===================================================== */

function brainrot(
  attacker,
  target
) {

  addComicText(
    "BRAINROT",
    "red-text",
    1900
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
      target.x -
      25
    ) +
    "px";


  phone.style.top =
    "95px";


  effects.appendChild(
    phone
  );


  phone.animate(
    [
      {
        transform:
          "scale(.2)",
        opacity:
          0
      },
      {
        transform:
          "scale(1.08)",
        opacity:
          1
      },
      {
        transform:
          "scale(1)",
        opacity:
          1
      }
    ],
    {
      duration:
        750,
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
   LIAM SPECIAL
===================================================== */

function rugbyPass(
  attacker,
  target
) {

  addComicText(
    "RUGBY PASS!",
    "blue-text",
    1500
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


  let x =
    attacker.x +
    50;


  const direction =
    attacker.side === 1
      ? 1
      : -1;


  ball.style.left =
    x +
    "px";


  ball.style.bottom =
    "105px";


  effects.appendChild(
    ball
  );


  setTimeout(
    () => {

      const loop =
        setInterval(
          () => {

            x +=
              14 *
              direction;


            ball.style.left =
              x +
              "px";


            ball.style.transform =
              `rotate(${x * 2}deg)`;


            if (
              Math.abs(
                x -
                target.x
              ) <
              32
            ) {

              clearInterval(
                loop
              );


              ball.remove();


              dealDamage(
                attacker,
                target,
                11
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

            }

          },
          27
        );

    },
    400
  );

}


/* =====================================================
   GRANDMOMMY SPECIAL
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
    1700
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
    attacker.side === 1
      ? -120
      : arena.clientWidth +
        120;


  const direction =
    attacker.side === 1
      ? 1
      : -1;


  assist.style.left =
    x +
    "px";


  assist.style.bottom =
    "25px";


  if (
    attacker.side === 2
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


              dealDamage(
                attacker,
                target,
                13
              );


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
   SEAN SPECIAL
===================================================== */

function daddyHungry(
  attacker,
  target
) {

  addComicText(
    "DADDY'S HUNGRY",
    "red-text",
    1800
  );


  const damagePerPlate =
    4;


  [0,1,2].forEach(
    index => {

      setTimeout(
        () => {

          const dish =
            document.createElement(
              "div"
            );


          dish.className =
            "effect flying-dish";


          let x =
            attacker.x +
            45;


          const direction =
            attacker.side === 1
              ? 1
              : -1;


          dish.style.left =
            x +
            "px";


          dish.style.bottom =
            90 +
            index *
            24 +
            "px";


          effects.appendChild(
            dish
          );


          const loop =
            setInterval(
              () => {

                /* deliberately slower */
                x +=
                  12 *
                  direction;


                dish.style.left =
                  x +
                  "px";


                dish.style.transform =
                  `rotate(${x * 3}deg)`;


                if (
                  Math.abs(
                    x -
                    target.x
                  ) <
                  30
                ) {

                  clearInterval(
                    loop
                  );


                  dish.remove();


                  dealDamage(
                    attacker,
                    target,
                    damagePerPlate
                  );

                }

              },
              30
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
   MARTIN SPECIAL
===================================================== */

function dogBreath(
  attacker,
  target
) {

  addComicText(
    "DOG BREATH!",
    "green-text",
    1700
  );


  const gas =
    document.createElement(
      "div"
    );


  gas.className =
    "effect dog-breath-cloud";


  gas.style.left =
    attacker.side === 1
      ? attacker.x +
        40 +
        "px"
      : attacker.x -
        145 +
        "px";


  gas.style.bottom =
    "55px";


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
        fighterDistance() <=
        185
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
   BRENDAN ULTIMATE - 24
===================================================== */

function ipo(
  attacker,
  target
) {

  actionLock =
    true;


  const hits =
    [7,8,9];


  const labels =
    [
      "FUNDING ROUND!",
      "GROWTH!",
      "IPO!"
    ];


  hits.forEach(
    (
      damage,
      i
    ) => {

      setTimeout(
        () => {

          addComicText(
            labels[i],
            "yellow-text",
            1100
          );


          dealDamage(
            attacker,
            target,
            damage,
            true
          );

        },
        300 +
        i *
        700
      );

    }
  );


  setTimeout(
    () => {

      actionLock =
        false;

    },
    2600
  );

}


/* =====================================================
   GRANDADDY ULTIMATE
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
   CONNOR ULTIMATE
===================================================== */

function friedChicken(
  attacker
) {

  actionLock =
    true;


  addComicText(
    "FRIED CHICKEN FEAST!",
    "yellow-text",
    1800
  );


  const chicken =
    document.createElement(
      "div"
    );


  chicken.className =
    "effect";


  chicken.textContent =
    "🍗 🍗 🍗";


  chicken.style.fontSize =
    "50px";


  chicken.style.left =
    attacker.x +
    "px";


  chicken.style.bottom =
    "100px";


  effects.appendChild(
    chicken
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


      chicken.remove();


      actionLock =
        false;

    },
    2600
  );

}


/* =====================================================
   ERIN ULTIMATE - 26
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
    1800
  );


  const clothes =
    [
      "👕",
      "🧦",
      "👖",
      "👚"
    ];


  const damageHits =
    [5,5,7,9];


  clothes.forEach(
    (
      item,
      i
    ) => {

      setTimeout(
        () => {

          const cloth =
            document.createElement(
              "div"
            );


          cloth.className =
            "effect";


          cloth.textContent =
            item;


          cloth.style.fontSize =
            "70px";


          cloth.style.left =
            target.x +
            (
              i % 2 === 0
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
                damageHits[i],
                true
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
        i *
        420
      );

    }
  );


  setTimeout(
    () => {

      actionLock =
        false;

    },
    2600
  );

}


/* =====================================================
   SHANNAN ULTIMATE - 24
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
    1900
  );


  const ufo =
    document.createElement(
      "div"
    );


  ufo.className =
    "effect ufo";


  ufo.style.left =
    "-220px";


  ufo.style.top =
    "40px";


  effects.appendChild(
    ufo
  );


  const destination =
    Math.max(
      40,
      target.x -
      45
    );


  ufo.animate(
    [
      {
        transform:
          "translateX(0)"
      },
      {
        transform:
          `translateX(${destination + 220}px)`
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
        "95px";


      effects.appendChild(
        beam
      );


      setTimeout(
        () => {

          dealDamage(
            attacker,
            target,
            24,
            true
          );

        },
        450
      );


      setTimeout(
        () =>
          beam.remove(),
        1150
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
   LIAM ULTIMATE - 26
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
    1900
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
    [4,4,4,4,5,5];


  foods.forEach(
    (
      food,
      i
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


          let x =
            attacker.x +
            45;


          const direction =
            attacker.side === 1
              ? 1
              : -1;


          projectile.style.left =
            x +
            "px";


          projectile.style.bottom =
            80 +
            (
              i %
              3
            ) *
            28 +
            "px";


          effects.appendChild(
            projectile
          );


          const loop =
            setInterval(
              () => {

                x +=
                  14 *
                  direction;


                projectile.style.left =
                  x +
                  "px";


                if (
                  Math.abs(
                    x -
                    target.x
                  ) <
                  35
                ) {

                  clearInterval(
                    loop
                  );


                  projectile.remove();


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
                    "100px";


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
                    damages[i],
                    true
                  );

                }

              },
              26
            );

        },
        350 +
        i *
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
    2900
  );

}


/* =====================================================
   GRANDMOMMY ULTIMATE - 30
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
    2000
  );


  const chair =
    document.createElement(
      "div"
    );


  chair.className =
    "effect yoga-chair";


  chair.style.left =
    attacker.x +
    "px";


  chair.style.bottom =
    "20px";


  effects.appendChild(
    chair
  );


  attacker.fighter
    .querySelector(
      ".visual-layer"
    )
    .animate(
      [
        {
          transform:
            "translateY(0)"
        },
        {
          transform:
            "translateY(20px) scaleY(.8)"
        },
        {
          transform:
            "translateY(20px) rotate(-8deg) scaleY(.8)"
        },
        {
          transform:
            "translateY(20px) rotate(8deg) scaleY(.8)"
        },
        {
          transform:
            "translateY(0)"
        }
      ],
      {
        duration:
          1900
      }
    );


  setTimeout(
    () => {

      let x =
        attacker.x;


      const direction =
        attacker.side === 1
          ? 1
          : -1;


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
                true
              );

            }

          },
          27
        );

    },
    2000
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
   SEAN ULTIMATE - 26
===================================================== */

function zombieDeer(
  attacker,
  target
) {

  actionLock =
    true;


  addComicText(
    "ZOMBIE DEER",
    "green-text",
    1800
  );


  [0,1].forEach(
    i => {

      const grave =
        document.createElement(
          "div"
        );


      grave.className =
        "effect grave";


      grave.textContent =
        "RIP";


      const start =
        attacker.side === 1
          ? 70 +
            i *
            100
          : arena.clientWidth -
            260 +
            i *
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


          let x =
            start;


          const direction =
            attacker.side === 1
              ? 1
              : -1;


          deer.style.left =
            x +
            "px";


          deer.style.bottom =
            "40px";


          if (
            attacker.side === 2
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


                  dealDamage(
                    attacker,
                    target,
                    13,
                    true
                  );


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
        i *
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
   MARTIN ULTIMATE - 32
===================================================== */

function clydeReturns(
  attacker,
  target
) {

  actionLock =
    true;


  addComicText(
    "CLYDE RETURNS!",
    "green-text",
    1800
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
    60 +
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


      let x =
        attacker.x +
        50;


      const direction =
        attacker.side === 1
          ? 1
          : -1;


      clyde.style.left =
        x +
        "px";


      clyde.style.bottom =
        "45px";


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


              dealDamage(
                attacker,
                target,
                32,
                true
              );


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


  const d =
    fighterDistance();


  const roll =
    Math.random();


  const boss =
    challengeMode &&
    P2.character ===
      "martin";


  if (
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
    d >
    stats.range +
    12
  ) {

    movePlayer(
      P2,
      boss
        ? -32
        : -27
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
   KO / ROUND
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
    winner === P1
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
   1P BUTTON CONTROLS
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


onePlayerBlockButton.onpointerdown =
  () =>
    block(
      P1,
      true
    );


onePlayerBlockButton.onpointerup =
  () =>
    block(
      P1,
      false
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


    /* =======================
       ONE PLAYER
    ======================= */

    if (
      gameMode ===
      "1P"
    ) {

      if (
        (
          key === "w" ||
          key === "arrowup" ||
          key === " "
        ) &&
        !event.repeat
      ) {

        jump(
          P1
        );

      }


      if (
        key === "s" ||
        key === "arrowdown"
      ) {

        crouch(
          P1,
          true
        );

      }


      if (
        key === "i"
      ) {

        block(
          P1,
          true
        );

      }


      if (
        key === "j" &&
        !event.repeat
      ) {

        basicAttack(
          P1,
          P2
        );

      }


      if (
        key === "k" &&
        !event.repeat
      ) {

        specialAttack(
          P1,
          P2
        );

      }


      if (
        key === "l" &&
        !event.repeat
      ) {

        ultimateAttack(
          P1,
          P2
        );

      }


      return;

    }


    /* =======================
       TWO PLAYER — PLAYER 1
       WASD + R/F/G/H
    ======================= */

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
      key === "r"
    ) {

      block(
        P1,
        true
      );

    }


    if (
      key === "f" &&
      !event.repeat
    ) {

      basicAttack(
        P1,
        P2
      );

    }


    if (
      key === "g" &&
      !event.repeat
    ) {

      specialAttack(
        P1,
        P2
      );

    }


    if (
      key === "h" &&
      !event.repeat
    ) {

      ultimateAttack(
        P1,
        P2
      );

    }


    /* =======================
       TWO PLAYER — PLAYER 2
       ARROWS + I/J/K/L
    ======================= */

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
        key === "s" ||
        key === "arrowdown"
      ) {

        crouch(
          P1,
          false
        );

      }


      if (
        key === "i"
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
      key === "r"
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
   ABILITY ORB LOOP
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
   INITIALIZE
===================================================== */

renderPreviews();

updateMartinUI();

generateTitleMatchup();

setGameMode(
  "1P"
);
