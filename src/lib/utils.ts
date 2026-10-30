import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isPublicAssetHref(href: string): boolean {
  const pathname = href.split(/[?#]/, 1)[0] ?? '';
  return pathname.startsWith('/') && /\.[a-z0-9]+$/i.test(pathname);
}

export function formatSkillSlug(skill: string): string {
  return skill.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
}

