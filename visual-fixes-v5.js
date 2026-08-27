/* =====================================================
   BLOODLINE BRAWL — VISUAL FIXES V5
   Final-pass visual polish only.
   - Connected Virginia horse anatomy
   - Cleaner zombie deer with aligned eyes
   - Battlefield previews rebuilt to match live arenas
   - Connor full beard-area stubble
   No observers. No combat or balance changes.
===================================================== */

(() => {
  if (window.__bbVisualFixesV5Loaded) {
    return;
  }

  window.__bbVisualFixesV5Loaded = true;

  const style = document.createElement("style");

  style.textContent = `
    /* =================================================
       VIRGINIA ESTATE HORSE — CONNECTED, CLEAN SILHOUETTE
    ================================================= */

    .bb-va-horse {
      width: 92px !important;
      height: 62px !important;
      left: 18.5% !important;
      bottom: 181px !important;
      z-index: 2 !important;
      animation: bbV5HorseBreathe 2.9s ease-in-out infinite alternate !important;
      transform-origin: bottom center !important;
    }

    .bb-v5-horse-body {
      position: absolute;
      left: 34px;
      top: 21px;
      width: 48px;
      height: 25px;
      border: 3px solid #3b2a22;
      border-radius: 50% 52% 42% 46%;
      background: linear-gradient(180deg,#9a6748 0%,#7d4d35 100%);
      z-index: 3;
    }

    .bb-v5-horse-body::after {
      content: "";
      position: absolute;
      right: 8px;
      top: 5px;
      width: 13px;
      height: 8px;
      border-radius: 50%;
      background: rgba(78,45,31,.18);
    }

    .bb-v5-horse-front {
      position: absolute;
      left: 11px;
      top: 7px;
      width: 45px;
      height: 44px;
      z-index: 5;
      transform-origin: 36px 37px;
      animation: bbV5HorseGraze 4s ease-in-out infinite;
    }

    .bb-v5-horse-neck {
      position: absolute;
      left: 24px;
      top: 10px;
      width: 20px;
      height: 35px;
      border: 3px solid #3b2a22;
      border-radius: 45% 42% 34% 36%;
      background: #8c593e;
      transform: rotate(-20deg);
      z-index: 3;
    }

    .bb-v5-horse-neck::after {
      content: "";
      position: absolute;
      right: -6px;
      top: 2px;
      width: 7px;
      height: 27px;
      border-radius: 50%;
      background: #3c2a22;
      transform: rotate(4deg);
    }

    .bb-v5-horse-head {
      position: absolute;
      left: 2px;
      top: 2px;
      width: 34px;
      height: 20px;
      border: 3px solid #3b2a22;
      border-radius: 55% 48% 48% 52%;
      background: #9c6a4b;
      transform: rotate(-5deg);
      z-index: 5;
    }

    .bb-v5-horse-head::before,
    .bb-v5-horse-head::after {
      content: "";
      position: absolute;
      top: -10px;
      width: 7px;
      height: 11px;
      background: #805139;
      border: 2px solid #3b2a22;
      clip-path: polygon(50% 0,100% 100%,0 100%);
    }

    .bb-v5-horse-head::before { left: 7px; }
    .bb-v5-horse-head::after { right: 5px; }

    .bb-v5-horse-eye {
      position: absolute;
      left: 11px;
      top: 6px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #171310;
    }

    .bb-v5-horse-muzzle {
      position: absolute;
      left: -7px;
      bottom: -1px;
      width: 15px;
      height: 10px;
      border: 2px solid #3b2a22;
      border-radius: 50%;
      background: #b38365;
    }

    .bb-v5-horse-leg {
      position: absolute;
      top: 43px;
      width: 7px;
      height: 18px;
      border: 2px solid #3b2a22;
      background: #70432f;
      z-index: 2;
    }

    .bb-v5-horse-leg.one { left: 40px; }
    .bb-v5-horse-leg.two { left: 51px; }
    .bb-v5-horse-leg.three { left: 68px; }
    .bb-v5-horse-leg.four { left: 78px; }

    .bb-v5-horse-tail {
      position: absolute;
      left: 78px;
      top: 25px;
      width: 24px;
      height: 8px;
      border: 2px solid #3b2a22;
      border-radius: 50%;
      background: #3d2a22;
      transform-origin: left center;
      z-index: 1;
      animation: bbV5HorseTail 1.5s ease-in-out infinite alternate;
    }

    @keyframes bbV5HorseBreathe {
      from { transform: translateY(0); }
      to { transform: translateY(1px); }
    }

    @keyframes bbV5HorseGraze {
      0%, 34%, 100% { transform: rotate(0deg); }
      52%, 74% { transform: rotate(16deg) translateY(3px); }
    }

    @keyframes bbV5HorseTail {
      from { transform: rotate(-12deg); }
      to { transform: rotate(17deg); }
    }


    /* =================================================
       ZOMBIE DEER — STRONGER MODEL + ALIGNED FACE
    ================================================= */

    .zombie-deer {
      width: 142px !important;
      height: 116px !important;
      filter: drop-shadow(4px 5px 0 rgba(0,0,0,.28)) !important;
    }

    .zombie-deer .bb-v5-deer-body {
      position: absolute;
      left: 49px;
      top: 46px;
      width: 72px;
      height: 39px;
      border: 4px solid #332d22;
      border-radius: 49% 52% 42% 45%;
      background:
        radial-gradient(circle at 73% 32%,rgba(91,126,67,.75) 0 6px,transparent 7px),
        radial-gradient(circle at 44% 72%,rgba(93,119,68,.48) 0 5px,transparent 6px),
        linear-gradient(180deg,#a99a76,#817356);
      z-index: 3;
    }

    .zombie-deer .bb-v5-deer-neck {
      position: absolute;
      left: 34px;
      top: 35px;
      width: 29px;
      height: 45px;
      border: 4px solid #332d22;
      border-radius: 44% 42% 34% 39%;
      background: linear-gradient(90deg,#9d8b67,#817250);
      transform: rotate(-18deg);
      z-index: 4;
    }

    .zombie-deer .bb-v5-deer-head {
      position: absolute;
      left: 6px;
      top: 15px;
      width: 50px;
      height: 45px;
      border: 4px solid #332d22;
      border-radius: 50% 52% 45% 48%;
      background:
        radial-gradient(circle at 72% 77%,rgba(92,128,65,.7) 0 6px,transparent 7px),
        linear-gradient(180deg,#ad9d77,#877958);
      z-index: 7;
    }

    .zombie-deer .bb-v5-deer-ear {
      position: absolute;
      top: -10px;
      width: 11px;
      height: 16px;
      border: 3px solid #332d22;
      background: #9a8968;
      clip-path: polygon(50% 0,100% 100%,0 100%);
      z-index: 8;
    }

    .zombie-deer .bb-v5-deer-ear.left { left: 4px; }
    .zombie-deer .bb-v5-deer-ear.right { right: 4px; }

    .zombie-deer .bb-v5-antler {
      position: absolute;
      top: -23px;
      width: 17px;
      height: 25px;
      border-left: 4px solid #75644a;
      border-top: 4px solid #75644a;
      border-radius: 3px;
      z-index: 6;
    }

    .zombie-deer .bb-v5-antler.left {
      left: 7px;
      transform: rotate(-19deg);
    }

    .zombie-deer .bb-v5-antler.right {
      right: 7px;
      transform: scaleX(-1) rotate(-19deg);
    }

    .zombie-deer .bb-v5-deer-eye {
      position: absolute;
      top: 13px;
      width: 10px;
      height: 10px;
      border: 2px solid #263620;
      border-radius: 50%;
      background: #9cff70;
      box-shadow: 0 0 7px rgba(121,255,92,.72);
      z-index: 10;
    }

    .zombie-deer .bb-v5-deer-eye::after {
      content: "";
      position: absolute;
      left: 3px;
      top: 3px;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: #1f2a1b;
    }

    .zombie-deer .bb-v5-deer-eye.left {
      left: 8px;
    }

    .zombie-deer .bb-v5-deer-eye.right {
      right: 8px;
    }

    .zombie-deer .bb-v5-deer-muzzle {
      position: absolute;
      left: 10px;
      bottom: -6px;
      width: 29px;
      height: 18px;
      border: 3px solid #332d22;
      border-radius: 48%;
      background: #c2b18d;
      z-index: 9;
    }

    .zombie-deer .bb-v5-deer-nose {
      position: absolute;
      left: 9px;
      bottom: 2px;
      width: 9px;
      height: 7px;
      border-radius: 50%;
      background: #25231e;
    }

    .zombie-deer .bb-v5-deer-ribs {
      position: absolute;
      left: 18px;
      top: 8px;
      width: 30px;
      height: 20px;
      border-radius: 45%;
      opacity: .7;
      background:
        repeating-linear-gradient(90deg,transparent 0 5px,#ddd3bb 5px 7px,transparent 7px 10px);
      transform: skewX(-8deg);
    }

    .zombie-deer .bb-v5-deer-tail {
      position: absolute;
      right: -20px;
      top: 9px;
      width: 27px;
      height: 11px;
      border: 3px solid #332d22;
      border-radius: 50%;
      background: #77674d;
      transform: rotate(-17deg);
      transform-origin: left center;
    }

    .zombie-deer .bb-v5-deer-leg {
      position: absolute;
      top: 79px;
      width: 9px;
      height: 32px;
      border: 3px solid #332d22;
      background: #77694e;
      z-index: 2;
    }

    .zombie-deer .bb-v5-deer-leg.one { left: 57px; }
    .zombie-deer .bb-v5-deer-leg.two { left: 72px; }
    .zombie-deer .bb-v5-deer-leg.three { left: 98px; }
    .zombie-deer .bb-v5-deer-leg.four { left: 112px; }


    /* =================================================
       CONNOR — STUBBLE AROUND THE FULL BEARD AREA
    ================================================= */

    .connor-model .connor-stubble {
      position: absolute !important;
      left: 29px !important;
      top: 41px !important;
      width: 43px !important;
      height: 32px !important;
      z-index: 9 !important;
      border: 0 !important;
      border-radius: 5px 5px 11px 11px !important;
      clip-path: polygon(0 8%,18% 13%,50% 20%,82% 13%,100% 8%,100% 67%,82% 100%,18% 100%,0 67%);
      background:
        radial-gradient(circle,#5f473b 0 1px,transparent 1.25px) 0 0 / 5px 5px,
        radial-gradient(circle,#5f473b 0 1px,transparent 1.25px) 2px 2px / 6px 6px !important;
      opacity: .5 !important;
      pointer-events: none !important;
    }

    .connor-model .face,
    .connor-model .face .eye,
    .connor-model .face .mouth {
      z-index: 14 !important;
    }


    /* =================================================
       MAP SELECT — FAITHFUL MINIATURES OF CURRENT ARENAS
       No preview animations.
    ================================================= */

    .bb-v5-preview {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
    }

    .bb-v5-preview * {
      box-sizing: border-box;
      animation: none !important;
    }

    /* Virginia Estate */
    .bb-v5-va {
      background: linear-gradient(#83c9e8 0 49%,#67aa4d 50%,#3d872e 100%);
    }

    .bb-v5-va-estate {
      position: absolute;
      left: 52%;
      bottom: 30px;
      width: 166px;
      height: 64px;
      transform: translateX(-50%);
      background: #e8e0d4;
      border: 3px solid #5b5147;
    }

    .bb-v5-va-estate::before {
      content: "";
      position: absolute;
      left: -7px;
      top: -33px;
      width: 174px;
      height: 36px;
      background: #4f4b48;
      clip-path: polygon(5% 100%,18% 33%,39% 15%,50% 0,61% 15%,82% 33%,95% 100%);
    }

    .bb-v5-va-estate::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 0;
      width: 23px;
      height: 38px;
      transform: translateX(-50%);
      background: #684934;
      border: 2px solid #3d3027;
      box-shadow:
        -50px -2px 0 -4px #739cad,
        50px -2px 0 -4px #739cad;
    }

    .bb-v5-va-hedge {
      position: absolute;
      left: 7%;
      right: 6%;
      bottom: 21px;
      height: 15px;
      border-radius: 8px;
      background: #246a2a;
      box-shadow: inset 0 0 0 2px #1c5521;
    }

    .bb-v5-va-barn {
      position: absolute;
      left: 6%;
      bottom: 30px;
      width: 68px;
      height: 39px;
      background: #8f3e32;
      border: 2px solid #55342c;
    }

    .bb-v5-va-barn::before {
      content: "";
      position: absolute;
      left: -5px;
      top: -23px;
      width: 73px;
      height: 25px;
      background: #55504a;
      clip-path: polygon(4% 100%,22% 22%,50% 0,78% 22%,96% 100%);
    }

    .bb-v5-va-horse-mini {
      position: absolute;
      left: 26%;
      bottom: 29px;
      width: 36px;
      height: 20px;
    }

    .bb-v5-va-horse-mini::before {
      content: "";
      position: absolute;
      left: 11px;
      top: 6px;
      width: 22px;
      height: 10px;
      border-radius: 50%;
      background: #8b593d;
      border: 2px solid #3d2a21;
      box-shadow: 3px 10px 0 -1px #70432f,15px 10px 0 -1px #70432f;
    }

    .bb-v5-va-horse-mini::after {
      content: "";
      position: absolute;
      left: 1px;
      top: 2px;
      width: 14px;
      height: 9px;
      border-radius: 48%;
      background: #9b6749;
      border: 2px solid #3d2a21;
    }

    /* Westhampton Beach */
    .bb-v5-wh {
      background: linear-gradient(#83c9e8 0 37%,#287eae 38%,#2f98c5 57%,#dcc992 58%,#d7b86f 100%);
    }

    .bb-v5-wh-wave {
      position: absolute;
      left: 0;
      right: 0;
      top: 60px;
      height: 3px;
      background: rgba(255,255,255,.78);
      box-shadow: 0 12px 0 rgba(255,255,255,.38),0 24px 0 rgba(255,255,255,.2);
    }

    .bb-v5-wh-stand {
      position: absolute;
      left: 17px;
      bottom: 13px;
      width: 90px;
      height: 50px;
      background: #f1e4c7;
      border: 3px solid #684b37;
    }

    .bb-v5-wh-stand::before {
      content: "";
      position: absolute;
      left: -4px;
      top: -18px;
      width: 92px;
      height: 19px;
      background: repeating-linear-gradient(90deg,#ef5555 0 15px,#fff4df 15px 30px);
      border: 3px solid #684b37;
    }

    .bb-v5-wh-stand::after {
      content: "ICE CREAM";
      position: absolute;
      left: 13px;
      top: 16px;
      width: 59px;
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

    .bb-v5-wh-umbrella {
      position: absolute;
      right: 29px;
      bottom: 13px;
      width: 5px;
      height: 47px;
      background: #765238;
    }

    .bb-v5-wh-umbrella::before {
      content: "";
      position: absolute;
      left: -32px;
      top: -5px;
      width: 69px;
      height: 32px;
      border: 2px solid #684b37;
      border-radius: 70px 70px 4px 4px;
      background: repeating-linear-gradient(90deg,#e94e4e 0 14px,#f7f2e7 14px 28px);
    }

    .bb-v5-wh-pete {
      position: absolute;
      left: 63%;
      top: 52px;
      width: 19px;
      height: 12px;
    }

    .bb-v5-wh-pete::before {
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

    .bb-v5-wh-pete::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 19px;
      height: 3px;
      border: 1px solid #705b48;
      border-radius: 50%;
      background: #f2ede2;
    }

    /* New Canaan */
    .bb-v5-nc {
      background: linear-gradient(#a9cee1 0 31%,#565756 32% 41%,#c9c2b7 42% 66%,#6c6865 67% 74%,#4f4f4e 75% 100%);
    }

    .bb-v5-nc-roof {
      position: absolute;
      left: 0;
      right: 0;
      top: 40px;
      height: 20px;
      background: #565756;
      clip-path: polygon(0 35%,18% 12%,39% 25%,58% 7%,78% 24%,100% 10%,100% 100%,0 100%);
    }

    .bb-v5-nc-buildings {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 27px;
      height: 80px;
      display: grid;
      grid-template-columns: repeat(4,1fr);
      border-top: 4px solid #4d4946;
    }

    .bb-v5-nc-shop {
      position: relative;
      padding-top: 7px;
      text-align: center;
      color: #231b18;
      font-family: Didot,"Bodoni MT","Times New Roman",serif;
      font-size: 8px;
      font-weight: 500;
      letter-spacing: .75px;
      border-right: 2px solid #55473f;
    }

    .bb-v5-nc-shop:nth-child(1),
    .bb-v5-nc-shop:nth-child(3) { background: #a94a39; }
    .bb-v5-nc-shop:nth-child(2),
    .bb-v5-nc-shop:nth-child(4) { background: #e0e3df; }

    .bb-v5-nc-shop::after {
      content: "";
      position: absolute;
      left: 7px;
      right: 7px;
      bottom: 7px;
      height: 41px;
      background: repeating-linear-gradient(90deg,#c9dde2 0 20px,#53636a 20px 24px);
      border-bottom: 2px solid #42372f;
    }

    .bb-v5-nc-clock {
      position: absolute;
      left: 50%;
      bottom: 17px;
      width: 5px;
      height: 68px;
      transform: translateX(-50%);
      background: #1f6849;
      border: 1px solid #174b38;
      z-index: 7;
    }

    .bb-v5-nc-clock-face {
      position: absolute;
      left: 50%;
      top: -19px;
      width: 29px;
      height: 29px;
      transform: translateX(-50%);
      border-radius: 50%;
      background: #f5f1e7;
      border: 3px solid #226b4d;
      box-shadow: 0 0 0 1px #d7cbb9;
    }

    .bb-v5-nc-clock-face::before,
    .bb-v5-nc-clock-face::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      background: #2c2927;
      transform-origin: 50% 100%;
    }

    .bb-v5-nc-clock-face::before {
      width: 2px;
      height: 7px;
      transform: translate(-50%,-100%) rotate(310deg);
    }

    .bb-v5-nc-clock-face::after {
      width: 1px;
      height: 10px;
      transform: translate(-50%,-100%) rotate(130deg);
    }

    /* Madrid */
    .bb-v5-mad {
      background: linear-gradient(#9ebfd0 0 18%,#d39a98 29%,#ed9f7c 41%,#a44c3e 42% 77%,#86453a 78% 100%);
    }

    .bb-v5-mad-facade {
      position: absolute;
      left: 4%;
      right: 4%;
      bottom: 27px;
      height: 88px;
      background: #9f493c;
      border-bottom: 5px solid #64392f;
    }

    .bb-v5-mad-roof {
      position: absolute;
      left: 3%;
      right: 3%;
      top: 39px;
      height: 22px;
      background: #444649;
      clip-path: polygon(0 25%,20% 5%,50% 0,80% 5%,100% 25%,100% 100%,0 100%);
    }

    .bb-v5-mad-tower {
      position: absolute;
      bottom: 61px;
      width: 31px;
      height: 69px;
      border: 3px solid #62372f;
      background: #95453a;
      z-index: 4;
    }

    .bb-v5-mad-tower.left { left: 5%; }
    .bb-v5-mad-tower.right { right: 5%; }

    .bb-v5-mad-tower::before {
      content: "";
      position: absolute;
      left: -5px;
      top: -34px;
      width: 35px;
      height: 36px;
      background: #3f4245;
      clip-path: polygon(50% 0,67% 58%,92% 100%,8% 100%,33% 58%);
    }

    .bb-v5-mad-arcades {
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

    .bb-v5-mad-fountain {
      position: absolute;
      left: 50%;
      bottom: 11px;
      width: 54px;
      height: 15px;
      transform: translateX(-50%);
      border: 5px solid #8f806c;
      border-radius: 50%;
      background: #70bcd3;
      z-index: 5;
    }
  `;

  document.head.appendChild(style);


  /* ===================================================
     HORSE MARKUP
  =================================================== */

  const horse = document.querySelector(".bb-va-horse");

  if (horse) {
    horse.innerHTML = `
      <div class="bb-v5-horse-tail"></div>
      <div class="bb-v5-horse-body"></div>
      <div class="bb-v5-horse-front">
        <div class="bb-v5-horse-neck"></div>
        <div class="bb-v5-horse-head">
          <div class="bb-v5-horse-eye"></div>
          <div class="bb-v5-horse-muzzle"></div>
        </div>
      </div>
      <div class="bb-v5-horse-leg one"></div>
      <div class="bb-v5-horse-leg two"></div>
      <div class="bb-v5-horse-leg three"></div>
      <div class="bb-v5-horse-leg four"></div>
    `;
  }


  /* ===================================================
     ZOMBIE DEER MARKUP
  =================================================== */

  function bbV5DeerHTML() {
    return `
      <div class="bb-v5-deer-body">
        <div class="bb-v5-deer-ribs"></div>
        <div class="bb-v5-deer-tail"></div>
      </div>

      <div class="bb-v5-deer-neck"></div>

      <div class="bb-v5-deer-head">
        <div class="bb-v5-antler left"></div>
        <div class="bb-v5-antler right"></div>
        <div class="bb-v5-deer-ear left"></div>
        <div class="bb-v5-deer-ear right"></div>
        <div class="bb-v5-deer-eye left"></div>
        <div class="bb-v5-deer-eye right"></div>
        <div class="bb-v5-deer-muzzle">
          <div class="bb-v5-deer-nose"></div>
        </div>
      </div>

      <div class="bb-v5-deer-leg one"></div>
      <div class="bb-v5-deer-leg two"></div>
      <div class="bb-v5-deer-leg three"></div>
      <div class="bb-v5-deer-leg four"></div>
    `;
  }

  if (typeof deerHTML === "function") {
    deerHTML = bbV5DeerHTML;
  }

  document.querySelectorAll(".zombie-deer").forEach(deer => {
    deer.innerHTML = bbV5DeerHTML();
  });


  /* ===================================================
     MAP SELECT PREVIEWS — REBUILD AFTER ARENA POLISH
  =================================================== */

  const vaPreview = document.querySelector(".virginia-preview");
  if (vaPreview) {
    vaPreview.innerHTML = `
      <div class="bb-v5-preview bb-v5-va">
        <div class="bb-v5-va-barn"></div>
        <div class="bb-v5-va-estate"></div>
        <div class="bb-v5-va-hedge"></div>
        <div class="bb-v5-va-horse-mini"></div>
      </div>
    `;
  }

  const whPreview = document.querySelector(".westhampton-preview");
  if (whPreview) {
    whPreview.innerHTML = `
      <div class="bb-v5-preview bb-v5-wh">
        <div class="bb-v5-wh-wave"></div>
        <div class="bb-v5-wh-stand"></div>
        <div class="bb-v5-wh-umbrella"></div>
        <div class="bb-v5-wh-pete"></div>
      </div>
    `;
  }

  const ncPreview = document.querySelector(".newcanaan-preview");
  if (ncPreview) {
    ncPreview.innerHTML = `
      <div class="bb-v5-preview bb-v5-nc">
        <div class="bb-v5-nc-roof"></div>
        <div class="bb-v5-nc-buildings">
          <div class="bb-v5-nc-shop">MARKET</div>
          <div class="bb-v5-nc-shop">BOUTIQUE</div>
          <div class="bb-v5-nc-shop">CAFE</div>
          <div class="bb-v5-nc-shop">SHOPS</div>
        </div>
        <div class="bb-v5-nc-clock">
          <div class="bb-v5-nc-clock-face"></div>
        </div>
      </div>
    `;
  }

  const madridPreview = document.querySelector(".madrid-preview");
  if (madridPreview) {
    madridPreview.innerHTML = `
      <div class="bb-v5-preview bb-v5-mad">
        <div class="bb-v5-mad-facade"></div>
        <div class="bb-v5-mad-roof"></div>
        <div class="bb-v5-mad-tower left"></div>
        <div class="bb-v5-mad-tower right"></div>
        <div class="bb-v5-mad-arcades"></div>
        <div class="bb-v5-mad-fountain"></div>
      </div>
    `;
  }

  const virginiaCardName = document.querySelector('.map-card[data-map="virginia"] strong');
  if (virginiaCardName) {
    virginiaCardName.textContent = "VIRGINIA ESTATE";
  }
})();
