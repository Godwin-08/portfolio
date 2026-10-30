import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildLocalizedPageMetadata } from '@/lib/seo';
import { getAllProjects, getProjectBySlug } from '@/data/projects';
import { ProjectDetailPage } from '@/components/projects/ProjectDetailPage';

interface CaseStudyPageProps {
  params: Promise<{
    locale: 'fr' | 'en';
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return ['fr', 'en'].flatMap((locale) =>
    projects.map((project) => ({locale, slug: project.slug}))
  );
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return {
      title: 'Projet non trouvé',
    };
  }

  const t = await getTranslations({ locale, namespace: 'projects.cards' });
  const seo = await getTranslations({ locale, namespace: 'seo' });
  const title = t(`${project.id}.title`);
  const description = t(`${project.id}.summary`);

  return buildLocalizedPageMetadata({
    locale,
    href: { pathname: '/projects/[slug]', params: { slug: project.slug } },
    title: locale === 'fr' ? `${title} — Étude de cas` : `${title} — Case study`,
    description,
    siteName: seo('siteName'),
    image: project.image,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const previousProject = currentIndex > 0 ? allProjects[currentIndex - 1] : undefined;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <ProjectDetailPage
        project={project}
        previousProject={previousProject}
        nextProject={nextProject}
      />
    </div>
  );
}
