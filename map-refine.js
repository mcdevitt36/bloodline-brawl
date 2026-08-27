/* =====================================================
   BLOODLINE BRAWL — MAP REFINE
   Final visual pass + map-select preview sync.
   One-time only. No observers. No combat changes.
===================================================== */

(() => {
  if (window.__bbMapRefineLoaded) {
    return;
  }

  window.__bbMapRefineLoaded = true;

  const style = document.createElement("style");

  style.textContent = `
    /* =================================================
       NEW CANAAN — ANN-TAYLOR-STYLE RETAIL TYPOGRAPHY
    ================================================= */

    .bb-nc-signs,
    .newcanaan-preview .nc-preview-building {
      font-family:
        Didot,
        "Bodoni 72",
        "Bodoni MT",
        "Times New Roman",
        serif !important;
      font-weight: 500 !important;
      letter-spacing: 1px !important;
      word-spacing: 0 !important;
      text-transform: uppercase !important;
      color: #211a17 !important;
      text-shadow: none !important;
    }

    .bb-nc-signs {
      font-size: 14px !important;
    }

    .newcanaan-preview .nc-preview-building {
      font-size: 9px !important;
    }


    /* =================================================
       NEW CANAAN — CLEAN STREET CLOCK
    ================================================= */

    .bb-nc-clock::before,
    .bb-nc-preview-clock::before {
      display: none !important;
    }

    .bb-nc-clock-face {
      position: absolute;
      left: 50%;
      top: -51px;
      width: 62px;
      height: 62px;
      transform: translateX(-50%);
      z-index: 14;
      border-radius: 50%;
      background: #f6f2e8;
      border: 5px solid #246b4f;
      box-shadow:
        0 0 0 3px #d8cdbb,
        0 5px 0 rgba(0,0,0,.15);
      pointer-events: none;
    }

    .bb-nc-clock-face::before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: 7px;
      height: 7px;
      transform: translate(-50%,-50%);
      border-radius: 50%;
      background: #292725;
      z-index: 6;
    }

    .bb-nc-clock-ticks {
      position: absolute;
      inset: 8px;
      border-radius: 50%;
      background:
        linear-gradient(#383532,#383532) 50% 0 / 2px 6px no-repeat,
        linear-gradient(#383532,#383532) 50% 100% / 2px 6px no-repeat,
        linear-gradient(#383532,#383532) 0 50% / 6px 2px no-repeat,
        linear-gradient(#383532,#383532) 100% 50% / 6px 2px no-repeat;
      opacity: .78;
    }

    .bb-nc-clock-face .bb-refine-hour,
    .bb-nc-clock-face .bb-refine-minute {
      position: absolute;
      left: 50%;
      top: 50%;
      margin: 0;
      background: #292725;
      border-radius: 2px;
      transform-origin: 50% 100%;
      z-index: 7;
    }

    .bb-nc-clock-face .bb-refine-hour {
      width: 4px;
      height: 15px;
      transform: translate(-50%,-100%) rotate(305deg);
    }

    .bb-nc-clock-face .bb-refine-minute {
      width: 3px;
      height: 21px;
      transform: translate(-50%,-100%) rotate(128deg);
    }

    .bb-nc-clock-hand,
    .bb-nc-clock-pin {
      display: none !important;
    }

    .bb-nc-preview-face {
      position: absolute;
      left: 50%;
      top: -17px;
      width: 25px;
      height: 25px;
      transform: translateX(-50%);
      border-radius: 50%;
      background: #f6f2e8;
      border: 3px solid #246b4f;
      box-shadow: 0 0 0 1px #d8cdbb;
      z-index: 10;
    }

    .bb-nc-preview-face::before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: 3px;
      height: 3px;
      transform: translate(-50%,-50%);
      border-radius: 50%;
      background: #292725;
      box-shadow:
        -1px -6px 0 -1px #292725,
        5px -1px 0 -1px #292725,
        0 6px 0 -1px #292725,
        -6px 0 0 -1px #292725;
    }

    .bb-nc-preview-face .hour,
    .bb-nc-preview-face .minute {
      position: absolute;
      left: 50%;
      top: 50%;
      background: #292725;
      transform-origin: 50% 100%;
    }

    .bb-nc-preview-face .hour {
      width: 2px;
      height: 6px;
      transform: translate(-50%,-100%) rotate(305deg);
    }

    .bb-nc-preview-face .minute {
      width: 1px;
      height: 8px;
      transform: translate(-50%,-100%) rotate(128deg);
    }


    /* =================================================
       VIRGINIA ESTATE — CUT FENCING, ADD BACKGROUND HORSE
    ================================================= */

    .map-virginia .bb-va-fence,
    .map-virginia .bb-va-paddock,
    .virginia-preview .bb-va-preview-fence {
      display: none !important;
    }

    .bb-va-horse {
      display: none;
      position: absolute;
      left: 19%;
      bottom: 183px;
      width: 78px;
      height: 52px;
      z-index: 2;
      pointer-events: none;
      transform-origin: bottom center;
      animation: bbVaHorseBreathe 2.8s ease-in-out infinite alternate;
    }

    .map-virginia .bb-va-horse {
      display: block;
    }

    .bb-va-horse-body {
      position: absolute;
      left: 23px;
      top: 18px;
      width: 41px;
      height: 21px;
      border: 3px solid #3c2a21;
      border-radius: 48% 52% 42% 44%;
      background: #8c5b3e;
    }

    .bb-va-horse-neck {
      position: absolute;
      left: 15px;
      top: 10px;
      width: 17px;
      height: 27px;
      border: 3px solid #3c2a21;
      border-radius: 45% 40% 25% 35%;
      background: #8c5b3e;
      transform: rotate(14deg);
      transform-origin: bottom center;
      animation: bbVaHorseGraze 3.6s ease-in-out infinite;
    }

    .bb-va-horse-head {
      position: absolute;
      left: 3px;
      top: 2px;
      width: 23px;
      height: 15px;
      border: 3px solid #3c2a21;
      border-radius: 48% 52% 42% 48%;
      background: #966548;
      transform: rotate(-8deg);
    }

    .bb-va-horse-head::before,
    .bb-va-horse-head::after {
      content: "";
      position: absolute;
      top: -8px;
      width: 6px;
      height: 9px;
      background: #744a34;
      border: 2px solid #3c2a21;
      clip-path: polygon(50% 0,100% 100%,0 100%);
    }

    .bb-va-horse-head::before { left: 2px; }
    .bb-va-horse-head::after { right: 1px; }

    .bb-va-horse-leg {
      position: absolute;
      top: 35px;
      width: 6px;
      height: 17px;
      background: #75462f;
      border: 2px solid #3c2a21;
    }

    .bb-va-horse-leg.one { left: 28px; }
    .bb-va-horse-leg.two { left: 39px; }
    .bb-va-horse-leg.three { left: 53px; }
    .bb-va-horse-leg.four { left: 61px; }

    .bb-va-horse-tail {
      position: absolute;
      right: 4px;
      top: 20px;
      width: 20px;
      height: 7px;
      background: #4a3125;
      border: 2px solid #3c2a21;
      border-radius: 50%;
      transform-origin: left center;
      animation: bbVaHorseTail 1.45s ease-in-out infinite alternate;
    }

    .bb-va-preview-horse {
      position: absolute;
      left: 27%;
      bottom: 31px;
      width: 34px;
      height: 20px;
      z-index: 6;
      animation: bbVaHorseBreathe 2.8s ease-in-out infinite alternate;
    }

    .bb-va-preview-horse::before {
      content: "";
      position: absolute;
      left: 10px;
      top: 6px;
      width: 20px;
      height: 10px;
      border-radius: 50%;
      background: #8c5b3e;
      border: 2px solid #4a3125;
      box-shadow:
        2px 10px 0 -1px #75462f,
        12px 10px 0 -1px #75462f;
    }

    .bb-va-preview-horse::after {
      content: "";
      position: absolute;
      left: 2px;
      top: 2px;
      width: 12px;
      height: 8px;
      border-radius: 45%;
      background: #966548;
      border: 2px solid #4a3125;
      transform-origin: right bottom;
      animation: bbVaPreviewGraze 3.6s ease-in-out infinite;
    }

    @keyframes bbVaHorseBreathe {
      from { transform: translateY(0); }
      to { transform: translateY(1.5px); }
    }

    @keyframes bbVaHorseGraze {
      0%, 38% { transform: rotate(14deg); }
      55%, 78% { transform: rotate(34deg) translateY(3px); }
      100% { transform: rotate(14deg); }
    }

    @keyframes bbVaHorseTail {
      from { transform: rotate(-10deg); }
      to { transform: rotate(18deg); }
    }

    @keyframes bbVaPreviewGraze {
      0%, 40% { transform: rotate(-8deg); }
      58%, 80% { transform: rotate(22deg) translateY(2px); }
      100% { transform: rotate(-8deg); }
    }


    /* =================================================
       MAP SELECT — SYNC PREVIEWS WITH CURRENT ARENAS
    ================================================= */

    .westhampton-preview .bb-wh-preview-dunes {
      display: none !important;
    }

    .westhampton-preview .preview-umbrella {
      right: 34px !important;
      bottom: 17px !important;
    }

    .westhampton-preview .preview-icecream {
      left: 18px !important;
      bottom: 14px !important;
    }

    .bb-wh-preview-pete {
      position: absolute;
      left: 61%;
      top: 56px;
      width: 17px;
      height: 14px;
      opacity: .78;
      animation: bbPetePreviewBob 1.8s ease-in-out infinite alternate;
    }

    .bb-wh-preview-pete::before {
      content: "";
      position: absolute;
      left: 6px;
      top: 2px;
      width: 5px;
      height: 8px;
      background: #eee9df;
      border: 1px solid #4b4038;
      box-shadow: 0 -4px 0 #c9272c;
    }

    .bb-wh-preview-pete::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 17px;
      height: 3px;
      border-radius: 50%;
      background: #f2ede2;
      border: 1px solid #705b48;
    }

    @keyframes bbPetePreviewBob {
      from { transform: translateY(0); }
      to { transform: translateY(2px); }
    }


    .newcanaan-preview .preview-lamp {
      display: none !important;
    }

    .bb-nc-preview-clock {
      left: 50% !important;
      bottom: 28px !important;
      width: 5px !important;
      height: 63px !important;
      background: linear-gradient(90deg,#18583e,#2b7957,#18583e) !important;
      border: 1px solid #123e2f !important;
      z-index: 9 !important;
    }


    .madrid-preview .madrid-preview-balcony {
      display: none !important;
    }

    .madrid-preview .bb-madrid-preview-tower.left {
      left: 5% !important;
    }

    .madrid-preview .bb-madrid-preview-tower.right {
      right: 5% !important;
      left: auto !important;
    }

    .madrid-preview .bb-madrid-preview-arcade {
      opacity: .9 !important;
    }
  `;

  document.head.appendChild(style);


  /* ===================================================
     DOM HELPERS
  =================================================== */

  function addOnce(parent, className, html = "") {
    if (!parent || parent.querySelector("." + className.split(" ")[0])) {
      return null;
    }

    const element = document.createElement("div");
    element.className = className;
    element.innerHTML = html;
    parent.appendChild(element);
    return element;
  }


  /* ===================================================
     NEW CANAAN ARENA CLOCK
  =================================================== */

  const clock = document.querySelector(".bb-nc-clock");

  if (clock) {
    clock.querySelectorAll(
      ".bb-nc-clock-hand, .bb-nc-clock-pin, .bb-nc-clock-face"
    ).forEach(node => node.remove());

    const face = document.createElement("div");
    face.className = "bb-nc-clock-face";
    face.innerHTML = `
      <div class="bb-nc-clock-ticks"></div>
      <span class="bb-refine-hour"></span>
      <span class="bb-refine-minute"></span>
    `;
    clock.appendChild(face);
  }


  /* ===================================================
     VIRGINIA ARENA HORSE
  =================================================== */

  const mapDecor = document.querySelector("#arena .map-decor");

  if (mapDecor) {
    mapDecor.querySelectorAll(
      ".bb-va-fence, .bb-va-paddock"
    ).forEach(node => node.remove());

    addOnce(
      mapDecor,
      "bb-va-horse",
      `
        <div class="bb-va-horse-tail"></div>
        <div class="bb-va-horse-body"></div>
        <div class="bb-va-horse-neck">
          <div class="bb-va-horse-head"></div>
        </div>
        <div class="bb-va-horse-leg one"></div>
        <div class="bb-va-horse-leg two"></div>
        <div class="bb-va-horse-leg three"></div>
        <div class="bb-va-horse-leg four"></div>
      `
    );
  }


  /* ===================================================
     MAP SELECT PREVIEW SYNC
  =================================================== */

  const vaPreview = document.querySelector(".virginia-preview");
  if (vaPreview) {
    vaPreview.querySelectorAll(".bb-va-preview-fence").forEach(node => node.remove());
    addOnce(vaPreview, "bb-va-preview-horse");
  }

  const whPreview = document.querySelector(".westhampton-preview");
  if (whPreview) {
    addOnce(whPreview, "bb-wh-preview-pete");
  }

  const ncPreviewClock = document.querySelector(".bb-nc-preview-clock");
  if (ncPreviewClock) {
    ncPreviewClock.innerHTML = `
      <div class="bb-nc-preview-face">
        <span class="hour"></span>
        <span class="minute"></span>
      </div>
    `;
  }

  const madridPreview = document.querySelector(".madrid-preview");
  if (madridPreview) {
    if (!madridPreview.querySelector(".bb-madrid-preview-tower.left")) {
      const leftTower = document.createElement("div");
      leftTower.className = "bb-madrid-preview-tower left";
      madridPreview.appendChild(leftTower);
    }

    if (!madridPreview.querySelector(".bb-madrid-preview-tower.right")) {
      const rightTower = document.createElement("div");
      rightTower.className = "bb-madrid-preview-tower right";
      madridPreview.appendChild(rightTower);
    }
  }
})();
