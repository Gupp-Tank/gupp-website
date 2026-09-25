import { env } from './env'

// The early-access form needs the API. Until VITE_API_BASE_URL is set (together with the Vercel setting), the
// site shows the plain link instead of a form that could not work.
export const earlyAccessEnabled = Boolean(env.VITE_API_BASE_URL)
