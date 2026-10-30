'use client';

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';

import { SKILLS } from '@/data/skills';
import type { ProjectCategoryDefinition } from '@/data/projects';
import { cn } from '@/lib/utils';

interface ProjectFiltersProps {
  categories: readonly ProjectCategoryDefinition[];
  activeCategorySlug: string | null;
  activeSkillId: string | null;
  totalResults: number;
}

export function ProjectFilters({
  categories,
  activeCategorySlug,
  activeSkillId,
  totalResults,
}: ProjectFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('projects.filters');
  const categoryLabels = useTranslations('projects.categories');
  const skillLabels = useTranslations('skills.names');
  const skillDescriptions = useTranslations('skills.descriptions');

  const topSkills = SKILLS.filter((skill) => skill.isTopSkill);
  const secondarySkills = SKILLS.filter((skill) => !skill.isTopSkill);
  const [isPending, startTransition] = useTransition();
  const [showAllSkills, setShowAllSkills] = useState(() =>
    Boolean(activeSkillId && secondarySkills.some((skill) => skill.id === activeSkillId))
  );
  const visibleSkills = showAllSkills ? SKILLS : topSkills;
  const isFiltered = activeCategorySlug !== null || activeSkillId !== null;

  const updateParam = (key: 'category' | 'skill', value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set(key, value);
    else params.delete(key);

    const query = Object.fromEntries(params.entries());
    startTransition(() => {
      router.push({ pathname: '/projects', query }, { scroll: false });
    });
  };

  const handleCategoryChange = (categorySlug: string) => {
    updateParam('category', activeCategorySlug === categorySlug ? null : categorySlug);
  };

  const handleSkillChange = (skillId: string) => {
    updateParam('skill', activeSkillId === skillId ? null : skillId);
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('category');
    params.delete('skill');
    const query = Object.fromEntries(params.entries());

    startTransition(() => {
      router.push(
        Object.keys(query).length ? { pathname: '/projects', query } : '/projects',
        { scroll: false }
      );
    });
  };

  const renderSkillOptions = () => (
    <>
      {visibleSkills.map((skill) => {
        const isActive = activeSkillId === skill.id;
        return (
          <button
            key={skill.id}
            type="button"
            onClick={() => handleSkillChange(skill.id)}
            aria-pressed={isActive}
            title={skillDescriptions(skill.id)}
            className={cn(
              'motion-control min-h-9 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors active:scale-95',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
              isActive
                ? 'border-primary-700 bg-primary-700 font-semibold text-white'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950/40 hover:text-primary-900 dark:hover:text-primary-200'
            )}
          >
            {skillLabels(skill.id)}
          </button>
        );
      })}

      {secondarySkills.length > 0 && (
        <button
          type="button"
          onClick={() => setShowAllSkills((current) => !current)}
          aria-expanded={showAllSkills}
          className="motion-control inline-flex min-h-9 items-center gap-1 rounded-full border border-dashed border-slate-300 dark:border-slate-700 bg-paper px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors hover:border-primary-400 dark:hover:border-primary-500 hover:text-primary-800 dark:hover:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
        >
          {showAllSkills ? (
            <>
              <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t('showLess')}</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t('showMore', { count: secondarySkills.length })}</span>
            </>
          )}
        </button>
      )}
    </>
  );

  return (
    <section
      className="rounded-2xl border border-slate-200/90 dark:border-slate-800 border-l-4 border-l-primary-600 bg-white dark:bg-slate-900 p-4 shadow-card sm:p-5"
      aria-label={t('label')}
    >
      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600 dark:text-slate-400 sm:text-xs">
          {t('categoriesHeading')}
        </p>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t('categoryGroup')}>
          <button
            type="button"
            onClick={() => updateParam('category', null)}
            aria-pressed={activeCategorySlug === null}
            className={cn(
              'motion-control min-h-9 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors sm:text-sm active:scale-95',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
              activeCategorySlug === null
                ? 'bg-ink text-white dark:bg-primary-600 dark:text-white'
                : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary-300 dark:hover:border-primary-600 hover:text-primary-900 dark:hover:text-white'
            )}
          >
            {t('allCategories')}
          </button>

          {categories.map((category) => {
            const isActive = activeCategorySlug === category.slug;
            return (
              <button
                key={category.slug}
                type="button"
                onClick={() => handleCategoryChange(category.slug)}
                aria-pressed={isActive}
                className={cn(
                  'motion-control min-h-9 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors sm:text-sm active:scale-95',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
                  isActive
                    ? 'bg-ink text-white dark:bg-primary-600 dark:text-white'
                    : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary-300 dark:hover:border-primary-600 hover:text-primary-900 dark:hover:text-white'
                )}
              >
                {categoryLabels(category.slug)}
              </button>
            );
          })}
        </div>
      </div>

      <details
        className="group mt-3 border-t border-slate-100 dark:border-slate-800 pt-3 md:hidden"
      >
        <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3 rounded-lg text-sm font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary-700 dark:text-primary-400" aria-hidden="true" />
            {t('skillsHeading')}
          </span>
          <span className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
            {activeSkillId && skillLabels(activeSkillId)}
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
          </span>
        </summary>
        <div className="flex flex-wrap gap-1.5 pt-3" role="group" aria-label={t('skillGroup')}>
          {renderSkillOptions()}
        </div>
      </details>

      <div className="mt-3 hidden border-t border-slate-100 dark:border-slate-800 pt-4 md:block">
        <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          <Filter className="h-3.5 w-3.5" aria-hidden="true" />
          {t('skillsHeading')}
        </div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label={t('skillGroup')}>
          {renderSkillOptions()}
        </div>
      </div>

      <div className="mt-3 flex min-h-10 items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800 pt-3 text-xs sm:mt-4 sm:pt-4" aria-live="polite">
        <strong className="text-ink">{t('resultCount', { count: totalResults })}</strong>

        <div className="flex items-center gap-3">
          {isPending && <span className="font-medium text-primary-700 dark:text-primary-400">{t('updating')}</span>}
          {isFiltered && (
            <button
              type="button"
              onClick={handleReset}
              className="motion-control inline-flex min-h-9 items-center gap-1.5 rounded-full px-2.5 font-semibold text-primary-800 dark:text-primary-300 transition-colors hover:bg-primary-50 dark:hover:bg-primary-950/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              {t('reset')}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
