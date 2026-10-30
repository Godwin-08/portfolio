import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Fragment, type CSSProperties, type ReactNode } from 'react';
import type { Project } from '@/types';
import { getCategorySlug } from '@/data/projects';
import { getProjectDetailCopy, type OlistAnalysisSections, type ProjectDetailCopy } from '@/data/project-details';
import { getProjectPageConfig, type ProjectPageSection } from '@/data/project-page-config';
import { Badge } from '@/components/ui/Badge';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { OlistCaseStudy } from '@/components/projects/OlistCaseStudy';
import { AfcCaseStudy } from '@/components/projects/AfcCaseStudy';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Lightbulb,
  ListChecks,
  Linkedin,
  Star,
  Users,
} from 'lucide-react';

interface ProjectDetailPageProps {
  project: Project;
  previousProject?: Project;
  nextProject?: Project;
}

export async function ProjectDetailPage({
  project,
  previousProject,
  nextProject,
}: ProjectDetailPageProps) {
  const [locale, t, projectCopy, categoryLabels] = await Promise.all([
    getLocale(),
    getTranslations('caseStudies.ui'),
    getTranslations('projects.cards'),
    getTranslations('projects.categories'),
  ]);
  const copy = getProjectDetailCopy(project.slug, locale === 'en' ? 'en' : 'fr');
  if (!copy) throw new Error(`Missing project detail content for ${project.slug}`);

  const pageConfig = getProjectPageConfig(project.slug);

  const title = projectCopy(`${project.id}.title`);
  const projectPeople = [...(copy.collaborators ?? []), ...(copy.supervisors ?? [])];
  const pageStyle: CSSProperties & {
    '--project-accent': string;
    '--project-accent-text': string;
    '--project-accent-dark': string;
  } = {
    '--project-accent': pageConfig.accent,
    '--project-accent-text': pageConfig.accentText,
    '--project-accent-dark': pageConfig.accentDark,
  };
  const galleryLabels = {
    title: t('galleryTitle'),
    open: t('galleryOpen'),
    close: t('galleryClose'),
    previous: t('galleryPrevious'),
    next: t('galleryNext'),
    imagePosition: t('galleryPosition'),
    zoomControls: t('galleryZoomControls'),
    zoomIn: t('galleryZoomIn'),
    zoomOut: t('galleryZoomOut'),
    zoomReset: t('galleryZoomReset'),
  };
  const peopleSections = (copy.collaborators?.length || copy.supervisors?.length) ? (
    <div className="grid gap-5 md:grid-cols-2">
      {copy.collaborators && copy.collaborators.length > 0 && (
        <PeopleRoster
          people={copy.collaborators}
          title={locale === 'en' ? 'Team members' : 'Collaborateurs du projet'}
          description={locale === 'en' ? 'People who worked on the project.' : 'Personnes ayant travaillé sur ce projet.'}
          kind="collaborators"
        />
      )}
      {copy.supervisors && copy.supervisors.length > 0 && (
        <PeopleRoster
          people={copy.supervisors}
          title={locale === 'en' ? 'Project supervisors' : 'Encadrement du projet'}
          description={locale === 'en' ? 'People who guided the project.' : 'Personnes ayant accompagné le projet.'}
          kind="supervisors"
        />
      )}
    </div>
  ) : null;

  const projectSections: Record<ProjectPageSection, ReactNode> = {
    data: copy.dataConstruction && copy.dataTitle ? (
      <section className="space-y-5" data-project-data>
        <SectionHeading icon={<BookOpenCheck className="h-5 w-5" />} title={copy.dataTitle} />
        <p className="max-w-4xl text-base leading-relaxed text-slate-700 dark:text-slate-300">{copy.dataConstruction}</p>
      </section>
    ) : null,
    documents: copy.documents && copy.documents.length > 0 ? (
      <section className="space-y-4" aria-labelledby="project-documents-title">
        <h2 id="project-documents-title" className="font-heading text-xl font-bold text-slate-900 dark:text-white">
          {t('documentsTitle')}
        </h2>
        <ul className="flex flex-wrap gap-3">
          {copy.documents.map((document) => (
            <li key={document.href}>
              <a
                href={document.href}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail__resource motion-control inline-flex min-h-11 items-center gap-2 rounded-btn border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                data-project-document
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                {document.label}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    ) : null,
    gallery: copy.gallery.length > 0 ? (
      <ProjectGallery images={copy.gallery} labels={galleryLabels} />
    ) : null,
    method: (
      <section className="space-y-5">
        <SectionHeading icon={<ListChecks className="h-5 w-5" />} title={copy.methodTitle ?? t('methodTitle')} />
        <p className="max-w-4xl text-base leading-relaxed text-slate-700 dark:text-slate-300">{copy.methodIntro}</p>
        <ol className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {copy.methodSteps.map((step, index) => (
            <li key={step.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-700 dark:bg-slate-800">
              <span data-project-accent className="font-mono text-xs font-bold">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-heading text-lg font-bold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>
    ),
    architecture: copy.architecture ? (
      <section className="space-y-5" data-project-architecture>
        <SectionHeading icon={<BookOpenCheck className="h-5 w-5" />} title={copy.architecture.title} />
        <p className="max-w-4xl text-base leading-relaxed text-slate-700 dark:text-slate-300">{copy.architecture.introduction}</p>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {copy.architecture.layers.map((layer) => (
            <li key={layer.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-700 dark:bg-slate-800">
              <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">{layer.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{layer.description}</p>
            </li>
          ))}
        </ul>
      </section>
    ) : null,
    decisions: copy.keyDecisions ? (
      <section className="space-y-5" data-project-decisions>
        <SectionHeading icon={<ListChecks className="h-5 w-5" />} title={copy.keyDecisions.title} />
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {copy.keyDecisions.items.map((decision) => (
            <li key={decision.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
              <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">{decision.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{decision.description}</p>
            </li>
          ))}
        </ul>
      </section>
    ) : null,
    results: (
      <section className="space-y-5" data-project-results>
        <SectionHeading icon={<Lightbulb className="h-5 w-5" />} title={t('resultsTitle')} />
        {copy.resultsIntro && (
          <p className="max-w-4xl text-base leading-relaxed text-slate-700 dark:text-slate-300">
            {copy.resultsIntro}
          </p>
        )}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {copy.results.map((result) => (
            <li key={`${result.value}-${result.label}`} className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-700 dark:bg-slate-800">
              <span data-project-accent className="block break-words font-heading text-xl font-extrabold leading-tight sm:text-2xl">
                {result.value}
              </span>
              <span className="mt-2 block text-sm font-bold text-slate-800 dark:text-slate-200">{result.label}</span>
              <span className="mt-1 block text-sm leading-relaxed text-slate-600 dark:text-slate-300">{result.detail}</span>
            </li>
          ))}
        </ul>
      </section>
    ),
    limitations: (
      <section className="space-y-5" data-project-limitations>
        <SectionHeading icon={<AlertTriangle className="h-5 w-5" />} title={t('limitationsTitle')} />
        <ul className="space-y-3 rounded-xl border border-amber-200 bg-amber-50/70 p-5 text-sm leading-relaxed text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
          {copy.limitations.map((limitation) => (
            <li key={limitation} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-700" aria-hidden="true" />
              <span>{limitation}</span>
            </li>
          ))}
        </ul>
      </section>
    ),
  };

  return (
    <article
      className="project-detail mx-auto max-w-6xl space-y-12 pb-20"
      data-project-page={project.slug}
      style={pageStyle}
    >
      <Link
        href="/projects"
        className="project-detail__back motion-control inline-flex items-center gap-2 rounded text-sm font-semibold text-slate-600 focus-visible:outline-none focus-visible:ring-2 dark:text-slate-300"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t('back')}
      </Link>

      <header className="grid min-w-0 grid-cols-1 items-start gap-8 border-b border-slate-200 pb-10 dark:border-slate-800 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 space-y-5 lg:col-span-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary" size="md">
              {categoryLabels(getCategorySlug(project.category))}
            </Badge>
            <Badge variant="neutral" size="md">
              {projectCopy(`${project.id}.context`)}
            </Badge>
            <Badge variant="outline" size="md">{project.period}</Badge>
            {project.isFlagship && (
              <Badge variant="accent" size="md" className="gap-1">
                <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                {t('flagship')}
              </Badge>
            )}
          </div>

          <div className="space-y-4">
            <h1 className="project-detail__title break-words font-heading text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              {title}
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              {copy.context}
            </p>
          </div>

          <a
            href={copy.repository}
            target="_blank"
            rel="noreferrer"
            className="project-detail__source motion-control inline-flex min-h-11 items-center gap-2 rounded-btn border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            {t('source')}
          </a>
        </div>

        <aside className="project-detail__question min-w-0 rounded-2xl border p-5 sm:p-6 lg:col-span-4">
        <div className="flex items-center gap-2">
            <BookOpenCheck className="h-5 w-5" aria-hidden="true" data-project-accent />
            <h2 className="font-heading text-lg font-bold">{t('questionTitle')}</h2>
          </div>
          <p className="mt-3 text-base leading-relaxed text-slate-800 dark:text-slate-100">{copy.question}</p>
          {copy.featuredFinding && (
            <p
              data-featured-finding
              className="mt-4 border-t pt-4 text-sm font-semibold leading-relaxed"
            >
              {copy.featuredFinding}
            </p>
          )}
        </aside>
      </header>

      <section className="space-y-5" data-project-contribution>
        <SectionHeading icon={<Star className="h-5 w-5" />} title={t('contributionTitle')} />
        <p className="project-detail__contribution rounded-xl border bg-slate-50 p-5 text-base leading-relaxed text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {renderLinkedPeople(copy.contribution, projectPeople)}
        </p>
        {peopleSections}
      </section>

      {pageConfig.layout.kind === 'afc' ? (
        <AfcCaseStudy
          copy={copy}
          locale={locale === 'en' ? 'en' : 'fr'}
          galleryLabels={galleryLabels}
        />
      ) : pageConfig.layout.kind === 'olist' ? (
        <OlistCaseStudy
          copy={getOlistCaseStudyCopy(copy)}
          locale={locale === 'en' ? 'en' : 'fr'}
          galleryLabels={galleryLabels}
          documentsTitle={t('documentsTitle')}
          limitationsTitle={t('limitationsTitle')}
        />
      ) : (
        pageConfig.layout.order.map((section) => (
          <Fragment key={section}>{projectSections[section]}</Fragment>
        ))
      )}

      <section className="space-y-4 border-t border-slate-200 pt-8 dark:border-slate-800" data-project-technologies>
        <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">{t('technologiesTitle')}</h2>
        <ul className="flex flex-wrap gap-2">
          {copy.technologies.map((technology) => (
            <li key={technology} className="rounded-full border border-slate-300 bg-white px-3 py-1.5 font-mono text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {technology}
            </li>
          ))}
        </ul>
      </section>

      {copy.conclusion && (
        <section
          className="space-y-3 rounded-xl border border-sky-200 bg-sky-50/70 p-5 dark:border-sky-900 dark:bg-sky-950/30 sm:p-6"
          data-project-conclusion
        >
          <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">{copy.conclusion.title}</h2>
          <p className="max-w-4xl text-base leading-relaxed text-slate-700 dark:text-slate-300">
            {copy.conclusion.description}
          </p>
        </section>
      )}

      <nav
        className="project-detail__nav flex items-start justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800"
        aria-label={t('projectNavigation')}
      >
        {previousProject ? (
          <Link
            href={{ pathname: '/projects/[slug]', params: { slug: previousProject.slug } }}
            className="group min-w-0 rounded text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
          >
            <span className="block text-xs text-slate-600 dark:text-slate-400">{t('previousProject')}</span>
            <span className="mt-1 block break-words text-sm font-bold text-slate-800 group-hover:text-primary-700 dark:text-slate-200 dark:group-hover:text-primary-300">
              <ArrowLeft className="mr-1 inline h-4 w-4" aria-hidden="true" />
              {projectCopy(`${previousProject.id}.title`)}
            </span>
          </Link>
        ) : <span />}
        {nextProject && (
          <Link
            href={{ pathname: '/projects/[slug]', params: { slug: nextProject.slug } }}
            className="group min-w-0 rounded text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
          >
            <span className="block text-xs text-slate-600 dark:text-slate-400">{t('nextProject')}</span>
            <span className="mt-1 block break-words text-sm font-bold text-slate-800 group-hover:text-primary-700 dark:text-slate-200 dark:group-hover:text-primary-300">
              {projectCopy(`${nextProject.id}.title`)}
              <ArrowRight className="ml-1 inline h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}

function getOlistCaseStudyCopy(
  copy: ProjectDetailCopy,
): ProjectDetailCopy & { olistAnalysis: OlistAnalysisSections } {
  if (!copy.olistAnalysis) {
    throw new Error('Missing Olist analysis content');
  }

  return { ...copy, olistAnalysis: copy.olistAnalysis };
}

function SectionHeading({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <h2 className="flex items-center gap-2 font-heading text-2xl font-bold text-slate-900 dark:text-white">
      <span data-project-accent aria-hidden="true">{icon}</span>
      {title}
    </h2>
  );
}

function renderLinkedPeople(
  text: string,
  people: readonly { name: string; linkedinUrl?: string }[],
): ReactNode {
  const linkedPeople = [...people]
    .filter((person): person is { name: string; linkedinUrl: string } => Boolean(person.linkedinUrl))
    .sort((a, b) => b.name.length - a.name.length);

  if (linkedPeople.length === 0) return text;

  const escapedNames = linkedPeople.map(({ name }) => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const namePattern = new RegExp(`(${escapedNames.join('|')})`, 'g');

  return text.split(namePattern).map((part, index) => {
    const person = linkedPeople.find(({ name }) => name === part);
    if (!person) return part;

    return (
      <a
        key={`${person.name}-${index}`}
        href={person.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-primary-800 underline decoration-primary-300 underline-offset-2 hover:text-primary-950 hover:decoration-primary-700 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 dark:text-primary-300 dark:hover:text-primary-200"
      >
        {part}
      </a>
    );
  });
}

function PeopleRoster({
  people,
  title,
  description,
  kind,
}: {
  people: readonly { name: string; role: string; linkedinUrl?: string }[];
  title: string;
  description: string;
  kind: 'collaborators' | 'supervisors';
}) {
  const Icon = kind === 'collaborators' ? Users : GraduationCap;

  return (
    <section className="project-detail__people collaboration-panel space-y-5 rounded-2xl border p-5 shadow-sm sm:p-6" aria-labelledby={`project-${kind}-title`}>
      <div className="flex items-center gap-3">
        <span data-project-people-icon className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-sm" aria-hidden="true">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h2 id={`project-${kind}-title`} className="font-heading text-xl font-extrabold text-slate-900 dark:text-white">
            {title}
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{description}</p>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-3">
        {people.map((person) => {
          const initials = person.name
            .split(/\s+/)
            .map((part) => part[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
          const card = (
            <>
              <span data-project-person-avatar className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-heading text-sm font-extrabold ring-2 ring-white dark:ring-slate-800">
                {initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading font-bold text-slate-900 dark:text-white">{person.name}</span>
                <span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">{person.role}</span>
              </span>
              {person.linkedinUrl && <Linkedin className="h-4 w-4 shrink-0 text-primary-700" aria-hidden="true" />}
            </>
          );

          return (
            <li key={person.name}>
              {person.linkedinUrl ? (
                <a
                  href={person.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-detail__person motion-control flex min-h-[76px] items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-xs hover:shadow-md focus-visible:outline-none focus-visible:ring-2 dark:border-slate-700 dark:bg-slate-800"
                >
                  {card}
                </a>
              ) : (
                <div className="flex min-h-[76px] items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-xs dark:border-slate-700 dark:bg-slate-800">
                  {card}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
