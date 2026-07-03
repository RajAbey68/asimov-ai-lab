import { App } from "@/App";
import { getBannerText } from "@/lib/euAiActTimeline";
import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * TDD suite — Phase 0 credibility patch, written before implementation.
 * 1. The regulatory banner is computed from the EU AI Act timeline, not hardcoded.
 * 2. The ASIMOV–AI Integ relationship is disclosed as a conflict wall, not
 *    an unverifiable "no commercial benefit" claim.
 * 3. The live post-quantum hub (pqc.asimov-ai.org) is reachable from the page.
 */
describe("Phase 0 — credibility patch", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-03T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the date-aware EU AI Act banner, not the hardcoded alert", () => {
    // Arrange + Act
    render(<App />);

    // Assert — banner text comes from the timeline library
    const expected = getBannerText(new Date());
    expect(screen.getByText(expected)).toBeInTheDocument();
    // The stale hardcoded string must be gone
    expect(screen.queryByText(/CRITICAL DEADLINE ALERT: EU AI ACT \(AUG 2026\)/)).toBeNull();
  });

  it("banner carries a tier-one source citation link to EUR-Lex", () => {
    render(<App />);
    const link = screen.getByRole("link", { name: /Regulation \(EU\) 2024\/1689/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("eur-lex.europa.eu"));
  });

  it("discloses the conflict wall instead of claiming no conflict of interest", () => {
    render(<App />);

    // The unverifiable absolutes must be gone
    expect(screen.queryByText(/No conflict of interest\. Ever\./i)).toBeNull();
    expect(screen.queryByText(/receives no commercial benefit/i)).toBeNull();

    // The disclosed wall must be present
    expect(screen.getAllByText(/sister practice/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/unaffiliated/i).length).toBeGreaterThanOrEqual(1);
  });

  it("links to the live post-quantum advisory hub", () => {
    render(<App />);
    const pqcLinks = screen.getAllByRole("link", { name: /post-quantum/i });
    expect(pqcLinks.length).toBeGreaterThanOrEqual(1);
    expect(pqcLinks[0]).toHaveAttribute("href", expect.stringContaining("pqc.asimov-ai.org"));
  });
});
