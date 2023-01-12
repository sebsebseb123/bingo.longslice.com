import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    json,
    resolve({
      browser: true,
      preferBuiltins: false,
      dedupe: ['vite'],
    }),
  ],
  define: {
    global: 'window',
  },
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
})
