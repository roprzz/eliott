import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Everything is inlined into a single index.html so it opens from anywhere,
// a double-click, a USB key, a CD-ROM, with no server and no internet.
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
})
