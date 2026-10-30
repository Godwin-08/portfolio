'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { PROFILE } from '@/data/profile';
import { EmailLink } from '@/components/ui/EmailLink';
import { Link, usePathname } from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function Footer() {
  const pathname = usePathname();
  const common = useTranslations('common');
  const footer = useTranslations('common.footer');
  const nav = useTranslations('common.nav');
  const language = useTranslations('common.language');
  const theme = useTranslations('common.theme');
  const accessibility = useTranslations('common.accessibility');
  const year = new Date().getFullYear();
  const contactLinks = [
    { href: `mailto:${PROFILE.contact.email}`, text: PROFILE.contact.email, icon: Mail, email: PROFILE.contact.email },
    { href: PROFILE.contact.linkedin, text: 'LinkedIn', icon: Linkedin, external: true },
    { href: PROFILE.contact.github, text: 'GitHub', icon: Github, external: true },
  ];
  const navigationLinks = [
    { key: 'home', href: '/' },
    { key: 'projects', href: '/projects' },
    { key: 'about', href: '/about' },
    { key: 'contact', href: '/contact' },
  ] as const;

  return (
    <footer aria-label={footer('label')} className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        {pathname !== '/contact' && (
          <div className="mb-9 rounded-2xl border border-primary-200/80 bg-primary-50/70 p-5 dark:border-primary-900/80 dark:bg-primary-950/30 sm:p-7 md:flex md:items-center md:justify-between md:gap-8">
            <p className="max-w-2xl font-heading text-base font-semibold leading-relaxed text-slate-900 dark:text-white sm:text-lg">
              {footer('invitation')}
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:bg-primary-600 dark:hover:bg-primary-500 md:mt-0 md:w-auto"
            >
              {footer('contactCta')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 border-b border-slate-100 pb-8 dark:border-slate-800 md:grid-cols-3 md:gap-10">
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">{footer('profileHeading')}</h2>
            <div className="space-y-1.5">
              <p className="font-heading font-extrabold text-base text-slate-900 dark:text-white">{common('name')}</p>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{footer('role')}</p>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{footer('locationMobility')}</p>
            </div>
            <a
              href="/cv/CV_Godwin_Nougbolo.pdf"
              download
              className="inline-flex min-h-11 items-center gap-2 rounded-md py-2 pr-3 text-sm text-slate-600 transition-colors hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-slate-300 dark:hover:text-primary-400"
            >
              <Download className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" aria-hidden="true" />
              {common('cta.downloadCv')}
            </a>
          </div>

          <nav aria-label={footer('navigationHeading')} className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">{footer('navigationHeading')}</h2>
            <ul className="space-y-1 text-sm">
              {navigationLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="inline-flex min-h-11 items-center rounded-md py-2 pr-3 text-slate-600 transition-colors hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-slate-300 dark:hover:text-primary-400"
                  >
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">{footer('contactHeading')}</h2>
            <ul className="space-y-1 text-sm">
              {contactLinks.map(({ href, text, icon: Icon, external, email }) => (
                <li key={text}>
                  {email ? (
                    <EmailLink
                      email={email}
                      className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-md py-2 pr-3 text-slate-600 transition-colors hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-slate-300 dark:hover:text-primary-400"
                    >
                      <Icon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                      <span className="break-all">{text}</span>
                    </EmailLink>
                  ) : (
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="inline-flex min-h-11 items-center gap-2 rounded-md py-2 pr-3 text-slate-600 transition-colors hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-slate-300 dark:hover:text-primary-400"
                    >
                      <Icon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                      <span>{text}</span>
                      {external && <span className="sr-only">{accessibility('externalNewTab')}</span>}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-6 text-xs text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {common('name')}. {footer('copyright')}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-600 dark:text-slate-300">{language('label')}</span>
              <LanguageSwitcher variant="footer" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-600 dark:text-slate-300">{theme('label')}</span>
              <ThemeToggle variant="footer" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
