/* =====================================================
   BLOODLINE BRAWL — VISUAL FIXES V4
   Direct final-pass fixes loaded after map-refine.
   No combat balance changes. No observers.
===================================================== */

(() => {
  if (window.__bbVisualFixesV4Loaded) {
    return;
  }

  window.__bbVisualFixesV4Loaded = true;

  const style = document.createElement("style");

  style.textContent = `
    /* =================================================
       VIRGINIA HORSE — CONNECTED ANATOMY
    ================================================= */

    .bb-va-horse {
      width: 88px !important;
      height: 58px !important;
      left: 19% !important;
      bottom: 181px !important;
      animation: bbV4HorseBreathe 2.7s ease-in-out infinite alternate !important;
    }

    .bb-v4-horse-body {
      position: absolute;
      left: 29px;
      top: 21px;
      width: 46px;
      height: 23px;
      background: linear-gradient(180deg,#986548,#7c4e36);
      border: 3px solid #3d2a21;
      border-radius: 48% 52% 42% 45%;
      z-index: 3;
    }

    .bb-v4-horse-neck {
      position: absolute;
      left: 18px;
      top: 15px;
      width: 21px;
      height: 34px;
      background: #8d5c40;
      border: 3px solid #3d2a21;
      border-radius: 46% 42% 34% 38%;
      transform: rotate(-18deg);
      transform-origin: 70% 90%;
      z-index: 4;
      animation: bbV4HorseGraze 3.5s ease-in-out infinite;
    }

    .bb-v4-horse-head {
      position: absolute;
      left: -14px;
      top: -2px;
      width: 30px;
      height: 18px;
      background: #9b694b;
      border: 3px solid #3d2a21;
      border-radius: 55% 46% 48% 52%;
      z-index: 5;
    }

    .bb-v4-horse-head::before,
    .bb-v4-horse-head::after {
      content: "";
      position: absolute;
      top: -9px;
      width: 7px;
      height: 10px;
      background: #7b4d36;
      border: 2px solid #3d2a21;
      clip-path: polygon(50% 0,100% 100%,0 100%);
    }

    .bb-v4-horse-head::before { left: 5px; }
    .bb-v4-horse-head::after { right: 5px; }

    .bb-v4-horse-eye {
      position: absolute;
      left: 7px;
      top: 5px;
      width: 4px;
      height: 4px;
      background: #171310;
      border-radius: 50%;
    }

    .bb-v4-horse-muzzle {
      position: absolute;
      left: -5px;
      bottom: 0;
      width: 12px;
      height: 9px;
      background: #b18466;
      border: 2px solid #3d2a21;
      border-radius: 50%;
    }

    .bb-v4-horse-mane {
      position: absolute;
      right: -5px;
      top: 4px;
      width: 7px;
      height: 25px;
      background: #3d2a21;
      border-radius: 50%;
      transform: rotate(4deg);
      z-index: 2;
    }

    .bb-v4-horse-leg {
      position: absolute;
      top: 42px;
      width: 6px;
      height: 16px;
      background: #6f432f;
      border: 2px solid #3d2a21;
      z-index: 2;
    }

    .bb-v4-horse-leg.one { left: 36px; }
    .bb-v4-horse-leg.two { left: 47px; }
    .bb-v4-horse-leg.three { left: 64px; }
    .bb-v4-horse-leg.four { left: 73px; }

    .bb-v4-horse-tail {
      position: absolute;
      left: 72px;
      top: 24px;
      width: 24px;
      height: 8px;
      background: #3c2a21;
      border: 2px solid #3d2a21;
      border-radius: 50%;
      transform-origin: left center;
      animation: bbV4HorseTail 1.4s ease-in-out infinite alternate;
      z-index: 1;
    }

    @keyframes bbV4HorseBreathe {
      from { transform: translateY(0); }
      to { transform: translateY(1.5px); }
    }

    @keyframes bbV4HorseGraze {
      0%, 34%, 100% { transform: rotate(-18deg); }
      52%, 74% { transform: rotate(3deg) translateY(4px); }
    }

    @keyframes bbV4HorseTail {
      from { transform: rotate(-10deg); }
      to { transform: rotate(18deg); }
    }


    /* =================================================
       ZOMBIE DEER — CLEANER MODEL + ALIGNED EYES
    ================================================= */

    .zombie-deer {
      width: 136px !important;
      height: 112px !important;
      filter: drop-shadow(4px 5px 0 rgba(0,0,0,.3)) !important;
    }

    .zombie-deer .deer-body {
      left: 46px !important;
      top: 44px !important;
      width: 70px !important;
      height: 38px !important;
      background:
        radial-gradient(circle at 72% 28%, rgba(104,130,72,.62) 0 7px, transparent 8px),
        linear-gradient(180deg,#a69670,#827456) !important;
      border: 4px solid #332d21 !important;
      border-radius: 48% 50% 40% 44% !important;
      z-index: 3 !important;
    }

    .zombie-deer .bb-deer-neck {
      position: absolute;
      left: 33px;
      top: 35px;
      width: 28px;
      height: 42px;
      background: linear-gradient(90deg,#998865,#837352);
      border: 4px solid #332d21;
      border-radius: 45% 42% 35% 40%;
      transform: rotate(-18deg);
      z-index: 4;
    }

    .zombie-deer .deer-head {
      left: 9px !important;
      top: 18px !important;
      width: 46px !important;
      height: 42px !important;
      background:
        radial-gradient(circle at 68% 75%, rgba(100,133,67,.65) 0 6px, transparent 7px),
        linear-gradient(180deg,#a79773,#887958) !important;
      border: 4px solid #332d21 !important;
      border-radius: 48% 50% 43% 47% !important;
      z-index: 6 !important;
    }

    .zombie-deer .deer-head::before,
    .zombie-deer .deer-head::after {
      content: "" !important;
      position: absolute !important;
      top: -19px !important;
      width: 18px !important;
      height: 23px !important;
      background: transparent !important;
      border: 0 !important;
      border-left: 4px solid #716148 !important;
      border-top: 4px solid #716148 !important;
      border-radius: 3px !important;
      transform-origin: bottom center !important;
    }

    .zombie-deer .deer-head::before {
      left: 5px !important;
      transform: rotate(-20deg) !important;
    }

    .zombie-deer .deer-head::after {
      right: 5px !important;
      left: auto !important;
      transform: scaleX(-1) rotate(-20deg) !important;
    }

    .zombie-deer .bb-deer-ear {
      position: absolute;
      top: -7px;
      width: 10px;
      height: 14px;
      background: #978567;
      border: 3px solid #332d21;
      clip-path: polygon(50% 0,100% 100%,0 100%);
      z-index: 7;
    }

    .zombie-deer .bb-deer-ear.left { left: 2px; }
    .zombie-deer .bb-deer-ear.right { right: 2px; }

    .zombie-deer .deer-eye {
      top: 13px !important;
      width: 9px !important;
      height: 9px !important;
      background: #96ff71 !important;
      border: 2px solid #25321f !important;
      border-radius: 50% !important;
      box-shadow: 0 0 7px rgba(111,255,86,.75) !important;
      z-index: 9 !important;
    }

    .zombie-deer .deer-eye.left {
      left: 8px !important;
      right: auto !important;
    }

    .zombie-deer .deer-eye.right {
      left: auto !important;
      right: 8px !important;
    }

    .zombie-deer .bb-deer-muzzle {
      position: absolute;
      left: 9px;
      bottom: -5px;
      width: 27px;
      height: 17px;
      background: #c1b08c;
      border: 3px solid #332d21;
      border-radius: 48%;
      z-index: 8;
    }

    .zombie-deer .bb-deer-nose {
      position: absolute;
      left: 8px;
      bottom: 2px;
      width: 8px;
      height: 6px;
      background: #25231d;
      border-radius: 50%;
    }

    .zombie-deer .bb-deer-ribs {
      position: absolute;
      left: 22px;
      top: 8px;
      width: 27px;
      height: 19px;
      opacity: .65;
      background:
        repeating-linear-gradient(
          90deg,
          transparent 0 5px,
          #d8cfb5 5px 7px,
          transparent 7px 10px
        );
      transform: skewX(-8deg);
      border-radius: 40%;
    }

    .zombie-deer .bb-deer-tail {
      position: absolute;
      right: -18px;
      top: 8px;
      width: 25px;
      height: 10px;
      background: #76664c;
      border: 3px solid #332d21;
      border-radius: 50%;
      transform: rotate(-18deg);
      transform-origin: left center;
    }

    .zombie-deer .deer-leg {
      top: 76px !important;
      width: 9px !important;
      height: 31px !important;
      background: #77694e !important;
      border: 3px solid #332d21 !important;
      z-index: 2 !important;
    }

    .zombie-deer .deer-leg.one { left: 54px !important; }
    .zombie-deer .deer-leg.two { left: 69px !important; }
    .zombie-deer .deer-leg.three { left: 94px !important; }
    .zombie-deer .deer-leg.four { left: 108px !important; }


    /* =================================================
       CONNOR — FULL JAW / CHEEK STUBBLE
    ================================================= */

    .connor-model .connor-stubble {
      left: 31px !important;
      top: 43px !important;
      width: 39px !important;
      height: 28px !important;
      z-index: 9 !important;
      border: 0 !important;
      border-radius: 4px 4px 9px 9px;
      clip-path: polygon(0 4%,100% 4%,100% 65%,82% 100%,18% 100%,0 65%);
      background:
        radial-gradient(circle,#674d3f 0 1px,transparent 1.3px) 0 0 / 5px 5px,
        radial-gradient(circle,#674d3f 0 1px,transparent 1.3px) 2px 2px / 6px 6px;
      opacity: .48;
      pointer-events: none;
    }

    .connor-model .face .eye,
    .connor-model .face .mouth {
      position: absolute;
      z-index: 14 !important;
    }


    /* =================================================
       MAP SELECT — REBUILD PREVIEWS TO MATCH ARENAS
    ================================================= */

    .bb-v4-preview {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
    }

    .bb-v4-preview * {
      box-sizing: border-box;
    }

    /* Virginia */
    .bb-v4-va {
      background: linear-gradient(#83c9e8 0 50%,#67aa4d 51%,#3d872e 100%);
    }

    .bb-v4-va-estate {
      position: absolute;
      left: 50%;
      bottom: 33px;
      width: 156px;
      height: 61px;
      transform: translateX(-50%);
      background: #e7dfd2;
      border: 3px solid #5b5147;
    }

    .bb-v4-va-estate::before {
      content: "";
      position: absolute;
      left: -6px;
      top: -31px;
      width: 162px;
      height: 34px;
      background: #4e4a47;
      clip-path: polygon(6% 100%,20% 28%,50% 0,80% 28%,94% 100%);
    }

    .bb-v4-va-estate::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 0;
      width: 22px;
      height: 36px;
      transform: translateX(-50%);
      background: #684934;
      border: 2px solid #3d3027;
      box-shadow:
        -47px -3px 0 -4px #739cad,
        47px -3px 0 -4px #739cad;
    }

    .bb-v4-va-barn {
      position: absolute;
      left: 7%;
      bottom: 31px;
      width: 65px;
      height: 38px;
      background: #8f3e32;
      border: 2px solid #55342c;
    }

    .bb-v4-va-barn::before {
      content: "";
      position: absolute;
      left: -5px;
      top: -22px;
      width: 71px;
      height: 24px;
      background: #55504a;
      clip-path: polygon(4% 100%,22% 22%,50% 0,78% 22%,96% 100%);
    }

    .bb-v4-va-horse-mini {
      position: absolute;
      left: 27%;
      bottom: 29px;
      width: 33px;
      height: 18px;
    }

    .bb-v4-va-horse-mini::before {
      content: "";
      position: absolute;
      left: 10px;
      top: 5px;
      width: 21px;
      height: 10px;
      background: #89583d;
      border: 2px solid #3d2a21;
      border-radius: 50%;
      box-shadow: 3px 10px 0 -1px #6e432f,14px 10px 0 -1px #6e432f;
    }

    .bb-v4-va-horse-mini::after {
      content: "";
      position: absolute;
      left: 2px;
      top: 2px;
      width: 12px;
      height: 8px;
      background: #976649;
      border: 2px solid #3d2a21;
      border-radius: 48%;
    }

    /* Westhampton */
    .bb-v4-wh {
      background: linear-gradient(#83c9e8 0 38%,#287eae 39%,#2f98c5 57%,#dcc992 58%,#d7b86f 100%);
    }

    .bb-v4-wh-waterline {
      position: absolute;
      left: 0;
      right: 0;
      top: 61px;
      height: 3px;
      background: rgba(255,255,255,.75);
      box-shadow: 0 12px 0 rgba(255,255,255,.35);
    }

    .bb-v4-wh-stand {
      position: absolute;
      left: 18px;
      bottom: 13px;
      width: 88px;
      height: 49px;
      background: #f1e4c7;
      border: 3px solid #684b37;
    }

    .bb-v4-wh-stand::before {
      content: "";
      position: absolute;
      left: -4px;
      top: -18px;
      width: 90px;
      height: 19px;
      background: repeating-linear-gradient(90deg,#ef5555 0 15px,#fff4df 15px 30px);
      border: 3px solid #684b37;
    }

    .bb-v4-wh-stand::after {
      content: "ICE CREAM";
      position: absolute;
      left: 12px;
      top: 15px;
      width: 58px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #6cb7cf;
      border: 2px solid #684b37;
      color: white;
      font-size: 7px;
      font-weight: 900;
    }

    .bb-v4-wh-umbrella {
      position: absolute;
      right: 29px;
      bottom: 14px;
      width: 5px;
      height: 46px;
      background: #765238;
    }

    .bb-v4-wh-umbrella::before {
      content: "";
      position: absolute;
      left: -31px;
      top: -4px;
      width: 67px;
      height: 31px;
      border-radius: 70px 70px 4px 4px;
      background: repeating-linear-gradient(90deg,#e94e4e 0 13px,#f7f2e7 13px 26px);
      border: 2px solid #684b37;
    }

    .bb-v4-wh-pete {
      position: absolute;
      left: 63%;
      top: 54px;
      width: 19px;
      height: 12px;
    }

    .bb-v4-wh-pete::before {
      content: "";
      position: absolute;
      left: 7px;
      top: 0;
      width: 5px;
      height: 8px;
      background: #eee9df;
      border: 1px solid #4b4038;
      box-shadow: 0 -4px 0 #c9272c;
    }

    .bb-v4-wh-pete::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 19px;
      height: 3px;
      background: #f2ede2;
      border: 1px solid #705b48;
      border-radius: 50%;
    }

    /* New Canaan */
    .bb-v4-nc {
      background: linear-gradient(#a9cee1 0 33%,#5c5b59 34% 43%,#c7c0b6 44% 66%,#6d6966 67% 74%,#4f4f4e 75% 100%);
    }

    .bb-v4-nc-buildings {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 29px;
      height: 78px;
      display: grid;
      grid-template-columns: repeat(4,1fr);
      border-top: 4px solid #4d4946;
    }

    .bb-v4-nc-shop {
      position: relative;
      padding-top: 8px;
      text-align: center;
      color: #231b18;
      font-family: Didot,"Bodoni MT","Times New Roman",serif;
      font-size: 8px;
      letter-spacing: .8px;
      border-right: 2px solid #55473f;
    }

    .bb-v4-nc-shop:nth-child(1),
    .bb-v4-nc-shop:nth-child(3) { background: #a94a39; }
    .bb-v4-nc-shop:nth-child(2),
    .bb-v4-nc-shop:nth-child(4) { background: #e0e3df; }

    .bb-v4-nc-shop::after {
      content: "";
      position: absolute;
      left: 7px;
      right: 7px;
      bottom: 7px;
      height: 40px;
      background: repeating-linear-gradient(90deg,#c9dde2 0 20px,#53636a 20px 24px);
      border-bottom: 2px solid #42372f;
    }

    .bb-v4-nc-clock {
      position: absolute;
      left: 50%;
      bottom: 18px;
      width: 5px;
      height: 65px;
      transform: translateX(-50%);
      background: #1f6849;
      border: 1px solid #174b38;
      z-index: 6;
    }

    .bb-v4-nc-clock-face {
      position: absolute;
      left: 50%;
      top: -18px;
      width: 28px;
      height: 28px;
      transform: translateX(-50%);
      border-radius: 50%;
      background: #f5f1e7;
      border: 3px solid #226b4d;
      box-shadow: 0 0 0 1px #d7cbb9;
    }

    .bb-v4-nc-clock-face::before,
    .bb-v4-nc-clock-face::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      background: #2c2927;
      transform-origin: 50% 100%;
    }

    .bb-v4-nc-clock-face::before {
      width: 2px;
      height: 7px;
      transform: translate(-50%,-100%) rotate(305deg);
    }

    .bb-v4-nc-clock-face::after {
      width: 1px;
      height: 9px;
      transform: translate(-50%,-100%) rotate(128deg);
    }

    /* Madrid */
    .bb-v4-mad {
      background: linear-gradient(#9ebfd0 0 18%,#d39a98 29%,#ed9f7c 41%,#a44c3e 42% 77%,#86453a 78% 100%);
    }

    .bb-v4-mad-facade {
      position: absolute;
      left: 4%;
      right: 4%;
      bottom: 27px;
      height: 88px;
      background: #9f493c;
      border-bottom: 5px solid #64392f;
    }

    .bb-v4-mad-roof {
      position: absolute;
      left: 3%;
      right: 3%;
      top: 39px;
      height: 22px;
      background: #444649;
      clip-path: polygon(0 25%,20% 5%,50% 0,80% 5%,100% 25%,100% 100%,0 100%);
    }

    .bb-v4-mad-tower {
      position: absolute;
      bottom: 61px;
      width: 31px;
      height: 69px;
      background: #95453a;
      border: 3px solid #62372f;
      z-index: 4;
    }

    .bb-v4-mad-tower.left { left: 5%; }
    .bb-v4-mad-tower.right { right: 5%; }

    .bb-v4-mad-tower::before {
      content: "";
      position: absolute;
      left: -5px;
      top: -34px;
      width: 35px;
      height: 36px;
      background: #3f4245;
      clip-path: polygon(50% 0,67% 58%,92% 100%,8% 100%,33% 58%);
    }

    .bb-v4-mad-arcades {
      position: absolute;
      left: 4%;
      right: 4%;
      bottom: 28px;
      height: 25px;
      background:
        radial-gradient(ellipse at 50% 100%,#2b2827 0 58%,transparent 60%) 0 0 / 55px 25px repeat-x;
      border-top: 3px solid #b86851;
      z-index: 3;
    }

    .bb-v4-mad-fountain {
      position: absolute;
      left: 50%;
      bottom: 11px;
      width: 54px;
      height: 15px;
      transform: translateX(-50%);
      border-radius: 50%;
      background: #70bcd3;
      border: 5px solid #8f806c;
      z-index: 5;
    }
  `;

  document.head.appendChild(style);


  /* ===================================================
     REBUILD VIRGINIA HORSE
  =================================================== */

  const horse = document.querySelector(".bb-va-horse");

  if (horse) {
    horse.innerHTML = `
      <div class="bb-v4-horse-tail"></div>
      <div class="bb-v4-horse-body"></div>
      <div class="bb-v4-horse-neck">
        <div class="bb-v4-horse-mane"></div>
        <div class="bb-v4-horse-head">
          <div class="bb-v4-horse-eye"></div>
          <div class="bb-v4-horse-muzzle"></div>
        </div>
      </div>
      <div class="bb-v4-horse-leg one"></div>
      <div class="bb-v4-horse-leg two"></div>
      <div class="bb-v4-horse-leg three"></div>
      <div class="bb-v4-horse-leg four"></div>
    `;
  }


  /* ===================================================
     UPGRADE ZOMBIE DEER SPAWNS
  =================================================== */

  if (typeof deerHTML === "function") {
    deerHTML = function() {
      return `
        <div class="deer-body">
          <div class="bb-deer-ribs"></div>
          <div class="bb-deer-tail"></div>
        </div>

        <div class="bb-deer-neck"></div>

        <div class="deer-head">
          <div class="bb-deer-ear left"></div>
          <div class="bb-deer-ear right"></div>
          <div class="deer-eye left"></div>
          <div class="deer-eye right"></div>
          <div class="bb-deer-muzzle">
            <div class="bb-deer-nose"></div>
          </div>
        </div>

        <div class="deer-leg one"></div>
        <div class="deer-leg two"></div>
        <div class="deer-leg three"></div>
        <div class="deer-leg four"></div>
      `;
    };
  }


  /* ===================================================
     REBUILD MAP-SELECTION PREVIEWS
  =================================================== */

  const vaPreview = document.querySelector(".virginia-preview");
  if (vaPreview) {
    vaPreview.innerHTML = `
      <div class="bb-v4-preview bb-v4-va">
        <div class="bb-v4-va-barn"></div>
        <div class="bb-v4-va-estate"></div>
        <div class="bb-v4-va-horse-mini"></div>
      </div>
    `;
  }

  const whPreview = document.querySelector(".westhampton-preview");
  if (whPreview) {
    whPreview.innerHTML = `
      <div class="bb-v4-preview bb-v4-wh">
        <div class="bb-v4-wh-waterline"></div>
        <div class="bb-v4-wh-stand"></div>
        <div class="bb-v4-wh-umbrella"></div>
        <div class="bb-v4-wh-pete"></div>
      </div>
    `;
  }

  const ncPreview = document.querySelector(".newcanaan-preview");
  if (ncPreview) {
    ncPreview.innerHTML = `
      <div class="bb-v4-preview bb-v4-nc">
        <div class="bb-v4-nc-buildings">
          <div class="bb-v4-nc-shop">MARKET</div>
          <div class="bb-v4-nc-shop">BOUTIQUE</div>
          <div class="bb-v4-nc-shop">CAFE</div>
          <div class="bb-v4-nc-shop">SHOPS</div>
        </div>
        <div class="bb-v4-nc-clock">
          <div class="bb-v4-nc-clock-face"></div>
        </div>
      </div>
    `;
  }

  const madridPreview = document.querySelector(".madrid-preview");
  if (madridPreview) {
    madridPreview.innerHTML = `
      <div class="bb-v4-preview bb-v4-mad">
        <div class="bb-v4-mad-facade"></div>
        <div class="bb-v4-mad-roof"></div>
        <div class="bb-v4-mad-tower left"></div>
        <div class="bb-v4-mad-tower right"></div>
        <div class="bb-v4-mad-arcades"></div>
        <div class="bb-v4-mad-fountain"></div>
      </div>
    `;
  }
})();
