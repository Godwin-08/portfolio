import { expect, test, type Page } from '@playwright/test';
import frMessages from '../../messages/fr.json';
import enMessages from '../../messages/en.json';

type Messages = typeof frMessages;
type Locale = 'fr' | 'en';

const localizedRoutes = [
  {
    locale: 'fr' as const,
    messages: frMessages,
    home: '/',
    about: '/a-propos',
    projects: '/projets',
    contact: '/contact',
  },
  {
    locale: 'en' as const,
    messages: enMessages,
    home: '/en',
    about: '/en/about',
    projects: '/en/projects',
    contact: '/en/contact',
  },
];

const projectSlugs = [
  'gtm',
  'olist',
  'afc',
  'revision-flow',
  'sante-scolaire',
  'novastore',
] as const;

function projectTitle(messages: Messages, slug: (typeof projectSlugs)[number]) {
  return messages.projects.cards[slug].title;
}

function routeHeading(
  locale: Locale,
  messages: Messages,
  slug: (typeof projectSlugs)[number]
) {
  if (slug === 'gtm' || slug === 'olist') return slug === 'gtm' ? 'Galaxy Training Manager' : 'Olist';
  if (slug === 'afc') return locale === 'fr' ? 'AFC' : 'CA';
  return projectTitle(messages, slug);
}

