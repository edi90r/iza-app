if ('serviceWorker' in navigator)
    navigator.serviceWorker.register('/dev-sw.js?dev-sw', { scope: '/pwa/', type: 'classic' });
