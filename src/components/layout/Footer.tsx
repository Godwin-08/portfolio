import React from 'react';
import Link from 'next/link';
import { PROFILE } from '@/data/profile';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Mail, Linkedin, Github, FileText, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer aria-label="Pied de page" className="border-t border-slate-200 bg-white text-slate-600 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Grille Principale */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-10 border-b border-slate-100">
          
          {/* Identité & Rôle (6 cols) */}
          <div className="md:col-span-6 space-y-3">
            <h2 className="font-heading font-extrabold text-lg text-slate-900 tracking-tight">
              {PROFILE.name}
            </h2>
            <p className="text-sm font-medium text-slate-600 max-w-md">
              Étudiant ingénieur · Informatique & Ingénierie des Données (IID)
            </p>
            <p className="text-xs text-slate-500 max-w-md leading-relaxed pt-1">
              Méthodologie orientée preuve : <span className="text-slate-800 font-semibold">{PROFILE.tagline}</span>. Conception de solutions logicielles et analytiques rigoureuses.
            </p>
          </div>

          {/* Liens Professionnels & Coordonnées (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Liens & Contact
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href={`mailto:${PROFILE.contact.email}`}
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-primary-700 transition-colors py-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  <span>Email : {PROFILE.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-primary-700 transition-colors py-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded"
                >
                  <Linkedin className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  <span>LinkedIn (Profil professionnel)</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-primary-700 transition-colors py-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded"
                >
                  <Github className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  <span>GitHub (Dépôts & code source)</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.contact.cvPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-primary-700 transition-colors py-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  <span>Curriculum Vitae (PDF)</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Langues (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Langue / Locale
            </h3>
            <LanguageSwitcher variant="footer" />
          </div>

        </div>

        {/* Barre Inférieure (Copyright) */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>
            © {currentYear} {PROFILE.name}. Tous droits réservés.
          </p>
          <div className="flex items-center space-x-2 text-[11px] text-slate-400">
            <span>{PROFILE.corePhilosophy}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
