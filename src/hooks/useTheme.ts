import { useCallback } from 'react'
import { themeStore, type Theme } from '../lib/theme'
import { usePreference } from './usePreference'

export function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const theme = usePreference(themeStore, 'light')
  const toggleTheme = useCallback(() => themeStore.set(themeStore.get() === 'dark' ? 'light' : 'dark'), [])
  return { theme, toggleTheme }
}
