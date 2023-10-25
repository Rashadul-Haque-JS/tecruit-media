/* eslint-disable no-restricted-globals */

import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('Tecriut')
      .then(cache => cache.addAll([
        '/',
        '/index.html',
        '/static/css/main.chunk.css',
        '/static/js/main.chunk.js',
      ])
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Cache hit - return the response
        }
        // Handle the case when the request is not found in the cache
        return fetch(event.request);
      })
  );
});
