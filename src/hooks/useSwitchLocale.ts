import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { localeStore, type Locale } from '../i18n/locales'
import { stripLocale, withLocale } from '../i18n/paths'

// Changes the language by changing the URL, keeping the rest of it (path,
// query, hash). The store is updated in the same event so the new language and
// the new route render together, with no frame in the old language.
export function useSwitchLocale() {
  const navigate = useNavigate()
  const { pathname, search, hash } = useLocation()

  return useCallback(
    (next: Locale) => {
      localeStore.set(next)
      navigate(`${withLocale(next, stripLocale(pathname))}${search}${hash}`)
    },
    [navigate, pathname, search, hash],
  )
}
