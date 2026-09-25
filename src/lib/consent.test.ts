import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CONSENT_KEY, CONSENT_VERSION, createConsentStore, parseConsent } from './consent'

const memory = () => {
  const data = new Map<string, string>()
  return { getItem: (k: string) => data.get(k) ?? null, setItem: (k: string, v: string) => void data.set(k, v), data }
}

describe('parseConsent', () => {
  const valid = { version: CONSENT_VERSION, analytics: true, decidedAt: '2026-09-25T00:00:00.000Z' }

  it('accepts a well-formed current choice', () => {
    expect(parseConsent(JSON.stringify(valid))).toEqual(valid)
  })

  it.each([
    ['nothing stored', null],
    ['not JSON', '{oops'],
    ['an old version', JSON.stringify({ ...valid, version: '0' })],
    ['a non-boolean analytics flag', JSON.stringify({ ...valid, analytics: 'yes' })],
    ['a missing timestamp', JSON.stringify({ version: CONSENT_VERSION, analytics: false })],
  ])('ignores %s, so the visitor is asked again', (_name, raw) => {
    expect(parseConsent(raw)).toBeNull()
  })
})

describe('consent store', () => {
  let storage: ReturnType<typeof memory>
  beforeEach(() => {
    storage = memory()
  })

  it('starts unset and allows nothing', () => {
    const store = createConsentStore(() => storage)
    expect(store.get()).toEqual({ status: 'unset' })
    expect(store.allows('analytics')).toBe(false)
  })

  it('saves the decision with version and time, and allows analytics only when accepted', () => {
    const store = createConsentStore(() => storage)
    store.save(true)
    expect(store.allows('analytics')).toBe(true)
    const saved = JSON.parse(storage.data.get(CONSENT_KEY)!)
    expect(saved).toMatchObject({ version: CONSENT_VERSION, analytics: true })
    expect(Number.isNaN(Date.parse(saved.decidedAt))).toBe(false)
    store.save(false)
    expect(store.allows('analytics')).toBe(false)
  })

  it('restores a saved decision in a new store (after a reload)', () => {
    createConsentStore(() => storage).save(false)
    const reloaded = createConsentStore(() => storage)
    expect(reloaded.get().status).toBe('decided')
    expect(reloaded.allows('analytics')).toBe(false)
  })

  it('returns the same snapshot until something changes, and notifies subscribers', () => {
    const store = createConsentStore(() => storage)
    const first = store.get()
    expect(store.get()).toBe(first)
    const listener = vi.fn()
    const off = store.subscribe(listener)
    store.save(true)
    expect(listener).toHaveBeenCalledTimes(1)
    expect(store.get()).not.toBe(first)
    off()
    store.save(false)
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('keeps working for this visit when storage is blocked', () => {
    const blocked = {
      getItem: () => {
        throw new Error('blocked')
      },
      setItem: () => {
        throw new Error('blocked')
      },
    }
    const store = createConsentStore(() => blocked)
    expect(store.get()).toEqual({ status: 'unset' })
    store.save(true)
    expect(store.allows('analytics')).toBe(true)
  })

  it('has no storage on the server: nothing is allowed', () => {
    const store = createConsentStore(() => null)
    expect(store.allows('analytics')).toBe(false)
  })
})
