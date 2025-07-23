// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- 1. Importar el plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- 2. Añadir el plugin aquí
  ],
})