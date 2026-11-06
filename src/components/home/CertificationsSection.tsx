import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { CertificationList } from '@/components/home/CertificationList';
import {
  CERTIFICATIONS,
  CERTIFICATIONS_BY_IMPORTANCE,
} from '@/data/certifications';

interface CertificationsSectionProps {
  variant?: 'featured' | 'all';
}

export async function CertificationsSection({
  variant = 'featured',
}: CertificationsSectionProps) {
  const isFeatured = variant === 'featured';
  const ZoneHeadingTag = isFeatured ? 'h3' : 'h2';
  const CredentialHeadingTag = isFeatured ? 'h4' : 'h3';
  const credentials = CERTIFICATIONS_BY_IMPORTANCE.filter(
    (certification) => certification.credentialType !== 'course'
  );
  const courses = CERTIFICATIONS_BY_IMPORTANCE.filter(
    (certification) => certification.credentialType === 'course'
  );
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('home.certifications'),
  ]);
  const activeLocale = locale === 'en' ? 'en' : 'fr';
  const dateFormatter = new Intl.DateTimeFormat(
    activeLocale === 'fr' ? 'fr-FR' : 'en-US',
    { day: 'numeric', month: 'short', timeZone: 'UTC', year: 'numeric' }
  );

  return (
    <section
      className="bg-[var(--bg-main)] py-8 sm:py-12 md:py-14"
      aria-labelledby="certifications-heading"
    >
      <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div className="max-w-3xl space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="h-1 w-8 bg-primary-600" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary-800 dark:text-primary-300 sm:text-sm">
                {t('eyebrow')}
              </span>
            </div>
            {isFeatured ? (
              <h2
                id="certifications-heading"
                className="font-heading text-[clamp(1.6rem,3.5vw,2.5rem)] font-extrabold leading-tight tracking-tight text-ink"
              >
                {t('heading')}
              </h2>
            ) : (
              <h1
                id="certifications-heading"
                className="font-heading text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-tight tracking-tight text-ink"
              >
                {t('heading')}
              </h1>
            )}
            <p className="max-w-2xl text-xs leading-relaxed text-body sm:text-sm">
              {isFeatured ? t('featuredDescription') : t('description')}
            </p>
          </div>
          {isFeatured && (
            <p className="shrink-0 text-xs font-semibold text-muted sm:text-sm">
              {t('featuredCount', {
                featured: credentials.length,
                total: CERTIFICATIONS.length,
              })}
            </p>
          )}
        </div>

        {/* Section des 2 Preuves Majeures (Certification d'examen + Cursus) */}
        <section
          aria-labelledby="featured-credentials-heading"
          className="space-y-4"
        >
          <ZoneHeadingTag
            id="featured-credentials-heading"
            className="font-heading text-lg font-bold text-ink sm:text-xl"
          >
            {t('proofsHeading')}
          </ZoneHeadingTag>
          <div
            data-certifications-grid
            data-certifications-zone="credentials"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6"
          >
            {credentials.map((certification) => (
              <article
                key={certification.id}
                data-certification-id={certification.id}
                data-certification-rank={certification.importance}
                data-certification-type={certification.credentialType}
                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-emerald-200 border-t-[3px] border-t-emerald-600 bg-white shadow-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-md focus-within:ring-2 focus-within:ring-emerald-700 focus-within:ring-offset-2 motion-reduce:transition-none dark:border-emerald-900 dark:border-t-emerald-400 dark:bg-slate-900 dark:hover:border-emerald-600"
              >
                {/* Aperçu visuel compact optimisé mobile/desktop */}
                {certification.imagePath && (
                  <Link
                    href={{
                      pathname: '/certifications/[slug]',
                      params: { slug: certification.id },
                    }}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="relative block aspect-[21/9] sm:aspect-[16/8] w-full overflow-hidden bg-slate-100 dark:bg-slate-800"
                  >
                    <Image
                      src={certification.imagePath}
                      alt=""
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </Link>
                )}

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200">
                        {certification.credentialType === 'certification'
                          ? t('types.certification')
                          : t('types.track')}
                      </span>
                      <span className="rounded-full bg-paper px-2.5 py-0.5 text-xs font-bold text-ink">
                        {certification.issuer}
                      </span>
                    </div>

                    {certification.verificationUrl && (
                      <a
                        data-certification-verification
                        href={certification.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t('verifyCertificateAria', {
                          title: certification.title,
                        })}
                        title={t('verifyCertificate')}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted transition-colors hover:bg-emerald-50 hover:text-emerald-800 dark:hover:bg-emerald-950/50 dark:hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                      >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>

                  <CredentialHeadingTag className="mt-2.5 font-heading text-base font-extrabold leading-snug text-ink sm:text-lg">
                    <Link
                      data-certification-title
                      href={{
                        pathname: '/certifications/[slug]',
                        params: { slug: certification.id },
                      }}
                      aria-label={t('viewDetailsAria', {
                        title: certification.title,
                      })}
                      className="rounded-sm transition-colors hover:text-emerald-800 dark:hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    >
                      {certification.title}
                    </Link>
                  </CredentialHeadingTag>

                  {/* Résumé concis masqué sur mobile pour éviter la surcharge */}
                  <p className="mt-1.5 hidden text-xs leading-relaxed text-body line-clamp-2 sm:block sm:text-sm">
                    {certification.content[activeLocale].overview}
                  </p>

                  {/* Métadonnées dates compactes en ligne */}
                  {(certification.completedOn ||
                    certification.expiresOn ||
                    certification.reference) && (
                    <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-slate-100 pt-2 text-xs text-muted dark:border-slate-800">
                      {certification.completedOn && (
                        <span>
                          <span className="font-medium">{t('completedOn')} : </span>
                          <span className="font-semibold text-body">
                            {dateFormatter.format(
                              new Date(`${certification.completedOn}T00:00:00Z`)
                            )}
                          </span>
                        </span>
                      )}
                      {certification.expiresOn && (
                        <span>
                          <span className="font-medium">{t('expiresOn')} : </span>
                          <span className="font-semibold text-body">
                            {dateFormatter.format(
                              new Date(`${certification.expiresOn}T00:00:00Z`)
                            )}
                          </span>
                        </span>
                      )}
                      {certification.reference && (
                        <span className="font-mono text-xs">
                          #{certification.reference}
                        </span>
                      )}
                    </div>
                  )}

                  {/* CTA unique épuré */}
                  <div className="mt-3 pt-1 sm:mt-auto sm:pt-3">
                    <Link
                      data-certification-details
                      href={{
                        pathname: '/certifications/[slug]',
                        params: { slug: certification.id },
                      }}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-800 transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 dark:bg-emerald-950/60 dark:text-emerald-200 dark:hover:bg-emerald-900/60 sm:text-sm"
                    >
                      <span>{t('viewDetails')}</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Sur l'accueil : callout compact pour les 11 cours. Sur /certifications : liste complète */}
        {isFeatured ? (
          <div className="flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/40 p-4 text-center dark:border-emerald-800 dark:bg-emerald-950/20 sm:p-6">
            <p className="max-w-xl text-xs font-medium text-body sm:text-sm">
              {locale === 'fr'
                ? `En complément, ${courses.length} cours spécialisés avec attestations valident les compétences en SQL, PostgreSQL, statistiques et visualisation.`
                : `In addition, ${courses.length} specialized courses with certificates validate skills in SQL, PostgreSQL, statistics, and visualization.`}
            </p>
            <Link
              href="/certifications"
              data-certifications-all-link
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-emerald-700 bg-white px-5 py-2 text-xs font-bold text-emerald-800 shadow-sm transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 dark:border-emerald-400 dark:bg-slate-900 dark:text-emerald-300 dark:hover:bg-emerald-950/50 sm:text-sm"
            >
              {t('viewAll', { count: CERTIFICATIONS.length })}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <section
            aria-labelledby="certification-courses-heading"
            className="space-y-4 pt-3"
          >
            <ZoneHeadingTag
              id="certification-courses-heading"
              className="font-heading text-lg font-bold text-ink sm:text-xl"
            >
              {t('coursesHeading')}
            </ZoneHeadingTag>
            <CertificationList
              certifications={courses}
              headingLevel="h3"
              showFilters={true}
            />
          </section>
        )}
      </div>
    </section>
  );
}
