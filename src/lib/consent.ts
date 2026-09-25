// The visitor's cookie/storage choice. Essential storage (language, theme, this choice) always works;
// everything else is a category the visitor can allow. Bump CONSENT_VERSION when a category is added
// or its purpose changes: everyone is then asked again.
export const CONSENT_KEY = 'gupp-consent'
export const CONSENT_VERSION = '1'

export type ConsentCategory = 'analytics'

export interface ConsentChoice {
  version: string
  analytics: boolean
  /** ISO timestamp of the decision. */
  decidedAt: string
}

export type ConsentState = { status: 'unset' } | { status: 'decided'; choice: ConsentChoice }

const UNSET: ConsentState = { status: 'unset' }

export function parseConsent(raw: string | null): ConsentChoice | null {
  if (!raw) return null
  try {
    const value = JSON.parse(raw) as Partial<ConsentChoice>
    if (value.version !== CONSENT_VERSION || typeof value.analytics !== 'boolean' || typeof value.decidedAt !== 'string') return null
    return { version: value.version, analytics: value.analytics, decidedAt: value.decidedAt }
  } catch {
    return null
  }
}

interface Storage {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
}

export interface ConsentStore {
  get: () => ConsentState
  /** Records the decision (analytics on or off) with the current version and time. */
  save: (analytics: boolean) => void
  /** The only question the rest of the site may ask: is this category allowed right now? */
  allows: (category: ConsentCategory) => boolean
  subscribe: (onChange: () => void) => () => void
}

// The state object is cached so `get` returns the same reference until something changes
// (React's useSyncExternalStore requires a stable snapshot).
export function createConsentStore(getStorage: () => Storage | null = () => (typeof localStorage === 'undefined' ? null : localStorage)): ConsentStore {
  const listeners = new Set<() => void>()
  let state: ConsentState | undefined

  const read = (): ConsentState => {
    try {
      const choice = parseConsent(getStorage()?.getItem(CONSENT_KEY) ?? null)
      return choice ? { status: 'decided', choice } : UNSET
    } catch {
      return UNSET
    }
  }

  const get = () => (state ??= read())

  return {
    get,
    save(analytics) {
      const choice: ConsentChoice = { version: CONSENT_VERSION, analytics, decidedAt: new Date().toISOString() }
      state = { status: 'decided', choice }
      try {
        getStorage()?.setItem(CONSENT_KEY, JSON.stringify(choice))
      } catch {
        // Storage can be blocked (private mode); the choice then lasts for this visit only.
      }
      listeners.forEach((notify) => notify())
    },
    allows(category) {
      const current = get()
      return current.status === 'decided' && current.choice[category]
    },
    subscribe(onChange) {
      listeners.add(onChange)
      return () => listeners.delete(onChange)
    },
  }
}

export const consentStore = createConsentStore()
