import type { Page } from '@playwright/test';
import type { EvidenceMatchResponse, MatchRequestBody, ProjectEvidenceMatch, RelatedKnowledgeItem } from '../../../src/lib/ai/types';

interface AiMatchMock {
  requests: MatchRequestBody[];
}

function projectMatch(
  locale: 'fr' | 'en',
  projectId: 'gtm' | 'sante-scolaire'
): ProjectEvidenceMatch {
  if (projectId === 'gtm') {
    return {
      projectId: 'gtm',
      projectSlug: 'gtm',
      projectTitle: 'GTM — Galaxy Training Manager',
      category: locale === 'fr' ? 'Web / Systèmes d’information' : 'Web / Information systems',
      level: 'strong',
      reason: locale === 'fr'
        ? 'Le projet a été réalisé pendant un stage chez Galaxy Solutions.'
        : 'The project was completed during an internship at Galaxy Solutions.',
      verifiedProofs: [locale === 'fr' ? 'Modélisation SQL documentée.' : 'Documented SQL modeling.'],
      limitations: [locale === 'fr' ? 'Les données de démonstration sont fictives.' : 'The demonstration data is fictional.'],
      href: locale === 'fr' ? '/projets/gtm' : '/en/projects/gtm',
    };
  }

  return {
    projectId: 'sante-scolaire',
    projectSlug: 'sante-scolaire',
    projectTitle: 'SantéScolaire',
    category: locale === 'fr' ? 'Web / Systèmes d’information' : 'Web / Information systems',
    level: 'moderate',
    reason: locale === 'fr'
      ? 'Le projet documente un portail de suivi scolaire.'
      : 'The project documents a school monitoring portal.',
    verifiedProofs: [locale === 'fr' ? 'Parcours utilisateur documenté.' : 'Documented user workflow.'],
    limitations: [locale === 'fr' ? 'Projet académique.' : 'Academic project.'],
    href: locale === 'fr' ? '/projets/sante-scolaire' : '/en/projects/sante-scolaire',
  };
}

function response(
  query: string,
  locale: 'fr' | 'en',
  values: Partial<EvidenceMatchResponse> = {}
): EvidenceMatchResponse {
  return {
    status: 'success',
    mode: 'keyword',
    query,
    locale,
    matches: [],
    ...values,
  };
}

function responseFor(query: string, locale: 'fr' | 'en') {
  const normalizedQuery = query.toLowerCase();

  if (normalizedQuery.includes('asset link regression')) {
    const relatedItems: RelatedKnowledgeItem[] = [
      {
        id: 'introduction-to-sql-image',
        category: 'certification',
        title: 'Introduction to SQL certificate image',
        verifiedFacts: [],
        href: '/certifications/introduction-to-sql.jpg',
      },
      {
        id: 'introduction-to-sql-page',
        category: 'certification',
        title: 'Introduction to SQL certification page',
        verifiedFacts: [],
        href: '/certifications/introduction-to-sql',
      },
    ];

    return {
      status: 200,
      body: response(query, locale, {
        status: 'answer',
        intent: 'certifications',
        directAnswer: 'Static asset and localized route regression fixture.',
        relatedItems,
      }),
    };
  }

  if (normalizedQuery.includes('indisponible') || normalizedQuery.includes('unavailable')) {
    return {
      status: 503,
      body: { error: 'AI matching is unavailable in this test.' },
    };
  }

  if (normalizedQuery.includes('kubernetes') || normalizedQuery.includes('docker swarm') ||
      normalizedQuery.includes('terraform') || normalizedQuery.includes('microservices')) {
    return {
      status: 200,
      body: response(query, locale, {
        status: 'no_match',
        message: locale === 'fr'
          ? 'Aucun projet documenté ne correspond à cette compétence.'
          : 'No documented project matches this skill.',
      }),
    };
  }

  if (normalizedQuery.includes('data engineering') || normalizedQuery.includes('en cours') ||
      normalizedQuery.includes('in progress')) {
    return {
      status: 200,
      body: response(query, locale, {
        status: 'learning_match',
        growingFieldMatches: [{
          field: 'Data Engineering',
          label: locale === 'fr' ? 'En cours d’acquisition' : 'Currently learning',
          description: locale === 'fr'
            ? 'Axe de progression travaillé à l’ENSA Khouribga.'
            : 'A learning area pursued at ENSA Khouribga.',
        }],
      }),
    };
  }

  if (normalizedQuery.includes('différence') || normalizedQuery.includes('difference')) {
    return {
      status: 200,
      body: response(query, locale, {
        intent: 'comparison',
        directAnswer: locale === 'fr'
          ? 'GTM a été réalisé en stage chez Galaxy Solutions, tandis que SantéScolaire est un projet académique.'
          : 'GTM was completed during an internship at Galaxy Solutions, while SantéScolaire is an academic project.',
        matches: [projectMatch(locale, 'gtm'), projectMatch(locale, 'sante-scolaire')],
      }),
    };
  }

  if (normalizedQuery.includes('parcours académique') || normalizedQuery.includes('academic background')) {
    return {
      status: 200,
      body: response(query, locale, {
        status: 'answer',
        intent: 'education',
        directAnswer: locale === 'fr'
          ? 'Le parcours comprend l’ENSA Khouribga et un DEUG en sciences.'
          : 'The academic background includes ENSA Khouribga and a DEUG in science.',
      }),
    };
  }

  if (normalizedQuery.includes('sql') || normalizedQuery.includes('tableaux de bord') ||
      normalizedQuery.includes('dashboards')) {
    return {
      status: 200,
      body: response(query, locale, {
        directAnswer: locale === 'fr'
          ? 'GTM documente la modélisation SQL et des indicateurs métier.'
          : 'GTM documents SQL modeling and business indicators.',
        matches: [projectMatch(locale, 'gtm')],
      }),
    };
  }

  return {
    status: 422,
    body: { error: `No AI mock scenario is defined for query: ${query}` },
  };
}

export async function installAiMatchMock(page: Page): Promise<AiMatchMock> {
  const requests: MatchRequestBody[] = [];

  await page.route('**/api/ai/match', async (route) => {
    let requestData: unknown;
    try {
      requestData = JSON.parse(route.request().postData() ?? '');
    } catch {
      requestData = null;
    }

    if (typeof requestData !== 'object' || requestData === null ||
        !('query' in requestData) || typeof requestData.query !== 'string') {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Invalid test request.' }),
      });
      return;
    }

    const locale = 'locale' in requestData && requestData.locale === 'en' ? 'en' : 'fr';
    requests.push({ query: requestData.query, locale });
    const fixture = responseFor(requestData.query, locale);

    await route.fulfill({
      status: fixture.status,
      contentType: 'application/json',
      body: JSON.stringify(fixture.body),
    });
  });

  return { requests };
}
