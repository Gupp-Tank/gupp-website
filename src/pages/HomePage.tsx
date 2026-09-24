import { useI18n } from '../hooks/useI18n'
import { useSeo } from '../hooks/useSeo'
import { Hero } from '../sections/hero/Hero'
import { FeaturesSection } from '../sections/features/FeaturesSection'

export function HomePage() {
  const { locale, t } = useI18n()
  useSeo({ locale, path: '', title: t.meta.title, description: t.meta.description })

  return (
    <>
      <Hero content={t.hero} preview={t.appPreview} visualCopy={t.heroVisual} />
      <FeaturesSection heading={t.modules.heading} modules={t.modules.items} views={t.deviceViews} preview={t.appPreview} />
    </>
  )
}
