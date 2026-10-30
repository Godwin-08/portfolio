'use client';

import React, { useState, useEffect, useRef, useTransition, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Cpu,
  GraduationCap,
  Loader2,
  RotateCcw,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import type { EvidenceMatchResponse, MatchLevel, ProjectEvidenceMatch } from '@/lib/ai/types';
import { cn, isPublicAssetHref } from '@/lib/utils';
import { useAIAssistant } from './AIAssistantContext';

export function GlobalAIAssistant() {
  const { isOpen, initialQuery, closeAssistant } = useAIAssistant();
  const locale = useLocale() as 'fr' | 'en';
  const t = useTranslations('aiAssistant');

  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<EvidenceMatchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const suggestions = [
    { key: 'education', text: t('suggestions.education') },
    { key: 'sql', text: t('suggestions.sql') },
    { key: 'comparison', text: t('suggestions.comparison') },
    { key: 'learning', text: t('suggestions.learning') },
    { key: 'certifications', text: t('suggestions.certifications') },
  ];

  const handleSearch = useCallback((searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed || trimmed.length < 2) return;

    setResult(null);
    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch('/api/ai/match', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: trimmed, locale }),
        });

        if (!res.ok) {
          throw new Error('HTTP ' + res.status);
        }

        const data: EvidenceMatchResponse = await res.json();
        setResult(data);
      } catch {
        setError(
          locale === 'fr'
            ? 'Impossible de traiter la requête pour le moment. Veuillez réessayer.'
            : 'Unable to process the request at this time. Please try again.'
        );
      }
    });
  }, [locale]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleSelectSuggestion = (suggestionText: string) => {
    setQuery(suggestionText);
    handleSearch(suggestionText);
  };

  const handleReset = () => {
    setQuery('');
    setResult(null);
    setError(null);
    inputRef.current?.focus();
  };

  // Synchronisation avec initialQuery
  useEffect(() => {
    if (isOpen && initialQuery) {
      setQuery(initialQuery);
      handleSearch(initialQuery);
    }
  }, [isOpen, initialQuery, handleSearch]);

  // Gestion du focus et du verrouillage du défilement
  useEffect(() => {
    if (isOpen) {
      lastFocusedElementRef.current = document.activeElement as HTMLElement;

      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);

      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = originalOverflow;
      };
    } else {
      if (lastFocusedElementRef.current && typeof lastFocusedElementRef.current.focus === 'function') {
        lastFocusedElementRef.current.focus();
      }
    }
  }, [isOpen]);

  // Écoute de la touche Échap et piégeage du focus (Tab)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeAssistant();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

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

  const getLevelBadge = (level: MatchLevel) => {
    switch (level) {
      case 'strong':
        return {
          label: t('levels.strong'),
          className: 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-800',
        };
      case 'moderate':
        return {
          label: t('levels.moderate'),
          className: 'bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-950/50 dark:text-blue-200 dark:border-blue-800',
        };
      case 'indirect':
      default:
        return {
          label: t('levels.indirect'),
          className: 'bg-slate-50 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600',
        };
    }
  };

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
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary-800 dark:text-primary-300">
                {t('eyebrow')}
              </span>
            </div>
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
        <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6 space-y-5">
          {/* Badge du mode et notice de transparence */}
          <div className="space-y-2">
            {result ? (
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
                <div className="flex items-center gap-2">
                  {result.mode === 'ai' ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-semibold text-emerald-800 text-[11px] dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200">
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      {t('modes.aiBadge')}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-2.5 py-0.5 font-semibold text-slate-700 text-[11px] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
                      <Cpu className="h-3 w-3" aria-hidden="true" />
                      {t('modes.keywordBadge')}
                    </span>
                  )}
                  <span className="hidden text-slate-400 dark:text-slate-500 sm:inline">•</span>
                  <span className="font-medium text-slate-800 truncate max-w-[200px] dark:text-slate-100">
                    « {result.query} »
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded p-1 dark:text-slate-300 dark:hover:text-white"
                >
                  <RotateCcw className="h-3 w-3" aria-hidden="true" />
                  <span>{t('resetButton')}</span>
                </button>
              </div>
            ) : null}

            <p className="text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">
              {t('modes.aiNotice')}
            </p>
          </div>

          {/* Suggestions concrètes */}
          <div className="space-y-2 rounded-xl border border-slate-200/80 bg-slate-50/50 p-3.5 dark:border-slate-700 dark:bg-slate-800/60">
            <span className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
              {t('suggestionsLabel')}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.map((sug) => (
                <button
                  key={sug.key}
                  type="button"
                  onClick={() => handleSelectSuggestion(sug.text)}
                  disabled={isPending}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition-colors hover:border-primary-400 hover:bg-primary-50 hover:text-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 disabled:opacity-50 text-left dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-primary-500 dark:hover:bg-primary-900/40 dark:hover:text-primary-200"
                >
                  {sug.text}
                </button>
              ))}
            </div>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
            >
              {error}
            </div>
          )}

          {/* Indicateur de chargement */}
          {isPending && (
            <div
              aria-live="polite"
              className="flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white p-6 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              <Loader2 className="h-5 w-5 animate-spin text-primary-600" aria-hidden="true" />
              <span className="text-xs font-medium">{t('analyzing')}</span>
            </div>
          )}

          {/* Résultats structurés */}
          {!isPending && result && (
            <div aria-live="polite" className="space-y-5">
              {/* 1. Réponse synthétique vérifiée */}
              {result.directAnswer && (
                <div className="rounded-xl border border-primary-200 bg-primary-50/70 p-4 dark:border-primary-800 dark:bg-primary-900/30">
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="h-4 w-4 text-primary-700 shrink-0 mt-0.5 dark:text-primary-300" aria-hidden="true" />
                    <div className="space-y-1">
                      <h3 className="text-xs font-bold uppercase tracking-wide text-primary-900 dark:text-primary-100">
                        {t('sections.directAnswerTitle')}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-100">
                        {result.directAnswer}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Axe de compétences en cours d'acquisition */}
              {result.growingFieldMatches && result.growingFieldMatches.length > 0 && (
                <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900 dark:bg-amber-950/30">
                  <div className="flex items-start gap-2.5">
                    <GraduationCap className="h-4 w-4 text-amber-700 shrink-0 mt-0.5 dark:text-amber-300" aria-hidden="true" />
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wide text-amber-900 dark:text-amber-200">
                        {t('sections.growingFieldTitle')}
                      </h3>
                      {result.growingFieldMatches.map((gf) => (
                        <div key={gf.field} className="space-y-0.5">
                          <span className="inline-block rounded-md bg-amber-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-amber-900 dark:bg-amber-900/40 dark:text-amber-100">
                            {gf.field} — {gf.label}
                          </span>
                          <p className="text-xs leading-relaxed text-amber-900/90 dark:text-amber-100">
                            {gf.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Aucun élément documenté */}
              {result.status === 'no_match' && (
                <div className="rounded-xl border border-slate-200 bg-white p-6 text-center space-y-2 dark:border-slate-700 dark:bg-slate-800">
                  <AlertTriangle className="mx-auto h-6 w-6 text-slate-400" aria-hidden="true" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {t('sections.noMatchTitle')}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto dark:text-slate-300">
                    {result.message || t('sections.noMatchDesc')}
                  </p>
                </div>
              )}

              {/* 4. Éléments documentés associés (formations, certifications, documents, association) */}
              {result.relatedItems && result.relatedItems.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                    {t('sections.relatedRecords')}
                  </h4>
                  <div className="space-y-3">
                    {result.relatedItems.map((item) => (
                      <article
                        key={item.id}
                        className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-2.5 dark:border-slate-700 dark:bg-slate-800"
                      >
                        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 dark:border-slate-700">
                          <h5 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
                            {item.title}
                          </h5>
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                            {item.category}
                          </span>
                        </div>

                        {item.summary && (
                          <p className="text-xs text-slate-600 leading-relaxed dark:text-slate-300">
                            {item.summary}
                          </p>
                        )}

                        {item.verifiedFacts && item.verifiedFacts.length > 0 && (
                          <div className="space-y-1 pt-1">
                            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
                              {t('sections.facts')}
                            </span>
                            <ul className="list-disc space-y-0.5 pl-4 text-xs text-slate-600 dark:text-slate-300">
                              {item.verifiedFacts.slice(0, 3).map((fact, idx) => (
                                <li key={idx}>{fact}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {item.limitations && item.limitations.length > 0 && (
                          <div className="rounded-md border border-amber-200 bg-amber-50/60 p-2 text-[11px] text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
                            <ul className="list-disc space-y-0.5 pl-3.5">
                              {item.limitations.slice(0, 2).map((lim, idx) => (
                                <li key={idx}>{lim}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {item.href && (
                          <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                            {item.href.startsWith('/') && !isPublicAssetHref(item.href) ? (
                              <Link
                                href={item.href as '/about' | '/contact' | '/projects'}
                                onClick={closeAssistant}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-700 hover:text-primary-900 dark:text-primary-300 dark:hover:text-primary-200"
                              >
                                <span>{t('sections.viewResource')}</span>
                                <ArrowRight className="h-3 w-3" aria-hidden="true" />
                              </Link>
                            ) : (
                              <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-700 hover:text-primary-900 dark:text-primary-300 dark:hover:text-primary-200"
                              >
                                <span>{t('sections.viewResource')}</span>
                                <ArrowRight className="h-3 w-3" aria-hidden="true" />
                              </a>
                            )}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Projets pertinents & Preuves */}
              {result.matches && result.matches.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                    {t('sections.projects')}
                  </h4>
                  <div className="space-y-3">
                    {result.matches.map((match: ProjectEvidenceMatch) => {
                      const levelBadge = getLevelBadge(match.level);
                      return (
                        <article
                          key={match.projectId}
                          className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-2.5 dark:border-slate-700 dark:bg-slate-800"
                        >
                          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 dark:border-slate-700">
                            <span className="font-heading text-sm font-bold text-slate-900 dark:text-white">
                              {match.projectTitle}
                            </span>
                            <span
                              className={cn(
                                'rounded-full border px-2 py-0.5 text-[10px] font-semibold',
                                levelBadge.className
                              )}
                            >
                              {levelBadge.label}
                            </span>
                          </div>

                          <div className="rounded-lg bg-slate-50 p-2 text-xs leading-relaxed text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                              {t('sections.matchReason')}{' '}
                            </span>
                            {match.reason}
                          </div>

                          {match.verifiedProofs.length > 0 && (
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800 dark:text-slate-200">
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                                <span>{t('sections.proofs')}</span>
                              </div>
                              <ul className="list-disc space-y-0.5 pl-4 text-xs text-slate-600 dark:text-slate-300">
                                {match.verifiedProofs.map((proof, idx) => (
                                  <li key={idx}>{proof}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {match.limitations.length > 0 && (
                            <div className="rounded-md border border-amber-100 bg-amber-50/50 p-2 text-[11px] dark:border-amber-900 dark:bg-amber-950/30">
                              <div className="flex items-center gap-1 font-bold text-amber-900 dark:text-amber-200">
                                <AlertTriangle className="h-3 w-3 text-amber-600 shrink-0 dark:text-amber-300" aria-hidden="true" />
                                <span>{t('sections.limitations')}</span>
                              </div>
                              <ul className="list-disc space-y-0.5 pl-4 text-amber-900/90 dark:text-amber-100">
                                {match.limitations.map((lim, idx) => (
                                  <li key={idx}>{lim}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                            <Link
                              href={{ pathname: '/projects/[slug]', params: { slug: match.projectSlug } }}
                              onClick={closeAssistant}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-700 hover:text-primary-900 dark:text-primary-300 dark:hover:text-primary-200"
                            >
                              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>{t('sections.viewCaseStudy')}</span>
                              <ArrowRight className="h-3 w-3" aria-hidden="true" />
                            </Link>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
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
                className={cn(
                  'inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-primary-700 px-4 text-xs font-semibold text-white shadow-2xs transition-colors',
                  'hover:bg-primary-800 active:scale-95',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
                  'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-700'
                )}
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                    <span>{t('analyzing')}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
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
