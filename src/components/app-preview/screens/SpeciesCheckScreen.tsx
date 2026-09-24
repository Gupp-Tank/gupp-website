import type { SpeciesCheckView } from '../../../types/deviceViews'
import { Card } from '../../ui/Card'
import { Icon } from '../../ui/Icon'
import { IconTile } from './IconTile'
import { ScreenHeader } from './ScreenHeader'
import './DeviceScreen.css'

export function SpeciesCheckScreen({ view }: { view: SpeciesCheckView }) {
  return (
    <div className="dv-screen">
      <ScreenHeader title={view.header} subtitle={view.subtitle} />

      <div className="dv-body dv-body--roomy">
        <div className="dv-species">
          <IconTile icon={view.icon} tone="blue" size="lg" />
          <span className="dv-species__text">
            <span className="dv-species__name">{view.name}</span>
            <span className="dv-species__scientific">{view.scientific}</span>
          </span>
        </div>

        <Card className="dv-card">
          <dl className="dv-stats dv-stats--grid">
            {view.stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <div className="dv-verdict">
          <Icon name="check" size={14} />
          {view.verdict}
        </div>

        <Card className="dv-card">
          <h3 className="dv-card__title">{view.residentsTitle}</h3>
          <ul className="dv-list dv-list--tight">
            {view.residents.map((resident) => (
              <li key={resident.id} className="dv-resident">
                <span>{resident.name}</span>
                <Icon name="check" size={13} />
              </li>
            ))}
          </ul>
        </Card>

        <Card className="dv-quantity">
          <span className="dv-row__title">{view.quantityLabel}</span>
          <span className="dv-stepper">
            <span className="dv-stepper__btn">–</span>
            <span className="dv-stepper__value">{view.quantity}</span>
            <span className="dv-stepper__btn">+</span>
          </span>
        </Card>
      </div>

      <div className="dv-footer">
        <span className="dv-cta">{view.ctaLabel}</span>
      </div>
    </div>
  )
}
