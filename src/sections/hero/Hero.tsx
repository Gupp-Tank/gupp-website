import { WaterCaustics } from '../../components/effects/WaterCaustics'
import type { AppPreviewData } from '../../types/appPreview'
import type { HeroContent, HeroVisualCopy } from '../../types/content'
import { HeroCopy } from './HeroCopy'
import { HeroVisual } from './HeroVisual'
import { ReadingTicker } from './ReadingTicker'
import './Hero.css'

interface HeroProps {
  content: HeroContent
  preview: AppPreviewData
  visualCopy: HeroVisualCopy
}

export function Hero({ content, preview, visualCopy }: HeroProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <WaterCaustics className="hero__caustics" />
      <div className="hero__inner">
        <HeroCopy
          content={content}
          eyebrow={<ReadingTicker tankName={preview.tank.name} parameters={preview.parameters} />}
        />
        <HeroVisual preview={preview} copy={visualCopy} />
      </div>
    </section>
  )
}
