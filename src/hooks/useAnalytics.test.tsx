import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const allows = vi.fn<(category: string) => boolean>();
vi.mock("./useConsent", () => ({ useConsent: () => ({ allows }) }));

import { useAnalytics } from "./useAnalytics";

describe("useAnalytics", () => {
  beforeEach(() => allows.mockReset());

  it("asks for the analytics category at the moment of the event, and stays the same object", () => {
    allows.mockReturnValue(false);
    const { result, rerender } = renderHook(() => useAnalytics());
    const first = result.current;

    result.current.track({ name: "early_access_submitted" });
    expect(allows).toHaveBeenCalledWith("analytics");

    rerender();
    expect(result.current).toBe(first);
  });
});
