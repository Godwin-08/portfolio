'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, BarChart2, Database, FileText, Mail } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const t = useTranslations('home.hero');
  const common = useTranslations('common');
  const name = common('name').split(' ');

  return (
    <section
      className="relative isolate overflow-hidden bg-paper"
      aria-labelledby="hero-heading"
    >
      {/* Background tint aligned to content grid container to avoid ultrawide overflow */}
      <div
        className="pointer-events-none absolute inset-0 mx-auto max-w-7xl overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-y-0 right-0 hidden w-[36%] bg-[var(--bg-blue-tint)] md:block" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        {/* Top Section: Intro (Left) & Portrait (Right) */}
        <div className="grid grid-cols-1 items-center gap-4 sm:gap-6 md:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.75fr)] md:gap-x-8 md:gap-y-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:gap-x-12">
          {/* Intro copy */}
          <div className="hero-motion-entry hero-motion-entry--copy space-y-4 sm:space-y-5">
            <div className="space-y-2 sm:space-y-3.5">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-primary-800 dark:text-primary-300 sm:text-xs">
                <span className="h-1 w-6 shrink-0 bg-coral-500" aria-hidden="true" />
                {t('studentBadge')}
              </p>
              <p className="text-sm font-semibold tracking-wide text-primary-700 dark:text-primary-400 sm:text-base">
                {t('degree')}
              </p>

              <h1
                id="hero-heading"
                className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl"
              >
                <span>{name.slice(0, -1).join(' ')}</span>{' '}
                <span className="text-primary-700 dark:text-primary-400">{name[name.length - 1]}</span>
              </h1>

              <p className="max-w-xl border-l-[3px] border-coral-500 pl-3.5 font-heading text-lg font-bold leading-snug tracking-tight text-ink sm:text-xl lg:text-2xl">
                {t('tagline')}
              </p>

              <div className="pt-1.5 sm:pt-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-coral-200 bg-coral-50 px-3 py-1.5 text-xs font-bold leading-snug text-coral-900 dark:border-coral-800 dark:bg-coral-950/60 dark:text-coral-200 sm:text-sm">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-coral-600" aria-hidden="true" />
                  <span>{t('availability')}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Portrait with decorative framing */}
          <div className="hero-motion-entry hero-motion-entry--portrait relative mx-auto my-0 w-[170px] sm:my-2 sm:w-[220px] md:my-0 md:w-full md:max-w-[280px] lg:max-w-[340px]">
            <div
              className="absolute -right-2 -top-2 h-[60%] w-[64%] bg-coral-300 md:-right-3 md:-top-3"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-2 -left-2 h-[40%] w-[70%] bg-primary-800 md:-bottom-3 md:-left-3"
              aria-hidden="true"
            />
            <div className="hero-portrait-frame group relative aspect-[4/5] w-full overflow-hidden rounded-lg border-2 border-white bg-slate-900 shadow-card dark:bg-slate-950 md:rounded-none md:border-0">
              <Image
                src="/images/godwin-portrait.jpg"
                alt={t('portraitAlt')}
                fill
                priority
                sizes="(max-width: 639px) 170px, (max-width: 767px) 220px, (max-width: 1023px) 280px, 340px"
                className="hero-portrait-image object-cover object-top"
                quality={85}
              />
            </div>
          </div>

          <div
            data-hero-actions
            className="grid grid-cols-2 items-stretch gap-2 pt-1.5 sm:gap-3 sm:pt-4 md:col-start-1 md:items-center md:flex md:flex-wrap"
          >
            <Link
              href="/projects"
              className="motion-control col-span-2 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-primary-800 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 md:col-span-1 md:w-auto sm:px-5 sm:py-2.5"
            >
              {t('viewProjects')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href="/cv/CV_Godwin_Nougbolo.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="motion-control inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-coral-500 bg-white/80 px-4 py-2 text-sm font-bold text-coral-800 hover:bg-coral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2 dark:bg-slate-900/80 dark:text-coral-200 dark:hover:bg-slate-800 md:w-auto sm:px-5 sm:py-2.5"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              {t('downloadCv')}
            </a>
            <Link
              href="/contact"
              className="motion-control inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white/60 px-3.5 py-2 text-sm font-semibold text-slate-800 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800 md:w-auto sm:px-4 sm:py-2.5"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {common('cta.contact')}
            </Link>
          </div>
        </div>

        {/* Bottom Section: 2 Key Domain Cards spanning across the full width */}
        <div className="mt-6 grid grid-cols-1 items-stretch gap-4 sm:mt-12 sm:grid-cols-2 lg:gap-6">
          <div className="rounded-xl border border-slate-200 bg-white/75 p-4 shadow-subtle dark:border-slate-700 dark:bg-slate-900/75 sm:p-5">
            <div className="flex items-center gap-2.5">
              <BarChart2 className="h-5 w-5 shrink-0 text-primary-700 dark:text-primary-400" aria-hidden="true" />
              <h2 className="font-heading text-lg font-bold leading-7 text-ink">
                {t('analysisTitle')}
              </h2>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-body sm:text-base">
              {t('analysisDescription')}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white/75 p-4 shadow-subtle dark:border-slate-700 dark:bg-slate-900/75 sm:p-5">
            <div className="flex items-center gap-2.5">
              <Database className="h-5 w-5 shrink-0 text-coral-700 dark:text-coral-400" aria-hidden="true" />
              <h2 className="font-heading text-lg font-bold leading-7 text-ink">
                {t('growingFields')}
              </h2>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-body sm:text-base">
              {t('growingFieldsDescription')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
