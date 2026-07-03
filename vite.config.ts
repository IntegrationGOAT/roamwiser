import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/huggingface': {
        target: 'https://router.huggingface.co',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/huggingface/, '/v1/chat/completions'),
      },
    },
  },
})