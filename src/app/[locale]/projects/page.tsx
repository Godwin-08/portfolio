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
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 md:space-y-9 md:py-14 lg:px-8">
      <header className="space-y-2.5">
        <div className="flex items-center gap-2">
          <FolderGit2
            className="h-5 w-5 text-primary-600"
            aria-hidden="true"
          />
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-800 sm:text-xs">
            {t('eyebrow')}
          </span>
        </div>
        <h1 className="font-heading text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-tight tracking-tight text-ink">
          {t('heading')}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-body sm:text-base">
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
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-7">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="space-y-4 rounded-2xl border border-slate-200 border-l-4 border-l-coral-500 bg-white p-7 text-center sm:p-10">
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
