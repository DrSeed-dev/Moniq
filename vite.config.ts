// vite.config.ts

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),         // Enables React (JSX transform, Fast Refresh)
    tailwindcss(),   // Integrates Tailwind v4 into Vite's build pipeline
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // This means: anywhere you write `@/components/Button`
      // Vite resolves it to `./src/components/Button`
      // No more ../../.. relative path hell
    },
  },
})