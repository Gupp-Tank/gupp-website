import { Outlet, useLocation } from 'react-router'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useI18n } from '../../hooks/useI18n'
import { useLocalePath } from '../../hooks/useLocalePath'
import { useMobileMenu } from '../../hooks/useMobileMenu'
import { useSwitchLocale } from '../../hooks/useSwitchLocale'
import { SiteHeader } from './SiteHeader'

// Chrome shared by every page (header today; footer joins here). Pages render
// only their own content into the Outlet.
export function SiteLayout() {
  const { locale, t } = useI18n()
  const { pathname } = useLocation()
  const localePath = useLocalePath()
  const switchLocale = useSwitchLocale()
  const menu = useMobileMenu()

  const sectionIds = t.header.links.filter((link) => link.href.startsWith('#')).map((link) => link.href.slice(1))
  const activeSection = useActiveSection(sectionIds, pathname)

  return (
    <>
      <SiteHeader
        copy={t.header}
        homeHref={localePath()}
        locale={locale}
        onLocaleChange={switchLocale}
        activeSection={activeSection}
        menu={menu}
      />
      {/* While the menu is open the page behind it is inert: no focus, no clicks, hidden from assistive tech. */}
      <main inert={menu.open}>
        <Outlet />
      </main>
    </>
  )
}
