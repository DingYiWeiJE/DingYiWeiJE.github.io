import type { PropsWithChildren } from 'react';

import clsx from 'clsx';

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export function Card({ children, className }: CardProps) {
  return <article className={clsx('card', className)}>{children}</article>;
}