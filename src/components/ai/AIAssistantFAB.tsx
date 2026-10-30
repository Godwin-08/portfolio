'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';
import { useAIAssistant } from './AIAssistantContext';

export function AIAssistantFAB() {
  const { openAssistant } = useAIAssistant();
  const t = useTranslations('aiAssistant');

  return (
    <div className="fixed bottom-4 right-4 z-40 max-[359px]:bottom-2 max-[359px]:right-1 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={() => openAssistant()}
        aria-label={t('trigger')}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-primary-700 p-0 text-white shadow-lg ring-1 ring-primary-800/30 transition-all duration-200 hover:bg-primary-800 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 active:scale-95 dark:focus-visible:ring-offset-slate-900 max-[359px]:h-10 max-[359px]:w-10 sm:h-auto sm:w-auto sm:gap-2.5 sm:rounded-2xl sm:px-4 sm:py-3"
      >
        {/* Icône animée */}
        <span className="flex h-5 w-5 items-center justify-center">
          <Sparkles
            className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
            aria-hidden="true"
          />
        </span>

        {/* Label visible sur desktop, masqué sur mobile si trop étroit */}
        <span className="hidden text-xs font-semibold tracking-wide sm:inline sm:text-sm">
          {t('trigger')}
        </span>

        {/* Dot animé pour attirer l'œil discrètement */}
        <span
          className="absolute -top-1 -right-1 flex h-3 w-3"
          aria-hidden="true"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-300 opacity-60" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-primary-400" />
        </span>
      </button>
    </div>
  );
}
