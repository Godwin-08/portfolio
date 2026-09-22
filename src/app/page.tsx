import { HeroSection } from '@/components/home/HeroSection';
import { SkillsTicker } from '@/components/home/SkillsTicker';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { AboutTransition } from '@/components/home/AboutTransition';

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
