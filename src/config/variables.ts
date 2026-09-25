import { parseHttpUrl, variable } from './schema.ts'

// Every variable the site reads. Keep .env.example in sync.
export const envSchema = {
  // Base URL of gupp-api. Setting it turns the early-access form on (src/config/features.ts);
  // it stays optional so the site still builds and shows the plain link until the API is live.
  VITE_API_BASE_URL: variable(false, parseHttpUrl),
}
