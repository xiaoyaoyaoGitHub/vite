import { defineConfig } from 'vite'
import { resolve } from "path"
import vue from '@vitejs/plugin-vue'
import i18n from "./plugin/vite-plugin-i18n.js"
// import myExample from "./plugin/vite-plugin-example"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),i18n],
  resolve:{
    alias:{
      "@": resolve(__dirname, 'src')
    }
  }
})
