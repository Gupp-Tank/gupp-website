import type { AppPreviewData } from '../../types/appPreview'
import { Icon } from '../ui/Icon'
import { ActivityList } from './ActivityList'
import { AppBottomNav } from './AppBottomNav'
import { HealthCard } from './HealthCard'
import { QuickActionCard } from './QuickActionCard'
import { ToolShortcuts } from './ToolShortcuts'
import { UpNextCard } from './UpNextCard'
import './AppHomeScreen.css'

type AppHomeScreenProps = Pick<
  AppPreviewData,
  'tank' | 'parameters' | 'quickActions' | 'tools' | 'upNext' | 'activitySectionLabel' | 'activityLinkLabel' | 'activity' | 'nav'
>

export function AppHomeScreen({
  tank,
  parameters,
  quickActions,
  tools,
  upNext,
  activitySectionLabel,
  activityLinkLabel,
  activity,
  nav,
}: AppHomeScreenProps) {
  return (
    <div className="app-home">
      <header className="app-home__header">
        <span className="app-home__brand">
          <img src="/branding/icon.png" alt="" width={20} height={20} />
          Gupp
        </span>
        <span className="app-home__score">
          <Icon name="fish" size={14} strokeWidth={2.2} />
          {tank.scoreBadgeLabel}
        </span>
        <span className="app-home__bell">
          <Icon name="bell" size={18} />
          <span className="app-home__dot" />
        </span>
      </header>

      <div className="app-home__body">
        <div className="app-home__quick-actions">
          {quickActions.map((action) => (
            <QuickActionCard key={action.label} action={action} />
          ))}
        </div>

        <ToolShortcuts tools={tools} />

        <h3 className="app-home__tank-title">
          {tank.name} — {tank.status}
        </h3>

        <HealthCard tank={tank} parameters={parameters} />

        <UpNextCard task={upNext} />

        <section>
          <div className="app-home__section-head">
            <h4 className="app-home__section-title">{activitySectionLabel}</h4>
            <span className="app-home__link">{activityLinkLabel}</span>
          </div>
          <ActivityList items={activity} />
        </section>
      </div>

      <span className="app-home__fab">
        <Icon name="calculator" size={20} />
      </span>

      <AppBottomNav items={nav} />
    </div>
  )
}
