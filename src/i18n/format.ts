import type { Locale } from './locales'

// Locale-aware formatting through Intl, so copy never hand-builds separators,
// lists or plurals ("1,234.5" vs "1.234,5"; "a, b, and c" vs "a, b y c").
const TAG: Record<Locale, string> = { es: 'es', en: 'en' }

export const formatNumber = (locale: Locale, value: number, options?: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat(TAG[locale], options).format(value)

export const formatDate = (locale: Locale, value: Date | number, options?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(TAG[locale], options).format(value)

export const formatList = (locale: Locale, items: string[], type: Intl.ListFormatType = 'conjunction') =>
  new Intl.ListFormat(TAG[locale], { style: 'long', type }).format(items)

type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string }

// `forms` is per-language copy, e.g. { one: 'día', other: 'días' }.
export const pluralize = (locale: Locale, count: number, forms: PluralForms) =>
  forms[new Intl.PluralRules(TAG[locale]).select(count)] ?? forms.other
