import { usePreference } from './usePreference'
import type { Dictionary } from '../types/i18n'
import { dictionaries } from '../i18n/dictionaries'
import { localeStore, type Locale } from '../i18n/locales'

export function useI18n(): { locale: Locale; t: Dictionary; setLocale: (locale: Locale) => void } {
  const locale = usePreference(localeStore, localeStore.get)
  return { locale, t: dictionaries[locale], setLocale: localeStore.set }
}
