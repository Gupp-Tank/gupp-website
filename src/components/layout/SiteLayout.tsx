import { Outlet } from 'react-router'
import { useI18n } from '../../hooks/useI18n'
import { useLocalePath } from '../../hooks/useLocalePath'
import { useSwitchLocale } from '../../hooks/useSwitchLocale'
import { SiteHeader } from './SiteHeader'

// Chrome shared by every page (header today; footer joins here). Pages render
// only their own content into the Outlet.
export function SiteLayout() {
  const { locale, t } = useI18n()
  const localePath = useLocalePath()
  const switchLocale = useSwitchLocale()

  return (
    <>
      <SiteHeader copy={t.header} homeHref={localePath()} locale={locale} onLocaleChange={switchLocale} />
      <main>
        <Outlet />
      </main>
    </>
  )
}
