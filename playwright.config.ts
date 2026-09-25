import { defineConfig, devices } from '@playwright/test'

// End-to-end and accessibility checks run against the production build served by
// scripts/serve-dist.mjs, which serves dist/ with Vercel's routing and headers.
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    // A fixed browser language, so the language-detection tests are deterministic.
    locale: 'es-CR',
    trace: 'retain-on-failure',
    // Most checks are about something else, so the cookie choice is already made and the banner stays out of the way.
    // e2e/consent.spec.ts starts from a clean browser to test the banner itself.
    storageState: {
      cookies: [],
      origins: [{ origin: 'http://localhost:4173', localStorage: [{ name: 'gupp-consent', value: JSON.stringify({ version: '1', analytics: false, decidedAt: '2026-01-01T00:00:00.000Z' }) }] }],
    },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'npm run build && node scripts/serve-dist.mjs --port 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
