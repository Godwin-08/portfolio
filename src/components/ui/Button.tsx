import React from 'react';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

type LocalizedHref = React.ComponentProps<typeof Link>['href'];
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
} & (
  | { href?: undefined; isExternal?: false }
  | { href: LocalizedHref; isExternal?: false }
  | { href: string; isExternal?: false }
  | { href: string; isExternal: true }
);

function isMailtoHref(href: LocalizedHref | string): href is string {
  return typeof href === 'string' && href.startsWith('mailto:');
}

function isLocalizedHref(href: LocalizedHref | string): href is LocalizedHref {
  return typeof href !== 'string' || href.startsWith('/');
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  href,
  isExternal,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-btn transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 shadow-sm',
  };

  const variantStyles = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm hover:shadow-md hover:-translate-y-0.5',
    secondary:
      'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5',
    accent:
      'bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-500 shadow-sm hover:shadow-md hover:-translate-y-0.5',
    outline:
      'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 focus:ring-primary-500 hover:-translate-y-0.5',
    ghost:
      'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-400',
  };

  const content = (
    <>
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </>
  );

  const combinedClasses = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

  if (href) {
    if (isExternal === true) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }
    if (isMailtoHref(href)) {
      return (
        <a href={href} className={combinedClasses}>
          {content}
        </a>
      );
    }
    if (isLocalizedHref(href)) return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
    return <a href={href} className={combinedClasses}>{content}</a>;
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
};

