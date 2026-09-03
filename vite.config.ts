import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      includePublic: true,
      logStats: true,
      png: {
        quality: 80,
        progressive: true,
        palette: true,
      },
      jpeg: {
        quality: 80,
        progressive: true,
        mozjpeg: true,
      },
      jpg: {
        quality: 80,
        progressive: true,
        mozjpeg: true,
      },
      webp: {
        quality: 75,
      },
      avif: {
        quality: 65,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["tests/**"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/__tests__/setup.ts"],
    coverage: {
      provider: "v8",
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
      exclude: [
        "node_modules/**",
        "dist/**",
        "tests/**",
        "scripts/**",
        "playwright.config.ts",
        "src/__tests__/setup.ts",
        "src/main.tsx",
        "vite.config.ts",
        "src/content/**",
      ],
    },
  },
});
