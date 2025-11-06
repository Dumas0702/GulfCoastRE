import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/GulfCoastRE/',
  build: { outDir: 'docs' },   // ← add this
  plugins: [react()],
})

