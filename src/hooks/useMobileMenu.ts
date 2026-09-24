import { useCallback, useEffect, useId, useRef, useState } from 'react'

// Matches the CSS breakpoint where the desktop nav takes over (SiteHeader.css).
const DESKTOP = '(min-width: 861px)'

// State and side effects of the mobile menu disclosure: Escape closes it and
// returns focus to the button, reaching the desktop layout closes it, the page
// behind does not scroll while it is open, and focus moves into it on open.
export function useMobileMenu() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const panelId = useId()

  const close = useCallback((restoreFocus = false) => {
    setOpen(false)
    if (restoreFocus) buttonRef.current?.focus()
  }, [])
  const toggle = useCallback(() => setOpen((value) => !value), [])

  useEffect(() => {
    if (!open) return
    panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close(true)
    }
    document.addEventListener('keydown', onKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const query = window.matchMedia(DESKTOP)
    const onChange = () => query.matches && setOpen(false)
    query.addEventListener('change', onChange)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      query.removeEventListener('change', onChange)
    }
  }, [open, close])

  return { open, toggle, close, buttonRef, panelRef, panelId }
}

export type MobileMenu = ReturnType<typeof useMobileMenu>
