'use client';

import React, { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllProjects } from '@/data/projects';
import { ProjectCategory } from '@/types';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import { FolderGit2, AlertCircle } from 'lucide-react';

const CATEGORIES: ProjectCategory[] = [
  'Tous',
  'Data Analysis',
  'Web / SI',
  'Statistiques',
  'Machine Learning',
];

function ProjectsContent() {
  const searchParams = useSearchParams();
  const allProjects = useMemo(() => getAllProjects(), []);

  const activeCategory = (searchParams.get('category') as ProjectCategory) || 'Tous';
  const activeSkill = searchParams.get('skill');
  const searchQuery = searchParams.get('q') || '';

  // Filter logic
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      // Category filter
      if (activeCategory !== 'Tous' && project.category !== activeCategory) {
        return false;
      }

      // Skill filter
      if (activeSkill) {
        const skillMatch = project.skills.some(
          (s) => s.toLowerCase() === activeSkill.toLowerCase() || s.toLowerCase().includes(activeSkill.toLowerCase())
        );
        if (!skillMatch) return false;
      }

      // Text search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = project.title.toLowerCase().includes(query);
        const taglineMatch = project.tagline.toLowerCase().includes(query);
        const summaryMatch = project.summary.toLowerCase().includes(query);
        const skillMatch = project.skills.some((s) => s.toLowerCase().includes(query));
        if (!titleMatch && !taglineMatch && !summaryMatch && !skillMatch) {
          return false;
        }
      }

      return true;
    });
  }, [allProjects, activeCategory, activeSkill, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-5 h-5 text-primary-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Catalogue & Réalisations
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
          Projets & Réalisations Techniques
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          Chaque projet présenté illustre une compétence concrète, un problème réel résolu, des choix d&apos;architecture documentés et des métriques vérifiables.
        </p>
      </div>

      {/* Interactive Filters (URL-synced) */}
      <ProjectFilters
        categories={CATEGORIES}
        activeCategory={activeCategory}
        activeSkill={activeSkill}
        searchQuery={searchQuery}
        totalResults={filteredProjects.length}
      />

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pt-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-card bg-white border border-slate-200 space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              Aucun projet ne correspond à ces critères
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Essayez de réinitialiser vos filtres ou de modifier votre recherche.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-20 text-center text-slate-500">
          Chargement des projets...
        </div>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}

