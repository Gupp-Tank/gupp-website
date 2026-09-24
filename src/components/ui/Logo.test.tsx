import { render, screen } from '@testing-library/react'
import { act } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { themeStore } from '../../lib/theme'
import { Logo } from './Logo'

describe('Logo', () => {
  afterEach(() => act(() => themeStore.set('light')))

  it('uses the dark-mode wordmark only in dark mode', () => {
    render(<Logo />)
    expect(screen.getByRole('img', { name: 'Gupp' })).toHaveAttribute('src', '/branding/logotype.png')
    act(() => themeStore.set('dark'))
    expect(screen.getByRole('img', { name: 'Gupp' })).toHaveAttribute('src', '/branding/logotype-dark.png')
    act(() => themeStore.set('light'))
    expect(screen.getByRole('img', { name: 'Gupp' })).toHaveAttribute('src', '/branding/logotype.png')
  })
})
