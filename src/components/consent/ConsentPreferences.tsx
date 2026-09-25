import { useId, useRef, useState } from 'react'
import { useModalDialog } from '../../hooks/useModalDialog'
import type { ConsentCopy } from '../../types/consent'
import { Icon } from '../ui/Icon'
import './ConsentBanner.css'

interface ConsentPreferencesProps {
  copy: ConsentCopy['preferences']
  open: boolean
  analytics: boolean
  onSave: (analytics: boolean) => void
  onClose: () => void
}

export function ConsentPreferences({ copy, open, analytics, onSave, onClose }: ConsentPreferencesProps) {
  // Reset the switch to the saved choice every time the dialog opens.
  return open ? <PreferencesDialog key="open" copy={copy} analytics={analytics} onSave={onSave} onClose={onClose} /> : null
}

function PreferencesDialog({ copy, analytics, onSave, onClose }: Omit<ConsentPreferencesProps, 'open'>) {
  const ref = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const [allowAnalytics, setAllowAnalytics] = useState(analytics)
  useModalDialog(ref, true, onClose)

  return (
    <div className="consent-overlay">
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1} className="consent-dialog">
        <div className="consent-dialog__head">
          <h2 id={titleId} className="consent-dialog__title">
            {copy.title}
          </h2>
          <button type="button" className="consent-dialog__close" aria-label={copy.close} onClick={onClose}>
            <Icon name="close" size={18} />
          </button>
        </div>
        <p className="consent-dialog__intro">{copy.intro}</p>

        <section className="consent-category" aria-labelledby={`${titleId}-essential`}>
          <div className="consent-category__head">
            <h3 id={`${titleId}-essential`}>{copy.essentialTitle}</h3>
            <span className="consent-category__state">{copy.alwaysOn}</span>
          </div>
          <p>{copy.essentialText}</p>
          <ul>
            {copy.essentialItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="consent-category" aria-labelledby={`${titleId}-analytics`}>
          <div className="consent-category__head">
            <h3 id={`${titleId}-analytics`}>{copy.analyticsTitle}</h3>
            <label className="consent-switch">
              <input type="checkbox" role="switch" checked={allowAnalytics} onChange={(event) => setAllowAnalytics(event.target.checked)} />
              <span className="consent-switch__track" aria-hidden />
              <span className="consent-switch__label">{copy.analyticsSwitchLabel}</span>
            </label>
          </div>
          <p>{copy.analyticsText}</p>
        </section>

        <div className="consent-dialog__actions">
          <button type="button" className="consent-btn" onClick={() => onSave(false)}>
            {copy.rejectAll}
          </button>
          <button type="button" className="consent-btn" onClick={() => onSave(true)}>
            {copy.acceptAll}
          </button>
          <button type="button" className="consent-btn" onClick={() => onSave(allowAnalytics)}>
            {copy.save}
          </button>
        </div>
      </div>
    </div>
  )
}
