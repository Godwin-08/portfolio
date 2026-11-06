import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  CalendarDays,
  ChevronDown,
  ExternalLink,
  Hash,
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { Certification } from '@/data/certifications';

interface CertificationDetailPageProps {
  certification: Certification;
  courses: readonly Pick<Certification, 'id' | 'title'>[];
  locale: 'fr' | 'en';
  labels: {
    back: string;
    type: string;
    includedCourses: string;
    completedOn: string;
    expiresOn: string;
    reference: string;
    topics: string;
    domainAssessment: string;
    practice: string;
    certificate: string;
    openCertificate: string;
    verifyCertificate: string;
    noCertificateImage: string;
  };
}

export function CertificationDetailPage({
  certification,
  courses,
  locale,
  labels,
}: CertificationDetailPageProps) {
  const content = certification.content[locale];
  const dateFormatter = new Intl.DateTimeFormat(
    locale === 'fr' ? 'fr-FR' : 'en-US',
    { day: 'numeric', month: 'long', timeZone: 'UTC', year: 'numeric' }
  );

  const certImage =
    certification.imagePath ??
    (certification.documentPath?.endsWith('.jpg')
      ? certification.documentPath
      : undefined);

  return (
    <div
      data-certification-detail
      data-certification-accent={certification.accent}
      className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6 md:py-16 lg:px-8"
    >
      <Link
        href="/certifications"
        className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-body transition-colors hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 dark:hover:text-emerald-300"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {labels.back}
      </Link>

      <header className="space-y-5 border-l-[3px] border-emerald-600 pl-5 dark:border-emerald-400 sm:pl-7">
        <div className="flex items-center gap-2 text-sm font-bold text-emerald-800 dark:text-emerald-300">
          <Award className="h-5 w-5" aria-hidden="true" />
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200">
            {labels.type}
          </span>
          <span>{certification.issuer}</span>
        </div>
        <h1 className="max-w-4xl break-words font-heading text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl">
          {certification.title}
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-body sm:text-lg">
          {content.overview}
        </p>
        <dl className="flex flex-wrap gap-x-8 gap-y-3 pt-1 text-sm">
          {certification.completedOn && (
            <div className="flex items-center gap-2">
              <CalendarDays
                className="h-4 w-4 text-emerald-700 dark:text-emerald-300"
                aria-hidden="true"
              />
              <dt className="sr-only">{labels.completedOn}</dt>
              <dd className="font-semibold text-body">
                {dateFormatter.format(
                  new Date(`${certification.completedOn}T00:00:00Z`)
                )}
              </dd>
            </div>
          )}
          {certification.expiresOn && (
            <div className="flex items-center gap-2">
              <CalendarDays
                className="h-4 w-4 text-emerald-700 dark:text-emerald-300"
                aria-hidden="true"
              />
              <dt className="sr-only">{labels.expiresOn}</dt>
              <dd className="font-semibold text-body">
                {dateFormatter.format(
                  new Date(`${certification.expiresOn}T00:00:00Z`)
                )}
              </dd>
            </div>
          )}
          {certification.reference && (
            <div className="flex items-center gap-2">
              <Hash
                className="h-4 w-4 text-emerald-700 dark:text-emerald-300"
                aria-hidden="true"
              />
              <dt className="sr-only">{labels.reference}</dt>
              <dd className="font-mono font-semibold text-body">
                {certification.reference}
              </dd>
            </div>
          )}
        </dl>
      </header>

      {courses.length > 0 && (
        <section
          aria-labelledby="certification-track-courses-heading"
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900 sm:p-7"
        >
          <h2
            id="certification-track-courses-heading"
            className="font-heading text-xl font-bold text-ink sm:text-2xl"
          >
            {labels.includedCourses}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {courses.map((course) => (
              <li key={course.id}>
                <Link
                  data-track-course-id={course.id}
                  href={{
                    pathname: '/certifications/[slug]',
                    params: { slug: course.id },
                  }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-emerald-800 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 dark:text-emerald-300 dark:hover:text-emerald-200"
                >
                  {course.title}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(17rem,0.72fr)] md:gap-8">
        <section
          aria-labelledby="certification-topics-heading"
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900 sm:p-7"
        >
          <h2
            id="certification-topics-heading"
            className="font-heading text-xl font-bold text-ink sm:text-2xl"
          >
            {labels.topics}
          </h2>
          {content.assessedDomains ? (
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {content.assessedDomains.map((domain) => (
                <details
                  key={domain.id}
                  data-assessed-domain={domain.id}
                  className="group py-1 first:pt-0 last:pb-0"
                >
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-sm py-3 text-left font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                    <span>{domain.title}</span>
                    <ChevronDown
                      className="h-5 w-5 shrink-0 text-emerald-700 transition-transform group-open:rotate-180 dark:text-emerald-300"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="space-y-3 pb-4 pr-8 text-sm leading-relaxed text-body sm:text-base">
                    <p>{domain.description}</p>
                    {domain.assessment && (
                      <div>
                        <h3 className="text-sm font-bold text-ink">
                          {labels.domainAssessment}
                        </h3>
                        <p className="mt-1">{domain.assessment}</p>
                      </div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          ) : (
            <ul className="space-y-3">
              {content.topics.map((topic) => (
                <li
                  key={topic}
                  className="flex gap-3 text-sm leading-relaxed text-body sm:text-base"
                >
                  <span
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-600 dark:bg-emerald-400"
                    aria-hidden="true"
                  />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
            <h3 className="text-sm font-bold text-ink">{labels.practice}</h3>
            <p className="mt-2 text-sm leading-relaxed text-body">
              {content.practice}
            </p>

            {/* Passerelle directe vers le projet FoodYum pour la certification Data Analyst Associate */}
            {certification.id === 'data-analyst-associate' && (
              <div className="mt-5 rounded-xl border border-teal-200 bg-teal-50/70 p-4 dark:border-teal-900/80 dark:bg-teal-950/40">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-teal-600 p-2 text-white">
                    <Award className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading text-sm font-bold text-ink">
                      {locale === 'fr'
                        ? "Projet d'épreuve pratique : FoodYum Grocery Store Sales"
                        : "Practical Exam Case Study: FoodYum Grocery Store Sales"}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-body sm:text-sm">
                      {locale === 'fr'
                        ? "Consultez l'étude de cas complète, les requêtes SQL (PostgreSQL), la modélisation et le notebook Jupyter associés à cette épreuve d'examen."
                        : "Explore the complete case study, SQL queries (PostgreSQL), modeling, and Jupyter notebook associated with this practical exam."}
                    </p>
                    <Link
                      href={{
                        pathname: '/projects/[slug]',
                        params: { slug: 'grocery-store-sales' },
                      }}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-3.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500"
                    >
                      <span>
                        {locale === 'fr'
                          ? "Explorer l'étude de cas FoodYum"
                          : "View FoodYum Case Study"}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <aside
          aria-labelledby="certification-proof-heading"
          className="md:sticky md:top-24 self-start space-y-5 rounded-2xl border border-emerald-200/90 bg-emerald-50/50 p-5 shadow-xs dark:border-emerald-900/80 dark:bg-emerald-950/25 sm:p-6"
        >
          <h2
            id="certification-proof-heading"
            className="font-heading text-xl font-bold text-ink sm:text-2xl"
          >
            {labels.certificate}
          </h2>

          {certImage && (
            <a
              href={certification.documentPath ?? certImage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={labels.openCertificate}
              className="group block overflow-hidden rounded-xl border border-emerald-200/80 bg-[#fffaf0] p-1.5 shadow-xs transition-all duration-200 hover:border-emerald-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 dark:border-emerald-900 dark:bg-slate-900"
            >
              <Image
                src={certImage}
                alt={`${certification.title} – ${certification.issuer}`}
                width={1200}
                height={780}
                className="h-auto w-full object-contain transition-transform duration-200 group-hover:scale-[1.01]"
              />
            </a>
          )}

          {!certification.documentPath && (
            <p className="text-sm leading-relaxed text-body">
              {labels.noCertificateImage}
            </p>
          )}

          <div className="flex flex-col items-start gap-2.5 pt-1">
            {certification.documentPath && (
              <a
                href={certification.documentPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white shadow-xs transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 dark:bg-emerald-600 dark:hover:bg-emerald-500 sm:w-auto"
              >
                <span>{labels.openCertificate}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            {certification.verificationUrl && (
              <a
                href={certification.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-emerald-800 underline decoration-emerald-300 underline-offset-4 transition-colors hover:text-emerald-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 dark:text-emerald-300 dark:decoration-emerald-700 dark:hover:text-emerald-200"
              >
                <span>{labels.verifyCertificate}</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
