import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

export const AboutTransition: React.FC = () => {
  const t = useTranslations('home.aboutTransition');
  return (
    <section className="bg-white py-12 md:py-16" aria-label={t('label')}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-l-[5px] border-coral-500 bg-lilac-50 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-9 sm:py-8">
          <div className="max-w-2xl">
              <p className="font-heading text-xl font-extrabold leading-snug text-ink sm:text-2xl">
                {t('heading')}
              </p>
              <p className="mt-2 text-base leading-relaxed text-body">
                {t('description')}
              </p>
          </div>
          <Link
            href="/about"
            className="group inline-flex min-h-11 shrink-0 items-center gap-2 border-b-2 border-primary-700 text-base font-bold text-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700"
          >
            <span>{t('link')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

