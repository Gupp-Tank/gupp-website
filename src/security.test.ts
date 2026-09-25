/// <reference types="node" />
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const html = readFileSync('index.html', 'utf8')
const config = JSON.parse(readFileSync('vercel.json', 'utf8')) as {
  headers: Array<{ source: string; headers: Array<{ key: string; value: string }> }>
}
const header = (name: string) => config.headers.find((h) => h.source === '/(.*)')!.headers.find((h) => h.key === name)?.value ?? ''

describe('security headers', () => {
  const csp = header('Content-Security-Policy')

  it('allows exactly one inline script: the pre-paint one, by hash', () => {
    const inline = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1])
    expect(inline).toHaveLength(1)
    const hash = `'sha256-${createHash('sha256').update(inline[0]).digest('base64')}'`
    expect(csp, 'index.html inline script changed: update the hash in vercel.json').toContain(hash)
  })

  it('never allows unsafe script execution', () => {
    const scriptSrc = /script-src ([^;]+)/.exec(csp)![1]
    expect(scriptSrc).not.toContain('unsafe-inline')
    expect(scriptSrc).not.toContain('unsafe-eval')
  })

  it.each([
    ["default-src 'self'"],
    ["object-src 'none'"],
    ["base-uri 'self'"],
    ["frame-ancestors 'none'"],
    ['upgrade-insecure-requests'],
  ])('CSP contains %s', (directive) => expect(csp).toContain(directive))

  it('sets the rest of the baseline headers', () => {
    expect(header('Strict-Transport-Security')).toMatch(/max-age=\d{7,}/)
    expect(header('X-Content-Type-Options')).toBe('nosniff')
    expect(header('Referrer-Policy')).toBe('strict-origin-when-cross-origin')
    expect(header('Permissions-Policy')).toContain('camera=()')
    expect(header('X-Frame-Options')).toBe('DENY')
  })

  it('allows one external origin, the API, and only to connect to (the early-access form)', () => {
    const origins = [...csp.matchAll(/https?:\/\/[^\s;]+/g)].map((m) => m[0])
    expect(origins).toEqual(['https://api.gupp.app'])
    expect(/connect-src ([^;]+)/.exec(csp)![1]).toContain('https://api.gupp.app')
  })
})
