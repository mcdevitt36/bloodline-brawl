/* =====================================================
   BLOODLINE BRAWL — TITLE + FIGHTER SELECT POLISH V8
   Late additive UI-only pass.
   - Pull the title matchup upward to use the empty center space
   - Add a cleaner red/yellow showdown treatment
   - Rebuild character select visually as a compact 5x3 roster
   - Keep every fighter name visible without desktop scrolling
   - Preserve all existing selection / random / detail logic
===================================================== */

(() => {
  if (window.__bbTitleSelectPolishV8Loaded) return;
  window.__bbTitleSelectPolishV8Loaded = true;

  const style = document.createElement("style");
  style.textContent = `
    /* =================================================
       TITLE SCREEN — TIGHTER, FULLER CENTER
    ================================================= */
    .title-content {
      grid-template-rows:
        auto
        auto
        auto
        minmax(76px, 1fr) !important;
    }

    .title-versus-panel {
      grid-row: 3 !important;
      align-self: start !important;
      position: relative !important;
      width: min(1180px, 95vw) !important;
      min-height: 315px !important;
      margin: 24px auto 0 !important;
      grid-template-columns:
        minmax(315px, 1fr)
        150px
        minmax(315px, 1fr) !important;
      column-gap: 48px !important;
    }

    .title-versus-panel::before {
      content: "FAMILY SHOWDOWN";
      position: absolute;
      left: 50%;
      top: -18px;
      transform: translateX(-50%) skewX(-7deg);
      z-index: 8;
      padding: 5px 20px 4px;
      color: #fff;
      background: #0a0d11;
      border: 3px solid #111;
      border-left: 8px solid #ffd52a;
      border-right: 8px solid #ef352b;
      box-shadow: 0 5px 0 rgba(0,0,0,.24);
      font-family: Impact, "Arial Black", sans-serif;
      font-size: 14px;
      letter-spacing: 3px;
      white-space: nowrap;
    }

    .title-versus-panel::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 8px;
      width: min(720px, 66vw);
      height: 5px;
      transform: translateX(-50%);
      background: linear-gradient(90deg,#ffd52a 0 48%,#111 48% 52%,#ef352b 52% 100%);
      opacity: .9;
      z-index: 1;
    }

    .title-fighter {
      min-height: 260px !important;
      max-width: 390px !important;
      padding: 12px 20px 10px !important;
      background:
        linear-gradient(180deg,rgba(255,255,255,.16),rgba(10,18,27,.14) 48%,rgba(5,10,16,.58) 100%) !important;
      box-shadow:
        0 9px 0 rgba(0,0,0,.22),
        inset 0 0 0 2px rgba(255,255,255,.05) !important;
    }

    .title-fighter:first-child {
      border-left: 7px solid #ffd52a !important;
    }

    .title-fighter:last-child {
      border-right: 7px solid #ef352b !important;
    }

    .title-character-space {
      width: 235px !important;
      height: 215px !important;
    }

    .title-character-space .pixel-person,
    .title-character-space .martin-model {
      transform: scale(1.12) !important;
      transform-origin: bottom center !important;
    }

    .title-name {
      min-height: 37px !important;
      font-size: 25px !important;
      border-color: rgba(255,255,255,.42) !important;
    }

    .title-vs {
      width: 132px !important;
      height: 132px !important;
      font-size: 69px !important;
      box-shadow:
        0 0 0 4px #ffd52a,
        8px 8px 0 #ef352b,
        0 12px 0 rgba(0,0,0,.24) !important;
    }

    .mode-title,
    .mode-buttons,
    .title-start,
    .challenge-button {
      grid-row: 4 !important;
      align-self: end !important;
      margin-bottom: 10px !important;
    }

    /* =================================================
       CHARACTER SELECT — COMPACT SMASH-LIKE ROSTER
    ================================================= */
    .select-screen.bb-select-overhauled {
      position: relative !important;
      width: 100vw !important;
      max-width: none !important;
      height: 100vh !important;
      height: 100dvh !important;
      min-height: 0 !important;
      margin-left: calc(50% - 50vw) !important;
      margin-right: calc(50% - 50vw) !important;
      padding: 10px clamp(12px,2vw,28px) 12px !important;
      justify-content: flex-start !important;
      overflow: hidden !important;
      background:
        radial-gradient(circle at 50% 6%,rgba(255,213,42,.15),transparent 26%),
        linear-gradient(180deg,#278fce 0 15%,#17364f 15% 42%,#0b1621 100%) !important;
    }

    .select-screen.bb-select-overhauled::before {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      background:
        linear-gradient(115deg,transparent 0 46%,rgba(255,255,255,.035) 46% 49%,transparent 49% 100%),
        linear-gradient(245deg,transparent 0 52%,rgba(255,255,255,.025) 52% 55%,transparent 55% 100%);
      z-index: 0;
    }

    .select-screen.bb-select-overhauled > * {
      position: relative;
      z-index: 1;
    }

    .bb-select-overhauled .screen-kicker {
      margin: 0 0 1px !important;
      color: #ffd52a !important;
      font-size: 11px !important;
      letter-spacing: 5px !important;
      text-shadow: 2px 2px #111;
    }

    .bb-select-overhauled .screen-heading {
      margin: 0 0 6px !important;
      color: #fff !important;
      font-size: clamp(34px,4.25vw,55px) !important;
      line-height: .98 !important;
      text-shadow:
        4px 4px 0 #111,
        7px 7px 0 #ef352b !important;
    }

    .bb-select-overhauled .selection-prompt {
      margin: 0 0 8px !important;
      padding: 6px 22px !important;
      min-height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(7,12,18,.92) !important;
      border: 2px solid #111 !important;
      border-left: 7px solid #ffd52a !important;
      border-right: 7px solid #ef352b !important;
      box-shadow: 0 4px 0 rgba(0,0,0,.22);
      color: #fff;
      font-size: 14px;
      letter-spacing: 2.5px;
    }

    .bb-select-layout {
      width: min(1420px, 97vw) !important;
      max-width: 1420px !important;
      flex: 1 1 auto !important;
      min-height: 0 !important;
      display: grid !important;
      grid-template-columns: 1fr !important;
      grid-template-rows: minmax(0,1fr) 108px !important;
      gap: 9px !important;
      align-items: stretch !important;
    }

    .bb-roster-panel,
    .bb-fighter-detail {
      border: 4px solid #111 !important;
      border-radius: 8px !important;
      background:
        linear-gradient(180deg,rgba(26,48,67,.98),rgba(8,15,23,.99)) !important;
      box-shadow:
        0 7px 0 rgba(0,0,0,.3),
        inset 0 0 0 2px rgba(255,255,255,.04) !important;
    }

    .bb-roster-panel::before,
    .bb-fighter-detail::before {
      height: 7px !important;
      background: linear-gradient(90deg,#ffd52a 0 58%,#ef352b 58% 100%) !important;
      box-shadow: 0 2px 0 #111 !important;
    }

    .bb-roster-panel {
      min-height: 0 !important;
      padding: 15px 10px 9px !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
    }

    .bb-roster-title {
      flex: 0 0 auto;
      margin: 0 3px 6px !important;
      color: #fff !important;
      font-size: 10px !important;
      letter-spacing: 4px !important;
    }

    .bb-roster-title::after {
      content: "  •  15 FIGHTER SLOTS";
      color: #ffd52a;
      letter-spacing: 2px;
    }

    .bb-select-overhauled .fighter-select {
      flex: 1 1 auto !important;
      min-height: 0 !important;
      width: 100% !important;
      max-width: none !important;
      display: grid !important;
      grid-template-columns: repeat(5,minmax(0,1fr)) !important;
      grid-template-rows: repeat(3,minmax(0,1fr)) !important;
      gap: 7px !important;
    }

    .bb-select-overhauled .fighter-card {
      position: relative !important;
      min-width: 0 !important;
      min-height: 0 !important;
      height: 100% !important;
      padding: 5px 5px 4px !important;
      justify-content: flex-end !important;
      border: 3px solid #3f4c57 !important;
      border-top-color: #d9b82e !important;
      border-radius: 5px !important;
      background:
        radial-gradient(circle at 50% 38%,rgba(76,169,224,.2),transparent 43%),
        linear-gradient(180deg,#233e54,#111b25) !important;
      box-shadow:
        inset 0 0 0 1px rgba(255,255,255,.035),
        0 3px 0 rgba(0,0,0,.22) !important;
      overflow: hidden !important;
      transition: transform 110ms ease,border-color 110ms ease,filter 110ms ease !important;
    }

    .bb-select-overhauled .fighter-card::after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      width: 25px;
      height: 25px;
      background: linear-gradient(135deg,transparent 0 48%,#ef352b 49% 100%);
      opacity: .9;
      pointer-events: none;
      z-index: 4;
    }

    .bb-select-overhauled .fighter-card:hover,
    .bb-select-overhauled .fighter-card:focus-visible {
      transform: translateY(-2px) scale(1.015) !important;
      border-color: #ffd52a !important;
      filter: brightness(1.08);
      box-shadow:
        0 0 14px rgba(255,213,42,.32),
        0 4px 0 rgba(0,0,0,.25) !important;
      outline: none !important;
    }

    .bb-select-overhauled .fighter-card.p1-selected {
      border-color: #ffd52a !important;
      box-shadow:
        0 0 18px rgba(255,213,42,.62),
        inset 0 0 0 2px rgba(255,213,42,.22) !important;
    }

    .bb-select-overhauled .fighter-card.p2-selected {
      border-color: #ef352b !important;
      box-shadow:
        0 0 18px rgba(239,53,43,.58),
        inset 0 0 0 2px rgba(239,53,43,.2) !important;
    }

    .bb-select-overhauled .card-model-holder {
      flex: 1 1 auto !important;
      width: 100% !important;
      height: auto !important;
      min-height: 48px !important;
      max-height: 105px !important;
      display: flex !important;
      align-items: flex-end !important;
      justify-content: center !important;
      overflow: visible !important;
    }

    .bb-select-overhauled .card-model-holder .pixel-person:not(.bb-toddler) {
      transform: scale(.45) !important;
      transform-origin: bottom center !important;
    }

    .bb-select-overhauled .card-model-holder .martin-model {
      transform: scale(.68) !important;
      transform-origin: bottom center !important;
    }

    .bb-select-overhauled .card-model-holder .alice-model,
    .bb-select-overhauled .card-model-holder .leo-model {
      transform: scale(.60) !important;
      transform-origin: bottom center !important;
    }

    .bb-select-overhauled .card-model-holder .barrett-model {
      transform: scale(.68) !important;
      transform-origin: bottom center !important;
    }

    .bb-select-overhauled .fighter-card > strong {
      position: relative;
      z-index: 6;
      flex: 0 0 25px;
      width: calc(100% + 10px) !important;
      min-height: 25px !important;
      margin: 1px -5px -4px !important;
      padding: 3px 3px 2px !important;
      display: flex !important;
      align-items: center;
      justify-content: center;
      background: #080c11 !important;
      border-top: 2px solid #ffd52a;
      color: #fff !important;
      font-family: Impact,"Arial Black",sans-serif !important;
      font-size: clamp(11px,1.1vw,16px) !important;
      line-height: 1 !important;
      letter-spacing: .6px !important;
      text-align: center !important;
      text-shadow: 2px 2px #000 !important;
      white-space: nowrap;
    }

    .bb-select-overhauled .fighter-card.p2-selected > strong {
      border-top-color: #ef352b !important;
    }

    .bb-select-overhauled .fighter-card > small {
      display: none !important;
    }

    .bb-select-overhauled .bb-random-holder {
      flex: 1 1 auto !important;
      min-height: 48px !important;
      height: auto !important;
    }

    .bb-select-overhauled .bb-random-mark {
      width: 54px !important;
      height: 54px !important;
      font-size: 40px !important;
      border-width: 3px !important;
    }

    .bb-select-overhauled .bb-random-card > strong {
      color: #ffd52a !important;
    }

    .bb-select-overhauled .lock-overlay {
      z-index: 40 !important;
      background: rgba(0,0,0,.70) !important;
    }

    .bb-select-overhauled .lock-overlay strong {
      font-size: 14px !important;
      color: #ffd52a !important;
    }

    .bb-select-overhauled .lock-overlay small {
      display: block !important;
      min-height: 0 !important;
      margin-top: 3px !important;
      font-size: 7px !important;
      color: #fff !important;
    }

    /* Compact profile ribbon under the roster instead of a tall side panel. */
    .bb-fighter-detail {
      position: relative !important;
      min-height: 0 !important;
      height: 108px !important;
      padding: 14px 14px 10px !important;
      display: grid !important;
      grid-template-columns: 205px minmax(0,1fr) !important;
      grid-template-rows: 20px 1fr !important;
      column-gap: 12px !important;
      align-items: stretch !important;
      overflow: hidden !important;
    }

    .bb-detail-kicker {
      grid-column: 1 !important;
      grid-row: 1 !important;
      margin: 0 !important;
      align-self: center !important;
      text-align: left !important;
      color: #ffd52a !important;
      font-size: 9px !important;
      letter-spacing: 3px !important;
    }

    .bb-detail-name {
      grid-column: 1 !important;
      grid-row: 2 !important;
      min-height: 0 !important;
      margin: 0 !important;
      align-self: start !important;
      text-align: left !important;
      color: #fff !important;
      font-size: 27px !important;
      line-height: 1 !important;
      text-shadow: 3px 3px #111 !important;
    }

    .bb-detail-preview {
      display: none !important;
    }

    .bb-detail-moves {
      grid-column: 2 !important;
      grid-row: 1 / 3 !important;
      width: 100% !important;
      min-width: 0 !important;
      margin: 0 !important;
      display: grid !important;
      grid-template-columns: repeat(3,minmax(0,1fr)) !important;
      gap: 8px !important;
    }

    .bb-detail-move {
      min-height: 0 !important;
      height: 76px !important;
      padding: 6px 7px !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: stretch !important;
      justify-content: center !important;
      gap: 5px !important;
      background: #101b25 !important;
      border: 2px solid #354858 !important;
      border-radius: 5px !important;
      text-align: center;
    }

    .bb-detail-move-type {
      width: 100% !important;
      height: 22px !important;
      min-height: 22px !important;
      font-size: 8px !important;
      letter-spacing: 1px !important;
      border-radius: 3px !important;
    }

    .bb-detail-move.melee .bb-detail-move-type {
      background: #ffd52a !important;
    }

    .bb-detail-move.special .bb-detail-move-type {
      background: #ef5a36 !important;
      color: #fff !important;
    }

    .bb-detail-move.ultimate .bb-detail-move-type {
      background: #ef352b !important;
      color: #fff !important;
    }

    .bb-detail-move-name {
      font-size: 12px !important;
      line-height: 1.05 !important;
      overflow-wrap: anywhere;
    }

    .bb-select-overhauled .selection-summary {
      position: absolute !important;
      left: 14px !important;
      bottom: 8px !important;
      width: 195px !important;
      min-height: 0 !important;
      margin: 0 !important;
      color: #aebdca !important;
      font-size: 8px !important;
      line-height: 1.1 !important;
      letter-spacing: .6px !important;
      text-align: left !important;
    }

    .bb-select-overhauled .screen-button-row {
      flex: 0 0 auto !important;
      margin-top: 9px !important;
      gap: 10px !important;
    }

    .bb-select-overhauled .screen-button-row .secondary-button,
    .bb-select-overhauled .screen-button-row .big-button {
      padding-top: 9px !important;
      padding-bottom: 9px !important;
    }

    /* Short laptop protection — still keep 5 x 3 on one screen. */
    @media (max-height: 800px) and (min-width: 761px) {
      .select-screen.bb-select-overhauled {
        padding-top: 6px !important;
        padding-bottom: 7px !important;
      }

      .bb-select-overhauled .screen-heading {
        font-size: clamp(30px,3.8vw,44px) !important;
        margin-bottom: 4px !important;
      }

      .bb-select-overhauled .selection-prompt {
        min-height: 30px !important;
        padding: 4px 16px !important;
        margin-bottom: 5px !important;
        font-size: 12px !important;
      }

      .bb-select-layout {
        grid-template-rows: minmax(0,1fr) 88px !important;
        gap: 6px !important;
      }

      .bb-roster-panel {
        padding-top: 13px !important;
        padding-bottom: 6px !important;
      }

      .bb-roster-title {
        margin-bottom: 4px !important;
      }

      .bb-select-overhauled .fighter-select {
        gap: 5px !important;
      }

      .bb-select-overhauled .card-model-holder {
        max-height: 82px !important;
      }

      .bb-select-overhauled .card-model-holder .pixel-person:not(.bb-toddler) {
        transform: scale(.38) !important;
      }

      .bb-select-overhauled .card-model-holder .martin-model {
        transform: scale(.58) !important;
      }

      .bb-select-overhauled .card-model-holder .alice-model,
      .bb-select-overhauled .card-model-holder .leo-model {
        transform: scale(.51) !important;
      }

      .bb-select-overhauled .card-model-holder .barrett-model {
        transform: scale(.59) !important;
      }

      .bb-fighter-detail {
        height: 88px !important;
        grid-template-columns: 180px minmax(0,1fr) !important;
        padding-top: 12px !important;
      }

      .bb-detail-name {
        font-size: 23px !important;
      }

      .bb-detail-move {
        height: 58px !important;
        padding: 4px 5px !important;
      }

      .bb-detail-move-type {
        height: 18px !important;
        min-height: 18px !important;
      }

      .bb-detail-move-name {
        font-size: 10px !important;
      }

      .bb-select-overhauled .selection-summary {
        width: 168px !important;
      }

      .bb-select-overhauled .screen-button-row {
        margin-top: 6px !important;
      }
    }

    /* Narrow screens: keep names and all cards visible; sacrifice the profile ribbon first. */
    @media (max-width: 760px) {
      .select-screen.bb-select-overhauled {
        height: 100dvh !important;
        min-height: 0 !important;
        overflow: hidden !important;
        padding-left: 7px !important;
        padding-right: 7px !important;
      }

      .bb-select-overhauled .screen-kicker {
        font-size: 8px !important;
      }

      .bb-select-overhauled .screen-heading {
        font-size: clamp(28px,8vw,38px) !important;
      }

      .bb-select-overhauled .selection-prompt {
        font-size: 9px !important;
        letter-spacing: 1px !important;
        padding: 4px 8px !important;
      }

      .bb-select-layout {
        grid-template-rows: minmax(0,1fr) !important;
      }

      .bb-fighter-detail {
        display: none !important;
      }

      .bb-select-overhauled .fighter-select {
        grid-template-columns: repeat(4,minmax(0,1fr)) !important;
        grid-template-rows: repeat(4,minmax(0,1fr)) !important;
        gap: 4px !important;
      }

      .bb-select-overhauled .fighter-card > strong {
        font-size: clamp(8px,2.4vw,12px) !important;
      }

      .bb-select-overhauled .screen-button-row .big-button,
      .bb-select-overhauled .screen-button-row .secondary-button {
        min-width: 112px !important;
        padding: 8px 12px !important;
        font-size: 14px !important;
      }
    }

    @media (max-height: 740px) {
      .title-content .game-logo {
        font-size: clamp(52px,5vw,74px) !important;
      }

      .title-versus-panel {
        min-height: 230px !important;
        margin-top: 16px !important;
      }

      .title-fighter {
        min-height: 210px !important;
      }

      .title-character-space {
        height: 165px !important;
      }

      .title-character-space .pixel-person,
      .title-character-space .martin-model {
        transform: scale(.96) !important;
      }
    }
  `;

  document.head.appendChild(style);
})();
