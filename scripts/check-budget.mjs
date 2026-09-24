// Performance budget for the production build (run after `npm run build`).
// Sizes are gzip for text assets and raw bytes for binaries. Numbers keep ~25%
// headroom over today; raise one deliberately, in its own PR, never by accident.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'
import { gzipSync } from 'node:zlib'

const KB = 1024
const BUDGET = {
  entryJsGzip: 120 * KB, // the main bundle: React, router, app code
  totalJsGzip: 135 * KB, // every JS chunk together
  totalCssGzip: 12 * KB,
  fontFile: 40 * KB, // one woff2 subset
  fontsTotal: 120 * KB,
  image: 60 * KB, // any single image in dist
}

const dist = 'dist'
const walk = (dir) => readdirSync(dir).flatMap((n) => (statSync(join(dir, n)).isDirectory() ? walk(join(dir, n)) : [join(dir, n)]))
const files = walk(dist)
const gz = (f) => gzipSync(readFileSync(f)).length
const size = (f) => statSync(f).size
const kb = (n) => `${(n / KB).toFixed(1)} kB`

const js = files.filter((f) => extname(f) === '.js')
const css = files.filter((f) => extname(f) === '.css')
const fonts = files.filter((f) => extname(f) === '.woff2')
const images = files.filter((f) => ['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg', '.gif'].includes(extname(f)))
const entry = js.reduce((a, b) => (size(a) >= size(b) ? a : b))

const checks = [
  ['entry JS (gzip)', gz(entry), BUDGET.entryJsGzip],
  ['all JS (gzip)', js.reduce((n, f) => n + gz(f), 0), BUDGET.totalJsGzip],
  ['all CSS (gzip)', css.reduce((n, f) => n + gz(f), 0), BUDGET.totalCssGzip],
  ['fonts total', fonts.reduce((n, f) => n + size(f), 0), BUDGET.fontsTotal],
  ...fonts.map((f) => [`font ${f.split('/').pop()}`, size(f), BUDGET.fontFile]),
  ...images.map((f) => [`image ${f.replace(`${dist}/`, '')}`, size(f), BUDGET.image]),
]

let failed = 0
for (const [name, actual, max] of checks) {
  const over = actual > max
  if (over) failed++
  console.log(`${over ? 'OVER' : 'ok  '} ${name.padEnd(46)} ${kb(actual).padStart(9)} / ${kb(max)}`)
}
if (failed) {
  console.error(`\n${failed} budget(s) exceeded. Shrink the asset, or raise the budget deliberately in scripts/check-budget.mjs.`)
  process.exit(1)
}
