
var CACHE_VERSION = 'dlh-v1';

var PRECACHE = [
    './', 'index.html', 'situations.html', 'skills.html', 'interactive.html', 'challenge.html', 'progress.html',
    'prosperity.html', 'about.html', 'glossary.html', 'people.html', 'planet.html', 'zimbabwe.html', 'resources.html',
    'safety.html', 'information.html', 'ai.html', 'pledge.html',
    'css/style.css', 'css/hub.css',
    'js/icons.js', 'js/main.js', 'js/labs.js', 'js/challenge.js', 'js/pledge.js', 'js/scenario.js', 'js/situations.js',
    'assets/dlh-mark-96.png', 'assets/dlh-512.png', 'assets/favicon.svg',
    'manifest.webmanifest'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_VERSION).then(function (cache) {
            // add one by one so a single missing file does not block installation
            return Promise.all(PRECACHE.map(function (url) {
                return cache.add(url).catch(function () { /* skip files that are not present */ });
            }));
        }).then(function () { return self.skipWaiting(); })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(keys.filter(function (k) { return k !== CACHE_VERSION; }).map(function (k) { return caches.delete(k); }));
        }).then(function () { return self.clients.claim(); })
    );
});

self.addEventListener('fetch', function (event) {
    var req = event.request;
    if (req.method !== 'GET') return;
    var url = new URL(req.url);
    if (url.origin !== self.location.origin) return;

    event.respondWith(
        caches.open(CACHE_VERSION).then(function (cache) {
            return cache.match(req, { ignoreSearch: true }).then(function (cached) {
                var network = fetch(req).then(function (res) {
                    if (res && res.ok) cache.put(req, res.clone());
                    return res;
                }).catch(function () { return cached || (req.mode === 'navigate' ? cache.match('index.html') : undefined); });
                return cached || network;
            });
        })
    );
});
