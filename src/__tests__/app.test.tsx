import { App } from "@/App";
import { cn } from "@/lib/utils";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

/**
 * TDD suite — written before implementation.
 * These tests define the contract that App.tsx must satisfy.
 */
describe("App", () => {
  it("renders without crashing", () => {
    // Arrange + Act
    const { container } = render(<App />);

    // Assert — at minimum the root element exists and has children
    expect(container.firstChild).not.toBeNull();
  });

  it("renders h1 with only the main hero line — kicker lives outside the h1", () => {
    // Arrange + Act
    render(<App />);

    // Assert — h1 is the plain-English promise, nothing else
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("We tell you the truth about your AI risk");
    expect(heading).not.toHaveTextContent("STANDING AI RISK COUNSEL");

    // The kicker still renders, outside the h1
    expect(screen.getByText(/STANDING AI RISK COUNSEL/i)).toBeInTheDocument();
  });

  it("renders the retainer line under the h1", () => {
    // Arrange + Act
    render(<App />);

    // Assert
    expect(
      screen.getByText(/You keep a lawyer on retainer before there's a lawsuit/i)
    ).toBeInTheDocument();
  });

  it("renders disclaimer section with correct aria-label", () => {
    // Arrange + Act
    render(<App />);

    // Assert — the regulatory disclaimer must be discoverable by assistive tech
    const disclaimer = screen.getByRole("region", {
      name: "Regulatory and legal disclaimer",
    });
    expect(disclaimer).toBeInTheDocument();
  });

  it("cn utility merges class names correctly", () => {
    // Arrange + Act
    const result = cn("px-4", "py-2", { "font-bold": true, italic: false });

    // Assert
    expect(result).toContain("px-4");
    expect(result).toContain("py-2");
    expect(result).toContain("font-bold");
    expect(result).not.toContain("italic");
  });

  it("main landmark has no redundant role attribute", () => {
    // Arrange + Act
    render(<App />);

    // Assert — <main> is already a landmark; adding role="main" is redundant
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(main).not.toHaveAttribute("role");
  });

  it("shows error if form is submitted without consent", async () => {
    // Arrange
    const { container } = render(<App />);

    // Fill in required inputs
    const sectorInput = screen.getByPlaceholderText(/Law firm/i);
    fireEvent.change(sectorInput, { target: { value: "Law Firm" } });
    const headcountInput = screen.getByPlaceholderText(/50–200/i);
    fireEvent.change(headcountInput, { target: { value: "50-200" } });
    const concernInput = screen.getByPlaceholderText(/We use Microsoft Copilot/i);
    fireEvent.change(concernInput, { target: { value: "Copilot risk" } });

    // Act
    const form = container.querySelector("form");
    if (!form) throw new Error("Form element not found");
    fireEvent.submit(form);

    // Assert
    expect(screen.queryByText(/Please consent/i)).toBeInTheDocument();
  });

  it("submits the form and shows a static human-reply confirmation — no roadmap, no Skool", async () => {
    // Arrange — backend may still return a roadmap; the visitor must never see it
    const mockRoadmap = "1. Crawl: test\n2. Walk: test";
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, roadmap: mockRoadmap }),
    });
    vi.stubGlobal("fetch", mockFetch);

    render(<App />);

    // Check consent checkbox
    const checkbox = screen.getByLabelText(/I consent/i);
    fireEvent.click(checkbox);

    // Fill in inputs to cover change handlers
    fireEvent.change(screen.getByPlaceholderText(/Jane Doe/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Doe & Partners/i), {
      target: { value: "Doe & Partners LLP" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Managing Partner/i), {
      target: { value: "COO" },
    });
    fireEvent.change(screen.getByPlaceholderText(/you@yourfirm/i), {
      target: { value: "jane@doe.co.uk" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Law firm/i), {
      target: { value: "Law Firm" },
    });
    fireEvent.change(screen.getByPlaceholderText(/50–200/i), {
      target: { value: "50-200" },
    });
    fireEvent.change(screen.getByPlaceholderText(/We use Microsoft Copilot/i), {
      target: { value: "Copilot risk" },
    });

    // Submit form
    const submitButton = screen.getByRole("button", { name: /Book an AI Risk Diagnostic/i });
    fireEvent.click(submitButton);

    // Assert — static confirmation only
    await waitFor(() => {
      expect(
        screen.getByText(/Received\. Nick, Sushila or Raj will reply within one business day/i)
      ).toBeInTheDocument();
    });

    // The generated content and the Skool button must NOT be rendered
    expect(screen.queryByText(/GENERATED EXECUTIVE ANALYSIS/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/1\. Crawl: test/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Skool/i)).not.toBeInTheDocument();

    vi.unstubAllGlobals();
  });

  it("handles form submission error", async () => {
    // Arrange
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, error: "Network error" }),
    });
    vi.stubGlobal("fetch", mockFetch);

    render(<App />);

    // Check consent checkbox
    const checkbox = screen.getByLabelText(/I consent/i);
    fireEvent.click(checkbox);

    // Fill in required inputs
    fireEvent.change(screen.getByPlaceholderText(/Jane Doe/i), { target: { value: "Jane Doe" } });
    fireEvent.change(screen.getByPlaceholderText(/Doe & Partners/i), {
      target: { value: "Doe & Partners LLP" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Managing Partner/i), {
      target: { value: "COO" },
    });
    fireEvent.change(screen.getByPlaceholderText(/you@yourfirm/i), {
      target: { value: "jane@doe.co.uk" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Law firm/i), { target: { value: "Law Firm" } });
    fireEvent.change(screen.getByPlaceholderText(/50–200/i), { target: { value: "50-200" } });
    fireEvent.change(screen.getByPlaceholderText(/We use Microsoft Copilot/i), {
      target: { value: "Copilot risk" },
    });

    // Submit form
    const submitButton = screen.getByRole("button", { name: /Book an AI Risk Diagnostic/i });
    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(screen.getByText(/Network error/i)).toBeInTheDocument();
    });

    vi.unstubAllGlobals();
  });
});
