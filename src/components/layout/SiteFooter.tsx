import { Link } from 'react-router'
import { cx } from '../../lib/classNames'
import type { Locale } from '../../i18n/locales'
import type { FooterCopy, HeaderCopy, ProductModule } from '../../types/content'
import { BrandIcon } from '../ui/BrandIcon'
import { PreferenceControls } from '../ui/PreferenceControls'
import { Container } from './Container'
import './SiteFooter.css'

export interface SocialLink {
  name: 'instagram' | 'x'
  label: string
  href: string
}

interface SiteFooterProps {
  copy: FooterCopy
  socials: SocialLink[]
  /** Each module becomes a link to its own card. */
  modules: ProductModule[]
  /** Short key facts about the product, reused from the hero. */
  highlights: string[]
  /** Copy of the language/theme controls (same as the header's). */
  preferencesCopy: HeaderCopy
  locale: Locale
  onLocaleChange: (locale: Locale) => void
  /** Accessible name of the logo link (same as the header's). */
  homeLabel: string
  /** Resolves a language-less path to the active language: '/privacy' -> '/es/privacy'. */
  localePath: (path?: string) => string
  inert?: boolean
  className?: string
}

export function SiteFooter({
  copy,
  socials,
  modules,
  highlights,
  preferencesCopy,
  locale,
  onLocaleChange,
  homeLabel,
  localePath,
  inert,
  className,
}: SiteFooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className={cx('site-footer', className)} inert={inert}>
      <Container className="site-footer__inner">
        <div className="site-footer__brand">
          {/* The fish mark alone; the name is carried by the link's accessible label and the tagline. */}
          <Link to={localePath()} aria-label={homeLabel} className="site-footer__mark">
            <img src="/branding/icon.png" alt="" width={56} height={56} loading="lazy" decoding="async" />
          </Link>
          <p className="site-footer__tagline">{copy.tagline}</p>
          <nav aria-label={copy.socialLabel}>
            <ul className="site-footer__social">
              {socials.map((social) => (
                <li key={social.name}>
                  <a href={social.href} target="_blank" rel="noreferrer noopener" aria-label={social.label}>
                    <BrandIcon name={social.name} size={20} decorative />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="site-footer__highlights">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="site-footer__columns">
          <nav className="site-footer__column" aria-label={copy.productLabel}>
            <p className="site-footer__heading">{copy.productLabel}</p>
            <ul>
              {modules.map((module) => (
                <li key={module.slug}>
                  <a href={`${localePath()}#module-${module.slug}`}>{module.title}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__column">
            <p className="site-footer__heading">{preferencesCopy.preferencesLabel}</p>
            <PreferenceControls copy={preferencesCopy} locale={locale} onLocaleChange={onLocaleChange} />
          </div>

          {copy.legalLinks.length > 0 && (
            <nav className="site-footer__column" aria-label={copy.legalLabel}>
              <p className="site-footer__heading">{copy.legalLabel}</p>
              <ul>
                {copy.legalLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={localePath(link.path)}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        <div className="site-footer__bottom">
          <p>
            © {year} {copy.copyright}
          </p>
          <div className="site-footer__stores">
            <p>{copy.storesLabel}</p>
            <ul>
              <li>
                <BrandIcon name="apple" />
              </li>
              <li>
                <BrandIcon name="googlePlay" />
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  )
}
