/* global self, caches, fetch */
/* eslint-disable no-restricted-globals */

const CACHE = 'cache-f4abf7d';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./osudy_dobreho_vojaka_svejka_i_ii_001.html","./osudy_dobreho_vojaka_svejka_i_ii_002.html","./osudy_dobreho_vojaka_svejka_i_ii_005.html","./osudy_dobreho_vojaka_svejka_i_ii_006.html","./osudy_dobreho_vojaka_svejka_i_ii_007.html","./osudy_dobreho_vojaka_svejka_i_ii_008.html","./osudy_dobreho_vojaka_svejka_i_ii_009.html","./osudy_dobreho_vojaka_svejka_i_ii_010.html","./osudy_dobreho_vojaka_svejka_i_ii_011.html","./osudy_dobreho_vojaka_svejka_i_ii_012.html","./osudy_dobreho_vojaka_svejka_i_ii_013.html","./osudy_dobreho_vojaka_svejka_i_ii_014.html","./osudy_dobreho_vojaka_svejka_i_ii_015.html","./osudy_dobreho_vojaka_svejka_i_ii_016.html","./osudy_dobreho_vojaka_svejka_i_ii_018.html","./osudy_dobreho_vojaka_svejka_i_ii_019.html","./osudy_dobreho_vojaka_svejka_i_ii_017.html","./osudy_dobreho_vojaka_svejka_i_ii_020.html","./osudy_dobreho_vojaka_svejka_i_ii_021.html","./osudy_dobreho_vojaka_svejka_i_ii_022.html","./osudy_dobreho_vojaka_svejka_i_ii_023.html","./osudy_dobreho_vojaka_svejka_i_ii_024.html","./osudy_dobreho_vojaka_svejka_i_ii_025.html","./osudy_dobreho_vojaka_svejka_i_ii_026.html","./osudy_dobreho_vojaka_svejka_i_ii_027.html","./osudy_dobreho_vojaka_svejka_i_ii_028.html","./resources.html","./resources/image001_fmt.jpeg","./resources/image003_fmt.jpeg","./resources/image004_fmt.jpeg","./resources/index.xml","./resources/obalka_osudy_dobreho_v_fmt.jpeg","./resources/upoutavka_eknihy_fmt.jpeg","./scripts/bundle.js","./style/style.min.css"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
