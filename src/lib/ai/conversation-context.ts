import { getKnowledgeDocumentById } from './knowledge-corpus';
import type { ConversationContextTurn } from './types';

export function isFollowUpQuery(query: string, locale: 'fr' | 'en'): boolean {
  const normalized = query
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[’']/g, ' ')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const followUpPatterns =
    locale === 'fr'
      ? /^(et\b|alors\b|sinon\b|qu en est il\b|ses?\b|sa\b|leurs?\b|ce projet\b|ce resultat\b|cette experience\b|comment (a|ont|s est)\b|combien\b|quels? (sont|ont|etaient|ont ete)?\s*(les\s*)?(ses|leurs|ces|resultats|chiffres|indicateurs|modeles|limites|technologies)\b|quelles? (sont|ont|etaient|ont ete)?\s*(les\s*)?(ses|leurs|ces|performances|metriques|limites|technologies|donnees)\b|pourquoi\b)/
      : /^(and\b|what about\b|how about\b|its\b|their\b|his\b|her\b|it\b|how did (it|he|she)\b|how (was|were|is|are) (it|he|she|they|the model|the project|the system)\b|how many\b|what (were|are) (its|their|his|her)\b|what (were|are) (the )?(results|metrics|limitations|models|technologies)\b|why\b|can you (tell me )?more\b|tell me more\b)/;

  return followUpPatterns.test(normalized);
}

export function getFollowUpContext(
  query: string,
  locale: 'fr' | 'en',
  history: readonly ConversationContextTurn[] = []
): { query: string; documentIds: string[] } {
  if (!isFollowUpQuery(query, locale)) {
    return { query, documentIds: [] };
  }

  const latestTurn = history[history.length - 1];
  const documentIds = latestTurn
    ? [
        ...new Set(latestTurn.documentIds.filter((id) => getKnowledgeDocumentById(id))),
      ].slice(0, 8)
    : [];

  const documentTitles = documentIds
    .map((id) => getKnowledgeDocumentById(id))
    .filter((document) => document !== undefined)
    .map((document) => document.title[locale]);

  return {
    query: documentTitles.length > 0 ? `${query} ${documentTitles.join(' ')}` : query,
    documentIds,
  };
}
