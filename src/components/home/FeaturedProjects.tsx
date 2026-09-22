'use client';

import React from 'react';
import Link from 'next/link';
import { getFeaturedProjects } from '@/data/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedProjects: React.FC = () => {
  const featuredProjects = getFeaturedProjects();

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Sélection de Réalisations
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
              Projets Phares & Études de Cas
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Des cas réels démontrant la maîtrise des données, l&apos;ingénierie logicielle et la rigueur d&apos;analyse.
            </p>
          </div>

          <Button
            href="/projects"
            variant="outline"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="self-start md:self-auto shrink-0"
          >
            Explorer tous les projets ({featuredProjects.length + 5})
          </Button>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} featured={true} />
          ))}
        </div>

      </div>
    </section>
  );
};

