import { expect, test } from '@playwright/test';

const localizedPages = [
  {
    locale: 'French',
    paths: [
      '/',
      '/a-propos',
      '/projets',
      '/projets/olist',
      '/certifications',
      '/certifications/introduction-to-sql',
      '/contact',
    ],
  },
  {
    locale: 'English',
    paths: [
      '/en',
      '/en/about',
      '/en/projects',
      '/en/projects/olist',
      '/en/certifications',
      '/en/certifications/introduction-to-sql',
      '/en/contact',
    ],
  },
];

for (const { locale, paths } of localizedPages) {
  test(`keeps one main landmark and a working skip link across ${locale} routes`, async ({ page }) => {
    for (const path of paths) {
      const response = await page.goto(path);
      expect(response?.status(), `${path} should load`).toBe(200);

      const main = page.locator('main');
      await expect(main, `${path} should have one main landmark`).toHaveCount(1);
      await expect(page.locator('main#main-content')).toHaveCount(1);

      const skipLink = page.locator('a[href="#main-content"]');
      await expect(skipLink).toHaveCount(1);
      await skipLink.focus();
      await expect(skipLink).toBeVisible();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/#main-content$/);
      await expect(main).toBeFocused();
    }
  });
}

test('loads the Hero portrait with the default optimized image quality', async ({ page }) => {
  await page.goto('/');

  const portrait = page.locator('img[src*="godwin-portrait.jpg"]');
  await expect(portrait).toBeVisible();
  await expect.poll(() => portrait.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);

  const currentSource = await portrait.evaluate((image: HTMLImageElement) => image.currentSrc);
  expect(currentSource).toContain('q=75');
});
