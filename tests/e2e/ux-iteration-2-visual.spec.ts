import { expect, test } from '@playwright/test';
import frMessages from '../../messages/fr.json';
import enMessages from '../../messages/en.json';

const projectIds = ['gtm', 'olist', 'afc', 'acp', 'revision-flow', 'novastore', 'sante-scolaire', 'pneumonia-detection'] as const;
const locales = [
  { locale: 'fr', projects: '/projets', messages: frMessages },
  { locale: 'en', projects: '/en/projects', messages: enMessages },
] as const;

test('captures iteration 2 project, homepage, and skill category views', async ({ page }, testInfo) => {
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
  await expect(page.locator('article')).toHaveCount(8);
  await expect(page.locator('article h2')).toHaveText(
    projectIds.map((slug) => frMessages.projects.cards[slug].title)
  );
  await loadImages();
  await page.screenshot({ path: screenshot('projects-fr-desktop'), fullPage: true });

  await page.goto('/');
  const featuredProjectCards = page.locator(
    'section[aria-labelledby="projects-heading"] article.project-card'
  );
  await expect(featuredProjectCards).toHaveCount(4);
  const heroMotion = page.locator('section[aria-labelledby="hero-heading"] div.mx-auto > div');
  await expect(heroMotion.nth(0)).toHaveCSS('opacity', '1');
  await expect(heroMotion.nth(1)).toHaveCSS('opacity', '1');
  await loadImages();
  await page.screenshot({ path: screenshot('home-fr-desktop'), fullPage: true });
  const skillsSection = page.getByRole('region', { name: frMessages.home.skills.sectionLabel });
  const skillButtons = skillsSection.locator('[data-skill-id]');
  await expect(skillButtons).toHaveCount(24);
  await expect(skillsSection.locator('[data-skill-category]')).toHaveCount(5);
  const sectionBounds = await skillsSection.boundingBox();
  const skillBounds = await skillButtons.evaluateAll((skills) =>
    skills.map((skill) => {
      const bounds = skill.getBoundingClientRect();
      return { left: bounds.left, right: bounds.right };
    })
  );
  expect(skillBounds.every(({ left, right }) => left >= sectionBounds!.x && right <= sectionBounds!.x + sectionBounds!.width)).toBe(true);
  await skillsSection.screenshot({ path: screenshot('skills-categories') });

  for (const site of locales) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(site.projects);
    await expect(page.locator('article')).toHaveCount(8);
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

test('skills categories are static, accessible, and filter projects on mobile and desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const skillsSection = page.getByRole('region', { name: frMessages.home.skills.sectionLabel });
  await expect(skillsSection.locator('[data-skill-category]')).toHaveCount(5);
  await expect(skillsSection.locator('[data-skill-id]')).toHaveCount(24);
  await expect(skillsSection.locator('[data-skill-id]').first()).not.toHaveCSS('animation-name', 'skills-row-emphasis');

  const pythonSkill = skillsSection.locator('[data-skill-id="python"]');
  await pythonSkill.focus();
  await expect(pythonSkill).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/skill=python/);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('region', { name: frMessages.home.skills.sectionLabel })
    .locator('[data-skill-category]')).toHaveCount(5);
  const reducedPythonSkill = page.locator('.skills-ticker [data-skill-id="python"]');
  await reducedPythonSkill.click();
  await expect(page).toHaveURL(/skill=python/);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const mobileSkills = page.getByRole('region', { name: frMessages.home.skills.sectionLabel });
  await expect(mobileSkills.locator('[data-skill-category]')).toHaveCount(5);
  await expect(mobileSkills.locator('[data-skill-id]')).toHaveCount(24);
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
    await expect(page.locator('article h2')).toHaveCount(8);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}
