/* =====================================================
   BLOODLINE BRAWL — CHARACTER / HUD / ROSTER PATCHES
   Loaded after the working base game and game-updates.js.
   Keeps the large working files intact and adds only requested features.
===================================================== */

const bbCharacterStyle =
  document.createElement("style");

bbCharacterStyle.textContent = `

  /* ===================================================
     MARTIN — GROUND ALIGNMENT + REVERSED BASE ORIENTATION

     Martin's art is drawn facing the opposite direction from the humans.
     The extra scaleX(-1) corrects that while the normal fighter facing
     system still flips the outer fighter container when sides cross.
  =================================================== */

  .fight-character .martin-model {
    transform: translateY(80px) scaleX(-1);
  }


  /* ===================================================
     SEAN — ICE CREAM CONE WEAPON
  =================================================== */

  .ice-cream-cone-weapon {
    position: absolute;
    width: 30px;
    height: 67px;
    left: -7px;
    top: -5px;
    transform: rotate(20deg);
    transform-origin: 50% 78%;
    z-index: 24;
  }

  .ice-cream-cone-weapon::before {
    content: "";
    position: absolute;
    width: 30px;
    height: 31px;
    left: 0;
    top: 0;
    border: 3px solid #111;
    border-radius: 50% 50% 44% 44%;
    background:
      radial-gradient(circle at 34% 30%, #fff9e4 0 18%, #f6c6d8 19% 48%, #e788ad 49% 100%);
    box-shadow: inset -4px -3px 0 rgba(0,0,0,0.08);
    z-index: 2;
  }

  .ice-cream-cone-weapon::after {
    content: "";
    position: absolute;
    left: 4px;
    top: 27px;
    width: 22px;
    height: 39px;
    background:
      repeating-linear-gradient(55deg, transparent 0 6px, rgba(113,70,27,0.32) 6px 8px),
      repeating-linear-gradient(-55deg, #d99b54 0 7px, #efbc72 7px 14px);
    border-left: 3px solid #111;
    border-right: 3px solid #111;
    border-bottom: 3px solid #111;
    clip-path: polygon(0 0, 100% 0, 50% 100%);
  }


  /* ===================================================
     MOM / KELLY
  =================================================== */

  .kelly-hair {
    position: absolute;
    width: 52px;
    height: 42px;
    left: 25px;
    top: 14px;
    background: #6a4328;
    border: 3px solid #111;
    border-radius: 12px 12px 5px 5px;
    z-index: 5;
  }

  .kelly-hair::before,
  .kelly-hair::after {
    content: "";
    position: absolute;
    width: 12px;
    height: 36px;
    top: 18px;
    background: #6a4328;
    border-bottom: 3px solid #111;
  }

  .kelly-hair::before {
    left: -7px;
    border-left: 3px solid #111;
  }

  .kelly-hair::after {
    right: -7px;
    border-right: 3px solid #111;
  }

  .kelly-model .face {
    z-index: 8;
  }

  .kelly-shirt {
    position: absolute;
    width: 59px;
    height: 62px;
    left: 21px;
    top: 71px;
    background: #161616;
    border: 3px solid #111;
  }

  .kelly-pants {
    background: #7b7f86;
  }

  .shovel-weapon {
    position: absolute;
    width: 7px;
    height: 69px;
    left: 5px;
    top: 4px;
    background: #8a6239;
    border: 2px solid #111;
    transform: rotate(24deg);
    transform-origin: bottom center;
  }

  .shovel-weapon::before {
    content: "";
    position: absolute;
    width: 27px;
    height: 30px;
    left: -11px;
    top: -24px;
    background: #8c959b;
    border: 3px solid #111;
    border-radius: 4px 4px 12px 12px;
    clip-path: polygon(10% 0, 90% 0, 100% 58%, 50% 100%, 0 58%);
  }

  .kelly-model.weapon-attacking .weapon-arm {
    animation: bbShovelSwing 330ms ease-out 1;
  }

  @keyframes bbShovelSwing {
    0%   { transform: rotate(0deg); }
    30%  { transform: rotate(-22deg); }
    68%  { transform: rotate(34deg); }
    100% { transform: rotate(3deg); }
  }


  /* ===================================================
     LEAH
  =================================================== */

  .leah-model {
    height: 178px;
  }

  .leah-hood {
    position: absolute;
    width: 58px;
    height: 52px;
    left: 22px;
    top: 17px;
    background: #737980;
    border: 3px solid #111;
    border-radius: 18px 18px 8px 8px;
    z-index: 3;
  }

  .leah-hair {
    position: absolute;
    width: 49px;
    height: 31px;
    left: 26px;
    top: 18px;
    background: #111;
    border: 3px solid #111;
    border-radius: 10px 10px 5px 5px;
    z-index: 9;
  }

  .leah-model .face {
    top: 29px;
    z-index: 8;
  }

  .leah-shirt {
    position: absolute;
    width: 58px;
    height: 59px;
    left: 21px;
    top: 69px;
    background: #777d84;
    border: 3px solid #111;
    z-index: 4;
  }

  .leah-model .arm {
    top: 74px;
    height: 53px;
  }

  .leah-blue-pants {
    background: #356ba5;
  }

  .leah-model .leg {
    top: 124px;
    height: 49px;
  }

  .leah-model .white-shoe {
    top: 165px;
  }

  .knitting-needles {
    position: absolute;
    width: 32px;
    height: 58px;
    left: -8px;
    top: 5px;
    z-index: 22;
  }

  .knitting-needles::before,
  .knitting-needles::after {
    content: "";
    position: absolute;
    width: 4px;
    height: 58px;
    left: 14px;
    top: 0;
    background: #d6dde2;
    border: 1px solid #111;
    border-radius: 3px;
    transform-origin: bottom center;
  }

  .knitting-needles::before {
    transform: rotate(22deg);
  }

  .knitting-needles::after {
    transform: rotate(-16deg);
  }

  .leah-model.weapon-attacking .weapon-arm {
    animation: bbNeedleJab 295ms ease-out 1;
  }

  @keyframes bbNeedleJab {
    0%   { transform: translateX(0) rotate(0deg); }
    30%  { transform: translateX(-4px) rotate(5deg); }
    70%  { transform: translateX(18px) rotate(-5deg); }
    100% { transform: translateX(1px) rotate(0deg); }
  }


  /* ===================================================
     MELEE HUD ORB
  =================================================== */

  .bb-melee-orb {
    --fill: 360deg;
    color: #ff9b3f;
    box-shadow: 0 0 12px rgba(255,155,63,0.28);
  }

  .bb-melee-unit {
    pointer-events: none;
  }

  .bb-melee-glyph {
    font-size: 23px;
    line-height: 1;
    filter: drop-shadow(1px 2px 0 rgba(0,0,0,0.45));
  }

  .bb-mini-club {
    position: relative;
    width: 5px;
    height: 30px;
    background: #d8dde0;
    border: 1px solid #111;
    transform: rotate(26deg);
  }

  .bb-mini-club::after {
    content: "";
    position: absolute;
    width: 13px;
    height: 7px;
    left: -1px;
    bottom: -3px;
    background: #a4aaae;
    border: 1px solid #111;
  }

  .bb-mini-shovel {
    position: relative;
    width: 4px;
    height: 28px;
    background: #b17b45;
    transform: rotate(22deg);
  }

  .bb-mini-shovel::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 14px;
    left: -6px;
    top: -10px;
    background: #aab0b4;
    border: 1px solid #111;
    border-radius: 2px 2px 7px 7px;
  }


  /* ===================================================
     MOM SPECIAL — LARGE PILLS
  =================================================== */

  .bb-pill-projectile {
    width: 82px;
    height: 34px;
    border: 4px solid #111;
    border-radius: 22px;
    background: linear-gradient(90deg, #f6f6f6 0 50%, #ef5772 50% 100%);
    box-shadow: 0 4px 0 rgba(0,0,0,0.18);
    transform: rotate(-5deg);
  }

  .bb-pill-projectile::after {
    content: "";
    position: absolute;
    left: 37px;
    top: 0;
    width: 4px;
    height: 100%;
    background: #111;
    opacity: 0.35;
  }


  /* ===================================================
     MOM ULTIMATE — PATIENT ZERO
  =================================================== */

  .bb-patient-cloud,
  .bb-patient-engulf {
    width: 145px;
    height: 105px;
    border-radius: 48%;
    background:
      radial-gradient(circle at 24% 52%, rgba(94,220,75,.92) 0 18%, transparent 20%),
      radial-gradient(circle at 53% 28%, rgba(133,75,190,.9) 0 21%, transparent 23%),
      radial-gradient(circle at 76% 62%, rgba(88,195,71,.92) 0 22%, transparent 24%),
      radial-gradient(circle at 48% 70%, rgba(154,83,205,.85) 0 25%, transparent 27%),
      rgba(93,139,72,.34);
    filter: drop-shadow(0 0 12px rgba(110,238,80,.55));
    border: 3px solid rgba(67,70,49,.65);
  }

  .bb-patient-cloud {
    animation: bbCloudPulse 600ms ease-in-out infinite alternate;
  }

  .bb-patient-engulf {
    animation: bbEngulf 900ms ease-out 1 forwards;
  }

  @keyframes bbCloudPulse {
    from { filter: drop-shadow(0 0 8px rgba(110,238,80,.45)); }
    to   { filter: drop-shadow(0 0 18px rgba(158,92,220,.65)); }
  }

  @keyframes bbEngulf {
    0%   { transform: scale(.35); opacity: 0; }
    35%  { transform: scale(1.18); opacity: .95; }
    100% { transform: scale(1.38); opacity: 0; }
  }


  /* ===================================================
     LEAH SPECIAL / ULTIMATE — YARN
  =================================================== */

  .bb-yarn-ball {
    width: 74px;
    height: 74px;
    border-radius: 50%;
    border: 4px solid #111;
    background:
      repeating-radial-gradient(circle at 40% 42%, #f0528b 0 5px, #b73f78 6px 9px, #ff7eab 10px 13px);
    box-shadow: inset -8px -8px 0 rgba(0,0,0,.12), 0 5px 0 rgba(0,0,0,.18);
    animation: bbYarnRoll 430ms linear infinite;
  }

  .bb-yarn-ultimate {
    width: 88px;
    height: 88px;
    background:
      repeating-radial-gradient(circle at 45% 40%, #8f69df 0 6px, #5e43ad 7px 11px, #d06be0 12px 16px);
    animation: bbYarnRollBounce 470ms linear infinite;
  }

  @keyframes bbYarnRoll {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @keyframes bbYarnRollBounce {
    0%   { transform: translateY(0) rotate(0deg); }
    35%  { transform: translateY(-17px) rotate(125deg); }
    70%  { transform: translateY(0) rotate(250deg); }
    100% { transform: translateY(-5px) rotate(360deg); }
  }

  .bb-yarn-wrap {
    width: 86px;
    height: 128px;
    border-radius: 45%;
    border: 7px dashed #f45a96;
    box-shadow:
      inset 0 0 0 5px rgba(239,83,145,.22),
      0 0 13px rgba(239,83,145,.55);
    animation: bbWrapTighten 350ms ease-out 1;
  }

  .bb-yarn-wrap::before,
  .bb-yarn-wrap::after {
    content: "";
    position: absolute;
    left: -3px;
    width: 83px;
    height: 4px;
    background: #f45a96;
    border: 2px solid #9a2857;
    transform: rotate(17deg);
  }

  .bb-yarn-wrap::before { top: 34px; }
  .bb-yarn-wrap::after  { top: 78px; transform: rotate(-15deg); }

  @keyframes bbWrapTighten {
    0%   { transform: scale(1.4); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

document.head.appendChild(
  bbCharacterStyle
);


/* =====================================================
   ROSTER + BALANCE
===================================================== */

if (
  !BASE_ROSTER.includes("kelly")
) {
  BASE_ROSTER.push(
    "kelly"
  );
}

if (
  !BASE_ROSTER.includes("leah")
) {
  BASE_ROSTER.push(
    "leah"
  );
}

[
  "kelly",
  "leah"
].forEach(
  character => {

    if (
      !ALL_ROSTER.includes(
        character
      )
    ) {
      const martinIndex =
        ALL_ROSTER.indexOf(
          "martin"
        );

      ALL_ROSTER.splice(
        martinIndex >= 0
          ? martinIndex
          : ALL_ROSTER.length,
        0,
        character
      );
    }
  }
);

STATS.kelly = {
  hp: 100,
  basic: 5.5,
  range: 112,
  recovery: 500,
  specialDamage: 13,
  ultimateDamage: 27
};

STATS.leah = {
  hp: 100,
  basic: 5.5,
  range: 102,
  recovery: 465,
  specialStun: 3000,
  ultimateDamage: 27
};


/* =====================================================
   NAMES
   "kelly" is the internal key for Mom, matching the earlier design.
===================================================== */

const bbOriginalDisplayName =
  displayName;

displayName = function(
  character
) {

  if (
    character === "kelly"
  ) {
    return "MOM";
  }

  if (
    character === "leah"
  ) {
    return "LEAH";
  }

  return bbOriginalDisplayName(
    character
  );
};


/* =====================================================
   CHARACTER HTML
   Also permanently swaps Sean's bat for the ice cream cone.
===================================================== */

const bbOriginalCharacterHTML =
  characterHTML;

characterHTML = function(
  character
) {

  if (
    character === "kelly"
  ) {
    return `
      <div class="pixel-person kelly-model">
        <div class="kelly-hair"></div>

        <div class="face">
          <div class="eye eye-left"></div>
          <div class="eye eye-right"></div>
          <div class="mouth"></div>
        </div>

        <div class="kelly-shirt"></div>

        <div class="arm left-arm"></div>

        <div class="arm right-arm weapon-arm">
          <div class="shovel-weapon"></div>
        </div>

        <div class="kelly-pants leg left-leg"></div>
        <div class="kelly-pants leg right-leg"></div>

        <div class="dark-shoe left-shoe"></div>
        <div class="dark-shoe right-shoe"></div>
      </div>
    `;
  }

  if (
    character === "leah"
  ) {
    return `
      <div class="pixel-person leah-model">
        <div class="leah-hood"></div>
        <div class="leah-hair"></div>

        <div class="face">
          <div class="eye eye-left"></div>
          <div class="eye eye-right"></div>
          <div class="mouth"></div>
        </div>

        <div class="leah-shirt"></div>

        <div class="arm left-arm"></div>

        <div class="arm right-arm weapon-arm">
          <div class="knitting-needles"></div>
        </div>

        <div class="leah-blue-pants leg left-leg"></div>
        <div class="leah-blue-pants leg right-leg"></div>

        <div class="white-shoe left-shoe"></div>
        <div class="white-shoe right-shoe"></div>
      </div>
    `;
  }

  const html =
    bbOriginalCharacterHTML(
      character
    );

  if (
    character === "sean"
  ) {
    return html.replace(
      '<div class="baseball-bat"></div>',
      '<div class="ice-cream-cone-weapon"></div>'
    );
  }

  return html;
};


/* =====================================================
   SPECIAL / ULTIMATE ICONS FOR NEW FIGHTERS
===================================================== */

const bbOriginalSpecialIconHTML =
  specialIconHTML;

specialIconHTML = function(
  character
) {

  if (
    character === "kelly"
  ) {
    return '<div class="bb-melee-glyph">💊</div>';
  }

  if (
    character === "leah"
  ) {
    return '<div class="bb-melee-glyph">🧶</div>';
  }

  return bbOriginalSpecialIconHTML(
    character
  );
};

const bbOriginalUltimateIconHTML =
  ultimateIconHTML;

ultimateIconHTML = function(
  character
) {

  if (
    character === "kelly"
  ) {
    return '<div class="bb-melee-glyph">☣</div>';
  }

  if (
    character === "leah"
  ) {
    return '<div class="bb-melee-glyph">🧶</div>';
  }

  return bbOriginalUltimateIconHTML(
    character
  );
};


/* =====================================================
   CHARACTER SELECT CARDS
===================================================== */

const bbFighterSelect =
  document.querySelector(
    ".fighter-select"
  );

function bbCreateFighterCard(
  character,
  name,
  description
) {

  if (
    document.querySelector(
      `.fighter-card[data-character="${character}"]`
    )
  ) {
    return;
  }

  const card =
    document.createElement(
      "button"
    );

  card.className =
    "fighter-card";

  card.dataset.character =
    character;

  card.innerHTML = `
    <div
      class="card-model-holder"
      data-preview="${character}"
    ></div>
    <strong>${name}</strong>
    <small>${description}</small>
  `;

  martinCard.before(
    card
  );
}

bbCreateFighterCard(
  "kelly",
  "MOM",
  "Shovel • Take Your Meds! • Patient Zero"
);

bbCreateFighterCard(
  "leah",
  "LEAH",
  "Knitting Needles • Tangled! • Yarnageddon!"
);

const bbSeanCardText =
  document.querySelector(
    '.fighter-card[data-character="sean"] small'
  );

if (
  bbSeanCardText
) {
  bbSeanCardText.textContent =
    "Ice Cream Cone • Plates • Zombie Deer";
}


function bbNormalizeSelectionCards() {

  document
    .querySelectorAll(
      ".fighter-card"
    )
    .forEach(
      card => {

        card.classList.toggle(
          "p1-selected",
          card.dataset.character ===
            player1Character
        );

        card.classList.toggle(
          "p2-selected",
          gameMode === "2P" &&
          card.dataset.character ===
            player2Character
        );

      }
    );
}


if (
  bbFighterSelect
) {
  bbFighterSelect.addEventListener(
    "click",
    event => {

      const card =
        event.target.closest(
          ".fighter-card"
        );

      if (
        !card ||
        !bbFighterSelect.contains(
          card
        )
      ) {
        return;
      }

      const character =
        card.dataset.character;

      const isNewCharacter =
        character === "kelly" ||
        character === "leah";

      if (
        isNewCharacter
      ) {

        if (
          gameMode === "1P"
        ) {
          player1Character =
            character;

          selectionText.textContent =
            "PLAYER 1: " +
            displayName(
              character
            );

          mapSelectButton.disabled =
            false;
        }

        else if (
          selectionStage === 1
        ) {
          player1Character =
            character;

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
        }

        else {
          player2Character =
            character;

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
        }
      }

      /*
        Existing cards run their original click handlers first.
        Normalizing after the click also clears stale highlights from
        the dynamically-added Mom / Leah cards.
      */
      setTimeout(
        bbNormalizeSelectionCards,
        0
      );
    }
  );
}


const bbOriginalResetSelection =
  resetSelection;

resetSelection = function() {
  bbOriginalResetSelection();

  document
    .querySelectorAll(
      ".fighter-card"
    )
    .forEach(
      card =>
        card.classList.remove(
          "p1-selected",
          "p2-selected"
        )
    );
};


/* =====================================================
   MELEE HUD — THIRD ORB BESIDE SPECIAL + ULTIMATE
===================================================== */

function bbMeleeIconHTML(
  character
) {

  const icons = {
    brendan:
      '<div class="bb-mini-club"></div>',
    grandaddy:
      '<div class="bb-melee-glyph">🔨</div>',
    connor:
      '<div class="bb-melee-glyph">🖌️</div>',
    erin:
      '<div class="bb-melee-glyph">🪮</div>',
    shannan:
      '<div class="bb-melee-glyph">💉</div>',
    liam:
      '<div class="bb-melee-glyph">🏉</div>',
    grandmommy:
      '<div class="bb-melee-glyph">🍳</div>',
    sean:
      '<div class="bb-melee-glyph">🍦</div>',
    martin:
      '<div class="bb-melee-glyph">🐾</div>',
    kelly:
      '<div class="bb-mini-shovel"></div>',
    leah:
      '<div class="bb-melee-glyph">🪡</div>'
  };

  return icons[
    character
  ] || "";
}


function bbEnsureMeleeHud() {

  const p1Abilities =
    document.querySelector(
      ".p1-abilities"
    );

  const p2Abilities =
    document.querySelector(
      ".p2-abilities"
    );

  if (
    p1Abilities &&
    !document.getElementById(
      "player1MeleeOrb"
    )
  ) {
    const unit =
      document.createElement(
        "div"
      );

    unit.className =
      "ability-unit bb-melee-unit";

    unit.innerHTML = `
      <div
        id="player1MeleeOrb"
        class="ability-orb bb-melee-orb"
      >
        <div
          id="player1MeleeIcon"
          class="ability-icon"
        ></div>
      </div>
      <span
        id="player1MeleeKey"
        class="ability-key"
      >R</span>
    `;

    p1Abilities.insertBefore(
      unit,
      p1Abilities.firstElementChild
    );
  }

  if (
    p2Abilities &&
    !document.getElementById(
      "player2MeleeOrb"
    )
  ) {
    const unit =
      document.createElement(
        "div"
      );

    unit.className =
      "ability-unit bb-melee-unit";

    unit.innerHTML = `
      <div
        id="player2MeleeOrb"
        class="ability-orb bb-melee-orb"
      >
        <div
          id="player2MeleeIcon"
          class="ability-icon"
        ></div>
      </div>
      <span
        id="player2MeleeKey"
        class="ability-key"
      >CPU</span>
    `;

    p2Abilities.insertBefore(
      unit,
      p2Abilities.firstElementChild
    );
  }
}


function bbRefreshMeleeHud() {

  bbEnsureMeleeHud();

  const p1Icon =
    document.getElementById(
      "player1MeleeIcon"
    );

  const p2Icon =
    document.getElementById(
      "player2MeleeIcon"
    );

  const p1Key =
    document.getElementById(
      "player1MeleeKey"
    );

  const p2Key =
    document.getElementById(
      "player2MeleeKey"
    );

  if (
    p1Icon
  ) {
    p1Icon.innerHTML =
      bbMeleeIconHTML(
        P1.character
      );
  }

  if (
    p2Icon
  ) {
    p2Icon.innerHTML =
      bbMeleeIconHTML(
        P2.character
      );
  }

  if (
    p1Key
  ) {
    p1Key.textContent =
      "R";
  }

  if (
    p2Key
  ) {
    p2Key.textContent =
      gameMode === "2P"
        ? "J"
        : "CPU";
  }
}

bbEnsureMeleeHud();

const bbOriginalBeginMatch =
  beginMatch;

beginMatch = function() {
  bbOriginalBeginMatch();
  bbRefreshMeleeHud();
};


/* =====================================================
   MOM SPECIAL — TAKE YOUR MEDS!
===================================================== */

function bbTakeYourMeds(
  attacker,
  target
) {

  addComicText(
    "TAKE YOUR MEDS!",
    "pink-text",
    1800
  );

  const pills =
    document.createElement(
      "div"
    );

  pills.className =
    "effect bb-pill-projectile";

  pills.style.bottom =
    76 +
    attacker.y +
    "px";

  setTimeout(
    () => {
      moveProjectile(
        pills,
        attacker,
        target,
        9,
        40,
        () => {
          dealDamage(
            attacker,
            target,
            13,
            {
              type:
                "special"
            }
          );
        },
        "low"
      );
    },
    420
  );
}


/* =====================================================
   LEAH SPECIAL — TANGLED! (EXACTLY 3 SECOND STUN)
===================================================== */

function bbTangled(
  attacker,
  target
) {

  addComicText(
    "TANGLED!",
    "purple-text",
    1900
  );

  const yarn =
    document.createElement(
      "div"
    );

  yarn.className =
    "effect bb-yarn-ball";

  yarn.style.bottom =
    65 +
    attacker.y +
    "px";

  setTimeout(
    () => {
      moveProjectile(
        yarn,
        attacker,
        target,
        8,
        42,
        () => {

          const wrap =
            document.createElement(
              "div"
            );

          wrap.className =
            "effect bb-yarn-wrap";

          wrap.style.left =
            target.x -
            12 +
            "px";

          wrap.style.bottom =
            48 +
            target.y +
            "px";

          effects.appendChild(
            wrap
          );

          stunTarget(
            target,
            3000
          );

          setTimeout(
            () =>
              wrap.remove(),
            3000
          );
        },
        "low"
      );
    },
    420
  );
}


/* =====================================================
   MOM ULTIMATE — PATIENT ZERO
===================================================== */

function bbPatientZero(
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

  const cloud =
    document.createElement(
      "div"
    );

  cloud.className =
    "effect bb-patient-cloud";

  const startX =
    attacker.x +
    attacker.facing *
    35;

  cloud.style.left =
    startX +
    "px";

  cloud.style.bottom =
    54 +
    attacker.y +
    "px";

  effects.appendChild(
    cloud
  );

  const travel =
    target.x -
    startX;

  cloud.animate(
    [
      {
        transform:
          "translateX(0) scale(.35)",
        opacity:
          .2
      },
      {
        transform:
          `translateX(${travel * .52}px) scale(.9)`,
        opacity:
          .8
      },
      {
        transform:
          `translateX(${travel}px) scale(1.28)`,
        opacity:
          .95
      }
    ],
    {
      duration:
        1200,
      easing:
        "ease-in-out",
      fill:
        "forwards"
    }
  );

  setTimeout(
    () => {

      const engulf =
        document.createElement(
          "div"
        );

      engulf.className =
        "effect bb-patient-engulf";

      engulf.style.left =
        target.x -
        28 +
        "px";

      engulf.style.bottom =
        50 +
        target.y +
        "px";

      effects.appendChild(
        engulf
      );

      dealDamage(
        attacker,
        target,
        27,
        {
          type:
            "ultimate",
          ignoreBlock:
            true
        }
      );

      setTimeout(
        () =>
          engulf.remove(),
        950
      );
    },
    1220
  );

  setTimeout(
    () =>
      cloud.remove(),
    2050
  );

  setTimeout(
    () => {
      actionLock =
        false;
    },
    2350
  );
}


/* =====================================================
   LEAH ULTIMATE — YARNAGEDDON! (3 x 9 = 27)
===================================================== */

function bbYarnageddon(
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

  [
    0,
    1,
    2
  ].forEach(
    index => {

      setTimeout(
        () => {

          const yarn =
            document.createElement(
              "div"
            );

          yarn.className =
            "effect bb-yarn-ball bb-yarn-ultimate";

          yarn.style.bottom =
            46 +
            (
              index % 2
            ) *
            34 +
            "px";

          moveProjectile(
            yarn,
            attacker,
            target,
            10,
            44,
            () => {
              dealDamage(
                attacker,
                target,
                9,
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
        380 +
        index *
        430
      );
    }
  );

  setTimeout(
    () => {
      actionLock =
        false;
    },
    2500
  );
}


/* =====================================================
   SPECIAL / ULTIMATE ROUTERS FOR MOM + LEAH
   Existing fighters still go through the original routers unchanged.
===================================================== */

const bbOriginalSpecialAttack =
  specialAttack;

specialAttack = function(
  attacker,
  target
) {

  if (
    attacker.character !== "kelly" &&
    attacker.character !== "leah"
  ) {
    return bbOriginalSpecialAttack(
      attacker,
      target
    );
  }

  if (
    !canAct(attacker) ||
    attacker.specialCooldown
  ) {
    return;
  }

  beginSpecialCooldown(
    attacker
  );

  if (
    attacker.character === "kelly"
  ) {
    bbTakeYourMeds(
      attacker,
      target
    );
  }

  else {
    bbTangled(
      attacker,
      target
    );
  }
};


const bbOriginalUltimateAttack =
  ultimateAttack;

ultimateAttack = function(
  attacker,
  target
) {

  if (
    attacker.character !== "kelly" &&
    attacker.character !== "leah"
  ) {
    return bbOriginalUltimateAttack(
      attacker,
      target
    );
  }

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

  if (
    attacker.character === "kelly"
  ) {
    bbPatientZero(
      attacker,
      target
    );
  }

  else {
    bbYarnageddon(
      attacker,
      target
    );
  }
};


/* =====================================================
   FINAL RENDER REFRESH
   New cards, Sean's cone, and expanded title roster become visible now.
===================================================== */

renderPreviews();
generateTitleMatchup();
bbNormalizeSelectionCards();
