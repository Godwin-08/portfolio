'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { getCategorySlug, getFeaturedProjects } from '@/data/projects';
import { Project } from '@/types';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Visuels SVG descriptifs par projet
function ProjectSVGVisual({ slug }: { slug: string }) {
  if (slug === 'olist') {
    return (
      <svg viewBox="0 0 280 180" className="w-full h-full opacity-60" aria-hidden="true">
        <line x1="30" y1="150" x2="260" y2="150" stroke="#0284c7" strokeWidth="1.5" opacity="0.4" />
        <line x1="30" y1="30" x2="30" y2="150" stroke="#0284c7" strokeWidth="1.5" opacity="0.4" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const x = 50 + i * 32;
          const heights = [90, 65, 110, 78, 55, 95, 72];
          const h = heights[i];
          return (
            <g key={i}>
              <rect x={x} y={150 - h} width="10" height={h} fill="#0284c7" opacity="0.35" rx="2" />
              <rect x={x + 12} y={150 - h * 0.7} width="10" height={h * 0.7} fill="#10b981" opacity="0.35" rx="2" />
            </g>
          );
        })}
        <polyline
          points="55,90 87,72 119,75 151,68 183,80 215,60 247,65"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="2"
          opacity="0.5"
          strokeDasharray="4 2"
        />
        {[[55, 90], [87, 72], [119, 75], [151, 68], [183, 80], [215, 60], [247, 65]].map(
          ([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill="#0ea5e9" opacity="0.7" />
          )
        )}
      </svg>
    );
  }

  if (slug === 'gtm') {
    return (
      <svg viewBox="0 0 280 180" className="w-full h-full opacity-60" aria-hidden="true">
        <rect x="20" y="20" width="240" height="140" rx="8" fill="white" opacity="0.5" stroke="#e2e8f0" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={30 + i * 80} y="30" width="72" height="40" rx="6" fill="#ecfdf5" opacity="0.8" stroke="#a7f3d0" />
            <rect x={38 + i * 80} y="44" width="40" height="8" rx="2" fill="#10b981" opacity="0.6" />
            <rect x={38 + i * 80} y="56" width="28" height="5" rx="2" fill="#6ee7b7" opacity="0.4" />
          </g>
        ))}
        <circle cx="70" cy="130" r="28" fill="none" stroke="#e2e8f0" strokeWidth="12" />
        <circle
          cx="70"
          cy="130"
          r="28"
          fill="none"
          stroke="#0284c7"
          strokeWidth="12"
          strokeDasharray="88 176"
          strokeDashoffset="-44"
          opacity="0.7"
        />
        <circle
          cx="70"
          cy="130"
          r="28"
          fill="none"
          stroke="#10b981"
          strokeWidth="12"
          strokeDasharray="44 176"
          strokeDashoffset="-132"
          opacity="0.5"
        />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="115" y={108 + i * 16} width={120 - i * 20} height="9" rx="3" fill="#0284c7" opacity={0.15 + i * 0.05} />
            <rect x="115" y={108 + i * 16} width={(80 - i * 12) * 0.6} height="9" rx="3" fill="#0284c7" opacity={0.25 + i * 0.05} />
          </g>
        ))}
      </svg>
    );
  }

  // AFC — plan factoriel
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full opacity-60" aria-hidden="true">
      <line x1="140" y1="20" x2="140" y2="160" stroke="#7c3aed" strokeWidth="1.5" opacity="0.4" />
      <line x1="20" y1="90" x2="260" y2="90" stroke="#7c3aed" strokeWidth="1.5" opacity="0.4" />
      <text x="250" y="85" fontSize="9" fill="#7c3aed" opacity="0.6">
        F1
      </text>
      <text x="145" y="25" fontSize="9" fill="#7c3aed" opacity="0.6">
        F2
      </text>
      {[[60, 55], [80, 120], [110, 40], [170, 130], [200, 70], [165, 45], [90, 100]].map(
        ([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="5" fill="#7c3aed" opacity="0.5" />
        )
      )}
      {[[55, 80], [100, 140], [180, 50], [220, 110], [145, 70]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill="#10b981" opacity="0.5" />
      ))}
      <ellipse
        cx="140"
        cy="90"
        rx="80"
        ry="55"
        fill="none"
        stroke="#7c3aed"
        strokeWidth="1"
        strokeDasharray="5 3"
        opacity="0.25"
      />
    </svg>
  );
}

