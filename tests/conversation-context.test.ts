import { describe, expect, it } from 'vitest';
import {
  getFollowUpContext,
  isFollowUpQuery,
} from '@/lib/ai/conversation-context';
import { getKnowledgeDocumentById } from '@/lib/ai/knowledge-corpus';
import type { ConversationContextTurn } from '@/lib/ai/types';

describe('conversation follow-up context', () => {
  it.each([
    ['Et ses résultats ?', 'fr'],
    ['Quels sont ses résultats ?', 'fr'],
    ['Quelles étaient ses performances ?', 'fr'],
    ['Comment s’est-il comporté ?', 'fr'],
    ['Pourquoi ?', 'fr'],
    ['What about its results?', 'en'],
    ['What were its results?', 'en'],
    ['What are the metrics?', 'en'],
    ['How was it trained?', 'en'],
    ['How many models?', 'en'],
    ['Tell me more', 'en'],
  ] as const)('recognizes the follow-up formulation "%s" (%s)', (query, locale) => {
    expect(isFollowUpQuery(query, locale)).toBe(true);
  });

  it.each([
    ['Parle-moi du projet Olist.', 'fr'],
    ['Quels projets démontrent ses compétences en SQL ?', 'fr'],
    ['Tell me about the GTM project.', 'en'],
    ['Which projects demonstrate SQL skills?', 'en'],
  ] as const)('treats the new-topic question "%s" (%s) independently', (query, locale) => {
    expect(isFollowUpQuery(query, locale)).toBe(false);

    const result = getFollowUpContext(query, locale, [
      { query: 'Présente Pneumonia Detection.', documentIds: ['proj-pneumonia-detection'] },
    ]);

    expect(result).toEqual({ query, documentIds: [] });
  });

  it.each([
    {
      locale: 'fr' as const,
      query: 'Et ses résultats ?',
      history: [
        { query: 'Parle-moi de GTM.', documentIds: ['proj-gtm'] },
        { query: 'Présente Olist.', documentIds: ['proj-olist'] },
      ],
      expectedId: 'proj-olist',
      excludedTitle: 'GTM',
    },
    {
      locale: 'en' as const,
      query: 'What about its results?',
      history: [
        { query: 'Tell me about GTM.', documentIds: ['proj-gtm'] },
        { query: 'Tell me about Pneumonia Detection.', documentIds: ['proj-pneumonia-detection'] },
      ],
      expectedId: 'proj-pneumonia-detection',
      excludedTitle: 'GTM',
    },
  ])(
    'uses only the most recent subject for the ambiguous follow-up "$query" ($locale)',
    ({ locale, query, history, expectedId, excludedTitle }) => {
      const result = getFollowUpContext(query, locale, history);
      const expectedDocument = getKnowledgeDocumentById(expectedId);
      if (!expectedDocument) {
        throw new Error(`Missing test knowledge document: ${expectedId}`);
      }

      expect(result.documentIds).toEqual([expectedId]);
      expect(result.query).toContain(expectedDocument.title[locale]);
      expect(result.query).not.toContain(excludedTitle);
    }
  );

  it('does not fall back to a stale subject when the latest turn has no valid documents', () => {
    const history: ConversationContextTurn[] = [
      { query: 'Tell me about Olist.', documentIds: ['proj-olist'] },
      { query: 'A new unrelated question.', documentIds: ['not-a-document'] },
      { query: 'One more unrelated question.', documentIds: [] },
    ];

    expect(getFollowUpContext('What about its results?', 'en', history)).toMatchObject({
      query: 'What about its results?',
      documentIds: [],
    });
  });

  it.each([
    ['Et ses résultats ?', 'fr'],
    ['What about its results?', 'en'],
  ] as const)('leaves "%s" unresolved without conversation history', (query, locale) => {
    expect(getFollowUpContext(query, locale)).toEqual({ query, documentIds: [] });
  });
});
