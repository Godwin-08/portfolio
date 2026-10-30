import Image from 'next/image';
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  CalendarDays,
  ExternalLink,
  Hash,
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { Certification } from '@/data/certifications';

interface CertificationDetailPageProps {
  certification: Certification;
  locale: 'fr' | 'en';
  labels: {
    back: string;
    completedOn: string;
    reference: string;
    topics: string;
    practice: string;
    certificate: string;
    openCertificate: string;
    verifyCertificate: string;
    noCertificateImage: string;
  };
}

export function CertificationDetailPage({
  certification,
  locale,
  labels,
}: CertificationDetailPageProps) {
  const content = certification.content[locale];
  const dateFormatter = new Intl.DateTimeFormat(
    locale === 'fr' ? 'fr-FR' : 'en-US',
    { day: 'numeric', month: 'long', timeZone: 'UTC', year: 'numeric' }
  );

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
          <ul className="space-y-3">
            {content.topics.map((topic) => (
              <li key={topic} className="flex gap-3 text-sm leading-relaxed text-body sm:text-base">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-600 dark:bg-emerald-400"
                  aria-hidden="true"
                />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
            <h3 className="text-sm font-bold text-ink">{labels.practice}</h3>
            <p className="mt-2 text-sm leading-relaxed text-body">
              {content.practice}
            </p>
          </div>
        </section>

        <aside
          aria-labelledby="certification-proof-heading"
          className="space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 dark:border-emerald-900 dark:bg-emerald-950/20 sm:p-7"
        >
          <h2
            id="certification-proof-heading"
            className="font-heading text-xl font-bold text-ink sm:text-2xl"
          >
            {labels.certificate}
          </h2>

          {certification.documentPath?.endsWith('.jpg') && (
            <a
              href={certification.documentPath}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={labels.openCertificate}
              className="block rounded-xl bg-[#fffaf0] p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
            >
              <Image
                src={certification.documentPath}
                alt={`${certification.title} — ${certification.issuer}`}
                width={1200}
                height={780}
                className="max-h-72 w-full object-contain"
              />
            </a>
          )}

          <p className="text-sm leading-relaxed text-body">
            {certification.documentPath
              ? labels.openCertificate
              : labels.noCertificateImage}
          </p>

          <div className="flex flex-col items-start gap-2">
            {certification.documentPath && (
              <a
                href={certification.documentPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 dark:bg-emerald-600 dark:hover:bg-emerald-500"
              >
                {labels.openCertificate}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            {certification.verificationUrl && (
              <a
                href={certification.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-emerald-800 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 dark:text-emerald-300 dark:decoration-emerald-700 dark:hover:text-emerald-200"
              >
                {labels.verifyCertificate}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
