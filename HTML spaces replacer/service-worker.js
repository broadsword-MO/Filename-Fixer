/* eslint-disable */
const cacheName = 'filename_fixer-pwa';
const filesToCache = ['/', '/Space_replacer.html', '/style.css', '/main.js'];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => cache.addAll(filesToCache))
    );
    self.skipWaiting();
});

/* Serve cached content when offline */
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches
            .match(event.request)
            .then((response) => response || fetch(event.request))
    );
});
