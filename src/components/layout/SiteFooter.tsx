import { Link } from 'react-router'
import { cx } from '../../lib/classNames'
import type { FooterCopy, NavLink } from '../../types/content'
import { Text } from '../ui/Text'
import { Logo } from '../ui/Logo'
import { Container } from './Container'
import './SiteFooter.css'

interface SiteFooterProps {
  copy: FooterCopy
  navLinks: NavLink[]
  /** Accessible name of the logo link (same as the header's). */
  homeLabel: string
  /** Resolves a language-less path to the active language: '/privacy' -> '/es/privacy'. */
  localePath: (path?: string) => string
  inert?: boolean
  className?: string
}

export function SiteFooter({ copy, navLinks, homeLabel, localePath, inert, className }: SiteFooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className={cx('site-footer', className)} inert={inert}>
      <Container className="site-footer__inner">
        <div className="site-footer__brand">
          <Link to={localePath()} aria-label={homeLabel}>
            <Logo height={40} />
          </Link>
          <Text tone="body" className="site-footer__tagline">
            {copy.tagline}
          </Text>
        </div>

        <nav className="site-footer__nav" aria-label={copy.navLabel}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {copy.legalLinks.length > 0 && (
          <nav className="site-footer__legal" aria-label={copy.legalLabel}>
            <ul>
              {copy.legalLinks.map((link) => (
                <li key={link.path}>
                  <Link to={localePath(link.path)}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <Text tone="muted" className="site-footer__copyright">
          © {year} {copy.copyright}
        </Text>
      </Container>
    </footer>
  )
}
