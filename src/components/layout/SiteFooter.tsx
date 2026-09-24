import { Link } from 'react-router'
import { useScrollToTop } from '../../hooks/useScrollToTop'
import { cx } from '../../lib/classNames'
import type { FooterCopy, NavLink } from '../../types/content'
import { Icon } from '../ui/Icon'
import { Heading } from '../ui/Heading'
import { Container } from './Container'
import './SiteFooter.css'

interface SiteFooterProps {
  copy: FooterCopy
  navLinks: NavLink[]
  /** Short key facts about the product, reused from the hero. */
  highlights: string[]
  /** Accessible name of the logo link (same as the header's). */
  homeLabel: string
  /** Resolves a language-less path to the active language: '/privacy' -> '/es/privacy'. */
  localePath: (path?: string) => string
  inert?: boolean
  className?: string
}

export function SiteFooter({ copy, navLinks, highlights, homeLabel, localePath, inert, className }: SiteFooterProps) {
  const year = new Date().getFullYear()
  const scrollToTop = useScrollToTop()

  return (
    <footer className={cx('site-footer', className)} inert={inert}>
      <Container className="site-footer__inner">
        <div className="site-footer__brand">
          {/* The fish mark alone; the name is carried by the link's accessible label and the tagline. */}
          <Link to={localePath()} aria-label={homeLabel} className="site-footer__mark">
            <img src="/branding/icon.png" alt="" width={56} height={56} />
          </Link>
          <Heading level={2} size="section" className="site-footer__tagline">
            {copy.tagline}
          </Heading>
          <ul className="site-footer__highlights">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <nav className="site-footer__nav" aria-label={copy.navLabel}>
          <p className="site-footer__heading">{copy.exploreLabel}</p>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <button type="button" className="site-footer__top" onClick={scrollToTop}>
            {copy.backToTopLabel}
            <Icon name="arrowUp" size={16} strokeWidth={2.4} />
          </button>
        </nav>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">
            © {year} {copy.copyright}
          </p>
          {copy.legalLinks.length > 0 && (
            <nav aria-label={copy.legalLabel}>
              <ul className="site-footer__legal">
                {copy.legalLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={localePath(link.path)}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </Container>
    </footer>
  )
}
