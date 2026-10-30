'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, BriefcaseBusiness, GraduationCap, Users } from 'lucide-react';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-20 md:space-y-28">
      <header className="max-w-4xl space-y-6">
        <div className="flex flex-wrap gap-2">
          <Badge variant="neutral" size="md">{common('primaryFocus')}</Badge>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]">{t('title')}</h1>
        <div className="max-w-3xl space-y-4 text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
          <p>{t('intro')}</p>
          <p className="text-slate-600 dark:text-slate-400">{t('search')}</p>
        </div>
      </header>

      <section className="grid lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-4 flex items-center gap-3">
          <GraduationCap className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h2 className={heading}>{education('heading')}</h2>
        </div>
        <ol className="lg:col-span-8 border-l border-primary-200 dark:border-primary-800 ml-2 space-y-8">
          {PROFILE.education.map((item) => {
            const details = educationText[item.id];
            return (
              <li key={item.id} className="relative pl-7">
                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary-600 ring-4 ring-primary-50 dark:ring-primary-950" />
                <p className="text-xs font-bold uppercase tracking-wider text-primary-700 dark:text-primary-400">{details.period}</p>
                <h3 className="mt-1 text-lg font-heading font-bold text-slate-900 dark:text-white">{details.degree}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.institution} · {details.location}</p>
                {details.description && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{details.description}</p>}
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
        <article className="lg:col-span-8 border-y border-slate-200 dark:border-slate-800 py-7">
          <p className="text-xs font-bold uppercase tracking-wider text-accent-700 dark:text-accent-400">{t('galaxyLabel')}</p>
          <h3 className="mt-2 text-xl font-heading font-extrabold text-slate-900 dark:text-white">{t('galaxy')}</h3>
          <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">{t('galaxyText')}</p>
          <Link href={projectHref('gtm')} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded">
            {t('galaxyLink')}<ArrowRight className="w-4 h-4" />
          </Link>
        </article>
      </section>

      <section className="grid lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-4 flex items-center gap-3">
          <Users className="w-5 h-5 text-accent-600 dark:text-accent-400" />
          <h2 className={heading}>{t('association')}</h2>
        </div>
        <article className="lg:col-span-8 border-l-2 border-accent-300 dark:border-accent-700 bg-accent-50/60 dark:bg-accent-950/40 px-6 py-6 sm:px-8">
          <h3 className="text-xl font-heading font-extrabold text-slate-900 dark:text-white">{t('cestom')}</h3>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-accent-800 dark:text-accent-300">{t('currentEngagement')}</p>
          <p className="mt-1 text-base font-semibold text-slate-900 dark:text-white">{t('currentRole')}</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-slate-300">{t('cestomText')}</p>
          <div className="mt-5 border-t border-accent-200 dark:border-accent-800 pt-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">{t('previousEngagements')}</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>{t('previousTreasurer')}</li>
              <li>{t('previousVolunteer')}</li>
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
            <article key={key} className="border-t-2 border-primary-200 dark:border-primary-800 pt-5">
              <p className="font-mono text-xs font-bold text-primary-700 dark:text-primary-400">{number}</p>
              <h3 className="mt-2 text-lg font-heading font-bold text-slate-900 dark:text-white">{t(`steps.${key}.title`)}</h3>
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
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-slate-900 dark:bg-slate-800 px-6 py-8 sm:px-10 sm:py-10 text-white border border-transparent dark:border-slate-700">
        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold">{t('cta')}</h2>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button href={href('/projects')} variant="accent" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
            {cta('viewProjects')}
          </Button>
          <Button href={href('/contact')} variant="outline" size="md" className="border-slate-600 bg-transparent text-white hover:bg-slate-800 hover:border-slate-500">
            {cta('contact')}
          </Button>
        </div>
      </section>
    </div>
  );
}
