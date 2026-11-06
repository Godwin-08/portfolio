import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { FileText, Github, Linkedin, Mail, MessageCircle, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { EmailLink } from '@/components/ui/EmailLink';
import { PROFILE } from '@/data/profile';
import { buildLocalizedPageMetadata } from '@/lib/seo';

interface ContactPageProps {
  params: Promise<{ locale: 'fr' | 'en' }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return buildLocalizedPageMetadata({
    locale,
    href: '/contact',
    title: t('contact.title'),
    description: t('contact.description'),
    siteName: t('siteName'),
    image: '/images/godwin-portrait.jpg',
  });
}

export default async function ContactPage() {
  const t = await getTranslations('contact');
  const common = await getTranslations('common');
  const phoneNumber = PROFILE.contact.phone.replace(/[\s()-]/g, '');
  const whatsappUrl = `https://wa.me/${PROFILE.contact.phone.replace(/\D/g, '')}`;

  const links = [
    { label: t('email'), detail: t('emailDetail'), href: `mailto:${PROFILE.contact.email}`, icon: Mail, primary: true },
    { label: t('phone'), detail: PROFILE.contact.phone, href: `tel:${phoneNumber}`, icon: Phone },
    { label: t('whatsapp'), detail: PROFILE.contact.phone, href: whatsappUrl, icon: MessageCircle, external: true },
    { label: t('linkedin'), detail: t('linkedinDetail'), href: PROFILE.contact.linkedin, icon: Linkedin, external: true },
    { label: t('github'), detail: t('githubDetail'), href: PROFILE.contact.github, icon: Github, external: true },
    { label: t('cv'), detail: t('cvDetail'), href: '/cv/CV_Godwin_Nougbolo.pdf', icon: FileText, external: true },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12 md:space-y-16">
      <header className="max-w-3xl space-y-6">
        <div className="flex flex-wrap gap-2">
          <Badge variant="pfa" size="md">{common('badge')}</Badge>
          <Badge variant="neutral" size="md">{common('primaryFocus')}</Badge>
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-400">{t('eyebrow')}</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold leading-[1.08] tracking-tight text-slate-900 dark:text-white">{t('title')}</h1>
        <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">{t('intro')}</p>
      </header>

      <section aria-label={t('contactLinks')} className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
        <h2 className="sr-only">{t('contactLinks')}</h2>
        {links.map(({ label, detail, href, icon: Icon, external, primary }) => {
          const className = `group rounded-2xl border p-5 sm:p-6 transition-all hover:shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
            primary
              ? 'border-primary-200/90 dark:border-primary-800/80 bg-primary-50/70 dark:bg-primary-950/40 hover:bg-primary-50 dark:hover:bg-primary-950/60'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-800/60'
          }`;
          const content = (
            <>
              <div className={`inline-flex items-center justify-center p-2 rounded-lg ${
                primary
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/60 dark:text-primary-300'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}>
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-base font-heading font-bold text-slate-900 dark:text-white">{label}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {detail}
                {external && <span className="sr-only"> {t('externalNewTab')}</span>}
              </p>
            </>
          );

          return primary ? (
            <EmailLink
              key={label}
              email={PROFILE.contact.email}
              className={className}
            >
              {content}
            </EmailLink>
          ) : (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className={className}
            >
              {content}
            </a>
          );
        })}
      </section>

      <section className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-6 sm:p-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-accent-700 dark:text-accent-400">{t('focus')}</p>
          <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">{t('focusText')}</p>
        </div>
      </section>
    </div>
  );
}
