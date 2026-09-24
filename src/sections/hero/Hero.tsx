import { lazy, Suspense } from 'react'
import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import type { AppPreviewData } from '../../types/appPreview'
import type { HeroContent, HeroVisualCopy } from '../../types/content'
import { HeroCopy } from './HeroCopy'
import { HeroVisual } from './HeroVisual'
import { ReadingTicker } from './ReadingTicker'
import './Hero.css'

// Decorative and not needed for first paint: its own chunk, fetched after the hero renders.
const WaterCaustics = lazy(() => import('../../components/effects/WaterCaustics').then((m) => ({ default: m.WaterCaustics })))

interface HeroProps {
  content: HeroContent
  preview: AppPreviewData
  visualCopy: HeroVisualCopy
}

export function Hero({ content, preview, visualCopy }: HeroProps) {
  return (
    <Section className="hero" labelledBy="hero-title">
      <Suspense fallback={null}>
        <WaterCaustics className="hero__caustics" />
      </Suspense>
      <Container className="hero__inner">
        <HeroCopy
          content={content}
          eyebrow={<ReadingTicker tankName={preview.tank.name} parameters={preview.parameters} />}
        />
        <HeroVisual preview={preview} copy={visualCopy} />
      </Container>
    </Section>
  )
}
