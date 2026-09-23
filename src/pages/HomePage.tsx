import { SiteHeader } from '../components/layout/SiteHeader'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useI18n } from '../i18n/useI18n'
import { Hero } from '../sections/hero/Hero'
import { ModulesSection } from '../sections/modules/ModulesSection'

export function HomePage() {
  const { locale, t, setLocale } = useI18n()
  useDocumentMeta(t.meta.title, t.meta.description)

  const [primaryAction] = t.hero.actions

  return (
    <>
      <SiteHeader copy={t.header} cta={primaryAction} locale={locale} onLocaleChange={setLocale} />
      <main>
        <Hero content={t.hero} preview={t.appPreview} visualCopy={t.heroVisual} />
        <ModulesSection heading={t.modules.heading} modules={t.modules.items} />
      </main>
    </>
  )
}
