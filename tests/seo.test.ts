import { describe, expect, it } from 'vitest';
import { buildLocalizedPageMetadata } from '@/lib/seo';
import { getPathname } from '@/i18n/routing';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import { CERTIFICATIONS } from '@/data/certifications';
import { PROJECTS } from '@/data/projects';

const projectSlugs = PROJECTS.map((project) => project.slug);
const locales = ['fr', 'en'] as const;
const staticHrefs = [
  '/',
  '/about',
  '/projects',
  '/certifications',
  '/contact',
] as const;

describe('Localized SEO metadata', () => {
  it('resolves canonical and alternate language paths through next-intl for all public pages', () => {
    const siteUrl = new URL('http://localhost:3214');
    for (const href of staticHrefs) {
      for (const locale of locales) {
        const metadata = buildLocalizedPageMetadata({
          locale,
          href,
          title: `${locale} page`,
          description: `${locale} description`,
          siteName: 'Portfolio test local',
          image: '/images/godwin-portrait.jpg',
          siteUrl,
        });
        const pathname = getPathname({ locale, href });
        const pathnameFr = getPathname({ locale: 'fr', href });
        const pathnameEn = getPathname({ locale: 'en', href });

        expect(metadata.alternates?.canonical).toEqual(new URL(pathname, siteUrl));
        expect(metadata.alternates?.languages).toMatchObject({
          fr: new URL(pathnameFr, siteUrl).toString(),
          en: new URL(pathnameEn, siteUrl).toString(),
          'x-default': new URL(pathnameFr, siteUrl).toString(),
        });
        expect(metadata.openGraph).toMatchObject({
          title: `${locale} page | Portfolio test local`,
          description: `${locale} description`,
          url: new URL(pathname, siteUrl),
          locale: locale === 'fr' ? 'fr_FR' : 'en_US',
          alternateLocale: locale === 'fr' ? 'en_US' : 'fr_FR',
        });
        expect(metadata.twitter).toMatchObject({
          card: 'summary_large_image',
          description: `${locale} description`,
          images: [new URL('/images/godwin-portrait.jpg', siteUrl)],
        });
      }
    }

    for (const slug of projectSlugs) {
      const href = { pathname: '/projects/[slug]' as const, params: { slug } };
      for (const locale of ['fr', 'en'] as const) {
        const metadata = buildLocalizedPageMetadata({
          locale,
          href,
          title: `${locale} ${slug}`,
          description: `${locale} description`,
          siteName: 'Portfolio test local',
          siteUrl,
        });

        expect(metadata.alternates?.canonical).toEqual(
          new URL(getPathname({ locale, href }), siteUrl)
        );
        expect(metadata.openGraph?.url).toEqual(new URL(getPathname({ locale, href }), siteUrl));
      }
    }
  });

  it('handles sitemap and robots cleanly when NEXT_PUBLIC_SITE_URL is not set', () => {
    const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.NEXT_PUBLIC_SITE_URL;

    try {
      const entries = sitemap();
      expect(entries).toEqual([]);

      const robotRules = robots();
      expect(robotRules.rules).toBeDefined();
      expect(robotRules.sitemap).toBeUndefined();
    } finally {
      if (originalEnv) {
        process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
      }
    }
  });

  it('generates each published localized route exactly once when NEXT_PUBLIC_SITE_URL is configured', () => {
    const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_SITE_URL = 'https://godwin-portfolio.example.com';

    try {
      const entries = sitemap();
      const urls = entries.map((e) => e.url);
      const expectedPaths = [
        ...staticHrefs.flatMap((href) =>
          locales.map((locale) => getPathname({ locale, href }))
        ),
        ...PROJECTS.flatMap((project) =>
          locales.map((locale) =>
            getPathname({
              locale,
              href: {
                pathname: '/projects/[slug]',
                params: { slug: project.slug },
              },
            })
          )
        ),
        ...CERTIFICATIONS.flatMap((certification) =>
          locales.map((locale) =>
            getPathname({
              locale,
              href: {
                pathname: '/certifications/[slug]',
                params: { slug: certification.id },
              },
            })
          )
        ),
      ];
      const expectedUrls = expectedPaths.map(
        (pathname) => `https://godwin-portfolio.example.com${pathname}`
      );

      expect(urls).toHaveLength(expectedUrls.length);
      expect(new Set(urls).size).toBe(urls.length);
      expect([...urls].sort()).toEqual([...expectedUrls].sort());

      for (const url of urls) {
        const parsed = new URL(url);
        expect(parsed.origin).toBe('https://godwin-portfolio.example.com');
        expect(parsed.search).toBe('');
        expect(parsed.hash).toBe('');
      }

      const robotRules = robots();
      expect(robotRules.sitemap).toBe('https://godwin-portfolio.example.com/sitemap.xml');
    } finally {
      if (originalEnv) {
        process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
      } else {
        delete process.env.NEXT_PUBLIC_SITE_URL;
      }
    }
  });
});
