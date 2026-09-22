'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SKILLS } from '@/data/skills';
import { Layers, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const TRACK_SPEED = 35; // secondes pour un cycle

export const SkillsTicker: React.FC = () => {
  const router = useRouter();

  // Diviser en 2 bandes
  const midpoint = Math.ceil(SKILLS.length / 2);
  const track1 = SKILLS.slice(0, midpoint);
  const track2 = SKILLS.slice(midpoint);

  const handleSkillClick = (skillName: string) => {
    router.push(`/projects?skill=${encodeURIComponent(skillName)}`);
  };

  const SkillChip = ({
    skill,
    className,
  }: {
    skill: (typeof SKILLS)[0];
    className?: string;
  }) => (
    <button
      type="button"
      onClick={() => handleSkillClick(skill.name)}
      aria-label={`Filtrer les projets par compétence : ${skill.name}`}
      title={skill.description}
      className={cn(
        'group inline-flex items-center gap-2 px-4 py-2 rounded-xl',
        'bg-white border border-slate-200/90 text-slate-700',
        'hover:text-primary-700 hover:border-primary-300 hover:bg-primary-50/60',
        'active:scale-95 cursor-pointer select-none',
        'shadow-xs hover:shadow-sm',
        'transition-all duration-150 whitespace-nowrap shrink-0',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        className
      )}
    >
      <span className="text-xs sm:text-sm font-semibold">{skill.name}</span>
      <span
        className={cn(
          'text-[10px] font-mono px-1.5 py-0.5 rounded-md font-medium transition-colors',
          'bg-slate-100 text-slate-500 group-hover:bg-primary-100 group-hover:text-primary-700'
        )}
      >
        {skill.projectSlugs.length}p
      </span>
    </button>
  );

  return (
    <section
      className="py-10 border-y border-slate-200/80 bg-white/70 overflow-hidden"
      aria-label="Compétences cliquables reliées aux projets"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-lg bg-primary-100 flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <Layers className="w-4 h-4 text-primary-700" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-heading font-bold text-slate-900">
                Compétences
              </h2>
              <p className="text-xs text-slate-500">
                Cliquer sur une compétence filtre les projets associés
              </p>
            </div>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm"
          >
            <span>Voir tous les projets</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Bande 1 & 2 */}
      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white/80 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white/80 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Bande 1 (gauche) */}
        <div
          className="flex gap-3 mb-3 w-max"
          style={{
            animation: `ticker-left ${TRACK_SPEED}s linear infinite`,
          }}
        >
          {[...track1, ...track1].map((skill, i) => (
            <SkillChip key={`t1-${i}`} skill={skill} />
          ))}
        </div>

        {/* Bande 2 (droite) */}
        <div
          className="flex gap-3 w-max"
          style={{
            animation: `ticker-right ${TRACK_SPEED * 1.2}s linear infinite`,
          }}
        >
          {[...track2, ...track2].map((skill, i) => (
            <SkillChip key={`t2-${i}`} skill={skill} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes ticker-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes ticker-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          div[style*='ticker-left'],
          div[style*='ticker-right'] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};
