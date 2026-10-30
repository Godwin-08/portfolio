import { expect, test } from '@playwright/test';
import { installAiMatchMock } from './helpers/ai-match-mock';

test.describe('Global AI Assistant - E2E Tests', () => {
  let aiMock: Awaited<ReturnType<typeof installAiMatchMock>>;

  test.beforeEach(async ({ page }) => {
    aiMock = await installAiMatchMock(page);
  });

  test('should show FAB on homepage and open drawer on click, close with Escape', async ({ page }) => {
    await page.goto('/');

    // 1. FAB should be visible (not a navbar button anymore)
    const fab = page.getByRole('button', { name: /Explorer avec l'IA/i });
    await expect(fab).toBeVisible();

    // Drawer should not be open yet
    const dialog = page.getByRole('dialog');
    await expect(dialog).not.toBeVisible();

    // 2. Open drawer via FAB
    await fab.click();
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { name: /Explorer avec l'IA/i })).toBeVisible();

    // 3. Suggestions should be visible inside drawer
    await expect(dialog.getByText(/Quel est mon parcours académique \?/i)).toBeVisible();
    await expect(dialog.getByText(/Quels projets démontrent mes compétences en SQL \?/i)).toBeVisible();
    await expect(dialog.getByText(/Quelle différence existe entre GTM et SantéScolaire \?/i)).toBeVisible();
    await expect(dialog.getByText(/Quelles compétences sont encore en cours d'acquisition \?/i)).toBeVisible();
    await expect(dialog.getByText(/Quelles certifications sont documentées \?/i)).toBeVisible();

    // 4. Close with Escape key
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();

    // 5. FAB should reappear after closing
    await expect(fab).toBeVisible();
  });

  test('should open on English route /en and support English FAB and suggestions', async ({ page }) => {
    await page.goto('/en');

    // FAB in English
    const fab = page.getByRole('button', { name: /Explore with AI/i });
    await expect(fab).toBeVisible();
    await fab.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { name: /Explore with AI/i })).toBeVisible();

    // English suggestions
    await expect(dialog.getByText(/What is your academic background\?/i)).toBeVisible();
    await expect(dialog.getByText(/Which projects demonstrate SQL skills\?/i)).toBeVisible();

    // Close with close button
    const closeBtn = page.getByRole('button', { name: /Close assistant/i });
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
    await expect(dialog).not.toBeVisible();
  });

  test('should execute academic background suggestion and display verified direct answer', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /Explorer avec l'IA/i }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    // Click academic background suggestion
    const eduBtn = dialog.getByRole('button', { name: /Quel est mon parcours académique \?/i });
    await eduBtn.click();

    // Verify synthetic answer appears
    await expect(dialog.getByText(/Réponse synthétique vérifiée/i)).toBeVisible({ timeout: 15000 });
    await expect(dialog.getByText(/ENSA Khouribga/i).first()).toBeVisible({ timeout: 15000 });
    await expect(dialog.getByText(/DEUG/i).first()).toBeVisible({ timeout: 15000 });
  });

  test('should execute project comparison suggestion between GTM and SantéScolaire', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /Explorer avec l'IA/i }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    // Click comparison suggestion
    const compBtn = dialog.getByRole('button', { name: /Quelle différence existe entre GTM et SantéScolaire \?/i });
    await compBtn.click();

    // Verify comparison answer and project cards
    await expect(dialog.getByText(/Réponse synthétique vérifiée/i)).toBeVisible({ timeout: 15000 });
    await expect(dialog.getByText(/Galaxy Solutions/i).first()).toBeVisible({ timeout: 15000 });
    await expect(dialog.getByText(/SantéScolaire/i).first()).toBeVisible({ timeout: 15000 });
  });

  test('should execute learning in progress suggestion', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /Explorer avec l'IA/i }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    // Click learning suggestion
    const learnBtn = dialog.getByRole('button', { name: /Quelles compétences sont encore en cours d'acquisition \?/i });
    await learnBtn.click();

    // Verify growing field card
    await expect(dialog.getByText(/Axe de compétences en cours d'acquisition/i)).toBeVisible({ timeout: 15000 });
    await expect(dialog.getByText(/Data Engineering/i).first()).toBeVisible({ timeout: 15000 });
  });

  test('should display honest zero-match state on out-of-scope technology search', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /Explorer avec l'IA/i }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    // Search out of scope skill
    const input = dialog.getByRole('textbox', { name: /Explorer avec l'IA/i });
    await input.fill('Kubernetes Terraform microservices');
    await dialog.getByRole('button', { name: /Évaluer la question/i }).click();

    // Zero match
    await expect(dialog.getByText(/Aucun élément documenté ne correspond/i)).toBeVisible({ timeout: 15000 });
  });

  test('should display a localized error when the matching service is unavailable', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Explorer avec l'IA/i }).click();
    const dialog = page.getByRole('dialog');
    await dialog.getByRole('textbox', { name: /Explorer avec l'IA/i }).fill('service unavailable');
    await dialog.getByRole('button', { name: /Évaluer la question/i }).click();

    await expect(dialog.getByRole('alert')).toContainText(/Impossible de traiter la requête/i);
    expect(aiMock.requests).toEqual([{ query: 'service unavailable', locale: 'fr' }]);
  });

  test('clears an old answer after a failed search and allows a successful retry', async ({ page }) => {
    await page.route('**/api/ai/match', async (route) => {
      const request = route.request().postDataJSON() as { query?: string };
      if (request.query === 'service unavailable') {
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
      await route.fallback();
    });

    await page.goto('/');
    await page.getByRole('button', { name: /Explorer avec l'IA/i }).click();
    const dialog = page.getByRole('dialog');
    const input = dialog.getByRole('textbox', { name: /Explorer avec l'IA/i });
    const submit = dialog.getByRole('button', { name: /Évaluer la question/i });
    const previousAnswer = dialog.getByText(/GTM documente la mod/i);

    await input.fill('SQL');
    await submit.click();
    await expect(previousAnswer).toBeVisible();

    await input.fill('service unavailable');
    await submit.click();
    await expect(dialog.getByText(/Analyse en cours/i).first()).toBeVisible();
    await expect(previousAnswer).toHaveCount(0);
    await expect(dialog.getByRole('alert')).toContainText(/Impossible de traiter la requ/i);
    await expect(dialog.getByRole('alert')).toHaveCount(1);

    await input.fill('SQL');
    await submit.click();
    await expect(dialog.getByRole('alert')).toHaveCount(0);
    await expect(previousAnswer).toBeVisible();
    expect(aiMock.requests.map(({ query }) => query)).toEqual([
      'SQL',
      'service unavailable',
      'SQL',
    ]);
  });

  test('should work properly in mobile viewport without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // FAB should be visible on mobile too
    const fab = page.getByRole('button', { name: /Explorer avec l'IA/i });
    await expect(fab).toBeVisible();
    await fab.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    // Check no horizontal scrollbar on body
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
  });

  test('should keep the FAB bottom-right and restore focus after closing a dark drawer', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('portfolio-theme', 'dark');
    });
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const fab = page.getByRole('button', { name: /Explorer avec l'IA/i });
    await expect(fab).toBeVisible();
    const position = await fab.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      return {
        right: window.innerWidth - bounds.right,
        bottom: window.innerHeight - bounds.bottom,
      };
    });
    expect(position.right).toBeLessThanOrEqual(16);
    expect(position.bottom).toBeLessThanOrEqual(16);

    await fab.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(dialog).not.toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(dialog.getByRole('textbox', { name: /Explorer avec l'IA/i })).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(fab).toBeFocused();
  });

  test('should keep mocked result cards readable in dark mode without calling the AI service', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('portfolio-theme', 'dark');
    });
    await page.goto('/');

    await page.getByRole('button', { name: /Explorer avec l'IA/i }).click();
    const dialog = page.getByRole('dialog');
    await dialog.getByRole('textbox', { name: /Explorer avec l'IA/i }).fill('SQL');
    await dialog.getByRole('button', { name: /Évaluer la question/i }).click();

    await expect(dialog.getByText('GTM documente la modélisation SQL et des indicateurs métier.')).toBeVisible();
    const resultCard = dialog.locator('article').first();
    await expect(resultCard).toBeVisible();
    await expect(resultCard).not.toHaveCSS('background-color', 'rgb(255, 255, 255)');
  });

  for (const localeCase of [
    { locale: 'French', home: '/', localizedPage: '/certifications/introduction-to-sql' },
    { locale: 'English', home: '/en', localizedPage: '/en/certifications/introduction-to-sql' },
  ]) {
    test(`keeps public assets and certification routes correct in the assistant (${localeCase.locale})`, async ({ page }) => {
      await page.goto(localeCase.home);
      await page.getByRole('button', { name: /Explorer avec|Explore with AI/i }).click();

      const dialog = page.getByRole('dialog');
      await dialog.getByRole('textbox').fill('asset link regression');
      await dialog.locator('form button[type="submit"]').click();
      await expect(dialog.getByText('Static asset and localized route regression fixture.')).toBeVisible();

      await expect(dialog.locator('a[href="/certifications/introduction-to-sql.jpg"]')).toHaveCount(1);
      await expect(dialog.locator('a[href="' + localeCase.localizedPage + '"]')).toHaveCount(1);
      await expect(dialog.locator('a[href="/en/certifications/introduction-to-sql.jpg"]')).toHaveCount(0);
    });
  }

  test('downloads the approved CV from the English homepage', async ({ page }) => {
    await page.goto('/en');
    const heroCvLink = page.locator('section[aria-labelledby="hero-heading"]').getByRole('link', { name: /Download my CV/i });
    const footerCvLink = page.locator('footer').getByRole('link', { name: /Download my CV/i });
    await expect(heroCvLink).toBeVisible();
    await expect(footerCvLink).toBeVisible();
    await expect(footerCvLink).toHaveAttribute('href', '/cv/CV_Godwin_Nougbolo.pdf');
    await expect(footerCvLink).toHaveAttribute('download', '');

    const downloadPromise = page.waitForEvent('download');
    await footerCvLink.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('CV_Godwin_Nougbolo.pdf');
    expect(await download.failure()).toBeNull();
  });
});
