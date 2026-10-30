import React from 'react';
import { cn } from '@/lib/utils';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
  clickable?: boolean;
  count?: number;
}

export const Tag: React.FC<TagProps> = ({
  children,
  active = false,
  clickable = false,
  count,
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-150',
        active
          ? 'bg-primary-600 text-white font-semibold shadow-xs'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700',
        clickable && !active && 'hover:bg-primary-50 dark:hover:bg-primary-950/50 hover:text-primary-700 dark:hover:text-primary-300 hover:border-primary-200 dark:hover:border-primary-800 cursor-pointer active:scale-95',
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {count !== undefined && (
        <span
          className={cn(
            'text-[10px] px-1 py-0.2 rounded',
            active ? 'bg-primary-700 text-white' : 'bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
          )}
        >
          {count}
        </span>
      )}
    </span>
  );
};

