import { parseHttpUrl, variable } from './schema.ts'

// Every variable the site reads. Keep .env.example in sync.
export const envSchema = {
  // Base URL of gupp-api. Optional until the early-access form (#24) needs it;
  // flip `required` to true in that change, together with the Vercel setting.
  VITE_API_BASE_URL: variable(false, parseHttpUrl),
}
