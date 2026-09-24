import { useCallback, useEffect, useState, type KeyboardEvent } from 'react'

export const featureTabId = (slug: string) => `module-${slug}`

const slugFromHash = (slugs: string[]): number => {
  if (typeof window === 'undefined') return -1
  return slugs.findIndex((slug) => window.location.hash === `#${featureTabId(slug)}`)
}

/** State and keyboard behavior for a vertical tablist whose tabs can also be reached by URL hash (footer links). */
export function useFeatureTabs(slugs: string[]) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const sync = () => {
      const index = slugFromHash(slugs)
      if (index < 0) return
      setActive(index)
      // The tab's description opens and the previous one closes, moving the page: settle on the tab afterwards.
      requestAnimationFrame(() => document.getElementById(featureTabId(slugs[index]))?.scrollIntoView())
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [slugs])

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const focused = slugs.findIndex((slug) => featureTabId(slug) === (event.target as HTMLElement).id)
      const from = focused >= 0 ? focused : active
      const last = slugs.length - 1
      const moves: Record<string, number> = {
        ArrowDown: Math.min(from + 1, last),
        ArrowRight: Math.min(from + 1, last),
        ArrowUp: Math.max(from - 1, 0),
        ArrowLeft: Math.max(from - 1, 0),
        Home: 0,
        End: last,
      }
      const next = moves[event.key]
      if (next === undefined) return
      event.preventDefault()
      setActive(next)
      document.getElementById(featureTabId(slugs[next]))?.focus()
    },
    [active, slugs],
  )

  return { active, setActive, onKeyDown }
}
