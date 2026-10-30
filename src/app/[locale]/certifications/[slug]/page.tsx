import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CertificationDetailPage } from '@/components/certifications/CertificationDetailPage';
import { CERTIFICATIONS, getCertificationById } from '@/data/certifications';
import { routing } from '@/i18n/routing';
import { buildLocalizedPageMetadata } from '@/lib/seo';

interface CertificationPageProps {
  params: Promise<{
    locale: 'fr' | 'en';
    slug: string;
  }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CERTIFICATIONS.map((certification) => ({
      locale,
      slug: certification.id,
    }))
  );
}

export async function generateMetadata({
  params,
}: CertificationPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const certification = getCertificationById(slug);
  if (!certification) {
    return { title: locale === 'fr' ? 'Certification introuvable' : 'Certification not found' };
  }

  const seo = await getTranslations({ locale, namespace: 'seo' });

  return buildLocalizedPageMetadata({
    locale,
    href: { pathname: '/certifications/[slug]', params: { slug } },
    title: certification.title,
    description: certification.content[locale].overview,
    siteName: seo('siteName'),
    image: certification.documentPath?.endsWith('.jpg')
      ? certification.documentPath
      : undefined,
  });
}

export default async function CertificationPage({
  params,
}: CertificationPageProps) {
  const { locale, slug } = await params;
  const certification = getCertificationById(slug);

  if (!certification) {
    notFound();
  }

  const [t, detail] = await Promise.all([
    getTranslations({ locale, namespace: 'home.certifications' }),
    getTranslations({ locale, namespace: 'home.certifications.detail' }),
  ]);

  return (
    <CertificationDetailPage
      certification={certification}
      locale={locale}
      labels={{
        back: detail('back'),
        completedOn: t('completedOn'),
        reference: t('reference'),
        topics: detail('topics'),
        practice: detail('practice'),
        certificate: detail('certificate'),
        openCertificate: detail('openCertificate'),
        verifyCertificate: t('verifyCertificate'),
        noCertificateImage: detail('noCertificateImage'),
      }}
    />
  );
}
