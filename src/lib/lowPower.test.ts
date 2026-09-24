import { afterEach, describe, expect, it, vi } from 'vitest'
import { isLowPowerDevice, whenIdle } from './lowPower'

describe('isLowPowerDevice', () => {
  it('is false with no signals at all (Safari/Firefox expose none)', () => {
    expect(isLowPowerDevice({})).toBe(false)
  })

  it.each([
    ['prefers-reduced-data', {}, true],
    ['data saver', { connection: { saveData: true } }, false],
    ['2 GB of memory', { deviceMemory: 2 }, false],
    ['1 GB of memory', { deviceMemory: 1 }, false],
    ['2 cores', { hardwareConcurrency: 2 }, false],
  ])('is true for %s', (_name, nav, reducedData) => {
    expect(isLowPowerDevice(nav, reducedData)).toBe(true)
  })

  it.each([
    [{ deviceMemory: 8, hardwareConcurrency: 8, connection: { saveData: false } }],
    [{ deviceMemory: 4 }],
    [{ hardwareConcurrency: 4 }],
  ])('is false for a capable device %j', (nav) => {
    expect(isLowPowerDevice(nav)).toBe(false)
  })
})

describe('whenIdle', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('runs the task after the fallback delay when requestIdleCallback is missing, and can be cancelled', () => {
    vi.useFakeTimers()
    const ran = vi.fn()
    whenIdle(ran)
    vi.advanceTimersByTime(199)
    expect(ran).not.toHaveBeenCalled()
    vi.advanceTimersByTime(2)
    expect(ran).toHaveBeenCalledTimes(1)

    const cancelled = vi.fn()
    whenIdle(cancelled)()
    vi.advanceTimersByTime(1000)
    expect(cancelled).not.toHaveBeenCalled()
  })

  it('uses requestIdleCallback with a timeout when the browser has it', () => {
    const request = vi.fn(() => 7)
    const cancel = vi.fn()
    vi.stubGlobal('requestIdleCallback', request)
    vi.stubGlobal('cancelIdleCallback', cancel)
    Object.assign(window, { requestIdleCallback: request, cancelIdleCallback: cancel })
    const task = vi.fn()
    const dispose = whenIdle(task, 900)
    expect(request).toHaveBeenCalledWith(task, { timeout: 900 })
    dispose()
    expect(cancel).toHaveBeenCalledWith(7)
    delete (window as unknown as Record<string, unknown>).requestIdleCallback
    delete (window as unknown as Record<string, unknown>).cancelIdleCallback
  })
})

import { isSoftwareRenderer } from './lowPower'

describe('isSoftwareRenderer', () => {
  const gl = (renderer: string | null) => ({
    getExtension: () => (renderer === null ? null : { UNMASKED_RENDERER_WEBGL: 37446 }),
    getParameter: () => renderer,
  })

  it.each(['ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero)), SwiftShader driver)', 'llvmpipe (LLVM 15.0.7, 256 bits)', 'Microsoft Basic Render Driver'])(
    'detects a software rasterizer: %s',
    (name) => expect(isSoftwareRenderer(gl(name), false)).toBe(true),
  )

  it.each(['ANGLE (Apple, ANGLE Metal Renderer: Apple M2, Unspecified Version)', 'NVIDIA GeForce RTX 3060/PCIe/SSE2', 'Adreno (TM) 650'])(
    'keeps the effect on real GPUs: %s',
    (name) => expect(isSoftwareRenderer(gl(name), false)).toBe(false),
  )

  it('assumes hardware when the renderer cannot be read', () => {
    expect(isSoftwareRenderer(gl(null), false)).toBe(false)
  })

  it('can be forced on for development', () => {
    expect(isSoftwareRenderer(gl('SwiftShader'), true)).toBe(false)
    localStorage.setItem('gupp-caustics', 'force')
    expect(isSoftwareRenderer(gl('SwiftShader'))).toBe(false)
  })
})
