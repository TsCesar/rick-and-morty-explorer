import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages publica el proyecto en https://<usuario>.github.io/<repositorio>/.
  // Con './' las rutas de los archivos generados son relativas, así que la web
  // funciona sea cual sea el nombre del repositorio (la app no usa rutas/URLs propias).
  // Alternativa equivalente si prefieres ponerlo explícito: base: '/<nombre-del-repositorio>/'
  base: './',
})
