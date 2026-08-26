* {
  box-sizing: border-box;
}

body {
  margin: 0;

  background: #080c13;

  color: white;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  user-select: none;

  touch-action: manipulation;
}

button {
  font-family: inherit;
}

#game {
  width: 100%;

  max-width: 950px;

  margin: auto;
}


/* =========================
   SCREENS
========================= */

.screen {
  display: none;

  min-height: 100vh;

  padding: 25px 18px;

  flex-direction: column;

  align-items: center;

  justify-content: center;
}

.screen.active {
  display: flex;
}


/* =========================
   TITLE SCREEN
========================= */

.title-screen {
  background:
    linear-gradient(
      #3496d9 0%,
      #77c8ed 55%,
      #4e9638 56%,
      #2e711e 100%
    );
}

.presents {
  font-weight: 900;

  letter-spacing: 6px;

  font-size: 17px;

  text-shadow:
    3px 3px black;
}

.game-logo {
  margin: 5px 0 0;

  line-height: 0.8;

  text-align: center;

  font-size:
    clamp(
      55px,
      10vw,
      95px
    );

  color: #ffd52a;

  text-shadow:
    7px 7px 0 black;
}

.game-logo span {
  display: block;

  color: #ef3326;
}

.tagline {
  margin-top: 28px;

  background: #070707;

  padding:
    13px
    24px;

  font-size: 18px;

  font-weight: 900;

  letter-spacing: 3px;
}

.title-fighters {
  display: flex;

  justify-content: center;

  align-items: flex-end;

  gap: 50px;

  margin:
    45px
    0
    35px;
}

.title-fighter {
  display: flex;

  flex-direction: column;

  align-items: center;
}

.title-name {
  margin-top: 14px;

  font-size: 20px;

  font-weight: 900;
}

.vs {
  font-size: 42px;

  font-weight: 900;

  color: #ffd52a;

  text-shadow:
    3px
    3px
    black;
}


/* =========================
   BUTTON
========================= */

.big-button {
  background: #ffd52a;

  color: #111;

  padding:
    15px
    42px;

  min-width: 220px;

  border:
    4px solid #111;

  border-radius: 8px;

  box-shadow:
    0 6px 0 #111;

  font-size: 25px;

  font-weight: 900;

  cursor: pointer;
}

.big-button:active {
  transform:
    translateY(4px);

  box-shadow:
    0 2px 0 #111;
}


/* =========================
   PEOPLE
========================= */

.pixel-person {
  position: relative;

  width: 100px;

  height: 180px;
}


/* FACE */

.face {
  position: absolute;

  width: 43px;

  height: 45px;

  left: 29px;

  top: 27px;

  background: #efc09b;

  border:
    3px solid #111;

  z-index: 5;

  border-radius: 3px;
}


/* EYES */

.eye {
  position: absolute;

  width: 5px;

  height: 8px;

  background: #111;

  top: 15px;
}

.eye-left {
  left: 9px;
}

.eye-right {
  right: 9px;
}


/* MOUTH */

.mouth {
  position: absolute;

  width: 14px;

  height: 6px;

  left: 12px;

  bottom: 7px;

  border-bottom:
    3px solid #111;

  border-radius: 50%;
}


/* =========================
   BRENDAN
========================= */

.brendan-hair {
  position: absolute;

  width: 48px;

  height: 19px;

  left: 27px;

  top: 17px;

  background: #111;

  border:
    3px solid #111;

  border-radius:
    7px
    7px
    2px
    2px;

  z-index: 10;
}


/* polo */

.brendan-shirt {
  position: absolute;

  width: 60px;

  height: 64px;

  left: 20px;

  top: 69px;

  background: #173963;

  border:
    3px solid #111;

  z-index: 2;
}


/* Polo collar */

.polo-collar {
  position: absolute;

  width: 17px;

  height: 14px;

  top: 0;

  background: white;

  z-index: 8;
}

.collar-left {
  left: 13px;

  clip-path:
    polygon(
      0 0,
      100% 0,
      100% 100%
    );
}

