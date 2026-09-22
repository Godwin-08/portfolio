import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PROFILE } from '@/data/profile';

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

export const metadata: Metadata = {
  title: `${PROFILE.name} — Portfolio Ingénieur IID | Data Analysis & Engineering`,
  description: `${PROFILE.title}. Recherche de PFA 2e année. Spécialisation Data Analysis, Data Engineering et Machine Learning. « ${PROFILE.tagline} ».`,
  keywords: [
    'Godwin Elie Nougbolo',
    'Data Analysis',
    'Data Engineering',
    'Machine Learning',
    'Ingénieur IID',
    'PFA 2e année',
    'Python',
    'Pandas',
    'SQL',
    'Flask',
    'Statistiques',
  ],
  authors: [{ name: PROFILE.name }],
  creator: PROFILE.name,
  openGraph: {
    title: `${PROFILE.name} — Portfolio Professionnel`,
    description: `${PROFILE.title} • Recherche PFA 2e année`,
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary-100 selection:text-primary-900 antialiased">
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
