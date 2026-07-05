import type { PropsWithChildren } from 'react';

import clsx from 'clsx';

type BadgeProps = PropsWithChildren<{
  className?: string;
}>;

export function Badge({ children, className }: BadgeProps) {
  return <span className={clsx('badge', className)}>{children}</span>;
}