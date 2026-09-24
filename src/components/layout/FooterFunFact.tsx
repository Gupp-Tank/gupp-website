import { useFunFact } from '../../hooks/useFunFact'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'
import './FooterFunFact.css'

interface FooterFunFactProps {
  label: string
  actionLabel: string
  facts: string[]
}

export function FooterFunFact({ label, actionLabel, facts }: FooterFunFactProps) {
  const { fact, next, hasMore } = useFunFact(facts)
  if (!fact) return null

  return (
    <Card as="aside" className="fun-fact" aria-label={label}>
      <p className="fun-fact__label">
        <span className="fun-fact__icon">
          <Icon name="sparkle" size={16} />
        </span>
        {label}
      </p>
      {/* Polite live region: a screen reader announces the new fact after the button is pressed. */}
      <p className="fun-fact__text" aria-live="polite">
        {fact}
      </p>
      {hasMore && (
        <Button variant="ghost" size="sm" trailingIcon="arrowRight" onClick={next} className="fun-fact__action">
          {actionLabel}
        </Button>
      )}
    </Card>
  )
}
