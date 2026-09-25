import { useCallback, useSyncExternalStore } from 'react'
import { consentStore, type ConsentCategory, type ConsentState } from '../lib/consent'

const SERVER_STATE: ConsentState | { status: 'unknown' } = { status: 'unknown' }

// The one place components and services read consent from. Before the browser is known (server render and
// hydration) the status is 'unknown' so nothing is shown or loaded on a guess.
export function useConsent() {
  const state = useSyncExternalStore<ConsentState | { status: 'unknown' }>(consentStore.subscribe, consentStore.get, () => SERVER_STATE)

  const allows = useCallback((category: ConsentCategory) => state.status === 'decided' && state.choice[category], [state])

  return {
    status: state.status,
    allows,
    acceptAll: () => consentStore.save(true),
    rejectAll: () => consentStore.save(false),
    save: (analytics: boolean) => consentStore.save(analytics),
  }
}
