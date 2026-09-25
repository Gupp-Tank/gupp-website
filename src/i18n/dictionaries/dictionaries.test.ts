import { describe, expect, it } from 'vitest'
import { ErrorCode } from '../../errors'
import { dictionaries } from '.'

describe.each(Object.entries(dictionaries))('%s dictionary', (_locale, dictionary) => {
  it('has copy for every error code and nothing extra', () => {
    expect(Object.keys(dictionary.errors).sort()).toEqual(Object.values(ErrorCode).sort())
  })

  it('has no empty error copy', () => {
    for (const message of Object.values(dictionary.errors)) expect(message.trim()).not.toBe('')
  })
})

describe('device views', () => {
  const shape = (value: unknown): unknown =>
    Array.isArray(value) ? value.map(shape) : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)])) : typeof value

  it('has the same structure in every locale (ids, keys, value types)', () => {
    const [first, ...rest] = Object.values(dictionaries).map((d) => shape(d.deviceViews))
    for (const other of rest) expect(other).toEqual(first)
  })

  it('references a real view from every module that declares one', () => {
    const known = new Set(['home', 'tank-detail', 'diagnosis-result', 'species-check'])
    for (const dictionary of Object.values(dictionaries)) {
      for (const module of dictionary.modules.items) if (module.view) expect(known.has(module.view)).toBe(true)
    }
  })

  it('gives every screen a text alternative', () => {
    for (const dictionary of Object.values(dictionaries)) {
      for (const view of Object.values(dictionary.deviceViews)) expect(view.alt.trim()).not.toBe('')
    }
  })
})

describe('page section copy', () => {
  it('has the same steps and questions (by id) in every locale', () => {
    const ids = (d: (typeof dictionaries)['es']) => ({ steps: d.howItWorks.steps.map((x) => x.id), faq: d.faq.items.map((x) => x.id), plans: d.plans.rows.map((x) => [x.id, x.free.kind, x.premium.kind]) })
    const [first, ...rest] = Object.values(dictionaries).map(ids)
    for (const other of rest) expect(other).toEqual(first)
  })

  it('has no empty question or answer', () => {
    for (const d of Object.values(dictionaries)) for (const item of d.faq.items) expect(item.question.trim() && item.answer.trim()).toBeTruthy()
  })
})
