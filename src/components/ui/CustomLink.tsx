import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  isExternal?: boolean;
  showIcon?: boolean;
  variant?: 'primary' | 'muted' | 'subtle';
}

export const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  isExternal = false,
  showIcon = false,
  variant = 'primary',
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    primary: 'text-primary-700 hover:text-primary-800 font-semibold underline-offset-4 hover:underline',
    muted: 'text-slate-600 hover:text-slate-900 font-medium',
    subtle: 'text-slate-500 hover:text-primary-600 transition-colors',
  };

  const combinedClasses = cn(
    'inline-flex items-center gap-1 transition-colors duration-150',
    variantStyles[variant],
    className
  );

  if (isExternal) {
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
