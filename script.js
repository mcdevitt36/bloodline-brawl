const $ =
  id =>
    document.getElementById(
      id
    );


/* =====================================================
   ELEMENTS
===================================================== */

const titleScreen =
  $("titleScreen");

const selectScreen =
  $("selectScreen");

const mapScreen =
  $("mapScreen");

const fightScreen =
  $("fightScreen");


const startButton =
  $("startButton");

const mapSelectButton =
  $("mapSelectButton");

const backToFighterButton =
  $("backToFighterButton");

const fightButton =
  $("fightButton");


const fighterCards =
  document.querySelectorAll(
    ".fighter-card"
  );

const mapCards =
  document.querySelectorAll(
    ".map-card"
  );


const selectionText =
  $("selectionText");

const mapSelectionText =
  $("mapSelectionText");


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


const playerFighter =
  $("playerFighter");

const cpuFighter =
  $("cpuFighter");


const playerModelSlot =
  playerFighter.querySelector(
    ".fighter-model-slot"
  );

const cpuModelSlot =
  cpuFighter.querySelector(
    ".fighter-model-slot"
  );


const playerName =
  $("playerName");

const cpuName =
  $("cpuName");


const playerHealthBar =
  $("playerHealth");

const cpuHealthBar =
  $("cpuHealth");


const playerDamageTrail =
  $("playerDamageTrail");

const cpuDamageTrail =
  $("cpuDamageTrail");


const playerUltimateBar =
  $("playerUltimate");

const cpuUltimateBar =
  $("cpuUltimate");


const roundScore =
  $("roundScore");

const roundLabel =
  $("roundLabel");

const roundText =
  $("roundText");


const blockButton =
  $("blockButton");

const attackButton =
  $("attackButton");

const specialButton =
  $("specialButton");

const ultimateButton =
  $("ultimateButton");


const koOverlay =
  $("koOverlay");

const winnerText =
  $("winnerText");

const matchStatus =
  $("matchStatus");

const newGameButton =
  $("newGameButton");


const playerSpecialOrb =
  $("playerSpecialOrb");

const playerUltimateOrb =
  $("playerUltimateOrb");

const cpuSpecialOrb =
  $("cpuSpecialOrb");

const cpuUltimateOrb =
  $("cpuUltimateOrb");


const playerSpecialIcon =
  $("playerSpecialIcon");

const playerUltimateIcon =
  $("playerUltimateIcon");

const cpuSpecialIcon =
  $("cpuSpecialIcon");

const cpuUltimateIcon =
  $("cpuUltimateIcon");


/* =====================================================
   ROSTER
===================================================== */

const CHARACTERS = [
  "brendan",
  "grandaddy",
  "connor",
  "erin"
];


/* =====================================================
   MAPS
===================================================== */

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
   BALANCE
===================================================== */

const MAX_HEALTH =
  100;


const NORMAL = {

  brendan: {

    damage:
      5,

    range:
      138,

    recovery:
      800,

    impact:
      275,

    animation:
      440

  },


  grandaddy: {

    damage:
      5.75,

    range:
      108,

    recovery:
      375,

    impact:
      175,

    animation:
      330

  },


  connor: {

    damage:
      5.5,

    range:
      122,

    recovery:
      530,

    impact:
      220,

    animation:
      390

  },


  erin: {

    damage:
      4.5,

    range:
      88,

    recovery:
      430,

    impact:
      165,

    animation:
      340

  }

};


const BIG_DRIVE_DAMAGE =
  10;


const LADDER_DAMAGE =
  10.5;


const PAINT_BEAST_DAMAGE =
  10;


const PIMPLE_PATCH_STUN =
  1500;


const IPO_HITS = [
  5,
  5,
  7
];


/*
Erin was 17 total.

Now +5 stronger.

4 + 5 + 13 = 22 total
*/

const LAUNDRY_HITS = [
  4,
  5,
  13
];


