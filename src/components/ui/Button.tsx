import { Link } from 'react-router'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import type { IconName } from '../../types/icon'
import { Icon } from './Icon'
import './Button.css'

export type ButtonVariant = 'primary' | 'ghost'
export type ButtonSize = 'md' | 'sm'

interface ButtonStyleProps {
  variant?: ButtonVariant
  size?: ButtonSize
  trailingIcon?: IconName
  children: ReactNode
}

const buttonClasses = (variant: ButtonVariant, size: ButtonSize, className?: string) =>
  ['btn', `btn--${variant}`, `btn--${size}`, className].filter(Boolean).join(' ')

function ButtonContent({ trailingIcon, children }: Pick<ButtonStyleProps, 'trailingIcon' | 'children'>) {
  return (
    <>
      <span>{children}</span>
      {trailingIcon && <Icon name={trailingIcon} size={18} className="btn__icon" />}
    </>
  )
}

interface ButtonLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'>, ButtonStyleProps {
  external?: boolean
  /** In-app route (client-side navigation). Use `href` for anchors and external URLs. */
  to?: string
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  trailingIcon,
  external = false,
  to,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  if (to !== undefined) {
    return (
      <Link to={to} className={buttonClasses(variant, size, className)} {...rest}>
        <ButtonContent trailingIcon={trailingIcon}>{children}</ButtonContent>
      </Link>
    )
  }

  return (
    <a
      className={buttonClasses(variant, size, className)}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...rest}
    >
      <ButtonContent trailingIcon={trailingIcon}>{children}</ButtonContent>
    </a>
  )
}

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>, ButtonStyleProps {}

export function Button({ variant = 'primary', size = 'md', trailingIcon, className, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      <ButtonContent trailingIcon={trailingIcon}>{children}</ButtonContent>
    </button>
  )
}
