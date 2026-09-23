import { createPreferenceStore } from './preferenceStore'

export type Theme = 'light' | 'dark'

// Storage key must match the inline pre-paint script in index.html.
export const themeStore = createPreferenceStore<Theme>({
  storageKey: 'gupp-theme',
  read: () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'),
  apply: (theme) => {
    document.documentElement.dataset.theme = theme
  },
})
