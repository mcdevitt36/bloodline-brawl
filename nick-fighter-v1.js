/* =====================================================
   BLOODLINE BRAWL — NICK FIGHTER V1
   Hidden unlock fighter foundation.
   Loads BEFORE Family Challenges so existing Daily/Weekly
   tracking wraps Nick's combat like every other fighter.
===================================================== */

(() => {
  if (window.__bbNickFighterV1Loaded) return;
  window.__bbNickFighterV1Loaded = true;

  const NICK = "nick";
  const ERIN_STORAGE = "bb-erin-challenge-v1";

  function storedNickUnlock() {
    if (localStorage.getItem("nickUnlocked") === "true") return true;
    try {
      return JSON.parse(localStorage.getItem(ERIN_STORAGE) || "{}")?.nickUnlocked === true;
    } catch (_) {
      return false;
    }
  }

  const style = document.createElement("style");
  style.id = "bb-nick-fighter-style-v1";
  style.textContent = `
    .nick-model{position:relative;width:100px;height:185px}
    .nick-hair{position:absolute;left:27px;top:22px;width:48px;height:22px;background:#513522;border:3px solid #111;border-radius:9px 9px 4px 4px;z-index:9}
    .nick-hair::after{content:"";position:absolute;right:-5px;top:8px;width:11px;height:20px;background:#513522;border-right:3px solid #111;border-bottom:3px solid #111;border-radius:0 4px 8px 0}
    .nick-cap{position:absolute;left:21px;top:7px;width:59px;height:27px;background:linear-gradient(#17385e,#0c2441);border:3px solid #111;border-radius:16px 16px 5px 5px;z-index:20;transform-origin:55% 85%}
    .nick-cap::before{content:"";position:absolute;left:-13px;top:19px;width:34px;height:9px;background:#102e50;border:3px solid #111;border-radius:8px 3px 5px 8px;transform:rotate(-5deg)}
    .nick-cap::after{content:"N";position:absolute;left:22px;top:3px;color:#f4f6f7;font:1000 14px/1 Arial,sans-serif;text-shadow:1px 1px #111}
    .nick-shirt{position:absolute;width:62px;height:65px;left:19px;top:70px;background:linear-gradient(#173963,#102846);border:3px solid #111;z-index:2}
    .nick-shirt::after{content:"";position:absolute;left:8px;right:8px;top:12px;height:4px;background:#ef7423;border:1px solid #111;opacity:.9}
    .nick-pants{background:#b8b5ae}
    .nick-bat{position:absolute;left:4px;top:-27px;width:10px;height:99px;border:2px solid #111;border-radius:7px 7px 4px 4px;background:linear-gradient(90deg,#b97c3c,#e1aa63 48%,#9c6230);transform:rotate(18deg);transform-origin:50% 82%;z-index:25;animation:bbNickIdleBat 2.8s ease-in-out infinite}
    .nick-bat::before{content:"";position:absolute;left:-3px;bottom:-8px;width:14px;height:15px;border:2px solid #111;border-radius:4px;background:#5c331d}
    @keyframes bbNickIdleBat{0%,100%{transform:rotate(18deg) translateY(0)}50%{transform:rotate(14deg) translateY(-2px)}}
    .nick-model.bb-nick-swing-a .weapon-arm{animation:bbNickSwingA .46s cubic-bezier(.18,.75,.2,1) 1}
    .nick-model.bb-nick-swing-b .weapon-arm{animation:bbNickSwingB .48s cubic-bezier(.18,.75,.2,1) 1}
    @keyframes bbNickSwingA{0%{transform:rotate(0)}25%{transform:rotate(-34deg)}68%{transform:rotate(62deg)}100%{transform:rotate(4deg)}}
    @keyframes bbNickSwingB{0%{transform:rotate(0)}28%{transform:rotate(-48deg)}70%{transform:rotate(38deg) translateY(7px)}100%{transform:rotate(3deg)}}
    .bb-nick-bat-swish{position:absolute;width:72px;height:44px;border:7px solid rgba(244,198,112,.88);border-left-color:transparent;border-bottom-color:transparent;border-radius:50%;z-index:270;pointer-events:none;animation:bbNickSwish .32s ease-out forwards}
    @keyframes bbNickSwish{from{transform:scale(.65) rotate(-25deg);opacity:.95}to{transform:scale(1.2) rotate(28deg);opacity:0}}

    .bb-icon-nick-bat,.bb-icon-yield,.bb-icon-doubleplay{position:relative;width:34px;height:34px;margin:auto}
    .bb-icon-nick-bat::before{content:"";position:absolute;left:15px;top:1px;width:7px;height:32px;border-radius:5px;background:#c88b49;border:2px solid #111;transform:rotate(42deg)}
    .bb-icon-yield::before{content:"";position:absolute;left:3px;bottom:5px;width:28px;height:21px;border-left:3px solid #e7edf2;border-bottom:3px solid #e7edf2}
    .bb-icon-yield::after{content:"";position:absolute;left:7px;top:7px;width:23px;height:17px;border-top:4px solid #ef7b2d;border-radius:55% 45% 0 0;transform:rotate(-18deg);box-shadow:8px -3px 0 -5px #ef7b2d}
    .bb-icon-doubleplay::before,.bb-icon-doubleplay::after{content:"";position:absolute;left:14px;top:1px;width:6px;height:32px;border:2px solid #111;border-radius:4px;background:#ef7b2d;transform:rotate(45deg)}
    .bb-icon-doubleplay::after{background:#2364a8;transform:rotate(-45deg)}

    .bb-yield-graph{position:absolute;width:142px;height:88px;z-index:310;padding:8px 8px 16px;border:3px solid #111;background:rgba(8,20,34,.94);box-shadow:5px 6px 0 rgba(0,0,0,.28);pointer-events:none;overflow:hidden;animation:bbYieldGraphIn .35s ease-out both}
    .bb-yield-graph::before{content:"";position:absolute;left:15px;right:10px;bottom:22px;height:42px;border-left:2px solid #dce8f1;border-bottom:2px solid #dce8f1;opacity:.86}
    .bb-yield-line{position:absolute;left:23px;bottom:30px;width:102px;height:32px;border-top:5px solid #ef792b;border-radius:75% 28% 0 0;transform:rotate(-11deg) scaleX(.12);transform-origin:left center;animation:bbYieldRise .7s .15s cubic-bezier(.2,.75,.2,1) forwards}
    .bb-yield-arrow{position:absolute;right:7px;top:9px;color:#ffd54a;font:1000 20px/1 Arial,sans-serif;animation:bbYieldArrow .6s .25s ease-out both}
    .bb-yield-labels{position:absolute;left:19px;right:8px;bottom:4px;display:flex;justify-content:space-between;color:#d6e2ec;font:1000 8px/1 Arial,sans-serif;letter-spacing:.5px}
    @keyframes bbYieldGraphIn{from{transform:translateY(9px) scale(.86);opacity:0}to{transform:translateY(0) scale(1);opacity:1}}
    @keyframes bbYieldRise{to{transform:rotate(-11deg) scaleX(1)}}
    @keyframes bbYieldArrow{from{transform:translate(-8px,8px);opacity:0}to{transform:translate(0,0);opacity:1}}
    .bb-bond-projectile{position:absolute;width:58px;height:32px;z-index:315;display:flex;align-items:center;justify-content:center;border:3px solid #10202e;border-radius:4px;background:linear-gradient(135deg,rgba(255,255,255,.42),transparent 45%),linear-gradient(#e8e1c2,#cfc49a);color:#182b39;box-shadow:4px 4px 0 rgba(0,0,0,.22);font:1000 10px/1 Arial,sans-serif;letter-spacing:.5px;pointer-events:none}
    .bb-bond-projectile::before{content:"BOND";position:absolute;left:4px;top:3px;color:#754f2a;font-size:6px}
    .bb-bond-projectile::after{content:"";position:absolute;right:5px;bottom:4px;width:13px;height:8px;border-top:2px solid #e66d2c;transform:rotate(-18deg)}
    .bb-yield-hit{position:absolute;width:88px;height:46px;z-index:330;color:#ffd34c;font:1000 17px/1 Impact,"Arial Black",sans-serif;text-shadow:2px 2px #111;pointer-events:none;animation:bbYieldHit .48s ease-out forwards}
    @keyframes bbYieldHit{from{transform:scale(.7) translateY(8px);opacity:1}to{transform:scale(1.15) translateY(-24px);opacity:0}}

    .bb-queens-stadium{position:absolute;inset:0;z-index:250;pointer-events:none;background:radial-gradient(circle at 20% 6%,rgba(255,155,63,.34),transparent 24%),radial-gradient(circle at 80% 6%,rgba(65,135,225,.36),transparent 24%),linear-gradient(180deg,rgba(5,14,29,.5),rgba(8,16,25,.18) 62%,transparent);animation:bbStadiumPulse .7s ease-in-out infinite alternate}
    .bb-queens-stadium::before,.bb-queens-stadium::after{content:"";position:absolute;top:3%;width:16%;height:42%;background:linear-gradient(180deg,rgba(255,245,205,.58),rgba(255,245,205,0));clip-path:polygon(38% 0,62% 0,100% 100%,0 100%);opacity:.42}
    .bb-queens-stadium::before{left:8%;transform:rotate(9deg)}.bb-queens-stadium::after{right:8%;transform:rotate(-9deg)}
    @keyframes bbStadiumPulse{from{filter:saturate(1)}to{filter:saturate(1.3) brightness(1.08)}}
    .bb-ny-player{position:absolute;width:72px;height:132px;z-index:340;pointer-events:none;transform-origin:bottom center}
    .bb-ny-player .head{position:absolute;left:22px;top:9px;width:31px;height:31px;border:3px solid #111;border-radius:45%;background:#eab78e;z-index:4}
    .bb-ny-player .cap{position:absolute;left:17px;top:0;width:42px;height:17px;border:3px solid #111;border-radius:12px 12px 4px 4px;background:#245e9e;z-index:7}
    .bb-ny-player .cap::after{content:"";position:absolute;left:-8px;top:10px;width:20px;height:6px;border:2px solid #111;background:#245e9e}
    .bb-ny-player .jersey{position:absolute;left:14px;top:38px;width:48px;height:53px;border:3px solid #111;background:linear-gradient(90deg,#2467ad 0 68%,#f0782b 69%);z-index:3}
    .bb-ny-player .jersey::after{content:"NY";position:absolute;left:14px;top:12px;color:#f7f7f7;font:1000 10px/1 Arial,sans-serif}
    .bb-ny-player .arm{position:absolute;top:43px;width:11px;height:46px;border:3px solid #111;background:#eab78e;z-index:2}.bb-ny-player .arm.a{left:5px}.bb-ny-player .arm.b{right:5px}
    .bb-ny-player .leg{position:absolute;top:87px;width:17px;height:42px;border:3px solid #111;background:#f2f2ef}.bb-ny-player .leg.a{left:18px}.bb-ny-player .leg.b{right:18px}
    .bb-ny-player .helper-bat{position:absolute;right:-5px;top:31px;width:7px;height:72px;border:2px solid #111;border-radius:5px;background:#c78d50;transform:rotate(-30deg);z-index:9}
    .bb-ny-player.bb-pitching{animation:bbPitcherWindup .82s ease-in-out 1}.bb-ny-player.bb-batting{animation:bbBatterSwing .72s ease-in-out 1}
    .bb-ny-player.bb-sliding-left{animation:bbSlideLeft .7s cubic-bezier(.15,.75,.2,1) forwards}.bb-ny-player.bb-sliding-right{animation:bbSlideRight .7s cubic-bezier(.15,.75,.2,1) forwards}
    @keyframes bbPitcherWindup{0%,100%{transform:rotate(0) translateY(0)}35%{transform:rotate(-10deg) translateY(-7px)}70%{transform:rotate(13deg) translateY(2px)}}
    @keyframes bbBatterSwing{0%{transform:rotate(0)}38%{transform:rotate(-13deg)}72%{transform:rotate(14deg)}100%{transform:rotate(0)}}
    @keyframes bbSlideLeft{to{transform:translateX(185px) translateY(19px) rotate(12deg)}}@keyframes bbSlideRight{to{transform:translateX(-185px) translateY(19px) rotate(-12deg)}}
    .bb-baseball{position:absolute;width:25px;height:25px;z-index:355;border-radius:50%;border:3px solid #111;background:linear-gradient(90deg,transparent 43%,#c64835 44% 49%,transparent 50%),#f6f1e8;box-shadow:0 0 12px rgba(255,235,195,.7);pointer-events:none}
    .bb-baseball.bb-power-ball{width:42px;height:42px;border-width:4px;box-shadow:0 0 0 6px rgba(239,119,42,.26),0 0 0 12px rgba(45,105,184,.18),0 0 26px rgba(255,140,53,.8)}
    .bb-doubleplay-burst{position:absolute;width:128px;height:78px;z-index:365;pointer-events:none;background:radial-gradient(circle at 25% 50%,rgba(239,118,42,.92) 0 11%,transparent 12%),radial-gradient(circle at 74% 48%,rgba(48,109,189,.92) 0 11%,transparent 12%),repeating-radial-gradient(circle,rgba(219,180,123,.72) 0 4px,transparent 5px 15px);filter:drop-shadow(4px 5px 0 rgba(0,0,0,.18));animation:bbDoubleBurst .55s ease-out forwards}
    @keyframes bbDoubleBurst{from{transform:scale(.55);opacity:.9}to{transform:scale(1.35);opacity:0}}

    .bb-nick-victory-person{animation:bbNickVictoryBounce .95s ease-in-out 4!important}.bb-nick-victory-person .nick-cap{animation:bbNickCapTip 1.1s .35s ease-in-out 2}.bb-nick-victory-person .nick-bat{animation:bbNickBatFlip 1.25s 1.3s cubic-bezier(.2,.72,.2,1) 1 forwards}
    @keyframes bbNickVictoryBounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-10px)}}@keyframes bbNickCapTip{0%,100%{transform:rotate(0)}45%{transform:rotate(-16deg) translateY(3px)}}@keyframes bbNickBatFlip{0%{transform:rotate(18deg) translateY(0)}45%{transform:rotate(210deg) translateY(-18px)}100%{transform:rotate(378deg) translateY(0)}}

    body.bb-skin-arcade .nick-shirt{background:linear-gradient(#5b4cc9,#2f86c7)!important}body.bb-skin-midnight .nick-shirt{background:linear-gradient(#152d4b,#091523)!important}body.bb-skin-rival .nick-shirt{background:linear-gradient(135deg,#ec4040 0 58%,#f2f2f2 59% 72%,#181818 73%)!important}body.bb-skin-retro .nick-shirt{background:linear-gradient(135deg,#24d9d0,#f4df39)!important}body.bb-skin-champion .nick-shirt{background:linear-gradient(135deg,#171717 0 58%,#f3c933 59% 78%,#8f6c08 79%)!important;box-shadow:inset 0 0 0 2px rgba(255,220,70,.28)!important}body.bb-skin-champion .nick-model{filter:drop-shadow(0 0 5px rgba(255,210,55,.38))}
  `;
  document.head.appendChild(style);

  STATS.nick = { hp:100, basic:5.5, range:118, recovery:520, specialDamage:13, ultimateDamage:27 };

  const previousDisplayNameNick = displayName;
  displayName = function(character) {
    if (character === NICK) return "NICK";
    return previousDisplayNameNick(character);
  };

  const previousCharacterHTMLNick = characterHTML;
  characterHTML = function(character) {
    if (character === NICK) {
      return `<div class="pixel-person nick-model"><div class="nick-hair"></div><div class="face"><div class="eye eye-left"></div><div class="eye eye-right"></div><div class="mouth"></div></div><div class="nick-cap"></div><div class="nick-shirt"></div><div class="arm left-arm"></div><div class="arm right-arm weapon-arm"><div class="nick-bat"></div></div><div class="leg left-leg nick-pants"></div><div class="leg right-leg nick-pants"></div><div class="white-shoe left-shoe"></div><div class="white-shoe right-shoe"></div></div>`;
    }
    return previousCharacterHTMLNick(character);
  };

  const previousSpecialIconNick = specialIconHTML;
  specialIconHTML = function(character) {
    if (character === NICK) return '<div class="bb-icon-yield"></div>';
    return previousSpecialIconNick(character);
  };

  const previousUltimateIconNick = ultimateIconHTML;
  ultimateIconHTML = function(character) {
    if (character === NICK) return '<div class="bb-icon-doubleplay"></div>';
    return previousUltimateIconNick(character);
  };

  if (typeof bbMeleeIconHTML === "function") {
    const previousMeleeIconNick = bbMeleeIconHTML;
    bbMeleeIconHTML = function(character) {
      if (character === NICK) return '<div class="bb-icon-nick-bat"></div>';
      return previousMeleeIconNick(character);
    };
  }

  function installRosterEntry() {
    if (!BASE_ROSTER.includes(NICK)) BASE_ROSTER.push(NICK);
    if (!ALL_ROSTER.includes(NICK)) {
      const martinIndex = ALL_ROSTER.indexOf("martin");
      ALL_ROSTER.splice(martinIndex >= 0 ? martinIndex : ALL_ROSTER.length, 0, NICK);
    }
  }

  const fighterSelect = document.querySelector(".fighter-select");

  function createNickCard() {
    if (!storedNickUnlock() || !fighterSelect) return null;
    let card = fighterSelect.querySelector('.fighter-card[data-character="nick"]');
    if (card) return card;
    card = document.createElement("button");
    card.className = "fighter-card";
    card.dataset.character = NICK;
    card.innerHTML = '<div class="card-model-holder" data-preview="nick"></div><strong>NICK</strong><small>Baseball Bat • Yield Curve • Queens Double Play</small>';
    if (martinCard && martinCard.parentElement === fighterSelect) martinCard.before(card);
    else fighterSelect.appendChild(card);
    const holder = card.querySelector('[data-preview="nick"]');
    if (holder) holder.innerHTML = characterHTML(NICK);
    return card;
  }

  function normalizeNickSelection() {
    const card = fighterSelect?.querySelector('.fighter-card[data-character="nick"]');
    if (!card) return;
    card.classList.toggle("p1-selected", player1Character === NICK);
    card.classList.toggle("p2-selected", gameMode === "2P" && player2Character === NICK);
  }

  fighterSelect?.addEventListener("click", event => {
    if (document.body.classList.contains("bb-online-active")) return;
    const card = event.target.closest('.fighter-card[data-character="nick"]');
    if (!card || !fighterSelect.contains(card) || !storedNickUnlock()) return;

    if (gameMode === "1P") {
      player1Character = NICK;
      fighterSelect.querySelectorAll(".fighter-card").forEach(x => x.classList.remove("p1-selected"));
      card.classList.add("p1-selected");
      selectionText.textContent = "PLAYER 1: NICK";
      mapSelectButton.disabled = false;
    } else if (selectionStage === 1) {
      player1Character = NICK;
      fighterSelect.querySelectorAll(".fighter-card").forEach(x => x.classList.remove("p1-selected"));
      card.classList.add("p1-selected");
      selectionStage = 2;
      selectionPrompt.textContent = "PLAYER 2 — CHOOSE YOUR FIGHTER";
      selectionText.textContent = "PLAYER 1: NICK  |  PLAYER 2: NOT SELECTED";
    } else {
      player2Character = NICK;
      fighterSelect.querySelectorAll(".fighter-card").forEach(x => x.classList.remove("p2-selected"));
      card.classList.add("p2-selected");
      selectionText.textContent = "PLAYER 1: " + displayName(player1Character) + "  |  PLAYER 2: NICK";
      mapSelectButton.disabled = false;
    }
    setTimeout(normalizeNickSelection, 0);
  });

  if (typeof resetSelection === "function") {
    const previousResetSelectionNick = resetSelection;
    resetSelection = function() {
      const result = previousResetSelectionNick.apply(this, arguments);
      fighterSelect?.querySelector('.fighter-card[data-character="nick"]')?.classList.remove("p1-selected", "p2-selected");
      return result;
    };
  }

  const distanceBetween = (a,b) => Math.abs((a?.x || 0) - (b?.x || 0));
  const verticalBetween = (a,b) => Math.abs((a?.y || 0) - (b?.y || 0));

  function nickRecoil(target, direction, distance = 20) {
    const motion = target?.fighter?.querySelector(".motion-layer") || target?.fighter;
    try { motion?.animate([{transform:"translateX(0)"},{transform:`translateX(${direction * distance}px)`,offset:.44},{transform:"translateX(0)"}],{duration:280,easing:"ease-out"}); } catch (_) {}
  }

  function nickShake(strength = 7, duration = 300) {
    try { arena.animate([{transform:"translate(0,0)"},{transform:`translate(${-strength}px,${Math.round(strength*.25)}px)`},{transform:`translate(${strength}px,${-Math.round(strength*.2)}px)`},{transform:"translate(0,0)"}],{duration,easing:"steps(3,end)"}); } catch (_) {}
  }

  function batSwish(attacker) {
    const swish = document.createElement("div");
    swish.className = "effect bb-nick-bat-swish";
    swish.style.left = (attacker.x + (attacker.facing === 1 ? 42 : -13)) + "px";
    swish.style.bottom = (78 + attacker.y) + "px";
    effects.appendChild(swish);
    setTimeout(() => swish.remove(), 360);
  }

  function nickBasic(attacker, target) {
    if (!canAct(attacker) || attacker.attackCooldown) return;
    const stats = STATS.nick;
    attacker.attackCooldown = true;
    const model = attacker.fighter.querySelector(".nick-model");
    const variant = attacker.__bbNickSwingVariant ? "b" : "a";
    attacker.__bbNickSwingVariant = !attacker.__bbNickSwingVariant;
    model?.classList.remove("bb-nick-swing-a", "bb-nick-swing-b");
    if (model) void model.offsetWidth;
    model?.classList.add(`bb-nick-swing-${variant}`);
    setTimeout(() => batSwish(attacker), 135);
    setTimeout(() => {
      if (roundOver) return;
      if (distanceBetween(attacker,target) <= stats.range && verticalBetween(attacker,target) < 75) {
        dealDamage(attacker,target,stats.basic,{type:"normal"});
        nickRecoil(target,attacker.facing,18);
      }
    },245);
    setTimeout(() => { attacker.attackCooldown = false; model?.classList.remove("bb-nick-swing-a","bb-nick-swing-b"); },stats.recovery);
  }

  const previousBasicAttackNick = basicAttack;
  basicAttack = function(attacker,target) {
    if (attacker?.character === NICK) return nickBasic(attacker,target);
    return previousBasicAttackNick(attacker,target);
  };

  function showYieldHit(target) {
    const hit = document.createElement("div");
    hit.className = "effect bb-yield-hit";
    hit.textContent = "YIELDS UP!";
    hit.style.left = (target.x - 4) + "px";
    hit.style.bottom = (120 + target.y) + "px";
    effects.appendChild(hit);
    setTimeout(() => hit.remove(),520);
  }

  function spawnBondProjectile(attacker,target,config) {
    if (roundOver) return;
    const paper = document.createElement("div");
    paper.className = "effect bb-bond-projectile";
    paper.textContent = config.label;
    let x = attacker.x + (attacker.facing === 1 ? 58 : -20);
    const startBottom = 64 + attacker.y + config.base;
    const direction = attacker.facing || 1;
    let ticks = 0;
    paper.style.left = x + "px";
    paper.style.bottom = startBottom + "px";
    effects.appendChild(paper);

    const loop = setInterval(() => {
      if (roundOver || !paper.isConnected) { clearInterval(loop); paper.remove(); return; }
      ticks++;
      x += config.speed * direction;
      const arc = Math.sin(Math.min(Math.PI,ticks/config.arcTicks*Math.PI)) * config.arcHeight;
      paper.style.left = x + "px";
      paper.style.bottom = (startBottom + arc) + "px";
      paper.style.transform = `rotate(${direction * ticks * 11}deg)`;
      const close = Math.abs((x + 28) - (target.x + 38)) < 38;
      const verticalOK = config.height === "low" ? target.y < 58 : config.height === "mid" ? target.y < 98 : true;
      if (close && verticalOK) {
        clearInterval(loop); paper.remove();
        dealDamage(attacker,target,config.damage,{type:"special"});
        showYieldHit(target);
        nickRecoil(target,direction,12 + config.index * 4);
        return;
      }
      if (x < -140 || x > arena.clientWidth + 140) { clearInterval(loop); paper.remove(); }
    },28);
  }

  function yieldCurve(attacker,target) {
    addComicText("YIELD CURVE!","yellow-text",1900);
    const graph = document.createElement("div");
    graph.className = "effect bb-yield-graph";
    graph.innerHTML = '<div class="bb-yield-line"></div><div class="bb-yield-arrow">↗</div><div class="bb-yield-labels"><span>2Y</span><span>10Y</span><span>30Y</span></div>';
    graph.style.left = (attacker.x + (attacker.facing === 1 ? 70 : -155)) + "px";
    graph.style.bottom = (88 + attacker.y) + "px";
    effects.appendChild(graph);
    const arm = attacker.fighter.querySelector(".nick-model .weapon-arm");
    try { arm?.animate([{transform:"rotate(0)"},{transform:"rotate(-24deg)",offset:.45},{transform:"rotate(8deg)"}],{duration:650,easing:"ease-out"}); } catch (_) {}
    [
      {index:0,label:"2Y",damage:3.5,speed:15,base:0,arcHeight:10,arcTicks:24,height:"low"},
      {index:1,label:"10Y",damage:4,speed:13.5,base:13,arcHeight:25,arcTicks:29,height:"mid"},
      {index:2,label:"30Y",damage:5.5,speed:12.2,base:25,arcHeight:44,arcTicks:34,height:"high"}
    ].forEach((config,index) => setTimeout(() => spawnBondProjectile(attacker,target,config),470 + index * 260));
    setTimeout(() => graph.remove(),1550);
  }

  const previousSpecialAttackNick = specialAttack;
  specialAttack = function(attacker,target) {
    if (attacker?.character !== NICK) return previousSpecialAttackNick(attacker,target);
    if (!canAct(attacker) || attacker.specialCooldown) return;
    beginSpecialCooldown(attacker);
    yieldCurve(attacker,target);
  };

  function helperPlayer(kind) {
    const helper = document.createElement("div");
    helper.className = `effect bb-ny-player ${kind === "pitcher" ? "bb-pitching" : "bb-batting"}`;
    helper.innerHTML = '<div class="cap"></div><div class="head"></div><div class="jersey"></div><div class="arm a"></div><div class="arm b"></div><div class="leg a"></div><div class="leg b"></div>' + (kind === "batter" ? '<div class="helper-bat"></div>' : '');
    return helper;
  }

  function flyBaseball(attacker,target,options) {
    if (roundOver) return;
    const ball = document.createElement("div");
    ball.className = "effect bb-baseball" + (options.power ? " bb-power-ball" : "");
    const direction = attacker.facing || 1;
    const toX = target.x + 34;
    const toBottom = 103 + target.y;
    ball.style.left = options.fromX + "px";
    ball.style.bottom = options.fromBottom + "px";
    effects.appendChild(ball);
    const dx = toX - options.fromX;
    const dy = toBottom - options.fromBottom;
    const anim = ball.animate([{transform:"translate(0,0) rotate(0deg)"},{transform:`translate(${dx*.53}px,${dy*.53-(options.power?28:12)}px) rotate(${direction*360}deg)`,offset:.53},{transform:`translate(${dx}px,${dy}px) rotate(${direction*720}deg)`}],{duration:options.duration,easing:"cubic-bezier(.2,.65,.2,1)",fill:"forwards"});
    anim.onfinish = () => {
      if (!roundOver) {
        dealDamage(attacker,target,options.damage,{type:"ultimate",ignoreBlock:true});
        nickRecoil(target,direction,options.power?34:22);
        nickShake(options.power?9:5,options.power?360:240);
      }
      ball.remove();
    };
  }

  function doublePlayBurst(target) {
    const burst = document.createElement("div");
    burst.className = "effect bb-doubleplay-burst";
    burst.style.left = (target.x - 23) + "px";
    burst.style.bottom = (50 + target.y) + "px";
    effects.appendChild(burst);
    setTimeout(() => burst.remove(),620);
  }

  function queensDoublePlay(attacker,target) {
    actionLock = true;
    addComicText("QUEENS DOUBLE PLAY!","yellow-text",3800);
    const stadium = document.createElement("div");
    stadium.className = "effect bb-queens-stadium";
    effects.appendChild(stadium);
    const direction = attacker.facing || 1;
    const pitcher = helperPlayer("pitcher");
    pitcher.style.left = (direction === 1 ? Math.max(18,attacker.x-95) : Math.min(arena.clientWidth-90,attacker.x+115)) + "px";
    pitcher.style.bottom = "28px";
    effects.appendChild(pitcher);

    setTimeout(() => {
      if (roundOver) return;
      flyBaseball(attacker,target,{fromX:parseFloat(pitcher.style.left)+(direction===1?58:8),fromBottom:108,duration:430,damage:7,power:false});
    },580);

    let batter = null;
    setTimeout(() => {
      if (roundOver) return;
      batter = helperPlayer("batter");
      batter.style.left = (direction === 1 ? Math.max(25,attacker.x-20) : Math.min(arena.clientWidth-95,attacker.x+55)) + "px";
      batter.style.bottom = "27px";
      effects.appendChild(batter);
      setTimeout(() => {
        if (roundOver || !batter?.isConnected) return;
        flyBaseball(attacker,target,{fromX:parseFloat(batter.style.left)+(direction===1?73:-5),fromBottom:122,duration:520,damage:9,power:true});
      },390);
    },1420);

    setTimeout(() => {
      if (roundOver) return;
      const left = helperPlayer("batter");
      const right = helperPlayer("pitcher");
      left.className = "effect bb-ny-player bb-sliding-left";
      right.className = "effect bb-ny-player bb-sliding-right";
      left.style.left = Math.max(0,target.x-210) + "px";
      right.style.left = Math.min(arena.clientWidth-72,target.x+210) + "px";
      left.style.bottom = right.style.bottom = "22px";
      effects.appendChild(left); effects.appendChild(right);
      setTimeout(() => {
        if (!roundOver) {
          dealDamage(attacker,target,11,{type:"ultimate",ignoreBlock:true});
          doublePlayBurst(target); nickShake(13,470); nickRecoil(target,direction,48);
          addComicText("DOUBLE PLAY!","yellow-text",1400);
        }
      },560);
      setTimeout(() => { left.remove(); right.remove(); },900);
    },2550);

    setTimeout(() => { pitcher.remove(); batter?.remove(); stadium.remove(); actionLock = false; },3750);
  }

  const previousUltimateAttackNick = ultimateAttack;
  ultimateAttack = function(attacker,target) {
    if (attacker?.character !== NICK) return previousUltimateAttackNick(attacker,target);
    if (!canAct(attacker) || attacker.ultimate < 100) return;
    attacker.ultimate = 0;
    updateHUD();
    queensDoublePlay(attacker,target);
  };

  function enhanceNickVictory(stage) {
    if (!stage || stage.dataset.nickEnhanced === "1") return;
    const model = stage.querySelector(".nick-model");
    const person = model?.closest(".bb4-person");
    if (!model || !person) return;
    stage.dataset.nickEnhanced = "1";
    person.classList.remove("bb4-bounce");
    person.classList.add("bb-nick-victory-person");
    person.style.left = "50%";
    setTimeout(() => {
      if (!stage.isConnected) return;
      const text = document.createElement("div");
      text.className = "effect comic-text yellow-text";
      text.textContent = "BAT FLIP!";
      text.style.top = "48px";
      stage.appendChild(text);
      setTimeout(() => text.remove(),1150);
    },1450);
  }

  if (typeof MutationObserver === "function" && effects) {
    const victoryObserver = new MutationObserver(mutations => {
      for (const mutation of mutations) for (const node of mutation.addedNodes) {
        if (node instanceof HTMLElement && node.classList.contains("bb4-victory")) setTimeout(() => enhanceNickVictory(node),0);
      }
    });
    victoryObserver.observe(effects,{childList:true});
  }

  function unlockNick() {
    localStorage.setItem("nickUnlocked","true");
    installRosterEntry();
    const card = createNickCard();
    try {
      const holder = card?.querySelector('[data-preview="nick"]');
      if (holder) holder.innerHTML = characterHTML(NICK);
      renderPreviews();
      generateTitleMatchup();
      normalizeNickSelection();
      if (typeof bbRefreshMeleeHud === "function") bbRefreshMeleeHud();
    } catch (_) {}
    document.dispatchEvent(new CustomEvent("bb:nick-unlocked"));
  }

  if (storedNickUnlock()) {
    installRosterEntry();
    createNickCard();
    try { renderPreviews(); generateTitleMatchup(); } catch (_) {}
  }

  window.BBNickFighter = { isUnlocked:storedNickUnlock, unlock:unlockNick, ensureCard:createNickCard };
})();