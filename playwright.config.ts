import { AUTH_FILE, BROWSER_CONFIGS, TEST_PATTERNS } from '@/configs/browsers';
import { defineBddConfig } from 'playwright-bdd';
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const testDir = defineBddConfig({
  features: './src/features/**/*.feature',
  steps: ['./src/fixtures/**/*.ts', './src/steps/**/*.steps.ts'],
  aiFix: {
    promptAttachment: true,
  },
});

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL || 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  /* Configure projects for major browsers */
  projects: [
    // Setup project
    {
      name: 'setup',
      testDir: 'src/configs',
      testMatch: TEST_PATTERNS.SETUP,
    },

    ...BROWSER_CONFIGS.map((browser) => ({
      name: browser.name,
      use: {
        ...browser.device,
        storageState: AUTH_FILE,
      },
      dependencies: ['setup'],
      testIgnore: TEST_PATTERNS.AUTH,
    })),

    ...BROWSER_CONFIGS.map((browser) => ({
      name: `${browser.name}-unauthenticated`,
      use: { ...browser.device },
      testMatch: TEST_PATTERNS.AUTH,
    })),
  ],
});
