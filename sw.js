/* Offline cache for Peptide Planner 2.5.2. Caches app files only; user data lives in IndexedDB. */
const CACHE = 'peptide-planner-2.5.2';
const ASSETS = ["./","index.html","app.js","styles.css","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png","icons/icon-512-maskable.png","icons/apple-touch-icon.png"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('peptide-planner-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request)));
});
