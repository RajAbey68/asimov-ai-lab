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
    expect(html).toMatch(/rel="canonical"/);
  });
});

/**
 * Helper: extract JSON-LD blocks from HTML using JSON.parse for deterministic assertions.
 * Avoids brittle regex against multiline/minified JSON.
 */
function extractJsonLd(html: string): Record<string, unknown>[] {
  const matches = html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  return [...matches].map(([, json]) => JSON.parse(json.trim()));
}

describe("Phase 3 — schema markup (deterministic JSON.parse)", () => {
  it("parses Organization schema with required properties", () => {
    const html = readFileSync(resolve(ROOT, "index.html"), "utf-8");
    const blocks = extractJsonLd(html);
    const org = blocks.find((b) => b["@type"] === "ProfessionalService");
    expect(org).toBeDefined();
    expect(org).toHaveProperty("name");
    expect(org).toHaveProperty("url");
  });

  it("parses FAQPage schema with at least 5 questions deterministically", () => {
    const html = readFileSync(resolve(ROOT, "index.html"), "utf-8");
    const blocks = extractJsonLd(html);
    const faq = blocks.find((b) => b["@type"] === "FAQPage");
    expect(faq).toBeDefined();
    const entities = (faq as { mainEntity?: unknown[] })?.mainEntity ?? [];
    expect(entities.length).toBeGreaterThanOrEqual(5);
  });

  it("parses Service schema for each offering", () => {
    const html = readFileSync(resolve(ROOT, "index.html"), "utf-8");
    const blocks = extractJsonLd(html);
    const services = blocks.filter((b) => b["@type"] === "Service");
    expect(services.length).toBeGreaterThanOrEqual(4);
    const names = services.map((s) => (s as { name?: string }).name);
    expect(names).toEqual(
      expect.arrayContaining([
        expect.stringContaining("ASIMOV Audit"),
        expect.stringContaining("Advisory Retainer"),
        expect.stringContaining("Embedded Advisory"),
        expect.stringContaining("PQC"),
      ])
    );
  });

  it("ships llms.txt with required sections", () => {
    const llms = readFileSync(resolve(ROOT, "public/llms.txt"), "utf-8");
    expect(llms).toMatch(/^# ASIMOV AI/m);
    expect(llms).toMatch(/## TL;DR for AI Assistants/);
    expect(llms).toMatch(/## Services/);
    expect(llms).toMatch(/## Practitioners/);
    expect(llms).toMatch(/## Links/);
  });

  it('index.html links to llms.txt via <link rel="alternate">', () => {
    const html = readFileSync(resolve(ROOT, "index.html"), "utf-8");
    expect(html).toMatch(/<link rel="alternate" type="text\/plain" href="\/llms\.txt"/);
  });
});

describe("Phase 3 — AI crawler discoverability", () => {
  it("robots.txt explicitly permits GPTBot", () => {
    const robots = readFileSync(resolve(ROOT, "public/robots.txt"), "utf-8");
    expect(robots).toMatch(/User-agent: GPTBot\nDisallow:\n/);
  });

  it("robots.txt explicitly permits ClaudeBot", () => {
    const robots = readFileSync(resolve(ROOT, "public/robots.txt"), "utf-8");
    expect(robots).toMatch(/User-agent: ClaudeBot\nDisallow:\n/);
  });

  it("robots.txt explicitly permits PerplexityBot", () => {
    const robots = readFileSync(resolve(ROOT, "public/robots.txt"), "utf-8");
    expect(robots).toMatch(/User-agent: PerplexityBot\nDisallow:\n/);
  });

  it("robots.txt explicitly permits Google-Extended", () => {
    const robots = readFileSync(resolve(ROOT, "public/robots.txt"), "utf-8");
    expect(robots).toMatch(/User-agent: Google-Extended\nDisallow:\n/);
  });
});

// E2E test — requires network access, runs locally only
const describeLive = process.env.E2E === "true" ? describe : describe.skip;
describeLive("Phase 3 — live serving validation", () => {
  it("serves llms.txt with correct content-type (not SPA fallback)", async () => {
    const res = await fetch("https://asimov-ai.org/llms.txt");
    expect(res.ok).toBe(true);
    expect(res.headers.get("content-type")).toMatch(/text\/plain/);
    const text = await res.text();
    expect(text).toMatch(/^# ASIMOV AI/m);
  });
});
