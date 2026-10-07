const CACHE = "urticaria-v20";
const ASSETS = ["./", "./index.html", "./style.css?v=20", "./app.js?v=20", "./manifest.webmanifest", "./icon.svg"];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("urticaria-") && key !== CACHE).map(key => caches.delete(key)))).then(() => clients.claim())));
self.addEventListener("fetch", event => event.respondWith(fetch(event.request).then(response => {
  if (response.ok) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
  return response;
}).catch(() => caches.match(event.request))));
