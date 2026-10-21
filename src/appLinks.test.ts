/// <reference types="node" />
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const read = (path: string) => readFileSync(path, 'utf8')
const config = JSON.parse(read('vercel.json')) as {
  headers: Array<{ source: string; headers: Array<{ key: string; value: string }> }>
}

// The files that let a phone open https://gupp.app/reset-password in the app
// instead of the browser. A wrong value fails silently on the phone, so what
// can be checked here is checked here.
describe('app links', () => {
  const aasa = JSON.parse(read('public/.well-known/apple-app-site-association')) as {
    applinks: { details: Array<{ appIDs: string[]; components: Array<{ '/': string }> }> }
  }
  const links = aasa.applinks.details[0]

  it('names the iOS bundle id under a team id', () => {
    expect(links.appIDs.length).toBeGreaterThan(0)
    for (const id of links.appIDs) expect(id).toMatch(/^[A-Z0-9]{10}\.app\.gupp\.guppApp$/)
  })

  it('opens only the password reset, in every language the site has', () => {
    expect(links.components.map((c) => c['/']).sort()).toEqual([
      '/en/reset-password',
      '/es/reset-password',
      '/reset-password',
    ])
  })

  it('serves the Apple file as JSON even though it has no extension', () => {
    const rule = config.headers.find((h) => h.source === '/.well-known/apple-app-site-association')
    expect(rule?.headers).toContainEqual({ key: 'Content-Type', value: 'application/json' })
  })

  it('declares the Android package, with its fingerprint still to fill in', () => {
    const [entry] = JSON.parse(read('public/.well-known/assetlinks.json')) as Array<{
      relation: string[]
      target: { package_name: string; sha256_cert_fingerprints: string[] }
    }>
    expect(entry.relation).toEqual(['delegate_permission/common.handle_all_urls'])
    expect(entry.target.package_name).toBe('app.gupp.gupp_app')
    for (const fingerprint of entry.target.sha256_cert_fingerprints) {
      expect(fingerprint).toMatch(/^([0-9A-F]{2}:){31}[0-9A-F]{2}$/)
    }
  })
})
