import React from 'react';
import Link from 'next/link';
import { ArrowRight, User } from 'lucide-react';

export const AboutTransition: React.FC = () => {
  return (
    <section className="py-10 md:py-14" aria-label="Lien vers la page À propos">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-6 py-6 rounded-2xl border border-slate-200/80 bg-gradient-to-r from-slate-50 to-primary-50/40">
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <User className="w-5 h-5 text-primary-700" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Comprendre la démarche derrière les projets
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Parcours académique, expérience professionnelle et manière de travailler
              </p>
            </div>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm"
          >
            <span>Découvrir mon parcours</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};
