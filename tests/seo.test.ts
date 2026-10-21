import { describe, expect, it } from 'vitest';
import { buildLocalizedPageMetadata } from '@/lib/seo';
import { getPathname } from '@/i18n/routing';

const projectSlugs = [
  'gtm',
  'olist',
  'afc',
  'revision-flow',
  'sante-scolaire',
  'novastore',
] as const;

describe('Localized SEO metadata', () => {
  it('resolves canonical paths through next-intl for all public pages', () => {
    const siteUrl = new URL('http://localhost:3214');
    const staticHrefs = ['/', '/about', '/projects', '/contact'] as const;

    for (const href of staticHrefs) {
      for (const locale of ['fr', 'en'] as const) {
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

        expect(metadata.alternates?.canonical).toEqual(new URL(pathname, siteUrl));
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
});
