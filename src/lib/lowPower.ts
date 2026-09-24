// The decorative WebGL background is skipped when the visitor or the device signals
// that spending CPU/GPU or data on decoration is a bad idea. Text and layout are
// identical without it; only the moving light disappears.
interface NavigatorHints {
  connection?: { saveData?: boolean }
  deviceMemory?: number
  hardwareConcurrency?: number
}

export function isLowPowerDevice(nav: NavigatorHints = navigator as unknown as NavigatorHints, prefersReducedData = false): boolean {
  if (prefersReducedData) return true
  if (nav.connection?.saveData) return true
  // Both are hints: absent (Safari/Firefox) means "no signal", not "low power".
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) return true
  if (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 2) return true
  return false
}

interface GlLike {
  getExtension(name: string): { UNMASKED_RENDERER_WEBGL: number } | null
  getParameter(pname: number): unknown
}

// A software rasterizer (SwiftShader, llvmpipe...) means there is no GPU: the moving
// light would burn CPU for a decoration, and it stalls the main thread on such machines
// (this is also what lab tools like Lighthouse run on). A dev can still opt in with
// localStorage['gupp-caustics'] = 'force' to see the effect there.
export function isSoftwareRenderer(gl: GlLike, forced = readForceFlag()): boolean {
  if (forced) return false
  const info = gl.getExtension('WEBGL_debug_renderer_info')
  if (!info) return false
  return /swiftshader|llvmpipe|softpipe|software|basic render/i.test(String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)))
}

function readForceFlag(): boolean {
  try {
    return localStorage.getItem('gupp-caustics') === 'force'
  } catch {
    return false
  }
}

// Runs `task` once the browser is idle, so it never competes with first paint.
export function whenIdle(task: () => void, timeoutMs = 1500): () => void {
  // Safari has no requestIdleCallback; a short timeout is a good enough "after first paint".
  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(task, { timeout: timeoutMs })
    return () => window.cancelIdleCallback(id)
  }
  const id = globalThis.setTimeout(task, 200)
  return () => globalThis.clearTimeout(id)
}
