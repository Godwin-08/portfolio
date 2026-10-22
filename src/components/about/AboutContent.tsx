'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Compass, FileText, GraduationCap, Lightbulb, Puzzle, Users } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PROFILE } from '@/data/profile';

export function AboutContent() {
  const t = useTranslations('about');
  const education = useTranslations('about.education');
  const common = useTranslations('common');
  const cta = useTranslations('common.cta');
  const heading = 'text-2xl sm:text-3xl font-heading font-extrabold text-slate-900';
  const educationText = {
    engineering: {
      period: education('engineering.period'),
      degree: education('engineering.degree'),
      location: education('engineering.location'),
      description: education('engineering.description'),
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
    { key: 'understand', number: '01' },
    { key: 'analyze', number: '02' },
    { key: 'build', number: '03' },
  ] as const;
  const proof = ['verify', 'method', 'progress'] as const;
  const associationResponsibilities = ['welcome', 'relay', 'activities', 'followUp'] as const;
  const href = (path: '/projects/gtm' | '/projects' | '/contact') =>
    path === '/projects/gtm'
      ? { pathname: '/projects/[slug]' as const, params: { slug: 'gtm' } }
      : path;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-20 md:space-y-28">
      <header className="max-w-4xl space-y-6">
        <div className="flex flex-wrap gap-2">
          <Badge variant="neutral" size="md">{common('primaryFocus')}</Badge>
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-700">{t('eyebrow')}</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight text-slate-900 leading-[1.08]">{t('title')}</h1>
        <div className="max-w-3xl space-y-4 text-base sm:text-lg leading-relaxed text-slate-700">
          <p>{t('intro')}</p>
          <p className="text-slate-600">{t('search')}</p>
        </div>
      </header>

      <section className="grid lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-4 flex items-center gap-3">
          <GraduationCap className="w-5 h-5 text-primary-600" />
          <h2 className={heading}>{education('heading')}</h2>
        </div>
        <ol className="lg:col-span-8 border-l border-primary-200 ml-2 space-y-8">
          {PROFILE.education.map((item) => {
            const details = educationText[item.id];
            return (
              <li key={item.id} className="relative pl-7">
                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary-600 ring-4 ring-primary-50" />
                <p className="text-xs font-bold uppercase tracking-wider text-primary-700">{details.period}</p>
                <h3 className="mt-1 text-lg font-heading font-bold text-slate-900">{details.degree}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.institution} · {details.location}</p>
                <p className="mt-2 text-sm text-slate-600">{details.description}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="grid lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-4 flex items-center gap-3">
          <BriefcaseBusiness className="w-5 h-5 text-primary-600" />
          <h2 className={heading}>{t('professional')}</h2>
        </div>
        <article className="lg:col-span-8 border-y border-slate-200 py-7">
          <p className="text-xs font-bold uppercase tracking-wider text-accent-700">{t('galaxyLabel')}</p>
          <h3 className="mt-2 text-xl font-heading font-extrabold text-slate-900">{t('galaxy')}</h3>
          <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600">{t('galaxyText')}</p>
          <Link href={href('/projects/gtm')} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded">
            {t('galaxyLink')}<ArrowRight className="w-4 h-4" />
          </Link>
        </article>
      </section>

      <section className="grid lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-4 flex items-center gap-3">
          <Users className="w-5 h-5 text-accent-600" />
          <h2 className={heading}>{t('association')}</h2>
        </div>
        <article className="lg:col-span-8 border-l-2 border-accent-300 bg-accent-50/60 px-6 py-6 sm:px-8">
          <h3 className="text-xl font-heading font-extrabold text-slate-900">{t('cestom')}</h3>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-accent-800">{t('currentEngagement')}</p>
          <p className="mt-1 text-base font-semibold text-slate-900">{t('currentRole')}</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-700">{t('cestomText')}</p>
          <div className="mt-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600">{t('cestomResponsibilitiesTitle')}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-700">
              {associationResponsibilities.map((key) => (
                <li key={key}>{t(`cestomResponsibilities.${key}`)}</li>
              ))}
            </ul>
          </div>
          <div className="mt-5 border-t border-accent-200 pt-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600">{t('previousEngagements')}</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              <li>{t('previousTreasurer')}</li>
              <li>{t('previousVolunteer')}</li>
            </ul>
          </div>
        </article>
      </section>

      <section className="space-y-8">
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-700">{t('method')}</p>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900">{t('methodTitle')}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(({ key, number }) => (
            <article key={key} className="border-t-2 border-primary-200 pt-5">
              <p className="font-mono text-xs font-bold text-primary-700">{number}</p>
              <h3 className="mt-2 text-lg font-heading font-bold text-slate-900">{t(`steps.${key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(`steps.${key}.text`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-4 flex items-center gap-3">
          <Puzzle className="w-5 h-5 text-primary-600" />
          <h2 className={heading}>{t('traits')}</h2>
        </div>
        <div className="lg:col-span-8 grid sm:grid-cols-3 gap-5">
          {proof.map((key) => (
            <article key={key} className="space-y-2">
              <CheckCircle2 className="w-5 h-5 text-accent-600" />
              <h3 className="text-base font-heading font-bold text-slate-900">{t(`proof.${key}.title`)}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{t(`proof.${key}.text`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        <div className="lg:col-span-4 flex items-center gap-3">
          <Compass className="w-5 h-5 text-primary-600" />
          <h2 className={heading}>{t('focus')}</h2>
        </div>
        <div className="lg:col-span-8 rounded-card bg-primary-50 border border-primary-200/80 px-6 py-7 sm:px-8">
          <p className="max-w-2xl text-base leading-relaxed text-slate-700">{t('focusText')}</p>
        </div>
      </section>

      <section className="max-w-3xl border-t border-slate-200 pt-10">
        <div className="flex items-center gap-3">
          <Lightbulb className="w-5 h-5 text-accent-600" />
          <h2 className={heading}>{t('beyond')}</h2>
        </div>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">{t('beyondText')}</p>
      </section>

      <section className="rounded-2xl bg-slate-900 px-6 py-8 sm:px-10 sm:py-10 text-white">
        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold">{t('cta')}</h2>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button href={href('/projects')} variant="accent" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
            {cta('viewProjects')}
          </Button>
          <Button href={href('/contact')} variant="outline" size="md" className="border-slate-600 bg-transparent text-white hover:bg-slate-800 hover:border-slate-500">
            {cta('contact')}
          </Button>
          <Button href={PROFILE.contact.cvPath} isExternal variant="ghost" size="md" className="text-slate-200 hover:bg-slate-800 hover:text-white" leftIcon={<FileText className="w-4 h-4" />}>
            {cta('downloadCv')}
          </Button>
        </div>
      </section>
    </div>
  );
}
