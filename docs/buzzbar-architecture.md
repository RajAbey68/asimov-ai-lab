# BuzzBar architecture

**Audit date:** 2026-09-03  
**Evidence base:** [`buzz-factory`](https://github.com/RajAbey68/buzz-factory) shallow clone + hermes-dev `buzz-bar` process + WSS relay probes.  
**Claim tags:** `VERIFIED` | `DECLARED` | `UNVERIFIED` | `NO DATA` | `BLOCKED`

---

## 1. Buzz-first operating model (`DECLARED`)

Buzz / BuzzBar is the human coordination contract:

1. Operator messages land in Buzz channels (Nostr / Buzz community relay).
2. Agents are addressed via `@mentions` in channel context.
3. Agents stage recommendations; humans approve irreversible actions (Pocket vs Launch / action cards).
4. Hermes on hermes-dev is the cognitive harness (skills, memory, cron) behind the gateway.
5. Web dashboards (Command Centre `:8080`) are secondary/debug surfaces — `VERIFIED` reachable, not the preferred UX.

```
Operator
  → Buzz channels (@mention)
    → Buzz Agent Gateway / buzz-acp (`DECLARED`)
      → Hermes harness on hermes-dev (`UNVERIFIED` CLI profile)
        → tools/MCP/skills
  ← signed / NIP-44 cards + status (`DECLARED`; live message audit `BLOCKED` without Buzz Desktop)
```

---

## 2. Live Buzz-related state

| Item | Status | Evidence |
|------|--------|----------|
| Process `buzz-bar` on hermes-dev | `VERIFIED` online (3 restarts) | `GET /api/status` |
| Relay `wss://theahg.communities.buzz.xyz` | `VERIFIED` WSS connected | websockets probe |
| Relay `wss://ai-integ.communities.buzz.xyz` | `VERIFIED` WSS connected | websockets probe; matches `config/buzz_acp.config.json` |
| Which relay is system-of-record | `UNVERIFIED` | conflict between operator brief and ACP config |
| Buzz Desktop managed agents | `BLOCKED` | Mac Application Support path absent |
| Channel membership / live @mentions | `UNVERIFIED` | requires authenticated Buzz client |
| Message signatures / audit trail samples | `NO DATA` | not readable from this VM |

**ACP config snapshot (redacted paths only):**

- `relay_url`: `wss://ai-integ.communities.buzz.xyz` (`DECLARED` in repo)
- `fallback_relay_url`: `wss://devserver.local:8080` (`DECLARED`; local DNS `UNVERIFIED` from cloud)
- Harnesses: `hermes` (default), `ollama`, `claude-code` (`DECLARED`)

---

## 3. Channel / agent responsibilities

### 3.1 Channels in buzz-factory docs (`DECLARED`)

| Channel | Intended use |
|---------|----------------|
| `#engineering` | Software factory tasks |
| `#marketing-ops` | Marketing scans, copy, ad drafts |
| `#job-hunter` / `#career-ops` | AutHarvest job discovery + digests |

### 3.2 Channels named in operator brief (`UNVERIFIED` live)

| Channel | Claimed use |
|---------|-------------|
| `#marketing-kolake` / `#Marketing` | Marketing analytics / ad telemetry |
| `#Ko Lake Auction` | Reverse-auction monitoring |
| `#AHG_Forager` | Contract and career leads |

**Drift:** brief names do not match buzz-factory README channel names. Treat brief names as aspirational until Buzz Desktop confirms membership.

### 3.3 Declared agent fleets (`DECLARED` YAML only)

**Software factory**

| Agent | Purpose | Model pin | Tools |
|-------|---------|-----------|-------|
| `@SystemArchitect` | Decompose / route | Hermes harness | (yaml) |
| `@FeatureDeveloper` | Feature branches / TDD | Hermes | `buzz-dev-mcp` |
| `@QAGatekeeper` | Four-eyes QA (non-Anthropic) | `qwen-3.7-plus-fireworks` | buzz-dev-mcp, shell, test-runner |
| `@DevOpsRelease` | Staging deploys | Hermes | (yaml) |

**Marketing factory:** `@GrowthAnalyst`, `@SEOIntelAgent`, `@CreativeCopywriter`, `@AdDeployer`.

**AutHarvest:** `@JobScanner`, `@MatchScorer`, `@CVTailor`, `@ApplyAssistant` — HITL Pocket/Launch; no auto-submit (`DECLARED` in AGENTS.md / IMPLEMENTATION_PLAN).

**Runnable status:** all fleets are **declared definitions**. Installation into Buzz Desktop / Hermes runtime from this cloud audit is `UNVERIFIED`. Do not invent a “GrokBuzzAgent”.

---

## 4. Message contracts (`DECLARED`)

From buzz-factory governance docs:

- Structured digests sync to Mama Obsidian / second-brain paths (`DECLARED`; vault `NO DATA` on this VM).
- Sensitive job/CV cards use **NIP-44** encryption (`DECLARED`).
- PII transport references NIP-17 Gift-Wrap kind 1059 (`DECLARED`).
- Typed schemas for ACP messages beyond YAML workflow steps: **not found** as shared TypeScript/Zod packages in buzz-factory — gap (`P2`).

Cron example (`workflows/aut_harvest_morning_routine.yaml`): daily 07:00 UTC scan → score → CV tailor → encrypted digest to `#job-hunter` (`DECLARED`).

---

## 5. HITL approval flow (`DECLARED`)

1. Agent discovers / drafts (job, ad, code change).
2. Result published to Buzz channel as reviewable card.
3. Human chooses Pocket (defer) vs Launch/Action (proceed).
4. Irreversible steps (apply, spend, deploy, pay) require human authority — agents stage only.
5. `@QAGatekeeper` is the independent code-review gate (non-family model pin) — aligns with RAJ-667 spirit; Hermes must not be the approval authority for code review.

**Live HITL UI representation:** `UNVERIFIED` without Buzz Desktop.

---

## 6. Failure and escalation paths

| Failure | Declared handling | Verified? |
|---------|-------------------|-----------|
| Gateway crash | `gateway_heartbeat.py` rate-limited restarts (max 5/day) | Script **not found** in buzz-factory clone → `DECLARED` only / possibly missing |
| Agent tool failure | Surface in channel status | `UNVERIFIED` |
| hermes-dev process crash loops | (none documented in buzz-factory) | `VERIFIED` high restart counts on `hermes-ingest`, `kolake-reddit-hunter` |
| Relay unreachable | fallback_relay_url | fallback host `UNVERIFIED` from cloud |
| Data source down | NO DATA policy (operator brief) | not implemented in buzz-factory as shared library |

**Escalation recommendation (documentation only):** P0/P1 hermes-dev instability → operator via Buzz `#engineering` + Command Centre; do not auto-restart without investigating logs (SSH required — `BLOCKED` here).

---

## 7. Integrations map

| Peer | How Buzz relates | Status |
|------|------------------|--------|
| Hermes | Default ACP harness | Process/skills `UNVERIFIED` profile |
| n8n | Deterministic webhooks on hermes-dev | Service up; kolake webhook GET 404 |
| Grok | Independent review / live-X | `NO DATA` in scanned repos |
| Cursor / Goose | Coding workers | Cursor Cloud `VERIFIED`; Goose `NO DATA` |
| Obsidian second-brain | Digest sink | Path declared; vault `NO DATA` |

---

## 8. Open questions

1. Which relay community is authoritative for production agents?
2. Are buzz-factory YAML agents imported into Buzz Desktop today?
3. What does the `buzz-bar` process expose (port/API), and is it the same as BuzzBar UX?
4. Are brief channel names aliases or obsolete?
