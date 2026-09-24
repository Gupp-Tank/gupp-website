import { siApple, siGoogleplay } from 'simple-icons'
import type { SVGProps } from 'react'

// Third-party marks (glyphs from simple-icons, CC0). They are the store owners'
// trademarks and the one place the icon rule "stroke only" does not apply: a
// brand mark has to look like the brand. Store marks only signal platform
// support, never as a download button.
const marks = {
  apple: { title: 'App Store', path: siApple.path },
  googlePlay: { title: 'Google Play', path: siGoogleplay.path },
} as const

export type BrandName = keyof typeof marks

interface BrandIconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: BrandName
  size?: number
  /** Hide from assistive tech when a parent (a link) already carries the name. */
  decorative?: boolean
}

export function BrandIcon({ name, size = 22, decorative = false, ...rest }: BrandIconProps) {
  const { title, path } = marks[name]
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': title })}
      {...rest}
    >
      <path d={path} />
    </svg>
  )
}
