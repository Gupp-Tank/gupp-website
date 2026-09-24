import { useRef } from 'react'
import { Link } from 'react-router'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import type { MobileMenu } from '../../hooks/useMobileMenu'
import { useScrolled } from '../../hooks/useScrolled'
import { cx } from '../../lib/classNames'
import type { Locale } from '../../i18n/locales'
import type { HeaderCopy } from '../../types/content'
import { Logo } from '../ui/Logo'
import { PreferenceControls } from '../ui/PreferenceControls'
import { MenuButton } from './MenuButton'
import { SiteNav } from './SiteNav'
import './SiteHeader.css'

interface SiteHeaderProps {
  copy: HeaderCopy
  homeHref: string
  locale: Locale
  onLocaleChange: (locale: Locale) => void
  activeSection: string | null
  menu: MobileMenu
}

export function SiteHeader({ copy, homeHref, locale, onLocaleChange, activeSection, menu }: SiteHeaderProps) {
  const scrolled = useScrolled()
  const headerRef = useRef<HTMLElement>(null)
  useFocusTrap(headerRef, menu.open)

  return (
    <header ref={headerRef} className={cx('site-header', scrolled && 'is-scrolled', menu.open && 'is-menu-open')}>
      <div className="site-header__inner">
        <Link to={homeHref} className="site-header__brand" aria-label={copy.homeLabel} onClick={() => menu.close()}>
          <Logo height={44} />
        </Link>

        <SiteNav className="site-nav--bar" links={copy.links} label={copy.navLabel} activeId={activeSection} />

        <div className="site-header__actions">
          <PreferenceControls className="site-header__prefs" copy={copy} locale={locale} onLocaleChange={onLocaleChange} />
          <MenuButton
            ref={menu.buttonRef}
            open={menu.open}
            controls={menu.panelId}
            openLabel={copy.menuOpen}
            closeLabel={copy.menuClose}
            onClick={menu.toggle}
          />
        </div>
      </div>

      {menu.open && <div className="site-header__scrim" aria-hidden onClick={() => menu.close()} />}
      <div ref={menu.panelRef} id={menu.panelId} hidden={!menu.open} className="site-panel">
        <SiteNav links={copy.links} label={copy.navLabel} activeId={activeSection} onNavigate={() => menu.close()} />
        {/* Screens too narrow for the header to hold them (<= 340px) get the controls here instead. */}
        <PreferenceControls className="site-panel__prefs" copy={copy} locale={locale} onLocaleChange={onLocaleChange} />
      </div>
    </header>
  )
}
