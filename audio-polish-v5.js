/* =====================================================
   BLOODLINE BRAWL — AUDIO POLISH V5
   Additive only.
   - Donn call speaks ONLY "Donnnnn" in a slower/lower older-woman style
   - Prevent the old duplicate/fallback Donn yell while keeping the text unchanged
   - Menu music is substantially louder than battle music, especially title
===================================================== */

(() => {
  if (window.__bbAudioPolishV5Loaded) return;
  window.__bbAudioPolishV5Loaded = true;

  /* ===================================================
     GRANDMOMMY — VOICE CONTENT / DELIVERY ONLY
     The on-screen text still visually reads DONN, GET OVER HERE!
  =================================================== */

  try {
    const NativeUtterance = window.SpeechSynthesisUtterance;

    if (NativeUtterance && !window.__bbDonnUtteranceWrapped) {
      window.__bbDonnUtteranceWrapped = true;

      function BloodlineUtterance(text = "") {
        const source = String(text ?? "");
        const replaced = /Donn!?\s*Get over here!?/i.test(source)
          ? "Donnnnn!"
          : source;

        return new NativeUtterance(replaced);
      }

      BloodlineUtterance.prototype = NativeUtterance.prototype;
      try { Object.setPrototypeOf(BloodlineUtterance, NativeUtterance); } catch (_) {}
      window.SpeechSynthesisUtterance = BloodlineUtterance;

      const synth = window.speechSynthesis;
      if (synth && !synth.__bbDonnSpeakWrapped) {
        synth.__bbDonnSpeakWrapped = true;
        const nativeSpeak = synth.speak.bind(synth);

        synth.speak = function(utterance) {
          try {
            if (/^Donn/i.test(utterance?.text || "")) {
              const voices = synth.getVoices();
              const preferred = [
                "Moira",
                "Karen",
                "Victoria",
                "Tessa",
                "Fiona",
                "Samantha",
                "Serena",
                "Ava"
              ];

              const olderWomanVoice =
                preferred
                  .map(name => voices.find(v => v.name.includes(name)))
                  .find(Boolean) ||
                voices.find(v => /female|woman/i.test(v.name)) ||
                utterance.voice ||
                voices[0] ||
                null;

              if (olderWomanVoice) utterance.voice = olderWomanVoice;

              /* Slower and lower than the previous bright/high delivery. */
              utterance.rate = .68;
              utterance.pitch = .82;
              utterance.volume = 1;
            }
          } catch (_) {}

          return nativeSpeak(utterance);
        };
      }
    }
  } catch (_) {}

  /* Audio V4 used both the F/L key listener AND an effects observer to call Donn,
     which could produce a second synthetic fallback yell. Keep only one call.
     A zero-width character leaves the comic text visually identical while keeping
     the old effects observer from interpreting it as another voice trigger. */
  let recentGrandmommyKeyAt = -Infinity;

  document.addEventListener("keydown", event => {
    if (event.repeat) return;
    const key = event.key.toLowerCase();

    try {
      if (
        (key === "f" && P1?.character === "grandmommy") ||
        (key === "l" && P2?.character === "grandmommy")
      ) {
        recentGrandmommyKeyAt = performance.now();
      }
    } catch (_) {}
  }, true);

  if (typeof addComicText === "function" && !window.__bbDonnComicTextWrapped) {
    window.__bbDonnComicTextWrapped = true;
    const previousAddComicText = addComicText;

    addComicText = function(text, ...rest) {
      if (/^DONN, GET OVER HERE!$/i.test(String(text || ""))) {
        const triggeredByRecentKey = performance.now() - recentGrandmommyKeyAt < 350;

        /* Visually identical, but the old observer regex no longer matches. */
        const visualText = "DONN, GET O\u200bVER HERE!";
        const result = previousAddComicText(visualText, ...rest);

        /* CPU / on-screen-button Grandmommy still needs the one voice call. */
        if (!triggeredByRecentKey) {
          setTimeout(() => {
            try { window.BloodlineAudio?.grandmommyCall?.(); } catch (_) {}
          }, 0);
        }

        return result;
      }

      return previousAddComicText(text, ...rest);
    };
  }

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

    /* The first/title screen gets the largest lift. */
    if (id === "titleScreen") {
      level = Math.max(savedMusic, .68);
    }
    else if (id === "selectScreen" || id === "challengeScreen") {
      level = Math.max(savedMusic, .56);
    }
    else if (id === "mapScreen") {
      level = Math.max(savedMusic, .56);
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

  /* Screen changes are infrequent; a light read-only check is safer than a DOM observer. */
  setInterval(() => applyMenuLevel(false), 350);
})();
