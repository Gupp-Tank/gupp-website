import { useSyncExternalStore } from 'react'
import type { PreferenceStore } from '../lib/preferenceStore'

// `serverSnapshot` is what the first render (server, or hydration) sees. For the language
// it reads the same source as the client (the page's <html lang>), so they always agree.
export function usePreference<T extends string>(store: PreferenceStore<T>, serverSnapshot: () => T): T {
  return useSyncExternalStore(store.subscribe, store.get, serverSnapshot)
}
