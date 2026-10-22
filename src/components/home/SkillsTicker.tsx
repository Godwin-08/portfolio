'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { SKILLS } from '@/data/skills';
import { ArrowRight, ArrowUpRight, ChevronDown, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SkillsTicker: React.FC = () => {
  const router = useRouter();
  const t = useTranslations('home.skills');
  const common = useTranslations('common');

  const midpoint = Math.ceil(SKILLS.length / 2);
  const tracks = [SKILLS.slice(0, midpoint), SKILLS.slice(midpoint)];
  const topSkills = SKILLS.filter((skill) => skill.isTopSkill);
  const secondarySkills = SKILLS.filter((skill) => !skill.isTopSkill);

  const skillName = (skill: (typeof SKILLS)[number]) => {
    if (skill.id === 'statistiques') return t('names.statistiques');
    if (skill.id === 'bases-de-donnees') return t('names.bases-de-donnees');
    if (skill.id === 'systemes-d-information') return t('names.systemes-d-information');
    return skill.name;
  };

  const renderSkill = (skill: (typeof SKILLS)[number]) => {
    const name = skillName(skill);
    const content = (
      <>
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-coral-300" aria-hidden="true" />
        <span className="text-sm font-semibold">{name}</span>
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/55" aria-hidden="true" />
      </>
    );

    const className = cn(
      'group inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-white',
      'whitespace-nowrap transition-colors duration-200 hover:border-coral-300/80 hover:bg-white/[0.13]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink'
    );

    return (
      <button
        key={skill.id}
        type="button"
        onClick={() => router.push({ pathname: '/projects', query: { skill: skill.id } })}
        aria-label={t('filterAria', { skill: name })}
        className={className}
      >
        {content}
      </button>
    );
  };

  return (
    <section
      className="skills-ticker overflow-hidden border-y border-ink bg-ink py-8 sm:py-9"
      aria-label={t('sectionLabel')}
    >
      <div data-skills-header="true" className="mx-auto mb-5 flex max-w-6xl flex-col justify-between gap-3 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-coral-100"
            aria-hidden="true"
          >
            <Layers className="h-4 w-4 text-coral-800" />
          </div>
          <div>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              {t('heading')}
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-slate-200">
              {t('instruction')}
            </p>
          </div>
        </div>
        <Link
          href="/projects"
          className="inline-flex min-h-10 shrink-0 items-center gap-1.5 self-start rounded-sm text-sm font-semibold text-accent-200 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:self-auto"
        >
          <span>{common('cta.viewAllProjects')}</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="mx-auto hidden max-w-6xl gap-1.5 px-4 sm:gap-2 sm:px-6 md:grid lg:px-8">
        {tracks.map((skills, index) => (
          <div
            key={index}
            className={cn('skills-ticker__row', index === 0 ? 'skills-ticker__row--first' : 'skills-ticker__row--second')}
          >
            {skills.map((skill) => renderSkill(skill))}
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:hidden lg:px-8">
        <div className="skills-ticker__row skills-ticker__row--first">
          {topSkills.map((skill) => renderSkill(skill))}
        </div>
        {secondarySkills.length > 0 && (
          <details className="group mt-2 rounded-xl border border-white/10 px-2">
            <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-2 text-xs font-semibold text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-300 [&::-webkit-details-marker]:hidden">
              <span>{t('moreSkills', { count: secondarySkills.length })}</span>
              <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="skills-ticker__row skills-ticker__row--second pb-2">
              {secondarySkills.map((skill) => renderSkill(skill))}
            </div>
          </details>
        )}
      </div>
    </section>
  );
};
