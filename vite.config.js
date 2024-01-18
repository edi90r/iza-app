import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            devOptions: {
                enabled: true,
                type: 'module',
            },
            registerType: 'autoUpdate',
            includeAssets: ['logo192.svg', 'logo512.svg'],
            manifest: {
                name: 'IZA-Internetowy Zdalny Asystent',
                short_name: 'IZA',
                icons: [
                    {
                        src: 'logo192.svg',
                        type: 'image/svg',
                        sizes: '192x192',
                    },
                    {
                        src: 'logo512.svg',
                        type: 'image/svg',
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
