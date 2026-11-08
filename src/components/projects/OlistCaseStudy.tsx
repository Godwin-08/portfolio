import type { ReactNode } from 'react';
import type { OlistAnalysisSections, ProjectDetailCopy, ProjectDetailImage } from '@/data/project-details';
import { ProjectGallery, type ProjectGalleryLabels } from '@/components/projects/ProjectGallery';
import { Compass, Database, Download, FileText, ListChecks, Star, Truck, Wallet } from 'lucide-react';

type OlistCopy = ProjectDetailCopy & { olistAnalysis: OlistAnalysisSections };

interface OlistCaseStudyProps {
  copy: OlistCopy;
  locale: 'fr' | 'en';
  galleryLabels: ProjectGalleryLabels;
  documentsTitle: string;
  limitationsTitle: string;
}

export function OlistCaseStudy({
  copy,
  locale,
  galleryLabels,
  documentsTitle,
  limitationsTitle,
}: OlistCaseStudyProps) {
  const figures = copy.gallery;
  const labels = locale === 'en'
    ? {
        question: 'Question',
        reading: 'Reading Guide',
        observation: 'Key Observation',
        interpretation: 'Interpretation',
        businessInterest: 'Operational & Business Impact',
        limitation: 'Methodological Limitations',
        finalDataset: 'Final analysis table',
      }
    : {
        question: 'Question étudiée',
        reading: 'Clés de lecture',
        observation: 'Constat factuel',
        interpretation: 'Interprétation analytique',
        businessInterest: 'Impact décisionnel & Métier',
        limitation: 'Limites méthodologiques',
        finalDataset: 'Table d’analyse finale',
      };

  return (
    <div className="space-y-12" data-olist-case-study>
      <section className="space-y-5" aria-labelledby="olist-data-model-title">
        <SectionHeading
          id="olist-data-model-title"
          icon={<Database className="h-5 w-5" />}
          title={copy.olistAnalysis.dataModel.title}
        />
        <p className="max-w-4xl text-base leading-relaxed text-slate-700 dark:text-slate-300">
          {copy.olistAnalysis.dataModel.introduction}
        </p>
        <FigureAnalysis image={figures[0]} galleryId="olist-schema-gallery" labels={galleryLabels} analysisLabels={labels} />
      </section>

      <section className="space-y-5" aria-labelledby="olist-preparation-title">
        <SectionHeading
          id="olist-preparation-title"
          icon={<ListChecks className="h-5 w-5" />}
          title={copy.olistAnalysis.preparation.title}
        />
        <p className="max-w-4xl text-base leading-relaxed text-slate-700 dark:text-slate-300">
          {copy.olistAnalysis.preparation.introduction}
        </p>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {copy.olistAnalysis.preparation.steps.map((step, index) => (
            <li key={step.value} className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-700 dark:bg-slate-800">
              <span data-project-accent className="font-mono text-xs font-bold">
                {String(index + 1).padStart(2, '0')}
              </span>
              <strong className="mt-2 block break-words font-heading text-2xl font-extrabold text-slate-900 dark:text-white">
                {step.value}
              </strong>
              <span className="mt-1 block text-sm font-bold text-slate-800 dark:text-slate-200">{step.title}</span>
              <span className="mt-2 block text-sm leading-relaxed text-slate-600 dark:text-slate-300">{step.description}</span>
            </li>
          ))}
        </ol>
        <p className="rounded-xl border border-primary-100 bg-primary-50/50 p-5 text-sm leading-relaxed text-slate-700 dark:border-primary-800 dark:bg-primary-900/30 dark:text-slate-300">
          <strong className="text-slate-900 dark:text-white">{labels.finalDataset}: </strong>
          {copy.olistAnalysis.preparation.conclusion}
        </p>
      </section>

      <section className="space-y-5" aria-labelledby="olist-delivery-title">
        <SectionHeading
          id="olist-delivery-title"
          icon={<Truck className="h-5 w-5" />}
          title={copy.olistAnalysis.delivery.title}
        />
        <p className="max-w-4xl text-base leading-relaxed text-slate-700 dark:text-slate-300">
          {copy.olistAnalysis.delivery.introduction}
        </p>
        <MetricGrid metrics={copy.olistAnalysis.delivery.metrics} />
        <FigureAnalysis image={figures[1]} galleryId="olist-delivery-gallery" labels={galleryLabels} analysisLabels={labels} />
      </section>

      <section className="space-y-5" aria-labelledby="olist-satisfaction-title">
        <SectionHeading
          id="olist-satisfaction-title"
          icon={<Star className="h-5 w-5" />}
          title={copy.olistAnalysis.satisfaction.title}
        />
        <p className="max-w-4xl text-base leading-relaxed text-slate-700 dark:text-slate-300">
          {copy.olistAnalysis.satisfaction.introduction}
        </p>
        <MetricGrid metrics={copy.olistAnalysis.satisfaction.metrics} />
        <FigureAnalysis image={figures[2]} galleryId="olist-ratings-gallery" labels={galleryLabels} analysisLabels={labels} />
      </section>

      <section className="space-y-5" aria-labelledby="olist-financial-title">
        <SectionHeading
          id="olist-financial-title"
          icon={<Wallet className="h-5 w-5" />}
          title={copy.olistAnalysis.financial.title}
        />
        <p className="max-w-4xl text-base leading-relaxed text-slate-700 dark:text-slate-300">
          {copy.olistAnalysis.financial.introduction}
        </p>
        <MetricGrid metrics={copy.olistAnalysis.financial.indicators} />
        <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {copy.olistAnalysis.financial.note}
        </p>
      </section>

      <section className="space-y-5" aria-labelledby="olist-limitations-title" data-project-limitations>
        <SectionHeading
          id="olist-limitations-title"
          icon={<Compass className="h-5 w-5" />}
          title={limitationsTitle}
        />
        <ul className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/70 p-5 text-sm leading-relaxed text-slate-800 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
          {copy.limitations.map((limitation) => (
            <li key={limitation} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600 dark:bg-primary-400" aria-hidden="true" />
              <span>{limitation}</span>
            </li>
          ))}
        </ul>
      </section>

      {copy.documents && copy.documents.length > 0 && (
        <section className="space-y-4" aria-labelledby="olist-documents-title">
          <h2 id="olist-documents-title" className="font-heading text-xl font-bold text-slate-900 dark:text-white">
            {documentsTitle}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {copy.documents.map((document) => (
              <a
                key={document.href}
                href={document.href}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail__resource motion-control group flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-subtle transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary-500 hover:shadow-card dark:border-slate-700 dark:bg-slate-800/90 dark:hover:border-primary-400"
                data-project-document
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-300">
                    <FileText className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-400">
                      {document.label}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {locale === 'en' ? 'Official academic report · Full pipeline & analysis' : 'Rapport académique officiel · Pipeline & analyses'}
                    </p>
                  </div>
                </div>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors group-hover:bg-primary-100 group-hover:text-primary-700 dark:bg-slate-700 dark:text-slate-300 dark:group-hover:bg-primary-900/50 dark:group-hover:text-primary-300">
                  <Download className="h-4 w-4" aria-hidden="true" />
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function FigureAnalysis({
  image,
  galleryId,
  labels,
  analysisLabels,
}: {
  image: ProjectDetailImage | undefined;
  galleryId: string;
  labels: ProjectGalleryLabels;
  analysisLabels: Record<'question' | 'reading' | 'observation' | 'interpretation' | 'businessInterest' | 'limitation', string>;
}) {
  if (!image?.analysis) return null;

  const analysis = image.analysis;
  const items = [
    [analysisLabels.question, analysis.question],
    [analysisLabels.reading, analysis.reading],
    [analysisLabels.observation, analysis.observation],
    [analysisLabels.interpretation, analysis.interpretation],
    [analysisLabels.businessInterest, analysis.businessInterest],
    [analysisLabels.limitation, analysis.limitation],
  ] as const;

  return (
    <div className="grid min-w-0 gap-5 lg:grid-cols-2 lg:items-start">
      <ProjectGallery images={[image]} labels={labels} showTitle={false} headingId={`${galleryId}-title`} />
      <dl className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-700 dark:bg-slate-800 sm:p-6">
        {items.map(([term, description]) => (
          <div key={term}>
            <dt className="text-sm font-bold text-slate-900 dark:text-white">{term}</dt>
            <dd className="mt-1 text-base leading-relaxed text-slate-700 dark:text-slate-300">{description}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function MetricGrid({ metrics }: { metrics: readonly { value: string; label: string; detail: string }[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <li key={`${metric.value}-${metric.label}`} className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-700 dark:bg-slate-800">
          <strong data-project-accent className="block break-words font-heading text-2xl font-extrabold leading-tight">
            {metric.value}
          </strong>
          <span className="mt-2 block text-sm font-bold text-slate-800 dark:text-slate-200">{metric.label}</span>
          <span className="mt-1 block text-sm leading-relaxed text-slate-600 dark:text-slate-300">{metric.detail}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionHeading({ id, icon, title }: { id: string; icon: ReactNode; title: string }) {
  return (
    <h2 id={id} className="flex items-center gap-2 font-heading text-2xl font-bold text-slate-900 dark:text-white">
      <span data-project-accent aria-hidden="true">{icon}</span>
      {title}
    </h2>
  );
}
