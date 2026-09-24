import type { UpNextTask } from '../../types/appPreview'
import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'

interface UpNextCardProps {
  task: UpNextTask
}

export function UpNextCard({ task }: UpNextCardProps) {
  return (
    <section>
      <h4 className="app-home__section-title">{task.sectionLabel}</h4>
      <Card className="up-next">
        <span className="up-next__icon">
          <Icon name="sparkle" size={16} />
        </span>
        <div className="up-next__main">
          <p className="up-next__title">{task.title}</p>
          <p className="app-caption">{task.when}</p>
        </div>
        <span className="up-next__action">{task.actionLabel}</span>
      </Card>
    </section>
  )
}
