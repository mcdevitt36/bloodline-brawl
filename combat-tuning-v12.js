/* =====================================================
   BLOODLINE BRAWL — COMBAT TUNING V12
   Small additive gameplay/visual corrections only.
   - Flip Barrett's RC car so it faces its travel direction
   - Trim Connor's Fried Chicken Feast very slightly
   - Give Shannan's longer Brainrot stun a dramatically longer cooldown
===================================================== */

(() => {
  if (window.__bbCombatTuningV12Loaded) return;
  window.__bbCombatTuningV12Loaded = true;

  /* ===================================================
     BARRETT — RC CAR DIRECTION
     The original toy-car art is facing opposite the movement logic.
     Invert both facing cases without touching speed, hitbox, or damage.
  =================================================== */
  const style = document.createElement("style");
  style.textContent = `
    .bb-toy-car:not([style*="scaleX(-1)"]) {
      transform: scaleX(-1) !important;
    }

    .bb-toy-car[style*="scaleX(-1)"] {
      transform: scaleX(1) !important;
    }
  `;
  document.head.appendChild(style);

  /* ===================================================
     CONNOR — FRIED CHICKEN FEAST
     Same 30 HP heal and same presentation, just 200ms shorter.
  =================================================== */
  friedChicken = function(attacker) {
    actionLock = true;

    addComicText(
      "FRIED CHICKEN FEAST!",
      "yellow-text",
      1800
    );

    const bucket = document.createElement("div");
    bucket.className = "effect chicken-bucket";
    bucket.textContent = "🍗 🍗";
    bucket.style.left = attacker.x + 20 + "px";
    bucket.style.bottom = 95 + attacker.y + "px";
    effects.appendChild(bucket);

    setTimeout(() => {
      attacker.health = Math.min(
        attacker.maxHealth,
        attacker.health + 30
      );

      updateHUD();
      bucket.remove();
      actionLock = false;
    }, 2400);
  };

  /* ===================================================
     SHANNAN — BRAINROT COOLDOWN
     Erin's 2.5s stun stays on the normal 5.0s special cooldown.
     Brainrot lasts 3.25s and has a much larger, more disruptive
     animation, so Shannan now waits a full 9.0s before using it again.
  =================================================== */
  const previousBeginSpecialCooldownV12 = beginSpecialCooldown;

  beginSpecialCooldown = function(p) {
    if (!p || p.character !== "shannan") {
      return previousBeginSpecialCooldownV12(p);
    }

    const duration = 9000;
    const token = (p.__bbSpecialCooldownTokenV12 || 0) + 1;

    p.__bbSpecialCooldownTokenV12 = token;
    p.__bbSpecialCooldownDurationV12 = duration;
    p.specialCooldown = true;
    p.specialReadyAt = Date.now() + duration;

    setTimeout(() => {
      if (p.__bbSpecialCooldownTokenV12 !== token) return;

      p.specialCooldown = false;
      p.specialReadyAt = 0;
      p.__bbSpecialCooldownDurationV12 = 0;
    }, duration);
  };

  /* Keep the special recharge orb visually honest about the longer
     Brainrot cooldown instead of letting it look full too early. */
  orbLoop = function() {
    const specialFill = p => {
      if (!p.specialCooldown) return 1;

      const duration =
        p.__bbSpecialCooldownDurationV12 || 5000;

      return 1 -
        Math.max(0, p.specialReadyAt - Date.now()) /
        duration;
    };

    player1SpecialOrb.style.setProperty(
      "--fill",
      Math.max(0, Math.min(1, specialFill(P1))) * 360 + "deg"
    );

    player2SpecialOrb.style.setProperty(
      "--fill",
      Math.max(0, Math.min(1, specialFill(P2))) * 360 + "deg"
    );

    player1UltimateOrb.style.setProperty(
      "--fill",
      P1.ultimate * 3.6 + "deg"
    );

    player2UltimateOrb.style.setProperty(
      "--fill",
      P2.ultimate * 3.6 + "deg"
    );

    requestAnimationFrame(orbLoop);
  };
})();
