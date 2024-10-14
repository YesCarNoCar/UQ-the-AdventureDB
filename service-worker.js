const CACHE_NAME = 'offline-cache-v1';
const urlsToCache = [
    '/UQ-the-AdventureDB/',
    '/UQ-the-AdventureDB/index.html',
    '/UQ-the-AdventureDB/styles.css',
    '/UQ-the-AdventureDB/app.js',
    '/UQ-the-AdventureDB/about.html',
    '/UQ-the-AdventureDB/contact.html'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(
                    response => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        let responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    }
                );
            })
    );
});
