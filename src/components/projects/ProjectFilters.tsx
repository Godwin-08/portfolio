'use client';

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';

import { SKILLS } from '@/data/skills';
import { ProjectCategoryDefinition } from '@/data/projects';
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

  const [isPending, startTransition] = useTransition();
  const [showAllSkills, setShowAllSkills] = useState(false);

  const isFiltered =
    activeCategorySlug !== null || activeSkillId !== null;

  const topSkills = SKILLS.filter((skill) => skill.isTopSkill);
  const secondarySkills = SKILLS.filter((skill) => !skill.isTopSkill);
  const visibleSkills = showAllSkills ? SKILLS : topSkills;

  const updateParam = (
    key: 'category' | 'skill',
    value: string | null
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const query = Object.fromEntries(params.entries());

    startTransition(() => {
      router.push({ pathname: '/projects', query }, { scroll: false });
    });
  };

  const handleCategoryChange = (categorySlug: string) => {
    const nextValue =
      activeCategorySlug === categorySlug ? null : categorySlug;

    updateParam('category', nextValue);
  };

  const handleSkillChange = (skillId: string) => {
    const nextValue =
      activeSkillId === skillId ? null : skillId;

    updateParam('skill', nextValue);
  };

  const handleReset = () => {
    startTransition(() => {
      router.push('/projects', { scroll: false });
    });
  };

  return (
    <section
      className="space-y-5 rounded-card border border-slate-200/90 bg-white p-5 shadow-card sm:p-6"
      aria-label={t('label')}
    >
      {/* Catégories */}
      <div className="space-y-2.5">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {t('categoriesHeading')}
        </p>

        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label={t('categoryGroup')}
        >
          <button
            type="button"
            onClick={() => updateParam('category', null)}
            aria-pressed={activeCategorySlug === null}
            className={cn(
              'rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
              activeCategorySlug === null
                ? 'bg-slate-900 font-semibold text-white shadow-xs'
                : 'border border-slate-200/70 bg-white text-slate-600 hover:bg-slate-50'
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
                  'rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                  isActive
                    ? 'bg-slate-900 font-semibold text-white shadow-xs'
                    : 'border border-slate-200/70 bg-white text-slate-600 hover:bg-slate-50'
                )}
              >
                {categoryLabels(category.slug)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Compétences */}
      <div className="space-y-2.5 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between gap-3">
          <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Filter
              className="h-3.5 w-3.5"
              aria-hidden="true"
            />
            {t('skillsHeading')}
          </p>

          {isFiltered && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 rounded-sm text-xs font-semibold text-primary-700 transition-colors hover:text-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <X
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
              {t('reset')}
            </button>
          )}
        </div>

        <div
          className="flex flex-wrap gap-1.5"
          role="group"
          aria-label={t('skillGroup')}
        >
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
                  'rounded-md border px-2.5 py-1 text-xs font-mono transition-colors',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                  isActive
                    ? 'border-primary-700 bg-primary-600 font-semibold text-white ring-1 ring-primary-700'
                    : 'border-slate-200/60 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
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
              className="inline-flex items-center gap-1 rounded-md border border-slate-200/40 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              {showAllSkills ? (
                <>
                  <ChevronUp
                    className="h-3 w-3"
                    aria-hidden="true"
                  />
                  <span>{t('showLess')}</span>
                </>
              ) : (
                <>
                  <ChevronDown
                    className="h-3 w-3"
                    aria-hidden="true"
                  />
                  <span>{t('showMore', { count: secondarySkills.length })}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Résultats */}
      <div
        className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400"
        aria-live="polite"
      >
        <span>
          <strong className="text-slate-700">
            {t('resultCount', { count: totalResults })}
          </strong>
        </span>

        {isPending && (
          <span className="font-medium text-primary-600">
            {t('updating')}
          </span>
        )}
      </div>
    </section>
  );
}
