import { Outlet, useLocation } from 'react-router'
import { links } from '../../content/links'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useI18n } from '../../hooks/useI18n'
import { useLocalePath } from '../../hooks/useLocalePath'
import { useMobileMenu } from '../../hooks/useMobileMenu'
import { useSwitchLocale } from '../../hooks/useSwitchLocale'
import { SiteFooter } from './SiteFooter'
import './SkipLink.css'
import { SiteHeader } from './SiteHeader'

// Chrome shared by every page (header and footer). Pages render
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
      <a className="skip-link" href="#main">
        {t.header.skipLabel}
      </a>
      <SiteHeader
        copy={t.header}
        homeHref={localePath()}
        locale={locale}
        onLocaleChange={switchLocale}
        activeSection={activeSection}
        menu={menu}
      />
      {/* While the menu is open the page behind it is inert: no focus, no clicks, hidden from assistive tech. */}
      {/* tabIndex -1: the skip link can move focus here, so the next Tab starts inside the content. */}
      <main id="main" tabIndex={-1} inert={menu.open}>
        <Outlet />
      </main>
      <SiteFooter
        copy={t.footer}
        socials={[
          { name: 'instagram', label: t.footer.instagramLabel, href: links.instagram },
          { name: 'x', label: t.footer.xLabel, href: links.x },
        ]}
        modules={t.modules.items}
        highlights={t.hero.facts}
        preferencesCopy={t.header}
        locale={locale}
        onLocaleChange={switchLocale}
        homeLabel={t.header.homeLabel}
        localePath={localePath}
        inert={menu.open}
      />
    </>
  )
}
