import React from 'react';
import Link from 'next/link';
import { PROFILE } from '@/data/profile';
import { Button } from '@/components/ui/Button';
import { Search, BarChart3, Cpu, ArrowRight, CheckSquare2 } from 'lucide-react';

export const MethodSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Comprendre',
      desc: 'Explorer le modèle économique ou scientifique, auditer la qualité des données brutes et formuler les hypothèses vérifiables.',
      icon: Search,
      tag: 'Cadrage & Audit',
    },
    {
      num: '02',
      title: 'Analyser',
      desc: 'Nettoyer, agréger, calculer les distributions statistiques, tester les corrélations et dégager des indicateurs exploitables.',
      icon: BarChart3,
      tag: 'Statistiques & KPIs',
    },
    {
      num: '03',
      title: 'Construire',
      desc: 'Concevoir des architectures logicielles modulaires, des pipelines fiables et des dashboards interactifs validés par des tests.',
      icon: Cpu,
      tag: 'Génie Logiciel & Tests',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden rounded-2xl md:rounded-3xl max-w-6xl mx-auto my-8 px-4 sm:px-6 lg:px-10">
      
      {/* Subtle background glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-12">
        
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-primary-300 text-xs font-semibold border border-slate-700">
            <CheckSquare2 className="w-3.5 h-3.5 text-accent-400" />
            <span>Démarche d&apos;ingénieur</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold tracking-tight text-white">
            Fil rouge : {PROFILE.tagline}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Pas d&apos;adjectifs vagues : chaque projet suit une méthode rigoureuse garantissant l&apos;exactitude des données et la maintenabilité logicielle.
          </p>
        </div>

        {/* 3 Step Method Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.num}
                className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-4 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-primary-400">
                    {step.num}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-700/60 text-slate-300 border border-slate-600/50">
                    {step.tag}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-primary-400">
                  <IconComponent className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-heading font-bold text-white">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to About */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white">
              Envie d&apos;en savoir plus sur mon parcours et ma vision ?
            </p>
            <p className="text-xs text-slate-400">
              Découvrez mes études, mon expérience pratique et mes motivations pour le PFA.
            </p>
          </div>
          <Button
            href="/about"
            variant="accent"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="shrink-0"
          >
            Découvrir mon parcours
          </Button>
        </div>

      </div>
    </section>
  );
};

