import type { CompatibilityPreview } from '../../types/appPreview'
import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'
import './InsightCards.css'

interface CompatibilityCardProps {
  compatibility: CompatibilityPreview
  className?: string
}

export function CompatibilityCard({ compatibility, className }: CompatibilityCardProps) {
  return (
    <Card as="article" elevation="float" className={['insight-card compat-card', className].filter(Boolean).join(' ')}>
      <p className="insight-card__eyebrow compat-card__eyebrow">
        <Icon name="search" size={12} />
        {compatibility.label}
      </p>
      <div className="compat-card__head">
        <h3 className="insight-card__title">{compatibility.species}</h3>
        <span className="compat-card__verdict">{compatibility.verdict}</span>
      </div>
      <ul className="compat-card__checks">
        {compatibility.checks.map((check) => (
          <li key={check}>
            <Icon name="check" size={14} />
            {check}
          </li>
        ))}
      </ul>
    </Card>
  )
}
