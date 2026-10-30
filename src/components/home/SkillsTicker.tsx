'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Braces,
  Database,
  Layers,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { SKILLS } from '@/data/skills';
import type { SkillCategory } from '@/types';
import { cn } from '@/lib/utils';

const skillLogos: Record<string, string> = {
  pandas: 'pandas',
  numpy: 'numpy',
  mysql: 'mysql',
  python: 'python',
  javascript: 'javascript',
  'html-css': 'html5',
  flask: 'flask',
  git: 'git',
  jupyter: 'jupyter',
  pytest: 'pytest',
};

const categoryPresentation: Record<
  SkillCategory,
  { Icon: LucideIcon; accent: string; iconSurface: string; skillSurface: string }
> = {
  'data-analysis': {
    Icon: BarChart3,
    accent: 'text-coral-200',
    iconSurface: 'bg-coral-400/15 text-coral-200',
    skillSurface: 'border-coral-300/30 bg-coral-400/[0.06] hover:border-coral-300/70 hover:bg-coral-400/[0.14]',
  },
  'data-management': {
    Icon: Database,
    accent: 'text-accent-200',
    iconSurface: 'bg-accent-400/15 text-accent-200',
    skillSurface: 'border-accent-300/30 bg-accent-400/[0.06] hover:border-accent-300/70 hover:bg-accent-400/[0.14]',
  },
  programming: {
    Icon: Braces,
    accent: 'text-primary-200',
    iconSurface: 'bg-primary-400/15 text-primary-200',
    skillSurface: 'border-primary-300/30 bg-primary-400/[0.06] hover:border-primary-300/70 hover:bg-primary-400/[0.14]',
  },
  'application-development': {
    Icon: Layers,
    accent: 'text-lilac-200',
    iconSurface: 'bg-lilac-400/15 text-lilac-200',
    skillSurface: 'border-lilac-300/30 bg-lilac-400/[0.06] hover:border-lilac-300/70 hover:bg-lilac-400/[0.14]',
  },
  'development-tools': {
    Icon: Wrench,
    accent: 'text-slate-200',
    iconSurface: 'bg-slate-400/15 text-slate-200',
    skillSurface: 'border-slate-300/30 bg-slate-400/[0.06] hover:border-slate-300/70 hover:bg-slate-400/[0.14]',
  },
};

const skillCategoryColumns: SkillCategory[][] = [
  ['data-analysis'],
  ['data-management', 'application-development'],
  ['programming', 'development-tools'],
];

export function SkillsTicker() {
  const router = useRouter();
  const t = useTranslations('home.skills');
  const skillLabels = useTranslations('skills.names');
  const skillDescriptions = useTranslations('skills.descriptions');
  const common = useTranslations('common');

  return (
    <section
      className="skills-ticker border-y border-slate-900 bg-slate-900 py-10 text-white sm:py-12"
      aria-label={t('sectionLabel')}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          data-skills-header="true"
          className="mb-6 flex flex-col justify-between gap-3 sm:mb-8 sm:flex-row sm:items-end"
        >
          <div>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              {t('heading')}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
              {t('instruction')}
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex min-h-10 shrink-0 items-center gap-1.5 self-start rounded-sm text-sm font-semibold text-accent-200 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:self-auto"
          >
            <span>{common('cta.viewAllProjects')}</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillCategoryColumns.map((categories) => (
            <div key={categories[0]} className="flex flex-col gap-4">
              {categories.map((category) => {
                const { Icon, accent, iconSurface, skillSurface } = categoryPresentation[category];
                const skills = SKILLS.filter((skill) => skill.category === category);

                return (
                  <section
                    key={category}
                    data-skill-category={category}
                    aria-labelledby={`skill-category-${category}`}
                    className={cn(
                      'rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5',
                      category === 'application-development' && 'dark:bg-lilac-950/60'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', iconSurface)}>
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <h3
                          id={`skill-category-${category}`}
                          className={cn('font-heading text-base font-bold leading-snug sm:text-lg', accent)}
                        >
                          {t(`categories.${category}`)}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-slate-300 sm:text-sm">
                          {t(`categoryDescriptions.${category}`)}
                        </p>
                      </div>
                    </div>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {skills.map((skill) => {
                        const name = skillLabels(skill.id);

                        return (
                          <li key={skill.id}>
                            <button
                              type="button"
                              data-skill-id={skill.id}
                              data-project-slugs={skill.projectSlugs.join(' ')}
                              onClick={() => router.push({ pathname: '/projects', query: { skill: skill.id } })}
                              aria-label={t('filterAria', { skill: name })}
                              title={skillDescriptions(skill.id)}
                              className={cn(
                                'group inline-flex min-h-10 items-center gap-2 rounded-full border px-3 py-2 text-left text-xs font-semibold text-white transition-colors sm:text-sm',
                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
                                skillSurface
                              )}
                            >
                              {skillLogos[skill.id] ? (
                                <Image
                                  src={`/skill-logos/${skillLogos[skill.id]}.svg`}
                                  alt=""
                                  aria-hidden="true"
                                  width={16}
                                  height={16}
                                  unoptimized
                                  className="h-4 w-4 shrink-0"
                                />
                              ) : (
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
                              )}
                              <span>{name}</span>
                              <ArrowUpRight
                                className="h-3.5 w-3.5 shrink-0 text-white/55 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                aria-hidden="true"
                              />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
