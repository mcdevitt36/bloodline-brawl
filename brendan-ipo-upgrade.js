/* =====================================================
   BLOODLINE BRAWL — BRENDAN IPO ULTIMATE UPGRADE
   Additive only. Brendan rings the IPO bell with his golf club,
   then a bull-market charge rushes the opponent for the damage.
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
      width:118px;
      height:118px;
      border-radius:50%;
      border:9px solid #ffe45a;
      box-shadow:0 0 24px #ffd000,inset 0 0 22px #fff0a3;
      pointer-events:none;
      z-index:46;
    }

    /* BULL MARKET — CSS-drawn bull, no emoji asset. */
    .bb-ipo-bull{
      position:absolute;
      width:172px;
      height:108px;
      pointer-events:none;
      z-index:45;
      filter:drop-shadow(5px 8px 0 rgba(0,0,0,.28));
      transform-origin:center center;
    }
    .bb-ipo-bull-body{
      position:absolute;
      left:22px;
      top:34px;
      width:106px;
      height:54px;
      border:4px solid #2a2018;
      border-radius:48% 45% 40% 43%;
      background:linear-gradient(180deg,#8f542f,#6f3d24 70%,#56301f);
    }
    .bb-ipo-bull-body::after{
      content:"";
      position:absolute;
      right:16px;
      top:12px;
      width:25px;
      height:16px;
      border-radius:50%;
      background:rgba(55,30,20,.28);
    }
    .bb-ipo-bull-head{
      position:absolute;
      left:111px;
      top:26px;
      width:50px;
      height:48px;
      border:4px solid #2a2018;
      border-radius:48% 48% 42% 42%;
      background:linear-gradient(180deg,#9a6039,#754326);
      z-index:4;
    }
    .bb-ipo-bull-muzzle{
      position:absolute;
      right:-9px;
      bottom:1px;
      width:29px;
      height:20px;
      border:3px solid #2a2018;
      border-radius:50%;
      background:#b47d58;
    }
    .bb-ipo-bull-eye{
      position:absolute;
      right:11px;
      top:13px;
      width:7px;
      height:7px;
      border-radius:50%;
      background:#f6d842;
      box-shadow:0 0 6px #ffdf45;
    }
    .bb-ipo-bull-horn{
      position:absolute;
      top:-15px;
      width:23px;
      height:19px;
      border-top:6px solid #efe1b7;
      border-radius:60% 60% 0 0;
      z-index:3;
    }
    .bb-ipo-bull-horn.one{
      left:108px;
      transform:rotate(-28deg);
    }
    .bb-ipo-bull-horn.two{
      left:142px;
      transform:scaleX(-1) rotate(-28deg);
    }
    .bb-ipo-bull-tail{
      position:absolute;
      left:4px;
      top:43px;
      width:29px;
      height:7px;
      border-radius:50%;
      background:#362419;
      transform:rotate(-20deg);
      transform-origin:right center;
      animation:bbBullTail .18s linear infinite alternate;
    }
    .bb-ipo-bull-leg{
      position:absolute;
      top:79px;
      width:12px;
      height:28px;
      border:3px solid #2a2018;
      background:#673921;
      transform-origin:top center;
      animation:bbBullLeg .16s linear infinite alternate;
    }
    .bb-ipo-bull-leg.one{left:38px}.bb-ipo-bull-leg.two{left:65px;animation-delay:-.08s}.bb-ipo-bull-leg.three{left:101px;animation-delay:-.08s}.bb-ipo-bull-leg.four{left:123px}
    @keyframes bbBullLeg{from{transform:rotate(-22deg)}to{transform:rotate(24deg)}}
    @keyframes bbBullTail{from{transform:rotate(-28deg)}to{transform:rotate(18deg)}}
    .fight-character.bb-ipo-bull-hit .motion-layer{
      animation:bbIPOBullHit 320ms ease-out 1;
    }
    @keyframes bbIPOBullHit{
      0%{transform:translateX(0);filter:brightness(1.6)}
      42%{transform:translateX(var(--bb-ipo-bull-recoil,18px));filter:brightness(1.2)}
      100%{transform:translateX(0);filter:brightness(1)}
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
        { duration:880, easing:"ease-out" }
      );
      setTimeout(() => el.remove(), 900);
    }, delay);
  }

  function createBull() {
    const bull = document.createElement("div");
    bull.className = "effect bb-ipo-bull";
    bull.innerHTML = `
      <div class="bb-ipo-bull-tail"></div>
      <div class="bb-ipo-bull-body"></div>
      <div class="bb-ipo-bull-horn one"></div>
      <div class="bb-ipo-bull-horn two"></div>
      <div class="bb-ipo-bull-head">
        <div class="bb-ipo-bull-eye"></div>
        <div class="bb-ipo-bull-muzzle"></div>
      </div>
      <div class="bb-ipo-bull-leg one"></div>
      <div class="bb-ipo-bull-leg two"></div>
      <div class="bb-ipo-bull-leg three"></div>
      <div class="bb-ipo-bull-leg four"></div>
    `;
    return bull;
  }

  function bullImpact(attacker, target) {
    const impact = document.createElement("div");
    impact.className = "effect bb-ipo-impact";
    impact.style.left = (target.x - 28) + "px";
    impact.style.bottom = (50 + target.y) + "px";
    effects.appendChild(impact);
    impact.animate(
      [
        { transform:"scale(.35)", opacity:1 },
        { transform:"scale(1.38)", opacity:.92, offset:.45 },
        { transform:"scale(1.85)", opacity:0 }
      ],
      { duration:460, easing:"ease-out" }
    );

    target.fighter.style.setProperty(
      "--bb-ipo-bull-recoil",
      (attacker.facing * 18) + "px"
    );
    target.fighter.classList.remove("bb-ipo-bull-hit");
    void target.fighter.offsetWidth;
    target.fighter.classList.add("bb-ipo-bull-hit");

    dealDamage(attacker, target, 24, { type:"ultimate", ignoreBlock:true });
    if (window.BloodlineAudio?.play) BloodlineAudio.play("heavy", 120);

    setTimeout(() => {
      impact.remove();
      target.fighter.classList.remove("bb-ipo-bull-hit");
    }, 480);
  }

  function brendanIPOUltimate(attacker, target) {
    actionLock = true;
    addComicText("IPO!", "green-text", 2200);

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
        { transform: direction === -1 ? "scaleX(-1) translateY(22px)" : "translateY(22px)", opacity:0 },
        { transform: direction === -1 ? "scaleX(-1) translateY(0)" : "translateY(0)", opacity:1 }
      ],
      { duration:320, easing:"ease-out", fill:"forwards" }
    );

    const arm = attacker.fighter.querySelector(".weapon-arm");
    if (arm) {
      arm.animate(
        [
          { transform:"rotate(0deg)" },
          { transform:`rotate(${direction === 1 ? -58 : 58}deg)`, offset:.38 },
          { transform:`rotate(${direction === 1 ? 38 : -38}deg)`, offset:.68 },
          { transform:"rotate(0deg)" }
        ],
        { duration:760, easing:"cubic-bezier(.2,.7,.2,1)" }
      );
    }

    /* Slower, more readable bell strike. */
    setTimeout(() => {
      if (window.BloodlineAudio?.play) {
        BloodlineAudio.play("golf", 80);
        BloodlineAudio.play("ultimate", 120);
      }

      bell.animate(
        [
          { transform: direction === -1 ? "scaleX(-1) rotate(0deg)" : "rotate(0deg)" },
          { transform: direction === -1 ? "scaleX(-1) rotate(-10deg)" : "rotate(10deg)" },
          { transform: direction === -1 ? "scaleX(-1) rotate(8deg)" : "rotate(-8deg)" },
          { transform: direction === -1 ? "scaleX(-1) rotate(-5deg)" : "rotate(5deg)" },
          { transform: direction === -1 ? "scaleX(-1) rotate(0deg)" : "rotate(0deg)" }
        ],
        { duration:620, easing:"ease-out" }
      );

      const flash = document.createElement("div");
      flash.className = "effect bb-ipo-flash";
      flash.style.left = (bellX + (direction === 1 ? 105 : 10)) + "px";
      flash.style.bottom = "94px";
      effects.appendChild(flash);
      flash.animate(
        [ { transform:"scale(.2)", opacity:1 }, { transform:"scale(2.25)", opacity:0 } ],
        { duration:430, easing:"ease-out" }
      );
      setTimeout(() => flash.remove(), 450);

      const ringX = bellX + (direction === 1 ? 108 : 2);
      [0,1,2].forEach(i => {
        const wave = document.createElement("div");
        wave.className = "effect bb-ipo-wave";
        wave.style.left = ringX + "px";
        wave.style.bottom = (66 - i * 4) + "px";
        if (direction === -1) wave.style.transform = "scaleX(-1)";
        effects.appendChild(wave);
        wave.animate(
          [
            { transform:`${direction === -1 ? "scaleX(-1) " : ""}translateX(0) scale(.72)`, opacity:.95 },
            { transform:`${direction === -1 ? "scaleX(-1) " : ""}translateX(${direction * (105 + i*28)}px) scale(${1.1 + i*.16})`, opacity:0 }
          ],
          { duration:440 + i*60, delay:i*70, easing:"ease-out", fill:"forwards" }
        );
        setTimeout(() => wave.remove(), 720);
      });

      addIPOText("MARKET OPEN", ringX + direction*18, 194, 80);

      /* The bell opens the market; the bull is what actually deals damage. */
      setTimeout(() => {
        addIPOText("BULL MARKET!", Math.max(28, Math.min(arena.clientWidth - 185, attacker.x + direction*45)), 165, 0);

        const bull = createBull();
        const startX = direction === 1 ? -190 : arena.clientWidth + 24;
        const impactX = direction === 1 ? target.x - 84 : target.x + 14;
        const exitX = direction === 1 ? arena.clientWidth + 190 : -190;
        const distance = Math.abs(impactX - startX);
        const chargeDuration = Math.max(650, Math.min(900, distance * .92));

        bull.style.left = startX + "px";
        bull.style.bottom = "30px";
        if (direction === -1) bull.style.transform = "scaleX(-1)";
        effects.appendChild(bull);

        bull.animate(
          [
            { left:startX + "px" },
            { left:impactX + "px" }
          ],
          {
            duration:chargeDuration,
            easing:"cubic-bezier(.12,.68,.18,1)",
            fill:"forwards"
          }
        );

        setTimeout(() => {
          if (!roundOver) {
            bullImpact(attacker, target);
          }

          bull.animate(
            [
              { left:impactX + "px" },
              { left:exitX + "px" }
            ],
            {
              duration:430,
              easing:"cubic-bezier(.18,.72,.25,1)",
              fill:"forwards"
            }
          );

          setTimeout(() => {
            bull.remove();
            bell.animate(
              [
                { opacity:1, transform: direction === -1 ? "scaleX(-1) translateY(0)" : "translateY(0)" },
                { opacity:0, transform: direction === -1 ? "scaleX(-1) translateY(20px)" : "translateY(20px)" }
              ],
              { duration:300, fill:"forwards" }
            );
            setTimeout(() => {
              bell.remove();
              actionLock = false;
            }, 320);
          }, 450);
        }, chargeDuration - 35);
      }, 300);
    }, 520);

    setTimeout(() => {
      if (bell.isConnected) bell.remove();
      actionLock = false;
    }, 3400);
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