function observeBrowser(page: Page) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const hydrationWarnings: string[] = [];
  const failedLocalRequests: string[] = [];
  const failedLocalResponses: string[] = [];
  const localOrigin = new URL(
    process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:4173'
  ).origin;

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
    if (
      message.type() === 'warning' &&
      /hydration|did not match|text content does not match|server rendered/i.test(message.text())
    ) {
      hydrationWarnings.push(message.text());
    }
  });
  page.on('pageerror', (error) => pageErrors.push(error.stack ?? error.message));
  page.on('requestfailed', (request) => {
    const errorText = request.failure()?.errorText ?? 'unknown error';
    if (new URL(request.url()).origin === localOrigin && errorText !== 'net::ERR_ABORTED') {
      failedLocalRequests.push(`${request.url()} (${errorText})`);
    }
  });
  page.on('response', (response) => {
    if (new URL(response.url()).origin === localOrigin && response.status() >= 400) {
      failedLocalResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  return { consoleErrors, pageErrors, hydrationWarnings, failedLocalRequests, failedLocalResponses };
}

function expectNoBrowserErrors(diagnostics: ReturnType<typeof observeBrowser>) {
  expect(diagnostics.pageErrors, 'uncaught JavaScript exceptions').toEqual([]);
  expect(diagnostics.consoleErrors, 'browser console errors').toEqual([]);
  expect(diagnostics.hydrationWarnings, 'React/Next hydration warnings').toEqual([]);
  expect(diagnostics.failedLocalRequests, 'failed same-origin resource requests').toEqual([]);
  expect(diagnostics.failedLocalResponses, 'same-origin HTTP error responses').toEqual([]);
}

for (const site of localizedRoutes) {
  const staticPages = [
    { path: site.home, expected: site.messages.common.name },
    { path: site.about, expected: site.messages.about.title },
    { path: site.projects, expected: site.messages.projects.list.heading },
    { path: site.contact, expected: site.messages.contact.title },
  ];

  for (const route of staticPages) {
    test(`${site.locale}: ${route.path} renders and hydrates`, async ({ page }) => {
      const diagnostics = observeBrowser(page);
      const response = await page.goto(route.path);

      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', site.locale);
      await expect(page.locator('#main-content')).toBeVisible();
      await expect(page.getByRole('heading', { level: 1 })).toContainText(route.expected);
      expect((await page.locator('body').innerText()).trim().length).toBeGreaterThan(100);
      expectNoBrowserErrors(diagnostics);
    });
  }

  for (const slug of projectSlugs) {
    const path = `${site.projects}/${slug}`;
    const expected = routeHeading(site.locale, site.messages, slug);

    test(`${site.locale}: ${path} renders and hydrates`, async ({ page }) => {
      const diagnostics = observeBrowser(page);
      const response = await page.goto(path);

      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', site.locale);
      await expect(page.locator('#main-content')).toBeVisible();
      await expect(page.getByRole('heading', { level: 1 })).toContainText(expected);
      expect((await page.locator('body').innerText()).trim().length).toBeGreaterThan(100);
      expectNoBrowserErrors(diagnostics);
    });
  }
}

test('unknown routes and project slugs produce a real not-found response', async ({ page }) => {
  for (const path of ['/es/about', '/projets/unknown-project', '/en/projects/unknown-project']) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(404);
    await expect(page.getByRole('heading', { name: /404|not found|introuvable/i })).toBeVisible();
  }
});

test('legacy French paths redirect to the localized canonical routes', async ({ page }) => {
  for (const [oldPath, canonicalPath] of [
    ['/about', '/a-propos'],
    ['/projects', '/projets'],
    ['/projects/gtm', '/projets/gtm'],
    ['/fr/about', '/a-propos'],
  ]) {
    const response = await page.goto(oldPath);
    expect(response?.status(), oldPath).toBe(200);
    await expect(page).toHaveURL(new RegExp(`${canonicalPath.replaceAll('/', '\\/')}$`));
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  }
});

test('desktop navigation opens project pages and every case study from the listing', async ({ page }) => {
  const diagnostics = observeBrowser(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  await expect(page.getByRole('navigation', { name: frMessages.common.nav.mainLabel })).toBeVisible();
  await page.getByRole('link', { name: frMessages.common.nav.projects, exact: true }).click();
  await expect(page).toHaveURL(/\/projets$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(frMessages.projects.list.heading);

  for (const slug of projectSlugs) {
    const title = projectTitle(frMessages, slug);
    const card = page.getByRole('article').filter({
      has: page.getByRole('heading', { level: 2, name: title, exact: true }),
    });
    await expect(card).toHaveCount(1);
    await card.hover();
    await card.getByRole('link', { name: frMessages.projects.card.caseStudy, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/projets/${slug}$`));
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.locator('#main-content').getByRole('link').first().click();
    await expect(page).toHaveURL(/\/projets$/);
  }

  expectNoBrowserErrors(diagnostics);
});

test('mobile navigation opens, closes with Escape, and follows a localized link', async ({ page }) => {
  const diagnostics = observeBrowser(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const openMenu = page.getByRole('button', { name: frMessages.common.accessibility.openMenu });
  await openMenu.focus();
  await page.keyboard.press('Enter');
  const menu = page.getByRole('region', { name: frMessages.common.accessibility.mobileMenu });
  await expect(menu).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toHaveCount(0);

  await page.getByRole('button', { name: frMessages.common.accessibility.openMenu }).click();
  await page.getByRole('navigation', { name: frMessages.common.nav.mobileLabel })
    .getByRole('link', { name: frMessages.common.nav.about, exact: true }).click();
  await expect(page).toHaveURL(/\/a-propos$/);
  await expect(menu).toHaveCount(0);
  expectNoBrowserErrors(diagnostics);
});

test('language switching preserves the current page and project slug', async ({ page }) => {
  const diagnostics = observeBrowser(page);
  await page.goto('/');
  await page.getByRole('button', { name: frMessages.common.language.switchToEnglish }).first().click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('button', { name: enMessages.common.language.switchToFrench }).first().click();
  await expect(page).toHaveURL(/\/$/);

  await page.goto('/a-propos');
  await page.getByRole('button', { name: frMessages.common.language.switchToEnglish }).first().click();
  await expect(page).toHaveURL(/\/en\/about$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('button', { name: enMessages.common.language.switchToFrench }).first().click();
  await expect(page).toHaveURL(/\/a-propos$/);

  await page.goto('/projets/gtm');
  await page.getByRole('button', { name: frMessages.common.language.switchToEnglish }).first().click();
  await expect(page).toHaveURL(/\/en\/projects\/gtm$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('button', { name: enMessages.common.language.switchToFrench }).first().click();
  await expect(page).toHaveURL(/\/projets\/gtm$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');

  expectNoBrowserErrors(diagnostics);
});

for (const site of localizedRoutes) {
  test(`${site.locale}: category, skill, combined, empty, reset, and locale-preserving filters`, async ({ page }) => {
    const diagnostics = observeBrowser(page);
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto(`${site.projects}?campaign=acceptance`);
    const categoryName = site.messages.projects.categories['web-si'];
    await page.getByRole('button', { name: categoryName, exact: true }).click();
    await expect(page).toHaveURL(/category=web-si/);
    expect(new URL(page.url()).searchParams.get('campaign')).toBe('acceptance');
    await expect(page.locator('article h2')).toHaveCount(4);

    await page.goto(`${site.projects}?skill=flask`);
    await expect(page.locator('article h2')).toHaveCount(3);

    await page.goto(`${site.projects}?category=web-si&skill=flask`);
    await expect(page.locator('article h2')).toHaveCount(3);

    await page.goto(`${site.projects}?category=data-analysis&skill=flask`);
    await expect(page.locator('article h2')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: site.messages.projects.list.emptyTitle })).toBeVisible();
    await page.getByRole('button', { name: site.messages.projects.filters.reset, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${site.projects.replaceAll('/', '\\/')}$`));
    await expect(page.locator('article h2')).toHaveCount(6);

    await page.goto(`${site.projects}?category=web-si&skill=flask`);
    const switchButton = site.locale === 'fr'
      ? frMessages.common.language.switchToEnglish
      : enMessages.common.language.switchToFrench;
    await page.getByRole('button', { name: switchButton }).first().click();
    const targetProjects = site.locale === 'fr' ? '/en/projects' : '/projets';
    await expect(page).toHaveURL(new RegExp(`${targetProjects.replaceAll('/', '\\/')}\\?`));
    const search = new URL(page.url()).searchParams;
    expect(search.get('category')).toBe('web-si');
    expect(search.get('skill')).toBe('flask');
    await expect(page.locator('article h2')).toHaveCount(3);

    expectNoBrowserErrors(diagnostics);
  });
}

test('desktop and mobile layouts fit the viewport and produce reference screenshots', async ({ page }, testInfo) => {
  const diagnostics = observeBrowser(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('screenshots/home-desktop.png'), fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/projets');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('screenshots/projects-mobile.png'), fullPage: true });
  expectNoBrowserErrors(diagnostics);
});
