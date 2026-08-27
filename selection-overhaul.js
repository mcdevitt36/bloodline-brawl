/* =====================================================
   BLOODLINE BRAWL — SELECTION / PRESENTATION BOOTSTRAP
   Loads the stable character-select overhaul first, then the
   safe presentation and map layers after it finishes.
===================================================== */

(() => {
  const core =
    document.createElement("script");

  core.src =
    "selection-overhaul-core.js?v=2";

  document.body.appendChild(
    core
  );

  core.addEventListener(
    "load",
    () => {
      const presentation =
        document.createElement("script");

      presentation.src =
        "presentation-upgrades.js?v=3";

      document.body.appendChild(
        presentation
      );

      presentation.addEventListener(
        "load",
        () => {
          const maps =
            document.createElement("script");

          maps.src =
            "map-upgrades.js?v=1";

          document.body.appendChild(
            maps
          );

          maps.addEventListener(
            "load",
            () => {
              const finishing =
                document.createElement("script");

              finishing.src =
                "map-finishing.js?v=1";

              document.body.appendChild(
                finishing
              );

              finishing.addEventListener(
                "load",
                () => {
                  const cleanup =
                    document.createElement("script");

                  cleanup.src =
                    "map-cleanup.js?v=2";

                  document.body.appendChild(
                    cleanup
                  );
                },
                {
                  once: true
                }
              );
            },
            {
              once: true
            }
          );
        },
        {
          once: true
        }
      );
    },
    {
      once: true
    }
  );
})();
