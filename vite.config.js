import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3030,
  },
  plugins: [
    react(),
    json,
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
  ],
  define: {
    global: 'window',
  },
  resolve: {
    browser: true,
    preferBuiltins: false,
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
})
