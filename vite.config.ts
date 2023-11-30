import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/screen', 
  plugins: [vue()],
  server: {
    port: 8080,
    host: 'localhost',
    open:true,
    https: false,
    watch: {
      ignored: ['**/node_modules/**'],
    },
  },
  build: {
    outDir: 'dist/screen', 
  }
})
