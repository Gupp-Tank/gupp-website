import { useMemo } from 'react'
import { formatDate, formatList, formatNumber, pluralize } from '../i18n/format'
import { useI18n } from './useI18n'

// The format helpers bound to the active locale.
export function useFormat() {
  const { locale } = useI18n()
  return useMemo(
    () => ({
      number: (value: number, options?: Intl.NumberFormatOptions) => formatNumber(locale, value, options),
      date: (value: Date | number, options?: Intl.DateTimeFormatOptions) => formatDate(locale, value, options),
      list: (items: string[], type?: Intl.ListFormatType) => formatList(locale, items, type),
      plural: (count: number, forms: Parameters<typeof pluralize>[2]) => pluralize(locale, count, forms),
    }),
    [locale],
  )
}
