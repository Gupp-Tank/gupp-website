import { usePreference } from '../hooks/usePreference'
import type { Dictionary } from '../types/i18n'
import { dictionaries } from './dictionaries'
import { DEFAULT_LOCALE, localeStore, type Locale } from './locales'

export function useI18n(): { locale: Locale; t: Dictionary; setLocale: (locale: Locale) => void } {
  const locale = usePreference(localeStore, DEFAULT_LOCALE)
  return { locale, t: dictionaries[locale], setLocale: localeStore.set }
}
