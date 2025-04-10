import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
        includeAssets: ["favicon.ico", "apple-touch-icon.png"],
        registerType: "autoUpdate",
        devOptions: {
          enabled: true,
          type: 'module',
        },
        manifest: {
          name: "WakeWise - Smart Alarm Clock",
          short_name: "WakeWise",
          description: "App for controlling your WakeWise smart alarm clock.",
          theme_color: "#ffffff",
          start_url: "/",
          display: "standalone",
          icons: [
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
