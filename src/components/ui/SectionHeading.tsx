import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './Badge';

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  badgeVariant?: 'primary' | 'accent' | 'neutral' | 'pfa';
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeVariant = 'neutral',
  title,
  description,
  align = 'left',
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'space-y-3',
        align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left max-w-2xl',
        className
      )}
      {...props}
    >
      {badge && (
        <div className={cn('flex items-center', align === 'center' && 'justify-center')}>
          <Badge variant={badgeVariant} size="sm">
            {badge}
          </Badge>
        </div>
      )}
      
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.2]">
        {title}
      </h2>

      {description && (
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

