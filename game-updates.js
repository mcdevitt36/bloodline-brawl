/* =====================================================
   BLOODLINE BRAWL — SAFE ADDITIVE PATCHES
   Loaded after script.js so the working base game stays intact.
===================================================== */

/* =====================================================
   2 PLAYER — PLAYER 1 R/E CONTROL FIX
   R = BASIC / MELEE
   E = SPECIAL
   F = ULTIMATE remains handled by the base game.
===================================================== */

document.addEventListener(
  "keydown",
  event => {

    if (
      gameMode !== "2P" ||
      document.body.classList.contains("bb-online-active") ||
      !fightScreen.classList.contains("active") ||
      event.repeat
    ) {
      return;
    }

    const key =
      event.key.toLowerCase();

    if (
      key !== "r" &&
      key !== "e"
    ) {
      return;
    }

    /*
      Stop the older 2P R/E handler in script.js from also firing.
      This keeps the base file untouched while correcting the controls.
      Online/private matches are intentionally excluded above so their
      own per-device input routing gets complete ownership of R and E.
    */
    event.preventDefault();
    event.stopImmediatePropagation();

    if (
      key === "r"
    ) {
      basicAttack(
        P1,
        P2
      );
      return;
    }

    specialAttack(
      P1,
      P2
    );
  },
  true
);


/* =====================================================
   BASIC MELEE POLISH

   Goal:
   - Slight, character-appropriate weapon movement.
   - Keep the existing damage / range / recovery untouched.
   - Add a stronger visual sense of contact only when a melee hit lands.
===================================================== */

const bbMeleeStyle =
  document.createElement(
    "style"
  );

