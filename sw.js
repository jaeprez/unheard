/* UNHEARD — offline shell.
   Network-first for the page so a new deploy always wins; cache is only a fallback
   for when the network is gone. Album artwork and the catalogue are never cached. */
const CACHE = "unheard-shell-v2";
const ART   = "unheard-art-v1";

// a 1x1 transparent gif, so a missing sleeve renders as nothing rather than a broken image
const BLANK = () => new Response(
  Uint8Array.from(atob("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"), c => c.charCodeAt(0)),
  { headers: { "Content-Type": "image/gif", "Cache-Control": "no-store" } });
const SHELL = ["./", "./index.html", "./manifest.webmanifest",
               "./favicon.svg", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => {}).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== ART).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Album artwork: immutable URLs on Apple's CDN, so cache it permanently on the device.
  // Once a sleeve has been seen it never hits the network again — the index can re-render
  // freely and the wall still paints instantly offline.
  if (/(^|\.)mzstatic\.com$/.test(url.hostname)) {
    e.respondWith(
      caches.open(ART).then(c =>
        c.match(req).then(hit =>
          hit || fetch(req).then(res => {
            if (res && (res.ok || res.type === "opaque")) c.put(req, res.clone()).catch(() => {});
            return res;
          })
        )
      ).catch(() => BLANK())   // never reject: a miss while offline must fail quietly, not throw
    );
    return;
  }

  if (url.origin !== location.origin) return;     // the catalogue lookup itself stays live

  e.respondWith(
    fetch(req)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then(hit => hit || caches.match("./index.html"))
                         .then(hit => hit || BLANK()))
  );
});
