import { useLayoutEffect } from 'react'
import { Outlet, useParams } from 'react-router'
import { isLocale, localeStore } from '../i18n/locales'
import { NotFoundPage } from '../pages/NotFoundPage'

// Guards `/:locale`: an unsupported language is a 404, and the URL is the
// source of truth for the active language (back/forward and deep links).
export function LocaleRoute() {
  const { locale } = useParams()
  const valid = isLocale(locale)

  // Always write it, even when <html lang> already matches: the pre-paint script sets
  // the attribute from the URL, so "already matches" says nothing about what is saved.
  useLayoutEffect(() => {
    if (isLocale(locale)) localeStore.set(locale)
  }, [locale])

  return valid ? <Outlet /> : <NotFoundPage />
}
