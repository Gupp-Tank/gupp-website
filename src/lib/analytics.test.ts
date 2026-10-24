import { describe, expect, it, vi } from "vitest";
import type { AnalyticsEvent } from "../types/analytics";
import { createAnalytics, noopAnalytics, pageOf } from "./analytics";

const event: AnalyticsEvent = { name: "early_access_submitted" };

describe("createAnalytics", () => {
  it("reaches the provider only while consent allows it", () => {
    const track = vi.fn();
    let allowed = false;
    const analytics = createAnalytics({ track }, () => allowed);

    analytics.track(event);
    expect(track).not.toHaveBeenCalled();

    allowed = true;
    analytics.track(event);
    expect(track).toHaveBeenCalledWith(event);

    allowed = false;
    analytics.track(event);
    expect(track).toHaveBeenCalledTimes(1);
  });

  it("does nothing at all without a provider", () => {
    expect(() =>
      createAnalytics(noopAnalytics, () => true).track(event),
    ).not.toThrow();
  });
});

describe("pageOf", () => {
  it.each([
    ["/es", "home"],
    ["/en/", "home"],
    ["/es/privacy", "privacy"],
    ["/en/terms", "terms"],
    ["/es/delete-account", "delete_account"],
  ])("%s is %s", (path, page) => {
    expect(pageOf(path)).toBe(page);
  });

  it.each(["/es/reset-password", "/en/unsubscribe", "/es/no-existe", "/fr"])(
    "%s is never reported",
    (path) => {
      expect(pageOf(path)).toBeNull();
    },
  );
});
