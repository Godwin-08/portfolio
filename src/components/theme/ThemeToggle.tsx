'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'navbar' | 'footer' | 'inline';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className,
  variant = 'navbar',
}) => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const t = useTranslations('common.theme');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';
  const ariaLabel = isDark ? t('switchToLight') : t('switchToDark');

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={cn(
        'motion-control relative inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        variant === 'navbar' &&
          'p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200/80 dark:hover:border-slate-700',
        variant === 'footer' &&
          'p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg',
        variant === 'inline' &&
          'gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700',
        className
      )}
    >
      {/* Icon rendering with graceful placeholder while unmounted to prevent mismatch */}
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 rotate-0" aria-hidden="true" />
        ) : (
          <Moon className="h-4 w-4 text-slate-700 transition-transform duration-300 -rotate-12" aria-hidden="true" />
        )
      ) : (
        <span className="h-4 w-4 inline-block" aria-hidden="true" />
      )}
      <span className="sr-only">{ariaLabel}</span>
    </button>
  );
};
