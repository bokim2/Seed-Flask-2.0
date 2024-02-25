// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import eslint from 'vite-plugin-eslint'
// // added by bk
// import fs from 'fs';
// import path from 'path';
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), eslint()],
//   optimizeDeps: {
//     include: ['date-fns', 'date-fns-tz'],
//   }, // added by bk
//   server: {
//     https: {
//       key: fs.readFileSync(path.join(__dirname, '/server/ssl/localhost+2-key.pem')),
//       cert: fs.readFileSync(path.join(__dirname, '/server/ssl/localhost+2.pem'))
//     }  // added by bk
//   },
// })
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
export default defineConfig({
    plugins: [
        react(), // Enable the React plugin for Vite, which adds support for fast refresh, etc.
        tsconfigPaths(), // Automatically resolve tsconfig paths to Webpack aliases.
    ],
    resolve: {
    // Optional: Configure how modules are resolved. For example, you can add aliases here.
    },
    build: {
        // When building for production, output the files to the "build" directory.
        // This is where you can configure the output directory and other build options.
        outDir: 'dist/client',
    },
    server: {
        // Define server-specific options here, such as setting up proxying for API requests to your backend during development.
        // This is especially useful if your React app needs to communicate with your Express server running locally.
        proxy: {
            // Proxy API endpoints to the Express server.
            // Example: Assuming your Express server runs on port 3001
            '/api': 'http://localhost:3000',
        },
    },
});
//# sourceMappingURL=vite.config.js.map