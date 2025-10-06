// ============================================================================
// NEUROLOOP SERVICE WORKER
// ============================================================================
// PWA Service Worker with offline support and push notifications
// HIPAA Compliant: NO PHI stored in cache or service worker
// ============================================================================

const CACHE_NAME = 'neuroloop-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/placeholder.svg'
];

// ============================================================================
// INSTALL: Cache static assets
// ============================================================================
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// ============================================================================
// ACTIVATE: Clean up old caches
// ============================================================================
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log('Service Worker: Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// ============================================================================
// FETCH: Network-first strategy (always fresh data for HIPAA compliance)
// ============================================================================
// CRITICAL: We NEVER cache PHI. Always fetch from network.
// Only cache static assets for offline shell.
// ============================================================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip Supabase API calls (NEVER cache PHI!)
  if (url.hostname.includes('supabase.co')) {
    return;
  }
  
  // Skip external resources
  if (url.origin !== location.origin) {
    return;
  }
  
  // Network-first for everything else
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Clone response for cache
        const responseClone = response.clone();
        
        // Only cache successful responses for static assets
        if (response.status === 200 && STATIC_ASSETS.includes(url.pathname)) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        
        return response;
      })
      .catch(() => {
        // Fallback to cache only for static assets
        return caches.match(request);
      })
  );
});

// ============================================================================
// PUSH: Handle push notifications
// ============================================================================
// HIPAA COMPLIANT: Notifications contain NO PHI
// Only IDs and action URLs. Actual data fetched on click.
// ============================================================================
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  let data = { title: 'NeuroLoop', body: 'You have a new notification' };
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      console.error('Error parsing push data:', e);
    }
  }
  
  const options = {
    body: data.body,
    icon: '/placeholder.svg',
    badge: '/favicon.ico',
    vibrate: [200, 100, 200],
    tag: data.tag || 'neuroloop-notification',
    requireInteraction: data.priority === 'critical',
    data: {
      url: data.action_url || '/dashboard',
      reference_id: data.reference_id
    },
    actions: [
      { action: 'open', title: 'View', icon: '/placeholder.svg' },
      { action: 'close', title: 'Dismiss', icon: '/placeholder.svg' }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// ============================================================================
// NOTIFICATION CLICK: Handle notification interaction
// ============================================================================
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'close') {
    return;
  }
  
  const urlToOpen = event.notification.data?.url || '/dashboard';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Focus existing window if available
        for (const client of clientList) {
          if (client.url.includes(urlToOpen) && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Open new window
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// ============================================================================
// PUSH SUBSCRIPTION CHANGE: Handle subscription updates
// ============================================================================
self.addEventListener('pushsubscriptionchange', (event) => {
  console.log('Service Worker: Push subscription changed');
  
  event.waitUntil(
    self.registration.pushManager.subscribe(event.oldSubscription.options)
      .then((subscription) => {
        console.log('Service Worker: Subscription renewed');
        // TODO: Send new subscription to backend
        return fetch('/api/update-push-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subscription)
        });
      })
  );
});

// ============================================================================
// MESSAGE: Handle messages from client
// ============================================================================
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((names) => Promise.all(names.map((name) => caches.delete(name))))
    );
  }
});

console.log('Service Worker: Loaded and ready');
