'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { PROFILE } from '@/data/profile';
import { ArrowRight, BarChart2, Brain, Database, FileText } from 'lucide-react';
import { motion } from 'motion/react';

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
        className="absolute inset-y-0 right-0 hidden w-[38%] bg-primary-100/55 lg:block"
        aria-hidden="true"
      />
      <div
        className="absolute right-[8%] top-20 hidden h-12 w-12 rounded-full bg-coral-300 lg:block"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1.12fr)_minmax(330px,0.88fr)] lg:gap-14 lg:px-8 lg:py-20">
        <motion.div
          className="hero-motion-entry space-y-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-primary-800 sm:text-sm">
            <span className="h-1 w-8 bg-coral-500" aria-hidden="true" />
            {t('studentBadge')}
          </p>

          <div>
            <h1
              id="hero-heading"
              className="font-heading text-[clamp(3rem,7.1vw,5.25rem)] font-extrabold leading-[0.96] tracking-[-0.055em] text-ink"
            >
              <span className="block">{name.slice(0, -1).join(' ')}</span>
              {' '}
              <span className="block text-primary-700">{name[name.length - 1]}</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg font-semibold leading-snug text-slate-700 sm:text-xl">
              {t('degree')}
            </p>
          </div>

          <p className="max-w-xl border-l-[5px] border-coral-500 pl-5 font-heading text-[clamp(1.35rem,2.2vw,1.8rem)] font-bold leading-snug tracking-tight text-ink">
            {t('tagline')}
          </p>

          <div className="max-w-2xl border-y border-slate-300">
            <div className="grid gap-5 py-5 sm:grid-cols-2 sm:gap-7">
              <div className="sm:border-r sm:border-slate-300 sm:pr-6">
                <div className="flex items-center gap-2.5">
                  <BarChart2 className="h-5 w-5 text-primary-700" aria-hidden="true" />
                  <h2 className="font-heading text-lg font-extrabold text-ink">
                    {t('analysisTitle')}
                  </h2>
                </div>
                <p className="mt-2 text-base leading-relaxed text-body">
                  {t('analysisDescription')}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center gap-1" aria-hidden="true">
                    <Database className="h-4 w-4 text-coral-700" />
                    <Brain className="h-4 w-4 text-lilac-700" />
                  </span>
                  <h2 className="font-heading text-lg font-extrabold text-ink">
                    {t('growingFields')}
                  </h2>
                </div>
                <p className="mt-2 text-base leading-relaxed text-body">
                  {t('growingFieldsDescription')}
                </p>
              </div>
            </div>
          </div>

          <p className="inline-flex items-center gap-3 bg-coral-100 px-4 py-3 text-sm font-bold text-coral-900 sm:text-base">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-coral-600" aria-hidden="true" />
            {t('availability')}
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/projects"
              className="inline-flex min-h-12 items-center gap-2 bg-primary-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
            >
              {t('viewProjects')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={PROFILE.contact.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 border border-slate-400 bg-white px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-slate-600 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
            >
              <FileText className="h-4 w-4 text-primary-800" aria-hidden="true" />
              {t('downloadCv')}
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-motion-entry relative mx-auto w-full max-w-[330px] sm:max-w-[380px] lg:max-w-[460px]"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <div
            className="absolute -right-3 -top-3 h-[62%] w-[64%] bg-coral-300 sm:-right-5 sm:-top-5"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-3 -left-3 h-[43%] w-[72%] bg-primary-800 sm:-bottom-5 sm:-left-5"
            aria-hidden="true"
          />
          <div className="relative mx-3 my-3 aspect-[4/5] overflow-hidden bg-slate-900 sm:mx-5 sm:my-5">
            <Image
              src="/images/godwin-portrait.jpg"
              alt={t('portraitAlt')}
              fill
              priority
              sizes="(max-width: 640px) 330px, (max-width: 1024px) 380px, 460px"
              className="object-cover object-top"
              quality={90}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
