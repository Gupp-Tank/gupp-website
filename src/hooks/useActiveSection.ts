import { useEffect, useState } from 'react'

// Which of the given in-page sections is crossing the middle of the viewport.
// `resetKey` (the route) scopes the answer, since sections only exist on some pages.
export function useActiveSection(ids: string[], resetKey: string): string | null {
  const idsKey = ids.join('|')
  const scope = `${resetKey}::${idsKey}`
  // The answer is tagged with the scope it was computed for, so a stale one from
  // another page is ignored without resetting state inside the effect.
  const [found, setFound] = useState<{ scope: string; id: string | null }>({ scope, id: null })

  useEffect(() => {
    const elements = idsKey
      .split('|')
      .filter(Boolean)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        // Document order decides ties, so the lower section wins while both cross the band.
        setFound({ scope, id: [...elements].reverse().find((el) => visible.has(el.id))?.id ?? null })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [idsKey, scope])

  return found.scope === scope ? found.id : null
}
