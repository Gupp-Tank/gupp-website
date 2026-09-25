export interface ConsentCopy {
  banner: {
    label: string
    title: string
    text: string
    accept: string
    reject: string
    customize: string
    policyLink: string
  }
  preferences: {
    title: string
    intro: string
    close: string
    essentialTitle: string
    essentialText: string
    essentialItems: string[]
    alwaysOn: string
    analyticsTitle: string
    analyticsText: string
    analyticsSwitchLabel: string
    save: string
    acceptAll: string
    rejectAll: string
  }
  /** Footer button that reopens the preferences. */
  footerLabel: string
}
