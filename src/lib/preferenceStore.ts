export interface PreferenceStore<T extends string> {
  get: () => T
  set: (value: T) => void
  subscribe: (onChange: () => void) => () => void
}

interface PreferenceStoreOptions<T extends string> {
  storageKey: string
  read: () => T
  apply: (value: T) => void
}

// The initial value is applied before first paint by the inline script in
// index.html, so the store only reads and writes the document from then on.
export function createPreferenceStore<T extends string>({
  storageKey,
  read,
  apply,
}: PreferenceStoreOptions<T>): PreferenceStore<T> {
  const listeners = new Set<() => void>()

  return {
    get: read,
    set(value) {
      apply(value)
      try {
        localStorage.setItem(storageKey, value)
      } catch {
        // Storage can be blocked (private mode); the choice then lasts for this visit only.
      }
      listeners.forEach((notify) => notify())
    },
    subscribe(onChange) {
      listeners.add(onChange)
      return () => listeners.delete(onChange)
    },
  }
}
