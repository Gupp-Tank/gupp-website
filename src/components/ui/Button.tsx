import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Icon, type IconName } from './Icon'
import './Button.css'

export type ButtonVariant = 'primary' | 'ghost'
export type ButtonSize = 'md' | 'sm'

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  trailingIcon?: IconName
  external?: boolean
  children: ReactNode
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  trailingIcon,
  external = false,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, className].filter(Boolean).join(' ')

  return (
    <a
      className={classes}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...rest}
    >
      <span>{children}</span>
      {trailingIcon && <Icon name={trailingIcon} size={18} className="btn__icon" />}
    </a>
  )
}
