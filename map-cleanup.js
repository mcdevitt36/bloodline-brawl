/* =====================================================
   BLOODLINE BRAWL — MAP CLEANUP V2
   Final visual-only arena refinements + matching map previews.
===================================================== */

(() => {
  if (window.__bbMapCleanupV2Loaded) {
    return;
  }

  window.__bbMapCleanupV2Loaded = true;

  const style =
    document.createElement("style");

  style.textContent = `
    /* =================================================
       NEW CANAAN — ANN-TAYLOR-STYLE TYPE + REAL CLOCK
    ================================================= */

    .bb-nc-signs {
      bottom: 278px !important;
      height: 25px !important;
      color: #231b18 !important;
      font-family: "Bodoni MT", Didot, "Times New Roman", serif !important;
      font-size: 13px !important;
      font-weight: 500 !important;
      letter-spacing: 1.5px !important;
      text-transform: uppercase !important;
      text-shadow: 0 1px 0 rgba(255,255,255,.28) !important;
    }

    .bb-nc-sign {
      line-height: 1 !important;
    }

    .bb-nc-clock {
      left: 50% !important;
      bottom: 137px !important;
      width: 9px !important;
      height: 126px !important;
      background: linear-gradient(90deg,#174b37,#2a7553,#174b37) !important;
      border: 2px solid #11392b !important;
      box-shadow: 2px 0 0 rgba(0,0,0,.12) !important;
      z-index: 8 !important;
    }

    .bb-nc-clock::before {
      display: none !important;
    }

    .bb-nc-clock::after {
      left: -9px !important;
      bottom: -9px !important;
      width: 23px !important;
      height: 11px !important;
      background: #174b37 !important;
      border: 2px solid #11392b !important;
      border-radius: 2px !important;
    }

    .bb-nc-clock-face {
      position: absolute;
      left: -29px;
      top: -49px;
      width: 61px;
      height: 61px;
      z-index: 10;
      border-radius: 50%;
      border: 5px solid #226b4d;
      box-shadow:
        0 0 0 3px #d5c9b7,
        0 5px 0 rgba(0,0,0,.15);
      background:
        linear-gradient(#2e2b29,#2e2b29) 50% 6px / 2px 7px no-repeat,
        linear-gradient(#2e2b29,#2e2b29) 50% calc(100% - 6px) / 2px 7px no-repeat,
        linear-gradient(#2e2b29,#2e2b29) 6px 50% / 7px 2px no-repeat,
        linear-gradient(#2e2b29,#2e2b29) calc(100% - 6px) 50% / 7px 2px no-repeat,
        #f6f2e8;
      pointer-events: none;
    }

    .bb-nc-clock-hand {
      position: absolute;
      left: 50%;
      bottom: 50%;
      z-index: 12;
      background: #2c2927;
      border-radius: 2px;
      transform-origin: 50% 100%;
      pointer-events: none;
    }

    .bb-nc-clock-hand.hour {
      width: 4px;
      height: 15px;
      margin-left: -2px;
      transform: rotate(312deg);
    }

    .bb-nc-clock-hand.minute {
      width: 3px;
      height: 21px;
      margin-left: -1.5px;
      transform: rotate(132deg);
    }

    .bb-nc-clock-pin {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 7px;
      height: 7px;
      z-index: 13;
      margin-left: -3.5px;
      margin-top: -3.5px;
      border-radius: 50%;
      background: #2c2927;
      pointer-events: none;
    }


    /* =================================================
       VIRGINIA ESTATE — REMOVE FENCE, ADD SMALL HORSE
    ================================================= */

    .map-virginia .bb-va-fence,
    .map-virginia .bb-va-paddock {
      display: none !important;
    }

    .bb-va-horse {
      display: none;
      position: absolute;
      left: 24%;
      bottom: 177px;
      width: 78px;
      height: 54px;
      z-index: 2;
      pointer-events: none;
      transform-origin: bottom center;
      animation: bbVaHorseGraze 3.3s ease-in-out infinite;
    }

    .map-virginia .bb-va-horse {
      display: block;
    }

    .bb-va-horse-body {
      position: absolute;
      left: 18px;
      top: 18px;
      width: 44px;
      height: 24px;
      border-radius: 44% 48% 38% 42%;
      background: #7b5137;
      border: 3px solid #3e2d24;
    }

    .bb-va-horse-head {
      position: absolute;
      left: 3px;
      top: 9px;
      width: 22px;
      height: 20px;
      border-radius: 42% 42% 48% 48%;
      background: #82573b;
      border: 3px solid #3e2d24;
      transform-origin: right center;
      animation: bbVaHorseHead 3.3s ease-in-out infinite;
    }

    .bb-va-horse-head::before,
    .bb-va-horse-head::after {
      content: "";
      position: absolute;
      top: -9px;
      width: 7px;
      height: 11px;
      background: #82573b;
      border: 2px solid #3e2d24;
      clip-path: polygon(50% 0,100% 100%,0 100%);
    }

    .bb-va-horse-head::before { left: 1px; }
    .bb-va-horse-head::after { right: 1px; }

    .bb-va-horse-leg {
      position: absolute;
      top: 39px;
      width: 6px;
      height: 15px;
      background: #68432f;
      border: 2px solid #3e2d24;
    }

    .bb-va-horse-leg.one { left: 24px; }
    .bb-va-horse-leg.two { left: 34px; }
    .bb-va-horse-leg.three { left: 50px; }
    .bb-va-horse-leg.four { left: 59px; }

    .bb-va-horse-tail {
      position: absolute;
      right: 3px;
      top: 21px;
      width: 22px;
      height: 7px;
      border-radius: 50%;
      background: #3c2b24;
      transform-origin: left center;
      animation: bbVaHorseTail 1.7s ease-in-out infinite alternate;
    }

    @keyframes bbVaHorseGraze {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(2px); }
    }

    @keyframes bbVaHorseHead {
      0%, 28%, 100% { transform: rotate(0deg); }
      48%, 72% { transform: rotate(19deg) translateY(3px); }
    }

    @keyframes bbVaHorseTail {
      from { transform: rotate(-12deg); }
      to { transform: rotate(18deg); }
    }


    /* =================================================
       WESTHAMPTON — KEEP THE CLEANED VERSION
    ================================================= */

    .map-westhampton .bb-wh-dune-fence,
    .map-westhampton .bb-wh-dune-grass,
    .map-westhampton .map-decor::after {
      display: none !important;
    }

    .bb-wh-clean-umbrella {
      display: none;
      position: absolute;
      right: 10%;
      bottom: 78px;
      width: 116px;
      height: 112px;
      z-index: 4;
      pointer-events: none;
    }

    .map-westhampton .bb-wh-clean-umbrella {
      display: block;
    }

    .bb-wh-clean-umbrella::before {
      content: "";
      position: absolute;
      left: 8px;
      top: 0;
      width: 100px;
      height: 49px;
      border-radius: 100px 100px 5px 5px;
      background:
        repeating-linear-gradient(
          90deg,
          #e94e4e 0 20px,
          #f7f2e7 20px 40px
        );
      border: 4px solid #684b37;
      border-bottom-width: 5px;
    }

    .bb-wh-clean-umbrella::after {
      content: "";
      position: absolute;
      left: 56px;
      top: 48px;
      width: 6px;
      height: 64px;
      background: #765238;
      border: 2px solid #4c3829;
    }


    /* =================================================
       MADRID — CLEAN FINAL LAYERING + SYMMETRY
    ================================================= */

    .map-madrid .decor-one {
      display: none !important;
    }

    .map-madrid .map-decor::after {
      left: 7% !important;
      right: 7% !important;
      bottom: 225px !important;
      height: 92px !important;
      background:
        repeating-linear-gradient(
          90deg,
          transparent 0 35px,
          #332f2d 35px 54px,
          transparent 54px 92px
        ) !important;
      opacity: .72 !important;
    }

    .bb-madrid-roof {
      bottom: 361px !important;
      height: 42px !important;
      z-index: 2 !important;
    }

    .bb-madrid-tower {
      bottom: 304px !important;
      width: 72px !important;
      height: 118px !important;
      z-index: 4 !important;
    }

    .bb-madrid-tower.left {
      left: 3.2% !important;
    }

    .bb-madrid-tower.right {
      right: 3.2% !important;
      left: auto !important;
    }

    .bb-madrid-tower::before {
      top: -78px !important;
      height: 82px !important;
    }

    .bb-madrid-arcades {
      left: 2% !important;
      right: 2% !important;
      bottom: 140px !important;
      height: 54px !important;
      border-top: 6px solid #b86851 !important;
      background:
        radial-gradient(
          ellipse at 50% 100%,
          #292624 0 55%,
          transparent 57%
        ) 0 0 / 116px 54px repeat-x,
        #93473b !important;
      opacity: 1 !important;
    }

    .bb-madrid-lights {
      bottom: 151px !important;
      opacity: .75 !important;
    }


    /* =================================================
       MAP SELECT — PREVIEWS MATCH THE FINAL ARENAS
    ================================================= */

    /* Virginia: no fence, barn + estate + little horse. */
    .virginia-preview .bb-va-preview-fence {
      display: none !important;
    }

    .bb-va-preview-horse {
      position: absolute;
      left: 29%;
      bottom: 32px;
      width: 37px;
      height: 25px;
      transform-origin: bottom center;
      animation: bbVaPreviewHorse 3s ease-in-out infinite;
    }

    .bb-va-preview-horse::before {
      content: "";
      position: absolute;
      left: 10px;
      top: 8px;
      width: 22px;
      height: 12px;
      border-radius: 45%;
      background: #7b5137;
      border: 2px solid #3e2d24;
    }

    .bb-va-preview-horse::after {
      content: "";
      position: absolute;
      left: 2px;
      top: 5px;
      width: 12px;
      height: 11px;
      border-radius: 45%;
      background: #82573b;
      border: 2px solid #3e2d24;
    }

    @keyframes bbVaPreviewHorse {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(1px) rotate(2deg); }
    }

    /* New Canaan preview: same refined typography + clock. */
    .newcanaan-preview .nc-preview-building {
      font-family: "Bodoni MT", Didot, "Times New Roman", serif !important;
      font-size: 9px !important;
      font-weight: 500 !important;
      letter-spacing: .8px !important;
      text-transform: uppercase !important;
    }

    .bb-nc-preview-clock::before {
      display: none !important;
    }

    .bb-nc-preview-clock-face {
      position: absolute;
      left: -11px;
      top: -21px;
      width: 27px;
      height: 27px;
      z-index: 12;
      border-radius: 50%;
      border: 3px solid #1e6849;
      background:
        linear-gradient(#2c2927,#2c2927) 50% 4px / 1px 4px no-repeat,
        linear-gradient(#2c2927,#2c2927) 50% calc(100% - 4px) / 1px 4px no-repeat,
        linear-gradient(#2c2927,#2c2927) 4px 50% / 4px 1px no-repeat,
        linear-gradient(#2c2927,#2c2927) calc(100% - 4px) 50% / 4px 1px no-repeat,
        #f5f1e7;
      box-shadow: 0 0 0 2px #d7cbb9;
    }

    .bb-nc-preview-clock-face::before,
    .bb-nc-preview-clock-face::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 50%;
      background: #2c2927;
      transform-origin: 50% 100%;
    }

    .bb-nc-preview-clock-face::before {
      width: 2px;
      height: 7px;
      margin-left: -1px;
      transform: rotate(312deg);
    }

    .bb-nc-preview-clock-face::after {
      width: 1px;
      height: 9px;
      transform: rotate(132deg);
    }

    /* Westhampton preview: strip clutter and show the final umbrella. */
    .westhampton-preview .bb-wh-preview-dunes {
      display: none !important;
    }

    .bb-wh-preview-clean-umbrella {
      position: absolute;
      right: 9%;
      bottom: 13px;
      width: 58px;
      height: 50px;
    }

    .bb-wh-preview-clean-umbrella::before {
      content: "";
      position: absolute;
      left: 3px;
      top: 0;
      width: 52px;
      height: 25px;
      border-radius: 52px 52px 3px 3px;
      background:
        repeating-linear-gradient(
          90deg,
          #e94e4e 0 11px,
          #f7f2e7 11px 22px
        );
      border: 2px solid #684b37;
    }

    .bb-wh-preview-clean-umbrella::after {
      content: "";
      position: absolute;
      left: 28px;
      top: 24px;
      width: 3px;
      height: 26px;
      background: #765238;
    }

    /* Madrid preview: twin towers and cleaner lower arcade. */
    .madrid-preview .madrid-preview-balcony {
      display: none !important;
    }

    .bb-madrid-preview-arcade {
      left: 3% !important;
      right: 3% !important;
      bottom: 40px !important;
      height: 22px !important;
      background:
        radial-gradient(
          ellipse at 50% 100%,
          #2c2928 0 56%,
          transparent 58%
        ) 0 0 / 54px 22px repeat-x,
        #98483b !important;
    }

    .bb-madrid-preview-tower.left {
      left: 5% !important;
    }

    .bb-madrid-preview-tower.right {
      right: 5% !important;
      left: auto !important;
    }
  `;

  document.head.appendChild(
    style
  );


  function appendOnce(
    parent,
    selector,
    className,
    html = ""
  ) {
    if (
      !parent ||
      parent.querySelector(selector)
    ) {
      return null;
    }

    const element =
      document.createElement("div");

    element.className =
      className;

    element.innerHTML =
      html;

    parent.appendChild(element);

    return element;
  }


  /* ===================================================
     ARENA FIXES
  =================================================== */

  const mapDecor =
    document.querySelector(
      "#arena .map-decor"
    );

  /* Proper New Canaan clock face + hands. */
  const clock =
    document.querySelector(
      ".bb-nc-clock"
    );

  if (
    clock
  ) {
    clock
      .querySelectorAll(
        ".bb-nc-clock-hand, .bb-nc-clock-pin"
      )
      .forEach(
        oldPart => oldPart.remove()
      );

    const face =
      appendOnce(
        clock,
        ".bb-nc-clock-face",
        "bb-nc-clock-face"
      );

    if (
      face
    ) {
      face.innerHTML = `
        <span class="bb-nc-clock-hand hour"></span>
        <span class="bb-nc-clock-hand minute"></span>
        <span class="bb-nc-clock-pin"></span>
      `;
    }
  }


  /* Virginia horse. */
  appendOnce(
    mapDecor,
    ".bb-va-horse",
    "bb-va-horse",
    `
      <div class="bb-va-horse-body"></div>
      <div class="bb-va-horse-head"></div>
      <div class="bb-va-horse-leg one"></div>
      <div class="bb-va-horse-leg two"></div>
      <div class="bb-va-horse-leg three"></div>
      <div class="bb-va-horse-leg four"></div>
      <div class="bb-va-horse-tail"></div>
    `
  );


  /* Westhampton clean umbrella. */
  appendOnce(
    mapDecor,
    ".bb-wh-clean-umbrella",
    "bb-wh-clean-umbrella"
  );


  /* Guarantee symmetrical Madrid right tower. */
  appendOnce(
    mapDecor,
    ".bb-madrid-tower.right",
    "bb-madrid-tower right"
  );


  /* ===================================================
     MAP SELECT PREVIEWS — UPDATED AFTER ARENA FIXES
  =================================================== */

  const vaPreview =
    document.querySelector(
      ".virginia-preview"
    );

  appendOnce(
    vaPreview,
    ".bb-va-preview-horse",
    "bb-va-preview-horse"
  );


  const ncPreviewClock =
    document.querySelector(
      ".bb-nc-preview-clock"
    );

  appendOnce(
    ncPreviewClock,
    ".bb-nc-preview-clock-face",
    "bb-nc-preview-clock-face"
  );


  const whPreview =
    document.querySelector(
      ".westhampton-preview"
    );

  appendOnce(
    whPreview,
    ".bb-wh-preview-clean-umbrella",
    "bb-wh-preview-clean-umbrella"
  );


  const madridPreview =
    document.querySelector(
      ".madrid-preview"
    );

  appendOnce(
    madridPreview,
    ".bb-madrid-preview-tower.right",
    "bb-madrid-preview-tower right"
  );
})();
