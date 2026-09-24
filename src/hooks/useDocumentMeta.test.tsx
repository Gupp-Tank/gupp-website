import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useDocumentMeta } from './useDocumentMeta'

describe('useDocumentMeta', () => {
  beforeEach(() => {
    document.head.innerHTML = '<meta name="description" content="old">'
    document.title = 'old'
  })

  it('sets the title and meta description', () => {
    renderHook(() => useDocumentMeta('New title', 'New description'))
    expect(document.title).toBe('New title')
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', 'New description')
  })

  it('updates both when the copy changes (locale switch)', () => {
    const { rerender } = renderHook(({ t, d }) => useDocumentMeta(t, d), { initialProps: { t: 'Hola', d: 'Descripción' } })
    rerender({ t: 'Hello', d: 'Description' })
    expect(document.title).toBe('Hello')
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', 'Description')
  })
})
