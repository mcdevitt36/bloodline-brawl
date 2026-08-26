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

const fighterCards = document.querySelectorAll(".fighter-card");
const martinCard = $("martinCard");
const mapCards = document.querySelectorAll(".map-card");
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
   ROSTER / BALANCE
===================================================== */

const BASE_ROSTER = [
  "brendan",
  "grandaddy",
  "connor",
  "erin",
  "shannan"
];

const ALL_ROSTER = [
  ...BASE_ROSTER,
  "martin"
];

const MAP_NAMES = {
  virginia: "SUBURBAN VIRGINIA",
  westhampton: "WESTHAMPTON BEACH",
  newcanaan: "NEW CANAAN",
  madrid: "MADRID"
};


/* =====================================================
   HEALTH
===================================================== */

const MAX_HEALTH = {
  brendan: 100,
  grandaddy: 100,
  connor: 100,
  erin: 100,
  shannan: 100,

  // Martin is deliberately tougher because he begins
  // as the unlockable boss character.
  martin: 115
};


/* =====================================================
   BASIC ATTACKS
===================================================== */

const NORMAL = {

  brendan: {
    damage: 5,
    range: 138,

    // Brendan's golf spam was too strong in earlier builds.
    // 800ms keeps the golf club from being spammed endlessly.
    recovery: 800,

    impact: 275,
    animation: 440
  },

  grandaddy: {
    // Final hammer damage we decided on.
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
    range: 96,
    recovery: 455,
    impact: 180,
    animation: 340
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

// Grandaddy ladder damage
const LADDER_DAMAGE = 10.5;

// Connor Paint Beast
const PAINT_BEAST_DAMAGE = 10;

// Erin Pimple Patch
const PIMPLE_PATCH_STUN = 1500;

// Shannan Brainrot gets same stun duration as Erin
const BRAINROT_STUN = 1500;

// Martin Dog Breath
const DOG_BREATH_STUN = 2000;

// Shannan UFO
const UFO_DAMAGE = 22;

// Martin / Clyde ultimate
const CLYDE_DAMAGE = 30;

// Brendan IPO
const IPO_HITS = [
  5,
  5,
  7
];

// Erin laundry ultimate
const LAUNDRY_HITS = [
  4,
  5,
  13
];

// Connor fried chicken restores 30 HP
const CONNOR_HEAL = 30;

// Grandaddy ultimate stun
const BACK_IN_MY_DAY_STUN = 3000;

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
   MARTIN UNLOCK SYSTEM
===================================================== */

function isMartinUnlocked() {

  return (
    localStorage.getItem("martinUnlocked") === "true"
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

  const unlocked = isMartinUnlocked();

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
   CHARACTER MODELS
===================================================== */

function characterHTML(c) {

  /* ---------------- BRENDAN ---------------- */

  if (c === "brendan") {

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


  /* ---------------- GRANDADDY ---------------- */

  if (c === "grandaddy") {

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


  /* ---------------- CONNOR ---------------- */

  if (c === "connor") {

    return `
      <div class="pixel-person connor-model">

        <div class="connor-hair"></div>

        <div class="face">

          <div class="eye eye-left"></div>
          <div class="eye eye-right"></div>

          <div class="mouth"></div>

        </div>

        <!-- Light beard / stubble -->
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


  /* ---------------- ERIN ---------------- */

  if (c === "erin") {

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


  /* ---------------- SHANNAN ---------------- */

  if (c === "shannan") {

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


  /* ---------------- MARTIN ---------------- */

  return `
    <div class="martin-model">

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

      <div class="martin-tail"></div>

      <div class="martin-leg leg-one"></div>
      <div class="martin-leg leg-two"></div>
      <div class="martin-leg leg-three"></div>
      <div class="martin-leg leg-four"></div>

    </div>
  `;

}


/* =====================================================
   CHARACTER DISPLAY NAMES
===================================================== */

function displayName(character) {

  const names = {

    brendan: "BRENDAN",
    grandaddy: "GRANDADDY",
    connor: "CONNOR",
    erin: "ERIN",
    shannan: "SHANNAN",
    martin: "MARTIN"

  };

  return names[character] || character.toUpperCase();

}


/* =====================================================
   ABILITY ICONS
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
    .forEach(s => s.classList.remove("active"));

  screen.classList.add("active");

}


/* =====================================================
   TITLE SCREEN RANDOM MATCHUP
===================================================== */

function generateTitleMatchup() {

  const roster = unlockedRoster();

  let left =
    roster[
      Math.floor(Math.random() * roster.length)
    ];

  let right =
    roster[
      Math.floor(Math.random() * roster.length)
    ];

  while (right === left) {

    right =
      roster[
        Math.floor(Math.random() * roster.length)
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
   PREVIEW MODELS
===================================================== */

function renderPreviews() {

  document
    .querySelectorAll("[data-preview]")
    .forEach(el => {

      const character =
        el.dataset.preview;

      el.innerHTML =
        characterHTML(character);

    });

  challengeMartinPreview.innerHTML =
    characterHTML("martin");

}


/* =====================================================
   INITIAL SETUP
===================================================== */

renderPreviews();
updateMartinUI();
generateTitleMatchup();


/* =====================================================
   START BUTTON
===================================================== */

startButton.onclick = () => {

  challengeMode = false;
  challengeResult = null;

  fightButton.textContent = "FIGHT";

  showScreen(selectScreen);

};


/* =====================================================
   NORMAL CHARACTER SELECT
===================================================== */

fighterCards.forEach(card => {

  card.addEventListener("click", () => {

    const character =
      card.dataset.character;

    /*
      Martin behaves differently while locked.
      Clicking him starts Martin's Challenge rather
      than selecting him normally.
    */
    if (
      character === "martin" &&
      !isMartinUnlocked()
    ) {

      openMartinChallenge();
      return;

    }

    challengeMode = false;

    selectedCharacter = character;

    fighterCards.forEach(c =>
      c.classList.remove("selected")
    );

    card.classList.add("selected");

    selectionText.textContent =
      "PLAYER: " +
      displayName(selectedCharacter);

  });

});


/* =====================================================
   MARTIN CHALLENGE
===================================================== */

function openMartinChallenge() {

  challengeMode = true;
  challengeResult = null;

  renderChallengeChoices();

  showScreen(challengeScreen);

}


martinChallengeButton.onclick = () => {

  /*
    Once Martin is unlocked, this button simply
    takes you to normal fighter selection where
    Martin is now available.
  */

  if (isMartinUnlocked()) {

    challengeMode = false;

    showScreen(selectScreen);

    return;

  }

  openMartinChallenge();

};


challengeBackButton.onclick = () => {

  challengeMode = false;

  showScreen(titleScreen);

};


function renderChallengeChoices() {

  challengeFighterGrid.innerHTML = "";

  BASE_ROSTER.forEach(character => {

    const button =
      document.createElement("button");

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

      mapCards.forEach(card => {

        card.classList.toggle(
          "selected",
          card.dataset.map ===
            selectedMap
        );

      });

      mapSelectionText.textContent =
        "MAP: " +
        MAP_NAMES[selectedMap];

      fightButton.textContent =
        "FIGHT MARTIN";

      showScreen(mapScreen);

    };

    challengeFighterGrid.appendChild(
      button
    );

  });

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

  showScreen(mapScreen);

};


mapCards.forEach(card => {

  card.addEventListener("click", () => {

    selectedMap =
      card.dataset.map;

    mapCards.forEach(c =>
      c.classList.remove("selected")
    );

    card.classList.add("selected");

    mapSelectionText.textContent =
      "MAP: " +
      MAP_NAMES[selectedMap];

  });

});


backToFighterButton.onclick = () => {

  if (challengeMode) {

    renderChallengeChoices();

    showScreen(challengeScreen);

  } else {

    showScreen(selectScreen);

  }

};


/* =====================================================
   CPU CHARACTER CHOICE
===================================================== */

function chooseCPUCharacter() {

  if (challengeMode) {

    cpuCharacter = "martin";

    return;

  }

  const roster =
    unlockedRoster()
      .filter(c =>
        c !== selectedCharacter
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
   MAP CLASSES
===================================================== */

function setArenaMap() {

  arena.className =
    "arena map-" +
    selectedMap;

  battleMapName.textContent =
    MAP_NAMES[selectedMap];

}


/* =====================================================
   FIGHTER MODEL SETUP
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

  currentRound = 1;

  playerRoundWins = 0;
  cpuRoundWins = 0;

  playerUltimate = 0;
  cpuUltimate = 0;

  gameOver = false;
  roundOver = false;

  actionLock = false;

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

  showScreen(fightScreen);

  koOverlay.classList.add("hidden");

  newGameButton.classList.add("hidden");

  matchStatus.textContent = "";

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
   START ROUND
===================================================== */

function startRound() {

  roundId++;

  const thisMatch =
    matchId;

  const thisRound =
    roundId;

  roundOver = false;
  fightStarted = false;

  actionLock = true;

  playerHealth =
    playerMaxHealth;

  cpuHealth =
    cpuMaxHealth;

  playerBlocking = false;
  cpuBlocking = false;

  playerStunned = false;
  cpuStunned = false;

  playerCrouching = false;
  cpuCrouching = false;

  playerJumping = false;
  cpuJumping = false;

  playerAttackCooldown = false;
  cpuAttackCooldown = false;

  specialCooldown = false;
  cpuSpecialCooldown = false;

  playerSpecialReadyTime = 0;
  cpuSpecialReadyTime = 0;

  playerX = Math.max(
    40,
    arena.clientWidth * 0.19
  );

  cpuX = Math.min(
    arena.clientWidth - 110,
    arena.clientWidth * 0.73
  );

  restoreStandingState(
    playerFighter
  );

  restoreStandingState(
    cpuFighter
  );

  updatePositions();

  updateHUD();

  updateRoundHUD();

  battleIntroRound.textContent =
    "ROUND " +
    currentRound;

  battleIntroWord.textContent =
    "READY...";

  battleIntro.classList.remove(
    "hidden"
  );

  /*
    READY...
  */
  setTimeout(() => {

    if (
      thisMatch !== matchId ||
      thisRound !== roundId
    ) return;

    battleIntroWord.textContent =
      "BEGIN!";

  }, 900);


  /*
    BEGIN!
  */
  setTimeout(() => {

    if (
      thisMatch !== matchId ||
      thisRound !== roundId
    ) return;

    battleIntro.classList.add(
      "hidden"
    );

    fightStarted = true;
    matchActive = true;
    actionLock = false;

    cpuLoop(
      thisMatch,
      thisRound
    );

  }, 1650);

}


/* =====================================================
   HEALTH / ULTIMATE HUD
===================================================== */

function updateHUD() {

  const playerPercent =
    Math.max(
      0,
      playerHealth /
      playerMaxHealth *
      100
    );

  const cpuPercent =
    Math.max(
      0,
      cpuHealth /
      cpuMaxHealth *
      100
    );

  playerHealthBar.style.width =
    playerPercent + "%";

  cpuHealthBar.style.width =
    cpuPercent + "%";

  playerUltimateBar.style.width =
    Math.min(
      100,
      playerUltimate
    ) + "%";

  cpuUltimateBar.style.width =
    Math.min(
      100,
      cpuUltimate
    ) + "%";

  playerUltimateOrb.classList.toggle(
    "ready",
    playerUltimate >= 100
  );

  cpuUltimateOrb.classList.toggle(
    "ready",
    cpuUltimate >= 100
  );

  playerSpecialOrb.classList.toggle(
    "cooldown",
    specialCooldown
  );

  cpuSpecialOrb.classList.toggle(
    "cooldown",
    cpuSpecialCooldown
  );

}


/* =====================================================
   FIGHTER POSITION
===================================================== */

function updatePositions() {

  const maxX =
    arena.clientWidth - 90;

  playerX =
    Math.max(
      5,
      Math.min(
        playerX,
        maxX
      )
    );

  cpuX =
    Math.max(
      5,
      Math.min(
        cpuX,
        maxX
      )
    );

  /*
    Prevent fighters from passing completely
    through each other.
  */

  if (
    playerX + 58 >
    cpuX
  ) {

    const middle =
      (playerX + cpuX) / 2;

    playerX =
      middle - 31;

    cpuX =
      middle + 31;

  }

  playerFighter.style.left =
    playerX + "px";

  cpuFighter.style.left =
    cpuX + "px";

}


/* =====================================================
   DISTANCE
===================================================== */

function distance() {

  return Math.abs(
    cpuX - playerX
  );

}


/* =====================================================
   CAN PLAYER / CPU ACT?
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

function movePlayer(amount) {

  if (!canPlayer()) return;

  if (playerBlocking) return;

  if (playerCrouching) return;

  playerX += amount;

  updatePositions();

}


function cpuStep(amount) {

  if (!canCPU()) return;

  if (cpuBlocking) return;

  /*
    Negative means CPU moves toward player.
  */

  cpuX += amount;

  updatePositions();

}


/* =====================================================
   JUMP
===================================================== */

function jumpPlayer() {

  if (!canPlayer()) return;

  if (playerJumping) return;

  if (playerCrouching) return;

  playerJumping = true;

  playerFighter.classList.add(
    "jumping"
  );

  setTimeout(() => {

    playerFighter.classList.remove(
      "jumping"
    );

    playerJumping = false;

  }, 620);

}


function jumpCPU() {

  if (!canCPU()) return;

  if (cpuJumping) return;

  cpuJumping = true;

  cpuFighter.classList.add(
    "jumping"
  );

  setTimeout(() => {

    cpuFighter.classList.remove(
      "jumping"
    );

    cpuJumping = false;

  }, 620);

}


/* =====================================================
   CROUCH
===================================================== */

function crouchPlayer(on) {

  if (!fightStarted) return;

  if (playerStunned) return;

  playerCrouching = on;

  playerFighter.classList.toggle(
    "crouching",
    on
  );

}


/* =====================================================
   BLOCK
===================================================== */

function setPlayerBlock(on) {

  if (!fightStarted) return;

  if (roundOver) return;

  if (playerStunned) return;

  playerBlocking = on;

  playerFighter.classList.toggle(
    "blocking",
    on
  );

}


function cpuBlock() {

  if (!canCPU()) return;

  cpuBlocking = true;

  cpuFighter.classList.add(
    "blocking"
  );

  setTimeout(() => {

    cpuBlocking = false;

    cpuFighter.classList.remove(
      "blocking"
    );

  }, 430);

}


/* =====================================================
   RESTORE CHARACTER STATE
===================================================== */

function restoreStandingState(
  fighter
) {

  fighter.classList.remove(
    "attacking",
    "special-attacking",
    "ultimate-attacking",
    "blocking",
    "crouching",
    "jumping",
    "stunned",
    "hit",
    "ko-loser"
  );

  if (
    fighter === playerFighter
  ) {

    playerBlocking = false;
    playerCrouching = false;
    playerJumping = false;

  } else {

    cpuBlocking = false;
    cpuCrouching = false;
    cpuJumping = false;

  }

}
/* =====================================================
   EFFECT HELPERS
===================================================== */

function fighterScreenX(
  fighter
) {

  return parseFloat(
    fighter.style.left
  ) || 0;

}


function createEffect(
  className,
  left,
  bottom
) {

  const effect =
    document.createElement(
      "div"
    );

  effect.className =
    "effect " +
    className;

  effect.style.left =
    left + "px";

  effect.style.bottom =
    bottom + "px";

  effects.appendChild(
    effect
  );

  return effect;

}


function createComicText(
  text,
  className = "comic-callout",
  duration = 1000
) {

  const callout =
    document.createElement(
      "div"
    );

  callout.className =
    className;

  callout.textContent =
    text;

  effects.appendChild(
    callout
  );

  setTimeout(
    () => {

      callout.remove();

    },
    duration
  );

}


function createHitSpark(
  fighter,
  type = "normal"
) {

  const spark =
    document.createElement(
      "div"
    );

  let sparkClass =
    "hit-spark-normal";

  if (
    type === "special"
  ) {

    sparkClass =
      "hit-spark-special";

  }

  if (
    type === "ultimate"
  ) {

    sparkClass =
      "hit-spark-ultimate";

  }

  spark.className =
    "effect " +
    sparkClass;

  spark.style.left =
    fighterScreenX(
      fighter
    ) +
    30 +
    "px";

  spark.style.bottom =
    "105px";

  effects.appendChild(
    spark
  );

  setTimeout(
    () => {

      spark.remove();

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

    if (
      type === "special"
    ) {

      finalDamage *=
        0.5;

    }

    else {

      finalDamage *=
        0.2;

    }

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

    if (
      type === "special"
    ) {

      finalDamage *=
        0.5;

    }

    else {

      finalDamage *=
        0.2;

    }

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
   ATTACK ANIMATION
===================================================== */

function weaponSwing(
  fighter,
  duration
) {

  const fighterModel =
    fighter.querySelector(
      ".pixel-person, .martin-model"
    );

  if (
    !fighterModel
  ) {

    return;

  }

  fighterModel.classList.remove(
    "weapon-attacking"
  );

  void fighterModel.offsetWidth;

  fighterModel.classList.add(
    "weapon-attacking"
  );

  setTimeout(
    () => {

      fighterModel.classList.remove(
        "weapon-attacking"
      );

    },
    duration
  );

}


/* =====================================================
   BASIC ATTACK - PLAYER
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


/* =====================================================
   BASIC ATTACK - CPU
===================================================== */

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
    character === "martin"
  ) {

    dogBreath(
      playerOwned
    );

  }

}


/* =====================================================
   BRENDAN SPECIAL - BIG DRIVE
===================================================== */

function bigDrive(
  playerOwned
) {

  const fighter =
    playerOwned
      ? playerFighter
      : cpuFighter;

  const fighterModel =
    fighter.querySelector(
      ".brendan-model"
    );

  if (
    fighterModel
  ) {

    fighterModel.classList.add(
      "special-swing"
    );

    setTimeout(
      () => {

        fighterModel.classList.remove(
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
    x + "px";

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
          x + "px";

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
   GRANDADDY SPECIAL - LADDER
===================================================== */

function grandaddyLadder(
  playerOwned
) {

  if (
    roundOver
  ) {

    return;

  }

  const grandaddy =
    playerOwned
      ? playerFighter
      : cpuFighter;

  const opponent =
    playerOwned
      ? cpuFighter
      : playerFighter;

  const opponentMotion =
    opponent.querySelector(
      ".motion-layer"
    );

  actionLock =
    true;

  restoreStandingState(
    opponent
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
      opponent
    ) -
    5 +
    "px";

  ladder.style.bottom =
    "20px";

  effects.appendChild(
    ladder
  );

  opponentMotion.animate(
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

      opponentMotion.animate(
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
        opponent
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
   CONNOR SPECIAL - PAINT BEAST
===================================================== */

function paintBeast(
  playerOwned
) {

  const fighter =
    playerOwned
      ? playerFighter
      : cpuFighter;

  const fighterModel =
    fighter.querySelector(
      ".connor-model"
    );

  if (
    fighterModel
  ) {

    fighterModel.classList.add(
      "special-swing"
    );

  }

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

  /*
    Slower formation than the original.
  */
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
        x + "px";

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

      dinosaur.animate(
        [

          {
            opacity:
              0,

            transform:
              playerOwned
                ? "scale(.45)"
                : "scaleX(-1) scale(.45)"
          },

          {
            opacity:
              1,

            transform:
              playerOwned
                ? "scale(1)"
                : "scaleX(-1) scale(1)"
          }

        ],

        {

          duration:
            500,

          easing:
            "ease-out"

        }
      );

      /*
        Dinosaur deliberately moves slower now.
      */
      const interval =
        setInterval(
          () => {

            x +=
              10 *
              direction;

            dinosaur.style.left =
              x + "px";

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
                220
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

      if (
        fighterModel
      ) {

        fighterModel.classList.remove(
          "special-swing"
        );

      }

      roundText.textContent =
        "";

    },
    1900
  );

}


/* =====================================================
   ERIN SPECIAL - PIMPLE PATCH
===================================================== */

function pimplePatch(
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

  roundText.textContent =
    "PIMPLE PATCH!";

  createComicText(
    "PIMPLE PATCH ATTACK",
    "pimple-comic-callout",
    1100
  );

  const fighterModel =
    fighter.querySelector(
      ".erin-model"
    );

  if (
    fighterModel
  ) {

    fighterModel.classList.add(
      "special-swing"
    );

  }

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
    x + "px";

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
          x + "px";

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

          applyPimpleStun(
            target,
            playerOwned
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

      if (
        fighterModel
      ) {

        fighterModel.classList.remove(
          "special-swing"
        );

      }

      roundText.textContent =
        "";

    },
    900
  );

}


function applyPimpleStun(
  target,
  playerOwned
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

  const stuck =
    document.createElement(
      "div"
    );

  stuck.className =
    "effect pimple-stuck";

  stuck.style.left =
    fighterScreenX(
      target
    ) +
    5 +
    "px";

  stuck.style.bottom =
    "65px";

  effects.appendChild(
    stuck
  );

  const label =
    document.createElement(
      "div"
    );

  label.className =
    "effect stun-label";

  label.textContent =
    "STUCK!";

  label.style.left =
    fighterScreenX(
      target
    ) +
    12 +
    "px";

  label.style.bottom =
    "205px";

  effects.appendChild(
    label
  );

  setTimeout(
    () => {

      stuck.remove();

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
    PIMPLE_PATCH_STUN
  );

}


/* =====================================================
   SHANNAN SPECIAL - BRAINROT
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
    "BRAINROT!",
    "brainrot-callout",
    1200
  );

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

  /*
    Fake vertical reel cards fly around the target.
    No Instagram logos are needed.
  */
  for (
    let i = 0;
    i < 4;
    i++
  ) {

    const reel =
      document.createElement(
        "div"
      );

    reel.className =
      "effect brainrot-reel";

    reel.innerHTML =
      `
        <div class="reel-top"></div>
        <div class="reel-video"></div>
        <div class="reel-lines"></div>
      `;

    reel.style.left =
      fighterScreenX(
        target
      ) +
      (
        i * 25 -
        25
      ) +
      "px";

    reel.style.bottom =
      95 +
      (
        i % 2
      ) *
      55 +
      "px";

    effects.appendChild(
      reel
    );

    reel.animate(
      [

        {
          transform:
            "scale(.25) rotate(-15deg)",

          opacity:
            0
        },

        {
          transform:
            "scale(1) rotate(8deg)",

          opacity:
            1
        },

        {
          transform:
            "translateY(-35px) rotate(-8deg)",

          opacity:
            1
        }

      ],

      {

        duration:
          BRAINROT_STUN,

        fill:
          "forwards"

      }
    );

    setTimeout(
      () => {

        reel.remove();

      },
      BRAINROT_STUN +
      50
    );

  }

  setTimeout(
    () => {

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

      roundText.textContent =
        "";

    },
    BRAINROT_STUN
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
    950
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
        ? 55
        : -55
    ) +
    "px";

  cloud.style.bottom =
    "70px";

  effects.appendChild(
    cloud
  );

  cloud.animate(
    [

      {
        transform:
          "scale(.3)",

        opacity:
          0
      },

      {
        transform:
          "scale(1)",

        opacity:
          1
      },

      {
        transform:
          playerOwned
            ? "translateX(70px) scale(1.35)"
            : "translateX(-70px) scale(1.35)",

        opacity:
          0.85
      }

    ],

    {

      duration:
        450,

      fill:
        "forwards",

      easing:
        "ease-out"

    }
  );

  setTimeout(
    () => {

      cloud.remove();

      if (
        distance() >
        150
      ) {

        roundText.textContent =
          "";

        return;

      }

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
        "STUNNED!";

      label.style.left =
        fighterScreenX(
          target
        ) +
        8 +
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
        DOG_BREATH_STUN
      );

    },
    430
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

    backInMyDay(
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

          /*
            Text stays on-screen longer now.
          */
          setTimeout(
            () => {

              card.remove();

            },
            750
          );

        },

        /*
          Original spacing slowed about 1.75x.
        */
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
   GRANDADDY ULTIMATE - BACK IN MY DAY
===================================================== */

function backInMyDay(
  playerOwned
) {

  actionLock =
    true;

  const target =
    playerOwned
      ? cpuFighter
      : playerFighter;

  roundText.textContent =
    "BACK IN MY DAY...";

  createComicText(
    "BACK IN MY DAY...",
    "grandaddy-ultimate-text",
    950
  );

  setTimeout(
    () => {

      actionLock =
        false;

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
        "STUNNED!";

      label.style.left =
        fighterScreenX(
          target
        ) +
        8 +
        "px";

      label.style.bottom =
        "220px";

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

          roundText.textContent =
            "";

        },
        BACK_IN_MY_DAY_STUN
      );

    },
    500
  );

}


/* =====================================================
   CONNOR ULTIMATE - FRIED CHICKEN
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

      /*
        Exactly +30 HP,
        capped at max health.
      */
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

      const healText =
        document.createElement(
          "div"
        );

      healText.className =
        "effect heal-text";

      healText.textContent =
        "+30 HP";

      healText.style.left =
        fighterScreenX(
          fighter
        ) +
        8 +
        "px";

      healText.style.bottom =
        "180px";

      effects.appendChild(
        healText
      );

      setTimeout(
        () => {

          healText.remove();

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
   ERIN ULTIMATE - LAUNDRY AVALANCHE
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

  createComicText(
    "LAUNDRY AVALANCHE!",
    "laundry-comic-text",
    950
  );

  const firstClothes = [
    "👕",
    "🧦"
  ];

  firstClothes.forEach(
    (
      clothing,
      index
    ) => {

      setTimeout(
        () => {

          if (
            roundOver
          ) {

            return;

          }

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

              setTimeout(
                () => {

                  item.remove();

                },
                220
              );

            },
            470
          );

        },
        index *
        520
      );

    }
  );

  /*
    Tight final pile.
  */
  setTimeout(
    () => {

      if (
        roundOver
      ) {

        return;

      }

      const pile =
        document.createElement(
          "div"
        );

      pile.className =
        "effect laundry-pile-box";

      pile.innerHTML =
        `
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

          setTimeout(
            () => {

              pile.remove();

            },
            600
          );

        },
        520
      );

    },
    1040
  );

  setTimeout(
    () => {

      restoreStandingState(
        target
      );

      updatePositions();

      actionLock =
        false;

      roundText.textContent =
        "";

    },
    2250
  );

}


/* =====================================================
   SHANNAN ULTIMATE - FLYING SAUCER
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
    "FLYING SAUCER!";

  createComicText(
    "FLYING SAUCER!",
    "ufo-comic-text",
    1000
  );

  const ufo =
    document.createElement(
      "div"
    );

  ufo.className =
    "effect ufo";

  ufo.innerHTML =
    `
      <div class="ufo-dome"></div>
      <div class="ufo-body"></div>
      <div class="ufo-light light-one"></div>
      <div class="ufo-light light-two"></div>
      <div class="ufo-light light-three"></div>
    `;

  ufo.style.left =
    "-160px";

  ufo.style.top =
    "45px";

  effects.appendChild(
    ufo
  );

  const targetX =
    Math.max(
      50,
      Math.min(
        arena.clientWidth -
        160,
        fighterScreenX(
          target
        ) -
        25
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
          `translateX(${targetX + 160}px)`
      }

    ],

    {

      duration:
        700,

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
        "95px";

      effects.appendChild(
        beam
      );

      beam.animate(
        [

          {
            transform:
              "scaleY(.05)",

            opacity:
              0
          },

          {
            transform:
              "scaleY(1)",

            opacity:
              0.95
          }

        ],

        {

          duration:
            330,

          fill:
            "forwards",

          transformOrigin:
            "top center"

        }
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
        320
      );

      setTimeout(
        () => {

          beam.remove();

        },
        900
      );

    },
    760
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
              "translateX(500px)",

            opacity:
              0
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
    1550
  );

  setTimeout(
    () => {

      ufo.remove();

      actionLock =
        false;

      roundText.textContent =
        "";

    },
    2200
  );

}


/* =====================================================
   CLYDE MODEL
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


/* =====================================================
   MARTIN ULTIMATE - CLYDE RETURNS
===================================================== */

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

  grave.innerHTML =
    `
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
        "forwards",

      easing:
        "ease-out"

    }
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

      clyde.animate(
        [

          {
            transform:
              playerOwned
                ? "translateY(55px)"
                : "scaleX(-1) translateY(55px)",

            opacity:
              0
          },

          {
            transform:
              playerOwned
                ? "translateY(0)"
                : "scaleX(-1) translateY(0)",

            opacity:
              1
          }

        ],

        {

          duration:
            450,

          easing:
            "ease-out"

        }
      );

      setTimeout(
        () => {

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

                if (
                  x < -130 ||
                  x >
                    arena.clientWidth +
                    130
                ) {

                  clearInterval(
                    interval
                  );

                  clyde.remove();

                }

              },
              28
            );

        },
        300
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

  /*
    Martin is slightly tougher when he is
    being fought as the locked boss.

    Once Martin is unlocked and appears as a
    normal CPU, he uses normal CPU difficulty.
  */
  const martinBoss =
    challengeMode &&
    cpuCharacter ===
      "martin";


  /* ===================================================
     CONNOR HEAL PRIORITY
  =================================================== */

  if (
    cpuCharacter ===
      "connor" &&
    cpuUltimate >=
      100 &&
    cpuHealth <=
      cpuMaxHealth *
      0.58 &&
    roll <
      0.78
  ) {

    cpuUltimate =
      0;

    updateHUD();

    friedChickenFeast(
      false
    );

  }


  /* ===================================================
     CPU ULTIMATE
  =================================================== */

  else if (
    cpuUltimate >=
      100 &&
    roll <
      (
        martinBoss
          ? 0.38
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


  /* ===================================================
     MOVE TOWARD PLAYER
  =================================================== */

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


  /* ===================================================
     BASIC ATTACK
  =================================================== */

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


  /* ===================================================
     SPECIAL ATTACK
  =================================================== */

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


  /* ===================================================
     BLOCK
  =================================================== */

  else if (
    roll <
    0.92
  ) {

    cpuBlock();

  }


  /* ===================================================
     JUMP
  =================================================== */

  else if (
    roll <
    0.97
  ) {

    jumpCPU();

  }


  /* ===================================================
     SMALL POSITION ADJUSTMENT
  =================================================== */

  else {

    cpuStep(
      -15
    );

  }


  /*
    Martin's challenge AI acts a touch faster.

    Normal CPU stays close to the difficulty
    you already had.
  */

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

  banner.innerHTML =
    `
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


      /* ===============================================
         MATCH OVER
      =============================================== */

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


        /* =============================================
           MARTIN CHALLENGE WIN
        ============================================= */

        if (
          challengeMode &&
          playerRoundWins >=
            2
        ) {

          challengeResult =
            "won";

          /*
            THIS is what permanently unlocks Martin
            on this browser.
          */

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


        /* =============================================
           MARTIN CHALLENGE LOSS
        ============================================= */

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


        /* =============================================
           NORMAL MATCH
        ============================================= */

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


      /* ===============================================
         NEXT ROUND
      =============================================== */

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
   NEW GAME / CHALLENGE RESULTS
===================================================== */

newGameButton.onclick =
  () => {

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


    /* ===============================================
       LOST TO MARTIN
    =============================================== */

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


    /* ===============================================
       BEAT MARTIN
    =============================================== */

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


    /* ===============================================
       NORMAL NEW GAME
    =============================================== */

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
   SPECIAL / ULTIMATE ORB DISPLAY
===================================================== */

function updateAbilityOrbs() {

  /*
    SPECIAL
  */

  const playerSpecialPercent =
    specialCooldown

      ? 1 -
        Math.max(
          0,
          playerSpecialReadyTime -
          Date.now()
        ) /
        SPECIAL_COOLDOWN

      : 1;


  const cpuSpecialPercent =
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
      playerSpecialPercent
    ) *
    360 +
    "deg"
  );


  cpuSpecialOrb.style.setProperty(
    "--fill",
    Math.max(
      0,
      cpuSpecialPercent
    ) *
    360 +
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


  /*
    ULTIMATE
  */

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
   KEYBOARD - KEY DOWN
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
      ]
      .includes(
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


    /* BASIC ATTACK */

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


/* =====================================================
   KEYBOARD - KEY UP
===================================================== */

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
   PLAYER MOVEMENT LOOP
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
   WINDOW RESIZE
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
