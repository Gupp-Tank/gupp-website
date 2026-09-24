import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useI18n } from '../hooks/useI18n'
import { Hero } from '../sections/hero/Hero'
import { ModulesSection } from '../sections/modules/ModulesSection'

export function HomePage() {
  const { t } = useI18n()
  useDocumentMeta(t.meta.title, t.meta.description)

  return (
    <>
      <Hero content={t.hero} preview={t.appPreview} visualCopy={t.heroVisual} />
      <ModulesSection heading={t.modules.heading} modules={t.modules.items} />
    </>
  )
}
