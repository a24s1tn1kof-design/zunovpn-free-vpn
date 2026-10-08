self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

// ЭТА СТРОКА ОБЯЗАТЕЛЬНА для установки как PWA на Android Chrome
self.addEventListener('fetch', () => {});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const action = event.action || 'open';
  event.waitUntil(
    clients.matchAll({ type:'window', includeUncontrolled:true }).then((list) => {
      for (const client of list) {
        if (client.url.includes('github.io') || client.url.includes('zunovpn')) {
          if (action === 'disconnect') client.postMessage({ action:'disconnect' });
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow('./');
    })
  );
});
