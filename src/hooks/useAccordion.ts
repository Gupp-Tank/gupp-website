import { useCallback, useState, type KeyboardEvent } from 'react'

export const accordionTriggerId = (id: string) => `faq-trigger-${id}`
export const accordionPanelId = (id: string) => `faq-panel-${id}`

/** Open/close state (several panels can be open) and arrow-key movement between triggers. */
export function useAccordion(ids: string[]) {
  const [open, setOpen] = useState<ReadonlySet<string>>(new Set())

  const toggle = useCallback((id: string) => {
    setOpen((current) => {
      const next = new Set(current)
      if (!next.delete(id)) next.add(id)
      return next
    })
  }, [])

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const from = ids.findIndex((id) => accordionTriggerId(id) === (event.target as HTMLElement).id)
      if (from < 0) return
      const last = ids.length - 1
      const moves: Record<string, number> = { ArrowDown: Math.min(from + 1, last), ArrowUp: Math.max(from - 1, 0), Home: 0, End: last }
      const next = moves[event.key]
      if (next === undefined) return
      event.preventDefault()
      document.getElementById(accordionTriggerId(ids[next]))?.focus()
    },
    [ids],
  )

  return { isOpen: (id: string) => open.has(id), toggle, onKeyDown }
}
