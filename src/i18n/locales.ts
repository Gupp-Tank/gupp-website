import { createPreferenceStore } from '../lib/preferenceStore'

export const LOCALES = ['es', 'en'] as const
export type Locale = (typeof LOCALES)[number]

// Spanish is the default, matching the app (gupp-docs/architecture/internationalization).
export const DEFAULT_LOCALE: Locale = 'es'

export const LOCALE_NAMES: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
}

const isLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value)

// Storage key must match the inline pre-paint script in index.html.
export const localeStore = createPreferenceStore<Locale>({
  storageKey: 'gupp-locale',
  read: () => {
    const lang = document.documentElement.lang
    return isLocale(lang) ? lang : DEFAULT_LOCALE
  },
  apply: (locale) => {
    document.documentElement.lang = locale
  },
})
