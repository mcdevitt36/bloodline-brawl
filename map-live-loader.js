/* =====================================================
   BLOODLINE BRAWL — LIVE UI / VISUAL / AUDIO / COMBAT LOADER
===================================================== */

(() => {
  const audio = document.createElement("script");
  audio.src = "audio-v4.js?v=1";
  document.body.appendChild(audio);

  audio.addEventListener(
    "load",
    () => {
      const audioPolish = document.createElement("script");
      audioPolish.src = "audio-polish-v5.js?v=5";
      document.body.appendChild(audioPolish);

      audioPolish.addEventListener(
        "load",
        () => {
          const menuScreenPolish = document.createElement("script");
          menuScreenPolish.src = "menu-screen-polish-v7.js?v=2";
          document.body.appendChild(menuScreenPolish);
        },
        { once: true }
      );
    },
    { once: true }
  );

  const ui = document.createElement("script");
  ui.src = "ui-random-title.js?v=1";
  document.body.appendChild(ui);

  window.setTimeout(
    () => {
      try {
        delete window.__bbMapRefineLoaded;
      } catch (error) {
        window.__bbMapRefineLoaded = false;
      }

      const latest = document.createElement("script");
      latest.src = "map-refine.js?v=4";
      document.body.appendChild(latest);

      latest.addEventListener(
        "load",
        () => {
          const v4 = document.createElement("script");
          v4.src = "visual-fixes-v4.js?v=1";
          document.body.appendChild(v4);

          v4.addEventListener(
            "load",
            () => {
              const v5 = document.createElement("script");
              v5.src = "visual-fixes-v5.js?v=1";
              document.body.appendChild(v5);

              v5.addEventListener(
                "load",
                () => {
                  const combat = document.createElement("script");
                  combat.src = "combat-smoothing.js?v=1";
                  document.body.appendChild(combat);

                  combat.addEventListener(
                    "load",
                    () => {
                      const ipo = document.createElement("script");
                      ipo.src = "brendan-ipo-upgrade.js?v=2";
                      document.body.appendChild(ipo);

                      ipo.addEventListener(
                        "load",
                        () => {
                          const victory = document.createElement("script");
                          victory.src = "victory-celebrations.js?v=3";
                          document.body.appendChild(victory);

                          victory.addEventListener(
                            "load",
                            () => {
                              const polish = document.createElement("script");
                              polish.src = "character-polish-v3.js?v=1";
                              document.body.appendChild(polish);

                              polish.addEventListener(
                                "load",
                                () => {
                                  const finalPolish = document.createElement("script");
                                  finalPolish.src = "final-polish-v4.js?v=1";
                                  document.body.appendChild(finalPolish);

                                  finalPolish.addEventListener(
                                    "load",
                                    () => {
                                      const finalPolishV5 = document.createElement("script");
                                      finalPolishV5.src = "final-polish-v5.js?v=1";
                                      document.body.appendChild(finalPolishV5);

                                      finalPolishV5.addEventListener(
                                        "load",
                                        () => {
                                          const finalPolishV6 = document.createElement("script");
                                          finalPolishV6.src = "final-polish-v6.js?v=3";
                                          document.body.appendChild(finalPolishV6);

                                          finalPolishV6.addEventListener(
                                            "load",
                                            () => {
                                              const toddlerRoster = document.createElement("script");
                                              toddlerRoster.src = "toddler-roster-v1.js?v=1";
                                              document.body.appendChild(toddlerRoster);

                                              toddlerRoster.addEventListener(
                                                "load",
                                                () => {
                                                  const toddlerPolish = document.createElement("script");
                                                  toddlerPolish.src = "toddler-ui-polish-v2.js?v=1";
                                                  document.body.appendChild(toddlerPolish);

                                                  toddlerPolish.addEventListener(
                                                    "load",
                                                    () => {
                                                      const toddlerGroundBearPolish = document.createElement("script");
                                                      toddlerGroundBearPolish.src = "toddler-ground-bear-polish-v3.js?v=1";
                                                      document.body.appendChild(toddlerGroundBearPolish);

                                                      toddlerGroundBearPolish.addEventListener(
                                                        "load",
                                                        () => {
                                                          const titleSelectPolish = document.createElement("script");
                                                          titleSelectPolish.src = "title-select-polish-v8.js?v=1";
                                                          document.body.appendChild(titleSelectPolish);

                                                          titleSelectPolish.addEventListener(
                                                            "load",
                                                            () => {
                                                              const titlePositionFix = document.createElement("script");
                                                              titlePositionFix.src = "title-position-fix-v9.js?v=11";
                                                              document.body.appendChild(titlePositionFix);
                                                            },
                                                            { once: true }
                                                          );
                                                        },
                                                        { once: true }
                                                      );
                                                    },
                                                    { once: true }
                                                  );
                                                },
                                                { once: true }
                                              );
                                            },
                                            { once: true }
                                          );
                                        },
                                        { once: true }
                                      );
                                    },
                                    { once: true }
                                  );
                                },
                                { once: true }
                              );
                            },
                            { once: true }
                          );
                        },
                        { once: true }
                      );
                    },
                    { once: true }
                  );
                },
                { once: true }
              );
            },
            { once: true }
          );
        },
        { once: true }
      );
    },
    1200
  );
})();
