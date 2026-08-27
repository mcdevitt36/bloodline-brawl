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
  "sean",
  "kelly",
  "leah"
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

  kelly: {
    hp: 100,
    basic: 5.5,
    range: 112,
    recovery: 500,
    specialDamage: 13,
    ultimateDamage: 27
  },

  leah: {
    hp: 100,
    basic: 5.5,
    range: 102,
    recovery: 465,
    specialStun: 3000,
    ultimateDamage: 27
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

let hitPause =
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

    kelly:
      "KELLY",

    leah:
      "LEAH",

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

function characterHTML(character) {

  switch (character) {

    case "brendan":
      return `
        <div class="character-model brendan-model">
          <div class="character-shadow"></div>

          <div class="human-body brendan-body">
            <div class="human-head">
              <div class="hair brendan-hair"></div>
              <div class="face">
                <div class="eye left"></div>
                <div class="eye right"></div>
                <div class="mouth"></div>
              </div>
            </div>

            <div class="human-torso brendan-shirt"></div>

            <div class="human-arm left-arm"></div>
            <div class="human-arm right-arm"></div>

            <div class="human-leg left-leg brendan-pants"></div>
            <div class="human-leg right-leg brendan-pants"></div>

            <div class="weapon golf-club">
              <div class="golf-shaft"></div>
              <div class="golf-head"></div>
            </div>
          </div>
        </div>
      `;


    case "grandaddy":
      return `
        <div class="character-model grandaddy-model">
          <div class="character-shadow"></div>

          <div class="human-body grandaddy-body">
            <div class="human-head">
              <div class="hair grandaddy-hair"></div>
              <div class="face">
                <div class="eye left"></div>
                <div class="eye right"></div>
                <div class="mouth"></div>
              </div>
            </div>

            <div class="human-torso grandaddy-shirt"></div>

            <div class="human-arm left-arm"></div>
            <div class="human-arm right-arm"></div>

            <div class="human-leg left-leg grandaddy-pants"></div>
            <div class="human-leg right-leg grandaddy-pants"></div>

            <div class="weapon hammer">
              <div class="hammer-handle"></div>
              <div class="hammer-head"></div>
            </div>
          </div>
        </div>
      `;


    case "connor":
      return `
        <div class="character-model connor-model">
          <div class="character-shadow"></div>

          <div class="human-body connor-body">
            <div class="human-head">
              <div class="hair connor-hair"></div>
              <div class="face">
                <div class="eye left"></div>
                <div class="eye right"></div>
                <div class="mouth"></div>
              </div>
            </div>

            <div class="human-torso connor-shirt"></div>

            <div class="human-arm left-arm"></div>
            <div class="human-arm right-arm"></div>

            <div class="human-leg left-leg connor-pants"></div>
            <div class="human-leg right-leg connor-pants"></div>

            <div class="weapon paintbrush">
              <div class="brush-handle"></div>
              <div class="brush-tip"></div>
            </div>
          </div>
        </div>
      `;


    case "erin":
      return `
        <div class="character-model erin-model">
          <div class="character-shadow"></div>

          <div class="human-body erin-body">
            <div class="human-head">
              <div class="hair erin-hair"></div>
              <div class="face">
                <div class="eye left"></div>
                <div class="eye right"></div>
                <div class="mouth"></div>
              </div>
            </div>

            <div class="human-torso erin-shirt"></div>

            <div class="human-arm left-arm"></div>
            <div class="human-arm right-arm"></div>

            <div class="human-leg left-leg erin-pants"></div>
            <div class="human-leg right-leg erin-pants"></div>

            <div class="weapon hairbrush">
              <div class="hairbrush-handle"></div>
              <div class="hairbrush-head"></div>
            </div>
          </div>
        </div>
      `;


    case "shannan":
      return `
        <div class="character-model shannan-model">
          <div class="character-shadow"></div>

          <div class="human-body shannan-body">
            <div class="human-head">
              <div class="hair shannan-hair"></div>

              <div class="face shannan-face">
                <div class="eye left"></div>
                <div class="eye right"></div>
                <div class="mouth"></div>
              </div>
            </div>

            <div class="human-torso shannan-shirt"></div>

            <div class="human-arm left-arm"></div>
            <div class="human-arm right-arm"></div>

            <div class="human-leg left-leg shannan-pants"></div>
            <div class="human-leg right-leg shannan-pants"></div>

            <div class="weapon syringe">
              <div class="syringe-plunger"></div>
              <div class="syringe-barrel"></div>
              <div class="syringe-liquid"></div>
              <div class="syringe-needle"></div>
            </div>
          </div>
        </div>
      `;


    case "liam":
      return `
        <div class="character-model liam-model">
          <div class="character-shadow"></div>

          <div class="human-body liam-body">
            <div class="human-head">
              <div class="hair liam-hair"></div>
              <div class="face">
                <div class="eye left"></div>
                <div class="eye right"></div>
                <div class="mouth"></div>
              </div>
            </div>

            <div class="human-torso liam-shirt"></div>

            <div class="human-arm left-arm"></div>
            <div class="human-arm right-arm"></div>

            <div class="human-leg left-leg liam-pants"></div>
            <div class="human-leg right-leg liam-pants"></div>

            <div class="rugby-ball"></div>
          </div>
        </div>
      `;


    case "grandmommy":
      return `
        <div class="character-model grandmommy-model">
          <div class="character-shadow"></div>

          <div class="human-body grandmommy-body">
            <div class="human-head">
              <div class="hair grandmommy-hair"></div>
              <div class="face">
                <div class="eye left"></div>
                <div class="eye right"></div>
                <div class="mouth"></div>
              </div>
            </div>

            <div class="human-torso grandmommy-shirt"></div>

            <div class="human-arm left-arm"></div>
            <div class="human-arm right-arm"></div>

            <div class="human-leg left-leg grandmommy-pants"></div>
            <div class="human-leg right-leg grandmommy-pants"></div>

            <div class="weapon spatula">
              <div class="spatula-handle"></div>
              <div class="spatula-head"></div>
            </div>
          </div>
        </div>
      `;


    case "sean":
      return `
        <div class="character-model sean-model">
          <div class="character-shadow"></div>

          <div class="human-body sean-body">
            <div class="human-head">
              <div class="hair sean-hair"></div>

              <div class="face">
                <div class="eye left"></div>
                <div class="eye right"></div>
                <div class="mouth"></div>
              </div>

              <div class="glasses sean-glasses">
                <div class="glasses-lens left"></div>
                <div class="glasses-bridge"></div>
                <div class="glasses-lens right"></div>
              </div>
            </div>

            <div class="human-torso sean-shirt"></div>

            <div class="human-arm left-arm"></div>
            <div class="human-arm right-arm"></div>

            <div class="human-leg left-leg sean-pants"></div>
            <div class="human-leg right-leg sean-pants"></div>

            <div class="weapon ice-cream-cone">
              <div class="icecream-scoop"></div>
              <div class="icecream-cone-body"></div>
            </div>
          </div>
        </div>
      `;


    case "kelly":
      return `
        <div class="character-model kelly-model">
          <div class="character-shadow"></div>

          <div class="human-body kelly-body">
            <div class="human-head">
              <div class="hair kelly-hair"></div>

              <div class="face">
                <div class="eye left"></div>
                <div class="eye right"></div>
                <div class="mouth"></div>
              </div>
            </div>

            <div class="human-torso kelly-shirt"></div>

            <div class="human-arm left-arm"></div>
            <div class="human-arm right-arm"></div>

            <div class="human-leg left-leg kelly-pants"></div>
            <div class="human-leg right-leg kelly-pants"></div>

            <div class="weapon shovel">
              <div class="shovel-handle"></div>
              <div class="shovel-grip"></div>
              <div class="shovel-blade"></div>
            </div>
          </div>
        </div>
      `;


    case "leah":
      return `
        <div class="character-model leah-model">
          <div class="character-shadow"></div>

          <div class="human-body leah-body">
            <div class="human-head">
              <div class="hair leah-hair"></div>

              <div class="face">
                <div class="eye left"></div>
                <div class="eye right"></div>
                <div class="mouth"></div>
              </div>
            </div>

            <div class="human-torso leah-hoodie">
              <div class="hoodie-pocket"></div>
            </div>

            <div class="human-arm left-arm"></div>
            <div class="human-arm right-arm"></div>

            <div class="human-leg left-leg leah-pants"></div>
            <div class="human-leg right-leg leah-pants"></div>

            <div class="weapon knitting-needles">
              <div class="knitting-needle needle-one"></div>
              <div class="knitting-needle needle-two"></div>
            </div>
          </div>
        </div>
      `;


    case "martin":
      return `
        <div class="character-model martin-model">
          <div class="character-shadow martin-shadow"></div>

          <div class="martin-dog">

            <div class="martin-tail"></div>

            <div class="martin-body">
              <div class="martin-fur-layer"></div>
            </div>

            <div class="martin-head">

              <div class="martin-ear left"></div>
              <div class="martin-ear right"></div>

              <div class="martin-face-light"></div>

              <div class="martin-eye left"></div>
              <div class="martin-eye right"></div>

              <div class="martin-muzzle"></div>
              <div class="martin-nose"></div>

            </div>

            <div class="martin-leg front-one"></div>
            <div class="martin-leg front-two"></div>
            <div class="martin-leg back-one"></div>
            <div class="martin-leg back-two"></div>

          </div>
        </div>
      `;

  }

}


/* =====================================================
   ABILITY ICONS
===================================================== */

function specialIconHTML(character) {

  switch (character) {

    case "brendan":
      return `<span class="icon-golf-ball">●</span>`;

    case "grandaddy":
      return `<span class="icon-ladder">🪜</span>`;

    case "connor":
      return `<span class="icon-paint">🎨</span>`;

    case "erin":
      return `<span class="icon-patch">★</span>`;

    case "shannan":
      return `
        <div class="mini-phone">
          <div class="mini-phone-screen">R</div>
        </div>
      `;

    case "liam":
      return `<span class="icon-rugby">🏉</span>`;

    case "grandmommy":
      return `<span class="icon-don">DON</span>`;

    case "sean":
      return `<span class="icon-plate">🍽️</span>`;

    case "kelly":
      return `<span class="icon-pill">💊</span>`;

    case "leah":
      return `<span class="icon-yarn">🧶</span>`;

    case "martin":
      return `<span class="icon-breath">☁️</span>`;

  }

}


function ultimateIconHTML(character) {

  switch (character) {

    case "brendan":
      return `<span class="icon-ipo">IPO</span>`;

    case "grandaddy":
      return `<span class="icon-yap">!</span>`;

    case "connor":
      return `<span class="icon-chicken">🍗</span>`;

    case "erin":
      return `<span class="icon-laundry">👕</span>`;

    case "shannan":
      return `<span class="icon-ufo">🛸</span>`;

    case "liam":
      return `<span class="icon-food">🍕</span>`;

    case "grandmommy":
      return `<span class="icon-chair">🪑</span>`;

    case "sean":
      return `<span class="icon-deer">🦌</span>`;

    case "kelly":
      return `<span class="icon-patient-zero">☣</span>`;

    case "leah":
      return `<span class="icon-yarn">🧶</span>`;

    case "martin":
      return `<span class="icon-clyde">🐕</span>`;

  }

}


/* =====================================================
   CHARACTER PREVIEWS
===================================================== */

function renderPreviews() {

  document
    .querySelectorAll(
      "[data-preview]"
    )
    .forEach(
      holder => {

        const character =
          holder.dataset.preview;

        holder.innerHTML =
          characterHTML(
            character
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
   SCREEN MANAGEMENT
===================================================== */

function showScreen(screen) {

  document
    .querySelectorAll(
      ".screen"
    )
    .forEach(
      item =>
        item.classList.remove(
          "active"
        )
    );


  screen.classList.add(
    "active"
  );

}


/* =====================================================
   GAME MODE
===================================================== */

function setGameMode(mode) {

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


  selectModeLabel.textContent =
    mode === "1P"
      ? "1 PLAYER"
      : "2 PLAYER";


  mapModeLabel.textContent =
    mode === "1P"
      ? "1 PLAYER"
      : "2 PLAYER";


  if (
    mode === "1P"
  ) {

    player1SpecialKey.textContent =
      "E";

    player1UltimateKey.textContent =
      "F";

    player2SpecialKey.textContent =
      "CPU";

    player2UltimateKey.textContent =
      "CPU";

  }

  else {

    player1SpecialKey.textContent =
      "E";

    player1UltimateKey.textContent =
      "F";

    player2SpecialKey.textContent =
      "K";

    player2UltimateKey.textContent =
      "L";

  }

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
   START / RESET SELECTION
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
        "chosen",
        "p1-chosen",
        "p2-chosen"
      );

    }
  );


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

    updateMartinUI();

    showScreen(
      selectScreen
    );

  };


backToTitleButton.onclick =
  () => {

    resetSelection();

    generateTitleMatchup();

    showScreen(
      titleScreen
    );

  };


/* =====================================================
   CHARACTER SELECTION
===================================================== */

fighterCards.forEach(
  card => {

    card.onclick =
      () => {

        const character =
          card.dataset.character;


        if (
          character ===
            "martin" &&
          !isMartinUnlocked()
        ) {

          return;

        }


        if (
          selectionStage ===
          1
        ) {

          player1Character =
            character;


          fighterCards.forEach(
            item =>
              item.classList.remove(
                "p1-chosen"
              )
          );


          card.classList.add(
            "p1-chosen"
          );


          if (
            gameMode ===
            "1P"
          ) {

            const cpuOptions =
              unlockedRoster().filter(
                item =>
                  item !==
                  player1Character
              );


            player2Character =
              cpuOptions[
                Math.floor(
                  Math.random() *
                  cpuOptions.length
                )
              ];


            selectionText.textContent =
              "PLAYER 1: " +
              displayName(
                player1Character
              ) +
              " • CPU: " +
              displayName(
                player2Character
              );


            selectionPrompt.textContent =
              "READY TO CHOOSE MAP";


            mapSelectButton.disabled =
              false;

          }

          else {

            selectionStage =
              2;


            selectionText.textContent =
              "PLAYER 1: " +
              displayName(
                player1Character
              ) +
              " • PLAYER 2: NOT SELECTED";


            selectionPrompt.textContent =
              "PLAYER 2 — CHOOSE YOUR FIGHTER";

          }


          return;

        }


        if (
          gameMode ===
            "2P" &&
          selectionStage ===
            2
        ) {

          player2Character =
            character;


          fighterCards.forEach(
            item =>
              item.classList.remove(
                "p2-chosen"
              )
          );


          card.classList.add(
            "p2-chosen"
          );


          selectionText.textContent =
            "PLAYER 1: " +
            displayName(
              player1Character
            ) +
            " • PLAYER 2: " +
            displayName(
              player2Character
            );


          selectionPrompt.textContent =
            "READY TO CHOOSE MAP";


          mapSelectButton.disabled =
            false;

        }

      };

  }
);


/* =====================================================
   MAP SELECT
===================================================== */

mapSelectButton.onclick =
  () => {

    showScreen(
      mapScreen
    );

  };


backToFighterButton.onclick =
  () => {

    showScreen(
      selectScreen
    );

  };


mapCards.forEach(
  card => {

    card.onclick =
      () => {

        mapCards.forEach(
          item =>
            item.classList.remove(
              "selected"
            )
        );


        card.classList.add(
          "selected"
        );


        selectedMap =
          card.dataset.map;


        mapSelectionText.textContent =
          "MAP: " +
          MAP_NAMES[
            selectedMap
          ];

      };

  }
);


/* =====================================================
   MARTIN CHALLENGE
===================================================== */

martinChallengeButton.onclick =
  () => {

    if (
      isMartinUnlocked()
    ) {

      resetSelection();

      showScreen(
        selectScreen
      );

      return;

    }


    challengeMode =
      true;

    challengeResult =
      null;


    renderChallengeChoices();


    showScreen(
      challengeScreen
    );

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
    character => {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "challenge-fighter-card";


      button.innerHTML = `
        <div class="challenge-small-model">
          ${characterHTML(character)}
        </div>
        <strong>
          ${displayName(character)}
        </strong>
      `;


      button.onclick =
        () => {

          player1Character =
            character;

          player2Character =
            "martin";

          selectedMap =
            "virginia";

          setGameMode(
            "1P"
          );

          startMatch();

        };


      challengeFighterGrid.appendChild(
        button
      );

    }
  );

}


/* =====================================================
   FIGHT BUTTON
===================================================== */

fightButton.onclick =
  () => {

    if (
      !player1Character ||
      !player2Character
    ) {

      return;

    }


    startMatch();

  };


/* =====================================================
   START MATCH
===================================================== */

function startMatch() {

  matchId++;

  roundId++;


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

  fightStarted =
    false;

  actionLock =
    false;

  hitPause =
    false;


  roundScore.textContent =
    "0 - 0";


  koOverlay.classList.add(
    "hidden"
  );


  newGameButton.classList.add(
    "hidden"
  );


  matchStatus.textContent =
    "";


  arena.className =
    "arena map-" +
    selectedMap;


  P1.character =
    player1Character;


  P2.character =
    player2Character;


  configurePlayer(
    P1,
    P1.character
  );


  configurePlayer(
    P2,
    P2.character
  );


  renderFightCharacters();


  player1Name.textContent =
    displayName(
      P1.character
    );


  player2Name.textContent =
    displayName(
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


  onePlayerControls.classList.toggle(
    "hidden",
    gameMode !==
      "1P"
  );


  twoPlayerControls.classList.toggle(
    "hidden",
    gameMode !==
      "2P"
  );


  showScreen(
    fightScreen
  );


  updateHUD();

  updatePositions();

  startRound();

}


/* =====================================================
   CONFIGURE PLAYER
===================================================== */

function configurePlayer(
  player,
  character
) {

  const stats =
    STATS[
      character
    ];


  player.maxHealth =
    stats.hp;


  if (
    challengeMode &&
    player === P2 &&
    character ===
      "martin"
  ) {

    player.maxHealth =
      115;

  }


  player.health =
    player.maxHealth;


  player.ultimate =
    0;


  player.y =
    0;

  player.vy =
    0;


  player.jumping =
    false;

  player.crouching =
    false;

  player.blocking =
    false;

  player.stunned =
    false;

  player.attackCooldown =
    false;

  player.specialCooldown =
    false;

  player.specialReadyAt =
    0;

}
/* =====================================================
   RENDER FIGHTERS / ROUND SETUP
===================================================== */

function renderFightCharacters() {

  player1ModelSlot.innerHTML =
    characterHTML(
      P1.character
    );


  player2ModelSlot.innerHTML =
    characterHTML(
      P2.character
    );


  player1Fighter.classList.toggle(
    "martin-fighter",
    P1.character ===
      "martin"
  );


  player2Fighter.classList.toggle(
    "martin-fighter",
    P2.character ===
      "martin"
  );

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

  hitPause =
    false;


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
   RESET PLAYER STATE
===================================================== */

function resetPlayerState(
  player
) {

  player.health =
    player.maxHealth;


  player.ultimate =
    0;


  player.y =
    0;

  player.vy =
    0;


  player.jumping =
    false;

  player.crouching =
    false;

  player.blocking =
    false;

  player.stunned =
    false;


  player.attackCooldown =
    false;

  player.specialCooldown =
    false;

  player.specialReadyAt =
    0;


  player.fighter.classList.remove(
    "walking",
    "crouching",
    "blocking",
    "stunned",
    "ko-loser",
    "face-left",
    "melee-windup",
    "melee-strike",
    "melee-recover",
    "liam-melee-windup",
    "liam-melee-strike",
    "liam-melee-recover",
    "martin-melee-windup",
    "martin-melee-strike",
    "martin-melee-recover",
    "hit-recoil",
    "block-recoil"
  );


  player.fighter.style.bottom =
    "25px";

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


  /*
    Humans are drawn facing right by default.

    Martin's artwork is drawn facing left by default,
    so his visual flip is intentionally reversed.
  */

  P1.fighter.classList.toggle(
    "face-left",
    P1.character ===
      "martin"
      ? P1.facing ===
        1
      : P1.facing ===
        -1
  );


  P2.fighter.classList.toggle(
    "face-left",
    P2.character ===
      "martin"
      ? P2.facing ===
        1
      : P2.facing ===
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
    An airborne fighter can cross over.
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
   DISTANCES
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
  player
) {

  return (
    matchActive &&
    fightStarted &&
    !roundOver &&
    !gameOver &&
    !actionLock &&
    !hitPause &&
    !player.stunned
  );

}


/* =====================================================
   MOVEMENT
===================================================== */

function movePlayer(
  player,
  amount
) {

  if (
    !canAct(player) ||
    player.blocking ||
    player.crouching
  ) {

    return;

  }


  player.x +=
    amount;


  updatePositions();

}


/* =====================================================
   JUMP
===================================================== */

function jump(
  player
) {

  if (
    !canAct(player) ||
    player.jumping ||
    player.crouching ||
    player.blocking
  ) {

    return;

  }


  player.jumping =
    true;


  player.vy =
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
    player => {

      if (
        player.jumping
      ) {

        player.vy -=
          0.72;


        player.y +=
          player.vy;


        if (
          player.y <=
          0
        ) {

          player.y =
            0;

          player.vy =
            0;

          player.jumping =
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
  player,
  on
) {

  if (
    on &&
    (
      !canAct(player) ||
      player.jumping ||
      player.blocking
    )
  ) {

    return;

  }


  player.crouching =
    on;


  player.fighter.classList.toggle(
    "crouching",
    on
  );

}


/* =====================================================
   BLOCK
===================================================== */

function block(
  player,
  on
) {

  if (
    on &&
    (
      !canAct(player) ||
      player.jumping
    )
  ) {

    return;

  }


  player.blocking =
    on;


  player.fighter.classList.toggle(
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
   JUMP / DODGE CHECKS
===================================================== */

function targetCanBeHitByGroundAttack(
  target
) {

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
   EFFECT HELPER
===================================================== */

function addComicText(
  text,
  colorClass =
    "yellow-text",
  duration =
    1600
) {

  const element =
    document.createElement(
      "div"
    );


  element.className =
    "effect comic-text " +
    colorClass;


  element.textContent =
    text;


  effects.appendChild(
    element
  );


  setTimeout(
    () =>
      element.remove(),
    duration
  );


  return element;

}


/* =====================================================
   HIT SPARK
===================================================== */

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
      type ===
        "ultimate"
        ? "hit-spark-ultimate"
        : type ===
            "special"
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
   MELEE IMPACT
===================================================== */

function showMeleeImpact(
  attacker,
  target,
  blocked =
    false
) {

  const burst =
    document.createElement(
      "div"
    );


  burst.className =
    "effect " +
    (
      blocked
        ? "block-impact-burst"
        : "melee-impact-burst"
    );


  burst.style.left =
    (
      target.x +
      (
        attacker.x <
        target.x
          ? 4
          : 48
      )
    ) +
    "px";


  burst.style.bottom =
    (
      98 +
      target.y
    ) +
    "px";


  effects.appendChild(
    burst
  );


  setTimeout(
    () =>
      burst.remove(),
    260
  );

}


/* =====================================================
   HIT RECOIL
===================================================== */

function recoilTarget(
  attacker,
  target,
  blocked =
    false
) {

  target.fighter.classList.remove(
    "hit-recoil",
    "block-recoil"
  );


  void target.fighter.offsetWidth;


  target.fighter.classList.add(
    blocked
      ? "block-recoil"
      : "hit-recoil"
  );


  const knockback =
    blocked
      ? 6
      : 15;


  target.x +=
    attacker.facing *
    knockback;


  updatePositions();


  setTimeout(
    () => {

      target.fighter.classList.remove(
        "hit-recoil",
        "block-recoil"
      );

    },
    blocked
      ? 180
      : 230
  );

}


/* =====================================================
   HIT PAUSE
===================================================== */

function tinyHitPause() {

  hitPause =
    true;


  setTimeout(
    () => {

      hitPause =
        false;

    },
    45
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
      type ===
        "special"
    ) {

      damage *=
        0.5;

    }

    else {

      damage *=
        0.25;

    }


    if (
      type ===
        "normal"
    ) {

      showMeleeImpact(
        attacker,
        target,
        true
      );


      recoilTarget(
        attacker,
        target,
        true
      );


      tinyHitPause();

    }

  }

  else {

    hitSpark(
      target,
      type
    );


    if (
      type ===
        "normal"
    ) {

      showMeleeImpact(
        attacker,
        target,
        false
      );


      recoilTarget(
        attacker,
        target,
        false
      );


      tinyHitPause();

    }

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
   BASIC MELEE ANIMATION
===================================================== */

function clearMeleeClasses(
  fighter
) {

  fighter.classList.remove(
    "melee-windup",
    "melee-strike",
    "melee-recover",

    "liam-melee-windup",
    "liam-melee-strike",
    "liam-melee-recover",

    "martin-melee-windup",
    "martin-melee-strike",
    "martin-melee-recover"
  );

}


function setMeleeStage(
  attacker,
  stage
) {

  const fighter =
    attacker.fighter;


  clearMeleeClasses(
    fighter
  );


  if (
    attacker.character ===
      "liam"
  ) {

    fighter.classList.add(
      "liam-melee-" +
      stage
    );

  }

  else if (
    attacker.character ===
      "martin"
  ) {

    fighter.classList.add(
      "martin-melee-" +
      stage
    );

  }

  else {

    fighter.classList.add(
      "melee-" +
      stage
    );

  }

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


  setMeleeStage(
    attacker,
    "windup"
  );


  setTimeout(
    () => {

      if (
        roundOver
      ) {

        return;

      }


      setMeleeStage(
        attacker,
        "strike"
      );

    },
    115
  );


  setTimeout(
    () => {

      const inRange =
        horizontalDistance() <=
        stats.range;


      const correctVertical =
        verticalDistance() <
          75 &&
        targetCanBeHitByGroundAttack(
          target
        );


      if (
        !roundOver &&
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
    225
  );


  setTimeout(
    () => {

      setMeleeStage(
        attacker,
        "recover"
      );

    },
    300
  );


  setTimeout(
    () => {

      attacker.attackCooldown =
        false;


      clearMeleeClasses(
        attacker.fighter
      );

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
  player
) {

  player.specialCooldown =
    true;


  player.specialReadyAt =
    Date.now() +
    5000;


  setTimeout(
    () => {

      player.specialCooldown =
        false;


      player.specialReadyAt =
        0;

    },
    5000
  );

}
/* =====================================================
   SPECIAL ATTACK ROUTER
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
      brendanSpecial(
        attacker,
        target
      );
      break;

    case "grandaddy":
      grandaddySpecial(
        attacker,
        target
      );
      break;

    case "connor":
      connorSpecial(
        attacker,
        target
      );
      break;

    case "erin":
      erinSpecial(
        attacker,
        target
      );
      break;

    case "shannan":
      shannanSpecial(
        attacker,
        target
      );
      break;

    case "liam":
      liamSpecial(
        attacker,
        target
      );
      break;

    case "grandmommy":
      grandmommySpecial(
        attacker,
        target
      );
      break;

    case "sean":
      seanSpecial(
        attacker,
        target
      );
      break;

    case "kelly":
      kellySpecial(
        attacker,
        target
      );
      break;

    case "leah":
      leahSpecial(
        attacker,
        target
      );
      break;

    case "martin":
      martinSpecial(
        attacker,
        target
      );
      break;

  }

}


/* =====================================================
   PROJECTILE HELPER
===================================================== */

function createProjectile(
  attacker,
  target,
  className,
  duration,
  onHit,
  options = {}
) {

  const projectile =
    document.createElement(
      "div"
    );


  projectile.className =
    "effect " +
    className;


  const startX =
    attacker.x +
    (
      attacker.facing === 1
        ? 70
        : 0
    );


  projectile.style.left =
    startX +
    "px";


  projectile.style.bottom =
    (
      options.bottom ||
      105
    ) +
    attacker.y +
    "px";


  if (
    attacker.facing === -1
  ) {

    projectile.classList.add(
      "projectile-left"
    );

  }


  effects.appendChild(
    projectile
  );


  const targetX =
    target.x +
    25;


  const travel =
    targetX -
    startX;


  projectile.style.setProperty(
    "--projectile-travel",
    travel + "px"
  );


  requestAnimationFrame(
    () => {

      projectile.classList.add(
        "projectile-moving"
      );

    }
  );


  setTimeout(
    () => {

      if (
        roundOver
      ) {

        projectile.remove();
        return;

      }


      const heightType =
        options.height ||
        "mid";


      if (
        projectileCanHit(
          target,
          heightType
        )
      ) {

        onHit();

      }


      projectile.remove();

    },
    duration
  );


  return projectile;

}


/* =====================================================
   BRENDAN SPECIAL — BIG DRIVE
===================================================== */

function brendanSpecial(
  attacker,
  target
) {

  addComicText(
    "BIG DRIVE!",
    "yellow-text",
    1500
  );


  attacker.fighter.classList.add(
    "special-performing"
  );


  const ball =
    document.createElement(
      "div"
    );


  ball.className =
    "effect golf-ball-projectile";


  ball.style.left =
    (
      attacker.x +
      45
    ) +
    "px";


  ball.style.bottom =
    "115px";


  effects.appendChild(
    ball
  );


  const travel =
    target.x -
    attacker.x;


  ball.style.setProperty(
    "--ball-travel",
    travel + "px"
  );


  setTimeout(
    () => {

      ball.classList.add(
        "golf-ball-flying"
      );

    },
    250
  );


  setTimeout(
    () => {

      if (
        !roundOver &&
        projectileCanHit(
          target,
          "low"
        )
      ) {

        dealDamage(
          attacker,
          target,
          STATS.brendan
            .specialDamage,
          {
            type:
              "special"
          }
        );

      }


      ball.remove();


      attacker.fighter.classList.remove(
        "special-performing"
      );

    },
    1150
  );

}


/* =====================================================
   GRANDADDY SPECIAL — LADDER
===================================================== */

function grandaddySpecial(
  attacker,
  target
) {

  addComicText(
    "LADDER TIME!",
    "orange-text",
    1600
  );


  const ladder =
    document.createElement(
      "div"
    );


  ladder.className =
    "effect ladder-attack";


  ladder.style.left =
    (
      target.x -
      20
    ) +
    "px";


  ladder.style.bottom =
    "45px";


  ladder.innerHTML = `
    <div class="ladder-side left"></div>
    <div class="ladder-side right"></div>
    <div class="ladder-rung r1"></div>
    <div class="ladder-rung r2"></div>
    <div class="ladder-rung r3"></div>
    <div class="ladder-rung r4"></div>
  `;


  effects.appendChild(
    ladder
  );


  setTimeout(
    () => {

      ladder.classList.add(
        "ladder-slam"
      );

    },
    300
  );


  setTimeout(
    () => {

      if (
        !roundOver &&
        targetCanBeHitByGroundAttack(
          target
        )
      ) {

        dealDamage(
          attacker,
          target,
          STATS.grandaddy
            .specialDamage,
          {
            type:
              "special"
          }
        );

      }

    },
    850
  );


  setTimeout(
    () => {

      ladder.remove();

    },
    1500
  );

}


/* =====================================================
   CONNOR SPECIAL — PAINT BEAST
===================================================== */

function connorSpecial(
  attacker,
  target
) {

  addComicText(
    "PAINT BEAST!",
    "blue-text",
    1800
  );


  const splash =
    document.createElement(
      "div"
    );


  splash.className =
    "effect paint-summon-splash";


  splash.style.left =
    (
      attacker.x +
      attacker.facing *
      65
    ) +
    "px";


  splash.style.bottom =
    "55px";


  effects.appendChild(
    splash
  );


  setTimeout(
    () => {

      const beast =
        document.createElement(
          "div"
        );


      beast.className =
        "effect paint-beast";


      if (
        attacker.facing === -1
      ) {

        beast.classList.add(
          "effect-facing-left"
        );

      }


      beast.style.left =
        (
          attacker.x +
          attacker.facing *
          65
        ) +
        "px";


      beast.style.bottom =
        "45px";


      beast.innerHTML = `
        <div class="paint-beast-tail"></div>
        <div class="paint-beast-body"></div>
        <div class="paint-beast-leg back"></div>
        <div class="paint-beast-leg front"></div>
        <div class="paint-beast-neck"></div>

        <div class="paint-beast-head">
          <div class="paint-beast-eye"></div>
          <div class="paint-beast-mouth"></div>
          <div class="paint-beast-teeth"></div>
        </div>

        <div class="paint-beast-spike s1"></div>
        <div class="paint-beast-spike s2"></div>
        <div class="paint-beast-spike s3"></div>
      `;


      effects.appendChild(
        beast
      );


      const travel =
        target.x -
        attacker.x;


      beast.style.setProperty(
        "--beast-travel",
        travel + "px"
      );


      requestAnimationFrame(
        () => {

          beast.classList.add(
            "paint-beast-charge"
          );

        }
      );


      setTimeout(
        () => {

          if (
            !roundOver &&
            targetCanBeHitByGroundAttack(
              target
            )
          ) {

            dealDamage(
              attacker,
              target,
              STATS.connor
                .specialDamage,
              {
                type:
                  "special"
              }
            );

          }


          beast.remove();

        },
        1150
      );

    },
    400
  );


  setTimeout(
    () => {

      splash.remove();

    },
    900
  );

}


/* =====================================================
   ERIN SPECIAL — PIMPLE PATCH
===================================================== */

function erinSpecial(
  attacker,
  target
) {

  addComicText(
    "PIMPLE PATCH!",
    "pink-text",
    2100
  );


  const patch =
    document.createElement(
      "div"
    );


  patch.className =
    "effect pimple-patch-attack";


  patch.innerHTML = `
    <div class="patch-star large"></div>
    <div class="patch-star small-one"></div>
    <div class="patch-star small-two"></div>
  `;


  patch.style.left =
    (
      target.x +
      18
    ) +
    "px";


  patch.style.bottom =
    (
      115 +
      target.y
    ) +
    "px";


  effects.appendChild(
    patch
  );


  setTimeout(
    () => {

      if (
        !roundOver &&
        projectileCanHit(
          target,
          "high"
        )
      ) {

        stunTarget(
          target,
          STATS.erin
            .specialStun
        );


        target.ultimate =
          Math.min(
            100,
            target.ultimate +
            5
          );


        attacker.ultimate =
          Math.min(
            100,
            attacker.ultimate +
            12
          );


        updateHUD();

      }

    },
    650
  );


  setTimeout(
    () => {

      patch.remove();

    },
    2500
  );

}


/* =====================================================
   SHANNAN SPECIAL — BRAINROT
===================================================== */

function shannanSpecial(
  attacker,
  target
) {

  addComicText(
    "BRAINROT",
    "brainrot-text",
    2700
  );


  const phone =
    document.createElement(
      "div"
    );


  phone.className =
    "effect brainrot-phone";


  phone.innerHTML = `
    <div class="brainrot-speaker"></div>

    <div class="brainrot-screen">
      <div class="brainrot-reels">
        REELS
      </div>

      <div class="brainrot-reels second">
        REELS
      </div>

      <div class="brainrot-scroll-card card-one">
        ▶
      </div>

      <div class="brainrot-scroll-card card-two">
        ♥
      </div>

      <div class="brainrot-scroll-card card-three">
        😂
      </div>
    </div>

    <div class="brainrot-home"></div>
  `;


  phone.style.left =
    (
      target.x -
      30
    ) +
    "px";


  phone.style.bottom =
    "80px";


  effects.appendChild(
    phone
  );


  setTimeout(
    () => {

      phone.classList.add(
        "brainrot-phone-active"
      );

    },
    150
  );


  setTimeout(
    () => {

      if (
        !roundOver
      ) {

        stunTarget(
          target,
          STATS.shannan
            .specialStun
        );


        attacker.ultimate =
          Math.min(
            100,
            attacker.ultimate +
            12
          );


        updateHUD();

      }

    },
    800
  );


  setTimeout(
    () => {

      phone.remove();

    },
    3200
  );

}


/* =====================================================
   LIAM SPECIAL — RUGBY PASS
===================================================== */

function liamSpecial(
  attacker,
  target
) {

  addComicText(
    "RUGBY PASS!",
    "blue-text",
    1500
  );


  attacker.fighter.classList.add(
    "rugby-throwing"
  );


  const ball =
    document.createElement(
      "div"
    );


  ball.className =
    "effect rugby-projectile";


  ball.style.left =
    (
      attacker.x +
      40
    ) +
    "px";


  ball.style.bottom =
    (
      115 +
      attacker.y
    ) +
    "px";


  if (
    attacker.facing === -1
  ) {

    ball.classList.add(
      "effect-facing-left"
    );

  }


  effects.appendChild(
    ball
  );


  const travel =
    target.x -
    attacker.x;


  ball.style.setProperty(
    "--rugby-travel",
    travel + "px"
  );


  setTimeout(
    () => {

      ball.classList.add(
        "rugby-ball-flying"
      );

    },
    300
  );


  setTimeout(
    () => {

      if (
        !roundOver &&
        projectileCanHit(
          target,
          "mid"
        )
      ) {

        dealDamage(
          attacker,
          target,
          STATS.liam
            .specialDamage,
          {
            type:
              "special"
          }
        );

      }


      ball.remove();


      attacker.fighter.classList.remove(
        "rugby-throwing"
      );

    },
    1200
  );

}


/* =====================================================
   GRANDMOMMY SPECIAL — DON GET OVER HERE
===================================================== */

function grandmommySpecial(
  attacker,
  target
) {

  addComicText(
    "DON GET OVER HERE!",
    "red-text",
    2100
  );


  const don =
    document.createElement(
      "div"
    );


  don.className =
    "effect don-assist";


  if (
    attacker.facing === -1
  ) {

    don.classList.add(
      "effect-facing-left"
    );

  }


  don.style.left =
    (
      attacker.x +
      attacker.facing *
      70
    ) +
    "px";


  don.style.bottom =
    "42px";


  don.innerHTML = `
    <div class="don-shadow"></div>

    <div class="don-body">
      <div class="don-head">
        <div class="don-hair"></div>
        <div class="don-eye left"></div>
        <div class="don-eye right"></div>
      </div>

      <div class="don-shirt"></div>
      <div class="don-arm"></div>
      <div class="don-leg left"></div>
      <div class="don-leg right"></div>
    </div>
  `;


  effects.appendChild(
    don
  );


  setTimeout(
    () => {

      don.classList.add(
        "don-charge"
      );

    },
    350
  );


  setTimeout(
    () => {

      if (
        !roundOver &&
        targetCanBeHitByGroundAttack(
          target
        )
      ) {

        dealDamage(
          attacker,
          target,
          STATS.grandmommy
            .specialDamage,
          {
            type:
              "special"
          }
        );

      }

    },
    1100
  );


  setTimeout(
    () => {

      don.remove();

    },
    1800
  );

}


/* =====================================================
   SEAN SPECIAL — DADDY'S HUNGRY
===================================================== */

function seanSpecial(
  attacker,
  target
) {

  addComicText(
    "DADDY'S HUNGRY!",
    "red-text",
    2300
  );


  attacker.fighter.classList.add(
    "plate-throwing"
  );


  const plateCount =
    3;


  for (
    let i = 0;
    i < plateCount;
    i++
  ) {

    setTimeout(
      () => {

        if (
          roundOver
        ) {
          return;
        }


        const plate =
          document.createElement(
            "div"
          );


        plate.className =
          "effect flying-plate";


        plate.style.left =
          (
            attacker.x +
            (
              attacker.facing === 1
                ? 55
                : 5
            )
          ) +
          "px";


        plate.style.bottom =
          (
            100 +
            i * 10
          ) +
          "px";


        effects.appendChild(
          plate
        );


        const travel =
          target.x -
          attacker.x;


        plate.style.setProperty(
          "--plate-travel",
          travel + "px"
        );


        if (
          attacker.facing === -1
        ) {

          plate.classList.add(
            "effect-facing-left"
          );

        }


        requestAnimationFrame(
          () => {

            plate.classList.add(
              "plate-flying"
            );

          }
        );


        setTimeout(
          () => {

            plate.remove();

          },
          1150
        );

      },
      i * 260
    );

  }


  /*
    Damage is applied once for the whole
    plate barrage so Sean remains at the
    current balanced 12 special damage.
  */

  setTimeout(
    () => {

      if (
        !roundOver &&
        projectileCanHit(
          target,
          "mid"
        )
      ) {

        dealDamage(
          attacker,
          target,
          STATS.sean
            .specialDamage,
          {
            type:
              "special"
          }
        );

      }

    },
    1150
  );


  setTimeout(
    () => {

      attacker.fighter.classList.remove(
        "plate-throwing"
      );

    },
    1800
  );

}


/* =====================================================
   KELLY SPECIAL — TAKE YOUR MEDS
===================================================== */

function kellySpecial(
  attacker,
  target
) {

  addComicText(
    "TAKE YOUR MEDS!",
    "red-text",
    2200
  );


  attacker.fighter.classList.add(
    "kelly-pill-throw"
  );


  const pillCount =
    3;


  for (
    let i = 0;
    i < pillCount;
    i++
  ) {

    setTimeout(
      () => {

        if (
          roundOver
        ) {
          return;
        }


        const pill =
          document.createElement(
            "div"
          );


        pill.className =
          "effect kelly-pill";


        pill.innerHTML = `
          <div class="pill-half pill-half-one"></div>
          <div class="pill-half pill-half-two"></div>
        `;


        pill.style.left =
          (
            attacker.x +
            (
              attacker.facing === 1
                ? 62
                : 0
            )
          ) +
          "px";


        pill.style.bottom =
          (
            92 +
            i * 8
          ) +
          "px";


        if (
          attacker.facing === -1
        ) {

          pill.classList.add(
            "effect-facing-left"
          );

        }


        effects.appendChild(
          pill
        );


        const travel =
          target.x -
          attacker.x;


        pill.style.setProperty(
          "--pill-travel",
          travel + "px"
        );


        requestAnimationFrame(
          () => {

            pill.classList.add(
              "kelly-pill-flying"
            );

          }
        );


        setTimeout(
          () => {

            pill.remove();

          },
          1350
        );

      },
      i * 240
    );

  }


  /*
    One 13-damage hit for the complete
    special, not 13 per individual pill.
  */

  setTimeout(
    () => {

      if (
        !roundOver &&
        projectileCanHit(
          target,
          "low"
        )
      ) {

        dealDamage(
          attacker,
          target,
          STATS.kelly
            .specialDamage,
          {
            type:
              "special"
          }
        );

      }

    },
    1350
  );


  setTimeout(
    () => {

      attacker.fighter.classList.remove(
        "kelly-pill-throw"
      );

    },
    1850
  );

}


/* =====================================================
   LEAH SPECIAL — TANGLED
===================================================== */

function leahSpecial(
  attacker,
  target
) {

  addComicText(
    "TANGLED!",
    "purple-text",
    2200
  );


  attacker.fighter.classList.add(
    "leah-yarn-throw"
  );


  const yarn =
    document.createElement(
      "div"
    );


  yarn.className =
    "effect yarn-projectile";


  yarn.innerHTML = `
    <div class="yarn-line y1"></div>
    <div class="yarn-line y2"></div>
    <div class="yarn-line y3"></div>
  `;


  yarn.style.left =
    (
      attacker.x +
      (
        attacker.facing === 1
          ? 60
          : 0
      )
    ) +
    "px";


  yarn.style.bottom =
    "100px";


  effects.appendChild(
    yarn
  );


  const travel =
    target.x -
    attacker.x;


  yarn.style.setProperty(
    "--yarn-travel",
    travel + "px"
  );


  requestAnimationFrame(
    () => {

      yarn.classList.add(
        "yarn-projectile-flying"
      );

    }
  );


  setTimeout(
    () => {

      if (
        roundOver
      ) {

        yarn.remove();
        return;

      }


      if (
        projectileCanHit(
          target,
          "low"
        )
      ) {

        yarn.remove();


        const wrap =
          document.createElement(
            "div"
          );


        wrap.className =
          "effect tangled-wrap";


        wrap.style.left =
          (
            target.x -
            6
          ) +
          "px";


        wrap.style.bottom =
          (
            58 +
            target.y
          ) +
          "px";


        wrap.innerHTML = `
          <div class="wrap-line w1"></div>
          <div class="wrap-line w2"></div>
          <div class="wrap-line w3"></div>
          <div class="wrap-line w4"></div>
          <div class="wrap-knot"></div>
        `;


        effects.appendChild(
          wrap
        );


        wrap.classList.add(
          "tangled-wrap-active"
        );


        /*
          Short wrapping beat first,
          then the 3-second stun.
        */

        setTimeout(
          () => {

            if (
              !roundOver
            ) {

              stunTarget(
                target,
                STATS.leah
                  .specialStun
              );


              attacker.ultimate =
                Math.min(
                  100,
                  attacker.ultimate +
                  12
                );


              updateHUD();

            }

          },
          300
        );


        setTimeout(
          () => {

            wrap.remove();

          },
          STATS.leah
            .specialStun +
            650
        );

      }

      else {

        yarn.remove();

      }

    },
    1250
  );


  setTimeout(
    () => {

      attacker.fighter.classList.remove(
        "leah-yarn-throw"
      );

    },
    1700
  );

}


/* =====================================================
   MARTIN SPECIAL — DOG BREATH
===================================================== */

function martinSpecial(
  attacker,
  target
) {

  addComicText(
    "DOG BREATH!",
    "green-text",
    2300
  );


  attacker.fighter.classList.add(
    "martin-breathing"
  );


  const cloud =
    document.createElement(
      "div"
    );


  cloud.className =
    "effect dog-breath-cloud";


  if (
    attacker.facing === -1
  ) {

    cloud.classList.add(
      "effect-facing-left"
    );

  }


  cloud.style.left =
    (
      attacker.x +
      attacker.facing *
      50
    ) +
    "px";


  cloud.style.bottom =
    (
      70 +
      attacker.y
    ) +
    "px";


  cloud.innerHTML = `
    <div class="breath-puff p1"></div>
    <div class="breath-puff p2"></div>
    <div class="breath-puff p3"></div>
    <div class="breath-puff p4"></div>
    <div class="breath-puff p5"></div>
  `;


  effects.appendChild(
    cloud
  );


  const travel =
    (
      target.x -
      attacker.x
    ) *
    0.78;


  cloud.style.setProperty(
    "--breath-travel",
    travel + "px"
  );


  setTimeout(
    () => {

      cloud.classList.add(
        "dog-breath-active"
      );

    },
    250
  );


  setTimeout(
    () => {

      if (
        !roundOver &&
        projectileCanHit(
          target,
          "mid"
        )
      ) {

        stunTarget(
          target,
          STATS.martin
            .specialStun
        );


        attacker.ultimate =
          Math.min(
            100,
            attacker.ultimate +
            12
          );


        updateHUD();

      }

    },
    950
  );


  setTimeout(
    () => {

      cloud.remove();


      attacker.fighter.classList.remove(
        "martin-breathing"
      );

    },
    2700
  );

}


/* =====================================================
   SPECIAL ORB STATE
===================================================== */

function updateAbilityOrbs() {

  const now =
    Date.now();


  [
    [
      P1,
      player1SpecialOrb,
      player1UltimateOrb
    ],

    [
      P2,
      player2SpecialOrb,
      player2UltimateOrb
    ]

  ].forEach(
    data => {

      const player =
        data[0];

      const specialOrb =
        data[1];

      const ultimateOrb =
        data[2];


      specialOrb.classList.toggle(
        "cooldown",
        player.specialCooldown
      );


      ultimateOrb.classList.toggle(
        "ready",
        player.ultimate >=
          100
      );


      if (
        player.specialCooldown
      ) {

        const remaining =
          Math.max(
            0,
            player.specialReadyAt -
            now
          );


        const ratio =
          remaining /
          5000;


        specialOrb.style.setProperty(
          "--cooldown-ratio",
          ratio
        );

      }

      else {

        specialOrb.style.setProperty(
          "--cooldown-ratio",
          0
        );

      }

    }
  );


  requestAnimationFrame(
    updateAbilityOrbs
  );

}


updateAbilityOrbs();
/* =====================================================
   ULTIMATE ATTACK ROUTER
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
      brendanUltimate(
        attacker,
        target
      );
      break;

    case "grandaddy":
      grandaddyUltimate(
        attacker,
        target
      );
      break;

    case "connor":
      connorUltimate(
        attacker
      );
      break;

    case "erin":
      erinUltimate(
        attacker,
        target
      );
      break;

    case "shannan":
      shannanUltimate(
        attacker,
        target
      );
      break;

    case "liam":
      liamUltimate(
        attacker,
        target
      );
      break;

    case "grandmommy":
      grandmommyUltimate(
        attacker,
        target
      );
      break;

    case "sean":
      seanUltimate(
        attacker,
        target
      );
      break;

    case "kelly":
      kellyUltimate(
        attacker,
        target
      );
      break;

    case "leah":
      leahUltimate(
        attacker,
        target
      );
      break;

    case "martin":
      martinUltimate(
        attacker,
        target
      );
      break;

  }

}


/* =====================================================
   BRENDAN ULTIMATE — IPO
===================================================== */

function brendanUltimate(
  attacker,
  target
) {

  actionLock =
    true;


  addComicText(
    "IPO!",
    "yellow-text",
    2400
  );


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
            (
              38 +
              index *
              8
            ) +
            "%";


          card.style.top =
            (
              80 +
              index *
              35
            ) +
            "px";


          effects.appendChild(
            card
          );


          if (
            !roundOver
          ) {

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

          }


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
   GRANDADDY ULTIMATE — YAP ALERT
===================================================== */

function grandaddyUltimate(
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


        const sirenOne =
          document.createElement(
            "div"
          );


        const sirenTwo =
          document.createElement(
            "div"
          );


        sirenOne.className =
          "effect yap-siren";


        sirenTwo.className =
          "effect yap-siren";


        sirenOne.style.left =
          "10%";


        sirenTwo.style.right =
          "10%";


        sirenOne.style.top =
          "95px";


        sirenTwo.style.top =
          "95px";


        effects.appendChild(
          sirenOne
        );


        effects.appendChild(
          sirenTwo
        );


        setTimeout(
          () => {

            alert.remove();

            sirenOne.remove();

            sirenTwo.remove();

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

      if (
        !roundOver
      ) {

        stunTarget(
          target,
          STATS.grandaddy
            .ultimateStun
        );

      }


      actionLock =
        false;

    },
    1900
  );

}


/* =====================================================
   CONNOR ULTIMATE — FRIED CHICKEN
===================================================== */

function connorUltimate(
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
    (
      attacker.x +
      20
    ) +
    "px";


  bucket.style.bottom =
    (
      95 +
      attacker.y
    ) +
    "px";


  effects.appendChild(
    bucket
  );


  setTimeout(
    () => {

      if (
        !roundOver
      ) {

        attacker.health =
          Math.min(
            attacker.maxHealth,
            attacker.health +
            STATS.connor.heal
          );


        updateHUD();

      }


      bucket.remove();


      actionLock =
        false;

    },
    2600
  );

}


/* =====================================================
   ERIN ULTIMATE — LAUNDRY AVALANCHE
===================================================== */

function erinUltimate(
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
            (
              target.x +
              (
                index %
                2 ===
                  0
                  ? -10
                  : 30
              )
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

              if (
                !roundOver
              ) {

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

              }

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
   SHANNAN ULTIMATE — CONSPIRACY
===================================================== */

function shannanUltimate(
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
        (
          destination +
          35
        ) +
        "px";


      beam.style.top =
        "90px";


      effects.appendChild(
        beam
      );


      setTimeout(
        () => {

          if (
            !roundOver
          ) {

            dealDamage(
              attacker,
              target,
              STATS.shannan
                .ultimateDamage,
              {
                type:
                  "ultimate",
                ignoreBlock:
                  true
              }
            );

          }

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
   LIAM ULTIMATE — SPLASH ZONE
===================================================== */

function liamUltimate(
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


          projectile.style.left =
            (
              attacker.x +
              (
                attacker.facing ===
                  1
                  ? 55
                  : 0
              )
            ) +
            "px";


          projectile.style.bottom =
            (
              80 +
              (
                index %
                3
              ) *
              28
            ) +
            "px";


          effects.appendChild(
            projectile
          );


          const travel =
            target.x -
            attacker.x;


          projectile.animate(
            [
              {
                transform:
                  "translateX(0) rotate(0deg)"
              },
              {
                transform:
                  `translateX(${travel}px) rotate(540deg)`
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
                !roundOver
              ) {

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
                  (
                    100 +
                    target.y
                  ) +
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

              }


              projectile.remove();

            },
            750
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
   GRANDMOMMY ULTIMATE — CHAIR YOGA
===================================================== */

function grandmommyUltimate(
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


  if (
    visual
  ) {

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

  }


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


              if (
                !roundOver
              ) {

                dealDamage(
                  attacker,
                  target,
                  STATS.grandmommy
                    .ultimateDamage,
                  {
                    type:
                      "ultimate",
                    ignoreBlock:
                      true
                  }
                );

              }

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
   SEAN — ZOMBIE DEER
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


function seanUltimate(
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
                    !roundOver &&
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
   KELLY ULTIMATE — PATIENT ZERO
   Fictional/cartoon contamination effect
===================================================== */

function kellyUltimate(
  attacker,
  target
) {

  actionLock =
    true;


  addComicText(
    "PATIENT ZERO",
    "green-text",
    2200
  );


  const pulse =
    document.createElement(
      "div"
    );


  pulse.className =
    "effect patient-zero-pulse";


  pulse.style.left =
    (
      attacker.x +
      18
    ) +
    "px";


  pulse.style.bottom =
    (
      90 +
      attacker.y
    ) +
    "px";


  effects.appendChild(
    pulse
  );


  setTimeout(
    () =>
      pulse.remove(),
    900
  );


  setTimeout(
    () => {

      const cloud =
        document.createElement(
          "div"
        );


      cloud.className =
        "effect patient-zero-cloud";


      let x =
        attacker.x +
        (
          attacker.facing ===
            1
            ? 45
            : -195
        );


      const destination =
        target.x -
        65;


      cloud.style.left =
        x +
        "px";


      cloud.style.bottom =
        "48px";


      effects.appendChild(
        cloud
      );


      cloud.animate(
        [
          {
            transform:
              "scale(.35)",
            opacity:
              0
          },
          {
            transform:
              "scale(1.05)",
            opacity:
              .95
          }
        ],
        {
          duration:
            550,
          fill:
            "forwards"
        }
      );


      const travel =
        setInterval(
          () => {

            const delta =
              destination -
              x;


            x +=
              Math.sign(
                delta ||
                1
              ) *
              Math.min(
                12,
                Math.abs(
                  delta
                )
              );


            cloud.style.left =
              x +
              "px";


            if (
              Math.abs(
                destination -
                x
              ) <
              5
            ) {

              clearInterval(
                travel
              );


              if (
                !roundOver
              ) {

                dealDamage(
                  attacker,
                  target,
                  STATS.kelly
                    .ultimateDamage,
                  {
                    type:
                      "ultimate",
                    ignoreBlock:
                      true
                  }
                );

              }


              cloud.animate(
                [
                  {
                    transform:
                      "scale(1.05)",
                    opacity:
                      .95
                  },
                  {
                    transform:
                      "scale(1.35)",
                    opacity:
                      0
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
                () =>
                  cloud.remove(),
                720
              );

            }

          },
          28
        );

    },
    650
  );


  setTimeout(
    () => {

      actionLock =
        false;

    },
    2850
  );

}


/* =====================================================
   LEAH ULTIMATE — YARNAGEDDON
===================================================== */

function leahUltimate(
  attacker,
  target
) {

  actionLock =
    true;


  addComicText(
    "YARNAGEDDON!",
    "purple-text",
    2200
  );


  const knit =
    document.createElement(
      "div"
    );


  knit.className =
    "effect knitting-burst";


  knit.textContent =
    "KNIT KNIT KNIT!";


  knit.style.left =
    (
      attacker.x -
      5
    ) +
    "px";


  knit.style.bottom =
    (
      205 +
      attacker.y
    ) +
    "px";


  effects.appendChild(
    knit
  );


  knit.animate(
    [
      {
        transform:
          "rotate(-6deg) scale(.85)"
      },
      {
        transform:
          "rotate(6deg) scale(1.08)"
      },
      {
        transform:
          "rotate(-6deg) scale(.98)"
      }
    ],
    {
      duration:
        650,
      iterations:
        2
    }
  );


  setTimeout(
    () =>
      knit.remove(),
    1250
  );


  const damages =
    [
      9,
      9,
      9
    ];


  damages.forEach(
    (
      damage,
      index
    ) => {

      setTimeout(
        () => {

          const ball =
            document.createElement(
              "div"
            );


          ball.className =
            "effect giant-yarn-ball";


          const fromLeft =
            index %
              2 ===
            0;


          const startX =
            fromLeft
              ? -105
              : arena.clientWidth +
                15;


          const endX =
            target.x -
            5;


          ball.style.left =
            startX +
            "px";


          ball.style.bottom =
            (
              32 +
              index *
              35
            ) +
            "px";


          effects.appendChild(
            ball
          );


          ball.animate(
            [
              {
                transform:
                  "translateY(0) rotate(0deg)"
              },
              {
                transform:
                  "translateY(-48px) rotate(170deg)",
                offset:
                  .5
              },
              {
                transform:
                  "translateY(0) rotate(360deg)"
              }
            ],
            {
              duration:
                650,
              iterations:
                2
            }
          );


          const travel =
            ball.animate(
              [
                {
                  left:
                    startX +
                    "px"
                },
                {
                  left:
                    endX +
                    "px"
                }
              ],
              {
                duration:
                  900,
                fill:
                  "forwards",
                easing:
                  "ease-in"
              }
            );


          travel.onfinish =
            () => {

              if (
                !roundOver
              ) {

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

              }


              setTimeout(
                () =>
                  ball.remove(),
                180
              );

            };

        },
        1100 +
        index *
        650
      );

    }
  );


  setTimeout(
    () => {

      actionLock =
        false;

    },
    3900
  );

}


/* =====================================================
   MARTIN — CLYDE
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


function martinUltimate(
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
    (
      attacker.x +
      (
        attacker.facing ===
          1
          ? 60
          : -70
      )
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
                !roundOver &&
                target.y <
                  70
              ) {

                dealDamage(
                  attacker,
                  target,
                  STATS.martin
                    .ultimateDamage,
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
       WASD + Q/R/E/F

       Q = BLOCK
       R = BASIC
       E = SPECIAL
       F = ULTIMATE
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
       TWO PLAYER — P1

       A / D = MOVE
       W = JUMP
       S = CROUCH
       Q = BLOCK
       R = BASIC
       E = SPECIAL
       F = ULTIMATE
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


    /* =================================================
       TWO PLAYER — P2

       LEFT / RIGHT = MOVE
       UP = JUMP
       DOWN = CROUCH
       I = BLOCK
       J = BASIC
       K = SPECIAL
       L = ULTIMATE
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


/* =====================================================
   KEY UP
===================================================== */

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
