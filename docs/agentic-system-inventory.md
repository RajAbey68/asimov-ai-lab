# Agentic system inventory

**Audit date:** 2026-09-03  
**Auditor runtime:** Cursor Cloud Linux VM (`asimov-ai-lab` branch `cursor/agentic-os-audit-f8fc`)  
**Method:** Read-only inspection of this repo, shallow GitHub clones under `/tmp/agentic-audit/`, and non-mutating HTTP/TLS/WSS probes.  
**Claim tags:** `VERIFIED` | `DECLARED` | `UNVERIFIED` | `NO DATA` | `BLOCKED`

---

## 1. Intended architecture (declared)

```
Raj → Buzz / BuzzBar → Hermes → specialists (Grok, Cursor/Goose, n8n)
```

Source: operator brief + [`buzz-factory` README](https://github.com/RajAbey68/buzz-factory) (`DECLARED`).

Buzz is the preferred human surface; Hermes orchestrates memory/skills/schedules/MCP; coding IDEs are workers; n8n is the deterministic workflow engine on hermes-dev.

---

## 2. Session constraints (verified)

| Anchor | Status | Evidence |
|--------|--------|----------|
| This workspace | `VERIFIED` marketing site `asimov-ai-lab` — not the control plane | repo tree, `CLAUDE.md` |
| Mac `/code`, `~/code` | `NO DATA` / absent | `ls` failed on this VM |
| `~/second-brain` | `NO DATA` | absent locally; not on GitHub under `RajAbey68/second-brain` |
| `kolake-escape-portal` | `NO DATA` | GitHub resolve failed; mentioned only in archived migration docs |
| Buzz Desktop / managed-agents.json | `BLOCKED` | macOS paths not present; will not invent or edit |
| SSH `root@167.233.236.178` | `BLOCKED` | `Permission denied (publickey,password)` |
| hermes-dev Command Centre `:8080` | `VERIFIED` HTTP 200 | curl 2026-09-03 |
| n8n `:5678` | `VERIFIED` `/healthz` 200 | curl |
| LiteLLM on Mac `:4000` | `NO DATA` | localhost refused |
| LiteLLM on hermes-dev `:4000` | `VERIFIED` Swagger UI 200; `/health/liveliness` 200 | curl |
| Buzz relays | `VERIFIED` WSS connect | `theahg` and `ai-integ` communities |
| Local Ollama on this Mac/VM | `NO DATA` | not installed here |
| Ollama models on hermes-dev | `VERIFIED` via `/api/status` | `gemma3:12b`, `gemma3:4b` listed |

**Code-directory substitute:** shallow clones of public GitHub repos (not a substitute for Mac `~/code`). hermes-dev `/api/status` shows `exec_cwd` values under `/root/code/...` (`DECLARED` via API only; filesystem not inspected — SSH `BLOCKED`).

---

## 3. Actual components

### 3.1 This repository (`asimov-ai-lab`) — `VERIFIED`

- React 19 + Vite 6 marketing scaffold for ASIMOV AI.
- Agentic mentions are **content** (insights articles), not runtime agents.
- Supabase migration `001_initial_schema.sql` present locally; live project linkage `UNVERIFIED` from this audit’s application code.
- No Buzz/Hermes/n8n control-plane code in-tree.

### 3.2 hermes-dev live processes — `VERIFIED` (`GET /api/status`)

| Process | Status | Restarts | cwd (API-reported) | Notes |
|---------|--------|----------|--------------------|-------|
| `dashboard` | online | 59 | `/root/dashboard` | Command Centre host |
| `buzz-bar` | online | 3 | `/root/buzz-bar` | BuzzBar process present |
| `whathappen` | online | 8 | `/root/WhatHappen` | |
| `whathappen-upload` | online | 4 | `/root` | UI also on `:8081` |
| `scrimper` | online | 2 | `/root/code/Scrimper/scrimper-ui` | implies `/root/code` on server |
| `leadsync-api` | online | 0 | `/root/LeadSynch` | |
| `hermes-ingest` | online | **20305** | `/root/WhatHappen` | **P1 crash-loop signal** |
| `kolake-reddit-hunter` | online | **37141** | `/root` | **P1 crash-loop signal** |

System snapshot from same API: disk **83%** used (119G/150G) — **P1 capacity risk**.

### 3.3 hermes-dev HTTP surfaces — `VERIFIED`

| URL | Result |
|-----|--------|
| `http://167.233.236.178:8080/` | Command Centre HTML 200 |
| `http://167.233.236.178:8080/api/llm-spend` | OpenRouter spend OK; Nous OK; no shutoff |
| `http://167.233.236.178:8080/api/autumnharvest` | `live:true` leads payload |
| `http://167.233.236.178:5678/healthz` | 200 |
| `http://167.233.236.178:4000/` | LiteLLM Swagger UI |
| `http://167.233.236.178:4000/health/liveliness` | `"I'm alive!"` |
| `http://167.233.236.178:3000/` | Next.js “WhatsApp Analyzer” |
| `http://167.233.236.178:8081/` | WhatHappen upload UI |
| `GET .../webhook/kolake-marketing` | **404** (POST not attempted) → webhook liveness `UNVERIFIED` |

### 3.4 GitHub stand-in repos (code scan) — `VERIFIED` as source trees

| Repo | Role found | Runnable from this audit? |
|------|------------|---------------------------|
| `buzz-factory` | Declared Buzz agent fleets + Hermes skills + ACP config | **No** — YAML/docs/skills only; Mac absolute MCP paths |
| `GravityClaw` | Personal assistant; `mcp.json` filesystem server | App code present; live deploy `UNVERIFIED` |
| `DeepSeekHermes` | Cloud Run DeepSeek gateway + MCP remote/stdio | Gateway HTTP 200; MCP auth `UNVERIFIED` |
| `BookLets` | Product + `.mcp.json` (Playwright); Hermes as ops reviewer in docs | Separate product; related via RAJ-667 |
| `SMMFactory` | Marketing factory + MCP config for Drive/GCS/AdSpyder | Declared tooling; connection `UNVERIFIED` |
| `RajMinMax` | MiniMax/Mavis agent seed | Docs only |
| `SymbiOS` | HITL/ARS types + MCP protocol code | Historical/platform experiment |
| `SuperStack` | Hermes skill pack (VPS, Discord, MCP backend, memory) | Skills/docs — install state `UNVERIFIED` |
| `ko-lake-villa-migration` | Archived villa app | Describes “luxury resort” — **ground-truth conflict** |

---

## 4. Declared vs runnable agents

| Agent / component | Declared where | Runnable evidence | Tag |
|-------------------|----------------|-------------------|-----|
| Buzz Software Factory (`@SystemArchitect`, `@FeatureDeveloper`, `@QAGatekeeper`, `@DevOpsRelease`) | `buzz-factory/agents/software_factory/*.yaml` | Definitions only; no live Buzz Desktop agents | `DECLARED` |
| Buzz Marketing Factory | `agents/marketing_factory/*.yaml` | Definitions only | `DECLARED` |
| AutHarvest (`@JobScanner`, …) | `agents/aut_harvest/*.yaml` + cron workflow YAML | Cron declared; execution `UNVERIFIED` | `DECLARED` |
| Hermes Agent OS | buzz-factory + SuperStack skills | Process name `hermes-ingest` online (ingest, not full OS proof); Hermes CLI profile `BLOCKED` | `UNVERIFIED` / partial |
| `buzz-bar` | intended BuzzBar surface | PM2-style process online on hermes-dev | `VERIFIED` process; message contracts `UNVERIFIED` |
| Grok / GrokBot | operator brief | No repo named GrokBot found in scan | `NO DATA` |
| Goose | operator brief | No Goose config in clones | `NO DATA` |
| Cursor Cloud Agent (this run) | Cursor product | Active; session MCP attached | `VERIFIED` |
| n8n | operator brief | Service healthy | `VERIFIED` service; workflows `UNVERIFIED` |
| DeepSeek Hermes gateway | DeepSeekHermes `STATUS.md` | HTTP 200 | `VERIFIED` endpoint |
| KoLAuctBOT | operator brief | Not found in scanned repos | `NO DATA` |

---

## 5. Gap report

### P0 — security / identity / production risk

1. **DeepSeekHermes `STATUS.md` instructs API key rotation after a leak** — treat as open security hygiene item until rotation is confirmed (`UNVERIFIED` whether key still valid).
2. **Do not edit Buzz managed-agents.json / Keychain** — Mac identity surface `BLOCKED` here; risk is operational if someone “cleans” records later.
3. **SMMFactory SECURITY.md embeds a machine-local credentials path pattern** (`/Users/arajiv/.secrets/...`) — path disclosure, not a live secret value in repo scan.

### P1 — blocks reliable operation

1. **`hermes-ingest` restarts = 20305** — crash loop / unstable ingest.
2. **`kolake-reddit-hunter` restarts = 37141** — crash loop.
3. **Disk 83% on hermes-dev** — capacity risk.
4. **Mac thin-client paths in `buzz-factory/config/mcp_servers.json`** point at `/Users/arajiv/...` — broken on any non-Mac host.
5. **Relay URL split:** operator brief uses `wss://theahg.communities.buzz.xyz`; `buzz_acp.config.json` uses `wss://ai-integ.communities.buzz.xyz` — both connect, but which is SoR is `UNVERIFIED`.
6. **`kolake-escape-portal` and `second-brain` inaccessible** from this audit — ground-truth apps missing.
7. **RAJ-667** (canceled): Hermes-in-management-loop paused until robust process — still binding governance.

### P2 — important improvements

1. No health probe in `asimov-ai-lab` for hermes-dev surfaces (addressed by in-repo probe in this PR).
2. Declared Buzz channels in brief (`#marketing-kolake`, `#Ko Lake Auction`, `#AHG_Forager`) vs buzz-factory channels (`#engineering`, `#marketing-ops`, `#job-hunter`) — naming drift.
3. Ko Lake archived README calls property a “luxury resort” — violates villa ground truth.
4. n8n marketing webhook path returns GET 404 — confirm workflow still registered (without POSTing).

### P3 — polish

1. SuperStack Hermes skills are documentation distillations — need install verification on hermes-dev.
2. RajMinMax is a seed repo only.
3. Session Cursor MCP (Gmail, Linear, etc.) is powerful but is **not** the Hermes/Buzz control plane — document separation to avoid conflation.

---

## 6. Provenance

- Commands run 2026-09-03 on Cursor Cloud agent `bc-5855c4b9-df87-4521-9338-eed807dbf8fc`.
- No secrets printed; no production writes; no Buzz identity edits; no n8n webhook POSTs.
