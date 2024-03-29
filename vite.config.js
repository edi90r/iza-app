import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        define: {
            'process.env.API_KEY': JSON.stringify(env.API_KEY),
            'process.env.AUTH_DOMAIN': JSON.stringify(env.AUTH_DOMAIN),
            'process.env.PROJECT_ID': JSON.stringify(env.PROJECT_ID),
            'process.env.STORAGE_BUCKET': JSON.stringify(env.STORAGE_BUCKET),
            'process.env.MESSAGINNG_SENDER_ID': JSON.stringify(env.MESSAGINNG_SENDER_ID),
            'process.env.APP_ID': JSON.stringify(env.APP_ID),
        },
        plugins: [
            react(),
            svgr(),
            VitePWA({
                devOptions: {
                    enabled: true,
                    type: 'module',
                },
                registerType: 'autoUpdate',
                includeAssets: ['logo192.png', 'logo512.png'],
                manifest: {
                    name: 'IZA-Innowacyjny Zdalny Asystent',
                    short_name: 'IZA',
                    start_url: '/',
                    display: 'standalone',
                    background_color: '#ffffff',
                    lang: 'pl',
                    icons: [
                        {
                            src: 'logo192.png',
                            type: 'image/png',
                            sizes: '192x192',
                        },
                        {
                            src: 'logo196.png',
                            type: 'image/png',
                            sizes: '196x196',
                            purpose: 'maskable',
                        },
                        {
                            src: 'logo512.png',
                            type: 'image/png',
                            sizes: '512x512',
                        },
                    ],
                    theme_color: '#000000',
                    form_factor: 'tablet',

                },
            }),
        ],
    };
});
