import type { PROJECT_DETAIL_COPY } from '@/data/project-details';

export type ProjectPageSlug = keyof typeof PROJECT_DETAIL_COPY;

export type ProjectPageSection =
  | 'data'
  | 'method'
  | 'gallery'
  | 'architecture'
  | 'decisions'
  | 'results'
  | 'limitations'
  | 'documents';

export type ProjectPageConfig =
  | {
      accent: string;
      accentText: string;
      accentDark: string;
      layout: { kind: 'sections'; order: readonly ProjectPageSection[] };
    }
  | {
      accent: string;
      accentText: string;
      accentDark: string;
      layout: { kind: 'olist' };
    }
  | {
      accent: string;
      accentText: string;
      accentDark: string;
      layout: { kind: 'afc' };
    };

export const PROJECT_PAGE_CONFIG = {
  gtm: {
    accent: '#F26B1F',
    accentText: '#A9430E',
    accentDark: '#FF9A5E',
    layout: {
      kind: 'sections',
      order: ['method', 'architecture', 'decisions', 'gallery', 'documents', 'results', 'limitations'],
    },
  },
  olist: {
    accent: '#D9573B',
    accentText: '#B8402C',
    accentDark: '#FF8C76',
    layout: { kind: 'olist' },
  },
  afc: {
    accent: '#173B67',
    accentText: '#173B67',
    accentDark: '#91B9E8',
    layout: { kind: 'afc' },
  },
  acp: {
    accent: '#C62828',
    accentText: '#B42318',
    accentDark: '#FF8585',
    layout: {
      kind: 'sections',
      order: ['method', 'decisions', 'gallery', 'results', 'limitations', 'documents'],
    },
  },
  'revision-flow': {
    accent: '#625BDA',
    accentText: '#5138A6',
    accentDark: '#A9A4FF',
    layout: {
      kind: 'sections',
      order: ['method', 'decisions', 'gallery', 'results', 'limitations', 'documents'],
    },
  },
  'sante-scolaire': {
    accent: '#008E78',
    accentText: '#186844',
    accentDark: '#4CD9B8',
    layout: {
      kind: 'sections',
      order: ['method', 'architecture', 'decisions', 'gallery', 'results', 'limitations', 'documents'],
    },
  },
  novastore: {
    accent: '#E9562A',
    accentText: '#B83E2E',
    accentDark: '#FF8A61',
    layout: {
      kind: 'sections',
      order: ['method', 'gallery', 'architecture', 'decisions', 'results', 'limitations', 'documents'],
    },
  },
  'pneumonia-detection': {
    accent: '#0284C7',
    accentText: '#0369A1',
    accentDark: '#38BDF8',
    layout: {
      kind: 'sections',
      order: ['data', 'method', 'architecture', 'decisions', 'gallery', 'results', 'limitations', 'documents'],
    },
  },
  'goodthought-sql-analysis': {
    accent: '#168A72',
    accentText: '#08705B',
    accentDark: '#49C6A7',
    layout: {
      kind: 'sections',
      order: ['data', 'method', 'results', 'limitations', 'documents'],
    },
  },
  'motorcycle-parts-sales': {
    accent: '#C77A24',
    accentText: '#9A5712',
    accentDark: '#F2A64F',
    layout: {
      kind: 'sections',
      order: ['data', 'method', 'results', 'limitations', 'documents'],
    },
  },
  'students-mental-health': {
    accent: '#7762A8',
    accentText: '#5D478F',
    accentDark: '#B3A0E2',
    layout: {
      kind: 'sections',
      order: ['data', 'method', 'results', 'limitations', 'documents'],
    },
  },
  'grocery-store-sales': {
    accent: '#0D9488',
    accentText: '#0F766E',
    accentDark: '#2DD4BF',
    layout: {
      kind: 'sections',
      order: ['data', 'method', 'gallery', 'results', 'limitations', 'documents'],
    },
  },
} satisfies Record<ProjectPageSlug, ProjectPageConfig>;

export function getProjectPageConfig(slug: string): ProjectPageConfig {
  if (!Object.prototype.hasOwnProperty.call(PROJECT_PAGE_CONFIG, slug)) {
    throw new Error(`Missing project page configuration for ${slug}`);
  }

  return PROJECT_PAGE_CONFIG[slug as ProjectPageSlug];
}
