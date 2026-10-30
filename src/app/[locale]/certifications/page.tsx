import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CertificationsSection } from '@/components/home/CertificationsSection';
import { buildLocalizedPageMetadata } from '@/lib/seo';

interface CertificationsPageProps {
  params: Promise<{ locale: 'fr' | 'en' }>;
}

export async function generateMetadata({
  params,
}: CertificationsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getTranslations({ locale, namespace: 'seo' });

  return buildLocalizedPageMetadata({
    locale,
    href: '/certifications',
    title: seo('certifications.title'),
    description: seo('certifications.description'),
    siteName: seo('siteName'),
  });
}

export default function CertificationsPage() {
  return (
    <div>
      <CertificationsSection variant="all" />
    </div>
  );
}
