import { ArrowUpRight, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { PROFILE } from '@/data/profile';

export function HomeContactSection() {
  const t = useTranslations('home.contact');
  const whatsappUrl = `https://wa.me/${PROFILE.contact.phone.replace(/\D/g, '')}`;

  return (
    <section
      className="bg-[var(--bg-main)] px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
      aria-labelledby="home-contact-heading"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-xl bg-primary-950 px-6 py-7 text-white shadow-card sm:px-9 sm:py-9 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-coral-200">
            {t('eyebrow')}
          </p>
          <h2
            id="home-contact-heading"
            className="mt-2 font-heading text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl"
          >
            {t('heading')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
            {t('description')}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${PROFILE.contact.email}`}
            className="motion-control inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-bold text-primary-900 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-950"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {t('email')}
          </a>
          <a
            href={PROFILE.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="motion-control inline-flex min-h-11 items-center gap-2 rounded-md border border-white/35 px-4 py-2.5 text-sm font-bold text-white hover:border-white/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-950"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
            {t('linkedin')}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="motion-control inline-flex min-h-11 items-center gap-2 rounded-md border border-white/35 px-4 py-2.5 text-sm font-bold text-white hover:border-white/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-950"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {t('whatsapp')}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
