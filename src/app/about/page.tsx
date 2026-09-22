import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PROFILE } from '@/data/profile';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  GraduationCap,
  Briefcase,
  Users,
  Compass,
  CheckCircle2,
  FileText,
  ArrowRight,
  ShieldCheck,
  Target,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: `À Propos — ${PROFILE.name} | Ingénieur IID`,
  description: `Découvrez le parcours académique, l'expérience professionnelle, la méthodologie de travail et les objectifs de Godwin Elie Nougbolo.`,
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      
      {/* 1. Header / Introduction */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="pfa" size="md" className="gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
            <span>{PROFILE.badge}</span>
          </Badge>
          <Badge variant="neutral" size="md">
            Informatique & Ingénierie des Données
          </Badge>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            À Propos & Démarche
          </h1>
          <p className="text-lg text-slate-600 font-medium">
            Ingénieur en formation, orienté résolution concrète de problèmes par la donnée et le code.
          </p>
        </div>

        {/* Bio card */}
        <div className="p-6 sm:p-8 rounded-card bg-white border border-slate-200/90 shadow-card space-y-4">
          <h2 className="text-base font-heading font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary-600" />
            <span>Vision & Positionnement</span>
          </h2>
          <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-3 whitespace-pre-line">
            {PROFILE.bio}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-accent-600" />
              <span>Philosophie : <strong>{PROFILE.corePhilosophy}</strong> ({PROFILE.tagline})</span>
            </div>
            <Button
              href={PROFILE.contact.cvPath}
              isExternal
              variant="outline"
              size="sm"
              leftIcon={<FileText className="w-3.5 h-3.5 text-slate-500" />}
            >
              Consulter le CV (PDF)
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Focus Actuel & Objectif PFA */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <Compass className="w-5 h-5 text-primary-600" />
          <h2 className="text-2xl font-heading font-bold">Focus Actuel & Recherche de PFA</h2>
        </div>
        <div className="p-6 rounded-card bg-primary-50/50 border border-primary-200/70 space-y-4">
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Dans le cadre de ma 2e année du cycle ingénieur, je recherche un stage de Projet de Fin d&apos;Année (PFA).
            Mon objectif n&apos;est pas de m&apos;enfermer dans une étiquette rigide, mais d&apos;apporter une réelle polyvalence technique au sein d&apos;une équipe :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-white border border-primary-100 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-700 block">
                Cœur opérationnel
              </span>
              <span className="text-sm font-semibold text-slate-900 block">Data Analysis</span>
              <p className="text-xs text-slate-600">
                Audit de qualité, exploration statistique, modélisation des KPIs et restitution pour la prise de décision.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-primary-100 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-700 block">
                Domaines en développement actif
              </span>
              <span className="text-sm font-semibold text-slate-900 block">Data Engineering & ML</span>
              <p className="text-xs text-slate-600">
                Pipelines de transformation, bases de données relationnelles optimisées et algorithmes d&apos;apprentissage automatique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Parcours Académique */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-slate-900">
          <GraduationCap className="w-5 h-5 text-primary-600" />
          <h2 className="text-2xl font-heading font-bold">Parcours Académique</h2>
        </div>

        <div className="space-y-4">
          {PROFILE.education.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 rounded-card bg-white border border-slate-200/90 shadow-card space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-xs font-mono font-bold text-primary-700">
                  {edu.period}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {edu.institution} {edu.location && `• ${edu.location}`}
                </span>
              </div>

              <h3 className="text-lg font-heading font-bold text-slate-900">
                {edu.degree}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                {edu.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {edu.specialties.map((spec) => (
                  <span
                    key={spec}
                    className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Expérience & Réalisations Professionnelles */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-slate-900">
          <Briefcase className="w-5 h-5 text-primary-600" />
          <h2 className="text-2xl font-heading font-bold">Expériences & Projets d&apos;Envergure</h2>
        </div>

        <div className="space-y-4">
          {PROFILE.experiences.map((exp, idx) => (
            <div
              key={idx}
              className="p-6 rounded-card bg-white border border-slate-200/90 shadow-card space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-xs font-mono font-bold text-accent-700">
                  {exp.period}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {exp.organization}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-heading font-bold text-slate-900">
                  {exp.role}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {exp.context}
                </p>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {exp.highlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 flex flex-wrap gap-1.5 border-t border-slate-100">
                {exp.skills.map((sk) => (
                  <span
                    key={sk}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Engagement Associatif & Collectif */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <Users className="w-5 h-5 text-primary-600" />
          <h2 className="text-2xl font-heading font-bold">Engagement Associatif & Collectif</h2>
        </div>
        <div className="p-6 rounded-card bg-white border border-slate-200/90 shadow-card space-y-3">
          <h3 className="text-base font-heading font-bold text-slate-900">
            {PROFILE.association.title}
          </h3>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {PROFILE.association.description}
          </p>
          <div className="pt-2">
            <Link
              href="/projects/cestom"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800"
            >
              <span>Voir le projet CESTOM Frontend</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Manière de Travailler */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <ShieldCheck className="w-5 h-5 text-accent-600" />
          <h2 className="text-2xl font-heading font-bold">Manière de Travailler</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PROFILE.workMethod.map((wm, i) => (
            <div key={i} className="p-5 rounded-card bg-white border border-slate-200/90 shadow-card space-y-2">
              <span className="text-xs font-mono font-bold text-slate-400">0{i + 1}</span>
              <h3 className="text-base font-heading font-bold text-slate-900">
                {wm.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {wm.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA to Contact */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-lg">
        <div className="space-y-1">
          <h3 className="text-lg font-heading font-bold">
            Discutons d&apos;une opportunité de stage
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Disponible pour un PFA de 2e année. Échangeons sur vos enjeux Data & SI.
          </p>
        </div>
        <Button
          href="/contact"
          variant="accent"
          size="md"
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="shrink-0"
        >
          Me contacter
        </Button>
      </div>

    </div>
  );
}

