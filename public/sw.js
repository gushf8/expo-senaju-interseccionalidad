// Service Worker para PWA 100% Offline - SENAJU ML Lab 2026
const CACHE_NAME = 'senaju-pwa-v1';
const DYNAMIC_CACHE = 'senaju-dynamic-v1';

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
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching static assets');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[ServiceWorker] Non-critical precache error:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== DYNAMIC_CACHE) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // If requesting self or external assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached version, but also update dynamic cache in background if online
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(DYNAMIC_CACHE).then((cache) => {
                cache.put(event.request, networkResponse.clone());
              });
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      // Not in cache: fetch from network and store
      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        })
        .catch(() => {
          // If network fails and request is for page navigation, fallback to root
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
        });
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
      event.ports[0].postMessage({
        type: 'CACHE_ALL_COMPLETED',
        total: urlsToCache.length,
        cached: cachedCount
      });
    });
  }
});
