'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, BarChart2, Database, Download, Mail } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const t = useTranslations('home.hero');
  const common = useTranslations('common');
  const name = common('name').split(' ');

  return (
    <section
      className="relative isolate overflow-hidden bg-paper"
      aria-labelledby="hero-heading"
    >
      <div
        className="absolute inset-y-0 right-0 hidden w-[38%] bg-[var(--bg-blue-tint)] lg:block"
        aria-hidden="true"
      />
      <div
        className="absolute right-[8%] top-20 hidden h-10 w-10 rounded-full bg-coral-300 lg:block"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-3 px-4 py-5 sm:gap-4 sm:px-6 sm:py-9 lg:grid-cols-[minmax(0,1.12fr)_minmax(330px,0.88fr)] lg:gap-x-10 lg:gap-y-6 lg:px-8 lg:py-14">
        <div className="hero-motion-entry hero-motion-entry--copy space-y-4 lg:col-start-1 lg:row-start-1 lg:space-y-6">
          <div className="space-y-2">
            <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.13em] text-primary-800 dark:text-primary-300 sm:text-sm">
              <span className="h-1 w-7 shrink-0 bg-coral-500" aria-hidden="true" />
              {t('studentBadge')}
            </p>
            <p className="text-sm font-medium leading-snug text-body">
              {t('degree')}
            </p>

            <h1
              id="hero-heading"
              className="font-heading text-[clamp(2.8rem,6.8vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.055em] text-ink"
            >
              <span className="block">{name.slice(0, -1).join(' ')}</span>
              {' '}
              <span className="block text-primary-700 dark:text-primary-400">{name[name.length - 1]}</span>
            </h1>

            <p className="max-w-xl border-l-[3px] border-coral-500 pl-4 font-heading text-[clamp(1.25rem,2.1vw,1.65rem)] font-bold leading-snug tracking-tight text-ink">
              {t('tagline')}
            </p>
            <p className="mt-3 flex w-fit max-w-full items-start gap-2 rounded-full border border-coral-200 bg-coral-50 px-3 py-1.5 text-xs font-bold leading-snug text-coral-900 dark:border-coral-800 dark:bg-coral-950/60 dark:text-coral-200 sm:py-2 sm:text-sm">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-coral-600" aria-hidden="true" />
              <span className="min-w-0">{t('availability')}</span>
            </p>
          </div>
        </div>

        <div className="hero-motion-entry hero-motion-entry--portrait relative mx-auto mb-2 h-[190px] w-[155px] lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mb-0 lg:h-auto lg:w-full lg:max-w-[390px] lg:-translate-y-12 lg:self-center">
          <div
            className="absolute -right-1 -top-1 h-[62%] w-[64%] bg-coral-300 lg:-right-4 lg:-top-4"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-1 -left-1 h-[43%] w-[72%] bg-primary-800 lg:-bottom-4 lg:-left-4"
            aria-hidden="true"
          />
          <div className="hero-portrait-frame group relative h-full w-full overflow-hidden rounded-lg border-2 border-white bg-slate-900 shadow-card dark:bg-slate-950 lg:mx-4 lg:my-4 lg:aspect-[4/5] lg:h-auto lg:w-auto lg:rounded-none lg:border-0 lg:shadow-card">
            <Image
              src="/images/godwin-portrait.jpg"
              alt={t('portraitAlt')}
              fill
              priority
              sizes="(max-width: 1023px) 155px, 460px"
              className="hero-portrait-image object-cover object-top"
              quality={75}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 pt-0.5 sm:w-auto sm:flex-row lg:col-start-1 lg:row-start-3">
          <Link
            href="/projects"
            className="motion-control inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-primary-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-primary-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 sm:w-auto"
          >
            {t('viewProjects')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="motion-control inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-primary-700 bg-white/60 px-5 py-2.5 text-sm font-bold text-primary-800 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 dark:border-primary-400 dark:bg-slate-900/70 dark:text-primary-200 dark:hover:bg-slate-800 sm:w-auto"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {common('cta.contact')}
          </Link>
          <a
            href="/cv/CV_Godwin_Nougbolo.pdf"
            download
            className="motion-control inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-coral-500 bg-white/60 px-5 py-2.5 text-sm font-bold text-coral-800 hover:bg-coral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2 dark:bg-slate-900/70 dark:text-coral-200 dark:hover:bg-slate-800 sm:w-auto"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {t('downloadCv')}
          </a>
        </div>

        <div className="space-y-4 lg:col-start-1 lg:row-start-2 lg:space-y-6">
          <div className="grid max-w-2xl items-start gap-2 sm:grid-cols-2 sm:gap-3">
            <div className="rounded-xl border border-slate-200 bg-white/70 p-3 shadow-subtle dark:border-slate-700 dark:bg-slate-900/70 sm:p-4">
              <div className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4 shrink-0 text-primary-700 dark:text-primary-400" aria-hidden="true" />
                <h2 className="font-heading text-base font-extrabold leading-snug text-ink sm:text-lg">
                    {t('analysisTitle')}
                </h2>
              </div>
              <p className="mt-1.5 text-base leading-relaxed text-body sm:mt-2">
                {t('analysisDescription')}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white/70 p-3 shadow-subtle dark:border-slate-700 dark:bg-slate-900/70 sm:p-4">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 shrink-0 text-coral-700" aria-hidden="true" />
                <h2 className="font-heading text-base font-extrabold leading-snug text-ink sm:text-lg">
                  {t('growingFields')}
                </h2>
              </div>
              <p className="mt-1.5 text-base leading-relaxed text-body sm:mt-2">
                {t('growingFieldsDescription')}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
