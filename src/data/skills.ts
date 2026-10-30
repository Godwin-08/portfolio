import type { Skill, SkillCategory } from '@/types';

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  'data-analysis',
  'data-management',
  'programming',
  'application-development',
  'development-tools',
];

export const SKILLS: Skill[] = [
  {
    id: 'data-preparation',
    name: 'Data Preparation',
    category: 'data-analysis',
    projectSlugs: ['olist', 'afc', 'acp'],
    isTopSkill: true,
  },
  {
    id: 'data-cleaning',
    name: 'Data Cleaning',
    category: 'data-analysis',
    projectSlugs: ['olist'],
    isTopSkill: true,
  },
  {
    id: 'statistiques',
    name: 'Statistiques',
    category: 'data-analysis',
    projectSlugs: ['gtm', 'olist', 'afc', 'acp'],
    isTopSkill: true,
  },
  {
    id: 'data-visualization',
    name: 'Data Visualization',
    category: 'data-analysis',
    projectSlugs: ['gtm', 'olist', 'afc', 'acp', 'sante-scolaire', 'pneumonia-detection'],
    isTopSkill: true,
  },
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'data-analysis',
    projectSlugs: ['gtm', 'olist', 'afc', 'acp'],
    isTopSkill: true,
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'data-analysis',
    projectSlugs: ['afc', 'olist', 'gtm', 'acp', 'pneumonia-detection'],
    isTopSkill: true,
  },
  {
    id: 'matplotlib',
    name: 'Matplotlib',
    category: 'data-analysis',
    projectSlugs: ['olist', 'afc', 'acp', 'pneumonia-detection'],
    isTopSkill: false,
  },
  {
    id: 'seaborn',
    name: 'Seaborn',
    category: 'data-analysis',
    projectSlugs: ['olist', 'afc', 'acp'],
    isTopSkill: false,
  },
  {
    id: 'principal-component-analysis',
    name: 'Principal Component Analysis (PCA)',
    category: 'data-analysis',
    projectSlugs: ['gtm', 'acp'],
    isTopSkill: false,
  },
  {
    id: 'scipy',
    name: 'SciPy',
    category: 'data-analysis',
    projectSlugs: ['afc'],
    isTopSkill: false,
  },
  {
    id: 'business-intelligence',
    name: 'Business Intelligence',
    category: 'data-analysis',
    projectSlugs: ['gtm'],
    isTopSkill: false,
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'data-management',
    projectSlugs: ['gtm', 'sante-scolaire'],
    isTopSkill: true,
  },
  {
    id: 'relational-modeling',
    name: 'Relational Modeling',
    category: 'data-management',
    projectSlugs: ['gtm', 'novastore', 'sante-scolaire'],
    isTopSkill: false,
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'data-management',
    projectSlugs: ['gtm', 'sante-scolaire'],
    isTopSkill: true,
  },
  {
    id: 'sqlalchemy',
    name: 'SQLAlchemy',
    category: 'data-management',
    projectSlugs: ['gtm', 'sante-scolaire'],
    isTopSkill: false,
  },
  {
    id: 'python',
    name: 'Python',
    category: 'programming',
    projectSlugs: ['gtm', 'olist', 'afc', 'acp', 'novastore', 'sante-scolaire', 'pneumonia-detection'],
    isTopSkill: true,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'programming',
    projectSlugs: ['gtm', 'revision-flow', 'novastore', 'sante-scolaire'],
    isTopSkill: false,
  },
  {
    id: 'html-css',
    name: 'HTML/CSS',
    category: 'programming',
    projectSlugs: ['gtm', 'revision-flow', 'novastore', 'sante-scolaire'],
    isTopSkill: false,
  },
  {
    id: 'object-oriented-programming',
    name: 'Object-Oriented Programming',
    category: 'programming',
    projectSlugs: ['afc', 'novastore'],
    isTopSkill: false,
  },
  {
    id: 'flask',
    name: 'Flask',
    category: 'application-development',
    projectSlugs: ['gtm', 'novastore', 'sante-scolaire'],
    isTopSkill: true,
  },
  {
    id: 'systemes-d-information',
    name: 'Systèmes d\'information',
    category: 'application-development',
    projectSlugs: ['gtm', 'sante-scolaire'],
    isTopSkill: false,
  },
  {
    id: 'git',
    name: 'Git',
    category: 'development-tools',
    projectSlugs: ['gtm', 'olist', 'afc', 'pneumonia-detection'],
    isTopSkill: false,
  },
  {
    id: 'jupyter',
    name: 'Jupyter',
    category: 'development-tools',
    projectSlugs: ['olist', 'afc', 'acp', 'pneumonia-detection'],
    isTopSkill: false,
  },
  {
    id: 'pytest',
    name: 'pytest',
    category: 'development-tools',
    projectSlugs: ['gtm', 'sante-scolaire'],
    isTopSkill: false,
  },
];

export function getSkillById(id: string): Skill | undefined {
  return SKILLS.find((s) => s.id === id);
}

export function getSkillsForProject(projectSlug: string): Skill[] {
  return SKILLS.filter((s) => s.projectSlugs.includes(projectSlug));
}
