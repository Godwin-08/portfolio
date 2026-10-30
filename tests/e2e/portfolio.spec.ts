import { expect, test, type Page } from '@playwright/test';
import frMessages from '../../messages/fr.json';
import enMessages from '../../messages/en.json';

type Messages = typeof frMessages;
type Locale = 'fr' | 'en';

const localizedRoutes = [
  {
    locale: 'fr' as const,
    messages: frMessages,
    home: '/',
    about: '/a-propos',
    projects: '/projets',
    contact: '/contact',
  },
  {
    locale: 'en' as const,
    messages: enMessages,
    home: '/en',
    about: '/en/about',
    projects: '/en/projects',
    contact: '/en/contact',
  },
];

const projectSlugs = [
  'gtm',
  'olist',
  'afc',
  'acp',
  'revision-flow',
  'novastore',
  'sante-scolaire',
  'pneumonia-detection',
] as const;

function projectTitle(messages: Messages, slug: (typeof projectSlugs)[number]) {
  return messages.projects.cards[slug].title;
}

function routeHeading(
  locale: Locale,
  messages: Messages,
  slug: (typeof projectSlugs)[number]
) {
  if (slug === 'gtm' || slug === 'olist') return slug === 'gtm' ? 'Galaxy Training Manager' : 'Olist';
  if (slug === 'afc') return locale === 'fr' ? 'AFC' : 'CA';
  return projectTitle(messages, slug);
}

