import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { rmSync } from 'node:fs';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'clear-cache',
      buildStart() {
        // Clear cache directory before starting dev server
        const cacheDir = resolve('node_modules/.vite');
        rmSync(cacheDir, { recursive: true, force: true });
      },
    },
    react(),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'form-vendor': ['react-hook-form'],
          'animation-vendor': ['framer-motion'],
          'i18n-vendor': ['i18next', 'react-i18next'],
        },
      },
    },
  },
  server: {
    force: true, // Force clear module cache on restart
  },
});