import { expect, test } from '@playwright/test';

test.use({ screenshot: 'off', trace: 'off', video: 'off' });

const certificates = [
  {
    id: 'data-manipulation-in-sql',
    title: 'Data Manipulation in SQL',
    documentPath: '/certifications/data-manipulation-in-sql.pdf',
    contentType: 'application/pdf',
    verificationUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/course/72044b6d512760b656a89468ba3b56b0a2a62cbe',
  },
  {
    id: 'joining-data-in-sql',
    title: 'Joining Data in SQL',
    documentPath: '/certifications/joining-data-in-sql.jpg',
    contentType: 'image/jpeg',
    verificationUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/course/b31eb55198673c224989cf0c237e2091e8476256',
  },
  {
    id: 'postgresql-summary-stats-and-window-functions',
    title: 'PostgreSQL Summary Stats and Window Functions',
    documentPath:
      '/certifications/postgresql-summary-stats-and-window-functions.pdf',
    contentType: 'application/pdf',
    verificationUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/course/a8581ffc6aa57074497f5573be0f77b0994d6896',
  },
  {
    id: 'functions-for-manipulating-data-in-postgresql',
    title: 'Functions for Manipulating Data in PostgreSQL',
    reference: '50,476,062',
    documentPath:
      '/certifications/functions-for-manipulating-data-in-postgresql.pdf',
    contentType: 'application/pdf',
    verificationUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/course/9e7a7d3f048248ad5a5a672d2fcc0600835b229d',
  },
  {
    id: 'intermediate-sql',
    title: 'Intermediate SQL',
    documentPath: '/certifications/intermediate-sql.jpg',
    contentType: 'image/jpeg',
    verificationUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/course/3cd15ce257c58033f33f0ffeb35bda310c4d48d0',
  },
  {
    id: 'introduction-to-statistics',
    title: 'Introduction to Statistics',
    completedOn: '2026-10-22',
    reference: '50,503,580',
    documentPath: '/certifications/introduction-to-statistics.pdf',
    contentType: 'application/pdf',
    verificationUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/course/b74cbda6c327863acc461a0d1d0cd99dfe61c949',
  },
  {
    id: 'introduction-to-sql',
    title: 'Introduction to SQL',
    documentPath: '/certifications/introduction-to-sql.jpg',
    contentType: 'image/jpeg',
    verificationUrl: null,
  },
  {
    id: 'exploratory-data-analysis-in-sql',
    title: 'Exploratory Data Analysis in SQL',
    completedOn: '2026-10-27',
    reference: '50,562,081',
    documentPath: '/certifications/exploratory-data-analysis-in-sql.pdf',
    contentType: 'application/pdf',
    verificationUrl:
      'https://www.datacamp.com/statement-of-accomplishment/course/12c271d164bb6d6dc0000ef38e34a4dfdeda7d5e?raw=1',
  },
];

