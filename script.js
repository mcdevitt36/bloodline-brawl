/* ==========================
   ELEMENTS
========================== */

const titleScreen =
  document.getElementById("titleScreen");

const selectScreen =
  document.getElementById("selectScreen");

const fightScreen =
  document.getElementById("fightScreen");

const startButton =
  document.getElementById("startButton");

const fightButton =
  document.getElementById("fightButton");

const fighterCards =
  document.querySelectorAll(".fighter-card");

const selectionText =
  document.getElementById("selectionText");

const arena =
  document.getElementById("arena");

const effects =
  document.getElementById("effects");

const playerFighter =
  document.getElementById("playerFighter");

const cpuFighter =
  document.getElementById("cpuFighter");

const playerModelSlot =
  playerFighter.querySelector(
    ".fighter-model-slot"
  );

const cpuModelSlot =
  cpuFighter.querySelector(
    ".fighter-model-slot"
  );

const playerName =
  document.getElementById("playerName");

const cpuName =
  document.getElementById("cpuName");

const playerHealthBar =
  document.getElementById("playerHealth");

const cpuHealthBar =
  document.getElementById("cpuHealth");

const playerDamageTrail =
  document.getElementById("playerDamageTrail");

const cpuDamageTrail =
  document.getElementById("cpuDamageTrail");

const playerHealthShell =
  document.getElementById("playerHealthShell");

const cpuHealthShell =
  document.getElementById("cpuHealthShell");

const playerUltimateBar =
  document.getElementById("playerUltimate");

const cpuUltimateBar =
  document.getElementById("cpuUltimate");

const roundText =
  document.getElementById("roundText");

const blockButton =
  document.getElementById("blockButton");

const attackButton =
  document.getElementById("attackButton");

const specialButton =
  document.getElementById("specialButton");

const ultimateButton =
  document.getElementById("ultimateButton");

const koOverlay =
  document.getElementById("koOverlay");

const winnerText =
  document.getElementById("winnerText");

const newGameButton =
  document.getElementById("newGameButton");


/* ABILITY HUD */

const playerSpecialOrb =
  document.getElementById("playerSpecialOrb");

const playerUltimateOrb =
  document.getElementById("playerUltimateOrb");

const cpuSpecialOrb =
  document.getElementById("cpuSpecialOrb");

const cpuUltimateOrb =
  document.getElementById("cpuUltimateOrb");

const playerSpecialIcon =
  document.getElementById("playerSpecialIcon");

const playerUltimateIcon =
  document.getElementById("playerUltimateIcon");

const cpuSpecialIcon =
  document.getElementById("cpuSpecialIcon");

const cpuUltimateIcon =
  document.getElementById("cpuUltimateIcon");


/* ==========================
   BALANCE
========================== */

const MAX_HEALTH =
  100;

const BRENDAN_NORMAL_DAMAGE =
  5;

const GRANDADDY_NORMAL_DAMAGE =
  6.5;

const BRENDAN_NORMAL_RANGE =
  138;

const GRANDADDY_NORMAL_RANGE =
  108;

const BIG_DRIVE_DAMAGE =
  10;

const LADDER_DAMAGE =
  10;

const IPO_HITS =
  [5, 5, 7];

const SPECIAL_COOLDOWN =
  5000;

const STUN_DURATION =
  3000;

const METER_ON_HIT =
  14;

const METER_ON_DAMAGE =
  7;


/* ==========================
   STATE
========================== */

let selectedCharacter =
  "brendan";

let cpuCharacter =
  "grandaddy";


let playerHealth =
  MAX_HEALTH;

let cpuHealth =
  MAX_HEALTH;


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

let matchActive =
  false;

let fightStarted =
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


let playerHitStunned =
  false;

let cpuHitStunned =
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


let playerCounterWindow =
  false;

let cpuCounterWindow =
  false;


let playerNormalUsage =
  0;

let playerSpecialUsage =
  0;


let playerMoving =
  false;

let cpuMoving =
  false;


const keys = {};


/* ==========================
   CHARACTER HTML
========================== */

