import { afterEach, describe, expect, it, vi } from 'vitest'
import { createPreferenceStore } from './preferenceStore'

type Mode = 'a' | 'b'
const make = () => {
  let current: Mode = 'a'
  return createPreferenceStore<Mode>({ storageKey: 'test-pref', read: () => current, apply: (v) => (current = v) })
}

describe('createPreferenceStore', () => {
  afterEach(() => vi.restoreAllMocks())

  it('applies, persists and notifies on set', () => {
    const store = make()
    const listener = vi.fn()
    store.subscribe(listener)
    store.set('b')
    expect(store.get()).toBe('b')
    expect(localStorage.getItem('test-pref')).toBe('b')
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('stops notifying after unsubscribe', () => {
    const store = make()
    const listener = vi.fn()
    const unsubscribe = store.subscribe(listener)
    unsubscribe()
    store.set('b')
    expect(listener).not.toHaveBeenCalled()
  })

  it('still applies and notifies when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('blocked', 'SecurityError')
    })
    const store = make()
    const listener = vi.fn()
    store.subscribe(listener)
    expect(() => store.set('b')).not.toThrow()
    expect(store.get()).toBe('b')
    expect(listener).toHaveBeenCalled()
  })
})
