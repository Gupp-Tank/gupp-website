import type { IconName } from './icon'
import type { WaterParameter } from './content'

export interface TankSummary {
  name: string
  status: string
  healthScore: number
  healthRingLabel: string
  lastReading: string
  parametersLink: string
  scoreBadgeLabel: string
}

export interface QuickAction {
  label: string
  icon: IconName
  tone: 'coral' | 'blue'
}

export interface ToolShortcut {
  label: string
  icon: IconName
  tone: 'green' | 'teal' | 'amber' | 'purple' | 'slate'
}

export interface UpNextTask {
  sectionLabel: string
  title: string
  when: string
  actionLabel: string
}

export interface ActivityItem {
  id: string
  title: string
  when: string
  kind: 'done' | 'new'
}

export interface AppNavItem {
  label: string
  icon: IconName
  active?: boolean
}

export interface DiagnosisPreview {
  condition: string
  timestamp: string
  causeLabel: string
  cause: string
  trendLabel: string
  trend: number[]
  recommendation: string
  actionLabel: string
}

export interface CompatibilityPreview {
  label: string
  species: string
  verdict: string
  checks: string[]
}

export interface AppPreviewData {
  tank: TankSummary
  parameters: WaterParameter[]
  quickActions: QuickAction[]
  tools: ToolShortcut[]
  upNext: UpNextTask
  activitySectionLabel: string
  activityLinkLabel: string
  activity: ActivityItem[]
  nav: AppNavItem[]
  diagnosis: DiagnosisPreview
  compatibility: CompatibilityPreview
}
