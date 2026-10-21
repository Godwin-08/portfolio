import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import {notFound} from 'next/navigation';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import '../globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PROFILE } from '@/data/profile';
import {routing} from '@/i18n/routing';
import { getSiteUrl } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

interface LocaleLayoutProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  const siteName = t('siteName');
  const homeTitle = t('home.title');
  const homeDescription = t('home.description');
  const siteUrl = getSiteUrl();

  return {
    ...(siteUrl ? { metadataBase: siteUrl } : {}),
    title: {
      default: homeTitle,
      template: `%s | ${PROFILE.name}`,
    },
    description: homeDescription,
    authors: [{ name: PROFILE.name }],
    creator: PROFILE.name,
    openGraph: {
      title: `${homeTitle} | ${siteName}`,
      description: homeDescription,
      siteName,
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: locale === 'fr' ? 'en_US' : 'fr_FR',
      ...(siteUrl ? { images: [new URL('/images/godwin-portrait.jpg', siteUrl)] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${homeTitle} | ${siteName}`,
      description: homeDescription,
      ...(siteUrl ? { images: [new URL('/images/godwin-portrait.jpg', siteUrl)] } : {}),
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary-100 selection:text-primary-900 antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
