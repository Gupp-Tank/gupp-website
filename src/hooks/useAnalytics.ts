import { useMemo, useRef } from "react";
import { createAnalytics, noopAnalytics } from "../lib/analytics";
import type { AnalyticsProvider } from "../types/analytics";
import { useConsent } from "./useConsent";

// The provider adapter goes here when one is chosen. Until then the site reports nothing.
const provider: AnalyticsProvider = noopAnalytics;

// What components call to report an event. The consent check is made when the event happens, from a ref,
// so the returned object stays the same between renders.
export function useAnalytics(): AnalyticsProvider {
  const { allows } = useConsent();
  const allowsRef = useRef(allows);
  allowsRef.current = allows;
  return useMemo(
    () => createAnalytics(provider, () => allowsRef.current("analytics")),
    [],
  );
}
