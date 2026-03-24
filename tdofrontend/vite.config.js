import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const devApiTarget = process.env.VITE_DEV_API_TARGET || 'http://127.0.0.1:8001'

export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy de desarrollo local hacia Django.
    proxy: {
      '/api': {
        target: devApiTarget,
        secure: false,
        changeOrigin: true,
      },
      '/media': {
        target: devApiTarget,
        secure: false,
        changeOrigin: true,
      },
    }
  }
})
