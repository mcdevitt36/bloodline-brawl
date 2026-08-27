/* =====================================================
   BLOODLINE BRAWL — CHARACTER VISUAL PATCHES
   Loaded after the working base game and game-updates.js.
===================================================== */

const bbCharacterStyle =
  document.createElement("style");

bbCharacterStyle.textContent = `

  /* ===================================================
     MARTIN — FIGHT-SCREEN GROUND ALIGNMENT

     Human models are about 185px tall while Martin is 105px tall.
     The fight slot starts them from the same top edge, so Martin was
     visually floating about 80px above the arena floor.
     This affects only Martin during a fight — previews stay untouched.
  =================================================== */

  .fight-character .martin-model {
    transform: translateY(80px);
  }


  /* ===================================================
     SEAN — ICE CREAM CONE WEAPON
  =================================================== */

  .ice-cream-cone-weapon {
    position: absolute;

    width: 30px;
    height: 67px;

    left: -7px;
    top: -5px;

    transform:
      rotate(20deg);

    transform-origin:
      50% 78%;

    z-index: 24;
  }

  .ice-cream-cone-weapon::before {
    content: "";

    position: absolute;

    width: 30px;
    height: 31px;

    left: 0;
    top: 0;

    border:
      3px solid #111;

    border-radius:
      50% 50% 44% 44%;

    background:
      radial-gradient(
        circle at 34% 30%,
        #fff9e4 0 18%,
        #f6c6d8 19% 48%,
        #e788ad 49% 100%
      );

    box-shadow:
      inset -4px -3px 0 rgba(0,0,0,0.08);

    z-index: 2;
  }

  .ice-cream-cone-weapon::after {
    content: "";

    position: absolute;

    left: 4px;
    top: 27px;

    width: 22px;
    height: 39px;

    background:
      repeating-linear-gradient(
        55deg,
        transparent 0 6px,
        rgba(113,70,27,0.32) 6px 8px
      ),
      repeating-linear-gradient(
        -55deg,
        #d99b54 0 7px,
        #efbc72 7px 14px
      );

    border-left:
      3px solid #111;

    border-right:
      3px solid #111;

    border-bottom:
      3px solid #111;

    clip-path:
      polygon(
        0 0,
        100% 0,
        50% 100%
      );
  }
`;

document.head.appendChild(
  bbCharacterStyle
);


/* =====================================================
   SEAN — REPLACE BAT IN ALL CURRENT + FUTURE MODELS
===================================================== */

function bbSwapSeanWeapon(
  root = document
) {

  root
    .querySelectorAll(
      ".sean-model .baseball-bat"
    )
    .forEach(
      bat => {

        const cone =
          document.createElement(
            "div"
          );

        cone.className =
          "ice-cream-cone-weapon";

        bat.replaceWith(
          cone
        );

      }
    );
}


/* Existing previews/title models were rendered before this patch loaded. */
bbSwapSeanWeapon();


/* Update Sean's visible character-select description. */
const bbSeanCardText =
  document.querySelector(
    '.fighter-card[data-character="sean"] small'
  );

if (
  bbSeanCardText
) {
  bbSeanCardText.textContent =
    "Ice Cream Cone • Plates • Zombie Deer";
}


/* Future models created by the base characterHTML() use the cone too. */
const bbOriginalCharacterHTML =
  characterHTML;

characterHTML = function(
  character
) {

  const html =
    bbOriginalCharacterHTML(
      character
    );

  if (
    character !== "sean"
  ) {
    return html;
  }

  return html.replace(
    '<div class="baseball-bat"></div>',
    '<div class="ice-cream-cone-weapon"></div>'
  );
};
