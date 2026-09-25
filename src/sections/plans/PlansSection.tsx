import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { Heading } from '../../components/ui/Heading'
import { Icon } from '../../components/ui/Icon'
import { Text } from '../../components/ui/Text'
import type { PlanCell, PlanRow, PlansCopy } from '../../types/content'
import './PlansSection.css'

// Meaning never rides on color alone: every cell has words, and the icon only repeats them.
function Cell({ cell }: { cell: PlanCell }) {
  return (
    <td className={`plans__cell plans__cell--${cell.kind}`}>
      <span className="plans__cell-content">
        {cell.kind === 'included' && <Icon name="check" size={14} />}
        {cell.kind === 'none' && <Icon name="minus" size={14} />}
        {cell.text}
      </span>
    </td>
  )
}

const isShared = (row: PlanRow) => row.free.kind === 'included' && row.premium.kind === 'included'

function RowGroup({ label, rows }: { label: string; rows: PlanRow[] }) {
  return (
    <tbody>
      <tr className="plans__group">
        <th scope="colgroup" colSpan={3}>
          {label}
        </th>
      </tr>
      {rows.map((row) => (
        <tr key={row.id}>
          <th scope="row">{row.label}</th>
          <Cell cell={row.free} />
          <Cell cell={row.premium} />
        </tr>
      ))}
    </tbody>
  )
}

export function PlansSection({ heading, caption, featureHeader, freeHeader, premiumHeader, bothGroup, premiumGroup, rows, note }: PlansCopy) {
  return (
    <Section id="plans" labelledBy="plans-title">
      <Container className="plans__inner">
        <Heading level={2} size="section" id="plans-title" className="plans__title">
          {heading}
        </Heading>
        <div className="plans__table-wrap">
          <table className="plans__table">
            <caption className="plans__caption">{caption}</caption>
            <thead>
              <tr>
                <th scope="col">{featureHeader}</th>
                <th scope="col">{freeHeader}</th>
                <th scope="col">{premiumHeader}</th>
              </tr>
            </thead>
            <RowGroup label={bothGroup} rows={rows.filter(isShared)} />
            <RowGroup label={premiumGroup} rows={rows.filter((row) => !isShared(row))} />
          </table>
        </div>
        <Text className="plans__note">
          {note}
        </Text>
      </Container>
    </Section>
  )
}
