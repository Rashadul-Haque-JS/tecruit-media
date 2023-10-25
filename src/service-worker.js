/* eslint-disable no-restricted-globals */

import { precacheAndRoute } from 'workbox-precaching';

// Use the Workbox library to cache assets
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', event => {
  // Force the waiting service worker to become the active service worker
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
  // Take control of all available clients
  event.waitUntil(clients.claim());

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
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        // If found in cache, return the response
        return response;
      }
      // Otherwise, fetch from the network
      return fetch(event.request);
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Communicate with the client-side (optional)
// This can be useful for refreshing the user's page as soon as a new service worker takes control
self.addEventListener('controllerchange', () => {
  window.location.reload();
});
