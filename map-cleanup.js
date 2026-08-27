/* =====================================================
   BLOODLINE BRAWL — MAP CLEANUP
   Small visual-only refinements requested after map upgrade.
===================================================== */

(() => {
  if (window.__bbMapCleanupLoaded) {
    return;
  }

  window.__bbMapCleanupLoaded = true;

  const style =
    document.createElement("style");

  style.textContent = `
    /* =================================================
       NEW CANAAN — cleaner storefront type + better clock
    ================================================= */

    .bb-nc-signs {
      bottom: 278px !important;
      height: 25px !important;
      color: #241b17 !important;
      font-family: Georgia, "Times New Roman", serif !important;
      font-size: 13px !important;
      font-weight: 700 !important;
      letter-spacing: .35px !important;
      text-shadow: 0 1px 0 rgba(255,255,255,.35) !important;
    }

    .bb-nc-sign {
      line-height: 1 !important;
    }

    .bb-nc-clock {
      left: 50% !important;
      bottom: 137px !important;
      width: 9px !important;
      height: 126px !important;
      background: linear-gradient(90deg,#18583e,#2b7957,#18583e) !important;
      border: 2px solid #123e2f !important;
      box-shadow: 2px 0 0 rgba(0,0,0,.12);
      z-index: 8 !important;
    }

    .bb-nc-clock::before {
      left: -29px !important;
      top: -49px !important;
      width: 61px !important;
      height: 61px !important;
      border-radius: 50% !important;
      background:
        radial-gradient(circle at 50% 50%, #f5f1e7 0 69%, #ddd3c3 70% 76%, #f5f1e7 77% 100%) !important;
      border: 5px solid #226b4d !important;
      box-shadow:
        0 0 0 3px #d7cbb9,
        0 5px 0 rgba(0,0,0,.16) !important;
    }

    .bb-nc-clock::after {
      left: -9px !important;
      bottom: -9px !important;
      width: 23px !important;
      height: 11px !important;
      background: #18583e !important;
      border: 2px solid #123e2f;
      border-radius: 2px !important;
    }

    .bb-nc-clock-hand {
      position: absolute;
      left: 2px;
      top: -18px;
      z-index: 12;
      background: #2d2b29;
      border-radius: 2px;
      transform-origin: 50% 100%;
      pointer-events: none;
    }

    .bb-nc-clock-hand.hour {
      width: 4px;
      height: 17px;
      transform: rotate(52deg);
    }

    .bb-nc-clock-hand.minute {
      width: 3px;
      height: 22px;
      transform: rotate(-48deg);
    }

    .bb-nc-clock-pin {
      position: absolute;
      left: -1px;
      top: -20px;
      width: 8px;
      height: 8px;
      z-index: 13;
      border-radius: 50%;
      background: #2d2b29;
      pointer-events: none;
    }


    /* =================================================
       VIRGINIA ESTATE — keep hedge clean, fence by barn only
    ================================================= */

    .bb-va-fence {
      left: 2% !important;
      bottom: 176px !important;
      width: 17% !important;
      height: 24px !important;
      border-top-width: 5px !important;
      border-bottom-width: 5px !important;
      opacity: .78 !important;
      z-index: 1 !important;
    }

    .bb-va-fence::before {
      top: -9px !important;
      height: 35px !important;
      box-shadow:
        42px 0 #e9e0d2,
        84px 0 #e9e0d2,
        126px 0 #e9e0d2,
        168px 0 #e9e0d2,
        210px 0 #e9e0d2 !important;
    }

    .bb-va-paddock {
      display: none !important;
    }

    .map-virginia .decor-three {
      z-index: 3;
    }

    .bb-va-barn {
      z-index: 2;
    }


    /* =================================================
       WESTHAMPTON — remove clutter, keep one clean umbrella
    ================================================= */

    .map-westhampton .bb-wh-dune-fence,
    .map-westhampton .bb-wh-dune-grass {
      display: none !important;
    }

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
      box-shadow: 0 5px 0 rgba(0,0,0,.08);
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
       MADRID — remove overlapping bars, cleaner plaza facade
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
        ),
        repeating-linear-gradient(
          0deg,
          transparent 0 24px,
          rgba(63,43,38,.28) 24px 29px
        ) !important;
      opacity: .9 !important;
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
  `;

  document.head.appendChild(
    style
  );


  /* New Canaan clock hands. */
  const clock =
    document.querySelector(
      ".bb-nc-clock"
    );

  if (
    clock &&
    !clock.querySelector(
      ".bb-nc-clock-hand"
    )
  ) {
    const hour =
      document.createElement(
        "span"
      );

    hour.className =
      "bb-nc-clock-hand hour";

    const minute =
      document.createElement(
        "span"
      );

    minute.className =
      "bb-nc-clock-hand minute";

    const pin =
      document.createElement(
        "span"
      );

    pin.className =
      "bb-nc-clock-pin";

    clock.appendChild(
      hour
    );

    clock.appendChild(
      minute
    );

    clock.appendChild(
      pin
    );
  }


  /* Westhampton clean umbrella. */
  const mapDecor =
    document.querySelector(
      "#arena .map-decor"
    );

  if (
    mapDecor &&
    !mapDecor.querySelector(
      ".bb-wh-clean-umbrella"
    )
  ) {
    const umbrella =
      document.createElement(
        "div"
      );

    umbrella.className =
      "bb-wh-clean-umbrella";

    mapDecor.appendChild(
      umbrella
    );
  }


  /* Guarantee the requested symmetrical Madrid tower. */
  if (
    mapDecor &&
    !mapDecor.querySelector(
      ".bb-madrid-tower.right"
    )
  ) {
    const rightTower =
      document.createElement(
        "div"
      );

    rightTower.className =
      "bb-madrid-tower right";

    mapDecor.appendChild(
      rightTower
    );
  }
})();
