import { describe, it, expect } from 'vitest';
import { filterProjects as applyProjectFilters, getAllProjects, PROJECTS } from '@/data/projects';
import { SKILLS, SKILL_CATEGORIES } from '@/data/skills';
import frMessages from '../messages/fr.json';
import enMessages from '../messages/en.json';

// ---------- Helper: reproduce the same filtering logic as the page ----------
function filterProjects({
  categorySlug = null as string | null,
  skillId = null as string | null,
}: {
  categorySlug?: string | null;
  skillId?: string | null;
}) {
  return applyProjectFilters(getAllProjects(), categorySlug, skillId);
}

// ---------------------------------------------------------------------------

describe('Projects Page - No Filter (all projects)', () => {
  it('should return all projects when no filter is applied', () => {
    const results = filterProjects({});
    expect(results.length).toBe(PROJECTS.length);
    expect(results.length).toBeGreaterThanOrEqual(6);
  });
});

describe('Projects Page - Category Filter', () => {
  it('should filter by Data Analysis category', () => {
    const results = filterProjects({ categorySlug: 'data-analysis' });
    expect(results.length).toBeGreaterThanOrEqual(1);
    results.forEach((p) => {
      expect(p.category).toBe('Data Analysis');
    });
    expect(results.some((p) => p.slug === 'olist')).toBe(true);
  });

  it('should filter by Web / SI category', () => {
    const results = filterProjects({ categorySlug: 'web-si' });
    expect(results.length).toBeGreaterThanOrEqual(1);
    results.forEach((p) => {
      expect(p.category).toBe('Web / SI');
    });
    expect(results.some((p) => p.slug === 'gtm')).toBe(true);
  });

  it('should filter by Statistiques category', () => {
    const results = filterProjects({ categorySlug: 'statistiques' });
    expect(results.length).toBeGreaterThanOrEqual(1);
    results.forEach((p) => {
      expect(p.category).toBe('Statistiques');
    });
    expect(results.some((p) => p.slug === 'afc')).toBe(true);
  });
});

describe('Projects Page - Skill Filter', () => {
  it('should filter by skill ID "pandas"', () => {
    const results = filterProjects({ skillId: 'pandas' });
    expect(results.length).toBeGreaterThanOrEqual(1);
    results.forEach((p) => {
      expect(p.skills.some((s) => s.toLowerCase() === 'pandas')).toBe(true);
    });
  });

  it('should filter by skill ID "flask"', () => {
    const results = filterProjects({ skillId: 'flask' });
    expect(results.length).toBeGreaterThanOrEqual(1);
    results.forEach((p) => {
      expect(p.skills.some((s) => s.toLowerCase() === 'flask')).toBe(true);
    });
  });

  it('should filter by skill ID "numpy"', () => {
    const results = filterProjects({ skillId: 'numpy' });
    expect(results.length).toBeGreaterThanOrEqual(1);
    results.forEach((p) => {
      expect(p.skills.some((s) => s.toLowerCase() === 'numpy')).toBe(true);
    });
  });

  it('should link Business Intelligence to its dashboard case study', () => {
    const results = filterProjects({ skillId: 'business-intelligence' });
    expect(results.map((project) => project.slug)).toEqual(['gtm']);
  });
});

describe('Projects Page - Combined Filters', () => {
  it('should combine category and skill filters', () => {
    const results = filterProjects({ categorySlug: 'web-si', skillId: 'flask' });
    expect(results.length).toBeGreaterThanOrEqual(1);
    results.forEach((p) => {
      expect(p.category).toBe('Web / SI');
      expect(p.skills.some((s) => s.toLowerCase() === 'flask')).toBe(true);
    });
  });

  it('should return empty for impossible combination', () => {
    // Data Analysis projects don't use Flask
    const results = filterProjects({ categorySlug: 'data-analysis', skillId: 'flask' });
    expect(results.length).toBe(0);
  });
});

