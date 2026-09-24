// Pure environment validation, shared by the app (src/config/env.ts) and the
// Vite build (vite.config.ts) so a bad or missing variable fails at build time
// and never reaches production. A variable never gets a default: fix the
// environment, don't hide the gap (same rule as gupp-api).

export class ConfigError extends Error {
  constructor(problems: string[]) {
    super(`Invalid environment:\n${problems.map((p) => `  - ${p}`).join('\n')}`)
    this.name = 'ConfigError'
  }
}

export interface VarSpec<T, R extends boolean> {
  required: R
  parse: (value: string) => T
}

export const variable = <T, R extends boolean>(required: R, parse: (value: string) => T): VarSpec<T, R> => ({
  required,
  parse,
})

export const parseHttpUrl = (value: string): string => {
  const url = new URL(value) // throws on garbage
  if (url.protocol !== 'http:' && url.protocol !== 'https:') throw new Error('must be an http(s) URL')
  return url.toString().replace(/\/$/, '')
}

type AnySpec = VarSpec<unknown, boolean>
type Schema = Record<string, AnySpec>

export type Env<S extends Schema> = {
  [K in keyof S]: S[K] extends VarSpec<infer T, infer R> ? (R extends true ? T : T | undefined) : never
}

export function readEnv<S extends Schema>(schema: S, raw: Record<string, unknown>): Env<S> {
  const problems: string[] = []
  const result: Record<string, unknown> = {}

  for (const [name, spec] of Object.entries(schema)) {
    const value = raw[name]
    if (typeof value !== 'string' || value.trim() === '') {
      if (spec.required) problems.push(`${name} is required but missing or empty`)
      result[name] = undefined
      continue
    }
    try {
      result[name] = spec.parse(value.trim())
    } catch (error) {
      problems.push(`${name} is invalid: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  if (problems.length) throw new ConfigError(problems)
  return result as Env<S>
}
