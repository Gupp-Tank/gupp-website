import { isLocale, type Locale } from './locales'

// The first path segment is the language: /es, /en/anything.
export const localeFromPath = (pathname: string): Locale | undefined => {
  const first = pathname.split('/')[1]
  return isLocale(first) ? first : undefined
}

// "/en/privacy" -> "/privacy"; "/en" -> ""; a path without a locale is returned as is.
export const stripLocale = (pathname: string): string =>
  localeFromPath(pathname) ? pathname.replace(/^\/[^/]+/, '') : pathname

// ("es", "/privacy") -> "/es/privacy"; ("es") -> "/es"
export const withLocale = (locale: Locale, rest = ''): string => `/${locale}${rest === '/' ? '' : rest}`
