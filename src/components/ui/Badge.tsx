import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'accent' | 'neutral' | 'outline' | 'pfa';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'neutral',
  size = 'md',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium transition-colors';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 rounded-full',
    md: 'text-xs px-3 py-1 rounded-full',
    lg: 'text-sm px-3.5 py-1.5 rounded-full',
  };

  const variantStyles = {
    primary: 'bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200/70 dark:border-primary-800',
    accent: 'bg-accent-50 dark:bg-accent-950/60 text-accent-700 dark:text-accent-300 border border-accent-200/70 dark:border-accent-800',
    neutral: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700',
    outline: 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700',
    pfa: 'bg-coral-50 dark:bg-coral-950/60 text-coral-900 dark:text-coral-300 border border-coral-200 dark:border-coral-800 font-semibold',
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
};

