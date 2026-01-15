import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Remove base path for Vercel deployment (uses root domain)
  // For GitHub Pages, uncomment the line below:
  // base: '/Raj_Asimov/',
})
