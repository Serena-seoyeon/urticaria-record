const CACHE = "urticaria-v16";
const ASSETS = ["./", "./index.html", "./style.css", "./app.js", "./manifest.webmanifest", "./icon.svg"];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS))));
self.addEventListener("fetch", event => event.respondWith(fetch(event.request).then(response => {
  if (response.ok) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
  return response;
}).catch(() => caches.match(event.request))));
