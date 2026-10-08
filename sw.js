// Service Worker для Zuno VPN

self.addEventListener('install', (event) => {
  console.log('SW: install');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('SW: activate');
  event.waitUntil(self.clients.claim());
});

// Обязательно для показа уведомлений
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('./');
      }
    })
  );
});
