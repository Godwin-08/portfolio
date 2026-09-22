'use client';

import React from 'react';
import Link from 'next/link';
import { Project } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { ArrowUpRight, CheckCircle2, Star, Layers, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured }) => {
  const hasCaseStudy = !!project.caseStudy;

  return (
    <div
      className={cn(
        'group relative rounded-card bg-white border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden',
        project.isFlagship && 'ring-1 ring-accent-500/30'
      )}
    >
      {/* Top Banner / Visual Area */}
      <div className="relative p-5 sm:p-6 bg-gradient-to-br from-slate-50 via-white to-slate-100/50 border-b border-slate-100 flex flex-col justify-between min-h-[140px] sm:min-h-[160px] overflow-hidden">
        
        {/* Subtle decorative geometry based on project category */}
        <div
          className="absolute -right-8 -top-8 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none transition-transform group-hover:scale-125 duration-500"
          style={{ backgroundColor: project.accentColor }}
        />

        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: project.accentColor }}
            />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {project.isFlagship && (
              <Badge variant="accent" size="sm" className="gap-1 font-semibold">
                <Star className="w-3 h-3 fill-accent-600" />
                <span>Référence</span>
              </Badge>
            )}
            <Badge variant="neutral" size="sm">
              {project.context}
            </Badge>
          </div>
        </div>

        {/* Title & Tagline in visual hero zone */}
        <div className="z-10 mt-3">
          <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2">
            {project.tagline}
          </p>
        </div>
      </div>

      {/* Card Body with Key Metrics & Reveal Area */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Summary */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {project.summary}
        </p>

        {/* Key Metrics / Tangible Proofs (Preuve > Affirmation) */}
        {project.keyMetrics && project.keyMetrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100">
            {project.keyMetrics.slice(0, 3).map((metric, i) => (
              <div key={i} className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="block text-xs sm:text-sm font-heading font-extrabold text-slate-900 font-mono">
                  {metric.value}
                </span>
                <span className="text-[10px] text-slate-500 font-medium line-clamp-1">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Skills / Tech stack tags */}
        <div className="space-y-1.5 pt-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
            Technologies & Outils
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.skills.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60"
              >
                {tech}
              </span>
            ))}
            {project.skills.length > 6 && (
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-md bg-slate-50 text-slate-400">
                +{project.skills.length - 6}
              </span>
            )}
          </div>
        </div>

        {/* Actions / CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          {hasCaseStudy ? (
            <Link
              href={`/projects/${project.slug}`}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-btn bg-slate-900 hover:bg-primary-600 text-white text-xs sm:text-sm font-medium transition-all duration-200 shadow-xs group-hover:bg-primary-600"
            >
              <span>Lire l&apos;étude de cas</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          ) : (
            <Link
              href={`/projects`}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-btn bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-medium transition-colors"
            >
              <span>Fiche projet</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

      </div>
    </div>
  );
};

