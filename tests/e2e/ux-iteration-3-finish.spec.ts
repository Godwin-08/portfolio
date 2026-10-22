import { expect, test, type Locator, type Page } from '@playwright/test';
import frMessages from '../../messages/fr.json';
import enMessages from '../../messages/en.json';

const projectIds = ['gtm', 'olist', 'afc', 'revision-flow', 'sante-scolaire', 'novastore'] as const;
const locales = [
  { locale: 'fr', projects: '/projets', messages: frMessages },
  { locale: 'en', projects: '/en/projects', messages: enMessages },
] as const;
const thumbnailFiles = ['gtm-dashboard.png', 'olist-delais-livraison.png', 'afc-biplot.png'];

function linearSrgb(color: string): [number, number, number] {
  const lab = color.match(/^lab\(\s*([+-]?[\d.]+)(%?)\s+([+-]?[\d.]+)(%?)\s+([+-]?[\d.]+)(%?)\s*\)$/i);

  if (lab) {
    const lightness = Number(lab[1]);
    const a = Number(lab[3]) * (lab[4] ? 2.5 : 1);
    const b = Number(lab[5]) * (lab[6] ? 2.5 : 1);
    const fy = (lightness + 16) / 116;
    const fx = fy + a / 500;
    const fz = fy - b / 200;
    const delta = 6 / 29;
    const inverseLab = (value: number) =>
      value > delta ? value ** 3 : 3 * delta ** 2 * (value - 4 / 29);

    const x50 = 0.96422 * inverseLab(fx);
    const y50 = inverseLab(fy);
    const z50 = 0.82521 * inverseLab(fz);
    const x65 = 0.9555766 * x50 - 0.0230393 * y50 + 0.0631636 * z50;
    const y65 = -0.0282895 * x50 + 1.0099416 * y50 + 0.0210077 * z50;
    const z65 = 0.0122982 * x50 - 0.020483 * y50 + 1.3299098 * z50;

    return [
      3.2409699 * x65 - 1.5373832 * y65 - 0.4986108 * z65,
      -0.9692436 * x65 + 1.8759675 * y65 + 0.0415551 * z65,
      0.0556301 * x65 - 0.203977 * y65 + 1.0569715 * z65,
    ].map((channel) => Math.max(0, Math.min(1, channel))) as [number, number, number];
  }

  const rgb = color.match(/^rgba?\(([^)]+)\)$/i);
  if (rgb) {
    const channels = rgb[1].split(/[\s,/]+/).filter(Boolean).slice(0, 3).map((channel) => {
      const value = Number.parseFloat(channel);
      return channel.endsWith('%') ? value / 100 : value / 255;
    });
    if (channels.length === 3) {
      return channels.map((value) => {
        const clamped = Math.max(0, Math.min(1, value));
        return clamped <= 0.04045 ? clamped / 12.92 : ((clamped + 0.055) / 1.055) ** 2.4;
      }) as [number, number, number];
    }
  }

  throw new Error(`Unsupported computed color format: ${color}`);
}

function luminance(color: string) {
  const [red, green, blue] = linearSrgb(color);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(foreground: string, background: string) {
  const light = Math.max(luminance(foreground), luminance(background));
  const dark = Math.min(luminance(foreground), luminance(background));
  return (light + 0.05) / (dark + 0.05);
}

async function waitForImages(page: Page) {
  await page.locator('img').evaluateAll((images) => {
    images.forEach((image) => {
      if (image instanceof HTMLImageElement) image.loading = 'eager';
    });
  });
  await page.waitForFunction(() =>
    Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0)
  );
}

async function assertTechnologyTagContrast(cards: Locator) {
  const tags = cards.locator('ul li');
  const count = await tags.count();
  expect(count).toBeGreaterThan(0);

  for (let index = 0; index < count; index += 1) {
    const tagStyle = await tags.nth(index).evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        fontSize: Number.parseFloat(style.fontSize),
        color: style.color,
        backgroundColor: style.backgroundColor,
      };
    });

    expect(tagStyle.fontSize).toBeGreaterThanOrEqual(12);
    expect(tagStyle.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(contrastRatio(tagStyle.color, tagStyle.backgroundColor)).toBeGreaterThanOrEqual(4.5);
  }
}

async function waitForStableHome(page: Page) {
  const heroMotion = page.locator('.hero-motion-entry');
  await expect(heroMotion).toHaveCount(2);
  await expect(heroMotion.nth(0)).toHaveCSS('opacity', '1');
  await expect(heroMotion.nth(1)).toHaveCSS('opacity', '1');
  await waitForImages(page);
  await page.waitForTimeout(80);
}

async function assertProjectListing(
  page: Page,
  site: (typeof locales)[number]
) {
  await expect(page.locator('html')).toHaveAttribute('lang', site.locale);
  await expect(page.locator('article')).toHaveCount(6);
  await expect(page.locator('article h2')).toHaveText(
    projectIds.map((slug) => site.messages.projects.cards[slug].title)
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  const cards = page.locator('article');
  for (let index = 0; index < projectIds.length; index += 1) {
    const card = cards.nth(index);
    const labels = card.locator('[data-project-labels]');
    const visual = card.locator('[data-project-visual]');
    const labelBounds = await labels.boundingBox();
    const visualBounds = await visual.boundingBox();
    expect(labelBounds).not.toBeNull();
    expect(visualBounds).not.toBeNull();
    expect(labelBounds!.y + labelBounds!.height).toBeLessThanOrEqual(visualBounds!.y + 1);

    const categoryFontSize = await labels.locator('span').first().evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).fontSize)
    );
    expect(categoryFontSize).toBeGreaterThanOrEqual(12);

    if (index < thumbnailFiles.length) {
      const image = visual.locator('img');
      await expect(image).toBeVisible();
      await expect(image).toHaveAttribute('alt', /.+/);
      const imageInfo = await image.evaluate((element: HTMLImageElement) => ({
        loaded: element.complete && element.naturalWidth > 0,
        src: decodeURIComponent(element.src),
      }));
      expect(imageInfo.loaded).toBe(true);
      expect(imageInfo.src).toContain(thumbnailFiles[index]);

      const visualRatio = visualBounds!.width / visualBounds!.height;
      expect(visualRatio).toBeCloseTo(index === 2 ? 4 / 3 : 16 / 10, 1);
    }
  }

  await assertTechnologyTagContrast(cards);

  await expect(cards.first().getByRole('link').first()).toHaveAttribute(
    'href',
    `${site.projects}/gtm`
  );
}