.collar-right {
  right: 13px;

  clip-path:
    polygon(
      0 0,
      100% 0,
      0 100%
    );
}


/* Whale */

.whale {
  position: absolute;

  top: 24px;

  right: 7px;

  font-size: 12px;

  filter:
    saturate(0.7);
}


/* =========================
   GRANDADDY
========================= */

.grandaddy-face {
  background: #dfb28e;
}

.grandaddy-mouth {
  width: 13px;
}


/* white hair */

.grandaddy-hair {
  position: absolute;

  width: 54px;

  height: 21px;

  left: 24px;

  top: 28px;

  background: #ddd;

  z-index: 3;
}


/* glasses */

.glasses {
  position: absolute;

  width: 18px;

  height: 14px;

  top: 42px;

  border:
    3px solid #111;

  background:
    rgba(
      255,
      255,
      255,
      0.15
    );

  z-index: 15;
}

.glasses-left {
  left: 31px;
}

.glasses-right {
  left: 51px;
}

.glasses-bridge {
  position: absolute;

  width: 7px;

  height: 3px;

  left: 47px;

  top: 48px;

  background: #111;

  z-index: 16;
}


/* Hat */

.orange-hat {
  position: absolute;

  width: 59px;

  height: 25px;

  left: 21px;

  top: 8px;

  background: #f26822;

  border:
    3px solid #111;

  border-radius:
    12px
    12px
    3px
    3px;

  z-index: 20;
}

.orange-brim {
  position: absolute;

  width: 38px;

  height: 9px;

  left: 8px;

  top: 29px;

  background: #f26822;

  border:
    3px solid #111;

  z-index: 21;
}

.hat-letter {
  position: absolute;

  top: 9px;

  left: 43px;

  color: navy;

  font-size: 18px;

  font-weight: 900;

  z-index: 22;
}


/* Shirt */

.grandaddy-shirt {
  position: absolute;

  width: 62px;

  height: 65px;

  left: 19px;

  top: 70px;

  background: #233f68;

  border:
    3px solid #111;
}


/* =========================
   ARMS
========================= */

.skin {
  background: #efc09b;

  border:
    3px solid #111;
}

.arm {
  position: absolute;

  width: 15px;

  height: 58px;

  top: 76px;

  z-index: 4;
}

.left-arm {
  left: 11px;

  transform:
    rotate(5deg);
}

.right-arm {
  right: 11px;

  transform:
    rotate(-5deg);
}


/* =========================
   LEGS
========================= */

.leg {
  position: absolute;

  width: 23px;

  height: 54px;

  top: 127px;

  border:
    3px solid #111;
}

.left-leg {
  left: 25px;
}

.right-leg {
  right: 25px;
}

.khaki {
  background: #c4a565;
}

.black-short {
  background: #161616;
}


/* =========================
   SHOES
========================= */

.white-shoe {
  position: absolute;

  width: 30px;

  height: 13px;

  top: 170px;

  background: white;

  border:
    3px solid #111;
}

.left-shoe {
  left: 18px;
}

.right-shoe {
  right: 18px;
}


/* =========================
   BRENDAN GOLF CLUB
========================= */

.golf-club {
  position: absolute;

  width: 5px;

  height: 90px;

  right: -2px;

  top: 65px;

  background: #777;

  border:
    2px solid #111;

  transform:
    rotate(-23deg);

  transform-origin:
    top center;

  z-index: 10;
}

.golf-club::after {
  content: "";

  position: absolute;

  width: 21px;

  height: 11px;

  bottom: -3px;

  left: -2px;

  background: #999;

  border:
    2px solid #111;
}


/* =========================
   GRANDADDY HAMMER
========================= */

.hammer {
  position: absolute;

  width: 6px;

  height: 50px;

  right: -2px;

  top: 87px;

  background: #77502d;

  border:
    2px solid #111;

  transform:
    rotate(-35deg);

  transform-origin:
    bottom center;

  z-index: 10;
}

.hammer::before {
  content: "";

  position: absolute;

  width: 25px;

  height: 13px;

  left: -10px;

  top: -7px;

  background: #777;

  border:
    3px solid #111;
}


