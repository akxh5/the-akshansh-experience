import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import { nitro } from "nitro/vite"; // <-- 1. Import the Nitro plugin

export default defineConfig({
  plugins: [
    tanstackStart(),
    nitro({
      preset: "vercel" // <-- 2. Tell Nitro to optimize specifically for Vercel
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    mdx({
      remarkPlugins: [],
      rehypePlugins: [],
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    port: 8080,
    strictPort: false,
    host: true,
  },
});