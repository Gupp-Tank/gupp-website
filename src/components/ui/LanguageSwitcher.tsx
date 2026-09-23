import { LOCALE_NAMES, LOCALES, type Locale } from '../../i18n/locales'

interface LanguageSwitcherProps {
  locale: Locale
  onChange: (locale: Locale) => void
  label: string
}

export function LanguageSwitcher({ locale, onChange, label }: LanguageSwitcherProps) {
  return (
    <div className="pref-control__segment" role="group" aria-label={label}>
      {LOCALES.map((option) => (
        <button
          key={option}
          type="button"
          lang={option}
          className="pref-control__button"
          aria-pressed={option === locale}
          aria-label={LOCALE_NAMES[option]}
          onClick={() => onChange(option)}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
