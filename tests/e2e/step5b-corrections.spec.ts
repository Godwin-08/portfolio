import { expect, test } from '@playwright/test';

const testRoutes = [
  '/',
  '/en',
  '/a-propos',
  '/en/about',
  '/projets',
  '/en/projects',
  '/certifications',
  '/en/certifications',
  '/contact',
  '/en/contact',
  '/projets/olist',
  '/en/projects/olist',
];

const testWidths = [320, 360, 375, 390, 768, 1024, 1102, 1103, 1280, 1366];

test.describe('Step 5B: Responsive, theme and accessibility non-regression tests', () => {
  test('document does not overflow horizontally at 320px across key routes in both themes', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 740 });

    for (const theme of ['light', 'dark'] as const) {
      for (const route of testRoutes) {
        await page.goto(route);
        await page.evaluate((th) => {
          if (th === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('portfolio-theme', 'dark');
          } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('portfolio-theme', 'light');
          }
        }, theme);

        const isOverflowing = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });

        expect(isOverflowing, `${route} at 320px (${theme}) should not overflow horizontally`).toBe(false);
      }
    }
  });

  test('navbar and document do not overflow horizontally across intermediate and desktop widths', async ({ page }) => {
    for (const width of testWidths) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');

      const isOverflowing = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(isOverflowing, `Homepage at ${width}px should not overflow horizontally`).toBe(false);
    }
  });

  test('certifications gallery maintains logical heading hierarchy without skipping levels', async ({ page }) => {
    for (const route of ['/certifications', '/en/certifications']) {
      await page.goto(route);

      const h1Count = await page.locator('main h1').count();
      expect(h1Count, `${route} should have exactly one h1`).toBe(1);

      // Certification cards must use h2 under page h1
      const cardHeadings = page.locator('[data-certifications-grid] article h2');
      const count = await cardHeadings.count();
      expect(count, `${route} should display certification cards with h2 headings`).toBe(8);

      // Ensure no skipped h3 headings exist at the card level
      const invalidCardH3 = page.locator('[data-certifications-grid] article > h3');
      expect(await invalidCardH3.count()).toBe(0);
    }

    // Homepage featured certifications must use h3 under the section h2
    await page.goto('/');
    const homeSectionH2 = page.locator('section[aria-labelledby="certifications-heading"] h2#certifications-heading');
    await expect(homeSectionH2).toBeVisible();
    const homeFeaturedH3 = page.locator('[data-certifications-grid] article h3');
    expect(await homeFeaturedH3.count()).toBeGreaterThanOrEqual(3);
  });

  test('language switcher interactive targets meet WCAG touch target size recommendations', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const buttons = page.locator('header button:visible').filter({ hasText: /^(FR|EN)$/ });
    const count = await buttons.count();
    expect(count).toBe(2);

    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      const box = await btn.boundingBox();
      expect(box, `Language button #${i} should be rendered`).not.toBeNull();
      if (box) {
        expect(box.height, `Button #${i} height should be at least 24px (WCAG 2.5.8)`).toBeGreaterThanOrEqual(24);
        expect(box.width, `Button #${i} width should be at least 24px (WCAG 2.5.8)`).toBeGreaterThanOrEqual(24);
      }
    }
  });

  test('mobile menu keyboard navigation closes on Escape and returns focus to trigger button', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const menuButton = page.locator('button[aria-controls="mobile-navigation"]');
    await expect(menuButton).toBeVisible();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await expect(menuButton).toHaveAttribute('aria-label', /ouvrir le menu|open menu/i);

    await menuButton.click();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    await expect(menuButton).toHaveAttribute('aria-label', /fermer le menu|close menu/i);
    const mobileNav = page.locator('#mobile-navigation');
    await expect(mobileNav).toBeVisible();

    // Press Escape
    await page.keyboard.press('Escape');
    await expect(mobileNav).not.toBeVisible();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await expect(menuButton).toHaveAttribute('aria-label', /ouvrir le menu|open menu/i);
    await expect(menuButton).toBeFocused();
  });
});
