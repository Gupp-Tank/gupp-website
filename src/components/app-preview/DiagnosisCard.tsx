import type { DiagnosisPreview } from '../../types/appPreview'
import { Card } from '../ui/Card'
import { Sparkline } from '../ui/Sparkline'
import './InsightCards.css'

interface DiagnosisCardProps {
  diagnosis: DiagnosisPreview
  className?: string
}

export function DiagnosisCard({ diagnosis, className }: DiagnosisCardProps) {
  return (
    <Card as="article" elevation="float" className={['insight-card diagnosis-card', className].filter(Boolean).join(' ')}>
      <header className="insight-card__header">
        <span className="diagnosis-card__thumb" aria-hidden>
          <img src="/branding/icon.png" alt="" width={34} height={34} />
          <svg className="diagnosis-card__spots" viewBox="0 0 52 52">
            <circle cx="23" cy="21" r="1.8" />
            <circle cx="30" cy="29" r="1.5" />
            <circle cx="21" cy="32" r="1.3" />
          </svg>
        </span>
        <div>
          <p className="insight-card__eyebrow">{diagnosis.timestamp}</p>
          <h3 className="insight-card__title">{diagnosis.condition}</h3>
        </div>
      </header>

      <div className="diagnosis-card__cause">
        <div>
          <p className="insight-card__eyebrow">{diagnosis.causeLabel}</p>
          <p className="diagnosis-card__cause-text">{diagnosis.cause}</p>
        </div>
        <Sparkline
          className="diagnosis-card__trend"
          points={diagnosis.trend}
          width={84}
          height={34}
          label={diagnosis.trendLabel}
        />
      </div>

      <p className="insight-card__body">{diagnosis.recommendation}</p>
      <span className="diagnosis-card__action">{diagnosis.actionLabel}</span>
    </Card>
  )
}
