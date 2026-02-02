import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://omniretail.localhost.io",
        changeOrigin: true,
        secure: false, // self-signed cert
      },
    },
  },
})
