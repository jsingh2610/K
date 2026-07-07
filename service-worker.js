/*  Kailāsa · Service Worker v5
    - network-first for HTML (always fresh)
    - cache-first for static assets (fast offline)
    - auto-update: new SW activates immediately, old caches purged  */

const CACHE = 'kailasa-v6';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './affirmations.json',
  './icon-192.png',
  './icon-512.png'
];

/* ── Install: pre-cache shell ── */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* ── Activate: purge old caches, claim clients ── */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* ── Fetch: network-first for navigations, cache-first for assets ── */
self.addEventListener('fetch', e => {
  const req = e.request;

  // Skip non-GET, chrome-extension, etc.
  if (req.method !== 'GET' || !req.url.startsWith('http')) return;

  // HTML navigations → network-first (always get latest)
  if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
    e.respondWith(
      fetch(req)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(req, clone));
          return res;
        })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Everything else → cache-first (fast offline, fallback to network)
  e.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        // Only cache same-origin successful responses
        if (res.ok && new URL(req.url).origin === self.location.origin) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(req, clone));
        }
        return res;
      });
    })
  );
});
