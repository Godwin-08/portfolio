import { describe, it, expect } from 'vitest';
import { getAllProjects, getFeaturedProjects, getProjectBySlug, PROJECTS } from '@/data/projects';
import { SKILLS, getSkillsForProject } from '@/data/skills';
import { PROFILE } from '@/data/profile';
import { routing } from '@/i18n/routing';
import { getProjectMDX } from '@/lib/mdx';
import frMessages from '../messages/fr.json';
import enMessages from '../messages/en.json';

describe('Data Layer - Projects', () => {
  it('should have unique slugs for all projects', () => {
    const slugs = PROJECTS.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
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
    expect(PROFILE.badge).toContain('PFA 2e année');
    expect(PROFILE.tagline).toBe('Comprendre → Analyser → Construire');
    expect(PROFILE.corePhilosophy).toBe('Preuve > Affirmation');
    expect(PROFILE.primaryFocus).toBe('Data Analysis');
    expect(PROFILE.growingFields).toContain('Data Engineering');
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
    expect(frMessages.common).toBeDefined();
    expect(enMessages.common).toBeDefined();
    expect(Object.keys(frMessages.common)).toEqual(Object.keys(enMessages.common));
    expect(Object.keys(frMessages.common.nav)).toEqual(Object.keys(enMessages.common.nav));
    expect(Object.keys(frMessages.common.cta)).toEqual(Object.keys(enMessages.common.cta));
  });
});

describe('Technical Validation - MDX Content Layer', () => {
  it('should safely resolve mdx loader without error for non-existent slug', async () => {
    const content = await getProjectMDX('non-existent-project');
    expect(content).toBeNull();
  });
});
