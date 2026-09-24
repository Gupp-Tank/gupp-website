import { useEffect, type RefObject } from 'react'

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

// A focusable element inside a `display: none` / `visibility: hidden` subtree cannot take
// focus, so it must not count as the first or last stop (the menu panel keeps a hidden
// copy of the preferences that only shows on very narrow screens).
function isRendered(el: HTMLElement, container: HTMLElement): boolean {
  for (let node: HTMLElement | null = el; node; node = node.parentElement) {
    const style = getComputedStyle(node)
    if (style.display === 'none' || style.visibility === 'hidden') return false
    if (node === container) break
  }
  return true
}

// While `active`, Tab and Shift+Tab cycle inside `container` instead of
// leaving it (an open menu must not let focus wander into the inert page).
export function useFocusTrap(container: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !container.current) return
      const items = [...container.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => !el.closest('[hidden]') && isRendered(el, container.current!))
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]
      const current = document.activeElement

      if (!container.current.contains(current)) {
        event.preventDefault()
        first.focus()
      } else if (event.shiftKey && current === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && current === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [container, active])
}
