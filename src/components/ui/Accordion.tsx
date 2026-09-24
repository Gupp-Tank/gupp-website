import type { ReactNode } from 'react'
import { accordionPanelId, accordionTriggerId, useAccordion } from '../../hooks/useAccordion'
import { cx } from '../../lib/classNames'
import type { HeadingLevel } from './Heading'
import { Heading } from './Heading'
import { Icon } from './Icon'
import './Accordion.css'

export interface AccordionItem {
  id: string
  heading: string
  content: ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  /** Level of each item's heading, so the accordion fits the surrounding outline. */
  headingLevel: HeadingLevel
  className?: string
}

// Disclosure pattern: each trigger is a button inside a heading; panels stay in the DOM (hidden) so the text is indexable.
export function Accordion({ items, headingLevel, className }: AccordionProps) {
  const { isOpen, toggle, onKeyDown } = useAccordion(items.map((item) => item.id))

  return (
    <div className={cx('accordion', className)} onKeyDown={onKeyDown}>
      {items.map((item) => {
        const open = isOpen(item.id)
        return (
          <div key={item.id} className={cx('accordion__item', open && 'is-open')}>
            <Heading level={headingLevel} size="card" className="accordion__heading">
              <button
                type="button"
                id={accordionTriggerId(item.id)}
                className="accordion__trigger"
                aria-expanded={open}
                aria-controls={accordionPanelId(item.id)}
                onClick={() => toggle(item.id)}
              >
                <span>{item.heading}</span>
                <Icon name="chevronDown" size={20} className="accordion__chevron" />
              </button>
            </Heading>
            <div id={accordionPanelId(item.id)} role="region" aria-labelledby={accordionTriggerId(item.id)} hidden={!open} className="accordion__panel">
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
