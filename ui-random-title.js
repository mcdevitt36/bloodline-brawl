/* =====================================================
   BLOODLINE BRAWL — RANDOM SELECT + TITLE SCALE PASS
   Additive UI-only patch. No combat changes.
===================================================== */

(() => {
  if (window.__bbRandomTitleLoaded) {
    return;
  }

  window.__bbRandomTitleLoaded = true;

  const style = document.createElement("style");

  style.textContent = `
    /* =================================================
       TITLE SCREEN — USE MORE OF THE AVAILABLE CENTER SPACE
    ================================================= */

    .title-content {
      grid-template-columns:
        minmax(150px, 1fr)
        330px
        240px
        minmax(220px, 1fr) !important;
      grid-template-rows:
        auto
        auto
        minmax(0, 1fr)
        76px !important;
    }

    .title-content .game-logo {
      font-size: clamp(66px, 6.25vw, 98px) !important;
    }

    .title-versus-panel {
      width: min(1280px, 96vw) !important;
      max-width: 1280px !important;
      min-height: 300px !important;
      margin: 0 auto !important;
      grid-template-columns:
        minmax(350px, 1fr)
        160px
        minmax(350px, 1fr) !important;
      column-gap: 52px !important;
    }

    .title-fighter {
      max-width: 425px !important;
      min-height: 282px !important;
      padding: 12px 20px 10px !important;
      border-radius: 14px !important;
    }

    .title-character-space {
      width: 265px !important;
      height: 232px !important;
    }

    .title-character-space .pixel-person,
    .title-character-space .martin-model {
      transform: scale(1.2) !important;
      transform-origin: bottom center !important;
    }

    .title-name {
      width: 88% !important;
      min-height: 38px !important;
      padding: 4px 12px 5px !important;
      font-size: 27px !important;
    }

    .title-vs {
      width: 145px !important;
      height: 145px !important;
      font-size: 74px !important;
    }

    @media (max-height: 860px) {
      .title-versus-panel {
        min-height: 250px !important;
      }

      .title-fighter {
        min-height: 238px !important;
      }

      .title-character-space {
        width: 230px !important;
        height: 194px !important;
      }

      .title-character-space .pixel-person,
      .title-character-space .martin-model {
        transform: scale(1.08) !important;
      }

      .title-vs {
        width: 126px !important;
        height: 126px !important;
        font-size: 64px !important;
      }
    }

    @media (max-height: 740px) {
      .title-content .game-logo {
        font-size: clamp(54px, 5.4vw, 78px) !important;
      }

      .title-versus-panel {
        min-height: 205px !important;
      }

      .title-fighter {
        min-height: 198px !important;
      }

      .title-character-space {
        width: 205px !important;
        height: 158px !important;
      }

      .title-character-space .pixel-person,
      .title-character-space .martin-model {
        transform: scale(.96) !important;
      }

      .title-name {
        font-size: 22px !important;
      }
    }


    /* =================================================
       RANDOM FIGHTER — LAST ROSTER CARD
    ================================================= */

    .bb-random-card {
      position: relative;
      overflow: hidden;
      border-color: #d7b83d !important;
      background:
        radial-gradient(circle at 50% 36%, rgba(255,213,42,.16), transparent 42%),
        linear-gradient(180deg,#27384a,#111923) !important;
    }

    .bb-random-card::before {
      content: "";
      position: absolute;
      inset: 5px;
      border: 1px solid rgba(255,213,42,.22);
      border-radius: 5px;
      pointer-events: none;
    }

    .bb-random-card:hover,
    .bb-random-card:focus-visible {
      border-color: #ffd52a !important;
      box-shadow:
        0 0 17px rgba(255,213,42,.34),
        inset 0 0 0 1px rgba(255,255,255,.05) !important;
    }

    .bb-random-card.bb-random-rolling {
      animation: bbRandomPulse 120ms ease-in-out infinite alternate;
    }

    .bb-random-holder {
      width: 100%;
      height: 91px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .bb-random-mark {
      width: 66px;
      height: 66px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      background:
        linear-gradient(145deg,#ffd52a,#e8a91f);
      border: 4px solid #0d1319;
      box-shadow:
        0 5px 0 rgba(0,0,0,.32),
        inset 0 0 0 2px rgba(255,255,255,.18);
      color: #10151b;
      font-family: Impact,"Arial Black",sans-serif;
      font-size: 48px;
      line-height: 1;
      text-shadow: 1px 1px rgba(255,255,255,.2);
      transform: rotate(-3deg);
    }

    .bb-random-card > strong {
      color: #ffd52a !important;
    }

    @keyframes bbRandomPulse {
      from {
        transform: translateY(-1px) scale(1);
        filter: brightness(1);
      }
      to {
        transform: translateY(-2px) scale(1.025);
        filter: brightness(1.14);
      }
    }
  `;

  document.head.appendChild(style);


  function installRandomCard() {
    const grid = document.querySelector(
      "#selectScreen .fighter-select"
    );

    if (!grid) {
      return false;
    }

    if (grid.querySelector(".bb-random-card")) {
      return true;
    }

    const card = document.createElement("button");
    card.type = "button";
    card.className = "fighter-card bb-random-card";
    card.dataset.character = "random";
    card.setAttribute("aria-label", "Choose a random fighter");

    card.innerHTML = `
      <div class="bb-random-holder">
        <div class="bb-random-mark">?</div>
      </div>
      <strong>RANDOM</strong>
      <small>Choose any available fighter</small>
    `;

    grid.appendChild(card);

    let rolling = false;

    card.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();

      if (rolling) {
        return;
      }

      const candidates = Array.from(
        grid.querySelectorAll(
          '.fighter-card[data-character]:not(.bb-random-card)'
        )
      ).filter(candidate => {
        const character = candidate.dataset.character;

        if (!character) {
          return false;
        }

        if (candidate.classList.contains("locked")) {
          return false;
        }

        if (
          character === "martin" &&
          typeof isMartinUnlocked === "function" &&
          !isMartinUnlocked()
        ) {
          return false;
        }

        return true;
      });

      if (!candidates.length) {
        return;
      }

      rolling = true;
      card.classList.add("bb-random-rolling");

      let flashes = 0;
      const totalFlashes = 5;

      const flashTimer = window.setInterval(() => {
        const flashCard = candidates[
          Math.floor(Math.random() * candidates.length)
        ];

        candidates.forEach(candidate => {
          candidate.classList.remove("bb-random-flash");
        });

        flashCard.style.outline = "3px solid #ffd52a";
        flashCard.style.outlineOffset = "-3px";

        window.setTimeout(() => {
          flashCard.style.outline = "";
          flashCard.style.outlineOffset = "";
        }, 72);

        flashes += 1;

        if (flashes >= totalFlashes) {
          window.clearInterval(flashTimer);

          const chosen = candidates[
            Math.floor(Math.random() * candidates.length)
          ];

          window.setTimeout(() => {
            card.classList.remove("bb-random-rolling");
            rolling = false;
            chosen.click();
          }, 85);
        }
      }, 78);
    });

    return true;
  }


  let attempts = 0;
  const installer = window.setInterval(() => {
    attempts += 1;

    if (installRandomCard() || attempts >= 40) {
      window.clearInterval(installer);
    }
  }, 100);
})();
