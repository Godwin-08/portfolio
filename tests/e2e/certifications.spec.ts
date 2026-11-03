import { expect, test } from '@playwright/test';

test.use({ screenshot: 'off', trace: 'off', video: 'off' });

const certificates = [
  {
    id: 'data-analyst-associate',
    title: 'Data Analyst Associate',
    credentialType: 'certification',
    completedOn: '2026-11-03',
    expiresOn: '2028-11-02',
    documentPath: '/certifications/data-analyst-associate.pdf',
    contentType: 'application/pdf',
    verificationUrl: 'https://www.datacamp.com/certificate/DAA0010708616816',
  },
  {
    id: 'data-manipulation-in-sql',
    title: 'Data Manipulation in SQL',
    credentialType: 'course',
    documentPath: '/certifications/data-manipulation-in-sql.pdf',
    contentType: 'application/pdf',
    verificationUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/course/72044b6d512760b656a89468ba3b56b0a2a62cbe',
  },
  {
    id: 'joining-data-in-sql',
    title: 'Joining Data in SQL',
    credentialType: 'course',
    documentPath: '/certifications/joining-data-in-sql.jpg',
    contentType: 'image/jpeg',
    verificationUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/course/b31eb55198673c224989cf0c237e2091e8476256',
  },
  {
    id: 'postgresql-summary-stats-and-window-functions',
    title: 'PostgreSQL Summary Stats and Window Functions',
    credentialType: 'course',
    documentPath:
      '/certifications/postgresql-summary-stats-and-window-functions.pdf',
    contentType: 'application/pdf',
    verificationUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/course/a8581ffc6aa57074497f5573be0f77b0994d6896',
  },
  {
    id: 'functions-for-manipulating-data-in-postgresql',
    title: 'Functions for Manipulating Data in PostgreSQL',
    credentialType: 'course',
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
    credentialType: 'course',
    documentPath: '/certifications/intermediate-sql.jpg',
    contentType: 'image/jpeg',
    verificationUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/course/3cd15ce257c58033f33f0ffeb35bda310c4d48d0',
  },
  {
    id: 'introduction-to-statistics',
    title: 'Introduction to Statistics',
    credentialType: 'course',
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
    credentialType: 'course',
    documentPath: '/certifications/introduction-to-sql.jpg',
    contentType: 'image/jpeg',
    verificationUrl: null,
  },
  {
    id: 'exploratory-data-analysis-in-sql',
    title: 'Exploratory Data Analysis in SQL',
    credentialType: 'course',
    completedOn: '2026-10-27',
    reference: '50,562,081',
    documentPath: '/certifications/exploratory-data-analysis-in-sql.pdf',
    contentType: 'application/pdf',
    verificationUrl:
      'https://www.datacamp.com/statement-of-accomplishment/course/12c271d164bb6d6dc0000ef38e34a4dfdeda7d5e?raw=1',
  },
  {
    id: 'associate-data-analyst-in-sql',
    title: 'Associate Data Analyst in SQL',
    credentialType: 'track',
    completedOn: '2026-11-01',
    reference: '978,842',
    documentPath: '/certifications/associate-data-analyst-in-sql.pdf',
    contentType: 'application/pdf',
    verificationUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/track/792469f86f6275d924983bafc60c0de90da86477',
  },
  {
    id: 'data-communication-concepts',
    title: 'Data Communication Concepts',
    credentialType: 'course',
    completedOn: '2026-11-01',
    reference: '50,676,087',
    documentPath: '/certifications/data-communication-concepts.pdf',
    contentType: 'application/pdf',
    verificationUrl: null,
  },
  {
    id: 'understanding-data-visualization',
    title: 'Understanding Data Visualization',
    credentialType: 'course',
    completedOn: '2026-10-31',
    reference: '50,665,247',
    documentPath: '/certifications/understanding-data-visualization.pdf',
    contentType: 'application/pdf',
    verificationUrl: null,
  },
  {
    id: 'data-driven-decision-making-in-sql',
    title: 'Data-Driven Decision Making in SQL',
    credentialType: 'course',
    completedOn: '2026-10-30',
    reference: '50,652,560',
    documentPath: '/certifications/data-driven-decision-making-in-sql.pdf',
    contentType: 'application/pdf',
    verificationUrl: null,
  },
];

