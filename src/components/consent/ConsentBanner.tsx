import { Link } from 'react-router'
import type { ConsentCopy } from '../../types/consent'
import './ConsentBanner.css'

interface ConsentBannerProps {
  copy: ConsentCopy['banner']
  privacyHref: string
  onAccept: () => void
  onReject: () => void
  onCustomize: () => void
}

// Not a dialog: it does not trap focus or block the page. Accept, reject and customize look the same on purpose.
export function ConsentBanner({ copy, privacyHref, onAccept, onReject, onCustomize }: ConsentBannerProps) {
  return (
    <section className="consent-banner" aria-label={copy.label}>
      <div className="consent-banner__copy">
        <p className="consent-banner__title">{copy.title}</p>
        <p className="consent-banner__text">
          {copy.text} <Link to={privacyHref}>{copy.policyLink}</Link>
        </p>
      </div>
      <div className="consent-banner__actions">
        <button type="button" className="consent-btn" onClick={onAccept}>
          {copy.accept}
        </button>
        <button type="button" className="consent-btn" onClick={onReject}>
          {copy.reject}
        </button>
        <button type="button" className="consent-btn" onClick={onCustomize}>
          {copy.customize}
        </button>
      </div>
    </section>
  )
}
