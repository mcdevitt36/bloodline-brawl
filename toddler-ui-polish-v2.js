/* =====================================================
   BLOODLINE BRAWL — TODDLER UI / ANIMATION POLISH V2
   Late additive polish only.
===================================================== */

(() => {
  if (window.__bbToddlerUiPolishV2Loaded) return;
  window.__bbToddlerUiPolishV2Loaded = true;

  const style = document.createElement("style");
  style.textContent = `
    /* When Fairy Princess accessories are active, Alice visibly waves her wand. */
    .alice-model:has(.bb-fairy-wing-set) .weapon-arm {
      animation: bbAlicePrincessWave .72s ease-in-out 3;
    }
    @keyframes bbAlicePrincessWave {
      0%,100% { transform: rotate(0deg); }
      28% { transform: rotate(-30deg) translateY(-2px); }
      62% { transform: rotate(32deg) translateY(-5px); }
    }
  `;
  document.head.appendChild(style);

  const moves = {
    alice: { melee: "Fairy Wand", special: "Grape Lollipop", ultimate: "Fairy Princess" },
    leo: { melee: "Dino Claws", special: "Dino Stomp", ultimate: "Dino Stampede" },
    barrett: { melee: "Headbutt", special: "RC Car", ultimate: "Bear Driver" }
  };

  function renderToddlerDetail(character) {
    const data = moves[character];
    const name = document.getElementById("bbDetailName");
    const preview = document.getElementById("bbDetailPreview");
    const moveList = document.getElementById("bbDetailMoves");
    if (!data || !name || !preview || !moveList) return;

    name.textContent = displayName(character);
    preview.innerHTML = characterHTML(character);
    moveList.innerHTML = `
      <div class="bb-detail-move melee">
        <div class="bb-detail-move-type">MELEE</div>
        <div class="bb-detail-move-name">${data.melee}</div>
      </div>
      <div class="bb-detail-move special">
        <div class="bb-detail-move-type">SPECIAL</div>
        <div class="bb-detail-move-name">${data.special}</div>
      </div>
      <div class="bb-detail-move ultimate">
        <div class="bb-detail-move-type">ULTIMATE</div>
        <div class="bb-detail-move-name">${data.ultimate}</div>
      </div>
    `;
  }

  function selectedToddler() {
    const selected = gameMode === "2P" && player2Character ? player2Character : player1Character;
    return moves[selected] ? selected : null;
  }

  document.querySelectorAll(".fighter-card").forEach(card => {
    const character = card.dataset.character;

    if (moves[character]) {
      card.addEventListener("mouseenter", () => renderToddlerDetail(character));
      card.addEventListener("focus", () => renderToddlerDetail(character));
      card.addEventListener("click", () => setTimeout(() => renderToddlerDetail(character), 0));
    }

    card.addEventListener("mouseleave", () => {
      setTimeout(() => {
        const selected = selectedToddler();
        if (selected) renderToddlerDetail(selected);
      }, 0);
    });
  });

  document.getElementById("backToFighterButton")?.addEventListener("click", () => {
    setTimeout(() => {
      const selected = selectedToddler();
      if (selected) renderToddlerDetail(selected);
    }, 0);
  });
})();
