/* =====================================================
   BLOODLINE BRAWL — ONLINE GUEST ICONS V6
   Private-match UI only.
   - Guest sees R / E / F instead of local-2P J / K / L
   - Normal local 2P keeps J / K / L exactly as before
   - Directly fixes the arena melee key #player2MeleeKey
===================================================== */

(() => {
  if (window.__bbOnlineGuestIconsV6Loaded) return;
  window.__bbOnlineGuestIconsV6Loaded = true;

  /* The screenshot's stubborn J is NOT the bottom control-panel key.
     It is the separate arena melee HUD span created by character-updates.js:
     #player2MeleeKey. Private matches run through gameMode === "2P", so that
     source normally writes J there. On the guest browser, R is the real key. */
  const guestMeleeStyle = document.createElement("style");
  guestMeleeStyle.textContent = `
    body.bb-online-active.bb-online-guest
    #player2MeleeKey {
      font-size: 0 !important;
    }

    body.bb-online-active.bb-online-guest
    #player2MeleeKey::after {
      content: "R" !important;
      font-size: 11px !important;
      line-height: inherit !important;
      font-weight: inherit !important;
      color: inherit !important;
    }

    body.bb-online-active.bb-online-guest
    .two-player-action-row .two-control-button:first-child small {
      font-size: 0 !important;
    }

    body.bb-online-active.bb-online-guest
    .two-player-action-row .two-control-button:first-child small::after {
      content: "R" !important;
      font-size: 11px !important;
      line-height: inherit !important;
      font-weight: inherit !important;
      color: inherit !important;
    }
  `;
  document.head.appendChild(guestMeleeStyle);

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

    /* THIS is the exact J shown under Barrett's orange melee orb. */
    setText(document.getElementById("player2MeleeKey"), "R");

    const keys = new Set();
    const p2Side = findCurrentP2Side();

    /* Keep the separate bottom P2 control panel correct too. */
    p2Side
      ?.querySelectorAll(
        ".two-player-action-row .two-control-button:first-child small"
      )
      .forEach(key => keys.add(key));

    document
      .querySelectorAll(
        ".two-player-action-row .two-control-button:first-child small"
      )
      .forEach(key => keys.add(key));

    document
      .querySelectorAll("button small")
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
    const p2MeleeArenaKey = document.getElementById("player2MeleeKey");
    const p2Side = findCurrentP2Side();
    const movement = p2Side?.querySelector(":scope > span") || null;
    const meleeKey = p2Side?.querySelector(
      ".two-player-action-row .two-control-button:first-child small"
    ) || null;
    const specialKey = p2Side?.querySelector(
      ".two-player-action-row .two-control-button.special small"
    ) || null;
    const ultimateNote = p2Side?.querySelector(".ultimate-key-note") || null;

    const onePlayer = gameMode === "1P";

    setText(p2MeleeArenaKey, onePlayer ? "CPU" : "J");
    setText(p2SpecialKey, onePlayer ? "CPU" : "K");
    setText(p2UltimateKey, onePlayer ? "CPU" : "L");
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

  /* character-updates.js can rewrite #player2MeleeKey to J when its HUD
     updater runs. Watching text/DOM changes means that exact write is
     immediately corrected to R on the non-host browser. */
  const uiObserver = new MutationObserver(() => {
    if (isGuestPrivateMatch()) applyGuestLabels();
  });

  uiObserver.observe(document.body, {
    subtree: true,
    childList: true,
    characterData: true
  });

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
