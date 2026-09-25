import { useEffect, useRef } from 'react'

/**
 * Client-side navigation keeps the previous scroll position, so opening a page from the
 * footer would land halfway down it. On a real page change, go to the top (or to the
 * `#anchor` in the URL). The first render is left to the browser.
 */
export function useScrollToTop(pathname: string, hash: string) {
  const previous = useRef(pathname)

  useEffect(() => {
    if (previous.current === pathname) return
    previous.current = pathname
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) target.scrollIntoView()
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])
}
