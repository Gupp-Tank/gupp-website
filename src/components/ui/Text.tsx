import type { HTMLAttributes } from 'react'
import { cx } from '../../lib/classNames'
import './Text.css'

export type TextSize = 'lead' | 'body'
export type TextTone = 'body' | 'muted' | 'default'

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: TextSize
  /** Color role: `body` for reading text, `muted` for secondary detail. */
  tone?: TextTone
}

export function Text({ size = 'body', tone = 'body', className, ...rest }: TextProps) {
  return <p className={cx('text', `text--size-${size}`, `text--tone-${tone}`, className)} {...rest} />
}
