'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PROFILE } from '@/data/profile';
import { FileText, ArrowRight, BarChart2, Database, Brain, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const HeroSection: React.FC = () => {
  return (
    <section
      className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Teinture de fond subtile */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-0 right-0 h-[60%] bg-gradient-to-b from-primary-50/50 via-transparent to-transparent" />
        <div className="absolute top-[-120px] right-[-80px] w-[480px] h-[480px] rounded-full bg-primary-100/30 blur-3xl" />
        <div className="absolute bottom-0 left-[-80px] w-[320px] h-[320px] rounded-full bg-accent-100/20 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── GAUCHE (Texte, 7 cols) ── */}
          <motion.div
            className="lg:col-span-7 space-y-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {/* Label supérieur & Badge PFA */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary-700 bg-primary-50 border border-primary-200 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-600 shrink-0" aria-hidden="true" />
                ÉTUDIANT INGÉNIEUR · IID
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-700 bg-accent-50 border border-accent-200 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-600" aria-hidden="true" />
                PFA 2e année · Recherche actuellement
              </span>
            </div>

            {/* Nom & Formation */}
            <div>
              <h1
                id="hero-heading"
                className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-[3.2rem] text-slate-900 tracking-tight leading-[1.1]"
              >
                {PROFILE.name}
              </h1>
              <p className="mt-2.5 text-lg sm:text-xl font-medium text-slate-600">
                Informatique et{' '}
                <span className="text-slate-900 font-semibold">Ingénierie des Données</span>
              </p>
            </div>

            {/* Orientation & Essor */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-card p-5 space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Orientation & Spécialisation
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Majeure Data Analysis */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-primary-50/80 border border-primary-100">
                  <BarChart2 className="w-5 h-5 text-primary-700 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <span className="block text-xs font-extrabold text-primary-900">
                      Data Analysis
                    </span>
                    <span className="text-[11px] text-primary-700/90 leading-relaxed">
                      Exploration, modélisation & KPIs décisionnels
                    </span>
                  </div>
                </div>
                {/* Domaines en essor */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex gap-0.5 mt-0.5 shrink-0" aria-hidden="true">
                    <Database className="w-4 h-4 text-slate-500" />
                    <Brain className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-700">
                      Data Engineering · Machine Learning
                    </span>
                    <span className="text-[11px] text-slate-500 leading-relaxed">
                      En développement actif
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phrase de méthode */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-lg">
              Je comprends un problème, j&apos;identifie ce qui compte, puis je construis{' '}
              <span className="text-slate-900 font-semibold">une réponse concrète.</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-btn bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                Voir mes projets
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href={PROFILE.contact.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-btn bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold border border-slate-300 hover:border-slate-400 shadow-xs hover:shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                <FileText className="w-4 h-4 text-slate-500" aria-hidden="true" />
                Télécharger mon CV
              </a>
            </div>
          </motion.div>

          {/* ── DROITE (Photo portrait, 5 cols) ── */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              {/* Halo décoratif subtil */}
              <div
                className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary-200/40 to-accent-200/30 blur-2xl -z-10"
                aria-hidden="true"
              />

              {/* Cadre photo */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-card-hover">

                {/* Badge PFA overlay */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-accent-500/95 backdrop-blur-sm text-white text-[11px] font-bold shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" aria-hidden="true" />
                  PFA 2e année
                </div>

                {/* Photo portrait vertical */}
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/images/godwin-portrait.jpg"
                    alt="Portrait de Godwin Elie Nougbolo, étudiant ingénieur IID"
                    fill
                    priority
                    sizes="(max-width: 640px) 340px, (max-width: 1024px) 380px, 380px"
                    className="object-cover object-top"
                    quality={90}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900/30 to-transparent"
                    aria-hidden="true"
                  />
                </div>

                {/* Micro-légende sous la photo */}
                <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{PROFILE.name}</p>
                    <p className="text-[11px] text-slate-500">IID · Data Analysis</p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-primary-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-600" aria-hidden="true" />
                    Disponible PFA
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
