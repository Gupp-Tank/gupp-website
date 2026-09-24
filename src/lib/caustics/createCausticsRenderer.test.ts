import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createCausticsRenderer } from './createCausticsRenderer'

// A recording stand-in for a WebGL context: enough surface for the renderer, no GPU.
function fakeGl(overrides: Partial<Record<string, unknown>> = {}) {
  const calls: Record<string, unknown[][]> = {}
  const rec = (name: string, ret?: unknown) =>
    vi.fn((...args: unknown[]) => {
      ;(calls[name] ??= []).push(args)
      return ret
    })
  const gl = {
    getExtension: () => null, getParameter: () => '',
    VERTEX_SHADER: 1, FRAGMENT_SHADER: 2, COMPILE_STATUS: 3, LINK_STATUS: 4, ARRAY_BUFFER: 5, STATIC_DRAW: 6, FLOAT: 7, TRIANGLES: 8,
    createShader: rec('createShader', {}), shaderSource: rec('shaderSource'), compileShader: rec('compileShader'),
    getShaderParameter: rec('getShaderParameter', true), deleteShader: rec('deleteShader'),
    createProgram: rec('createProgram', {}), attachShader: rec('attachShader'), linkProgram: rec('linkProgram'),
    getProgramParameter: rec('getProgramParameter', true), useProgram: rec('useProgram'), deleteProgram: rec('deleteProgram'),
    createBuffer: rec('createBuffer', {}), bindBuffer: rec('bindBuffer'), bufferData: rec('bufferData'), deleteBuffer: rec('deleteBuffer'),
    getAttribLocation: rec('getAttribLocation', 0), enableVertexAttribArray: rec('enableVertexAttribArray'), vertexAttribPointer: rec('vertexAttribPointer'),
    getUniformLocation: vi.fn((_p: unknown, name: string) => name), viewport: rec('viewport'),
    uniform2f: rec('uniform2f'), uniform3f: rec('uniform3f'), uniform1f: rec('uniform1f'), drawArrays: rec('drawArrays'),
    ...overrides,
  }
  return { gl, calls }
}
const canvasWith = (gl: unknown) => {
  const canvas = document.createElement('canvas')
  canvas.getContext = (() => gl) as unknown as typeof canvas.getContext
  return canvas
}

describe('createCausticsRenderer', () => {
  beforeEach(() => vi.restoreAllMocks())

  it('returns null when WebGL is unavailable, so the page just has no effect', () => {
    expect(createCausticsRenderer(canvasWith(null))).toBeNull()
  })

  it('returns null on a software renderer (no GPU: not worth the CPU)', () => {
    const { gl } = fakeGl({
      getExtension: () => ({ UNMASKED_RENDERER_WEBGL: 1 }),
      getParameter: () => 'ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device), SwiftShader driver)',
    })
    expect(createCausticsRenderer(canvasWith(gl))).toBeNull()
  })

  it('returns null when a shader fails to compile', () => {
    const { gl } = fakeGl({ getShaderParameter: () => false })
    expect(createCausticsRenderer(canvasWith(gl))).toBeNull()
  })

  it('returns null when the program fails to link', () => {
    const { gl } = fakeGl({ getProgramParameter: () => false })
    expect(createCausticsRenderer(canvasWith(gl))).toBeNull()
  })

  it('returns null when the GL objects cannot be created', () => {
    const { gl } = fakeGl({ createShader: () => null })
    expect(createCausticsRenderer(canvasWith(gl))).toBeNull()
  })

  it('sizes the canvas and viewport, sets uniforms, draws one full-screen triangle', () => {
    const { gl, calls } = fakeGl()
    const canvas = canvasWith(gl)
    const renderer = createCausticsRenderer(canvas)!
    renderer.resize(320, 200)
    renderer.setAppearance({ color: [0.1, 0.2, 0.3], strength: 0.4 })
    renderer.draw(12)

    expect([canvas.width, canvas.height]).toEqual([320, 200])
    expect(calls.viewport.at(-1)).toEqual([0, 0, 320, 200])
    expect(calls.uniform2f.at(-1)).toEqual(['uResolution', 320, 200])
    expect(calls.uniform3f.at(-1)).toEqual(['uColor', 0.1, 0.2, 0.3])
    expect(calls.uniform1f).toContainEqual(['uStrength', 0.4])
    expect(calls.uniform1f).toContainEqual(['uTime', 12])
    expect(calls.drawArrays.at(-1)).toEqual([8, 0, 3])
  })

  it('releases every GL resource on destroy', () => {
    const { gl, calls } = fakeGl()
    createCausticsRenderer(canvasWith(gl))!.destroy()
    expect(calls.deleteBuffer).toHaveLength(1)
    expect(calls.deleteProgram).toHaveLength(1)
    expect(calls.deleteShader).toHaveLength(2)
  })
})
