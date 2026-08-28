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