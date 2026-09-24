import { useEffect, type RefObject } from 'react'
import { createCausticsRenderer } from '../lib/caustics/createCausticsRenderer'
import { hexToRgbUnit } from '../lib/color'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'
import { useTheme } from './useTheme'

// Rendered below CSS resolution: the pattern is soft by nature, and ~half
// of the pixels keeps the shader cheap on laptops and phones.
const RESOLUTION_SCALE = 0.75
const FRAME_INTERVAL_MS = 1000 / 30
const STATIC_FRAME_TIME = 12

function readAppearance(canvas: HTMLCanvasElement) {
  const styles = getComputedStyle(canvas)
  return {
    color: hexToRgbUnit(styles.getPropertyValue('--caustic-color')),
    strength: parseFloat(styles.getPropertyValue('--caustic-strength')) || 0,
  }
}

export function useWaterCaustics(canvasRef: RefObject<HTMLCanvasElement | null>) {
  const reducedMotion = usePrefersReducedMotion()
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const renderer = createCausticsRenderer(canvas)
    if (!renderer) return

    let frame = 0
    let lastDraw = 0
    let visible = true
    const start = performance.now()

    const drawNow = () => renderer.draw(reducedMotion ? STATIC_FRAME_TIME : (performance.now() - start) / 1000)

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop)
      if (now - lastDraw < FRAME_INTERVAL_MS) return
      lastDraw = now
      drawNow()
    }

    const play = () => {
      if (reducedMotion || !visible || document.hidden || frame) return
      frame = requestAnimationFrame(loop)
    }

    const pause = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const resize = () => {
      // The strength token changes with the breakpoint, so re-read it whenever the size does.
      renderer.setAppearance(readAppearance(canvas))
      const { width, height } = canvas.getBoundingClientRect()
      renderer.resize(Math.max(1, Math.round(width * RESOLUTION_SCALE)), Math.max(1, Math.round(height * RESOLUTION_SCALE)))
      drawNow()
    }

    resize()
    play()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) play()
      else pause()
    })
    visibilityObserver.observe(canvas)

    const onVisibilityChange = () => (document.hidden ? pause() : play())
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      pause()
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      renderer.destroy()
    }
    // theme is a dependency only to re-read the color tokens after a switch.
  }, [canvasRef, reducedMotion, theme])
}
