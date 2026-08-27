/* =====================================================
   BLOODLINE BRAWL — COMBAT SMOOTHING PASS
   Additive gameplay polish only.
   - Slightly higher jumps
   - More readable / dodgeable specials
   - Faster special startup on projectile moves
   - Grandmommy: Chair Yoga special / Donn Assist ultimate
===================================================== */

(() => {
  if (window.__bbCombatSmoothingLoaded) {
    return;
  }

  window.__bbCombatSmoothingLoaded = true;


  /* ===================================================
     JUMP — A TOUCH HIGHER
  =================================================== */

  jump = function(
    p
  ) {
    if (
      !canAct(p) ||
      p.jumping ||
      p.crouching ||
      p.blocking
    ) {
      return;
    }

    p.jumping = true;
    p.vy = 14.2;
  };


  /* ===================================================
     DODGE WINDOWS
     Low specials are easy to clear with a committed jump.
     Mid specials require a reasonably well-timed jump.
  =================================================== */

  projectileCanHit = function(
    target,
    projectileHeight = "mid"
  ) {
    if (
      projectileHeight === "low"
    ) {
      return target.y < 48;
    }

    if (
      projectileHeight === "mid"
    ) {
      return target.y < 78;
    }

    return true;
  };


  /* ===================================================
     FASTER / CLEANER BASE SPECIALS
  =================================================== */

  bigDrive = function(
    attacker,
    target
  ) {
    addComicText(
      "BIG DRIVE!",
      "yellow-text",
      1350
    );

    const ball =
      document.createElement(
        "div"
      );

    ball.className =
      "effect golf-ball";

    ball.style.bottom =
      70 +
      attacker.y +
      "px";

    setTimeout(
      () => {
        moveProjectile(
          ball,
          attacker,
          target,
          16,
          28,
          () => {
            dealDamage(
              attacker,
              target,
              12,
              {
                type: "special"
              }
            );
          },
          "low"
        );
      },
      180
    );
  };


  paintBeast = function(
    attacker,
    target
  ) {
    addComicText(
      "PAINT BEAST!",
      "blue-text",
      1450
    );

    const splash =
      document.createElement(
        "div"
      );

    splash.className =
      "effect paint-splash";

    splash.style.left =
      attacker.x +
      50 +
      "px";

    splash.style.bottom =
      100 +
      attacker.y +
      "px";

    effects.appendChild(
      splash
    );

    setTimeout(
      () => {
        splash.remove();

        const dino =
          document.createElement(
            "div"
          );

        dino.className =
          "effect pixel-dino";

        dino.innerHTML =
          dinosaurHTML();

        dino.style.bottom =
          "44px";

        if (
          attacker.facing === -1
        ) {
          dino.style.transform =
            "scaleX(-1)";
        }

        moveProjectile(
          dino,
          attacker,
          target,
          13,
          38,
          () => {
            dealDamage(
              attacker,
              target,
              14,
              {
                type: "special"
              }
            );
          },
          "low"
        );
      },
      360
    );
  };


  pimplePatch = function(
    attacker,
    target
  ) {
    addComicText(
      "PIMPLE PATCH ATTACK",
      "pink-text",
      1450
    );

    const patch =
      document.createElement(
        "div"
      );

    patch.className =
      "effect pimple-projectile";

    patch.style.bottom =
      110 +
      attacker.y +
      "px";

    setTimeout(
      () => {
        moveProjectile(
          patch,
          attacker,
          target,
          15,
          30,
          () => {
            const stuck =
              document.createElement(
                "div"
              );

            stuck.className =
              "effect pimple-stuck";

            stuck.style.left =
              target.x +
              "px";

            stuck.style.bottom =
              65 +
              target.y +
              "px";

            effects.appendChild(
              stuck
            );

            stunTarget(
              target,
              2500
            );

            setTimeout(
              () => stuck.remove(),
              2500
            );
          },
          "mid"
        );
      },
      180
    );
  };


  /* Brainrot is now a real dodgeable mid-height projectile
     instead of an automatic target stun. */
  brainrot = function(
    attacker,
    target
  ) {
    addComicText(
      "BRAINROT",
      "red-text",
      1500
    );

    const phone =
      document.createElement(
        "div"
      );

    phone.className =
      "effect brainrot-phone";

    phone.innerHTML =
      `<div class="brainrot-screen"></div>`;

    phone.style.bottom =
      92 +
      attacker.y +
      "px";

    phone.style.top =
      "auto";

    phone.animate(
      [
        {
          transform: "scale(.72) rotate(-8deg)"
        },
        {
          transform: "scale(1) rotate(4deg)"
        },
        {
          transform: "scale(.9) rotate(-4deg)"
        }
      ],
      {
        duration: 320,
        iterations: Infinity,
        direction: "alternate"
      }
    );

    setTimeout(
      () => {
        moveProjectile(
          phone,
          attacker,
          target,
          14,
          40,
          () => {
            stunTarget(
              target,
              3250
            );
          },
          "mid"
        );
      },
      180
    );
  };


  rugbyPass = function(
    attacker,
    target
  ) {
    addComicText(
      "RUGBY PASS!",
      "blue-text",
      1400
    );

    const handBall =
      attacker.fighter.querySelector(
        ".rugby-ball"
      );

    if (
      handBall
    ) {
      handBall.style.visibility =
        "hidden";
    }

    const ball =
      document.createElement(
        "div"
      );

    ball.className =
      "effect rugby-projectile";

    ball.style.bottom =
      105 +
      attacker.y +
      "px";

    setTimeout(
      () => {
        moveProjectile(
          ball,
          attacker,
          target,
          16,
          32,
          () => {
            dealDamage(
              attacker,
              target,
              11,
              {
                type: "special"
              }
            );

            if (
              handBall
            ) {
              setTimeout(
                () => {
                  handBall.style.visibility =
                    "visible";
                },
                180
              );
            }
          },
          "mid"
        );
      },
      180
    );

    /* Restore the hand ball even when the projectile misses. */
    setTimeout(
      () => {
        if (
          handBall
        ) {
          handBall.style.visibility =
            "visible";
        }
      },
      1500
    );
  };


  /* Faster cadence makes this feel reactive instead of delayed,
     while the lower mid-height hit window makes a jump meaningful. */
  daddyHungry = function(
    attacker,
    target
  ) {
    addComicText(
      "DADDY'S HUNGRY",
      "red-text",
      1550
    );

    const damagePerPlate =
      4;

    [
      0,
      1,
      2
    ].forEach(
      index => {
        setTimeout(
          () => {
            const dish =
              document.createElement(
                "div"
              );

            dish.className =
              "effect flying-dish";

            dish.style.bottom =
              82 +
              index *
              18 +
              "px";

            moveProjectile(
              dish,
              attacker,
              target,
              15,
              30,
              () => {
                dealDamage(
                  attacker,
                  target,
                  damagePerPlate,
                  {
                    type: "special"
                  }
                );
              },
              "mid"
            );
          },
          220 +
          index *
          220
        );
      }
    );
  };


  /* ===================================================
     KELLY + LEAH SPECIAL STARTUP
  =================================================== */

  if (
    typeof bbTakeYourMeds === "function"
  ) {
    bbTakeYourMeds = function(
      attacker,
      target
    ) {
      addComicText(
        "TAKE YOUR MEDS!",
        "pink-text",
        1450
      );

      const pills =
        document.createElement(
          "div"
        );

      pills.className =
        "effect bb-pill-projectile";

      pills.style.bottom =
        76 +
        attacker.y +
        "px";

      setTimeout(
        () => {
          moveProjectile(
            pills,
            attacker,
            target,
            13,
            40,
            () => {
              dealDamage(
                attacker,
                target,
                13,
                {
                  type: "special"
                }
              );
            },
            "low"
          );
        },
        180
      );
    };
  }


  if (
    typeof bbTangled === "function"
  ) {
    bbTangled = function(
      attacker,
      target
    ) {
      addComicText(
        "TANGLED!",
        "purple-text",
        1500
      );

      const yarn =
        document.createElement(
          "div"
        );

      yarn.className =
        "effect bb-yarn-ball";

      yarn.style.bottom =
        65 +
        attacker.y +
        "px";

      setTimeout(
        () => {
          moveProjectile(
            yarn,
            attacker,
            target,
            12,
            42,
            () => {
              const wrap =
                document.createElement(
                  "div"
                );

              wrap.className =
                "effect bb-yarn-wrap";

              wrap.style.left =
                target.x -
                12 +
                "px";

              wrap.style.bottom =
                48 +
                target.y +
                "px";

              effects.appendChild(
                wrap
              );

              stunTarget(
                target,
                3000
              );

              setTimeout(
                () => wrap.remove(),
                3000
              );
            },
            "low"
          );
        },
        200
      );
    };
  }


  /* ===================================================
     GRANDMOMMY — SWAP SPECIAL / ULTIMATE
  =================================================== */

  function bbChairYogaSpecial(
    attacker,
    target
  ) {
    addComicText(
      "CHAIR YOGA!",
      "purple-text",
      1450
    );

    const chair =
      document.createElement(
        "div"
      );

    chair.className =
      "effect yoga-chair";

    chair.innerHTML = `
      <div class="yoga-chair-back"></div>
      <div class="yoga-chair-seat"></div>
    `;

    chair.style.bottom =
      "28px";

    const visual =
      attacker.fighter.querySelector(
        ".visual-layer"
      );

    if (
      visual
    ) {
      visual.animate(
        [
          {
            transform: "translateY(0)"
          },
          {
            transform: "translateY(9px) scaleY(.91)"
          },
          {
            transform: "translateY(0)"
          }
        ],
        {
          duration: 320,
          easing: "ease-out"
        }
      );
    }

    chair.animate(
      [
        {
          transform: "rotate(0deg)"
        },
        {
          transform: "rotate(720deg)"
        }
      ],
      {
        duration: 850,
        iterations: Infinity
      }
    );

    setTimeout(
      () => {
        moveProjectile(
          chair,
          attacker,
          target,
          16,
          40,
          () => {
            dealDamage(
              attacker,
              target,
              13,
              {
                type: "special"
              }
            );
          },
          "low"
        );
      },
      260
    );
  }


  function bbDonnUltimate(
    attacker,
    target
  ) {
    actionLock =
      true;

    addComicText(
      "DONN, GET OVER HERE!",
      "red-text",
      1900
    );

    const assist =
      document.createElement(
        "div"
      );

    assist.className =
      "effect bb-donn-assist";

    assist.innerHTML =
      characterHTML(
        "grandaddy"
      );

    const direction =
      attacker.facing;

    let x =
      direction === 1
        ? -120
        : arena.clientWidth + 120;

    assist.style.left =
      x +
      "px";

    assist.style.bottom =
      "25px";

    if (
      direction === -1
    ) {
      assist.style.transform =
        "scaleX(-1)";
    }

    effects.appendChild(
      assist
    );

    setTimeout(
      () => {
        let traveled =
          0;

        const loop =
          setInterval(
            () => {
              const step =
                22 *
                direction;

              x += step;
              traveled +=
                Math.abs(step);

              assist.style.left =
                x +
                "px";

              if (
                Math.abs(
                  x -
                  target.x
                ) < 46
              ) {
                clearInterval(
                  loop
                );

                /* Ultimate is harder to dodge than a special,
                   but a well-timed high jump can still clear Donn. */
                if (
                  target.y < 95
                ) {
                  dealDamage(
                    attacker,
                    target,
                    30,
                    {
                      type: "ultimate",
                      ignoreBlock: true
                    }
                  );
                }

                setTimeout(
                  () => {
                    assist.remove();
                    actionLock = false;
                  },
                  260
                );

                return;
              }

              if (
                traveled >
                  arena.clientWidth +
                  320
              ) {
                clearInterval(
                  loop
                );
                assist.remove();
                actionLock = false;
              }
            },
            24
          );
      },
      330
    );

    /* Safety release if the opponent moves in an unusual way. */
    setTimeout(
      () => {
        if (
          assist.isConnected
        ) {
          assist.remove();
        }

        actionLock =
          false;
      },
      1850
    );
  }


  /* Capture the fully patched routers, including Kelly + Leah,
     then intercept Grandmommy only. */
  const bbSmoothOriginalSpecialAttack =
    specialAttack;

  specialAttack = function(
    attacker,
    target
  ) {
    if (
      attacker.character !==
        "grandmommy"
    ) {
      return bbSmoothOriginalSpecialAttack(
        attacker,
        target
      );
    }

    if (
      !canAct(attacker) ||
      attacker.specialCooldown
    ) {
      return;
    }

    beginSpecialCooldown(
      attacker
    );

    bbChairYogaSpecial(
      attacker,
      target
    );
  };


  const bbSmoothOriginalUltimateAttack =
    ultimateAttack;

  ultimateAttack = function(
    attacker,
    target
  ) {
    if (
      attacker.character !==
        "grandmommy"
    ) {
      return bbSmoothOriginalUltimateAttack(
        attacker,
        target
      );
    }

    if (
      !canAct(attacker) ||
      attacker.ultimate < 100
    ) {
      return;
    }

    attacker.ultimate =
      0;

    updateHUD();

    bbDonnUltimate(
      attacker,
      target
    );
  };


  /* ===================================================
     GRANDMOMMY HUD ICON SWAP
  =================================================== */

  const bbSmoothSpecialIconHTML =
    specialIconHTML;

  specialIconHTML = function(
    character
  ) {
    if (
      character === "grandmommy"
    ) {
      return `<div class="mini-chair-icon"></div>`;
    }

    return bbSmoothSpecialIconHTML(
      character
    );
  };


  const bbSmoothUltimateIconHTML =
    ultimateIconHTML;

  ultimateIconHTML = function(
    character
  ) {
    if (
      character === "grandmommy"
    ) {
      return `<div class="mini-don-icon">DONN</div>`;
    }

    return bbSmoothUltimateIconHTML(
      character
    );
  };


  /* ===================================================
     GRANDMOMMY SELECT-SCREEN LABELS
  =================================================== */

  function bbFixGrandmommyMoveLabels() {
    const card =
      document.querySelector(
        '.fighter-card[data-character="grandmommy"]'
      );

    if (
      card
    ) {
      const small =
        Array.from(
          card.children
        ).find(
          child =>
            child.tagName === "SMALL"
        );

      if (
        small
      ) {
        small.textContent =
          "Spatula • Chair Yoga • Donn Assist";
      }
    }

    const detailName =
      document.getElementById(
        "bbDetailName"
      );

    if (
      detailName &&
      detailName.textContent.trim() ===
        "GRANDMOMMY"
    ) {
      const moveNames =
        document.querySelectorAll(
          "#bbDetailMoves .bb-detail-move-name"
        );

      if (
        moveNames.length >= 3
      ) {
        moveNames[0].textContent =
          "Spatula";
        moveNames[1].textContent =
          "Chair Yoga";
        moveNames[2].textContent =
          "Donn Assist";
      }
    }
  }

  bbFixGrandmommyMoveLabels();

  const grandmommyCard =
    document.querySelector(
      '.fighter-card[data-character="grandmommy"]'
    );

  if (
    grandmommyCard
  ) {
    [
      "pointerenter",
      "focus",
      "click"
    ].forEach(
      eventName => {
        grandmommyCard.addEventListener(
          eventName,
          () => {
            setTimeout(
              bbFixGrandmommyMoveLabels,
              0
            );
          }
        );
      }
    );
  }
})();
