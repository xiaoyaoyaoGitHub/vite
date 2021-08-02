import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import vFile from './plugins/vite-plugin-vFile'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include:[/\.vue$/,/\.md$/]
    }),
    Markdown(),
    vFile()
  ]
})
