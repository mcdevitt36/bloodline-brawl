/* =====================================================
   BLOODLINE BRAWL — MENU / SCREEN POLISH V7
   Additive only.
   - Keep battle view pinned to the HUD/top when a fight starts
   - Replace quiet menu bed with a much louder similar synth mix
   - Hide the top-right SOUND button without breaking audio internals
===================================================== */

(() => {
  if (window.__bbMenuScreenPolishV7Loaded) return;
  window.__bbMenuScreenPolishV7Loaded = true;

  /* ===================================================
     REMOVE VISIBLE SOUND BUTTON
     Keep the hidden controls in the DOM because older audio polish
     uses their sliders internally to preserve battle volume settings.
  =================================================== */
  const style = document.createElement("style");
  style.textContent = `
    .bb-sound {
      display: none !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }
  `;
  document.head.appendChild(style);

  /* ===================================================
     FIGHT SCREEN — ALWAYS ENTER AT THE HUD/TOP
     The map screen can be scrolled down to its FIGHT button. Browsers
     keep that scroll position when the hidden screen changes, which is
     why the controls were appearing while the health bars were above
     the viewport. Reset only when the fight screen is active.
  =================================================== */
  function fightIsActive() {
    return !!document.getElementById("fightScreen")?.classList.contains("active");
  }

  function pinFightToTop() {
    if (!fightIsActive()) return;

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    try {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } catch (_) {
      window.scrollTo(0, 0);
    }
  }

  if (typeof showScreen === "function" && !showScreen.__bbFightTopPinned) {
    const previousShowScreen = showScreen;

    const pinnedShowScreen = function(screen) {
      const result = previousShowScreen(screen);

      if (screen === fightScreen) {
        requestAnimationFrame(pinFightToTop);
        setTimeout(pinFightToTop, 60);
        setTimeout(pinFightToTop, 180);
        setTimeout(pinFightToTop, 420);
      }

      return result;
    };

    pinnedShowScreen.__bbFightTopPinned = true;
    showScreen = pinnedShowScreen;
  }

  document.getElementById("fightButton")?.addEventListener(
    "click",
    () => {
      setTimeout(pinFightToTop, 0);
      setTimeout(pinFightToTop, 90);
      setTimeout(pinFightToTop, 260);
    },
    true
  );

  document.querySelectorAll(
    "#onePlayerControls button, #twoPlayerControls button"
  ).forEach(button => {
    button.addEventListener("click", () => {
      button.blur();
      requestAnimationFrame(pinFightToTop);
    });
  });

  document.addEventListener(
    "focusin",
    event => {
      if (
        fightIsActive() &&
        event.target instanceof Element &&
        event.target.closest("#onePlayerControls, #twoPlayerControls")
      ) {
        requestAnimationFrame(pinFightToTop);
      }
    },
    true
  );

  document.addEventListener(
    "keydown",
    () => {
      if (fightIsActive()) requestAnimationFrame(pinFightToTop);
    },
    true
  );

  window.addEventListener("resize", pinFightToTop, { passive: true });

  /* ===================================================
     LOUDER TITLE / CHARACTER / MAP MUSIC
     The old menu themes were already at 100% slider volume, but their
     individual oscillator gains were intentionally tiny. Run a fuller,
     compressed menu mix instead. Fight/map battle music remains the
     existing audio system and returns automatically in fightScreen.
  =================================================== */
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;

  const themes = {
    title: {
      bpm: 94,
      bass: [40,null,40,null,43,null,43,null,45,null,45,null,38,null,38,null],
      lead: [59,null,62,null,64,null,62,null,59,null,57,null,59,62,null,57],
      roots: [52,55,57,50],
      wave: "triangle",
      bassV: .16,
      leadV: .13,
      chordV: .046,
      pulseV: .085
    },
    select: {
      bpm: 110,
      bass: [40,null,47,null,43,null,47,null,45,null,52,null,43,null,47,null],
      lead: [64,null,67,null,69,null,67,null,62,null,64,null,67,null,64,null],
      roots: [52,55,57,55],
      wave: "triangle",
      bassV: .145,
      leadV: .12,
      chordV: .040,
      pulseV: .075
    },
    map: {
      bpm: 104,
      bass: [38,null,45,null,41,null,45,null,43,null,50,null,41,null,45,null],
      lead: [62,null,65,null,67,null,65,null,60,null,62,null,65,null,62,null],
      roots: [50,53,55,53],
      wave: "triangle",
      bassV: .145,
      leadV: .115,
      chordV: .039,
      pulseV: .072
    }
  };

  let ctx = null;
  let mix = null;
  let compressor = null;
  let timer = null;
  let currentTheme = null;
  let step = 0;
  let activated = false;

  const hz = midi => 440 * 2 ** ((midi - 69) / 12);

  function ensureAudio() {
    if (!ctx) {
      ctx = new AC();
      mix = ctx.createGain();
      compressor = ctx.createDynamicsCompressor();

      mix.gain.value = .88;
      compressor.threshold.value = -20;
      compressor.knee.value = 10;
      compressor.ratio.value = 5;
      compressor.attack.value = .004;
      compressor.release.value = .20;

      mix.connect(compressor);
      compressor.connect(ctx.destination);
    }

    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
  }

  function tone(frequency, duration, volume, type = "triangle", when = 0) {
    if (!ctx || !mix) return;

    const start = Math.max(ctx.currentTime, when || ctx.currentTime);
    const end = start + duration;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(Math.max(20, frequency), start);

    gain.gain.setValueAtTime(.0001, start);
    gain.gain.exponentialRampToValueAtTime(Math.max(.0002, volume), start + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, end);

    oscillator.connect(gain);
    gain.connect(mix);
    oscillator.start(start);
    oscillator.stop(end + .03);
  }

  function pulse(theme, when) {
    tone(72, .11, theme.pulseV, "sine", when);
    tone(46, .14, theme.pulseV * .7, "sine", when + .012);
  }

  function playStep() {
    if (!ctx || !currentTheme) return;

    const theme = themes[currentTheme];
    if (!theme) return;

    const i = step % 16;
    const beat = 60 / theme.bpm;
    const half = beat / 2;
    const now = ctx.currentTime + .012;
    const bass = theme.bass[i];
    const lead = theme.lead[i];

    if (bass != null) {
      tone(hz(bass), half * .82, theme.bassV, "triangle", now);
    }

    if (lead != null) {
      tone(hz(lead), half * .72, theme.leadV, theme.wave, now);
    }

    if (i % 4 === 0) {
      const root = theme.roots[(i / 4) % theme.roots.length];
      [root, root + 4, root + 7].forEach((note, index) => {
        tone(
          hz(note),
          beat * 1.18,
          theme.chordV,
          "sine",
          now + index * .006
        );
      });
      pulse(theme, now);
    }

    step = (step + 1) % 16;
  }

  function stopCustomMenu() {
    if (timer) clearInterval(timer);
    timer = null;
    currentTheme = null;
    step = 0;
  }

  function startCustomMenu(name) {
    if (!activated || !themes[name]) return;
    ensureAudio();

    if (currentTheme === name && timer) return;

    stopCustomMenu();
    currentTheme = name;
    step = 0;

    const interval = (60 / themes[name].bpm) * 500;
    playStep();
    timer = setInterval(playStep, interval);
  }

  function menuForScreen() {
    const id = document.querySelector(".screen.active")?.id || "";

    if (id === "titleScreen") return "title";
    if (id === "selectScreen" || id === "challengeScreen") return "select";
    if (id === "mapScreen") return "map";
    return null;
  }

  function syncMenuMusic() {
    if (!activated) return;

    const menu = menuForScreen();

    if (menu) {
      /* Stop only the base music bed. SFX continue through BloodlineAudio. */
      try {
        window.BloodlineAudio?.stop?.();
      } catch (_) {}

      startCustomMenu(menu);
      return;
    }

    if (currentTheme) {
      stopCustomMenu();
    }

    /* Restore the existing map-specific battle music in fights. */
    try {
      window.BloodlineAudio?.sync?.();
    } catch (_) {}
  }

  function activate() {
    activated = true;
    ensureAudio();
    setTimeout(syncMenuMusic, 0);
    setTimeout(syncMenuMusic, 80);
  }

  document.addEventListener("pointerdown", activate, {
    capture: true,
    once: true,
    passive: true
  });

  document.addEventListener("keydown", activate, {
    capture: true,
    once: true
  });

  document.addEventListener(
    "click",
    () => {
      setTimeout(syncMenuMusic, 0);
      setTimeout(syncMenuMusic, 70);
      setTimeout(syncMenuMusic, 180);
    },
    true
  );

  /* Small bounded-frequency sync. It also immediately silences any old
     base menu track if its own screen watcher tried to restart it. */
  setInterval(syncMenuMusic, 220);
})();
