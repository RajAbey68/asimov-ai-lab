import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Performance optimization tests for RAJ-884
 * TDD suite — tests written before implementation
 */

describe("Image Optimization", () => {
  const assetsDir = path.join(process.cwd(), "src", "assets");

  it("portrait images should be under 100KB each", () => {
    const images = [
      "rajiv-abeysinghe.webp",
      "sushila-nair-enhanced.webp",
      "nick-lockett-enhanced.webp",
    ];

    for (const img of images) {
      const imgPath = path.join(assetsDir, img);
      if (fs.existsSync(imgPath)) {
        const stats = fs.statSync(imgPath);
        const sizeKB = stats.size / 1024;
        expect(sizeKB).toBeLessThan(100);
      }
    }
  });

  it("portrait images should be in WebP format for better compression", () => {
    // After optimization, we expect WebP versions to exist
    const expectedImages = [
      "rajiv-abeysinghe.webp",
      "sushila-nair-enhanced.webp",
      "nick-lockett-enhanced.webp",
    ];

    for (const img of expectedImages) {
      const imgPath = path.join(assetsDir, img);
      // File should exist after optimization
      expect(fs.existsSync(imgPath)).toBe(true);
    }
  });
});

describe("Font Loading Strategy", () => {
  it("index.html should use font-display: swap for Google Fonts", () => {
    const indexPath = path.join(process.cwd(), "index.html");
    const indexHtml = fs.readFileSync(indexPath, "utf-8");

    // Check that font URLs include display=swap parameter
    expect(indexHtml).toMatch(/display=swap/);
  });

  it("critical fonts should be preloaded", () => {
    const indexPath = path.join(process.cwd(), "index.html");
    const indexHtml = fs.readFileSync(indexPath, "utf-8");

    // Geist is the heading font and should be preloaded
    expect(indexHtml).toMatch(/<link[^>]+rel="preload"[^>]+as="font"/);
  });
});

describe("Third-Party Script Loading", () => {
  it("Facebook Pixel should not be in the critical path", () => {
    const indexPath = path.join(process.cwd(), "index.html");
    const indexHtml = fs.readFileSync(indexPath, "utf-8");

    // Facebook pixel should either be deferred or loaded after interactive
    // We'll check that it's not a blocking script tag without async/defer
    const fbPixelMatch = indexHtml.match(/<script[^>]*facebook[^>]*>|fbq\('init'/i);

    if (fbPixelMatch) {
      // If FB pixel exists, it should be async or deferred or in a DOMContentLoaded handler
      const hasAsync = indexHtml.match(/<script[^>]*(async|defer)[^>]*facebook/i);
      const hasDeferredLoad = indexHtml.match(
        /addEventListener\(['"]DOMContentLoaded['"]|window\.onload/i
      );

      expect(hasAsync || hasDeferredLoad).toBeTruthy();
    }
  });

  it("Google Analytics should be loaded efficiently", () => {
    const indexPath = path.join(process.cwd(), "index.html");
    const indexHtml = fs.readFileSync(indexPath, "utf-8");

    // gtag.js script should be async
    const gtagMatch = indexHtml.match(/googletagmanager/i);

    if (gtagMatch) {
      // Check for async attribute on gtag script
      expect(indexHtml).toMatch(/gscript\.async\s*=\s*true|async.*googletagmanager/i);
    }
  });
});

describe("Lazy Loading", () => {
  it("YouTube iframes should have loading=lazy attribute", () => {
    const appPath = path.join(process.cwd(), "src", "App.tsx");
    const appContent = fs.readFileSync(appPath, "utf-8");

    // Check that all iframes with youtube URLs have loading="lazy"
    const iframeMatches = appContent.match(/<iframe[^>]*youtube[^>]*>/gi);

    if (iframeMatches) {
      for (const iframe of iframeMatches) {
        expect(iframe).toMatch(/loading=["']lazy["']/i);
      }
    }
  });
});
