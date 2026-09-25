import { EarlyAccessForm } from '../../components/early-access/EarlyAccessForm'
import { PRIVACY_EMAIL } from '../../content/legal'
import { useEarlyAccessForm } from '../../hooks/useEarlyAccessForm'
import { useI18n } from '../../hooks/useI18n'
import { useLocalePath } from '../../hooks/useLocalePath'
import { getErrorMessage } from '../../errors'

// Connects the form to its hook and to the active language.
export function EarlyAccessSlot() {
  const { t } = useI18n()
  const localePath = useLocalePath()
  const form = useEarlyAccessForm()

  return (
    <EarlyAccessForm
      copy={t.earlyAccess}
      values={form.values}
      status={form.status}
      fieldErrors={form.fieldErrors}
      serverError={form.errorCode ? getErrorMessage({ code: form.errorCode }, t.errors) : null}
      termsHref={localePath('/terms')}
      privacyHref={localePath('/privacy')}
      privacyEmail={PRIVACY_EMAIL}
      onChange={form.onChange}
      onSubmit={form.onSubmit}
    />
  )
}
