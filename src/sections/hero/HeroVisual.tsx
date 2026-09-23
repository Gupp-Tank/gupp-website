import { AppHomeScreen } from '../../components/app-preview/AppHomeScreen'
import { CompatibilityCard } from '../../components/app-preview/CompatibilityCard'
import { DiagnosisCard } from '../../components/app-preview/DiagnosisCard'
import { PhoneFrame } from '../../components/app-preview/PhoneFrame'
import type { AppPreviewData } from '../../types/appPreview'
import type { HeroVisualCopy } from '../../types/content'

interface HeroVisualProps {
  preview: AppPreviewData
  copy: HeroVisualCopy
}

export function HeroVisual({ preview, copy }: HeroVisualProps) {
  const { diagnosis, compatibility, tank, ...home } = preview

  return (
    <div className="hero-visual" role="img" aria-label={copy.label}>
      <p className="hero-visual__note" aria-hidden>
        <span className="hero-visual__note-value">{copy.netVolume}</span>
        <span>{copy.netVolumeNote}</span>
        <svg className="hero-visual__leader" viewBox="0 0 80 48">
          <path d="M78 2 C 50 4, 28 18, 4 44" />
          <circle cx="4" cy="44" r="3" />
        </svg>
      </p>

      <PhoneFrame className="hero-visual__phone">
        <AppHomeScreen tank={tank} {...home} />
      </PhoneFrame>

      <CompatibilityCard compatibility={compatibility} className="hero-visual__compat" />
      <DiagnosisCard diagnosis={diagnosis} className="hero-visual__diagnosis" />
    </div>
  )
}
