import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import type { Project } from '@/types';
import { getCategorySlug } from '@/data/projects';
import { getEnglishCaseStudyCopy, localizeCaseStudy } from '@/data/case-study-translations';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Cpu,
  BarChart3,
  ShieldCheck,
  Lightbulb,
  Layers,
  FileCheck,
  Star,
} from 'lucide-react';

interface CaseStudySectionProps {
  project: Project;
  previousProject?: Project;
  nextProject?: Project;
}

export async function CaseStudySection({
  project,
  previousProject,
  nextProject,
}: CaseStudySectionProps) {
  const source = project.caseStudy;
  if (!source) return null;

  const [locale, t, projectCopy, categoryLabels] = await Promise.all([
    getLocale(),
    getTranslations('caseStudies.ui'),
    getTranslations('projects.cards'),
    getTranslations('projects.categories'),
  ]);
  const englishCopy = locale === 'en' ? getEnglishCaseStudyCopy(project.slug) : undefined;
  if (locale === 'en' && !englishCopy) {
    throw new Error(`Missing English case study content for ${project.slug}`);
  }
  const caseStudy = englishCopy ? localizeCaseStudy(source, englishCopy) : source;
  const title = projectCopy(`${project.id}.title`);

  return (
    <article className="max-w-4xl mx-auto space-y-16 pb-20">
      
      {/* Navigation Top */}
      <div className="flex items-center justify-between pt-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('back')}</span>
        </Link>
        {project.isFlagship && (
          <Badge variant="accent" size="sm" className="gap-1 font-semibold">
            <Star className="w-3.5 h-3.5 fill-accent-600" />
            <span>{t('flagship')}</span>
          </Badge>
        )}
      </div>

      {/* Hero Section */}
      <header className="space-y-6 pb-8 border-b border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary" size="md">
            {categoryLabels(getCategorySlug(project.category))}
          </Badge>
          <Badge variant="neutral" size="md">
            {projectCopy(`${project.id}.context`)}
          </Badge>
          <Badge variant="outline" size="md">
            {project.period}
          </Badge>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 font-medium leading-relaxed">
            {caseStudy.heroTagline}
          </p>
        </div>

        {/* Links & Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {caseStudy.githubUrl && (
            <Button
              href={caseStudy.githubUrl}
              isExternal
              variant="outline"
              size="md"
              leftIcon={<Github className="w-4 h-4" />}
            >
              {t('source')}
            </Button>
          )}
          {caseStudy.liveUrl && (
            <Button
              href={caseStudy.liveUrl}
              isExternal
              variant="primary"
              size="md"
              rightIcon={<ExternalLink className="w-4 h-4" />}
            >
              {t('demo')}
            </Button>
          )}
        </div>
      </header>

      {/* Key Results / Metrics Banner (Preuve > Affirmation) */}
      <section className="p-6 sm:p-8 rounded-card bg-white border border-slate-200/90 shadow-card space-y-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary-600" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            {t('metricsTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {caseStudy.results.map((res, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="block text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 font-mono">
                {res.value}
              </span>
              <span className="block text-xs sm:text-sm font-bold text-slate-800">
                {res.label}
              </span>
              {res.detail && (
                <span className="block text-xs text-slate-500 leading-relaxed">
                  {res.detail}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 1. Problème / Contexte */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <AlertCircle className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl sm:text-2xl font-heading font-bold">
            {t('problemTitle')}
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          {caseStudy.problem}
        </p>
        {caseStudy.problemPoints && caseStudy.problemPoints.length > 0 && (
          <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200/60 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
              {t('problemPointsTitle')}
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-950">
              {caseStudy.problemPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 2. Approche & Méthodologie */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <Layers className="w-5 h-5 text-primary-600" />
          <h2 className="text-xl sm:text-2xl font-heading font-bold">
            {t('approachTitle')}
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          {caseStudy.approach}
        </p>
        {caseStudy.approachSteps && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {caseStudy.approachSteps.map((step, i) => (
              <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                <span className="text-xs font-bold font-mono text-primary-700 block">
                  {step.step}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. Rôle & Responsabilité */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <CheckCircle2 className="w-5 h-5 text-accent-600" />
          <h2 className="text-xl sm:text-2xl font-heading font-bold">
            {t('roleTitle')}
          </h2>
        </div>
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 text-sm sm:text-base text-slate-700 leading-relaxed">
          {caseStudy.roleDescription}
        </div>
      </section>

      {/* 4. Réalisation & Architecture */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <Cpu className="w-5 h-5 text-primary-600" />
          <h2 className="text-xl sm:text-2xl font-heading font-bold">
            {t('implementationTitle')}
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          {caseStudy.implementation}
        </p>
        {caseStudy.architectureHighlights && (
          <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              {t('architectureHighlightsTitle')}
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {caseStudy.architectureHighlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 5. Décisions Techniques Clés */}
      {caseStudy.keyDecisions && caseStudy.keyDecisions.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl sm:text-2xl font-heading font-bold">
              {t('decisionsTitle')}
            </h2>
          </div>
          <div className="space-y-4">
            {caseStudy.keyDecisions.map((dec, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3"
              >
                <h3 className="text-base font-heading font-bold text-slate-900">
                  {dec.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-800 block mb-1">{t('decisionLabel')}</span>
                    <span className="text-slate-600">{dec.decision}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-800 block mb-1">{t('rationaleLabel')}</span>
                    <span className="text-slate-600">{dec.rationale}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100">
                    <span className="font-bold text-emerald-900 block mb-1">{t('impactLabel')}</span>
                    <span className="text-emerald-800">{dec.impact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Validation & Tests */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <ShieldCheck className="w-5 h-5 text-accent-600" />
          <h2 className="text-xl sm:text-2xl font-heading font-bold">
            {t('validationTitle')}
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          {caseStudy.validation}
        </p>
        {caseStudy.validationPoints && (
          <div className="p-4 rounded-xl bg-accent-50/50 border border-accent-200/60 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-900 block">
              {t('validationPointsTitle')}
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm text-accent-950">
              {caseStudy.validationPoints.map((vp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <FileCheck className="w-4 h-4 text-accent-700 shrink-0 mt-0.5" />
                  <span>{vp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 7. Recul & Enseignements */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <Lightbulb className="w-5 h-5 text-primary-600" />
          <h2 className="text-xl sm:text-2xl font-heading font-bold">
            {t('reflectionTitle')}
          </h2>
        </div>
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-sm sm:text-base text-slate-700 leading-relaxed italic">
          &laquo; {caseStudy.reflection} &raquo;
        </div>
      </section>

      {/* 8. Technologies Détaillées */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-lg font-heading font-bold text-slate-900">
          {t('technologiesTitle')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {caseStudy.technologiesDetailed.map((cat, i) => (
            <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                {cat.category}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((it) => (
                  <span
                    key={it}
                    className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom pagination */}
      <div className="pt-8 border-t border-slate-200 flex items-center justify-between">
        {previousProject ? (
          <Link
            href={{ pathname: '/projects/[slug]', params: { slug: previousProject.slug } }}
            className="group flex flex-col text-left"
          >
            <span className="text-xs text-slate-400">{t('previousProject')}</span>
            <span className="text-sm font-bold text-slate-800 group-hover:text-primary-600 transition-colors">
              ← {projectCopy(`${previousProject.id}.title`)}
            </span>
          </Link>
        ) : <div />}

        {nextProject && (
          <Link
            href={{ pathname: '/projects/[slug]', params: { slug: nextProject.slug } }}
            className="group flex flex-col text-right"
          >
            <span className="text-xs text-slate-400">{t('nextProject')}</span>
            <span className="text-sm font-bold text-slate-800 group-hover:text-primary-600 transition-colors">
              {projectCopy(`${nextProject.id}.title`)} →
            </span>
          </Link>
        )}
      </div>

    </article>
  );
}

