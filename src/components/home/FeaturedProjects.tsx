'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { getCategorySlug, getFeaturedProjects } from '@/data/projects';
import type { Project } from '@/types';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const FEATURED_ACCENT: Record<string, string> = {
  gtm: 'border-accent-500',
  olist: 'border-primary-600',
  afc: 'border-lilac-500',
};

interface ProjectPreviewCopy {
  title: string;
  category: string;
  description: string;
}

const ProjectCard: React.FC<{
  project: Project;
  copy: ProjectPreviewCopy;
  caseStudyLabel: string;
  caseStudyAria: string;
  imageAlt: string;
  ordersAnalyzedLabel: string;
}> = ({ project, copy, caseStudyLabel, caseStudyAria, imageAlt, ordersAnalyzedLabel }) => {
  const cardUi = useTranslations('projects.card');
  const surfaceClass = FEATURED_ACCENT[project.slug] ?? 'border-primary-500';
  const ordersAnalyzed = project.slug === 'olist' ? project.keyMetrics[0]?.value : undefined;

  return (
    <article className={cn('project-card group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-card-hover', `border-t-4 ${surfaceClass}`)}>
      <div data-project-preview="true" className="shrink-0">
        <div
          data-project-labels="true"
          className="flex min-h-12 flex-wrap items-center gap-x-2 gap-y-1.5 border-b border-slate-100 px-3 py-2 sm:px-4"
        >
          <span className="inline-flex min-h-8 max-w-full shrink-0 items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold leading-snug text-ink">
            {copy.category}
          </span>
          <span className="ml-auto rounded-full bg-ink/85 px-2.5 py-1.5 font-mono text-[10px] font-bold text-white">
            {project.order.toString().padStart(2, '0')}
          </span>
        </div>

        <div
          data-project-visual="true"
          className={cn(
            'relative overflow-hidden',
            project.slug === 'afc'
              ? 'aspect-[4/3] border border-slate-300 bg-slate-100'
              : 'aspect-[16/10] bg-paper'
          )}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-1 transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:group-hover:scale-100"
            />
          ) : (
            <div className="flex h-full items-center justify-center p-6 text-center font-heading text-xl font-bold text-ink">
              {copy.title}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-heading text-xl font-extrabold leading-tight tracking-tight text-ink sm:text-2xl">
          {copy.title}
        </h3>

        {ordersAnalyzed && (
          <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 border-l-[3px] border-coral-500 bg-coral-50 px-3 py-2">
            <strong className="font-heading text-2xl font-extrabold tracking-tight text-ink">{ordersAnalyzed}</strong>
            <span className="text-xs font-semibold text-body sm:text-sm">{ordersAnalyzedLabel}</span>
          </div>
        )}

        <p className="mt-3 flex-1 text-sm leading-relaxed text-body sm:text-base">
          {copy.description}
        </p>

        <ul className="mt-4 flex min-h-7 flex-wrap gap-1.5" aria-label={cardUi('technologiesLabel')}>
          {project.skills.slice(0, 3).map((tech) => (
            <li key={tech} className="rounded-full border border-slate-300 bg-paper px-2.5 py-1 font-mono text-xs font-medium text-slate-800">
              {tech}
            </li>
          ))}
        </ul>

        <Link
          href={{ pathname: '/projects/[slug]', params: { slug: project.slug } }}
          className="mt-4 inline-flex min-h-10 w-fit items-center gap-2 border-b border-primary-700 pb-1 text-sm font-bold text-primary-800 transition-colors hover:border-coral-600 hover:text-coral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
        >
          <span>{caseStudyLabel}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          <span className="sr-only">{caseStudyAria}</span>
        </Link>
      </div>
    </article>
  );
};

export const FeaturedProjects: React.FC = () => {
  const t = useTranslations('home.projects');
  const cta = useTranslations('common.cta');
  const cards = useTranslations('projects.cards');
  const categories = useTranslations('projects.categories');
  const cardUi = useTranslations('projects.card');
  const featured = getFeaturedProjects();

  return (
    <section className="bg-[var(--bg-main)] py-16 md:py-24" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:space-y-10 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-1 w-8 bg-coral-500" aria-hidden="true" />
              <span className="text-sm font-bold uppercase tracking-[0.16em] text-coral-900">
                {t('eyebrow')}
              </span>
            </div>
            <h2
              id="projects-heading"
              className="font-heading text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-tight tracking-tight text-ink"
            >
              {t('heading')}
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-body sm:text-lg">
              {t('description')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-7">
          {featured.map((project) => {
            const copy: ProjectPreviewCopy = {
              title: cards(`${project.id}.title`),
              category: categories(getCategorySlug(project.category)),
              description: cards(`${project.id}.${project.slug === 'olist' ? 'summary' : 'tagline'}`),
            };
            return (
              <ProjectCard
                key={project.id}
                project={project}
                copy={copy}
                caseStudyLabel={cta('readCaseStudy')}
                caseStudyAria={cardUi('caseStudyAria', { title: copy.title })}
                imageAlt={cardUi('imageAlt', { title: copy.title })}
                ordersAnalyzedLabel={t('ordersAnalyzed')}
              />
            );
          })}
        </div>

        <div className="pt-1 text-center">
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center gap-2 border border-primary-800 px-5 py-2.5 text-sm font-bold text-primary-900 transition-colors hover:bg-primary-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
          >
            <span>{cta('viewAllProjects')}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};
