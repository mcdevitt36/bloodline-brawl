/* =====================================================
   BLOODLINE BRAWL — FINAL POLISH V5
   Late additive fixes only.
   - Reverse Brendan's basic golf-club swing
   - Grandmommy visibly sits on one connected chair, then throws that same chair
   - Clyde stays fight-size and dances with Martin
   - Kelly headphones move slightly higher
   - Visible Leah move naming uses "Crochet Hook"
===================================================== */

(() => {
  if (window.__bbFinalPolishV5Loaded) return;
  window.__bbFinalPolishV5Loaded = true;

  const style = document.createElement("style");
  style.textContent = `
    /* Brendan basic melee: reverse the old backswing / contact direction. */
    @keyframes bbGolfSwing {
      0%   { transform: rotate(0deg); }
      30%  { transform: rotate(22deg); }
      68%  { transform: rotate(-34deg); }
      100% { transform: rotate(-3deg); }
    }

    /* Kelly: keep the fitted headphones, just lift the whole set slightly. */
    .kelly-model .bb4-headphones {
      top: 7px !important;
    }

    /* Martin celebration: Clyde is exactly his normal combat-model size. */
    .bb4-victory .bb4-clyde {
      right: 20% !important;
      bottom: 42px !important;
      transform: scale(1) !important;
      transform-origin: bottom center !important;
      animation: bb5ClydeDance .82s ease-in-out 6 !important;
    }

    @keyframes bb5ClydeDance {
      0%,100% {
        transform: scale(1) translate(0,0) rotate(0deg);
      }
      25% {
        transform: scale(1) translate(-9px,-13px) rotate(-6deg);
      }
      50% {
        transform: scale(1) translate(0,-23px) rotate(3deg);
      }
      75% {
        transform: scale(1) translate(9px,-11px) rotate(6deg);
      }
    }

    /* Grandmommy's chair is one rigid connected model. */
    .bb5-chair {
      position: absolute;
      width: 82px;
      height: 94px;
      pointer-events: none;
      transform-origin: 50% 52%;
      filter: drop-shadow(4px 5px 0 rgba(0,0,0,.28));
      z-index: 226;
    }

    .bb5-chair-back {
      position: absolute;
      left: 11px;
      top: 0;
      width: 60px;
      height: 54px;
      background: linear-gradient(#bd8b59,#9f6e43);
      border: 4px solid #472f1f;
      border-radius: 5px 5px 2px 2px;
    }

    .bb5-chair-back::before,
    .bb5-chair-back::after {
      content: "";
      position: absolute;
      top: 7px;
      width: 7px;
      height: 38px;
      background: #75492d;
      border: 2px solid #472f1f;
      border-radius: 2px;
    }

    .bb5-chair-back::before { left: 12px; }
    .bb5-chair-back::after  { right: 12px; }

    .bb5-chair-seat {
      position: absolute;
      left: 7px;
      top: 48px;
      width: 68px;
      height: 19px;
      background: linear-gradient(#ad7a4b,#8d5c38);
      border: 4px solid #472f1f;
      border-radius: 3px;
      z-index: 4;
    }

    .bb5-chair-side {
      position: absolute;
      top: 49px;
      width: 7px;
      height: 18px;
      background: #75492d;
      border: 2px solid #472f1f;
      z-index: 3;
    }

    .bb5-chair-side.l { left: 12px; }
    .bb5-chair-side.r { right: 12px; }

    .bb5-chair-leg {
      position: absolute;
      top: 63px;
      width: 9px;
      height: 31px;
      background: linear-gradient(90deg,#805235,#5f3b27);
      border: 2px solid #352116;
      border-radius: 2px;
      z-index: 2;
    }

    .bb5-chair-leg.l { left: 15px; }
    .bb5-chair-leg.r { right: 15px; }

    .bb5-chair.bb5-seated-chair {
      left: 13px;
      bottom: 0;
      z-index: 1;
    }

    /* Actual seated pose before the chair leaves her. */
    .grandmommy-model.bb5-sitting {
      transform: translateY(13px);
      transition: transform 180ms ease-out;
      z-index: 4;
    }

    .grandmommy-model.bb5-sitting .left-leg,
    .grandmommy-model.bb5-sitting .right-leg {
      transform-origin: 50% 8px;
      transform: rotate(61deg) translateY(-3px);
      transition: transform 180ms ease-out;
    }

    .grandmommy-model.bb5-sitting .left-shoe {
      transform: translate(20px,-19px) rotate(8deg);
    }

    .grandmommy-model.bb5-sitting .right-shoe {
      transform: translate(16px,-11px) rotate(5deg);
    }

    .grandmommy-model.bb5-sitting .left-shoe,
    .grandmommy-model.bb5-sitting .right-shoe {
      transition: transform 180ms ease-out;
    }
  `;
  document.head.appendChild(style);

  function makeConnectedChair() {
    const chair = document.createElement("div");
    /* "yoga-chair" remains in the class text so the existing chair SFX still fires
       when this same chair is re-parented into #effects for the throw. */
    chair.className = "bb5-chair bb5-yoga-chair bb5-seated-chair";
    chair.innerHTML = `
      <div class="bb5-chair-back"></div>
      <div class="bb5-chair-side l"></div>
      <div class="bb5-chair-side r"></div>
      <div class="bb5-chair-seat"></div>
      <div class="bb5-chair-leg l"></div>
      <div class="bb5-chair-leg r"></div>
    `;
    return chair;
  }

  function chairYogaV5(attacker, target) {
    addComicText("CHAIR YOGA!", "purple-text", 1700);

    /* Lock Grandmommy only. The opponent remains completely free to react. */
    attacker.stunned = true;

    const model = attacker.fighter.querySelector(".grandmommy-model");
    const visual = attacker.fighter.querySelector(".visual-layer");
    const chair = makeConnectedChair();

    if (visual) {
      visual.insertBefore(chair, visual.firstChild);
    } else {
      attacker.fighter.appendChild(chair);
    }

    if (model) {
      model.classList.add("bb5-sitting");
    }

    /* Give the sit a readable beat before she stands and hurls the SAME chair. */
    setTimeout(() => {
      if (roundOver || !chair.isConnected) {
        if (model) model.classList.remove("bb5-sitting");
        chair.remove();
        attacker.stunned = false;
        return;
      }

      if (model) {
        model.classList.remove("bb5-sitting");
        const arm = model.querySelector(".weapon-arm");
        if (arm) {
          arm.animate(
            [
              { transform:"rotate(0deg)" },
              { transform:"rotate(34deg)", offset:.34 },
              { transform:"rotate(-46deg)", offset:.72 },
              { transform:"rotate(-5deg)" }
            ],
            { duration:620, easing:"cubic-bezier(.2,.72,.22,1)" }
          );
        }
      }

      const direction = attacker.facing || 1;
      let x = attacker.x + (direction === 1 ? 54 : -24);
      const bottom = 54 + attacker.y;

      /* Re-parent the one chair; there is never a duplicate underneath her. */
      effects.appendChild(chair);
      chair.classList.remove("bb5-seated-chair");
      chair.style.left = x + "px";
      chair.style.bottom = bottom + "px";
      chair.style.transform = "rotate(0deg)";

      let rotation = 0;
      let hit = false;

      const loop = setInterval(() => {
        if (roundOver || !chair.isConnected) {
          clearInterval(loop);
          chair.remove();
          attacker.stunned = false;
          return;
        }

        x += 12.5 * direction;
        rotation += 31 * direction;
        chair.style.left = x + "px";
        chair.style.transform = `rotate(${rotation}deg)`;

        const chairCenter = x + 41;
        const targetCenter = target.x + 55;
        const horizontallyTouching = Math.abs(chairCenter - targetCenter) < 49;
        const jumpedClear = target.y >= 55;

        if (!hit && horizontallyTouching && !jumpedClear) {
          hit = true;
          clearInterval(loop);
          dealDamage(attacker, target, 13, { type:"special" });

          chair.animate(
            [
              { transform:`rotate(${rotation}deg) scale(1)` },
              { transform:`rotate(${rotation + direction * 95}deg) scale(.82)`, opacity:.25 }
            ],
            { duration:280, easing:"ease-out", fill:"forwards" }
          );

          setTimeout(() => chair.remove(), 290);
          attacker.stunned = false;
          return;
        }

        if (x < -150 || x > arena.clientWidth + 150) {
          clearInterval(loop);
          chair.remove();
          attacker.stunned = false;
        }
      }, 28);

      /* She can act again shortly after the throw, while the chair keeps flying. */
      setTimeout(() => {
        attacker.stunned = false;
      }, 390);
    }, 720);

    /* Safety cleanup only. */
    setTimeout(() => {
      if (model) model.classList.remove("bb5-sitting");
      attacker.stunned = false;
      if (chair.isConnected && !effects.contains(chair)) chair.remove();
    }, 2200);
  }

  /* Last-loaded Grandmommy special wins over V3/V4 without touching anyone else. */
  const previousSpecialAttackV5 = specialAttack;
  specialAttack = function(attacker, target) {
    if (attacker.character !== "grandmommy") {
      return previousSpecialAttackV5(attacker, target);
    }

    if (!canAct(attacker) || attacker.specialCooldown) return;

    beginSpecialCooldown(attacker);
    chairYogaV5(attacker, target);
  };

  /* "Knitting needle" is not the correct crochet term. Keep internals/classes
     untouched, but every visible Leah move label becomes CROCHET HOOK. */
  function renameLeahMoveText() {
    const roots = [
      document.getElementById("titleScreen"),
      document.getElementById("selectScreen"),
      document.getElementById("challengeScreen"),
      document.getElementById("mapScreen")
    ].filter(Boolean);

    roots.forEach(root => {
      const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            const parent = node.parentElement;
            if (!parent || parent.closest("script,style")) {
              return NodeFilter.FILTER_REJECT;
            }
            return /knitting needles?/i.test(node.nodeValue || "")
              ? NodeFilter.FILTER_ACCEPT
              : NodeFilter.FILTER_REJECT;
          }
        }
      );

      const matches = [];
      while (walker.nextNode()) matches.push(walker.currentNode);
      matches.forEach(node => {
        node.nodeValue = node.nodeValue.replace(/Knitting Needles?/gi, "Crochet Hook");
      });
    });

    const leahCard = document.querySelector('.fighter-card[data-character="leah"] small');
    if (leahCard) {
      leahCard.textContent = leahCard.textContent.replace(/Knitting Needles?/gi, "Crochet Hook");
    }
  }

  renameLeahMoveText();

  /* Selection detail is rebuilt dynamically. Patch only after relevant UI actions,
     plus a short bounded startup pass — no MutationObserver. */
  document.addEventListener("click", () => {
    setTimeout(renameLeahMoveText, 0);
    setTimeout(renameLeahMoveText, 120);
  }, true);

  let renamePasses = 0;
  const renameTimer = setInterval(() => {
    renameLeahMoveText();
    if (++renamePasses >= 24) clearInterval(renameTimer);
  }, 250);
})();
