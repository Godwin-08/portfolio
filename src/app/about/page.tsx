import type { Metadata } from 'next';
import { AboutContent } from '@/components/about/AboutContent';
import { PROFILE } from '@/data/profile';

export const metadata: Metadata = {
  title: `À propos — ${PROFILE.name}`,
  description: `Parcours, manière de travailler et orientation actuelle de ${PROFILE.name}, étudiant ingénieur IID.`,
};

export default function AboutPage() {
  return <AboutContent />;
}
