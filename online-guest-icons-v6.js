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

  const isGuestPrivateMatch = () =>
    document.body.classList.contains("bb-online-active") &&
    document.body.classList.contains("bb-online-guest");

  function applyGuestLabels() {
    if (!isGuestPrivateMatch()) return;

    if (p2SpecialKey) p2SpecialKey.textContent = "E";
    if (p2UltimateKey) p2UltimateKey.textContent = "F";

    if (p2ControlSide) {
      const movement = p2ControlSide.querySelector(":scope > span");
      const actionKeys = p2ControlSide.querySelectorAll(".two-control-button small");
      const ultimateNote = p2ControlSide.querySelector(".ultimate-key-note");

      if (movement) movement.textContent = "A/D OR ARROWS • Q BLOCK";
      if (actionKeys[0]) actionKeys[0].textContent = "R";
      if (actionKeys[1]) actionKeys[1].textContent = "E";
      if (ultimateNote) ultimateNote.textContent = "F = ULTIMATE";
    }
  }

  function restoreLocal2PLabels() {
    if (isGuestPrivateMatch()) return;

    if (p2SpecialKey) p2SpecialKey.textContent = gameMode === "1P" ? "CPU" : "K";
    if (p2UltimateKey) p2UltimateKey.textContent = gameMode === "1P" ? "CPU" : "L";

    if (p2ControlSide) {
      const movement = p2ControlSide.querySelector(":scope > span");
      const actionKeys = p2ControlSide.querySelectorAll(".two-control-button small");
      const ultimateNote = p2ControlSide.querySelector(".ultimate-key-note");

      if (movement) movement.textContent = "ARROWS • I BLOCK";
      if (actionKeys[0]) actionKeys[0].textContent = "J";
      if (actionKeys[1]) actionKeys[1].textContent = "K";
      if (ultimateNote) ultimateNote.textContent = "L = ULTIMATE";
    }
  }

  const previousBeginMatchGuestIconsV6 = beginMatch;
  beginMatch = function() {
    const result = previousBeginMatchGuestIconsV6.apply(this, arguments);

    if (isGuestPrivateMatch()) {
      applyGuestLabels();
      setTimeout(applyGuestLabels, 0);
      setTimeout(applyGuestLabels, 180);
    } else {
      restoreLocal2PLabels();
    }

    return result;
  };

  twoPlayerButton?.addEventListener("click", () => {
    setTimeout(restoreLocal2PLabels, 0);
  });

  onePlayerButton?.addEventListener("click", () => {
    setTimeout(restoreLocal2PLabels, 0);
  });

  applyGuestLabels();
})();
