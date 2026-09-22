import { HeroSection } from '@/components/home/HeroSection';
import { SkillsTicker } from '@/components/home/SkillsTicker';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { MethodSection } from '@/components/home/MethodSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Compétences Interactives (Bandeau cliquable) */}
      <SkillsTicker />

      {/* 3. Projets Sélectionnés (Minimum 3 : Olist, GTM, AFC) */}
      <FeaturedProjects />

      {/* 4. Transition vers About & Démarche d'Ingénieur */}
      <div className="px-4 sm:px-6 lg:px-8">
        <MethodSection />
      </div>
    </div>
  );
}
