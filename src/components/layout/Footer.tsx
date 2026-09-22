import React from 'react';
import Link from 'next/link';
import { PROFILE } from '@/data/profile';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Leitmotif */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <h3 className="font-heading font-bold text-lg text-slate-900">
                {PROFILE.name}
              </h3>
              <p className="text-sm text-slate-500 mt-0.5">
                {PROFILE.title}
              </p>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              Une approche d’ingénieur guidée par la rigueur scientifique :{' '}
              <span className="font-semibold text-slate-900">
                {PROFILE.tagline}
              </span>
              . La démonstration par les résultats chiffrés et la validation empirique.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={PROFILE.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PROFILE.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PROFILE.contact.email}`}
                aria-label="Email"
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-accent-600 hover:border-accent-200 hover:bg-accent-50 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Rapide */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary-600 transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-primary-600 transition-colors"
                >
                  Tous les projets
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/gtm"
                  className="hover:text-primary-600 transition-colors"
                >
                  Étude de cas : GTM (Référence)
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/olist"
                  className="hover:text-primary-600 transition-colors"
                >
                  Étude de cas : Olist
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary-600 transition-colors"
                >
                  À propos & Parcours
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Statut & Disponibilité */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Opportunité
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-900">
                  {PROFILE.badge}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-normal">
                Ouvert aux opportunités de stage PFA orientées Data Analysis, Data Engineering & Machine Learning.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} {PROFILE.name}. Portfolio conçu avec Next.js & Tailwind CSS.
          </p>
          <div className="flex items-center space-x-4">
            <span>{PROFILE.corePhilosophy}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

