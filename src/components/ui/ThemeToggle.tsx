import { useTheme } from '../../hooks/useTheme'
import { Icon } from './Icon'

interface ThemeToggleProps {
  toDarkLabel: string
  toLightLabel: string
}

export function ThemeToggle({ toDarkLabel, toLightLabel }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="pref-control__button pref-control__button--icon"
      onClick={toggleTheme}
      aria-label={isDark ? toLightLabel : toDarkLabel}
      title={isDark ? toLightLabel : toDarkLabel}
    >
      <Icon name={isDark ? 'sun' : 'moon'} size={17} />
    </button>
  )
}
