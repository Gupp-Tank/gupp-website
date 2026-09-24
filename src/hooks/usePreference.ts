import { useSyncExternalStore } from 'react'
import type { PreferenceStore } from '../lib/preferenceStore'

export function usePreference<T extends string>(store: PreferenceStore<T>, serverValue: T): T {
  return useSyncExternalStore(store.subscribe, store.get, () => serverValue)
}