/* =========================
   CHARACTER SELECT
========================= */

.select-screen {
  background:
    radial-gradient(
      circle,
      #183653,
      #060a12 70%
    );
}

.select-screen h2 {
  font-size:
    clamp(
      32px,
      6vw,
      55px
    );

  margin-top: 0;

  text-align: center;
}

.fighter-select {
  display: flex;

  justify-content: center;

  flex-wrap: wrap;

  gap: 25px;

  width: 100%;
}

.fighter-card {
  width: 280px;

  min-height: 365px;

  background: #121a24;

  color: white;

  border:
    4px solid #555;

  padding: 24px;

  display: flex;

  flex-direction: column;

  align-items: center;

  cursor: pointer;
}

.fighter-card.selected {
  border-color: #40aaff;

  box-shadow:
    0 0 25px
    rgba(
      64,
      170,
      255,
      0.5
    );
}

.card-model {
  transform:
    scale(1.15);

  margin-bottom: 35px;
}

.fighter-card strong {
  font-size: 26px;
}

.fighter-card small {
  color: #aaa;

  margin-top: 8px;
}

#selectionText {
  margin:
    26px
    0;

  font-weight: 900;
}


/* =========================
   HUD
========================= */

.fight-screen {
  background: #090d12;

  justify-content: flex-start;
}

.hud {
  width: 100%;

  display: grid;

  grid-template-columns:
    1fr auto 1fr;

  gap: 15px;

  align-items: start;
}

.hud-side.right {
  text-align: right;
}

.hud-name {
  font-weight: 900;

  font-size: 18px;

  margin-bottom: 5px;
}

.health-bar {
  width: 100%;

  height: 26px;

  background: #562020;

  border:
    3px solid white;
}

.health-fill {
  width: 100%;

  height: 100%;

  background: #2fd63a;

  transition:
    width
    0.2s;
}

.ultimate-bar {
  width: 100%;

  height: 12px;

  margin-top: 5px;

  background: #222;

  border:
    2px solid white;
}

.ultimate-fill {
  width: 0%;

  height: 100%;

  background: #ffd52a;

  transition:
    width
    0.2s;
}

.round-text {
  font-size: 24px;

  font-weight: 900;

  color: #ffd52a;

  min-width: 130px;

  text-align: center;
}


/* =========================
   ARENA
========================= */

.arena {
  position: relative;

  width: 100%;

  height: 440px;

  margin-top: 18px;

  overflow: hidden;

  border:
    4px solid #333;

  background:
    linear-gradient(
      #70c7ef 0%,
      #70c7ef 64%,
      #4f9d3d 65%,
      #2c741f 100%
    );
}


/* fence */

.fence {
  position: absolute;

  bottom: 100px;

  width: 100%;

  height: 80px;

  background:
    repeating-linear-gradient(
      90deg,
      #8a6742 0,
      #8a6742 22px,
      #65492f 22px,
      #65492f 27px
    );

  border-top:
    8px solid #594027;
}


/* clouds */

.cloud {
  position: absolute;

  width: 95px;

  height: 28px;

  background: rgba(
    255,
    255,
    255,
    0.75
  );

  border-radius: 40px;
}

.cloud-one {
  top: 30px;

  left: 12%;
}

.cloud-two {
  top: 80px;

  right: 15%;
}


/* =========================
   FIGHTERS
========================= */

.fight-character {
  position: absolute;

  bottom: 25px;

  width: 100px;

  height: 180px;

  transition:
    left
    0.07s linear;
}

.fight-character .pixel-person {
  transform-origin:
    bottom center;
}

.cpu-facing {
  transform:
    scaleX(-1);
}


/* =========================
   EFFECTS
========================= */

#effects {
  position: absolute;

  inset: 0;

  pointer-events: none;

  z-index: 50;
}

.effect {
  position: absolute;

  font-size: 60px;

  z-index: 100;
}


/* =========================
   HIT
========================= */

.attack-animation {
  animation:
    attackSwing
    0.3s;
}

