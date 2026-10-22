import { Skill } from '@/types';

export const SKILLS: Skill[] = [
  // Langages & Data Core
  {
    id: 'python',
    name: 'Python',
    category: 'Data & Analyse',
    projectSlugs: ['olist', 'gtm', 'afc'],
    isTopSkill: true,
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Data & Analyse',
    projectSlugs: ['gtm', 'sante-scolaire'],
    isTopSkill: true,
  },
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'Data & Analyse',
    projectSlugs: ['olist', 'gtm', 'afc'],
    isTopSkill: true,
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'Data & Analyse',
    projectSlugs: ['afc', 'olist', 'gtm'],
    isTopSkill: true,
  },
  {
    id: 'matplotlib',
    name: 'Matplotlib',
    category: 'Data & Analyse',
    projectSlugs: ['olist', 'afc'],
    isTopSkill: true,
  },
  {
    id: 'chart-js',
    name: 'Chart.js',
    category: 'Data & Analyse',
    projectSlugs: ['gtm', 'sante-scolaire', 'novastore'],
    isTopSkill: false,
  },
  {
    id: 'business-intelligence',
    name: 'Business Intelligence',
    category: 'Data & Analyse',
    projectSlugs: ['gtm'],
    isTopSkill: true,
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Développement & Backend',
    projectSlugs: ['gtm', 'sante-scolaire', 'novastore'],
    isTopSkill: true,
  },
  {
    id: 'flask',
    name: 'Flask',
    category: 'Développement & Backend',
    projectSlugs: ['gtm', 'revision-flow'],
    isTopSkill: true,
  },
  {
    id: 'sqlalchemy',
    name: 'SQLAlchemy',
    category: 'Développement & Backend',
    projectSlugs: ['gtm', 'sante-scolaire', 'novastore'],
    isTopSkill: true,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Développement & Backend',
    projectSlugs: ['gtm', 'revision-flow', 'novastore', 'sante-scolaire'],
    isTopSkill: false,
  },
  {
    id: 'html-css',
    name: 'HTML/CSS',
    category: 'Développement & Backend',
    projectSlugs: ['gtm', 'revision-flow', 'novastore', 'sante-scolaire'],
    isTopSkill: false,
  },
  {
    id: 'git',
    name: 'Git',
    category: 'Outils & Ingénierie',
    projectSlugs: ['gtm', 'olist', 'afc'],
    isTopSkill: true,
  },
  {
    id: 'statistiques',
    name: 'Statistiques',
    category: 'Statistiques & Modélisation',
    projectSlugs: ['afc', 'olist'],
    isTopSkill: true,
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    category: 'Data & Analyse',
    projectSlugs: ['olist', 'gtm', 'afc'],
    isTopSkill: true,
  },
  {
    id: 'backend',
    name: 'Backend',
    category: 'Développement & Backend',
    projectSlugs: ['gtm', 'revision-flow'],
    isTopSkill: true,
  },
  {
    id: 'bases-de-donnees',
    name: 'Bases de données',
    category: 'Data & Analyse',
    projectSlugs: ['gtm', 'sante-scolaire', 'novastore'],
    isTopSkill: true,
  },
  {
    id: 'systemes-d-information',
    name: 'Systèmes d\'information',
    category: 'Développement & Backend',
    projectSlugs: ['gtm', 'sante-scolaire'],
    isTopSkill: true,
  },
  {
    id: 'scipy',
    name: 'SciPy',
    category: 'Statistiques & Modélisation',
    projectSlugs: ['afc'],
    isTopSkill: false,
  },
  {
    id: 'jupyter',
    name: 'Jupyter',
    category: 'Outils & Ingénierie',
    projectSlugs: ['olist', 'afc'],
    isTopSkill: false,
  },
  {
    id: 'pytest',
    name: 'pytest',
    category: 'Outils & Ingénierie',
    projectSlugs: ['gtm', 'sante-scolaire'],
    isTopSkill: true,
  },
  {
    id: 'openpyxl',
    name: 'openpyxl',
    category: 'Outils & Ingénierie',
    projectSlugs: ['gtm'],
    isTopSkill: false,
  },
  {
    id: 'seaborn',
    name: 'Seaborn',
    category: 'Data & Analyse',
    projectSlugs: ['olist'],
    isTopSkill: false,
  },
  {
    id: 'reportlab',
    name: 'ReportLab',
    category: 'Outils & Ingénierie',
    projectSlugs: ['gtm'],
    isTopSkill: false,
  },
];

export function getSkillById(id: string): Skill | undefined {
  return SKILLS.find((s) => s.id === id);
}

export function getSkillsForProject(projectSlug: string): Skill[] {
  return SKILLS.filter((s) => s.projectSlugs.includes(projectSlug));
}
