import type { Locale } from '../../i18n/locales'
import type { HeaderCopy } from '../../types/content'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'
import './PreferenceControls.css'

interface PreferenceControlsProps {
  copy: Pick<HeaderCopy, 'preferencesLabel' | 'languageLabel' | 'themeToDark' | 'themeToLight'>
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

export function PreferenceControls({ copy, locale, onLocaleChange }: PreferenceControlsProps) {
  return (
    <div className="pref-control" role="group" aria-label={copy.preferencesLabel}>
      <LanguageSwitcher locale={locale} onChange={onLocaleChange} label={copy.languageLabel} />
      <span className="pref-control__divider" aria-hidden />
      <ThemeToggle toDarkLabel={copy.themeToDark} toLightLabel={copy.themeToLight} />
    </div>
  )
}
