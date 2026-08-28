/* =====================================================
   BLOODLINE BRAWL — CHARACTER POLISH V3
   Additive only:
   - Brainrot is smaller, readable, and visibly persists for the full stun
   - Grandmommy Chair Yoga returns to the slower flipping throw
     while the opponent remains free to react / jump
===================================================== */

(() => {
  if (window.__bbCharacterPolishV3Loaded) return;
  window.__bbCharacterPolishV3Loaded = true;

  const css = document.createElement("style");
  css.textContent = `
    /* Brainrot: slightly smaller than the old oversized phone. */
    .brainrot-phone.bb-brainrot-v3 {
      width: 118px !important;
      height: 205px !important;
      border-width: 6px !important;
      border-radius: 17px !important;
      box-shadow:
        0 0 20px rgba(255,80,170,.72),
        0 0 32px rgba(75,180,255,.28) !important;
      overflow: hidden !important;
      z-index: 238 !important;
    }

    .brainrot-phone.bb-brainrot-v3::before {
      width: 36px !important;
      height: 6px !important;
      top: 5px !important;
    }

    .brainrot-phone.bb-brainrot-v3 .brainrot-screen {
      inset: 14px 6px 6px !important;
    }

    .brainrot-phone.bb-brainrot-v3 .brainrot-screen::before {
      width: 86px !important;
      height: 86px !important;
      left: 7px !important;
      top: 24px !important;
    }

    .brainrot-phone.bb-brainrot-v3 .brainrot-screen::after {
      left: 4px !important;
      right: 4px !important;
      bottom: 11px !important;
      font-size: 10px !important;
      line-height: 1.45 !important;
    }

    .bb-brainrot-stunning {
      animation: bbBrainrotPhoneHover .36s ease-in-out infinite alternate !important;
      filter: drop-shadow(0 0 10px rgba(255,84,190,.7));
    }

    @keyframes bbBrainrotPhoneHover {
      from { transform: translateY(-3px) rotate(-4deg); }
      to { transform: translateY(4px) rotate(4deg); }
    }

    .bb-brainrot-aura {
      position: absolute;
      width: 145px;
      height: 165px;
      z-index: 230;
      pointer-events: none;
    }

    .bb-brainrot-aura .bb-brainrot-wave {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 54px;
      height: 72px;
      border: 5px solid rgba(255,91,190,.88);
      border-radius: 50%;
      transform: translate(-50%,-50%) scale(.45);
      opacity: 0;
      box-shadow:
        0 0 10px rgba(255,91,190,.5),
        inset 0 0 10px rgba(70,198,255,.35);
      animation: bbBrainrotWave 1s ease-out infinite;
    }

    .bb-brainrot-aura .bb-brainrot-wave.two {
      border-color: rgba(96,214,255,.85);
      animation-delay: .32s;
    }

    .bb-brainrot-aura .bb-brainrot-wave.three {
      border-color: rgba(179,112,255,.82);
      animation-delay: .64s;
    }

    .bb-brainrot-aura .bb-brainrot-label {
      position: absolute;
      left: 50%;
      top: -7px;
      transform: translateX(-50%);
      padding: 3px 8px;
      border: 2px solid #111;
      border-radius: 4px;
      background: rgba(20,12,32,.9);
      color: #ff8bd0;
      font: 900 11px Arial,sans-serif;
      letter-spacing: 1.5px;
      text-shadow: 1px 1px #111;
      white-space: nowrap;
    }

    @keyframes bbBrainrotWave {
      0% {
        transform: translate(-50%,-50%) scale(.4);
        opacity: 0;
      }
      20% { opacity: .92; }
      100% {
        transform: translate(-50%,-50%) scale(1.8);
        opacity: 0;
      }
    }

    .fight-character.bb-brainrot-zapped .visual-layer {
      animation: bbBrainrotVictim .24s steps(2,end) infinite alternate;
    }

    @keyframes bbBrainrotVictim {
      from { filter: brightness(1) saturate(1); }
      to { filter: brightness(1.22) saturate(1.35) hue-rotate(18deg); }
    }

    /* Chair Yoga: visible wind-up, then an actual flipping chair projectile. */
    .bb-chair-yoga-v3 {
      transform-origin: center center;
      filter: drop-shadow(4px 5px 0 rgba(0,0,0,.25));
      z-index: 225 !important;
    }
  `;
  document.head.appendChild(css);

  /* ===================================================
     SHANNAN — BRAINROT V3
  =================================================== */

  brainrot = function(attacker, target) {
    addComicText("BRAINROT", "red-text", 1500);

    const phone = document.createElement("div");
    phone.className = "effect brainrot-phone bb-brainrot-v3";
    phone.innerHTML = `<div class="brainrot-screen"></div>`;
    phone.style.bottom = (92 + attacker.y) + "px";
    phone.style.top = "auto";

    let x = attacker.x + (attacker.facing === 1 ? 58 : -82);
    const direction = attacker.facing;
    phone.style.left = x + "px";
    effects.appendChild(phone);

    const launch = phone.animate(
      [
        { transform:`scale(.72) rotate(${-direction * 8}deg)`, opacity:0 },
        { transform:"scale(1) rotate(0deg)", opacity:1 }
      ],
      { duration:180, easing:"ease-out", fill:"forwards" }
    );

    setTimeout(() => {
      const loop = setInterval(() => {
        if (roundOver || !phone.isConnected) {
          clearInterval(loop);
          phone.remove();
          return;
        }

        x += 14 * direction;
        phone.style.left = x + "px";

        if (Math.abs(x - target.x) < 42) {
          if (projectileCanHit(target, "mid")) {
            clearInterval(loop);

            stunTarget(target, 3250);
            target.fighter.classList.add("bb-brainrot-zapped");
            phone.classList.add("bb-brainrot-stunning");

            const aura = document.createElement("div");
            aura.className = "effect bb-brainrot-aura";
            aura.innerHTML = `
              <div class="bb-brainrot-label">BRAINROT STUN</div>
              <div class="bb-brainrot-wave one"></div>
              <div class="bb-brainrot-wave two"></div>
              <div class="bb-brainrot-wave three"></div>
            `;
            effects.appendChild(aura);

            const follow = setInterval(() => {
              if (roundOver || !phone.isConnected || !aura.isConnected) {
                clearInterval(follow);
                return;
              }

              const phoneX = target.x + (direction === 1 ? -82 : 72);
              phone.style.left = phoneX + "px";
              phone.style.bottom = (102 + target.y) + "px";
              aura.style.left = (target.x - 42) + "px";
              aura.style.bottom = (42 + target.y) + "px";
            }, 30);

            /* Stay a hair longer than the actual 3.25s stun. */
            setTimeout(() => {
              clearInterval(follow);
              target.fighter.classList.remove("bb-brainrot-zapped");
              phone.remove();
              aura.remove();
            }, 3375);

            return;
          }
        }

        if (x < -170 || x > arena.clientWidth + 170) {
          clearInterval(loop);
          phone.remove();
        }
      }, 28);
    }, 180);
  };

  /* ===================================================
     GRANDMOMMY — CLASSIC FLIPPING CHAIR, REACTIVE TARGET
  =================================================== */

  function bbChairYogaClassic(attacker, target) {
    addComicText("CHAIR YOGA!", "purple-text", 1550);

    const chair = document.createElement("div");
    chair.className = "effect yoga-chair bb-chair-yoga-v3";
    chair.innerHTML = `
      <div class="yoga-chair-back"></div>
      <div class="yoga-chair-seat"></div>
    `;
    chair.style.left = attacker.x + "px";
    chair.style.bottom = "20px";
    effects.appendChild(chair);

    const visual = attacker.fighter.querySelector(".visual-layer");
    if (visual) {
      visual.animate(
        [
          { transform:"translateY(0)" },
          { transform:"translateY(15px) scaleY(.84)", offset:.42 },
          { transform:`translateX(${attacker.facing * -5}px) rotate(${attacker.facing * -5}deg)`, offset:.7 },
          { transform:"translateY(0)" }
        ],
        { duration:620, easing:"ease-out" }
      );
    }

    /* Important: no global actionLock here. The opponent can move/jump. */
    setTimeout(() => {
      chair.animate(
        [
          { transform:"rotate(0deg)" },
          { transform:`rotate(${attacker.facing * 1440}deg)` }
        ],
        { duration:1050, iterations:Infinity, easing:"linear" }
      );

      moveProjectile(
        chair,
        attacker,
        target,
        13,
        40,
        () => {
          dealDamage(
            attacker,
            target,
            13,
            { type:"special" }
          );
        },
        "low"
      );
    }, 610);
  }

  const bbV3PreviousSpecialAttack = specialAttack;
  specialAttack = function(attacker, target) {
    if (attacker.character !== "grandmommy") {
      return bbV3PreviousSpecialAttack(attacker, target);
    }

    if (!canAct(attacker) || attacker.specialCooldown) return;

    beginSpecialCooldown(attacker);
    bbChairYogaClassic(attacker, target);
  };
})();
