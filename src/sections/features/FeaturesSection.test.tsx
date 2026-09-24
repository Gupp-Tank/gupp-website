import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { dictionaries } from '../../i18n/dictionaries'
import { FeaturesSection } from './FeaturesSection'

describe.each(Object.entries(dictionaries))('FeaturesSection (%s)', (_locale, dictionary) => {
  const renderSection = () =>
    render(<FeaturesSection heading={dictionary.modules.heading} modules={dictionary.modules.items} views={dictionary.deviceViews} preview={dictionary.appPreview} />)

  afterEach(() => {
    window.location.hash = ''
  })

  it('keeps the section anchor and its accessible name', () => {
    const { container } = renderSection()
    expect(container.querySelector('#modules')).not.toBeNull()
    expect(screen.getByRole('region', { name: dictionary.modules.heading })).toBeInTheDocument()
  })

  it('offers the four modules as tabs with #module-<slug> anchors, the first one selected', () => {
    renderSection()
    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(4)
    tabs.forEach((tab, i) => {
      expect(tab.id).toBe(`module-${dictionary.modules.items[i].slug}`)
      expect(tab).toHaveAttribute('aria-selected', String(i === 0))
      expect(tab).toHaveAttribute('tabindex', i === 0 ? '0' : '-1')
    })
  })

  it('shows the screen of the selected module in a labelled panel', async () => {
    renderSection()
    const panel = screen.getByRole('tabpanel')
    expect(panel).toHaveAccessibleName(dictionary.modules.items[0].title)
    await userEvent.click(screen.getAllByRole('tab')[1])
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent(dictionary.modules.items[1].title)
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName(dictionary.modules.items[1].title)
    expect(screen.getByRole('img', { name: dictionary.deviceViews.diagnosisResult.alt })).toBeInTheDocument()
  })

  it('moves between tabs with the arrow keys, Home and End', async () => {
    renderSection()
    screen.getAllByRole('tab')[0].focus()
    await userEvent.keyboard('{ArrowDown}')
    expect(screen.getAllByRole('tab')[1]).toHaveFocus()
    await userEvent.keyboard('{End}')
    expect(screen.getAllByRole('tab')[3]).toHaveFocus()
    await userEvent.keyboard('{ArrowUp}{Home}')
    expect(screen.getAllByRole('tab')[0]).toHaveFocus()
  })

  it('selects the tab named by the URL hash, including later hash changes', async () => {
    window.location.hash = `#module-${dictionary.modules.items[2].slug}`
    renderSection()
    expect(screen.getAllByRole('tab')[2]).toHaveAttribute('aria-selected', 'true')
    await act(async () => {
      window.location.hash = `#module-${dictionary.modules.items[3].slug}`
    })
    expect(screen.getAllByRole('tab')[3]).toHaveAttribute('aria-selected', 'true')
  })
})
