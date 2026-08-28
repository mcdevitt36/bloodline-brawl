/* =====================================================
   BLOODLINE BRAWL — LEO DOUBLE-SWIPE METER FIX V1
   All game modes.
   Leo's two claw hits should never make either ultimate meter roll backward.
===================================================== */

(() => {
  if (window.__bbLeoDoubleSwipeMeterFixV1Loaded) return;
  window.__bbLeoDoubleSwipeMeterFixV1Loaded = true;

  const previousDealDamageLeoMeterV1 = dealDamage;

  dealDamage = function(attacker, target, amount, options = {}) {
    const type = options.type || "normal";
    const isLeoClawHit =
      attacker &&
      attacker.character === "leo" &&
      type === "normal";

    const result = previousDealDamageLeoMeterV1.apply(this, arguments);

    if (isLeoClawHit && !roundOver) {
      /* dealDamage has already awarded the normal hit meter here.
         The old Leo second-swipe code then subtracts 14 / 7 immediately
         after dealDamage returns. Restore the legitimate post-hit values
         after that callback finishes so the second swipe adds meter just
         like the first and never visibly falls backward near 100%. */
      const attackerMeterAfterHit = attacker.ultimate;
      const targetMeterAfterHit = target.ultimate;

      queueMicrotask(() => {
        if (roundOver) return;

        let changed = false;

        if (attacker.ultimate < attackerMeterAfterHit) {
          attacker.ultimate = attackerMeterAfterHit;
          changed = true;
        }

        if (target.ultimate < targetMeterAfterHit) {
          target.ultimate = targetMeterAfterHit;
          changed = true;
        }

        if (changed) updateHUD();
      });
    }

    return result;
  };
})();
