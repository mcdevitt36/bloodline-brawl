/* =====================================================
   BLOODLINE BRAWL — ONLINE LAZY LOADER V4
   Keep every offline mode completely free of online gameplay loops.
   The full WebRTC/private-match code loads only after ONLINE is clicked.
===================================================== */

(() => {
  if (window.__bbOnlineLazyLoaderV4Loaded) return;
  window.__bbOnlineLazyLoaderV4Loaded = true;

  const modeButtons = document.querySelector(".mode-buttons");
  if (!modeButtons) return;

  const style = document.createElement("style");
  style.textContent = `
    .mode-buttons.bb-online-mode-ready { gap:5px!important; }
    .mode-buttons.bb-online-mode-ready .mode-button {
      min-width:104px!important;
      padding-left:8px!important;
      padding-right:8px!important;
    }
    .bb-online-lazy-button { border-color:#4fc3ff!important; }
    .bb-online-lazy-button:hover { box-shadow:0 0 16px rgba(79,195,255,.55); }
    @media (max-width:700px) {
      .mode-buttons.bb-online-mode-ready .mode-button {
        min-width:92px!important;
        font-size:11px!important;
      }
    }
  `;
  document.head.appendChild(style);

  modeButtons.classList.add("bb-online-mode-ready");

  const button = document.createElement("button");
  button.className = "mode-button bb-online-lazy-button";
  button.type = "button";
  button.innerHTML = `ONLINE<small>PRIVATE MATCH</small>`;
  modeButtons.appendChild(button);

  let loading = false;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(script);
      script.onerror = () => reject(new Error("Could not load " + src));
      document.body.appendChild(script);
    });
  }

  button.addEventListener("click", async event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (loading) return;
    loading = true;

    button.disabled = true;
    button.innerHTML = `ONLINE<small>LOADING...</small>`;

    try {
      button.remove();

      await loadScript("online-mode-v1.js?v=2");
      await loadScript("online-stability-v2.js?v=7");

      const realButton = document.getElementById("onlineButton");
      if (realButton) {
        realButton.click();
      }
    } catch (_) {
      loading = false;
      if (!button.isConnected) modeButtons.appendChild(button);
      button.disabled = false;
      button.innerHTML = `ONLINE<small>TRY AGAIN</small>`;
    }
  }, true);
})();
