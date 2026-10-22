'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { PROFILE } from '@/data/profile';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Linkedin, Github, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations('common');
  const nav = useTranslations('common.nav');
  const accessibility = useTranslations('common.accessibility');

  const navLinks = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { key: 'projects', href: '/projects' },
    { key: 'contact', href: '/contact' },
  ] as const;

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Fermer avec la touche Échap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-md focus:shadow-md focus:outline-none"
      >
        {accessibility('skipToContent')}
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* 1. Gauche : Identité & Nom */}
          <Link
            href="/"
            aria-label={accessibility('homeLink', { name: t('name') })}
            className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md py-1"
          >
            <span className="font-heading font-extrabold text-base sm:text-lg text-slate-900 tracking-tight group-hover:text-primary-600 transition-colors">
              {t('name')}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide">
              {t('role')}
            </span>
          </Link>

          {/* 2. Centre : Navigation Principale (Desktop) */}
          <nav
            aria-label={nav('mainLabel')}
            className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-50/70 p-1 rounded-xl border border-slate-200/70"
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                    active
                      ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  )}
                >
                  <span>{nav(link.key)}</span>
                  {active && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary-600 rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 3. Droite : FR/EN + LinkedIn + GitHub (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Sélecteur FR / EN */}
            <LanguageSwitcher variant="navbar" />

            <div className="h-4 w-px bg-slate-200 mx-1" aria-hidden="true" />

            {/* LinkedIn */}
            <a
              href={PROFILE.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={accessibility('linkedinProfile', { name: t('name') })}
              className="p-2 rounded-lg text-slate-600 hover:text-primary-700 hover:bg-slate-100 border border-transparent hover:border-slate-200/80 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <Linkedin className="w-4 h-4" aria-hidden="true" />
            </a>

            {/* GitHub */}
            <a
              href={PROFILE.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={accessibility('githubProfile', { name: t('name') })}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent hover:border-slate-200/80 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {/* 4. Bouton Menu Mobile (Accessible) */}
          <div className="flex md:hidden items-center space-x-2">
            <LanguageSwitcher variant="navbar" />
            
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? accessibility('closeMenu') : accessibility('openMenu')}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* 5. Menu Déroulant Mobile */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="region"
          aria-label={accessibility('mobileMenu')}
          className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <nav aria-label={nav('mobileLabel')} className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between',
                    active
                      ? 'bg-primary-50 text-primary-700 font-bold border-l-4 border-primary-600'
                      : 'text-slate-700 hover:bg-slate-50'
                  )}
                >
                  <span>{nav(link.key)}</span>
                  {active && (
                    <span className="text-xs font-semibold text-primary-600" aria-hidden="true">
                      {nav('active')}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Liens réseaux dans le menu mobile */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-around">
            <a
              href={PROFILE.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 hover:text-primary-700 p-2"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href={PROFILE.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 hover:text-slate-900 p-2"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      )}

    </header>
  );
};
