import type { PropsWithChildren } from 'react';

import clsx from 'clsx';

type CardProps = PropsWithChildren<{
  onClick?: () => void;
  className?: string;
}>;

export function Card({ children, className, onClick }: CardProps) {
  return <article onClick={onClick} className={clsx('card', className)}>{children}</article>;
}