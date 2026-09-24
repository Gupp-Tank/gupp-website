import { SiteHeader } from '../components/layout/SiteHeader'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useI18n } from '../hooks/useI18n'
import { Hero } from '../sections/hero/Hero'
import { ModulesSection } from '../sections/modules/ModulesSection'

export function HomePage() {
  const { locale, t, setLocale } = useI18n()
  useDocumentMeta(t.meta.title, t.meta.description)

  return (
    <>
      <SiteHeader copy={t.header} locale={locale} onLocaleChange={setLocale} />
      <main>
        <Hero content={t.hero} preview={t.appPreview} visualCopy={t.heroVisual} />
        <ModulesSection heading={t.modules.heading} modules={t.modules.items} />
      </main>
    </>
  )
}
