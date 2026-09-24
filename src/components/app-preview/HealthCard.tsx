import type { WaterParameter } from '../../types/content'
import type { TankSummary } from '../../types/appPreview'
import { Card } from '../ui/Card'
import { HealthRing } from '../ui/HealthRing'

interface HealthCardProps {
  tank: TankSummary
  parameters: WaterParameter[]
}

export function HealthCard({ tank, parameters }: HealthCardProps) {
  return (
    <Card className="health-card">
      <div className="health-card__top">
        <HealthRing score={tank.healthScore} label={tank.healthRingLabel} size={56} strokeWidth={5} showScale />
        <div className="health-card__info">
          <p className="app-caption">{tank.lastReading}</p>
          <p className="health-card__params">
            {parameters.map((parameter) => (
              <span key={parameter.id} className={parameter.status === 'warning' ? 'is-warning' : undefined}>
                {parameter.value}
                {parameter.unit}
              </span>
            ))}
          </p>
        </div>
      </div>
      <span className="health-card__link">{tank.parametersLink}</span>
    </Card>
  )
}
