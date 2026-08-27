/* =====================================================
   BLOODLINE BRAWL — BRENDAN IPO ULTIMATE UPGRADE
   Additive only. Brendan actively rings a giant market bell
   with his golf club; the bell's shockwave travels into the
   opponent and causes the ultimate damage.
===================================================== */

(() => {
  if (window.__bbBrendanIPOUpgradeLoaded) return;
  window.__bbBrendanIPOUpgradeLoaded = true;

  const css = document.createElement("style");
  css.textContent = `
    .bb-ipo-bell-wrap{
      position:absolute;
      width:150px;
      height:150px;
      pointer-events:none;
      z-index:34;
      transform-origin:50% 85%;
    }
    .bb-ipo-bell{
      position:absolute;
      left:22px;
      top:22px;
      width:105px;
      height:90px;
      border-radius:52px 52px 24px 24px;
      background:linear-gradient(#ffe66c,#d99a18 64%,#8e5c09);
      border:5px solid #5e3a05;
      box-shadow:inset 0 0 0 5px #ffd649,0 8px 0 #372103;
    }
    .bb-ipo-bell::before{
      content:"";
      position:absolute;
      left:48px;
      top:80px;
      width:11px;
      height:28px;
      background:#5e3a05;
      border-radius:5px;
    }
    .bb-ipo-bell::after{
      content:"";
      position:absolute;
      left:38px;
      top:102px;
      width:32px;
      height:15px;
      background:#c57c0d;
      border:4px solid #5e3a05;
      border-radius:50%;
    }
    .bb-ipo-bell-label{
      position:absolute;
      left:0;
      right:0;
      top:52px;
      text-align:center;
      color:#3a2203;
      font:900 20px Arial,sans-serif;
      letter-spacing:1px;
      text-shadow:0 1px #fff1a7;
    }
    .bb-ipo-stand{
      position:absolute;
      left:67px;
      top:116px;
      width:15px;
      height:26px;
      background:#573503;
      border-radius:4px;
    }
    .bb-ipo-stand::after{
      content:"";
      position:absolute;
      left:-34px;
      top:22px;
      width:82px;
      height:12px;
      background:#573503;
      border-radius:5px;
    }
    .bb-ipo-flash{
      position:absolute;
      width:44px;
      height:44px;
      border-radius:50%;
      border:5px solid #fff7b0;
      box-shadow:0 0 18px #ffd633,0 0 36px #fff2a0;
      pointer-events:none;
      z-index:40;
    }
    .bb-ipo-wave{
      position:absolute;
      width:52px;
      height:100px;
      border:7px solid #ffe86b;
      border-left-color:transparent;
      border-radius:50%;
      filter:drop-shadow(0 0 7px #ffca28);
      opacity:.95;
      pointer-events:none;
      z-index:39;
    }
    .bb-ipo-word{
      position:absolute;
      z-index:41;
      pointer-events:none;
      font:900 22px Arial,sans-serif;
      color:#9cff73;
      -webkit-text-stroke:2px #123d16;
      text-shadow:0 3px 0 #0b2a0f,0 0 10px #aaff89;
      white-space:nowrap;
    }
    .bb-ipo-impact{
      position:absolute;
      width:110px;
      height:110px;
      border-radius:50%;
      border:9px solid #ffe45a;
      box-shadow:0 0 24px #ffd000, inset 0 0 22px #fff0a3;
      pointer-events:none;
      z-index:42;
    }
  `;
  document.head.appendChild(css);

  function addIPOText(text, x, y, delay) {
    setTimeout(() => {
      const el = document.createElement("div");
      el.className = "effect bb-ipo-word";
      el.textContent = text;
      el.style.left = x + "px";
      el.style.bottom = y + "px";
      effects.appendChild(el);
      el.animate(
        [
          { transform:"translateY(10px) scale(.7)", opacity:0 },
          { transform:"translateY(-6px) scale(1.08)", opacity:1, offset:.35 },
          { transform:"translateY(-24px) scale(1)", opacity:0 }
        ],
        { duration:760, easing:"ease-out" }
      );
      setTimeout(() => el.remove(), 780);
    }, delay);
  }

  function brendanIPOUltimate(attacker, target) {
    actionLock = true;

    addComicText("IPO!", "green-text", 1800);

    const direction = attacker.facing || 1;
    const bell = document.createElement("div");
    bell.className = "effect bb-ipo-bell-wrap";
    bell.innerHTML = `
      <div class="bb-ipo-bell"><div class="bb-ipo-bell-label">IPO</div></div>
      <div class="bb-ipo-stand"></div>
    `;

    const bellX = Math.max(20, Math.min(arena.clientWidth - 170, attacker.x + direction * 115));
    bell.style.left = bellX + "px";
    bell.style.bottom = "38px";
    if (direction === -1) bell.style.transform = "scaleX(-1)";
    effects.appendChild(bell);

    bell.animate(
      [
        { transform: direction === -1 ? "scaleX(-1) translateY(18px)" : "translateY(18px)", opacity:0 },
        { transform: direction === -1 ? "scaleX(-1) translateY(0)" : "translateY(0)", opacity:1 }
      ],
      { duration:220, easing:"ease-out", fill:"forwards" }
    );

    const arm = attacker.fighter.querySelector(".weapon-arm");
    if (arm) {
      arm.animate(
        [
          { transform:"rotate(0deg)" },
          { transform:`rotate(${direction === 1 ? -52 : 52}deg)` },
          { transform:`rotate(${direction === 1 ? 34 : -34}deg)` },
          { transform:"rotate(0deg)" }
        ],
        { duration:520, easing:"cubic-bezier(.2,.7,.2,1)" }
      );
    }

    setTimeout(() => {
      if (window.BloodlineAudio?.play) {
        BloodlineAudio.play("golf", 80);
        BloodlineAudio.play("ultimate", 120);
      }

      bell.animate(
        [
          { transform: direction === -1 ? "scaleX(-1) rotate(0deg)" : "rotate(0deg)" },
          { transform: direction === -1 ? "scaleX(-1) rotate(-8deg)" : "rotate(8deg)" },
          { transform: direction === -1 ? "scaleX(-1) rotate(7deg)" : "rotate(-7deg)" },
          { transform: direction === -1 ? "scaleX(-1) rotate(0deg)" : "rotate(0deg)" }
        ],
        { duration:460, easing:"ease-out" }
      );

      const flash = document.createElement("div");
      flash.className = "effect bb-ipo-flash";
      flash.style.left = (bellX + (direction === 1 ? 105 : 10)) + "px";
      flash.style.bottom = "94px";
      effects.appendChild(flash);
      flash.animate(
        [ { transform:"scale(.2)", opacity:1 }, { transform:"scale(2.1)", opacity:0 } ],
        { duration:360, easing:"ease-out" }
      );
      setTimeout(() => flash.remove(), 380);

      const startX = bellX + (direction === 1 ? 110 : 0);
      const endX = target.x + 25;
      const travel = Math.max(300, Math.min(700, Math.abs(endX - startX) * 1.45));

      [0,1,2].forEach(i => {
        const wave = document.createElement("div");
        wave.className = "effect bb-ipo-wave";
        wave.style.left = startX + "px";
        wave.style.bottom = (67 - i * 4) + "px";
        if (direction === -1) wave.style.transform = "scaleX(-1)";
        effects.appendChild(wave);

        const delta = endX - startX;
        wave.animate(
          [
            { transform:`${direction === -1 ? "scaleX(-1) " : ""}translateX(0) scale(.72)`, opacity:.95 },
            { transform:`${direction === -1 ? "scaleX(-1) " : ""}translateX(${delta}px) scale(${1.15 + i*.16})`, opacity:0 }
          ],
          { duration:travel, delay:i*85, easing:"cubic-bezier(.12,.55,.28,1)", fill:"forwards" }
        );
        setTimeout(() => wave.remove(), travel + i*85 + 60);
      });

      addIPOText("IPO", startX + direction*15, 165, 40);
      addIPOText("MARKET OPEN", startX + direction*55, 205, 190);
      addIPOText("LISTED!", startX + direction*90, 150, 340);

      setTimeout(() => {
        const impact = document.createElement("div");
        impact.className = "effect bb-ipo-impact";
        impact.style.left = (target.x - 25) + "px";
        impact.style.bottom = (48 + target.y) + "px";
        effects.appendChild(impact);
        impact.animate(
          [
            { transform:"scale(.35)", opacity:1 },
            { transform:"scale(1.35)", opacity:.9, offset:.45 },
            { transform:"scale(1.8)", opacity:0 }
          ],
          { duration:420, easing:"ease-out" }
        );

        dealDamage(attacker, target, 24, { type:"ultimate", ignoreBlock:true });
        if (window.BloodlineAudio?.play) BloodlineAudio.play("heavy", 120);

        setTimeout(() => impact.remove(), 440);
      }, travel - 40);

      setTimeout(() => {
        bell.animate(
          [ { opacity:1, transform: direction === -1 ? "scaleX(-1) translateY(0)" : "translateY(0)" },
            { opacity:0, transform: direction === -1 ? "scaleX(-1) translateY(18px)" : "translateY(18px)" } ],
          { duration:260, fill:"forwards" }
        );
      }, travel + 180);

      setTimeout(() => {
        bell.remove();
        actionLock = false;
      }, travel + 480);
    }, 360);

    setTimeout(() => {
      if (bell.isConnected) bell.remove();
      actionLock = false;
    }, 2200);
  }

  const previousUltimateAttack = ultimateAttack;
  ultimateAttack = function(attacker, target) {
    if (attacker.character !== "brendan") {
      return previousUltimateAttack(attacker, target);
    }

    if (!canAct(attacker) || attacker.ultimate < 100) return;

    attacker.ultimate = 0;
    updateHUD();
    brendanIPOUltimate(attacker, target);
  };
})();
