import { defineConfig } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';

export default defineConfig({
  testDir: './tests/e2e',
  // Keep Playwright's cleanup isolated from other user-owned files in test-results.
  outputDir: './test-results/playwright',
  fullyParallel: false,
  reporter: 'list',
  timeout: 30_000,
  expect: { timeout: 8_000 },
  use: {
    baseURL,
    browserName: 'chromium',
    locale: 'fr-FR',
    trace: 'retain-on-failure',
  },
});
