import type { AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from 'react';

import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type BaseProps = PropsWithChildren<{
  variant?: ButtonVariant;
  className?: string;
}>;

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  const classes = clsx('button', `button--${variant}`, className);

  if ('href' in props && props.href) {
    return (
      <a className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}