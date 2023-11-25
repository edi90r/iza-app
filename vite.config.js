import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['logo192.png', 'logo512.png'],
            manifest: {
                name: 'IZA-Internetowy Zdalny Asystent',
                short_name: 'IZA',
                icons: [
                    {
                        src: 'logo192.png',
                        type: 'image/png',
                        sizes: '192x192',
                    },
                    {
                        src: 'logo512.png',
                        type: 'image/png',
                        sizes: '512x512',
                    },
                ],
                start_url: '/pwa',
                scope: '/pwa',
                display: 'standalone',
                theme_color: '#000000',
                background_color: '#ffffff',
                form_factor: 'tablet',
            },
        }),
    ],
});
