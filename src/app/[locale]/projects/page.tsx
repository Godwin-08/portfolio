import type { Metadata } from 'next';
import { FolderGit2, SearchX } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { buildLocalizedPageMetadata } from '@/lib/seo';

import {
  filterProjects,
  getAllProjects,
  getCategoryBySlug,
  PROJECT_CATEGORIES,
} from '@/data/projects';
import { getSkillById } from '@/data/skills';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectFilters } from '@/components/projects/ProjectFilters';

interface ProjectsPageProps {
  params: Promise<{ locale: 'fr' | 'en' }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return buildLocalizedPageMetadata({
    locale,
    href: '/projects',
    title: t('projects.title'),
    description: t('projects.description'),
    siteName: t('siteName'),
    image: '/images/godwin-portrait.jpg',
  });
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const [query, t] = await Promise.all([
    searchParams,
    getTranslations('projects.list'),
  ]);
  const categorySlug = typeof query.category === 'string' ? query.category : null;
  const skillId = typeof query.skill === 'string' ? query.skill : null;
  const activeCategory = getCategoryBySlug(categorySlug);
  const activeSkill = getSkillById(skillId ?? '');
  const filteredProjects = filterProjects(getAllProjects(), categorySlug, skillId);

  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-10 md:py-16 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <FolderGit2
            className="h-5 w-5 text-primary-600"
            aria-hidden="true"
          />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('eyebrow')}
          </span>
        </div>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          {t('heading')}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {t('description')}
        </p>
      </header>

      <ProjectFilters
        categories={PROJECT_CATEGORIES}
        activeCategorySlug={activeCategory?.slug ?? null}
        activeSkillId={activeSkill?.id ?? null}
        totalResults={filteredProjects.length}
      />

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
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
              {t('emptyTitle')}
            </h2>
            <p className="text-sm text-slate-500">
              {t('emptyDescription')}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
