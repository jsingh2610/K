// Kailasa Service Worker · v9 (Streak badges release)
const CACHE_NAME = 'kailasa-v9';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './privacy.html',
  './affirmations.json'
];

// Install — cache shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate — purge old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch — network-first for HTML, cache-first for everything else
self.addEventListener('fetch', e => {
  const req = e.request;

  // Skip non-GET and cross-origin
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) return;

  // HTML pages: network-first (always get fresh), fall back to cache
  if (req.headers.get('accept') && req.headers.get('accept').includes('text/html')) {
    e.respondWith(
      fetch(req)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, clone));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // All other assets: cache-first, network fallback
  e.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        // Cache successful responses for offline use
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, clone));
        }
        return res;
      });
    })
  );
});
