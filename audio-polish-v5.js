/* =====================================================
   BLOODLINE BRAWL — AUDIO POLISH V5
   Additive only.
   - Donn voice is fully muted; on-screen DONN, GET OVER HERE! text stays unchanged
   - Title music gets a strong lift; character/map selection get a smaller lift
===================================================== */

(() => {
  if (window.__bbAudioPolishV5Loaded) return;
  window.__bbAudioPolishV5Loaded = true;

  /* ===================================================
     GRANDMOMMY — REMOVE DONN VOICE COMPLETELY
     Audio V4 can trigger the Donn call from both keys and effects.
     Suppress only that speech utterance so the visual sequence/text
     and the rest of the game's sounds stay untouched.
  =================================================== */

  try {
    const synth = window.speechSynthesis;

    if (synth && !synth.__bbDonnMuted) {
      synth.__bbDonnMuted = true;
      const nativeSpeak = synth.speak.bind(synth);

      synth.speak = function(utterance) {
        const text = String(utterance?.text || "");

        if (/^Donn/i.test(text)) {
          return;
        }

        return nativeSpeak(utterance);
      };
    }
  } catch (_) {}

  /* Keep the public helper silent too for any late-loaded callers. */
  setTimeout(() => {
    try {
      if (window.BloodlineAudio) {
        window.BloodlineAudio.grandmommyCall = () => {};
      }
    } catch (_) {}
  }, 0);

  /* ===================================================
     MENU MUSIC GAIN
     Keep the user's normal battle music preference, but give the
     title/character/map screens their own stronger minimum levels.
  =================================================== */

  const savedMusicRaw = localStorage.getItem("bbMusic");
  const parsedSavedMusic = savedMusicRaw === null
    ? .30
    : Number(savedMusicRaw);

  const savedMusic = Math.max(
    0,
    Math.min(
      1,
      Number.isFinite(parsedSavedMusic)
        ? parsedSavedMusic
        : .30
    )
  );

  let userActivated = false;
  let lastAppliedScreen = null;

  function musicInput() {
    return document.querySelector('.bb-sound input[data-v="music"]');
  }

  function setInternalMusic(level) {
    const input = musicInput();
    if (!input) return false;

    const remembered = localStorage.getItem("bbMusic");
    const percent = Math.round(Math.max(0, Math.min(1, level)) * 100);

    if (Number(input.value) !== percent) {
      input.value = String(percent);
      input.dispatchEvent(new Event("input", { bubbles:true }));
    }

    /* The boost is screen-specific, not a permanent rewrite of the user's slider. */
    if (remembered === null) localStorage.removeItem("bbMusic");
    else localStorage.setItem("bbMusic", remembered);

    return true;
  }

  function activeScreenId() {
    return document.querySelector(".screen.active")?.id || "";
  }

  function applyMenuLevel(force = false) {
    if (!userActivated) return;

    const id = activeScreenId();
    if (!force && id === lastAppliedScreen) return;

    let level = savedMusic;

    /* Big lift for the opening/title screen. */
    if (id === "titleScreen") {
      level = Math.max(savedMusic, .84);
    }
    /* Smaller but noticeable lift for fighter/challenge selection. */
    else if (id === "selectScreen" || id === "challengeScreen") {
      level = Math.max(savedMusic, .62);
    }
    /* Same smaller lift for map selection. */
    else if (id === "mapScreen") {
      level = Math.max(savedMusic, .62);
    }

    if (setInternalMusic(level)) {
      lastAppliedScreen = id;
    }
  }

  function activateAndApply() {
    userActivated = true;
    setTimeout(() => applyMenuLevel(true), 25);
  }

  document.addEventListener("pointerdown", activateAndApply, {
    capture:true,
    once:true,
    passive:true
  });

  document.addEventListener("keydown", activateAndApply, {
    capture:true,
    once:true
  });

  document.addEventListener("click", () => {
    setTimeout(() => applyMenuLevel(false), 80);
  }, true);

  setInterval(() => applyMenuLevel(false), 350);
})();