const PROJECT_BG: Record<string, string> = {
  olist: 'from-sky-500/20 via-blue-400/10 to-slate-100',
  gtm: 'from-emerald-400/20 via-teal-300/10 to-slate-100',
  afc: 'from-violet-400/20 via-purple-300/10 to-slate-100',
};

interface ProjectPreviewCopy {
  title: string;
  category: string;
  tagline: string;
}

const ProjectCard: React.FC<{
  project: Project;
  copy: ProjectPreviewCopy;
  caseStudyLabel: string;
  caseStudyAria: string;
}> = ({ project, copy, caseStudyLabel, caseStudyAria }) => {
  const bgClass = PROJECT_BG[project.slug] ?? 'from-primary-500/20 to-slate-100';

  return (
    <article className="group relative flex flex-col rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-card hover:shadow-card-hover transition-shadow duration-300 h-full">
      {/* Zone Visuelle Dominante */}
      <div className={cn('relative flex-1 min-h-[220px] sm:min-h-[260px] bg-gradient-to-br overflow-hidden', bgClass)}>
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <ProjectSVGVisual slug={project.slug} />
        </div>

        {/* Info visible au repos */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900/60 via-slate-900/25 to-transparent">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
            {copy.category}
          </span>
          <h3 className="text-base font-heading font-bold text-white mt-0.5 line-clamp-1">
            {copy.title}
          </h3>
        </div>

        {/* Reveal vertical au survol / focus */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col justify-end',
            'translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0',
            'transition-transform duration-300 ease-out',
            'bg-slate-900/92 backdrop-blur-sm p-5 space-y-3'
          )}
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-300">
              {copy.category}
            </span>
            <h3 className="text-base font-heading font-bold text-white mt-0.5 line-clamp-2">
              {copy.title}
            </h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
            {copy.tagline}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.skills.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-700/80 text-slate-200 border border-slate-600/60"
              >
                {tech}
              </span>
            ))}
          </div>

          <Link
            href={{ pathname: '/projects/[slug]', params: { slug: project.slug } }}
            className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-500 px-4 py-2 rounded-lg transition-colors self-start focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          >
            <span>{caseStudyLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Pied de carte permanent (accessible mobile) */}
      <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between bg-white">
        <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
          {project.skills.slice(0, 3).map((tech) => (
            <span key={tech} className="text-[10px] font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
              {tech}
            </span>
          ))}
          {project.skills.length > 3 && (
            <span className="text-[10px] text-slate-400">+{project.skills.length - 3}</span>
          )}
        </div>
        <Link
          href={{ pathname: '/projects/[slug]', params: { slug: project.slug } }}
          aria-label={caseStudyAria}
          className="ml-2 shrink-0 p-1.5 rounded-lg hover:bg-primary-50 text-slate-500 hover:text-primary-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};

export const FeaturedProjects: React.FC = () => {
  const t = useTranslations('home.projects');
  const cta = useTranslations('common.cta');
  const cards = useTranslations('projects.cards');
  const categories = useTranslations('projects.categories');
  const cardUi = useTranslations('projects.card');
  const featured = getFeaturedProjects();

  return (
    <section className="py-16 md:py-24" aria-labelledby="projects-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-600" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t('eyebrow')}
              </span>
            </div>
            <h2
              id="projects-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight"
            >
              {t('heading')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              {t('description')}
            </p>
          </div>
        </div>

        {/* Grille 3 projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {featured.map((project) => {
            const copy: ProjectPreviewCopy = {
              title: cards(`${project.id}.title`),
              category: categories(getCategorySlug(project.category)),
              tagline: cards(`${project.id}.tagline`),
            };
            return (
              <ProjectCard
                key={project.id}
                project={project}
                copy={copy}
                caseStudyLabel={cta('readCaseStudy')}
                caseStudyAria={cardUi('caseStudyAria', { title: copy.title })}
              />
            );
          })}
        </div>

        {/* Lien vers tous les projets */}
        <div className="text-center pt-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800 px-5 py-2.5 rounded-btn border border-primary-200 hover:border-primary-300 bg-primary-50/60 hover:bg-primary-50 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <span>{cta('viewAllProjects')}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

