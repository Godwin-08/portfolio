'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, ArrowUpRight, Award, ExternalLink } from 'lucide-react';
import type { Certification } from '@/data/certifications';
import { cn } from '@/lib/utils';

type CertificationFilter = 'all' | Certification['category'];

interface CertificationListProps {
  certifications: readonly Certification[];
  headingLevel?: 'h2' | 'h3';
}

export function CertificationList({
  certifications,
  headingLevel = 'h2',
}: CertificationListProps) {
  const HeadingTag = headingLevel;
  const t = useTranslations('home.certifications');
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState<CertificationFilter>('all');
  const visibleCertifications =
    activeFilter === 'all'
      ? certifications
      : certifications.filter(
          (certification) => certification.category === activeFilter
        );
  const dateFormatter = new Intl.DateTimeFormat(
    locale === 'fr' ? 'fr-FR' : 'en-US',
    { day: 'numeric', month: 'short', timeZone: 'UTC', year: 'numeric' }
  );

  const filters: readonly { id: CertificationFilter; label: string }[] = [
    { id: 'all', label: t('filterAll') },
    { id: 'sql', label: t('filterSql') },
    { id: 'statistics', label: t('filterStatistics') },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label={t('filterLabel')} className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  'motion-control min-h-10 rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2',
                  isActive
                    ? 'border-emerald-700 bg-emerald-700 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-slate-950'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-400 hover:text-emerald-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-600 dark:hover:text-emerald-300'
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
        <p className="text-sm font-semibold text-muted" aria-live="polite">
          {t('count', { count: visibleCertifications.length })}
        </p>
      </div>

      <div
        data-certifications-grid
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
      >
        {visibleCertifications.map((certification) => (
          <article
            key={certification.id}
            data-certification-id={certification.id}
            data-certification-rank={certification.importance}
            data-certification-category={certification.category}
            className="flex min-w-0 flex-col rounded-2xl border border-emerald-200 border-t-[3px] border-t-emerald-600 bg-white p-4 shadow-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-700 focus-within:ring-offset-2 motion-reduce:transition-none dark:border-emerald-900 dark:border-t-emerald-400 dark:bg-slate-900 dark:hover:border-emerald-600 sm:p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                <Award className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <span
                  aria-label={t('rank', { rank: certification.importance })}
                  className="rounded-full bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200"
                >
                  #{certification.importance}
                </span>
                <span className="rounded-full bg-paper px-3 py-1.5 text-xs font-bold text-ink">
                  {certification.issuer}
                </span>
              </div>
            </div>

            <HeadingTag className="mt-4 min-h-12 break-words font-heading text-base font-extrabold leading-snug text-ink sm:text-lg">
              <Link
                data-certification-title
                href={{
                  pathname: '/certifications/[slug]',
                  params: { slug: certification.id },
                }}
                aria-label={t('viewDetailsAria', { title: certification.title })}
                className="rounded-sm transition-colors hover:text-emerald-800 dark:hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              >
                {certification.title}
              </Link>
            </HeadingTag>

            {(certification.completedOn || certification.reference) && (
              <dl className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 text-sm dark:border-slate-800 sm:grid-cols-2">
                {certification.completedOn && (
                  <div>
                    <dt className="text-xs font-medium text-muted">{t('completedOn')}</dt>
                    <dd className="mt-1 font-semibold text-body">
                      {dateFormatter.format(new Date(`${certification.completedOn}T00:00:00Z`))}
                    </dd>
                  </div>
                )}
                {certification.reference && (
                  <div>
                    <dt className="text-xs font-medium text-muted">{t('reference')}</dt>
                    <dd className="mt-1 font-mono text-xs font-semibold text-body sm:text-sm">
                      #{certification.reference}
                    </dd>
                  </div>
                )}
              </dl>
            )}

            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5">
              <Link
                data-certification-details
                href={{
                  pathname: '/certifications/[slug]',
                  params: { slug: certification.id },
                }}
                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 dark:text-emerald-300 dark:hover:text-emerald-200"
              >
                <span>{t('viewDetails')}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              {certification.documentPath && (
                <a
                  data-certification-document
                  href={certification.documentPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('viewCertificateAria', { title: certification.title })}
                  className="inline-flex min-h-11 items-center gap-2 border-b border-emerald-700 text-sm font-bold text-emerald-800 hover:border-emerald-500 hover:text-emerald-950 dark:border-emerald-400 dark:text-emerald-300 dark:hover:border-emerald-300 dark:hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 dark:focus-visible:ring-emerald-400"
                >
                  <span>{t('viewCertificate')}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}

              {certification.verificationUrl && (
                <a
                  data-certification-verification
                  href={certification.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('verifyCertificateAria', { title: certification.title })}
                  className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-body underline decoration-slate-300 underline-offset-4 hover:text-emerald-800 dark:hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                >
                  <span>{t('verifyCertificate')}</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