bbMeleeStyle.textContent = `

  /* ---------- WEAPON / BASIC ATTACK MOTION ---------- */

  .weapon-attacking .weapon-arm {
    will-change: transform;
  }

  .brendan-model.weapon-attacking .weapon-arm {
    animation: bbGolfSwing 330ms ease-out 1;
  }

  .grandaddy-model.weapon-attacking .weapon-arm {
    animation: bbHammerSwing 330ms ease-out 1;
  }

  .connor-model.weapon-attacking .weapon-arm {
    animation: bbPaintSwipe 300ms ease-out 1;
  }

  .erin-model.weapon-attacking .weapon-arm {
    animation: bbBrushSwat 295ms ease-out 1;
  }

  .shannan-model.weapon-attacking .weapon-arm {
    animation: bbSyringeJab 285ms ease-out 1;
  }

  .liam-model.weapon-attacking {
    animation: bbShoulderCheck 315ms ease-out 1;
  }

  .liam-model.weapon-attacking .weapon-arm {
    animation: bbRugbyDrive 315ms ease-out 1;
  }

  .grandmommy-model.weapon-attacking .weapon-arm {
    animation: bbSpatulaSwat 300ms ease-out 1;
  }

  .sean-model.weapon-attacking .weapon-arm {
    animation: bbBatSwing 330ms ease-out 1;
  }

  .martin-model.weapon-attacking .leg-one {
    transform-origin: top center;
    animation: bbPawSwipe 300ms ease-out 1;
  }

  @keyframes bbGolfSwing {
    0%   { transform: rotate(0deg); }
    30%  { transform: rotate(-20deg); }
    68%  { transform: rotate(30deg); }
    100% { transform: rotate(3deg); }
  }

  @keyframes bbHammerSwing {
    0%   { transform: rotate(0deg); }
    28%  { transform: rotate(-27deg); }
    68%  { transform: rotate(38deg); }
    100% { transform: rotate(4deg); }
  }

  @keyframes bbPaintSwipe {
    0%   { transform: rotate(0deg); }
    34%  { transform: rotate(-12deg); }
    70%  { transform: rotate(25deg); }
    100% { transform: rotate(2deg); }
  }

  @keyframes bbBrushSwat {
    0%   { transform: rotate(0deg); }
    30%  { transform: rotate(-15deg); }
    70%  { transform: rotate(30deg); }
    100% { transform: rotate(2deg); }
  }

  @keyframes bbSyringeJab {
    0%   { transform: translateX(0) rotate(0deg); }
    30%  { transform: translateX(-4px) rotate(6deg); }
    70%  { transform: translateX(18px) rotate(-7deg); }
    100% { transform: translateX(1px) rotate(0deg); }
  }

  @keyframes bbShoulderCheck {
    0%   { transform: translateX(0) rotate(0deg); }
    35%  { transform: translateX(-3px) rotate(-1deg); }
    70%  { transform: translateX(12px) rotate(2deg); }
    100% { transform: translateX(0) rotate(0deg); }
  }

  @keyframes bbRugbyDrive {
    0%   { transform: translateX(0) rotate(0deg); }
    35%  { transform: translateX(-2px) rotate(5deg); }
    70%  { transform: translateX(12px) rotate(-8deg); }
    100% { transform: translateX(0) rotate(0deg); }
  }

  @keyframes bbSpatulaSwat {
    0%   { transform: rotate(0deg); }
    30%  { transform: rotate(-14deg); }
    70%  { transform: rotate(28deg); }
    100% { transform: rotate(2deg); }
  }

  @keyframes bbBatSwing {
    0%   { transform: rotate(0deg); }
    28%  { transform: rotate(-25deg); }
    68%  { transform: rotate(40deg); }
    100% { transform: rotate(4deg); }
  }

  @keyframes bbPawSwipe {
    0%   { transform: translate(0,0) rotate(0deg); }
    32%  { transform: translate(-3px,-7px) rotate(-15deg); }
    70%  { transform: translate(-9px,-2px) rotate(22deg); }
    100% { transform: translate(0,0) rotate(0deg); }
  }


  /* ---------- FELT IMPACT ---------- */

  .bb-melee-hit .motion-layer {
    animation: bbMeleeHitRecoil 155ms ease-out 1;
  }

  .bb-melee-block .motion-layer {
    animation: bbMeleeBlockRecoil 130ms ease-out 1;
  }

  .bb-melee-connect .motion-layer {
    animation: bbMeleeConnect 110ms ease-out 1;
  }

  .bb-arena-impact {
    animation: bbArenaImpact 120ms linear 1;
  }

  @keyframes bbMeleeHitRecoil {
    0% {
      transform: translateX(0);
      filter: brightness(1.55);
    }
    35% {
      transform: translateX(var(--bb-recoil-x, 7px));
      filter: brightness(1.28);
    }
    100% {
      transform: translateX(0);
      filter: brightness(1);
    }
  }

  @keyframes bbMeleeBlockRecoil {
    0% {
      transform: translateX(0);
      filter: brightness(1.35);
    }
    45% {
      transform: translateX(var(--bb-recoil-x, 4px));
      filter: brightness(1.15);
    }
    100% {
      transform: translateX(0);
      filter: brightness(1);
    }
  }

  @keyframes bbMeleeConnect {
    0%   { transform: translateX(0); }
    45%  { transform: translateX(var(--bb-connect-x, 3px)); }
    100% { transform: translateX(0); }
  }

  @keyframes bbArenaImpact {
    0%   { transform: translateX(0); }
    25%  { transform: translateX(-1.5px); }
    50%  { transform: translateX(1.5px); }
    75%  { transform: translateX(-1px); }
    100% { transform: translateX(0); }
  }

  .bb-melee-impact,
  .bb-block-impact {
    position: absolute;
    width: 34px;
    height: 34px;
    pointer-events: none;
    z-index: 260;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  .bb-melee-impact {
    background:
      radial-gradient(
        circle,
        #ffffff 0 12%,
        #ffe46a 13% 27%,
        #ff9c2b 28% 42%,
        transparent 43%
      );
    animation: bbImpactBurst 190ms ease-out 1 forwards;
  }

  .bb-melee-impact::before,
  .bb-melee-impact::after {
    content: "";
    position: absolute;
    left: 15px;
    top: -7px;
    width: 4px;
    height: 48px;
    background: #fff2a4;
    border-radius: 4px;
  }

  .bb-melee-impact::after {
    transform: rotate(90deg);
  }

  .bb-block-impact {
    border: 4px solid #a8ddff;
    box-shadow:
      0 0 0 3px rgba(65,170,255,0.32),
      0 0 12px rgba(65,170,255,0.72);
    animation: bbBlockBurst 170ms ease-out 1 forwards;
  }

  @keyframes bbImpactBurst {
    0%   { transform: translate(-50%,-50%) scale(0.35) rotate(0deg); opacity: 0; }
    30%  { transform: translate(-50%,-50%) scale(1.18) rotate(8deg); opacity: 1; }
    100% { transform: translate(-50%,-50%) scale(0.72) rotate(18deg); opacity: 0; }
  }

  @keyframes bbBlockBurst {
    0%   { transform: translate(-50%,-50%) scale(0.45); opacity: 0; }
    35%  { transform: translate(-50%,-50%) scale(1.08); opacity: 1; }
    100% { transform: translate(-50%,-50%) scale(1.28); opacity: 0; }
  }
`;

