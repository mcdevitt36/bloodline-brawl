/* =====================================================
   BLOODLINE BRAWL — SAFE PRESENTATION UPGRADES
   Visual-only title/map polish plus Grandaddy ladder charge.
   No global MutationObservers: this version is intentionally
   conservative so the page remains responsive.
===================================================== */

(() => {
  const style = document.createElement("style");

  style.textContent = `
    /* ===================================================
       TITLE SCREEN — WIDER, STILL ONE VIEWPORT TALL
    =================================================== */

    .title-screen {
      width: 100vw !important;
      max-width: none !important;
      height: 100vh !important;
      height: 100dvh !important;
      min-height: 0 !important;
      max-height: 100vh !important;
      margin-left: calc(50% - 50vw);
      margin-right: calc(50% - 50vw);
      padding: 10px clamp(18px, 3vw, 46px) !important;
      overflow: hidden !important;
    }

    .title-content {
      width: min(1500px, 100%) !important;
      height: 100% !important;
      margin: 0 auto;
      display: grid !important;
      grid-template-columns:
        minmax(150px, 1fr)
        318px
        230px
        minmax(220px, 1fr);
      grid-template-rows:
        auto
        auto
        minmax(0, 1fr)
        76px;
      column-gap: 14px;
      row-gap: 0;
      align-items: center;
      justify-items: center;
    }

    .title-content .game-logo {
      grid-column: 1 / -1;
      grid-row: 1;
      align-self: end;
      margin: 0 !important;
      font-size: clamp(62px, 6vw, 92px) !important;
      letter-spacing: 2px;
    }

    .title-content .tagline {
      grid-column: 1 / -1;
      grid-row: 2;
      margin: 9px 0 2px !important;
      padding: 8px 30px;
      border-left: 5px solid #ffd52a;
      border-right: 5px solid #ef352b;
      box-shadow: 0 4px 0 rgba(0,0,0,.2);
    }

    .title-versus-panel {
      grid-column: 1 / -1;
      grid-row: 3;
      width: min(1140px, 94vw) !important;
      max-width: 1140px;
      min-height: 220px;
      margin: 5px auto 0 !important;
      display: grid !important;
      grid-template-columns:
        minmax(300px, 1fr)
        140px
        minmax(300px, 1fr) !important;
      column-gap: 42px !important;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }

    .title-fighter {
      position: relative;
      width: 100% !important;
      max-width: 355px;
      min-height: 224px;
      padding: 9px 18px 8px;
      justify-content: flex-end;
      border: 3px solid rgba(9,15,23,.82);
      border-radius: 12px;
      background:
        linear-gradient(
          180deg,
          rgba(255,255,255,.12),
          rgba(10,18,27,.12) 54%,
          rgba(5,10,16,.48) 100%
        );
      box-shadow:
        0 8px 0 rgba(0,0,0,.2),
        inset 0 1px 0 rgba(255,255,255,.14);
    }

    .title-fighter:first-child {
      justify-self: end;
      border-left: 6px solid #46b6ff;
    }

    .title-fighter:last-child {
      justify-self: start;
      border-right: 6px solid #ef5249;
    }

    .title-character-space {
      width: 210px !important;
      height: 190px !important;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    .title-character-space .pixel-person,
    .title-character-space .martin-model {
      transform: scale(1.06) !important;
      transform-origin: bottom center !important;
    }

    .title-name {
      width: 86% !important;
      min-height: 34px;
      margin-top: 3px !important;
      padding: 3px 12px 4px;
      background: rgba(6,10,16,.9);
      border: 2px solid rgba(255,255,255,.3);
      border-radius: 4px;
      font-size: 24px !important;
      letter-spacing: .8px;
      line-height: 1.05;
      text-shadow: 3px 3px #111;
    }

    .title-vs {
      width: 126px !important;
      height: 126px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background:
        radial-gradient(
          circle,
          rgba(255,213,42,.2) 0 46%,
          rgba(7,12,18,.88) 47% 100%
        );
      border: 4px solid #111;
      box-shadow:
        0 0 0 3px rgba(255,213,42,.78),
        0 8px 0 rgba(0,0,0,.24);
      font-size: 66px !important;
      transform: rotate(-3deg);
    }

    .mode-title {
      grid-column: 1;
      grid-row: 4;
      justify-self: end;
      margin: 0 10px 0 0 !important;
      white-space: nowrap;
    }

    .mode-buttons {
      grid-column: 2;
      grid-row: 4;
      margin: 0 !important;
      gap: 8px !important;
    }

    .mode-button {
      min-width: 150px !important;
      padding: 9px 14px !important;
      box-shadow: 0 4px 0 rgba(0,0,0,.22);
    }

    .mode-button.selected {
      box-shadow:
        0 0 15px rgba(255,213,41,.5),
        0 4px 0 rgba(0,0,0,.22);
    }

    .title-start {
      grid-column: 3;
      grid-row: 4;
      width: 218px;
      min-width: 218px !important;
      margin: 0 !important;
      padding: 11px 26px !important;
      font-size: 20px !important;
      position: relative;
      z-index: 20;
      pointer-events: auto;
    }

    .challenge-button {
      grid-column: 4;
      grid-row: 4;
      justify-self: start;
      min-width: 222px;
      margin: 0 0 0 10px !important;
      padding: 9px 18px !important;
      box-shadow: 0 4px 0 rgba(0,0,0,.22);
      position: relative;
      z-index: 20;
      pointer-events: auto;
    }

    .mode-buttons,
    .mode-buttons button {
      position: relative;
      z-index: 20;
      pointer-events: auto;
    }


    /* ===================================================
       MAP SELECT POLISH
    =================================================== */

    .map-screen .screen-heading {
      margin-bottom: 12px;
    }

    .map-grid {
      width: min(1120px, 100%) !important;
      max-width: 1120px !important;
      gap: 16px !important;
    }

    .map-card {
      position: relative;
      padding: 9px !important;
      border: 3px solid #465665 !important;
      border-radius: 10px !important;
      background:
        linear-gradient(
          180deg,
          #172330 0%,
          #0e151e 100%
        ) !important;
      box-shadow:
        0 7px 0 #06090d,
        inset 0 1px 0 rgba(255,255,255,.06);
      transition:
        transform 130ms ease,
        border-color 130ms ease,
        box-shadow 130ms ease;
      overflow: hidden;
    }

    .map-card:hover {
      transform: translateY(-2px);
      border-color: #75889a !important;
    }

    .map-card.selected {
      border-color: #ffd52a !important;
      box-shadow:
        0 7px 0 #06090d,
        0 0 18px rgba(255,213,42,.24),
        inset 0 1px 0 rgba(255,255,255,.08);
    }

    .map-preview {
      height: 150px !important;
      border: 2px solid #070b10;
      border-radius: 6px;
      overflow: hidden;
      box-shadow:
        inset 0 0 0 1px rgba(255,255,255,.12),
        inset 0 -18px 22px rgba(0,0,0,.08);
    }

    .map-card strong {
      margin-top: 10px !important;
      font-family: Impact, "Arial Black", sans-serif;
      font-size: 20px !important;
      letter-spacing: .6px !important;
      line-height: 1.05;
      text-shadow: 2px 2px #000;
    }

    .map-card small {
      min-height: 40px;
      margin-top: 6px !important;
      padding: 0 4px 2px;
      color: #c0cad3 !important;
      line-height: 1.32;
      letter-spacing: 0 !important;
    }

    .virginia-preview {
      filter: saturate(1.06) contrast(1.03);
    }

    .westhampton-preview {
      filter: saturate(1.08) contrast(1.02);
    }

    .newcanaan-preview {
      filter: saturate(1.04) contrast(1.03);
    }

    .madrid-preview {
      filter: saturate(1.07) contrast(1.03) brightness(1.02);
    }

    .newcanaan-preview .nc-preview-building {
      display: flex !important;
      align-items: flex-start;
      justify-content: center;
      padding: 6px 3px 0 !important;
      font-family: "Arial Black", Arial, sans-serif !important;
      font-size: 10px !important;
      line-height: 1 !important;
      letter-spacing: 0 !important;
      word-spacing: 0 !important;
      white-space: nowrap;
      text-indent: 0 !important;
      text-shadow: 1px 1px 0 rgba(0,0,0,.28);
    }


    /* ===================================================
       GRANDADDY LADDER CHARGE
    =================================================== */

    .bb-ladder-rig {
      position: absolute;
      width: 190px;
      height: 56px;
      z-index: 235 !important;
      pointer-events: none;
      filter: drop-shadow(0 5px 0 rgba(0,0,0,.22));
      transform-origin: center center;
    }

    .bb-ladder-rail {
      position: absolute;
      left: 0;
      width: 190px;
      height: 9px;
      background: linear-gradient(#eef2f4, #aeb7bd 52%, #7f8b92);
      border: 3px solid #111;
      border-radius: 2px;
    }

    .bb-ladder-rail.top { top: 2px; }
    .bb-ladder-rail.bottom { bottom: 2px; }

    .bb-ladder-rung {
      position: absolute;
      top: 8px;
      width: 9px;
      height: 40px;
      background: linear-gradient(90deg, #dce2e5, #929da4);
      border: 2px solid #111;
      border-radius: 1px;
    }

    .fight-character.bb-ladder-windup .visual-layer {
      animation: bbGrandaddyWindup 330ms ease-out 1;
    }

    .fight-character.bb-ladder-charging .visual-layer {
      animation: bbGrandaddyCharge 560ms cubic-bezier(.2,.75,.25,1) 1;
    }

    .fight-character.bb-ladder-hit .motion-layer {
      animation: bbLadderTargetRecoil 190ms ease-out 1;
    }

    .bb-ladder-impact {
      position: absolute;
      width: 54px;
      height: 54px;
      z-index: 270 !important;
      pointer-events: none;
      border-radius: 50%;
      background:
        radial-gradient(
          circle,
          #fff 0 10%,
          #ffe06a 11% 23%,
          #f5a12e 24% 37%,
          transparent 38%
        );
      animation: bbLadderImpact 230ms ease-out 1 forwards;
    }

    .bb-ladder-impact::before,
    .bb-ladder-impact::after {
      content: "";
      position: absolute;
      left: 25px;
      top: -9px;
      width: 5px;
      height: 72px;
      background: #fff0a1;
      border-radius: 3px;
    }

    .bb-ladder-impact::after {
      transform: rotate(90deg);
    }

    @keyframes bbGrandaddyWindup {
      0% { transform: translateX(0) rotate(0deg); }
      60% { transform: translateX(var(--bb-ladder-windup-x,-7px)) rotate(-2deg); }
      100% { transform: translateX(0) rotate(0deg); }
    }

    @keyframes bbGrandaddyCharge {
      0% { transform: translateX(0) rotate(0deg); }
      70% { transform: translateX(var(--bb-ladder-charge-x,22px)) rotate(2deg); }
      100% { transform: translateX(var(--bb-ladder-charge-end-x,16px)) rotate(1deg); }
    }

    @keyframes bbLadderTargetRecoil {
      0% { transform: translateX(0); filter: brightness(1.5); }
      42% { transform: translateX(var(--bb-ladder-recoil-x,11px)); filter: brightness(1.22); }
      100% { transform: translateX(0); filter: brightness(1); }
    }

    @keyframes bbLadderImpact {
      0% { transform: translate(-50%,-50%) scale(.35) rotate(0deg); opacity: 0; }
      30% { transform: translate(-50%,-50%) scale(1.18) rotate(8deg); opacity: 1; }
      100% { transform: translate(-50%,-50%) scale(.75) rotate(18deg); opacity: 0; }
    }


    /* ===================================================
       SHORT / NARROW VIEWPORT PROTECTION
    =================================================== */

    @media (max-height: 760px) and (min-width: 981px) {
      .title-content .game-logo {
        font-size: clamp(54px, 5vw, 74px) !important;
      }

      .title-versus-panel {
        min-height: 185px;
      }

      .title-fighter {
        min-height: 190px;
        padding-top: 4px;
      }

      .title-character-space {
        height: 158px !important;
      }

      .title-character-space .pixel-person,
      .title-character-space .martin-model {
        transform: scale(.88) !important;
      }

      .title-content {
        grid-template-rows: auto auto minmax(0,1fr) 68px;
      }
    }

    @media (max-width: 980px) {
      .title-content {
        display: flex !important;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .title-versus-panel {
        width: 100% !important;
        min-height: 0;
        grid-template-columns: 205px 92px 205px !important;
        column-gap: 14px !important;
        margin: 7px auto 3px !important;
      }

      .title-fighter {
        min-height: 0;
        max-width: 205px;
        padding: 3px 8px 5px;
      }

      .title-character-space {
        width: 145px !important;
        height: 165px !important;
      }

      .title-character-space .pixel-person,
      .title-character-space .martin-model {
        transform: scale(.9) !important;
      }

      .title-name {
        width: 100% !important;
        font-size: 19px !important;
        min-height: 28px;
      }

      .title-vs {
        width: 88px !important;
        height: 88px;
        font-size: 48px !important;
      }

      .mode-title { margin: 4px 0 0 !important; }
      .mode-buttons { margin: 5px 0 6px !important; }
      .title-start { margin: 0 !important; }
      .challenge-button { margin: 6px 0 0 !important; }
    }
  `;

  document.head.appendChild(style);


  /* ===================================================
     DONN ASSIST — SAFE ONE-TIME TEXT CLEANUP
  =================================================== */

  document
    .querySelectorAll('[data-character="grandmommy"] small')
    .forEach(label => {
      const next = label.textContent.replace(/\bDon Assist\b/g, "Donn Assist");
      if (next !== label.textContent) {
        label.textContent = next;
      }
    });


  /* ===================================================
     GRANDADDY — LADDER CHARGE
  =================================================== */

  function createLadder() {
    const ladder = document.createElement("div");
    ladder.className = "effect bb-ladder-rig";

    ladder.innerHTML = `
      <div class="bb-ladder-rail top"></div>
      <div class="bb-ladder-rail bottom"></div>
      <div class="bb-ladder-rung" style="left:16px"></div>
      <div class="bb-ladder-rung" style="left:42px"></div>
      <div class="bb-ladder-rung" style="left:68px"></div>
      <div class="bb-ladder-rung" style="left:94px"></div>
      <div class="bb-ladder-rung" style="left:120px"></div>
      <div class="bb-ladder-rung" style="left:146px"></div>
      <div class="bb-ladder-rung" style="left:172px"></div>
    `;

    return ladder;
  }

  function showLadderImpact(attacker, target) {
    const burst = document.createElement("div");
    burst.className = "effect bb-ladder-impact";
    burst.style.left =
      (target.x + (attacker.facing === 1 ? 12 : 48)) + "px";
    burst.style.bottom = (115 + target.y) + "px";
    effects.appendChild(burst);

    target.fighter.style.setProperty(
      "--bb-ladder-recoil-x",
      (attacker.facing * 11) + "px"
    );

    target.fighter.classList.remove("bb-ladder-hit");
    void target.fighter.offsetWidth;
    target.fighter.classList.add("bb-ladder-hit");

    setTimeout(() => {
      burst.remove();
      target.fighter.classList.remove("bb-ladder-hit");
    }, 240);
  }

  const originalLadderAttack = ladderAttack;

  ladderAttack = function(attacker, target) {
    if (!attacker || !target || roundOver) {
      return originalLadderAttack(attacker, target);
    }

    actionLock = true;

    addComicText(
      "HOLD THIS LADDER!",
      "yellow-text",
      1700
    );

    const direction =
      attacker.facing || (target.x >= attacker.x ? 1 : -1);

    const hammer =
      attacker.fighter.querySelector(".hammer");

    const oldHammerVisibility =
      hammer ? hammer.style.visibility : "";

    if (hammer) {
      hammer.style.visibility = "hidden";
    }

    attacker.fighter.style.setProperty(
      "--bb-ladder-windup-x",
      (direction * -7) + "px"
    );

    attacker.fighter.style.setProperty(
      "--bb-ladder-charge-x",
      (direction * 22) + "px"
    );

    attacker.fighter.style.setProperty(
      "--bb-ladder-charge-end-x",
      (direction * 16) + "px"
    );

    attacker.fighter.classList.add("bb-ladder-windup");

    const ladder = createLadder();

    const startX =
      attacker.x + (direction === 1 ? 54 : -154);

    const startBottom =
      76 + attacker.y;

    ladder.style.left = startX + "px";
    ladder.style.bottom = startBottom + "px";
    ladder.style.opacity = "0";
    effects.appendChild(ladder);

    ladder.animate(
      [
        {
          opacity: 0,
          transform: `scaleX(${direction}) scale(.48) rotate(-8deg)`
        },
        {
          opacity: 1,
          transform: `scaleX(${direction}) scale(.82) rotate(-3deg)`
        },
        {
          opacity: 1,
          transform: `scaleX(${direction}) scale(1) rotate(0deg)`
        }
      ],
      {
        duration: 340,
        fill: "forwards",
        easing: "cubic-bezier(.18,.78,.24,1)"
      }
    );

    setTimeout(() => {
      attacker.fighter.classList.remove("bb-ladder-windup");
      attacker.fighter.classList.add("bb-ladder-charging");

      const endX =
        target.x + (direction === 1 ? -134 : 34);

      const endBottom =
        58 + Math.min(target.y, 28);

      ladder.animate(
        [
          {
            left: startX + "px",
            bottom: startBottom + "px",
            transform: `scaleX(${direction}) scale(1) rotate(0deg)`
          },
          {
            left: endX + "px",
            bottom: endBottom + "px",
            transform: `scaleX(${direction}) scale(1) rotate(${direction * 1.5}deg)`
          }
        ],
        {
          duration: 560,
          fill: "forwards",
          easing: "cubic-bezier(.2,.76,.23,1)"
        }
      );
    }, 335);

    setTimeout(() => {
      if (!roundOver && target.y < 55) {
        dealDamage(
          attacker,
          target,
          STATS.grandaddy.specialDamage,
          { type: "special" }
        );

        showLadderImpact(attacker, target);
      }

      attacker.fighter.classList.remove("bb-ladder-charging");

      ladder.animate(
        [
          { opacity: 1 },
          {
            opacity: .75,
            transform: `scaleX(${direction}) translateX(${-direction * 16}px) rotate(${-direction * 5}deg)`
          }
        ],
        {
          duration: 320,
          fill: "forwards",
          easing: "ease-out"
        }
      );
    }, 900);

    setTimeout(() => {
      ladder.remove();

      attacker.fighter.classList.remove(
        "bb-ladder-windup",
        "bb-ladder-charging"
      );

      if (hammer) {
        hammer.style.visibility = oldHammerVisibility;
      }

      actionLock = false;
    }, 1700);
  };
})();
