/* Kailāsa Service Worker
   Strategy:
   - Network-first for HTML (users always get the latest version when online)
   - Cache-first for static assets (icons, manifest)
   - Automatic cleanup of old cache versions on activate
   - skipWaiting + clients.claim = new version takes over immediately
   BUMP CACHE_VERSION on every deploy that changes assets. */

constCACHE_VERSION = 'kailasa-v1.1.0';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/affirmations.json',
  '/affirmation-selector.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(CORE_ASSETS).catch(() => {
        /* Some assets may 404 in dev — don't block install */
      }))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  /* Skip cross-origin (temple livestream YouTube, etc.) */
  if (url.origin !== self.location.origin) return;

  /* Network-first for HTML navigation */
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(request, clone));
          return res;
        })
        .catch(() =>
          caches.match(request).then(cached => cached || caches.match('/index.html'))
        )
    );
    return;
  }

  /* Cache-first for icons, manifest, other static */
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(request, clone));
        }
        return res;
      });
    })
  );
});
