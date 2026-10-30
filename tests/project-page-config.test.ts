import { describe, expect, it } from 'vitest';
import { getAllProjects } from '@/data/projects';
import { getProjectPageConfig, PROJECT_PAGE_CONFIG } from '@/data/project-page-config';

describe('Project detail page configuration', () => {
  it('provides an editorial layout and an accent palette for every project', () => {
    const projectSlugs = getAllProjects().map(({ slug }) => slug).sort();

    expect(Object.keys(PROJECT_PAGE_CONFIG).sort()).toEqual(projectSlugs);
    expect(new Set(Object.values(PROJECT_PAGE_CONFIG).map(({ accent }) => accent)).size).toBe(projectSlugs.length);

    for (const slug of projectSlugs) {
      const config = getProjectPageConfig(slug);
      expect(config.accent).toMatch(/^#[\da-f]{6}$/i);
      expect(config.accentText).toMatch(/^#[\da-f]{6}$/i);
      expect(config.accentDark).toMatch(/^#[\da-f]{6}$/i);

      if (config.layout.kind === 'sections') {
        expect(new Set(config.layout.order).size).toBe(config.layout.order.length);
      }
    }
  });

  it('keeps the analytical case studies on their specialized layouts', () => {
    expect(getProjectPageConfig('olist').layout.kind).toBe('olist');
    expect(getProjectPageConfig('afc').layout.kind).toBe('afc');
  });

  it('fails explicitly when a project has no page configuration', () => {
    expect(() => getProjectPageConfig('unknown-project')).toThrow(
      'Missing project page configuration for unknown-project',
    );
  });
});