document.head.appendChild(
  bbMeleeStyle
);


function bbShowMeleeImpact(
  attacker,
  target,
  blocked
) {

  const burst =
    document.createElement(
      "div"
    );

  burst.className =
    "effect " +
    (
      blocked
        ? "bb-block-impact"
        : "bb-melee-impact"
    );

  burst.style.left =
    (
      target.x +
      (
        attacker.x < target.x
          ? 8
          : 48
      )
    ) +
    "px";

  burst.style.bottom =
    (
      118 +
      target.y
    ) +
    "px";

  effects.appendChild(
    burst
  );

  setTimeout(
    () => burst.remove(),
    220
  );


  const recoilAmount =
    blocked
      ? 4
      : 8;

  target.fighter.style.setProperty(
    "--bb-recoil-x",
    attacker.facing *
      recoilAmount +
      "px"
  );

  attacker.fighter.style.setProperty(
    "--bb-connect-x",
    attacker.facing *
      3 +
      "px"
  );


  target.fighter.classList.remove(
    "bb-melee-hit",
    "bb-melee-block"
  );

  attacker.fighter.classList.remove(
    "bb-melee-connect"
  );

  arena.classList.remove(
    "bb-arena-impact"
  );

  /* Restart short impact animations even on rapid consecutive hits. */
  void target.fighter.offsetWidth;

  target.fighter.classList.add(
    blocked
      ? "bb-melee-block"
      : "bb-melee-hit"
  );

  attacker.fighter.classList.add(
    "bb-melee-connect"
  );

  if (
    !blocked
  ) {
    arena.classList.add(
      "bb-arena-impact"
    );
  }

  setTimeout(
    () => {
      target.fighter.classList.remove(
        "bb-melee-hit",
        "bb-melee-block"
      );

      attacker.fighter.classList.remove(
        "bb-melee-connect"
      );

      arena.classList.remove(
        "bb-arena-impact"
      );
    },
    190
  );
}


/*
  Wrap the existing damage function instead of replacing combat logic.
  All existing damage, blocking, ultimate gain, KO handling, etc. still
  comes from the original dealDamage(). This only adds melee feedback.
*/
const bbOriginalDealDamage =
  dealDamage;

dealDamage = function(
  attacker,
  target,
  amount,
  options = {}
) {

  const type =
    options.type ||
    "normal";

  if (
    type === "normal" &&
    !roundOver &&
    fightStarted
  ) {

    const blocked =
      target.blocking &&
      !options.ignoreBlock &&
      isFacingAttacker(
        target,
        attacker
      );

    bbShowMeleeImpact(
      attacker,
      target,
      blocked
    );
  }

  return bbOriginalDealDamage(
    attacker,
    target,
    amount,
    options
  );
};


/* =====================================================
   LOAD CHARACTER VISUAL PATCHES
===================================================== */

const bbCharacterPatchScript =
  document.createElement("script");

bbCharacterPatchScript.src =
  "character-updates.js?v=2";

document.body.appendChild(
  bbCharacterPatchScript
);

bbCharacterPatchScript.addEventListener(
  "load",
  () => {
    const bbVisualHotfixScript =
      document.createElement("script");

    bbVisualHotfixScript.src =
      "visual-hotfixes.js?v=2";

    document.body.appendChild(
      bbVisualHotfixScript
    );

    bbVisualHotfixScript.addEventListener(
      "load",
      () => {
        const bbSelectionOverhaulScript =
          document.createElement("script");

        bbSelectionOverhaulScript.src =
          "selection-overhaul.js?v=1";

        document.body.appendChild(
          bbSelectionOverhaulScript
        );
      },
      {
        once: true
      }
    );
  },
  {
    once: true
  }
);
