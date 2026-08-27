/* =====================================================
   BLOODLINE BRAWL — VISUAL HOTFIXES
   Small additive fixes loaded after character-updates.js.
===================================================== */

const bbVisualHotfixStyle =
  document.createElement("style");

bbVisualHotfixStyle.textContent = `
  /* LEAH — keep the current hair length, make the whole hair silhouette black. */
  .leah-hair,
  .leah-hood {
    background: #080808 !important;
    border-color: #111 !important;
  }

  /* KELLY — tuck the shovel a little farther into her hand. */
  .shovel-weapon {
    left: 1px !important;
    top: 0 !important;
  }

  /* CHAIR YOGA — chair back behind Grandmommy while she sits. */
  .yoga-chair.bb-chair-yoga-stage {
    z-index: 42 !important;
  }

  .fight-character.bb-chair-yoga-rider {
    z-index: 72 !important;
  }

  .fight-character.bb-chair-yoga-rider .visual-layer {
    position: relative;
    z-index: 72;
  }

  /* Separate front edge lets her look seated IN the chair instead of hidden behind it. */
  .bb-chair-front {
    position: absolute;
    width: 80px;
    height: 90px;
    z-index: 112 !important;
    pointer-events: none;
  }

  .bb-chair-front-seat {
    position: absolute;
    width: 60px;
    height: 18px;
    left: 10px;
    top: 49px;
    background: #9c6a3d;
    border: 4px solid #472f1f;
    border-radius: 2px;
  }

  .bb-chair-front-leg {
    position: absolute;
    width: 7px;
    height: 34px;
    top: 61px;
    background: #8c5b34;
    border: 2px solid #472f1f;
  }

  .bb-chair-front-leg.one {
    left: 17px;
  }

  .bb-chair-front-leg.two {
    right: 17px;
  }

  /* CLYDE — visible cartoon chomp while he runs. */
  .bb-clyde-running-bite .clyde-head {
    transform-origin: 72% 68%;
    animation: bbClydeNibble 420ms steps(2, end) infinite;
  }

  .bb-clyde-mouth {
    position: absolute;
    width: 20px;
    height: 10px;
    right: -7px;
    bottom: 7px;
    background: #5d1111;
    border: 2px solid #111;
    border-radius: 2px 8px 8px 2px;
    transform-origin: left center;
    animation: bbClydeMouth 420ms steps(2, end) infinite;
    z-index: 20;
  }

  .bb-clyde-mouth::before,
  .bb-clyde-mouth::after {
    content: "";
    position: absolute;
    width: 4px;
    height: 4px;
    background: #f4ead7;
    border: 1px solid #111;
    right: 3px;
  }

  .bb-clyde-mouth::before {
    top: -1px;
  }

  .bb-clyde-mouth::after {
    bottom: -1px;
  }

  .bb-clyde-impact-bite .clyde-head {
    animation: bbClydeImpactBite 240ms ease-in-out 1 !important;
  }

  .bb-clyde-impact-bite .bb-clyde-mouth {
    animation: bbClydeImpactMouth 240ms ease-in-out 1 !important;
  }

  @keyframes bbClydeNibble {
    0%, 100% { transform: rotate(0deg) translateX(0); }
    50% { transform: rotate(5deg) translateX(3px); }
  }

  @keyframes bbClydeMouth {
    0%, 100% { transform: scaleY(.45); }
    50% { transform: scaleY(1.35); }
  }

  @keyframes bbClydeImpactBite {
    0% { transform: rotate(0deg) translateX(0); }
    45% { transform: rotate(9deg) translateX(9px); }
    70% { transform: rotate(-3deg) translateX(6px); }
    100% { transform: rotate(0deg) translateX(0); }
  }

  @keyframes bbClydeImpactMouth {
    0% { transform: scaleY(.35); }
    42% { transform: scaleY(1.75); }
    68% { transform: scaleY(.2); }
    100% { transform: scaleY(.55); }
  }

  /* Small, cartoony blood flecks on Clyde's successful bite. */
  .bb-clyde-blood-drop {
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50% 50% 55% 15%;
    background: #b91f28;
    border: 1px solid #6d0d13;
    z-index: 280 !important;
    pointer-events: none;
    animation: bbClydeBlood 430ms ease-out 1 forwards;
  }

  @keyframes bbClydeBlood {
    0% {
      transform: translate(0, 0) scale(.7);
      opacity: 1;
    }
    100% {
      transform: translate(var(--bb-blood-x), var(--bb-blood-y)) scale(.25);
      opacity: 0;
    }
  }
`;

document.head.appendChild(
  bbVisualHotfixStyle
);


/* =====================================================
   KELLY NAME
===================================================== */

const bbVisualOriginalDisplayName =
  displayName;

displayName = function(
  character
) {
  if (
    character === "kelly"
  ) {
    return "KELLY";
  }

  return bbVisualOriginalDisplayName(
    character
  );
};

function bbRenameKellyLabels() {
  document
    .querySelectorAll(
      '[data-character="kelly"]'
    )
    .forEach(
      card => {
        const name =
          Array.from(
            card.children
          ).find(
            child =>
              child.tagName ===
              "STRONG"
          );

        if (
          name
        ) {
          name.textContent =
            "KELLY";
        }
      }
    );

  [
    titleLeftName,
    titleRightName,
    player1Name,
    player2Name
  ].forEach(
    element => {
      if (
        element &&
        element.textContent.trim() ===
          "MOM"
      ) {
        element.textContent =
          "KELLY";
      }
    }
  );
}

