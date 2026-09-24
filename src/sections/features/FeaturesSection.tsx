import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { DeviceView } from '../../components/app-preview/screens/DeviceView'
import { Heading } from '../../components/ui/Heading'
import { featureTabId, useFeatureTabs } from '../../hooks/useFeatureTabs'
import type { AppPreviewData } from '../../types/appPreview'
import type { ProductModule } from '../../types/content'
import type { DeviceViewsData } from '../../types/deviceViews'
import { FeatureTab } from './FeatureTab'
import './FeaturesSection.css'

interface FeaturesSectionProps {
  heading: string
  modules: ProductModule[]
  views: DeviceViewsData
  preview: AppPreviewData
}

// Keeps id="modules": header/footer links and the language switcher anchor to it.
export function FeaturesSection({ heading, modules, views, preview }: FeaturesSectionProps) {
  const slugs = modules.map((module) => module.slug)
  const { active, setActive, onKeyDown } = useFeatureTabs(slugs)
  const current = modules[active]

  return (
    <Section id="modules" labelledBy="modules-title">
      <Container className="features__inner">
        <Heading level={2} size="section" id="modules-title" className="features__title">
          {heading}
        </Heading>

        <div className="showcase">
          <div role="tablist" aria-orientation="vertical" aria-label={heading} className="showcase__tabs" onKeyDown={onKeyDown}>
            {modules.map((module, index) => (
              <FeatureTab key={module.slug} module={module} selected={index === active} onSelect={() => setActive(index)} />
            ))}
          </div>

          <div id="features-panel" role="tabpanel" aria-labelledby={featureTabId(current.slug)} className="showcase__stage">
            {current.view && <DeviceView key={current.slug} id={current.view} views={views} preview={preview} className="showcase__phone" />}
          </div>
        </div>
      </Container>
    </Section>
  )
}
