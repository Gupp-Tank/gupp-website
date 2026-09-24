import type { TankDetailView } from '../../../types/deviceViews'
import { Card } from '../../ui/Card'
import { HealthRing } from '../../ui/HealthRing'
import { Icon } from '../../ui/Icon'
import { AppBottomNav } from '../AppBottomNav'
import { IconTile } from './IconTile'
import { ScreenHeader } from './ScreenHeader'
import '../AppHomeScreen.css'
import './DeviceScreen.css'

export function TankDetailScreen({ view }: { view: TankDetailView }) {
  return (
    <div className="dv-screen app-home">
      <ScreenHeader title={view.title} subtitle={view.subtitle} menu />

      <div className="dv-body dv-body--tank">
        <Card className="dv-summary">
          <HealthRing score={view.score} size={46} strokeWidth={5} label={view.scoreLabel} />
          <div className="dv-summary__info">
            <span className="dv-row__detail">{view.summary}</span>
            <dl className="dv-stats dv-stats--inline">
              {view.stats.map((stat) => (
                <div key={stat.label}>
                  <dd>{stat.value}</dd>
                  <dt>{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </Card>

        <div className="dv-filters">
          {view.filters.map((filter) => (
            <span key={filter.id} className={['dv-filter', filter.active && 'is-active'].filter(Boolean).join(' ')}>
              {filter.icon && <Icon name={filter.icon} size={13} />}
              {filter.label}
              <span className="dv-filter__count">{filter.count}</span>
            </span>
          ))}
        </div>

        <div className="dv-viewbar">
          <span className="dv-row__detail">{view.countLine}</span>
          <span className="dv-toggle">
            <span className="dv-toggle__btn is-active">
              <Icon name="list" size={13} />
            </span>
            <span className="dv-toggle__btn">
              <Icon name="grid" size={13} />
            </span>
          </span>
        </div>

        {view.groups.map((group) => (
          <section key={group.id} className="dv-group">
            <div className="dv-group__head">
              <h3 className="dv-card__title">{group.label}</h3>
              <span className="dv-row__detail">{group.summary}</span>
            </div>
            <ul className="dv-list">
              {group.rows.map((row) => (
                <li key={row.id} className="dv-livestock">
                  <IconTile icon={row.icon} tone={row.tone} size="sm" />
                  <span className="dv-livestock__name">{row.name}</span>
                  <span className="dv-livestock__qty">{row.quantity}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <span className="dv-fab">
        <Icon name="plus" size={15} strokeWidth={2.4} />
        {view.addLabel}
      </span>

      <AppBottomNav items={view.nav} />
    </div>
  )
}
