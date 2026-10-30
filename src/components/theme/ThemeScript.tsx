'use client';

import React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { THEME_STORAGE_KEY } from './theme-constants';

export function ThemeScript() {
  const scriptContent = `
(function() {
  var stored = null;
  try {
    stored = localStorage.getItem('${THEME_STORAGE_KEY}');
  } catch (error) {
    console.warn('Unable to read the saved theme preference.', error);
  }
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (stored === 'dark' || (!stored && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();
  `.trim();

  useServerInsertedHTML(() => (
    <script
      id="portfolio-theme-initializer"
      dangerouslySetInnerHTML={{ __html: scriptContent }}
    />
  ));

  return null;
}
