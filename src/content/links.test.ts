import { describe, expect, it } from 'vitest'
import { links } from './links'

describe('external links', () => {
  it('point at the Gupp accounts on the right network, over https', () => {
    expect(links.instagram).toBe('https://www.instagram.com/gupp.app')
    expect(links.x).toBe('https://x.com/gupp_app')
    for (const url of [links.instagram, links.x]) expect(new URL(url).protocol).toBe('https:')
  })
})
