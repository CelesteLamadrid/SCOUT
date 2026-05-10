import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

export default defineConfig({
  plugins: [
    react(),
    {
      // Serve Scout UI's index.html for /ui and /ui/* (SPA-style)
      name: 'scout-ui-fallback',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/ui' || req.url === '/ui/') {
            const uiIndex = path.resolve('Scout Website Assets/ui/index.html')
            if (fs.existsSync(uiIndex)) {
              res.setHeader('Content-Type', 'text/html')
              fs.createReadStream(uiIndex).pipe(res)
              return
            }
          }
          next()
        })
      },
    },
  ],
  publicDir: 'Scout Website Assets',
  server: { port: 5173 },
})
