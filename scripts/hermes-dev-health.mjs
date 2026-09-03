#!/usr/bin/env node
/**
 * GET-only hermes-dev health CLI.
 * Usage:
 *   node scripts/hermes-dev-health.mjs --dry-run
 *   node scripts/hermes-dev-health.mjs
 * Never POSTs webhooks.
 */

const HERMES_DEV_HOST = "http://167.233.236.178";

const TARGETS = [
  {
    id: "command-centre",
    path: ":8080/",
    expectIncludes: "KoLake & Hermes Executive Command Center",
  },
  { id: "llm-spend", path: ":8080/api/llm-spend", expectJsonRouters: true },
  {
    id: "process-status",
    path: ":8080/api/status",
    expectJsonProcesses: true,
  },
  { id: "n8n-healthz", path: ":5678/healthz" },
  {
    id: "litellm-liveliness",
    path: ":4000/health/liveliness",
    expectIncludes: "alive",
  },
];

function buildUrl(host, path) {
  const normalizedHost = host.replace(/\/$/, "");
  if (path.startsWith(":")) {
    return `${normalizedHost.replace(/^(https?:\/\/[^:/]+).*$/, "$1")}${path}`;
  }
  return `${normalizedHost}${path.startsWith("/") ? path : `/${path}`}`;
}

function summarize(verdicts) {
  if (verdicts.includes("down")) return "down";
  if (verdicts.includes("degraded")) return "degraded";
  if (verdicts.every((v) => v === "skipped")) return "skipped";
  return "ok";
}

async function probeOne(target, { dryRun }) {
  const url = buildUrl(HERMES_DEV_HOST, target.path);
  const checkedAt = new Date().toISOString();
  if (dryRun) {
    return {
      id: target.id,
      url,
      verdict: "skipped",
      httpStatus: null,
      detail: "dry-run: GET not sent",
      checkedAt,
    };
  }
  try {
    const response = await fetch(url, { method: "GET" });
    const text = await response.text();
    if (response.status < 200 || response.status >= 300) {
      return {
        id: target.id,
        url,
        verdict: "down",
        httpStatus: response.status,
        detail: `unexpected_status:${response.status}`,
        checkedAt,
      };
    }
    if (target.expectIncludes && !text.includes(target.expectIncludes)) {
      return {
        id: target.id,
        url,
        verdict: "degraded",
        httpStatus: response.status,
        detail: "missing_expected_substring",
        checkedAt,
      };
    }
    if (target.expectJsonRouters || target.expectJsonProcesses) {
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        return {
          id: target.id,
          url,
          verdict: "degraded",
          httpStatus: response.status,
          detail: "invalid_json",
          checkedAt,
        };
      }
      if (target.expectJsonRouters && !Array.isArray(data.routers)) {
        return {
          id: target.id,
          url,
          verdict: "degraded",
          httpStatus: response.status,
          detail: "json_shape_mismatch",
          checkedAt,
        };
      }
      if (target.expectJsonProcesses) {
        if (!Array.isArray(data.processes)) {
          return {
            id: target.id,
            url,
            verdict: "degraded",
            httpStatus: response.status,
            detail: "json_shape_mismatch",
            checkedAt,
          };
        }
        const hot = data.processes.filter(
          (p) => typeof p?.restarts === "number" && p.restarts >= 1000
        );
        if (hot.length > 0) {
          return {
            id: target.id,
            url,
            verdict: "degraded",
            httpStatus: response.status,
            detail: `high_restarts:${hot.map((p) => `${p.name}=${p.restarts}`).join(",")}`,
            checkedAt,
          };
        }
      }
    }
    return {
      id: target.id,
      url,
      verdict: "ok",
      httpStatus: response.status,
      detail: "ok",
      checkedAt,
    };
  } catch (error) {
    return {
      id: target.id,
      url,
      verdict: "down",
      httpStatus: null,
      detail: `fetch_error:${error instanceof Error ? error.message : "unknown"}`,
      checkedAt,
    };
  }
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const results = [];
  for (const target of TARGETS) {
    results.push(await probeOne(target, { dryRun }));
  }
  const report = {
    checkedAt: new Date().toISOString(),
    dryRun,
    overall: summarize(results.map((r) => r.verdict)),
    results,
  };
  console.log(JSON.stringify(report, null, 2));
  if (report.overall === "down") process.exitCode = 2;
  else if (report.overall === "degraded") process.exitCode = 1;
}

main();
