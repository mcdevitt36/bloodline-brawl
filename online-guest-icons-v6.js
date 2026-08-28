/* =====================================================
   BLOODLINE BRAWL — ONLINE GUEST ICONS V6
   Private-match UI only.
   - Guest sees R / E / F instead of local-2P J / K / L
   - Normal local 2P keeps J / K / L exactly as before
   - Live DOM + CSS authority prevents any guest melee J from surviving
===================================================== */

(() => {
  if (window.__bbOnlineGuestIconsV6Loaded) return;
  window.__bbOnlineGuestIconsV6Loaded = true;

  /* CSS is the final visual authority for the guest melee key. Even if a
     later local-2P refresh writes J back into the DOM, the private-match
     guest still visibly sees R. This rule is guest-only and cannot affect
     normal local 2P. */
  const guestMeleeStyle = document.createElement("style");
  guestMeleeStyle.textContent = `
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

    const keys = new Set();
    const p2Side = findCurrentP2Side();

    /* Exact P2/non-host melee slot. */
    p2Side
      ?.querySelectorAll(
        ".two-player-action-row .two-control-button:first-child small"
      )
      .forEach(key => keys.add(key));

    /* Private matches use R melee on both devices. Catch every current or
       rebuilt two-player melee slot, including cloned panels without the
       original #twoPlayerControls id. */
    document
      .querySelectorAll(
        ".two-player-action-row .two-control-button:first-child small"
      )
      .forEach(key => keys.add(key));

    /* Catch alternate/rebuilt markup where MELEE is not structurally the
       first button but the key itself still says J. */
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

  /* Observe the whole document because some late polish code can rebuild
     or move controls outside the original fight-screen subtree. */
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
