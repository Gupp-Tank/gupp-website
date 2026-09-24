import { env } from '../../config/env'
import { createHttpClient } from './createHttpClient'

export { createHttpClient, type HttpClient, type HttpMethod, type RequestOptions } from './createHttpClient'

// The shared instance. Feature services import this; tests build their own with a fake fetch.
export const http = createHttpClient({ baseUrl: env.VITE_API_BASE_URL })
