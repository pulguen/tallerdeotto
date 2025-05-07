import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy: todo lo que vaya a /api/* se reenvía a nuestro Django HTTPS
    proxy: {
      '/api': {
        target: 'https://127.0.0.1:8000',
        secure: false,       // porque es un cert auto-firmado
        changeOrigin: true,  // reescribe el Host header
      }
    }
  }
})

