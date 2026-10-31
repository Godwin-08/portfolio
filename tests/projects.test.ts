import { describe, it, expect } from 'vitest';
import { ALL_PROJECT_CATEGORIES, getAllProjects, getFeaturedProjects, getProjectBySlug, PROJECTS } from '@/data/projects';
import { ENGLISH_CASE_STUDY_COPY, getEnglishCaseStudyCopy, localizeCaseStudy } from '@/data/case-study-translations';
import { SKILLS, getSkillsForProject } from '@/data/skills';
import { getProjectDetailCopy, PROJECT_DETAIL_COPY } from '@/data/project-details';
import { PROFILE } from '@/data/profile';
import { routing } from '@/i18n/routing';
import { getProjectMDX } from '@/lib/mdx';
import { GTM_QUALITY_COPY } from '@/components/projects/GtmCaseStudy';
import frMessages from '../messages/fr.json';
import enMessages from '../messages/en.json';

describe('Data Layer - Projects', () => {
  it('should have unique slugs for all projects', () => {
    const slugs = PROJECTS.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it('should display the eight project cards in their configured order', () => {
    expect(getAllProjects().map(({ id }) => id)).toEqual([
      'gtm', 'olist', 'afc', 'acp', 'revision-flow', 'novastore', 'sante-scolaire', 'pneumonia-detection',
    ]);
    for (const messages of [frMessages, enMessages]) {
      expect(Object.keys(messages.projects.cards).sort()).toEqual(
        PROJECTS.map(({ id }) => id).sort()
      );
      for (const project of PROJECTS) {
        const card = messages.projects.cards[project.id as keyof typeof messages.projects.cards];
        expect(card.title.trim()).not.toBe('');
        expect(card.tagline.trim()).not.toBe('');
        expect(card.summary.trim()).not.toBe('');
      }
    }
  });

  it('should return featured projects with at least 3 items in defined order', () => {
    const featured = getFeaturedProjects();
    expect(featured.length).toBeGreaterThanOrEqual(3);
    expect(featured[0].slug).toBe('gtm');
    expect(featured[1].slug).toBe('olist');
    expect(featured[2].slug).toBe('afc');
  });

  it('should have GTM as the flagship case study', () => {
    const gtm = getProjectBySlug('gtm');
    expect(gtm).toBeDefined();
    expect(gtm?.isFlagship).toBe(true);
    expect(gtm?.caseStudy).toBeDefined();
    expect(gtm?.caseStudy?.keyDecisions.length).toBeGreaterThan(0);
    expect(gtm?.caseStudy?.results.length).toBeGreaterThan(0);
    expect(gtm?.caseStudy?.validation).toBeDefined();
  });

  it('should expose the verified GTM source repository', () => {
    const gtm = getProjectBySlug('gtm');
    expect(gtm?.caseStudy?.githubUrl).toBe('https://github.com/Godwin-08/GTM');
    expect(gtm?.image).toBe('/images/projects/gtm-dashboard.png');
  });

  it('should have Olist with 96k+ metric and structured case study', () => {
    const olist = getProjectBySlug('olist');
    expect(olist).toBeDefined();
    expect(olist?.category).toBe('Data Analysis');
    expect(olist?.caseStudy?.results.some((r) => r.value.includes('96 252'))).toBe(true);
  });

  it('should expose the verified Olist source repository and hero asset', () => {
    const olist = getProjectBySlug('olist');
    expect(olist?.caseStudy?.githubUrl).toBe('https://github.com/Godwin-08/Projet-Traitement-des-donn-es-');
    expect(olist?.image).toBe('/images/projects/olist-delais-livraison.png');
  });

  it('should have AFC with from-scratch implementation and pytest validation', () => {
    const afc = getProjectBySlug('afc');
    expect(afc).toBeDefined();
    expect(afc?.category).toBe('Statistiques');
    expect(afc?.skills).toContain('SciPy');
    expect(afc?.skills).toContain('NumPy');
  });

  it('should expose the verified AFC source repository and biplot asset', () => {
    const afc = getProjectBySlug('afc');
    expect(afc?.caseStudy?.githubUrl).toBe('https://github.com/Godwin-08/AFC-Analyse-Factorielle-Correspondances');
    expect(afc?.image).toBe('/images/projects/afc-biplot.png');
  });

  it('should expose the ACP project with verified repository metrics and local figures', () => {
    const acp = getProjectBySlug('acp');
    const detail = getProjectDetailCopy('acp', 'fr');
    expect(acp?.category).toBe('Statistiques');
    expect(acp?.isFeatured).toBe(false);
    expect(acp?.context).toBe('Académique (Individuel)');
    expect(acp?.period).toBe('2025–2026');
    expect(acp?.caseStudy?.githubUrl).toBe('https://github.com/Godwin-08/ACP');
    expect(acp?.keyMetrics.map(({ value }) => value)).toEqual(['169', '9', '63,86 %']);
    expect(detail?.repository).toBe('https://github.com/Godwin-08/ACP');
    expect(detail?.gallery).toHaveLength(4);
    expect(getProjectDetailCopy('acp', 'en')?.gallery).toHaveLength(4);
  });

  it('documents the pneumonia project using repository-backed facts and appropriately scoped limitations', () => {
    const project = getProjectBySlug('pneumonia-detection');
    const french = getProjectDetailCopy('pneumonia-detection', 'fr');
    const english = getProjectDetailCopy('pneumonia-detection', 'en');

    expect(project?.category).toBe('Machine Learning');
    expect(project?.caseStudy?.githubUrl).toBe(
      'https://github.com/Godwin-08/Pneumonia-Detection-from-X-rays'
    );
    expect(project?.keyMetrics.map(({ value }) => value)).toEqual(['≈89 %', '92 %', '5 856']);
    expect(french?.methodSteps).toHaveLength(5);
    expect(english?.methodSteps).toHaveLength(5);
    for (const copy of [french, english]) {
      expect(copy?.results[1]?.detail).toMatch(/358.*390/);
      expect(copy?.results[2]?.label).toMatch(/PNEUMONIA.*F1|F1.*PNEUMONIA/i);
      expect(copy?.contribution).toMatch(/rédigé le rapport technique|wrote the project’s technical report/i);
      expect(copy?.contribution).toMatch(/équipe de quatre|team of four/i);
      expect(copy?.dataTitle).toBeTruthy();
      expect(copy?.dataConstruction).toMatch(/5 856|5,856/);
      expect(copy?.methodSteps[0]?.description).toMatch(/0,7|0\.7/);
      expect(copy?.resultsIntro).toMatch(/accuracy|exactitude/i);
      expect(copy?.resultsIntro).toMatch(/précision|precision/i);
      expect(copy?.limitations).toHaveLength(3);
      expect(copy?.limitations.join(' ')).toMatch(/validation externe|external validation/i);
      expect(copy?.limitations.join(' ')).toMatch(/358.*359/);
      expect(copy?.conclusion?.description).toBeTruthy();
      expect(copy?.gallery.map(({ src }) => src)).toContain(
        '/images/projects/pneumonia-streamlit-interface.png',
      );
      expect(copy?.gallery.map(({ src }) => src)).toContain(
        '/images/projects/pneumonia-streamlit-upload.png',
      );
      expect(copy?.gallery[1]?.caption).toMatch(/aucun résultat de prédiction|does not show a prediction result/i);
      expect(copy?.gallery[2]?.caption).toMatch(/pas une prédiction|not a prediction/i);
      expect(copy?.gallery[3]?.caption).toMatch(/ligne pointillée|dotted line/);
      expect(copy?.gallery.slice(3).every((image) => image.zoomable)).toBe(true);
      expect(copy?.documents?.[0]?.href).toBe('/documents/projects/pneumonia-report-fr.pdf');
    }
    expect(french?.dataConstruction).toContain(
      'l’utilisation des 16 autres images n’est pas précisée'
    );
    expect(english?.dataConstruction).toContain(
      'it does not explain how the other 16 images are used'
    );
    expect(french?.results[0]?.value).toBe('≈89 %');
    expect(english?.results[0]?.value).toBe('≈89%');
    expect(french?.gallery[0]?.alt).not.toMatch(/normal.*pneumonia|comparaison/i);
    expect(english?.gallery[0]?.alt).not.toMatch(/normal.*pneumonia|comparison/i);
    for (const copy of [french, english]) {
      expect(copy?.collaborators).toEqual([
        {
          name: 'Mouad Deroui',
          role: copy === french ? 'Étudiant co-auteur (IID1, ENSA Khouribga)' : 'Student co-author (IID1, ENSA Khouribga)',
          linkedinUrl: 'https://www.linkedin.com/in/mouadderoui/',
        },
        {
          name: 'Othmane Laaouina',
          role: copy === french ? 'Étudiant co-auteur (IID1, ENSA Khouribga)' : 'Student co-author (IID1, ENSA Khouribga)',
          linkedinUrl: 'https://ma.linkedin.com/in/othmane-laaouina-671052385',
        },
        {
          name: 'Azeddine Maktou',
          role: copy === french ? 'Étudiant co-auteur (IID1, ENSA Khouribga)' : 'Student co-author (IID1, ENSA Khouribga)',
          linkedinUrl: 'https://ma.linkedin.com/in/azeddine-maktou-5b6668380',
        },
      ]);
    }
  });
});

describe('Localized case study content', () => {
  it('provides clear French and English detail content for all eight projects', () => {
    expect(Object.keys(PROJECT_DETAIL_COPY).sort()).toEqual(
      PROJECTS.map(({ slug }) => slug).sort()
    );

    for (const project of PROJECTS) {
      const copy = PROJECT_DETAIL_COPY[project.slug as keyof typeof PROJECT_DETAIL_COPY];
      expect(copy.fr.context.trim()).not.toBe('');
      expect(copy.en.context.trim()).not.toBe('');
      expect(copy.fr.methodSteps.length).toBeGreaterThan(0);
      expect(copy.fr.methodSteps.length).toBe(copy.en.methodSteps.length);
      expect(copy.fr.limitations.length).toBe(copy.en.limitations.length);
      expect(copy.fr.technologies.length).toBe(copy.en.technologies.length);
      expect(copy.fr.conclusion?.title).toMatch(/Bilan/);
      expect(copy.fr.conclusion?.description.trim()).not.toBe('');
      expect(copy.en.conclusion?.title).toMatch(/Takeaways/);
      expect(copy.en.conclusion?.description.trim()).not.toBe('');
      for (const image of [...copy.fr.gallery, ...copy.en.gallery]) {
        expect(image.src.startsWith('/images/projects/')).toBe(true);
        expect(image.alt.trim()).not.toBe('');
        expect(image.title.trim()).not.toBe('');
        expect(image.caption.trim()).not.toBe('');
      }
    }
  });

  it('explains RevisionFlow features and limits with evidence in both languages', () => {
    const fr = getProjectDetailCopy('revision-flow', 'fr');
    const en = getProjectDetailCopy('revision-flow', 'en');

    expect(fr?.context).toMatch(/séances par jour.*ne peuvent pas être placées/);
    expect(en?.context).toMatch(/daily sessions.*cannot fit in the plan/);
    expect(fr?.methodIntro).toMatch(/jours passés.*backlog/);
    expect(en?.methodIntro).toMatch(/past days.*backlog/);
    expect(fr?.contribution).toMatch(/individuellement.*calcul du planning.*minuteur Pomodoro/);
    expect(en?.contribution).toMatch(/on my own.*schedule generation.*Pomodoro timer/);
    expect(fr?.results.map(({ value }) => value)).toContain('5 max.');
    expect(en?.results.map(({ value }) => value)).toContain('Up to 5');
    expect(fr?.limitations.join(' ')).toMatch(/Nager\.Date.*connexion/);
    expect(en?.limitations.join(' ')).toMatch(/Nager\.Date.*internet connection/);
    expect(fr?.limitations.join(' ')).toMatch(/sans synchronisation entre appareils/);
    expect(en?.limitations.join(' ')).toMatch(/not synced across devices/);
    expect(fr?.gallery.map(({ src }) => src)).toEqual([
      '/images/projects/revisionflow-focus.png',
      '/images/projects/revisionflow-planning.png',
      '/images/projects/revisionflow-progression.png',
      '/images/projects/revisionflow-historique.png',
    ]);
    expect(en?.gallery.map(({ src }) => src)).toEqual(fr?.gallery.map(({ src }) => src));
  });

  it('documents GTM architecture, business rules, and evidence in both languages', () => {
    const { fr, en } = PROJECT_DETAIL_COPY.gtm;

    expect(fr.architecture?.layers).toHaveLength(4);
    expect(en.architecture?.layers).toHaveLength(4);
    expect(fr.keyDecisions?.items).toHaveLength(3);
    expect(en.keyDecisions?.items).toHaveLength(3);
    expect(fr.architecture?.introduction).toMatch(/routes web et API.*règles métier.*données/);
    expect(en.architecture?.introduction).toMatch(/web and API routes.*business rules.*data access/);
    expect(fr.keyDecisions?.items[1].description).toMatch(/deux fois.*liste d’attente/);
    expect(en.keyDecisions?.items[1].description).toMatch(/twice.*waitlist/);
    expect(fr.methodSteps[2].description).toMatch(/six indicateurs.*cinq graphiques/);
    expect(en.methodSteps[2].description).toMatch(/six indicators.*five charts/);
    expect(fr.results.map(({ value }) => value)).toContain('166');
    expect(en.results.map(({ value }) => value)).toContain('166');
    expect(fr.results[2].detail).toMatch(/166 fonctions de test.*dernière exécution disponible.*166 réussies.*pas été relancée/);
    expect(en.results[2].detail).toMatch(/166 test functions.*latest available run.*166 passing tests.*not rerun/);
    expect(fr.context).toMatch(/jeu de démonstration du projet/);
    expect(en.context).toMatch(/project’s demo dataset/);
    expect(fr.contribution).toMatch(/jeu de données de démonstration déterministe inclus dans le dépôt/);
    expect(en.contribution).toMatch(/deterministic demo dataset included in the repository/);
    expect(fr.limitations.join(' ')).toMatch(/pagination côté serveur.*tests E2E automatisés/);
    expect(en.limitations.join(' ')).toMatch(/server-side pagination.*automated end-to-end tests/);
    expect(fr.technologies).toContain('Flask-Login');
    expect(fr.technologies).toContain('Tailwind CSS');
    expect(en.technologies).toContain('Alpine.js');
  });

  it('states important Olist and project limits in both languages', () => {
    const olist = PROJECT_DETAIL_COPY.olist;
    expect(olist.fr.olistAnalysis?.preparation.steps.map(({ value }) => value)).toEqual([
      '99 441', '99 275', '96 313', '96 252',
    ]);
    expect(olist.en.olistAnalysis?.preparation.steps.map(({ value }) => value)).toEqual([
      '99,441', '99,275', '96,313', '96,252',
    ]);
    expect(olist.fr.featuredFinding).toMatch(/96 244.*12,1.*6 531.*6,8/);
    expect(olist.en.featuredFinding).toMatch(/96,244.*12.1.*6,531.*6.8/);
    expect(olist.fr.olistAnalysis?.satisfaction.metrics[0].detail).toContain('95 150');
    expect(olist.en.olistAnalysis?.satisfaction.metrics[0].detail).toContain('95,150');
    expect(olist.fr.olistAnalysis?.financial.indicators[0].detail).toContain('inclus');
    expect(olist.fr.olistAnalysis?.financial.indicators[2].detail).toMatch(/ni un revenu net ni un bénéfice/);
    expect(olist.en.olistAnalysis?.financial.indicators[2].detail).toMatch(/not the marketplace’s net revenue or profit/);
    expect(olist.fr.limitations.join(' ')).toMatch(/premier article/);
    expect(olist.en.limitations.join(' ')).toMatch(/first item category/);
    for (const copy of [olist.fr, olist.en]) {
      expect(copy.gallery).toHaveLength(3);
      expect(copy.gallery.every((image) => image.analysis)).toBe(true);
      expect(JSON.stringify(copy)).not.toMatch(/4[,.]29|2[,.]27/);
    }
    expect(getProjectDetailCopy('olist', 'fr')?.documents).toEqual([
      {
        href: '/documents/projects/olist-report-fr.pdf',
        label: 'Rapport Olist en français (PDF)',
      },
    ]);
    expect(getProjectDetailCopy('olist', 'en')?.documents).toEqual([
      {
        href: '/documents/projects/olist-report-fr.pdf',
        label: 'Olist report in French (PDF)',
      },
    ]);
    expect(olist.fr.collaborators?.[0].name).toBe('Maktou Azeddine');
    expect(olist.en.collaborators?.[0].name).toBe('Maktou Azeddine');
    expect(PROJECT_DETAIL_COPY.afc.fr.featuredFinding).toMatch(/56,2 %.*81 %/);
    expect(PROJECT_DETAIL_COPY.afc.en.featuredFinding).toMatch(/56.2%.*81%/);
    expect(PROJECT_DETAIL_COPY.novastore.fr.technologies).not.toContain('MySQL');
    expect(PROJECT_DETAIL_COPY.novastore.fr.technologies).not.toContain('SQLAlchemy');
    expect(PROJECT_DETAIL_COPY.afc.fr.limitations.join(' ')).toMatch(/ne prédit pas/i);
    expect(PROJECT_DETAIL_COPY.novastore.fr.limitations.join(' ')).toMatch(/paiement est simulé/i);
    expect(PROJECT_DETAIL_COPY['sante-scolaire'].en.contribution).toMatch(/fictional/i);
  });

  it('documents NovaStore features, contribution, and storage limits in both languages', () => {
    const { fr, en } = PROJECT_DETAIL_COPY.novastore;

    expect(fr.architecture?.layers).toHaveLength(4);
    expect(en.architecture?.layers).toHaveLength(4);
    expect(fr.keyDecisions?.items).toHaveLength(3);
    expect(en.keyDecisions?.items).toHaveLength(3);
    expect(fr.methodSteps[0].description).toMatch(/20 produits.*catégorie.*disponibilité.*promotion.*prix/);
    expect(en.methodSteps[0].description).toMatch(/20 demo products.*category.*stock.*promotion.*price/);
    expect(fr.limitations.join(' ')).toMatch(/SQLAlchemy.*ne configure pas l’ORM/);
    expect(en.limitations.join(' ')).toMatch(/SQLAlchemy.*does not set up the ORM/);
    expect(fr.limitations.join(' ')).toMatch(/commandes et les alertes.*listes en mémoire/);
    expect(en.limitations.join(' ')).toMatch(/Orders and alerts.*in-memory lists/);
    expect(fr.contribution).toMatch(/équipe de cinq.*participé.*ne m’attribue donc pas seul/);
    expect(en.contribution).toMatch(/team of five.*took part.*do not claim/);
    expect(fr.gallery.map(({ src }) => src)).toEqual([
      '/images/projects/novastore-filtre-prix.png',
      '/images/projects/novastore-fiche-produit.png',
      '/images/projects/novastore-panier.png',
    ]);
    expect(en.gallery.map(({ src }) => src)).toEqual(fr.gallery.map(({ src }) => src));
    expect(en.technologies).not.toContain('SQLAlchemy');
  });

  it('includes verified AFC results and a careful interpretation for every figure', () => {
    const fr = getProjectDetailCopy('afc', 'fr');
    const en = getProjectDetailCopy('afc', 'en');

    expect(fr?.dataConstruction).toMatch(/6 domaines et 35 compétences.*25 955.*offres étudiées/);
    expect(en?.dataConstruction).toMatch(/6 fields and 35 skills.*25,955.*ads studied/);
    expect(fr?.results.map(({ value }) => value).join(' ')).toMatch(/67 617,28.*2,6052.*29,2 %.*27,0 %.*56,2 %/);
    expect(en?.results.map(({ value }) => value).join(' ')).toMatch(/67,617\.28.*2\.6052.*29\.2%.*27\.0%.*56\.2%/);
    expect(fr?.limitations.join(' ')).toMatch(/résultat global/);
    expect(fr?.limitations.join(' ')).toMatch(/chaque paire/);
    expect(en?.limitations.join(' ')).toMatch(/global.*each field–skill pair/);

    for (const copy of [fr, en]) {
      expect(copy?.gallery).toHaveLength(3);
      expect(copy?.gallery.every((image) => image.analysis)).toBe(true);
      expect(copy?.gallery.map((image) => image.analysis?.question).join(' ')).toBeTruthy();
      expect(copy?.gallery.map((image) => image.analysis?.limitation).join(' ')).toMatch(/cos²|cos2/);
    }
  });

  it('shows the same supervisor for AFC and PCA in both languages', () => {
    for (const locale of ['fr', 'en'] as const) {
      expect(getProjectDetailCopy('afc', locale)?.supervisors).toEqual(
        getProjectDetailCopy('acp', locale)?.supervisors
      );
      expect(getProjectDetailCopy('acp', locale)?.supervisors?.[0].name).toBe('Ahmed Aghrich');
    }
  });

  it('links only the reviewed project documents', () => {
    expect(getProjectDetailCopy('gtm', 'fr')?.documents).toEqual([
      {
        href: '/documents/projects/gtm-internship-report-fr.pdf',
        label: 'Rapport de stage en français (PDF)',
      },
    ]);
    expect(getProjectDetailCopy('afc', 'fr')?.documents?.[0].href).toBe(
      '/documents/projects/afc-methodology-presentation-fr.pdf'
    );
    expect(getProjectDetailCopy('sante-scolaire', 'fr')?.documents?.[0].href).toBe(
      '/documents/projects/santescolaire-project-presentation-fr.pdf'
    );
    expect(getProjectDetailCopy('olist', 'fr')?.documents?.[0].href).toBe(
      '/documents/projects/olist-report-fr.pdf'
    );
    expect(getProjectDetailCopy('olist', 'en')?.documents?.[0].href).toBe(
      '/documents/projects/olist-report-fr.pdf'
    );
    expect(getProjectDetailCopy('revision-flow', 'fr')?.documents).toEqual([
      {
        href: '/documents/projects/revisionflow-report-fr.pdf',
        label: 'Rapport complet de RevisionFlow (PDF)',
      },
    ]);
    expect(getProjectDetailCopy('revision-flow', 'en')?.documents).toEqual([
      {
        href: '/documents/projects/revisionflow-report-fr.pdf',
        label: 'RevisionFlow full report (French PDF)',
      },
    ]);
    expect(getProjectDetailCopy('novastore', 'fr')?.documents).toBeUndefined();
  });

  it('documents the current GTM test suite in both displayed languages', () => {
    for (const statement of Object.values(GTM_QUALITY_COPY)) {
      expect(statement).not.toMatch(/\b124\b/);
      expect(statement).toMatch(/166/);
      expect(statement).not.toMatch(/README/i);
    }
    expect(GTM_QUALITY_COPY.fr).toMatch(/166 tests automatisés/);
    expect(GTM_QUALITY_COPY.fr).toMatch(/166 réussissaient lors de la dernière exécution disponible/);
    expect(GTM_QUALITY_COPY.en).toMatch(/166 automated tests/);
    expect(GTM_QUALITY_COPY.en).toMatch(/all 166 passed in the latest available run/);
  });

  it('provides a complete English structure for each generic case study', () => {
    const slugs = ['revision-flow', 'sante-scolaire', 'novastore'] as const;
    expect(Object.keys(ENGLISH_CASE_STUDY_COPY).sort()).toEqual([...slugs].sort());

    for (const slug of slugs) {
      const project = getProjectBySlug(slug);
      const source = project?.caseStudy;
      const copy = getEnglishCaseStudyCopy(slug);
      expect(source).toBeDefined();
      expect(copy).toBeDefined();
      if (!source || !copy) continue;

      expect(copy.problemPoints).toHaveLength(source.problemPoints?.length ?? 0);
      expect(copy.approachSteps).toHaveLength(source.approachSteps?.length ?? 0);
      expect(copy.architectureHighlights).toHaveLength(source.architectureHighlights?.length ?? 0);
      expect(copy.keyDecisions).toHaveLength(source.keyDecisions.length);
      expect(copy.resultLabels).toHaveLength(source.results.length);
      expect(copy.validationPoints).toHaveLength(source.validationPoints?.length ?? 0);
      expect(copy.technologyCategories).toHaveLength(source.technologiesDetailed.length);

      const localized = localizeCaseStudy(source, copy);
      expect(localized.problemPoints).toHaveLength(source.problemPoints?.length ?? 0);
      expect(localized.approachSteps).toHaveLength(source.approachSteps?.length ?? 0);
      expect(localized.architectureHighlights).toHaveLength(source.architectureHighlights?.length ?? 0);
      expect(localized.keyDecisions).toHaveLength(source.keyDecisions.length);
      expect(localized.results.map(({ value }) => value)).toEqual(source.results.map(({ value }) => value));
      expect(localized.validationPoints).toHaveLength(source.validationPoints?.length ?? 0);
      expect(localized.technologiesDetailed.map(({ items }) => items.length)).toEqual(
        source.technologiesDetailed.map(({ items }) => items.length)
      );
      expect(localized.githubUrl).toBe(source.githubUrl);
      expect([
        localized.heroTagline,
        localized.problem,
        localized.approach,
        localized.roleDescription,
        localized.implementation,
        localized.validation,
        localized.reflection,
        ...localized.problemPoints ?? [],
        ...localized.approachSteps?.flatMap(({ step, description }) => [step, description]) ?? [],
        ...localized.architectureHighlights ?? [],
        ...localized.keyDecisions.flatMap(({ title, decision, rationale, impact }) => [title, decision, rationale, impact]),
        ...localized.results.flatMap(({ label, detail }) => [label, detail ?? '']),
        ...localized.validationPoints ?? [],
        ...localized.technologiesDetailed.map(({ category }) => category),
        ...localized.technologiesDetailed.flatMap(({ items }) => items),
      ].every((text) => text.trim().length > 0)).toBe(true);
    }
  });

  it('keeps all eight projects backed by a case-study route source', () => {
    expect(PROJECTS).toHaveLength(8);
    expect(PROJECTS.every(({ slug, caseStudy }) => Boolean(slug && caseStudy))).toBe(true);
  });
});

describe('Data Layer - Skills & Bidirectional Mapping', () => {
  it('should map every skill projectSlug to a valid existing project', () => {
    const validProjectSlugs = new Set(PROJECTS.map((p) => p.slug));
    
    for (const skill of SKILLS) {
      for (const slug of skill.projectSlugs) {
        expect(validProjectSlugs.has(slug)).toBe(true);
      }
    }
  });

  it('should find skills associated with GTM', () => {
    const gtmSkills = getSkillsForProject('gtm');
    expect(gtmSkills.length).toBeGreaterThan(0);
    const skillNames = gtmSkills.map((s) => s.name);
    expect(skillNames).toContain('Flask');
    expect(skillNames).toContain('SQLAlchemy');
  });

  it('should expose existing catalog skills used in the pneumonia project', () => {
    const skillNames = getSkillsForProject('pneumonia-detection').map(({ name }) => name);
    expect(skillNames).toEqual(expect.arrayContaining([
      'Data Visualization',
      'NumPy',
      'Matplotlib',
      'Python',
      'Git',
      'Jupyter',
    ]));
  });
});

describe('Data Layer - Profile & Positioning', () => {
  it('should match Godwin Elie NOUGBOLO profile specs', () => {
    expect(PROFILE.name).toBe('Godwin Elie NOUGBOLO');
    expect(PROFILE.badge).toBe('Stage à partir de juillet 2027');
    expect(PROFILE.tagline).toBe('Comprendre → Analyser → Construire');
    expect(PROFILE.corePhilosophy).toBe('Preuve > Affirmation');
    expect(PROFILE.primaryFocus).toBe('Data Engineering · Data Analysis & Business Intelligence');
    expect(PROFILE.growingFields).toContain('Data Engineering');
    expect(PROFILE.growingFields).toContain('Data Science');
    expect(PROFILE.growingFields).toContain('Machine Learning');
    expect(PROFILE.growingFields).toContain('Deep Learning');
  });

  it('should have all contact and social URLs centralized in profile', () => {
    expect(PROFILE.contact.email).toBeDefined();
    expect(PROFILE.contact.github).toContain('github.com');
    expect(PROFILE.contact.linkedin).toContain('linkedin.com');
    expect(PROFILE.contact.cvPath).toBeNull();
  });
});

describe('Technical Validation - i18n & next-intl', () => {
  it('should have valid routing configuration with fr and en locales', () => {
    expect(routing.locales).toEqual(['fr', 'en']);
    expect(routing.defaultLocale).toBe('fr');
    expect(routing.localePrefix).toBe('as-needed');
    expect(routing.localeDetection).toBe(false);
  });

  it('should have consistent dictionary structure across fr and en', () => {
    const collectMessages = (value: unknown, prefix = ''): Array<[string, string]> => {
      if (typeof value === 'string') return [[prefix, value]];
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return Object.entries(value).flatMap(([key, entry]) =>
          collectMessages(entry, prefix ? `${prefix}.${key}` : key)
        );
      }
      return [];
    };

    const frEntries = collectMessages(frMessages);
    const enEntries = collectMessages(enMessages);
    expect(frEntries.map(([key]) => key)).toEqual(enEntries.map(([key]) => key));
    expect(frEntries.every(([, value]) => value.trim().length > 0)).toBe(true);
    expect(enEntries.every(([, value]) => value.trim().length > 0)).toBe(true);
    expect(Object.keys(frMessages.skills.descriptions).sort()).toEqual(
      SKILLS.map(({ id }) => id).sort()
    );
    expect(Object.keys(frMessages.skills.names).sort()).toEqual(
      SKILLS.map(({ id }) => id).sort()
    );
    expect(Object.keys(frMessages.projects.categories).sort()).toEqual(
      ALL_PROJECT_CATEGORIES.map(({ slug }) => slug).sort()
    );
  });
});

describe('Technical Validation - MDX Content Layer', () => {
  it('should safely resolve mdx loader without error for non-existent slug', async () => {
    const content = await getProjectMDX('non-existent-project');
    expect(content).toBeNull();
  });
});
