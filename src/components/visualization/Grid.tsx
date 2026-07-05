import type { ReactNode } from 'react';

interface GridProps {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'small' | 'medium' | 'large';
  children: ReactNode;
  className?: string;
}

const gapStyles = {
  small: 'gap-2',
  medium: 'gap-4',
  large: 'gap-6'
};

const colStyles = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  12: 'grid-cols-4 md:grid-cols-6 lg:grid-cols-12'
};

export function Grid({
  cols = 2,
  gap = 'medium',
  children,
  className = ''
}: GridProps) {
  return (
    <div className={`grid ${colStyles[cols]} ${gapStyles[gap]} ${className}`}>
      {children}
    </div>
  );
}