const CONNOR_HEAL =
  30;


const BACK_IN_MY_DAY_STUN =
  3000;


const SPECIAL_COOLDOWN =
  5000;


const METER_ON_HIT =
  14;


const METER_ON_DAMAGE =
  7;


/* =====================================================
   STATE
===================================================== */

let selectedCharacter =
  "brendan";


let cpuCharacter =
  "grandaddy";


let selectedMap =
  "virginia";


let currentRound =
  1;


let playerRoundWins =
  0;


let cpuRoundWins =
  0;


let playerHealth =
  100;


let cpuHealth =
  100;


let playerUltimate =
  0;


let cpuUltimate =
  0;


let playerX =
  40;


let cpuX =
  700;


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


let playerJumping =
  false;


let cpuJumping =
  false;


let playerCrouching =
  false;


let cpuCrouching =
  false;


let playerBlocking =
  false;


let cpuBlocking =
  false;


let playerStunned =
  false;


let cpuStunned =
  false;


let playerAttackCooldown =
  false;


let cpuAttackCooldown =
  false;


let specialCooldown =
  false;


let cpuSpecialCooldown =
  false;


let playerSpecialReadyTime =
  0;


let cpuSpecialReadyTime =
  0;


const keys = {};


/* =====================================================
   CHARACTER HTML
===================================================== */

