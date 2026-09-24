import type { ReactNode } from 'react'
import { cx } from '../../lib/classNames'
import { ButtonLink } from '../ui/Button'
import { Heading } from '../ui/Heading'
import { Text } from '../ui/Text'
import './CtaBand.css'

interface CtaBandProps {
  heading: string
  description: string
  headingId?: string
  /** The call to action itself (e.g. the early-access form). Without it, the fallback link is shown. */
  children?: ReactNode
  fallbackLabel: string
  fallbackHref: string
  className?: string
}

export function CtaBand({ heading, description, headingId, children, fallbackLabel, fallbackHref, className }: CtaBandProps) {
  return (
    <div className={cx('cta-band', className)}>
      <div className="cta-band__copy">
        <Heading level={2} size="section" id={headingId} className="cta-band__title">
          {heading}
        </Heading>
        <Text size="lead" className="cta-band__description">
          {description}
        </Text>
      </div>
      <div className="cta-band__action">
        {children ?? (
          <ButtonLink href={fallbackHref} trailingIcon="arrowRight">
            {fallbackLabel}
          </ButtonLink>
        )}
      </div>
    </div>
  )
}
