import type { QuickAction } from '../../types/appPreview'
import { Icon } from '../ui/Icon'

interface QuickActionCardProps {
  action: QuickAction
}

export function QuickActionCard({ action }: QuickActionCardProps) {
  return (
    <span className={`quick-card quick-card--${action.tone}`}>
      <span className="quick-card__label">{action.label}</span>
      <Icon name={action.icon} size={40} strokeWidth={1.6} className="quick-card__icon" />
    </span>
  )
}
