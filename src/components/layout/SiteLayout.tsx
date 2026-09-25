import { useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { links } from '../../content/links'
import { useConsent } from '../../hooks/useConsent'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useI18n } from '../../hooks/useI18n'
import { useLocalePath } from '../../hooks/useLocalePath'
import { useMobileMenu } from '../../hooks/useMobileMenu'
import { useScrollToTop } from '../../hooks/useScrollToTop'
import { useSwitchLocale } from '../../hooks/useSwitchLocale'
import { ConsentBanner } from '../consent/ConsentBanner'
import { ConsentPreferences } from '../consent/ConsentPreferences'
import { SiteFooter } from './SiteFooter'
import './SkipLink.css'
import { SiteHeader } from './SiteHeader'

// Chrome shared by every page (header and footer). Pages render
// only their own content into the Outlet.
export function SiteLayout() {
  const { locale, t } = useI18n()
  const { pathname, hash } = useLocation()
  const localePath = useLocalePath()
  const switchLocale = useSwitchLocale()
  const menu = useMobileMenu()
  useScrollToTop(pathname, hash)
  const consent = useConsent()
  const [preferencesOpen, setPreferencesOpen] = useState(false)
  const saveConsent = (analytics: boolean) => {
    consent.save(analytics)
    setPreferencesOpen(false)
  }
  const pageInert = menu.open || preferencesOpen

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
      <main id="main" tabIndex={-1} inert={pageInert}>
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
        inert={pageInert}
        cookieSettingsLabel={t.consent.footerLabel}
        onOpenCookieSettings={() => setPreferencesOpen(true)}
      />
      {consent.status === 'unset' && !preferencesOpen && (
        <ConsentBanner
          copy={t.consent.banner}
          privacyHref={localePath('/privacy')}
          onAccept={consent.acceptAll}
          onReject={consent.rejectAll}
          onCustomize={() => setPreferencesOpen(true)}
        />
      )}
      <ConsentPreferences
        copy={t.consent.preferences}
        open={preferencesOpen}
        analytics={consent.allows('analytics')}
        onSave={saveConsent}
        onClose={() => setPreferencesOpen(false)}
      />
    </>
  )
}
