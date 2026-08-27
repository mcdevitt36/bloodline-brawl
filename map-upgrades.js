/* =====================================================
   BLOODLINE BRAWL — MAP UPGRADES
   Visual-only map polish. No observers, no combat changes.
===================================================== */

(() => {
  if (window.__bbMapUpgradesLoaded) {
    return;
  }

  window.__bbMapUpgradesLoaded = true;


  /* ===================================================
     VIRGINIA NAME
  =================================================== */

  if (
    typeof MAP_NAMES !== "undefined" &&
    MAP_NAMES
  ) {
    MAP_NAMES.virginia =
      "VIRGINIA ESTATE";
  }

  const virginiaCard =
    document.querySelector(
      '.map-card[data-map="virginia"]'
    );

  if (
    virginiaCard
  ) {
    const name =
      virginiaCard.querySelector(
        "strong"
      );

    if (
      name
    ) {
      name.textContent =
        "VIRGINIA ESTATE";
    }
  }

  const mapSelection =
    document.getElementById(
      "mapSelectionText"
    );

  if (
    mapSelection &&
    mapSelection.textContent.includes(
      "SUBURBAN VIRGINIA"
    )
  ) {
    mapSelection.textContent =
      "MAP: VIRGINIA ESTATE";
  }


  /* ===================================================
     STYLES
  =================================================== */

  const style =
    document.createElement(
      "style"
    );

  style.textContent = `
    /* =================================================
       MAP SELECT PREVIEWS
    ================================================= */

    .virginia-preview {
      background:
        linear-gradient(
          #87c9e7 0 47%,
          #65aa4b 48%,
          #3f852f 100%
        ) !important;
    }

    .bb-va-preview-barn {
      position: absolute;
      left: 6%;
      bottom: 34px;
      width: 72px;
      height: 38px;
      background: #8f3e32;
      border: 2px solid #4f3027;
    }

    .bb-va-preview-barn::before {
      content: "";
      position: absolute;
      left: -5px;
      top: -20px;
      width: 80px;
      height: 23px;
      background: #554b43;
      clip-path: polygon(4% 100%, 24% 18%, 50% 0, 76% 18%, 96% 100%);
    }

    .bb-va-preview-barn::after {
      content: "";
      position: absolute;
      left: 27px;
      bottom: 0;
      width: 19px;
      height: 27px;
      background: #5c3229;
      border: 2px solid #e7ddd0;
    }

    .bb-va-preview-fence {
      position: absolute;
      left: 2%;
      bottom: 19px;
      width: 35%;
      height: 14px;
      border-top: 3px solid #eee5d6;
      border-bottom: 3px solid #eee5d6;
      opacity: .9;
    }

    .bb-va-preview-fence::before {
      content: "";
      position: absolute;
      left: 7px;
      top: -6px;
      width: 4px;
      height: 23px;
      background: #eee5d6;
      box-shadow:
        23px 0 #eee5d6,
        46px 0 #eee5d6,
        69px 0 #eee5d6,
        92px 0 #eee5d6;
    }


    .westhampton-preview {
      background:
        linear-gradient(
          #84cae9 0 38%,
          #277eae 39%,
          #2d9ecb 57%,
          #d8c58e 58%,
          #e4c982 100%
        ) !important;
    }

    .bb-wh-preview-sail {
      position: absolute;
      right: 19%;
      top: 49px;
      width: 2px;
      height: 22px;
      background: #544c44;
    }

    .bb-wh-preview-sail::before {
      content: "";
      position: absolute;
      left: 2px;
      top: 2px;
      width: 15px;
      height: 18px;
      background: #f5f1e7;
      clip-path: polygon(0 0, 100% 80%, 0 100%);
    }

    .bb-wh-preview-dunes {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 31px;
      background:
        radial-gradient(ellipse at 12% 100%, #c9ad69 0 48%, transparent 50%),
        radial-gradient(ellipse at 35% 100%, #d5ba75 0 52%, transparent 54%),
        radial-gradient(ellipse at 76% 100%, #c6aa68 0 48%, transparent 50%);
      opacity: .92;
      pointer-events: none;
    }


    .newcanaan-preview {
      background:
        linear-gradient(
          #aacfe2 0 38%,
          #786f68 39% 45%,
          #c8c2b8 46% 64%,
          #69635f 65% 74%,
          #4a4846 75% 100%
        ) !important;
    }

    .newcanaan-preview .nc-red {
      background: #a94836 !important;
    }

    .newcanaan-preview .nc-white {
      background: #d9e0df !important;
      border-color: #68554a !important;
    }

    .newcanaan-preview .nc-brick {
      background: #9d4938 !important;
    }

    .bb-nc-preview-roof {
      position: absolute;
      left: 2%;
      right: 2%;
      top: 41px;
      height: 13px;
      background: #5b5a58;
      border-bottom: 3px solid #3c3936;
    }

    .bb-nc-preview-clock {
      position: absolute;
      left: 49.5%;
      bottom: 29px;
      width: 5px;
      height: 66px;
      background: #1f6046;
      z-index: 8;
    }

    .bb-nc-preview-clock::before {
      content: "";
      position: absolute;
      left: -10px;
      top: -19px;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background:
        linear-gradient(90deg, transparent 48%, #333 49% 52%, transparent 53%),
        linear-gradient(0deg, transparent 48%, #333 49% 52%, transparent 53%),
        #f1efe6;
      border: 3px solid #1d4f3d;
      box-shadow: 0 0 0 2px #d9d0bf;
    }


    .madrid-preview {
      background:
        linear-gradient(
          #9bbfd2 0 25%,
          #d9a49e 38%,
          #f0a17d 48%,
          #bd6a4c 49% 72%,
          #8e4f3e 73% 100%
        ) !important;
    }

    .madrid-preview-left,
    .madrid-preview-right {
      background: #a74c3c !important;
      border-color: #583a31 !important;
    }

    .bb-madrid-preview-roof {
      position: absolute;
      left: 2%;
      right: 2%;
      top: 43px;
      height: 18px;
      background: #494a4b;
      border-bottom: 3px solid #303132;
    }

    .bb-madrid-preview-tower {
      position: absolute;
      bottom: 42px;
      width: 28px;
      height: 88px;
      background: #9d4a3c;
      border: 3px solid #583a31;
      z-index: 4;
    }

    .bb-madrid-preview-tower.left {
      left: 5%;
    }

    .bb-madrid-preview-tower.right {
      right: 5%;
    }

    .bb-madrid-preview-tower::before {
      content: "";
      position: absolute;
      left: -5px;
      top: -35px;
      width: 32px;
      height: 37px;
      background: #414346;
      clip-path: polygon(50% 0, 100% 100%, 0 100%);
    }

    .bb-madrid-preview-arcade {
      position: absolute;
      left: 3%;
      right: 3%;
      bottom: 42px;
      height: 24px;
      background:
        repeating-linear-gradient(
          90deg,
          #2c2928 0 18px,
          #8c4438 18px 31px
        );
      opacity: .9;
    }


    /* =================================================
       ARENA — VIRGINIA ESTATE
    ================================================= */

    .map-virginia {
      background:
        linear-gradient(
          #83c9e8 0 50%,
          #6bad50 51%,
          #3d872e 100%
        ) !important;
    }

    .map-virginia .bb-va-barn,
    .map-virginia .bb-va-fence,
    .map-virginia .bb-va-paddock {
      display: block;
    }

    .bb-va-barn,
    .bb-va-fence,
    .bb-va-paddock {
      display: none;
      position: absolute;
    }

    .bb-va-barn {
      left: 5%;
      bottom: 177px;
      width: 150px;
      height: 78px;
      background:
        linear-gradient(90deg, #81382f, #9a4438 52%, #81382f);
      border: 5px solid #55342c;
      box-shadow: 0 7px 0 rgba(0,0,0,.12);
    }

    .bb-va-barn::before {
      content: "";
      position: absolute;
      left: -10px;
      top: -51px;
      width: 160px;
      height: 55px;
      background: #55504a;
      border-bottom: 4px solid #3e3a36;
      clip-path: polygon(4% 100%, 20% 28%, 50% 0, 80% 28%, 96% 100%);
    }

    .bb-va-barn::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 0;
      width: 44px;
      height: 60px;
      transform: translateX(-50%);
      background:
        linear-gradient(90deg, transparent 47%, #e8dfd2 48% 52%, transparent 53%),
        #5d3029;
      border: 4px solid #e8dfd2;
    }

    .bb-va-fence {
      left: 1%;
      bottom: 147px;
      width: 31%;
      height: 31px;
      border-top: 7px solid #e9e0d2;
      border-bottom: 7px solid #e9e0d2;
      opacity: .95;
    }

    .bb-va-fence::before {
      content: "";
      position: absolute;
      left: 10px;
      top: -12px;
      width: 7px;
      height: 48px;
      background: #e9e0d2;
      box-shadow:
        52px 0 #e9e0d2,
        104px 0 #e9e0d2,
        156px 0 #e9e0d2,
        208px 0 #e9e0d2,
        260px 0 #e9e0d2,
        312px 0 #e9e0d2;
    }

    .bb-va-paddock {
      left: 2%;
      bottom: 137px;
      width: 30%;
      height: 17px;
      border-radius: 50%;
      background: rgba(49,108,38,.35);
    }


    /* =================================================
       ARENA — WESTHAMPTON BEACH
    ================================================= */

    .map-westhampton {
      background:
        linear-gradient(
          #83c9e8 0 38%,
          #287eae 39%,
          #2f98c5 56%,
          #dcc992 57%,
          #d7b86f 100%
        ) !important;
    }

    .bb-wh-sailboat,
    .bb-wh-dune-fence,
    .bb-wh-dune-grass,
    .bb-west-pete {
      display: none;
      position: absolute;
    }

    .map-westhampton .bb-wh-sailboat,
    .map-westhampton .bb-wh-dune-fence,
    .map-westhampton .bb-wh-dune-grass,
    .map-westhampton .bb-west-pete {
      display: block;
    }

    .bb-wh-sailboat {
      right: 21%;
      top: 174px;
      width: 4px;
      height: 43px;
      background: #514a43;
      opacity: .75;
    }

    .bb-wh-sailboat::before {
      content: "";
      position: absolute;
      left: 4px;
      top: 3px;
      width: 32px;
      height: 35px;
      background: #f1eee4;
      clip-path: polygon(0 0, 100% 82%, 0 100%);
    }

    .bb-wh-sailboat::after {
      content: "";
      position: absolute;
      left: -10px;
      bottom: -7px;
      width: 42px;
      height: 8px;
      border-radius: 50%;
      background: #6a4c38;
    }

    .bb-wh-dune-fence {
      left: 29%;
      bottom: 79px;
      width: 185px;
      height: 30px;
      border-top: 5px solid #8d7758;
      border-bottom: 5px solid #8d7758;
      transform: rotate(-2deg);
      opacity: .78;
    }

    .bb-wh-dune-fence::before {
      content: "";
      position: absolute;
      left: 7px;
      top: -10px;
      width: 6px;
      height: 42px;
      background: #8d7758;
      box-shadow:
        42px 0 #8d7758,
        84px 0 #8d7758,
        126px 0 #8d7758,
        168px 0 #8d7758;
    }

    .bb-wh-dune-grass {
      right: 2%;
      bottom: 74px;
      width: 170px;
      height: 48px;
      background:
        repeating-linear-gradient(
          74deg,
          transparent 0 12px,
          #718447 13px 16px,
          transparent 17px 27px
        );
      opacity: .78;
    }


    /* Palm Beach Pete — tiny background cameo, not a fighter. */
    .bb-west-pete {
      left: 63%;
      top: 220px;
      width: 58px;
      height: 44px;
      opacity: .88;
      animation: bbPeteBob 2.1s ease-in-out infinite alternate;
      transform-origin: center bottom;
    }

    .bb-pete-board {
      position: absolute;
      left: 3px;
      bottom: 2px;
      width: 54px;
      height: 8px;
      border-radius: 50%;
      background: #f4efe4;
      border: 2px solid #6f5945;
      transform: rotate(-3deg);
    }

    .bb-pete-body {
      position: absolute;
      left: 24px;
      bottom: 9px;
      width: 12px;
      height: 20px;
      background: #f0eee8;
      border: 2px solid #403831;
    }

    .bb-pete-head {
      position: absolute;
      left: 0;
      top: -11px;
      width: 12px;
      height: 12px;
      border-radius: 45%;
      background: #d8a077;
      border: 2px solid #403831;
    }

    .bb-pete-hat {
      position: absolute;
      left: -3px;
      top: -5px;
      width: 17px;
      height: 7px;
      background: #c9272c;
      border: 2px solid #4b2525;
      border-radius: 6px 6px 2px 2px;
    }

    .bb-pete-hat::after {
      content: "";
      position: absolute;
      right: -6px;
      bottom: -2px;
      width: 8px;
      height: 3px;
      background: #c9272c;
      border: 1px solid #4b2525;
    }

    .bb-pete-arm {
      position: absolute;
      top: 2px;
      width: 4px;
      height: 15px;
      background: #d8a077;
      border: 1px solid #403831;
      transform-origin: top center;
    }

    .bb-pete-arm.other {
      left: -5px;
      transform: rotate(15deg);
    }

    .bb-pete-arm.wave {
      right: -5px;
      animation: bbPeteWave 680ms ease-in-out infinite alternate;
    }

    @keyframes bbPeteBob {
      from { transform: translateY(0) rotate(-1deg); }
      to { transform: translateY(4px) rotate(1deg); }
    }

    @keyframes bbPeteWave {
      from { transform: rotate(-58deg); }
      to { transform: rotate(-118deg); }
    }


    /* =================================================
       ARENA — NEW CANAAN
    ================================================= */

    .map-newcanaan {
      background:
        linear-gradient(
          #a9cee1 0 35%,
          #8c8178 36% 43%,
          #c7c0b6 44% 61%,
          #7a7470 62% 70%,
          #50504f 71% 100%
        ) !important;
    }

    .map-newcanaan .map-decor::before {
      content: "" !important;
      background:
        linear-gradient(
          90deg,
          #9e4435 0 24%,
          #d9dfdd 24% 49%,
          #9d4938 49% 74%,
          #e5e2dc 74% 100%
        ) !important;
      border-top: 13px solid #595957 !important;
      border-bottom: 9px solid #4e3c31 !important;
    }

    .map-newcanaan .map-decor::after {
      background:
        repeating-linear-gradient(
          90deg,
          #dce8eb 0 46px,
          #53636a 46px 52px,
          #b8d0d7 52px 74px,
          #3e484c 74px 80px,
          transparent 80px 112px
        ) !important;
      border-top: 5px solid #ded9d0;
      border-bottom: 5px solid #42372f !important;
    }

    .bb-nc-roofline,
    .bb-nc-clock,
    .bb-nc-signs,
    .bb-nc-flowers {
      display: none;
      position: absolute;
    }

    .map-newcanaan .bb-nc-roofline,
    .map-newcanaan .bb-nc-clock,
    .map-newcanaan .bb-nc-signs,
    .map-newcanaan .bb-nc-flowers {
      display: block;
    }

    .bb-nc-roofline {
      left: 0;
      right: 0;
      bottom: 313px;
      height: 42px;
      background:
        repeating-linear-gradient(
          90deg,
          #565757 0 170px,
          #4c4d4d 170px 250px
        );
      clip-path: polygon(0 34%, 18% 12%, 38% 28%, 56% 8%, 76% 26%, 100% 10%, 100% 100%, 0 100%);
      opacity: .98;
    }

    .bb-nc-clock {
      left: 50%;
      bottom: 137px;
      width: 9px;
      height: 126px;
      transform: translateX(-50%);
      background: #1f6849;
      border: 2px solid #174b38;
      z-index: 5;
    }

    .bb-nc-clock::before {
      content: "";
      position: absolute;
      left: -25px;
      top: -43px;
      width: 55px;
      height: 55px;
      border-radius: 50%;
      background:
        linear-gradient(90deg, transparent 48%, #303030 49% 52%, transparent 53%),
        linear-gradient(0deg, transparent 48%, #303030 49% 52%, transparent 53%),
        #f3f0e7;
      border: 5px solid #1f6849;
      box-shadow:
        0 0 0 3px #d4c9b7,
        0 5px 0 rgba(0,0,0,.12);
    }

    .bb-nc-clock::after {
      content: "";
      position: absolute;
      left: -7px;
      bottom: -8px;
      width: 20px;
      height: 10px;
      background: #1f6849;
      border-radius: 3px;
    }

    .bb-nc-signs {
      left: 0;
      right: 0;
      bottom: 276px;
      height: 28px;
      color: #2d201a;
      font-family: "Arial Black", Arial, sans-serif;
      font-size: 13px;
      letter-spacing: 0;
      word-spacing: 0;
      text-shadow: 1px 1px rgba(255,255,255,.2);
    }

    .bb-nc-sign {
      position: absolute;
      top: 0;
      width: 24%;
      text-align: center;
    }

    .bb-nc-sign.one { left: 0; }
    .bb-nc-sign.two { left: 25%; }
    .bb-nc-sign.three { left: 50%; }
    .bb-nc-sign.four { left: 75%; }

    .bb-nc-flowers {
      left: 13%;
      bottom: 151px;
      width: 22px;
      height: 13px;
      border-radius: 50%;
      background:
        radial-gradient(circle at 20% 45%, #d05c85 0 20%, transparent 21%),
        radial-gradient(circle at 50% 35%, #ef9b5f 0 20%, transparent 21%),
        radial-gradient(circle at 78% 55%, #d85f83 0 20%, transparent 21%),
        #356b3a;
      box-shadow:
        275px 0 0 #356b3a,
        540px 0 0 #356b3a;
    }


    /* =================================================
       ARENA — MADRID / PLAZA MAYOR FEEL
    ================================================= */

    .map-madrid {
      background:
        linear-gradient(
          #9ebfd0 0 19%,
          #d39a98 31%,
          #ed9f7c 42%,
          #b45a48 43% 70%,
          #8d4a3d 71% 100%
        ) !important;
    }

    .map-madrid .map-decor::before {
      background:
        linear-gradient(
          90deg,
          #9e493c 0 20%,
          #a94c3f 20% 40%,
          #a2483a 40% 61%,
          #aa5140 61% 81%,
          #984638 81% 100%
        ) !important;
      border-bottom: 12px solid #64392f !important;
    }

    .map-madrid .map-decor::after {
      background:
        repeating-linear-gradient(
          90deg,
          #343130 0 20px,
          transparent 20px 58px
        ) !important;
      opacity: .92;
    }

    .bb-madrid-roof,
    .bb-madrid-tower,
    .bb-madrid-arcades,
    .bb-madrid-lights {
      display: none;
      position: absolute;
    }

    .map-madrid .bb-madrid-roof,
    .map-madrid .bb-madrid-tower,
    .map-madrid .bb-madrid-arcades,
    .map-madrid .bb-madrid-lights {
      display: block;
    }

    .bb-madrid-roof {
      left: 0;
      right: 0;
      bottom: 365px;
      height: 45px;
      background: #444649;
      border-bottom: 5px solid #313234;
      clip-path: polygon(0 28%, 13% 8%, 30% 18%, 50% 0, 68% 18%, 86% 7%, 100% 25%, 100% 100%, 0 100%);
    }

    .bb-madrid-tower {
      bottom: 306px;
      width: 74px;
      height: 120px;
      background: #95453a;
      border: 5px solid #62372f;
      z-index: 3;
    }

    .bb-madrid-tower.left {
      left: 3%;
    }

    .bb-madrid-tower.right {
      right: 3%;
    }

    .bb-madrid-tower::before {
      content: "";
      position: absolute;
      left: -11px;
      top: -82px;
      width: 86px;
      height: 86px;
      background: #3f4245;
      clip-path: polygon(50% 0, 66% 58%, 90% 100%, 10% 100%, 34% 58%);
    }

    .bb-madrid-tower::after {
      content: "";
      position: absolute;
      left: 27px;
      top: 24px;
      width: 20px;
      height: 29px;
      background: #262525;
      border: 3px solid #ceb18b;
    }

    .bb-madrid-arcades {
      left: 0;
      right: 0;
      bottom: 139px;
      height: 58px;
      background:
        repeating-linear-gradient(
          90deg,
          #2c2928 0 40px,
          #8f4338 40px 58px,
          #2c2928 58px 98px,
          #8f4338 98px 116px
        );
      border-top: 7px solid #b66a52;
      opacity: .96;
    }

    .bb-madrid-lights {
      left: 6%;
      right: 6%;
      bottom: 154px;
      height: 11px;
      background:
        radial-gradient(circle, #ffc36b 0 35%, transparent 38%) 0 0 / 92px 11px repeat-x;
      filter: drop-shadow(0 0 5px rgba(255,164,75,.55));
      opacity: .9;
    }
  `;

  document.head.appendChild(
    style
  );


  /* ===================================================
     DOM HELPERS
  =================================================== */

  function add(
    parent,
    className,
    html = ""
  ) {
    if (
      !parent ||
      parent.querySelector(
        "." +
        className.split(" ")[0]
      )
    ) {
      return null;
    }

    const element =
      document.createElement(
        "div"
      );

    element.className =
      className;

    element.innerHTML =
      html;

    parent.appendChild(
      element
    );

    return element;
  }


  /* ===================================================
     PREVIEW DETAILS
  =================================================== */

  const vaPreview =
    document.querySelector(
      ".virginia-preview"
    );

  add(
    vaPreview,
    "bb-va-preview-barn"
  );

  add(
    vaPreview,
    "bb-va-preview-fence"
  );


  const whPreview =
    document.querySelector(
      ".westhampton-preview"
    );

  add(
    whPreview,
    "bb-wh-preview-sail"
  );

  add(
    whPreview,
    "bb-wh-preview-dunes"
  );


  const ncPreview =
    document.querySelector(
      ".newcanaan-preview"
    );

  add(
    ncPreview,
    "bb-nc-preview-roof"
  );

  add(
    ncPreview,
    "bb-nc-preview-clock"
  );


  const madridPreview =
    document.querySelector(
      ".madrid-preview"
    );

  add(
    madridPreview,
    "bb-madrid-preview-roof"
  );

  add(
    madridPreview,
    "bb-madrid-preview-tower left"
  );

  add(
    madridPreview,
    "bb-madrid-preview-tower right"
  );

  add(
    madridPreview,
    "bb-madrid-preview-arcade"
  );


  /* ===================================================
     ARENA DETAILS
  =================================================== */

  const mapDecor =
    document.querySelector(
      "#arena .map-decor"
    );

  add(
    mapDecor,
    "bb-va-barn"
  );

  add(
    mapDecor,
    "bb-va-fence"
  );

  add(
    mapDecor,
    "bb-va-paddock"
  );

  add(
    mapDecor,
    "bb-wh-sailboat"
  );

  add(
    mapDecor,
    "bb-wh-dune-fence"
  );

  add(
    mapDecor,
    "bb-wh-dune-grass"
  );

  add(
    mapDecor,
    "bb-west-pete",
    `
      <div class="bb-pete-board"></div>
      <div class="bb-pete-body">
        <div class="bb-pete-head">
          <div class="bb-pete-hat"></div>
        </div>
        <div class="bb-pete-arm other"></div>
        <div class="bb-pete-arm wave"></div>
      </div>
    `
  );

  add(
    mapDecor,
    "bb-nc-roofline"
  );

  add(
    mapDecor,
    "bb-nc-clock"
  );

  add(
    mapDecor,
    "bb-nc-signs",
    `
      <div class="bb-nc-sign one">MARKET</div>
      <div class="bb-nc-sign two">BOUTIQUE</div>
      <div class="bb-nc-sign three">CAFE</div>
      <div class="bb-nc-sign four">SHOPS</div>
    `
  );

  add(
    mapDecor,
    "bb-nc-flowers"
  );

  add(
    mapDecor,
    "bb-madrid-roof"
  );

  add(
    mapDecor,
    "bb-madrid-tower left"
  );

  add(
    mapDecor,
    "bb-madrid-tower right"
  );

  add(
    mapDecor,
    "bb-madrid-arcades"
  );

  add(
    mapDecor,
    "bb-madrid-lights"
  );
})();
