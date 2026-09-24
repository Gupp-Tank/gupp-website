import type { HTMLAttributes } from 'react'
import { cx } from '../../lib/classNames'
import './Container.css'

// The page's content column: centered, capped at --page-max, with the gutter
// on the spacing scale. It owns only inline padding; vertical rhythm belongs
// to the caller (`padding-block`), so the two never fight over the shorthand.
export function Container({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('container', className)} {...rest} />
}
