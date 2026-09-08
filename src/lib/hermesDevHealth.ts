/**
 * Read-only health probes for hermes-dev public HTTP surfaces.
 * Never POSTs webhooks or mutates production state.
 */

export const HERMES_DEV_HOST = "http://167.233.236.178";

export type ProbeVerdict = "ok" | "degraded" | "down" | "skipped";

export type ProbeResult = {
  id: string;
  url: string;
  verdict: ProbeVerdict;
  httpStatus: number | null;
  detail: string;
  checkedAt: string;
};

export type HermesDevHealthReport = {
  checkedAt: string;
  dryRun: boolean;
  results: ProbeResult[];
  overall: ProbeVerdict;
};

export type ProbeTarget = {
  id: string;
  path: string;
  /**
   * If set, response body (text) must include this substring for verdict ok.
   * HTTP 2xx alone is insufficient when a soft-fail page can still return 200.
   */
  expectIncludes?: string;
  /**
   * Optional JSON predicate. Return true for ok.
   */
  expectJson?: (data: unknown) => boolean;
};

export const DEFAULT_TARGETS: ProbeTarget[] = [
  {
    id: "command-centre",
    path: ":8080/",
    expectIncludes: "KoLake & Hermes Executive Command Center",
  },
  {
    id: "llm-spend",
    path: ":8080/api/llm-spend",
    expectJson: (data) =>
      typeof data === "object" &&
      data !== null &&
      "routers" in data &&
      Array.isArray((data as { routers: unknown }).routers),
  },
  {
    id: "process-status",
    path: ":8080/api/status",
    expectJson: (data) =>
      typeof data === "object" &&
      data !== null &&
      "processes" in data &&
      Array.isArray((data as { processes: unknown }).processes),
  },
  {
    id: "n8n-healthz",
    path: ":5678/healthz",
  },
  {
    id: "litellm-liveliness",
    path: ":4000/health/liveliness",
    expectIncludes: "alive",
  },
];

export function buildUrl(host: string, path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const normalizedHost = host.replace(/\/$/, "");
  if (path.startsWith(":")) {
    return `${normalizedHost.replace(/^(https?:\/\/[^:/]+).*$/, "$1")}${path}`;
  }
  return `${normalizedHost}${path.startsWith("/") ? path : `/${path}`}`;
}

export function summarizeVerdicts(verdicts: ProbeVerdict[]): ProbeVerdict {
  if (verdicts.includes("down")) return "down";
  if (verdicts.includes("degraded")) return "degraded";
  if (verdicts.every((v) => v === "skipped")) return "skipped";
  return "ok";
}

function flagUnstableProcesses(processes: unknown): string | null {
  if (!Array.isArray(processes)) return null;
  const hot = processes.filter((p) => {
    if (typeof p !== "object" || p === null) return false;
    const restarts = (p as { restarts?: unknown }).restarts;
    return typeof restarts === "number" && restarts >= 1000;
  }) as Array<{ name?: string; restarts?: number }>;
  if (hot.length === 0) return null;
  return `high_restarts:${hot.map((p) => `${p.name ?? "unknown"}=${p.restarts}`).join(",")}`;
}

export async function runProbe(
  target: ProbeTarget,
  options: {
    host?: string;
    fetchImpl?: typeof fetch;
    dryRun?: boolean;
    now?: () => string;
  } = {}
): Promise<ProbeResult> {
  const host = options.host ?? HERMES_DEV_HOST;
  const url = buildUrl(host, target.path);
  const checkedAt = (options.now ?? (() => new Date().toISOString()))();

  if (options.dryRun) {
    return {
      id: target.id,
      url,
      verdict: "skipped",
      httpStatus: null,
      detail: "dry-run: GET not sent",
      checkedAt,
    };
  }

  const fetchImpl = options.fetchImpl ?? fetch;
  try {
    const response = await fetchImpl(url, {
      method: "GET",
      redirect: "follow",
    });
    const httpStatus = response.status;
    const text = await response.text();

    if (httpStatus < 200 || httpStatus >= 300) {
      return {
        id: target.id,
        url,
        verdict: "down",
        httpStatus,
        detail: `unexpected_status:${httpStatus}`,
        checkedAt,
      };
    }

    if (target.expectIncludes && !text.includes(target.expectIncludes)) {
      return {
        id: target.id,
        url,
        verdict: "degraded",
        httpStatus,
        detail: "missing_expected_substring",
        checkedAt,
      };
    }

    let detail = "ok";
    if (target.expectJson) {
      let data: unknown;
      try {
        data = JSON.parse(text);
      } catch {
        return {
          id: target.id,
          url,
          verdict: "degraded",
          httpStatus,
          detail: "invalid_json",
          checkedAt,
        };
      }
      if (!target.expectJson(data)) {
        return {
          id: target.id,
          url,
          verdict: "degraded",
          httpStatus,
          detail: "json_shape_mismatch",
          checkedAt,
        };
      }
      if (target.id === "process-status") {
        const warn = flagUnstableProcesses((data as { processes?: unknown }).processes);
        if (warn) {
          return {
            id: target.id,
            url,
            verdict: "degraded",
            httpStatus,
            detail: warn,
            checkedAt,
          };
        }
      }
      detail = "json_ok";
    }

    return {
      id: target.id,
      url,
      verdict: "ok",
      httpStatus,
      detail,
      checkedAt,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown_error";
    return {
      id: target.id,
      url,
      verdict: "down",
      httpStatus: null,
      detail: `fetch_error:${message}`,
      checkedAt,
    };
  }
}

export async function probeHermesDev(
  options: {
    host?: string;
    targets?: ProbeTarget[];
    fetchImpl?: typeof fetch;
    dryRun?: boolean;
    now?: () => string;
  } = {}
): Promise<HermesDevHealthReport> {
  const targets = options.targets ?? DEFAULT_TARGETS;
  const checkedAt = (options.now ?? (() => new Date().toISOString()))();
  const dryRun = Boolean(options.dryRun);
  const results: ProbeResult[] = [];
  for (const target of targets) {
    results.push(
      await runProbe(target, {
        host: options.host,
        fetchImpl: options.fetchImpl,
        dryRun,
        now: () => checkedAt,
      })
    );
  }
  return {
    checkedAt,
    dryRun,
    results,
    overall: summarizeVerdicts(results.map((r) => r.verdict)),
  };
}
