import { useCallback } from 'react'
import { withLocale } from '../i18n/paths'
import { useI18n } from './useI18n'

// Builds a link target in the active language: path('/privacy') -> '/es/privacy'.
export function useLocalePath() {
  const { locale } = useI18n()
  return useCallback((rest = '') => withLocale(locale, rest), [locale])
}