function observeBrowser(page: Page) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const hydrationWarnings: string[] = [];
  const failedLocalRequests: string[] = [];
  const failedLocalResponses: string[] = [];
  const localOrigin = new URL(
    process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:4173'
  ).origin;

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
    if (
      message.type() === 'warning' &&
      /hydration|did not match|text content does not match|server rendered/i.test(message.text())
    ) {
      hydrationWarnings.push(message.text());
    }
  });
  page.on('pageerror', (error) => pageErrors.push(error.stack ?? error.message));
  page.on('requestfailed', (request) => {
    const errorText = request.failure()?.errorText ?? 'unknown error';
    if (new URL(request.url()).origin === localOrigin && errorText !== 'net::ERR_ABORTED') {
      failedLocalRequests.push(`${request.url()} (${errorText})`);
    }
  });
  page.on('response', (response) => {
    if (new URL(response.url()).origin === localOrigin && response.status() >= 400) {
      failedLocalResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  return { consoleErrors, pageErrors, hydrationWarnings, failedLocalRequests, failedLocalResponses };
}

function expectNoBrowserErrors(diagnostics: ReturnType<typeof observeBrowser>) {
  expect(diagnostics.pageErrors, 'uncaught JavaScript exceptions').toEqual([]);
  expect(diagnostics.consoleErrors, 'browser console errors').toEqual([]);
  expect(diagnostics.hydrationWarnings, 'React/Next hydration warnings').toEqual([]);
  expect(diagnostics.failedLocalRequests, 'failed same-origin resource requests').toEqual([]);
  expect(diagnostics.failedLocalResponses, 'same-origin HTTP error responses').toEqual([]);
}

for (const site of localizedRoutes) {
  test(`${site.locale}: back-to-top button appears after scrolling and returns to the page start`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(site.about);

    const backToTop = page.getByRole('button', {
      name: site.messages.common.accessibility.backToTop,
    });
    await expect(backToTop).toHaveCount(0);

    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(backToTop).toBeVisible();
    await backToTop.click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await expect(backToTop).toHaveCount(0);
  });

  test(`${site.locale}: reviewed project PDFs open as public resources`, async ({ page, request }) => {
    const documents = [
      { path: `${site.projects}/gtm`, href: '/documents/projects/gtm-internship-report-fr.pdf' },
      { path: `${site.projects}/afc`, href: '/documents/projects/afc-methodology-presentation-fr.pdf' },
      { path: `${site.projects}/olist`, href: '/documents/projects/olist-report-fr.pdf' },
      { path: `${site.projects}/sante-scolaire`, href: '/documents/projects/santescolaire-project-presentation-fr.pdf' },
      { path: `${site.projects}/pneumonia-detection`, href: '/documents/projects/pneumonia-report-fr.pdf' },
    ];

    for (const document of documents) {
      await page.goto(document.path);
      const link = page.locator(`[data-project-document][href="${document.href}"]`);
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('target', '_blank');

      const response = await request.get(new URL(document.href, page.url()).toString());
      expect(response.status(), document.href).toBe(200);
      expect(response.headers()['content-type'], document.href).toContain('application/pdf');
    }
  });

  const staticPages = [
    { path: site.home, expected: site.messages.common.name },
    { path: site.about, expected: site.messages.about.title },
    { path: site.projects, expected: site.messages.projects.list.heading },
    { path: site.contact, expected: site.messages.contact.title },
  ];

  for (const route of staticPages) {
    test(`${site.locale}: ${route.path} renders and hydrates`, async ({ page }) => {
      const diagnostics = observeBrowser(page);
      const response = await page.goto(route.path);

      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', site.locale);
      await expect(page.locator('#main-content')).toBeVisible();
      await expect(page.getByRole('heading', { level: 1 })).toContainText(route.expected);
      expect((await page.locator('body').innerText()).trim().length).toBeGreaterThan(100);
      expectNoBrowserErrors(diagnostics);
    });
  }

  test(`${site.locale}: phone and WhatsApp are available on the contact page`, async ({ page }) => {
    await page.goto(site.contact);

    const phoneLink = page.locator('a[href="tel:+212615817706"]');
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toContainText('+212 615 817 706');

    const whatsappLink = page.locator('a[href="https://wa.me/212615817706"]');
    await expect(whatsappLink).toBeVisible();
    await expect(whatsappLink).toContainText(site.messages.contact.whatsapp);
    await expect(whatsappLink).toHaveAttribute('target', '_blank');

    await page.goto(site.home);
    const homeWhatsappLink = page.locator('a[href="https://wa.me/212615817706"]');
    await expect(homeWhatsappLink).toBeVisible();
    await expect(homeWhatsappLink).toContainText(site.messages.home.contact.whatsapp);
  });

  for (const slug of projectSlugs) {
    const path = `${site.projects}/${slug}`;
    const expected = routeHeading(site.locale, site.messages, slug);

    test(`${site.locale}: ${path} renders and hydrates`, async ({ page, request }) => {
      const diagnostics = observeBrowser(page);
      if (slug === 'olist') await page.setViewportSize({ width: 1440, height: 900 });
      const response = await page.goto(path);

      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', site.locale);
      await expect(page.locator('#main-content')).toBeVisible();
      await expect(page.getByRole('heading', { level: 1 })).toContainText(expected);
      const contributionSection = page.locator('[data-project-contribution]');
      await expect(contributionSection).toHaveCount(1);
      await expect(contributionSection).toContainText(site.messages.caseStudies.ui.contributionTitle);
      await expect(page.getByRole('heading', {
        level: 2,
        name: site.messages.caseStudies.ui.contributionTitle,
        exact: true,
      })).toHaveCount(1);

      const projectPage = page.locator('[data-project-page]');
      expect(await projectPage.evaluate((element) =>
        getComputedStyle(element).getPropertyValue('--project-accent-current').trim()
      )).toMatch(/^#[\da-f]{6}$/i);

      const expectedPeoplePanels = {
        gtm: ['supervisor'],
        olist: ['collaborator', 'supervisor'],
        afc: ['collaborator', 'supervisor'],
        acp: ['supervisor'],
        'revision-flow': ['supervisor'],
        novastore: ['collaborator'],
        'sante-scolaire': ['supervisor'],
        'pneumonia-detection': ['collaborator', 'supervisor'],
      } as const;
      for (const kind of expectedPeoplePanels[slug]) {
        const panelTitle = kind === 'collaborator'
          ? (site.locale === 'fr' ? 'Collaborateurs du projet' : 'Team members')
          : (site.locale === 'fr' ? 'Encadrement du projet' : 'Project supervisors');
        await expect(page.getByRole('heading', { name: panelTitle, exact: true })).toBeVisible();
      }

      if (slug === 'olist') {
        await expect(page.locator('[data-olist-case-study]')).toHaveCount(1);
        await expect(page.getByRole('heading', {
          level: 2,
          name: site.locale === 'fr' ? 'Nettoyage et construction du jeu d’analyse' : 'Preparing the data for analysis',
        })).toBeVisible();
        await expect(page.locator('[data-project-document]')).toHaveCount(1);
        const heroFigure = page.locator('[data-project-gallery] figure').first();
        const figureBounds = await heroFigure.boundingBox();
        expect(figureBounds?.width).toBeGreaterThan(500);
      }
      const expectedImageCounts = {
        gtm: 4,
        olist: 3,
        afc: 3,
        acp: 4,
        'revision-flow': 4,
        'sante-scolaire': 3,
        novastore: 3,
        'pneumonia-detection': 5,
      } as const;
      await expect(page.locator('[data-project-gallery] figure')).toHaveCount(expectedImageCounts[slug]);
      await expect(page.locator('[data-project-conclusion]')).toBeVisible();
      await expect(page.locator('[data-project-conclusion] h2')).toHaveText(
        site.locale === 'fr' ? 'Bilan' : 'Takeaways',
      );
      if (slug === 'pneumonia-detection') {
        await expect(page.locator('[data-project-architecture]')).toBeVisible();
        for (const screenshot of [
          '/images/projects/pneumonia-streamlit-interface.png',
          '/images/projects/pneumonia-streamlit-upload.png',
        ]) {
          const assetResponse = await request.get(new URL(screenshot, page.url()).toString());
          expect(assetResponse.status(), screenshot).toBe(200);
          expect(assetResponse.headers()['content-type'], screenshot).toContain('image/png');
        }
        await expect(page.getByRole('img', {
          name: site.locale === 'fr'
            ? 'Capture de l’application Streamlit montrant le modèle sélectionné et la zone de téléversement.'
            : 'Screenshot of the Streamlit app showing the selected model and the image upload area.',
        })).toHaveCount(1);
        await expect(page.getByRole('img', {
          name: site.locale === 'fr'
            ? 'Capture de l’application Streamlit avec une radiographie chargée, avant le lancement de l’analyse.'
            : 'Screenshot of the Streamlit app with a chest X-ray uploaded, before analysis starts.',
        })).toHaveCount(1);
        await expect(page.locator('[data-project-data]')).toContainText(/5 856|5,856/);
        await expect(page.locator('[data-project-results]')).toContainText(/Overall accuracy|Exactitude globale/);
        await expect(page.locator('[data-project-conclusion]')).toBeVisible();
        const pneumoniaSectionOrder = await page.locator('[data-project-page]').evaluate((article) => {
          const selectors = [
            '[data-project-data]',
            '[data-project-architecture]',
            '[data-project-gallery]',
            '[data-project-results]',
            '[data-project-limitations]',
            '[data-project-technologies]',
            '[data-project-conclusion]',
          ];
          return selectors.map((selector) => {
            const element = article.querySelector(selector);
            return element ? [...article.querySelectorAll('*')].indexOf(element) : -1;
          });
        });
        expect(pneumoniaSectionOrder.every((index) => index >= 0)).toBe(true);
        expect(pneumoniaSectionOrder).toEqual([...pneumoniaSectionOrder].sort((a, b) => a - b));
        await expect(page.locator('[data-featured-finding]')).toContainText(/92\s?%/);
        await expect(page.locator('[data-project-document]')).toHaveAttribute(
          'href',
          '/documents/projects/pneumonia-report-fr.pdf',
        );
        await expect(page.getByRole('heading', {
          level: 2,
          name: site.messages.caseStudies.ui.limitationsTitle,
        })).toBeVisible();
        await expect(page.locator('[data-project-limitations]')).toContainText(/358.*359/);
      }
      if (slug === 'novastore') {
        await expect(page.getByRole('heading', {
          level: 2,
          name: site.locale === 'fr' ? 'Organisation de l’application' : 'How the app is built',
        })).toBeVisible();
        await expect(page.getByRole('heading', {
          level: 2,
          name: site.locale === 'fr' ? 'Choix de conception' : 'Design choices',
        })).toBeVisible();
        const images = page.locator('[data-project-gallery] figure img');
        await expect(images).toHaveCount(3);
        for (let index = 0; index < await images.count(); index += 1) {
          const image = images.nth(index);
          await image.scrollIntoViewIfNeeded();
          await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
        }
      }
      if (slug === 'revision-flow') {
        await expect(page.getByText(
          site.locale === 'fr' ? 'Planning du jour et minuteur' : 'Daily plan and timer',
          { exact: true },
        )).toBeVisible();
        await expect(page.locator('[data-project-document]')).toHaveAttribute(
          'href',
          '/documents/projects/revisionflow-report-fr.pdf',
        );

        const images = page.locator('[data-project-gallery] figure img');
        for (let index = 0; index < await images.count(); index += 1) {
          const image = images.nth(index);
          await image.scrollIntoViewIfNeeded();
          await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
        }
      }
      if (slug === 'gtm') {
        await expect(page.getByRole('heading', {
          level: 2,
          name: site.locale === 'fr' ? 'Organisation technique' : 'How the app is built',
        })).toBeVisible();
        await expect(page.getByRole('heading', {
          level: 2,
          name: site.locale === 'fr' ? 'Règles et choix' : 'Rules and design choices',
        })).toBeVisible();
        const testCountLabel = site.locale === 'fr' ? 'tests dans le dépôt' : 'tests in the repository';
        const testCountCard = page.getByText(testCountLabel, { exact: true }).locator('..');
        await expect(testCountCard.locator('span').first()).toHaveText('166');

        const images = page.locator('[data-project-gallery] img');
        for (let index = 0; index < await images.count(); index += 1) {
          const image = images.nth(index);
          await image.scrollIntoViewIfNeeded();
          await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
        }
      }
      expect((await page.locator('body').innerText()).trim().length).toBeGreaterThan(100);
      expectNoBrowserErrors(diagnostics);
    });

    test(`${site.locale}: ${path} fits a mobile viewport`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(path);

      const dimensions = await page.evaluate(() => ({
        pageWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
      }));
      expect(dimensions.pageWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
      const gallery = page.locator('[data-project-gallery]');
      for (let index = 0; index < await gallery.count(); index += 1) {
        const galleryBounds = await gallery.nth(index).boundingBox();
        expect(galleryBounds?.width).toBeLessThanOrEqual(375);
      }
    });
  }
}

for (const site of localizedRoutes) {
  test(`${site.locale}: pneumonia training charts can be zoomed on mobile`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${site.projects}/pneumonia-detection`);

    const chartTitle = site.locale === 'fr'
      ? 'Courbes d’apprentissage — CNN from scratch'
      : 'Training curves — Custom CNN from scratch';
    await page.getByRole('button', {
      name: `${site.messages.caseStudies.ui.galleryOpen}: ${chartTitle}`,
      exact: true,
    }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('group', {
      name: site.messages.caseStudies.ui.galleryZoomControls,
    })).toBeVisible();
    const viewport = dialog.locator('[data-gallery-image-viewport]');
    const zoomIn = dialog.getByRole('button', {
      name: site.messages.caseStudies.ui.galleryZoomIn,
    });
    await zoomIn.click();
    await zoomIn.click();
    await expect(dialog.getByText('200%', { exact: true })).toBeVisible();
    expect(await viewport.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);

    await dialog.getByRole('button', {
      name: site.messages.caseStudies.ui.galleryZoomReset,
    }).click();
    await expect(dialog.getByText('100%', { exact: true })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });
}

for (const site of localizedRoutes) {
  test(`${site.locale}: Olist figures open and close accessibly`, async ({ page }) => {
    const galleryLabels = site.messages.caseStudies.ui;
    await page.goto(`${site.projects}/olist`);

    const figures = page.locator('[data-project-gallery] button');
    await expect(figures).toHaveCount(3);
    for (let index = 0; index < 3; index += 1) {
      const figure = figures.nth(index);
      await figure.click();
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      await expect(dialog.getByText(`1 ${galleryLabels.galleryPosition} 1`, { exact: true })).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
      await expect(figure).toBeFocused();
    }
  });
}

test('unknown routes and project slugs produce a real not-found response', async ({ page }) => {
  for (const [path, locale] of [
    ['/es/about', 'fr'],
    ['/route-not-found-check', 'fr'],
    ['/projets/unknown-project', 'fr'],
    ['/en/route-not-found-check', 'en'],
    ['/en/projects/unknown-project', 'en'],
  ] as const) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(404);
    await expect(page.getByRole('heading', { name: /404|not found|introuvable/i })).toBeVisible();
    await expect(page.locator('html'), path).toHaveAttribute('lang', locale);
  }
});

test('legacy French paths redirect to the localized canonical routes', async ({ page }) => {
  for (const [oldPath, canonicalPath] of [
    ['/about', '/a-propos'],
    ['/projects', '/projets'],
    ['/projects/gtm', '/projets/gtm'],
    ['/fr/about', '/a-propos'],
  ]) {
    const response = await page.goto(oldPath);
    expect(response?.status(), oldPath).toBe(200);
    await expect(page).toHaveURL(new RegExp(`${canonicalPath.replaceAll('/', '\\/')}$`));
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  }
});

test('project titles open every case study from the localized listing', async ({ page }) => {
  const diagnostics = observeBrowser(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const site of localizedRoutes) {
    await page.goto(site.home);
    for (const slug of ['gtm', 'olist', 'afc'] as const) {
      const title = projectTitle(site.messages, slug);
      const titleLink = page.getByRole('heading', {
        level: 3,
        name: title,
        exact: true,
      }).getByRole('link', { name: title, exact: true });
      await expect(titleLink).toHaveAttribute('href', `${site.projects}/${slug}`);
    }

    await page.goto(site.projects);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(site.messages.projects.list.heading);

    for (const slug of projectSlugs) {
      const title = projectTitle(site.messages, slug);
      const card = page.getByRole('article').filter({
        has: page.getByRole('heading', { level: 2, name: title, exact: true }),
      });
      await expect(card).toHaveCount(1);
      const titleLink = card.getByRole('heading', { level: 2 }).getByRole('link', {
        name: title,
        exact: true,
      });
      await expect(titleLink).toHaveAttribute('href', `${site.projects}/${slug}`);
      const previewImage = card.locator('[data-project-visual] img');
      await expect(previewImage).toBeVisible();
      await expect.poll(() => previewImage.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      await titleLink.click();
      await expect(page).toHaveURL(new RegExp(`${site.projects}/${slug}$`));
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      const backToProjects = page.locator('#main-content').getByRole('link', {
        name: site.messages.caseStudies.ui.back,
        exact: true,
      });
      await expect(backToProjects).toHaveAttribute('href', site.projects);
      await backToProjects.evaluate((link) => {
        const root = document.documentElement;
        const scrollBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = 'auto';
        link.scrollIntoView({ block: 'center' });
        root.style.scrollBehavior = scrollBehavior;
      });
      await backToProjects.click();
      await expect(page).toHaveURL(new RegExp(`${site.projects}$`));
    }
  }

  expectNoBrowserErrors(diagnostics);
});

for (const site of localizedRoutes) {
  test(`${site.locale}: home content containers are wider on desktop`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(site.home);

    const containers = [
      page.locator('main#main-content section[aria-labelledby="hero-heading"] > div.mx-auto'),
      page.locator('section.skills-ticker [data-skills-header]'),
      page.locator('footer > div'),
    ];

    for (const container of containers) {
      const bounds = await container.boundingBox();
      expect(bounds?.width).toBeGreaterThan(1200);
    }

    const portrait = page.locator('main#main-content section[aria-labelledby="hero-heading"] img');
    await expect(portrait).toBeVisible();
    await expect(portrait).toHaveAttribute('alt', site.messages.home.hero.portraitAlt);
    const portraitBounds = await portrait.boundingBox();
    expect(portraitBounds?.width).toBeGreaterThan(340);
    expect(portraitBounds?.width).toBeLessThan(380);
    expect(portraitBounds?.height).toBeGreaterThan(400);
  });

  test(`${site.locale}: desktop navigation opens About and Contact`, async ({ page }) => {
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${site.projects}/afc`);

    const navigation = page.getByRole('navigation', {
      name: site.messages.common.nav.mainLabel,
    });
    await expect(navigation).toBeVisible();

    await navigation
      .getByRole('link', { name: site.messages.common.nav.about, exact: true })
      .click();
    await expect(page).toHaveURL(
      new RegExp(`${site.about.replaceAll('/', '\\/')}$`)
    );
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      site.messages.about.title
    );
    await expect(page.getByText(site.messages.about.intro, { exact: true })).toBeVisible();
    await expect(page.getByText(site.messages.about.search, { exact: true })).toBeVisible();
    await expect(page.getByText(site.messages.about.cestomText, { exact: true })).toBeVisible();
    for (const [step, slug] of [
      ['understand', 'afc'],
      ['analyze', 'olist'],
      ['build', 'gtm'],
    ] as const) {
      await expect(
        page.locator('main').getByRole('link', {
          name: site.messages.about.steps[step].project,
          exact: true,
        })
      ).toHaveAttribute('href', `${site.projects}/${slug}`);
    }

    await navigation
      .getByRole('link', { name: site.messages.common.nav.contact, exact: true })
      .click();
    await expect(page).toHaveURL(
      new RegExp(`${site.contact.replaceAll('/', '\\/')}$`)
    );
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      site.messages.contact.title
    );
    await expect(page.getByText(site.messages.contact.intro, { exact: true })).toBeVisible();
    await expect(page.getByText(site.messages.contact.focusText, { exact: true })).toBeVisible();
    await expect(page.locator('main [data-email-link]')).toHaveCount(1);
    await expect(
      page.locator('footer').getByText(site.messages.common.footer.invitation, { exact: true })
    ).toHaveCount(0);

    await expect(page.locator('[data-email-link]')).toHaveCount(2);
    const emailLink = page.locator('footer [data-email-link]');
    await expect(emailLink).toHaveAttribute(
      'href',
      'mailto:godwinelienougbolo@gmail.com'
    );
    await emailLink.dispatchEvent('click');
    await expect(emailLink.locator('[data-email-copy-status]')).toHaveCount(0);
  });

  test(`${site.locale}: AFC gallery image uses the full content width`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${site.projects}/afc`);

    const heroFigure = page.locator('[data-project-gallery] figure').first();
    const heroFigureBox = await heroFigure.boundingBox();
    expect(heroFigureBox?.width).toBeGreaterThan(500);
  });

  test(`${site.locale}: AFC analysis is ordered and readable on desktop and mobile`, async ({ page }) => {
    for (const viewport of [
      { width: 1440, height: 1000 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto(`${site.projects}/afc`);

      const sections = await page.locator('[data-afc-section]').evaluateAll((elements) =>
        elements.map((element) => element.getAttribute('data-afc-section'))
      );
      expect(sections).toEqual([
        'data',
        'method',
        'results',
        'afc-scree',
        'afc-biplot',
        'afc-cos2',
        'limits',
      ]);

      await expect(page.getByRole('heading', {
        name: site.locale === 'fr' ? 'Données et tableau de contingence' : 'Data and count table',
      })).toBeVisible();
      await expect(page.getByText(site.locale === 'fr' ? '25 955' : '25,955', { exact: false }).first()).toBeVisible();
      await expect(page.getByText(site.locale === 'fr' ? 'cos² indique' : 'Cos² shows how well', { exact: false }).first()).toBeVisible();

      const analysisSections = page.locator('[data-afc-section]');
      for (let index = 0; index < await analysisSections.count(); index += 1) {
        const section = analysisSections.nth(index);
        await section.scrollIntoViewIfNeeded();
        await expect(section).toHaveAttribute('data-scroll-motion', 'visible');
      }

      const galleryImages = page.locator('[data-project-gallery] img');
      await expect(galleryImages).toHaveCount(3);
      for (let index = 0; index < await galleryImages.count(); index += 1) {
        const image = galleryImages.nth(index);
        await image.scrollIntoViewIfNeeded();
        await expect(image).toBeVisible();
        await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
      }

      const pageWidth = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
      }));
      expect(pageWidth.scrollWidth).toBeLessThanOrEqual(pageWidth.viewportWidth);
    }
  });

  test(`${site.locale}: Business Intelligence is visible and links to its project evidence`, async ({ page }) => {
    const skillLabel = site.messages.skills.names['business-intelligence'];
    const skillAriaLabel = site.messages.home.skills.filterAria.replace(
      '{skill}',
      skillLabel
    );

    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(site.home);
      const hero = page.locator('section[aria-labelledby="hero-heading"]');
      const orientationHeading = site.messages.home.hero.growingFields;
      const experienceHeading = site.messages.home.hero.analysisTitle;
      const availability = page.getByText(site.messages.home.hero.availability, { exact: true });

      await expect(hero.getByText(site.messages.home.hero.degree, { exact: true })).toBeVisible();
      await expect(hero.getByText(site.messages.home.hero.tagline, { exact: true })).toBeVisible();
      await expect(hero.getByRole('heading', { level: 2, name: orientationHeading })).toBeVisible();
      await expect(hero.getByRole('heading', { level: 2, name: experienceHeading })).toBeVisible();
      await expect(hero.locator('h2')).toHaveText([experienceHeading, orientationHeading]);
      await expect(hero.getByText(site.messages.home.hero.growingFieldsDescription, { exact: true })).toBeVisible();
      await expect(hero.getByText(site.messages.home.hero.analysisDescription, { exact: true })).toBeVisible();
      await expect(availability).toBeVisible();

      const availabilityLayout = await availability.evaluate((element) => {
        const badge = element.closest('p');
        return {
          badgeWidth: badge?.clientWidth ?? 0,
          badgeScrollWidth: badge?.scrollWidth ?? 0,
          rightEdge: badge?.getBoundingClientRect().right ?? 0,
          viewportWidth: window.innerWidth,
        };
      });
      expect(availabilityLayout.badgeScrollWidth).toBeLessThanOrEqual(availabilityLayout.badgeWidth);
      expect(availabilityLayout.rightEdge).toBeLessThanOrEqual(availabilityLayout.viewportWidth);

      const skillButton = page.getByRole('button', {
        name: skillAriaLabel,
        exact: true,
      });
      await expect(
        page.getByRole('heading', {
          level: 2,
          name: site.messages.home.hero.analysisTitle,
        })
      ).toBeVisible();
      await expect(
        page.getByRole('heading', {
          level: 2,
          name: site.messages.home.hero.growingFields,
        })
      ).toBeVisible();
      await expect(skillButton).toBeVisible();
      await expect(skillButton.locator('svg')).toHaveCount(1);

      const pythonSkill = page.locator('[data-skill-id="python"]:visible').first();
      const pythonLogo = pythonSkill.locator('img');
      await expect(pythonLogo).toHaveAttribute('src', '/skill-logos/python.svg');
      await expect(pythonLogo).toHaveAttribute('alt', '');
      await expect(pythonLogo).toHaveAttribute('aria-hidden', 'true');
      await expect
        .poll(() => pythonLogo.evaluate((image) => (image as HTMLImageElement).naturalWidth))
        .toBeGreaterThan(0);
      await expect(skillButton.locator('img')).toHaveCount(0);

      if (width === 1440) {
        const brandLogos = page.locator('.skills-ticker [data-skill-id] img');
        await expect(brandLogos).toHaveCount(10);
        await expect
          .poll(() =>
            brandLogos.evaluateAll((images) =>
              images.every((image) => (image as HTMLImageElement).naturalWidth > 0)
            )
          )
          .toBe(true);
      }
    }

    await page.getByRole('button', { name: skillAriaLabel, exact: true }).click();
    await expect(page).toHaveURL(/skill=business-intelligence$/);
    await expect(page.locator('article h2')).toHaveCount(1);
    await expect(page.locator('article h2')).toContainText(
      site.messages.projects.cards.gtm.title
    );
  });
}

test('mobile navigation opens, closes with Escape, and follows a localized link', async ({ page }) => {
  const diagnostics = observeBrowser(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const openMenu = page.getByRole('button', { name: frMessages.common.accessibility.openMenu });
  await openMenu.focus();
  await page.keyboard.press('Enter');
  const menu = page.getByRole('region', { name: frMessages.common.accessibility.mobileMenu });
  await expect(menu).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toHaveCount(0);

  await page.getByRole('button', { name: frMessages.common.accessibility.openMenu }).click();
  await page.getByRole('navigation', { name: frMessages.common.nav.mobileLabel })
    .getByRole('link', { name: frMessages.common.nav.about, exact: true }).click();
  await expect(page).toHaveURL(/\/a-propos$/);
  await expect(menu).toHaveCount(0);
  expectNoBrowserErrors(diagnostics);
});

test('language switching preserves the current page and project slug', async ({ page }) => {
  const diagnostics = observeBrowser(page);
  await page.goto('/');
  await page.getByRole('button', { name: frMessages.common.language.switchToEnglish }).first().click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('button', { name: enMessages.common.language.switchToFrench }).first().click();
  await expect(page).toHaveURL(/\/$/);

  await page.goto('/a-propos');
  await page.getByRole('button', { name: frMessages.common.language.switchToEnglish }).first().click();
  await expect(page).toHaveURL(/\/en\/about$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('button', { name: enMessages.common.language.switchToFrench }).first().click();
  await expect(page).toHaveURL(/\/a-propos$/);

  await page.goto('/projets/gtm');
  await page.getByRole('button', { name: frMessages.common.language.switchToEnglish }).first().click();
  await expect(page).toHaveURL(/\/en\/projects\/gtm$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('button', { name: enMessages.common.language.switchToFrench }).first().click();
  await expect(page).toHaveURL(/\/projets\/gtm$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');

  await page.goto('/projets/pneumonia-detection');
  await page.getByRole('button', { name: frMessages.common.language.switchToEnglish }).first().click();
  await expect(page).toHaveURL(/\/en\/projects\/pneumonia-detection$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('button', { name: enMessages.common.language.switchToFrench }).first().click();
  await expect(page).toHaveURL(/\/projets\/pneumonia-detection$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');

  expectNoBrowserErrors(diagnostics);
});

for (const site of localizedRoutes) {
  test(`${site.locale}: category, skill, combined, empty, reset, and locale-preserving filters`, async ({ page }) => {
    const diagnostics = observeBrowser(page);
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto(`${site.projects}?campaign=acceptance`);
    const categoryName = site.messages.projects.categories['web-si'];
    await page.getByRole('button', { name: categoryName, exact: true }).click();
    await expect(page).toHaveURL(/category=web-si/);
    expect(new URL(page.url()).searchParams.get('campaign')).toBe('acceptance');
    await expect(page.locator('article h2')).toHaveCount(4);

    await page.goto(`${site.projects}?skill=flask`);
    await expect(page.locator('article h2')).toHaveCount(3);

    await page.goto(`${site.projects}?category=web-si&skill=flask`);
    await expect(page.locator('article h2')).toHaveCount(3);

    await page.goto(`${site.projects}?category=data-analysis&skill=flask`);
    await expect(page.locator('article h2')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: site.messages.projects.list.emptyTitle })).toBeVisible();
    await page.getByRole('button', { name: site.messages.projects.filters.reset, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${site.projects.replaceAll('/', '\\/')}$`));
    await expect(page.locator('article h2')).toHaveCount(8);

    await page.goto(`${site.projects}?category=web-si&skill=flask`);
    const switchButton = site.locale === 'fr'
      ? frMessages.common.language.switchToEnglish
      : enMessages.common.language.switchToFrench;
    await page.getByRole('button', { name: switchButton }).first().click();
    const targetProjects = site.locale === 'fr' ? '/en/projects' : '/projets';
    await expect(page).toHaveURL(new RegExp(`${targetProjects.replaceAll('/', '\\/')}\\?`));
    const search = new URL(page.url()).searchParams;
    expect(search.get('category')).toBe('web-si');
    expect(search.get('skill')).toBe('flask');
    await expect(page.locator('article h2')).toHaveCount(3);

    expectNoBrowserErrors(diagnostics);
  });
}

test('desktop and mobile layouts fit the viewport and produce reference screenshots', async ({ page }, testInfo) => {
  const diagnostics = observeBrowser(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('screenshots/home-desktop.png'), fullPage: true, caret: 'initial' });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/projets');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('screenshots/projects-mobile.png'), fullPage: true, caret: 'initial' });
  expectNoBrowserErrors(diagnostics);
});
