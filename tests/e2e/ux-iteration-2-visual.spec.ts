import { expect, test } from '@playwright/test';
import frMessages from '../../messages/fr.json';
import enMessages from '../../messages/en.json';

const projectIds = ['gtm', 'olist', 'afc', 'revision-flow', 'sante-scolaire', 'novastore'] as const;
const locales = [
  { locale: 'fr', projects: '/projets', messages: frMessages },
  { locale: 'en', projects: '/en/projects', messages: enMessages },
] as const;

test('captures iteration 2 project, homepage, and ticker views', async ({ page }, testInfo) => {
  const screenshot = (name: string) => testInfo.outputPath(`screenshots/${name}.png`);
  const loadImages = async () => {
    await page.locator('img').evaluateAll((images) => images.forEach((image) => {
      if (image instanceof HTMLImageElement) image.loading = 'eager';
    }));
    await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0));
  };

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/projets');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('article')).toHaveCount(6);
  await expect(page.locator('article h2')).toHaveText(
    projectIds.map((slug) => frMessages.projects.cards[slug].title)
  );
  await loadImages();
  await page.screenshot({ path: screenshot('projects-fr-desktop'), fullPage: true });

  await page.goto('/');
  await expect(page.locator('article')).toHaveCount(3);
  const heroMotion = page.locator('section[aria-labelledby="hero-heading"] div.mx-auto > div');
  await expect(heroMotion.nth(0)).toHaveCSS('opacity', '1');
  await expect(heroMotion.nth(1)).toHaveCSS('opacity', '1');
  await loadImages();
  await page.screenshot({ path: screenshot('home-fr-desktop'), fullPage: true });
  const ticker = page.getByRole('region', { name: frMessages.home.skills.sectionLabel });
  await expect(ticker.getByRole('button')).toHaveCount(23);
  const tickerBounds = await ticker.boundingBox();
  const skillBounds = await ticker.getByRole('button').evaluateAll((skills) =>
    skills.map((skill) => {
      const bounds = skill.getBoundingClientRect();
      return { left: bounds.left, right: bounds.right };
    })
  );
  expect(skillBounds.every(({ left, right }) => left >= tickerBounds!.x && right <= tickerBounds!.x + tickerBounds!.width)).toBe(true);
  await expect.poll(() => ticker.locator('.skills-ticker__row--first:visible').evaluate((row) => getComputedStyle(row).backgroundColor))
    .not.toBe('rgba(0, 0, 0, 0)');
  await ticker.screenshot({ path: screenshot('skills-ticker') });

  for (const site of locales) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(site.projects);
    await expect(page.locator('article')).toHaveCount(6);
    await expect(page.locator('article h2')).toHaveText(
      projectIds.map((slug) => site.messages.projects.cards[slug].title)
    );
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const firstCardTop = await page.locator('article').first().evaluate((card) => card.getBoundingClientRect().top);
    expect(firstCardTop, 'first project card should enter the first mobile viewport').toBeLessThan(844);
    await loadImages();
    await page.screenshot({ path: screenshot(`projects-${site.locale}-mobile`), fullPage: true });
  }

  await page.goto('/');
  const mobileHeroMotion = page.locator('section[aria-labelledby="hero-heading"] div.mx-auto > div');
  await expect(mobileHeroMotion.nth(0)).toHaveCSS('opacity', '1');
  await expect(mobileHeroMotion.nth(1)).toHaveCSS('opacity', '1');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await loadImages();
  await page.screenshot({ path: screenshot('home-fr-mobile'), fullPage: true });
});

test('skills ticker moves slowly, pauses for pointer and keyboard, and supports reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const ticker = page.getByRole('region', { name: frMessages.home.skills.sectionLabel });
  const tracks = ticker.locator('.skills-ticker__row:visible');
  await expect(tracks).toHaveCount(2);

  const motion = await Promise.all([
    tracks.nth(0).evaluate((row) => {
      const style = getComputedStyle(row);
      return { duration: Number.parseFloat(style.animationDuration), delay: Number.parseFloat(style.animationDelay) };
    }),
    tracks.nth(1).evaluate((row) => {
      const style = getComputedStyle(row);
      return { duration: Number.parseFloat(style.animationDuration), delay: Number.parseFloat(style.animationDelay) };
    }),
  ]);
  expect(motion.map(({ duration }) => duration)).toEqual([18, 18]);
  expect(motion.map(({ delay }) => delay)).toEqual([0, -9]);

  const firstSkill = ticker.getByRole('button').first();
  await firstSkill.hover();
  await expect.poll(() => tracks.first().evaluate((track) => getComputedStyle(track).animationPlayState)).toBe('paused');

  await page.mouse.move(100, 100);
  await firstSkill.focus();
  await expect(firstSkill).toBeFocused();
  await expect.poll(() => tracks.first().evaluate((track) => getComputedStyle(track).animationPlayState)).toBe('paused');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/skill=python/);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const reducedTrack = page.locator('.skills-ticker__row:visible').first();
  await expect.poll(() => reducedTrack.evaluate((track) => getComputedStyle(track).animationName)).toBe('none');
  await page.getByRole('region', { name: frMessages.home.skills.sectionLabel }).getByRole('button').first().click();
  await expect(page).toHaveURL(/skill=python/);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const mobileTicker = page.getByRole('region', { name: frMessages.home.skills.sectionLabel });
  await expect(mobileTicker.getByRole('button')).toHaveCount(15);
  const moreSkills = mobileTicker.locator('details');
  await expect(moreSkills).not.toHaveAttribute('open', '');
  await moreSkills.locator('summary').click();
  await expect(mobileTicker.getByRole('button')).toHaveCount(23);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

for (const site of locales) {
  test(`${site.locale}: compact mobile project filters preserve unrelated query parameters`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${site.projects}?campaign=iteration-2`);

    await page.getByRole('button', {
      name: site.messages.projects.categories['web-si'],
      exact: true,
    }).click();
    await expect(page).toHaveURL(/category=web-si/);
    expect(new URL(page.url()).searchParams.get('campaign')).toBe('iteration-2');
    await expect(page.locator('article h2')).toHaveCount(4);

    const skillsDisclosure = page.locator('details').first();
    await expect(skillsDisclosure).not.toHaveAttribute('open', '');
    await skillsDisclosure.locator('summary').click();
    const skillGroup = page.getByRole('group', { name: site.messages.projects.filters.skillGroup });
    await skillGroup.getByRole('button', { name: 'Flask', exact: true }).click();
    await expect(page).toHaveURL(/category=web-si.*skill=flask|skill=flask.*category=web-si/);
    expect(new URL(page.url()).searchParams.get('campaign')).toBe('iteration-2');
    await expect(page.locator('article h2')).toHaveCount(3);

    await page.getByRole('button', { name: site.messages.projects.filters.reset, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${site.projects.replaceAll('/', '\\/')}\\?campaign=iteration-2$`));
    expect(new URL(page.url()).searchParams.get('category')).toBeNull();
    expect(new URL(page.url()).searchParams.get('skill')).toBeNull();
    await expect(page.locator('article h2')).toHaveCount(6);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}
