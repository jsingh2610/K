// Kailasa Service Worker · v10 (Self-healing + Push notifications)
const CACHE_NAME = 'kailasa-v10';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './privacy.html',
  './affirmations.json'
];

// Install — cache app shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate — purge ALL old caches, notify clients
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll().then(cls => {
        cls.forEach(c => c.postMessage({ type: 'SW_UPDATED', version: CACHE_NAME }));
      }))
  );
});

// Message handler — manual cache nuke for self-healing
self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
  if (e.data === 'NUKE_CACHE') {
    e.waitUntil(
      caches.keys()
        .then(keys => Promise.all(keys.map(k => caches.delete(k))))
        .then(() => self.clients.matchAll())
        .then(cls => cls.forEach(c => c.postMessage({ type: 'CACHE_NUKED' })))
    );
  }
});

// Fetch — network-first for HTML (4s timeout), stale-while-revalidate for assets
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (!req.url.startsWith(self.location.origin)) return;

  const isHTML = req.headers.get('accept') && req.headers.get('accept').includes('text/html');

  if (isHTML) {
    // HTML: network-first with 4s timeout, cache fallback, root fallback
    e.respondWith(
      Promise.race([
        fetch(req).then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(req, clone));
          }
          return res;
        }),
        new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 4000))
      ]).catch(() =>
        caches.match(req)
          .then(cached => {
            if (cached && cached.ok) return cached;
            return caches.match('./');
          })
          .then(fallback => fallback || new Response('Offline — please check your connection.', {
            status: 503, headers: { 'Content-Type': 'text/plain' }
          }))
      )
    );
    return;
  }

  // Assets: stale-while-revalidate — fast from cache, fresh in background
  e.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(req).then(cached => {
        const fetchPromise = fetch(req).then(res => {
          if (res.ok) cache.put(req, res.clone());
          return res;
        }).catch(() => null);

        return cached || fetchPromise || new Response('', { status: 404 });
      })
    )
  );
});

// Push notifications
self.addEventListener('push', e => {
  let title = 'Kailasa', body = '', data = {};
  try {
    const payload = e.data ? e.data.json() : {};
    title = (payload.notification && payload.notification.title) || title;
    body = (payload.notification && payload.notification.body) || '';
    data = payload.data || {};
  } catch (err) {
    body = e.data ? e.data.text() : '';
  }
  e.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: './icon-192.png',
      badge: './icon-192.png',
      vibrate: [100, 50, 100],
      data: data,
      actions: [{ action: 'open', title: 'Open Kailasa' }]
    })
  );
});

// Notification click — open app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cls => {
      for (const c of cls) {
        if (c.url.includes(self.location.origin) && 'focus' in c) return c.focus();
      }
      return self.clients.openWindow('./');
    })
  );
});
