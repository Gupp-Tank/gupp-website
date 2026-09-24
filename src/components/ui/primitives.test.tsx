import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { cx } from '../../lib/classNames'
import { Container } from '../layout/Container'
import { Section } from '../layout/Section'
import { Heading } from './Heading'
import { Text } from './Text'

describe('cx', () => {
  it('drops falsy values', () => {
    expect(cx('a', false, null, undefined, '', 'b')).toBe('a b')
  })
})

describe('Heading', () => {
  it.each([1, 2, 3, 4] as const)('renders an h%i for level %i', (level) => {
    render(<Heading level={level} size="section">Title</Heading>)
    expect(screen.getByRole('heading', { level })).toHaveTextContent('Title')
  })

  it('keeps visual size independent of the document level', () => {
    render(<Heading level={3} size="display" className="extra" id="x">Big h3</Heading>)
    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toHaveClass('heading', 'heading--display', 'extra')
    expect(heading).toHaveAttribute('id', 'x')
  })
})

describe('Text', () => {
  it('defaults to body size and body tone', () => {
    render(<Text>copy</Text>)
    expect(screen.getByText('copy')).toHaveClass('text--size-body', 'text--tone-body')
  })

  it('accepts size, tone and a layout class from the caller', () => {
    render(<Text size="lead" tone="muted" className="mt">copy</Text>)
    expect(screen.getByText('copy')).toHaveClass('text--size-lead', 'text--tone-muted', 'mt')
  })
})

describe('Section and Container', () => {
  it('names the section landmark from its heading', () => {
    render(
      <Section labelledBy="t" id="anchor">
        <Container>
          <Heading level={2} size="section" id="t">Features</Heading>
        </Container>
      </Section>,
    )
    const region = screen.getByRole('region', { name: 'Features' })
    expect(region).toHaveAttribute('id', 'anchor')
    expect(region.firstElementChild).toHaveClass('container')
  })
})
