'use client';

import React, { useState, useEffect, useRef, useTransition, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  Award,
  Briefcase,
  Cpu,
  Database,
  GraduationCap,
  Loader2,
  RotateCcw,
  Search,
  Send,
  Sparkles,
  X,
} from 'lucide-react';
import type { EvidenceMatchResponse } from '@/lib/ai/types';
import { cn, isPublicAssetHref } from '@/lib/utils';
import { useAIAssistant } from './AIAssistantContext';

interface AssistantTurn {
  id: number;
  query: string;
  result?: EvidenceMatchResponse;
  error?: string;
}

type FollowUpSuggestionKey =
  | 'projectMethod'
  | 'projectResults'
  | 'projectLimitations'
  | 'projectsComparison'
  | 'projectsResults'
  | 'projectsTechnologies'
  | 'learningProjects'
  | 'learningEvidence'
  | 'educationSkills'
  | 'educationProjects'
  | 'experienceMissions'
  | 'experienceTools'
  | 'certificationTopics'
  | 'certificationProof'
  | 'profileProjects'
  | 'profileEducation'
  | 'documentContents'
  | 'documentProject';

function getFollowUpSuggestionKeys(
  result: EvidenceMatchResponse
): FollowUpSuggestionKey[] {
  if (result.matches.length > 1) {
    return ['projectsComparison', 'projectsResults', 'projectsTechnologies'];
  }
  if (result.matches.length === 1) {
    return ['projectMethod', 'projectResults', 'projectLimitations'];
  }

  switch (result.intent) {
    case 'education':
      return ['educationSkills', 'educationProjects'];
    case 'internship':
    case 'experience':
      return ['experienceMissions', 'experienceTools'];
    case 'certifications':
      return ['certificationTopics', 'certificationProof'];
    case 'documents':
      return ['documentContents', 'documentProject'];
    case 'skills':
      return ['learningProjects', 'learningEvidence'];
    case 'profile':
      return ['profileProjects', 'profileEducation'];
    default:
      return ['profileProjects', 'educationSkills'];
  }
}

