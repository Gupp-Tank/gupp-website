import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Accordion } from './Accordion'

const items = [
  { id: 'a', heading: 'First', content: <p>Answer A</p> },
  { id: 'b', heading: 'Second', content: <p>Answer B</p> },
  { id: 'c', heading: 'Third', content: <p>Answer C</p> },
]

const setup = () => render(<Accordion items={items} headingLevel={3} />)

describe('Accordion', () => {
  it('renders each trigger inside a heading, collapsed, with its panel in the DOM', () => {
    setup()
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3)
    for (const trigger of screen.getAllByRole('button')) expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(document.getElementById('faq-panel-a')).toHaveAttribute('hidden')
    expect(document.getElementById('faq-panel-a')).toHaveTextContent('Answer A')
  })

  it('opens and closes a panel with click, Enter and Space, and allows several open at once', async () => {
    setup()
    const [first, second] = screen.getAllByRole('button')
    await userEvent.click(first)
    expect(first).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('region', { name: 'First' })).toBeVisible()

    second.focus()
    await userEvent.keyboard('{Enter}')
    expect(second).toHaveAttribute('aria-expanded', 'true')
    expect(first).toHaveAttribute('aria-expanded', 'true')

    await userEvent.keyboard(' ')
    expect(second).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('region', { name: 'Second' })).toBeNull()
  })

  it('moves focus between triggers with the arrow keys, Home and End', async () => {
    setup()
    const [first, second, third] = screen.getAllByRole('button')
    first.focus()
    await userEvent.keyboard('{ArrowDown}')
    expect(second).toHaveFocus()
    await userEvent.keyboard('{End}')
    expect(third).toHaveFocus()
    await userEvent.keyboard('{ArrowDown}')
    expect(third).toHaveFocus()
    await userEvent.keyboard('{ArrowUp}{Home}')
    expect(first).toHaveFocus()
  })
})
