import type { ReactElement } from 'react'
import type { AppPreviewData } from '../../../types/appPreview'
import type { DeviceViewId, DeviceViewsData } from '../../../types/deviceViews'
import { AppHomeScreen } from '../AppHomeScreen'
import { PhoneFrame } from '../PhoneFrame'
import { DiagnosisResultScreen } from './DiagnosisResultScreen'
import { SpeciesCheckScreen } from './SpeciesCheckScreen'
import { TankDetailScreen } from './TankDetailScreen'

interface DeviceViewProps {
  id: DeviceViewId
  views: DeviceViewsData
  preview: AppPreviewData
  className?: string
}

interface ViewEntry {
  alt: string
  screen: ReactElement
}

// One place that maps a view id to its screen; `Record` makes a new id a type error until it is handled.
const entries: Record<DeviceViewId, (views: DeviceViewsData, preview: AppPreviewData) => ViewEntry> = {
  home: (views, preview) => ({
    alt: views.home.alt,
    screen: (
      <AppHomeScreen
        tank={preview.tank}
        parameters={preview.parameters}
        quickActions={preview.quickActions}
        tools={preview.tools}
        upNext={preview.upNext}
        activitySectionLabel={preview.activitySectionLabel}
        activityLinkLabel={preview.activityLinkLabel}
        activity={preview.activity}
        nav={preview.nav}
      />
    ),
  }),
  'tank-detail': (views) => ({ alt: views.tankDetail.alt, screen: <TankDetailScreen view={views.tankDetail} /> }),
  'diagnosis-result': (views) => ({ alt: views.diagnosisResult.alt, screen: <DiagnosisResultScreen view={views.diagnosisResult} /> }),
  'species-check': (views) => ({ alt: views.speciesCheck.alt, screen: <SpeciesCheckScreen view={views.speciesCheck} /> }),
}

export function DeviceView({ id, views, preview, className }: DeviceViewProps) {
  const { alt, screen } = entries[id](views, preview)
  return (
    <div role="img" aria-label={alt} className={className}>
      <PhoneFrame>{screen}</PhoneFrame>
    </div>
  )
}
