/* =====================================================
   BLOODLINE BRAWL — TODDLER GROUND / BARRETT / BEAR POLISH V3
   Late additive visual fixes only.
   - Ground-align Alice, Leo and Barrett in combat
   - Center their smaller bodies on the normal fighter collision anchor
   - Separate Barrett's mouth from his eyes
   - Make Barrett's bear driver read more clearly as a brown bear
===================================================== */

(() => {
  if (window.__bbToddlerGroundBearPolishV3Loaded) return;
  window.__bbToddlerGroundBearPolishV3Loaded = true;

  const style = document.createElement("style");
  style.textContent = `
    /* =================================================
       COMBAT GROUND ALIGNMENT

       The arena fighter shell is 205px tall. Adult models are 185px,
       so their feet naturally land about 20px above the shell bottom.
       The toddlers were still flowing from the TOP of that same shell,
       which made Alice/Leo float and made tiny Barrett float even higher.
       Anchor the toddler art to the same 20px foot baseline instead.
    ================================================= */
    .fight-character .alice-model,
    .fight-character .leo-model,
    .fight-character .barrett-model {
      position: absolute !important;
      top: auto !important;
      bottom: 20px !important;
      margin: 0 !important;
    }

    /* Center each smaller body on the normal 110px fighter/collision shell. */
    .fight-character .alice-model,
    .fight-character .leo-model {
      left: 12px !important;
    }

    .fight-character .barrett-model {
      left: 16px !important;
    }

    /* =================================================
       BARRETT FACE
       Keep the eyes clearly above the mouth on his extra-short face.
    ================================================= */
    .barrett-model .eye {
      top: 8px !important;
      height: 6px !important;
    }

    .barrett-model .mouth {
      left: 50% !important;
      bottom: 2px !important;
      width: 13px !important;
      height: 5px !important;
      transform: translateX(-50%) !important;
    }

    /* =================================================
       BEAR DRIVER — STRONGER BEAR SILHOUETTE / FACE
       Keeps the same car and attack timing; this is art-only.
    ================================================= */
    .bb-bear-driver {
      left: 76px !important;
      top: 2px !important;
      width: 74px !important;
      height: 82px !important;
    }

    .bb-bear-driver .bear-body {
      left: 7px !important;
      top: 42px !important;
      width: 60px !important;
      height: 43px !important;
      background: linear-gradient(#80502e,#60391f) !important;
      border: 4px solid #2d1b12 !important;
      border-radius: 48% 48% 34% 34% !important;
      box-shadow: inset 0 -6px 0 rgba(48,25,14,.16) !important;
    }

    .bb-bear-driver .bear-body::after {
      content: "";
      position: absolute;
      left: 18px;
      top: 9px;
      width: 24px;
      height: 27px;
      border-radius: 48%;
      background: #b77f50;
      opacity: .7;
    }

    .bb-bear-driver .bear-head {
      left: 4px !important;
      top: 1px !important;
      width: 62px !important;
      height: 57px !important;
      background:
        radial-gradient(circle at 34% 30%, rgba(202,142,87,.34) 0 10%, transparent 11%),
        linear-gradient(#a66c3d,#83502e 74%) !important;
      border: 4px solid #2d1b12 !important;
      border-radius: 47% 47% 52% 52% !important;
      z-index: 6 !important;
      box-shadow: inset 0 -5px 0 rgba(74,38,20,.15) !important;
    }

    /* Round bear ears with obvious darker inner ears. */
    .bb-bear-driver .bear-head::before,
    .bb-bear-driver .bear-head::after {
      top: -10px !important;
      width: 21px !important;
      height: 21px !important;
      background:
        radial-gradient(circle at 50% 52%, #c59062 0 34%, #7d4b2c 36% 100%) !important;
      border: 4px solid #2d1b12 !important;
      border-radius: 50% !important;
      z-index: -1 !important;
    }

    .bb-bear-driver .bear-head::before {
      left: 1px !important;
    }

    .bb-bear-driver .bear-head::after {
      right: 1px !important;
    }

    .bb-bear-driver .bear-eye {
      top: 17px !important;
      width: 7px !important;
      height: 7px !important;
      background: #17100c !important;
      border: 1px solid #2d1b12 !important;
      box-shadow: inset -2px -1px 0 #5e351f !important;
    }

    .bb-bear-driver .bear-eye.l {
      left: 12px !important;
    }

    .bb-bear-driver .bear-eye.r {
      right: 12px !important;
    }

    /* Bigger tan snout + distinct black nose and little mouth. */
    .bb-bear-driver .bear-muzzle {
      left: 13px !important;
      top: 28px !important;
      width: 34px !important;
      height: 23px !important;
      background: linear-gradient(#d2a173,#bd8659) !important;
      border: 3px solid #3a2317 !important;
      border-radius: 48% 48% 56% 56% !important;
      z-index: 8 !important;
    }

    .bb-bear-driver .bear-muzzle::after {
      content: "" !important;
      position: absolute !important;
      left: 10px !important;
      top: 2px !important;
      width: 11px !important;
      height: 8px !important;
      background: #1d120d !important;
      border-radius: 55% 55% 45% 45% !important;
      clip-path: polygon(8% 18%,92% 18%,72% 92%,28% 92%) !important;
    }

    .bb-bear-driver .bear-muzzle::before {
      content: "";
      position: absolute;
      left: 9px;
      top: 9px;
      width: 13px;
      height: 8px;
      border-bottom: 3px solid #2b1811;
      border-radius: 50%;
    }

    .bb-bear-driver .paw {
      right: -1px !important;
      top: 52px !important;
      width: 20px !important;
      height: 15px !important;
      background: #8e5a34 !important;
      border-color: #2d1b12 !important;
      border-radius: 55% !important;
    }
  `;

  document.head.appendChild(style);
})();
