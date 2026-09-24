import { useCallback } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

// Scrolls to the top; smooth unless the visitor asked for reduced motion.
export function useScrollToTop() {
  const reducedMotion = usePrefersReducedMotion()
  return useCallback(() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }), [reducedMotion])
}
