'use client';

import { usePathname } from 'next/navigation';
import { FileText, Github, Linkedin, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PROFILE } from '@/data/profile';

const content = {
  fr: { eyebrow: 'Contact', title: 'Échangeons autour d’un projet concret.', intro: 'Je recherche actuellement un PFA de deuxième année, avec un intérêt prioritaire pour la Data Analysis, puis la Data Engineering. Le Machine Learning fait partie des domaines que je continue à développer.', focus: 'Recherche actuelle', email: 'Me contacter par email', linkedin: 'Voir mon LinkedIn', github: 'Voir mon GitHub', cv: 'Télécharger mon CV', emailDetail: 'Le moyen le plus direct pour échanger sur une opportunité ou un projet.', linkedinDetail: 'Parcours et profil professionnel.', githubDetail: 'Code source et projets publics.', external: '(nouvel onglet)' },
  en: { eyebrow: 'Contact', title: 'Let’s discuss a concrete project.', intro: 'I am currently looking for a second-year end-of-year project placement (PFA), with Data Analysis as my primary interest and Data Engineering as a second direction. Machine Learning is a field I continue to develop.', focus: 'Current focus', email: 'Contact me by email', linkedin: 'View my LinkedIn', github: 'View my GitHub', cv: 'Download my CV', emailDetail: 'The most direct way to discuss an opportunity or project.', linkedinDetail: 'Professional profile and background.', githubDetail: 'Source code and public projects.', external: '(opens in a new tab)' },
} as const;

export default function ContactPage() {
  const english = usePathname().startsWith('/en');
  const t = content[english ? 'en' : 'fr'];
  const links = [
    { label: t.email, detail: t.emailDetail, href: `mailto:${PROFILE.contact.email}`, icon: Mail, primary: true },
    { label: t.linkedin, detail: t.linkedinDetail, href: PROFILE.contact.linkedin, icon: Linkedin, external: true },
    { label: t.github, detail: t.githubDetail, href: PROFILE.contact.github, icon: Github, external: true },
  ];

  return <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24 space-y-16 md:space-y-20">
    <header className="max-w-3xl space-y-6"><div className="flex flex-wrap gap-2"><Badge variant="pfa" size="md">{PROFILE.badge}</Badge><Badge variant="neutral" size="md">{PROFILE.primaryFocus}</Badge></div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-700">{t.eyebrow}</p><h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold leading-[1.08] tracking-tight text-slate-900">{t.title}</h1><p className="text-base sm:text-lg leading-relaxed text-slate-600">{t.intro}</p></header>
    <section aria-labelledby="contact-links" className="grid md:grid-cols-3 gap-4 sm:gap-5"><h2 id="contact-links" className="sr-only">{t.eyebrow}</h2>{links.map(({ label, detail, href, icon: Icon, external, primary }) => <a key={label} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className={`group rounded-card border p-5 sm:p-6 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${primary ? 'border-primary-200 bg-primary-50/60 hover:bg-primary-50' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`}><Icon className={`w-5 h-5 ${primary ? 'text-primary-700' : 'text-slate-500'}`} aria-hidden="true" /><h3 className="mt-5 text-base font-heading font-bold text-slate-900">{label}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{detail}{external && <span className="sr-only"> {t.external}</span>}</p></a>)}</section>
    <section className="grid md:grid-cols-12 gap-8 md:items-center border-y border-slate-200 py-8 sm:py-10"><div className="md:col-span-7"><p className="text-xs font-bold uppercase tracking-wider text-accent-700">{t.focus}</p><p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{t.intro}</p></div><div className="md:col-span-5 md:justify-self-end"><Button href={PROFILE.contact.cvPath} isExternal variant="outline" size="md" leftIcon={<FileText className="w-4 h-4" />}>{t.cv}</Button></div></section>
    <div><Button href={`mailto:${PROFILE.contact.email}`} variant="primary" size="lg" leftIcon={<Mail className="w-4 h-4" />}>{t.email}</Button></div>
  </div>;
}
