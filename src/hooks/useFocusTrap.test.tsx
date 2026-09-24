import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRef } from 'react'
import { describe, expect, it } from 'vitest'
import { useFocusTrap } from './useFocusTrap'

function Trap({ active = true, withHiddenLast = false }: { active?: boolean; withHiddenLast?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  useFocusTrap(ref, active)
  return (
    <>
      <button>outside before</button>
      <div ref={ref}>
        <button>first</button>
        <button>middle</button>
        <button>last</button>
        {withHiddenLast && (
          <div style={{ display: 'none' }}>
            <button>hidden copy</button>
          </div>
        )}
      </div>
      <button>outside after</button>
    </>
  )
}

describe('useFocusTrap', () => {
  it('wraps Tab from the last stop to the first, and Shift+Tab the other way', async () => {
    const user = userEvent.setup()
    render(<Trap />)
    screen.getByText('last').focus()
    await user.tab()
    expect(screen.getByText('first')).toHaveFocus()
    await user.tab({ shift: true })
    expect(screen.getByText('last')).toHaveFocus()
  })

  it('pulls focus back in when it is outside the container', async () => {
    const user = userEvent.setup()
    render(<Trap />)
    screen.getByText('outside before').focus()
    await user.tab()
    expect(screen.getByText('first')).toHaveFocus()
  })

  it('ignores focusables that are not rendered (display: none), so the wrap still works', async () => {
    const user = userEvent.setup()
    render(<Trap withHiddenLast />)
    screen.getByText('last').focus()
    await user.tab()
    expect(screen.getByText('first')).toHaveFocus()
  })

  it('does nothing while inactive', async () => {
    const user = userEvent.setup()
    render(<Trap active={false} />)
    screen.getByText('last').focus()
    await user.tab()
    expect(screen.getByText('outside after')).toHaveFocus()
  })
})
