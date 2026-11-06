'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, BriefcaseBusiness, FileText, GraduationCap, Users } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PROFILE } from '@/data/profile';

export function AboutContent() {
  const t = useTranslations('about');
  const education = useTranslations('about.education');
  const common = useTranslations('common');
  const cta = useTranslations('common.cta');
  const heading = 'text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 dark:text-white';
  const educationText: Record<(typeof PROFILE.education)[number]['id'], {
    period: string;
    degree: string;
    location: string;
    description?: string;
  }> = {
    engineering: {
      period: education('engineering.period'),
      degree: education('engineering.degree'),
      location: education('engineering.location'),
    },
    deug: {
      period: education('deug.period'),
      degree: education('deug.degree'),
      location: education('deug.location'),
      description: education('deug.description'),
    },
    baccalaureate: {
      period: education('baccalaureate.period'),
      degree: education('baccalaureate.degree'),
      location: education('baccalaureate.location'),
      description: education('baccalaureate.description'),
    },
  };
  const steps = [
    { key: 'understand', number: '01', slug: 'afc' },
    { key: 'analyze', number: '02', slug: 'olist' },
    { key: 'build', number: '03', slug: 'gtm' },
  ] as const;
  const projectHref = (slug: (typeof steps)[number]['slug']) => ({
    pathname: '/projects/[slug]' as const,
    params: { slug },
  });
  const href = (path: '/projects' | '/contact') => path;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12 sm:space-y-16 md:space-y-24">
      <header className="max-w-4xl space-y-6">
        <div className="flex flex-wrap gap-2">
          <Badge variant="neutral" size="md">{common('primaryFocus')}</Badge>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]">{t('title')}</h1>
        <div className="max-w-3xl space-y-4 text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
          <p>{t('intro')}</p>
          <p className="text-slate-600 dark:text-slate-400">
            {t.rich('search', {
              certLink: (chunks) => (
                <Link
                  href={{ pathname: '/certifications/[slug]', params: { slug: 'data-analyst-associate' } }}
                  className="font-semibold text-primary-700 underline decoration-primary-300 underline-offset-2 hover:text-primary-800 dark:text-primary-300 dark:decoration-primary-700 dark:hover:text-primary-200"
                >
                  {chunks}
                </Link>
              ),
              trackLink: (chunks) => (
                <Link
                  href={{ pathname: '/certifications/[slug]', params: { slug: 'associate-data-analyst-in-sql' } }}
                  className="font-semibold text-primary-700 underline decoration-primary-300 underline-offset-2 hover:text-primary-800 dark:text-primary-300 dark:decoration-primary-700 dark:hover:text-primary-200"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>
      </header>

      <section className="grid lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-4 flex items-center gap-3">
          <GraduationCap className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h2 className={heading}>{education('heading')}</h2>
        </div>
        <ol className="lg:col-span-8 border-l-2 border-primary-200 dark:border-primary-800/80 ml-2 space-y-8 pl-6">
          {PROFILE.education.map((item) => {
            const details = educationText[item.id];
            return (
              <li key={item.id} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-primary-600 ring-4 ring-primary-50 dark:ring-primary-950" />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold font-mono uppercase tracking-wider text-primary-700 dark:text-primary-400">
                    {details.period}
                  </span>
                  {details.description && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {details.description}
                    </span>
                  )}
                </div>
                <h3 className="mt-1.5 text-lg font-heading font-bold text-slate-900 dark:text-white">{details.degree}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.institution} · {details.location}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="grid lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-4 flex items-center gap-3">
          <BriefcaseBusiness className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h2 className={heading}>{t('professional')}</h2>
        </div>
        <article className="lg:col-span-8 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-700 dark:text-accent-400">
              {t('galaxyLabel')}
            </span>
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-300 border border-primary-200/50 dark:border-primary-800/40">
                Flask
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-300 border border-primary-200/50 dark:border-primary-800/40">
                MySQL 3NF
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-300 border border-primary-200/50 dark:border-primary-800/40">
                ACP (PCA)
              </span>
            </div>
          </div>
          <h3 className="mt-3 text-xl sm:text-2xl font-heading font-extrabold text-slate-900 dark:text-white">
            {t('galaxy')}
          </h3>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {t('galaxyText')}
          </p>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <Link
              href={projectHref('gtm')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
            >
              <span>{t('galaxyLink')}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </article>
      </section>

      <section className="grid lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-4 flex items-center gap-3">
          <Users className="w-5 h-5 text-accent-600 dark:text-accent-400" />
          <h2 className={heading}>{t('association')}</h2>
        </div>
        <article className="lg:col-span-8 rounded-2xl border-l-4 border-accent-500 bg-accent-50/50 dark:bg-accent-950/30 border border-slate-200/60 dark:border-slate-800 p-6 sm:p-8">
          <h3 className="text-xl font-heading font-extrabold text-slate-900 dark:text-white">{t('cestom')}</h3>
          <p className="mt-3 text-xs font-bold uppercase tracking-wider text-accent-800 dark:text-accent-300">{t('currentEngagement')}</p>
          <p className="mt-1 text-base font-semibold text-slate-900 dark:text-white">{t('currentRole')}</p>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">{t('cestomText')}</p>
          <div className="mt-6 border-t border-accent-200/80 dark:border-accent-900/60 pt-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">{t('previousEngagements')}</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-600 dark:bg-accent-400" />
                <span>{t('previousTreasurer')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-600 dark:bg-accent-400" />
                <span>{t('previousVolunteer')}</span>
              </li>
            </ul>
          </div>
        </article>
      </section>

      <section className="space-y-8">
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-400">{t('method')}</p>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 dark:text-white">{t('methodTitle')}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(({ key, number, slug }) => (
            <article
              key={key}
              className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-6 transition-all duration-200 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="inline-block font-mono text-xs font-bold text-primary-700 dark:text-primary-400 bg-primary-100/70 dark:bg-primary-950 px-2 py-0.5 rounded-md">
                  {number}
                </span>
                <h3 className="mt-3 text-lg font-heading font-bold text-slate-900 dark:text-white">{t(`steps.${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {t(`steps.${key}.prefix`)}
                  <Link
                    href={projectHref(slug)}
                    className="font-semibold text-primary-700 underline decoration-primary-300 underline-offset-2 hover:text-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-primary-300 dark:decoration-primary-700 dark:hover:text-primary-200"
                  >
                    {t(`steps.${key}.project`)}
                  </Link>
                  {t(`steps.${key}.suffix`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-slate-900 dark:bg-slate-800 px-6 py-8 sm:px-10 sm:py-10 text-white border border-transparent dark:border-slate-700">
        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold">{t('cta')}</h2>
        <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
          <Button href={href('/projects')} variant="accent" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
            {cta('viewProjects')}
          </Button>
          <a
            href="/cv/CV_Godwin_Nougbolo.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-btn px-5 py-2.5 text-sm font-medium border border-slate-600 bg-slate-800 text-white hover:bg-slate-700 hover:border-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            <span>{cta('downloadCv')}</span>
          </a>
          <Button href={href('/contact')} variant="outline" size="md" className="border-slate-600 bg-transparent text-white hover:bg-slate-800 hover:border-slate-500">
            {cta('contact')}
          </Button>
        </div>
      </section>
    </div>
  );
}
