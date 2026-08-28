(() => {
const TODDLERS = ["alice", "leo", "barrett"];
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "toddlers.css?v=1";
styleLink.dataset.toddlerStyle = "true";
document.head.appendChild(styleLink);
const martinCardNode = document.getElementById("martinCard");
if (martinCardNode && !document.querySelector('[data-character="alice"]')) {
const cardsHTML = `
<button class="fighter-card" data-character="alice">
<div class="card-model-holder" data-preview="alice"></div>
<strong>ALICE</strong>
<small>Fairy Wand • Grape Pop • Fairy Princess</small>
</button>
<button class="fighter-card" data-character="leo">
<div class="card-model-holder" data-preview="leo"></div>
<strong>LEO</strong>
<small>Dino Claws • Dino Stomp • Dino Stampede</small>
</button>
<button class="fighter-card" data-character="barrett">
<div class="card-model-holder" data-preview="barrett"></div>
<strong>BARRETT</strong>
<small>Headbutt • Remote Racer • Bear Ride</small>
</button>
`;
martinCardNode.insertAdjacentHTML("beforebegin", cardsHTML);
}
window.addEventListener("load", () => {
TODDLERS.forEach(character => {
if (!BASE_ROSTER.includes(character)) BASE_ROSTER.push(character);
if (!ALL_ROSTER.includes(character)) ALL_ROSTER.push(character);
});
STATS.alice = {
hp: 100,
basic: 5,
range: 94,
recovery: 470,
specialDamage: 12,
ultimateDamage: 27
};
STATS.leo = {
hp: 100,
basic: 5.5,
range: 96,
recovery: 510,
specialDamage: 12,
ultimateDamage: 27
};
STATS.barrett = {
hp: 100,
basic: 5,
range: 92,
recovery: 660,
specialDamage: 12,
ultimateDamage: 28,
basicStun: 500
};
const baseDisplayName = displayName;
displayName = function(character) {
if (character === "alice") return "ALICE";
if (character === "leo") return "LEO";
if (character === "barrett") return "BARRETT";
return baseDisplayName(character);
};
const baseCharacterHTML = characterHTML;
characterHTML = function(c) {
if (c === "alice") {
return `
<div class="pixel-person alice-model">
<div class="alice-wings">
<div class="alice-wing left"></div>
<div class="alice-wing right"></div>
</div>
<div class="alice-crown"></div>
<div class="alice-hair"></div>
<div class="face">
<div class="eye eye-left"></div>
<div class="eye eye-right"></div>
<div class="mouth"></div>
</div>
<div class="alice-shirt"></div>
<div class="arm left-arm"></div>
<div class="arm right-arm weapon-arm">
<div class="fairy-wand"><div class="wand-star">★</div></div>
</div>
<div class="alice-pants leg left-leg"></div>
<div class="alice-pants leg right-leg"></div>
<div class="white-shoe left-shoe"></div>
<div class="white-shoe right-shoe"></div>
</div>
`;
}
if (c === "leo") {
return `
<div class="pixel-person leo-model">
<div class="leo-hair"></div>
<div class="face">
<div class="eye eye-left"></div>
<div class="eye eye-right"></div>
<div class="mouth"></div>
</div>
<div class="leo-shirt"></div>
<div class="arm left-arm"></div>
<div class="arm right-arm"></div>
<div class="leo-pants leg left-leg"></div>
<div class="leo-pants leg right-leg"></div>
<div class="dark-shoe left-shoe"></div>
<div class="dark-shoe right-shoe"></div>
</div>
`;
}
if (c === "barrett") {
return `
<div class="pixel-person barrett-model">
<div class="barrett-hair"></div>
<div class="face">
<div class="eye eye-left"></div>
<div class="eye eye-right"></div>
<div class="mouth"></div>
</div>
<div class="barrett-shirt"></div>
<div class="arm left-arm"></div>
<div class="arm right-arm remote-arm">
<div class="toy-remote">
<div class="remote-stick"></div>
<div class="remote-light"></div>
</div>
</div>
<div class="barrett-shorts leg left-leg"></div>
<div class="barrett-shorts leg right-leg"></div>
<div class="dark-shoe left-shoe"></div>
<div class="dark-shoe right-shoe"></div>
</div>
`;
}
return baseCharacterHTML(c);
};
const baseSpecialIconHTML = specialIconHTML;
specialIconHTML = function(c) {
if (c === "alice") return `<div class="mini-grape-icon">🍭</div>`;
if (c === "leo") return `<div class="mini-dino-icon">🦖</div>`;
if (c === "barrett") return `<div class="mini-car-icon">🚗</div>`;
return baseSpecialIconHTML(c);
};
const baseUltimateIconHTML = ultimateIconHTML;
ultimateIconHTML = function(c) {
if (c === "alice") return `<div class="mini-fairy-icon">★</div>`;
if (c === "leo") return `<div class="mini-stampede-icon">3X</div>`;
if (c === "barrett") return `<div class="mini-bearcar-icon">🐻</div>`;
return baseUltimateIconHTML(c);
};
const baseBasicAttack = basicAttack;
basicAttack = function(attacker, target) {
if (attacker.character === "leo") {
leoClawBurst(attacker, target);
return;
}
if (attacker.character === "barrett") {
barrettHeadbutt(attacker, target);
return;
}
baseBasicAttack(attacker, target);
};
function leoClawBurst(attacker, target) {
if (!canAct(attacker) || attacker.attackCooldown) return;
const stats = STATS.leo;
attacker.attackCooldown = true;
const swipe = index => {
const slash = document.createElement("div");
slash.className = `effect leo-claw-slash swipe-${index}`;
slash.style.left = attacker.x + (attacker.facing === 1 ? 64 : -6) + "px";
slash.style.bottom = 86 + attacker.y + "px";
if (attacker.facing === -1) slash.classList.add("facing-left-effect");
effects.appendChild(slash);
setTimeout(() => slash.remove(), 270);
};
setTimeout(() => swipe(1), 70);
setTimeout(() => {
swipe(2);
if (horizontalDistance() <= stats.range && verticalDistance() < 75) {
dealDamage(attacker, target, stats.basic, { type: "normal" });
}
}, 245);
setTimeout(() => {
attacker.attackCooldown = false;
}, stats.recovery);
}
function barrettHeadbutt(attacker, target) {
if (!canAct(attacker) || attacker.attackCooldown) return;
const stats = STATS.barrett;
attacker.attackCooldown = true;
attacker.fighter.classList.add("barrett-headbutt-action");
setTimeout(() => {
if (horizontalDistance() <= stats.range && verticalDistance() < 70) {
dealDamage(attacker, target, stats.basic, { type: "normal" });
stunTarget(target, stats.basicStun);
}
attacker.fighter.classList.add("barrett-stumble");
}, 250);
setTimeout(() => attacker.fighter.classList.remove("barrett-stumble"), 560);
setTimeout(() => {
attacker.attackCooldown = false;
attacker.fighter.classList.remove("barrett-headbutt-action");
}, stats.recovery);
}
const baseSpecialAttack = specialAttack;
specialAttack = function(attacker, target) {
if (!TODDLERS.includes(attacker.character)) {
baseSpecialAttack(attacker, target);
return;
}
if (!canAct(attacker) || attacker.specialCooldown) return;
beginSpecialCooldown(attacker);
if (attacker.character === "alice") grapePop(attacker, target);
if (attacker.character === "leo") dinoStomp(attacker, target);
if (attacker.character === "barrett") remoteRacer(attacker, target);
};
function grapePop(attacker, target) {
addComicText("GRAPE POP!", "pink-text", 1500);
const wand = attacker.fighter.querySelector(".fairy-wand");
if (wand) wand.style.visibility = "hidden";
const pop = document.createElement("div");
pop.className = "effect grape-lollipop-projectile";
pop.innerHTML = `<div class="grape-candy"></div><div class="lollipop-stick"></div>`;
pop.style.left = attacker.x + (attacker.facing === 1 ? 58 : 0) + "px";
pop.style.bottom = 92 + attacker.y + "px";
effects.appendChild(pop);
pop.animate(
[
{ transform: "scale(.2) rotate(0deg)", opacity: 0 },
{ transform: "scale(1) rotate(180deg)", opacity: 1 }
],
{ duration: 240, fill: "forwards" }
);
setTimeout(() => {
moveProjectile(
pop,
attacker,
target,
12,
31,
() => dealDamage(attacker, target, STATS.alice.specialDamage, { type: "special" }),
"mid"
);
}, 260);
setTimeout(() => {
if (wand) wand.style.visibility = "visible";
}, 1450);
}
function dinoStomp(attacker, target) {
addComicText("DINO STOMP!", "yellow-text", 1450);
attacker.fighter.classList.add("leo-stomp-action");
const foot = document.createElement("div");
foot.className = "effect dino-stomp-foot";
foot.style.left = attacker.x + 18 + "px";
foot.style.bottom = 30 + attacker.y + "px";
effects.appendChild(foot);
const wave = document.createElement("div");
wave.className = "effect dino-stomp-wave";
wave.style.left = attacker.x - 34 + "px";
wave.style.bottom = "24px";
effects.appendChild(wave);
setTimeout(() => {
if (horizontalDistance() <= 160 && target.y < 55) {
dealDamage(attacker, target, STATS.leo.specialDamage, { type: "special" });
}
}, 390);
setTimeout(() => {
foot.remove();
wave.remove();
attacker.fighter.classList.remove("leo-stomp-action");
}, 900);
}
function remoteRacer(attacker, target) {
addComicText("REMOTE RACER!", "blue-text", 1500);
const remote = attacker.fighter.querySelector(".toy-remote");
if (remote) remote.classList.add("remote-active");
const car = document.createElement("div");
car.className = "effect toy-car-projectile";
car.innerHTML = `
<div class="toy-car-window"></div>
<div class="toy-wheel w1"></div>
<div class="toy-wheel w2"></div>
`;
car.style.bottom = "31px";
setTimeout(() => {
moveProjectile(
car,
attacker,
target,
14,
31,
() => dealDamage(attacker, target, STATS.barrett.specialDamage, { type: "special" }),
"low"
);
}, 250);
setTimeout(() => {
if (remote) remote.classList.remove("remote-active");
}, 1200);
}
const baseUltimateAttack = ultimateAttack;
ultimateAttack = function(attacker, target) {
if (!TODDLERS.includes(attacker.character)) {
baseUltimateAttack(attacker, target);
return;
}
if (!canAct(attacker) || attacker.ultimate < 100) return;
attacker.ultimate = 0;
updateHUD();
if (attacker.character === "alice") fairyPrincess(attacker, target);
if (attacker.character === "leo") dinoStampede(attacker, target);
if (attacker.character === "barrett") bearRide(attacker, target);
};
function fairyPrincess(attacker, target) {
actionLock = true;
addComicText("FAIRY PRINCESS!", "pink-text", 2200);
const model = attacker.fighter.querySelector(".alice-model");
if (model) model.classList.add("alice-royal-mode");
for (let index = 0; index < 10; index++) {
setTimeout(() => {
const sparkle = document.createElement("div");
sparkle.className = "effect fairy-sparkle";
sparkle.textContent = index % 2 === 0 ? "★" : "♥";
sparkle.style.left = target.x - 45 + Math.random() * 130 + "px";
sparkle.style.bottom = 75 + target.y + Math.random() * 120 + "px";
effects.appendChild(sparkle);
setTimeout(() => sparkle.remove(), 900);
}, 90 * index);
}
const giant = document.createElement("div");
giant.className = "effect giant-grape-lollipop";
giant.innerHTML = `<div class="giant-grape-candy"></div><div class="giant-lollipop-stick"></div>`;
giant.style.left = target.x - 15 + "px";
giant.style.bottom = 45 + target.y + "px";
effects.appendChild(giant);
giant.animate(
[
{ transform: "translate(-165px,-345px) rotate(-58deg) scale(.72)", opacity: 0 },
{ transform: "translate(-90px,-220px) rotate(-30deg) scale(.9)", opacity: 1, offset: .45 },
{ transform: "translate(0,0) rotate(28deg) scale(1)", opacity: 1 }
],
{ duration: 1350, easing: "cubic-bezier(.18,.72,.2,1)", fill: "forwards" }
);
setTimeout(() => {
dealDamage(attacker, target, STATS.alice.ultimateDamage, {
type: "ultimate",
ignoreBlock: true
});
const burst = document.createElement("div");
burst.className = "effect fairy-impact-burst";
burst.style.left = target.x - 12 + "px";
burst.style.bottom = 55 + target.y + "px";
effects.appendChild(burst);
setTimeout(() => burst.remove(), 600);
}, 1350);
setTimeout(() => {
giant.remove();
if (model) model.classList.remove("alice-royal-mode");
actionLock = false;
}, 2150);
}
function toddlerLeoDinoHTML() {
return `
<div class="leo-dino-body"></div>
<div class="leo-dino-tail"></div>
<div class="leo-dino-head"></div>
<div class="leo-dino-eye"></div>
<div class="leo-dino-leg leg-a"></div>
<div class="leo-dino-leg leg-b"></div>
<div class="leo-dino-extra extra-a"></div>
<div class="leo-dino-extra extra-b"></div>
`;
}
function runLeoDino(type, attacker, target, damage) {
const dino = document.createElement("div");
dino.className = `effect leo-charge-dino ${type}`;
dino.innerHTML = toddlerLeoDinoHTML();
let x = attacker.facing === 1 ? -160 : arena.clientWidth + 160;
const direction = attacker.facing;
dino.style.left = x + "px";
dino.style.bottom = "28px";
if (direction === -1) dino.classList.add("facing-left-effect");
effects.appendChild(dino);
let hit = false;
const loop = setInterval(() => {
x += 21 * direction;
dino.style.left = x + "px";
if (!hit && Math.abs(x - target.x) < 46) {
hit = true;
dealDamage(attacker, target, damage, { type: "ultimate", ignoreBlock: true });
}
if (x < -210 || x > arena.clientWidth + 210) {
clearInterval(loop);
dino.remove();
}
}, 28);
}
function dinoStampede(attacker, target) {
actionLock = true;
addComicText("DINO STAMPEDE!", "yellow-text", 4100);
const waves = [
["triceratops", 8.5, 200],
["trex", 9, 1500],
["ankylosaurus", 9.5, 2800]
];
waves.forEach(([type, damage, delay]) => {
setTimeout(() => runLeoDino(type, attacker, target, damage), delay);
});
setTimeout(() => {
actionLock = false;
}, 4300);
}
function bearRide(attacker, target) {
actionLock = true;
addComicText("BEAR RIDE!", "red-text", 2200);
const car = document.createElement("div");
car.className = "effect bear-car-rush";
car.innerHTML = `
<div class="bear-driver-head">
<div class="bear-ear left"></div>
<div class="bear-ear right"></div>
<div class="bear-face"></div>
</div>
<div class="bear-car-body"></div>
<div class="bear-car-window"></div>
<div class="bear-wheel left"></div>
<div class="bear-wheel right"></div>
`;
let x = attacker.facing === 1 ? -190 : arena.clientWidth + 190;
const direction = attacker.facing;
car.style.left = x + "px";
car.style.bottom = "25px";
if (direction === -1) car.classList.add("facing-left-effect");
effects.appendChild(car);
let hit = false;
const loop = setInterval(() => {
x += 18 * direction;
car.style.left = x + "px";
if (!hit && Math.abs(x - target.x) < 58) {
hit = true;
dealDamage(attacker, target, STATS.barrett.ultimateDamage, {
type: "ultimate",
ignoreBlock: true
});
const impact = document.createElement("div");
impact.className = "effect bear-car-impact";
impact.style.left = target.x + "px";
impact.style.bottom = 55 + target.y + "px";
effects.appendChild(impact);
setTimeout(() => impact.remove(), 700);
}
if (x < -230 || x > arena.clientWidth + 230) {
clearInterval(loop);
car.remove();
actionLock = false;
}
}, 28);
setTimeout(() => {
if (car.isConnected) car.remove();
actionLock = false;
}, 3000);
}
function playToddlerVictoryCelebration(winner) {
if (!TODDLERS.includes(winner.character)) return;
const old = arena.querySelector(".toddler-victory-celebration");
if (old) old.remove();
const celebration = document.createElement("div");
celebration.className = `toddler-victory-celebration ${winner.character}-victory`;
if (winner.character === "alice") {
celebration.innerHTML = `
<div class="alice-celebration-stage">
${characterHTML("alice")}
<div class="celebration-grape-pop">🍭</div>
</div>
<div class="toddler-victory-caption">FAIRY PRINCESS!</div>
`;
}
if (winner.character === "leo") {
celebration.innerHTML = `
<div class="leo-celebration-stage">
<div class="leo-celebration-kid">${characterHTML("leo")}</div>
<div class="leo-celebration-dino leo-charge-dino trex">
${toddlerLeoDinoHTML()}
</div>
</div>
<div class="toddler-victory-caption">ROAR!</div>
`;
}
if (winner.character === "barrett") {
celebration.innerHTML = `
<div class="barrett-celebration-car">
<div class="celebration-barrett-head">
<div class="king-crown">♛</div>
<div class="barrett-mini-hair"></div>
<div class="barrett-mini-face">•‿•</div>
</div>
<div class="celebration-bear-head">🐻</div>
<div class="celebration-car-body"></div>
<div class="celebration-wheel left"></div>
<div class="celebration-wheel right"></div>
</div>
<div class="toddler-victory-caption">KING OF THE ROAD</div>
`;
}
arena.appendChild(celebration);
setTimeout(() => celebration.remove(), 3600);
}
const baseFinishRound = finishRound;
finishRound = function(winner) {
baseFinishRound(winner);
if (player1Wins >= 2 || player2Wins >= 2) {
setTimeout(() => playToddlerVictoryCelebration(winner), 675);
}
};
const baseResetPlayerState = resetPlayerState;
resetPlayerState = function(player) {
baseResetPlayerState(player);
player.fighter.classList.remove(
"barrett-headbutt-action",
"barrett-stumble",
"leo-stomp-action"
);
const aliceModel = player.fighter.querySelector(".alice-model");
if (aliceModel) aliceModel.classList.remove("alice-royal-mode");
};
renderPreviews();
generateTitleMatchup();
});
})();
