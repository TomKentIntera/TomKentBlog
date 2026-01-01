import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Local dev convenience: avoid CORS by proxying to Laravel.
      '/api': 'http://localhost:8000',
    },
  },
})
