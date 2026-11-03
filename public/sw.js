// Service Worker v3 para PWA 100% Offline - SENAJU ML Lab 2026
const CACHE_NAME = 'senaju-pwa-v3';
const DYNAMIC_CACHE = 'senaju-dynamic-v3';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon.svg',
  '/investigacion_senaju_2026.pdf'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW v3] Pre-caching static assets');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW v3] Non-critical precache error:', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== DYNAMIC_CACHE) {
            console.log('[SW v3] Purgando cache antigua:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 1. Navigation / HTML requests: NETWORK FIRST (with offline cache fallback)
  // This guarantees we always load the fresh HTML containing current asset hashes!
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(() => {
          // Fallback to cache ONLY when device is offline
          return caches.match(event.request).then((cached) => {
            return cached || caches.match('/') || caches.match('/index.html');
          });
        })
    );
    return;
  }

  // 2. Static Assets (JS, CSS, fonts, images): CACHE FIRST with network fallback
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(() => null);
    })
  );
});

// Communication with client app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_ALL_RESOURCES') {
    const urlsToCache = event.data.urls || STATIC_ASSETS;
    caches.open(DYNAMIC_CACHE).then(async (cache) => {
      let cachedCount = 0;
      for (const u of urlsToCache) {
        try {
          const res = await fetch(u);
          if (res && res.status === 200) {
            await cache.put(u, res);
            cachedCount++;
          }
        } catch (e) {
          console.warn('Failed to precache resource:', u, e);
        }
      }
      if (event.ports && event.ports[0]) {
        event.ports[0].postMessage({
          type: 'CACHE_ALL_COMPLETED',
          total: urlsToCache.length,
          cached: cachedCount
        });
      }
    });
  }
});
