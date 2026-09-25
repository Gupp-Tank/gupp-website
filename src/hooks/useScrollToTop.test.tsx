import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useScrollToTop } from './useScrollToTop'

describe('useScrollToTop', () => {
  const scrollTo = vi.fn()

  beforeEach(() => {
    window.scrollTo = scrollTo as unknown as typeof window.scrollTo
  })
  afterEach(() => {
    scrollTo.mockClear()
    document.body.innerHTML = ''
  })

  it('leaves the first render to the browser', () => {
    renderHook(() => useScrollToTop('/es', ''))
    expect(scrollTo).not.toHaveBeenCalled()
  })

  it('scrolls to the top when the page changes', () => {
    const { rerender } = renderHook(({ path }) => useScrollToTop(path, ''), { initialProps: { path: '/es' } })
    rerender({ path: '/es/terms' })
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'instant' })
  })

  it('does not scroll when only the hash changes on the same page', () => {
    const { rerender } = renderHook(({ hash }) => useScrollToTop('/es/privacy', hash), { initialProps: { hash: '' } })
    rerender({ hash: '#rights' })
    expect(scrollTo).not.toHaveBeenCalled()
  })

  it('goes to the anchor when the new page has a hash that exists', () => {
    const target = document.createElement('div')
    target.id = 'faq'
    target.scrollIntoView = vi.fn()
    document.body.append(target)
    const { rerender } = renderHook(({ path, hash }) => useScrollToTop(path, hash), { initialProps: { path: '/es/terms', hash: '' } })
    rerender({ path: '/es', hash: '#faq' })
    expect(target.scrollIntoView).toHaveBeenCalled()
    expect(scrollTo).not.toHaveBeenCalled()
  })
})
