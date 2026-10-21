export type ProjectCategory = 
  | 'Tous'
  | 'Data Analysis'
  | 'Web / SI'
  | 'Statistiques'
  | 'Machine Learning'
  | 'Data Engineering';

export type ProjectContextType = 
  | 'Professionnel (Individuel)'
  | 'Académique (Binôme)'
  | 'Académique (Équipe)'
  | 'Académique (Individuel)'
  | 'Projet Personnel';

export interface ProjectMetric {
  value: string;
  label: string;
  detail?: string;
}

export interface KeyDecision {
  title: string;
  decision: string;
  rationale: string;
  impact: string;
}

export interface CaseStudyData {
  heroTagline: string;
  problem: string;
  problemPoints?: string[];
  approach: string;
  approachSteps?: { step: string; description: string }[];
  roleDescription: string;
  implementation: string;
  architectureHighlights?: string[];
  keyDecisions: KeyDecision[];
  results: ProjectMetric[];
  validation: string;
  validationPoints?: string[];
  reflection: string;
  technologiesDetailed: { category: string; items: string[] }[];
  githubUrl?: string;
  liveUrl?: string;
  reportUrl?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: Exclude<ProjectCategory, 'Tous'>;
  isFeatured: boolean;
  order: number;
  context: ProjectContextType;
  period: string;
  summary: string;
  skills: string[];
  keyMetrics: ProjectMetric[];
  accentColor: string;
  image?: string;
  caseStudy?: CaseStudyData;
  isFlagship?: boolean;
}

export type SkillCategory = 
  | 'Data & Analyse'
  | 'Développement & Backend'
  | 'Statistiques & Modélisation'
  | 'Outils & Ingénierie';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  projectSlugs: string[];
  isTopSkill?: boolean;
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  context: string;
  highlights: string[];
  skills: string[];
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  location: string;
  description: string;
  specialties: string[];
}
