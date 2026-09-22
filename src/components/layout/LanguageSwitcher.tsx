'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  variant?: 'navbar' | 'footer';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'navbar',
  className,
}) => {
  const pathname = usePathname() || '/';
  const router = useRouter();

  // Déterminer la langue active depuis l'URL (défaut FR, préfixe /en pour l'anglais)
  const isEn = pathname.startsWith('/en');
  const currentLocale: 'fr' | 'en' = isEn ? 'en' : 'fr';

  const switchLocale = (newLocale: 'fr' | 'en') => {
    if (newLocale === currentLocale) return;

    let targetPath = pathname;
    if (newLocale === 'en') {
      if (!pathname.startsWith('/en')) {
        targetPath = pathname === '/' ? '/en' : `/en${pathname}`;
      }
    } else {
      if (pathname.startsWith('/en')) {
        targetPath = pathname.replace(/^\/en/, '') || '/';
      }
    }

    router.push(targetPath);
  };

  return (
    <div
      role="group"
      aria-label="Sélecteur de langue / Language selector"
      className={cn(
        'inline-flex items-center gap-1 p-1 rounded-lg border text-xs font-semibold select-none',
        variant === 'navbar'
          ? 'bg-slate-50/90 border-slate-200 text-slate-600'
          : 'bg-slate-100/90 border-slate-200/80 text-slate-600',
        className
      )}
    >
      <Globe className="w-3.5 h-3.5 text-slate-400 mx-1 shrink-0" aria-hidden="true" />
      
      <button
        type="button"
        onClick={() => switchLocale('fr')}
        aria-pressed={currentLocale === 'fr'}
        aria-label="Passer en Français"
        className={cn(
          'px-2 py-0.5 rounded-md transition-all duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 cursor-pointer',
          currentLocale === 'fr'
            ? 'bg-white text-primary-700 font-bold shadow-xs border border-slate-200/60'
            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
        )}
      >
        FR
      </button>

      <span className="text-slate-300 text-[10px]" aria-hidden="true">|</span>

      <button
        type="button"
        onClick={() => switchLocale('en')}
        aria-pressed={currentLocale === 'en'}
        aria-label="Switch to English"
        className={cn(
          'px-2 py-0.5 rounded-md transition-all duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 cursor-pointer',
          currentLocale === 'en'
            ? 'bg-white text-primary-700 font-bold shadow-xs border border-slate-200/60'
            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
        )}
      >
        EN
      </button>
    </div>
  );
};
