const CACHE_NAME = 'uv-sw-cache-v1';
const SERVICE_PATH = '/gova-search/uv/service/';
const BARE_URL = 'https://bare.benrogo.net';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll([
      // Archivos esenciales cacheados
      '/gova-search/uv/uv.bundle.js',
      '/gova-search/uv/uv.handler.js',
      '/gova-search/uv/uv.config.js',
      '/gova-search/uv/uv.sw.js'
    ]))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Función simple de proxy
async function proxyRequest(request) {
  const url = new URL(request.url);
  const encoded = url.pathname.replace(SERVICE_PATH, '');
  const decoded = self.__uv$config.decodeUrl(encoded);
  const targetUrl = decoded.startsWith('http') ? decoded : BARE_URL + decoded;

  const modified = new Request(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.method === 'GET' || request.method === 'HEAD' ? null : request.body,
    redirect: 'follow'
  });

  const response = await fetch(modified);
  const newHeaders = new Headers(response.headers);
  newHeaders.set('Access-Control-Allow-Origin', '*');

  const blob = await response.blob();
  return new Response(blob, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (url.pathname.startsWith(SERVICE_PATH)) {
    event.respondWith(proxyRequest(event.request));
  }
});
