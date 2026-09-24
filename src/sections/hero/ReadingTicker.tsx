import { Icon } from '../../components/ui/Icon'
import type { WaterParameter } from '../../types/content'

interface ReadingTickerProps {
  tankName: string
  parameters: WaterParameter[]
}

export function ReadingTicker({ tankName, parameters }: ReadingTickerProps) {
  return (
    <p className="reading-ticker">
      <span className="reading-ticker__tank">{tankName}</span>
      {parameters.map((p) => (
        <span key={p.id} className={`reading-ticker__item reading-ticker__item--${p.status}`}>
          {p.label} {p.value}
          {p.unit && ` ${p.unit}`}
          {p.trendLabel && <Icon name="arrowUp" size={13} label={p.trendLabel} />}
        </span>
      ))}
    </p>
  )
}
