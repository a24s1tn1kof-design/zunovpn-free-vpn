// Service Worker Zuno VPN

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const action = event.action || 'open';

  event.waitUntil(
    clients.matchAll({ type:'window', includeUncontrolled:true }).then((list) => {
      // Если вкладка с сайтом открыта — фокусируем и шлём сообщение
      for (const client of list) {
        if (client.url.includes('zunovpn-free-vpn') || client.url.includes('github.io')) {
          client.postMessage({ action: action });
          return client.focus();
        }
      }
      // Иначе открываем заново
      if (clients.openWindow) {
        return clients.openWindow('./?action=' + action);
      }
    })
  );
});