bbRenameKellyLabels();


/* =====================================================
   CHAIR YOGA SEATING LAYER
===================================================== */

function bbSeatGrandmommyInChair(
  chair
) {
  chair.classList.add(
    "bb-chair-yoga-stage"
  );

  const chairX =
    parseFloat(
      chair.style.left
    ) ||
    0;

  const candidates =
    [P1, P2].filter(
      player =>
        player.character ===
        "grandmommy"
    );

  const rider =
    candidates.sort(
      (a, b) =>
        Math.abs(a.x - chairX) -
        Math.abs(b.x - chairX)
    )[0];

  if (
    rider
  ) {
    rider.fighter.classList.add(
      "bb-chair-yoga-rider"
    );
  }

  const front =
    document.createElement(
      "div"
    );

  front.className =
    "effect bb-chair-front";

  front.innerHTML = `
    <div class="bb-chair-front-seat"></div>
    <div class="bb-chair-front-leg one"></div>
    <div class="bb-chair-front-leg two"></div>
  `;

  front.style.left =
    chair.style.left;

  front.style.bottom =
    chair.style.bottom ||
    "20px";

  effects.appendChild(
    front
  );

  /* The real chair starts flying at 1900ms in the base move. */
  setTimeout(
    () => {
      front.remove();
      chair.classList.remove(
        "bb-chair-yoga-stage"
      );

      if (
        rider
      ) {
        rider.fighter.classList.remove(
          "bb-chair-yoga-rider"
        );
      }
    },
    1840
  );
}


/* =====================================================
   REVERSE ZOMBIE DEER + CLYDE ART ORIENTATION
===================================================== */

function bbReverseSpawnOrientation(
  element
) {
  const current =
    element.style.transform ||
    "";

  if (
    current.includes(
      "scaleX(-1)"
    )
  ) {
    element.style.transform =
      current.replace(
        /scaleX\(-1\)/g,
        "scaleX(1)"
      );
  }
  else if (
    current.includes(
      "scaleX(1)"
    )
  ) {
    element.style.transform =
      current.replace(
        /scaleX\(1\)/g,
        "scaleX(-1)"
      );
  }
  else {
    element.style.transform =
      (
        current +
        " scaleX(-1)"
      ).trim();
  }
}

function bbPrepareClyde(
  clyde
) {
  bbReverseSpawnOrientation(
    clyde
  );

  clyde.classList.add(
    "bb-clyde-running-bite"
  );

  const head =
    clyde.querySelector(
      ".clyde-head"
    );

  if (
    head &&
    !head.querySelector(
      ".bb-clyde-mouth"
    )
  ) {
    const mouth =
      document.createElement(
        "div"
      );

    mouth.className =
      "bb-clyde-mouth";

    head.appendChild(
      mouth
    );
  }
}


const bbVisualEffectsObserver =
  new MutationObserver(
    mutations => {
      mutations.forEach(
        mutation => {
          mutation.addedNodes.forEach(
            node => {
              if (
                !(node instanceof HTMLElement)
              ) {
                return;
              }

              if (
                node.classList.contains(
                  "yoga-chair"
                )
              ) {
                bbSeatGrandmommyInChair(
                  node
                );
              }

              if (
                node.classList.contains(
                  "zombie-deer"
                )
              ) {
                bbReverseSpawnOrientation(
                  node
                );
              }

              if (
                node.classList.contains(
                  "clyde-model"
                )
              ) {
                bbPrepareClyde(
                  node
                );
              }
            }
          );
        }
      );
    }
  );

bbVisualEffectsObserver.observe(
  effects,
  {
    childList: true
  }
);


/* =====================================================
   CLYDE BITE IMPACT + SMALL BLOOD EFFECT
===================================================== */

function bbClydeBlood(
  target
) {
  const offsets = [
    [-13, -10],
    [11, -16],
    [18, 2],
    [-7, -22],
    [5, -7]
  ];

  offsets.forEach(
    ([dx, dy], index) => {
      const drop =
        document.createElement(
          "div"
        );

      drop.className =
        "effect bb-clyde-blood-drop";

      drop.style.left =
        (
          target.x +
          34 +
          (index - 2) * 3
        ) +
        "px";

      drop.style.bottom =
        (
          116 +
          target.y
        ) +
        "px";

      drop.style.setProperty(
        "--bb-blood-x",
        dx +
        "px"
      );

      drop.style.setProperty(
        "--bb-blood-y",
        dy +
        "px"
      );

      effects.appendChild(
        drop
      );

      setTimeout(
        () =>
          drop.remove(),
        460
      );
    }
  );
}

const bbVisualOriginalDealDamage =
  dealDamage;

dealDamage = function(
  attacker,
  target,
  amount,
  options = {}
) {
  if (
    attacker &&
    attacker.character ===
      "martin" &&
    amount === 32 &&
    options.type ===
      "ultimate"
  ) {
    const clydes =
      effects.querySelectorAll(
        ".clyde-model"
      );

    const clyde =
      clydes[
        clydes.length - 1
      ];

    if (
      clyde
    ) {
      clyde.classList.add(
        "bb-clyde-impact-bite"
      );

      setTimeout(
        () =>
          clyde.classList.remove(
            "bb-clyde-impact-bite"
          ),
        260
      );
    }

    bbClydeBlood(
      target
    );
  }

  return bbVisualOriginalDealDamage(
    attacker,
    target,
    amount,
    options
  );
};
