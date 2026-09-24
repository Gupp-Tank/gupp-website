// Repo conventions that plain lint rules can't express.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const walk = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })

const problems = []
const inDir = (file, dir) => file.startsWith(join('src', dir) + '/')

for (const file of walk('src')) {
  if (!/\.(ts|tsx)$/.test(file)) continue
  const code = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1')

  if (!inDir(file, 'config') && code.includes('import.meta.env')) {
    problems.push(`${file}: read configuration through src/config/env.ts, not import.meta.env`)
  }
  if (!inDir(file, 'services/http') && /\bfetch\s*\(|\bXMLHttpRequest\b|\bnavigator\.sendBeacon\b/.test(code)) {
    problems.push(`${file}: network calls go through the client in src/services/http, not fetch/XHR directly`)
  }
}

if (problems.length) {
  console.error(problems.join('\n'))
  process.exit(1)
}
console.log('conventions: ok')
