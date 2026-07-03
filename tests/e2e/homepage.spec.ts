import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads with the correct document title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("ASIMOV AI — Standing AI Risk Counsel");
  });

  test("h1 is visible with the current hero text", async ({ page }) => {
    await page.goto("/");
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("We tell you the truth about your AI risk");
  });

  test("primary CTA leads to the diagnostic intake form", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /Book an AI Risk Diagnostic/i }).first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "#diagnostic");
    await cta.click();

    // Diagnostic section renders its intake form — assert it renders; never submit it.
    await expect(
      page.getByRole("heading", { level: 2, name: "Book an AI Risk Diagnostic" })
    ).toBeVisible();
    await expect(page.getByLabel("Your name")).toBeVisible();
    await expect(page.getByLabel("Email")).toHaveAttribute("type", "email");
  });

  test("footer cross-links to ai-integ.com and The Digital Law Firm", async ({ page }) => {
    await page.goto("/");
    const aiIntegLink = page.getByRole("link", { name: /AI Integrity community/i });
    await expect(aiIntegLink).toBeVisible();
    await expect(aiIntegLink).toHaveAttribute("href", "https://ai-integ.com");

    const dlfLink = page.getByRole("link", { name: /The Digital Law Firm/i });
    await expect(dlfLink).toBeVisible();
    await expect(dlfLink).toHaveAttribute("href", "https://www.lawsociety.org.uk");
  });

  test("diagnostic form renders required fields without submitting", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByLabel("Your name")).toHaveAttribute("required", "");
    await expect(page.getByLabel("Email")).toHaveAttribute("required", "");
    await expect(page.getByLabel(/I consent to the processing/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /confirm|book|send/i })).toBeVisible();
  });

  test("renders without horizontal overflow on mobile 375px viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(375);
  });
});
