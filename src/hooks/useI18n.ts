import { usePreference } from './usePreference'
import type { Dictionary } from '../types/i18n'
import { dictionaries } from '../i18n/dictionaries'
import { DEFAULT_LOCALE, localeStore, type Locale } from '../i18n/locales'

export function useI18n(): { locale: Locale; t: Dictionary; setLocale: (locale: Locale) => void } {
  const locale = usePreference(localeStore, DEFAULT_LOCALE)
  return { locale, t: dictionaries[locale], setLocale: localeStore.set }
}
