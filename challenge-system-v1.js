/* =====================================================
   BLOODLINE BRAWL — FAMILY CHALLENGES V1
   Offline progression system.
   - 3 rotating Daily + 3 rotating Weekly challenges
   - Offline-only progress; ONLINE never advances challenges
   - Claim Family XP, level up, unlock cosmetic rewards
   - Skin packs + map variants
   - Everything persists locally with localStorage
===================================================== */

(() => {
  if (window.__bbFamilyChallengesV1Loaded) return;
  window.__bbFamilyChallengesV1Loaded = true;

  const STORAGE = {
    profile: "bb-family-challenges-profile-v1",
    daily: "bb-family-challenges-daily-v1",
    weekly: "bb-family-challenges-weekly-v1"
  };

  const DAILY_COUNT = 3;
  const WEEKLY_COUNT = 3;

  const DAILY_POOL = [
    { id:"d_play_2", metric:"matches", target:2, xp:100, title:"GET IN THE RING", text:"Play 2 offline matches." },
    { id:"d_win_2", metric:"wins", target:2, xp:100, title:"FAMILY BUSINESS", text:"Win 2 offline matches." },
    { id:"d_melee_15", metric:"meleeHits", target:15, xp:100, title:"HANDS ON", text:"Land 15 melee hits." },
    { id:"d_special_8", metric:"specialUses", target:8, xp:100, title:"SPECIAL DELIVERY", text:"Use 8 special attacks." },
    { id:"d_ult_3", metric:"ultimateUses", target:3, xp:100, title:"BIG FINISH", text:"Use 3 ultimates." },
    { id:"d_damage_350", metric:"damage", target:350, xp:100, title:"DAMAGE DEALER", text:"Deal 350 total damage." },
    { id:"d_ko_4", metric:"kos", target:4, xp:100, title:"KNOCKOUT ARTIST", text:"Get 4 round KOs." },
    { id:"d_fighters_2", metric:"fightersPlayed", target:2, xp:100, title:"MIX IT UP", text:"Finish matches with 2 different fighters." },
    { id:"d_maps_2", metric:"mapsPlayed", target:2, xp:100, title:"ROAD TRIP", text:"Finish matches on 2 different maps." },
    { id:"d_healthy_1", metric:"healthyWins", target:1, xp:100, title:"STRONG FINISH", text:"Win a match with at least 50% health." }
  ];

  const WEEKLY_POOL = [
    { id:"w_play_10", metric:"matches", target:10, xp:300, title:"REGULAR", text:"Play 10 offline matches." },
    { id:"w_win_7", metric:"wins", target:7, xp:300, title:"WINNING WEEK", text:"Win 7 offline matches." },
    { id:"w_melee_60", metric:"meleeHits", target:60, xp:300, title:"BRAWLER", text:"Land 60 melee hits." },
    { id:"w_special_30", metric:"specialUses", target:30, xp:300, title:"SPECIALIST", text:"Use 30 special attacks." },
    { id:"w_ult_12", metric:"ultimateUses", target:12, xp:300, title:"ULTIMATE THREAT", text:"Use 12 ultimates." },
    { id:"w_damage_2000", metric:"damage", target:2000, xp:300, title:"HEAVY HITTER", text:"Deal 2,000 total damage." },
    { id:"w_ko_20", metric:"kos", target:20, xp:300, title:"KO MACHINE", text:"Get 20 round KOs." },
    { id:"w_fighters_6", metric:"fightersPlayed", target:6, xp:300, title:"ROSTER TOUR", text:"Finish matches with 6 different fighters." },
    { id:"w_maps_4", metric:"mapsPlayed", target:4, xp:300, title:"WORLD TOUR", text:"Finish matches on all 4 maps." },
    { id:"w_win_fighters_4", metric:"fightersWon", target:4, xp:300, title:"VERSATILE", text:"Win with 4 different fighters." }
  ];

  /* XP required to ENTER each level. Index = level - 1. */
  const LEVEL_THRESHOLDS = [
    0,
    300,
    850,
    1500,
    2300,
    3200,
    4200,
    5400,
    6800,
    8500
  ];

  const REWARDS = [
    { level:2, type:"skin", id:"arcade", name:"ARCADE ALT SKINS", detail:"Bright alternate colorways for the full roster." },
    { level:3, type:"map", map:"westhampton", id:"sunset", name:"WESTHAMPTON SUNSET", detail:"A warm sunset version of Westhampton Beach." },
    { level:4, type:"skin", id:"midnight", name:"MIDNIGHT SKINS", detail:"Dark navy and electric-blue alternate outfits." },
    { level:5, type:"map", map:"madrid", id:"night", name:"MADRID AFTER DARK", detail:"Nighttime Madrid with city lights and stars." },
    { level:6, type:"skin", id:"rival", name:"RIVAL SKINS", detail:"Red, white, and black competitive colorways." },
    { level:7, type:"map", map:"newcanaan", id:"snow", name:"SNOWY NEW CANAAN", detail:"A winter version of New Canaan." },
    { level:8, type:"skin", id:"retro", name:"RETRO SKINS", detail:"Bold throwback neon alternate outfits." },
    { level:9, type:"map", map:"virginia", id:"storm", name:"VIRGINIA THUNDERSTORM", detail:"A stormy Virginia battlefield with rain and lightning." },
    { level:10, type:"skin", id:"champion", name:"FAMILY CHAMPION SKINS", detail:"Black-and-gold prestige colorways for max level." }
  ];

  const SKIN_NAMES = {
    default: "DEFAULT",
    arcade: "ARCADE ALT",
    midnight: "MIDNIGHT",
    rival: "RIVAL",
    retro: "RETRO",
    champion: "FAMILY CHAMPION"
  };

  const MAP_VARIANT_NAMES = {
    westhampton: { id:"sunset", name:"WESTHAMPTON SUNSET" },
    madrid: { id:"night", name:"MADRID AFTER DARK" },
    newcanaan: { id:"snow", name:"SNOWY NEW CANAAN" },
    virginia: { id:"storm", name:"VIRGINIA THUNDERSTORM" }
  };

  const EMPTY_STATS = () => ({
    matches: 0,
    wins: 0,
    meleeHits: 0,
    specialUses: 0,
    ultimateUses: 0,
    damage: 0,
    kos: 0,
    healthyWins: 0,
    fightersPlayed: [],
    fightersWon: [],
    mapsPlayed: []
  });

  const loadJSON = (key, fallback) => {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value && typeof value === "object" ? value : fallback;
    } catch (_) {
      return fallback;
    }
  };

  const saveJSON = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_) {}
  };

  const normalizeProfile = raw => ({
    xp: Math.max(0, Number(raw?.xp) || 0),
    equippedSkin: typeof raw?.equippedSkin === "string" ? raw.equippedSkin : "default",
    enabledMapVariants: {
      virginia: Boolean(raw?.enabledMapVariants?.virginia),
      westhampton: Boolean(raw?.enabledMapVariants?.westhampton),
      newcanaan: Boolean(raw?.enabledMapVariants?.newcanaan),
      madrid: Boolean(raw?.enabledMapVariants?.madrid)
    },
    highestLevelSeen: Math.max(1, Number(raw?.highestLevelSeen) || 1)
  });

  let profile = normalizeProfile(loadJSON(STORAGE.profile, {}));
  let dailyState = null;
  let weeklyState = null;
  let activeMatch = null;
  let hubOpen = false;
  let currentTab = "challenges";
  let saveTimer = 0;
  let lastPeriodCheck = 0;

  function localDayKey(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function mondayKey(date = new Date()) {
    const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const weekday = copy.getDay();
    const delta = weekday === 0 ? -6 : 1 - weekday;
    copy.setDate(copy.getDate() + delta);
    return localDayKey(copy);
  }

  function hashString(value) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < value.length; i++) {
      h ^= value.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function seededRandom(seed) {
    let state = seed >>> 0;
    return () => {
      state += 0x6D2B79F5;
      let t = state;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function chooseChallenges(pool, seedText, count, previousIds = []) {
    const rand = seededRandom(hashString(seedText));
    const shuffled = pool
      .map(item => ({ item, roll: rand() }))
      .sort((a, b) => a.roll - b.roll)
      .map(entry => entry.item);

    const previous = new Set(previousIds);
    const chosen = [];
    const metrics = new Set();

    for (const challenge of shuffled) {
      if (chosen.length >= count) break;
      if (previous.has(challenge.id) || metrics.has(challenge.metric)) continue;
      chosen.push(challenge);
      metrics.add(challenge.metric);
    }

    for (const challenge of shuffled) {
      if (chosen.length >= count) break;
      if (chosen.includes(challenge) || metrics.has(challenge.metric)) continue;
      chosen.push(challenge);
      metrics.add(challenge.metric);
    }

    return chosen.map(challenge => challenge.id);
  }

  function challengeById(id) {
    return DAILY_POOL.find(c => c.id === id) ||
      WEEKLY_POOL.find(c => c.id === id) ||
      null;
  }

  function normalizePeriodState(raw, key, pool, count, seedPrefix) {
    if (raw?.key === key && Array.isArray(raw.ids) && raw.ids.length === count) {
      const validIds = raw.ids.filter(id => challengeById(id)).slice(0, count);
      if (validIds.length === count) {
        return {
          key,
          ids: validIds,
          stats: { ...EMPTY_STATS(), ...(raw.stats || {}) },
          claimed: raw.claimed && typeof raw.claimed === "object" ? raw.claimed : {}
        };
      }
    }

    const previousIds = Array.isArray(raw?.ids) ? raw.ids : [];
    return {
      key,
      ids: chooseChallenges(pool, `${seedPrefix}:${key}`, count, previousIds),
      stats: EMPTY_STATS(),
      claimed: {}
    };
  }

  function ensurePeriods(forceRender = false) {
    const now = new Date();
    const dKey = localDayKey(now);
    const wKey = mondayKey(now);

    const oldDailyKey = dailyState?.key;
    const oldWeeklyKey = weeklyState?.key;

    if (!dailyState || dailyState.key !== dKey) {
      const stored = loadJSON(STORAGE.daily, {});
      dailyState = normalizePeriodState(stored, dKey, DAILY_POOL, DAILY_COUNT, "daily");
      saveJSON(STORAGE.daily, dailyState);
    }

    if (!weeklyState || weeklyState.key !== wKey) {
      const stored = loadJSON(STORAGE.weekly, {});
      weeklyState = normalizePeriodState(stored, wKey, WEEKLY_POOL, WEEKLY_COUNT, "weekly");
      saveJSON(STORAGE.weekly, weeklyState);
    }

    if (
      forceRender ||
      (oldDailyKey && oldDailyKey !== dailyState.key) ||
      (oldWeeklyKey && oldWeeklyKey !== weeklyState.key)
    ) {
      renderHub();
      updateTitleButton();
    }
  }

  function levelForXp(xp) {
    let level = 1;
    for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
      if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
      else break;
    }
    return level;
  }

  function rewardUnlockLevel(type, id, map = null) {
    const reward = REWARDS.find(r =>
      r.type === type &&
      r.id === id &&
      (type !== "map" || r.map === map)
    );
    return reward?.level || Infinity;
  }

  function skinUnlocked(id) {
    if (id === "default") return true;
    return levelForXp(profile.xp) >= rewardUnlockLevel("skin", id);
  }

  function mapVariantUnlocked(map, id) {
    return levelForXp(profile.xp) >= rewardUnlockLevel("map", id, map);
  }

  function syncRewardState({ announce = false, previousLevel = null } = {}) {
    const level = levelForXp(profile.xp);

    if (!skinUnlocked(profile.equippedSkin)) {
      profile.equippedSkin = "default";
    }

    const newlyUnlocked = [];
    const baseLevel = previousLevel === null ? profile.highestLevelSeen : previousLevel;

    if (level > baseLevel) {
      REWARDS.forEach(reward => {
        if (reward.level > baseLevel && reward.level <= level) {
          newlyUnlocked.push(reward);
          if (reward.type === "map" && !profile.enabledMapVariants[reward.map]) {
            profile.enabledMapVariants[reward.map] = true;
          }
        }
      });
    }

    profile.highestLevelSeen = Math.max(profile.highestLevelSeen, level);
    saveJSON(STORAGE.profile, profile);
    applySkinTheme();
    applyMapVariant();

    if (announce && newlyUnlocked.length) {
      const names = newlyUnlocked.map(r => r.name).join(" + ");
      showToast(`UNLOCKED: ${names}`, "unlock");
    }

    return newlyUnlocked;
  }

  function metricValue(challenge, stats) {
    const value = stats[challenge.metric];
    if (Array.isArray(value)) return value.length;
    return Math.max(0, Number(value) || 0);
  }

  function challengeComplete(challenge, state) {
    return metricValue(challenge, state.stats) >= challenge.target;
  }

  function readyCount() {
    if (!dailyState || !weeklyState) return 0;
    let ready = 0;

    [dailyState, weeklyState].forEach(state => {
      state.ids.forEach(id => {
        const challenge = challengeById(id);
        if (challenge && challengeComplete(challenge, state) && !state.claimed[id]) {
          ready++;
        }
      });
    });

    return ready;
  }

  function addUnique(array, value) {
    if (value === null || value === undefined || value === "") return;
    if (!array.includes(value)) array.push(value);
  }

  function updatePeriodMetric(state, metric, amountOrValue) {
    if (Array.isArray(state.stats[metric])) {
      addUnique(state.stats[metric], amountOrValue);
    } else {
      state.stats[metric] =
        Math.max(0, Number(state.stats[metric]) || 0) +
        Math.max(0, Number(amountOrValue) || 0);
    }
  }

  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveJSON(STORAGE.daily, dailyState);
      saveJSON(STORAGE.weekly, weeklyState);
      saveJSON(STORAGE.profile, profile);
    }, 60);
  }

  function record(metric, amountOrValue) {
    ensurePeriods();
    updatePeriodMetric(dailyState, metric, amountOrValue);
    updatePeriodMetric(weeklyState, metric, amountOrValue);
    scheduleSave();
    updateTitleButton();
    if (hubOpen) renderChallengeLists();
  }

  function isOnline() {
    return document.body.classList.contains("bb-online-active");
  }

  function isOfflineFightActive() {
    return !isOnline() &&
      typeof fightScreen !== "undefined" &&
      fightScreen &&
      fightScreen.classList.contains("active");
  }

  function trackedAttacker(attacker) {
    if (!isOfflineFightActive() || !attacker) return false;

    if (typeof gameMode !== "undefined" && gameMode === "2P" && !challengeMode) {
      return attacker === P1 || attacker === P2;
    }

    return attacker === P1;
  }

  /* =====================================================
     MATCH + COMBAT TRACKING
  ===================================================== */

  const previousBeginMatchChallengesV1 = beginMatch;
  beginMatch = function() {
    const result = previousBeginMatchChallengesV1.apply(this, arguments);

    if (!isOnline()) {
      activeMatch = {
        id: typeof matchId !== "undefined" ? matchId : Date.now(),
        counted: false,
        map: typeof selectedMap !== "undefined" ? selectedMap : null,
        p1Character: typeof P1 !== "undefined" ? P1.character : player1Character,
        p2Character: typeof P2 !== "undefined" ? P2.character : player2Character
      };

      applyMapVariant();
      setTimeout(applyMapVariant, 0);
      setTimeout(applyMapVariant, 120);
    }

    applySkinTheme();
    return result;
  };

  const previousDealDamageChallengesV1 = dealDamage;
  dealDamage = function(attacker, target, amount, options = {}) {
    const shouldTrack = trackedAttacker(attacker);
    const beforeHealth = target ? Number(target.health) || 0 : 0;
    const type = options?.type || "normal";

    const result = previousDealDamageChallengesV1.apply(this, arguments);

    if (shouldTrack && target) {
      const afterHealth = Number(target.health) || 0;
      const actualDamage = Math.max(0, beforeHealth - afterHealth);

      if (actualDamage > 0) {
        record("damage", actualDamage);
        if (type === "normal") record("meleeHits", 1);
        if (beforeHealth > 0 && afterHealth <= 0) record("kos", 1);
      }
    }

    return result;
  };

  const previousSpecialAttackChallengesV1 = specialAttack;
  specialAttack = function(attacker, target) {
    const shouldTrack = trackedAttacker(attacker);
    const wasCoolingDown = Boolean(attacker?.specialCooldown);
    const result = previousSpecialAttackChallengesV1.apply(this, arguments);

    if (shouldTrack && !wasCoolingDown && Boolean(attacker?.specialCooldown)) {
      record("specialUses", 1);
    }

    return result;
  };

  const previousUltimateAttackChallengesV1 = ultimateAttack;
  ultimateAttack = function(attacker, target) {
    const shouldTrack = trackedAttacker(attacker);
    const beforeUltimate = Number(attacker?.ultimate) || 0;
    const result = previousUltimateAttackChallengesV1.apply(this, arguments);
    const afterUltimate = Number(attacker?.ultimate) || 0;

    if (shouldTrack && beforeUltimate >= 99 && afterUltimate < beforeUltimate) {
      record("ultimateUses", 1);
    }

    return result;
  };

  function finishTrackedMatch() {
    if (!activeMatch || activeMatch.counted || isOnline()) return;
    activeMatch.counted = true;

    record("matches", 1);

    const map = activeMatch.map ||
      (typeof selectedMap !== "undefined" ? selectedMap : null);
    if (map) record("mapsPlayed", map);

    const p1WinsNow = Number(player1Wins) || 0;
    const p2WinsNow = Number(player2Wins) || 0;
    const winner = p1WinsNow >= p2WinsNow ? P1 : P2;

    const humanWin =
      (gameMode === "2P" && !challengeMode) ||
      winner === P1;

    const playedCharacters = [];
    if (gameMode === "2P" && !challengeMode) {
      if (P1?.character) playedCharacters.push(P1.character);
      if (P2?.character) playedCharacters.push(P2.character);
    } else if (P1?.character) {
      playedCharacters.push(P1.character);
    }

    playedCharacters.forEach(character => record("fightersPlayed", character));

    if (humanWin) {
      record("wins", 1);
      if (winner?.character) record("fightersWon", winner.character);

      const health = Number(winner?.health) || 0;
      const maxHealth = Math.max(1, Number(winner?.maxHealth) || 100);
      if (health / maxHealth >= 0.5) record("healthyWins", 1);
    }
  }

  setInterval(() => {
    if (!activeMatch || activeMatch.counted || isOnline()) return;
    if (typeof gameOver !== "undefined" && gameOver === true) {
      finishTrackedMatch();
    }
  }, 180);

  /* =====================================================
     REWARD COSMETICS + HUB STYLES
  ===================================================== */

  const style = document.createElement("style");
  style.id = "bb-family-challenges-style-v1";
  style.textContent = `
    .bb-challenges-title-button{position:absolute;right:clamp(14px,2.4vw,34px);top:clamp(14px,2.2vh,28px);z-index:90;min-width:180px;padding:10px 15px 9px;border:3px solid #111;border-left:7px solid #ffd52a;border-right:7px solid #ef352b;border-radius:7px;background:linear-gradient(180deg,#162737,#0a1118);color:#fff;box-shadow:0 6px 0 rgba(0,0,0,.3);font:1000 15px Arial,sans-serif;letter-spacing:1.4px;cursor:pointer}.bb-challenges-title-button small{display:block;margin-top:3px;color:#b9c7d2;font-size:8px;letter-spacing:1.6px}.bb-challenges-title-button.bb-ready{border-color:#ffd52a;box-shadow:0 0 18px rgba(255,213,42,.35),0 6px 0 rgba(0,0,0,.3)}
    .bb-challenge-hub{position:fixed;inset:0;z-index:6000;display:none;align-items:stretch;justify-content:center;padding:clamp(10px,2vw,24px);background:radial-gradient(circle at 18% 0%,rgba(255,213,42,.15),transparent 30%),radial-gradient(circle at 85% 10%,rgba(239,53,43,.14),transparent 28%),linear-gradient(180deg,#15324a 0%,#08121b 58%,#05090d 100%);overflow:auto;color:#fff}.bb-challenge-hub.open{display:flex}.bb-challenge-shell{width:min(1240px,100%);min-height:min(760px,calc(100vh - 30px));display:flex;flex-direction:column;gap:12px}.bb-challenge-header{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:14px;align-items:center;padding:14px 17px;border:4px solid #111;border-top:7px solid #ffd52a;background:linear-gradient(135deg,#172b3d,#0b141e);box-shadow:0 7px 0 rgba(0,0,0,.28)}.bb-challenge-title{margin:0;font-family:Impact,"Arial Black",sans-serif;font-size:clamp(31px,4vw,50px);line-height:.95;letter-spacing:1px;text-shadow:4px 4px #111}.bb-challenge-title span{color:#ffd52a}.bb-challenge-subtitle{margin-top:7px;color:#b8c5cf;font-size:11px;font-weight:900;letter-spacing:1.6px}.bb-challenge-header-right{min-width:min(400px,44vw);display:grid;grid-template-columns:1fr auto;gap:9px;align-items:center}.bb-level-box{padding:9px 11px;border:3px solid #344858;background:#081018}.bb-level-row{display:flex;justify-content:space-between;gap:12px;font-weight:1000;font-size:12px;letter-spacing:1px}.bb-level-row strong{color:#ffd52a}.bb-xp-track,.bb-card-progress{position:relative;overflow:hidden;height:9px;margin-top:7px;border:2px solid #111;background:#202a32}.bb-xp-fill,.bb-card-progress-fill{height:100%;width:0;background:linear-gradient(90deg,#ffd52a,#ff8d2f);transition:width 180ms ease}.bb-hub-close,.bb-tab-button,.bb-claim-button,.bb-claim-all,.bb-equip-button{border:3px solid #111;border-radius:5px;font-weight:1000;cursor:pointer}.bb-hub-close{width:48px;height:44px;background:#ef352b;color:#fff;font-size:22px;box-shadow:0 4px 0 #111}.bb-challenge-tabs{display:flex;gap:8px}.bb-tab-button{min-width:170px;padding:9px 15px;background:#172431;color:#aebbc6;font-size:12px;letter-spacing:1.5px}.bb-tab-button.active{color:#111;background:#ffd52a}.bb-challenge-panel{display:none;flex:1 1 auto;min-height:0}.bb-challenge-panel.active{display:block}
    .bb-challenge-columns{display:grid;grid-template-columns:1fr 1fr;gap:13px}.bb-challenge-section{min-width:0;padding:13px;border:4px solid #111;background:rgba(9,17,25,.9);box-shadow:0 6px 0 rgba(0,0,0,.26)}.bb-section-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-bottom:10px;padding-bottom:8px;border-bottom:2px solid #344452}.bb-section-heading h3{margin:0;font:1000 21px Impact,"Arial Black",sans-serif;letter-spacing:1.2px}.bb-section-heading small{color:#9fb0bd;font-size:9px;font-weight:900;letter-spacing:1px}.bb-challenge-card{position:relative;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:center;min-height:108px;margin-top:9px;padding:12px 12px 11px;border:3px solid #354754;border-left:6px solid #4f6574;background:linear-gradient(135deg,#142432,#0b141c)}.bb-challenge-card.complete{border-left-color:#ffd52a;box-shadow:inset 0 0 18px rgba(255,213,42,.05)}.bb-challenge-card.claimed{opacity:.68;border-left-color:#55b979}.bb-card-title{font-size:14px;font-weight:1000;letter-spacing:1px}.bb-card-text{margin-top:4px;color:#b9c5cf;font-size:11px;font-weight:700}.bb-card-progress-row{display:flex;justify-content:space-between;gap:8px;margin-top:7px;color:#d8e1e7;font-size:9px;font-weight:900}.bb-card-xp{color:#ffd52a}.bb-claim-button{width:86px;padding:9px 5px;background:#263641;color:#8fa0ac;font-size:10px}.bb-claim-button.ready{background:#ffd52a;color:#111;box-shadow:0 4px 0 #111}.bb-claim-button.claimed{background:#256744;color:#dff8e8;cursor:default}.bb-claim-all-row{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:12px;padding:10px 12px;border:3px solid #111;background:#0c151e}.bb-offline-note{color:#aebcc7;font-size:10px;font-weight:900;letter-spacing:1px}.bb-offline-note strong{color:#ffd52a}.bb-claim-all{padding:9px 17px;background:#ffd52a;color:#111;font-size:11px}.bb-claim-all:disabled{opacity:.42;cursor:default}
    .bb-rewards-layout{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(310px,.75fr);gap:13px}.bb-reward-track,.bb-locker{padding:13px;border:4px solid #111;background:rgba(9,17,25,.92);box-shadow:0 6px 0 rgba(0,0,0,.26)}.bb-reward-track-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}.bb-reward-card{position:relative;min-height:118px;padding:11px;border:3px solid #344754;background:linear-gradient(145deg,#162a39,#0a131b)}.bb-reward-card.unlocked{border-color:#c7a729;box-shadow:inset 0 0 18px rgba(255,213,42,.06)}.bb-reward-level{color:#ffd52a;font-size:9px;font-weight:1000;letter-spacing:1.7px}.bb-reward-name{margin-top:6px;font-size:13px;font-weight:1000}.bb-reward-detail{margin-top:5px;color:#aebcc7;font-size:9px;line-height:1.35;font-weight:700}.bb-reward-status{position:absolute;right:8px;top:8px;padding:3px 6px;border:2px solid #111;background:#232d35;color:#8797a3;font-size:7px;font-weight:1000}.bb-reward-card.unlocked .bb-reward-status{background:#286b45;color:#e6fff0}.bb-locker-group+.bb-locker-group{margin-top:15px;padding-top:13px;border-top:2px solid #344452}.bb-locker-title{margin-bottom:8px;color:#ffd52a;font-size:10px;font-weight:1000;letter-spacing:1.8px}.bb-locker-item{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:9px;align-items:center;margin-top:7px;padding:8px 9px;border:2px solid #31404c;background:#0d1821}.bb-locker-item strong{display:block;font-size:10px;letter-spacing:.5px}.bb-locker-item small{display:block;margin-top:2px;color:#8495a1;font-size:8px}.bb-equip-button{min-width:74px;padding:7px 8px;background:#253541;color:#d5dfe6;font-size:8px}.bb-equip-button.using{background:#ffd52a;color:#111}.bb-equip-button.locked{opacity:.38;cursor:default}
    .bb-challenge-toast{position:fixed;left:50%;top:22px;z-index:8000;transform:translate(-50%,-18px);opacity:0;min-width:260px;max-width:min(680px,90vw);padding:12px 18px;border:4px solid #111;border-left:8px solid #ffd52a;background:#101b25;color:#fff;box-shadow:0 8px 0 rgba(0,0,0,.3);font-weight:1000;text-align:center;letter-spacing:.8px;transition:opacity 160ms ease,transform 160ms ease;pointer-events:none}.bb-challenge-toast.show{opacity:1;transform:translate(-50%,0)}.bb-challenge-toast.unlock{border-left-color:#ffd52a;border-right:8px solid #ef352b}
    body.bb-skin-arcade .brendan-shirt{background:#7049d8!important}body.bb-skin-arcade .grandaddy-shirt{background:#149a93!important}body.bb-skin-arcade .connor-shirt{background:#e06d2f!important}body.bb-skin-arcade .erin-shirt{background:#397ed6!important}body.bb-skin-arcade .shannan-shirt{background:#d84c8e!important}body.bb-skin-arcade .liam-shirt{background:#d94242!important}body.bb-skin-arcade .grandmommy-shirt{background:#925bc4!important}body.bb-skin-arcade .sean-shirt{background:#24a77f!important}body.bb-skin-arcade .kelly-shirt{background:#28548f!important}body.bb-skin-arcade .leah-shirt{background:#8f3c72!important}body.bb-skin-arcade .alice-shirt{background:#a54bd1!important}body.bb-skin-arcade .leo-shirt{background:#2b9ca0!important}body.bb-skin-arcade .barrett-model .toddler-shirt{background:#e06b2d!important}body.bb-skin-arcade .martin-model{filter:hue-rotate(18deg) saturate(1.18)}
    body.bb-skin-midnight :is(.brendan-shirt,.grandaddy-shirt,.connor-shirt,.erin-shirt,.shannan-shirt,.liam-shirt,.grandmommy-shirt,.sean-shirt,.kelly-shirt,.leah-shirt,.alice-shirt,.leo-shirt,.barrett-model .toddler-shirt){background:linear-gradient(#18314f,#0b1727)!important}body.bb-skin-midnight :is(.white-shoe,.dark-shoe){background:#55b8ff!important;border-color:#0a1622!important}body.bb-skin-midnight .martin-model{filter:brightness(.78) saturate(.85) drop-shadow(0 0 5px #4daeff)}
    body.bb-skin-rival :is(.brendan-shirt,.grandaddy-shirt,.connor-shirt,.erin-shirt,.shannan-shirt,.liam-shirt,.grandmommy-shirt,.sean-shirt,.kelly-shirt,.leah-shirt,.alice-shirt,.leo-shirt,.barrett-model .toddler-shirt){background:linear-gradient(135deg,#ec4040 0 58%,#f2f2f2 59% 72%,#181818 73%)!important}body.bb-skin-rival :is(.khaki,.black-pants,.gray-pants,.alice-pants,.leo-pants){background:#222831!important}body.bb-skin-rival .martin-model{filter:saturate(.65) contrast(1.15) drop-shadow(0 0 4px #e84a4a)}
    body.bb-skin-retro .brendan-shirt,body.bb-skin-retro .erin-shirt,body.bb-skin-retro .grandmommy-shirt,body.bb-skin-retro .leah-shirt,body.bb-skin-retro .alice-shirt{background:linear-gradient(135deg,#ff55b7,#7b52ff)!important}body.bb-skin-retro .grandaddy-shirt,body.bb-skin-retro .connor-shirt,body.bb-skin-retro .shannan-shirt,body.bb-skin-retro .liam-shirt,body.bb-skin-retro .sean-shirt,body.bb-skin-retro .kelly-shirt,body.bb-skin-retro .leo-shirt,body.bb-skin-retro .barrett-model .toddler-shirt{background:linear-gradient(135deg,#24d9d0,#f4df39)!important}body.bb-skin-retro .martin-model{filter:hue-rotate(-28deg) saturate(1.45) contrast(1.05)}
    body.bb-skin-champion :is(.brendan-shirt,.grandaddy-shirt,.connor-shirt,.erin-shirt,.shannan-shirt,.liam-shirt,.grandmommy-shirt,.sean-shirt,.kelly-shirt,.leah-shirt,.alice-shirt,.leo-shirt,.barrett-model .toddler-shirt){background:linear-gradient(135deg,#171717 0 58%,#f3c933 59% 78%,#8f6c08 79%)!important;box-shadow:inset 0 0 0 2px rgba(255,220,70,.28)!important}body.bb-skin-champion :is(.pixel-person,.bb-toddler,.martin-model){filter:drop-shadow(0 0 5px rgba(255,210,55,.38))}body.bb-skin-champion .martin-model{filter:saturate(.65) contrast(1.18) drop-shadow(0 0 7px rgba(255,210,55,.62))}
    .bb-map-variant-layer{position:absolute;inset:0;z-index:3;pointer-events:none;overflow:hidden}.bb-map-variant-layer.sunset{background:linear-gradient(180deg,rgba(255,120,82,.32) 0 33%,rgba(255,202,95,.14) 52%,transparent 72%);mix-blend-mode:soft-light}.bb-map-variant-layer.sunset::after{content:"";position:absolute;right:10%;top:11%;width:78px;height:78px;border-radius:50%;background:#ffcb59;box-shadow:0 0 34px rgba(255,144,63,.7);opacity:.84}.bb-map-variant-layer.night{background:radial-gradient(circle at 12% 14%,#fff 0 1px,transparent 2px),radial-gradient(circle at 28% 9%,#fff 0 1px,transparent 2px),radial-gradient(circle at 45% 17%,#fff 0 1px,transparent 2px),radial-gradient(circle at 68% 8%,#fff 0 1px,transparent 2px),radial-gradient(circle at 85% 16%,#fff 0 1px,transparent 2px),linear-gradient(180deg,rgba(9,20,55,.62) 0 55%,rgba(14,24,46,.18) 78%,transparent 100%)}.bb-map-variant-layer.night::after{content:"";position:absolute;right:12%;top:8%;width:55px;height:55px;border-radius:50%;background:#f5f1c7;box-shadow:0 0 22px rgba(229,235,255,.55);opacity:.82}.bb-map-variant-layer.snow{background:radial-gradient(circle,#fff 0 2px,transparent 2.5px) 0 0/52px 52px,radial-gradient(circle,#eaf6ff 0 2px,transparent 2.5px) 19px 13px/66px 66px,linear-gradient(180deg,rgba(188,222,244,.25),rgba(234,247,255,.12));animation:bbChallengeSnow 4.5s linear infinite}@keyframes bbChallengeSnow{from{background-position:0 0,19px 13px,0 0}to{background-position:28px 80px,-14px 100px,0 0}}.bb-map-variant-layer.storm{background:linear-gradient(180deg,rgba(25,34,51,.48) 0 62%,rgba(18,24,35,.12) 82%,transparent 100%),repeating-linear-gradient(105deg,transparent 0 24px,rgba(185,215,235,.19) 25px 27px,transparent 28px 52px);animation:bbChallengeRain .55s linear infinite}.bb-map-variant-layer.storm::after{content:"";position:absolute;inset:0;background:rgba(255,255,255,0);animation:bbChallengeLightning 5.2s steps(1,end) infinite}@keyframes bbChallengeRain{from{background-position:0 0,0 -30px}to{background-position:0 0,-14px 46px}}@keyframes bbChallengeLightning{0%,76%,80%,100%{background:rgba(255,255,255,0)}77%{background:rgba(220,235,255,.22)}79%{background:rgba(220,235,255,.11)}}
    @media(max-width:900px){.bb-challenge-columns,.bb-rewards-layout{grid-template-columns:1fr}.bb-challenge-header{grid-template-columns:1fr}.bb-challenge-header-right{min-width:0;width:100%}.bb-reward-track-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.bb-challenges-title-button{top:auto;right:12px;bottom:12px;min-width:150px}}
  `;
  document.head.appendChild(style);

  function applySkinTheme() {
    const skinClasses = ["bb-skin-arcade","bb-skin-midnight","bb-skin-rival","bb-skin-retro","bb-skin-champion"];
    document.body.classList.remove(...skinClasses);
    const selected = profile.equippedSkin;
    if (selected !== "default" && skinUnlocked(selected)) {
      document.body.classList.add(`bb-skin-${selected}`);
    }
  }

  function activeMapVariant() {
    const map = typeof selectedMap !== "undefined" ? selectedMap : null;
    if (!map || !profile.enabledMapVariants[map]) return null;
    const variant = MAP_VARIANT_NAMES[map];
    if (!variant || !mapVariantUnlocked(map, variant.id)) return null;
    return variant.id;
  }

  function applyMapVariant() {
    if (typeof arena === "undefined" || !arena) return;
    arena.querySelectorAll(".bb-map-variant-layer").forEach(el => el.remove());
    const variant = activeMapVariant();
    if (!variant) return;

    const layer = document.createElement("div");
    layer.className = `bb-map-variant-layer ${variant}`;
    layer.dataset.bbMapVariant = variant;

    const effectsNode = document.getElementById("effects");
    if (effectsNode && effectsNode.parentElement === arena) {
      arena.insertBefore(layer, effectsNode);
    } else {
      arena.insertBefore(layer, arena.firstChild);
    }
  }

  /* =====================================================
     HUB UI
  ===================================================== */

  const titleButton = document.createElement("button");
  titleButton.type = "button";
  titleButton.className = "bb-challenges-title-button";

  const hub = document.createElement("section");
  hub.className = "bb-challenge-hub";
  hub.setAttribute("aria-hidden", "true");
  hub.innerHTML = `
    <div class="bb-challenge-shell">
      <div class="bb-challenge-header">
        <div>
          <h2 class="bb-challenge-title">FAMILY <span>CHALLENGES</span></h2>
          <div class="bb-challenge-subtitle">OFFLINE PLAY EARNS FAMILY XP • LEVEL UP TO UNLOCK SKINS + MAP VARIANTS</div>
        </div>
        <div class="bb-challenge-header-right">
          <div class="bb-level-box">
            <div class="bb-level-row"><span id="bbFamilyLevelLabel">FAMILY LEVEL 1</span><strong id="bbFamilyXpLabel">0 XP</strong></div>
            <div class="bb-xp-track"><div id="bbFamilyXpFill" class="bb-xp-fill"></div></div>
          </div>
          <button id="bbChallengeClose" class="bb-hub-close" type="button" aria-label="Close challenges">×</button>
        </div>
      </div>
      <div class="bb-challenge-tabs">
        <button class="bb-tab-button active" data-bb-tab="challenges" type="button">DAILY + WEEKLY</button>
        <button class="bb-tab-button" data-bb-tab="rewards" type="button">REWARDS + LOCKER</button>
      </div>
      <div id="bbChallengePanel" class="bb-challenge-panel active">
        <div class="bb-challenge-columns">
          <div class="bb-challenge-section"><div class="bb-section-heading"><h3>DAILY CHALLENGES</h3><small id="bbDailyReset">RESETS --:--</small></div><div id="bbDailyChallengeList"></div></div>
          <div class="bb-challenge-section"><div class="bb-section-heading"><h3>WEEKLY CHALLENGES</h3><small id="bbWeeklyReset">RESETS IN --</small></div><div id="bbWeeklyChallengeList"></div></div>
        </div>
        <div class="bb-claim-all-row"><div class="bb-offline-note"><strong>OFFLINE ONLY:</strong> 1P, local 2P, and Martin Challenge count. Private ONLINE matches do not.</div><button id="bbClaimAll" class="bb-claim-all" type="button">CLAIM ALL</button></div>
      </div>
      <div id="bbRewardsPanel" class="bb-challenge-panel">
        <div class="bb-rewards-layout">
          <div class="bb-reward-track"><div class="bb-section-heading"><h3>FAMILY LEVEL REWARDS</h3><small>UNLOCKED AUTOMATICALLY</small></div><div id="bbRewardTrackGrid" class="bb-reward-track-grid"></div></div>
          <div class="bb-locker"><div class="bb-section-heading"><h3>REWARD LOCKER</h3><small>EQUIP WHAT YOU EARN</small></div><div id="bbLockerContent"></div></div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(hub);

  const toast = document.createElement("div");
  toast.className = "bb-challenge-toast";
  document.body.appendChild(toast);

  const titleRoot = document.querySelector("#titleScreen .title-content") || document.getElementById("titleScreen");
  if (titleRoot) titleRoot.appendChild(titleButton);

  let toastTimer = 0;
  function showToast(message, type = "") {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.className = `bb-challenge-toast${type ? " " + type : ""}`;
    requestAnimationFrame(() => toast.classList.add("show"));
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function levelProgress() {
    const level = levelForXp(profile.xp);
    const currentThreshold = LEVEL_THRESHOLDS[level - 1];
    const nextThreshold = LEVEL_THRESHOLDS[level] ?? currentThreshold;
    const maxed = level >= LEVEL_THRESHOLDS.length;

    if (maxed) return { level, maxed:true, percent:100, label:`${profile.xp.toLocaleString()} XP • MAX LEVEL` };

    const into = profile.xp - currentThreshold;
    const span = Math.max(1, nextThreshold - currentThreshold);
    return { level, maxed:false, percent:Math.max(0, Math.min(100, into / span * 100)), label:`${profile.xp.toLocaleString()} / ${nextThreshold.toLocaleString()} XP` };
  }

  function updateLevelHeader() {
    const progress = levelProgress();
    const levelLabel = document.getElementById("bbFamilyLevelLabel");
    const xpLabel = document.getElementById("bbFamilyXpLabel");
    const fill = document.getElementById("bbFamilyXpFill");
    if (levelLabel) levelLabel.textContent = `FAMILY LEVEL ${progress.level}`;
    if (xpLabel) xpLabel.textContent = progress.label;
    if (fill) fill.style.width = `${progress.percent}%`;
  }

  function challengeCardHTML(challenge, state, scope) {
    const value = metricValue(challenge, state.stats);
    const clamped = Math.min(challenge.target, value);
    const percent = Math.min(100, value / challenge.target * 100);
    const claimed = Boolean(state.claimed[challenge.id]);
    const complete = value >= challenge.target;

    let buttonText = "IN PROGRESS";
    let buttonClass = "";
    let disabled = "disabled";
    if (claimed) { buttonText = "CLAIMED"; buttonClass = "claimed"; }
    else if (complete) { buttonText = "CLAIM"; buttonClass = "ready"; disabled = ""; }

    return `<div class="bb-challenge-card ${complete ? "complete" : ""} ${claimed ? "claimed" : ""}"><div><div class="bb-card-title">${challenge.title}</div><div class="bb-card-text">${challenge.text}</div><div class="bb-card-progress-row"><span>${Math.floor(clamped).toLocaleString()} / ${challenge.target.toLocaleString()}</span><span class="bb-card-xp">+${challenge.xp} FAMILY XP</span></div><div class="bb-card-progress"><div class="bb-card-progress-fill" style="width:${percent}%"></div></div></div><button class="bb-claim-button ${buttonClass}" type="button" data-bb-claim="${challenge.id}" data-bb-scope="${scope}" ${disabled}>${buttonText}</button></div>`;
  }

  function renderChallengeLists() {
    if (!dailyState || !weeklyState) return;
    const dailyList = document.getElementById("bbDailyChallengeList");
    const weeklyList = document.getElementById("bbWeeklyChallengeList");

    if (dailyList) dailyList.innerHTML = dailyState.ids.map(id => challengeById(id)).filter(Boolean).map(c => challengeCardHTML(c, dailyState, "daily")).join("");
    if (weeklyList) weeklyList.innerHTML = weeklyState.ids.map(id => challengeById(id)).filter(Boolean).map(c => challengeCardHTML(c, weeklyState, "weekly")).join("");

    const claimAll = document.getElementById("bbClaimAll");
    if (claimAll) {
      const ready = readyCount();
      claimAll.disabled = ready === 0;
      claimAll.textContent = ready ? `CLAIM ALL (${ready})` : "NOTHING TO CLAIM";
    }
  }

  function renderRewardTrack() {
    const grid = document.getElementById("bbRewardTrackGrid");
    if (!grid) return;
    const level = levelForXp(profile.xp);

    grid.innerHTML = REWARDS.map(reward => {
      const unlocked = level >= reward.level;
      const icon = reward.type === "skin" ? "SKIN PACK" : "MAP VARIANT";
      return `<div class="bb-reward-card ${unlocked ? "unlocked" : ""}"><div class="bb-reward-level">LEVEL ${reward.level} • ${icon}</div><div class="bb-reward-name">${reward.name}</div><div class="bb-reward-detail">${reward.detail}</div><div class="bb-reward-status">${unlocked ? "UNLOCKED" : "LOCKED"}</div></div>`;
    }).join("");
  }

  function renderLocker() {
    const root = document.getElementById("bbLockerContent");
    if (!root) return;

    const skinRows = Object.entries(SKIN_NAMES).map(([id, name]) => {
      const unlocked = skinUnlocked(id);
      const using = profile.equippedSkin === id;
      let label = "EQUIP";
      let cls = "";
      if (!unlocked) { label = `LV ${rewardUnlockLevel("skin", id)}`; cls = "locked"; }
      else if (using) { label = "USING"; cls = "using"; }
      return `<div class="bb-locker-item"><div><strong>${name}</strong><small>${id === "default" ? "Original fighter appearances." : "Alternate roster skin pack."}</small></div><button class="bb-equip-button ${cls}" type="button" data-bb-skin="${id}" ${unlocked ? "" : "disabled"}>${label}</button></div>`;
    }).join("");

    const mapRows = Object.entries(MAP_VARIANT_NAMES).map(([map, variant]) => {
      const unlocked = mapVariantUnlocked(map, variant.id);
      const enabled = Boolean(profile.enabledMapVariants[map]);
      let label = enabled ? "ON" : "OFF";
      let cls = enabled ? "using" : "";
      if (!unlocked) { label = `LV ${rewardUnlockLevel("map", variant.id, map)}`; cls = "locked"; }
      return `<div class="bb-locker-item"><div><strong>${variant.name}</strong><small>${unlocked ? "Automatically used when this map is selected." : "Complete challenges and level up to unlock."}</small></div><button class="bb-equip-button ${cls}" type="button" data-bb-map="${map}" ${unlocked ? "" : "disabled"}>${label}</button></div>`;
    }).join("");

    root.innerHTML = `<div class="bb-locker-group"><div class="bb-locker-title">SKIN PACK</div>${skinRows}</div><div class="bb-locker-group"><div class="bb-locker-title">MAP VARIANTS</div>${mapRows}</div>`;
  }

  function renderTimers() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
    const nextMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const weekday = nextMonday.getDay();
    const daysToMonday = weekday === 0 ? 1 : 8 - weekday;
    nextMonday.setDate(nextMonday.getDate() + daysToMonday);

    const formatRemaining = ms => {
      const totalMinutes = Math.max(0, Math.floor(ms / 60000));
      const days = Math.floor(totalMinutes / 1440);
      const hours = Math.floor((totalMinutes % 1440) / 60);
      const minutes = totalMinutes % 60;
      if (days > 0) return `${days}D ${hours}H`;
      return `${hours}H ${minutes}M`;
    };

    const daily = document.getElementById("bbDailyReset");
    const weekly = document.getElementById("bbWeeklyReset");
    if (daily) daily.textContent = `NEW CHALLENGES IN ${formatRemaining(tomorrow - now)}`;
    if (weekly) weekly.textContent = `NEW CHALLENGES IN ${formatRemaining(nextMonday - now)}`;
  }

  function renderHub() {
    updateLevelHeader();
    renderChallengeLists();
    renderRewardTrack();
    renderLocker();
    renderTimers();

    hub.querySelectorAll(".bb-tab-button").forEach(button => button.classList.toggle("active", button.dataset.bbTab === currentTab));
    document.getElementById("bbChallengePanel")?.classList.toggle("active", currentTab === "challenges");
    document.getElementById("bbRewardsPanel")?.classList.toggle("active", currentTab === "rewards");
  }

  function updateTitleButton() {
    const ready = readyCount();
    const level = levelForXp(profile.xp);
    titleButton.innerHTML = `CHALLENGES<small>${ready ? `${ready} REWARD${ready === 1 ? "" : "S"} READY` : "DAILY + WEEKLY"} • LV ${level}</small>`;
    titleButton.classList.toggle("bb-ready", ready > 0);
  }

  function openHub(tab = "challenges") {
    ensurePeriods();
    currentTab = tab;
    hubOpen = true;
    hub.classList.add("open");
    hub.setAttribute("aria-hidden", "false");
    renderHub();
  }

  function closeHub() {
    hubOpen = false;
    hub.classList.remove("open");
    hub.setAttribute("aria-hidden", "true");
  }

  function claimChallenge(scope, id) {
    ensurePeriods();
    const state = scope === "weekly" ? weeklyState : dailyState;
    const challenge = challengeById(id);
    if (!challenge || !state.ids.includes(id) || state.claimed[id] || !challengeComplete(challenge, state)) return 0;

    const beforeLevel = levelForXp(profile.xp);
    state.claimed[id] = true;
    profile.xp += challenge.xp;
    saveJSON(scope === "weekly" ? STORAGE.weekly : STORAGE.daily, state);
    saveJSON(STORAGE.profile, profile);

    const newRewards = syncRewardState({ announce:true, previousLevel:beforeLevel });
    if (!newRewards.length) showToast(`+${challenge.xp} FAMILY XP`);
    renderHub();
    updateTitleButton();
    return challenge.xp;
  }

  function claimAllReady() {
    ensurePeriods();
    const beforeLevel = levelForXp(profile.xp);
    let earned = 0;

    [["daily", dailyState],["weekly", weeklyState]].forEach(([scope, state]) => {
      state.ids.forEach(id => {
        const challenge = challengeById(id);
        if (challenge && !state.claimed[id] && challengeComplete(challenge, state)) {
          state.claimed[id] = true;
          profile.xp += challenge.xp;
          earned += challenge.xp;
        }
      });
    });

    if (!earned) return;
    saveJSON(STORAGE.daily, dailyState);
    saveJSON(STORAGE.weekly, weeklyState);
    saveJSON(STORAGE.profile, profile);

    const unlocked = syncRewardState({ announce:false, previousLevel:beforeLevel });
    if (unlocked.length) showToast(`+${earned} XP • UNLOCKED: ${unlocked.map(r => r.name).join(" + ")}`, "unlock");
    else showToast(`+${earned} FAMILY XP`);

    renderHub();
    updateTitleButton();
  }

  titleButton.addEventListener("click", () => openHub("challenges"));
  document.getElementById("bbChallengeClose")?.addEventListener("click", closeHub);
  document.getElementById("bbClaimAll")?.addEventListener("click", claimAllReady);

  hub.addEventListener("click", event => {
    const tab = event.target.closest("[data-bb-tab]");
    if (tab) { currentTab = tab.dataset.bbTab; renderHub(); return; }

    const claim = event.target.closest("[data-bb-claim]");
    if (claim && !claim.disabled) { claimChallenge(claim.dataset.bbScope, claim.dataset.bbClaim); return; }

    const skin = event.target.closest("[data-bb-skin]");
    if (skin && !skin.disabled) {
      const id = skin.dataset.bbSkin;
      if (!skinUnlocked(id)) return;
      profile.equippedSkin = id;
      saveJSON(STORAGE.profile, profile);
      applySkinTheme();
      renderLocker();
      showToast(`${SKIN_NAMES[id]} EQUIPPED`);
      return;
    }

    const mapToggle = event.target.closest("[data-bb-map]");
    if (mapToggle && !mapToggle.disabled) {
      const map = mapToggle.dataset.bbMap;
      const variant = MAP_VARIANT_NAMES[map];
      if (!variant || !mapVariantUnlocked(map, variant.id)) return;
      profile.enabledMapVariants[map] = !profile.enabledMapVariants[map];
      saveJSON(STORAGE.profile, profile);
      applyMapVariant();
      renderLocker();
      showToast(`${variant.name} ${profile.enabledMapVariants[map] ? "ON" : "OFF"}`);
    }
  });

  document.addEventListener("keydown", event => {
    if (hubOpen && event.key === "Escape") closeHub();
  });

  const screenObserver = new MutationObserver(() => {
    const titleActive = titleScreen?.classList.contains("active");
    titleButton.style.display = titleActive ? "" : "none";
  });

  if (typeof titleScreen !== "undefined" && titleScreen) {
    screenObserver.observe(titleScreen, { attributes:true, attributeFilter:["class"] });
  }

  setInterval(() => {
    const now = Date.now();
    if (now - lastPeriodCheck > 15000) {
      lastPeriodCheck = now;
      ensurePeriods();
      if (hubOpen) {
        renderTimers();
        updateLevelHeader();
      }
    }
  }, 15000);

  window.BBFamilyChallenges = {
    open: openHub,
    close: closeHub,
    getProfile: () => JSON.parse(JSON.stringify(profile)),
    getDaily: () => JSON.parse(JSON.stringify(dailyState)),
    getWeekly: () => JSON.parse(JSON.stringify(weeklyState))
  };

  ensurePeriods();
  syncRewardState();
  applySkinTheme();
  applyMapVariant();
  updateTitleButton();
  titleButton.style.display = titleScreen?.classList.contains("active") ? "" : "none";
})();
