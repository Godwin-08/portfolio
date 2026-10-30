import { expect, test } from '@playwright/test';
import { THEME_STORAGE_KEY } from '../../src/components/theme/theme-constants';

const projectSlugs = [
  'gtm',
  'olist',
  'afc',
  'acp',
  'revision-flow',
  'novastore',
  'sante-scolaire',
] as const;

const publicRoutes = [
  '/',
  '/a-propos',
  '/projets',
  '/contact',
  '/certifications',
  ...projectSlugs.map((slug) => `/projets/${slug}`),
  '/certifications/introduction-to-statistics',
  '/en',
  '/en/about',
  '/en/projects',
  '/en/contact',
  '/en/certifications',
  ...projectSlugs.map((slug) => `/en/projects/${slug}`),
  '/en/certifications/introduction-to-statistics',
];

test('theme toggle persists and public routes remain readable and responsive in dark mode', async ({ page }) => {
  test.setTimeout(90_000);
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.addInitScript((storageKey) => {
    if (localStorage.getItem(storageKey) === null) localStorage.setItem(storageKey, 'light');
  }, THEME_STORAGE_KEY);
  await page.goto('/');

  await expect(page.locator('html')).not.toHaveClass(/dark/);
  await page.getByRole('banner').getByRole('button', { name: /Activer le mode sombre/i }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect.poll(() => page.evaluate((storageKey) => localStorage.getItem(storageKey), THEME_STORAGE_KEY)).toBe('dark');

  for (const route of publicRoutes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator('html'), route).toHaveClass(/dark/);
    await expect(page.locator('#main-content'), route).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
      `${route} should not overflow horizontally`
    ).toBe(true);

    if (route === '/a-propos' || route === '/en/about') {
      const methodHeading = page.getByRole('heading', {
        name: route === '/a-propos' ? 'Comprendre → Analyser → Construire' : 'Understand → Analyse → Build',
      });
      await expect(methodHeading).toBeVisible();
      await expect(methodHeading).toHaveCSS('color', 'rgb(255, 255, 255)');
      const associationSurface = page.locator('main [class*="dark:bg-accent-950"]').first();
      const associationBackground = await associationSurface.evaluate((element) => getComputedStyle(element).backgroundColor);
      expect(Number(associationBackground.match(/^oklab\(([\d.]+)/)?.[1])).toBeLessThan(0.5);
      const headerLayout = await page.evaluate(() => {
        const header = document.querySelector('header');
        const brand = header?.querySelector('a.group');
        if (!header || !brand) return null;
        const headerRect = header.getBoundingClientRect();
        const brandRect = brand.getBoundingClientRect();
        return {
          height: headerRect.height,
          brandFits: brandRect.top >= headerRect.top && brandRect.bottom <= headerRect.bottom,
        };
      });
      expect(headerLayout).not.toBeNull();
      expect(headerLayout!.height).toBeLessThan(80);
      expect(headerLayout!.brandFits).toBe(true);
    }

    if (route === '/') {
      const skillsSection = page.locator('.skills-ticker');
      const sectionBackgroundLightness = await skillsSection.evaluate((element) => {
        const background = getComputedStyle(element).backgroundColor;
        return Number(background.match(/^lab\(([\d.]+)/)?.[1]);
      });
      expect(sectionBackgroundLightness).toBeLessThan(20);
      await expect(skillsSection.getByRole('heading', { level: 2 })).toHaveCSS('color', 'rgb(255, 255, 255)');
      await expect(skillsSection.locator('[data-skill-id]').first()).toHaveCSS('color', 'rgb(255, 255, 255)');
      await expect(skillsSection.locator('[data-skill-id="python"]').first()).toHaveClass(/border-primary-300/);
      await expect(skillsSection.locator('[data-skill-id="mysql"]').first()).toHaveClass(/border-accent-300/);
      await expect(skillsSection.locator('[data-skill-id="git"]').first()).toHaveClass(/border-slate-300/);
      await expect(page.getByRole('link', { name: 'Découvrir mon parcours' })).toHaveClass(/dark:text-coral-300/);
      await expect(page.locator('[data-project-preview]').nth(1).locator('..')).toHaveClass(/border-coral-500/);
      await expect(page.locator('[data-certification-id]').first()).toHaveClass(/dark:border-t-emerald-400/);
      await expect(page.locator('[data-certification-document]').first()).toHaveClass(/dark:text-emerald-300/);
      for (const selector of ['[class*="dark:bg-coral-950"]', '[class*="dark:bg-lilac-950"]']) {
        const surface = page.locator(`main ${selector}`).first();
        const background = await surface.evaluate((element) => getComputedStyle(element).backgroundColor);
        expect(Number(background.match(/^oklab\(([\d.]+)/)?.[1]), selector).toBeLessThan(0.5);
      }
    }

    if (route.includes('/projects/') || route.includes('/projets/')) {
      const card = page.locator('article li.rounded-xl').first();
      await expect(card, route).toBeVisible();
      const background = await card.evaluate((element) => getComputedStyle(element).backgroundColor);
      expect(background, route).not.toBe('rgb(255, 255, 255)');

      if (route.startsWith('/projets/') || route.startsWith('/en/projects/')) {
        const accent = await page.locator('[data-project-page]').evaluate((element) =>
          getComputedStyle(element).getPropertyValue('--project-accent-current').trim()
        );
        expect(accent, `${route} should apply its dark-mode project accent`).toMatch(/^#[\da-f]{6}$/i);
      }
    }

    if (
      route.includes('/certifications/') &&
      !route.endsWith('/certifications')
    ) {
      await expect(page.locator('[data-certification-detail]'), route).toBeVisible();
      await expect(
        page.getByRole('heading', {
          name: route.startsWith('/en')
            ? 'Completion certificate'
            : 'Attestation de réussite',
        }),
        route
      ).toBeVisible();
    }
  }

  await page.goto('/projets');
  for (const theme of ['dark', 'light'] as const) {
    if ((await page.locator('html').evaluate((element) => element.classList.contains('dark'))) !== (theme === 'dark')) {
      await page.getByRole('banner').getByRole('button', {
        name: theme === 'dark'
          ? /Activer le mode sombre|Switch to dark mode/i
          : /Activer le mode clair|Switch to light mode/i,
      }).click();
    }
    if (theme === 'dark') {
      await expect(page.locator('html')).toHaveClass(/dark/);
    } else {
      await expect(page.locator('html')).not.toHaveClass(/dark/);
    }
    await expect.poll(() => page.evaluate((storageKey) => localStorage.getItem(storageKey), THEME_STORAGE_KEY)).toBe(theme);

    for (const width of [320, 360, 375, 390]) {
      await page.setViewportSize({ width, height: 812 });
      const overlappedControls = await page.evaluate(() => {
        const fab = document.querySelector('button[aria-label*="IA"], button[aria-label*="AI"]');
        if (!fab) return ['FAB not found'];
        const fabRect = fab.getBoundingClientRect();
        return [...document.querySelectorAll('a, button, input, select, textarea, summary, [tabindex]:not([tabindex="-1"])')]
          .filter((element) => element !== fab)
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0
              && rect.left < fabRect.right
              && rect.right > fabRect.left
              && rect.top < fabRect.bottom
              && rect.bottom > fabRect.top;
          })
          .map((element) => (element.textContent || element.getAttribute('aria-label') || '').trim());
      });
      expect(overlappedControls, `${theme} theme at ${width}px`).toEqual([]);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
        `${theme} theme at ${width}px should not overflow horizontally`
      ).toBe(true);
    }
  }

  expect(consoleErrors).toEqual([]);
});
