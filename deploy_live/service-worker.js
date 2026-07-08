const CACHE_PREFIX = 'wandersync-';

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.indexOf(CACHE_PREFIX) === 0)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
      .then(() => self.registration.unregister())
  );
});
