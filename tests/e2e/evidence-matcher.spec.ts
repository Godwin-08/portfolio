import { expect, test } from '@playwright/test';

test.describe('AI assistant entry points on the projects page', () => {
  for (const localeCase of [
    { path: '/projets', fabName: /Explorer avec l'IA/i },
    { path: '/en/projects', fabName: /Explore with AI/i },
  ]) {
    test(`keeps the global assistant and removes the inline matcher on ${localeCase.path}`, async ({ page }) => {
      await page.goto(localeCase.path);

      await expect(page.getByRole('heading', { name: /Evidence Matcher|Recherche de preuves par besoin|Search by Requirement/i })).toHaveCount(0);
      await expect(page.getByRole('heading', { name: /GTM — Galaxy Training Manager/i })).toBeVisible();

      const assistantButton = page.getByRole('button', { name: localeCase.fabName });
      await expect(assistantButton).toBeVisible();
      await assistantButton.click();

      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole('heading', { name: localeCase.fabName })).toBeVisible();
    });
  }
});
