/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import tailwind from 'tailwindcss';
import * as path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  test: {
    globals: true,
    environment: 'happy-dom',  
    setupFiles: ['./vitest-setup.ts'],
  }
});