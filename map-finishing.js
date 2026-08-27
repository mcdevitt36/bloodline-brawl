/* =====================================================
   BLOODLINE BRAWL — MAP FINISHING TOUCHES
   Small one-time fixes after map-upgrades.js.
===================================================== */

(() => {
  const madridPreview =
    document.querySelector(
      ".madrid-preview"
    );

  if (
    madridPreview &&
    !madridPreview.querySelector(
      ".bb-madrid-preview-tower.right"
    )
  ) {
    const rightPreviewTower =
      document.createElement(
        "div"
      );

    rightPreviewTower.className =
      "bb-madrid-preview-tower right";

    madridPreview.appendChild(
      rightPreviewTower
    );
  }


  const mapDecor =
    document.querySelector(
      "#arena .map-decor"
    );

  if (
    mapDecor &&
    !mapDecor.querySelector(
      ".bb-madrid-tower.right"
    )
  ) {
    const rightArenaTower =
      document.createElement(
        "div"
      );

    rightArenaTower.className =
      "bb-madrid-tower right";

    mapDecor.appendChild(
      rightArenaTower
    );
  }
})();
