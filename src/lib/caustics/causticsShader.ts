export const VERTEX_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

// Iterated-trig water caustics. Output is premultiplied alpha in a single brand
// color, so the page background shows through and no second hue is introduced.
export const FRAGMENT_SHADER = `
precision mediump float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uColor;
uniform float uStrength;

const float TAU = 6.28318530718;
const int ITERATIONS = 5;

void main() {
  vec2 frag = gl_FragCoord.xy / uResolution;
  vec2 uv = vec2(frag.x * uResolution.x / uResolution.y, frag.y) * 3.0;

  float time = uTime * 0.28 + 23.0;
  vec2 p = uv * TAU - 250.0;
  vec2 i = p;
  float c = 1.0;
  float intensity = 0.005;

  for (int n = 0; n < ITERATIONS; n++) {
    float t = time * (1.0 - (3.5 / float(n + 1)));
    i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
    c += 1.0 / length(vec2(p.x / (sin(i.x + t) / intensity), p.y / (cos(i.y + t) / intensity)));
  }

  c /= float(ITERATIONS);
  c = 1.17 - pow(c, 1.4);
  float light = clamp(pow(abs(c), 8.0), 0.0, 1.0);

  // Light enters from the water surface: brightest top-right, gone toward the
  // bottom-left, so the effect settles behind the product mockup.
  vec2 fromSurface = (frag - vec2(0.78, 1.0)) * vec2(1.0, 1.1);
  float falloff = 1.0 - smoothstep(0.05, 0.9, length(fromSurface));

  float alpha = light * falloff * uStrength;
  gl_FragColor = vec4(uColor * alpha, alpha);
}
`
