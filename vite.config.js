import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['pi-2025-front.onrender.com'],
  },
  plugins: [vue()],
  base: '/',
  server: {
    host: '0.0.0.0',
    port: 10000
  }
})
