import { ArrowUpRight, Award, ExternalLink } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { CERTIFICATIONS } from '@/data/certifications';

export async function CertificationsSection() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('home.certifications'),
  ]);
  const dateFormatter = new Intl.DateTimeFormat(
    locale === 'fr' ? 'fr-FR' : 'en-US',
    { day: 'numeric', month: 'short', timeZone: 'UTC', year: 'numeric' }
  );

  return (
    <section
      className="bg-[var(--bg-main)] py-14 sm:py-16 md:py-20"
      aria-labelledby="certifications-heading"
    >
      <div className="mx-auto max-w-7xl space-y-7 px-4 sm:px-6 lg:px-8 lg:space-y-9">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-1 w-8 bg-primary-600" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary-800 sm:text-sm">
                {t('eyebrow')}
              </span>
            </div>
            <h2
              id="certifications-heading"
              className="font-heading text-[clamp(1.8rem,4vw,2.75rem)] font-extrabold leading-tight tracking-tight text-ink"
            >
              {t('heading')}
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-body sm:text-base">
              {t('description')}
            </p>
          </div>
          <p className="shrink-0 text-sm font-semibold text-muted">
            {t('count', { count: CERTIFICATIONS.length })}
          </p>
        </div>

        <div
          data-certifications-grid
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {CERTIFICATIONS.map((certification) => (
            <article
              key={certification.id}
              data-certification-id={certification.id}
              className="flex min-w-0 flex-col rounded-2xl border border-slate-200 border-t-4 border-t-primary-600 bg-white p-5 shadow-card transition-colors duration-200 hover:border-primary-300 motion-reduce:transition-none sm:p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-800">
                  <Award className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="rounded-full bg-paper px-3 py-1.5 text-xs font-bold text-ink">
                  DataCamp
                </span>
              </div>

              <h3 className="mt-4 min-h-12 break-words font-heading text-base font-extrabold leading-snug text-ink sm:text-lg">
                {certification.title}
              </h3>

              <dl className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-medium text-muted">
                    {t('completedOn')}
                  </dt>
                  <dd className="mt-1 font-semibold text-body">
                    {dateFormatter.format(
                      new Date(`${certification.completedOn}T00:00:00Z`)
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted">
                    {t('reference')}
                  </dt>
                  <dd className="mt-1 font-mono text-xs font-semibold text-body sm:text-sm">
                    #{certification.reference}
                  </dd>
                </div>
              </dl>

              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5">
                <a
                  data-certification-document
                  href={certification.documentPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('viewCertificateAria', {
                    title: certification.title,
                  })}
                  className="inline-flex min-h-11 items-center gap-2 border-b border-primary-700 text-sm font-bold text-primary-800 hover:border-coral-600 hover:text-coral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
                >
                  <span>{t('viewCertificate')}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>

                {certification.verificationUrl && (
                  <a
                    data-certification-verification
                    href={certification.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('verifyCertificateAria', {
                      title: certification.title,
                    })}
                    className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-body underline decoration-slate-300 underline-offset-4 hover:text-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
                  >
                    <span>{t('verifyCertificate')}</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
