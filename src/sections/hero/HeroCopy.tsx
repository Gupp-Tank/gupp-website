import type { ReactNode } from 'react'
import { ButtonLink } from '../../components/ui/Button'
import type { HeroContent } from '../../types/content'

interface HeroCopyProps {
  content: HeroContent
  eyebrow: ReactNode
}

export function HeroCopy({ content, eyebrow }: HeroCopyProps) {
  const { headline, description, actions, facts } = content

  return (
    <div className="hero-copy">
      {eyebrow}

      <h1 id="hero-title" className="hero-copy__title">
        <span className="hero-copy__main">
          {headline.lead}{' '}
          <span className="hero-copy__nowrap">
            <em className="hero-copy__emphasis">
              {headline.emphasis}
              <svg className="hero-copy__underline" viewBox="0 0 120 18" preserveAspectRatio="none" aria-hidden>
                <path d="M3 12c20-6 44-9 70-7 16 1 30 3 44 6" pathLength={1} />
              </svg>
            </em>
            {headline.punctuation}
          </span>
        </span>
        {headline.tail && (
          <>
            {' '}
            <span className="hero-copy__tail">{headline.tail}</span>
          </>
        )}
      </h1>

      <p className="hero-copy__description">{description}</p>

      <div className="hero-copy__actions">
        {actions.map((action) => (
          <ButtonLink
            key={action.label}
            href={action.href}
            variant={action.variant}
            external={action.external}
            trailingIcon="arrowRight"
          >
            {action.label}
          </ButtonLink>
        ))}
      </div>

      <ul className="hero-copy__facts">
        {facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
    </div>
  )
}
