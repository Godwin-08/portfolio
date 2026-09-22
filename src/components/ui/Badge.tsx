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
    primary: 'bg-primary-50 text-primary-700 border border-primary-200/70',
    accent: 'bg-accent-50 text-accent-700 border border-accent-200/70',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200/80',
    outline: 'bg-white text-slate-600 border border-slate-300',
    pfa: 'bg-gradient-to-r from-primary-50 to-accent-50 text-slate-800 border border-primary-200/80 shadow-xs font-semibold',
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

