import { expect, test } from '@playwright/test';

test('defaults to French and light mode independently of browser preferences', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.setExtraHTTPHeaders({ 'accept-language': 'en-US,en;q=0.9' });

  const response = await page.goto('/');

  expect(response?.status()).toBe(200);
  expect(new URL(page.url()).pathname).toBe('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.locator('html')).not.toHaveClass(/dark/);
  await expect(page.getByText('D’une question métier à un outil de données qui fonctionne.')).toBeVisible();

  await page.goto('/en');

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByText('From a business question to a working data tool.')).toBeVisible();
});
