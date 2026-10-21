'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowUpRight, Star } from 'lucide-react';

import { Project } from '@/types';
import { getCategorySlug } from '@/data/projects';
import { SKILLS } from '@/data/skills';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({
  project,
  featured = false,
}: ProjectCardProps) {
  const copy = useTranslations('projects.cards');
  const ui = useTranslations('projects.card');
  const categories = useTranslations('projects.categories');
  const skillLabels = useTranslations('skills.names');
  const title = copy(`${project.id}.title`);
  const getSkillLabel = (name: string) => {
    const skill = SKILLS.find((entry) => entry.name.toLowerCase() === name.toLowerCase());
    return skill ? skillLabels(skill.id) : name;
  };
  const hasCaseStudy = Boolean(project.caseStudy);

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-card border border-slate-200/90 bg-white shadow-card transition-all duration-300 hover:shadow-card-hover',
        'focus-within:ring-2 focus-within:ring-primary-500/30',
        project.isFlagship && 'ring-1 ring-accent-500/30',
        featured && 'md:col-span-2'
      )}
    >
      {/* Visual */}
      <div
        className={cn(
          'relative overflow-hidden bg-slate-100',
          featured ? 'aspect-[16/9]' : 'aspect-[16/10]'
        )}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={ui('imageAlt', { title })}
            fill
            sizes={
              featured
                ? '(max-width: 768px) 100vw, 66vw'
                : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            }
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: project.accentColor }}
            aria-hidden="true"
          />
        )}

        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent"
          aria-hidden="true"
        />

        {/* Top information */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-3 sm:p-4">
          <span className="rounded-md bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700 shadow-sm backdrop-blur-sm">
            {categories(getCategorySlug(project.category))}
          </span>

          {project.isFlagship && (
            <span className="inline-flex items-center gap-1.5 rounded-md bg-white/90 px-2 py-1 text-[10px] font-semibold text-slate-800 shadow-sm backdrop-blur-sm">
              <Star
                className="h-3 w-3 fill-accent-500 text-accent-500"
                aria-hidden="true"
              />
              {ui('flagship')}
            </span>
          )}
        </div>

        {/* Bottom visible information */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-white/75">
            {copy(`${project.id}.context`)}
          </p>

          <h2 className="line-clamp-2 font-heading text-lg font-bold text-white sm:text-xl">
            {title}
          </h2>
        </div>

        {/* Desktop / keyboard reveal */}
        <div className="absolute inset-0 flex translate-y-full flex-col justify-end bg-slate-950/94 p-5 text-white transition-transform duration-300 group-hover:translate-y-0 group-focus-within:translate-y-0 sm:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/65">
            {categories(getCategorySlug(project.category))}
          </p>

          <h3 className="mt-1 font-heading text-lg font-bold sm:text-xl">
            {title}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-200">
            {copy(`${project.id}.summary`)}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-white/10 px-2 py-1 font-mono text-[10px] text-slate-100"
              >
                {getSkillLabel(skill)}
              </span>
            ))}
          </div>

          <Link
            href={hasCaseStudy ? { pathname: '/projects/[slug]', params: { slug: project.slug } } : '/projects'}
            className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-btn bg-primary-600 px-3.5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            <span>
              {hasCaseStudy ? ui('caseStudy') : ui('project')}
            </span>
            <ArrowUpRight
              className="h-3.5 w-3.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>

      {/* Mobile / non-hover fallback */}
      <div className="flex flex-1 flex-col p-4 sm:hidden">
        <p className="line-clamp-2 text-xs leading-relaxed text-slate-600">
          {copy(`${project.id}.tagline`)}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-slate-200/70 bg-slate-50 px-2 py-0.5 font-mono text-[10px] text-slate-600"
            >
              {getSkillLabel(skill)}
            </span>
          ))}
        </div>

        <Link
          href={hasCaseStudy ? { pathname: '/projects/[slug]', params: { slug: project.slug } } : '/projects'}
          aria-label={hasCaseStudy ? ui('caseStudyAria', { title }) : ui('projectAria', { title })}
          className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-btn bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <span>
            {hasCaseStudy ? ui('caseStudy') : ui('project')}
          </span>
          <ArrowUpRight
            className="h-3.5 w-3.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
