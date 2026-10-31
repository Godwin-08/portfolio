import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
  localeDetection: false,
  pathnames: {
    '/': '/',
    '/about': {
      fr: '/a-propos',
      en: '/about'
    },
    '/projects': {
      fr: '/projets',
      en: '/projects'
    },
    '/projects/[slug]': {
      fr: '/projets/[slug]',
      en: '/projects/[slug]'
    },
    '/certifications': {
      fr: '/certifications',
      en: '/certifications'
    },
    '/certifications/[slug]': {
      fr: '/certifications/[slug]',
      en: '/certifications/[slug]'
    },
    '/contact': '/contact'
  }
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
