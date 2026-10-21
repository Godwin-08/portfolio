import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllProjects, getProjectBySlug } from '@/data/projects';
import { CaseStudySection } from '@/components/projects/CaseStudySection';
import { GtmCaseStudy } from '@/components/projects/GtmCaseStudy';
import { OlistCaseStudy } from '@/components/projects/OlistCaseStudy';
import { AfcCaseStudy } from '@/components/projects/AfcCaseStudy';

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return {
      title: 'Projet non trouvé',
    };
  }

  return {
    title: `${project.title} — Étude de Cas | Godwin Elie Nougbolo`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Étude de Cas`,
      description: project.summary,
    },
  };
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

  if (project.slug === 'gtm') {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <GtmCaseStudy />
      </div>
    );
  }

  if (project.slug === 'olist') {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <OlistCaseStudy />
      </div>
    );
  }

  if (project.slug === 'afc') {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <AfcCaseStudy />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <CaseStudySection
        project={project}
        previousProject={previousProject}
        nextProject={nextProject}
      />
    </div>
  );
}
