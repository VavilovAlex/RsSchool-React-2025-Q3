import { defineConfig } from "vitest/config";

/**
 * Minimal Vitest configuration. Vitest depends on Vite dev tools; if you
 * plan to remove Vite completely you should migrate tests to Jest or another
 * runner. If you keep Vitest, keep vite + vitest devDependencies.
 */
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts", // create this file if you need test setup
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      reporter: ["text", "html"],
    },
  },
});
