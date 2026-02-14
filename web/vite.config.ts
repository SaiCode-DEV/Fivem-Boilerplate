import { fileURLToPath, URL } from 'node:url';
import Vue from '@vitejs/plugin-vue';
import Fonts from 'unplugin-fonts/vite';
// Plugins
import Components from 'unplugin-vue-components/vite';
import VueRouter from 'unplugin-vue-router/vite';

// Utilities
import { defineConfig } from 'vite';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      dts: 'src/typed-router.d.ts',
    }),
    Vue({
      template: { transformAssetUrls },
    }),
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    Components({
      dts: 'src/components.d.ts',
    }),
    Fonts({
      fontsource: {
        families: [
          {
            name: 'Roboto',
            weights: [100, 300, 400, 500, 700, 900],
            styles: ['normal', 'italic'],
          },
        ],
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
      '~': fileURLToPath(new URL('../', import.meta.url)),
      '@common': fileURLToPath(new URL('../src/common', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  base: './',
  build: {
    outDir: '../dist/web',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
      },
    },
  },
  server: {
    port: 3000,
  },
});
