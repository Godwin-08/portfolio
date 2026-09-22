import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

export const Container: React.FC<ContainerProps> = ({
  as: Component = 'div',
  size = 'default',
  className,
  children,
  ...props
}) => {
  const sizeClasses = {
    narrow: 'max-w-4xl',    // 896px - Idéal pour études de cas, articles, about
    default: 'max-w-6xl',   // 1152px - Largeur standard équilibrée
    wide: 'max-w-7xl',      // 1280px - Sections étendues
    full: 'max-w-full',
  };

  return (
    <Component
      className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeClasses[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
};

