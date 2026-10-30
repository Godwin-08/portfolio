import {
  EvidenceMatchResponse,
  GrowingFieldMatch,
  KnowledgeDocument,
  MatchLevel,
  ProjectEvidenceMatch,
  QuestionIntent,
  RelatedKnowledgeItem,
} from './types';
import { GROWING_FIELDS_INFO, PROJECT_CORPUS } from './corpus';
import { CERTIFICATIONS } from '@/data/certifications';
import {
  buildPromptKnowledgeContext,
  documentToRelatedItem,
  getKnowledgeDocumentById,
} from './knowledge-corpus';
import { isUndocumentedEmploymentDetailQuery } from './local-matcher';

interface ModelProjectMatch {
  projectId: string;
  level?: MatchLevel;
  reason?: string;
}

interface ModelPredictionOutput {
  intent?: QuestionIntent;
  matchedDocumentIds?: string[];
  projectMatches?: ModelProjectMatch[];
  learningFieldKeys?: string[];
  noMatch?: boolean;
}

const QUESTION_INTENTS: QuestionIntent[] = [
  'profile',
  'education',
  'internship',
  'experience',
  'association',
  'skills',
  'certifications',
  'projects',
  'comparison',
  'documents',
  'general',
];

function isProjectConsistentWithIntent(projectId: string, intent: QuestionIntent): boolean {
  if (intent === 'experience') {
    return projectId === 'gtm';
  }
  return ['skills', 'projects', 'comparison'].includes(intent);
}

function makeProjectMatch(
  projectId: string,
  locale: 'fr' | 'en',
  query: string,
  level: MatchLevel = 'strong'
): ProjectEvidenceMatch {
  const project = PROJECT_CORPUS[projectId];
  if (!project) {
    throw new Error(`Unknown project in AI corpus: ${projectId}`);
  }
  const sqlTechnologies = project.skills.filter((skill) =>
    /sql|mysql|database|relational|relationnel/i.test(skill)
  );

  return {
    projectId: project.id,
    projectSlug: project.slug,
    projectTitle: project.title,
    category: project.category,
    level,
    reason: asksForSqlEvidence(query)
      ? locale === 'fr'
        ? `Technologies documentées : ${sqlTechnologies.join(', ')}.`
        : `Documented technologies: ${sqlTechnologies.join(', ')}.`
      : project[locale].summary,
    verifiedProofs:
      projectId === 'pneumonia-detection'
        ? project[locale].verifiedProofs
        : project[locale].verifiedProofs.slice(0, 3),
    limitations:
      projectId === 'pneumonia-detection'
        ? project[locale].limitations
        : project[locale].limitations.slice(0, 3),
    href: `/${locale === 'fr' ? 'projets' : 'projects'}/${project.slug}`,
  };
}

function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function asksForProjectLimitations(query: string): boolean {
  const normalized = normalizeQuery(query);
  return (
    ['limite', 'limites', 'limitation', 'limitations'].some((term) =>
      normalized.includes(term)
    ) &&
    ['projet', 'project', 'olist'].some((term) => normalized.includes(term))
  );
}

function asksForSqlEvidence(query: string): boolean {
  return /\b(sql|mysql|sqlalchemy|database|databases|relational|relationnel|relationnelle|mcd|mld)\b/i.test(
    normalizeQuery(query)
  );
}

function isDocumentConsistentWithIntent(
  doc: KnowledgeDocument,
  intent: QuestionIntent
): boolean {
  switch (intent) {
    case 'profile':
      return doc.category === 'profile';
    case 'education':
      return doc.category === 'education';
    case 'internship':
      return doc.id === 'profile-internship';
    case 'experience':
      return doc.category === 'experience' || doc.id === 'proj-gtm';
    case 'association':
      return doc.category === 'association';
    case 'skills':
      return ['skill', 'project', 'certification'].includes(doc.category);
    case 'certifications':
      return doc.category === 'certification';
    case 'projects':
    case 'comparison':
      return doc.category === 'project';
    case 'documents':
      return doc.category === 'document';
    case 'general':
      return false;
  }
}

export const DEFAULT_CLOUDFLARE_MODEL = '@cf/meta/llama-3.2-3b-instruct';

