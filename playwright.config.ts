import { defineConfig, devices } from '@playwright/test';
// import reportingLabs from './reporting-labs.config';

import dotenv from 'dotenv';

//npm install dotenv
//ENV=qa npx playwright test
const ENV = process.env.ENV || "qa";
console.log('Running tests on Environment: ', ENV);
dotenv.config({ path: `config/.env.${ENV}` });

export default defineConfig({
  testDir: './tests',
  /* Amadeus test API is no longer reachable (DNS does not resolve), so keep it out of all runs */
  testIgnore: '**/amadeus.oauth2.spec.ts',
  /* The public demo site can be slow; default 30s is too tight for login + search + navigation */
  timeout: 60_000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? '50%' : undefined,
  

  reporter: process.env.CI
    ? [
      ["blob"],
      ['list'],
      ['html', { outputFolder: "reports/html-report", open: "never" }],
      ["allure-playwright", {
        outputFolder: "allure-results",
        suiteTitle: true,
      }],
      // ['reporting-labs', reportingLabs]
    ]
    :
    [
      ["blob", { outputDir: "blob-report" }],
      ['list'],
      ['html', { outputFolder: "reports/html-report", open: "never" }],
      ["allure-playwright", {
        outputFolder: "allure-results",
        suiteTitle: true,
      }],
      // ['reporting-labs', reportingLabs]
    ],

  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],


});