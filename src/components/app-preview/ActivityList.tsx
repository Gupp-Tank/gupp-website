import type { ActivityItem } from '../../types/appPreview'
import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'

interface ActivityListProps {
  items: ActivityItem[]
}

export function ActivityList({ items }: ActivityListProps) {
  return (
    <div className="activity-list">
      {items.map((item) => (
        <Card key={item.id} radius="md" className={`activity-card activity-card--${item.kind}`}>
          <span className="activity-card__icon">
            <Icon name={item.kind === 'done' ? 'check' : 'plus'} size={14} strokeWidth={2.6} />
          </span>
          <span className="activity-card__title">{item.title}</span>
          <span className="app-caption">{item.when}</span>
        </Card>
      ))}
    </div>
  )
}
