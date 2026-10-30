'use client';

import { useEffect } from 'react';

const revealSelector = 'main section:not([aria-labelledby="hero-heading"]), main article > header, main article > section';

export function PageMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const main = document.querySelector('main');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!main || reduceMotion.matches || !('IntersectionObserver' in window)) return;

    root.classList.add('has-scroll-motion');

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-scroll-motion', 'visible');
          reveal.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
    );

    const observeSections = () => {
      main.querySelectorAll<HTMLElement>(revealSelector).forEach((section, index) => {
        if (section.hasAttribute('data-scroll-motion')) return;
        section.setAttribute('data-scroll-motion', 'waiting');
        section.style.setProperty('--scroll-motion-delay', `${(index % 4) * 65}ms`);
        reveal.observe(section);
      });
    };

    observeSections();
    const mutations = new MutationObserver(observeSections);
    mutations.observe(main, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      reveal.disconnect();
      root.classList.remove('has-scroll-motion');
      main.querySelectorAll('[data-scroll-motion]').forEach((section) => {
        section.removeAttribute('data-scroll-motion');
        (section as HTMLElement).style.removeProperty('--scroll-motion-delay');
      });
    };
  }, []);

  return null;
}
