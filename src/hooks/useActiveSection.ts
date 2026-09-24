import { useEffect, useState } from 'react'

// Which of the given in-page sections is crossing the middle of the viewport.
// `resetKey` (the route) re-runs the lookup, since sections only exist on some pages.
export function useActiveSection(ids: string[], resetKey: string): string | null {
  const [active, setActive] = useState<string | null>(null)
  const idsKey = ids.join('|')

  useEffect(() => {
    const elements = idsKey
      .split('|')
      .filter(Boolean)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') {
      setActive(null)
      return
    }

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        // Document order decides ties, so the lower section wins while both cross the band.
        setActive([...elements].reverse().find((el) => visible.has(el.id))?.id ?? null)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [idsKey, resetKey])

  return active
}
