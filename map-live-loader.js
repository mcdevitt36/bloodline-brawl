/* =====================================================
   BLOODLINE BRAWL — LIVE MAP LOADER
   Forces the newest map refinement pass after the existing
   additive loaders finish, avoiding stale browser/CDN caches.
===================================================== */

(() => {
  window.setTimeout(
    () => {
      try {
        delete window.__bbMapRefineLoaded;
      } catch (error) {
        window.__bbMapRefineLoaded = false;
      }

      const latest =
        document.createElement("script");

      latest.src =
        "map-refine.js?v=3";

      document.body.appendChild(
        latest
      );
    },
    1200
  );
})();