function characterHTML(
  character
) {

  if (
    character ===
    "brendan"
  ) {

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


  if (
    character ===
    "grandaddy"
  ) {

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


  if (
    character ===
    "connor"
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


/* =====================================================
   CHARACTER SELECT PREVIEWS
===================================================== */

document
  .querySelectorAll(
    "[data-preview]"
  )
  .forEach(
    element => {

      element.innerHTML =
        characterHTML(
          element.dataset.preview
        );

    }
  );


/* =====================================================
   RANDOM TITLE MATCHUP
===================================================== */

function generateTitleMatchup() {

  const left =
    CHARACTERS[
      Math.floor(
        Math.random() *
        CHARACTERS.length
      )
    ];


  const remaining =
    CHARACTERS.filter(
      character =>
        character !== left
    );


  const right =
    remaining[
      Math.floor(
        Math.random() *
        remaining.length
      )
    ];


  titleLeftCharacter.innerHTML =
    characterHTML(
      left
    );


  titleRightCharacter.innerHTML =
    characterHTML(
      right
    );


  titleLeftName.textContent =
    left.toUpperCase();


  titleRightName.textContent =
    right.toUpperCase();

}


generateTitleMatchup();


/* =====================================================
   SCREEN MANAGEMENT
===================================================== */

function showScreen(
  screen
) {

  [
    titleScreen,
    selectScreen,
    mapScreen,
    fightScreen
  ]
  .forEach(
    item => {

      item.classList.remove(
        "active"
      );

    }
  );


  screen.classList.add(
    "active"
  );

}


/* =====================================================
   TITLE
===================================================== */

startButton.onclick =
  () => {

    showScreen(
      selectScreen
    );

  };


/* =====================================================
   CHARACTER SELECT
===================================================== */

fighterCards.forEach(
  card => {

    card.onclick =
      () => {

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


        selectedCharacter =
          card.dataset.character;


        selectionText.textContent =
          "PLAYER: " +
          selectedCharacter.toUpperCase();

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
          other => {

            other.classList.remove(
              "selected"
            );

          }
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


fightButton.onclick =
  startMatch;


/* =====================================================
   HELPERS
===================================================== */

function motion(
  fighter
) {

  return fighter.querySelector(
    ".motion-layer"
  );

}


function model(
  fighter
) {

  return fighter.querySelector(
    ".pixel-person"
  );

}


function fighterX(
  fighter
) {

  return parseFloat(
    fighter.style.left
  ) || 0;

}


function distance() {

  return Math.abs(
    playerX -
    cpuX
  );

}


function clamp() {

  const max =
    arena.clientWidth -
    100;


  playerX =
    Math.max(
      0,
      Math.min(
        max,
        playerX
      )
    );


  cpuX =
    Math.max(
      0,
      Math.min(
        max,
        cpuX
      )
    );

}


function updatePositions() {

  playerFighter.style.left =
    playerX +
    "px";


  cpuFighter.style.left =
    cpuX +
    "px";

}


/* =====================================================
   STANDING RESET
===================================================== */

function restoreStandingState(
  fighter
) {

  const motionLayer =
    motion(
      fighter
    );


  const visualLayer =
    fighter.querySelector(
      ".visual-layer"
    );


  const fighterModel =
    model(
      fighter
    );


  [
    motionLayer,
    visualLayer
  ]
  .forEach(
    element => {

      if (
        !element
      ) {
        return;
      }


      element
        .getAnimations()
        .forEach(
          animation => {

            animation.cancel();

          }
        );


      element.style.animation =
        "none";


      element.style.transform =
        "translate3d(0,0,0)";


      void element.offsetWidth;


      element.style.animation =
        "";

    }
  );


  fighter.classList.remove(
    "walking",
    "jumping",
    "crouching",
    "hit-animation",
    "stunned",
    "ko-loser"
  );


  if (
    fighterModel
  ) {

    fighterModel.classList.remove(
      "blocking",
      "weapon-attacking",
      "special-swing",
      "hammer-pointing"
    );

  }


  fighter.style.bottom =
    "25px";

}


/* =====================================================
   MAP
===================================================== */

function applyMap() {

  arena.className =
    "arena map-" +
    selectedMap;


  battleMapName.textContent =
    MAP_NAMES[
      selectedMap
    ];

}


/* =====================================================
   RANDOM CPU
===================================================== */

function chooseCPU() {

  const available =
    CHARACTERS.filter(
      character =>
        character !==
        selectedCharacter
    );


  return available[
    Math.floor(
      Math.random() *
      available.length
    )
  ];

}


/* =====================================================
   ICONS
===================================================== */

function icons(
  character
) {

  if (
    character ===
    "grandaddy"
  ) {

    return {

      special:
        "🪜",

      ultimate:
        "💬"

    };

  }


  if (
    character ===
    "connor"
  ) {

    return {

      special:
        "🎨",

      ultimate:
        "🍗"

    };

  }


  if (
    character ===
    "erin"
  ) {

    return {

      special:
        "🩹",

      ultimate:
        "👕"

    };

  }


  return {

    special:
      "⛳",

    ultimate:
      "📈"

  };

}


function setIcons() {

  const playerIcons =
    icons(
      selectedCharacter
    );


  const cpuIcons =
    icons(
      cpuCharacter
    );


  playerSpecialIcon.textContent =
    playerIcons.special;


  playerUltimateIcon.textContent =
    playerIcons.ultimate;


  cpuSpecialIcon.textContent =
    cpuIcons.special;


  cpuUltimateIcon.textContent =
    cpuIcons.ultimate;

}


/* =====================================================
   START MATCH
===================================================== */

function startMatch() {

  matchId++;


  playerRoundWins =
    0;


  cpuRoundWins =
    0;


  currentRound =
    1;


  gameOver =
    false;


  matchActive =
    true;


  cpuCharacter =
    chooseCPU();


  playerModelSlot.innerHTML =
    characterHTML(
      selectedCharacter
    );


  cpuModelSlot.innerHTML =
    characterHTML(
      cpuCharacter
    );


  playerName.textContent =
    selectedCharacter.toUpperCase();


  cpuName.textContent =
    cpuCharacter.toUpperCase();


  setIcons();


  applyMap();


  showScreen(
    fightScreen
  );


  startRound();

}


/* =====================================================
   START ROUND
===================================================== */

function startRound() {

  roundId++;


  const thisRound =
    roundId;


  playerHealth =
    100;


  cpuHealth =
    100;


  playerUltimate =
    0;


  cpuUltimate =
    0;


  roundOver =
    false;


  fightStarted =
    false;


  actionLock =
    true;


  playerJumping =
    false;


  cpuJumping =
    false;


  playerCrouching =
    false;


  cpuCrouching =
    false;


  playerBlocking =
    false;


  cpuBlocking =
    false;


  playerStunned =
    false;


  cpuStunned =
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


  koOverlay.classList.add(
    "hidden"
  );


  newGameButton.classList.add(
    "hidden"
  );


  winnerText.textContent =
    "";


  matchStatus.textContent =
    "";


  roundText.textContent =
    "";


  updateRoundHUD();


  setTimeout(
    () => {

      if (
        thisRound !==
        roundId
      ) {
        return;
      }


      playerX =
        40;


      cpuX =
        arena.clientWidth -
        140;


      updatePositions();


      updateHUD(
        true
      );


      if (
        currentRound ===
        1
      ) {

        playEntrances(
          thisRound
        );

      }

      else {

        playBattleIntro(
          thisRound
        );

      }

    },
    60
  );

}


/* =====================================================
   ENTRANCES
===================================================== */

function playEntrances(
  thisRound
) {

  let delay =
    0;


  if (
    selectedCharacter ===
    "erin"
  ) {

    erinIntro(
      playerFighter
    );


    delay =
      1500;

  }


  if (
    cpuCharacter ===
    "erin"
  ) {

    erinIntro(
      cpuFighter
    );


    delay =
      1500;

  }


  if (
    selectedCharacter ===
    "connor"
  ) {

    connorIntro(
      playerFighter
    );


    delay =
      1500;

  }


  if (
    cpuCharacter ===
    "connor"
  ) {

    connorIntro(
      cpuFighter
    );


    delay =
      1500;

  }


  setTimeout(
    () => {

      if (
        thisRound ===
        roundId
      ) {

        playBattleIntro(
          thisRound
        );

      }

    },
    delay
  );

}


/* =====================================================
   ERIN INTRO
===================================================== */

function erinIntro(
  fighter
) {

  const x =
    fighterX(
      fighter
    );


  const vanity =
    document.createElement(
      "div"
    );


  vanity.className =
    "effect bathroom-vanity";


  vanity.style.left =
    Math.max(
      10,
      x -
      20
    ) +
    "px";


  vanity.style.bottom =
    "25px";


  effects.appendChild(
    vanity
  );


  const brush =
    document.createElement(
      "div"
    );


  brush.className =
    "effect intro-hairbrush";


  brush.style.left =
    x +
    50 +
    "px";


  brush.style.bottom =
    "94px";


  effects.appendChild(
    brush
  );


  roundText.textContent =
    "JUST BORROWING IT...";


  brush.animate(
    [

      {
        transform:
          "translate(0,0) rotate(30deg)"
      },

      {
        transform:
          "translate(22px,-35px) rotate(-20deg)"
      },

      {
        transform:
          "translate(8px,-65px) rotate(-45deg)"
      }

    ],

    {

      duration:
        850,

      fill:
        "forwards",

      easing:
        "ease-in-out"

    }
  );


  setTimeout(
    () => {

      brush.remove();


      vanity.remove();


      roundText.textContent =
        "";

    },
    1250
  );

}


/* =====================================================
   CONNOR INTRO
===================================================== */

function connorIntro(
  fighter
) {

  const motionLayer =
    motion(
      fighter
    );


  motionLayer.style.transform =
    "rotate(90deg) translateY(10px)";


  const z =
    document.createElement(
      "div"
    );


  z.className =
    "effect sleep-intro-z";


  z.textContent =
    "Z Z Z";


  z.style.left =
    fighterX(
      fighter
    ) +
    35 +
    "px";


  z.style.bottom =
    "175px";


  effects.appendChild(
    z
  );


  setTimeout(
    () => {

      z.remove();


      motionLayer.style.transform =
        "translate3d(0,0,0)";


      roundText.textContent =
        "OVERSLEPT.";

    },
    850
  );


  setTimeout(
    () => {

      roundText.textContent =
        "";

    },
    1250
  );

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
   BATTLE INTRO
===================================================== */

function playBattleIntro(
  thisRound
) {

  actionLock =
    true;


  battleIntro.classList.remove(
    "hidden"
  );


  battleMapName.textContent =
    MAP_NAMES[
      selectedMap
    ];


  battleIntroRound.textContent =
    "ROUND " +
    currentRound;


  battleIntroWord.classList.remove(
    "begin"
  );


  battleIntroWord.textContent =
    "READY...";


  setTimeout(
    () => {

      if (
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
    950
  );


  setTimeout(
    () => {

      if (
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
        matchId,
        thisRound
      );

    },
    1650
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
    playerBlocking
  ) {
    return;
  }


  playerX +=
    amount *
    (
      selectedCharacter ===
      "erin"

        ? 1.12

        : 1
    );


  clamp();


  if (
    Math.abs(
      playerX -
      cpuX
    ) <
    60
  ) {

    playerX =
      amount >
      0

        ? cpuX - 60

        : cpuX + 60;

  }


  clamp();


  updatePositions();

}


function cpuStep(
  amount
) {

  if (
    !canCPU()
  ) {
    return;
  }


  cpuX +=
    amount *
    (
      cpuCharacter ===
      "erin"

        ? 1.12

        : 1
    );


  clamp();


  if (
    Math.abs(
      cpuX -
      playerX
    ) <
    60
  ) {

    cpuX =
      cpuX >
      playerX

        ? playerX + 60

        : playerX - 60;

  }


  clamp();


  updatePositions();

}


/* =====================================================
   JUMP / CROUCH
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
    610
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
    610
  );

}


function crouchPlayer(
  active
) {

  if (
    active &&
    (
      !canPlayer() ||
      playerJumping ||
      playerBlocking
    )
  ) {
    return;
  }


  playerCrouching =
    active;


  playerFighter.classList.toggle(
    "crouching",
    active
  );

}


/* =====================================================
   BLOCK
===================================================== */

function setPlayerBlock(
  active
) {

  if (
    active &&
    !canPlayer()
  ) {
    return;
  }


  playerBlocking =
    active;


  const fighterModel =
    model(
      playerFighter
    );


  if (
    fighterModel
  ) {

    fighterModel.classList.toggle(
      "blocking",
      active
    );

  }


  blockButton.classList.toggle(
    "block-active",
    active
  );

}


function setCPUBlock(
  active
) {

  cpuBlocking =
    active;


  const fighterModel =
    model(
      cpuFighter
    );


  if (
    fighterModel
  ) {

    fighterModel.classList.toggle(
      "blocking",
      active
    );

  }

}


function cpuBlock() {

  setCPUBlock(
    true
  );


  setTimeout(
    () => {

      setCPUBlock(
        false
      );

    },
    470
  );

}


/* =====================================================
   HUD
===================================================== */

function updateHUD(
  immediate =
    false
) {

  playerHealth =
    Math.max(
      0,
      Math.min(
        100,
        playerHealth
      )
    );


  cpuHealth =
    Math.max(
      0,
      Math.min(
        100,
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


  playerHealthBar.style.width =
    playerHealth +
    "%";


  cpuHealthBar.style.width =
    cpuHealth +
    "%";


  if (
    immediate
  ) {

    playerDamageTrail.style.width =
      playerHealth +
      "%";


    cpuDamageTrail.style.width =
      cpuHealth +
      "%";

  }

  else {

    setTimeout(
      () => {

        playerDamageTrail.style.width =
          playerHealth +
          "%";


        cpuDamageTrail.style.width =
          cpuHealth +
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
   ABILITY HUD
===================================================== */

function abilityHUD() {

  const playerProgress =
    specialCooldown

      ? 1 -
        Math.max(
          0,
          playerSpecialReadyTime -
          Date.now()
        ) /
        SPECIAL_COOLDOWN

      : 1;


  const cpuProgress =
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
      playerProgress
    ) *
    360 +
    "deg"
  );


  cpuSpecialOrb.style.setProperty(
    "--fill",
    Math.max(
      0,
      cpuProgress
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
    abilityHUD
  );

}


abilityHUD();


/* =====================================================
   HIT SPARK
===================================================== */

function spark(
  fighter,
  type =
    "normal"
) {

  const effect =
    document.createElement(
      "div"
    );


  effect.className =
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


  effect.style.left =
    fighterX(
      fighter
    ) +
    30 +
    "px";


  effect.style.bottom =
    "100px";


  effects.appendChild(
    effect
  );


  setTimeout(
    () => {

      effect.remove();

    },
    350
  );

}


/* =====================================================
   DAMAGE
===================================================== */

function damageCPU(
  amount,
  options =
    {}
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


  if (
    cpuBlocking &&
    !options.ignoreBlock
  ) {

    amount *=
      type ===
      "special"

        ? 0.5

        : 0.2;

  }

  else {

    spark(
      cpuFighter,
      type
    );

  }


  cpuHealth -=
    amount;


  playerUltimate +=
    METER_ON_HIT;


  cpuUltimate +=
    METER_ON_DAMAGE;


  updateHUD();


  checkKO();

}


function damagePlayer(
  amount,
  options =
    {}
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


  if (
    playerBlocking &&
    !options.ignoreBlock
  ) {

    amount *=
      type ===
      "special"

        ? 0.5

        : 0.2;

  }

  else {

    spark(
      playerFighter,
      type
    );

  }


  playerHealth -=
    amount;


  cpuUltimate +=
    METER_ON_HIT;


  playerUltimate +=
    METER_ON_DAMAGE;


  updateHUD();


  checkKO();

}


/* =====================================================
   BASIC ATTACK
===================================================== */

function weaponSwing(
  fighter,
  duration
) {

  const fighterModel =
    model(
      fighter
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
        !roundOver &&
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
        !roundOver &&
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
   SPECIAL ROUTING
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


function useSpecial(
  character,
  playerOwned
) {

  if (
    character ===
    "grandaddy"
  ) {

    grandaddyLadder(
      playerOwned
    );

  }

  else if (
    character ===
    "connor"
  ) {

    paintBeast(
      playerOwned
    );

  }

  else if (
    character ===
    "erin"
  ) {

    pimplePatch(
      playerOwned
    );

  }

  else {

    bigDrive(
      playerOwned
    );

  }

}


/* =====================================================
   BIG DRIVE
===================================================== */

function bigDrive(
  playerOwned
) {

  const fighter =
    playerOwned

      ? playerFighter

      : cpuFighter;


  const fighterModel =
    model(
      fighter
    );


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


        const target =
          playerOwned

            ? cpuX

            : playerX;


        if (
          Math.abs(
            x -
            target
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
          x <
          -50 ||
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
    750
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


  const grandaddy =
    playerOwned

      ? playerFighter

      : cpuFighter;


  const opponent =
    playerOwned

      ? cpuFighter

      : playerFighter;


  const opponentMotion =
    motion(
      opponent
    );


  const grandaddyModel =
    model(
      grandaddy
    );


  restoreStandingState(
    opponent
  );


  actionLock =
    true;


  grandaddyModel.classList.add(
    "hammer-pointing"
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
    fighterX(
      opponent
    ) -
    5 +
    "px";


  ladder.style.bottom =
    "20px";


  effects.appendChild(
    ladder
  );


  const climb =
    opponentMotion.animate(
      [

        {
          transform:
            "translate3d(0,0,0)"
        },

        {
          transform:
            "translate3d(7px,-35px,0)"
        },

        {
          transform:
            "translate3d(14px,-65px,0)"
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

      climb.cancel();


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


      grandaddyModel.classList.remove(
        "hammer-pointing"
      );


      restoreStandingState(
        opponent
      );


      updatePositions();


      actionLock =
        false;


      roundText.textContent =
        "";

    },
    1240
  );

}


/* =====================================================
   PIXEL DINOSAUR
===================================================== */

function dinoHTML() {

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
   PAINT BEAST
===================================================== */

function paintBeast(
  playerOwned
) {

  const fighter =
    playerOwned

      ? playerFighter

      : cpuFighter;


  const fighterModel =
    model(
      fighter
    );


  fighterModel.classList.add(
    "special-swing"
  );


  roundText.textContent =
    "PAINT BEAST!";


  const splash =
    document.createElement(
      "div"
    );


  splash.className =
    "effect paint-splash";


  splash.style.left =
    fighterX(
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
  Slower paint splatter
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
        dinoHTML();


      let x =
        playerOwned

          ? playerX + 63

          : cpuX - 68;


      const direction =
        playerOwned

          ? 1

          : -1;


      dinosaur.style.bottom =
        "44px";


      dinosaur.style.left =
        x +
        "px";


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

                ? "scale(0.5)"

                : "scaleX(-1) scale(0.5)"
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
      Slower dinosaur movement
      */

      const interval =
        setInterval(
          () => {

            x +=
              10 *
              direction;


            dinosaur.style.left =
              x +
              "px";


            const target =
              playerOwned

                ? cpuX

                : playerX;


            if (
              Math.abs(
                x -
                target
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
              x <
              -130 ||
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

      fighterModel.classList.remove(
        "special-swing"
      );


      roundText.textContent =
        "";

    },
    1900
  );

}


/* =====================================================
   PIMPLE PATCH COMIC TEXT
===================================================== */

function pimpleText() {

  const text =
    document.createElement(
      "div"
    );


  text.className =
    "pimple-comic-callout";


  text.textContent =
    "PIMPLE PATCH ATTACK";


  effects.appendChild(
    text
  );


  setTimeout(
    () => {

      text.remove();

    },
    1100
  );

}


/* =====================================================
   PIMPLE PATCH
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


  const fighterModel =
    model(
      fighter
    );


  fighterModel.classList.add(
    "special-swing"
  );


  roundText.textContent =
    "PIMPLE PATCH!";


  pimpleText();


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
          fighterX(
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
          x <
          -40 ||
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

      fighterModel.classList.remove(
        "special-swing"
      );


      roundText.textContent =
        "";

    },
    850
  );

}


/* =====================================================
   PIMPLE STUN
===================================================== */

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
    fighterX(
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
    fighterX(
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


      const release =
        document.createElement(
          "div"
        );


      release.className =
        "effect release-label";


      release.textContent =
        "SNAP!";


      release.style.left =
        fighterX(
          target
        ) +
        15 +
        "px";


      release.style.bottom =
        "205px";


      effects.appendChild(
        release
      );


      setTimeout(
        () => {

          release.remove();

        },
        500
      );

    },
    PIMPLE_PATCH_STUN
  );

}


/* =====================================================
   ULTIMATE ROUTING
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


function useUltimate(
  character,
  playerOwned
) {

  if (
    character ===
    "grandaddy"
  ) {

    backInMyDay(
      playerOwned
    );

  }

  else if (
    character ===
    "connor"
  ) {

    friedChickenFeast(
      playerOwned
    );

  }

  else if (
    character ===
    "erin"
  ) {

    laundryAvalanche(
      playerOwned
    );

  }

  else {

    ipoUltimate(
      playerOwned
    );

  }

}


/* =====================================================
   BRENDAN IPO
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


  /*
  About 1.75x slower than before
  */

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
   GRANDADDY ULTIMATE
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
        fighterX(
          target
        ) +
        8 +
        "px";


      label.style.bottom =
        "220px";


      label.dataset.stun =
        "1";


      effects.appendChild(
        label
      );

    },
    500
  );


  setTimeout(
    () => {

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


      target.classList.remove(
        "stunned"
      );


      document
        .querySelectorAll(
          '[data-stun="1"]'
        )
        .forEach(
          element => {

            element.remove();

          }
        );


      roundText.textContent =
        "";

    },
    500 +
    BACK_IN_MY_DAY_STUN
  );

}


/* =====================================================
   CONNOR FRIED CHICKEN
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
    fighterX(
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
      GUARANTEED +30 HP
      */

      if (
        playerOwned
      ) {

        playerHealth =
          Math.min(
            MAX_HEALTH,
            playerHealth +
            CONNOR_HEAL
          );

      }

      else {

        cpuHealth =
          Math.min(
            MAX_HEALTH,
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
        fighterX(
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
   ERIN LAUNDRY AVALANCHE
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
            fighterX(
              target
            ) +
            (
              index ===
              0

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
  BIGGER BUT TIGHT FINAL PILE
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


      pile.innerHTML = `
        <span class="laundry-piece-one">👕</span>
        <span class="laundry-piece-two">👖</span>
        <span class="laundry-piece-three">🧦</span>
        <span class="laundry-piece-four">👚</span>
      `;


      pile.style.left =
        fighterX(
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
              "translateY(0) scale(0.8)"
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
        thisRound ===
        roundId
      ) {

        cpuSpecialCooldown =
          false;


        cpuSpecialReadyTime =
          0;

      }

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
      160
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
  Connor prioritizes healing
  */

  if (
    cpuCharacter ===
      "connor" &&
    cpuUltimate >=
      100 &&
    cpuHealth <=
      58 &&
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


  else if (
    cpuUltimate >=
      100 &&
    roll <
      0.31
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
      -29
    );

  }


  else if (
    roll <
    0.58
  ) {

    cpuNormalAttack();

  }


  else if (
    roll <
      0.79 &&
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
    0.89
  ) {

    cpuBlock();

  }


  else if (
    roll <
    0.95
  ) {

    jumpCPU();

  }


  else {

    cpuStep(
      -15
    );

  }


  setTimeout(
    () => {

      cpuLoop(
        thisMatch,
        thisRound
      );

    },

    395 +
    Math.random() *
    135
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
   ROUND END
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
        winner.toUpperCase() +
        " WINS ROUND " +
        currentRound;


      koOverlay.classList.remove(
        "hidden"
      );


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


        matchStatus.textContent =
          winner.toUpperCase() +
          " WINS THE MATCH";


        newGameButton.classList.remove(
          "hidden"
        );

      }

      else {

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

      }

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


    matchActive =
      false;


    gameOver =
      false;


    roundOver =
      false;


    effects.innerHTML =
      "";


    koOverlay.classList.add(
      "hidden"
    );


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


    if (
      (
        key ===
          "w" ||
        key ===
          "arrowup" ||
        key ===
          " "
      ) &&
      !event.repeat
    ) {

      jumpPlayer();

    }


    if (
      key ===
        "s" ||
      key ===
        "arrowdown"
    ) {

      crouchPlayer(
        true
      );

    }


    if (
      key ===
        "i" &&
      !event.repeat
    ) {

      setPlayerBlock(
        true
      );

    }


    if (
      key ===
        "j" &&
      !event.repeat
    ) {

      playerAttack();

    }


    if (
      key ===
        "k" &&
      !event.repeat
    ) {

      playerSpecial();

    }


    if (
      key ===
        "l" &&
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
      key ===
        "s" ||
      key ===
        "arrowdown"
    ) {

      crouchPlayer(
        false
      );

    }


    if (
      key ===
      "i"
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
