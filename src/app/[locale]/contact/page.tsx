import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Github, Linkedin, Mail, MessageCircle, Phone } from 'lucide-react';
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
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24 space-y-16 md:space-y-20">
      <header className="max-w-3xl space-y-6">
        <div className="flex flex-wrap gap-2">
          <Badge variant="pfa" size="md">{common('badge')}</Badge>
          <Badge variant="neutral" size="md">{common('primaryFocus')}</Badge>
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-400">{t('eyebrow')}</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold leading-[1.08] tracking-tight text-slate-900 dark:text-white">{t('title')}</h1>
        <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">{t('intro')}</p>
      </header>

      <section aria-label={t('contactLinks')} className="grid md:grid-cols-3 gap-4 sm:gap-5">
        <h2 className="sr-only">{t('contactLinks')}</h2>
        {links.map(({ label, detail, href, icon: Icon, external, primary }) => {
          const className = `group rounded-card border p-5 sm:p-6 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${primary ? 'border-primary-200 dark:border-primary-800 bg-primary-50/60 dark:bg-primary-950/40 hover:bg-primary-50 dark:hover:bg-primary-950/60' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'}`;
          const content = (
            <>
              <Icon className={`w-5 h-5 ${primary ? 'text-primary-700 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400'}`} aria-hidden="true" />
              <h3 className="mt-5 text-base font-heading font-bold text-slate-900 dark:text-white">{label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
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

      <section className="border-y border-slate-200 dark:border-slate-800 py-8 sm:py-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-accent-700 dark:text-accent-400">{t('focus')}</p>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">{t('focusText')}</p>
        </div>
      </section>

    </div>
  );
}
