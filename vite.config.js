import { defineConfig } from 'vite'

const api = import.meta.env.VITE_API_URL;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: `${api}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    host: '192.168.100.80',
    // host: 'localhost',
    port: 4173
  },
  build: {
    outDir: './dist'
  }
})
