import { describe, it, expect } from 'vitest';
import { ALL_PROJECT_CATEGORIES, getFeaturedProjects, getProjectBySlug, PROJECTS } from '@/data/projects';
import { ENGLISH_CASE_STUDY_COPY, getEnglishCaseStudyCopy, localizeCaseStudy } from '@/data/case-study-translations';
import { SKILLS, getSkillsForProject } from '@/data/skills';
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

  it('should preserve the six project cards in their existing order', () => {
    expect(PROJECTS.map(({ id }) => id)).toEqual([
      'gtm', 'olist', 'afc', 'revision-flow', 'sante-scolaire', 'novastore',
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
});

describe('Localized case study content', () => {
  it('documents the current GTM test suite in both displayed languages', () => {
    for (const statement of Object.values(GTM_QUALITY_COPY)) {
      expect(statement).not.toMatch(/\b124\b/);
      expect(statement).toMatch(/166/);
      expect(statement).toMatch(/README/i);
    }
    expect(GTM_QUALITY_COPY.fr).toMatch(/166 tests automatisés/);
    expect(GTM_QUALITY_COPY.fr).toMatch(/166 tests réussis/);
    expect(GTM_QUALITY_COPY.en).toMatch(/166 automated tests/);
    expect(GTM_QUALITY_COPY.en).toMatch(/all 166 passing/);
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

  it('keeps all six projects backed by a case-study route source', () => {
    expect(PROJECTS).toHaveLength(6);
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
});

describe('Data Layer - Profile & Positioning', () => {
  it('should match Godwin Elie Nougbolo profile specs', () => {
    expect(PROFILE.name).toBe('Godwin Elie Nougbolo');
    expect(PROFILE.badge).toBe('Stage à partir de juillet 2027');
    expect(PROFILE.tagline).toBe('Comprendre → Analyser → Construire');
    expect(PROFILE.corePhilosophy).toBe('Preuve > Affirmation');
    expect(PROFILE.primaryFocus).toBe('Data Analysis & Business Intelligence');
    expect(PROFILE.growingFields).toContain('Data Engineering');
    expect(PROFILE.growingFields).toContain('Data Science');
    expect(PROFILE.growingFields).toContain('Machine Learning');
  });

  it('should have all contact and social URLs centralized in profile', () => {
    expect(PROFILE.contact.email).toBeDefined();
    expect(PROFILE.contact.github).toContain('github.com');
    expect(PROFILE.contact.linkedin).toContain('linkedin.com');
    expect(PROFILE.contact.cvPath).toBeDefined();
  });
});

describe('Technical Validation - i18n & next-intl', () => {
  it('should have valid routing configuration with fr and en locales', () => {
    expect(routing.locales).toEqual(['fr', 'en']);
    expect(routing.defaultLocale).toBe('fr');
    expect(routing.localePrefix).toBe('as-needed');
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
