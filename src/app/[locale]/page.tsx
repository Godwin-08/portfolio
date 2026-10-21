import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildLocalizedPageMetadata } from '@/lib/seo';
import { HeroSection } from '@/components/home/HeroSection';
import { SkillsTicker } from '@/components/home/SkillsTicker';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { AboutTransition } from '@/components/home/AboutTransition';

interface HomePageProps {
  params: Promise<{ locale: 'fr' | 'en' }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return buildLocalizedPageMetadata({
    locale,
    href: '/',
    title: t('home.title'),
    description: t('home.description'),
    siteName: t('siteName'),
    image: '/images/godwin-portrait.jpg',
  });
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Compétences interactives */}
      <SkillsTicker />

      {/* 3. Projets sélectionnés */}
      <FeaturedProjects />

      {/* 4. Transition vers About */}
      <AboutTransition />
    </div>
  );
}
