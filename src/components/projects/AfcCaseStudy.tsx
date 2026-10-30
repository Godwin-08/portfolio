import type { ReactNode } from 'react';
import type { ProjectDetailCopy, ProjectDetailImage } from '@/data/project-details';
import { ProjectGallery, type ProjectGalleryLabels } from '@/components/projects/ProjectGallery';
import { AlertTriangle, BookOpenCheck, FileText, Lightbulb, ListChecks } from 'lucide-react';

interface AfcCaseStudyProps {
  copy: ProjectDetailCopy;
  locale: 'fr' | 'en';
  galleryLabels: ProjectGalleryLabels;
}

export function AfcCaseStudy({ copy, locale, galleryLabels }: AfcCaseStudyProps) {
  const text = locale === 'en'
    ? {
        dataTitle: 'Data and count table',
        methodTitle: 'Method and steps',
        resultsTitle: 'Analysis results',
        screeTitle: 'Reading the axis chart',
        biplotTitle: 'Reading the map',
        representationTitle: 'How well the points appear',
        limitationsTitle: 'Limits of the analysis',
        documentsTitle: 'Project file',
        question: 'Question',
        reading: 'How to read it',
        observation: 'What we see',
        interpretation: 'What it means',
        businessInterest: 'Why it is useful',
        limitation: 'Limit',
      }
    : {
        dataTitle: 'Données et tableau de contingence',
        methodTitle: 'Méthode et étapes',
        resultsTitle: 'Résultats statistiques',
        screeTitle: 'Lire le scree plot',
        biplotTitle: 'Lire la carte factorielle',
        representationTitle: 'Vérifier la qualité de représentation',
        limitationsTitle: 'Limites de l’analyse',
        documentsTitle: 'Document du projet',
        question: 'Question étudiée',
        reading: 'Comment lire la figure',
        observation: 'Ce que l’on observe',
        interpretation: 'Interprétation',
        businessInterest: 'À quoi ça sert',
        limitation: 'Limite',
      };

  const scree = copy.gallery.find((image) => image.src.endsWith('afc-screeplot.png'));
  const biplot = copy.gallery.find((image) => image.src.includes('afc-biplot'));
  const representation = copy.gallery.find((image) => image.src.includes('afc-qualite-representation'));
  return (
    <div className="space-y-12">
      <section className="space-y-5" aria-labelledby="afc-data-title" data-afc-section="data">
        <SectionHeading icon={<BookOpenCheck className="h-5 w-5" />} title={text.dataTitle} id="afc-data-title" />
        <p className="max-w-4xl text-base leading-relaxed text-slate-700 dark:text-slate-300">{copy.dataConstruction}</p>
      </section>

      <section className="space-y-5" aria-labelledby="afc-method-title" data-afc-section="method">
        <SectionHeading icon={<ListChecks className="h-5 w-5" />} title={text.methodTitle} id="afc-method-title" />
        <p className="max-w-4xl text-base leading-relaxed text-slate-700 dark:text-slate-300">{copy.methodIntro}</p>
        <ol className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {copy.methodSteps.map((step, index) => (
            <li key={step.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-700 dark:bg-slate-800">
              <span data-project-accent className="font-mono text-xs font-bold">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 font-heading text-lg font-bold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-5" aria-labelledby="afc-results-title" data-afc-section="results">
        <SectionHeading icon={<Lightbulb className="h-5 w-5" />} title={text.resultsTitle} id="afc-results-title" />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {copy.results.map((result) => (
            <li key={`${result.value}-${result.label}`} className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-700 dark:bg-slate-800">
              <span data-project-accent className="block break-words font-heading text-xl font-extrabold leading-tight sm:text-2xl">{result.value}</span>
              <span className="mt-2 block text-sm font-bold text-slate-800 dark:text-slate-200">{result.label}</span>
              <span className="mt-1 block text-sm leading-relaxed text-slate-600 dark:text-slate-300">{result.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      {scree?.analysis && (
        <FigureAnalysisSection
          image={scree}
          title={text.screeTitle}
          labels={text}
          galleryLabels={galleryLabels}
          id="afc-scree"
        />
      )}
      {biplot?.analysis && (
        <FigureAnalysisSection
          image={biplot}
          title={text.biplotTitle}
          labels={text}
          galleryLabels={galleryLabels}
          id="afc-biplot"
        />
      )}
      {representation?.analysis && (
        <FigureAnalysisSection
          image={representation}
          title={text.representationTitle}
          labels={text}
          galleryLabels={galleryLabels}
          id="afc-cos2"
        />
      )}

      <section className="space-y-5" aria-labelledby="afc-limits-title" data-afc-section="limits">
        <SectionHeading icon={<AlertTriangle className="h-5 w-5" />} title={text.limitationsTitle} id="afc-limits-title" />
        <ul className="space-y-3 rounded-xl border border-amber-200 bg-amber-50/70 p-5 text-sm leading-relaxed text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
          {copy.limitations.map((limitation) => (
            <li key={limitation} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-700" aria-hidden="true" />
              <span>{limitation}</span>
            </li>
          ))}
        </ul>
      </section>

      {copy.documents && copy.documents.length > 0 && (
        <section className="space-y-4" aria-labelledby="afc-documents-title">
          <SectionHeading icon={<FileText className="h-5 w-5" />} title={text.documentsTitle} id="afc-documents-title" />
          <ul className="flex flex-wrap gap-3">
            {copy.documents.map((document) => (
              <li key={document.href}>
                <a href={document.href} target="_blank" rel="noopener noreferrer" data-project-document className="motion-control inline-flex min-h-11 items-center gap-2 rounded-btn border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:border-primary-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  {document.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

type FigureAnalysisLabels = {
  question: string;
  reading: string;
  observation: string;
  interpretation: string;
  businessInterest: string;
  limitation: string;
};

function FigureAnalysisSection({
  image,
  title,
  labels,
  galleryLabels,
  id,
}: {
  image: ProjectDetailImage;
  title: string;
  labels: FigureAnalysisLabels;
  galleryLabels: ProjectGalleryLabels;
  id: string;
}) {
  if (!image.analysis) return null;

  const details = [
    [labels.question, image.analysis.question],
    [labels.reading, image.analysis.reading],
    [labels.observation, image.analysis.observation],
    [labels.interpretation, image.analysis.interpretation],
    [labels.businessInterest, image.analysis.businessInterest],
    [labels.limitation, image.analysis.limitation],
  ] as const;

  return (
    <section className="space-y-5" aria-labelledby={`${id}-title`} data-afc-section={id}>
      <SectionHeading icon={<Lightbulb className="h-5 w-5" />} title={title} id={`${id}-title`} />
      <ProjectGallery images={[image]} labels={galleryLabels} showTitle={false} headingId={`${id}-gallery-title`} />
      <dl className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {details.map(([label, value]) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-700 dark:bg-slate-800">
            <dt className="font-heading text-sm font-bold text-slate-900 dark:text-white">{label}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function SectionHeading({ icon, title, id }: { icon: ReactNode; title: string; id: string }) {
  return (
    <h2 id={id} className="flex items-center gap-2 font-heading text-2xl font-bold text-slate-900 dark:text-white">
      <span data-project-accent aria-hidden="true">{icon}</span>
      {title}
    </h2>
  );
}
