import {
  EU_AI_ACT_MILESTONES,
  daysUntil,
  getBannerText,
  getCurrentPhase,
  getNextMilestone,
} from "@/lib/euAiActTimeline";
import { describe, expect, it } from "vitest";

/**
 * TDD suite — written before implementation.
 * Contract: the EU AI Act banner must never present a past deadline as
 * upcoming, and every milestone must carry a tier-one source citation.
 * Dates per Regulation (EU) 2024/1689, Art. 113 (EUR-Lex 32024R1689).
 */
describe("EU AI Act timeline data", () => {
  it("contains the five Art. 113 milestones in chronological order", () => {
    // Assert
    expect(EU_AI_ACT_MILESTONES.length).toBeGreaterThanOrEqual(5);
    const dates = EU_AI_ACT_MILESTONES.map((m) => m.date);
    const sorted = [...dates].sort();
    expect(dates).toEqual(sorted);
  });

  it("every milestone cites a tier-one EUR-Lex source", () => {
    for (const m of EU_AI_ACT_MILESTONES) {
      expect(m.sourceUrl).toMatch(/^https:\/\/eur-lex\.europa\.eu\//);
      expect(m.sourceRef.length).toBeGreaterThan(0);
    }
  });

  it("includes the known applicability dates as amended by the 2026 Digital Omnibus", () => {
    const dates = EU_AI_ACT_MILESTONES.map((m) => m.date);
    expect(dates).toContain("2025-02-02"); // prohibitions + AI literacy
    expect(dates).toContain("2025-08-02"); // GPAI + governance + penalties
    expect(dates).toContain("2026-08-02"); // general application (transparency, classification)
    expect(dates).toContain("2026-12-02"); // marking/watermarking grace + new prohibitions
    expect(dates).toContain("2027-12-02"); // Annex III high-risk (deferred from 2 Aug 2026)
    expect(dates).toContain("2028-08-02"); // Art. 6(1) embedded high-risk (deferred from 2 Aug 2027)
  });
});

describe("getNextMilestone / getCurrentPhase", () => {
  it("on 2026-07-03 the next milestone is general application on 2026-08-02", () => {
    // Arrange
    const now = new Date("2026-07-03T12:00:00Z");

    // Act
    const next = getNextMilestone(now);
    const current = getCurrentPhase(now);

    // Assert
    expect(next?.date).toBe("2026-08-02");
    expect(current?.date).toBe("2025-08-02");
  });

  it("after 2026-08-02 the next milestone is the December 2026 omnibus date, never a past date", () => {
    const now = new Date("2026-09-01T00:00:00Z");
    const next = getNextMilestone(now);
    expect(next?.date).toBe("2026-12-02");
  });

  it("after the final milestone there is no next milestone", () => {
    const now = new Date("2029-01-01T00:00:00Z");
    expect(getNextMilestone(now)).toBeNull();
  });
});

describe("daysUntil", () => {
  it("computes whole days to the milestone date", () => {
    const now = new Date("2026-07-03T12:00:00Z");
    const milestone = EU_AI_ACT_MILESTONES.find((m) => m.date === "2026-08-02");
    if (!milestone) throw new Error("milestone missing");
    expect(daysUntil(milestone, now)).toBe(30);
  });
});

describe("getBannerText — never advertises a stale deadline", () => {
  it("before 2 Aug 2026 the banner names the 2026 general-application date", () => {
    const text = getBannerText(new Date("2026-07-03T12:00:00Z"));
    expect(text).toMatch(/2 AUG 2026/);
    expect(text).not.toMatch(/2025/);
  });

  it("after 2 Aug 2026 the banner moves on — no reference to Aug 2026 as upcoming", () => {
    const text = getBannerText(new Date("2026-09-01T00:00:00Z"));
    expect(text).toMatch(/2 DEC 2026/);
    expect(text).not.toMatch(/2 AUG 2026/);
  });

  it("after all milestones the banner states the Act is fully applicable", () => {
    const text = getBannerText(new Date("2029-01-01T00:00:00Z"));
    expect(text).toMatch(/FULLY APPLICABLE/i);
    expect(text).not.toMatch(/DAYS/);
  });

  it("includes a day countdown when a deadline is ahead", () => {
    const text = getBannerText(new Date("2026-07-03T12:00:00Z"));
    expect(text).toMatch(/30 DAYS/);
  });
});
