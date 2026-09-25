import { useEffect, type RefObject } from 'react'
import { useFocusTrap } from './useFocusTrap'

// Behavior of a modal dialog: focus moves in on open and returns to the opener on close,
// Tab stays inside, Escape closes, and the page behind does not scroll.
export function useModalDialog(ref: RefObject<HTMLElement | null>, open: boolean, onClose: () => void) {
  useFocusTrap(ref, open)

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    ref.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      opener?.focus?.()
    }
  }, [ref, open, onClose])
}
