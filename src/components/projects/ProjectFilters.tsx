'use client';

import React, { useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ProjectCategory } from '@/types';
import { SKILLS } from '@/data/skills';
import { Filter, X, Check, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectFiltersProps {
  categories: ProjectCategory[];
  activeCategory: ProjectCategory;
  activeSkill: string | null;
  searchQuery: string;
  totalResults: number;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  categories,
  activeCategory,
  activeSkill,
  searchQuery,
  totalResults,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleCategoryChange = (category: ProjectCategory) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'Tous') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handleSkillChange = (skillName: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!skillName || activeSkill === skillName) {
      params.delete('skill');
    } else {
      params.set('skill', skillName);
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (!term) {
      params.delete('q');
    } else {
      params.set('q', term);
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handleReset = () => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const isFiltered = activeCategory !== 'Tous' || activeSkill !== null || searchQuery !== '';

  return (
    <div className="p-5 sm:p-6 rounded-card bg-white border border-slate-200/90 shadow-card space-y-6">
      
      {/* Top filter row: Category pills + Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Category tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={cn(
                  'px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150',
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs font-semibold'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/70'
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative min-w-[220px] sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher (ex: Pandas, SQL)..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>

      </div>

      {/* Secondary filter: Skill tags */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            <span>Filtrer par compétence</span>
          </span>
          {isFiltered && (
            <button
              onClick={handleReset}
              className="text-xs text-primary-700 hover:text-primary-800 font-semibold flex items-center gap-1 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Réinitialiser les filtres</span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {SKILLS.map((skill) => {
            const isSelected = activeSkill === skill.name;
            return (
              <button
                key={skill.id}
                onClick={() => handleSkillChange(skill.name)}
                className={cn(
                  'px-2.5 py-1 rounded-md text-xs font-mono transition-all',
                  isSelected
                    ? 'bg-primary-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                )}
              >
                {skill.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results status indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <span>
          Affichage de <strong className="text-slate-900">{totalResults}</strong> projet{totalResults > 1 ? 's' : ''}
          {activeCategory !== 'Tous' && ` dans « ${activeCategory} »`}
          {activeSkill && ` utilisant « ${activeSkill} »`}
        </span>
        {isPending && <span className="text-primary-600 font-medium">Mise à jour...</span>}
      </div>

    </div>
  );
};

