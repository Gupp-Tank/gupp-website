import type { DiagnosisResultView } from '../../../types/deviceViews'
import { Card } from '../../ui/Card'
import { HealthRing } from '../../ui/HealthRing'
import { Sparkline } from '../../ui/Sparkline'
import { IconTile } from './IconTile'
import { ScreenHeader } from './ScreenHeader'
import './DeviceScreen.css'

export function DiagnosisResultScreen({ view }: { view: DiagnosisResultView }) {
  return (
    <div className="dv-screen">
      <ScreenHeader title={view.header} />

      <div className="dv-body">
        <div className="dv-finding">
          <div className="dv-finding__text">
            <span className="dv-pill">{view.urgency}</span>
            <span className="dv-finding__title">{view.condition}</span>
            <span className="dv-finding__context">{view.context}</span>
          </div>
          <div className="dv-finding__confidence">
            <HealthRing score={view.confidence} size={52} strokeWidth={5} tone="coral" label={`${view.confidenceLabel}: ${view.confidence} %`} />
            <span className="dv-finding__confidence-label">{view.confidenceLabel}</span>
          </div>
        </div>

        <Card className="dv-card">
          <h3 className="dv-card__title">{view.evidenceTitle}</h3>
          <ul className="dv-list">
            {view.evidence.map((item) => (
              <li key={item.id} className="dv-row">
                <IconTile icon={item.icon} tone={item.tone} />
                <span className="dv-row__text">
                  <span className="dv-row__title">{item.title}</span>
                  <span className="dv-row__detail">{item.detail}</span>
                </span>
                {item.trend && item.trendLabel && <Sparkline className="dv-row__trend" points={item.trend} width={44} height={22} label={item.trendLabel} />}
              </li>
            ))}
          </ul>
        </Card>

        <div className="dv-steps">
          <h3 className="dv-card__title">{view.stepsTitle}</h3>
          <ol className="dv-list">
            {view.steps.map((step, index) => (
              <li key={step.id} className="dv-step">
                <span className="dv-step__number">{index + 1}</span>
                <span className="dv-row__text">
                  <span className="dv-row__title">{step.title}</span>
                  <span className="dv-row__detail">{step.detail}</span>
                </span>
                {step.actionLabel && <span className="dv-chip">{step.actionLabel}</span>}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="dv-footer">
        <span className="dv-cta">{view.primaryLabel}</span>
      </div>
    </div>
  )
}
