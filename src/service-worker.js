import { precacheAndRoute } from 'workbox-precaching';

// Precache assets with Workbox
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', event => {
  // This will force the waiting service worker to become the active service worker
  self.skipWaiting();

  // Precaching urls during the install event
  event.waitUntil(
    caches.open('Tecriut').then(cache => 
      cache.addAll([
        '/',
        '/index.html',
        '/static/css/main.chunk.css',
        '/static/js/main.chunk.js',
      ])
    )
  );
});

self.addEventListener('activate', event => {
  // Clean up old cache versions
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== 'Tecriut') // Only remove caches not matching current cache
          .map(cacheName => caches.delete(cacheName)) // Delete them
      );
    })
  );
  // Note: clients.claim() is removed here, so the new service worker won't take control of the current pages.
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request); // Return from cache, otherwise fetch from network
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
