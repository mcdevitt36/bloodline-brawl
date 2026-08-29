/* =====================================================
   BLOODLINE BRAWL — NICK INTEGRATION POLISH V2
   Small late additive bridge for UI systems whose move data is
   closed inside older modules.
===================================================== */

(() => {
  if (window.__bbNickIntegrationPolishV2Loaded) return;
  window.__bbNickIntegrationPolishV2Loaded = true;

  const style = document.createElement("style");
  style.textContent = `
    /* Three challenge tabs need to wrap cleanly on smaller screens. */
    .bb-challenge-tabs {
      flex-wrap: wrap;
    }

    .bb-challenge-tabs > .bb-tab-button {
      flex: 1 1 170px;
    }

    /* Nick is the fifteenth roster slot; keep his adult model aligned
       with the rest of the compact adult roster. */
    .bb-select-overhauled .card-model-holder .nick-model {
      transform: scale(.45) !important;
      transform-origin: bottom center !important;
    }

    /* -----------------------------------------------------
       NICK BAT POLISH
       The original bat was a nearly uniform rectangle, which read as
       a stick. Build a recognizable baseball-bat silhouette instead:
       thick rounded barrel -> tapered neck -> narrow handle -> knob.
    ----------------------------------------------------- */
    .nick-model .nick-bat {
      left: -1px !important;
      top: -37px !important;
      width: 24px !important;
      height: 116px !important;
      border: 0 !important;
      border-radius: 0 !important;
      background: transparent !important;
      overflow: visible !important;
      transform-origin: 50% 86% !important;
      filter: none !important;
    }

    .nick-model .nick-bat::before {
      content: "" !important;
      position: absolute !important;
      left: 2px !important;
      top: 0 !important;
      width: 20px !important;
      height: 108px !important;
      background:
        linear-gradient(90deg,
          #7b421f 0%,
          #b96f33 20%,
          #e2a65d 43%,
          #f0bf78 55%,
          #c37a39 77%,
          #77401e 100%) !important;
      clip-path: polygon(
        24% 0%, 76% 0%,
        91% 3%, 100% 11%,
        96% 38%, 87% 55%,
        72% 69%, 63% 82%,
        61% 94%, 39% 94%,
        37% 82%, 28% 69%,
        13% 55%, 4% 38%,
        0% 11%, 9% 3%
      ) !important;
      filter:
        drop-shadow(2px 0 0 #111)
        drop-shadow(-2px 0 0 #111)
        drop-shadow(0 2px 0 #111)
        drop-shadow(0 -2px 0 #111) !important;
    }

    .nick-model .nick-bat::after {
      content: "" !important;
      position: absolute !important;
      left: 6px !important;
      bottom: 0 !important;
      width: 12px !important;
      height: 10px !important;
      box-sizing: border-box !important;
      background: #8b4d25 !important;
      border: 3px solid #111 !important;
      border-radius: 3px 3px 6px 6px !important;
      box-shadow: inset 0 2px 0 rgba(255,255,255,.16) !important;
    }

    /* A small dark grip at the base makes the handle especially legible
       when the model is scaled down on character select. */
    .nick-model .weapon-arm::after {
      content: "";
      position: absolute;
      left: -1px;
      top: -1px;
      width: 9px;
      height: 16px;
      border: 2px solid #111;
      border-radius: 3px;
      background: repeating-linear-gradient(
        180deg,
        #26313b 0 3px,
        #111920 3px 5px
      );
      transform: rotate(18deg);
      z-index: 26;
      pointer-events: none;
    }

    /* Make the melee HUD icon read as the same tapered baseball bat. */
    .bb-icon-nick-bat::before {
      left: 13px !important;
      top: 0 !important;
      width: 10px !important;
      height: 31px !important;
      border: 0 !important;
      border-radius: 0 !important;
      background: linear-gradient(90deg,#8b4c24,#e2a45b 52%,#8a4a22) !important;
      clip-path: polygon(20% 0,80% 0,100% 9%,91% 48%,68% 70%,61% 91%,39% 91%,32% 70%,9% 48%,0 9%) !important;
      filter: drop-shadow(1px 0 #111) drop-shadow(-1px 0 #111) drop-shadow(0 1px #111) drop-shadow(0 -1px #111) !important;
      transform: rotate(42deg) !important;
      transform-origin: 50% 85% !important;
    }

    .bb-icon-nick-bat::after {
      content: "";
      position: absolute;
      left: 9px;
      top: 25px;
      width: 7px;
      height: 6px;
      border: 2px solid #111;
      border-radius: 2px 2px 4px 4px;
      background: #77401f;
      transform: rotate(42deg);
      z-index: 2;
    }

    @media (max-height: 800px) and (min-width: 761px) {
      .bb-select-overhauled .card-model-holder .nick-model {
        transform: scale(.38) !important;
      }
    }
  `;
  document.head.appendChild(style);

  function renderNickDetail() {
    if (!window.BBNickFighter?.isUnlocked?.()) return;

    const name = document.getElementById("bbDetailName");
    const preview = document.getElementById("bbDetailPreview");
    const moves = document.getElementById("bbDetailMoves");

    if (!name || !preview || !moves) return;

    name.textContent = "NICK";
    preview.innerHTML = characterHTML("nick");
    moves.innerHTML = `
      <div class="bb-detail-move melee">
        <div class="bb-detail-move-type">MELEE</div>
        <div class="bb-detail-move-name">Baseball Bat</div>
      </div>
      <div class="bb-detail-move special">
        <div class="bb-detail-move-type">SPECIAL</div>
        <div class="bb-detail-move-name">Yield Curve</div>
      </div>
      <div class="bb-detail-move ultimate">
        <div class="bb-detail-move-type">ULTIMATE</div>
        <div class="bb-detail-move-name">Queens Double Play</div>
      </div>
    `;
  }

  function bindNickCard() {
    const card = document.querySelector('.fighter-card[data-character="nick"]');
    if (!card || card.dataset.bbNickDetailBridge === "1") return;
    card.dataset.bbNickDetailBridge = "1";

    card.addEventListener("mouseenter", renderNickDetail);
    card.addEventListener("focus", renderNickDetail);
    card.addEventListener("click", () => setTimeout(renderNickDetail, 0));
  }

  document.addEventListener("bb:nick-unlocked", () => {
    setTimeout(() => {
      bindNickCard();
      renderNickDetail();
    }, 0);
  });

  /* Existing unlocks need the bridge immediately on page load. */
  setTimeout(bindNickCard, 0);
})();