@keyframes attackSwing {

  0% {
    transform:
      rotate(0deg);
  }

  50% {
    transform:
      rotate(13deg)
      translateX(13px);
  }

  100% {
    transform:
      rotate(0deg);
  }

}

.hit-animation {
  animation:
    hitShake
    0.25s;
}

@keyframes hitShake {

  0% {
    transform:
      translateX(0);
  }

  30% {
    transform:
      translateX(-10px);
  }

  60% {
    transform:
      translateX(12px);
  }

  100% {
    transform:
      translateX(0);
  }

}


/* =========================
   KO
========================= */

.ko-loser {
  animation:
    fallOver
    0.8s
    forwards;
}

@keyframes fallOver {

  0% {
    transform:
      rotate(0deg)
      translateY(0);
  }

  70% {
    transform:
      rotate(80deg)
      translateY(8px);
  }

  100% {
    transform:
      rotate(90deg)
      translateY(15px);
  }

}


/* X EYES */

.ko-loser .eye {
  width: 10px;

  height: 10px;

  background: transparent;
}

.ko-loser .eye::before,
.ko-loser .eye::after {
  content: "";

  position: absolute;

  top: 4px;

  left: 0;

  width: 11px;

  height: 3px;

  background: #111;
}

.ko-loser .eye::before {
  transform:
    rotate(45deg);
}

.ko-loser .eye::after {
  transform:
    rotate(-45deg);
}


/* ZZZ */

.sleep-zzz {
  position: absolute;

  font-size: 28px;

  font-weight: 900;

  color: white;

  text-shadow:
    2px
    2px
    black;

  animation:
    zzzFloat
    1.2s
    infinite alternate;
}

@keyframes zzzFloat {

  from {
    transform:
      translateY(0);

    opacity: 0.7;
  }

  to {
    transform:
      translateY(-18px);

    opacity: 1;
  }

}


/* KO overlay */

.ko-overlay {
  position: absolute;

  inset: 0;

  z-index: 500;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  background:
    rgba(
      0,
      0,
      0,
      0.35
    );

  pointer-events: none;
}

.ko-text {
  font-size:
    clamp(
      80px,
      16vw,
      150px
    );

  font-weight: 1000;

  color: #ffcf27;

  text-shadow:
    7px 7px 0 #b31916,
    12px 12px 0 #111;

  animation:
    koPop
    0.5s;
}

@keyframes koPop {

  0% {
    transform:
      scale(0.2);
  }

  80% {
    transform:
      scale(1.2);
  }

  100% {
    transform:
      scale(1);
  }

}

.winner-text {
  margin-top: 12px;

  font-size: 28px;

  font-weight: 900;

  text-shadow:
    3px
    3px
    black;
}

.new-game-button {
  margin-top: 20px;

  padding:
    12px
    28px;

  border:
    3px solid white;

  background: #111;

  color: white;

  font-size: 18px;

  font-weight: 900;

  cursor: pointer;

  pointer-events: auto;
}


/* =========================
   CONTROLS
========================= */

.controls {
  width: 100%;

  margin-top: 15px;
}

.movement,
.attacks {
  display: flex;

  gap: 10px;

  margin-top: 10px;
}

.controls button {
  flex: 1;

  min-height: 58px;

  border: none;

  border-radius: 8px;

  font-size: 15px;

  font-weight: 900;

  cursor: pointer;
}

#attackButton {
  background: #eee;
}

#specialButton {
  background: #5baeff;
}

#ultimateButton {
  background: #ffd52a;
}

#blockButton {
  background: #aaa;
}


/* =========================
   UTILITY
========================= */

.hidden {
  display: none !important;
}


/* =========================
   MOBILE
========================= */

@media
(max-width: 600px) {

  .title-fighters {
    gap: 10px;
  }

  .title-fighter
  .pixel-person {
    transform:
      scale(0.82);
  }

  .vs {
    font-size: 28px;
  }

  .arena {
    height: 350px;
  }

  .hud-name {
    font-size: 14px;
  }

  .round-text {
    font-size: 18px;

    min-width: 80px;
  }

}
