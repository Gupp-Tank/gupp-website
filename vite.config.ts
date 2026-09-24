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
    },
  }
})
