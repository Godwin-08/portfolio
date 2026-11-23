'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { Certification } from '@/data/certifications';
import { cn } from '@/lib/utils';

type CertificationFilter = 'all' | Certification['category'];

interface CertificationListProps {
  certifications: readonly Certification[];
  headingLevel?: 'h2' | 'h3' | 'h4';
  showFilters?: boolean;
}

export function CertificationList({
  certifications,
  headingLevel = 'h2',
  showFilters = true,
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
    { id: 'data-analysis', label: t('filterDataAnalysis') },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        {showFilters && (
          <div
            role="group"
            aria-label={t('filterLabel')}
            className="flex flex-wrap gap-1.5"
          >
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    'motion-control min-h-9 rounded-full border px-3.5 py-1 text-xs font-semibold transition-colors sm:text-sm',
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
        )}
        <p className="text-xs font-semibold text-muted sm:text-sm" aria-live="polite">
          {t('count', { count: visibleCertifications.length })}
        </p>
      </div>

      <div
        data-certifications-grid
        data-certifications-zone="courses"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visibleCertifications.map((certification) => (
          <article
            key={certification.id}
            data-certification-id={certification.id}
            data-certification-rank={certification.importance}
            data-certification-category={certification.category}
            data-certification-type={certification.credentialType}
            className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-emerald-200 border-t-[3px] border-t-emerald-600 bg-white shadow-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-md focus-within:ring-2 focus-within:ring-emerald-700 focus-within:ring-offset-2 motion-reduce:transition-none dark:border-emerald-900 dark:border-t-emerald-400 dark:bg-slate-900 dark:hover:border-emerald-600"
          >
            {/* Aperçu visuel compact */}
            {certification.imagePath && (
              <Link
                href={{
                  pathname: '/certifications/[slug]',
                  params: { slug: certification.id },
                }}
                tabIndex={-1}
                aria-hidden="true"
                className="relative block aspect-[21/9] sm:aspect-[16/8] w-full overflow-hidden bg-slate-100 dark:bg-slate-800"
              >
                <Image
                  src={certification.imagePath}
                  alt=""
                  fill
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </Link>
            )}

            <div className="flex flex-1 flex-col p-3.5 sm:p-4">
              <div className="flex items-center justify-between gap-1.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200">
                    {certification.credentialType === 'certification'
                      ? t('types.certification')
                      : certification.credentialType === 'track'
                        ? t('types.track')
                        : t('types.course')}
                  </span>
                  <span className="rounded-full bg-paper px-2 py-0.5 text-xs font-bold text-ink">
                    {certification.issuer}
                  </span>
                </div>

                {certification.verificationUrl && (
                  <a
                    data-certification-verification
                    href={certification.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('verifyCertificateAria', {
                      title: certification.title,
                    })}
                    title={t('verifyCertificate')}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-lg text-muted transition-colors hover:bg-emerald-50 hover:text-emerald-800 dark:hover:bg-emerald-950/50 dark:hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                  >
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                )}
              </div>

              <HeadingTag className="mt-2 line-clamp-2 min-h-[2.5rem] break-words font-heading text-sm font-extrabold leading-snug text-ink sm:text-base">
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
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-0.5 border-t border-slate-100 pt-1.5 text-xs text-muted dark:border-slate-800">
                  {certification.completedOn && (
                    <span>
                      {dateFormatter.format(
                        new Date(`${certification.completedOn}T00:00:00Z`)
                      )}
                    </span>
                  )}
                  {certification.reference && (
                    <span className="font-mono text-xs">
                      #{certification.reference}
                    </span>
                  )}
                </div>
              )}

              {/* 1 CTA unique et prioritaire */}
              <div className="mt-2.5 pt-0.5 sm:mt-auto sm:pt-2">
                <Link
                  data-certification-details
                  href={{
                    pathname: '/certifications/[slug]',
                    params: { slug: certification.id },
                  }}
                  className="inline-flex w-full items-center justify-center gap-1 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 dark:bg-emerald-950/60 dark:text-emerald-200 dark:hover:bg-emerald-900/60"
                >
                  <span>{t('viewDetails')}</span>
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
