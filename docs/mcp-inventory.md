# MCP inventory

**Audit date:** 2026-09-03  
**Layers:** (A) declared configs in GitHub clones, (B) this Cursor Cloud session’s attached MCP namespaces, (C) remote DeepSeekHermes MCP.  
**Secrets:** redacted. Connection ≠ presence in config.

---

## A. Declared MCP servers (repo configs)

### A1. buzz-factory — `config/mcp_servers.json` (`DECLARED`)

| Name | Transport | Endpoint / command (redacted) | Auth | Enabled | Tools | Connection test | Owners | Least privilege? | Destructive? |
|------|-----------|-------------------------------|------|---------|-------|-----------------|--------|------------------|--------------|
| `buzz-dev-mcp` | stdio | `node` + `/Users/arajiv/.cargo/bin/buzz-dev-mcp` | env `BUZZ_SHELL` | declared | `UNVERIFIED` | **FAIL on this VM** (Mac path) | Software factory agents | Unknown | Likely shell/dev write |
| `smmfactory-mcp` | stdio | `node` + `/Users/arajiv/SMMFactory/tools/mcp-server.mjs` | env key placeholders `${SEMRUSH_API_KEY}` etc. | declared | `UNVERIFIED` | **FAIL on this VM** (Mac path) | Marketing agents | Unknown | Ad/SEO APIs may write |

**Security findings:** absolute Mac paths; secrets via env placeholders (good) but no timeouts/health checks in config; shell capability on buzz-dev-mcp is high risk without HITL gate.

### A2. GravityClaw — `mcp.json` (`DECLARED`)

| Name | Transport | Command | Auth | Notes |
|------|-----------|---------|------|-------|
| `filesystem` | stdio | `npx @modelcontextprotocol/server-filesystem .` | none | Workspace FS access — destructive potential if agent can write |

Connection from this audit: **not executed** (would mutate/agent-run). Tag: `UNVERIFIED`.

### A3. BookLets — `.mcp.json` (`DECLARED`)

| Name | Transport | Command | Auth |
|------|-----------|---------|------|
| `playwright` | stdio | `npx @playwright/mcp@0.0.41` | none |

Browser automation — can act as user. Approval required for any live use. Connection `UNVERIFIED`.

### A4. SMMFactory — `mcp_config.json` (`DECLARED`)

| Name | Transport | Command | Auth / env | Tracked domain |
|------|-----------|---------|------------|----------------|
| `google-drive` | stdio | `@modelcontextprotocol/server-google-drive` | Drive root dir name | — |
| `google-cloud-storage` | stdio | `@modelcontextprotocol/server-gcs` | bucket `marketing-studio-assets` | — |
| `spyder-agent` | stdio | `spyder-mcp-server` | unknown | — |
| `adspyder` | stdio | `adspyder-mcp-server` | `${ADSPYDER_API_KEY}` | `kolakevilla.com` |

Connection tests: `UNVERIFIED` (credentials not available / not used). Write-capable storage MCPs need approval gates.

### A5. DeepSeekHermes MCP (`DECLARED` + partial live)

| Name | Transport | Endpoint | Auth | Live |
|------|-----------|----------|------|------|
| `deephermes` (remote) | Streamable HTTP | `https://deephermes-mcp-116263110764.us-central1.run.app/mcp` | Bearer client keys (Secret Manager) | MCP URL not probed with auth (`UNVERIFIED`) |
| Gateway behind it | HTTPS | `https://deephermes-116263110764.us-central1.run.app` | server-side DeepSeek key | Gateway root **HTTP 200** (`VERIFIED`) |
| `mcp-stdio` | stdio package in repo | local | N/A | code present |

**Security:** `STATUS.md` documents a prior API key leak and rotation procedure — confirm rotation completed (`UNVERIFIED`). Never commit client bearer keys.

### A6. SuperStack Hermes MCP skills (`DECLARED` docs only)

Skills describe exposing Hermes as an MCP backend for Claude/Codex with remote approval gates. Install/connection on hermes-dev: `UNVERIFIED` / SSH `BLOCKED`.

### A7. Goose / Buzz Desktop MCP

| Surface | Status |
|---------|--------|
| Goose CLI/GUI MCP | `NO DATA` on this VM |
| Buzz Desktop managed MCP | `BLOCKED` (Mac app absent) |

---

## B. This Cursor Cloud session MCP (`VERIFIED` namespaces present)

These are **session tools for this coding agent**, not Hermes control-plane MCP.

| Namespace | Status observed | Sample capability | Destructive writes? | Notes |
|-----------|-----------------|-------------------|---------------------|-------|
| `cursor` | ready | goals, images | low | native |
| `cursor-cloud` | ready | run/environment diagnostics | admin-ish | internal |
| `cursor-subscriptions` | ready | CI/PR subscriptions | low | |
| `Linear` | ready | issues/projects | yes (save_*) | confirm before writes |
| `Supabase` | ready | projects/SQL/migrations | **yes** | `list_projects` succeeded (read) |
| `Gmail` | present | mail | yes | confirm before send |
| `Google-calendar` | present | calendar | yes | |
| `Google-drive` | present | drive | yes | |
| `Outlook` / `Outlook-calendar` | present | mail/cal | yes | |
| `Financial-intelligence` | present | finance tools | unknown | treat output untrusted |
| `Twilio-docs` | present | docs search | no | |
| `Zapier` | present | Zapier MCP | depends | no `list_enabled_zapier_actions` match — mode/`needsAuth` `UNVERIFIED` |

**Supabase connection test (read-only):** `list_projects` returned multiple ACTIVE_HEALTHY projects including BookLets, AutumnHarvest, LeadSynch, WhatHappen, SMMFactory Outbound, nexstay-pms, ASIMOV BMAD Legal. No SQL executed.

---

## C. General MCP security findings

1. Prefer OAuth / short-lived headers; keep secrets out of git — mostly followed via `${ENV}` placeholders.
2. Minimize tools — GravityClaw filesystem and BookLets Playwright are broad.
3. Separate read vs write — not enforced in configs.
4. Timeouts / health checks — largely absent in JSON configs.
5. Treat tool output as untrusted data — aligns with operator brief; not encoded as runtime policy in repos.
6. No arbitrary shell without gate — buzz-dev-mcp + QAGatekeeper `shell` tool violate this unless HITL wraps every call (`UNVERIFIED`).

---

## D. Owning workflows (best-effort map)

| MCP | Declared owner workflow |
|-----|-------------------------|
| buzz-dev-mcp | Software factory / engineering channel |
| smmfactory-mcp / adspyder / GCS / Drive | SMMFactory / marketing-ops |
| playwright (BookLets) | BookLets E2E |
| deephermes MCP | Independent DeepSeek asks / friend clients |
| Session Supabase/Linear/… | This Cursor audit/coding session only |

---

## E. Gaps ranked

- **P0:** Confirm DeepSeek key rotation; never re-leak keys in STATUS docs.
- **P1:** Replace Mac-absolute MCP paths with portable or hermes-dev paths; add health checks.
- **P2:** Inventory live Hermes profile MCP via Hermes CLI on Mac/SSH.
- **P3:** Document session-MCP vs Hermes-MCP separation in onboarding.
