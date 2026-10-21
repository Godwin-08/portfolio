import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
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
    '/contact': '/contact'
  }
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

