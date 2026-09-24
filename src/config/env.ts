import { readEnv } from './schema'
import { envSchema } from './variables'

// The only place allowed to read `import.meta.env` (scripts/check-conventions.mjs).
export const env = readEnv(envSchema, import.meta.env)
