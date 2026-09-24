import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { dictionaries } from '../../../i18n/dictionaries'
import type { DeviceViewId } from '../../../types/deviceViews'
import { DeviceView } from './DeviceView'

const cases: Array<[DeviceViewId, keyof typeof dictionaries.es.deviceViews, string]> = [
  ['home', 'home', 'Diagnosticar pez'],
  ['tank-detail', 'tankDetail', 'Camarón cereza'],
  ['diagnosis-result', 'diagnosisResult', 'Posible ich'],
  ['species-check', 'speciesCheck', 'Compatible con tus habitantes'],
]

describe.each(Object.entries(dictionaries))('DeviceView (%s)', (_locale, dictionary) => {
  it.each(cases)('exposes the %s screen as one image with its text alternative', (id, key) => {
    render(<DeviceView id={id} views={dictionary.deviceViews} preview={dictionary.appPreview} />)
    expect(screen.getByRole('img', { name: dictionary.deviceViews[key].alt })).toBeInTheDocument()
  })
})

describe('DeviceView content', () => {
  const views = dictionaries.es.deviceViews

  it.each(cases)('renders the %s screen copy', (id, _key, text) => {
    const { container } = render(<DeviceView id={id} views={views} preview={dictionaries.es.appPreview} />)
    expect(container).toHaveTextContent(text)
  })

  it('lists every livestock row and group of the tank', () => {
    const { container } = render(<DeviceView id="tank-detail" views={views} preview={dictionaries.es.appPreview} />)
    for (const group of views.tankDetail.groups) {
      expect(container).toHaveTextContent(group.label)
      for (const row of group.rows) expect(container).toHaveTextContent(row.name)
    }
  })

  it('numbers the diagnosis steps and only shows the reminder action where defined', () => {
    const { container } = render(<DeviceView id="diagnosis-result" views={views} preview={dictionaries.es.appPreview} />)
    expect(container.querySelectorAll('.dv-step')).toHaveLength(views.diagnosisResult.steps.length)
    expect(container.querySelectorAll('.dv-chip')).toHaveLength(views.diagnosisResult.steps.filter((s) => s.actionLabel).length)
  })
})
