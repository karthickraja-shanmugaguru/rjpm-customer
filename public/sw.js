// RJPM Service Worker - PWA & TWA Caching Engine
// Version: 1.0.0

const CACHE_NAME = 'rjpm-cache-v1'

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/favicon.ico',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-512.png',
  '/apple-touch-icon.png'
]

// 1. Install event: Pre-cache app shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS)
    }).then(() => self.skipWaiting())
  )
})

// 2. Activate event: Clean up previous caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key)
          }
        })
      )
    }).then(() => self.clients.claim())
  )
})

// 3. Fetch event: Strategic routing
self.addEventListener('fetch', (event) => {
  const req = event.request
  const url = new URL(req.url)

  // A. Only handle GET requests
  if (req.method !== 'GET') {
    return
  }

  // B. NEVER CACHE API requests, authentication, or external partner portal
  // Ensures fresh business listings, reviews, bookings, and user auth state
  if (
    url.pathname.startsWith('/api') ||
    url.hostname.includes('onrender.com') ||
    url.hostname.includes('partner.rjpm.in')
  ) {
    return
  }

  // C. HTML Navigations (Network-first with index.html offline fallback)
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => {
        return caches.match('/index.html')
      })
    )
    return
  }

  // D. Static Assets (CSS, JS, Fonts, Images) - Stale-while-revalidate
  if (
    url.origin === self.location.origin ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com')
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(req)
        const fetchPromise = fetch(req).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            cache.put(req, networkResponse.clone())
          }
          return networkResponse
        }).catch(() => null)

        return cachedResponse || fetchPromise
      })
    )
  }
})
