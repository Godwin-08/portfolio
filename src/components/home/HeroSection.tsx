'use client';

import React from 'react';
import Link from 'next/link';
import { PROFILE } from '@/data/profile';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowDown, FileText, Sparkles, Database, Brain, BarChart2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-primary-50/60 via-transparent to-transparent -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Hero Content (Left, 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Status Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="pfa" size="md" className="gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
                <span>{PROFILE.badge}</span>
              </Badge>
              <Badge variant="neutral" size="md">
                Ingénierie des Données (IID)
              </Badge>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-heading font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                {PROFILE.name}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-700">
                Étudiant Ingénieur en{' '}
                <span className="text-slate-900 font-semibold underline decoration-primary-300 underline-offset-4">
                  Informatique & Ingénierie des Données
                </span>
              </p>
            </div>

            {/* Positioning / Dual focus: Data Analysis prominent, Data Engineering & ML growing */}
            <div className="p-4 sm:p-5 rounded-card bg-white border border-slate-200/90 shadow-card space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Orientation Principale & Essor
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-primary-50/70 border border-primary-100">
                  <BarChart2 className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-primary-900 block">
                      Data Analysis (Majeure)
                    </span>
                    <span className="text-xs text-primary-700/90">
                      Exploration, modélisation, KPIs & décisions chiffrées.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <div className="flex gap-1 shrink-0 mt-0.5">
                    <Database className="w-4 h-4 text-slate-600" />
                    <Brain className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      Data Engineering & ML
                    </span>
                    <span className="text-xs text-slate-600">
                      Pipelines, SQL robuste & modélisation prédictive en développement.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Methodology & Core principle */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-accent-600" />
                <span className="text-accent-700 uppercase text-xs tracking-wider font-bold">
                  {PROFILE.corePhilosophy}
                </span>
                <span className="text-slate-300">•</span>
                <span className="font-heading text-slate-900 text-sm">
                  {PROFILE.tagline}
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                {PROFILE.philosophyDescription}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Button
                href="/projects"
                variant="primary"
                size="lg"
                rightIcon={<ArrowDown className="w-4 h-4 -rotate-90" />}
              >
                Explorer mes projets
              </Button>
              <Button
                href={PROFILE.contact.cvPath}
                isExternal
                variant="outline"
                size="lg"
                leftIcon={<FileText className="w-4 h-4 text-slate-500" />}
              >
                Télécharger mon CV
              </Button>
            </div>

          </motion.div>

          {/* Hero Portrait / Graphic Frame (Right, 5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Decorative engineering grid backdrop */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-primary-200/50 to-accent-200/40 blur-xl opacity-70 -z-10" />
              
              {/* Portrait Container */}
              <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-card p-4 sm:p-5">
                
                {/* Vertical Portrait Frame */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-b from-slate-100 via-primary-50/40 to-slate-200 border border-slate-200/70 flex flex-col justify-between p-6">
                  
                  {/* Top Badge on Portrait */}
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm text-[11px] font-mono text-slate-700 font-semibold border border-slate-200/80 shadow-xs">
                      IID 2024-2026
                    </span>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/90 text-white text-[11px] font-semibold shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      Stage PFA
                    </div>
                  </div>

                  {/* Visual Portrait Graphic */}
                  <div className="my-auto text-center py-6 flex flex-col items-center justify-center">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-400 text-white flex items-center justify-center shadow-lg mb-4 text-3xl font-heading font-extrabold tracking-tight border-2 border-white">
                      GN
                    </div>
                    <div className="space-y-1">
                      <p className="font-heading font-bold text-slate-900 text-base sm:text-lg">
                        {PROFILE.name}
                      </p>
                      <p className="text-xs text-slate-600 font-medium">
                        Data Analysis & Ingénierie Logicielle
                      </p>
                    </div>
                  </div>

                  {/* Bottom metrics on portrait card */}
                  <div className="grid grid-cols-2 gap-2 bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-slate-200/70 shadow-xs text-center">
                    <div className="border-r border-slate-200/60 pr-2">
                      <span className="block text-xs font-bold text-slate-900 font-mono">96k+</span>
                      <span className="text-[10px] text-slate-500 font-medium">Données auditées</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-900 font-mono">100% MVC</span>
                      <span className="text-[10px] text-slate-500 font-medium">Solutions testées</span>
                    </div>
                  </div>

                </div>

                {/* Micro quote banner below portrait */}
                <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-600 shrink-0" />
                    <span className="font-medium text-slate-700">Approche méthodique</span>
                  </div>
                  <span className="font-mono text-[11px] text-primary-700 font-semibold">Python • SQL • Stats</span>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

