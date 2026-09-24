import type { HTMLAttributes } from 'react'
import { cx } from '../../lib/classNames'
import './Section.css'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** id of the heading that names this section (required for a landmark). */
  labelledBy: string
}

// A page section: a labelled landmark that in-page links can target without
// hiding under the sticky header. Put a <Container> inside for the content column.
export function Section({ labelledBy, className, ...rest }: SectionProps) {
  return <section aria-labelledby={labelledBy} className={cx('section', className)} {...rest} />
}
