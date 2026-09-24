import { act, render } from '@testing-library/react'
import { useRef } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useWaterCaustics } from './useWaterCaustics'

// jsdom has no requestIdleCallback, so the hook falls back to a 200ms timeout.
const IDLE_START_MS = 250
const draws = vi.fn()
const destroy = vi.fn()
const setAppearance = vi.fn()
const resize = vi.fn()
const createRenderer = vi.fn()

vi.mock('../lib/caustics/createCausticsRenderer', () => ({ createCausticsRenderer: (...a: unknown[]) => createRenderer(...a) }))

function Probe() {
  const ref = useRef<HTMLCanvasElement>(null)
  useWaterCaustics(ref)
  return <canvas ref={ref} style={{ '--caustic-color': '#0d5c73', '--caustic-strength': '0.3' } as React.CSSProperties} />
}

let visible: (entry: Partial<IntersectionObserverEntry>) => void
const observers = { disconnect: vi.fn(), resizeDisconnect: vi.fn() }

function stubBrowser(reducedMotion: boolean, reducedData = false) {
  window.matchMedia = ((query: string) => ({
    matches: query.includes('reduced-data') ? reducedData : reducedMotion,
    addEventListener() {},
    removeEventListener() {},
  })) as unknown as typeof window.matchMedia
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() { observers.resizeDisconnect() } })
  vi.stubGlobal('IntersectionObserver', class {
    constructor(cb: (e: Partial<IntersectionObserverEntry>[]) => void) { visible = (entry) => cb([entry]) }
    observe() {}
    disconnect() { observers.disconnect() }
  })
}

describe('useWaterCaustics', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    createRenderer.mockReturnValue({ resize, setAppearance, draw: draws, destroy })
  })
  afterEach(() => vi.useRealTimers())

  it('does nothing when WebGL is unavailable', async () => {
    stubBrowser(false)
    createRenderer.mockReturnValue(null)
    await renderAndSettle()
    expect(draws).not.toHaveBeenCalled()
  })

  const renderAndSettle = async () => {
    const view = render(<Probe />)
    await act(async () => void (await vi.advanceTimersByTimeAsync(IDLE_START_MS)))
    return view
  }

  it('waits for the browser to be idle before compiling anything (never blocks first paint)', async () => {
    stubBrowser(false)
    render(<Probe />)
    expect(createRenderer).not.toHaveBeenCalled()
    await act(async () => void (await vi.advanceTimersByTimeAsync(IDLE_START_MS)))
    expect(createRenderer).toHaveBeenCalledTimes(1)
  })

  it('never starts if it unmounts before the idle moment', async () => {
    stubBrowser(false)
    render(<Probe />).unmount()
    await act(async () => void (await vi.advanceTimersByTimeAsync(1000)))
    expect(createRenderer).not.toHaveBeenCalled()
  })

  it('is skipped entirely when the visitor asks for reduced data', async () => {
    stubBrowser(false, true)
    await renderAndSettle()
    expect(createRenderer).not.toHaveBeenCalled()
  })

  it('is skipped on a data-saver connection', async () => {
    stubBrowser(false)
    vi.stubGlobal('navigator', { ...navigator, connection: { saveData: true } })
    await renderAndSettle()
    expect(createRenderer).not.toHaveBeenCalled()
  })

  it('reads the color and strength tokens from CSS', async () => {
    stubBrowser(false)
    await renderAndSettle()
    const appearance = setAppearance.mock.calls[0][0]
    expect(appearance.strength).toBeCloseTo(0.3)
    expect(appearance.color.map((v: number) => Math.round(v * 255))).toEqual([13, 92, 115])
  })

  it('draws a single static frame, and never animates, under reduced motion', async () => {
    stubBrowser(true)
    await renderAndSettle()
    const initial = draws.mock.calls.length
    expect(initial).toBeGreaterThan(0)
    await act(async () => void (await vi.advanceTimersByTimeAsync(1000)))
    expect(draws.mock.calls.length).toBe(initial)
  })

  it('animates while visible and stops when the canvas leaves the viewport', async () => {
    stubBrowser(false)
    await renderAndSettle()
    await act(async () => void (await vi.advanceTimersByTimeAsync(500)))
    const animating = draws.mock.calls.length
    expect(animating).toBeGreaterThan(3)

    act(() => visible({ isIntersecting: false }))
    const paused = draws.mock.calls.length
    await act(async () => void (await vi.advanceTimersByTimeAsync(500)))
    expect(draws.mock.calls.length).toBe(paused)

    act(() => visible({ isIntersecting: true }))
    await act(async () => void (await vi.advanceTimersByTimeAsync(500)))
    expect(draws.mock.calls.length).toBeGreaterThan(paused)
  })

  it('stops and releases everything on unmount', async () => {
    stubBrowser(false)
    const { unmount } = await renderAndSettle()
    unmount()
    expect(destroy).toHaveBeenCalledTimes(1)
    expect(observers.disconnect).toHaveBeenCalled()
    expect(observers.resizeDisconnect).toHaveBeenCalled()
  })
})
