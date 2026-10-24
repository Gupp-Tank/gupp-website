// What the site may report, and nothing else. No event carries an email, a name, free text or an
// address: a property is a value from a short list. The list is the website part of
// gupp-docs architecture/analytics; adding an event means adding it there first.
export type AnalyticsPage = "home" | "privacy" | "terms" | "delete_account";

export type AnalyticsEvent =
  | { name: "page_viewed"; page: AnalyticsPage }
  | { name: "early_access_submitted" };

export interface AnalyticsProvider {
  track: (event: AnalyticsEvent) => void;
}
