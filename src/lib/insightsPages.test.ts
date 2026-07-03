import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * TDD suite — Phase 2 Insights hub, written before the pages exist.
 * The hub is static HTML under public/insights/ (copied verbatim by Vite).
 * Contract, per project CLAUDE.md hard rules:
 *  - the regulatory disclaimer appears on every public page
 *  - every article cites tier-one primary sources
 *  - every page is mobile-first (viewport meta) with a meta description
 */
const INSIGHTS_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "../../public/insights");

const TIER_ONE_HOSTS = [
  "eur-lex.europa.eu",
  "csrc.nist.gov",
  "nist.gov",
  "ncsc.gov.uk",
  "artificialintelligenceact.eu",
  "iso.org",
  "isaca.org",
  "ico.org.uk",
  "fca.org.uk",
  "sra.org.uk",
  "canlii.org",
  "modelcontextprotocol.io",
  "imda.gov.sg",
  "digital-strategy.ec.europa.eu",
];

function articleDirs(): string[] {
  return readdirSync(INSIGHTS_DIR).filter((entry) =>
    statSync(join(INSIGHTS_DIR, entry)).isDirectory()
  );
}

function pageHtml(dir: string): string {
  return readFileSync(join(INSIGHTS_DIR, dir, "index.html"), "utf-8");
}

describe("Insights hub — structure", () => {
  it("has a hub index page", () => {
    const html = readFileSync(join(INSIGHTS_DIR, "index.html"), "utf-8");
    expect(html).toContain("<h1");
  });

  it("publishes at least three PQC and three agentic articles", () => {
    const dirs = articleDirs();
    expect(dirs.filter((d) => d.startsWith("pqc-")).length).toBeGreaterThanOrEqual(3);
    expect(dirs.filter((d) => d.startsWith("agentic-")).length).toBeGreaterThanOrEqual(3);
  });
});

describe("Insights hub — every public page honours the hard rules", () => {
  it("every page carries the mandatory disclaimer", () => {
    const pages = [join(INSIGHTS_DIR, "index.html")];
    for (const dir of articleDirs()) pages.push(join(INSIGHTS_DIR, dir, "index.html"));
    for (const page of pages) {
      const html = readFileSync(page, "utf-8");
      expect(html, `${page} missing disclaimer`).toMatch(/do not constitute legal advice/i);
    }
  });

  it("every article cites at least three tier-one primary sources", () => {
    for (const dir of articleDirs()) {
      const html = pageHtml(dir);
      const hits = TIER_ONE_HOSTS.filter((host) => html.includes(host));
      expect(hits.length, `${dir} has only ${hits.length} tier-one hosts`).toBeGreaterThanOrEqual(
        3
      );
    }
  });

  it("every page is mobile-first: viewport meta + meta description + canonical", () => {
    const pages = [join(INSIGHTS_DIR, "index.html")];
    for (const dir of articleDirs()) pages.push(join(INSIGHTS_DIR, dir, "index.html"));
    for (const page of pages) {
      const html = readFileSync(page, "utf-8");
      expect(html, `${page} missing viewport`).toMatch(/name="viewport"/);
      expect(html, `${page} missing description`).toMatch(/name="description"/);
      expect(html, `${page} missing canonical`).toMatch(/rel="canonical"/);
    }
  });

  it("every article discloses AI-assisted drafting and cross-model review", () => {
    for (const dir of articleDirs()) {
      const html = pageHtml(dir);
      expect(html, `${dir} missing AI-use disclosure`).toMatch(/AI-assisted drafting/i);
      expect(html, `${dir} missing review disclosure`).toMatch(/cross-model review/i);
    }
  });

  it("every article declares Article JSON-LD with an author", () => {
    for (const dir of articleDirs()) {
      const html = pageHtml(dir);
      expect(html, `${dir} missing JSON-LD`).toContain('"@type": "Article"');
      expect(html, `${dir} missing author`).toMatch(/"author"/);
    }
  });
});
