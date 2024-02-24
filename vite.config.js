import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
// added by bk
import fs from 'fs';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), eslint()],
    optimizeDeps: {
        include: ['date-fns', 'date-fns-tz'],
    }, // added by bk
    build: {
        outDir: 'dist', // Output directory for frontend build
    },
    server: {
        https: {
            key: fs.readFileSync(path.join(__dirname, '/server/ssl/localhost+2-key.pem')),
            cert: fs.readFileSync(path.join(__dirname, '/server/ssl/localhost+2.pem')),
        }, // added by bk
    },
});
