import { useLayoutEffect } from 'react'
import { Outlet, useParams } from 'react-router'
import { isLocale, localeStore } from '../i18n/locales'
import { NotFoundPage } from '../pages/NotFoundPage'

// Guards `/:locale`: an unsupported language is a 404, and the URL is the
// source of truth for the active language (back/forward and deep links).
export function LocaleRoute() {
  const { locale } = useParams()
  const valid = isLocale(locale)

  useLayoutEffect(() => {
    if (isLocale(locale) && localeStore.get() !== locale) localeStore.set(locale)
  }, [locale])

  return valid ? <Outlet /> : <NotFoundPage />
}
