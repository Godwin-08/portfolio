import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSkillSlug(skill: string): string {
  return skill.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
}

