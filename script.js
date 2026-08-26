/* =====================================================
   BLOODLINE BRAWL
   FULL 9-CHARACTER SCRIPT
===================================================== */

const $ = id => document.getElementById(id);


/* =====================================================
   ELEMENTS
===================================================== */

const titleScreen = $("titleScreen");
const selectScreen = $("selectScreen");
const challengeScreen = $("challengeScreen");
const mapScreen = $("mapScreen");
const fightScreen = $("fightScreen");

const startButton = $("startButton");
const martinChallengeButton = $("martinChallengeButton");
const challengeBackButton = $("challengeBackButton");
const challengeFighterGrid = $("challengeFighterGrid");
const challengeMartinPreview = $("challengeMartinPreview");

const mapSelectButton = $("mapSelectButton");
const backToFighterButton = $("backToFighterButton");
const fightButton = $("fightButton");

const fighterCards =
  document.querySelectorAll(".fighter-card");

const martinCard = $("martinCard");

const mapCards =
  document.querySelectorAll(".map-card");

const selectionText = $("selectionText");
const mapSelectionText = $("mapSelectionText");

const titleLeftCharacter = $("titleLeftCharacter");
const titleRightCharacter = $("titleRightCharacter");
const titleLeftName = $("titleLeftName");
const titleRightName = $("titleRightName");

const arena = $("arena");
const effects = $("effects");

const battleIntro = $("battleIntro");
const battleMapName = $("battleMapName");
const battleIntroRound = $("battleIntroRound");
const battleIntroWord = $("battleIntroWord");

const playerFighter = $("playerFighter");
const cpuFighter = $("cpuFighter");

const playerModelSlot =
  playerFighter.querySelector(".fighter-model-slot");

const cpuModelSlot =
  cpuFighter.querySelector(".fighter-model-slot");

const playerName = $("playerName");
const cpuName = $("cpuName");

const playerHealthBar = $("playerHealth");
const cpuHealthBar = $("cpuHealth");

const playerDamageTrail = $("playerDamageTrail");
const cpuDamageTrail = $("cpuDamageTrail");

const playerUltimateBar = $("playerUltimate");
const cpuUltimateBar = $("cpuUltimate");

const roundScore = $("roundScore");
const roundLabel = $("roundLabel");
const roundText = $("roundText");

const blockButton = $("blockButton");
const attackButton = $("attackButton");
const specialButton = $("specialButton");
const ultimateButton = $("ultimateButton");

const koOverlay = $("koOverlay");
const winnerText = $("winnerText");
const matchStatus = $("matchStatus");
const newGameButton = $("newGameButton");

const playerSpecialOrb = $("playerSpecialOrb");
const playerUltimateOrb = $("playerUltimateOrb");
const cpuSpecialOrb = $("cpuSpecialOrb");
const cpuUltimateOrb = $("cpuUltimateOrb");

const playerSpecialIcon = $("playerSpecialIcon");
const playerUltimateIcon = $("playerUltimateIcon");
const cpuSpecialIcon = $("cpuSpecialIcon");
const cpuUltimateIcon = $("cpuUltimateIcon");


/* =====================================================
   ROSTERS
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


/* =====================================================
   MAPS
===================================================== */

const MAP_NAMES = {
  virginia: "SUBURBAN VIRGINIA",
  westhampton: "WESTHAMPTON BEACH",
  newcanaan: "NEW CANAAN",
  madrid: "MADRID"
};


/* =====================================================
   CHARACTER HEALTH
===================================================== */

const MAX_HEALTH = {
  brendan: 100,
  grandaddy: 100,
  connor: 100,
  erin: 100,
  shannan: 100,
  liam: 100,
  grandmommy: 100,
  sean: 100,
  martin: 115
};


/* =====================================================
   BASIC ATTACK BALANCE
===================================================== */

const NORMAL = {

  brendan: {
    damage: 5,
    range: 138,
    recovery: 800,
    impact: 275,
    animation: 440
  },

  grandaddy: {
    damage: 5.75,
    range: 108,
    recovery: 375,
    impact: 175,
    animation: 330
  },

  connor: {
    damage: 5.5,
    range: 122,
    recovery: 530,
    impact: 220,
    animation: 390
  },

  erin: {
    damage: 4.5,
    range: 88,
    recovery: 430,
    impact: 165,
    animation: 340
  },

  shannan: {
    damage: 5,
    range: 94,
    recovery: 455,
    impact: 180,
    animation: 340
  },

  liam: {
    damage: 5.5,
    range: 112,
    recovery: 470,
    impact: 220,
    animation: 420
  },

  grandmommy: {
    damage: 5,
    range: 96,
    recovery: 430,
    impact: 180,
    animation: 360
  },

  sean: {
    damage: 5.5,
    range: 118,
    recovery: 500,
    impact: 220,
    animation: 400
  },

  martin: {
    damage: 4.75,
    range: 82,
    recovery: 410,
    impact: 155,
    animation: 300
  }

};


/* =====================================================
   SPECIAL / ULTIMATE BALANCE
===================================================== */

const BIG_DRIVE_DAMAGE = 10;

const LADDER_DAMAGE = 10.5;

const PAINT_BEAST_DAMAGE = 10;

const PIMPLE_PATCH_STUN = 1500;

/* Shannan lasts a touch longer now */
const BRAINROT_STUN = 1900;

/* Martin now stuns 2.5 seconds */
const DOG_BREATH_STUN = 2500;

const RUGBY_PASS_DAMAGE = 11;

const DON_ASSIST_DAMAGE = 13;

const DISH_SPECIAL_DAMAGE = 12;

const UFO_DAMAGE = 22;

const CLYDE_DAMAGE = 30;

const SPLASH_ZONE_DAMAGE = 30;

const CHAIR_YOGA_DAMAGE = 35;

const ZOMBIE_DEER_DAMAGE = 35;

const CONNOR_HEAL = 30;

const BACK_IN_MY_DAY_STUN = 3000;

const IPO_HITS = [
  5,
  5,
  7
];

const LAUNDRY_HITS = [
  4,
  5,
  13
];

const SPECIAL_COOLDOWN = 5000;

const METER_ON_HIT = 14;
const METER_ON_DAMAGE = 7;


/* =====================================================
   STATE
===================================================== */

let selectedCharacter = "brendan";
let cpuCharacter = "grandaddy";
let selectedMap = "virginia";

let challengeMode = false;
let challengeResult = null;

let currentRound = 1;

let playerRoundWins = 0;
let cpuRoundWins = 0;

let playerMaxHealth = 100;
let cpuMaxHealth = 100;

let playerHealth = 100;
let cpuHealth = 100;

let playerUltimate = 0;
let cpuUltimate = 0;

let playerX = 40;
let cpuX = 700;

let matchId = 0;
let roundId = 0;

let matchActive = false;
let fightStarted = false;
let roundOver = false;
let gameOver = false;

let actionLock = false;

let playerJumping = false;
let cpuJumping = false;

let playerCrouching = false;
let cpuCrouching = false;

let playerBlocking = false;
let cpuBlocking = false;

let playerStunned = false;
let cpuStunned = false;

let playerAttackCooldown = false;
let cpuAttackCooldown = false;

let specialCooldown = false;
let cpuSpecialCooldown = false;

let playerSpecialReadyTime = 0;
let cpuSpecialReadyTime = 0;

const keys = {};


/* =====================================================
   DISPLAY NAMES
===================================================== */

function displayName(character) {

  const names = {
    brendan: "BRENDAN",
    grandaddy: "GRANDADDY",
    connor: "CONNOR",
    erin: "ERIN",
    shannan: "SHANNAN",
    liam: "LIAM",
    grandmommy: "GRANDMOMMY",
    sean: "SEAN",
    martin: "MARTIN"
  };

  return names[character] ||
    character.toUpperCase();

}


/* =====================================================
   MARTIN UNLOCK
===================================================== */

