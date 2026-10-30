'use client';

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
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

interface EvidenceMatcherProps {
  locale: 'fr' | 'en';
}

export function EvidenceMatcher({ locale }: EvidenceMatcherProps) {
  const t = useTranslations('projects.matcher');
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<EvidenceMatchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const suggestions = [
    { key: 'sql', text: t('suggestions.sql') },
    { key: 'data', text: t('suggestions.data') },
    { key: 'flask', text: t('suggestions.flask') },
    { key: 'education', text: t('suggestions.education') },
    { key: 'certifications', text: t('suggestions.certifications') },
    { key: 'learning', text: t('suggestions.learning') },
  ];

  const handleSearch = (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed || trimmed.length < 2) return;

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
  };

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
  };

  const getLevelBadge = (level: MatchLevel) => {
    switch (level) {
      case 'strong':
        return {
          label: t('levels.strong'),
          className: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
        };
      case 'moderate':
        return {
          label: t('levels.moderate'),
          className: 'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800',
        };
      case 'indirect':
      default:
        return {
          label: t('levels.indirect'),
          className: 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
        };
    }
  };

  return (
    <section
      role="region"
      aria-label={t('title')}
      className="mb-8 rounded-2xl border border-slate-200/90 bg-gradient-to-b from-slate-50/60 to-white p-5 shadow-sm dark:border-slate-700 dark:from-slate-900 dark:to-slate-800 sm:p-7 md:p-8"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary-600 dark:text-primary-300" aria-hidden="true" />
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-800 dark:text-primary-300 sm:text-xs">
            {t('eyebrow')}
          </span>
        </div>

        {result && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 self-start rounded-md p-1 text-xs font-semibold text-slate-600 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 dark:text-slate-300 dark:hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t('resetButton')}</span>
          </button>
        )}
      </div>

      <div className="mt-2 space-y-1.5">
        <h2 className="font-heading text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          {t('title')}
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {t('description')}
        </p>
      </div>

      {/* Formulaire de recherche */}
      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <div className="relative flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Search className="h-4 w-4" aria-hidden="true" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('placeholder')}
              maxLength={250}
              disabled={isPending}
              aria-label={t('title')}
              className={cn(
                'w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-10 text-sm text-slate-900 shadow-xs transition-colors placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500',
                'focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
                'disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-slate-700'
              )}
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label={t('clearButton')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus-visible:outline-none dark:text-slate-400 dark:hover:text-slate-200"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending || query.trim().length < 2}
            className={cn(
              'motion-control inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary-700 px-5 text-sm font-semibold text-white shadow-xs transition-colors',
              'hover:bg-primary-800 active:scale-95',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-700'
            )}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                <span>{t('searching')}</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>{t('searchButton')}</span>
              </>
            )}
          </button>
        </div>

        {/* Suggestions rapides */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-600 dark:text-slate-300 max-[359px]:pr-12">
          <span className="font-semibold text-slate-500 dark:text-slate-400">{t('suggestionsLabel')}</span>
          {suggestions.map((sug) => (
            <button
              key={sug.key}
              type="button"
              onClick={() => handleSelectSuggestion(sug.text)}
              disabled={isPending}
              className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors hover:border-primary-400 hover:bg-primary-50 hover:text-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-primary-600 dark:hover:bg-primary-950/40 dark:hover:text-primary-200"
            >
              {sug.text}
            </button>
          ))}
        </div>
      </form>

      {/* Notice de confidentialité */}
      <p className="mt-3 text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">
        {t('modes.aiNotice')}
      </p>

      {/* Erreur */}
      {error && (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
        >
          {error}
        </div>
      )}

      {/* Zone de résultats */}
      <div
        aria-live="polite"
        aria-busy={isPending}
        className="mt-6"
      >
        {isPending && (
          <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-8 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <Loader2 className="h-5 w-5 animate-spin text-primary-600" aria-hidden="true" />
            <span className="text-sm font-medium">{t('searching')}</span>
          </div>
        )}

        {!isPending && result && (
          <div className="space-y-6">
            {/* Mode & statut */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <div className="flex items-center gap-2">
                {result.mode === 'ai' ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 font-semibold text-emerald-800 dark:text-emerald-300">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    {t('modes.aiBadge')}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 font-semibold text-slate-700 dark:text-slate-300">
                    <Cpu className="h-3 w-3" aria-hidden="true" />
                    {t('modes.keywordBadge')}
                  </span>
                )}
                <span className="hidden sm:inline text-slate-400">•</span>
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  « {result.query} »
                </span>
              </div>

              {result.mode === 'keyword' && (
                <span className="text-[11px] italic text-slate-500 dark:text-slate-400">
                  {t('modes.fallbackNotice')}
                </span>
              )}
            </div>

            {/* Réponse synthétique vérifiée */}
            {result.directAnswer && (
              <div className="rounded-xl border border-primary-200 dark:border-primary-800/80 bg-primary-50/70 dark:bg-primary-950/40 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-primary-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-primary-950 dark:text-primary-200">
                      {t('sections.directAnswerTitle')}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                      {result.directAnswer}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Compétences en cours d'apprentissage */}
            {result.growingFieldMatches && result.growingFieldMatches.length > 0 && (
              <div className="rounded-xl border border-amber-200 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/40 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <GraduationCap className="h-5 w-5 text-amber-700 shrink-0 mt-0.5 dark:text-amber-300" aria-hidden="true" />
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                      {t('sections.growingFieldTitle')}
                    </h3>
                    {result.growingFieldMatches.map((gf) => (
                      <div key={gf.field} className="space-y-0.5">
                        <span className="inline-block rounded-md bg-amber-100 dark:bg-amber-900/60 px-2 py-0.5 font-mono text-xs font-semibold text-amber-900 dark:text-amber-200 dark:text-amber-200">
                          {gf.field} — {gf.label}
                        </span>
                        <p className="text-xs leading-relaxed text-amber-900 dark:text-amber-200/90">
                          {gf.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Aucun projet correspondant */}
            {result.status === 'no_match' && (
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 text-center sm:p-9 space-y-2">
                <AlertTriangle className="mx-auto h-7 w-7 text-slate-400" aria-hidden="true" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t('sections.noMatchTitle')}
                </h3>
                <p className="max-w-lg mx-auto text-sm text-slate-500 leading-relaxed dark:text-slate-300">
                  {result.message || t('sections.noMatchDesc')}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary-700 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300 underline underline-offset-4"
                  >
                    <span>{t('resetButton')}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Éléments documentés associés (formations, certifications, documents, profil) */}
            {result.relatedItems && result.relatedItems.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  {t('sections.relatedRecords')}
                </h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {result.relatedItems.map((item) => (
                    <article
                      key={item.id}
                      className="flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs transition-shadow hover:shadow-md"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                          <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 font-mono text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase">
                            {item.category}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                            {item.title}
                          </h3>
                          {item.summary && (
                            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              {item.summary}
                            </p>
                          )}
                        </div>

                        {item.verifiedFacts && item.verifiedFacts.length > 0 && (
                          <div className="space-y-1 pt-1">
                            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
                              {t('sections.facts')}
                            </span>
                            <ul className="list-disc space-y-1 pl-4 text-xs text-slate-600 dark:text-slate-300">
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
                      </div>

                      {item.href && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800">
                          {item.href.startsWith('/') && !isPublicAssetHref(item.href) ? (
                            <Link
                              href={item.href as '/about' | '/contact' | '/projects'}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-700 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300"
                            >
                              <span>{t('sections.viewResource')}</span>
                              <ArrowRight className="h-3 w-3" aria-hidden="true" />
                            </Link>
                          ) : (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-700 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300"
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

            {/* Projets retenus */}
            {result.matches.length > 0 && (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {result.matches.map((match: ProjectEvidenceMatch) => {
                  const levelBadge = getLevelBadge(match.level);
                  return (
                    <article
                      key={match.projectId}
                      className="flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs transition-shadow hover:shadow-md"
                    >
                      <div className="space-y-3.5">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                          <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 text-xs font-bold text-slate-700 dark:text-slate-300">
                            {match.category}
                          </span>
                          <span
                            className={cn(
                              'rounded-full border px-2.5 py-0.5 text-xs font-semibold',
                              levelBadge.className
                            )}
                          >
                            {levelBadge.label}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                            {match.projectTitle}
                          </h3>
                          <div className="mt-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 p-2.5 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {t('sections.matchReason')}{' '}
                            </span>
                            {match.reason}
                          </div>
                        </div>

                        {/* Preuves vérifiées */}
                        {match.verifiedProofs.length > 0 && (
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                              <span>{t('sections.proofs')}</span>
                            </div>
                            <ul className="space-y-1 pl-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300 list-disc">
                              {match.verifiedProofs.map((proof, idx) => (
                                <li key={idx}>{proof}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Limites documentées */}
                        {match.limitations.length > 0 && (
                          <div className="space-y-1.5 rounded-lg border border-amber-100 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/30 p-2.5 text-xs">
                            <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200">
                              <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" aria-hidden="true" />
                              <span>{t('sections.limitations')}</span>
                            </div>
                            <ul className="space-y-1 pl-4 text-amber-900 dark:text-amber-200/90 leading-relaxed list-disc">
                              {match.limitations.map((lim, idx) => (
                                <li key={idx}>{lim}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <Link
                          href={{ pathname: '/projects/[slug]', params: { slug: match.projectSlug } }}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-700 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300 transition-colors"
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
            )}
          </div>
        )}
      </div>
    </section>
  );
}
