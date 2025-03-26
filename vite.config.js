import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.100.80:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    // host: '192.168.100.80',
    host: 'localhost',
    port: 4173
  },
  build: {
    outDir: './dist'
  }
})
