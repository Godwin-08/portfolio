import { Skill } from '@/types';

export const SKILLS: Skill[] = [
  // Data & Analyse
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'Data & Analyse',
    description: 'Manipulation, nettoyage et agrégation de volumétries de données complexes.',
    projectSlugs: ['olist', 'gtm', 'afc'],
    isTopSkill: true,
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'Data & Analyse',
    description: 'Calcul matriciel vectorisé, algèbre linéaire et optimisation de performance.',
    projectSlugs: ['afc', 'olist', 'gtm'],
    isTopSkill: true,
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Data & Analyse',
    description: 'Langage central pour les pipelines de données, l\'analyse et le backend.',
    projectSlugs: ['gtm', 'olist', 'afc', 'revision-flow'],
    isTopSkill: true,
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    category: 'Data & Analyse',
    description: 'Exploration méthodologique, identification de patterns et métriques de performance.',
    projectSlugs: ['olist', 'gtm', 'afc'],
    isTopSkill: true,
  },
  {
    id: 'matplotlib-seaborn',
    name: 'Matplotlib / Seaborn',
    category: 'Data & Analyse',
    description: 'Visualisations statistiques descriptives, distributions et corrélations.',
    projectSlugs: ['olist', 'afc'],
    isTopSkill: false,
  },
  {
    id: 'chart-js',
    name: 'Chart.js',
    category: 'Data & Analyse',
    description: 'Dashboards interactifs et graphiques dynamiques web.',
    projectSlugs: ['gtm', 'revision-flow'],
    isTopSkill: false,
  },
  {
    id: 'sql',
    name: 'SQL & Modélisation',
    category: 'Data & Analyse',
    description: 'Requêtes complexes, jointures, indexation et modélisation relationnelle (3NF).',
    projectSlugs: ['gtm', 'sante-scolaire', 'novastore'],
    isTopSkill: true,
  },

  // Développement & Backend
  {
    id: 'flask',
    name: 'Flask',
    category: 'Développement & Backend',
    description: 'Développement de micro-services et d\'applications web modulaires (Blueprints).',
    projectSlugs: ['gtm', 'revision-flow'],
    isTopSkill: true,
  },
  {
    id: 'sqlalchemy',
    name: 'SQLAlchemy',
    category: 'Développement & Backend',
    description: 'ORM avancé, gestion de sessions, migrations et relations complexes.',
    projectSlugs: ['gtm', 'sante-scolaire'],
    isTopSkill: true,
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Développement & Backend',
    description: 'Administration de bases relationnelles, intégrité référentielle et contraintes.',
    projectSlugs: ['gtm', 'sante-scolaire', 'novastore'],
    isTopSkill: false,
  },
  {
    id: 'tailwind-css',
    name: 'Tailwind CSS',
    category: 'Développement & Backend',
    description: 'Intégration d\'interfaces modernes, cohérentes et responsives.',
    projectSlugs: ['gtm', 'cestom', 'revision-flow'],
    isTopSkill: true,
  },
  {
    id: 'alpine-js',
    name: 'Alpine.js',
    category: 'Développement & Backend',
    description: 'Interactivité légère côté client sans surcoût d\'architecture.',
    projectSlugs: ['gtm'],
    isTopSkill: false,
  },
  {
    id: 'typescript-react',
    name: 'TypeScript / React',
    category: 'Développement & Backend',
    description: 'Applications web modernes typées et interfaces utilisateur dynamiques.',
    projectSlugs: ['cestom', 'revision-flow'],
    isTopSkill: false,
  },

  // Statistiques & Modélisation
  {
    id: 'scipy',
    name: 'SciPy',
    category: 'Statistiques & Modélisation',
    description: 'Calculs scientifiques, algèbre linéaire et décompositions factorielles.',
    projectSlugs: ['afc'],
    isTopSkill: true,
  },
  {
    id: 'afc-math',
    name: 'Analyse Factorielle (AFC)',
    category: 'Statistiques & Modélisation',
    description: 'Étude des tableaux de contingence, profils lignes/colonnes et inertie totale.',
    projectSlugs: ['afc'],
    isTopSkill: false,
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning (En essor)',
    category: 'Statistiques & Modélisation',
    description: 'Modèles supervisés / non supervisés, évaluation et classification.',
    projectSlugs: ['pneumonie'],
    isTopSkill: false,
  },

  // Outils & Ingénierie
  {
    id: 'pytest',
    name: 'pytest',
    category: 'Outils & Ingénierie',
    description: 'Tests unitaires, tests de régression et validation fonctionnelle continue.',
    projectSlugs: ['gtm', 'afc'],
    isTopSkill: true,
  },
  {
    id: 'reportlab',
    name: 'ReportLab',
    category: 'Outils & Ingénierie',
    description: 'Génération programmatique de documents PDF vectoriels haute fidélité.',
    projectSlugs: ['gtm'],
    isTopSkill: false,
  },
  {
    id: 'openpyxl',
    name: 'openpyxl',
    category: 'Outils & Ingénierie',
    description: 'Automatisation et génération de classeurs Excel dynamiques multi-onglets.',
    projectSlugs: ['gtm'],
    isTopSkill: false,
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'Outils & Ingénierie',
    description: 'Gestion de versions, travail collaboratif et documentation de projets.',
    projectSlugs: ['gtm', 'olist', 'afc', 'cestom'],
    isTopSkill: true,
  },
  {
    id: 'jupyter',
    name: 'Jupyter Notebooks',
    category: 'Outils & Ingénierie',
    description: 'Analyses exploratoires reproductibles, documentation vivante et graphiques.',
    projectSlugs: ['olist', 'afc'],
    isTopSkill: false,
  },
];

export function getSkillById(id: string): Skill | undefined {
  return SKILLS.find((s) => s.id === id);
}

export function getSkillsForProject(projectSlug: string): Skill[] {
  return SKILLS.filter((s) => s.projectSlugs.includes(projectSlug));
}

