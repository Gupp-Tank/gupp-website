import { useScrolled } from '../../hooks/useScrolled'
import type { Locale } from '../../i18n/locales'
import type { CallToAction, HeaderCopy } from '../../types/content'
import { ButtonLink } from '../ui/Button'
import { Logo } from '../ui/Logo'
import { PreferenceControls } from '../ui/PreferenceControls'
import './SiteHeader.css'

interface SiteHeaderProps {
  copy: HeaderCopy
  cta: CallToAction
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

export function SiteHeader({ copy, cta, locale, onLocaleChange }: SiteHeaderProps) {
  const scrolled = useScrolled()

  return (
    <header className={['site-header', scrolled && 'is-scrolled'].filter(Boolean).join(' ')}>
      <div className="site-header__inner">
        <a href="/" className="site-header__brand" aria-label={copy.homeLabel}>
          <Logo height={44} />
        </a>

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
          <ButtonLink href={cta.href} size="sm" className="site-header__cta">
            {cta.label}
          </ButtonLink>
        </div>
      </div>
    </header>
  )
}
