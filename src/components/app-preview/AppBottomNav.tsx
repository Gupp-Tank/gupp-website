import type { AppNavItem } from '../../types/appPreview'
import { Icon } from '../ui/Icon'

interface AppBottomNavProps {
  items: AppNavItem[]
}

export function AppBottomNav({ items }: AppBottomNavProps) {
  return (
    <nav className="app-nav" aria-hidden>
      {items.map((item) => (
        <span key={item.label} className={['app-nav__item', item.active && 'is-active'].filter(Boolean).join(' ')}>
          <Icon name={item.icon} size={17} />
          {item.label}
        </span>
      ))}
    </nav>
  )
}
