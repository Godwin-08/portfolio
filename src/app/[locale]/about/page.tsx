import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AboutContent } from '@/components/about/AboutContent';
import { buildLocalizedPageMetadata } from '@/lib/seo';

interface AboutPageProps {
  params: Promise<{ locale: 'fr' | 'en' }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return buildLocalizedPageMetadata({
    locale,
    href: '/about',
    title: t('about.title'),
    description: t('about.description'),
    siteName: t('siteName'),
    image: '/images/godwin-portrait.jpg',
  });
}

export default function AboutPage() {
  return <AboutContent />;
}