test('captures iteration 3 layouts in French and English after the Hero has settled', async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  const screenshot = (name: string) => testInfo.outputPath(`iteration-3-${name}.png`);

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.locator('article')).toHaveCount(3);
  await waitForStableHome(page);
  await assertTechnologyTagContrast(page.locator('article'));
  await page.screenshot({ path: screenshot('home-fr-desktop'), fullPage: true });

  const ticker = page.getByRole('region', { name: frMessages.home.skills.sectionLabel });
  await expect(ticker.getByRole('button')).toHaveCount(23);
  const headerBounds = await page.locator('[data-skills-header] > div').first().boundingBox();
  const firstSkillBounds = await ticker.getByRole('button').first().boundingBox();
  expect(headerBounds).not.toBeNull();
  expect(firstSkillBounds).not.toBeNull();
  expect(Math.abs(firstSkillBounds!.x - headerBounds!.x)).toBeLessThanOrEqual(2);
  const headingSize = await ticker.getByRole('heading', { name: frMessages.home.skills.heading })
    .evaluate((heading) => Number.parseFloat(getComputedStyle(heading).fontSize));
  expect(headingSize).toBeGreaterThanOrEqual(36);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await ticker.screenshot({ path: screenshot('skills-alignment') });

  await page.goto('/en');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('article')).toHaveCount(3);
  await waitForStableHome(page);
  await assertTechnologyTagContrast(page.locator('article'));
  await page.screenshot({ path: screenshot('home-en-desktop'), fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.context().clearCookies();
  await page.goto('/');
  await waitForStableHome(page);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: screenshot('home-fr-mobile'), fullPage: true });

  await page.goto('/en');
  await waitForStableHome(page);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: screenshot('home-en-mobile'), fullPage: true });

  for (const site of locales) {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.context().clearCookies();
    await page.goto(site.projects);
    await assertProjectListing(page, site);
    await waitForImages(page);
    await page.screenshot({ path: screenshot(`projects-${site.locale}-desktop`), fullPage: true });

    for (let index = 0; index < thumbnailFiles.length; index += 1) {
      await page.locator('article').nth(index).locator('[data-project-preview]').screenshot({
        path: screenshot(`thumbnail-${site.locale}-${projectIds[index]}`),
      });
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await page.context().clearCookies();
    await page.goto(site.projects);
    await assertProjectListing(page, site);
    await waitForImages(page);
    await page.screenshot({ path: screenshot(`projects-${site.locale}-mobile`), fullPage: true });
  }
});

test('Hero settles within one second in normal motion and is immediate with reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect.poll(() => page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(false);

  await page.goto('/');
  const normalMotionEntries = page.locator('.hero-motion-entry');
  await expect(normalMotionEntries).toHaveCount(2);
  const settleStart = Date.now();
  for (const entry of await normalMotionEntries.all()) {
    await expect(entry).toHaveCSS('opacity', '1');
  }
  expect(Date.now() - settleStart).toBeLessThanOrEqual(1000);
  await page.waitForTimeout(60);
  for (const entry of await normalMotionEntries.all()) {
    await expect(entry).toHaveCSS('opacity', '1');
  }

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
  await page.goto('/');

  const reducedMotionEntries = page.locator('.hero-motion-entry');
  await expect(reducedMotionEntries).toHaveCount(2);
  for (const entry of await reducedMotionEntries.all()) {
    await expect(entry).toHaveCSS('opacity', '1');
    await expect(entry).toHaveCSS('transform', 'none');
  }
});

test('Hero and project hover motion respect reduced-motion preferences', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const heroEntries = page.locator('.hero-motion-entry');
  await expect(heroEntries).toHaveCount(2);
  for (const entry of await heroEntries.all()) {
    await expect(entry).toHaveCSS('opacity', '1');
    await expect(entry).toHaveCSS('transform', 'none');
  }
  const tickerTrack = page.locator('.skills-ticker__row:visible').first();
  await expect.poll(() => tickerTrack.evaluate((track) => getComputedStyle(track).animationName)).toBe('none');

  const projectCard = page.locator('article').first();
  await projectCard.hover();
  await expect(projectCard).toHaveCSS('translate', '0px');
  await expect(projectCard.locator('[data-project-visual] img')).toHaveCSS('scale', '1');
});

test('project case studies remain keyboard-activatable in both locales', async ({ page }) => {
  for (const site of locales) {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(site.projects);
    const caseStudyLink = page.locator('article').first().getByRole('link').first();
    await caseStudyLink.focus();
    await expect(caseStudyLink).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(`${site.projects}/gtm`);
    await expect(page.locator('html')).toHaveAttribute('lang', site.locale);
  }
});
