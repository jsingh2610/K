/**
 * Kailāsa v3 — Daily Affirmation Selector
 * -----------------------------------------------------------------------------
 * Deterministic, date-seeded, tier-aware selection from affirmations.json (4000).
 *
 * Free tier (Bhakt):    1 random affirmation/day from user's primary goal pillar (400 options)
 * Paid tier (Sadhu +
 *   Mahayogi):          2 from primary goal pillar + 1 from secondary goal pillar
 *                       All 3 have distinct template_id → no repeated openings
 *
 * Same (clientId, date) → same picks. Refreshing the app shows the same content
 * all day. At local midnight, the seed rolls forward and users see new picks.
 *
 * Usage:
 *   import { getDailyAffirmations } from './affirmation-selector.js';
 *   const affData = await fetch('/affirmations.json').then(r => r.json());
 *   const { affirmations } = getDailyAffirmations({
 *     affirmationsData: affData,
 *     clientId: user.id ?? localStorage.getItem('kailasa_client_id'),
 *     primaryGoal: user.primary_goal,        // e.g. 'dhan_samriddhi'
 *     secondaryGoal: user.secondary_goal,    // optional
 *     tier: user.tier,                       // 'bhakt' | 'sadhu' | 'mahayogi'
 *   });
 */

// ─── Seeded PRNG (mulberry32) ────────────────────────────────────────────────
// Same seed always yields the same sequence. Fast, tiny, statistically fine
// for daily rotation. NOT cryptographic — do not use for security decisions.
function mulberry32(seed) {
  let s = seed >>> 0;
  return function next() {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── djb2 string → 32-bit int hash ───────────────────────────────────────────
function hashSeed(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h * 33) ^ str.charCodeAt(i)) | 0;
  }
  return h >>> 0;
}

// ─── Local-timezone YYYY-MM-DD ───────────────────────────────────────────────
// Uses LOCAL date so a user in IST sees new affirmations at IST midnight,
// not UTC midnight. Getters are already local-tz aware.
function ymd(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// ─── Fisher-Yates shuffle using the seeded RNG ───────────────────────────────
function seededShuffle(arr, rng) {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// ─── Pick N affirmations with distinct template_id values ────────────────────
// Prevents "I am fully aligned with… / I am fully aligned with… / I am fully…"
// showing up as 3 daily picks with the same opening template.
function pickDistinctTemplates(pool, count, rng, excludeTemplates = new Set()) {
  const shuffled = seededShuffle(pool, rng);
  const picks = [];
  const usedTemplates = new Set(excludeTemplates);
  for (const a of shuffled) {
    if (usedTemplates.has(a.template_id)) continue;
    picks.push(a);
    usedTemplates.add(a.template_id);
    if (picks.length === count) break;
  }
  return picks;
}

// ─── Main API ────────────────────────────────────────────────────────────────
/**
 * @param {object} opts
 * @param {object} opts.affirmationsData    Parsed affirmations.json
 * @param {string} opts.clientId            user_id if authed, else stable client UUID
 * @param {string} opts.primaryGoal         Pillar id (required — free tier also must set this)
 * @param {?string} opts.secondaryGoal      Optional; if null, paid tier falls back to primary
 * @param {string} opts.tier                'bhakt' | 'sadhu' | 'mahayogi'
 * @param {?Date} opts.date                 Override for testing; defaults to now
 * @returns {{ affirmations: object[], meta: object }}
 */
export function getDailyAffirmations({
  affirmationsData,
  clientId,
  primaryGoal,
  secondaryGoal = null,
  tier,
  date = new Date(),
}) {
  if (!affirmationsData?.pillars) {
    throw new Error('affirmationsData is missing or malformed');
  }
  if (!clientId) {
    throw new Error('clientId required (use user.id or a localStorage UUID)');
  }
  if (!primaryGoal) {
    throw new Error(
      'primaryGoal required — new users must complete goal selection before affirmations unlock'
    );
  }

  const dateStr = ymd(date);
  const seed = hashSeed(`${clientId}::${dateStr}`);
  const rng = mulberry32(seed);

  const primaryPillar = affirmationsData.pillars.find(p => p.id === primaryGoal);
  if (!primaryPillar) {
    throw new Error(`Unknown primaryGoal pillar id: ${primaryGoal}`);
  }

  const isPaid = tier === 'sadhu' || tier === 'mahayogi';

  // ─── Bhakt (free) ──────────────────────────────────────────────────────────
  // 1 random from user's primary goal pillar (400 options = 200 sacred + 200 elite).
  // Keeps free content relevant to the goal the user chose; voice mix comes free
  // because sacred and elite both live inside every pillar.
  if (!isPaid) {
    const pool = primaryPillar.affirmations;
    const idx = Math.floor(rng() * pool.length);
    return {
      affirmations: [pool[idx]],
      meta: {
        tier: 'bhakt',
        date: dateStr,
        source: 'random_from_primary',
        primary_pillar_id: primaryPillar.id,
      },
    };
  }

  // ─── Sadhu / Mahayogi (paid) ───────────────────────────────────────────────
  // 2 from primary + 1 from secondary. All 3 have distinct template_ids.
  const twoFromPrimary = pickDistinctTemplates(primaryPillar.affirmations, 2, rng);
  const usedTemplates = new Set(twoFromPrimary.map(a => a.template_id));

  const secondaryPillar = secondaryGoal
    ? affirmationsData.pillars.find(p => p.id === secondaryGoal)
    : null;

  // Fallback: if secondaryGoal missing or same as primary, pull 3rd from primary
  const thirdPool = (secondaryPillar && secondaryPillar.id !== primaryPillar.id)
    ? secondaryPillar.affirmations
    : primaryPillar.affirmations;

  const oneFromSecondary = pickDistinctTemplates(thirdPool, 1, rng, usedTemplates);

  return {
    affirmations: [...twoFromPrimary, ...oneFromSecondary],
    meta: {
      tier,
      date: dateStr,
      source: (secondaryPillar && secondaryPillar.id !== primaryPillar.id)
        ? 'primary_2_secondary_1'
        : 'primary_3_no_secondary',
      primary_pillar_id: primaryPillar.id,
      secondary_pillar_id: secondaryPillar?.id ?? null,
    },
  };
}

// ─── Client ID helper ────────────────────────────────────────────────────────
// For anonymous users, generate a stable UUID and stash in localStorage.
// Call this once on app startup; use the returned id as clientId when the
// user is not authenticated.
export function getOrCreateAnonymousClientId(storageKey = 'kailasa_client_id') {
  try {
    let id = localStorage.getItem(storageKey);
    if (!id) {
      id = (crypto?.randomUUID?.() ?? `anon-${Date.now()}-${Math.random().toString(36).slice(2)}`);
      localStorage.setItem(storageKey, id);
    }
    return id;
  } catch {
    // Private-mode / storage-blocked fallback: return an in-memory id.
    // Determinism will be per-session, not per-user, but the app still works.
    if (!globalThis.__kailasaEphemeralClientId) {
      globalThis.__kailasaEphemeralClientId = `ephemeral-${Date.now()}`;
    }
    return globalThis.__kailasaEphemeralClientId;
  }
}
