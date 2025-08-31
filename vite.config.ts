import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: "manifest.json", dest: "." },
        { src: "assets/*", dest: "assets" },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        popup: "popup/index.html",
        options: "options/index.html",
        background: "background/index.ts",
        content: "content/index.ts",
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === "background") return "background/index.js";
          if (chunk.name === "content") return "content/index.js";
          return "[name]/index.js"; // popup/index.js, options/index.js
        },
        chunkFileNames: "[name]/[name].js",
        assetFileNames: "[name]/[name].[ext]",
      },
    },
  },
});
