'use client';

import { usePathname } from 'next/navigation';
import { FileText, Github, Linkedin, Mail } from 'lucide-react';
import { PROFILE } from '@/data/profile';
import { LanguageSwitcher } from './LanguageSwitcher';

const labels = {
  fr: { role: 'Étudiant ingénieur · Informatique et Ingénierie des Données (IID)', links: 'Liens & contact', language: 'Langue', cv: 'Télécharger mon CV', copyright: 'Tous droits réservés.' },
  en: { role: 'Engineering student · Computer Science and Data Engineering (IID)', links: 'Links & contact', language: 'Language', cv: 'Download my CV', copyright: 'All rights reserved.' },
} as const;

export function Footer() {
  const english = usePathname().startsWith('/en');
  const t = labels[english ? 'en' : 'fr'];
  const year = new Date().getFullYear();
  const links = [
    { href: `mailto:${PROFILE.contact.email}`, text: PROFILE.contact.email, icon: Mail },
    { href: PROFILE.contact.linkedin, text: 'LinkedIn', icon: Linkedin, external: true },
    { href: PROFILE.contact.github, text: 'GitHub', icon: Github, external: true },
    { href: PROFILE.contact.cvPath, text: t.cv, icon: FileText, external: true },
  ];

  return <footer aria-label={t.links} className="border-t border-slate-200 bg-white text-slate-600">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-100">
        <div className="md:col-span-6 space-y-2"><h2 className="font-heading font-extrabold text-lg text-slate-900">{PROFILE.name}</h2><p className="max-w-md text-sm text-slate-600">{t.role}</p></div>
        <div className="md:col-span-4 space-y-3"><h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">{t.links}</h3><ul className="space-y-2 text-sm">{links.map(({ href, text, icon: Icon, external }) => <li key={text}><a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="inline-flex items-center gap-2 text-slate-600 hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"><Icon className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" /><span>{text}</span>{external && <span className="sr-only">{english ? ' (opens in a new tab)' : ' (nouvel onglet)'}</span>}</a></li>)}</ul></div>
        <div className="md:col-span-2 space-y-3"><h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">{t.language}</h3><LanguageSwitcher variant="footer" /></div>
      </div>
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500"><p>© {year} {PROFILE.name}. {t.copyright}</p><p>{PROFILE.corePhilosophy}</p></div>
    </div>
  </footer>;
}
