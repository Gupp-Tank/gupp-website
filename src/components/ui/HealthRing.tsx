import { useCountUp } from '../../hooks/useCountUp'
import './HealthRing.css'

interface HealthRingProps {
  score: number
  size?: number
  strokeWidth?: number
  label: string
  showScale?: boolean
  tone?: 'primary' | 'coral'
}

export function HealthRing({ score, size = 72, strokeWidth = 7, label, showScale = false, tone = 'primary' }: HealthRingProps) {
  const value = useCountUp(score, 1600, 400)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - value / 100)

  return (
    <div className={`health-ring health-ring--${tone}`} style={{ width: size, height: size }} role="img" aria-label={label}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <circle className="health-ring__track" cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} />
        <circle
          className="health-ring__value"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="health-ring__number" aria-hidden>
        {value}
        {showScale && <small className="health-ring__scale">/100</small>}
      </span>
    </div>
  )
}
