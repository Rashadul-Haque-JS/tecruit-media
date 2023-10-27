/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', event => {
  self.skipWaiting();
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
        cacheNames.forEach((cacheName) => {
          if (cacheName !== 'Tecriut') {
            console.log('Deleting old cache...');
            caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
