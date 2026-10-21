'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { FolderGit2, SearchX } from 'lucide-react';

import {
  PROJECT_CATEGORIES,
  getAllProjects,
  getCategoryBySlug,
} from '@/data/projects';
import { getSkillById } from '@/data/skills';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectFilters } from '@/components/projects/ProjectFilters';

function ProjectsContent() {
  const searchParams = useSearchParams();

  const allProjects = useMemo(() => getAllProjects(), []);

  const activeCategory = getCategoryBySlug(
    searchParams.get('category')
  );

  const activeSkill = getSkillById(
    searchParams.get('skill') ?? ''
  );

  const filteredProjects = useMemo(() => {
    return allProjects
      .filter((project) => {
        // Filtre catégorie
        if (
          activeCategory &&
          project.category !== activeCategory.name
        ) {
          return false;
        }

        // Filtre compétence
        if (
          activeSkill &&
          !project.skills.some(
            (skill) =>
              skill.toLowerCase() === activeSkill.name.toLowerCase()
          )
        ) {
          return false;
        }

        // Les deux filtres sont cumulatifs :
        // catégorie ET compétence doivent correspondre.
        return true;
      })
      .sort((a, b) => a.order - b.order);
  }, [allProjects, activeCategory, activeSkill]);

  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-10 md:py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <FolderGit2
            className="h-5 w-5 text-primary-600"
            aria-hidden="true"
          />

          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Projets & réalisations
          </span>
        </div>

        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          Projets techniques
        </h1>

        <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Des projets réels couvrant l&apos;analyse de données,
          l&apos;ingénierie logicielle et les statistiques appliquées.
        </p>
      </header>

      {/* Filters */}
      <ProjectFilters
        categories={PROJECT_CATEGORIES}
        activeCategorySlug={activeCategory?.slug ?? null}
        activeSkillId={activeSkill?.id ?? null}
        totalResults={filteredProjects.length}
      />

      {/* Projects */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4 rounded-card border border-slate-200 bg-white p-10 text-center sm:p-12">
          <SearchX
            className="mx-auto h-8 w-8 text-slate-400"
            aria-hidden="true"
          />

          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-900">
              Aucun projet ne correspond
            </h2>

            <p className="text-sm text-slate-500">
              Modifiez les filtres ou réinitialisez la vue complète.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-6xl px-4 py-20 text-center text-slate-500">
          Chargement des projets…
        </main>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}