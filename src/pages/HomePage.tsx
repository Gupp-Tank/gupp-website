import { useI18n } from '../hooks/useI18n'
import { useSeo } from '../hooks/useSeo'
import { Hero } from '../sections/hero/Hero'
import { CtaSection } from '../sections/cta/CtaSection'
import { FaqSection } from '../sections/faq/FaqSection'
import { FeaturesSection } from '../sections/features/FeaturesSection'
import { PlansSection } from '../sections/plans/PlansSection'
import { HowItWorksSection } from '../sections/how-it-works/HowItWorksSection'

export function HomePage() {
  const { locale, t } = useI18n()
  useSeo({ locale, path: '', title: t.meta.title, description: t.meta.description, faq: t.faq.items })

  return (
    <>
      <Hero content={t.hero} preview={t.appPreview} visualCopy={t.heroVisual} />
      <FeaturesSection heading={t.modules.heading} modules={t.modules.items} views={t.deviceViews} preview={t.appPreview} />
      <HowItWorksSection {...t.howItWorks} />
      <PlansSection {...t.plans} />
      <FaqSection {...t.faq} />
      <CtaSection {...t.cta} />
    </>
  )
}
