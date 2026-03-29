import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['kaysen-glamorous-actinally.ngrok-free.dev']
  }
})