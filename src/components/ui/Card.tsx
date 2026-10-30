import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  variant?: 'default' | 'muted' | 'outline';
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  hoverEffect = false,
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 shadow-card',
    muted: 'bg-slate-50 dark:bg-slate-800 border-slate-200/70 dark:border-slate-800',
    outline: 'bg-transparent border-slate-200 dark:border-slate-800',
  };

  return (
    <div
      className={cn(
        'rounded-card border transition-all duration-200 overflow-hidden',
        variantStyles[variant],
        hoverEffect && 'hover:shadow-card-hover hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800', className)} {...props}>
      {children}
    </div>
  );
};

export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('p-5 sm:p-6 space-y-4', className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('p-5 sm:p-6 pt-0 border-t border-slate-100 dark:border-slate-800 mt-auto', className)} {...props}>
      {children}
    </div>
  );
};
