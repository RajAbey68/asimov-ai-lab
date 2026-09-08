import { describe, expect, it, vi } from "vitest";
import {
  DEFAULT_TARGETS,
  buildUrl,
  probeHermesDev,
  runProbe,
  summarizeVerdicts,
} from "./hermesDevHealth";

describe("hermesDevHealth — pure helpers", () => {
  it("builds host:port URLs from :port paths", () => {
    expect(buildUrl("http://167.233.236.178", ":8080/api/status")).toBe(
      "http://167.233.236.178:8080/api/status"
    );
  });

  it("builds absolute and slash paths", () => {
    expect(buildUrl("http://example.com", "http://other.test/x")).toBe("http://other.test/x");
    expect(buildUrl("http://example.com/", "/health")).toBe("http://example.com/health");
    expect(buildUrl("http://example.com", "health")).toBe("http://example.com/health");
  });

  it("summarizes verdict priority down > degraded > ok", () => {
    expect(summarizeVerdicts(["ok", "degraded"])).toBe("degraded");
    expect(summarizeVerdicts(["ok", "down", "degraded"])).toBe("down");
    expect(summarizeVerdicts(["ok", "ok"])).toBe("ok");
    expect(summarizeVerdicts(["skipped", "skipped"])).toBe("skipped");
  });

  it("ships only GET-oriented default targets (no webhook POST paths)", () => {
    for (const target of DEFAULT_TARGETS) {
      expect(target.path.includes("webhook")).toBe(false);
    }
  });
});

describe("hermesDevHealth — dry-run", () => {
  it("does not call fetch when dryRun is true", async () => {
    const fetchImpl = vi.fn();
    const report = await probeHermesDev({
      dryRun: true,
      fetchImpl: fetchImpl as unknown as typeof fetch,
      now: () => "2026-09-03T00:00:00.000Z",
    });
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(report.overall).toBe("skipped");
    expect(report.results.every((r) => r.verdict === "skipped")).toBe(true);
  });
});

describe("hermesDevHealth — mocked network", () => {
  it("marks command centre ok when title substring is present", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      status: 200,
      text: async () => "<title>KoLake & Hermes Executive Command Center</title>",
    });
    const result = await runProbe(DEFAULT_TARGETS[0], {
      fetchImpl: fetchImpl as unknown as typeof fetch,
      now: () => "2026-09-03T00:00:00.000Z",
    });
    expect(result.verdict).toBe("ok");
    expect(result.httpStatus).toBe(200);
  });

  it("degrades when expected substring is missing", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      status: 200,
      text: async () => "<title>Wrong</title>",
    });
    const result = await runProbe(DEFAULT_TARGETS[0], {
      fetchImpl: fetchImpl as unknown as typeof fetch,
      now: () => "2026-09-03T00:00:00.000Z",
    });
    expect(result.verdict).toBe("degraded");
    expect(result.detail).toBe("missing_expected_substring");
  });

  it("degrades process-status when restart storms are present", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      status: 200,
      text: async () =>
        JSON.stringify({
          processes: [
            { name: "buzz-bar", restarts: 3 },
            { name: "hermes-ingest", restarts: 20305 },
          ],
        }),
    });
    const target = DEFAULT_TARGETS.find((t) => t.id === "process-status");
    if (!target) {
      throw new Error("process-status target missing");
    }
    const result = await runProbe(target, {
      fetchImpl: fetchImpl as unknown as typeof fetch,
      now: () => "2026-09-03T00:00:00.000Z",
    });
    expect(result.verdict).toBe("degraded");
    expect(result.detail).toContain("hermes-ingest=20305");
  });

  it("marks llm-spend ok for valid routers JSON", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      status: 200,
      text: async () => JSON.stringify({ routers: [{ router: "OpenRouter" }] }),
    });
    const target = DEFAULT_TARGETS.find((t) => t.id === "llm-spend");
    if (!target) {
      throw new Error("llm-spend target missing");
    }
    const result = await runProbe(target, {
      fetchImpl: fetchImpl as unknown as typeof fetch,
      now: () => "2026-09-03T00:00:00.000Z",
    });
    expect(result.verdict).toBe("ok");
    expect(result.detail).toBe("json_ok");
  });

  it("degrades on invalid JSON for expectJson targets", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      status: 200,
      text: async () => "not-json",
    });
    const target = DEFAULT_TARGETS.find((t) => t.id === "llm-spend");
    if (!target) {
      throw new Error("llm-spend target missing");
    }
    const result = await runProbe(target, {
      fetchImpl: fetchImpl as unknown as typeof fetch,
      now: () => "2026-09-03T00:00:00.000Z",
    });
    expect(result.verdict).toBe("degraded");
    expect(result.detail).toBe("invalid_json");
  });

  it("degrades on json shape mismatch", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      status: 200,
      text: async () => JSON.stringify({ routers: "nope" }),
    });
    const target = DEFAULT_TARGETS.find((t) => t.id === "llm-spend");
    if (!target) {
      throw new Error("llm-spend target missing");
    }
    const result = await runProbe(target, {
      fetchImpl: fetchImpl as unknown as typeof fetch,
      now: () => "2026-09-03T00:00:00.000Z",
    });
    expect(result.verdict).toBe("degraded");
    expect(result.detail).toBe("json_shape_mismatch");
  });

  it("marks down on non-2xx", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      status: 503,
      text: async () => "no",
    });
    const result = await runProbe(
      { id: "n8n-healthz", path: ":5678/healthz" },
      {
        fetchImpl: fetchImpl as unknown as typeof fetch,
        now: () => "2026-09-03T00:00:00.000Z",
      }
    );
    expect(result.verdict).toBe("down");
  });

  it("marks down when fetch throws", async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error("network down"));
    const result = await runProbe(
      { id: "n8n-healthz", path: ":5678/healthz" },
      {
        fetchImpl: fetchImpl as unknown as typeof fetch,
        now: () => "2026-09-03T00:00:00.000Z",
      }
    );
    expect(result.verdict).toBe("down");
    expect(result.detail).toContain("fetch_error:network down");
  });

  it("marks process-status ok when restarts are low", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      status: 200,
      text: async () =>
        JSON.stringify({
          processes: [{ name: "buzz-bar", restarts: 3 }],
        }),
    });
    const target = DEFAULT_TARGETS.find((t) => t.id === "process-status");
    if (!target) {
      throw new Error("process-status target missing");
    }
    const result = await runProbe(target, {
      fetchImpl: fetchImpl as unknown as typeof fetch,
      now: () => "2026-09-03T00:00:00.000Z",
    });
    expect(result.verdict).toBe("ok");
  });
});
