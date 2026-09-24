// Enforces the color-token rule: src/index.css is the only place that may
// define colors; everything else must reference a token via var(--token).
// Also checks that dark-theme overrides have a light base and that color
// tokens defined for light are either overridden in dark or declared
// theme-invariant below.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const SRC = 'src'
const TOKEN_FILE = join(SRC, 'index.css')

// Same value in both themes on purpose (brand color, text on solid fills, tints derived via color-mix).
const THEME_INVARIANT = new Set(['--coral', '--on-solid', '--secondary-blue-solid'])

const LITERAL = /#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|oklch|lab|lch)\(/
const NAMED = /(?:^|[\s:;"'(])(?:color|background(?:-color)?|border(?:-color)?|fill|stroke|outline-color)\s*[:=]\s*["']?\s*(?:white|black|red|green|blue|gray|grey|orange|yellow|purple)\b/i

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

const stripComments = (text) => text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1')

const problems = []

for (const file of walk(SRC)) {
  // Tests feed colors in as data (e.g. hex inputs to a parser); only shipped code must use tokens.
  if (file === TOKEN_FILE || !/\.(css|ts|tsx)$/.test(file) || /\.test\.tsx?$/.test(file)) continue
  stripComments(readFileSync(file, 'utf8')).split('\n').forEach((line, i) => {
    if (LITERAL.test(line) || NAMED.test(line)) {
      problems.push(`${file}:${i + 1}  raw color "${line.trim()}" — use a token from src/index.css`)
    }
  })
}

const css = stripComments(readFileSync(TOKEN_FILE, 'utf8'))
const block = (selector) => {
  const start = css.indexOf(selector)
  if (start < 0) return {}
  const body = css.slice(css.indexOf('{', start) + 1, css.indexOf('\n}', start))
  return Object.fromEntries([...body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]))
}
const light = block(':root {')
const dark = block(":root[data-theme='dark']")

for (const name of Object.keys(dark)) {
  if (!(name in light)) problems.push(`${TOKEN_FILE}: ${name} is overridden in dark but has no light value`)
}
const isColor = (v) => LITERAL.test(v) || /color-mix\(/.test(v)
for (const [name, value] of Object.entries(light)) {
  if (isColor(value) && !(name in dark) && !THEME_INVARIANT.has(name)) {
    problems.push(`${TOKEN_FILE}: ${name} has no dark value (add one, or list it as theme-invariant in scripts/check-colors.mjs)`)
  }
}

if (problems.length) {
  console.error(problems.join('\n'))
  process.exit(1)
}
console.log('colors: ok')
