import type { AppNavItem } from './appPreview'
import type { IconName } from './icon'

export type DeviceViewId = 'home' | 'tank-detail' | 'diagnosis-result' | 'species-check'

export type Tone = 'coral' | 'blue' | 'green' | 'amber'

// Text alternative for the whole screen: the frame is decorative art, but the
// facts it shows (verdict, score, condition) must reach assistive tech too.
interface DeviceViewBase {
  alt: string
}

export interface EvidenceItem {
  id: string
  icon: IconName
  tone: Tone
  title: string
  detail: string
  trend?: number[]
  trendLabel?: string
}

export interface ActionStep {
  id: string
  title: string
  detail: string
  actionLabel?: string
}

export interface DiagnosisResultView extends DeviceViewBase {
  header: string
  urgency: string
  condition: string
  context: string
  confidence: number
  confidenceLabel: string
  evidenceTitle: string
  evidence: EvidenceItem[]
  stepsTitle: string
  steps: ActionStep[]
  primaryLabel: string
}

export interface TankFilter {
  id: string
  icon?: IconName
  label?: string
  count: number
  active?: boolean
}

export interface LivestockRow {
  id: string
  name: string
  quantity: string
  icon: IconName
  tone: Tone
}

export interface LivestockGroup {
  id: string
  label: string
  summary: string
  rows: LivestockRow[]
}

export interface TankDetailView extends DeviceViewBase {
  title: string
  subtitle: string
  score: number
  scoreLabel: string
  summary: string
  stats: { label: string; value: string }[]
  filters: TankFilter[]
  countLine: string
  groups: LivestockGroup[]
  addLabel: string
  nav: AppNavItem[]
}

export interface SpeciesResident {
  id: string
  name: string
}

export interface SpeciesCheckView extends DeviceViewBase {
  header: string
  subtitle: string
  name: string
  scientific: string
  icon: IconName
  stats: { label: string; value: string }[]
  verdict: string
  residentsTitle: string
  residents: SpeciesResident[]
  quantityLabel: string
  quantity: number
  ctaLabel: string
}

export interface DeviceViewsData {
  home: DeviceViewBase
  tankDetail: TankDetailView
  diagnosisResult: DiagnosisResultView
  speciesCheck: SpeciesCheckView
}
