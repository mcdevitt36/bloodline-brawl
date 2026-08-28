/* =====================================================
   BLOODLINE BRAWL — ONLINE GUEST ICONS V6
   Private-match UI only.
   - Guest sees R / E / F instead of local-2P J / K / L
   - Normal local 2P keeps J / K / L exactly as before
   - Live DOM lookup prevents rebuilt/cloned P2 melee UI from keeping J
===================================================== */

(() => {
  if (window.__bbOnlineGuestIconsV6Loaded) return;
  window.__bbOnlineGuestIconsV6Loaded = true;

  const isGuestPrivateMatch = () =>
    document.body.classList.contains("bb-online-active") &&
    document.body.classList.contains("bb-online-guest");

  const setText = (element, text) => {
    if (!element) return;
    if (element.textContent.trim() !== text) element.textContent = text;
  };

  function findCurrentP2Side() {
    return document.querySelector(
      "#fightScreen #twoPlayerControls .two-player-control-side.right"
    ) || document.querySelector(
      "#twoPlayerControls .two-player-control-side.right"
    );
  }

  function forceGuestMeleeToR() {
    if (!isGuestPrivateMatch()) return;

    const keys = new Set();
    const p2Side = findCurrentP2Side();

    /* Primary P2 melee location. */
    p2Side
      ?.querySelectorAll(
        ".two-player-action-row .two-control-button:first-child small"
      )
      .forEach(key => keys.add(key));

    /* Catch any rebuilt/cloned P2 control panel. */
    document
      .querySelectorAll(
        "#fightScreen .two-player-control-side.right .two-control-button small"
      )
      .forEach(key => {
        const button = key.closest("button");
        if (button && /MELEE/i.test(button.textContent || "")) keys.add(key);
      });

    /* Final safety: if any visible fight-screen MELEE button still carries
       the local-P2 J while this browser is the guest, it is the guest melee
       key and must read R. Host/local modes never enter this branch. */
    document
      .querySelectorAll("#fightScreen button small")
      .forEach(key => {
        const button = key.closest("button");
        if (
          key.textContent.trim().toUpperCase() === "J" &&
          button &&
          /MELEE/i.test(button.textContent || "")
        ) {
          keys.add(key);
        }
      });

    keys.forEach(key => setText(key, "R"));
  }

  function applyGuestLabels() {
    if (!isGuestPrivateMatch()) return;

    const p2SpecialKey = document.getElementById("player2SpecialKey");
    const p2UltimateKey = document.getElementById("player2UltimateKey");
    const p2Side = findCurrentP2Side();
    const movement = p2Side?.querySelector(":scope > span") || null;
    const specialKey = p2Side?.querySelector(
      ".two-player-action-row .two-control-button.special small"
    ) || null;
    const ultimateNote = p2Side?.querySelector(".ultimate-key-note") || null;

    setText(p2SpecialKey, "E");
    setText(p2UltimateKey, "F");
    setText(movement, "A/D OR ARROWS • Q BLOCK");
    setText(specialKey, "E");
    setText(ultimateNote, "F = ULTIMATE");

    forceGuestMeleeToR();
  }

  function restoreLocal2PLabels() {
    if (isGuestPrivateMatch()) return;

    const p2SpecialKey = document.getElementById("player2SpecialKey");
    const p2UltimateKey = document.getElementById("player2UltimateKey");
    const p2Side = findCurrentP2Side();
    const movement = p2Side?.querySelector(":scope > span") || null;
    const meleeKey = p2Side?.querySelector(
      ".two-player-action-row .two-control-button:first-child small"
    ) || null;
    const specialKey = p2Side?.querySelector(
      ".two-player-action-row .two-control-button.special small"
    ) || null;
    const ultimateNote = p2Side?.querySelector(".ultimate-key-note") || null;

    setText(p2SpecialKey, gameMode === "1P" ? "CPU" : "K");
    setText(p2UltimateKey, gameMode === "1P" ? "CPU" : "L");
    setText(movement, "ARROWS • I BLOCK");
    setText(meleeKey, "J");
    setText(specialKey, "K");
    setText(ultimateNote, "L = ULTIMATE");
  }

  const previousBeginMatchGuestIconsV6 = beginMatch;
  beginMatch = function() {
    const result = previousBeginMatchGuestIconsV6.apply(this, arguments);

    if (isGuestPrivateMatch()) {
      applyGuestLabels();
      setTimeout(applyGuestLabels, 0);
      setTimeout(applyGuestLabels, 100);
      setTimeout(applyGuestLabels, 250);
      setTimeout(applyGuestLabels, 500);
      setTimeout(applyGuestLabels, 1000);
      setTimeout(applyGuestLabels, 1800);
    } else {
      restoreLocal2PLabels();
    }

    return result;
  };

  /* Watch the entire fight UI because some late polish code can replace
     control nodes rather than merely changing their text. */
  const fightScreenRoot = document.getElementById("fightScreen");
  if (fightScreenRoot) {
    const fightObserver = new MutationObserver(() => {
      if (isGuestPrivateMatch()) applyGuestLabels();
    });

    fightObserver.observe(fightScreenRoot, {
      subtree: true,
      childList: true,
      characterData: true
    });
  }

  const roleObserver = new MutationObserver(() => {
    if (isGuestPrivateMatch()) applyGuestLabels();
  });

  roleObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"]
  });

  twoPlayerButton?.addEventListener("click", () => {
    setTimeout(restoreLocal2PLabels, 0);
  });

  onePlayerButton?.addEventListener("click", () => {
    setTimeout(restoreLocal2PLabels, 0);
  });

  applyGuestLabels();
})();
