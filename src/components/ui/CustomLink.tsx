import React from 'react';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type LocalizedHref = React.ComponentProps<typeof Link>['href'];
type CustomLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & (
  | { href: LocalizedHref; isExternal?: false }
  | { href: string; isExternal: true }
) & {
  showIcon?: boolean;
  variant?: 'primary' | 'muted' | 'subtle';
};

export const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  isExternal,
  showIcon = false,
  variant = 'primary',
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    primary: 'text-primary-700 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-semibold underline-offset-4 hover:underline',
    muted: 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium',
    subtle: 'text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors',
  };

  const combinedClasses = cn(
    'inline-flex items-center gap-1 transition-colors duration-150',
    variantStyles[variant],
    className
  );

  if (isExternal === true) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
        {...props}
      >
        <span>{children}</span>
        {showIcon && <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClasses} {...props}>
      <span>{children}</span>
      {showIcon && <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />}
    </Link>
  );
};

