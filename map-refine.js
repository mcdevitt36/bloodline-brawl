/* =====================================================
   BLOODLINE BRAWL — MAP REFINE
   One-time visual-only refinements.
===================================================== */

(() => {
  if (window.__bbMapRefineLoaded) {
    return;
  }

  window.__bbMapRefineLoaded = true;

  const style =
    document.createElement("style");

  style.textContent = `
    /* =================================================
       NEW CANAAN — cleaner luxury-retail typography
    ================================================= */

    .bb-nc-signs {
      font-family:
        Didot,
        "Bodoni MT",
        "Times New Roman",
        serif !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      letter-spacing: .7px !important;
      color: #211a17 !important;
      text-shadow: none !important;
    }

    .bb-nc-sign {
      text-transform: uppercase;
      line-height: 1 !important;
    }


    /* =================================================
       NEW CANAAN — real clock face with centered hands
    ================================================= */

    .bb-nc-clock::before {
      display: none !important;
    }

    .bb-nc-clock-face {
      position: absolute;
      left: 50%;
      top: -49px;
      width: 61px;
      height: 61px;
      transform: translateX(-50%);
      z-index: 14;
      border-radius: 50%;
      background: #f5f1e7;
      border: 5px solid #226b4d;
      box-shadow:
        0 0 0 3px #d7cbb9,
        0 5px 0 rgba(0,0,0,.16);
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
      background: #2b2927;
      z-index: 5;
    }

    .bb-nc-clock-face::after {
      content: "";
      position: absolute;
      inset: 7px;
      border-radius: 50%;
      background:
        linear-gradient(#2f2c29,#2f2c29) 50% 0 / 2px 6px no-repeat,
        linear-gradient(#2f2c29,#2f2c29) 50% 100% / 2px 6px no-repeat,
        linear-gradient(#2f2c29,#2f2c29) 0 50% / 6px 2px no-repeat,
        linear-gradient(#2f2c29,#2f2c29) 100% 50% / 6px 2px no-repeat;
      opacity: .8;
    }

    .bb-nc-clock-face .bb-nc-clock-hand {
      position: absolute !important;
      left: 50% !important;
      top: 50% !important;
      margin: 0 !important;
      background: #2b2927 !important;
      border-radius: 2px !important;
      transform-origin: 50% 100% !important;
      z-index: 6 !important;
    }

    .bb-nc-clock-face .bb-nc-clock-hand.hour {
      width: 4px !important;
      height: 15px !important;
      transform: translate(-50%,-100%) rotate(132deg) !important;
    }

    .bb-nc-clock-face .bb-nc-clock-hand.minute {
      width: 3px !important;
      height: 20px !important;
      transform: translate(-50%,-100%) rotate(48deg) !important;
    }

    .bb-nc-clock-pin {
      display: none !important;
    }


    /* =================================================
       VIRGINIA ESTATE — remove fence, add small horse
    ================================================= */

    .map-virginia .bb-va-fence,
    .map-virginia .bb-va-paddock {
      display: none !important;
    }

    .bb-va-horse {
      display: none;
      position: absolute;
      left: 18%;
      bottom: 162px;
      width: 92px;
      height: 62px;
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
      left: 27px;
      top: 21px;
      width: 48px;
      height: 25px;
      border: 3px solid #3c2a21;
      border-radius: 48% 52% 42% 44%;
      background: #8c5b3e;
    }

    .bb-va-horse-neck {
      position: absolute;
      left: 18px;
      top: 12px;
      width: 20px;
      height: 31px;
      border: 3px solid #3c2a21;
      border-radius: 45% 40% 25% 35%;
      background: #8c5b3e;
      transform: rotate(16deg);
      transform-origin: bottom center;
      animation: bbVaHorseGraze 3.4s ease-in-out infinite;
    }

    .bb-va-horse-head {
      position: absolute;
      left: 5px;
      top: 3px;
      width: 26px;
      height: 17px;
      border: 3px solid #3c2a21;
      border-radius: 48% 52% 42% 48%;
      background: #966548;
      transform: rotate(-8deg);
    }

    .bb-va-horse-head::before,
    .bb-va-horse-head::after {
      content: "";
      position: absolute;
      top: -9px;
      width: 7px;
      height: 11px;
      background: #744a34;
      border: 2px solid #3c2a21;
      clip-path: polygon(50% 0,100% 100%,0 100%);
    }

    .bb-va-horse-head::before {
      left: 3px;
    }

    .bb-va-horse-head::after {
      right: 2px;
    }

    .bb-va-horse-leg {
      position: absolute;
      top: 42px;
      width: 7px;
      height: 20px;
      background: #75462f;
      border: 2px solid #3c2a21;
    }

    .bb-va-horse-leg.one { left: 34px; }
    .bb-va-horse-leg.two { left: 46px; }
    .bb-va-horse-leg.three { left: 63px; }
    .bb-va-horse-leg.four { left: 72px; }

    .bb-va-horse-tail {
      position: absolute;
      right: 7px;
      top: 23px;
      width: 24px;
      height: 8px;
      background: #4a3125;
      border: 2px solid #3c2a21;
      border-radius: 50%;
      transform-origin: left center;
      animation: bbVaHorseTail 1.45s ease-in-out infinite alternate;
    }

    @keyframes bbVaHorseBreathe {
      from { transform: translateY(0); }
      to { transform: translateY(1.5px); }
    }

    @keyframes bbVaHorseGraze {
      0%, 38% { transform: rotate(16deg); }
      55%, 78% { transform: rotate(35deg) translateY(4px); }
      100% { transform: rotate(16deg); }
    }

    @keyframes bbVaHorseTail {
      from { transform: rotate(-10deg); }
      to { transform: rotate(18deg); }
    }
  `;

  document.head.appendChild(
    style
  );


  /* ===================================================
     NEW CANAAN CLOCK FACE
  =================================================== */

  const clock =
    document.querySelector(
      ".bb-nc-clock"
    );

  if (
    clock &&
    !clock.querySelector(
      ".bb-nc-clock-face"
    )
  ) {
    const face =
      document.createElement(
        "div"
      );

    face.className =
      "bb-nc-clock-face";

    const oldHour =
      clock.querySelector(
        ".bb-nc-clock-hand.hour"
      );

    const oldMinute =
      clock.querySelector(
        ".bb-nc-clock-hand.minute"
      );

    if (
      oldHour
    ) {
      face.appendChild(
        oldHour
      );
    }

    if (
      oldMinute
    ) {
      face.appendChild(
        oldMinute
      );
    }

    clock.appendChild(
      face
    );
  }


  /* ===================================================
     VIRGINIA HORSE
  =================================================== */

  const mapDecor =
    document.querySelector(
      "#arena .map-decor"
    );

  if (
    mapDecor &&
    !mapDecor.querySelector(
      ".bb-va-horse"
    )
  ) {
    const horse =
      document.createElement(
        "div"
      );

    horse.className =
      "bb-va-horse";

    horse.innerHTML = `
      <div class="bb-va-horse-tail"></div>
      <div class="bb-va-horse-body"></div>
      <div class="bb-va-horse-neck">
        <div class="bb-va-horse-head"></div>
      </div>
      <div class="bb-va-horse-leg one"></div>
      <div class="bb-va-horse-leg two"></div>
      <div class="bb-va-horse-leg three"></div>
      <div class="bb-va-horse-leg four"></div>
    `;

    mapDecor.appendChild(
      horse
    );
  }
})();
