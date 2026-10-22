import { expect, test } from '@playwright/test';

test.use({ screenshot: 'off', trace: 'off', video: 'off' });

const certificates = [
  {
    id: 'introduction-to-sql',
    title: 'Introduction to SQL',
    documentPath: '/certifications/introduction-to-sql.jpg',
    contentType: 'image/jpeg',
    verificationUrl: null,
  },
  {
    id: 'intermediate-sql',
    title: 'Intermediate SQL',
    documentPath: '/certifications/intermediate-sql.jpg',
    contentType: 'image/jpeg',
    verificationUrl: null,
  },
  {
    id: 'joining-data-in-sql',
    title: 'Joining Data in SQL',
    documentPath: '/certifications/joining-data-in-sql.jpg',
    contentType: 'image/jpeg',
    verificationUrl: null,
  },
  {
    id: 'data-manipulation-in-sql',
    title: 'Data Manipulation in SQL',
    documentPath: '/certifications/data-manipulation-in-sql.pdf',
    contentType: 'application/pdf',
    verificationUrl:
      'https://www.datacamp.com/statement-of-accomplishment/course/72044b6d512760b656a89468ba3b56b0a2a62cbe?pdf=0&raw=1',
  },
  {
    id: 'postgresql-summary-stats-and-window-functions',
    title: 'PostgreSQL Summary Stats and Window Functions',
    documentPath:
      '/certifications/postgresql-summary-stats-and-window-functions.pdf',
    contentType: 'application/pdf',
    verificationUrl:
      'https://www.datacamp.com/statement-of-accomplishment/course/a8581ffc6aa57074497f5573be0f77b0994d6896?pdf=0&raw=1',
  },
  {
    id: 'functions-for-manipulating-data-in-postgresql',
    title: 'Functions for Manipulating Data in PostgreSQL',
    documentPath:
      '/certifications/functions-for-manipulating-data-in-postgresql.pdf',
    contentType: 'application/pdf',
    verificationUrl:
      'https://www.datacamp.com/statement-of-accomplishment/course/9e7a7d3f048248ad5a5a672d2fcc0600835b229d?pdf=0&raw=1',
  },
];

test('six authentic certificates and their original documents appear in French and English', async ({
  page,
  request,
}) => {
  for (const site of [
    { path: '/', locale: 'fr', countText: '6 certificats obtenus' },
    { path: '/en', locale: 'en', countText: '6 certificates completed' },
  ]) {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(site.path, { waitUntil: 'networkidle' });

    const section = page.getByRole('region', { name: 'Certifications' });
    await expect(page.locator('html')).toHaveAttribute('lang', site.locale);
    await expect(section).toBeVisible();
    await expect(section).toContainText(site.countText);
    await expect(section.locator('[data-certification-id]')).toHaveCount(6);
    await expect(section.locator('[data-certification-document]')).toHaveCount(6);
    await expect(section.locator('[data-certification-verification]')).toHaveCount(3);
    const cardsGrid = section.locator('[data-certifications-grid]');
    const desktopColumns = await cardsGrid.evaluate((element) =>
      getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/).length
    );
    expect(desktopColumns).toBe(3);

    for (const certificate of certificates) {
      const card = section.locator(
        `[data-certification-id="${certificate.id}"]`
      );
      await expect(card.getByRole('heading', { name: certificate.title })).toBeVisible();
      await expect(card.getByText('DataCamp', { exact: true })).toBeVisible();

      const documentLink = card.locator('[data-certification-document]');
      await expect(documentLink).toHaveAttribute('href', certificate.documentPath);
      await expect(documentLink).toHaveAttribute('target', '_blank');

      const verificationLink = card.locator('[data-certification-verification]');
      if (certificate.verificationUrl) {
        await expect(verificationLink).toHaveAttribute(
          'href',
          certificate.verificationUrl
        );
        await expect(verificationLink).toHaveAttribute('target', '_blank');
      } else {
        await expect(verificationLink).toHaveCount(0);
      }

      const documentResponse = await request.get(
        new URL(certificate.documentPath, page.url()).toString()
      );
      expect(documentResponse.status()).toBe(200);
      expect(documentResponse.headers()['content-type']).toContain(
        certificate.contentType
      );
    }

    const mobileWidth = 390;
    await page.setViewportSize({ width: mobileWidth, height: 844 });
    const mobileColumns = await cardsGrid.evaluate((element) =>
      getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/).length
    );
    expect(mobileColumns).toBe(1);
    const sectionWidth = await section.evaluate(
      (element) => element.scrollWidth <= element.clientWidth
    );
    expect(sectionWidth).toBe(true);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    const transitionProperty = await section
      .locator('[data-certification-id]')
      .first()
      .evaluate((element) => getComputedStyle(element).transitionProperty);
    expect(transitionProperty).toBe('none');
  }
});