const UNSUPPORTED_TECH_KEYWORDS = [
  'kubernetes', 'k8s', 'aws', 'amazon web services', 'azure', 'gcp', 'google cloud',
  'terraform', 'ansible', 'solidity', 'blockchain', 'rust', 'flutter', 'react native',
  'ios', 'swift', 'android', 'kotlin', 'c++', 'c#', '.net', 'cobol', 'angular', 'vue'
];

/**
 * Builds the user-facing answer exclusively from facts selected from the corpus.
 */
function buildGroundedDirectAnswer(
  intent: QuestionIntent,
  matchedDocs: KnowledgeDocument[],
  matchedProjects: ProjectEvidenceMatch[],
  learningFields: GrowingFieldMatch[],
  locale: 'fr' | 'en',
  query: string
): string | undefined {
  const normalized = normalizeQuery(query);

  if (asksForProjectLimitations(query)) {
    const project = matchedProjects.find((match) => match.projectId === 'olist');
    if (project) {
      const limitations = PROJECT_CORPUS.olist[locale].limitations;
      return locale === 'fr'
        ? `Les limites documentées pour Olist sont : ${limitations.join(' ')}`
        : `The documented limitations of Olist are: ${limitations.join(' ')}`;
    }
  }

  if (asksForSqlEvidence(query)) {
    const projects = matchedProjects.filter((match) =>
      ['gtm', 'sante-scolaire'].includes(match.projectId)
    );
    if (projects.length > 0) {
      const titles = projects.map((project) => project.projectTitle);
      return locale === 'fr'
        ? `Les projets documentés qui illustrent les compétences SQL sont : ${titles.join(' et ')}.`
        : `The documented projects demonstrating SQL skills are: ${titles.join(' and ')}.`;
    }
  }

  if (intent === 'experience') {
    const experience = matchedDocs.find(
      (document) => document.id === 'exp-galaxy-solutions'
    );
    if (experience) {
      return experience.facts[locale].join(' ');
    }
  }

  // Use corpus facts for detailed course questions; model prose is not semantically verified.
  const asksDetailedSyllabus = [
    'chapitre', 'chapter', 'programme detaille', 'detailed syllabus',
    'syllabus', 'exercices detailles', 'detailed exercises'
  ].some((w) => normalized.includes(w));
  if (intent === 'certifications' && asksDetailedSyllabus) {
    const courseFacts = matchedDocs
      .filter((doc) => doc.category === 'certification')
      .flatMap((doc) => doc.facts[locale]);
    const topicsFact = courseFacts.find((fact) =>
      locale === 'fr' ? fact.startsWith('Notions recensées') : fact.startsWith('Topics listed')
    );
    const practiceFact = courseFacts.find((fact) =>
      locale === 'fr' ? fact.startsWith('Mise en pratique décrite') : fact.startsWith('Practice described')
    );
    if (topicsFact && practiceFact) {
      return locale === 'fr'
        ? `${topicsFact} ${practiceFact} Le portfolio ne fournit pas de programme détaillé organisé par chapitres.`
        : `${topicsFact} ${practiceFact} The portfolio does not provide a detailed chapter-by-chapter syllabus.`;
    }
    return locale === 'fr'
      ? `Le portfolio répertorie ${CERTIFICATIONS.length} cours DataCamp. Les fiches résument certains thèmes et exercices, mais les programmes détaillés par chapitres ne sont pas documentés.`
      : `The portfolio lists ${CERTIFICATIONS.length} DataCamp courses. Their summaries document selected topics and practice, but detailed chapter-by-chapter syllabi are not available.`;
  }

  if (learningFields.length > 0) {
    return learningFields.map((field) => `${field.label}: ${field.description}`).join(' ');
  }

  const primaryDocument = matchedDocs[0];
  if (primaryDocument) {
    return primaryDocument.facts[locale].slice(0, 3).join(' ');
  }

  const primaryProject = matchedProjects[0];
  if (primaryProject) {
    const project = PROJECT_CORPUS[primaryProject.projectId];
    if (!project) return undefined;
    if (asksForProjectLimitations(query)) {
      return project[locale].limitations.join(' ');
    }
    return `${project.title}: ${project[locale].summary} ${project[locale].context}`;
  }

  return undefined;
}

