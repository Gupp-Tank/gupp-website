import { cx } from '../../lib/classNames'
import type { NavLink } from '../../types/content'

interface SiteNavProps {
  links: NavLink[]
  label: string
  /** id of the in-page section currently in view, without the '#'. */
  activeId: string | null
  className?: string
  id?: string
  hidden?: boolean
  onNavigate?: () => void
  ref?: React.Ref<HTMLElement>
}

// The primary links. The same component renders the desktop bar and the mobile panel.
export function SiteNav({ links, label, activeId, className, id, hidden, onNavigate, ref }: SiteNavProps) {
  return (
    <nav ref={ref} id={id} hidden={hidden} aria-label={label} className={cx('site-nav', className)}>
      {links.map((link) => {
        const current = link.href === `#${activeId}`
        return (
          <a
            key={link.href}
            href={link.href}
            className={cx('site-nav__link', current && 'is-active')}
            aria-current={current ? 'location' : undefined}
            onClick={onNavigate}
            {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            {link.label}
          </a>
        )
      })}
    </nav>
  )
}
