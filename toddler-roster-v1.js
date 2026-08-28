/* =====================================================
   BLOODLINE BRAWL — ALICE / LEO / BARRETT
   Additive roster expansion only. No base-system rewrites.
===================================================== */

(() => {
  if (window.__bbToddlerRosterV1Loaded) return;
  window.__bbToddlerRosterV1Loaded = true;

  const TODDLERS = new Set(["alice", "leo", "barrett"]);

  const style = document.createElement("style");
  style.textContent = `
    /* =================================================
       TODDLER BODY PROPORTIONS
       Fight sizes target Grandmommy > Alice≈Leo > Barrett.
    ================================================= */
    .bb-toddler {
      position: relative;
      transform-origin: bottom center;
    }

    .alice-model,
    .leo-model {
      width: 86px !important;
      height: 126px !important;
    }

    .barrett-model {
      width: 78px !important;
      height: 96px !important;
    }

    .bb-toddler .face {
      width: 42px;
      height: 37px;
      left: 22px;
      top: 23px;
      border-radius: 7px 7px 5px 5px;
      z-index: 9;
    }

    .bb-toddler .eye {
      width: 5px;
      height: 7px;
      top: 13px;
    }

    .bb-toddler .eye-left { left: 9px; }
    .bb-toddler .eye-right { right: 9px; }

    .bb-toddler .mouth {
      width: 13px;
      height: 5px;
      left: 12px;
      bottom: 6px;
    }

    .bb-toddler .toddler-hair {
      position: absolute;
      z-index: 12;
      background: #5b3825;
      border: 3px solid #111;
    }

    .alice-hair {
      left: 19px;
      top: 11px;
      width: 48px;
      height: 24px;
      border-radius: 14px 14px 6px 6px;
    }

    .alice-hair::before,
    .alice-hair::after {
      content: "";
      position: absolute;
      top: 12px;
      width: 9px;
      height: 28px;
      background: #5b3825;
      border-bottom: 3px solid #111;
    }

    .alice-hair::before {
      left: -7px;
      border-left: 3px solid #111;
      border-radius: 6px 0 4px 8px;
    }

    .alice-hair::after {
      right: -7px;
      border-right: 3px solid #111;
      border-radius: 0 6px 8px 4px;
    }

    .leo-hair {
      left: 20px;
      top: 12px;
      width: 46px;
      height: 21px;
      border-radius: 11px 11px 4px 4px;
      transform: rotate(-1deg);
    }

    .leo-hair::before,
    .leo-hair::after {
      content: "";
      position: absolute;
      top: -5px;
      width: 14px;
      height: 10px;
      background: #5b3825;
      border: 3px solid #111;
      border-bottom: 0;
      border-radius: 8px 8px 0 0;
    }

    .leo-hair::before { left: 5px; transform: rotate(-12deg); }
    .leo-hair::after { right: 4px; transform: rotate(12deg); }

    .barrett-model .face {
      width: 39px;
      height: 34px;
      left: 19px;
      top: 19px;
      border-radius: 9px 9px 6px 6px;
    }

    .barrett-hair {
      left: 28px;
      top: 12px;
      width: 22px;
      height: 8px;
      border-radius: 10px 10px 4px 4px;
      border-width: 2px !important;
    }

    .barrett-hair::before,
    .barrett-hair::after {
      content: "";
      position: absolute;
      top: -3px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #5b3825;
    }

    .barrett-hair::before { left: 3px; }
    .barrett-hair::after { right: 3px; }

    .bb-toddler .toddler-shirt {
      position: absolute;
      left: 17px;
      top: 57px;
      width: 52px;
      height: 39px;
      border: 3px solid #111;
      border-radius: 9px 9px 3px 3px;
      z-index: 4;
    }

    .alice-shirt { background: #ef6ca7; }
    .leo-shirt { background: #3678cb; }

    .barrett-model .toddler-shirt {
      left: 16px;
      top: 50px;
      width: 47px;
      height: 28px;
      background: #d84343;
    }

    .bb-toddler .arm {
      top: 61px;
      width: 13px;
      height: 38px;
      border-width: 3px;
      border-radius: 5px;
    }

    .bb-toddler .left-arm { left: 7px; }
    .bb-toddler .right-arm { right: 7px; }

    .barrett-model .arm {
      top: 53px;
      width: 12px;
      height: 28px;
    }

    .barrett-model .left-arm { left: 7px; }
    .barrett-model .right-arm { right: 7px; }

    .bb-toddler .leg {
      top: 93px;
      width: 19px;
      height: 29px;
      border-width: 3px;
      border-radius: 3px;
    }

    .bb-toddler .left-leg { left: 22px; }
    .bb-toddler .right-leg { right: 22px; }

    .alice-pants { background: #f5f4ed; }
    .leo-pants { background: #4f9b4a; }

    .barrett-model .leg {
      top: 75px;
      width: 17px;
      height: 18px;
      background: #3973bd;
      border-radius: 3px 3px 6px 6px;
    }

    .barrett-model .left-leg { left: 20px; }
    .barrett-model .right-leg { right: 20px; }

    .bb-toddler .white-shoe,
    .bb-toddler .dark-shoe {
      top: 116px;
      width: 24px;
      height: 10px;
      border-width: 3px;
      border-radius: 4px;
    }

    .bb-toddler .left-shoe { left: 17px; }
    .bb-toddler .right-shoe { right: 17px; }

    .barrett-model .white-shoe,
    .barrett-model .dark-shoe {
      top: 89px;
      width: 21px;
      height: 8px;
    }

    .barrett-model .left-shoe { left: 16px; }
    .barrett-model .right-shoe { right: 16px; }

    .card-model-holder .alice-model,
    .card-model-holder .leo-model {
      transform: scale(1.20) !important;
    }

    .card-model-holder .barrett-model {
      transform: scale(1.18) !important;
    }

    .title-character-space .alice-model,
    .title-character-space .leo-model,
    .title-character-space .barrett-model {
      transform: scale(1.08) !important;
    }

    /* =================================================
       ALICE — WAND / FAIRY / LOLLIPOP
    ================================================= */
    .alice-wand {
      position: absolute;
      left: 3px;
      top: 4px;
      width: 5px;
      height: 48px;
      background: linear-gradient(#f7ddff,#a971d0);
      border: 2px solid #111;
      border-radius: 4px;
      transform: rotate(19deg);
      transform-origin: bottom center;
      z-index: 22;
    }

    .alice-wand::before,
    .alice-wand::after {
      content: "";
      position: absolute;
      left: 50%;
      top: -15px;
      width: 17px;
      height: 17px;
      transform: translateX(-50%) rotate(45deg);
      background: #ffd8f4;
      border: 2px solid #7d4a90;
      box-shadow: 0 0 7px rgba(255,172,239,.8);
    }

    .alice-wand::after {
      width: 8px;
      height: 8px;
      top: -11px;
      background: #fff2a8;
      border-color: #c18d39;
    }

    .bb-fairy-wing-set {
      position: absolute;
      left: 4px;
      top: 42px;
      width: 78px;
      height: 60px;
      z-index: 1;
      pointer-events: none;
    }

    .bb-fairy-wing {
      position: absolute;
      top: 0;
      width: 35px;
      height: 52px;
      border: 3px solid #b35bc9;
      background: linear-gradient(135deg,rgba(255,227,251,.9),rgba(156,226,255,.65));
      border-radius: 65% 35% 62% 38%;
      box-shadow: inset 0 0 0 4px rgba(255,255,255,.25),0 0 9px rgba(229,122,255,.45);
    }

    .bb-fairy-wing.l { left: 1px; transform: rotate(-28deg); }
    .bb-fairy-wing.r { right: 1px; transform: scaleX(-1) rotate(-28deg); }

    .bb-princess-crown,
    .bb-king-crown {
      position: absolute;
      z-index: 35;
      pointer-events: none;
      background: #ffd83d;
      border: 3px solid #7d5614;
      clip-path: polygon(0 100%,0 38%,20% 62%,36% 8%,54% 61%,76% 18%,100% 52%,100% 100%);
      box-shadow: 0 0 8px rgba(255,220,75,.65);
    }

    .bb-princess-crown {
      left: 23px;
      top: 2px;
      width: 39px;
      height: 25px;
    }

    .bb-king-crown {
      left: 17px;
      top: -3px;
      width: 48px;
      height: 31px;
      transform: rotate(-10deg);
    }

    .bb-grape-held,
    .bb-grape-projectile,
    .bb-giant-grape {
      position: absolute;
      pointer-events: none;
      z-index: 250;
      transform-origin: 50% 55%;
    }

    .bb-grape-held {
      left: -7px;
      top: -7px;
      width: 34px;
      height: 62px;
      z-index: 26;
    }

    .bb-grape-projectile {
      width: 52px;
      height: 88px;
      filter: drop-shadow(3px 4px 0 rgba(0,0,0,.25));
    }

    .bb-grape-candy {
      position: absolute;
      left: 50%;
      top: 0;
      width: 42px;
      height: 42px;
      transform: translateX(-50%);
      border-radius: 50%;
      border: 4px solid #3b174f;
      background:
        radial-gradient(circle at 34% 30%,#d79cff 0 12%,transparent 13%),
        radial-gradient(circle at 70% 68%,#5f2190 0 13%,transparent 14%),
        linear-gradient(145deg,#b75ce0,#7420a9);
      box-shadow: inset -5px -6px 0 rgba(60,17,82,.2),0 0 10px rgba(180,85,255,.6);
    }

    .bb-grape-stick {
      position: absolute;
      left: 50%;
      top: 37px;
      width: 8px;
      height: 49px;
      transform: translateX(-50%);
      background: #f5f1e7;
      border: 2px solid #765e67;
      border-radius: 4px;
    }

    .bb-grape-held .bb-grape-candy { width: 30px; height: 30px; border-width: 3px; }
    .bb-grape-held .bb-grape-stick { top: 26px; height: 36px; width: 6px; }

    .bb-giant-grape {
      width: 125px;
      height: 225px;
      z-index: 310;
      filter: drop-shadow(9px 12px 0 rgba(0,0,0,.28));
    }

    .bb-giant-grape .bb-grape-candy {
      top: auto;
      bottom: 0;
      width: 112px;
      height: 112px;
      border-width: 7px;
    }

    .bb-giant-grape .bb-grape-stick {
      top: auto;
      bottom: 96px;
      width: 14px;
      height: 129px;
      border-width: 3px;
    }

    .bb-fairy-particle,
    .bb-magic-burst {
      position: absolute;
      pointer-events: none;
      z-index: 315;
    }

    .bb-fairy-particle {
      width: 10px;
      height: 10px;
      background: #fff3a5;
      clip-path: polygon(50% 0,62% 37%,100% 50%,62% 63%,50% 100%,38% 63%,0 50%,38% 37%);
      animation: bbFairyParticle .52s ease-out forwards;
    }

    @keyframes bbFairyParticle {
      from { transform: translate(0,0) scale(.45) rotate(0deg); opacity: 1; }
      to { transform: translate(var(--dx),var(--dy)) scale(1.1) rotate(170deg); opacity: 0; }
    }

    .bb-magic-burst {
      width: 86px;
      height: 86px;
      border-radius: 50%;
      border: 7px dashed #d06bff;
      box-shadow: 0 0 0 8px rgba(255,168,237,.22),0 0 24px rgba(177,82,255,.75);
      animation: bbMagicBurst .48s ease-out forwards;
    }

    .bb-fairy-target-ring {
      position:absolute; width:112px; height:150px; border:6px dashed rgba(218,116,255,.78);
      border-radius:50%; z-index:300; pointer-events:none;
      box-shadow:0 0 18px rgba(255,130,238,.7),inset 0 0 18px rgba(136,211,255,.35);
      animation:bbFairyTarget .62s ease-in-out infinite alternate;
    }
    @keyframes bbFairyTarget {
      from { transform:scale(.88) rotate(-8deg); opacity:.45; }
      to { transform:scale(1.08) rotate(10deg); opacity:1; }
    }

    @keyframes bbMagicBurst {
      from { transform: translate(-50%,-50%) scale(.3) rotate(0); opacity: 1; }
      to { transform: translate(-50%,-50%) scale(1.5) rotate(110deg); opacity: 0; }
    }

    /* =================================================
       LEO — CLAWS / DINOSAURS
    ================================================= */
    .leo-claw-hand {
      position: absolute;
      left: 1px;
      top: 24px;
      width: 16px;
      height: 15px;
      z-index: 22;
    }

    .leo-claw-hand::before,
    .leo-claw-hand::after {
      content: "";
      position: absolute;
      width: 13px;
      height: 4px;
      right: -7px;
      border-top: 3px solid #f0efe2;
      border-radius: 50%;
      transform-origin: left center;
    }

    .leo-claw-hand::before { top: 1px; transform: rotate(-22deg); }
    .leo-claw-hand::after { bottom: 1px; transform: rotate(22deg); }

    .bb-claw-trail {
      --trail-start: -12px;
      --trail-end: 18px;
      position: absolute;
      width: 58px;
      height: 46px;
      pointer-events: none;
      z-index: 265;
      opacity: 0;
      animation: bbClawFlash .34s ease-out forwards;
    }

    .bb-claw-trail i {
      position: absolute;
      left: 2px;
      width: 54px;
      height: 22px;
      border-top: 5px solid #e9f6c4;
      border-radius: 50%;
      transform: rotate(-16deg);
      filter: drop-shadow(0 0 4px #a9ff78);
    }

    .bb-claw-trail i:nth-child(1) { top: 0; }
    .bb-claw-trail i:nth-child(2) { top: 11px; }
    .bb-claw-trail i:nth-child(3) { top: 22px; }

    @keyframes bbClawFlash {
      0% { opacity: 0; transform: translateX(var(--trail-start)) scale(.75); }
      35% { opacity: 1; }
      100% { opacity: 0; transform: translateX(var(--trail-end)) scale(1.08); }
    }

    .bb-dino-foot {
      position: absolute;
      width: 78px;
      height: 56px;
      border: 4px solid #183d1e;
      border-radius: 55% 48% 44% 50%;
      background: linear-gradient(#76b85d,#4f8c46);
      z-index: 260;
      transform-origin: center bottom;
      animation: bbDinoFoot .55s ease-out forwards;
      filter: drop-shadow(4px 5px 0 rgba(0,0,0,.25));
    }

    .bb-dino-foot::before,
    .bb-dino-foot::after {
      content: "";
      position: absolute;
      bottom: -17px;
      width: 23px;
      height: 27px;
      border: 4px solid #183d1e;
      border-radius: 60% 60% 48% 48%;
      background: #6aac55;
    }

    .bb-dino-foot::before { left: 5px; transform: rotate(-15deg); }
    .bb-dino-foot::after { right: 5px; transform: rotate(15deg); }

    .bb-dino-foot .toe {
      position: absolute;
      left: 26px;
      bottom: -21px;
      width: 25px;
      height: 30px;
      border: 4px solid #183d1e;
      border-radius: 58%;
      background: #79bb5f;
    }

    @keyframes bbDinoFoot {
      0% { transform: translateY(-42px) scale(.65); opacity: 0; }
      52% { transform: translateY(0) scale(1.08); opacity: 1; }
      100% { transform: translateY(5px) scale(.92); opacity: 0; }
    }

    .bb-stomp-wave {
      position: absolute;
      width: 42px;
      height: 17px;
      border: 5px solid rgba(204,245,164,.75);
      border-top: 0;
      border-radius: 50%;
      z-index: 254;
      animation: bbStompWave .58s ease-out forwards;
    }

    @keyframes bbStompWave {
      from { transform: translateX(-50%) scaleX(.4); opacity: 1; }
      to { transform: translateX(-50%) scaleX(4.2); opacity: 0; }
    }

    .bb-leo-dino {
      position: absolute;
      bottom: 28px;
      pointer-events: none;
      z-index: 320;
      filter: drop-shadow(5px 7px 0 rgba(0,0,0,.28));
      transform-origin: center bottom;
    }

    .bb-trike { width: 178px; height: 104px; }
    .bb-trike .body {
      position: absolute; left: 42px; top: 35px; width: 104px; height: 52px;
      background: linear-gradient(#6ea95a,#4d7d45); border: 4px solid #18371c; border-radius: 48%;
    }
    .bb-trike .head {
      position: absolute; right: 2px; top: 24px; width: 60px; height: 52px;
      background: #76ad60; border: 4px solid #18371c; border-radius: 48% 55% 42% 48%; z-index: 5;
    }
    .bb-trike .frill {
      position: absolute; left: -20px; top: -9px; width: 39px; height: 61px;
      background: #5b8d4e; border: 4px solid #18371c; border-radius: 55% 20% 20% 55%;
    }
    .bb-trike .horn {
      position: absolute; right: -29px; width: 34px; height: 8px; background: #eadfbf;
      border: 3px solid #554b3b; clip-path: polygon(0 0,100% 50%,0 100%); z-index: 7;
    }
    .bb-trike .horn.a { top: 9px; transform: rotate(-13deg); }
    .bb-trike .horn.b { top: 30px; transform: rotate(10deg); }
    .bb-trike .tail {
      position: absolute; left: 4px; top: 45px; width: 55px; height: 15px;
      background: #4e7d43; border: 4px solid #18371c; border-radius: 60% 10% 10% 60%; transform: rotate(12deg);
    }
    .bb-trike .leg,
    .bb-anky .leg {
      position: absolute; top: 77px; width: 18px; height: 27px; background: #4f8144;
      border: 4px solid #18371c; border-radius: 4px;
    }
    .bb-trike .leg.a { left: 58px; } .bb-trike .leg.b { left: 116px; }

    .bb-trex { width: 174px; height: 132px; }
    .bb-trex .body {
      position: absolute; left: 48px; top: 49px; width: 82px; height: 57px;
      background: linear-gradient(#7ab75f,#4e8546); border: 4px solid #17391b; border-radius: 48%;
    }
    .bb-trex .tail {
      position: absolute; left: 0; top: 61px; width: 72px; height: 20px;
      background: #528b49; border: 4px solid #17391b; border-radius: 65% 8% 8% 65%; transform: rotate(10deg);
    }
    .bb-trex .neck {
      position: absolute; right: 38px; top: 34px; width: 30px; height: 50px;
      background: #639f50; border: 4px solid #17391b; border-radius: 35%; transform: rotate(-17deg); z-index: 4;
    }
    .bb-trex .head {
      position: absolute; right: 0; top: 15px; width: 66px; height: 47px;
      background: #77b45c; border: 4px solid #17391b; border-radius: 45% 55% 42% 48%; z-index: 7;
      animation: bbTrexHead .48s ease-in-out infinite alternate;
    }
    .bb-trex .jaw {
      position: absolute; right: -3px; top: 46px; width: 53px; height: 17px;
      background: #61974d; border: 4px solid #17391b; border-radius: 0 0 48% 48%; transform-origin: 10% 0;
      animation: bbTrexJaw .48s ease-in-out infinite alternate;
    }
    .bb-trex .teeth {
      position: absolute; right: 6px; bottom: -7px; width: 37px; height: 10px;
      background: repeating-linear-gradient(90deg,#f4ead5 0 5px,transparent 5px 9px);
      clip-path: polygon(0 0,100% 0,94% 100%,84% 0,73% 100%,61% 0,49% 100%,37% 0,25% 100%,13% 0);
    }
    .bb-trex .leg {
      position: absolute; top: 96px; width: 18px; height: 34px; background: #4f8445;
      border: 4px solid #17391b; border-radius: 4px;
    }
    .bb-trex .leg.a { left: 66px; } .bb-trex .leg.b { left: 104px; }
    .bb-trex .eye,
    .bb-trike .eye,
    .bb-anky .eye {
      position: absolute; width: 7px; height: 7px; border-radius: 50%; background: #ffe75c; border: 2px solid #111; z-index: 10;
    }
    .bb-trex .eye { right: 16px; top: 14px; }
    .bb-trike .eye { right: 13px; top: 14px; }
    @keyframes bbTrexHead { to { transform: rotate(7deg) translateX(4px); } }
    @keyframes bbTrexJaw { to { transform: rotate(18deg); } }

    .bb-anky { width: 184px; height: 110px; }
    .bb-anky .body {
      position: absolute; left: 50px; top: 34px; width: 102px; height: 55px;
      background: linear-gradient(#87945c,#647446); border: 4px solid #303a20; border-radius: 52% 48% 42% 45%;
    }
    .bb-anky .armor {
      position: absolute; left: 61px; top: 24px; width: 82px; height: 25px;
      background: repeating-linear-gradient(90deg,#9caa67 0 13px,#778650 13px 23px); border: 4px solid #303a20;
      border-radius: 50% 50% 20% 20%;
    }
    .bb-anky .head {
      position: absolute; right: 5px; top: 47px; width: 47px; height: 34px;
      background: #788653; border: 4px solid #303a20; border-radius: 45%;
    }
    .bb-anky .eye { right: 9px; top: 9px; }
    .bb-anky .tail {
      position: absolute; left: 4px; top: 57px; width: 63px; height: 13px;
      background: #697849; border: 4px solid #303a20; border-radius: 60% 12% 12% 60%; transform-origin: right center;
    }
    .bb-anky .club {
      position: absolute; left: -16px; top: -9px; width: 30px; height: 27px;
      background: #59643e; border: 4px solid #303a20; border-radius: 50%;
    }
    .bb-anky .leg.a { left: 70px; } .bb-anky .leg.b { left: 124px; }
    .bb-anky.bb-tail-smash .tail { animation: bbAnkyTail .38s ease-out 1; }
    @keyframes bbAnkyTail { 0% { transform: rotate(0); } 45% { transform: rotate(-65deg); } 100% { transform: rotate(18deg); } }

    /* =================================================
       BARRETT — REMOTE / CARS / HEADBUTT
    ================================================= */
    .barrett-remote {
      position: absolute;
      left: -2px;
      top: 7px;
      width: 17px;
      height: 25px;
      background: #3f464d;
      border: 3px solid #111;
      border-radius: 4px;
      z-index: 24;
      transform: rotate(9deg);
    }

    .barrett-remote::before {
      content: "";
      position: absolute;
      left: 5px;
      top: -12px;
      width: 3px;
      height: 13px;
      background: #c8ccd0;
      border: 1px solid #111;
    }

    .barrett-remote::after {
      content: "";
      position: absolute;
      left: 3px;
      top: 6px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #e24c4c;
      box-shadow: 5px 7px 0 -1px #67c75e;
    }

    .barrett-model.bb-headbutt-run .face,
    .barrett-model.bb-headbutt-run .barrett-hair {
      animation: bbHeadLower .52s ease-in-out 1;
      transform-origin: center bottom;
    }

    @keyframes bbHeadLower {
      0% { transform: rotate(0deg) translateY(0); }
      28%,68% { transform: rotate(18deg) translateY(4px); }
      100% { transform: rotate(0deg) translateY(0); }
    }

    .bb-toy-car {
      position: absolute;
      width: 72px;
      height: 39px;
      z-index: 255;
      pointer-events: none;
      filter: drop-shadow(3px 4px 0 rgba(0,0,0,.25));
    }

    .bb-toy-car .body {
      position: absolute; left: 7px; top: 9px; width: 58px; height: 24px;
      background: linear-gradient(#ef5c49,#c53d36); border: 3px solid #111; border-radius: 12px 15px 7px 7px;
    }
    .bb-toy-car .cab {
      position: absolute; left: 28px; top: 0; width: 27px; height: 18px;
      background: #8ad0e8; border: 3px solid #111; border-radius: 10px 10px 2px 2px;
    }
    .bb-toy-car .wheel,
    .bb-bear-car .wheel {
      position: absolute; border-radius: 50%; background: #222; border: 3px solid #090909;
      animation: bbWheelSpin .28s linear infinite;
    }
    .bb-toy-car .wheel { width: 16px; height: 16px; top: 27px; }
    .bb-toy-car .wheel.a { left: 12px; } .bb-toy-car .wheel.b { right: 12px; }
    .bb-toy-car .wheel::after,
    .bb-bear-car .wheel::after {
      content: ""; position: absolute; inset: 4px; border-radius: 50%; background: #8b8f93;
    }
    .bb-toy-car .antenna {
      position: absolute; right: 10px; top: -12px; width: 3px; height: 18px; background: #555; transform: rotate(12deg);
    }
    .bb-toy-car.bb-car-hit { animation: bbToyCarBump .34s ease-out 1; }
    @keyframes bbToyCarBump { 45% { transform: translateY(-13px) rotate(-12deg); } }
    @keyframes bbWheelSpin { to { transform: rotate(360deg); } }

    .bb-bear-car {
      position: absolute;
      width: 245px;
      height: 132px;
      z-index: 335;
      pointer-events: none;
      filter: drop-shadow(8px 10px 0 rgba(0,0,0,.28));
    }

    .bb-bear-car .car-body {
      position: absolute; left: 12px; top: 55px; width: 220px; height: 62px;
      background: linear-gradient(#f06b32,#bd3e25); border: 5px solid #111; border-radius: 25px 35px 15px 15px;
    }
    .bb-bear-car .hood {
      position: absolute; right: 1px; top: 67px; width: 74px; height: 39px;
      background: #d94f29; border: 5px solid #111; border-radius: 10px 27px 12px 7px;
    }
    .bb-bear-car .cabin {
      position: absolute; left: 58px; top: 18px; width: 106px; height: 62px;
      background: #78bdd6; border: 5px solid #111; border-radius: 28px 28px 4px 4px; overflow: hidden;
    }
    .bb-bear-car .windshield {
      position: absolute; right: 7px; top: 8px; width: 43px; height: 38px;
      background: rgba(199,239,250,.72); border-left: 4px solid #111; transform: skewX(-8deg);
    }
    .bb-bear-car .wheel { width: 41px; height: 41px; top: 99px; }
    .bb-bear-car .wheel.a { left: 35px; } .bb-bear-car .wheel.b { right: 35px; }
    .bb-bear-car .steering {
      position: absolute; right: 55px; top: 60px; width: 28px; height: 28px; border: 5px solid #1d1d1d; border-radius: 50%; z-index: 11;
    }
    .bb-bear-driver {
      position: absolute; left: 78px; top: 6px; width: 68px; height: 77px; z-index: 12;
    }
    .bb-bear-driver .bear-body {
      position: absolute; left: 12px; top: 40px; width: 44px; height: 38px;
      background: #85552e; border: 4px solid #312116; border-radius: 45%;
    }
    .bb-bear-driver .bear-head {
      position: absolute; left: 6px; top: 5px; width: 56px; height: 52px;
      background: #96643a; border: 4px solid #312116; border-radius: 50%; z-index: 4;
    }
    .bb-bear-driver .bear-head::before,
    .bb-bear-driver .bear-head::after {
      content: ""; position: absolute; top: -8px; width: 18px; height: 18px;
      background: #96643a; border: 4px solid #312116; border-radius: 50%; z-index: -1;
    }
    .bb-bear-driver .bear-head::before { left: 2px; }
    .bb-bear-driver .bear-head::after { right: 2px; }
    .bb-bear-driver .bear-muzzle {
      position: absolute; left: 15px; top: 25px; width: 25px; height: 18px;
      background: #c69568; border: 3px solid #312116; border-radius: 50%;
    }
    .bb-bear-driver .bear-muzzle::after {
      content: ""; position: absolute; left: 7px; top: 3px; width: 8px; height: 6px; border-radius: 50%; background: #251813;
    }
    .bb-bear-driver .bear-eye {
      position: absolute; top: 17px; width: 6px; height: 6px; border-radius: 50%; background: #111;
    }
    .bb-bear-driver .bear-eye.l { left: 12px; } .bb-bear-driver .bear-eye.r { right: 12px; }
    .bb-bear-driver .paw {
      position: absolute; right: -3px; top: 51px; width: 18px; height: 13px; background: #96643a; border: 3px solid #312116; border-radius: 50%; z-index: 14;
    }

    .bb-tire-smoke {
      position: absolute; width: 27px; height: 18px; border-radius: 50%; background: rgba(225,225,225,.8);
      z-index: 329; animation: bbSmoke .65s ease-out forwards;
    }
    @keyframes bbSmoke { to { transform: translate(var(--sx),-30px) scale(1.8); opacity: 0; } }

    /* =================================================
       HUD ICONS — CSS, not emoji substitutes.
    ================================================= */
    .bb-icon-wand,
    .bb-icon-lollipop,
    .bb-icon-crown,
    .bb-icon-claw,
    .bb-icon-foot,
    .bb-icon-dinohead,
    .bb-icon-remote,
    .bb-icon-bearwheel {
      position: relative;
      width: 34px;
      height: 34px;
      margin: auto;
    }
    .bb-icon-wand::before { content:""; position:absolute; left:15px; top:5px; width:4px; height:27px; background:#d8b5ef; border:1px solid #111; transform:rotate(28deg); }
    .bb-icon-wand::after { content:""; position:absolute; left:8px; top:0; width:12px; height:12px; background:#ffd9f2; border:2px solid #7b468e; transform:rotate(45deg); }
    .bb-icon-lollipop::before { content:""; position:absolute; left:6px; top:1px; width:21px; height:21px; border-radius:50%; background:#8d36c4; border:3px solid #361348; }
    .bb-icon-lollipop::after { content:""; position:absolute; left:15px; top:21px; width:5px; height:14px; background:#f0eee7; border:1px solid #555; }
    .bb-icon-crown::before { content:""; position:absolute; inset:5px 2px 4px; background:#ffd83d; border:2px solid #705116; clip-path:polygon(0 100%,0 38%,20% 62%,36% 8%,54% 61%,76% 18%,100% 52%,100% 100%); }
    .bb-icon-claw::before { content:""; position:absolute; left:3px; top:7px; width:27px; height:20px; border-top:4px solid #e9f6c4; border-radius:50%; box-shadow:0 7px 0 -1px #e9f6c4,0 14px 0 -1px #e9f6c4; transform:rotate(-18deg); }
    .bb-icon-foot::before { content:""; position:absolute; left:5px; top:5px; width:24px; height:23px; border-radius:55%; background:#69a653; border:3px solid #17371b; box-shadow:-7px 18px 0 -3px #69a653,7px 18px 0 -3px #69a653; }
    .bb-icon-dinohead::before { content:""; position:absolute; left:3px; top:8px; width:29px; height:20px; background:#69a653; border:3px solid #17371b; border-radius:45% 58% 45% 45%; }
    .bb-icon-dinohead::after { content:""; position:absolute; right:4px; top:23px; width:20px; height:8px; background:#f3e7d0; clip-path:polygon(0 0,100% 0,85% 100%,65% 0,45% 100%,25% 0); }
    .bb-icon-remote::before { content:""; position:absolute; left:8px; top:4px; width:18px; height:27px; background:#474e54; border:3px solid #111; border-radius:4px; }
    .bb-icon-remote::after { content:""; position:absolute; left:15px; top:10px; width:7px; height:7px; border-radius:50%; background:#e44a4a; box-shadow:0 10px 0 -1px #6bca61; }
    .bb-icon-bearwheel::before { content:""; position:absolute; left:1px; top:2px; width:22px; height:22px; border-radius:50%; background:#956239; border:3px solid #321f14; box-shadow:13px 12px 0 -5px #222; }
    .bb-icon-bearwheel::after { content:""; position:absolute; right:0; bottom:0; width:18px; height:18px; border-radius:50%; border:4px solid #222; box-shadow:inset 0 0 0 3px #888; }

    /* =================================================
       TODDLER VICTORY CELEBRATIONS
    ================================================= */
    .bb-toddler-alice-celeb { animation: bbAliceTwirl 1.05s ease-in-out 3 !important; }
    @keyframes bbAliceTwirl {
      0%,100% { transform: translateX(-50%) rotate(0deg) translateY(0); }
      28% { transform: translateX(-50%) rotate(-12deg) translateY(-18px); }
      55% { transform: translateX(-50%) rotate(12deg) translateY(-28px); }
      78% { transform: translateX(-50%) rotate(-8deg) translateY(-12px); }
    }
    .bb-celeb-spark {
      position: absolute; width: 13px; height: 13px; z-index: 985;
      background:#fff2a3; clip-path:polygon(50% 0,61% 37%,100% 50%,61% 63%,50% 100%,39% 63%,0 50%,39% 37%);
      animation:bbCelebSpark 1.25s ease-in-out infinite alternate;
    }
    @keyframes bbCelebSpark { to { transform:translateY(-22px) rotate(90deg) scale(1.25); filter:drop-shadow(0 0 7px #ff8cdf); } }

    .bb-leo-celeb-person { animation: bbLeoRoar .9s ease-in-out 5 !important; }
    @keyframes bbLeoRoar {
      0%,100% { transform: translateX(-50%) translateY(0) rotate(0); }
      45% { transform: translateX(-50%) translateY(-15px) rotate(-5deg); }
      65% { transform: translateX(-50%) translateY(-7px) rotate(5deg); }
    }
    .bb-baby-trex {
      position:absolute; left:60%; bottom:35px; width:104px; height:83px; z-index:982;
      transform-origin:bottom center; animation:bbBabyTrexRoar .9s ease-in-out 5;
    }
    .bb-baby-trex .body { position:absolute; left:29px; top:36px; width:52px; height:33px; background:#71aa59; border:4px solid #17391b; border-radius:48%; }
    .bb-baby-trex .head { position:absolute; right:0; top:15px; width:43px; height:31px; background:#7ab860; border:4px solid #17391b; border-radius:45% 55% 42% 48%; }
    .bb-baby-trex .jaw { position:absolute; right:-2px; top:30px; width:35px; height:11px; background:#639d4f; border:4px solid #17391b; border-radius:0 0 50% 50%; }
    .bb-baby-trex .tail { position:absolute; left:0; top:42px; width:41px; height:12px; background:#5a914c; border:4px solid #17391b; border-radius:65% 8% 8% 65%; }
    .bb-baby-trex .leg { position:absolute; top:65px; width:13px; height:18px; background:#558a49; border:3px solid #17391b; }
    .bb-baby-trex .leg.a { left:41px; } .bb-baby-trex .leg.b { left:65px; }
    .bb-baby-trex .eye { position:absolute; right:10px; top:9px; width:6px; height:6px; border-radius:50%; background:#ffe45e; border:2px solid #111; }
    @keyframes bbBabyTrexRoar { 0%,100%{transform:translateY(0) rotate(0)} 45%{transform:translateY(-18px) rotate(5deg)} 65%{transform:translateY(-8px) rotate(-5deg)} }

    .bb-celeb-bear-car {
      left:50%; bottom:25px; transform:translateX(-50%) scale(1.05); z-index:986;
      animation:bbCelebCarBounce .72s ease-in-out 7;
    }
    .bb-celeb-barrett {
      position:absolute; right:49px; top:12px; width:78px; height:96px; transform:scale(.66); transform-origin:top center; z-index:15;
    }
    .bb-celeb-barrett .barrett-model { position:absolute!important; left:0!important; top:0!important; }
    .bb-celeb-barrett .face,
    .bb-celeb-barrett .barrett-hair,
    .bb-celeb-bear-car .bear-head { animation:bbToddlerNod .55s ease-in-out 8; transform-origin:center bottom; }
    @keyframes bbToddlerNod { 0%,100%{transform:rotate(0deg) translateY(0)} 50%{transform:rotate(12deg) translateY(3px)} }
    @keyframes bbCelebCarBounce { 0%,100%{transform:translateX(-50%) scale(1.05) translateY(0)} 50%{transform:translateX(-50%) scale(1.05) translateY(-8px)} }
  `;
  document.head.appendChild(style);

  ["alice", "leo", "barrett"].forEach(character => {
    if (!BASE_ROSTER.includes(character)) BASE_ROSTER.push(character);

    if (!ALL_ROSTER.includes(character)) {
      const martinIndex = ALL_ROSTER.indexOf("martin");
      ALL_ROSTER.splice(martinIndex >= 0 ? martinIndex : ALL_ROSTER.length, 0, character);
    }
  });

  STATS.alice = { hp: 100, basic: 5.5, range: 102, recovery: 480, specialDamage: 13, ultimateDamage: 27 };
  STATS.leo = { hp: 100, basic: 5.5, range: 96, recovery: 520, specialDamage: 13, ultimateDamage: 27 };
  STATS.barrett = { hp: 100, basic: 5, range: 88, recovery: 720, specialDamage: 13, ultimateDamage: 28 };

  const previousDisplayNameToddler = displayName;
  displayName = function(character) {
    if (character === "alice") return "ALICE";
    if (character === "leo") return "LEO";
    if (character === "barrett") return "BARRETT";
    return previousDisplayNameToddler(character);
  };

  function toddlerFace() {
    return `<div class="face"><div class="eye eye-left"></div><div class="eye eye-right"></div><div class="mouth"></div></div>`;
  }

  const previousCharacterHTMLToddler = characterHTML;
  characterHTML = function(character) {
    if (character === "alice") {
      return `<div class="pixel-person bb-toddler alice-model"><div class="toddler-hair alice-hair"></div>${toddlerFace()}<div class="toddler-shirt alice-shirt"></div><div class="arm left-arm"></div><div class="arm right-arm weapon-arm"><div class="alice-wand"></div></div><div class="leg left-leg alice-pants"></div><div class="leg right-leg alice-pants"></div><div class="white-shoe left-shoe"></div><div class="white-shoe right-shoe"></div></div>`;
    }

    if (character === "leo") {
      return `<div class="pixel-person bb-toddler leo-model"><div class="toddler-hair leo-hair"></div>${toddlerFace()}<div class="toddler-shirt leo-shirt"></div><div class="arm left-arm"><div class="leo-claw-hand"></div></div><div class="arm right-arm weapon-arm"><div class="leo-claw-hand"></div></div><div class="leg left-leg leo-pants"></div><div class="leg right-leg leo-pants"></div><div class="dark-shoe left-shoe"></div><div class="dark-shoe right-shoe"></div></div>`;
    }

    if (character === "barrett") {
      return `<div class="pixel-person bb-toddler barrett-model"><div class="toddler-hair barrett-hair"></div>${toddlerFace()}<div class="toddler-shirt barrett-shirt"></div><div class="arm left-arm"></div><div class="arm right-arm weapon-arm"><div class="barrett-remote"></div></div><div class="leg left-leg barrett-shorts"></div><div class="leg right-leg barrett-shorts"></div><div class="white-shoe left-shoe"></div><div class="white-shoe right-shoe"></div></div>`;
    }

    return previousCharacterHTMLToddler(character);
  };

  const previousSpecialIconToddler = specialIconHTML;
  specialIconHTML = function(character) {
    if (character === "alice") return '<div class="bb-icon-lollipop"></div>';
    if (character === "leo") return '<div class="bb-icon-foot"></div>';
    if (character === "barrett") return '<div class="bb-icon-remote"></div>';
    return previousSpecialIconToddler(character);
  };

  const previousUltimateIconToddler = ultimateIconHTML;
  ultimateIconHTML = function(character) {
    if (character === "alice") return '<div class="bb-icon-crown"></div>';
    if (character === "leo") return '<div class="bb-icon-dinohead"></div>';
    if (character === "barrett") return '<div class="bb-icon-bearwheel"></div>';
    return previousUltimateIconToddler(character);
  };

  if (typeof bbMeleeIconHTML === "function") {
    const previousMeleeIconToddler = bbMeleeIconHTML;
    bbMeleeIconHTML = function(character) {
      if (character === "alice") return '<div class="bb-icon-wand"></div>';
      if (character === "leo") return '<div class="bb-icon-claw"></div>';
      if (character === "barrett") return '<div class="bb-icon-remote"></div>';
      return previousMeleeIconToddler(character);
    };
  }

  const fighterSelectToddler = document.querySelector(".fighter-select");

  function createToddlerCard(character, name, description) {
    if (!fighterSelectToddler) return;
    if (document.querySelector(`.fighter-card[data-character="${character}"]`)) return;

    const card = document.createElement("button");
    card.className = "fighter-card";
    card.dataset.character = character;
    card.innerHTML = `<div class="card-model-holder" data-preview="${character}"></div><strong>${name}</strong><small>${description}</small>`;

    if (martinCard && martinCard.parentElement === fighterSelectToddler) martinCard.before(card);
    else fighterSelectToddler.appendChild(card);
  }

  createToddlerCard("alice", "ALICE", "Fairy Wand • Grape Lollipop • Fairy Princess");
  createToddlerCard("leo", "LEO", "Dino Claws • Dino Stomp • Dino Stampede");
  createToddlerCard("barrett", "BARRETT", "Headbutt • RC Car • Bear Driver");

  function normalizeToddlerSelection() {
    document.querySelectorAll(".fighter-card").forEach(card => {
      card.classList.toggle("p1-selected", card.dataset.character === player1Character);
      card.classList.toggle("p2-selected", gameMode === "2P" && card.dataset.character === player2Character);
    });
  }

  if (fighterSelectToddler) {
    fighterSelectToddler.addEventListener("click", event => {
      const card = event.target.closest(".fighter-card");
      if (!card || !fighterSelectToddler.contains(card)) return;
      const character = card.dataset.character;
      if (!TODDLERS.has(character)) return;

      if (gameMode === "1P") {
        player1Character = character;
        selectionText.textContent = "PLAYER 1: " + displayName(character);
        mapSelectButton.disabled = false;
      } else if (selectionStage === 1) {
        player1Character = character;
        selectionStage = 2;
        selectionPrompt.textContent = "PLAYER 2 — CHOOSE YOUR FIGHTER";
        selectionText.textContent = "PLAYER 1: " + displayName(player1Character) + "  |  PLAYER 2: NOT SELECTED";
      } else {
        player2Character = character;
        selectionText.textContent = "PLAYER 1: " + displayName(player1Character) + "  |  PLAYER 2: " + displayName(player2Character);
        mapSelectButton.disabled = false;
      }

      setTimeout(normalizeToddlerSelection, 0);
    });
  }

  function distanceBetween(a, b) { return Math.abs(a.x - b.x); }
  function verticalBetween(a, b) { return Math.abs(a.y - b.y); }

  function fairyBurstAt(x, bottom, count = 7) {
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "effect bb-fairy-particle";
      p.style.left = x + "px";
      p.style.bottom = bottom + "px";
      const angle = (Math.PI * 2 * i) / count + Math.random() * .28;
      const radius = 24 + Math.random() * 32;
      p.style.setProperty("--dx", Math.cos(angle) * radius + "px");
      p.style.setProperty("--dy", Math.sin(angle) * radius + "px");
      effects.appendChild(p);
      setTimeout(() => p.remove(), 620);
    }
  }

  function magicBurst(target) {
    const b = document.createElement("div");
    b.className = "effect bb-magic-burst";
    b.style.left = (target.x + 38) + "px";
    b.style.bottom = (88 + target.y) + "px";
    effects.appendChild(b);
    fairyBurstAt(target.x + 40, 112 + target.y, 14);
    setTimeout(() => b.remove(), 560);
  }

  function shakeArena(strength = 9, duration = 360) {
    try {
      arena.animate([
        { transform: "translate(0,0)" },
        { transform: `translate(${-strength}px,${Math.round(strength*.35)}px)` },
        { transform: `translate(${strength}px,${-Math.round(strength*.25)}px)` },
        { transform: `translate(${-Math.round(strength*.6)}px,0)` },
        { transform: "translate(0,0)" }
      ], { duration, easing: "steps(4,end)" });
    } catch (_) {}
  }

  function recoilTarget(target, direction, distance = 22) {
    const motion = target.fighter.querySelector(".motion-layer") || target.fighter;
    try {
      motion.animate([
        { transform: "translateX(0)" },
        { transform: `translateX(${direction * distance}px)`, offset: .45 },
        { transform: "translateX(0)" }
      ], { duration: 300, easing: "ease-out" });
    } catch (_) {}
  }

  function aliceBasic(attacker, target) {
    if (!canAct(attacker) || attacker.attackCooldown) return;
    const stats = STATS.alice;
    attacker.attackCooldown = true;
    const model = attacker.fighter.querySelector(".alice-model");
    const arm = model?.querySelector(".weapon-arm");

    if (arm) {
      arm.animate([
        { transform: "rotate(0deg)" },
        { transform: "rotate(-44deg)", offset: .34 },
        { transform: "rotate(42deg)", offset: .68 },
        { transform: "rotate(3deg)" }
      ], { duration: 430, easing: "cubic-bezier(.2,.72,.2,1)" });
    }

    setTimeout(() => {
      if (roundOver) return;
      if (distanceBetween(attacker, target) <= stats.range && verticalBetween(attacker, target) < 75) {
        dealDamage(attacker, target, stats.basic, { type: "normal" });
        fairyBurstAt(target.x + 38, 110 + target.y, 6);
      }
    }, 245);

    setTimeout(() => { attacker.attackCooldown = false; }, stats.recovery);
  }

  function clawTrail(attacker, index) {
    const trail = document.createElement("div");
    trail.className = "effect bb-claw-trail";
    trail.innerHTML = "<i></i><i></i><i></i>";
    trail.style.left = (attacker.x + (attacker.facing === 1 ? 42 : -16)) + "px";
    trail.style.bottom = (78 + attacker.y + index * 8) + "px";
    if (attacker.facing === -1) {
      trail.style.setProperty("--trail-start", "12px");
      trail.style.setProperty("--trail-end", "-18px");
      trail.querySelectorAll("i").forEach(line => { line.style.transform = "scaleX(-1) rotate(16deg)"; });
    }
    effects.appendChild(trail);
    setTimeout(() => trail.remove(), 390);
  }

  function leoBasic(attacker, target) {
    if (!canAct(attacker) || attacker.attackCooldown) return;
    const stats = STATS.leo;
    attacker.attackCooldown = true;
    const model = attacker.fighter.querySelector(".leo-model");
    const left = model?.querySelector(".left-arm");
    const right = model?.querySelector(".right-arm");

    if (left) left.animate([{transform:"rotate(0deg)"},{transform:"rotate(-48deg)",offset:.28},{transform:"rotate(36deg)",offset:.56},{transform:"rotate(0deg)"}],{duration:410,easing:"ease-out"});
    if (right) right.animate([{transform:"rotate(0deg)"},{transform:"rotate(44deg)",offset:.44},{transform:"rotate(-38deg)",offset:.72},{transform:"rotate(0deg)"}],{duration:440,easing:"ease-out"});

    const perHit = stats.basic / 2;
    [135, 285].forEach((delay, index) => {
      setTimeout(() => {
        if (roundOver) return;
        clawTrail(attacker, index);
        if (distanceBetween(attacker, target) <= stats.range && verticalBetween(attacker, target) < 75) {
          dealDamage(attacker, target, perHit, { type: "normal" });
          if (index === 1) {
            attacker.ultimate = Math.max(0, attacker.ultimate - 14);
            target.ultimate = Math.max(0, target.ultimate - 7);
            updateHUD();
          }
        }
      }, delay);
    });

    setTimeout(() => { attacker.attackCooldown = false; }, stats.recovery);
  }

  function barrettBasic(attacker, target) {
    if (!canAct(attacker) || attacker.attackCooldown) return;
    const stats = STATS.barrett;
    attacker.attackCooldown = true;
    attacker.stunned = true;
    const model = attacker.fighter.querySelector(".barrett-model");
    model?.classList.add("bb-headbutt-run");

    let steps = 0;
    const stepLoop = setInterval(() => {
      if (roundOver || steps >= 4) { clearInterval(stepLoop); return; }
      if (distanceBetween(attacker, target) > 64) {
        attacker.x += attacker.facing * 9;
        updatePositions();
      }
      steps++;
    }, 68);

    setTimeout(() => {
      if (roundOver) return;
      const inRange = distanceBetween(attacker, target) <= stats.range;
      const verticalOK = verticalBetween(attacker, target) < 65;
      if (inRange && verticalOK) {
        const blocked = target.blocking && isFacingAttacker(target, attacker);
        dealDamage(attacker, target, stats.basic, { type: "normal" });
        recoilTarget(target, attacker.facing, 18);
        if (!blocked && !target.stunned) stunTarget(target, 500);

        setTimeout(() => {
          attacker.x -= attacker.facing * 22;
          updatePositions();
          try {
            model?.animate([
              { transform: "translateX(0) rotate(0deg)" },
              { transform: `translateX(${-attacker.facing * 12}px) rotate(${-attacker.facing * 10}deg)` },
              { transform: "translateX(0) rotate(0deg)" }
            ], { duration: 300, easing: "ease-out" });
          } catch (_) {}
        }, 45);
      }
    }, 330);

    setTimeout(() => { attacker.stunned = false; model?.classList.remove("bb-headbutt-run"); }, 650);
    setTimeout(() => { attacker.attackCooldown = false; }, stats.recovery);
  }

  const previousBasicAttackToddler = basicAttack;
  basicAttack = function(attacker, target) {
    if (attacker.character === "alice") return aliceBasic(attacker, target);
    if (attacker.character === "leo") return leoBasic(attacker, target);
    if (attacker.character === "barrett") return barrettBasic(attacker, target);
    return previousBasicAttackToddler(attacker, target);
  };

  function grapeMarkup() { return '<div class="bb-grape-candy"></div><div class="bb-grape-stick"></div>'; }

  function aliceSpecial(attacker, target) {
    addComicText("GRAPE LOLLIPOP!", "purple-text", 1800);
    const model = attacker.fighter.querySelector(".alice-model");
    const arm = model?.querySelector(".weapon-arm");
    const wand = model?.querySelector(".alice-wand");
    if (wand) wand.style.visibility = "hidden";

    const held = document.createElement("div");
    held.className = "bb-grape-held";
    held.innerHTML = grapeMarkup();
    if (arm) arm.appendChild(held);

    if (arm) arm.animate([{transform:"rotate(0deg)"},{transform:"rotate(-24deg)",offset:.35},{transform:"rotate(42deg)",offset:.72},{transform:"rotate(7deg)"}],{duration:650,easing:"ease-out"});

    setTimeout(() => {
      held.remove();
      const lollipop = document.createElement("div");
      lollipop.className = "effect bb-grape-projectile";
      lollipop.innerHTML = grapeMarkup();
      lollipop.style.bottom = (83 + attacker.y) + "px";
      const direction = attacker.facing;
      lollipop.animate([{transform:"rotate(0deg)"},{transform:`rotate(${direction * 1440}deg)`}],{duration:900,iterations:Infinity,easing:"linear"});

      moveProjectile(lollipop, attacker, target, 11, 37, () => {
        dealDamage(attacker, target, STATS.alice.specialDamage, { type: "special" });
        magicBurst(target);
      }, "mid");

      setTimeout(() => { if (wand) wand.style.visibility = "visible"; }, 150);
    }, 500);

    setTimeout(() => { held.remove(); if (wand) wand.style.visibility = "visible"; }, 1050);
  }

  function leoSpecial(attacker, target) {
    addComicText("DINO STOMP!", "green-text", 1700);
    const model = attacker.fighter.querySelector(".leo-model");
    try { model?.animate([{transform:"translateY(0)"},{transform:"translateY(-20px)",offset:.42},{transform:"translateY(4px)",offset:.76},{transform:"translateY(0)"}],{duration:680,easing:"ease-out"}); } catch (_) {}

    setTimeout(() => {
      const foot = document.createElement("div");
      foot.className = "effect bb-dino-foot";
      foot.innerHTML = '<div class="toe"></div>';
      foot.style.left = (attacker.x + (attacker.facing === 1 ? 28 : -18)) + "px";
      foot.style.bottom = "28px";
      if (attacker.facing === -1) foot.style.transform = "scaleX(-1)";
      effects.appendChild(foot);

      const wave = document.createElement("div");
      wave.className = "effect bb-stomp-wave";
      wave.style.left = (attacker.x + 42) + "px";
      wave.style.bottom = "27px";
      effects.appendChild(wave);
      shakeArena(4, 250);

      if (distanceBetween(attacker, target) <= 150 && target.y < 55) {
        dealDamage(attacker, target, STATS.leo.specialDamage, { type: "special" });
        recoilTarget(target, attacker.facing, 21);
      }
      setTimeout(() => { foot.remove(); wave.remove(); }, 620);
    }, 410);
  }

  function toyCarHTML() {
    return `<div class="body"></div><div class="cab"></div><div class="wheel a"></div><div class="wheel b"></div><div class="antenna"></div>`;
  }

  function pressRemote(attacker, duration = 430) {
    const arm = attacker.fighter.querySelector(".barrett-model .weapon-arm");
    if (!arm) return;
    arm.animate([{transform:"rotate(0deg)"},{transform:"rotate(-28deg)",offset:.4},{transform:"rotate(-20deg)",offset:.7},{transform:"rotate(0deg)"}],{duration,easing:"ease-out"});
  }

  function barrettSpecial(attacker, target) {
    addComicText("RC RAMPAGE!", "red-text", 1750);
    pressRemote(attacker, 520);

    setTimeout(() => {
      const car = document.createElement("div");
      car.className = "effect bb-toy-car";
      car.innerHTML = toyCarHTML();
      const direction = attacker.facing;
      let x = attacker.x + (direction === 1 ? 40 : -58);
      let hit = false;
      let speed = 13 * direction;
      car.style.left = x + "px";
      car.style.bottom = "26px";
      if (direction === -1) car.style.transform = "scaleX(-1)";
      effects.appendChild(car);

      const loop = setInterval(() => {
        if (roundOver || !car.isConnected) { clearInterval(loop); car.remove(); return; }
        x += speed;
        car.style.left = x + "px";

        if (!hit && Math.abs((x + 32) - (target.x + 38)) < 42 && target.y < 55) {
          hit = true;
          dealDamage(attacker, target, STATS.barrett.specialDamage, { type: "special" });
          recoilTarget(target, direction, 18);
          const carBody = car.querySelector(".body");
          const carCab = car.querySelector(".cab");
          [carBody, carCab].filter(Boolean).forEach(part => {
            try { part.animate([{transform:"translateY(0)"},{transform:"translateY(-11px) rotate(-8deg)"},{transform:"translateY(0)"}],{duration:340,easing:"ease-out"}); } catch (_) {}
          });
          speed *= .82;
        }

        if (x < -110 || x > arena.clientWidth + 110) { clearInterval(loop); car.remove(); }
      }, 28);
    }, 390);
  }

  const previousSpecialAttackToddler = specialAttack;
  specialAttack = function(attacker, target) {
    if (!TODDLERS.has(attacker.character)) return previousSpecialAttackToddler(attacker, target);
    if (!canAct(attacker) || attacker.specialCooldown) return;
    beginSpecialCooldown(attacker);
    if (attacker.character === "alice") aliceSpecial(attacker, target);
    else if (attacker.character === "leo") leoSpecial(attacker, target);
    else barrettSpecial(attacker, target);
  };

  function addFairyPrincessAccessories(model) {
    if (!model) return [];
    const wingSet = document.createElement("div");
    wingSet.className = "bb-fairy-wing-set";
    wingSet.innerHTML = '<div class="bb-fairy-wing l"></div><div class="bb-fairy-wing r"></div>';
    const crown = document.createElement("div");
    crown.className = "bb-princess-crown";
    model.insertBefore(wingSet, model.firstChild);
    model.appendChild(crown);
    return [wingSet, crown];
  }

  function aliceUltimate(attacker, target) {
    actionLock = true;
    addComicText("FAIRY PRINCESS!", "purple-text", 3000);
    const model = attacker.fighter.querySelector(".alice-model");
    const accessories = addFairyPrincessAccessories(model);
    let targetRing = null;

    const sparkleLoop = setInterval(() => {
      if (roundOver || !model?.isConnected) return;
      fairyBurstAt(attacker.x + 38, 96 + attacker.y, 4);
    }, 320);

    try { model?.animate([{filter:"brightness(1)",transform:"translateY(0)"},{filter:"brightness(1.5) drop-shadow(0 0 12px #ff8ee9)",transform:"translateY(-13px)",offset:.5},{filter:"brightness(1.1)",transform:"translateY(0)"}],{duration:1150,easing:"ease-in-out"}); } catch (_) {}

    setTimeout(() => {
      if (roundOver) return;
      targetRing = document.createElement("div");
      targetRing.className = "effect bb-fairy-target-ring";
      targetRing.style.left = (target.x - 16) + "px";
      targetRing.style.bottom = (32 + target.y) + "px";
      effects.appendChild(targetRing);
    }, 650);

    setTimeout(() => {
      if (roundOver) return;
      const giant = document.createElement("div");
      giant.className = "effect bb-giant-grape";
      giant.innerHTML = grapeMarkup();
      const direction = attacker.facing || 1;
      const startX = target.x + (direction === 1 ? 145 : -175);
      const impactX = target.x - 18;
      const startBottom = arena.clientHeight + 70;
      const impactBottom = 42 + target.y;
      const dx = impactX - startX;
      const dy = startBottom - impactBottom;
      giant.style.left = startX + "px";
      giant.style.bottom = startBottom + "px";
      giant.style.transform = `rotate(${direction === 1 ? 28 : -28}deg)`;
      effects.appendChild(giant);

      giant.animate([
        { transform: `translate(0,0) rotate(${direction === 1 ? 28 : -28}deg)`, opacity: .15 },
        { transform: `translate(${dx * .42}px,${dy * .43}px) rotate(${direction === 1 ? 8 : -8}deg)`, opacity: 1, offset: .42 },
        { transform: `translate(${dx}px,${dy}px) rotate(${direction === 1 ? -18 : 18}deg)`, opacity: 1 }
      ], { duration: 1180, easing: "cubic-bezier(.22,.38,.24,1)", fill: "forwards" });

      setTimeout(() => {
        if (!roundOver) {
          dealDamage(attacker, target, STATS.alice.ultimateDamage, { type: "ultimate", ignoreBlock: true });
          magicBurst(target);
          shakeArena(11, 430);
          recoilTarget(target, direction, 36);
          try { target.fighter.animate([{filter:"brightness(2)"},{filter:"brightness(2)"},{filter:"brightness(1)"}],{duration:190,easing:"steps(2,end)"}); } catch (_) {}
        }
        targetRing?.remove();
        setTimeout(() => giant.remove(), 260);
      }, 1160);
    }, 1050);

    setTimeout(() => {
      clearInterval(sparkleLoop);
      targetRing?.remove();
      accessories.forEach(el => el.remove());
      actionLock = false;
    }, 2750);
  }

  function dinoMarkup(kind) {
    if (kind === "trike") return `<div class="tail"></div><div class="body"></div><div class="leg a"></div><div class="leg b"></div><div class="head"><div class="frill"></div><div class="horn a"></div><div class="horn b"></div><div class="eye"></div></div>`;
    if (kind === "trex") return `<div class="tail"></div><div class="body"></div><div class="neck"></div><div class="leg a"></div><div class="leg b"></div><div class="head"><div class="eye"></div><div class="jaw"><div class="teeth"></div></div></div>`;
    return `<div class="tail"><div class="club"></div></div><div class="body"></div><div class="armor"></div><div class="leg a"></div><div class="leg b"></div><div class="head"><div class="eye"></div></div>`;
  }

  function runStampedeDino(attacker, target, kind, spawnDelay, damage) {
    setTimeout(() => {
      if (roundOver) return;
      const direction = attacker.facing || 1;
      const dino = document.createElement("div");
      dino.className = `effect bb-leo-dino bb-${kind}`;
      dino.innerHTML = dinoMarkup(kind);
      const startX = direction === 1 ? -220 : arena.clientWidth + 220;
      const impactX = direction === 1 ? target.x - 105 : target.x + 5;
      const exitX = direction === 1 ? arena.clientWidth + 230 : -240;
      const travelDuration = kind === "anky" ? 850 : 820;
      dino.style.left = startX + "px";
      if (direction === -1) dino.style.transform = "scaleX(-1)";
      effects.appendChild(dino);

      dino.animate([{left:startX+"px"},{left:impactX+"px"}],{duration:travelDuration,easing:"cubic-bezier(.15,.65,.2,1)",fill:"forwards"});

      setTimeout(() => {
        if (roundOver || !dino.isConnected) return;
        if (kind === "anky") dino.classList.add("bb-tail-smash");
        dealDamage(attacker, target, damage, { type: "ultimate", ignoreBlock: true });
        recoilTarget(target, direction, kind === "anky" ? 48 : 30);
        shakeArena(kind === "anky" ? 9 : 5, kind === "anky" ? 380 : 260);
        dino.animate([{left:impactX+"px"},{left:exitX+"px"}],{duration:420,easing:"ease-in",fill:"forwards"});
        setTimeout(() => dino.remove(), 440);
      }, travelDuration - 25);
    }, spawnDelay);
  }

  function leoUltimate(attacker, target) {
    actionLock = true;
    addComicText("DINO STAMPEDE!", "green-text", 5200);
    runStampedeDino(attacker, target, "trike", 520, 9);
    runStampedeDino(attacker, target, "trex", 2220, 9);
    runStampedeDino(attacker, target, "anky", 3920, 9);
    setTimeout(() => { actionLock = false; }, 5480);
  }

  function bearDriverMarkup(includeBarrett = false) {
    return `<div class="car-body"></div><div class="hood"></div><div class="cabin"><div class="windshield"></div></div><div class="wheel a"></div><div class="wheel b"></div><div class="steering"></div><div class="bb-bear-driver"><div class="bear-body"></div><div class="bear-head"><div class="bear-eye l"></div><div class="bear-eye r"></div><div class="bear-muzzle"></div></div><div class="paw"></div></div>${includeBarrett ? '<div class="bb-celeb-barrett"></div>' : ''}`;
  }

  function tireSmoke(x, bottom, direction) {
    for (let i = 0; i < 4; i++) {
      const s = document.createElement("div");
      s.className = "effect bb-tire-smoke";
      s.style.left = (x + i * 13) + "px";
      s.style.bottom = (bottom + i * 3) + "px";
      s.style.setProperty("--sx", (-direction * (25 + i * 10)) + "px");
      effects.appendChild(s);
      setTimeout(() => s.remove(), 720);
    }
  }

  function barrettUltimate(attacker, target) {
    actionLock = true;
    addComicText("BEAR DRIVER!", "red-text", 3000);
    pressRemote(attacker, 680);

    setTimeout(() => {
      if (roundOver) return;
      const car = document.createElement("div");
      car.className = "effect bb-bear-car";
      car.innerHTML = bearDriverMarkup(false);
      const direction = attacker.facing || 1;
      const startX = direction === 1 ? -285 : arena.clientWidth + 285;
      const impactX = direction === 1 ? target.x - 125 : target.x - 10;
      const exitX = direction === 1 ? arena.clientWidth + 285 : -300;
      car.style.left = startX + "px";
      car.style.bottom = "24px";
      if (direction === -1) car.style.transform = "scaleX(-1)";
      effects.appendChild(car);
      tireSmoke(direction === 1 ? 0 : arena.clientWidth - 80, 28, direction);

      car.animate([{left:startX+"px"},{left:impactX+"px"}],{duration:1120,easing:"cubic-bezier(.12,.72,.18,1)",fill:"forwards"});

      setTimeout(() => {
        if (!roundOver) {
          dealDamage(attacker, target, STATS.barrett.ultimateDamage, { type: "ultimate", ignoreBlock: true });
          shakeArena(13, 470);
          recoilTarget(target, direction, 58);
          target.x += direction * 72;
          updatePositions();
          tireSmoke(target.x, 30, direction);
        }
        car.animate([{left:impactX+"px"},{left:exitX+"px"}],{duration:720,easing:"cubic-bezier(.35,.5,.55,1)",fill:"forwards"});
        setTimeout(() => car.remove(), 750);
      }, 1090);
    }, 650);

    setTimeout(() => { actionLock = false; }, 2750);
  }

  const previousUltimateAttackToddler = ultimateAttack;
  ultimateAttack = function(attacker, target) {
    if (!TODDLERS.has(attacker.character)) return previousUltimateAttackToddler(attacker, target);
    if (!canAct(attacker) || attacker.ultimate < 100) return;
    attacker.ultimate = 0;
    updateHUD();
    if (attacker.character === "alice") aliceUltimate(attacker, target);
    else if (attacker.character === "leo") leoUltimate(attacker, target);
    else barrettUltimate(attacker, target);
  };

  function addCelebrationSparkles(stage) {
    for (let i = 0; i < 22; i++) {
      const s = document.createElement("div");
      s.className = "bb-celeb-spark";
      s.style.left = (15 + Math.random() * 70) + "%";
      s.style.bottom = (45 + Math.random() * 190) + "px";
      s.style.animationDelay = (Math.random() * .9) + "s";
      stage.appendChild(s);
    }
  }

  function enhanceAliceCelebration(stage) {
    const model = stage.querySelector(".alice-model");
    const person = model?.closest(".bb4-person");
    if (!model || !person) return;
    person.classList.remove("bb4-bounce");
    person.classList.add("bb-toddler-alice-celeb");
    person.style.left = "50%";
    addFairyPrincessAccessories(model);
    addCelebrationSparkles(stage);

    setTimeout(() => {
      const arm = model.querySelector(".weapon-arm");
      if (!arm || !model.isConnected) return;
      const lollipop = document.createElement("div");
      lollipop.className = "bb-grape-held";
      lollipop.style.transform = "scale(1.18) rotate(-8deg)";
      lollipop.innerHTML = grapeMarkup();
      arm.appendChild(lollipop);
      const wand = model.querySelector(".alice-wand");
      if (wand) wand.style.visibility = "hidden";
    }, 1650);
  }

  function babyTrexMarkup() {
    return `<div class="tail"></div><div class="body"></div><div class="leg a"></div><div class="leg b"></div><div class="head"><div class="eye"></div><div class="jaw"></div></div>`;
  }

  function enhanceLeoCelebration(stage) {
    const model = stage.querySelector(".leo-model");
    const person = model?.closest(".bb4-person");
    if (!model || !person) return;
    person.classList.remove("bb4-bounce");
    person.classList.add("bb-leo-celeb-person");
    person.style.left = "40%";

    const baby = document.createElement("div");
    baby.className = "bb-baby-trex";
    baby.innerHTML = babyTrexMarkup();
    baby.style.opacity = "0";
    baby.style.animation = "none";
    stage.appendChild(baby);

    setTimeout(() => {
      if (!baby.isConnected || !person.isConnected) return;
      baby.style.opacity = "1";
      baby.style.animation = "bbBabyTrexRoar .9s ease-in-out 4";
      person.style.animation = "none";
      void person.offsetWidth;
      person.style.animation = "bbLeoRoar .9s ease-in-out 4";
    }, 850);
  }

  function enhanceBarrettCelebration(stage) {
    const model = stage.querySelector(".barrett-model");
    const person = model?.closest(".bb4-person");
    if (!model || !person) return;
    person.remove();

    const car = document.createElement("div");
    car.className = "bb-bear-car bb-celeb-bear-car";
    car.innerHTML = bearDriverMarkup(true);
    stage.appendChild(car);

    const seat = car.querySelector(".bb-celeb-barrett");
    if (seat) {
      seat.innerHTML = characterHTML("barrett");
      const barrett = seat.querySelector(".barrett-model");
      if (barrett) {
        const crown = document.createElement("div");
        crown.className = "bb-king-crown";
        barrett.appendChild(crown);
      }
    }
  }

  function enhanceToddlerCelebration(stage) {
    if (!stage || stage.dataset.toddlerEnhanced === "1") return;
    stage.dataset.toddlerEnhanced = "1";
    if (stage.querySelector(".alice-model")) enhanceAliceCelebration(stage);
    else if (stage.querySelector(".leo-model")) enhanceLeoCelebration(stage);
    else if (stage.querySelector(".barrett-model")) enhanceBarrettCelebration(stage);
  }

  if (effects && typeof MutationObserver === "function") {
    const celebrationObserver = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (!node.classList.contains("bb4-victory")) continue;
          setTimeout(() => enhanceToddlerCelebration(node), 0);
        }
      }
    });
    celebrationObserver.observe(effects, { childList: true });
  }

  renderPreviews();
  generateTitleMatchup();
  normalizeToddlerSelection();
  if (typeof bbRefreshMeleeHud === "function") bbRefreshMeleeHud();
})();
