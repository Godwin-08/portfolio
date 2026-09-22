'use client';

import React from 'react';
import Link from 'next/link';
import { SKILLS } from '@/data/skills';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';

export const SkillsTicker: React.FC = () => {
  return (
    <section className="py-10 border-y border-slate-200/80 bg-white/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with concept clarification */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-heading font-bold text-slate-900">
                Compétences Appliquées & Outils
              </h2>
              <p className="text-xs text-slate-500">
                Chaque compétence renvoie directement aux projets et décisions qui la valident (sans pourcentages arbitraires).
              </p>
            </div>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center text-xs font-semibold text-primary-700 hover:text-primary-800 gap-1 shrink-0"
          >
            <span>Voir tous les projets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Interactive Skills Grid / Ticker Chips */}
        <div className="flex flex-wrap gap-2.5">
          {SKILLS.map((skill) => {
            const projectCount = skill.projectSlugs.length;
            return (
              <Link
                key={skill.id}
                href={`/projects?skill=${encodeURIComponent(skill.name)}`}
                className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 text-slate-700 hover:text-primary-700 hover:border-primary-300 hover:bg-primary-50/50 shadow-xs hover:shadow-sm transition-all duration-150 active:scale-95"
                title={`${skill.description} • Cliquez pour filtrer ${projectCount} projet(s)`}
              >
                <span className="text-xs font-semibold">{skill.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-slate-100 group-hover:bg-primary-100 text-slate-500 group-hover:text-primary-700 transition-colors font-medium">
                  {projectCount} {projectCount > 1 ? 'projets' : 'projet'}
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

