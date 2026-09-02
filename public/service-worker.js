self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  self.clients.claim();   // ← versione compatibile con ESLint
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
