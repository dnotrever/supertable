import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command }) => {
    const plugins = [react()];

    if (command === 'serve') {
        return {
            root: 'src/dev',
            // plugins: [react()],
            plugins,
            server: {
                host: '0.0.0.0',
                port: 5173,
                fs: {
                    allow: ['/app/src/dev'],
                },
                proxy: {
                    '/api/': {
                        target: 'http://localhost:5000',
                        changeOrigin: true,
                    },
                },
            },
        };
    }

    return {
        plugins,
        build: {
            emptyOutDir: false,
            lib: {
                entry: path.resolve('src/index.ts'),
                formats: ['es'],
                fileName: () => 'index.js',
                cssFileName: 'super-table',
            },
            rollupOptions: {
                external: [
                    'react',
                    'react-dom',
                    'react/jsx-runtime',
                ],
            },
        },
        // esbuild: {
        //     jsx: 'automatic',
        //     jsxDev: false,
        // },
    };
});
