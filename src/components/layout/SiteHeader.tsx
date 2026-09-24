import { Link } from 'react-router'
import { useScrolled } from '../../hooks/useScrolled'
import type { Locale } from '../../i18n/locales'
import type { HeaderCopy } from '../../types/content'
import { Logo } from '../ui/Logo'
import { PreferenceControls } from '../ui/PreferenceControls'
import './SiteHeader.css'

interface SiteHeaderProps {
  copy: HeaderCopy
  homeHref: string
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

export function SiteHeader({ copy, homeHref, locale, onLocaleChange }: SiteHeaderProps) {
  const scrolled = useScrolled()

  return (
    <header className={['site-header', scrolled && 'is-scrolled'].filter(Boolean).join(' ')}>
      <div className="site-header__inner">
        <Link to={homeHref} className="site-header__brand" aria-label={copy.homeLabel}>
          <Logo height={44} />
        </Link>

        <nav className="site-header__nav" aria-label={copy.navLabel}>
          {copy.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="site-header__link"
              {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <PreferenceControls copy={copy} locale={locale} onLocaleChange={onLocaleChange} />
        </div>
      </div>
    </header>
  )
}