function brendanHTML() {

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

        <div class="whale">
          🐳
        </div>

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


function grandaddyHTML() {

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
        <div class="hammer"></div>
      </div>

      <div class="black-pants leg left-leg"></div>
      <div class="black-pants leg right-leg"></div>

      <div class="white-shoe left-shoe"></div>
      <div class="white-shoe right-shoe"></div>

    </div>
  `;

}


function getCharacterHTML(
  character
) {

  return character === "brendan"
    ? brendanHTML()
    : grandaddyHTML();

}


/* ==========================
   SCREEN
========================== */

function showScreen(
  screen
) {

  titleScreen.classList.remove(
    "active"
  );

  selectScreen.classList.remove(
    "active"
  );

  fightScreen.classList.remove(
    "active"
  );


  screen.classList.add(
    "active"
  );

}


startButton.addEventListener(
  "click",
  () => {

    showScreen(
      selectScreen
    );

  }
);


/* ==========================
   SELECT
========================== */

fighterCards.forEach(
  card => {

    card.addEventListener(
      "click",
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
          "PLAYER 1: " +
          selectedCharacter.toUpperCase();

      }
    );

  }
);


fightButton.addEventListener(
  "click",
  startFight
);


/* ==========================
   LAYER HELPERS
========================== */

function getMotionLayer(
  fighter
) {

  return fighter.querySelector(
    ".motion-layer"
  );

}


function getVisualLayer(
  fighter
) {

  return fighter.querySelector(
    ".visual-layer"
  );

}


function getPixelModel(
  fighter
) {

  return fighter.querySelector(
    ".pixel-person"
  );

}


/* ==========================
   BASIC MOTION RESET
========================== */

function resetMotionLayer(
  fighter
) {

  const motion =
    getMotionLayer(
      fighter
    );


  if (!motion) {
    return;
  }


  motion
    .getAnimations()
    .forEach(
      animation => {

        animation.cancel();

      }
    );


  motion.style.animation =
    "none";


  motion.style.transform =
    "translate3d(0,0,0)";


  motion.style.translate =
    "";


  motion.style.rotate =
    "";


  motion.style.scale =
    "";


  /*
  Force browser to accept reset.
  */

  void motion.offsetWidth;


  motion.style.animation =
    "";

}


/* ==========================
   FULL STANDING RESTORE
========================== */

/*
This is the stronger ladder recovery.

It restores the visual layer AND motion
layer without touching CPU facing.
*/

function restoreStandingState(
  fighter
) {

  const motion =
    getMotionLayer(
      fighter
    );


  const visual =
    getVisualLayer(
      fighter
    );


  const model =
    getPixelModel(
      fighter
    );


  /*
  MOTION
  */

  if (motion) {

    motion
      .getAnimations()
      .forEach(
        animation => {

          animation.cancel();

        }
      );


    motion.style.animation =
      "none";


    motion.style.transform =
      "translate3d(0,0,0)";


    motion.style.translate =
      "";


    motion.style.rotate =
      "";


    motion.style.scale =
      "";


    void motion.offsetWidth;


    motion.style.animation =
      "";

  }


  /*
  VISUAL
  */

  if (visual) {

    visual
      .getAnimations()
      .forEach(
        animation => {

          animation.cancel();

        }
      );


    visual.style.animation =
      "none";


    visual.style.transform =
      "translate3d(0,0,0)";


    visual.style.translate =
      "";


    visual.style.rotate =
      "";


    visual.style.scale =
      "";


    visual.style.filter =
      "";


    void visual.offsetWidth;


    visual.style.animation =
      "";

  }


  /*
  Remove any pose that could
  leave Brendan on the floor.
  */

  fighter.classList.remove(
    "walking",
    "jumping",
    "crouching",
    "hit-animation",
    "block-recoil",
    "recovery-shake",
    "stunned",
    "ko-loser",
    "idle-breathing"
  );


  /*
  Reset character-level attack poses.
  */

  if (model) {

    model
      .getAnimations()
      .forEach(
        animation => {

          animation.cancel();

        }
      );


    model.classList.remove(
      "blocking",
      "weapon-attacking",
      "special-swing",
      "hammer-pointing",
      "winner-pose"
    );


    model.style.animation =
      "";


    model.style.transform =
      "";


    model.style.translate =
      "";


    model.style.rotate =
      "";


    model.style.scale =
      "";

  }


  /*
  IMPORTANT:
  fighter itself never gets rotated.

  CPU facing stays in its class.
  */

  fighter.style.bottom =
    "25px";


  if (
    fighter === playerFighter
  ) {

    playerJumping =
      false;

    playerCrouching =
      false;

    playerHitStunned =
      false;

  }


  if (
    fighter === cpuFighter
  ) {

    cpuJumping =
      false;

    cpuCrouching =
      false;

    cpuHitStunned =
      false;

  }


  updatePositions();

}


/* ==========================
   START FIGHT
========================== */

function startFight() {

  matchId++;

  const currentMatch =
    matchId;


  matchActive =
    true;

  fightStarted =
    false;

  gameOver =
    false;

  actionLock =
    true;


  cpuCharacter =
    selectedCharacter === "brendan"
      ? "grandaddy"
      : "brendan";


  playerHealth =
    MAX_HEALTH;

  cpuHealth =
    MAX_HEALTH;


  playerUltimate =
    0;

  cpuUltimate =
    0;


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

  playerHitStunned =
    false;

  cpuHitStunned =
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

  playerCounterWindow =
    false;

  cpuCounterWindow =
    false;

  playerNormalUsage =
    0;

  playerSpecialUsage =
    0;

  playerMoving =
    false;

  cpuMoving =
    false;


  Object.keys(
    keys
  ).forEach(
    key => {

      keys[key] =
        false;

    }
  );


  effects.innerHTML =
    "";


  koOverlay.classList.add(
    "hidden"
  );


  playerFighter.className =
    "fight-character";


  cpuFighter.className =
    "fight-character cpu-facing";


  playerModelSlot.innerHTML =
    getCharacterHTML(
      selectedCharacter
    );


  cpuModelSlot.innerHTML =
    getCharacterHTML(
      cpuCharacter
    );


  restoreStandingState(
    playerFighter
  );


  restoreStandingState(
    cpuFighter
  );


  playerName.textContent =
    selectedCharacter.toUpperCase();


  cpuName.textContent =
    cpuCharacter.toUpperCase();


  setAbilityIcons();


  resetControls();


  showScreen(
    fightScreen
  );


  setTimeout(
    () => {

      if (
        currentMatch !==
        matchId
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


      roundText.textContent =
        "READY...";


      setTimeout(
        () => {

          if (
            currentMatch !==
            matchId
          ) {
            return;
          }


          roundText.textContent =
            "FIGHT!";


          setTimeout(
            () => {

              if (
                currentMatch !==
                matchId
              ) {
                return;
              }


              roundText.textContent =
                "";


              fightStarted =
                true;


              actionLock =
                false;


              updateIdleStates();


              cpuLoop(
                currentMatch
              );

            },
            500
          );

        },
        650
      );

    },
    60
  );

}


/* ==========================
   ABILITY ICONS
========================== */

function setAbilityIcons() {

  if (
    selectedCharacter ===
    "brendan"
  ) {

    playerSpecialIcon.textContent =
      "⛳";

    playerUltimateIcon.textContent =
      "📈";

  }

  else {

    playerSpecialIcon.textContent =
      "🪜";

    playerUltimateIcon.textContent =
      "💬";

  }


  if (
    cpuCharacter ===
    "brendan"
  ) {

    cpuSpecialIcon.textContent =
      "⛳";

    cpuUltimateIcon.textContent =
      "📈";

  }

  else {

    cpuSpecialIcon.textContent =
      "🪜";

    cpuUltimateIcon.textContent =
      "💬";

  }

}


/* ==========================
   ABILITY HUD
========================== */

function updateAbilityHUD() {

  let playerSpecialProgress =
    1;


  if (
    specialCooldown
  ) {

    const remaining =
      Math.max(
        0,
        playerSpecialReadyTime -
        Date.now()
      );


    playerSpecialProgress =
      1 -
      remaining /
      SPECIAL_COOLDOWN;

  }


  let cpuSpecialProgress =
    1;


  if (
    cpuSpecialCooldown
  ) {

    const remaining =
      Math.max(
        0,
        cpuSpecialReadyTime -
        Date.now()
      );


    cpuSpecialProgress =
      1 -
      remaining /
      SPECIAL_COOLDOWN;

  }


  playerSpecialProgress =
    Math.max(
      0,
      Math.min(
        1,
        playerSpecialProgress
      )
    );


  cpuSpecialProgress =
    Math.max(
      0,
      Math.min(
        1,
        cpuSpecialProgress
      )
    );


  playerSpecialOrb.style.setProperty(
    "--fill",
    playerSpecialProgress *
      360 +
      "deg"
  );


  cpuSpecialOrb.style.setProperty(
    "--fill",
    cpuSpecialProgress *
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
    playerUltimate /
      100 *
      360 +
      "deg"
  );


  cpuUltimateOrb.style.setProperty(
    "--fill",
    cpuUltimate /
      100 *
      360 +
      "deg"
  );


  playerUltimateOrb.classList.toggle(
    "ability-ready",
    playerUltimate >= 100
  );


  cpuUltimateOrb.classList.toggle(
    "ability-ready",
    cpuUltimate >= 100
  );

}


function abilityHUDLoop() {

  updateAbilityHUD();


  requestAnimationFrame(
    abilityHUDLoop
  );

}


abilityHUDLoop();


/* ==========================
   ACTION CHECK
========================== */

function playerCanAct() {

  return (
    matchActive &&
    fightStarted &&
    !gameOver &&
    !actionLock &&
    !playerStunned &&
    !playerHitStunned
  );

}


function cpuCanAct() {

  return (
    matchActive &&
    fightStarted &&
    !gameOver &&
    !actionLock &&
    !cpuStunned &&
    !cpuHitStunned
  );

}


/* ==========================
   POSITION
========================== */

function updatePositions() {

  playerFighter.style.left =
    playerX +
    "px";


  cpuFighter.style.left =
    cpuX +
    "px";

}


function fighterDistance() {

  return Math.abs(
    playerX -
    cpuX
  );

}


function clampPositions() {

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

}


/* ==========================
   IDLE
========================== */

function updateIdleStates() {

  const playerIdle =
    fightStarted &&
    !gameOver &&
    !playerMoving &&
    !playerJumping &&
    !playerCrouching &&
    !playerBlocking &&
    !playerStunned &&
    !playerAttackCooldown;


  const cpuIdle =
    fightStarted &&
    !gameOver &&
    !cpuMoving &&
    !cpuJumping &&
    !cpuCrouching &&
    !cpuBlocking &&
    !cpuStunned &&
    !cpuAttackCooldown;


  playerFighter.classList.toggle(
    "idle-breathing",
    playerIdle
  );


  cpuFighter.classList.toggle(
    "idle-breathing",
    cpuIdle
  );

}


/* ==========================
   MOVEMENT
========================== */

function movePlayer(
  amount
) {

  if (
    !playerCanAct() ||
    playerBlocking
  ) {
    return;
  }


  playerX +=
    amount;


  clampPositions();


  if (
    Math.abs(
      playerX -
      cpuX
    ) <
    60
  ) {

    playerX =
      amount > 0
        ? cpuX - 60
        : cpuX + 60;

  }


  clampPositions();


  updatePositions();

}


function cpuStep(
  amount
) {

  if (
    !cpuCanAct()
  ) {
    return;
  }


  cpuMoving =
    true;


  cpuX +=
    amount;


  clampPositions();


  if (
    Math.abs(
      cpuX -
      playerX
    ) <
    60
  ) {

    cpuX =
      cpuX > playerX
        ? playerX + 60
        : playerX - 60;

  }


  clampPositions();


  updatePositions();


  cpuFighter.classList.add(
    "walking"
  );


  updateIdleStates();


  setTimeout(
    () => {

      cpuMoving =
        false;


      cpuFighter.classList.remove(
        "walking"
      );


      updateIdleStates();

    },
    220
  );

}


/* ==========================
   JUMP
========================== */

function jumpPlayer() {

  if (
    !playerCanAct() ||
    playerBlocking ||
    playerJumping ||
    playerCrouching
  ) {
    return;
  }


  playerJumping =
    true;


  playerFighter.classList.remove(
    "idle-breathing"
  );


  playerFighter.classList.add(
    "jumping"
  );


  setTimeout(
    () => {

      playerFighter.classList.remove(
        "jumping"
      );


      resetMotionLayer(
        playerFighter
      );


      playerJumping =
        false;


      updateIdleStates();

    },
    610
  );

}


function jumpCPU() {

  if (
    !cpuCanAct() ||
    cpuBlocking ||
    cpuJumping ||
    cpuCrouching
  ) {
    return;
  }


  cpuJumping =
    true;


  cpuFighter.classList.remove(
    "idle-breathing"
  );


  cpuFighter.classList.add(
    "jumping"
  );


  setTimeout(
    () => {

      cpuFighter.classList.remove(
        "jumping"
      );


      resetMotionLayer(
        cpuFighter
      );


      cpuJumping =
        false;


      updateIdleStates();

    },
    610
  );

}


/* ==========================
   CROUCH
========================== */

function crouchPlayer(
  active
) {

  if (
    !playerCanAct() ||
    playerBlocking ||
    playerJumping
  ) {
    return;
  }


  playerCrouching =
    active;


  playerFighter.classList.toggle(
    "crouching",
    active
  );


  updateIdleStates();

}


function crouchCPU(
  duration = 500
) {

  if (
    !cpuCanAct() ||
    cpuBlocking ||
    cpuJumping
  ) {
    return;
  }


  cpuCrouching =
    true;


  cpuFighter.classList.add(
    "crouching"
  );


  updateIdleStates();


  setTimeout(
    () => {

      cpuCrouching =
        false;


      cpuFighter.classList.remove(
        "crouching"
      );


      updateIdleStates();

    },
    duration
  );

}


/* ==========================
   BLOCK
========================== */

function setPlayerBlock(
  active
) {

  if (
    active &&
    !playerCanAct()
  ) {
    return;
  }


  playerBlocking =
    active;


  const model =
    getPixelModel(
      playerFighter
    );


  if (model) {

    model.classList.toggle(
      "blocking",
      active
    );

  }


  blockButton.classList.toggle(
    "block-active",
    active
  );


  updateIdleStates();

}


function setCPUBlock(
  active
) {

  cpuBlocking =
    active;


  const model =
    getPixelModel(
      cpuFighter
    );


  if (model) {

    model.classList.toggle(
      "blocking",
      active
    );

  }


  updateIdleStates();

}


function cpuBlock(
  duration = 500
) {

  if (
    !cpuCanAct()
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
    duration
  );

}


/* ==========================
   HUD
========================== */

function updateHUD(
  immediateTrail = false
) {

  playerHealth =
    Math.max(
      0,
      Math.min(
        MAX_HEALTH,
        playerHealth
      )
    );


  cpuHealth =
    Math.max(
      0,
      Math.min(
        MAX_HEALTH,
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
    immediateTrail
  ) {

    playerDamageTrail.style.transition =
      "none";


    cpuDamageTrail.style.transition =
      "none";


    playerDamageTrail.style.width =
      playerHealth +
      "%";


    cpuDamageTrail.style.width =
      cpuHealth +
      "%";


    requestAnimationFrame(
      () => {

        playerDamageTrail.style.transition =
          "width 0.65s ease-out";


        cpuDamageTrail.style.transition =
          "width 0.65s ease-out";

      }
    );

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
      180
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


  playerHealthShell.classList.toggle(
    "low-health",
    playerHealth <=
      20
  );


  cpuHealthShell.classList.toggle(
    "low-health",
    cpuHealth <=
      20
  );


  playerFighter.classList.toggle(
    "low-health-fighter",
    playerHealth <=
      20 &&
    !gameOver
  );


  cpuFighter.classList.toggle(
    "low-health-fighter",
    cpuHealth <=
      20 &&
    !gameOver
  );

}


/* ==========================
   EFFECT POSITION
========================== */

function fighterScreenX(
  fighter
) {

  return parseFloat(
    fighter.style.left
  ) || 0;

}


/* ==========================
   HIT SPARK
========================== */

function createHitSpark(
  fighter,
  type = "normal"
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


  const x =
    fighterScreenX(
      fighter
    );


  spark.style.left =
    x +
    30 +
    "px";


  spark.style.bottom =
    "100px";


  effects.appendChild(
    spark
  );


  setTimeout(
    () => {

      spark.remove();

    },
    360
  );

}


/* ==========================
   DODGE LABEL
========================== */

function createDodgeLabel(
  fighter,
  text
) {

  const label =
    document.createElement(
      "div"
    );


  label.className =
    "effect dodge-label";


  label.textContent =
    text;


  const x =
    fighterScreenX(
      fighter
    );


  label.style.left =
    x +
    12 +
    "px";


  label.style.bottom =
    "190px";


  effects.appendChild(
    label
  );


  setTimeout(
    () => {

      label.remove();

    },
    650
  );

}


/* ==========================
   BLOCK EFFECT
========================== */

function createBlockEffect(
  fighter
) {

  const effect =
    document.createElement(
      "div"
    );


  effect.className =
    "effect block-effect";


  const x =
    fighterScreenX(
      fighter
    );


  effect.style.left =
    x +
    18 +
    "px";


  effect.style.bottom =
    "92px";


  effects.appendChild(
    effect
  );


  fighter.classList.remove(
    "block-recoil"
  );


  void fighter.offsetWidth;


  fighter.classList.add(
    "block-recoil"
  );


  setTimeout(
    () => {

      effect.remove();


      fighter.classList.remove(
        "block-recoil"
      );

    },
    300
  );

}


/* ==========================
   HIT STOP
========================== */

function strongHitStop(
  duration = 60
) {

  const playerVisual =
    getVisualLayer(
      playerFighter
    );


  const cpuVisual =
    getVisualLayer(
      cpuFighter
    );


  [
    playerVisual,
    cpuVisual
  ].forEach(
    element => {

      if (element) {

        element.style.animationPlayState =
          "paused";

      }

    }
  );


  setTimeout(
    () => {

      [
        playerVisual,
        cpuVisual
      ].forEach(
        element => {

          if (element) {

            element.style.animationPlayState =
              "";

          }

        }
      );

    },
    duration
  );

}


/* ==========================
   KNOCKBACK
========================== */

function knockbackCPU(
  amount
) {

  const direction =
    cpuX >= playerX
      ? 1
      : -1;


  cpuX +=
    amount *
    direction;


  clampPositions();


  updatePositions();

}


function knockbackPlayer(
  amount
) {

  const direction =
    playerX <= cpuX
      ? -1
      : 1;


  playerX +=
    amount *
    direction;


  clampPositions();


  updatePositions();

}


/* ==========================
   HIT STUN
========================== */

function playerHitStun(
  duration
) {

  playerHitStunned =
    true;


  setTimeout(
    () => {

      playerHitStunned =
        false;

    },
    duration
  );

}


function cpuHitStun(
  duration
) {

  cpuHitStunned =
    true;


  setTimeout(
    () => {

      cpuHitStunned =
        false;

    },
    duration
  );

}


/* ==========================
   COUNTER WINDOWS
========================== */

function activatePlayerCounterWindow() {

  playerCounterWindow =
    true;


  setTimeout(
    () => {

      playerCounterWindow =
        false;

    },
    450
  );

}


function activateCPUCounterWindow() {

  cpuCounterWindow =
    true;


  setTimeout(
    () => {

      cpuCounterWindow =
        false;

    },
    450
  );

}


/* ==========================
   DAMAGE CPU
========================== */

function damageCPU(
  amount,
  options = {}
) {

  if (
    gameOver ||
    !fightStarted
  ) {
    return;
  }


  const {
    type = "normal",
    knockback = 25,
    hitStun = 200,
    ignoreBlock = false,
    suppressKnockback = false,
    strongImpact = false
  } = options;


  const blocked =
    cpuBlocking &&
    !ignoreBlock;


  if (
    blocked
  ) {

    if (
      type ===
      "normal"
    ) {

      amount =
        Math.max(
          1,
          Math.ceil(
            amount *
            0.2
          )
        );

    }

    else if (
      type ===
      "special"
    ) {

      amount =
        Math.ceil(
          amount *
          0.5
        );

    }


    createBlockEffect(
      cpuFighter
    );


    activateCPUCounterWindow();

  }

  else {

    createHitSpark(
      cpuFighter,
      type
    );


    if (
      strongImpact
    ) {

      strongHitStop();

    }


    if (
      !suppressKnockback
    ) {

      knockbackCPU(
        knockback
      );


      cpuHitStun(
        hitStun
      );


      /*
      Ladder uses suppressKnockback,
      so we do NOT layer the normal
      hit animation on the fall.
      */

      hitAnimation(
        cpuFighter
      );

    }

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


/* ==========================
   DAMAGE PLAYER
========================== */

function damagePlayer(
  amount,
  options = {}
) {

  if (
    gameOver ||
    !fightStarted
  ) {
    return;
  }


  const {
    type = "normal",
    knockback = 25,
    hitStun = 200,
    ignoreBlock = false,
    suppressKnockback = false,
    strongImpact = false
  } = options;


  const blocked =
    playerBlocking &&
    !ignoreBlock;


  if (
    blocked
  ) {

    if (
      type ===
      "normal"
    ) {

      amount =
        Math.max(
          1,
          Math.ceil(
            amount *
            0.2
          )
        );

    }

    else if (
      type ===
      "special"
    ) {

      amount =
        Math.ceil(
          amount *
          0.5
        );

    }


    createBlockEffect(
      playerFighter
    );


    activatePlayerCounterWindow();

  }

  else {

    createHitSpark(
      playerFighter,
      type
    );


    if (
      strongImpact
    ) {

      strongHitStop();

    }


    if (
      !suppressKnockback
    ) {

      knockbackPlayer(
        knockback
      );


      playerHitStun(
        hitStun
      );


      /*
      Ladder skips this.
      */

      hitAnimation(
        playerFighter
      );

    }

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


/* ==========================
   HIT ANIMATION
========================== */

function hitAnimation(
  fighter
) {

  fighter.classList.remove(
    "hit-animation"
  );


  void fighter.offsetWidth;


  fighter.classList.add(
    "hit-animation"
  );


  setTimeout(
    () => {

      fighter.classList.remove(
        "hit-animation"
      );

    },
    210
  );

}


/* ==========================
   WEAPON SWING
========================== */

function weaponSwing(
  fighter,
  duration
) {

  const model =
    getPixelModel(
      fighter
    );


  if (!model) {
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


      updateIdleStates();

    },
    duration
  );

}


/* ==========================
   PLAYER ATTACK
========================== */

function playerAttack() {

  if (
    !playerCanAct() ||
    playerAttackCooldown
  ) {
    return;
  }


  playerNormalUsage++;


  if (
    playerBlocking
  ) {

    setPlayerBlock(
      false
    );

  }


  const isBrendan =
    selectedCharacter ===
    "brendan";


  let duration =
    isBrendan
      ? 440
      : 330;


  let impactTime =
    isBrendan
      ? 275
      : 175;


  let recovery =
    isBrendan
      ? 800
      : 375;


  let range =
    isBrendan
      ? BRENDAN_NORMAL_RANGE
      : GRANDADDY_NORMAL_RANGE;


  let damage =
    isBrendan
      ? BRENDAN_NORMAL_DAMAGE
      : GRANDADDY_NORMAL_DAMAGE;


  let knockback =
    isBrendan
      ? 34
      : 20;


  let hitStun =
    isBrendan
      ? 185
      : 250;


  if (
    playerCounterWindow
  ) {

    duration *=
      0.82;


    impactTime *=
      0.78;


    recovery *=
      0.85;


    playerCounterWindow =
      false;

  }


  playerAttackCooldown =
    true;


  weaponSwing(
    playerFighter,
    duration
  );


  setTimeout(
    () => {

      if (
        gameOver
      ) {
        return;
      }


      if (
        cpuJumping
      ) {

        createDodgeLabel(
          cpuFighter,
          "DODGED!"
        );


        return;
      }


      if (
        fighterDistance() <=
        range
      ) {

        damageCPU(
          damage,
          {
            type:
              "normal",
            knockback,
            hitStun
          }
        );

      }

    },
    impactTime
  );


  setTimeout(
    () => {

      playerAttackCooldown =
        false;


      updateIdleStates();

    },
    recovery
  );

}


/* ==========================
   CPU ATTACK
========================== */

function cpuNormalAttack() {

  if (
    !cpuCanAct() ||
    cpuAttackCooldown
  ) {
    return;
  }


  if (
    cpuBlocking
  ) {

    setCPUBlock(
      false
    );

  }


  const isBrendan =
    cpuCharacter ===
    "brendan";


  let duration =
    isBrendan
      ? 440
      : 330;


  let impactTime =
    isBrendan
      ? 275
      : 175;


  let recovery =
    isBrendan
      ? 800
      : 375;


  let range =
    isBrendan
      ? BRENDAN_NORMAL_RANGE
      : GRANDADDY_NORMAL_RANGE;


  let damage =
    isBrendan
      ? BRENDAN_NORMAL_DAMAGE
      : GRANDADDY_NORMAL_DAMAGE;


  let knockback =
    isBrendan
      ? 34
      : 20;


  let hitStun =
    isBrendan
      ? 185
      : 250;


  if (
    cpuCounterWindow
  ) {

    duration *=
      0.82;


    impactTime *=
      0.78;


    recovery *=
      0.84;


    cpuCounterWindow =
      false;

  }


  cpuAttackCooldown =
    true;


  weaponSwing(
    cpuFighter,
    duration
  );


  setTimeout(
    () => {

      if (
        gameOver
      ) {
        return;
      }


      if (
        playerJumping
      ) {

        createDodgeLabel(
          playerFighter,
          "DODGED!"
        );


        return;
      }


      if (
        fighterDistance() <=
        range
      ) {

        damagePlayer(
          damage,
          {
            type:
              "normal",
            knockback,
            hitStun
          }
        );

      }

    },
    impactTime
  );


  setTimeout(
    () => {

      cpuAttackCooldown =
        false;


      updateIdleStates();

    },
    recovery
  );

}


/* ==========================
   PLAYER SPECIAL
========================== */

function playerSpecial() {

  if (
    !playerCanAct() ||
    specialCooldown
  ) {
    return;
  }


  playerSpecialUsage++;


  if (
    playerBlocking
  ) {

    setPlayerBlock(
      false
    );

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


  if (
    selectedCharacter ===
    "brendan"
  ) {

    bigDrive(
      true
    );

  }

  else {

    grandaddyLadder(
      true
    );

  }


  const currentMatch =
    matchId;


  setTimeout(
    () => {

      if (
        currentMatch !==
        matchId
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


/* ==========================
   CPU SPECIAL COOLDOWN
========================== */

function startCpuSpecialCooldown(
  currentMatch
) {

  cpuSpecialCooldown =
    true;


  cpuSpecialReadyTime =
    Date.now() +
    SPECIAL_COOLDOWN;


  setTimeout(
    () => {

      if (
        currentMatch ===
        matchId
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


/* ==========================
   BIG DRIVE
========================== */

function bigDrive(
  playerOwned
) {

  if (
    gameOver
  ) {
    return;
  }


  const fighter =
    playerOwned
      ? playerFighter
      : cpuFighter;


  const model =
    getPixelModel(
      fighter
    );


  if (model) {

    model.classList.add(
      "special-swing"
    );


    setTimeout(
      () => {

        model.classList.remove(
          "special-swing"
        );

      },
      530
    );

  }


  showFightText(
    "BIG DRIVE!"
  );


  setTimeout(
    () => {

      if (
        gameOver
      ) {
        return;
      }


      const ball =
        document.createElement(
          "div"
        );


      ball.className =
        "effect golf-ball";


      effects.appendChild(
        ball
      );


      let x =
        playerOwned
          ? playerX +
            82
          : cpuX +
            5;


      const direction =
        playerOwned
          ? 1
          : -1;


      let frame =
        0;


      const currentMatch =
        matchId;


      const interval =
        setInterval(
          () => {

            if (
              gameOver ||
              currentMatch !==
              matchId
            ) {

              clearInterval(
                interval
              );


              ball.remove();


              return;

            }


            frame++;


            x +=
              18 *
              direction;


            const arc =
              Math.sin(
                Math.min(
                  frame,
                  18
                ) /
                18 *
                Math.PI
              ) *
              19;


            ball.style.left =
              x +
              "px";


            ball.style.bottom =
              57 +
              arc +
              "px";


            const targetX =
              playerOwned
                ? cpuX
                : playerX;


            const targetAvoiding =
              playerOwned
                ? (
                    cpuJumping ||
                    cpuCrouching
                  )
                : (
                    playerJumping ||
                    playerCrouching
                  );


            if (
              Math.abs(
                x -
                targetX
              ) <
              30
            ) {

              if (
                targetAvoiding
              ) {

                createDodgeLabel(
                  playerOwned
                    ? cpuFighter
                    : playerFighter,
                  "DODGED!"
                );

              }

              else {

                if (
                  playerOwned
                ) {

                  damageCPU(
                    BIG_DRIVE_DAMAGE,
                    {
                      type:
                        "special",
                      knockback:
                        38,
                      hitStun:
                        250,
                      strongImpact:
                        true
                    }
                  );

                }

                else {

                  damagePlayer(
                    BIG_DRIVE_DAMAGE,
                    {
                      type:
                        "special",
                      knockback:
                        38,
                      hitStun:
                        250,
                      strongImpact:
                        true
                    }
                  );

                }

              }


              clearInterval(
                interval
              );


              ball.remove();


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


              ball.remove();

            }

          },
          22
        );

    },
    280
  );

}


/* ==========================
   LADDER
========================== */

function grandaddyLadder(
  playerOwned
) {

  if (
    gameOver
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
    getMotionLayer(
      opponent
    );


  const grandaddyModel =
    getPixelModel(
      grandaddy
    );


  const targetJumping =
    playerOwned
      ? cpuJumping
      : playerJumping;


  if (
    targetJumping
  ) {

    createDodgeLabel(
      opponent,
      "MISSED!"
    );


    return;

  }


  /*
  Stop all opponent visual states
  BEFORE starting ladder.
  */

  restoreStandingState(
    opponent
  );


  actionLock =
    true;


  opponent.classList.remove(
    "idle-breathing",
    "walking",
    "crouching",
    "jumping",
    "recovery-shake",
    "hit-animation"
  );


  if (
    grandaddyModel
  ) {

    grandaddyModel.classList.add(
      "hammer-pointing"
    );

  }


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


  const targetX =
    playerOwned
      ? cpuX
      : playerX;


  ladder.style.left =
    targetX -
    5 +
    "px";


  ladder.style.bottom =
    "20px";


  effects.appendChild(
    ladder
  );


  /*
  CLIMB
  */

  const climbAnimation =
    opponentMotion.animate(
      [

        {
          transform:
            "translate3d(0,0,0) rotate(0deg)"
        },

        {
          transform:
            "translate3d(6px,-28px,0) rotate(0deg)"
        },

        {
          transform:
            "translate3d(12px,-58px,0) rotate(0deg)"
        },

        {
          transform:
            "translate3d(18px,-90px,0) rotate(0deg)"
        }

      ],

      {
        duration:
          680,

        fill:
          "forwards",

        easing:
          "ease-in-out"
      }
    );


  /*
  FALL
  */

  setTimeout(
    () => {

      if (
        gameOver
      ) {
        return;
      }


      ladder.animate(
        [

          {
            transform:
              "rotate(0deg)"
          },

          {
            transform:
              "rotate(18deg)"
          },

          {
            transform:
              "rotate(45deg)"
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
            "forwards",

          easing:
            "ease-in"
        }
      );


      /*
      Cancel climb animation FIRST,
      then create fall from exact
      ladder-top position.
      */

      climbAnimation.cancel();


      opponentMotion.style.transform =
        "translate3d(18px,-90px,0) rotate(0deg)";


      void opponentMotion.offsetWidth;


      opponentMotion.animate(
        [

          {
            transform:
              "translate3d(18px,-90px,0) rotate(0deg)"
          },

          {
            transform:
              "translate3d(34px,-68px,0) rotate(20deg)"
          },

          {
            transform:
              "translate3d(52px,-35px,0) rotate(48deg)"
          },

          {
            transform:
              "translate3d(64px,0px,0) rotate(76deg)"
          }

        ],

        {
          duration:
            470,

          fill:
            "forwards",

          easing:
            "ease-in"
        }
      );

    },
    680
  );


  /*
  DAMAGE
  */

  setTimeout(
    () => {

      if (
        gameOver
      ) {
        return;
      }


      roundText.textContent =
        "CRASH!";


      if (
        playerOwned
      ) {

        damageCPU(
          LADDER_DAMAGE,
          {
            type:
              "special",
            knockback:
              0,
            hitStun:
              0,
            suppressKnockback:
              true,
            strongImpact:
              true
          }
        );

      }

      else {

        damagePlayer(
          LADDER_DAMAGE,
          {
            type:
              "special",
            knockback:
              0,
            hitStun:
              0,
            suppressKnockback:
              true,
            strongImpact:
              true
          }
        );

      }

    },
    1110
  );


  /*
  IMPORTANT:
  Allow the fall to visually finish,
  THEN snap back upright.
  */

  setTimeout(
    () => {

      ladder.remove();


      if (
        grandaddyModel
      ) {

        grandaddyModel.classList.remove(
          "hammer-pointing"
        );

      }


      /*
      Brendan / opponent gets a
      COMPLETE standing restoration.

      This resets both motion AND
      visual state.
      */

      restoreStandingState(
        opponent
      );


      /*
      Re-force exact X coordinate.
      */

      updatePositions();


      /*
      Give browser one frame before
      allowing idle animation back.
      */

      requestAnimationFrame(
        () => {

          requestAnimationFrame(
            () => {

              if (
                !gameOver
              ) {

                roundText.textContent =
                  "";


                actionLock =
                  false;


                updateIdleStates();

              }

            }
          );

        }
      );

    },
    1225
  );

}


/* ==========================
   ULTIMATE
========================== */

function playerUltimateAttack() {

  if (
    !playerCanAct()
  ) {
    return;
  }


  if (
    playerUltimate <
    100
  ) {

    showFightText(
      "ULTIMATE NOT READY"
    );


    return;

  }


  if (
    playerBlocking
  ) {

    setPlayerBlock(
      false
    );

  }


  playerUltimate =
    0;


  updateHUD();


  actionLock =
    true;


  strongHitStop(
    130
  );


  setTimeout(
    () => {

      if (
        selectedCharacter ===
        "brendan"
      ) {

        ipoUltimate(
          true
        );

      }

      else {

        backInMyDay(
          true
        );

      }

    },
    130
  );

}


/* ==========================
   IPO
========================== */

function ipoUltimate(
  playerOwned
) {

  if (
    gameOver
  ) {
    return;
  }


  actionLock =
    true;


  roundText.textContent =
    "IPO!";


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


  function ipoHit(
    index
  ) {

    if (
      gameOver
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
      index === 1
        ? "55%"
        : "34%";


    card.style.top =
      70 +
      index *
      32 +
      "px";


    effects.appendChild(
      card
    );


    arena.animate(
      [

        {
          transform:
            "translateX(0)"
        },

        {
          transform:
            index === 2
              ? "translateX(10px)"
              : "translateX(6px)"
        },

        {
          transform:
            index === 2
              ? "translateX(-10px)"
              : "translateX(-6px)"
        },

        {
          transform:
            "translateX(0)"
        }

      ],

      {
        duration:
          index === 2
            ? 260
            : 200
      }
    );


    if (
      index === 2
    ) {

      strongHitStop(
        75
      );

    }

    else {

      strongHitStop(
        45
      );

    }


    if (
      playerOwned
    ) {

      damageCPU(
        IPO_HITS[index],
        {
          type:
            "ultimate",
          ignoreBlock:
            true,
          knockback:
            index === 2
              ? 42
              : 10,
          hitStun:
            180
        }
      );

    }

    else {

      damagePlayer(
        IPO_HITS[index],
        {
          type:
            "ultimate",
          ignoreBlock:
            true,
          knockback:
            index === 2
              ? 42
              : 10,
          hitStun:
            180
        }
      );

    }


    setTimeout(
      () => {

        card.remove();

      },
      430
    );

  }


  setTimeout(
    () => {

      ipoHit(
        0
      );

    },
    220
  );


  setTimeout(
    () => {

      ipoHit(
        1
      );

    },
    560
  );


  setTimeout(
    () => {

      ipoHit(
        2
      );

    },
    900
  );


  setTimeout(
    () => {

      if (
        !gameOver
      ) {

        roundText.textContent =
          "";


        actionLock =
          false;


        updateIdleStates();

      }

    },
    1350
  );

}


/* ==========================
   BACK IN MY DAY
========================== */

function backInMyDay(
  playerOwned
) {

  if (
    gameOver
  ) {
    return;
  }


  const grandaddy =
    playerOwned
      ? playerFighter
      : cpuFighter;


  const brendan =
    playerOwned
      ? cpuFighter
      : playerFighter;


  const grandaddyModel =
    getPixelModel(
      grandaddy
    );


  if (
    grandaddyModel
  ) {

    grandaddyModel.classList.add(
      "hammer-pointing"
    );

  }


  actionLock =
    true;


  roundText.textContent =
    "BACK IN MY DAY...";


  const reaction =
    document.createElement(
      "div"
    );


  reaction.className =
    "effect";


  reaction.textContent =
    "😳 ?!";


  reaction.style.fontSize =
    "42px";


  reaction.style.left =
    fighterScreenX(
      brendan
    ) +
    20 +
    "px";


  reaction.style.bottom =
    "190px";


  effects.appendChild(
    reaction
  );


  setTimeout(
    () => {

      reaction.remove();


      if (
        gameOver
      ) {
        return;
      }


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


        setButtonsStunned(
          true
        );

      }


      brendan.classList.add(
        "stunned"
      );


      createStunVisual(
        brendan
      );


      if (
        grandaddyModel
      ) {

        grandaddyModel.classList.remove(
          "hammer-pointing"
        );

      }


      updateIdleStates();

    },
    550
  );


  setTimeout(
    () => {

      if (
        gameOver
      ) {
        return;
      }


      if (
        playerOwned
      ) {

        cpuStunned =
          false;

      }

      else {

        playerStunned =
          false;


        setButtonsStunned(
          false
        );

      }


      brendan.classList.remove(
        "stunned"
      );


      clearStunVisuals();


      brendan.classList.add(
        "recovery-shake"
      );


      createReleaseVisual(
        brendan
      );


      setTimeout(
        () => {

          brendan.classList.remove(
            "recovery-shake"
          );


          updateIdleStates();

        },
        500
      );

    },
    550 +
    STUN_DURATION
  );

}


/* ==========================
   STUN VISUAL
========================== */

function createStunVisual(
  fighter
) {

  clearStunVisuals();


  const x =
    fighterScreenX(
      fighter
    );


  const stars =
    document.createElement(
      "div"
    );


  stars.className =
    "effect stun-stars stun-visual";


  stars.textContent =
    "⭐ 😵 ⭐";


  stars.style.left =
    x +
    4 +
    "px";


  stars.style.bottom =
    "190px";


  effects.appendChild(
    stars
  );


  const label =
    document.createElement(
      "div"
    );


  label.className =
    "effect stun-label stun-visual";


  label.textContent =
    "STUNNED!";


  label.style.left =
    x +
    4 +
    "px";


  label.style.bottom =
    "235px";


  effects.appendChild(
    label
  );

}


function clearStunVisuals() {

  document
    .querySelectorAll(
      ".stun-visual"
    )
    .forEach(
      element => {

        element.remove();

      }
    );

}


/* ==========================
   RELEASE
========================== */

function createReleaseVisual(
  fighter
) {

  const x =
    fighterScreenX(
      fighter
    );


  const label =
    document.createElement(
      "div"
    );


  label.className =
    "effect release-label";


  label.textContent =
    "SNAPPED OUT OF IT!";


  label.style.left =
    Math.max(
      5,
      x -
      20
    ) +
    "px";


  label.style.bottom =
    "205px";


  effects.appendChild(
    label
  );


  setTimeout(
    () => {

      label.remove();

    },
    750
  );

}


function setButtonsStunned(
  stunned
) {

  [
    blockButton,
    attackButton,
    specialButton,
    ultimateButton
  ].forEach(
    button => {

      button.classList.toggle(
        "stun-disabled",
        stunned
      );

    }
  );

}


/* ==========================
   CPU ADAPTATION
========================== */

function playerIsSpammingSpecial() {

  return (
    playerSpecialUsage >=
      3 &&
    playerSpecialUsage >
      playerNormalUsage *
      0.6
  );

}


function playerIsSpammingNormal() {

  return (
    playerNormalUsage >=
      6 &&
    playerNormalUsage >
      playerSpecialUsage *
      2
  );

}


/* ==========================
   CPU LOOP
========================== */

function cpuLoop(
  currentMatch
) {

  if (
    currentMatch !==
      matchId ||
    gameOver ||
    !matchActive
  ) {
    return;
  }


  if (
    !cpuCanAct()
  ) {

    setTimeout(
      () => {

        cpuLoop(
          currentMatch
        );

      },
      165
    );


    return;

  }


  const distance =
    fighterDistance();


  const roll =
    Math.random();


  const specialSpam =
    playerIsSpammingSpecial();


  const normalSpam =
    playerIsSpammingNormal();


  /*
  CPU ULTIMATE
  */

  if (
    cpuUltimate >=
      100 &&
    roll <
      0.34
  ) {

    cpuUltimate =
      0;


    updateHUD();


    actionLock =
      true;


    strongHitStop(
      130
    );


    setTimeout(
      () => {

        if (
          cpuCharacter ===
          "brendan"
        ) {

          ipoUltimate(
            false
          );

        }

        else {

          backInMyDay(
            false
          );

        }

      },
      130
    );

  }


  /*
  GET INTO RANGE
  */

  else if (
    cpuCharacter ===
      "brendan" &&
    distance >
      165
  ) {

    cpuStep(
      -26
    );

  }


  else if (
    cpuCharacter ===
      "grandaddy" &&
    distance >
      110
  ) {

    cpuStep(
      -32
    );

  }


  /*
  SPECIAL SPAM REACTION
  */

  else if (
    specialSpam &&
    roll <
      0.16
  ) {

    if (
      Math.random() <
      0.5
    ) {

      jumpCPU();

    }

    else {

      crouchCPU(
        520
      );

    }

  }


  /*
  NORMAL SPAM REACTION
  */

  else if (
    normalSpam &&
    roll <
      0.20
  ) {

    cpuBlock(
      540
    );

  }


  /*
  BRENDAN CPU
  */

  else if (
    cpuCharacter ===
    "brendan"
  ) {

    if (
      roll <
      0.51
    ) {

      cpuNormalAttack();

    }


    else if (
      roll <
        0.77 &&
      !cpuSpecialCooldown
    ) {

      startCpuSpecialCooldown(
        currentMatch
      );


      bigDrive(
        false
      );

    }


    else if (
      roll <
      0.86
    ) {

      cpuBlock(
        500
      );

    }


    else if (
      roll <
      0.91
    ) {

      jumpCPU();

    }


    else if (
      roll <
      0.95
    ) {

      crouchCPU();

    }


    else {

      if (
        cpuX >
        arena.clientWidth -
        155
      ) {

        cpuStep(
          -18
        );

      }

      else {

        cpuStep(
          22
        );

      }

    }

  }


  /*
  GRANDADDY CPU
  */

  else {

    if (
      roll <
      0.65
    ) {

      cpuNormalAttack();

    }


    else if (
      roll <
        0.83 &&
      !cpuSpecialCooldown
    ) {

      startCpuSpecialCooldown(
        currentMatch
      );


      grandaddyLadder(
        false
      );

    }


    else if (
      roll <
      0.90
    ) {

      cpuBlock(
        470
      );

    }


    else if (
      roll <
      0.94
    ) {

      jumpCPU();

    }


    else if (
      roll <
      0.97
    ) {

      crouchCPU();

    }


    else {

      cpuStep(
        -16
      );

    }

  }


  setTimeout(
    () => {

      cpuLoop(
        currentMatch
      );

    },
    415 +
    Math.random() *
    145
  );

}


/* ==========================
   KO CHECK
========================== */

function checkKO() {

  if (
    gameOver
  ) {
    return;
  }


  if (
    playerHealth <=
    0
  ) {

    triggerKO(
      playerFighter,
      cpuFighter,
      cpuCharacter
    );

  }


  else if (
    cpuHealth <=
    0
  ) {

    triggerKO(
      cpuFighter,
      playerFighter,
      selectedCharacter
    );

  }

}


/* ==========================
   KO
========================== */

function triggerKO(
  loser,
  winner,
  winnerCharacter
) {

  gameOver =
    true;


  matchActive =
    false;


  fightStarted =
    false;


  actionLock =
    true;


  clearStunVisuals();


  roundText.textContent =
    "";


  restoreStandingState(
    loser
  );


  restoreStandingState(
    winner
  );


  loser.classList.remove(
    "idle-breathing",
    "walking",
    "jumping",
    "crouching",
    "recovery-shake",
    "low-health-fighter"
  );


  winner.classList.remove(
    "idle-breathing",
    "walking",
    "jumping",
    "crouching",
    "recovery-shake",
    "low-health-fighter"
  );


  strongHitStop(
    100
  );


  setTimeout(
    () => {

      loser.classList.add(
        "ko-loser"
      );


      createZZZ(
        loser
      );


      const winnerModel =
        getPixelModel(
          winner
        );


      if (
        winnerModel
      ) {

        winnerModel.classList.add(
          "winner-pose"
        );

      }


      setTimeout(
        () => {

          winnerText.textContent =
            winnerCharacter.toUpperCase() +
            " WINS!";


          koOverlay.classList.remove(
            "hidden"
          );

        },
        650
      );

    },
    100
  );

}


/* ==========================
   ZZZ
========================== */

function createZZZ(
  loser
) {

  const zzz =
    document.createElement(
      "div"
    );


  zzz.className =
    "sleep-zzz";


  zzz.textContent =
    "Z Z Z";


  const x =
    fighterScreenX(
      loser
    );


  zzz.style.left =
    x +
    35 +
    "px";


  zzz.style.bottom =
    "175px";


  effects.appendChild(
    zzz
  );

}


/* ==========================
   NEW GAME
========================== */

newGameButton.addEventListener(
  "click",
  () => {

    matchId++;


    matchActive =
      false;


    fightStarted =
      false;


    gameOver =
      false;


    actionLock =
      false;


    restoreStandingState(
      playerFighter
    );


    restoreStandingState(
      cpuFighter
    );


    effects.innerHTML =
      "";


    koOverlay.classList.add(
      "hidden"
    );


    playerModelSlot.innerHTML =
      "";


    cpuModelSlot.innerHTML =
      "";


    resetControls();


    showScreen(
      selectScreen
    );

  }
);


/* ==========================
   TEXT
========================== */

function showFightText(
  text
) {

  if (
    gameOver
  ) {
    return;
  }


  const currentMatch =
    matchId;


  roundText.textContent =
    text;


  setTimeout(
    () => {

      if (
        currentMatch ===
          matchId &&
        !gameOver
      ) {

        roundText.textContent =
          "";

      }

    },
    750
  );

}


/* ==========================
   BUTTONS
========================== */

attackButton.addEventListener(
  "click",
  playerAttack
);


specialButton.addEventListener(
  "click",
  playerSpecial
);


ultimateButton.addEventListener(
  "click",
  playerUltimateAttack
);


blockButton.addEventListener(
  "pointerdown",
  () => {

    setPlayerBlock(
      true
    );

  }
);


blockButton.addEventListener(
  "pointerup",
  () => {

    setPlayerBlock(
      false
    );

  }
);


blockButton.addEventListener(
  "pointerleave",
  () => {

    setPlayerBlock(
      false
    );

  }
);


blockButton.addEventListener(
  "pointercancel",
  () => {

    setPlayerBlock(
      false
    );

  }
);


/* ==========================
   KEYBOARD
========================== */

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


    keys[key] =
      true;


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


    if (
      key === "s" ||
      key === "arrowdown"
    ) {

      crouchPlayer(
        true
      );

    }


    if (
      key === "i" &&
      !event.repeat
    ) {

      setPlayerBlock(
        true
      );

    }


    if (
      key === "j" &&
      !event.repeat
    ) {

      playerAttack();

    }


    if (
      key === "k" &&
      !event.repeat
    ) {

      playerSpecial();

    }


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


    keys[key] =
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


/* ==========================
   MOVEMENT LOOP
========================== */

function movementLoop() {

  let moving =
    false;


  if (
    playerCanAct()
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


  playerMoving =
    moving;


  playerFighter.classList.toggle(
    "walking",
    moving &&
    !playerJumping &&
    !playerCrouching
  );


  updateIdleStates();


  requestAnimationFrame(
    movementLoop
  );

}


movementLoop();


/* ==========================
   RESET CONTROLS
========================== */

function resetControls() {

  Object.keys(
    keys
  ).forEach(
    key => {

      keys[key] =
        false;

    }
  );


  playerBlocking =
    false;


  playerCrouching =
    false;


  playerMoving =
    false;


  specialButton.disabled =
    false;


  specialButton.classList.remove(
    "cooling-down"
  );


  ultimateButton.classList.remove(
    "ultimate-ready"
  );


  blockButton.classList.remove(
    "block-active"
  );


  playerHealthShell.classList.remove(
    "low-health"
  );


  cpuHealthShell.classList.remove(
    "low-health"
  );


  setButtonsStunned(
    false
  );

}
