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

const playerFighter =
  document.getElementById("playerFighter");

const cpuFighter =
  document.getElementById("cpuFighter");

const playerName =
  document.getElementById("playerName");

const cpuName =
  document.getElementById("cpuName");

const playerHealthBar =
  document.getElementById("playerHealth");

const cpuHealthBar =
  document.getElementById("cpuHealth");

const playerUltimateBar =
  document.getElementById("playerUltimate");

const cpuUltimateBar =
  document.getElementById("cpuUltimate");

const roundText =
  document.getElementById("roundText");

const effects =
  document.getElementById("effects");

const koOverlay =
  document.getElementById("koOverlay");

const winnerText =
  document.getElementById("winnerText");

const newGameButton =
  document.getElementById("newGameButton");


let selectedCharacter =
  "brendan";

let cpuCharacter =
  "grandaddy";


let playerHealth = 100;
let cpuHealth = 100;

let playerUltimate = 0;
let cpuUltimate = 0;


let playerX = 30;
let cpuX = 0;


let gameOver = false;

let playerBlocking = false;

let specialCooldown = false;

let aiSpecialCooldown = false;


/* =========================
   CHARACTER HTML
========================= */

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
      <div class="skin arm right-arm"></div>

      <div class="khaki leg left-leg"></div>
      <div class="khaki leg right-leg"></div>

      <div class="white-shoe left-shoe"></div>
      <div class="white-shoe right-shoe"></div>

      <div class="golf-club"></div>

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

        <div class="mouth grandaddy-mouth"></div>

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
      <div class="skin arm right-arm"></div>

      <div class="black-short leg left-leg"></div>
      <div class="black-short leg right-leg"></div>

      <div class="white-shoe left-shoe"></div>
      <div class="white-shoe right-shoe"></div>

      <div class="hammer"></div>

    </div>
  `;
}


function getCharacterHTML(character) {

  if (character === "brendan") {

    return brendanHTML();

  }

  return grandaddyHTML();

}


/* =========================
   SCREEN SWITCHING
========================= */

function showScreen(screen) {

  titleScreen.classList.remove("active");
  selectScreen.classList.remove("active");
  fightScreen.classList.remove("active");

  screen.classList.add("active");

}


startButton.addEventListener(
  "click",
  () => {

    showScreen(selectScreen);

  }
);


/* =========================
   CHARACTER SELECT
========================= */

fighterCards.forEach(card => {

  card.addEventListener(
    "click",
    () => {

      fighterCards.forEach(other => {

        other.classList.remove("selected");

      });


      card.classList.add("selected");


      selectedCharacter =
        card.dataset.character;


      selectionText.textContent =
        "PLAYER 1: " +
        selectedCharacter.toUpperCase();

    }
  );

});


fightButton.addEventListener(
  "click",
  startFight
);


/* =========================
   START FIGHT
========================= */

function startFight() {

  cpuCharacter =
    selectedCharacter === "brendan"
      ? "grandaddy"
      : "brendan";


  playerHealth = 100;
  cpuHealth = 100;

  playerUltimate = 0;
  cpuUltimate = 0;

  gameOver = false;

  playerBlocking = false;

  specialCooldown = false;
  aiSpecialCooldown = false;


  koOverlay.classList.add("hidden");

  effects.innerHTML = "";


  playerName.textContent =
    selectedCharacter.toUpperCase();

  cpuName.textContent =
    cpuCharacter.toUpperCase();


  playerFighter.innerHTML =
    getCharacterHTML(selectedCharacter);

  cpuFighter.innerHTML =
    getCharacterHTML(cpuCharacter);


  playerFighter.className =
    "fight-character";

  cpuFighter.className =
    "fight-character cpu-facing";


  showScreen(fightScreen);


  setTimeout(
    initializeFight,
    50
  );

}


function initializeFight() {

  playerX = 25;

  cpuX =
    arena.clientWidth - 125;


  updatePositions();

  updateHUD();


  roundText.textContent =
    "FIGHT!";


  setTimeout(
    () => {

      if (!gameOver) {

        roundText.textContent = "";

      }

    },
    1000
  );


  setTimeout(
    cpuLoop,
    1200
  );

}


/* =========================
   POSITION
========================= */

function updatePositions() {

  playerFighter.style.left =
    playerX + "px";

  cpuFighter.style.left =
    cpuX + "px";

}


function fighterDistance() {

  return Math.abs(
    playerX - cpuX
  );

}


/* =========================
   HUD
========================= */

function updateHUD() {

  playerHealth =
    Math.max(
      0,
      playerHealth
    );

  cpuHealth =
    Math.max(
      0,
      cpuHealth
    );


  playerUltimate =
    Math.min(
      100,
      playerUltimate
    );

  cpuUltimate =
    Math.min(
      100,
      cpuUltimate
    );


  playerHealthBar.style.width =
    playerHealth + "%";

  cpuHealthBar.style.width =
    cpuHealth + "%";


  playerUltimateBar.style.width =
    playerUltimate + "%";

  cpuUltimateBar.style.width =
    cpuUltimate + "%";

}


/* =========================
   MOVEMENT
========================= */

function movePlayer(amount) {

  if (gameOver) {
    return;
  }


  playerX += amount;


  playerX =
    Math.max(
      0,
      Math.min(
        playerX,
        arena.clientWidth - 100
      )
    );


  if (
    Math.abs(
      playerX - cpuX
    ) < 70
  ) {

    if (amount > 0) {

      playerX =
        cpuX - 70;

    } else {

      playerX =
        cpuX + 70;

    }

  }


  updatePositions();

}


/* =========================
   DAMAGE
========================= */

function damageCPU(amount) {

  if (gameOver) {
    return;
  }


  cpuHealth -= amount;


  playerUltimate += 14;

  cpuUltimate += 8;


  hitAnimation(cpuFighter);


  updateHUD();

  checkKO();

}


function damagePlayer(amount) {

  if (gameOver) {
    return;
  }


  if (playerBlocking) {

    amount =
      Math.ceil(
        amount * 0.3
      );

  }


  playerHealth -= amount;


  cpuUltimate += 14;

  playerUltimate += 8;


  hitAnimation(playerFighter);


  updateHUD();

  checkKO();

}


/* =========================
   BASIC ANIMATION
========================= */

function attackAnimation(target) {

  const model =
    target.querySelector(
      ".pixel-person"
    );


  if (!model) {
    return;
  }


  model.classList.remove(
    "attack-animation"
  );


  void model.offsetWidth;


  model.classList.add(
    "attack-animation"
  );

}


function hitAnimation(target) {

  target.classList.remove(
    "hit-animation"
  );


  void target.offsetWidth;


  target.classList.add(
    "hit-animation"
  );

}


/* =========================
   PLAYER NORMAL ATTACK
========================= */

function playerAttack() {

  if (gameOver) {
    return;
  }


  attackAnimation(
    playerFighter
  );


  if (
    fighterDistance() < 120
  ) {

    damageCPU(10);


    if (
      selectedCharacter === "brendan"
    ) {

      showFightText(
        "GOLF CLUB!"
      );

    } else {

      showFightText(
        "HAMMER!"
      );

    }

  }

}


/* =========================
   SPECIAL
========================= */

function playerSpecial() {

  if (
    gameOver ||
    specialCooldown
  ) {

    return;

  }


  specialCooldown = true;


  if (
    selectedCharacter ===
    "brendan"
  ) {

    brendanSpecial(true);

  } else {

    grandaddySpecial(true);

  }


  setTimeout(
    () => {

      specialCooldown = false;

    },
    2200
  );

}


/* =========================
   BRENDAN SPECIAL
========================= */

function brendanSpecial(playerOwned) {

  showFightText(
    "SLAP SHOT!"
  );


  const puck =
    document.createElement(
      "div"
    );


  puck.className =
    "effect";


  puck.textContent =
    "🏒";


  puck.style.fontSize =
    "42px";


  effects.appendChild(puck);


  let x =
    playerOwned
      ? playerX + 65
      : cpuX - 25;


  puck.style.bottom =
    "60px";


  const direction =
    playerOwned
      ? 1
      : -1;


  const interval =
    setInterval(
      () => {

        if (gameOver) {

          clearInterval(interval);

          puck.remove();

          return;

        }


        x +=
          direction * 15;


        puck.style.left =
          x + "px";


        const targetX =
          playerOwned
            ? cpuX
            : playerX;


        if (
          Math.abs(
            x - targetX
          ) < 45
        ) {

          if (playerOwned) {

            damageCPU(18);

          } else {

            damagePlayer(18);

          }


          puck.remove();

          clearInterval(interval);

        }


        if (
          x < -80 ||
          x >
            arena.clientWidth + 80
        ) {

          puck.remove();

          clearInterval(interval);

        }

      },
      25
    );

}


/* =========================
   GRANDADDY SPECIAL
========================= */

function grandaddySpecial(
  playerOwned
) {

  showFightText(
    "HOLD THIS LADDER!"
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
    "90px";


  const targetX =
    playerOwned
      ? cpuX
      : playerX;


  ladder.style.left =
    targetX + "px";


  ladder.style.bottom =
    "25px";


  effects.appendChild(
    ladder
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
              "rotate(15deg)"
          },

          {
            transform:
              "rotate(80deg)"
          }

        ],

        {
          duration: 650,

          fill: "forwards"
        }

      );

    },
    250
  );


  setTimeout(
    () => {

      if (gameOver) {
        return;
      }


      if (playerOwned) {

        damageCPU(20);

      } else {

        damagePlayer(20);

      }

    },
    650
  );


  setTimeout(
    () => {

      ladder.remove();

    },
    1400
  );

}


/* =========================
   ULTIMATE
========================= */

function playerUltimateAttack() {

  if (gameOver) {
    return;
  }


  if (
    playerUltimate < 100
  ) {

    showFightText(
      "ULTIMATE NOT READY"
    );

    return;

  }


  playerUltimate = 0;

  updateHUD();


  if (
    selectedCharacter ===
    "brendan"
  ) {

    ipoUltimate(true);

  } else {

    grandaddyUltimate(true);

  }

}


/* =========================
   BRENDAN IPO
========================= */

function ipoUltimate(
  playerOwned
) {

  showFightText(
    "IPO!!!"
  );


  const effect =
    document.createElement(
      "div"
    );


  effect.className =
    "effect";


  effect.textContent =
    "📱 📈 💰";


  effect.style.left =
    "35%";


  effect.style.top =
    "90px";


  effect.style.fontSize =
    "60px";


  effects.appendChild(
    effect
  );


  arena.animate(
    [

      {
        transform:
          "translateX(0)"
      },

      {
        transform:
          "translateX(8px)"
      },

      {
        transform:
          "translateX(-8px)"
      },

      {
        transform:
          "translateX(0)"
      }

    ],

    {
      duration: 500
    }

  );


  setTimeout(
    () => {

      if (gameOver) {
        return;
      }


      if (playerOwned) {

        damageCPU(35);

      } else {

        damagePlayer(35);

      }

    },
    700
  );


  setTimeout(
    () => {

      effect.remove();

    },
    1500
  );

}


/* =========================
   GRANDADDY ULTIMATE
========================= */

function grandaddyUltimate(
  playerOwned
) {

  showFightText(
    "BACK IN MY DAY..."
  );


  const effect =
    document.createElement(
      "div"
    );


  effect.className =
    "effect";


  effect.textContent =
    "💬 ███████!!!";


  effect.style.left =
    "30%";


  effect.style.top =
    "100px";


  effect.style.fontSize =
    "42px";


  effects.appendChild(
    effect
  );


  setTimeout(
    () => {

      if (!gameOver) {

        roundText.textContent =
          "YOU CAN'T SAY THAT ANYMORE!";

      }

    },
    500
  );


  setTimeout(
    () => {

      if (gameOver) {
        return;
      }


      if (playerOwned) {

        damageCPU(35);

      } else {

        damagePlayer(35);

      }

    },
    1000
  );


  setTimeout(
    () => {

      effect.remove();

    },
    1800
  );

}


/* =========================
   CPU AI
========================= */

function cpuLoop() {

  if (
    gameOver ||
    !fightScreen.classList.contains(
      "active"
    )
  ) {

    return;

  }


  const distance =
    fighterDistance();


  if (
    cpuUltimate >= 100 &&
    Math.random() < 0.25
  ) {

    cpuUltimate = 0;

    updateHUD();


    if (
      cpuCharacter === "brendan"
    ) {

      ipoUltimate(false);

    } else {

      grandaddyUltimate(false);

    }

  }


  else if (
    distance > 135
  ) {

    cpuX -= 18;

  }


  else {

    const roll =
      Math.random();


    if (
      roll < 0.55
    ) {

      cpuNormalAttack();

    }


    else if (
      roll < 0.78 &&
      !aiSpecialCooldown
    ) {

      aiSpecialCooldown =
        true;


      if (
        cpuCharacter === "brendan"
      ) {

        brendanSpecial(false);

      } else {

        grandaddySpecial(false);

      }


      setTimeout(
        () => {

          aiSpecialCooldown =
            false;

        },
        2600
      );

    }


    else {

      cpuX += 25;

    }

  }


  cpuX =
    Math.max(
      playerX + 70,
      Math.min(
        cpuX,
        arena.clientWidth - 100
      )
    );


  updatePositions();


  setTimeout(
    cpuLoop,
    700
  );

}


/* =========================
   CPU NORMAL ATTACK
========================= */

function cpuNormalAttack() {

  attackAnimation(
    cpuFighter
  );


  if (
    fighterDistance() < 125
  ) {

    damagePlayer(9);


    if (
      cpuCharacter ===
      "brendan"
    ) {

      showFightText(
        "GOLF CLUB!"
      );

    } else {

      showFightText(
        "HAMMER!"
      );

    }

  }

}


/* =========================
   KO SYSTEM
========================= */

function checkKO() {

  if (
    gameOver
  ) {

    return;

  }


  if (
    playerHealth <= 0
  ) {

    triggerKO(
      playerFighter,
      cpuCharacter
    );

  }


  else if (
    cpuHealth <= 0
  ) {

    triggerKO(
      cpuFighter,
      selectedCharacter
    );

  }

}


function triggerKO(
  loser,
  winnerCharacter
) {

  gameOver = true;


  roundText.textContent =
    "";


  loser.classList.add(
    "ko-loser"
  );


  createZZZ(loser);


  setTimeout(
    () => {

      winnerText.textContent =
        winnerCharacter
          .toUpperCase() +
        " WINS!";


      koOverlay.classList.remove(
        "hidden"
      );

    },
    650
  );

}


/* =========================
   ZZZ
========================= */

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


  const loserLeft =
    parseFloat(
      loser.style.left
    ) || 0;


  zzz.style.left =
    loserLeft + 30 + "px";


  zzz.style.bottom =
    "175px";


  effects.appendChild(
    zzz
  );

}


/* =========================
   NEW GAME
========================= */

newGameButton.addEventListener(
  "click",
  () => {

    effects.innerHTML =
      "";


    koOverlay.classList.add(
      "hidden"
    );


    playerFighter.innerHTML =
      "";

    cpuFighter.innerHTML =
      "";


    showScreen(
      selectScreen
    );

  }
);


/* =========================
   MESSAGE
========================= */

function showFightText(text) {

  if (gameOver) {
    return;
  }


  roundText.textContent =
    text;


  setTimeout(
    () => {

      if (!gameOver) {

        roundText.textContent =
          "";

      }

    },
    900
  );

}


/* =========================
   BUTTON CONTROLS
========================= */

document
  .getElementById(
    "leftButton"
  )
  .addEventListener(
    "click",
    () => {

      movePlayer(-28);

    }
  );


document
  .getElementById(
    "rightButton"
  )
  .addEventListener(
    "click",
    () => {

      movePlayer(28);

    }
  );


document
  .getElementById(
    "attackButton"
  )
  .addEventListener(
    "click",
    playerAttack
  );


document
  .getElementById(
    "specialButton"
  )
  .addEventListener(
    "click",
    playerSpecial
  );


document
  .getElementById(
    "ultimateButton"
  )
  .addEventListener(
    "click",
    playerUltimateAttack
  );


const blockButton =
  document.getElementById(
    "blockButton"
  );


blockButton.addEventListener(
  "pointerdown",
  () => {

    if (gameOver) {
      return;
    }


    playerBlocking = true;

    playerFighter.style.opacity =
      "0.55";

  }
);


function stopBlocking() {

  playerBlocking = false;

  playerFighter.style.opacity =
    "1";

}


blockButton.addEventListener(
  "pointerup",
  stopBlocking
);

blockButton.addEventListener(
  "pointercancel",
  stopBlocking
);

blockButton.addEventListener(
  "pointerleave",
  stopBlocking
);


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      !fightScreen
        .classList
        .contains("active")
    ) {

      return;

    }


    if (
      event.key === "ArrowLeft"
    ) {

      movePlayer(-28);

    }


    if (
      event.key === "ArrowRight"
    ) {

      movePlayer(28);

    }


    if (
      event.key.toLowerCase()
      === "z"
    ) {

      playerAttack();

    }


    if (
      event.key.toLowerCase()
      === "x"
    ) {

      playerSpecial();

    }


    if (
      event.key.toLowerCase()
      === "c"
    ) {

      playerUltimateAttack();

    }

  }
);
