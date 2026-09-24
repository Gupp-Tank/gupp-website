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