/**
 * Calls Cloudflare Workers AI via its standard REST API.
 * Uses only server environment variables, never exposing secrets to the client.
 * Strictly grounds all returned items in authoritative facts from KNOWLEDGE_CORPUS.
 * Returns null on any failure (missing key, quota 429, timeout, network error)
 * so that the caller can smoothly fallback to runLocalMatcher.
 */
export async function queryCloudflareAI(
  query: string,
  locale: 'fr' | 'en' = 'fr'
): Promise<EvidenceMatchResponse | null> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  const model = process.env.CLOUDFLARE_AI_MODEL || DEFAULT_CLOUDFLARE_MODEL;

  if (!accountId || !apiToken) {
    return null;
  }

  if (isUndocumentedEmploymentDetailQuery(query)) {
    return null;
  }

  // Early bypass: let the local matcher handle clearly out-of-scope tech queries.
  // This avoids CF returning spurious relatedItems for unsupported tech (e.g. Kubernetes, Terraform).
  // Use same normalization as local-matcher (strips punctuation to spaces) for reliable matching.
  const normQueryEarly = normalizeQuery(query);
  const hasUnsupportedEarly = UNSUPPORTED_TECH_KEYWORDS.some((kw) => normQueryEarly.includes(kw));
  const hasLegitEarly = ['python', 'sql', 'pandas', 'flask', 'gtm', 'olist', 'afc'].some((kw) => normQueryEarly.includes(kw));
  if (hasUnsupportedEarly && !hasLegitEarly) {
    return null;
  }

  // Early bypass: let the local matcher handle learning-intent queries.
  // CF sometimes returns a generic directAnswer without growingFieldMatches for these.
  const LEARNING_BYPASS_PHRASES = [
    'en cours d acquisition', 'en cours d apprentissage', 'axes d apprentissage',
    'competences en cours', 'learning in progress', 'skills in progress',
  ];
  if (LEARNING_BYPASS_PHRASES.some((kw) => normQueryEarly.includes(kw))) {
    return null;
  }

  const knowledgeContext = buildPromptKnowledgeContext(locale);

  const systemPrompt = `You are an objective, precise, and strictly grounded AI assistant for Godwin Elie NOUGBOLO's portfolio.
Evaluate the visitor's query against the authoritative portfolio facts provided below.

Strict Rules:
1. ONLY match document IDs present in the verified corpus (e.g., edu-engineering, edu-deug, edu-baccalaureate, profile-identity, profile-internship, profile-method, exp-galaxy-solutions, assoc-cestom, cert-*, proj-*, doc-*).
2. Never invent qualifications, certifications, metrics, or technologies not present in the verified corpus.
3. For broad skill questions about Data Engineering, Machine Learning, Deep Learning, or Data Science, assign them to learningFieldKeys (these are active learning areas in progress, not production-deployed expertise). When the query asks about a documented project in one of these areas, match that project and do not describe it as a production-deployed skill.
4. For DataCamp courses: distinguish the course title from its completion certificate and official verification link. Mention a completion date or certificate reference only when it appears in the provided facts. Detailed course chapters are not stored in the portfolio; never invent syllabus details.
5. For project comparisons: explain key distinctions concisely in directAnswer and include both projects in projectMatches.
6. Do not write free-form factual prose. The server builds the answer from selected corpus facts.
7. Output MUST be valid raw JSON only, matching this structure:
{
  "intent": "profile" | "education" | "internship" | "experience" | "association" | "skills" | "certifications" | "projects" | "comparison" | "documents" | "general" | "no_match",
  "matchedDocumentIds": ["doc_id_1", "doc_id_2"],
  "projectMatches": [
    { "projectId": "gtm", "level": "strong" | "moderate" | "indirect", "reason": "concise explanation" }
  ],
  "learningFieldKeys": ["data-engineering", "machine-learning", "data-science"],
  "noMatch": boolean
}

Authoritative facts:
${knowledgeContext}`;

  const userPrompt = `Query: "${query}"\nLanguage: ${locale}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.1,
        max_tokens: 600,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    const rawContent: string =
      data?.result?.choices?.[0]?.message?.content ||
      data?.result?.response ||
      data?.result?.description ||
      (typeof data?.result === 'string' ? data.result : '');

    if (!rawContent) {
      return null;
    }

    // Extract JSON block even if model includes commentary or markdown fences
    let jsonText = rawContent.trim();
    const codeBlockMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (codeBlockMatch) {
      jsonText = codeBlockMatch[1].trim();
    } else {
      const braceMatch = jsonText.match(/(\{[\s\S]*\})/);
      if (braceMatch) {
        jsonText = braceMatch[1].trim();
      }
    }

    let parsed: ModelPredictionOutput;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      return null;
    }

    if (parsed.intent && !QUESTION_INTENTS.includes(parsed.intent)) {
      return null;
    }
    const normalizedQuery = normalizeQuery(query);
    const asksOlistLimitations = asksForProjectLimitations(query);
    const asksGalaxyExperience =
      normalizedQuery.includes('galaxy') &&
      ['experience', 'stage', 'internship', 'work', 'presente', 'describe'].some((term) =>
        normalizedQuery.includes(term)
      );
    const asksSql = asksForSqlEvidence(query);
    const requestedIntent: QuestionIntent | undefined = asksOlistLimitations
      ? 'projects'
      : asksGalaxyExperience
        ? 'experience'
        : parsed.intent;
    const declaredReferenceCount =
      (Array.isArray(parsed.projectMatches) ? parsed.projectMatches.length : 0) +
      (Array.isArray(parsed.matchedDocumentIds) ? parsed.matchedDocumentIds.length : 0);

    // 1. Process Project Matches
    const validMatches: ProjectEvidenceMatch[] = [];
    if (Array.isArray(parsed.projectMatches)) {
      for (const item of parsed.projectMatches) {
        // Normalize id: "proj-gtm" -> "gtm"
        const cleanId = item.projectId ? item.projectId.replace(/^proj-/, '') : '';
        if (
          !cleanId ||
          !PROJECT_CORPUS[cleanId] ||
          (requestedIntent && !isProjectConsistentWithIntent(cleanId, requestedIntent)) ||
          (asksSql && !['gtm', 'sante-scolaire'].includes(cleanId))
        ) {
          continue;
        }

        let level: MatchLevel = 'indirect';
        if (item.level === 'strong' || item.level === 'moderate' || item.level === 'indirect') {
          level = item.level;
        }
        validMatches.push(makeProjectMatch(cleanId, locale, query, level));
      }
    }

    // Also check matchedDocumentIds for any project references
    if (Array.isArray(parsed.matchedDocumentIds)) {
      for (const docId of parsed.matchedDocumentIds) {
        if (docId.startsWith('proj-')) {
          const cleanId = docId.replace(/^proj-/, '');
          const projectDoc = getKnowledgeDocumentById(docId);
          if (
            PROJECT_CORPUS[cleanId] &&
            projectDoc &&
            (!requestedIntent || isDocumentConsistentWithIntent(projectDoc, requestedIntent)) &&
            (!asksSql || ['gtm', 'sante-scolaire'].includes(cleanId)) &&
            !validMatches.some((m) => m.projectId === cleanId)
          ) {
            validMatches.push(makeProjectMatch(cleanId, locale, query));
          }
        }
      }
    }

    if (asksOlistLimitations) {
      validMatches.splice(0, validMatches.length, makeProjectMatch('olist', locale, query));
    }
    if (asksGalaxyExperience) {
      validMatches.splice(0, validMatches.length, makeProjectMatch('gtm', locale, query));
    }

    // 2. Process Non-Project Related Knowledge Items (education, certs, experience, assoc, etc.)
    const relatedItems: RelatedKnowledgeItem[] = [];
    const matchedDocs: KnowledgeDocument[] = [];
    if (Array.isArray(parsed.matchedDocumentIds)) {
      for (const docId of parsed.matchedDocumentIds) {
        const doc = getKnowledgeDocumentById(docId);
        if (
          doc &&
          (!requestedIntent || isDocumentConsistentWithIntent(doc, requestedIntent)) &&
          (!asksOlistLimitations || doc.id === 'proj-olist') &&
          (!asksSql || !doc.id.startsWith('proj-') || ['proj-gtm', 'proj-sante-scolaire'].includes(doc.id))
        ) {
          matchedDocs.push(doc);
          if (!docId.startsWith('proj-')) {
            relatedItems.push(documentToRelatedItem(doc, locale));
          }
        }
      }
    }

    if (asksGalaxyExperience) {
      const experienceDoc = getKnowledgeDocumentById('exp-galaxy-solutions');
      if (experienceDoc && !matchedDocs.some((doc) => doc.id === experienceDoc.id)) {
        matchedDocs.unshift(experienceDoc);
        relatedItems.unshift(documentToRelatedItem(experienceDoc, locale));
      }
    }

    // 3. Process Learning Field Keys
    const growingMatches =
      requestedIntent === 'experience' || asksGalaxyExperience || asksOlistLimitations
      ? []
      : (parsed.learningFieldKeys || [])
          .map((k) => GROWING_FIELDS_INFO[k]?.[locale])
          .filter((v): v is NonNullable<typeof v> => Boolean(v));

    const intent = requestedIntent || (validMatches.length > 0 ? 'projects' : 'general');
    if (
      declaredReferenceCount > 0 &&
      validMatches.length === 0 &&
      relatedItems.length === 0 &&
      growingMatches.length === 0
    ) {
      return null;
    }
    const directAnswer = buildGroundedDirectAnswer(
      intent,
      matchedDocs,
      validMatches,
      growingMatches,
      locale,
      query
    );

    // NO MATCH if no valid matches and no related items and no growing matches
    if (validMatches.length === 0 && relatedItems.length === 0 && growingMatches.length === 0) {
      return {
        status: 'no_match',
        mode: 'ai',
        query,
        locale,
        intent: 'general',
        matches: [],
        directAnswer,
        message:
          locale === 'fr'
            ? 'Aucun projet documenté ne correspond.'
            : 'No documented project matches this requirement.',
        providerInfo: {
          model,
          notice:
            locale === 'fr'
              ? 'Analyse sémantique effectuée par Cloudflare Workers AI (Quota gratuit).'
              : 'Semantic evaluation powered by Cloudflare Workers AI (Free Tier).',
        },
      };
    }

    // SUCCESS / ANSWER with projects or related items
    if (validMatches.length > 0 || relatedItems.length > 0) {
      return {
        status: directAnswer && relatedItems.length > 0 ? 'answer' : 'success',
        mode: 'ai',
        query,
        locale,
        intent,
        directAnswer,
        matches: validMatches,
        relatedItems: relatedItems.length > 0 ? relatedItems : undefined,
        growingFieldMatches: growingMatches.length > 0 ? growingMatches : undefined,
        providerInfo: {
          model,
          notice:
            locale === 'fr'
              ? 'Analyse sémantique effectuée par Cloudflare Workers AI (Quota gratuit).'
              : 'Semantic evaluation powered by Cloudflare Workers AI (Free Tier).',
        },
      };
    }

    // LEARNING MATCH
    if (growingMatches.length > 0) {
      return {
        status: 'learning_match',
        mode: 'ai',
        query,
        locale,
        intent: 'skills',
        matches: [],
        growingFieldMatches: growingMatches,
        message:
          locale === 'fr'
            ? 'Cette compétence fait partie des axes d’apprentissage prioritaires de Godwin (ENSA Khouribga et DataCamp), mais ne fait pas encore l’objet d’un projet de production documenté sur ce portfolio.'
            : 'This skill is one of Godwin’s active learning areas (ENSA Khouribga and DataCamp), but is not yet featured in a documented production project on this portfolio.',
        providerInfo: {
          model,
          notice:
            locale === 'fr'
              ? 'Analyse sémantique effectuée par Cloudflare Workers AI (Quota gratuit).'
              : 'Semantic evaluation powered by Cloudflare Workers AI (Free Tier).',
        },
      };
    }

    // NO MATCH
    return {
      status: 'no_match',
      mode: 'ai',
      query,
      locale,
      intent: 'general',
      matches: [],
      message:
        locale === 'fr'
          ? 'Aucun projet ni document public du portfolio ne démontre cette compétence spécifique.'
          : 'No documented project or public record in the portfolio demonstrates this specific skill.',
      providerInfo: {
        model,
        notice:
          locale === 'fr'
            ? 'Analyse sémantique effectuée par Cloudflare Workers AI (Quota gratuit).'
            : 'Semantic evaluation powered by Cloudflare Workers AI (Free Tier).',
      },
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}
