/* =====================================================
   BLOODLINE BRAWL — ONLINE GUEST ICONS V6
   Private-match UI only.
   - Guest sees R / E / F instead of local-2P J / K / L
   - Normal local 2P keeps J / K / L exactly as before
===================================================== */

(() => {
  if (window.__bbOnlineGuestIconsV6Loaded) return;
  window.__bbOnlineGuestIconsV6Loaded = true;

  const p2SpecialKey = document.getElementById("player2SpecialKey");
  const p2UltimateKey = document.getElementById("player2UltimateKey");
  const p2ControlSide = document.querySelector("#twoPlayerControls .two-player-control-side.right");
  const p2MeleeControlKey = p2ControlSide?.querySelector(".two-player-action-row .two-control-button:first-child small") || null;
  const p2SpecialControlKey = p2ControlSide?.querySelector(".two-player-action-row .two-control-button.special small") || null;
  const movement = p2ControlSide?.querySelector(":scope > span") || null;
  const ultimateNote = p2ControlSide?.querySelector(".ultimate-key-note") || null;

  const isGuestPrivateMatch = () =>
    document.body.classList.contains("bb-online-active") &&
    document.body.classList.contains("bb-online-guest");

  const setText = (element, text) => {
    if (!element) return;
    if (element.textContent.trim() !== text) element.textContent = text;
  };

  function applyGuestLabels() {
    if (!isGuestPrivateMatch()) return;

    /* Arena ability-key icons. */
    setText(p2SpecialKey, "E");
    setText(p2UltimateKey, "F");

    /* Bottom-right P2 control panel. Target melee directly so J cannot
       survive from the local-2P markup or a later local UI refresh. */
    setText(movement, "A/D OR ARROWS • Q BLOCK");
    setText(p2MeleeControlKey, "R");
    setText(p2SpecialControlKey, "E");
    setText(ultimateNote, "F = ULTIMATE");
  }

  function restoreLocal2PLabels() {
    if (isGuestPrivateMatch()) return;

    setText(p2SpecialKey, gameMode === "1P" ? "CPU" : "K");
    setText(p2UltimateKey, gameMode === "1P" ? "CPU" : "L");
    setText(movement, "ARROWS • I BLOCK");
    setText(p2MeleeControlKey, "J");
    setText(p2SpecialControlKey, "K");
    setText(ultimateNote, "L = ULTIMATE");
  }

  const previousBeginMatchGuestIconsV6 = beginMatch;
  beginMatch = function() {
    const result = previousBeginMatchGuestIconsV6.apply(this, arguments);

    if (isGuestPrivateMatch()) {
      applyGuestLabels();
      setTimeout(applyGuestLabels, 0);
      setTimeout(applyGuestLabels, 180);
      setTimeout(applyGuestLabels, 500);
      setTimeout(applyGuestLabels, 1000);
    } else {
      restoreLocal2PLabels();
    }

    return result;
  };

  /* If another UI patch rewrites the local P2 labels after match start,
     immediately put the guest-only R/E/F labels back. */
  if (p2ControlSide) {
    const controlObserver = new MutationObserver(() => {
      if (isGuestPrivateMatch()) applyGuestLabels();
    });

    controlObserver.observe(p2ControlSide, {
      subtree: true,
      childList: true,
      characterData: true
    });
  }

  /* Also catch the moment this browser becomes the online guest, even if
     that class is applied after this script first loads. */
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
