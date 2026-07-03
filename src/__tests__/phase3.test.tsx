import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { App } from "@/App";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

/**
 * TDD suite — Phase 3 mobile-first + SEO, written before implementation.
 * 1. The primary nav must not overflow a 375px viewport: link items collapse
 *    behind a native disclosure menu on mobile; the booking CTA stays visible.
 * 2. robots.txt and sitemap.xml exist and the sitemap lists the insights pages.
 * 3. The homepage head carries OG tags and Organization JSON-LD.
 */
describe("Phase 3 — mobile navigation", () => {
  it("provides a native disclosure menu for small screens", () => {
    render(<App />);
    const summary = screen.getByText(/menu/i);
    expect(summary.closest("details")).not.toBeNull();
  });

  it("keeps the Book Assessment CTA reachable outside the collapsed menu", () => {
    render(<App />);
    const ctas = screen.getAllByRole("link", { name: /book assessment/i });
    const outside = ctas.filter((el) => el.closest("details") === null);
    expect(outside.length).toBeGreaterThanOrEqual(1);
  });
});

describe("Phase 3 — crawlability and structured data", () => {
  it("ships robots.txt referencing the sitemap", () => {
    const robots = readFileSync(resolve(ROOT, "public/robots.txt"), "utf-8");
    expect(robots).toMatch(/Sitemap: https:\/\/asimov-ai\.org\/sitemap\.xml/);
  });

  it("ships a sitemap listing the homepage and every insights page", () => {
    const sitemap = readFileSync(resolve(ROOT, "public/sitemap.xml"), "utf-8");
    expect(sitemap).toContain("https://asimov-ai.org/</loc>");
    expect(sitemap).toContain("https://asimov-ai.org/insights/</loc>");
    for (const slug of [
      "pqc-client-files-2035-deadline",
      "pqc-harvest-now-decrypt-later",
      "pqc-bespoke-software",
      "agentic-who-signed-the-opinion",
      "agentic-engagement-letters-for-robots",
      "agentic-audit-trail-is-the-product",
    ]) {
      expect(sitemap).toContain(`https://asimov-ai.org/insights/${slug}/</loc>`);
    }
  });

  it("homepage head declares OG tags and Organization JSON-LD", () => {
    const html = readFileSync(resolve(ROOT, "index.html"), "utf-8");
    expect(html).toMatch(/property="og:title"/);
    expect(html).toMatch(/property="og:description"/);
    expect(html).toMatch(/"@type":\s*"ProfessionalService"/);
    expect(html).toMatch(/rel="canonical"/);
  });
});
