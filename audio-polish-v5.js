/* =====================================================
   BLOODLINE BRAWL — AUDIO POLISH V5
   Additive only.
   - Donn voice is fully muted; on-screen DONN, GET OVER HERE! text stays unchanged
   - Title, character select, challenge select, and map select music get a stronger temporary boost
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
     Music is already at 100% on menu screens. To make the menus
     audibly louder than before, temporarily lift BOTH the music and
     master buses to 100% while on the non-fight screens.

     The user's saved master/music settings are restored for combat.
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

  const savedMasterRaw = localStorage.getItem("bbMaster");
  const parsedSavedMaster = savedMasterRaw === null
    ? .82
    : Number(savedMasterRaw);

  const savedMaster = Math.max(
    0,
    Math.min(
      1,
      Number.isFinite(parsedSavedMaster)
        ? parsedSavedMaster
        : .82
    )
  );

  let userActivated = false;
  let lastAppliedScreen = null;

  function volumeInput(kind) {
    return document.querySelector(`.bb-sound input[data-v="${kind}"]`);
  }

  function setInternalVolume(kind, level) {
    const input = volumeInput(kind);
    if (!input) return false;

    const storageKey = kind === "music" ? "bbMusic" : "bbMaster";
    const remembered = localStorage.getItem(storageKey);
    const percent = Math.round(Math.max(0, Math.min(1, level)) * 100);

    if (Number(input.value) !== percent) {
      input.value = String(percent);
      input.dispatchEvent(new Event("input", { bubbles:true }));
    }

    /* Menu boost is temporary. Never overwrite the player's saved setting. */
    if (remembered === null) localStorage.removeItem(storageKey);
    else localStorage.setItem(storageKey, remembered);

    return true;
  }

  function activeScreenId() {
    return document.querySelector(".screen.active")?.id || "";
  }

  function applyMenuLevel(force = false) {
    if (!userActivated) return;

    const id = activeScreenId();
    if (!force && id === lastAppliedScreen) return;

    const isMenu =
      id === "titleScreen" ||
      id === "selectScreen" ||
      id === "challengeScreen" ||
      id === "mapScreen";

    const musicLevel = isMenu ? 1 : savedMusic;
    const masterLevel = isMenu ? 1 : savedMaster;

    const musicApplied = setInternalVolume("music", musicLevel);
    const masterApplied = setInternalVolume("master", masterLevel);

    if (musicApplied || masterApplied) {
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
