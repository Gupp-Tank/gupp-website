/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { readEnv } from './src/config/schema.ts'
import { envSchema } from './src/config/variables.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Fails the build/dev server on a missing or malformed variable, before any
  // code ships. The same schema is applied again at runtime in src/config/env.ts.
  readEnv(envSchema, loadEnv(mode, process.cwd(), 'VITE_'))

  return {
    plugins: [react()],
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      // Playwright specs live in e2e/ and run with `npx playwright test`.
      include: ['src/**/*.test.{ts,tsx}'],
      coverage: {
        provider: 'v8',
        // The logic layers: behavior, I/O, pure helpers and the error model.
        include: ['src/hooks/**', 'src/services/**', 'src/lib/**', 'src/errors/**'],
        // GLSL source is a string constant; tests, barrels and type-only files carry no logic.
        exclude: ['src/**/*.test.*', 'src/lib/caustics/causticsShader.ts', 'src/errors/index.ts'],
        thresholds: { statements: 90, branches: 80, functions: 90, lines: 90 },
      },
    },
  }
})
