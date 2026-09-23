import { FRAGMENT_SHADER, VERTEX_SHADER } from './causticsShader'

export interface CausticsAppearance {
  color: [number, number, number]
  strength: number
}

export interface CausticsRenderer {
  resize: (width: number, height: number) => void
  setAppearance: (appearance: CausticsAppearance) => void
  draw: (timeSeconds: number) => void
  destroy: () => void
}

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader
  gl.deleteShader(shader)
  return null
}

// Returns null when WebGL is unavailable; callers treat that as "no effect".
export function createCausticsRenderer(canvas: HTMLCanvasElement): CausticsRenderer | null {
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false })
  if (!gl) return null

  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
  const program = gl.createProgram()
  if (!vertex || !fragment || !program) return null

  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null
  gl.useProgram(program)

  // One triangle covering the whole viewport.
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const position = gl.getAttribLocation(program, 'aPosition')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  const uResolution = gl.getUniformLocation(program, 'uResolution')
  const uTime = gl.getUniformLocation(program, 'uTime')
  const uColor = gl.getUniformLocation(program, 'uColor')
  const uStrength = gl.getUniformLocation(program, 'uStrength')

  return {
    resize(width, height) {
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
      gl.uniform2f(uResolution, width, height)
    },
    setAppearance({ color, strength }) {
      gl.uniform3f(uColor, ...color)
      gl.uniform1f(uStrength, strength)
    },
    draw(timeSeconds) {
      gl.uniform1f(uTime, timeSeconds)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    },
    destroy() {
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertex)
      gl.deleteShader(fragment)
    },
  }
}
