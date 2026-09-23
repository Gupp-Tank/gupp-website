import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

export function useCountUp(target: number, durationMs = 1400, delayMs = 0): number {
  const reducedMotion = usePrefersReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (reducedMotion) return

    let frame = 0
    let start: number | null = null

    const tick = (now: number) => {
      start ??= now + delayMs
      const progress = Math.min(Math.max((now - start) / durationMs, 0), 1)
      setValue(Math.round(target * easeOutCubic(progress)))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, durationMs, delayMs, reducedMotion])

  return reducedMotion ? target : value
}
