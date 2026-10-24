import type {
  AnalyticsEvent,
  AnalyticsPage,
  AnalyticsProvider,
} from "../types/analytics";

// The provider used until one is chosen (gupp-docs architecture/analytics): it does nothing, so the site
// measures nothing and sends nothing.
export const noopAnalytics: AnalyticsProvider = { track: () => {} };

// Puts consent in front of any provider. The provider is only reached while `allowed()` is true at the
// moment of the event, so withdrawing consent stops reporting at once, with no reload.
export function createAnalytics(
  provider: AnalyticsProvider,
  allowed: () => boolean,
): AnalyticsProvider {
  return {
    track(event: AnalyticsEvent) {
      if (!allowed()) return;
      provider.track(event);
    },
  };
}

const PAGES: Record<string, AnalyticsPage> = {
  "": "home",
  "/privacy": "privacy",
  "/terms": "terms",
  "/delete-account": "delete_account",
};

// "/es/privacy" -> 'privacy'. Pages that are not worth counting (the reset and unsubscribe shells carry
// a token in their URL, and the 404) return null, so they are never reported.
export function pageOf(pathname: string): AnalyticsPage | null {
  const rest = pathname.replace(/^\/(es|en)(?=\/|$)/, "").replace(/\/$/, "");
  return PAGES[rest] ?? null;
}
