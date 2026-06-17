import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads with the correct document title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("ASIMOV AI — Standing AI Risk Counsel");
  });

  test("h1 is visible on load", async ({ page }) => {
    await page.goto("/");
    const heading = page.getByRole("heading", { level: 1, name: /ASIMOV AI/i });
    await expect(heading).toBeVisible();
  });

  test("regulatory disclaimer is visible", async ({ page }) => {
    await page.goto("/");
    const disclaimer = page.getByRole("region", {
      name: "Regulatory and legal disclaimer",
    });
    await expect(disclaimer).toBeVisible();
  });

  test("primary CTA 'Book a Board Diagnostic' is present and visible", async ({ page }) => {
    await page.goto("/");
    const cta = page.locator("#primary-cta");
    await expect(cta).toBeVisible();
    await expect(cta).toHaveText("Book a Board Diagnostic");
  });

  test("renders correctly on mobile 375px viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const heading = page.getByRole("heading", { level: 1, name: /ASIMOV AI/i });
    await expect(heading).toBeVisible();

    const cta = page.locator("#primary-cta");
    await expect(cta).toBeVisible();

    const disclaimer = page.getByRole("region", {
      name: "Regulatory and legal disclaimer",
    });
    await expect(disclaimer).toBeVisible();
  });
});
