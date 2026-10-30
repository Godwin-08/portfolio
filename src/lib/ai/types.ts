export type MatchLevel = 'strong' | 'moderate' | 'indirect';

export type MatchMode = 'ai' | 'keyword';

export type MatchStatus = 'success' | 'no_match' | 'learning_match' | 'answer';

export type QuestionIntent =
  | 'profile'
  | 'education'
  | 'internship'
  | 'experience'
  | 'association'
  | 'skills'
  | 'certifications'
  | 'projects'
  | 'comparison'
  | 'documents'
  | 'general';

export type KnowledgeCategory =
  | 'profile'
  | 'education'
  | 'experience'
  | 'association'
  | 'skill'
  | 'project'
  | 'certification'
  | 'document';

export interface KnowledgeDocument {
  id: string;
  category: KnowledgeCategory;
  title: { fr: string; en: string };
  summary: { fr: string; en: string };
  facts: { fr: string[]; en: string[] };
  proofs?: { fr: string[]; en: string[] };
  limitations?: { fr: string[]; en: string[] };
  href?: string;
  tags: string[];
  source: string;
}

export interface RelatedKnowledgeItem {
  id: string;
  category: KnowledgeCategory;
  title: string;
  summary?: string;
  level?: MatchLevel;
  reason?: string;
  verifiedFacts: string[];
  verifiedProofs?: string[];
  limitations?: string[];
  href?: string;
}

export interface ProjectEvidenceMatch {
  projectId: string;
  projectSlug: string;
  projectTitle: string;
  category: string;
  level: MatchLevel;
  reason: string;
  verifiedProofs: string[];
  limitations: string[];
  href: string;
}

export interface GrowingFieldMatch {
  field: string;
  label: string;
  description: string;
}

export interface EvidenceMatchResponse {
  status: MatchStatus;
  mode: MatchMode;
  query: string;
  locale: 'fr' | 'en';
  intent?: QuestionIntent;
  directAnswer?: string;
  matches: ProjectEvidenceMatch[];
  relatedItems?: RelatedKnowledgeItem[];
  growingFieldMatches?: GrowingFieldMatch[];
  message?: string;
  providerInfo?: {
    model: string;
    notice: string;
  };
}

export interface MatchRequestBody {
  query: string;
  locale?: 'fr' | 'en';
}
