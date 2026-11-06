'use client';

import { useTranslations } from 'next-intl';
import { FileText, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { PROFILE } from '@/data/profile';
import { EmailLink } from '@/components/ui/EmailLink';
import { Link } from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function Footer() {
  const common = useTranslations('common');
  const footer = useTranslations('common.footer');
  const nav = useTranslations('common.nav');
  const accessibility = useTranslations('common.accessibility');
  const year = new Date().getFullYear();
  const whatsappUrl = `https://wa.me/${PROFILE.contact.phone.replace(/\D/g, '')}`;

  const contactLinks = [
    { href: `mailto:${PROFILE.contact.email}`, label: 'Email', icon: Mail, email: PROFILE.contact.email },
    { href: whatsappUrl, label: 'WhatsApp', icon: MessageCircle, external: true },
    { href: PROFILE.contact.linkedin, label: 'LinkedIn', icon: Linkedin, external: true },
    { href: PROFILE.contact.github, label: 'GitHub', icon: Github, external: true },
  ];

  const navigationLinks = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { key: 'projects', href: '/projects' },
    { key: 'certifications', href: '/certifications' },
    { key: 'contact', href: '/contact' },
  ] as const;

  return (
    <footer
      aria-label={footer('label')}
      className="border-t border-slate-800 bg-[#080c14] text-slate-400 transition-colors"
    >
      {/* pb-28 sur mobile pour laisser respirer les boutons flottants (IA et Retour en haut), pb-10 sur desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-28 sm:pb-10 space-y-6">
        {/* Section 1 : Identité & Statut */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-heading font-extrabold text-base text-white tracking-tight">
                {common('name')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span>{common('badge')}</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              {footer('role')} · {footer('locationMobility')}
            </p>
          </div>

          {/* Boutons d'action rapides */}
          <div className="flex flex-wrap items-center gap-2">
            {contactLinks.map(({ href, label, icon: Icon, external, email }) => {
              const btnClass =
                'inline-flex items-center justify-center h-8.5 w-8.5 rounded-lg border border-slate-800 bg-slate-900/90 text-slate-300 transition-all hover:bg-slate-800 hover:text-white hover:border-slate-700 shadow-xs focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-500';

              return email ? (
                <EmailLink key={label} email={email} className={btnClass}>
                  <Icon className="w-3.5 h-3.5 text-primary-400" aria-hidden="true" />
                  <span className="sr-only">Email</span>
                </EmailLink>
              ) : (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className={btnClass}
                  aria-label={label}
                >
                  <Icon className="w-3.5 h-3.5 text-primary-400" aria-hidden="true" />
                  {external && <span className="sr-only"> {accessibility('externalNewTab')}</span>}
                </a>
              );
            })}

            <a
              href="/cv/CV_Godwin_Nougbolo.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 h-8.5 px-3 rounded-lg border border-slate-700 bg-slate-800/80 text-xs font-semibold text-slate-200 transition-all hover:bg-slate-700 hover:text-white hover:border-slate-500 shadow-xs"
            >
              <FileText className="h-3.5 w-3.5 text-primary-400" aria-hidden="true" />
              <span>{common('cta.downloadCv')}</span>
              <span className="sr-only"> {accessibility('externalNewTab')}</span>
            </a>
          </div>
        </div>

        {/* Section 2 : Navigation sous forme de capsules tactiles propres */}
        <nav
          aria-label={footer('navigationHeading')}
          className="flex flex-wrap items-center gap-2 pt-2"
        >
          {navigationLinks.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium text-slate-300 bg-slate-900/80 border border-slate-800 transition-colors hover:text-white hover:bg-slate-800 hover:border-slate-700 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-500"
            >
              {nav(key)}
            </Link>
          ))}
        </nav>

        {/* Section 3 : Copyright et Sélecteurs */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-400">
          <p>© {year} {common('name')}. {footer('copyright')}</p>
          <div className="flex items-center gap-2">
            <LanguageSwitcher variant="footer" />
            <ThemeToggle variant="footer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
