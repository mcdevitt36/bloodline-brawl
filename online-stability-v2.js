/* =====================================================
   BLOODLINE BRAWL — ONLINE STABILITY V2
===================================================== */

(() => {
  if (window.__bbOnlineStabilityV2Loaded) return;
  window.__bbOnlineStabilityV2Loaded = true;

  const previousBeginMatchOnlineStabilityV2 = beginMatch;

  beginMatch = function() {
    player1Fighter.classList.remove("bb-final-ko-cleared");
    player2Fighter.classList.remove("bb-final-ko-cleared");
    koOverlay.classList.add("hidden");
    newGameButton.classList.add("hidden");

    document
      .querySelectorAll(".bb-results-overlay, .bb-online-connection-lost")
      .forEach(el => el.remove());

    return previousBeginMatchOnlineStabilityV2();
  };

  const onlineRandomFix = document.createElement("script");
  onlineRandomFix.src = "online-random-fix-v7.js?v=3";
  document.body.appendChild(onlineRandomFix);

  const onlineControlsFix = document.createElement("script");
  onlineControlsFix.src = "online-controls-fix-v4.js?v=2";
  document.body.appendChild(onlineControlsFix);

  onlineControlsFix.addEventListener(
    "load",
    () => {
      const guestInputHardfix = document.createElement("script");
      guestInputHardfix.src = "online-guest-input-hardfix-v5.js?v=1";
      document.body.appendChild(guestInputHardfix);

      guestInputHardfix.addEventListener(
        "load",
        () => {
          const guestIcons = document.createElement("script");
          guestIcons.src = "online-guest-icons-v6.js?v=2";
          document.body.appendChild(guestIcons);

          guestIcons.addEventListener(
            "load",
            () => {
              const controlLabels = document.createElement("script");
              controlLabels.src = "online-control-labels-v8.js?v=1";
              document.body.appendChild(controlLabels);
            },
            { once: true }
          );
        },
        { once: true }
      );
    },
    { once: true }
  );
})();
