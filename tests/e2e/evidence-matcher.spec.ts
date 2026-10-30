import { expect, test } from '@playwright/test';
import { installAiMatchMock } from './helpers/ai-match-mock';

test.describe('Evidence Matcher UI - E2E Tests', () => {
  let aiMock: Awaited<ReturnType<typeof installAiMatchMock>>;

  test.beforeEach(async ({ page }) => {
    aiMock = await installAiMatchMock(page);
  });

  test('should display the Evidence Matcher component on /projets with suggestions', async ({ page }) => {
    await page.goto('/projets');

    // Section title
    const heading = page.getByRole('heading', { name: /Evidence Matcher/i });
    await expect(heading).toBeVisible();

    // Input field
    const input = page.getByPlaceholder(/Modélisation SQL/i);
    await expect(input).toBeVisible();

    // Suggestions chips
    const sqlSuggestion = page.getByRole('button', { name: /Modélisation SQL/i });
    await expect(sqlSuggestion).toBeVisible();

    // Click suggestion
    await sqlSuggestion.click();

    // Wait for search result card to appear inside matcher
    const matcher = page.locator('section[aria-label*="Evidence Matcher"]');
    const resultCard = matcher.locator('article', { hasText: 'GTM — Galaxy Training Manager' });
    await expect(resultCard).toBeVisible({ timeout: 15000 });

    // Check match level badge
    await expect(resultCard.getByText(/Adéquation (forte|modérée)/i)).toBeVisible({ timeout: 15000 });

    // Check verified proofs and limitations are present
    await expect(resultCard.getByText(/Preuves documentées et vérifiées/i)).toBeVisible({ timeout: 15000 });
    await expect(resultCard.getByText(/Cadre & Limites transparentes/i)).toBeVisible({ timeout: 15000 });

    // Reset search
    const resetButton = page.getByRole('button', { name: /Fermer la recherche/i });
    await expect(resetButton).toBeVisible();
    await resetButton.click();

    // Results should disappear
    await expect(resultCard).not.toBeVisible();
  });

  for (const localeCase of [
    { locale: 'French', path: '/projets', localizedPage: '/certifications/introduction-to-sql' },
    { locale: 'English', path: '/en/projects', localizedPage: '/en/certifications/introduction-to-sql' },
  ]) {
    test(`keeps public assets and certification routes correct in Evidence Matcher (${localeCase.locale})`, async ({ page }) => {
      await page.goto(localeCase.path);
      const matcher = page.locator('section[aria-label*="Evidence Matcher"]');
      await matcher.getByRole('textbox').fill('asset link regression');
      await matcher.locator('form button[type="submit"]').click();
      await expect(matcher.getByText('Static asset and localized route regression fixture.')).toBeVisible();

      await expect(matcher.locator('a[href="/certifications/introduction-to-sql.jpg"]')).toHaveCount(1);
      await expect(matcher.locator('a[href="' + localeCase.localizedPage + '"]')).toHaveCount(1);
      await expect(matcher.locator('a[href="/en/certifications/introduction-to-sql.jpg"]')).toHaveCount(0);
    });
  }

  test('should work properly on English route /en/projects', async ({ page }) => {
    await page.goto('/en/projects');

    const heading = page.getByRole('heading', { name: /Evidence Matcher/i });
    await expect(heading).toBeVisible();

    // English placeholder
    const input = page.getByPlaceholder(/Relational SQL/i);
    await expect(input).toBeVisible();

    // Click English suggestion
    const sqlSuggestion = page.getByRole('button', { name: /Relational SQL & Dashboards/i });
    await expect(sqlSuggestion).toBeVisible();
    await sqlSuggestion.click();

    // Result card
    const resultCard = page.locator('article', { hasText: 'GTM — Galaxy Training Manager' });
    await expect(resultCard).toBeVisible({ timeout: 15000 });
    await expect(resultCard.getByText(/Strong match/i)).toBeVisible({ timeout: 15000 });
    await expect.poll(() => aiMock.requests).toHaveLength(1);
    expect(aiMock.requests[0].locale).toBe('en');
  });

  test('should display skills in progress banner when searching for Data Engineering', async ({ page }) => {
    await page.goto('/projets');

    const input = page.getByPlaceholder(/Modélisation SQL/i);
    await input.fill('Data Engineering pipelines');
    await page.getByRole('button', { name: /Évaluer le besoin/i }).click();

    // Growing field card
    const growingCard = page.getByRole('heading', {
      name: /Axe de compétences en cours d'acquisition/i,
    }).locator('..');
    await expect(growingCard).toBeVisible();
    await expect(growingCard.getByText(/ENSA Khouribga/i)).toBeVisible();
  });

  test('should display zero-match honest state when searching for out-of-scope skill', async ({ page }) => {
    await page.goto('/projets');

    const input = page.getByPlaceholder(/Modélisation SQL/i);
    await input.fill('Kubernetes et Docker Swarm');
    await page.getByRole('button', { name: /Évaluer le besoin/i }).click();

    await expect(page.getByText(/Aucun projet documenté ne correspond/i).first()).toBeVisible({ timeout: 15000 });
  });

  test('should display a localized error when the matching service is unavailable', async ({ page }) => {
    await page.goto('/projets');
    await page.getByPlaceholder(/Modélisation SQL/i).fill('service unavailable');
    await page.getByRole('button', { name: /Évaluer le besoin/i }).click();

    await expect(page.locator('[role="alert"]').filter({
      hasText: /Impossible de traiter la requête/i,
    })).toBeVisible();
    expect(aiMock.requests).toEqual([{ query: 'service unavailable', locale: 'fr' }]);
  });
});
