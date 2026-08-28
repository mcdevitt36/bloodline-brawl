/* =====================================================
   BLOODLINE BRAWL — FINAL POLISH V6
   Tiny additive Kelly headphone fit + Leah naming tweaks only.
===================================================== */

(() => {
  if (window.__bbFinalPolishV6Loaded) return;
  window.__bbFinalPolishV6Loaded = true;

  const style = document.createElement("style");
  style.textContent = `
    /* Lift the full headset a touch more. */
    .kelly-model .bb4-headphones {
      top: 3px !important;
    }

    /* Move the ear cups slightly farther out from Kelly's head. */
    .kelly-model .bb4-headphones::before {
      left: -14px !important;
    }

    .kelly-model .bb4-headphones::after {
      right: -14px !important;
    }
  `;

  document.head.appendChild(style);

  /* Leah fights with two visible crochet hooks, so keep the display label plural. */
  function pluralizeCrochetHooks() {
    const roots = [
      document.getElementById("titleScreen"),
      document.getElementById("selectScreen"),
      document.getElementById("challengeScreen"),
      document.getElementById("mapScreen")
    ].filter(Boolean);

    roots.forEach(root => {
      const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            const parent = node.parentElement;
            if (!parent || parent.closest("script,style")) {
              return NodeFilter.FILTER_REJECT;
            }

            return /crochet hook(?!s)/i.test(node.nodeValue || "")
              ? NodeFilter.FILTER_ACCEPT
              : NodeFilter.FILTER_REJECT;
          }
        }
      );

      const matches = [];
      while (walker.nextNode()) matches.push(walker.currentNode);

      matches.forEach(node => {
        node.nodeValue = node.nodeValue.replace(/Crochet Hook(?!s)/gi, "Crochet Hooks");
      });
    });
  }

  pluralizeCrochetHooks();

  document.addEventListener("click", () => {
    setTimeout(pluralizeCrochetHooks, 0);
    setTimeout(pluralizeCrochetHooks, 130);
  }, true);

  let pluralPasses = 0;
  const pluralTimer = setInterval(() => {
    pluralizeCrochetHooks();
    if (++pluralPasses >= 24) clearInterval(pluralTimer);
  }, 250);
})();