export function GlobalAIAssistant() {
  const { isOpen, initialQuery, closeAssistant } = useAIAssistant();
  const locale = useLocale() as 'fr' | 'en';
  const t = useTranslations('aiAssistant');

  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [turns, setTurns] = useState<AssistantTurn[]>([]);

  const dialogRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const nextTurnIdRef = useRef(0);
  const handledInitialQueryRef = useRef('');
  const requestControllerRef = useRef<AbortController | null>(null);

  const suggestions = [
    {
      key: 'education',
      icon: GraduationCap,
      label: locale === 'fr' ? 'Parcours académique' : 'Education',
      query: t('suggestions.education'),
    },
    {
      key: 'sql',
      icon: Database,
      label: locale === 'fr' ? 'Projets SQL' : 'SQL projects',
      query: t('suggestions.sql'),
    },
    {
      key: 'comparison',
      icon: Briefcase,
      label: locale === 'fr' ? 'Projets clés' : 'Key projects',
      query: t('suggestions.comparison'),
    },
    {
      key: 'certifications',
      icon: Award,
      label: locale === 'fr' ? 'Certifications DataCamp' : 'DataCamp certificates',
      query: t('suggestions.certifications'),
    },
  ];

  const handleSearch = useCallback((searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed || trimmed.length < 2) return;

    const turnId = ++nextTurnIdRef.current;
    const requestController = new AbortController();
    requestControllerRef.current = requestController;
    const conversationHistory = turns
      .filter((turn) => turn.result)
      .slice(-4)
      .map((turn) => ({
        query: turn.query.slice(0, 100),
        documentIds: [
          ...new Set([
            ...(turn.result?.matches.map((match) => `proj-${match.projectId}`) ?? []),
            ...(turn.result?.relatedItems?.map((item) => item.id) ?? []),
          ]),
        ].slice(0, 4),
      }));
    setTurns((currentTurns) => [...currentTurns, { id: turnId, query: trimmed }]);
    setQuery('');

    startTransition(async () => {
      try {
        const res = await fetch('/api/ai/match', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: trimmed,
            locale,
            ...(conversationHistory.length > 0 ? { conversationHistory } : {}),
          }),
          signal: requestController.signal,
        });

        if (!res.ok) {
          throw new Error('HTTP ' + res.status);
        }

        const data: EvidenceMatchResponse = await res.json();
        setTurns((currentTurns) =>
          currentTurns.map((turn) => (turn.id === turnId ? { ...turn, result: data } : turn))
        );
      } catch {
        if (requestController.signal.aborted) return;
        const message =
          locale === 'fr'
            ? 'Impossible de traiter la requête pour le moment. Veuillez réessayer.'
            : 'Unable to process the request at this time. Please try again.';
        setTurns((currentTurns) =>
          currentTurns.map((turn) => (turn.id === turnId ? { ...turn, error: message } : turn))
        );
      }
      if (requestControllerRef.current === requestController) {
        requestControllerRef.current = null;
      }
    });
  }, [locale, turns]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleSelectSuggestion = (suggestionQuery: string) => {
    setQuery(suggestionQuery);
    handleSearch(suggestionQuery);
  };

  const handleReset = () => {
    setQuery('');
    setTurns([]);
    inputRef.current?.focus();
  };

  // Synchronisation avec initialQuery
  useEffect(() => {
    if (isOpen && initialQuery && handledInitialQueryRef.current !== initialQuery) {
      handledInitialQueryRef.current = initialQuery;
      setQuery(initialQuery);
      handleSearch(initialQuery);
    }
  }, [isOpen, initialQuery, handleSearch]);

  useEffect(() => {
    if (!isOpen) {
      requestControllerRef.current?.abort();
      requestControllerRef.current = null;
      setTurns([]);
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const messages = messagesRef.current;
    if (messages) {
      messages.scrollTop = messages.scrollHeight;
    }
  }, [turns, isPending, isOpen]);

  // Focus management & inert body scroll
  useEffect(() => {
    if (isOpen) {
      lastFocusedElementRef.current = document.activeElement as HTMLElement | null;

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = previousOverflow;
        if (lastFocusedElementRef.current && typeof lastFocusedElementRef.current.focus === 'function') {
          lastFocusedElementRef.current.focus();
        }
      };
    }
  }, [isOpen]);

  // Focus trap inside drawer
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAssistant();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!firstElement || !lastElement) return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeAssistant]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Arrière-plan flouté avec fermeture au clic */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-200 animate-in fade-in dark:bg-slate-950/70"
        onClick={closeAssistant}
        aria-hidden="true"
      />

      {/* Panneau latéral (Desktop: slide-over droit, Mobile: bottom-sheet) */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="global-ai-title"
        aria-describedby="global-ai-description"
        className={cn(
          'fixed z-50 flex flex-col bg-white shadow-2xl transition-transform duration-300 ease-out dark:bg-slate-900 dark:text-slate-100',
          'max-w-full overflow-x-hidden',
          // Mobile: bottom sheet
          'inset-x-0 bottom-0 max-h-[92vh] rounded-t-2xl border-t border-slate-200 dark:border-slate-700',
          // Desktop: slide-over panneau droit
          'sm:inset-y-0 sm:right-0 sm:left-auto sm:max-h-full sm:w-full sm:max-w-xl sm:rounded-none sm:border-t-0 sm:border-l sm:border-l-slate-200 sm:dark:border-l-slate-700'
        )}
      >
        {/* Entête du tiroir */}
        <header className="flex items-start justify-between border-b border-slate-200/80 px-5 py-4 dark:border-slate-700 sm:px-6">
          <div className="space-y-1 pr-4">
            <h2
              id="global-ai-title"
              className="font-heading text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl"
            >
              {t('title')}
            </h2>
            <p
              id="global-ai-description"
              className="text-xs text-slate-600 leading-relaxed max-w-md dark:text-slate-300"
            >
              {t('description')}
            </p>
          </div>

          <button
            type="button"
            onClick={closeAssistant}
            aria-label={t('closeButton')}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 transition-colors dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        {/* Corps défilable */}
        <div ref={messagesRef} className="flex-1 overflow-y-auto px-5 py-4 sm:px-6 space-y-5">
          {/* État initial */}
          {turns.length === 0 && !isPending && (
            <div className="space-y-4">
              <div
                role="group"
                aria-label={t('suggestionsLabel')}
                className="flex flex-wrap gap-2"
              >
                {suggestions.map((sug) => {
                  const Icon = sug.icon;
                  return (
                    <button
                      key={sug.key}
                      type="button"
                      onClick={() => handleSelectSuggestion(sug.query)}
                      disabled={isPending}
                      aria-label={sug.query}
                      className="inline-flex min-h-9 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-left text-xs font-semibold text-slate-700 transition-colors hover:border-primary-400 hover:bg-primary-50 hover:text-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-primary-500 dark:hover:bg-primary-950/40 dark:hover:text-primary-200"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 text-primary-700 dark:text-primary-300" aria-hidden="true" />
                      <span>{sug.label}</span>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">
                {t('welcomeNotice')}
              </p>
            </div>
          )}

          {turns.length > 0 && (
            <section aria-label="Conversation" className="space-y-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded p-1 dark:text-slate-400 dark:hover:text-white"
                >
                  <RotateCcw className="h-3 w-3" aria-hidden="true" />
                  <span>{t('resetButton')}</span>
                </button>
              </div>

              <div aria-live="polite" aria-relevant="additions text" className="space-y-5">
                {turns.map((turn) => {
                  const result = turn.result;
                  const relatedItems = result?.matches.length
                    ? []
                    : result?.relatedItems?.filter(
                    (item) =>
                      item.category !== 'project' ||
                      !(result.matches ?? []).some((match) => item.id === `proj-${match.projectId}`)
                  );
                  const matchGroups = new Map<string, EvidenceMatchResponse['matches']>();
                  result?.matches.forEach((match) => {
                    const group = matchGroups.get(match.reason) ?? [];
                    group.push(match);
                    matchGroups.set(match.reason, group);
                  });

                  return (
                    <div key={turn.id} className="space-y-3">
                      <div className="flex justify-end">
                        <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-primary-700 px-4 py-3 text-sm leading-relaxed text-white shadow-xs">
                          {turn.query}
                        </p>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/60 dark:text-primary-200">
                          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <div
                          className={cn(
                            'min-w-0 max-w-[92%] space-y-3 rounded-2xl rounded-tl-sm border px-4 py-3 text-sm leading-relaxed shadow-xs',
                            turn.error
                              ? 'border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200'
                              : 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                          )}
                          {...(turn.error ? { role: 'alert' } : {})}
                        >
                          {turn.error ? (
                            <p>{turn.error}</p>
                          ) : !result ? (
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                              <span>{t('analyzing')}</span>
                            </div>
                          ) : (
                            <>
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-slate-400 dark:text-slate-500">
                                {result.mode === 'ai' ? (
                                  <>
                                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                                    {t('modes.aiBadge')}
                                  </>
                                ) : (
                                  <>
                                    <Cpu className="h-3 w-3" aria-hidden="true" />
                                    {t('modes.keywordBadge')}
                                  </>
                                )}
                              </span>

                              {result.status === 'no_match' ? (
                                <p>{result.directAnswer || result.message || t('sections.noMatchDesc')}</p>
                              ) : (
                                result.directAnswer && <p>{result.directAnswer}</p>
                              )}

                              {result.status === 'learning_match' &&
                                result.matches.length === 0 &&
                                result.message && (
                                <p>{result.message}</p>
                              )}

                              {result.status === 'learning_match' &&
                                result.matches.length === 0 &&
                                result.growingFieldMatches?.map((field) => (
                                <p key={field.field}>{field.description}</p>
                              ))}

                              {[...matchGroups].map(([reason, matches]) => (
                                <p key={reason}>
                                  {reason}{' '}
                                  {matches.map((match, index) => (
                                    <React.Fragment key={match.projectId}>
                                      {index > 0 ? ', ' : null}
                                      <Link
                                        href={{ pathname: '/projects/[slug]', params: { slug: match.projectSlug } }}
                                        onClick={closeAssistant}
                                        className="font-semibold text-primary-700 underline decoration-primary-300 underline-offset-2 hover:text-primary-900 dark:text-primary-300 dark:hover:text-primary-200"
                                      >
                                        {match.projectTitle}
                                      </Link>
                                    </React.Fragment>
                                  ))}
                                </p>
                              ))}

                              {relatedItems?.map((item) => (
                                <p key={item.id}>
                                  {item.summary || (!item.href ? item.title : null)}
                                  {item.summary && item.href ? ' ' : null}
                                  {item.href &&
                                    (item.href.startsWith('/') && !isPublicAssetHref(item.href) ? (
                                      <Link
                                        href={item.href as '/about' | '/contact' | '/projects'}
                                        onClick={closeAssistant}
                                        className="font-semibold text-primary-700 underline decoration-primary-300 underline-offset-2 hover:text-primary-900 dark:text-primary-300 dark:hover:text-primary-200"
                                      >
                                        {item.title}
                                      </Link>
                                    ) : (
                                      <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-primary-700 underline decoration-primary-300 underline-offset-2 hover:text-primary-900 dark:text-primary-300 dark:hover:text-primary-200"
                                      >
                                        {item.title}
                                      </a>
                                    ))}
                                </p>
                              ))}

                              <div
                                role="group"
                                aria-label={t('followUpLabel')}
                                className="space-y-2 pt-1"
                              >
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                    {t('followUpLabel')}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {getFollowUpSuggestionKeys(result).map((key) => {
                                      const question = t(`followUps.${key}`);
                                      return (
                                        <button
                                          key={key}
                                          type="button"
                                          onClick={() => handleSelectSuggestion(question)}
                                          disabled={isPending}
                                          className="inline-flex min-h-8 items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-left text-xs font-medium text-primary-800 transition-colors hover:border-primary-400 hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary-800 dark:bg-primary-950/40 dark:text-primary-200 dark:hover:border-primary-600 dark:hover:bg-primary-900/50"
                                        >
                                          {question}
                                        </button>
                                      );
                                    })}
                                </div>
                              </div>

                              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                                {result.mode === 'keyword' ? t('modes.fallbackNotice') : t('modes.aiNotice')}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Formulaire de saisie fixe en bas */}
        <footer className="border-t border-slate-200/80 bg-slate-50/90 p-4 sm:p-5 backdrop-blur-xs dark:border-slate-700 dark:bg-slate-900/95">
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="relative flex items-center">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Search className="h-4 w-4" aria-hidden="true" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('placeholder')}
                maxLength={250}
                disabled={isPending}
                aria-label={t('title')}
                className={cn(
                  'w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-9 text-xs sm:text-sm text-slate-900 shadow-2xs placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500',
                  'focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
                  'disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-slate-700'
                )}
              />
              {query.length > 0 && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label={t('clearButton')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus-visible:outline-none dark:hover:text-slate-200"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                {query.length > 0 ? `${query.length}/250` : ''}
              </span>

              <button
                type="submit"
                disabled={isPending || query.trim().length < 2}
                aria-label={t('sendButton')}
                title={t('sendButton')}
                className={cn(
                  'inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-primary-700 px-4 text-xs font-semibold text-white shadow-xs transition-all',
                  'hover:bg-primary-800 active:scale-95',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
                  'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary-700'
                )}
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    <span>{t('analyzing')}</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>{t('sendButton')}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </footer>
      </div>
    </div>
  );
}
