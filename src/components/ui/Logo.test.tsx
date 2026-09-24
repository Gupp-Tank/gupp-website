import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Logo } from './Logo'

// Which one is visible is CSS (:root[data-theme]) and is checked in the browser (e2e).
describe('Logo', () => {
  it('ships both wordmarks in the markup, so the right one shows before any JavaScript runs', () => {
    const { container } = render(<Logo height={44} />)
    const srcs = [...container.querySelectorAll('img')].map((img) => img.getAttribute('src'))
    expect(srcs).toEqual(['/branding/logotype.png', '/branding/logotype-dark.png'])
  })

  it('reserves the space, so nothing shifts when it loads', () => {
    const { container } = render(<Logo height={44} />)
    for (const img of container.querySelectorAll('img')) {
      expect(img).toHaveAttribute('height', '44')
      expect(img).toHaveAttribute('width', '88')
    }
  })
})
