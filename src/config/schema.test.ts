import { describe, expect, it } from 'vitest'
import { ConfigError, parseHttpUrl, readEnv, variable } from './schema'

const schema = {
  REQUIRED_URL: variable(true, parseHttpUrl),
  OPTIONAL_URL: variable(false, parseHttpUrl),
}

describe('readEnv', () => {
  it('returns parsed values', () => {
    expect(readEnv(schema, { REQUIRED_URL: 'https://api.gupp.app/', OPTIONAL_URL: ' http://localhost:3000 ' })).toEqual({
      REQUIRED_URL: 'https://api.gupp.app',
      OPTIONAL_URL: 'http://localhost:3000',
    })
  })

  it('leaves a missing optional variable undefined, with no default', () => {
    expect(readEnv(schema, { REQUIRED_URL: 'https://a.co' }).OPTIONAL_URL).toBeUndefined()
  })

  it.each([{}, { REQUIRED_URL: '' }, { REQUIRED_URL: '   ' }])('fails on a missing required variable: %j', (raw) => {
    expect(() => readEnv(schema, raw)).toThrow(ConfigError)
    expect(() => readEnv(schema, raw)).toThrow(/REQUIRED_URL is required/)
  })

  it.each(['not a url', 'ftp://files.gupp.app'])('rejects a malformed value: %s', (value) => {
    expect(() => readEnv(schema, { REQUIRED_URL: value })).toThrow(/REQUIRED_URL is invalid/)
  })

  it('reports every problem at once', () => {
    expect(() => readEnv(schema, { OPTIONAL_URL: 'nope' })).toThrow(/REQUIRED_URL is required[\s\S]*OPTIONAL_URL is invalid/)
  })
})
