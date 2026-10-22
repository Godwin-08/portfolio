import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowUpRight, CalendarDays, HeartPulse, ShoppingBag, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import type { Project } from '@/types';
import { getCategorySlug } from '@/data/projects';
import { SKILLS } from '@/data/skills';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

const EDITORIAL_VISUALS: Record<
  string,
  { mark: string; Icon: LucideIcon; surface: string; ink: string; accent: string }
> = {
  'revision-flow': {
    mark: 'RF',
    Icon: CalendarDays,
    surface: 'bg-lilac-100',
    ink: 'text-lilac-900',
    accent: 'text-primary-700',
  },
  'sante-scolaire': {
    mark: 'SS',
    Icon: HeartPulse,
    surface: 'bg-green-100',
    ink: 'text-accent-900',
    accent: 'text-coral-700',
  },
  novastore: {
    mark: 'NS',
    Icon: ShoppingBag,
    surface: 'bg-coral-100',
    ink: 'text-coral-900',
    accent: 'text-primary-700',
  },
};

function ProjectEditorialVisual({ project, title }: { project: Project; title: string }) {
  const ui = useTranslations('projects.card');
  const visual = EDITORIAL_VISUALS[project.slug];

  if (!visual) {
    return (
      <div className="flex h-full items-center justify-center bg-paper p-6 text-center font-heading text-xl font-extrabold text-ink">
        {title}
      </div>
    );
  }

  const { Icon } = visual;

  return (
    <div
      className={cn('relative flex h-full items-center justify-center overflow-hidden', visual.surface, visual.ink)}
      aria-hidden="true"
    >
      <span className="absolute -right-10 -top-16 h-52 w-52 rounded-full border-[24px] border-white/45" />
      <span className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full border border-current/15" />
      <div className="relative flex items-center gap-4 sm:gap-6">
        <Icon className={cn('h-10 w-10 shrink-0 sm:h-14 sm:w-14', visual.accent)} strokeWidth={1.5} />
        <span className="font-heading text-6xl font-extrabold leading-none tracking-[-0.08em] sm:text-8xl">
          {visual.mark}
        </span>
      </div>
      <span className="absolute bottom-4 left-4 rounded-full bg-white/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-ink">
        {ui('editorialVisual')}
      </span>
      <span className="absolute bottom-5 right-5 h-2.5 w-2.5 rounded-full bg-coral-500" />
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
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
        'project-card group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-card-hover',
        'focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2',
        project.isFlagship && 'border-accent-300'
      )}
    >
      <div data-project-preview="true" className="shrink-0">
        <div
          data-project-labels="true"
          className="flex min-h-12 flex-wrap items-center gap-x-2 gap-y-1.5 border-b border-slate-100 px-3 py-2 sm:px-4"
        >
          <span className="inline-flex min-h-8 max-w-full shrink-0 items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold leading-snug text-ink">
            {categories(getCategorySlug(project.category))}
          </span>
          <div className="ml-auto flex shrink-0 items-center gap-1.5">
            {project.isFlagship && (
              <span className="inline-flex min-h-8 items-center gap-1 rounded-full bg-white px-2.5 py-1.5 text-xs font-semibold text-ink">
                <Star className="h-3.5 w-3.5 fill-coral-500 text-coral-600" aria-hidden="true" />
                {ui('flagship')}
              </span>
            )}
            <span className="rounded-full bg-ink/85 px-2.5 py-1.5 font-mono text-[10px] font-semibold text-white">
              {project.order.toString().padStart(2, '0')}
            </span>
          </div>
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
              alt={ui('imageAlt', { title })}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-1 transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:group-hover:scale-100"
            />
          ) : (
            <ProjectEditorialVisual project={project} title={title} />
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary-800">
          {copy(`${project.id}.context`)}
        </p>
        <h2 className="mt-2 font-heading text-xl font-extrabold leading-tight tracking-tight text-ink sm:text-[1.35rem]">
          {title}
        </h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-body sm:text-[0.925rem]">
          {copy(`${project.id}.summary`)}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={ui('technologiesLabel')}>
          {project.skills.slice(0, 4).map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-slate-300 bg-paper px-2.5 py-1 font-mono text-xs font-medium text-slate-800"
            >
              {getSkillLabel(skill)}
            </li>
          ))}
        </ul>

        <Link
          href={hasCaseStudy ? { pathname: '/projects/[slug]', params: { slug: project.slug } } : '/projects'}
          className="mt-5 inline-flex min-h-10 w-fit items-center gap-2 border-b border-primary-700 pb-1 text-sm font-bold text-primary-800 transition-colors hover:border-coral-600 hover:text-coral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
        >
          <span>{ui('caseStudy')}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
