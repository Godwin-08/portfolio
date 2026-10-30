import type { MetadataRoute } from 'next';
import { PROJECTS } from '@/data/projects';
import { CERTIFICATIONS } from '@/data/certifications';
import { getPathname } from '@/i18n/routing';
import { getSiteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) {
    return [];
  }

  const baseUrl = siteUrl.origin;
  const locales = ['fr', 'en'] as const;
  const staticHrefs = ['/', '/about', '/projects', '/certifications', '/contact'] as const;

  const entries: MetadataRoute.Sitemap = [];

  // 1. Static pages (5 pages x 2 locales = 10 URLs)
  for (const href of staticHrefs) {
    for (const locale of locales) {
      const pathname = getPathname({ locale, href });
      entries.push({
        url: `${baseUrl}${pathname}`,
        lastModified: new Date('2026-10-28'),
        changeFrequency: href === '/' ? 'weekly' : 'monthly',
        priority: href === '/' ? 1.0 : 0.8,
      });
    }
  }

  // 2. Project case study pages (8 projects x 2 locales = 16 URLs)
  for (const project of PROJECTS) {
    for (const locale of locales) {
      const pathname = getPathname({
        locale,
        href: { pathname: '/projects/[slug]', params: { slug: project.slug } },
      });
      entries.push({
        url: `${baseUrl}${pathname}`,
        lastModified: new Date('2026-10-28'),
        changeFrequency: 'monthly',
        priority: 0.9,
      });
    }
  }

  // 3. Certification detail pages (7 DataCamp courses x 2 locales = 14 URLs)
  for (const cert of CERTIFICATIONS) {
    for (const locale of locales) {
      const pathname = getPathname({
        locale,
        href: { pathname: '/certifications/[slug]', params: { slug: cert.id } },
      });
      entries.push({
        url: `${baseUrl}${pathname}`,
        lastModified: new Date('2026-10-28'),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
