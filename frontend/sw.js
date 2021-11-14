const cacheName = 'pwa-conf-v1';
const staticAssets = [
    '/assets/icons/booth.svg',
    '/assets/icons/converter.svg',
    '/assets/icons/desk.svg',
    '/assets/icons/dining_table.svg',
    '/assets/icons/dog.svg',
    '/assets/icons/floor.svg',
    '/assets/icons/fridge.svg',
    '/assets/icons/heater.svg',
    '/assets/icons/house.svg',
    '/assets/icons/power.svg',
    '/assets/icons/sofa.svg',
    '/assets/icons/tech.svg',
    '/assets/icons/wardrobe.svg',

    '/assets/icons/favicon.ico',
    '/index.html',
    '/node_modules/material-design-lite/material.min.css',
    '/node_modules/material-design-lite/material.min.js',
    '/index.js',
    '/assets/styles.css',
    '/pages/main.js',
    '/pages/house.js',
    '/pages/booth.js',
    '/pages/base.component.js',
    '/router.js',
    '/snackbar.js'
];

self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
});

self.addEventListener('fetch', async event => {
    const req = event.request;
    event.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(req);
    return cachedResponse || fetch(req);
}