import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import defineReactive from 'vite-plugin-vue3-define-reactive'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      defineReactive({
          debug:false
      }),
      vue(),
      AutoImport({
        imports: ['vue'],
      })
  ],
  base:'/',
  resolve:{
    alias:{
        '@': path.resolve(__dirname,'src'),
    },
    extensions:['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  server:{
      fs:{
          allow:['..']
      },
      open: true, // 项目启动时是否自动打开浏览器
      proxy: {
        '/v1': { // 代理api
          // target: 'http://err.repaishop.com',
          target: 'http://localhost:8000/',
          // target: 'https://wzgapi.repaimall.com',
          changeOrigin: true // 是否跨域
        }
      }
  }
})
