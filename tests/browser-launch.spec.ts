import { test, expect } from '@playwright/test';

test('browser launches without an external service', async ({ page }) => {
  await page.setContent('<h1>Browser ready</h1>');
  await expect(page.getByRole('heading', { name: 'Browser ready' })).toBeVisible();
});