function isMartinUnlocked() {

  return (
    localStorage.getItem(
      "martinUnlocked"
    ) === "true"
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

  martinChallengeButton.classList.toggle(
    "unlocked",
    unlocked
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

  /* ===================================================
     BRENDAN
  =================================================== */

  if (character === "brendan") {

    return `
      <div class="pixel-person brendan-model">

        <div class="brendan-hair"></div>

        <div class="face">
          <div class="eye eye-left"></div>
          <div class="eye eye-right"></div>
          <div class="mouth"></div>
        </div>

        <div class="brendan-shirt">
          <div class="polo-collar collar-left"></div>
          <div class="polo-collar collar-right"></div>
          <div class="whale-mark"></div>
        </div>

        <div class="skin arm left-arm"></div>

        <div class="skin arm right-arm weapon-arm">
          <div class="golf-club"></div>
        </div>

        <div class="khaki leg left-leg"></div>
        <div class="khaki leg right-leg"></div>

        <div class="white-shoe left-shoe"></div>
        <div class="white-shoe right-shoe"></div>

      </div>
    `;

  }


  /* ===================================================
     GRANDADDY
  =================================================== */

  if (character === "grandaddy") {

    return `
      <div class="pixel-person grandaddy-model">

        <div class="grandaddy-hair"></div>

        <div class="face grandaddy-face">
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

        <div class="skin arm left-arm"></div>

        <div class="skin arm right-arm weapon-arm">
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


  /* ===================================================
     CONNOR
  =================================================== */

  if (character === "connor") {

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

        <div class="skin arm left-arm"></div>

        <div class="skin arm right-arm weapon-arm">
          <div class="paintbrush"></div>
        </div>

        <div class="gray-pants leg left-leg"></div>
        <div class="gray-pants leg right-leg"></div>

        <div class="dark-shoe left-shoe"></div>
        <div class="dark-shoe right-shoe"></div>

      </div>
    `;

  }


  /* ===================================================
     ERIN
  =================================================== */

  if (character === "erin") {

    return `
      <div class="pixel-person erin-model">

        <div class="erin-hair"></div>

        <div class="face">
          <div class="eye eye-left"></div>
          <div class="eye eye-right"></div>
          <div class="mouth"></div>
        </div>

        <div class="erin-shirt"></div>

        <div class="skin arm left-arm"></div>

        <div class="skin arm right-arm weapon-arm">
          <div class="hairbrush"></div>
        </div>

        <div class="blue-jeans leg left-leg"></div>
        <div class="blue-jeans leg right-leg"></div>

        <div class="white-shoe left-shoe"></div>
        <div class="white-shoe right-shoe"></div>

      </div>
    `;

  }


  /* ===================================================
     SHANNAN
  =================================================== */

  if (character === "shannan") {

    return `
      <div class="pixel-person shannan-model">

        <div class="shannan-hair"></div>

        <div class="face">
          <div class="eye eye-left"></div>
          <div class="eye eye-right"></div>
          <div class="mouth"></div>
        </div>

        <div class="shannan-shirt"></div>

        <div class="skin arm left-arm"></div>

        <div class="skin arm right-arm weapon-arm">
          <div class="syringe"></div>
        </div>

        <div class="shannan-pants leg left-leg"></div>
        <div class="shannan-pants leg right-leg"></div>

        <div class="dark-shoe left-shoe"></div>
        <div class="dark-shoe right-shoe"></div>

      </div>
    `;

  }


  /* ===================================================
     LIAM
  =================================================== */

  if (character === "liam") {

    return `
      <div class="pixel-person liam-model">

        <div class="liam-hair"></div>

        <div class="face">
          <div class="eye eye-left"></div>
          <div class="eye eye-right"></div>
          <div class="mouth"></div>
        </div>

        <div class="liam-shirt"></div>

        <div class="skin arm left-arm"></div>

        <div class="skin arm right-arm weapon-arm">
          <div class="rugby-ball"></div>
        </div>

        <div class="liam-blue-pants leg left-leg"></div>
        <div class="liam-blue-pants leg right-leg"></div>

        <div class="white-shoe left-shoe"></div>
        <div class="white-shoe right-shoe"></div>

      </div>
    `;

  }


  /* ===================================================
     GRANDMOMMY
  =================================================== */

  if (character === "grandmommy") {

    return `
      <div class="pixel-person grandmommy-model">

        <div class="grandmommy-hair"></div>

        <div class="face">
          <div class="eye eye-left"></div>
          <div class="eye eye-right"></div>
          <div class="mouth"></div>
        </div>

        <div class="grandmommy-shirt"></div>

        <div class="skin arm left-arm"></div>

        <div class="skin arm right-arm weapon-arm">
          <div class="spatula"></div>
        </div>

        <div class="grandmommy-pants leg left-leg"></div>
        <div class="grandmommy-pants leg right-leg"></div>

        <div class="dark-shoe left-shoe"></div>
        <div class="dark-shoe right-shoe"></div>

      </div>
    `;

  }


  /* ===================================================
     SEAN
  =================================================== */

  if (character === "sean") {

    return `
      <div class="pixel-person sean-model">

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

        <div class="skin arm left-arm"></div>

        <div class="skin arm right-arm weapon-arm">
          <div class="baseball-bat"></div>
        </div>

        <div class="sean-pants leg left-leg"></div>
        <div class="sean-pants leg right-leg"></div>

        <div class="dark-shoe left-shoe"></div>
        <div class="dark-shoe right-shoe"></div>

      </div>
    `;

  }


  /* ===================================================
     MARTIN
  =================================================== */

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
   ABILITY ICON HTML
===================================================== */

function specialIconHTML(character) {

  if (character === "brendan") {

    return `
      <div class="mini-golf-icon">
        <div class="mini-golf-stick"></div>
        <div class="mini-golf-head"></div>
      </div>
    `;

  }


  if (character === "grandaddy") {

    return `
      <div class="mini-ladder-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;

  }


  if (character === "connor") {

    return `
      <div class="mini-paint-icon">
        <div class="mini-paint-handle"></div>
        <div class="mini-paint-head"></div>
      </div>
    `;

  }


  if (character === "erin") {

    return `
      <div class="mini-patch-icon">
        <span></span>
      </div>
    `;

  }


  if (character === "shannan") {

    return `
      <div class="mini-phone-icon">
        <div class="mini-phone-screen"></div>
      </div>
    `;

  }


  if (character === "liam") {

    return `
      <div class="mini-rugby-icon"></div>
    `;

  }


  if (character === "grandmommy") {

    return `
      <div class="mini-don-icon">
        DON
      </div>
    `;

  }


  if (character === "sean") {

    return `
      <div class="mini-dish-icon"></div>
    `;

  }


  return `
    <div class="mini-breath-icon">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;

}


function ultimateIconHTML(character) {

  if (character === "brendan") {

    return `
      <div class="mini-ipo-icon">
        IPO
      </div>
    `;

  }


  if (character === "grandaddy") {

    return `
      <div class="mini-clock-icon">
        <div class="mini-clock-hand"></div>
      </div>
    `;

  }


  if (character === "connor") {

    return `
      <div class="mini-chicken-icon">
        <div class="mini-chicken-piece"></div>
      </div>
    `;

  }


  if (character === "erin") {

    return `
      <div class="mini-laundry-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;

  }


  if (character === "shannan") {

    return `
      <div class="mini-ufo-icon">
        <div class="mini-ufo-dome"></div>
        <div class="mini-ufo-base"></div>
      </div>
    `;

  }


  if (character === "liam") {

    return `
      <div class="mini-splash-icon"></div>
    `;

  }


  if (character === "grandmommy") {

    return `
      <div class="mini-chair-icon"></div>
    `;

  }


  if (character === "sean") {

    return `
      <div class="mini-deer-icon"></div>
    `;

  }


  return `
    <div class="mini-clyde-icon">
      C
    </div>
  `;

}


/* =====================================================
   SCREEN CONTROL
===================================================== */

function showScreen(screen) {

  document
    .querySelectorAll(".screen")
    .forEach(item => {

      item.classList.remove(
        "active"
      );

    });

  screen.classList.add(
    "active"
  );

}


/* =====================================================
   PREVIEWS
===================================================== */

function renderPreviews() {

  document
    .querySelectorAll("[data-preview]")
    .forEach(element => {

      const character =
        element.dataset.preview;

      element.innerHTML =
        characterHTML(character);

    });

  challengeMartinPreview.innerHTML =
    characterHTML("martin");

}


/* =====================================================
   TITLE RANDOM MATCHUP
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
    characterHTML(left);

  titleRightCharacter.innerHTML =
    characterHTML(right);

  titleLeftName.textContent =
    displayName(left);

  titleRightName.textContent =
    displayName(right);

}


/* =====================================================
   INITIAL SETUP
===================================================== */

renderPreviews();

updateMartinUI();

generateTitleMatchup();


/* =====================================================
   TITLE START
===================================================== */

startButton.onclick = () => {

  challengeMode = false;
  challengeResult = null;

  fightButton.textContent =
    "FIGHT";

  showScreen(
    selectScreen
  );

};


/* =====================================================
   CHARACTER SELECT
===================================================== */

fighterCards.forEach(card => {

  card.addEventListener(
    "click",
    () => {

      const character =
        card.dataset.character;


      if (
        character === "martin" &&
        !isMartinUnlocked()
      ) {

        openMartinChallenge();

        return;

      }


      challengeMode =
        false;

      selectedCharacter =
        character;


      fighterCards.forEach(
        other => {

          other.classList.remove(
            "selected"
          );

        }
      );


      card.classList.add(
        "selected"
      );


      selectionText.textContent =
        "PLAYER: " +
        displayName(
          selectedCharacter
        );

    }
  );

});


/* =====================================================
   MARTIN CHALLENGE
===================================================== */

function openMartinChallenge() {

  challengeMode =
    true;

  challengeResult =
    null;

  renderChallengeChoices();

  showScreen(
    challengeScreen
  );

}


martinChallengeButton.onclick = () => {

  if (
    isMartinUnlocked()
  ) {

    challengeMode =
      false;

    showScreen(
      selectScreen
    );

    return;

  }

  openMartinChallenge();

};


challengeBackButton.onclick = () => {

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
        "challenge-choice-card";


      button.innerHTML = `
        <div class="challenge-choice-model">
          ${characterHTML(character)}
        </div>

        <strong>
          ${displayName(character)}
        </strong>
      `;


      button.onclick = () => {

        selectedCharacter =
          character;

        cpuCharacter =
          "martin";

        challengeMode =
          true;

        selectedMap =
          "virginia";


        mapCards.forEach(
          card => {

            card.classList.toggle(
              "selected",
              card.dataset.map ===
                selectedMap
            );

          }
        );


        mapSelectionText.textContent =
          "MAP: " +
          MAP_NAMES[
            selectedMap
          ];


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
   MAP SELECT
===================================================== */

mapSelectButton.onclick = () => {

  if (
    selectedCharacter === "martin" &&
    !isMartinUnlocked()
  ) {

    openMartinChallenge();

    return;

  }

  showScreen(
    mapScreen
  );

};


mapCards.forEach(
  card => {

    card.addEventListener(
      "click",
      () => {

        selectedMap =
          card.dataset.map;


        mapCards.forEach(
          other => {

            other.classList.remove(
              "selected"
            );

          }
        );


        card.classList.add(
          "selected"
        );


        mapSelectionText.textContent =
          "MAP: " +
          MAP_NAMES[
            selectedMap
          ];

      }
    );

  }
);


backToFighterButton.onclick = () => {

  if (
    challengeMode
  ) {

    renderChallengeChoices();

    showScreen(
      challengeScreen
    );

  }

  else {

    showScreen(
      selectScreen
    );

  }

};


/* =====================================================
   CPU CHARACTER CHOICE
===================================================== */

function chooseCPUCharacter() {

  if (
    challengeMode
  ) {

    cpuCharacter =
      "martin";

    return;

  }


  const roster =
    unlockedRoster()
      .filter(
        character =>
          character !==
          selectedCharacter
      );


  cpuCharacter =
    roster[
      Math.floor(
        Math.random() *
        roster.length
      )
    ];

}


/* =====================================================
   FIGHT BUTTON
===================================================== */

fightButton.onclick = () => {

  chooseCPUCharacter();

  beginMatch();

};


/* =====================================================
   ARENA MAP
===================================================== */

function setArenaMap() {

  arena.className =
    "arena map-" +
    selectedMap;

  battleMapName.textContent =
    MAP_NAMES[
      selectedMap
    ];

}


/* =====================================================
   RENDER FIGHTERS
===================================================== */

function renderFightCharacters() {

  playerModelSlot.innerHTML =
    characterHTML(
      selectedCharacter
    );

  cpuModelSlot.innerHTML =
    characterHTML(
      cpuCharacter
    );


  playerFighter.dataset.character =
    selectedCharacter;

  cpuFighter.dataset.character =
    cpuCharacter;


  playerName.textContent =
    displayName(
      selectedCharacter
    );

  cpuName.textContent =
    displayName(
      cpuCharacter
    );


  /* ICON FIX */

  playerSpecialIcon.innerHTML =
    specialIconHTML(
      selectedCharacter
    );

  playerUltimateIcon.innerHTML =
    ultimateIconHTML(
      selectedCharacter
    );

  cpuSpecialIcon.innerHTML =
    specialIconHTML(
      cpuCharacter
    );

  cpuUltimateIcon.innerHTML =
    ultimateIconHTML(
      cpuCharacter
    );

}


/* =====================================================
   BEGIN MATCH
===================================================== */

function beginMatch() {

  matchId++;

  currentRound =
    1;

  playerRoundWins =
    0;

  cpuRoundWins =
    0;

  playerUltimate =
    0;

  cpuUltimate =
    0;

  gameOver =
    false;

  roundOver =
    false;

  actionLock =
    false;

  matchActive =
    true;


  playerMaxHealth =
    MAX_HEALTH[
      selectedCharacter
    ];

  cpuMaxHealth =
    MAX_HEALTH[
      cpuCharacter
    ];


  renderFightCharacters();

  setArenaMap();

  showScreen(
    fightScreen
  );


  koOverlay.classList.add(
    "hidden"
  );

  newGameButton.classList.add(
    "hidden"
  );

  matchStatus.textContent =
    "";


  startRound();

}


/* =====================================================
   ROUND HUD
===================================================== */

function updateRoundHUD() {

  roundScore.textContent =
    playerRoundWins +
    " - " +
    cpuRoundWins;

  roundLabel.textContent =
    "ROUND " +
    currentRound;

}


/* =====================================================
   RESET STANDING STATE
===================================================== */

function restoreStandingState(
  fighter
) {

  fighter.classList.remove(
    "walking",
    "jumping",
    "crouching",
    "blocking",
    "stunned",
    "hit",
    "ko-loser"
  );


  const model =
    fighter.querySelector(
      ".pixel-person, .martin-model"
    );


  if (
    model
  ) {

    model.classList.remove(
      "weapon-attacking",
      "special-swing",
      "ultimate-attacking"
    );

  }


  const motion =
    fighter.querySelector(
      ".motion-layer"
    );


  const visual =
    fighter.querySelector(
      ".visual-layer"
    );


  [
    motion,
    visual
  ]
    .filter(Boolean)
    .forEach(
      element => {

        element
          .getAnimations()
          .forEach(
            animation =>
              animation.cancel()
          );

        element.style.transform =
          "";

        element.style.animation =
          "";

      }
    );

}


/* =====================================================
   START ROUND
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


  playerHealth =
    playerMaxHealth;

  cpuHealth =
    cpuMaxHealth;


  playerUltimate =
    0;

  cpuUltimate =
    0;


  playerBlocking =
    false;

  cpuBlocking =
    false;


  playerStunned =
    false;

  cpuStunned =
    false;


  playerCrouching =
    false;

  cpuCrouching =
    false;


  playerJumping =
    false;

  cpuJumping =
    false;


  playerAttackCooldown =
    false;

  cpuAttackCooldown =
    false;


  specialCooldown =
    false;

  cpuSpecialCooldown =
    false;


  playerSpecialReadyTime =
    0;

  cpuSpecialReadyTime =
    0;


  effects.innerHTML =
    "";


  restoreStandingState(
    playerFighter
  );

  restoreStandingState(
    cpuFighter
  );


  playerX =
    Math.max(
      40,
      arena.clientWidth *
      0.18
    );

  cpuX =
    Math.min(
      arena.clientWidth -
      120,
      arena.clientWidth *
      0.73
    );


  updatePositions();

  updateHUD(
    true
  );

  updateRoundHUD();


  battleIntroRound.textContent =
    "ROUND " +
    currentRound;

  battleMapName.textContent =
    MAP_NAMES[
      selectedMap
    ];

  battleIntroWord.textContent =
    "READY...";

  battleIntroWord.classList.remove(
    "begin"
  );

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

      battleIntroWord.classList.add(
        "begin"
      );

    },
    900
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

      battleIntroWord.classList.remove(
        "begin"
      );


      fightStarted =
        true;

      actionLock =
        false;


      cpuLoop(
        thisMatch,
        thisRound
      );

    },
    1650
  );

}


/* =====================================================
   HUD
===================================================== */

function updateHUD(
  immediate = false
) {

  playerHealth =
    Math.max(
      0,
      Math.min(
        playerMaxHealth,
        playerHealth
      )
    );

  cpuHealth =
    Math.max(
      0,
      Math.min(
        cpuMaxHealth,
        cpuHealth
      )
    );


  playerUltimate =
    Math.max(
      0,
      Math.min(
        100,
        playerUltimate
      )
    );

  cpuUltimate =
    Math.max(
      0,
      Math.min(
        100,
        cpuUltimate
      )
    );


  const playerPercent =
    playerHealth /
    playerMaxHealth *
    100;

  const cpuPercent =
    cpuHealth /
    cpuMaxHealth *
    100;


  playerHealthBar.style.width =
    playerPercent +
    "%";

  cpuHealthBar.style.width =
    cpuPercent +
    "%";


  if (
    immediate
  ) {

    playerDamageTrail.style.width =
      playerPercent +
      "%";

    cpuDamageTrail.style.width =
      cpuPercent +
      "%";

  }

  else {

    setTimeout(
      () => {

        playerDamageTrail.style.width =
          playerPercent +
          "%";

        cpuDamageTrail.style.width =
          cpuPercent +
          "%";

      },
      170
    );

  }


  playerUltimateBar.style.width =
    playerUltimate +
    "%";

  cpuUltimateBar.style.width =
    cpuUltimate +
    "%";


  ultimateButton.classList.toggle(
    "ultimate-ready",
    playerUltimate >=
      100
  );

}


/* =====================================================
   ABILITY ORB LOOP
===================================================== */

function updateAbilityOrbs() {

  const playerSpecialProgress =
    specialCooldown
      ? 1 -
        Math.max(
          0,
          playerSpecialReadyTime -
          Date.now()
        ) /
        SPECIAL_COOLDOWN
      : 1;


  const cpuSpecialProgress =
    cpuSpecialCooldown
      ? 1 -
        Math.max(
          0,
          cpuSpecialReadyTime -
          Date.now()
        ) /
        SPECIAL_COOLDOWN
      : 1;


  playerSpecialOrb.style.setProperty(
    "--fill",
    Math.max(
      0,
      playerSpecialProgress
    ) *
    360 +
    "deg"
  );


  cpuSpecialOrb.style.setProperty(
    "--fill",
    Math.max(
      0,
      cpuSpecialProgress
    ) *
    360 +
    "deg"
  );


  playerUltimateOrb.style.setProperty(
    "--fill",
    playerUltimate *
    3.6 +
    "deg"
  );


  cpuUltimateOrb.style.setProperty(
    "--fill",
    cpuUltimate *
    3.6 +
    "deg"
  );


  playerSpecialOrb.classList.toggle(
    "ability-ready",
    !specialCooldown
  );

  cpuSpecialOrb.classList.toggle(
    "ability-ready",
    !cpuSpecialCooldown
  );

  playerUltimateOrb.classList.toggle(
    "ability-ready",
    playerUltimate >=
      100
  );

  cpuUltimateOrb.classList.toggle(
    "ability-ready",
    cpuUltimate >=
      100
  );


  requestAnimationFrame(
    updateAbilityOrbs
  );

}


updateAbilityOrbs();


/* =====================================================
   POSITION HELPERS
===================================================== */

function fighterScreenX(
  fighter
) {

  return (
    parseFloat(
      fighter.style.left
    ) ||
    0
  );

}


function updatePositions() {

  const maxX =
    arena.clientWidth -
    100;


  playerX =
    Math.max(
      0,
      Math.min(
        maxX,
        playerX
      )
    );


  cpuX =
    Math.max(
      0,
      Math.min(
        maxX,
        cpuX
      )
    );


  if (
    playerX + 60 >
    cpuX
  ) {

    const middle =
      (
        playerX +
        cpuX
      ) /
      2;

    playerX =
      middle -
      31;

    cpuX =
      middle +
      31;

  }


  playerFighter.style.left =
    playerX +
    "px";

  cpuFighter.style.left =
    cpuX +
    "px";

}


function distance() {

  return Math.abs(
    cpuX -
    playerX
  );

}


/* =====================================================
   ACTION CHECKS
===================================================== */

function canPlayer() {

  return (
    matchActive &&
    fightStarted &&
    !roundOver &&
    !gameOver &&
    !actionLock &&
    !playerStunned
  );

}


function canCPU() {

  return (
    matchActive &&
    fightStarted &&
    !roundOver &&
    !gameOver &&
    !actionLock &&
    !cpuStunned
  );

}


/* =====================================================
   MOVEMENT
===================================================== */

function movePlayer(
  amount
) {

  if (
    !canPlayer() ||
    playerBlocking ||
    playerCrouching
  ) {

    return;

  }


  playerX +=
    amount;


  updatePositions();

}


function cpuStep(
  amount
) {

  if (
    !canCPU() ||
    cpuBlocking
  ) {

    return;

  }


  cpuX +=
    amount;


  updatePositions();

}


/* =====================================================
   JUMP
===================================================== */

function jumpPlayer() {

  if (
    !canPlayer() ||
    playerJumping ||
    playerCrouching ||
    playerBlocking
  ) {

    return;

  }


  playerJumping =
    true;


  playerFighter.classList.add(
    "jumping"
  );


  setTimeout(
    () => {

      playerFighter.classList.remove(
        "jumping"
      );

      playerJumping =
        false;

    },
    620
  );

}


function jumpCPU() {

  if (
    !canCPU() ||
    cpuJumping
  ) {

    return;

  }


  cpuJumping =
    true;


  cpuFighter.classList.add(
    "jumping"
  );


  setTimeout(
    () => {

      cpuFighter.classList.remove(
        "jumping"
      );

      cpuJumping =
        false;

    },
    620
  );

}


/* =====================================================
   CROUCH
===================================================== */

function crouchPlayer(
  on
) {

  if (
    on &&
    (
      !canPlayer() ||
      playerJumping ||
      playerBlocking
    )
  ) {

    return;

  }


  playerCrouching =
    on;


  playerFighter.classList.toggle(
    "crouching",
    on
  );

}


/* =====================================================
   BLOCK
===================================================== */

function setPlayerBlock(
  on
) {

  if (
    on &&
    !canPlayer()
  ) {

    return;

  }


  playerBlocking =
    on;


  const model =
    playerFighter.querySelector(
      ".pixel-person, .martin-model"
    );


  if (
    model
  ) {

    model.classList.toggle(
      "blocking",
      on
    );

  }


  blockButton.classList.toggle(
    "block-active",
    on
  );

}


function setCPUBlock(
  on
) {

  cpuBlocking =
    on;


  const model =
    cpuFighter.querySelector(
      ".pixel-person, .martin-model"
    );


  if (
    model
  ) {

    model.classList.toggle(
      "blocking",
      on
    );

  }

}


function cpuBlock() {

  if (
    !canCPU()
  ) {

    return;

  }


  setCPUBlock(
    true
  );


  setTimeout(
    () => {

      setCPUBlock(
        false
      );

    },
    450
  );

}


/* =====================================================
   EFFECT HELPERS
===================================================== */

function createComicText(
  text,
  className,
  duration = 1000
) {

  const element =
    document.createElement(
      "div"
    );


  element.className =
    className;


  element.textContent =
    text;


  effects.appendChild(
    element
  );


  setTimeout(
    () => {

      element.remove();

    },
    duration
  );


  return element;

}


function createHitSpark(
  fighter,
  type = "normal"
) {

  const element =
    document.createElement(
      "div"
    );


  const className =
    type === "ultimate"
      ? "hit-spark-ultimate"
      : type === "special"
        ? "hit-spark-special"
        : "hit-spark-normal";


  element.className =
    "effect " +
    className;


  element.style.left =
    fighterScreenX(
      fighter
    ) +
    30 +
    "px";


  element.style.bottom =
    "105px";


  effects.appendChild(
    element
  );


  setTimeout(
    () => {

      element.remove();

    },
    350
  );

}


/* =====================================================
   DAMAGE
===================================================== */

function damageCPU(
  amount,
  options = {}
) {

  if (
    roundOver ||
    gameOver ||
    !fightStarted
  ) {

    return;

  }


  const type =
    options.type ||
    "normal";


  let finalDamage =
    amount;


  if (
    cpuBlocking &&
    !options.ignoreBlock
  ) {

    finalDamage *=
      type === "special"
        ? 0.5
        : 0.2;

  }

  else {

    createHitSpark(
      cpuFighter,
      type
    );

  }


  cpuHealth -=
    finalDamage;


  playerUltimate +=
    METER_ON_HIT;


  cpuUltimate +=
    METER_ON_DAMAGE;


  updateHUD();


  checkKO();

}


function damagePlayer(
  amount,
  options = {}
) {

  if (
    roundOver ||
    gameOver ||
    !fightStarted
  ) {

    return;

  }


  const type =
    options.type ||
    "normal";


  let finalDamage =
    amount;


  if (
    playerBlocking &&
    !options.ignoreBlock
  ) {

    finalDamage *=
      type === "special"
        ? 0.5
        : 0.2;

  }

  else {

    createHitSpark(
      playerFighter,
      type
    );

  }


  playerHealth -=
    finalDamage;


  cpuUltimate +=
    METER_ON_HIT;


  playerUltimate +=
    METER_ON_DAMAGE;


  updateHUD();


  checkKO();

}


/* =====================================================
   WEAPON SWING
===================================================== */

function weaponSwing(
  fighter,
  duration
) {

  const model =
    fighter.querySelector(
      ".pixel-person, .martin-model"
    );


  if (
    !model
  ) {

    return;

  }


  model.classList.remove(
    "weapon-attacking"
  );


  void model.offsetWidth;


  model.classList.add(
    "weapon-attacking"
  );


  setTimeout(
    () => {

      model.classList.remove(
        "weapon-attacking"
      );

    },
    duration
  );

}


/* =====================================================
   BASIC ATTACK
===================================================== */

function playerAttack() {

  if (
    !canPlayer() ||
    playerAttackCooldown
  ) {

    return;

  }


  if (
    playerBlocking
  ) {

    setPlayerBlock(
      false
    );

  }


  const stats =
    NORMAL[
      selectedCharacter
    ];


  playerAttackCooldown =
    true;


  weaponSwing(
    playerFighter,
    stats.animation
  );


  setTimeout(
    () => {

      if (
        roundOver
      ) {

        return;

      }


      if (
        distance() <=
          stats.range &&
        !cpuJumping
      ) {

        damageCPU(
          stats.damage,
          {
            type:
              "normal"
          }
        );

      }

    },
    stats.impact
  );


  setTimeout(
    () => {

      playerAttackCooldown =
        false;

    },
    stats.recovery
  );

}


function cpuNormalAttack() {

  if (
    !canCPU() ||
    cpuAttackCooldown
  ) {

    return;

  }


  const stats =
    NORMAL[
      cpuCharacter
    ];


  cpuAttackCooldown =
    true;


  weaponSwing(
    cpuFighter,
    stats.animation
  );


  setTimeout(
    () => {

      if (
        roundOver
      ) {

        return;

      }


      if (
        distance() <=
          stats.range &&
        !playerJumping
      ) {

        damagePlayer(
          stats.damage,
          {
            type:
              "normal"
          }
        );

      }

    },
    stats.impact
  );


  setTimeout(
    () => {

      cpuAttackCooldown =
        false;

    },
    stats.recovery
  );

}


/* =====================================================
   PLAYER SPECIAL
===================================================== */

function playerSpecial() {

  if (
    !canPlayer() ||
    specialCooldown
  ) {

    return;

  }


  specialCooldown =
    true;


  playerSpecialReadyTime =
    Date.now() +
    SPECIAL_COOLDOWN;


  specialButton.disabled =
    true;


  specialButton.classList.add(
    "cooling-down"
  );


  useSpecial(
    selectedCharacter,
    true
  );


  const thisRound =
    roundId;


  setTimeout(
    () => {

      if (
        thisRound !==
        roundId
      ) {

        return;

      }


      specialCooldown =
        false;


      playerSpecialReadyTime =
        0;


      specialButton.disabled =
        false;


      specialButton.classList.remove(
        "cooling-down"
      );

    },
    SPECIAL_COOLDOWN
  );

}


/* =====================================================
   SPECIAL ROUTER
===================================================== */

function useSpecial(
  character,
  playerOwned
) {

  if (
    character === "brendan"
  ) {

    bigDrive(
      playerOwned
    );

  }

  else if (
    character === "grandaddy"
  ) {

    grandaddyLadder(
      playerOwned
    );

  }

  else if (
    character === "connor"
  ) {

    paintBeast(
      playerOwned
    );

  }

  else if (
    character === "erin"
  ) {

    pimplePatch(
      playerOwned
    );

  }

  else if (
    character === "shannan"
  ) {

    brainrot(
      playerOwned
    );

  }

  else if (
    character === "liam"
  ) {

    rugbyPass(
      playerOwned
    );

  }

  else if (
    character === "grandmommy"
  ) {

    donGetOverHere(
      playerOwned
    );

  }

  else if (
    character === "sean"
  ) {

    flyingDishes(
      playerOwned
    );

  }

  else if (
    character === "martin"
  ) {

    dogBreath(
      playerOwned
    );

  }

}


/* =====================================================
   BRENDAN SPECIAL
===================================================== */

function bigDrive(
  playerOwned
) {

  const fighter =
    playerOwned
      ? playerFighter
      : cpuFighter;


  const model =
    fighter.querySelector(
      ".brendan-model"
    );


  if (
    model
  ) {

    model.classList.add(
      "special-swing"
    );

    setTimeout(
      () => {

        model.classList.remove(
          "special-swing"
        );

      },
      520
    );

  }


  roundText.textContent =
    "BIG DRIVE!";


  const ball =
    document.createElement(
      "div"
    );


  ball.className =
    "effect golf-ball";


  let x =
    playerOwned
      ? playerX + 80
      : cpuX;


  const direction =
    playerOwned
      ? 1
      : -1;


  ball.style.left =
    x +
    "px";


  ball.style.bottom =
    "60px";


  effects.appendChild(
    ball
  );


  const interval =
    setInterval(
      () => {

        x +=
          18 *
          direction;


        ball.style.left =
          x +
          "px";


        const targetX =
          playerOwned
            ? cpuX
            : playerX;


        if (
          Math.abs(
            x -
            targetX
          ) <
          28
        ) {

          clearInterval(
            interval
          );

          ball.remove();


          if (
            playerOwned
          ) {

            damageCPU(
              BIG_DRIVE_DAMAGE,
              {
                type:
                  "special"
              }
            );

          }

          else {

            damagePlayer(
              BIG_DRIVE_DAMAGE,
              {
                type:
                  "special"
              }
            );

          }


          return;

        }


        if (
          x < -50 ||
          x >
            arena.clientWidth +
            50
        ) {

          clearInterval(
            interval
          );

          ball.remove();

        }

      },
      22
    );


  setTimeout(
    () => {

      roundText.textContent =
        "";

    },
    800
  );

}


/* =====================================================
   GRANDADDY LADDER
===================================================== */

function grandaddyLadder(
  playerOwned
) {

  if (
    roundOver
  ) {

    return;

  }


  const target =
    playerOwned
      ? cpuFighter
      : playerFighter;


  const motion =
    target.querySelector(
      ".motion-layer"
    );


  actionLock =
    true;


  restoreStandingState(
    target
  );


  roundText.textContent =
    "HOLD THIS LADDER!";


  const ladder =
    document.createElement(
      "div"
    );


  ladder.className =
    "effect ladder-effect";


  ladder.textContent =
    "🪜";


  ladder.style.left =
    fighterScreenX(
      target
    ) -
    5 +
    "px";


  ladder.style.bottom =
    "20px";


  effects.appendChild(
    ladder
  );


  motion.animate(
    [

      {
        transform:
          "translate3d(0,0,0)"
      },

      {
        transform:
          "translate3d(8px,-35px,0)"
      },

      {
        transform:
          "translate3d(15px,-65px,0)"
      },

      {
        transform:
          "translate3d(20px,-90px,0)"
      }

    ],

    {
      duration:
        680,

      fill:
        "forwards"
    }
  );


  setTimeout(
    () => {

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
            470,

          fill:
            "forwards"
        }
      );


      motion.animate(
        [

          {
            transform:
              "translate3d(20px,-90px,0) rotate(0deg)"
          },

          {
            transform:
              "translate3d(42px,-45px,0) rotate(40deg)"
          },

          {
            transform:
              "translate3d(64px,0,0) rotate(76deg)"
          }

        ],

        {
          duration:
            470,

          fill:
            "forwards"
        }
      );

    },
    680
  );


  setTimeout(
    () => {

      if (
        playerOwned
      ) {

        damageCPU(
          LADDER_DAMAGE,
          {
            type:
              "special"
          }
        );

      }

      else {

        damagePlayer(
          LADDER_DAMAGE,
          {
            type:
              "special"
          }
        );

      }

    },
    1090
  );


  setTimeout(
    () => {

      ladder.remove();


      restoreStandingState(
        target
      );


      updatePositions();


      actionLock =
        false;


      roundText.textContent =
        "";

    },
    1300
  );

}


/* =====================================================
   CONNOR DINOSAUR HTML
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


/* =====================================================
   CONNOR SPECIAL
===================================================== */

function paintBeast(
  playerOwned
) {

  const fighter =
    playerOwned
      ? playerFighter
      : cpuFighter;


  roundText.textContent =
    "PAINT BEAST!";


  const splash =
    document.createElement(
      "div"
    );


  splash.className =
    "effect paint-splash";


  splash.style.left =
    fighterScreenX(
      fighter
    ) +
    (
      playerOwned
        ? 67
        : -25
    ) +
    "px";


  splash.style.bottom =
    "100px";


  effects.appendChild(
    splash
  );


  setTimeout(
    () => {

      splash.remove();


      const dinosaur =
        document.createElement(
          "div"
        );


      dinosaur.className =
        "effect pixel-dino";


      dinosaur.innerHTML =
        dinosaurHTML();


      let x =
        playerOwned
          ? playerX + 63
          : cpuX - 68;


      const direction =
        playerOwned
          ? 1
          : -1;


      dinosaur.style.left =
        x +
        "px";


      dinosaur.style.bottom =
        "44px";


      if (
        !playerOwned
      ) {

        dinosaur.style.transform =
          "scaleX(-1)";

      }


      effects.appendChild(
        dinosaur
      );


      const interval =
        setInterval(
          () => {

            x +=
              10 *
              direction;


            dinosaur.style.left =
              x +
              "px";


            const targetX =
              playerOwned
                ? cpuX
                : playerX;


            if (
              Math.abs(
                x -
                targetX
              ) <
              38
            ) {

              clearInterval(
                interval
              );


              if (
                playerOwned
              ) {

                damageCPU(
                  PAINT_BEAST_DAMAGE,
                  {
                    type:
                      "special"
                  }
                );

              }

              else {

                damagePlayer(
                  PAINT_BEAST_DAMAGE,
                  {
                    type:
                      "special"
                  }
                );

              }


              setTimeout(
                () => {

                  dinosaur.remove();

                },
                250
              );


              return;

            }


            if (
              x < -130 ||
              x >
                arena.clientWidth +
                130
            ) {

              clearInterval(
                interval
              );

              dinosaur.remove();

            }

          },
          34
        );

    },
    800
  );


  setTimeout(
    () => {

      roundText.textContent =
        "";

    },
    1900
  );

}


/* =====================================================
   ERIN PIMPLE PATCH
===================================================== */

function pimplePatch(
  playerOwned
) {

  const target =
    playerOwned
      ? cpuFighter
      : playerFighter;


  roundText.textContent =
    "PIMPLE PATCH!";


  createComicText(
    "PIMPLE PATCH ATTACK",
    "pimple-comic-callout",
    1100
  );


  const patch =
    document.createElement(
      "div"
    );


  patch.className =
    "effect pimple-projectile";


  let x =
    playerOwned
      ? playerX + 70
      : cpuX;


  const direction =
    playerOwned
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


  const interval =
    setInterval(
      () => {

        x +=
          18 *
          direction;


        patch.style.left =
          x +
          "px";


        const targetX =
          fighterScreenX(
            target
          );


        if (
          Math.abs(
            x -
            targetX
          ) <
          30
        ) {

          clearInterval(
            interval
          );

          patch.remove();


          applyStun(
            target,
            playerOwned,
            PIMPLE_PATCH_STUN,
            "STUCK!"
          );


          return;

        }


        if (
          x < -40 ||
          x >
            arena.clientWidth +
            40
        ) {

          clearInterval(
            interval
          );

          patch.remove();

        }

      },
      22
    );


  setTimeout(
    () => {

      roundText.textContent =
        "";

    },
    900
  );

}


/* =====================================================
   GENERIC STUN
===================================================== */

function applyStun(
  target,
  playerOwned,
  duration,
  labelText = "STUNNED!"
) {

  if (
    playerOwned
  ) {

    cpuStunned =
      true;

  }

  else {

    playerStunned =
      true;

  }


  target.classList.add(
    "stunned"
  );


  const label =
    document.createElement(
      "div"
    );


  label.className =
    "effect stun-label";


  label.textContent =
    labelText;


  label.style.left =
    fighterScreenX(
      target
    ) +
    10 +
    "px";


  label.style.bottom =
    "205px";


  effects.appendChild(
    label
  );


  setTimeout(
    () => {

      label.remove();


      target.classList.remove(
        "stunned"
      );


      if (
        playerOwned
      ) {

        cpuStunned =
          false;

      }

      else {

        playerStunned =
          false;

      }

    },
    duration
  );

}


/* =====================================================
   SHANNAN BRAINROT
===================================================== */

function brainrot(
  playerOwned
) {

  const target =
    playerOwned
      ? cpuFighter
      : playerFighter;


  roundText.textContent =
    "BRAINROT!";


  createComicText(
    "BRAINROT",
    "brainrot-callout",
    1500
  );


  const phone =
    document.createElement(
      "div"
    );


  phone.className =
    "effect brainrot-phone";


  phone.innerHTML = `
    <div class="brainrot-screen"></div>
  `;


  phone.style.left =
    Math.max(
      10,
      Math.min(
        arena.clientWidth -
        160,
        fighterScreenX(
          target
        ) -
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
        650,

      fill:
        "forwards"
    }
  );


  applyStun(
    target,
    playerOwned,
    BRAINROT_STUN,
    "BRAINROTTED!"
  );


  setTimeout(
    () => {

      phone.remove();

      roundText.textContent =
        "";

    },
    BRAINROT_STUN
  );

}


/* =====================================================
   LIAM SPECIAL - RUGBY PASS
===================================================== */

function rugbyPass(
  playerOwned
) {

  const fighter =
    playerOwned
      ? playerFighter
      : cpuFighter;


  const target =
    playerOwned
      ? cpuFighter
      : playerFighter;


  const ballInHand =
    fighter.querySelector(
      ".rugby-ball"
    );


  if (
    ballInHand
  ) {

    ballInHand.style.visibility =
      "hidden";

  }


  roundText.textContent =
    "RUGBY PASS!";


  const projectile =
    document.createElement(
      "div"
    );


  projectile.className =
    "effect rugby-projectile";


  let x =
    playerOwned
      ? playerX + 65
      : cpuX;


  const direction =
    playerOwned
      ? 1
      : -1;


  projectile.style.left =
    x +
    "px";


  projectile.style.bottom =
    "105px";


  effects.appendChild(
    projectile
  );


  const interval =
    setInterval(
      () => {

        x +=
          16 *
          direction;


        projectile.style.left =
          x +
          "px";


        projectile.style.transform =
          `rotate(${x * 2}deg)`;


        const targetX =
          fighterScreenX(
            target
          );


        if (
          Math.abs(
            x -
            targetX
          ) <
          32
        ) {

          clearInterval(
            interval
          );


          projectile.remove();


          if (
            playerOwned
          ) {

            damageCPU(
              RUGBY_PASS_DAMAGE,
              {
                type:
                  "special"
              }
            );

          }

          else {

            damagePlayer(
              RUGBY_PASS_DAMAGE,
              {
                type:
                  "special"
              }
            );

          }


          if (
            ballInHand
          ) {

            setTimeout(
              () => {

                ballInHand.style.visibility =
                  "visible";

              },
              250
            );

          }


          return;

        }


        if (
          x < -60 ||
          x >
            arena.clientWidth +
            60
        ) {

          clearInterval(
            interval
          );

          projectile.remove();


          if (
            ballInHand
          ) {

            ballInHand.style.visibility =
              "visible";

          }

        }

      },
      25
    );


  setTimeout(
    () => {

      roundText.textContent =
        "";

    },
    1000
  );

}


/* =====================================================
   GRANDMOMMY SPECIAL
===================================================== */

function donGetOverHere(
  playerOwned
) {

  actionLock =
    true;


  const target =
    playerOwned
      ? cpuFighter
      : playerFighter;


  createComicText(
    "DON, GET OVER HERE!",
    "don-callout",
    1250
  );


  roundText.textContent =
    "DON, GET OVER HERE!";


  const assist =
    document.createElement(
      "div"
    );


  assist.className =
    "effect assist-grandaddy";


  assist.innerHTML =
    characterHTML(
      "grandaddy"
    );


  let x =
    playerOwned
      ? -120
      : arena.clientWidth +
        120;


  const targetX =
    fighterScreenX(
      target
    );


  const direction =
    playerOwned
      ? 1
      : -1;


  assist.style.left =
    x +
    "px";


  assist.style.bottom =
    "25px";


  if (
    !playerOwned
  ) {

    assist.style.transform =
      "scaleX(-1)";

  }


  effects.appendChild(
    assist
  );


  const interval =
    setInterval(
      () => {

        x +=
          23 *
          direction;


        assist.style.left =
          x +
          "px";


        if (
          Math.abs(
            x -
            targetX
          ) <
          45
        ) {

          clearInterval(
            interval
          );


          if (
            playerOwned
          ) {

            damageCPU(
              DON_ASSIST_DAMAGE,
              {
                type:
                  "special"
              }
            );

          }

          else {

            damagePlayer(
              DON_ASSIST_DAMAGE,
              {
                type:
                  "special"
              }
            );

          }


          assist.animate(
            [

              {
                transform:
                  !playerOwned
                    ? "scaleX(-1)"
                    : "translateX(0)"
              },

              {
                transform:
                  !playerOwned
                    ? "scaleX(-1) translateX(-280px)"
                    : "translateX(280px)"
              }

            ],

            {
              duration:
                500,

              fill:
                "forwards"
            }
          );


          setTimeout(
            () => {

              assist.remove();


              actionLock =
                false;


              roundText.textContent =
                "";

            },
            520
          );

        }

      },
      25
    );

}


/* =====================================================
   SEAN SPECIAL - DISHES
===================================================== */

function flyingDishes(
  playerOwned
) {

  roundText.textContent =
    "FLYING DISHES!";


  const damagePerDish =
    DISH_SPECIAL_DAMAGE /
    3;


  [0, 1, 2].forEach(
    index => {

      setTimeout(
        () => {

          if (
            roundOver
          ) {

            return;

          }


          const dish =
            document.createElement(
              "div"
            );


          dish.className =
            "effect flying-dish";


          let x =
            playerOwned
              ? playerX + 70
              : cpuX;


          const direction =
            playerOwned
              ? 1
              : -1;


          dish.style.left =
            x +
            "px";


          dish.style.bottom =
            90 +
            index *
            22 +
            "px";


          effects.appendChild(
            dish
          );


          const interval =
            setInterval(
              () => {

                x +=
                  20 *
                  direction;


                dish.style.left =
                  x +
                  "px";


                dish.style.transform =
                  `rotate(${x * 4}deg)`;


                const targetX =
                  playerOwned
                    ? cpuX
                    : playerX;


                if (
                  Math.abs(
                    x -
                    targetX
                  ) <
                  30
                ) {

                  clearInterval(
                    interval
                  );


                  dish.remove();


                  createDishShatter(
                    targetX,
                    90 +
                    index *
                    22
                  );


                  if (
                    playerOwned
                  ) {

                    damageCPU(
                      damagePerDish,
                      {
                        type:
                          "special"
                      }
                    );

                  }

                  else {

                    damagePlayer(
                      damagePerDish,
                      {
                        type:
                          "special"
                      }
                    );

                  }


                  return;

                }


                if (
                  x < -60 ||
                  x >
                    arena.clientWidth +
                    60
                ) {

                  clearInterval(
                    interval
                  );

                  dish.remove();

                }

              },
              20
            );

        },
        index *
        250
      );

    }
  );


  setTimeout(
    () => {

      roundText.textContent =
        "";

    },
    1100
  );

}


function createDishShatter(
  x,
  bottom
) {

  const shatter =
    document.createElement(
      "div"
    );


  shatter.className =
    "effect dish-shatter";


  shatter.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  `;


  shatter.style.left =
    x +
    "px";


  shatter.style.bottom =
    bottom +
    "px";


  effects.appendChild(
    shatter
  );


  setTimeout(
    () => {

      shatter.remove();

    },
    420
  );

}


/* =====================================================
   MARTIN SPECIAL - DOG BREATH
===================================================== */

function dogBreath(
  playerOwned
) {

  const martin =
    playerOwned
      ? playerFighter
      : cpuFighter;


  const target =
    playerOwned
      ? cpuFighter
      : playerFighter;


  roundText.textContent =
    "DOG BREATH!";


  createComicText(
    "DOG BREATH!",
    "dog-breath-text",
    1100
  );


  const cloud =
    document.createElement(
      "div"
    );


  cloud.className =
    "effect dog-breath-cloud";


  cloud.style.left =
    fighterScreenX(
      martin
    ) +
    (
      playerOwned
        ? 45
        : -145
    ) +
    "px";


  cloud.style.bottom =
    "55px";


  effects.appendChild(
    cloud
  );


  cloud.animate(
    [

      {
        transform:
          "scale(.25)",

        opacity:
          0
      },

      {
        transform:
          "scale(1)",

        opacity:
          0.9
      },

      {
        transform:
          playerOwned
            ? "translateX(95px) scale(1.25)"
            : "translateX(-95px) scale(1.25)",

        opacity:
          0.8
      }

    ],

    {
      duration:
        600,

      fill:
        "forwards",

      easing:
        "ease-out"
    }
  );


  setTimeout(
    () => {

      if (
        distance() <=
        175
      ) {

        applyStun(
          target,
          playerOwned,
          DOG_BREATH_STUN,
          "STUNNED!"
        );

      }

    },
    470
  );


  setTimeout(
    () => {

      cloud.remove();

      roundText.textContent =
        "";

    },
    1000
  );

}


/* =====================================================
   PLAYER ULTIMATE
===================================================== */

function playerUltimateAttack() {

  if (
    !canPlayer() ||
    playerUltimate <
      100
  ) {

    return;

  }


  playerUltimate =
    0;


  updateHUD();


  useUltimate(
    selectedCharacter,
    true
  );

}


/* =====================================================
   ULTIMATE ROUTER
===================================================== */

function useUltimate(
  character,
  playerOwned
) {

  if (
    character === "brendan"
  ) {

    ipoUltimate(
      playerOwned
    );

  }

  else if (
    character === "grandaddy"
  ) {

    yapAlertUltimate(
      playerOwned
    );

  }

  else if (
    character === "connor"
  ) {

    friedChickenFeast(
      playerOwned
    );

  }

  else if (
    character === "erin"
  ) {

    laundryAvalanche(
      playerOwned
    );

  }

  else if (
    character === "shannan"
  ) {

    flyingSaucer(
      playerOwned
    );

  }

  else if (
    character === "liam"
  ) {

    splashZone(
      playerOwned
    );

  }

  else if (
    character === "grandmommy"
  ) {

    chairYoga(
      playerOwned
    );

  }

  else if (
    character === "sean"
  ) {

    zombieDeerUltimate(
      playerOwned
    );

  }

  else if (
    character === "martin"
  ) {

    clydeReturns(
      playerOwned
    );

  }

}


/* =====================================================
   BRENDAN ULTIMATE - IPO
===================================================== */

function ipoUltimate(
  playerOwned
) {

  actionLock =
    true;


  roundText.textContent =
    "IPO!";


  const labels = [
    "FUNDING ROUND!",
    "GROWTH!",
    "IPO!"
  ];


  const icons = [
    "📱",
    "📈",
    "💰"
  ];


  IPO_HITS.forEach(
    (
      damage,
      index
    ) => {

      setTimeout(
        () => {

          if (
            roundOver
          ) {

            return;

          }


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


          if (
            playerOwned
          ) {

            damageCPU(
              damage,
              {
                type:
                  "ultimate",

                ignoreBlock:
                  true
              }
            );

          }

          else {

            damagePlayer(
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
            () => {

              card.remove();

            },
            750
          );

        },
        250 +
        index *
        595
      );

    }
  );


  setTimeout(
    () => {

      actionLock =
        false;

      roundText.textContent =
        "";

    },
    2250
  );

}


/* =====================================================
   GRANDADDY ULTIMATE - YAP ALERT
===================================================== */

function yapAlertUltimate(
  playerOwned
) {

  actionLock =
    true;


  const target =
    playerOwned
      ? cpuFighter
      : playerFighter;


  roundText.textContent =
    "YAP ALERT!";


  function showAlert(
    delay
  ) {

    setTimeout(
      () => {

        if (
          roundOver
        ) {

          return;

        }


        const alert =
          document.createElement(
            "div"
          );


        alert.className =
          "effect yap-alert";


        alert.textContent =
          "YAP ALERT! YAP ALERT!";


        effects.appendChild(
          alert
        );


        const sirenLeft =
          document.createElement(
            "div"
          );


        sirenLeft.className =
          "effect yap-siren";


        sirenLeft.style.left =
          "12%";


        sirenLeft.style.top =
          "85px";


        effects.appendChild(
          sirenLeft
        );


        const sirenRight =
          document.createElement(
            "div"
          );


        sirenRight.className =
          "effect yap-siren";


        sirenRight.style.right =
          "12%";


        sirenRight.style.top =
          "85px";


        effects.appendChild(
          sirenRight
        );


        setTimeout(
          () => {

            alert.remove();

            sirenLeft.remove();

            sirenRight.remove();

          },
          700
        );

      },
      delay
    );

  }


  showAlert(
    100
  );


  showAlert(
    1050
  );


  setTimeout(
    () => {

      actionLock =
        false;


      applyStun(
        target,
        playerOwned,
        BACK_IN_MY_DAY_STUN,
        "STUNNED!"
      );

    },
    1750
  );


  setTimeout(
    () => {

      roundText.textContent =
        "";

    },
    1900 +
    BACK_IN_MY_DAY_STUN
  );

}


/* =====================================================
   CONNOR ULTIMATE
===================================================== */

function friedChickenFeast(
  playerOwned
) {

  const fighter =
    playerOwned
      ? playerFighter
      : cpuFighter;


  actionLock =
    true;


  roundText.textContent =
    "FRIED CHICKEN FEAST!";


  const bucket =
    document.createElement(
      "div"
    );


  bucket.className =
    "effect chicken-bucket";


  bucket.textContent =
    "🍗 🍗";


  bucket.style.left =
    fighterScreenX(
      fighter
    ) +
    20 +
    "px";


  bucket.style.bottom =
    "95px";


  effects.appendChild(
    bucket
  );


  bucket.animate(
    [

      {
        transform:
          "translateY(0) scale(1)"
      },

      {
        transform:
          "translateY(-15px) scale(1.08)"
      },

      {
        transform:
          "translateY(0) scale(1)"
      },

      {
        transform:
          "translateY(-15px) scale(1.08)"
      },

      {
        transform:
          "translateY(0) scale(1)"
      }

    ],

    {
      duration:
        2500,

      easing:
        "ease-in-out"
    }
  );


  setTimeout(
    () => {

      bucket.remove();


      if (
        roundOver
      ) {

        actionLock =
          false;

        return;

      }


      if (
        playerOwned
      ) {

        playerHealth =
          Math.min(
            playerMaxHealth,
            playerHealth +
            CONNOR_HEAL
          );

      }

      else {

        cpuHealth =
          Math.min(
            cpuMaxHealth,
            cpuHealth +
            CONNOR_HEAL
          );

      }


      updateHUD();


      const heal =
        document.createElement(
          "div"
        );


      heal.className =
        "effect heal-text";


      heal.textContent =
        "+30 HP";


      heal.style.left =
        fighterScreenX(
          fighter
        ) +
        8 +
        "px";


      heal.style.bottom =
        "180px";


      effects.appendChild(
        heal
      );


      setTimeout(
        () => {

          heal.remove();

        },
        800
      );


      actionLock =
        false;


      roundText.textContent =
        "";

    },
    2500
  );

}


/* =====================================================
   ERIN ULTIMATE
===================================================== */

function laundryAvalanche(
  playerOwned
) {

  actionLock =
    true;


  const target =
    playerOwned
      ? cpuFighter
      : playerFighter;


  roundText.textContent =
    "LAUNDRY AVALANCHE!";


  const clothes = [
    "👕",
    "🧦"
  ];


  clothes.forEach(
    (
      clothing,
      index
    ) => {

      setTimeout(
        () => {

          const item =
            document.createElement(
              "div"
            );


          item.className =
            "effect laundry-item";


          item.textContent =
            clothing;


          item.style.left =
            fighterScreenX(
              target
            ) +
            (
              index === 0
                ? -2
                : 35
            ) +
            "px";


          item.style.top =
            "-95px";


          effects.appendChild(
            item
          );


          item.animate(
            [

              {
                transform:
                  "translateY(0) rotate(-10deg)"
              },

              {
                transform:
                  "translateY(385px) rotate(25deg)"
              }

            ],

            {
              duration:
                500,

              fill:
                "forwards",

              easing:
                "ease-in"
            }
          );


          setTimeout(
            () => {

              if (
                playerOwned
              ) {

                damageCPU(
                  LAUNDRY_HITS[
                    index
                  ],
                  {
                    type:
                      "ultimate",

                    ignoreBlock:
                      true
                  }
                );

              }

              else {

                damagePlayer(
                  LAUNDRY_HITS[
                    index
                  ],
                  {
                    type:
                      "ultimate",

                    ignoreBlock:
                      true
                  }
                );

              }

            },
            470
          );


          setTimeout(
            () => {

              item.remove();

            },
            800
          );

        },
        index *
        520
      );

    }
  );


  setTimeout(
    () => {

      const pile =
        document.createElement(
          "div"
        );


      pile.className =
        "effect laundry-pile-box";


      pile.innerHTML = `
        <span class="laundry-piece-one">👕</span>
        <span class="laundry-piece-two">👖</span>
        <span class="laundry-piece-three">🧦</span>
        <span class="laundry-piece-four">👚</span>
      `;


      pile.style.left =
        fighterScreenX(
          target
        ) -
        17 +
        "px";


      pile.style.top =
        "-95px";


      effects.appendChild(
        pile
      );


      pile.animate(
        [

          {
            transform:
              "translateY(0) scale(.8)"
          },

          {
            transform:
              "translateY(372px) scale(1)"
          }

        ],

        {
          duration:
            550,

          fill:
            "forwards",

          easing:
            "ease-in"
        }
      );


      setTimeout(
        () => {

          if (
            playerOwned
          ) {

            damageCPU(
              LAUNDRY_HITS[2],
              {
                type:
                  "ultimate",

                ignoreBlock:
                  true
              }
            );

          }

          else {

            damagePlayer(
              LAUNDRY_HITS[2],
              {
                type:
                  "ultimate",

                ignoreBlock:
                  true
              }
            );

          }

        },
        520
      );


      setTimeout(
        () => {

          pile.remove();

        },
        1100
      );

    },
    1040
  );


  setTimeout(
    () => {

      actionLock =
        false;


      roundText.textContent =
        "";

    },
    2250
  );

}


/* =====================================================
   SHANNAN UFO ULTIMATE
===================================================== */

function flyingSaucer(
  playerOwned
) {

  actionLock =
    true;


  const target =
    playerOwned
      ? cpuFighter
      : playerFighter;


  roundText.textContent =
    "CONSPIRACY!";


  createComicText(
    "CONSPIRACY",
    "conspiracy-text",
    1500
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
    <div class="ufo-light light-one"></div>
    <div class="ufo-light light-two"></div>
    <div class="ufo-light light-three"></div>
  `;


  ufo.style.left =
    "-210px";


  ufo.style.top =
    "35px";


  effects.appendChild(
    ufo
  );


  const targetX =
    Math.max(
      40,
      Math.min(
        arena.clientWidth -
        200,
        fighterScreenX(
          target
        ) -
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
          `translateX(${targetX + 210}px)`
      }

    ],

    {
      duration:
        750,

      fill:
        "forwards",

      easing:
        "ease-out"
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
        targetX +
        35 +
        "px";


      beam.style.top =
        "90px";


      effects.appendChild(
        beam
      );


      setTimeout(
        () => {

          if (
            playerOwned
          ) {

            damageCPU(
              UFO_DAMAGE,
              {
                type:
                  "ultimate",

                ignoreBlock:
                  true
              }
            );

          }

          else {

            damagePlayer(
              UFO_DAMAGE,
              {
                type:
                  "ultimate",

                ignoreBlock:
                  true
              }
            );

          }

        },
        300
      );


      setTimeout(
        () => {

          beam.remove();

        },
        900
      );

    },
    800
  );


  setTimeout(
    () => {

      ufo.animate(
        [

          {
            opacity:
              1
          },

          {
            transform:
              "translateX(550px)",

            opacity:
              0
          }

        ],

        {
          duration:
            650,

          fill:
            "forwards"
        }
      );

    },
    1600
  );


  setTimeout(
    () => {

      ufo.remove();


      actionLock =
        false;


      roundText.textContent =
        "";

    },
    2300
  );

}


/* =====================================================
   LIAM ULTIMATE - SPLASH ZONE
===================================================== */

function splashZone(
  playerOwned
) {

  actionLock =
    true;


  const fighter =
    playerOwned
      ? playerFighter
      : cpuFighter;


  const target =
    playerOwned
      ? cpuFighter
      : playerFighter;


  const ball =
    fighter.querySelector(
      ".rugby-ball"
    );


  if (
    ball
  ) {

    ball.style.visibility =
      "hidden";

  }


  roundText.textContent =
    "SPLASH ZONE!";


  createComicText(
    "SPLASH ZONE",
    "splash-zone-text",
    1400
  );


  const foods = [
    "🍕",
    "🍔",
    "🍟",
    "🌭",
    "🍩",
    "🍦"
  ];


  const damagePerHit =
    SPLASH_ZONE_DAMAGE /
    foods.length;


  foods.forEach(
    (
      food,
      index
    ) => {

      setTimeout(
        () => {

          if (
            roundOver
          ) {

            return;

          }


          const projectile =
            document.createElement(
              "div"
            );


          projectile.className =
            "effect food-projectile";


          projectile.textContent =
            food;


          let x =
            playerOwned
              ? fighterScreenX(
                  fighter
                ) +
                55
              : fighterScreenX(
                  fighter
                ) -
                15;


          const direction =
            playerOwned
              ? 1
              : -1;


          projectile.style.left =
            x +
            "px";


          projectile.style.bottom =
            80 +
            (
              index %
              3
            ) *
            30 +
            "px";


          effects.appendChild(
            projectile
          );


          const interval =
            setInterval(
              () => {

                x +=
                  21 *
                  direction;


                projectile.style.left =
                  x +
                  "px";


                projectile.style.transform =
                  `rotate(${x * 3}deg)`;


                const targetX =
                  fighterScreenX(
                    target
                  );


                if (
                  Math.abs(
                    x -
                    targetX
                  ) <
                  35
                ) {

                  clearInterval(
                    interval
                  );


                  projectile.remove();


                  createFoodSplat(
                    targetX,
                    95
                  );


                  if (
                    playerOwned
                  ) {

                    damageCPU(
                      damagePerHit,
                      {
                        type:
                          "ultimate",

                        ignoreBlock:
                          true
                      }
                    );

                  }

                  else {

                    damagePlayer(
                      damagePerHit,
                      {
                        type:
                          "ultimate",

                        ignoreBlock:
                          true
                      }
                    );

                  }


                  return;

                }


                if (
                  x < -60 ||
                  x >
                    arena.clientWidth +
                    60
                ) {

                  clearInterval(
                    interval
                  );

                  projectile.remove();

                }

              },
              20
            );

        },
        index *
        260
      );

    }
  );


  setTimeout(
    () => {

      if (
        ball
      ) {

        ball.style.visibility =
          "visible";

      }


      actionLock =
        false;


      roundText.textContent =
        "";

    },
    2150
  );

}


function createFoodSplat(
  x,
  bottom
) {

  const splat =
    document.createElement(
      "div"
    );


  splat.className =
    "effect food-splat";


  splat.style.left =
    x +
    "px";


  splat.style.bottom =
    bottom +
    "px";


  effects.appendChild(
    splat
  );


  setTimeout(
    () => {

      splat.remove();

    },
    380
  );

}


/* =====================================================
   GRANDMOMMY ULTIMATE - CHAIR YOGA
===================================================== */

function chairYoga(
  playerOwned
) {

  actionLock =
    true;


  const fighter =
    playerOwned
      ? playerFighter
      : cpuFighter;


  const target =
    playerOwned
      ? cpuFighter
      : playerFighter;


  roundText.textContent =
    "CHAIR YOGA!";


  createComicText(
    "CHAIR YOGA",
    "chair-yoga-text",
    1600
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
    fighterScreenX(
      fighter
    ) +
    (
      playerOwned
        ? -5
        : 30
    ) +
    "px";


  chair.style.bottom =
    "22px";


  effects.appendChild(
    chair
  );


  const visual =
    fighter.querySelector(
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
        1700,

      fill:
        "forwards",

      easing:
        "ease-in-out"
    }
  );


  setTimeout(
    () => {

      chair.classList.add(
        "chair-throw"
      );


      let x =
        parseFloat(
          chair.style.left
        );


      const direction =
        playerOwned
          ? 1
          : -1;


      const interval =
        setInterval(
          () => {

            x +=
              22 *
              direction;


            chair.style.left =
              x +
              "px";


            const targetX =
              fighterScreenX(
                target
              );


            if (
              Math.abs(
                x -
                targetX
              ) <
              40
            ) {

              clearInterval(
                interval
              );


              chair.remove();


              if (
                playerOwned
              ) {

                damageCPU(
                  CHAIR_YOGA_DAMAGE,
                  {
                    type:
                      "ultimate",

                    ignoreBlock:
                      true
                  }
                );

              }

              else {

                damagePlayer(
                  CHAIR_YOGA_DAMAGE,
                  {
                    type:
                      "ultimate",

                    ignoreBlock:
                      true
                  }
                );

              }


              return;

            }

          },
          23
        );

    },
    1850
  );


  setTimeout(
    () => {

      actionLock =
        false;


      roundText.textContent =
        "";

    },
    2900
  );

}


/* =====================================================
   SEAN ULTIMATE - ZOMBIE DEER
===================================================== */

function zombieDeerUltimate(
  playerOwned
) {

  actionLock =
    true;


  const target =
    playerOwned
      ? cpuFighter
      : playerFighter;


  roundText.textContent =
    "ZOMBIE DEER!";


  createComicText(
    "ZOMBIE DEER",
    "deer-comic-text",
    1300
  );


  const gravePositions =
    playerOwned
      ? [
          80,
          180
        ]
      : [
          arena.clientWidth -
          260,
          arena.clientWidth -
          160
        ];


  gravePositions.forEach(
    (
      x,
      index
    ) => {

      const grave =
        document.createElement(
          "div"
        );


      grave.className =
        "effect deer-grave";


      grave.textContent =
        "RIP";


      grave.style.left =
        x +
        "px";


      grave.style.bottom =
        "20px";


      effects.appendChild(
        grave
      );


      grave.animate(
        [

          {
            transform:
              "translateY(90px)"
          },

          {
            transform:
              "translateY(0)"
          }

        ],

        {
          duration:
            500,

          fill:
            "forwards"
        }
      );


      setTimeout(
        () => {

          spawnZombieDeer(
            x,
            playerOwned,
            target,
            index
          );

        },
        600 +
        index *
        160
      );


      setTimeout(
        () => {

          grave.remove();

        },
        2300
      );

    }
  );


  setTimeout(
    () => {

      actionLock =
        false;


      roundText.textContent =
        "";

    },
    2650
  );

}


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


function spawnZombieDeer(
  startX,
  playerOwned,
  target,
  index
) {

  const deer =
    document.createElement(
      "div"
    );


  deer.className =
    "effect zombie-deer deer-charge";


  deer.innerHTML =
    deerHTML();


  let x =
    startX;


  const direction =
    playerOwned
      ? 1
      : -1;


  deer.style.left =
    x +
    "px";


  deer.style.bottom =
    "30px";


  if (
    !playerOwned
  ) {

    deer.style.transform =
      "scaleX(-1)";

  }


  effects.appendChild(
    deer
  );


  const interval =
    setInterval(
      () => {

        x +=
          15 *
          direction;


        deer.style.left =
          x +
          "px";


        const targetX =
          fighterScreenX(
            target
          );


        if (
          Math.abs(
            x -
            targetX
          ) <
          45
        ) {

          clearInterval(
            interval
          );


          if (
            playerOwned
          ) {

            damageCPU(
              ZOMBIE_DEER_DAMAGE /
              2,
              {
                type:
                  "ultimate",

                ignoreBlock:
                  true
              }
            );

          }

          else {

            damagePlayer(
              ZOMBIE_DEER_DAMAGE /
              2,
              {
                type:
                  "ultimate",

                ignoreBlock:
                  true
              }
            );

          }


          deer.animate(
            [

              {
                transform:
                  !playerOwned
                    ? "scaleX(-1)"
                    : "translateX(0)"
              },

              {
                transform:
                  !playerOwned
                    ? "scaleX(-1) translateX(-25px)"
                    : "translateX(25px)"
              }

            ],

            {
              duration:
                180
            }
          );


          setTimeout(
            () => {

              deer.remove();

            },
            300
          );


          return;

        }


        if (
          x < -160 ||
          x >
            arena.clientWidth +
            160
        ) {

          clearInterval(
            interval
          );

          deer.remove();

        }

      },
      26
    );

}


/* =====================================================
   MARTIN ULTIMATE - CLYDE
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
  playerOwned
) {

  actionLock =
    true;


  const target =
    playerOwned
      ? cpuFighter
      : playerFighter;


  const owner =
    playerOwned
      ? playerFighter
      : cpuFighter;


  roundText.textContent =
    "CLYDE RETURNS!";


  createComicText(
    "CLYDE RETURNS!",
    "clyde-comic-text",
    1100
  );


  const grave =
    document.createElement(
      "div"
    );


  grave.className =
    "effect grave";


  grave.innerHTML = `
    <div class="grave-top">
      CLYDE
    </div>
  `;


  grave.style.left =
    fighterScreenX(
      owner
    ) +
    (
      playerOwned
        ? 70
        : -70
    ) +
    "px";


  grave.style.bottom =
    "24px";


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
        fighterScreenX(
          owner
        ) +
        (
          playerOwned
            ? 55
            : -45
        );


      const direction =
        playerOwned
          ? 1
          : -1;


      clyde.style.left =
        x +
        "px";


      clyde.style.bottom =
        "45px";


      if (
        !playerOwned
      ) {

        clyde.style.transform =
          "scaleX(-1)";

      }


      effects.appendChild(
        clyde
      );


      const interval =
        setInterval(
          () => {

            x +=
              13 *
              direction;


            clyde.style.left =
              x +
              "px";


            const targetX =
              fighterScreenX(
                target
              );


            if (
              Math.abs(
                x -
                targetX
              ) <
              40
            ) {

              clearInterval(
                interval
              );


              clyde.classList.add(
                "clyde-bite"
              );


              if (
                playerOwned
              ) {

                damageCPU(
                  CLYDE_DAMAGE,
                  {
                    type:
                      "ultimate",

                    ignoreBlock:
                      true
                  }
                );

              }

              else {

                damagePlayer(
                  CLYDE_DAMAGE,
                  {
                    type:
                      "ultimate",

                    ignoreBlock:
                      true
                  }
                );

              }


              setTimeout(
                () => {

                  clyde.remove();

                },
                350
              );


              return;

            }

          },
          28
        );

    },
    700
  );


  setTimeout(
    () => {

      grave.remove();

    },
    2100
  );


  setTimeout(
    () => {

      actionLock =
        false;


      roundText.textContent =
        "";

    },
    2300
  );

}


/* =====================================================
   CPU SPECIAL COOLDOWN
===================================================== */

function startCPUSpecialCooldown() {

  cpuSpecialCooldown =
    true;


  cpuSpecialReadyTime =
    Date.now() +
    SPECIAL_COOLDOWN;


  const thisRound =
    roundId;


  setTimeout(
    () => {

      if (
        thisRound !==
        roundId
      ) {

        return;

      }


      cpuSpecialCooldown =
        false;


      cpuSpecialReadyTime =
        0;

    },
    SPECIAL_COOLDOWN
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
    thisMatch !==
      matchId ||
    thisRound !==
      roundId ||
    roundOver ||
    gameOver ||
    !matchActive
  ) {

    return;

  }


  if (
    !canCPU()
  ) {

    setTimeout(
      () => {

        cpuLoop(
          thisMatch,
          thisRound
        );

      },
      150
    );


    return;

  }


  const currentDistance =
    distance();


  const roll =
    Math.random();


  const stats =
    NORMAL[
      cpuCharacter
    ];


  const martinBoss =
    challengeMode &&
    cpuCharacter ===
      "martin";


  /* Connor heal priority */

  if (
    cpuCharacter ===
      "connor" &&
    cpuUltimate >=
      100 &&
    cpuHealth <=
      cpuMaxHealth *
      0.58 &&
    roll <
      0.8
  ) {

    cpuUltimate =
      0;


    updateHUD();


    friedChickenFeast(
      false
    );

  }


  else if (
    cpuUltimate >=
      100 &&
    roll <
      (
        martinBoss
          ? 0.4
          : 0.31
      )
  ) {

    cpuUltimate =
      0;


    updateHUD();


    useUltimate(
      cpuCharacter,
      false
    );

  }


  else if (
    currentDistance >
      stats.range +
      10
  ) {

    cpuStep(
      martinBoss
        ? -34
        : -29
    );

  }


  else if (
    roll <
      (
        martinBoss
          ? 0.64
          : 0.58
      )
  ) {

    cpuNormalAttack();

  }


  else if (
    roll <
      (
        martinBoss
          ? 0.86
          : 0.79
      ) &&
    !cpuSpecialCooldown
  ) {

    startCPUSpecialCooldown();


    useSpecial(
      cpuCharacter,
      false
    );

  }


  else if (
    roll <
    0.92
  ) {

    cpuBlock();

  }


  else if (
    roll <
    0.97
  ) {

    jumpCPU();

  }


  else {

    cpuStep(
      -15
    );

  }


  const delay =
    martinBoss
      ? 315 +
        Math.random() *
        105
      : 395 +
        Math.random() *
        135;


  setTimeout(
    () => {

      cpuLoop(
        thisMatch,
        thisRound
      );

    },
    delay
  );

}


/* =====================================================
   KO CHECK
===================================================== */

function checkKO() {

  if (
    roundOver
  ) {

    return;

  }


  if (
    playerHealth <=
    0
  ) {

    finishRound(
      false
    );

  }


  else if (
    cpuHealth <=
    0
  ) {

    finishRound(
      true
    );

  }

}


/* =====================================================
   MARTIN UNLOCK BANNER
===================================================== */

function showMartinUnlockBanner() {

  const banner =
    document.createElement(
      "div"
    );


  banner.className =
    "unlock-banner";


  banner.innerHTML = `
    <span class="unlock-small">
      NEW FIGHTER UNLOCKED
    </span>

    <span class="unlock-big">
      MARTIN
    </span>
  `;


  effects.appendChild(
    banner
  );


  setTimeout(
    () => {

      banner.remove();

    },
    1600
  );

}


/* =====================================================
   FINISH ROUND
===================================================== */

function finishRound(
  playerWon
) {

  if (
    roundOver
  ) {

    return;

  }


  roundOver =
    true;

  fightStarted =
    false;

  actionLock =
    true;


  const loser =
    playerWon
      ? cpuFighter
      : playerFighter;


  const winner =
    playerWon
      ? selectedCharacter
      : cpuCharacter;


  if (
    playerWon
  ) {

    playerRoundWins++;

  }

  else {

    cpuRoundWins++;

  }


  updateRoundHUD();


  restoreStandingState(
    loser
  );


  loser.classList.add(
    "ko-loser"
  );


  setTimeout(
    () => {

      winnerText.textContent =
        displayName(
          winner
        ) +
        " WINS ROUND " +
        currentRound;


      koOverlay.classList.remove(
        "hidden"
      );


      /* MATCH OVER */

      if (
        playerRoundWins >=
          2 ||
        cpuRoundWins >=
          2
      ) {

        gameOver =
          true;


        matchActive =
          false;


        /* MARTIN CHALLENGE WIN */

        if (
          challengeMode &&
          playerRoundWins >=
            2
        ) {

          challengeResult =
            "won";


          unlockMartin();


          matchStatus.textContent =
            "MARTIN DEFEATED — FIGHTER UNLOCKED";


          newGameButton.textContent =
            "CONTINUE";


          showMartinUnlockBanner();


          newGameButton.classList.remove(
            "hidden"
          );


          return;

        }


        /* MARTIN CHALLENGE LOSS */

        if (
          challengeMode &&
          cpuRoundWins >=
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


        /* NORMAL MATCH */

        matchStatus.textContent =
          displayName(
            winner
          ) +
          " WINS THE MATCH";


        newGameButton.textContent =
          "NEW GAME";


        newGameButton.classList.remove(
          "hidden"
        );


        return;

      }


      /* NEXT ROUND */

      matchStatus.textContent =
        playerRoundWins +
        " - " +
        cpuRoundWins;


      setTimeout(
        () => {

          currentRound++;


          effects.innerHTML =
            "";


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
   NEW GAME BUTTON
===================================================== */

newGameButton.onclick = () => {

  matchId++;

  roundId++;

  matchActive =
    false;

  fightStarted =
    false;

  gameOver =
    false;

  roundOver =
    false;

  actionLock =
    false;


  effects.innerHTML =
    "";


  koOverlay.classList.add(
    "hidden"
  );


  /* LOST TO MARTIN */

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


  /* BEAT MARTIN */

  if (
    challengeMode &&
    challengeResult ===
      "won"
  ) {

    challengeMode =
      false;


    challengeResult =
      null;


    updateMartinUI();


    renderPreviews();


    generateTitleMatchup();


    fightButton.textContent =
      "FIGHT";


    showScreen(
      selectScreen
    );


    return;

  }


  /* NORMAL */

  challengeMode =
    false;


  challengeResult =
    null;


  fightButton.textContent =
    "FIGHT";


  updateMartinUI();


  generateTitleMatchup();


  showScreen(
    selectScreen
  );

};


/* =====================================================
   BUTTON CONTROLS
===================================================== */

attackButton.onclick =
  playerAttack;


specialButton.onclick =
  playerSpecial;


ultimateButton.onclick =
  playerUltimateAttack;


blockButton.onpointerdown =
  () => {

    setPlayerBlock(
      true
    );

  };


blockButton.onpointerup =
  () => {

    setPlayerBlock(
      false
    );

  };


blockButton.onpointerleave =
  () => {

    setPlayerBlock(
      false
    );

  };


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


    keys[
      key
    ] =
      true;


    /* JUMP */

    if (
      (
        key === "w" ||
        key === "arrowup" ||
        key === " "
      ) &&
      !event.repeat
    ) {

      jumpPlayer();

    }


    /* CROUCH */

    if (
      key === "s" ||
      key === "arrowdown"
    ) {

      crouchPlayer(
        true
      );

    }


    /* BLOCK */

    if (
      key === "i" &&
      !event.repeat
    ) {

      setPlayerBlock(
        true
      );

    }


    /* ATTACK */

    if (
      key === "j" &&
      !event.repeat
    ) {

      playerAttack();

    }


    /* SPECIAL */

    if (
      key === "k" &&
      !event.repeat
    ) {

      playerSpecial();

    }


    /* ULTIMATE */

    if (
      key === "l" &&
      !event.repeat
    ) {

      playerUltimateAttack();

    }

  }
);


document.addEventListener(
  "keyup",
  event => {

    const key =
      event.key.toLowerCase();


    keys[
      key
    ] =
      false;


    if (
      key === "s" ||
      key === "arrowdown"
    ) {

      crouchPlayer(
        false
      );

    }


    if (
      key === "i"
    ) {

      setPlayerBlock(
        false
      );

    }

  }
);


/* =====================================================
   MOVEMENT LOOP
===================================================== */

function movementLoop() {

  let moving =
    false;


  if (
    canPlayer()
  ) {

    if (
      keys["a"] ||
      keys["arrowleft"]
    ) {

      movePlayer(
        -6
      );


      moving =
        true;

    }


    if (
      keys["d"] ||
      keys["arrowright"]
    ) {

      movePlayer(
        6
      );


      moving =
        true;

    }

  }


  playerFighter.classList.toggle(
    "walking",
    moving &&
    !playerJumping &&
    !playerCrouching
  );


  requestAnimationFrame(
    movementLoop
  );

}


movementLoop();


/* =====================================================
   RESIZE
===================================================== */

window.addEventListener(
  "resize",
  () => {

    if (
      fightScreen.classList.contains(
        "active"
      )
    ) {

      updatePositions();

    }

  }
);


/* =====================================================
   FINAL INITIALIZATION
===================================================== */

updateMartinUI();

renderPreviews();

generateTitleMatchup();
