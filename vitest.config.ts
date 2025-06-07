import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [
      ['**/*.test.ts', 'node'],
      ['**/*.spec.ts', 'node'],
    ],
    globals: true, // Enable globals for easier test writing
  },
});