test('DataCamp certifications and courses show their verified records in French and English', async ({
  page,
  request,
}) => {
  test.setTimeout(120_000);
  for (const site of [
    {
      path: '/',
      listPath: '/certifications',
      locale: 'fr',
      sectionName: 'Certifications',
      navigationLinkName: 'Certifications',
      featuredCountText: 'Preuves principales : 2 sur 13',
      listCountText: '11 cours répertoriés',
      filterGroup: 'Filtrer les cours par domaine',
      filterAll: 'Tous les cours',
      filterSql: 'SQL',
      filterStatistics: 'Statistiques',
      filterDataAnalysis: 'Analyse des données',
      trackType: 'Parcours',
      certificationType: 'Certification',
      courseType: 'Cours',
      trackOverviewFragment: 'Parcours DataCamp de 39 heures',
      certificationOverviewFragment: 'Certification DataCamp Data Analyst Associate',
      includedCoursesHeading: 'Cours de ce parcours (11)',
      sqlCountText: '8 cours répertoriés',
      statisticsCountText: '1 cours répertorié',
      dataAnalysisCountText: '2 cours répertoriés',
      navigationLabel: 'Navigation principale',
      backText: 'Retour aux certifications et formations',
      detailPath: (id: string) => `/certifications/${id}`,
      topicsHeading: 'Notions étudiées',
      assessedDomainsHeading: 'Domaines de compétences évalués',
      practicalExamHeading: 'Épreuve pratique et modalités d’évaluation',
      domainAssessmentHeading: 'Évaluation de ce domaine',
      assessedDomains: [
        {
          id: 'data-management',
          title: 'Gestion des données (Data Management)',
          descriptionFragment: 'nettoyage et le traitement des données',
          assessmentFragment: 'défi pratique de codage SQL',
        },
        {
          id: 'exploratory-analysis',
          title: 'Analyse exploratoire (Exploratory Analysis)',
          descriptionFragment: 'questions métier jusqu’à une exploration plus générale',
          assessmentFragment: 'test en R ou en Python',
        },
        {
          id: 'statistical-experimentation',
          title: 'Expérimentation statistique (Statistical Experimentation)',
          descriptionFragment: 'approches statistiques pertinentes',
        },
        {
          id: 'communication-visualization',
          title: 'Communication et visualisation (Communication and Visualization)',
          descriptionFragment: 'communiquer efficacement les enseignements',
        },
      ],
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
      featuredCountText: 'Key evidence: 2 of 13',
      listCountText: '11 courses listed',
      filterGroup: 'Filter courses by subject',
      filterAll: 'All courses',
      filterSql: 'SQL',
      filterStatistics: 'Statistics',
      filterDataAnalysis: 'Data analysis',
      trackType: 'Learning path',
      certificationType: 'Certification',
      courseType: 'Course',
      trackOverviewFragment: 'Completed the 39-hour DataCamp track',
      certificationOverviewFragment: 'DataCamp Data Analyst Associate certification',
      includedCoursesHeading: 'Courses in this track (11)',
      sqlCountText: '8 courses listed',
      statisticsCountText: '1 course listed',
      dataAnalysisCountText: '2 courses listed',
      navigationLabel: 'Main navigation',
      backText: 'Back to certifications and courses',
      detailPath: (id: string) => `/en/certifications/${id}`,
      topicsHeading: 'Topics studied',
      assessedDomainsHeading: 'Competency domains assessed',
      practicalExamHeading: 'Practical exam and assessment format',
      domainAssessmentHeading: 'How this domain was assessed',
      assessedDomains: [
        {
          id: 'data-management',
          title: 'Data Management',
          descriptionFragment: 'cleaning and processing data',
          assessmentFragment: 'hands-on SQL coding challenge',
        },
        {
          id: 'exploratory-analysis',
          title: 'Exploratory Analysis',
          descriptionFragment: 'specific business questions to broader exploration',
          assessmentFragment: 'a test in either R or Python',
        },
        {
          id: 'statistical-experimentation',
          title: 'Statistical Experimentation',
          descriptionFragment: 'relevant statistical approaches to perform experiments',
        },
        {
          id: 'communication-visualization',
          title: 'Communication and Visualization',
          descriptionFragment: 'communicating insights effectively is essential',
        },
      ],
      overviewFragment: 'intermediate',
      noCertificateText:
        'No local copy of the completion certificate is available. Use the verification link below to view it on DataCamp.',
    },
  ]) {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(site.path, { waitUntil: 'networkidle' });

    const section = page.getByRole('region', {
      name: site.sectionName,
      exact: true,
    });
    await expect(page.locator('html')).toHaveAttribute('lang', site.locale);
    await expect(section).toBeVisible();
    await expect(section).toContainText(site.featuredCountText);
    await expect(section.locator('[data-certification-id]')).toHaveCount(5);
    await expect(
      section.locator('[data-certifications-zone="credentials"] [data-certification-id]')
    ).toHaveCount(2);
    await expect(
      section.locator('[data-certifications-zone="courses"] [data-certification-id]')
    ).toHaveCount(3);
    await expect(
      section.getByRole('group', { name: site.filterGroup })
    ).toHaveCount(0);
    await expect(
      section.locator('[data-certifications-zone="courses"] [data-certification-id]').first()
    ).toHaveAttribute('data-certification-rank', '1');
    await expect(
      section.locator('[data-certifications-all-link]')
    ).toHaveAttribute('href', site.listPath);
    const featuredIds = await section
      .locator('[data-certifications-zone="credentials"] [data-certification-id]')
      .evaluateAll((cards) =>
        cards.map((card) => card.getAttribute('data-certification-id'))
      );
    expect(featuredIds).toEqual([
      'data-analyst-associate',
      'associate-data-analyst-in-sql',
    ]);

    await page.goto(site.listPath, { waitUntil: 'networkidle' });
    const fullSection = page.getByRole('region', {
      name: site.sectionName,
      exact: true,
    });
    await expect(fullSection.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(
      page
        .getByRole('navigation', { name: site.navigationLabel })
        .getByRole('link', { name: site.navigationLinkName })
    ).toHaveAttribute('href', site.listPath);
    await expect(fullSection).toContainText(site.listCountText);
    await expect(fullSection.locator('[data-certification-id]')).toHaveCount(13);
    await expect(
      fullSection.locator('[data-certification-type="certification"]')
    ).toHaveCount(1);
    await expect(
      fullSection.locator('[data-certification-type="track"]')
    ).toHaveCount(1);
    await expect(
      fullSection.locator('[data-certification-type="course"]')
    ).toHaveCount(11);
    const filters = fullSection.getByRole('group', { name: site.filterGroup });
    const courseZone = fullSection.locator(
      '[data-certifications-zone="courses"]'
    );
    const allFilter = filters.getByRole('button', { name: site.filterAll });
    const sqlFilter = filters.getByRole('button', { name: site.filterSql });
    const statisticsFilter = filters.getByRole('button', {
      name: site.filterStatistics,
    });
    const dataAnalysisFilter = filters.getByRole('button', {
      name: site.filterDataAnalysis,
    });
    await expect(allFilter).toHaveAttribute('aria-pressed', 'true');
    await sqlFilter.click();
    await expect(sqlFilter).toHaveAttribute('aria-pressed', 'true');
    await expect(
      fullSection.getByText(site.sqlCountText, { exact: true })
    ).toBeVisible();
    await expect(courseZone.locator('[data-certification-id]')).toHaveCount(8);
    await expect(
      courseZone.locator('[data-certification-category="statistics"], [data-certification-category="data-analysis"]')
    ).toHaveCount(0);
    await statisticsFilter.click();
    await expect(
      fullSection.getByText(site.statisticsCountText, { exact: true })
    ).toBeVisible();
    await expect(courseZone.locator('[data-certification-id]')).toHaveCount(1);
    await expect(
      courseZone.locator('[data-certification-category="statistics"]')
    ).toHaveAttribute('data-certification-id', 'introduction-to-statistics');
    await dataAnalysisFilter.click();
    await expect(
      fullSection.getByText(site.dataAnalysisCountText, { exact: true })
    ).toBeVisible();
    await expect(courseZone.locator('[data-certification-id]')).toHaveCount(2);
    await expect(
      courseZone.locator('[data-certification-category="data-analysis"]')
    ).toHaveCount(2);
    await allFilter.click();
    await expect(allFilter).toHaveAttribute('aria-pressed', 'true');
    await expect(
      fullSection.getByText(site.listCountText, { exact: true })
    ).toBeVisible();
    await expect(courseZone.locator('[data-certification-id]')).toHaveCount(11);
    await expect(courseZone.locator('[data-certification-document]')).toHaveCount(11);
    await expect(courseZone.locator('[data-certification-verification]')).toHaveCount(7);
    await expect(fullSection.locator('[data-certification-type="track"]')).toBeVisible();
    const cardsGrid = courseZone;
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
        certificate.credentialType === 'certification'
          ? '0'
          : String(index)
      );
      await expect(card.getByRole('heading', { name: certificate.title })).toBeVisible();
      await expect(card.getByText('DataCamp', { exact: true })).toBeVisible();
      await expect(card).toHaveAttribute(
        'data-certification-type',
        certificate.credentialType
      );
      await expect(
        card.getByText(
          certificate.credentialType === 'track'
            ? site.trackType
            : certificate.credentialType === 'certification'
              ? site.certificationType
              : site.courseType,
          { exact: true }
        )
      ).toBeVisible();
      if (certificate.completedOn) {
        const completedDate = new Intl.DateTimeFormat(
          site.locale === 'fr' ? 'fr-FR' : 'en-US',
          { day: 'numeric', month: 'short', timeZone: 'UTC', year: 'numeric' }
        ).format(new Date(`${certificate.completedOn}T00:00:00Z`));
        await expect(card).toContainText(completedDate);
      }
      if (certificate.expiresOn) {
        const expirationDate = new Intl.DateTimeFormat(
          site.locale === 'fr' ? 'fr-FR' : 'en-US',
          { day: 'numeric', month: 'short', timeZone: 'UTC', year: 'numeric' }
        ).format(new Date(`${certificate.expiresOn}T00:00:00Z`));
        await expect(card).toContainText(expirationDate);
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

    const trackCertificate = certificates.find(
      (certificate) => certificate.credentialType === 'track'
    );
    const detailChecks =
      site.locale === 'fr'
        ? certificates
        : trackCertificate
          ? [certificates[0], trackCertificate]
          : [certificates[0]];
    for (const certificate of detailChecks) {
      const detailResponse = await page.goto(site.detailPath(certificate.id));
      expect(detailResponse?.status()).toBe(200);
      const detailPage = page.locator('[data-certification-detail]');
      await expect(
        detailPage.getByRole('heading', { name: certificate.title, level: 1 })
      ).toBeVisible();
      await expect(
        detailPage.getByText(
        certificate.credentialType === 'certification'
          ? site.certificationType
          : certificate.credentialType === 'track'
            ? site.trackType
            : site.courseType,
          { exact: true }
        )
      ).toBeVisible();
      await expect(
        detailPage.getByRole('heading', {
          name:
            certificate.credentialType === 'certification'
              ? site.assessedDomainsHeading
              : site.topicsHeading,
        })
      ).toBeVisible();
      if (certificate.credentialType === 'certification') {
        for (const domain of site.assessedDomains) {
          const domainDetail = detailPage.locator(
            `[data-assessed-domain="${domain.id}"]`
          );
          await expect(domainDetail.locator('summary')).toContainText(
            domain.title
          );
          await expect(domainDetail).not.toHaveAttribute('open', '');
          await domainDetail.locator('summary').click();
          await expect(domainDetail).toHaveAttribute('open', '');
          await expect(domainDetail).toContainText(domain.descriptionFragment);
          if (domain.assessmentFragment) {
            await expect(
              domainDetail.getByRole('heading', {
                name: site.domainAssessmentHeading,
              })
            ).toBeVisible();
            await expect(domainDetail).toContainText(domain.assessmentFragment);
          } else {
            await expect(
              domainDetail.getByRole('heading', {
                name: site.domainAssessmentHeading,
              })
            ).toHaveCount(0);
          }
        }
        await expect(
          detailPage.getByRole('heading', { name: site.practicalExamHeading })
        ).toBeVisible();
        await expect(detailPage).toContainText(
          site.locale === 'fr' ? '100 heures ou plus' : '100+ hours'
        );
        await expect(detailPage).toContainText(
          site.locale === 'fr'
            ? 'pas de la durée de préparation de Godwin'
            : 'not a claim about Godwin’s preparation time'
        );
      }
      await expect(
        detailPage.getByRole('link', { name: site.backText })
      ).toHaveAttribute('href', site.listPath);
      await expect(detailPage.locator('header')).toContainText(
      certificate.credentialType === 'certification'
        ? site.certificationOverviewFragment
        : certificate.credentialType === 'track'
          ? site.trackOverviewFragment
          : site.overviewFragment
      );

      if (certificate.credentialType === 'track') {
        await expect(
          detailPage.getByRole('heading', {
            name: site.includedCoursesHeading,
          })
        ).toBeVisible();
        const trackCourses = certificates.filter(
          (course) => course.credentialType === 'course'
        );
        await expect(
          detailPage.locator('[data-track-course-id]')
        ).toHaveCount(trackCourses.length);
        for (const course of trackCourses) {
          await expect(
            detailPage.locator(`[data-track-course-id="${course.id}"]`)
          ).toHaveAttribute('href', site.detailPath(course.id));
        }
      }

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
          Number(Boolean(certificate.completedOn)) +
            Number(Boolean(certificate.expiresOn))
        );
      }

      if (certificate.expiresOn) {
        const expirationDate = new Intl.DateTimeFormat(
          site.locale === 'fr' ? 'fr-FR' : 'en-US',
          { day: 'numeric', month: 'long', timeZone: 'UTC', year: 'numeric' }
        ).format(new Date(`${certificate.expiresOn}T00:00:00Z`));
        await expect(detailPage.locator('header dl')).toContainText(
          expirationDate
        );
      }

      if (certificate.verificationUrl) {
        await expect(
          detailPage.locator('a[href^="https://www.datacamp.com/"]')
        ).toHaveAttribute('href', certificate.verificationUrl);
      }
    }

    await page.goto(site.path);
    const homeSection = page.getByRole('region', {
      name: site.sectionName,
      exact: true,
    });
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
  await expect(page.locator('[data-certification-id]')).toHaveCount(13);
});

test('unknown certification slugs return not found', async ({ page }) => {
  const response = await page.goto('/certifications/not-a-real-course');

  expect(response?.status()).toBe(404);
  await expect(page.locator('[data-certification-detail]')).toHaveCount(0);
});
