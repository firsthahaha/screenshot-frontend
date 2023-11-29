import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const isProduction = false
// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? '/shopify/' : '/', 
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
})