describe('Projects Page - Empty State', () => {
  it('should return all projects for non-existent skill ID (graceful fallback)', () => {
    const results = filterProjects({ skillId: 'nonexistent-skill-xyz' });
    // When skill ID doesn't match any known skill, the filter is a no-op
    expect(results.length).toBe(PROJECTS.length);
  });

  it('should return the pneumonia case study for the Machine Learning category', () => {
    const results = filterProjects({ categorySlug: 'machine-learning' });
    expect(results.map(({ slug }) => slug)).toEqual(['pneumonia-detection']);
  });
});

describe('Projects Page - Skill ↔ Project Consistency', () => {
  it('orders skill categories by relevance to the profile', () => {
    const categoryOrder = [
      'data-analysis',
      'data-management',
      'programming',
      'application-development',
      'development-tools',
    ];
    const actualOrder = [...new Set(SKILLS.map((skill) => skill.category))];

    expect(actualOrder).toEqual(categoryOrder);
    expect(SKILL_CATEGORIES).toEqual(categoryOrder);
  });

  it('provides the same translated category structure in French and English', () => {
    const expectedKeys = [...SKILL_CATEGORIES].sort();
    for (const messages of [frMessages, enMessages]) {
      expect(Object.keys(messages.home.skills.categories).sort()).toEqual(expectedKeys);
      expect(Object.keys(messages.home.skills.categoryDescriptions).sort()).toEqual(expectedKeys);
    }
  });

  it('every SKILLS entry id should be a valid identifier usable as URL param', () => {
    for (const skill of SKILLS) {
      // IDs should be lowercase, no spaces
      expect(skill.id).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('keeps each skill association synchronized between the catalog and project tags', () => {
    const skillNames = new Set(SKILLS.map((s) => s.name.toLowerCase()));

    for (const skill of SKILLS) {
      const taggedProjectSlugs = PROJECTS
        .filter((project) => project.skills.some((name) => name.toLowerCase() === skill.name.toLowerCase()))
        .map((project) => project.slug)
        .sort();

      expect([...skill.projectSlugs].sort()).toEqual(taggedProjectSlugs);
      expect(filterProjects({ skillId: skill.id }).map((project) => project.slug).sort())
        .toEqual(taggedProjectSlugs);
    }

    for (const project of PROJECTS) {
      for (const skillName of project.skills) {
        if (skillNames.has(skillName.toLowerCase())) {
          expect(SKILLS.some(
            (skill) => skill.name.toLowerCase() === skillName.toLowerCase()
              && skill.projectSlugs.includes(project.slug)
          )).toBe(true);
        }
      }
    }
  });

  it('links additional CV skills only to projects that demonstrate them', () => {
    const projectSlugsFor = (id: string) =>
      SKILLS.find((skill) => skill.id === id)?.projectSlugs.slice().sort();

    expect(projectSlugsFor('matplotlib')).toEqual(['acp', 'afc', 'olist', 'pneumonia-detection']);
    expect(projectSlugsFor('seaborn')).toEqual(['acp', 'afc', 'olist']);
    expect(projectSlugsFor('scipy')).toEqual(['afc']);
    expect(projectSlugsFor('object-oriented-programming')).toEqual(['afc', 'novastore']);
    expect(projectSlugsFor('relational-modeling')).toEqual(['gtm', 'novastore', 'sante-scolaire']);
    expect(projectSlugsFor('principal-component-analysis')).toEqual(['acp', 'gtm']);
  });
});

describe('Projects Page - Case Study Navigation', () => {
  it('every featured project should have a caseStudy and valid slug for navigation', () => {
    const featured = PROJECTS.filter((p) => p.isFeatured);
    expect(featured.length).toBeGreaterThanOrEqual(3);
    for (const project of featured) {
      expect(project.caseStudy).toBeDefined();
      expect(project.slug).toBeTruthy();
      // The link would be /projects/{slug}
      expect(project.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('the flagship project (GTM) should have detailed case study data', () => {
    const flagship = PROJECTS.find((p) => p.isFlagship);
    expect(flagship).toBeDefined();
    expect(flagship?.caseStudy?.keyDecisions.length).toBeGreaterThan(0);
    expect(flagship?.caseStudy?.results.length).toBeGreaterThan(0);
    expect(flagship?.caseStudy?.approachSteps?.length).toBeGreaterThan(0);
  });
});
