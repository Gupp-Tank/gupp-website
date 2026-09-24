// Repo conventions that plain lint rules can't express.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const walk = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })

const problems = []
for (const file of walk('src')) {
  if (!/\.(ts|tsx)$/.test(file) || file.startsWith(join('src', 'config'))) continue
  const code = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1')
  if (code.includes('import.meta.env')) {
    problems.push(`${file}: read configuration through src/config/env.ts, not import.meta.env`)
  }
}

if (problems.length) {
  console.error(problems.join('\n'))
  process.exit(1)
}
console.log('conventions: ok')