test('eight certifications and their available completion evidence appear in French and English', async ({
  page,
  request,
}) => {
  test.setTimeout(60_000);
  for (const site of [
    {
      path: '/',
      listPath: '/certifications',
      locale: 'fr',
      sectionName: 'Certifications',
      navigationLinkName: 'Certifications',
      featuredCountText: '3 mis en avant sur 8',
      listCountText: '8 certifications répertoriées',
      filterGroup: 'Filtrer les certifications par domaine',
      filterAll: 'Tout',
      filterSql: 'SQL',
      filterStatistics: 'Statistiques',
      sqlCountText: '7 certifications répertoriées',
      statisticsCountText: '1 certification répertoriée',
      navigationLabel: 'Navigation principale',
      backText: 'Retour aux certifications',
      detailPath: (id: string) => `/certifications/${id}`,
      topicsHeading: 'Notions étudiées',
      overviewFragment: 'Cours',
      noCertificateText:
        'Aucune copie locale de l’attestation n’est disponible. Le lien de vérification ci-dessous permet de la consulter sur DataCamp.',
    },
    {
      path: '/en',
      listPath: '/en/certifications',
      locale: 'en',
      sectionName: 'Certifications',
      navigationLinkName: 'Certifications',
      featuredCountText: '3 featured out of 8',
      listCountText: '8 certifications listed',
      filterGroup: 'Filter certifications by subject',
      filterAll: 'All',
      filterSql: 'SQL',
      filterStatistics: 'Statistics',
      sqlCountText: '7 certifications listed',
      statisticsCountText: '1 certification listed',
      navigationLabel: 'Main navigation',
      backText: 'Back to certifications',
      detailPath: (id: string) => `/en/certifications/${id}`,
      topicsHeading: 'Topics studied',
      overviewFragment: 'intermediate',
      noCertificateText:
        'No local copy of the completion certificate is available. Use the verification link below to view it on DataCamp.',
    },
  ]) {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(site.path, { waitUntil: 'networkidle' });

    const section = page.getByRole('region', { name: site.sectionName });
    await expect(page.locator('html')).toHaveAttribute('lang', site.locale);
    await expect(section).toBeVisible();
    await expect(section).toContainText(site.featuredCountText);
    await expect(section.locator('[data-certification-id]')).toHaveCount(3);
    await expect(
      section.getByRole('group', { name: site.filterGroup })
    ).toHaveCount(0);
    await expect(
      section.locator('[data-certification-id]').first()
    ).toHaveAttribute('data-certification-rank', '1');
    await expect(
      section.locator('[data-certifications-all-link]')
    ).toHaveAttribute('href', site.listPath);
    const featuredIds = await section
      .locator('[data-certification-id]')
      .evaluateAll((cards) =>
        cards.map((card) => card.getAttribute('data-certification-id'))
      );
    expect(featuredIds).toEqual(certificates.slice(0, 3).map(({ id }) => id));

    await page.goto(site.listPath, { waitUntil: 'networkidle' });
    const fullSection = page.getByRole('region', { name: site.sectionName });
    await expect(fullSection.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(
      page
        .getByRole('navigation', { name: site.navigationLabel })
        .getByRole('link', { name: site.navigationLinkName })
    ).toHaveAttribute('href', site.listPath);
    await expect(fullSection).toContainText(site.listCountText);
    await expect(fullSection.locator('[data-certification-id]')).toHaveCount(8);
    const filters = fullSection.getByRole('group', { name: site.filterGroup });
    const allFilter = filters.getByRole('button', { name: site.filterAll });
    const sqlFilter = filters.getByRole('button', { name: site.filterSql });
    const statisticsFilter = filters.getByRole('button', {
      name: site.filterStatistics,
    });
    await expect(allFilter).toHaveAttribute('aria-pressed', 'true');
    await sqlFilter.click();
    await expect(sqlFilter).toHaveAttribute('aria-pressed', 'true');
    await expect(fullSection).toContainText(site.sqlCountText);
    await expect(fullSection.locator('[data-certification-id]')).toHaveCount(7);
    await expect(
      fullSection.locator('[data-certification-category="statistics"]')
    ).toHaveCount(0);
    await statisticsFilter.click();
    await expect(fullSection).toContainText(site.statisticsCountText);
    await expect(fullSection.locator('[data-certification-id]')).toHaveCount(1);
    await expect(
      fullSection.locator('[data-certification-category="statistics"]')
    ).toHaveAttribute('data-certification-id', 'introduction-to-statistics');
    await allFilter.click();
    await expect(allFilter).toHaveAttribute('aria-pressed', 'true');
    await expect(fullSection).toContainText(site.listCountText);
    await expect(fullSection.locator('[data-certification-id]')).toHaveCount(8);
    await expect(fullSection.locator('[data-certification-document]')).toHaveCount(8);
    await expect(fullSection.locator('[data-certification-verification]')).toHaveCount(7);
    const cardsGrid = fullSection.locator('[data-certifications-grid]');
    const desktopColumns = await cardsGrid.evaluate((element) =>
      getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/).length
    );
    expect(desktopColumns).toBe(3);

    for (const [index, certificate] of certificates.entries()) {
      const card = fullSection.locator(
        `[data-certification-id="${certificate.id}"]`
      );
      await expect(card).toHaveAttribute(
        'data-certification-rank',
        String(index + 1)
      );
      await expect(card.getByRole('heading', { name: certificate.title })).toBeVisible();
      await expect(card.getByText('DataCamp', { exact: true })).toBeVisible();
      if (certificate.completedOn) {
        const completedDate = new Intl.DateTimeFormat(
          site.locale === 'fr' ? 'fr-FR' : 'en-US',
          { day: 'numeric', month: 'short', timeZone: 'UTC', year: 'numeric' }
        ).format(new Date(`${certificate.completedOn}T00:00:00Z`));
        await expect(card).toContainText(completedDate);
      }

      const titleLink = card.locator('[data-certification-title]');
      await expect(titleLink).toHaveAttribute(
        'href',
        site.detailPath(certificate.id)
      );
      await expect(card.locator('[data-certification-details]')).toHaveAttribute(
        'href',
        site.detailPath(certificate.id)
      );

      const documentLink = card.locator('[data-certification-document]');
      if (certificate.documentPath) {
        await expect(documentLink).toHaveAttribute(
          'href',
          certificate.documentPath
        );
        await expect(documentLink).toHaveAttribute('target', '_blank');

        const documentResponse = await request.get(
          new URL(certificate.documentPath, page.url()).toString()
        );
        expect(documentResponse.status()).toBe(200);
        expect(documentResponse.headers()['content-type']).toContain(
          certificate.contentType
        );
      } else {
        await expect(documentLink).toHaveCount(0);
      }

      const verificationLink = card.locator(
        '[data-certification-verification]'
      );
      if (certificate.verificationUrl) {
        await expect(verificationLink).toHaveAttribute(
          'href',
          certificate.verificationUrl
        );
        await expect(verificationLink).toHaveAttribute('target', '_blank');
      } else {
        await expect(verificationLink).toHaveCount(0);
      }

    }

    const detailChecks =
      site.locale === 'fr' ? certificates : [certificates[0]];
    for (const certificate of detailChecks) {
      const detailResponse = await page.goto(site.detailPath(certificate.id));
      expect(detailResponse?.status()).toBe(200);
      const detailPage = page.locator('[data-certification-detail]');
      await expect(
        detailPage.getByRole('heading', { name: certificate.title, level: 1 })
      ).toBeVisible();
      await expect(
        detailPage.getByRole('heading', { name: site.topicsHeading })
      ).toBeVisible();
      await expect(
        detailPage.getByRole('link', { name: site.backText })
      ).toHaveAttribute('href', site.listPath);
      await expect(detailPage.locator('header')).toContainText(
        site.overviewFragment
      );

      if (certificate.reference) {
        await expect(detailPage.locator('header dl')).toContainText(
          certificate.reference
        );
      }

      if (certificate.documentPath) {
        await expect(
          detailPage.locator(`a[href="${certificate.documentPath}"]`).last()
        )
          .toHaveAttribute('href', certificate.documentPath);
        await expect(
          detailPage.locator(`a[href="${certificate.documentPath}"]`).last()
        ).toHaveAttribute('target', '_blank');
      } else {
        await expect(detailPage).toContainText(site.noCertificateText);
        await expect(detailPage.locator('header dl dd')).toHaveCount(
          Number(Boolean(certificate.completedOn))
        );
      }

      if (certificate.verificationUrl) {
        await expect(
          detailPage.locator('a[href^="https://www.datacamp.com/"]')
        ).toHaveAttribute('href', certificate.verificationUrl);
      }
    }

    await page.goto(site.path);
    const homeSection = page.getByRole('region', { name: site.sectionName });
    await expect(homeSection).toBeVisible();
    await expect(section).toBeVisible();

    const mobileWidth = 390;
    await page.setViewportSize({ width: mobileWidth, height: 844 });
    const mobileColumns = await cardsGrid.evaluate((element) =>
      getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/).length
    );
    expect(mobileColumns).toBe(1);
    const sectionWidth = await homeSection.evaluate(
      (element) => element.scrollWidth <= element.clientWidth
    );
    expect(sectionWidth).toBe(true);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    const transitionProperty = await homeSection
      .locator('[data-certification-id]')
      .first()
      .evaluate((element) => getComputedStyle(element).transitionProperty);
    expect(transitionProperty).toBe('none');
  }
});

test('certification detail language switching preserves its course route', async ({
  page,
}) => {
  await page.goto('/certifications/introduction-to-statistics');
  await page
    .getByRole('banner')
    .getByRole('button', { name: 'Passer en anglais' })
    .click();

  await expect(page).toHaveURL(
    /\/en\/certifications\/introduction-to-statistics$/
  );
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(
    page.getByRole('heading', { name: 'Topics studied' })
  ).toBeVisible();
});

test('certification list language switching preserves the list route', async ({
  page,
}) => {
  await page.goto('/certifications');
  await page
    .getByRole('banner')
    .getByRole('button', { name: 'Passer en anglais' })
    .click();

  await expect(page).toHaveURL(/\/en\/certifications$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(
    page.getByRole('heading', { name: 'Certifications', level: 1 })
  ).toBeVisible();
  await expect(page.locator('[data-certification-id]')).toHaveCount(8);
});

test('unknown certification slugs return not found', async ({ page }) => {
  const response = await page.goto('/certifications/not-a-real-course');

  expect(response?.status()).toBe(404);
  await expect(page.locator('[data-certification-detail]')).toHaveCount(0);
});
