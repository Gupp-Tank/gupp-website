import { createElement, type HTMLAttributes } from 'react'
import { cx } from '../../lib/classNames'
import './Heading.css'

export type HeadingLevel = 1 | 2 | 3 | 4
export type HeadingSize = 'display' | 'section' | 'card'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Document outline: h1..h4. Pick it for structure, not looks. */
  level: HeadingLevel
  /** Visual scale, independent of `level`. */
  size: HeadingSize
}

export function Heading({ level, size, className, ...rest }: HeadingProps) {
  return createElement(`h${level}`, { className: cx('heading', `heading--${size}`, className), ...rest })
}
