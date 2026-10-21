'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
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
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('common.language');
  const router = useRouter();
  const params = useParams();

  // Déterminer la langue active depuis l'URL (défaut FR, préfixe /en pour l'anglais)
  const currentLocale: 'fr' | 'en' = locale === 'en' ? 'en' : 'fr';

  const switchLocale = (newLocale: 'fr' | 'en') => {
    if (newLocale === currentLocale) return;
    const query = Object.fromEntries(new URLSearchParams(window.location.search).entries());

    if (pathname === '/projects/[slug]') {
      const slug = params.slug;
      if (typeof slug !== 'string') return;
      router.replace({ pathname, params: { slug }, query }, { locale: newLocale });
      return;
    }
    router.replace({ pathname, query }, { locale: newLocale });
  };

  return (
    <div
      role="group"
      aria-label={t('selectorLabel')}
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
        aria-label={t('switchToFrench')}
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
        aria-label={t('switchToEnglish')}
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

