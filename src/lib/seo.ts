import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getPathname } from '@/i18n/routing';

type LocalizedHref = Parameters<typeof getPathname>[0]['href'];

export function getSiteUrl(): URL | undefined {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configuredUrl) return undefined;

  try {
    const url = new URL(configuredUrl);
    const isLocalDevelopmentHost = ['localhost', '127.0.0.1'].includes(url.hostname);
    if (!['https:', 'http:'].includes(url.protocol) || (url.protocol !== 'https:' && !isLocalDevelopmentHost)) {
      return undefined;
    }

    return new URL(url.origin);
  } catch {
    return undefined;
  }
}

export function buildLocalizedPageMetadata({
  locale,
  href,
  title,
  description,
  siteName,
  image,
  siteUrl = getSiteUrl(),
}: {
  locale: Locale;
  href: LocalizedHref;
  title: string;
  description: string;
  siteName: string;
  image?: string;
  siteUrl?: URL;
}): Metadata {
  const pathname = getPathname({ locale, href });
  const pathnameFr = getPathname({ locale: 'fr', href });
  const pathnameEn = getPathname({ locale: 'en', href });
  const pageUrl = siteUrl ? new URL(pathname, siteUrl) : undefined;
  const frUrl = siteUrl ? new URL(pathnameFr, siteUrl) : undefined;
  const enUrl = siteUrl ? new URL(pathnameEn, siteUrl) : undefined;
  const imageUrl = siteUrl && image ? new URL(image, siteUrl) : undefined;
  const isFrench = locale === 'fr';

  return {
    title,
    description,
    ...(pageUrl
      ? {
          alternates: {
            canonical: pageUrl,
            languages: {
              fr: frUrl ? frUrl.toString() : pathnameFr,
              en: enUrl ? enUrl.toString() : pathnameEn,
              'x-default': frUrl ? frUrl.toString() : pathnameFr,
            },
          },
        }
      : {}),
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      siteName,
      type: 'website',
      locale: isFrench ? 'fr_FR' : 'en_US',
      alternateLocale: isFrench ? 'en_US' : 'fr_FR',
      ...(pageUrl ? { url: pageUrl } : {}),
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteName}`,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}
