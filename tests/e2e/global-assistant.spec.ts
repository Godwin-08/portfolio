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
    await expect(dialog.getByText('Parcours académique')).toBeVisible();
    await expect(dialog.getByText('Projets SQL')).toBeVisible();
    await expect(dialog.getByText('Projets clés')).toBeVisible();
    await expect(dialog.getByText('Certifications DataCamp')).toBeVisible();

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
    await expect(dialog.getByText('Education')).toBeVisible();
    await expect(dialog.getByText('SQL projects')).toBeVisible();

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
    const eduBtn = dialog.getByRole('button', { name: /Quel est le parcours académique de Godwin \?/i });
    await eduBtn.click();

    // The answer is presented as conversational prose without a section heading.
    await expect(dialog.getByText(/Le parcours comprend l’ENSA Khouribga et un DEUG en sciences/i)).toBeVisible({ timeout: 15000 });
    await expect(dialog.locator('.rounded-br-sm')).toHaveText('Quel est le parcours académique de Godwin ?');
    await expect(dialog.locator('.rounded-tl-sm')).toContainText(/Le parcours comprend l’ENSA Khouribga/i);
    await expect(
      dialog.getByRole('group', { name: 'Pour continuer :' })
        .getByRole('button', { name: 'Quelles compétences développe cette formation ?' })
    ).toBeVisible();
    await expect(dialog.getByText(/Réponse synthétique vérifiée/i)).toHaveCount(0);
    await expect(dialog.getByText(/ENSA Khouribga/i).first()).toBeVisible({ timeout: 15000 });
    await expect(dialog.getByText(/DEUG/i).first()).toBeVisible({ timeout: 15000 });
  });

  test('keeps follow-up messages within a conversation and resets after closing it', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Explorer avec l'IA/i }).click();

    const dialog = page.getByRole('dialog');
    const input = dialog.getByRole('textbox');
    const send = dialog.getByRole('button', { name: 'Envoyer' });

    await input.fill('SQL');
    await send.click();
    await expect(dialog.getByText(/GTM documente la modélisation SQL/i)).toBeVisible();
    await expect(input).toHaveValue('');

    const suggestions = dialog.getByRole('group', { name: 'Pour continuer :' });
    await expect(
      suggestions.getByRole('button', { name: 'Quels sont ses résultats ?' })
    ).toBeVisible();
    await suggestions.getByRole('button', { name: 'Quels sont ses résultats ?' }).click();

    await expect(dialog.getByText(/GTM suit des indicateurs de gestion des formations/i)).toBeVisible();
    await expect(dialog.locator('.rounded-br-sm')).toHaveText([
      'SQL',
      'Quels sont ses résultats ?',
    ]);
    await expect(dialog.getByText(/GTM documente la modélisation SQL/i)).toBeVisible();
    await expect(dialog.locator('.rounded-tl-sm')).toHaveCount(2);
    expect(aiMock.conversationHistories[1]).toEqual([
      { query: 'SQL', documentIds: ['proj-gtm'] },
    ]);

    await dialog.getByRole('button', { name: /Fermer l'assistant/i }).click();
    await page.getByRole('button', { name: /Explorer avec l'IA/i }).click();
    await expect(dialog.locator('.rounded-br-sm')).toHaveCount(0);
    await expect(dialog.getByRole('group', { name: /Questions fréquentes|Pour commencer/i })).toBeVisible();
  });

  test('should present the English answer as a natural paragraph', async ({ page }) => {
    await page.goto('/en');
    await page.getByRole('button', { name: /Explore with AI/i }).click();

    const dialog = page.getByRole('dialog');
    await dialog.getByRole('textbox').fill('academic background');
    await dialog.getByRole('button', { name: 'Send' }).click();

    await expect(
      dialog.getByText(/The academic background includes ENSA Khouribga and a DEUG in science/i)
    ).toBeVisible({ timeout: 15000 });
    await expect(dialog.getByText(/Summary answer/i)).toHaveCount(0);
  });

  test('should present project comparison as prose with inline project links', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /Explorer avec l'IA/i }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    await dialog.getByRole('textbox').fill('différence GTM SantéScolaire');
    await dialog.getByRole('button', { name: 'Envoyer' }).click();

    // Verify comparison answer and inline project links.
    await expect(dialog.getByText(/GTM a été réalisé en stage chez Galaxy Solutions/i)).toBeVisible({ timeout: 15000 });
    await expect(dialog.getByText(/Galaxy Solutions/i).first()).toBeVisible({ timeout: 15000 });
    await expect(dialog.getByText(/SantéScolaire/i).first()).toBeVisible({ timeout: 15000 });
    await expect(dialog.getByRole('link', { name: /GTM — Galaxy Training Manager/i })).toBeVisible();
    await expect(dialog.getByRole('link', { name: 'SantéScolaire' })).toBeVisible();
  });

  test('should suggest and submit contextual follow-up questions in English', async ({ page }) => {
    await page.goto('/en');
    await page.getByRole('button', { name: /Explore with AI/i }).click();

    const dialog = page.getByRole('dialog');
    const input = dialog.getByRole('textbox');
    await input.fill('SQL');
    await dialog.getByRole('button', { name: 'Send' }).click();

    const suggestions = dialog.getByRole('group', { name: 'Keep exploring:' });
    const resultsQuestion = suggestions.getByRole('button', { name: 'What were its results?' });
    await expect(resultsQuestion).toBeVisible();
    await resultsQuestion.click();

    await expect(dialog.locator('.rounded-br-sm')).toHaveText(['SQL', 'What were its results?']);
    await expect(dialog.getByText(/GTM tracks training management indicators/i)).toBeVisible();
    expect(aiMock.conversationHistories[1]).toEqual([
      { query: 'SQL', documentIds: ['proj-gtm'] },
    ]);
  });

  test('should keep project evidence focused and group repeated explanations', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Explorer avec l'IA/i }).click();

    const dialog = page.getByRole('dialog');
    await dialog.getByRole('textbox').fill('Quels projets démontrent ses compétences en SQL ?');
    await dialog.getByRole('button', { name: 'Envoyer' }).click();

    const result = dialog.locator('.rounded-tl-sm').last();
    await expect(result.getByText('Les projets documentent des pratiques SQL.')).toHaveCount(1);
    await expect(result.getByRole('link', { name: /GTM — Galaxy Training Manager/i })).toBeVisible();
    await expect(result.getByRole('link', { name: 'SantéScolaire' })).toBeVisible();
    await expect(result.getByText(/en cours d’apprentissage|currently being learned/i)).toHaveCount(0);
    await expect(result.getByText(/modèles prédictifs avancés|advanced predictive models/i)).toHaveCount(0);
    await expect(result.getByText(/does not answer the SQL question/i)).toHaveCount(0);
  });

  test('should present learning information as a paragraph', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /Explorer avec l'IA/i }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    await dialog.getByRole('textbox').fill('Data Engineering in progress');
    await dialog.getByRole('button', { name: 'Envoyer' }).click();

    // Verify the learning information is shown as a paragraph without a section heading.
    await expect(dialog.getByText(/Axe de progression travaillé à l’ENSA Khouribga/i)).toBeVisible({ timeout: 15000 });
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
    await dialog.getByRole('button', { name: 'Envoyer' }).click();

    // Zero match
    await expect(dialog.getByText(/Aucun projet documenté ne correspond à cette compétence/i)).toBeVisible({ timeout: 15000 });
  });

  test('should display a localized error when the matching service is unavailable', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Explorer avec l'IA/i }).click();
    const dialog = page.getByRole('dialog');
    await dialog.getByRole('textbox', { name: /Explorer avec l'IA/i }).fill('service unavailable');
    await dialog.getByRole('button', { name: 'Envoyer' }).click();

    await expect(dialog.getByRole('alert')).toContainText(/Impossible de traiter la requête/i);
    expect(aiMock.requests).toEqual([{ query: 'service unavailable', locale: 'fr' }]);
  });

  test('preserves earlier messages after a failed search and a successful retry', async ({ page }) => {
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
    const submit = dialog.getByRole('button', { name: 'Envoyer' });
    const previousAnswer = dialog.getByText(/GTM documente la mod/i);

    await input.fill('SQL');
    await submit.click();
    await expect(previousAnswer).toBeVisible();

    await input.fill('service unavailable');
    await submit.click();
    await expect(dialog.getByText(/Je prépare une réponse/i).first()).toBeVisible();
    await expect(previousAnswer).toBeVisible();
    await expect(dialog.getByRole('alert')).toContainText(/Impossible de traiter la requ/i);
    await expect(dialog.getByRole('alert')).toHaveCount(1);

    await input.fill('SQL');
    await submit.click();
    await expect(dialog.getByRole('alert')).toHaveCount(1);
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
    expect(position.bottom).toBeLessThanOrEqual(32);

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

  test('should keep mocked local-search results readable in dark mode', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('portfolio-theme', 'dark');
    });
    await page.goto('/');

    await page.getByRole('button', { name: /Explorer avec l'IA/i }).click();
    const dialog = page.getByRole('dialog');
    await dialog.getByRole('textbox', { name: /Explorer avec l'IA/i }).fill('SQL');
    await dialog.getByRole('button', { name: 'Envoyer' }).click();

    await expect(dialog.getByText('GTM documente la modélisation SQL et des indicateurs métier.')).toBeVisible();
    const resultCard = dialog.locator('.rounded-tl-sm');
    await expect(resultCard).toBeVisible();
    await expect(resultCard).not.toHaveCSS('background-color', 'rgb(255, 255, 255)');
  });

  for (const localeCase of [
    {
      locale: 'French',
      home: '/',
      trigger: "Explorer avec l'IA",
      privacyNotice: /Cloudflare Workers AI/i,
      fallbackNotice: /moteur local de secours par mots-clés/i,
      query: 'SQL et indicateurs',
      resultMode: 'Recherche locale de secours',
    },
    {
      locale: 'English',
      home: '/en',
      trigger: 'Explore with AI',
      privacyNotice: /Cloudflare Workers AI/i,
      fallbackNotice: /local keyword-search fallback/i,
      query: 'SQL dashboards',
      resultMode: 'Local fallback search',
    },
  ]) {
    test(`explains Cloudflare AI and local fallback (${localeCase.locale})`, async ({ page }) => {
      await page.goto(localeCase.home);
      await page.getByRole('button', { name: localeCase.trigger }).click();
      const dialog = page.getByRole('dialog');
      await expect(dialog.getByText(localeCase.privacyNotice)).toBeVisible();
      await dialog.getByRole('textbox', { name: localeCase.trigger }).fill(localeCase.query);
      await dialog.getByRole('button', { name: localeCase.locale === 'French' ? 'Envoyer' : 'Send' }).click();
      await expect(dialog.getByText(localeCase.resultMode)).toBeVisible();
      await expect(dialog.getByText(localeCase.fallbackNotice)).toBeVisible();
    });
  }

  for (const localeCase of [
    { locale: 'French', home: '/', localizedPage: '/certifications/introduction-to-sql' },
    { locale: 'English', home: '/en', localizedPage: '/en/certifications/introduction-to-sql' },
  ]) {
    test(`keeps public assets and certification routes correct in the assistant (${localeCase.locale})`, async ({ page }) => {
      await page.goto(localeCase.home);
      await page.getByRole('button', { name: /Explorer avec l'IA|Explore with AI/i }).click();

      const dialog = page.getByRole('dialog');
      await dialog.getByRole('textbox').fill('asset link regression');
      await dialog.locator('form button[type="submit"]').click();
      await expect(dialog.getByText('Static asset and localized route regression fixture.')).toBeVisible();

      await expect(dialog.locator('a[href="/certifications/introduction-to-sql.jpg"]')).toHaveCount(1);
      await expect(dialog.locator('a[href="' + localeCase.localizedPage + '"]')).toHaveCount(1);
      await expect(dialog.locator('a[href="/en/certifications/introduction-to-sql.jpg"]')).toHaveCount(0);
    });
  }

  test('links to the approved CV from the English homepage', async ({ page }) => {
    await page.goto('/en');
    const heroCvLink = page.locator('section[aria-labelledby="hero-heading"]').getByRole('link', { name: /View my CV/i });
    const footerCvLink = page.locator('footer').getByRole('link', { name: /View my CV/i });
    await expect(heroCvLink).toBeVisible();
    await expect(footerCvLink).toBeVisible();
    await expect(footerCvLink).toHaveAttribute('href', '/cv/CV_Godwin_Nougbolo.pdf');
    await expect(footerCvLink).toHaveAttribute('target', '_blank');

    const response = await page.request.get('/cv/CV_Godwin_Nougbolo.pdf');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/pdf');
  });
});
