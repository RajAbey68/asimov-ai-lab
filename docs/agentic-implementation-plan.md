# Agentic implementation plan

**Audit date:** 2026-09-03  
**Constraint:** Cloud VM without Mac `/code`, Buzz Desktop, or hermes-dev SSH.

---

## 1. Completed in this PR (lowest risk)

| Change | Files | Why |
|--------|-------|-----|
| Evidence-based docs | `docs/agentic-system-inventory.md`, `docs/buzzbar-architecture.md`, `docs/mcp-inventory.md`, `docs/agent-governance.md`, this file | Deliverables from verified audit |
| GET-only hermes-dev health probe | `src/lib/hermesDevHealth.ts`, `src/lib/hermesDevHealth.test.ts`, `scripts/hermes-dev-health.mjs` | Repeatable non-mutating verification |

### Verification commands

```bash
biome check .
tsc --noEmit
npm test
node scripts/hermes-dev-health.mjs --dry-run
node scripts/hermes-dev-health.mjs
```

### Rollback

Revert the feature branch / PR. No production state was changed by the probe (HTTP GET only).

---

## 2. Next sequence (not done here — needs Mac or SSH approval)

### P0

1. Confirm DeepSeek API key rotation completed; scrub any remaining secret material from deployment docs.
2. Keep Buzz `managed-agents.json` untouched; recover only via Buzz Import/UI or whole-file backup.

### P1

1. SSH to hermes-dev (after key provisioning) and diagnose `hermes-ingest` / `kolake-reddit-hunter` restart storms; free disk below 80%.
2. Resolve relay SoR: `theahg` vs `ai-integ`.
3. Replace Mac-absolute paths in `buzz-factory/config/mcp_servers.json` with portable config; add MCP health checks.
4. Locate real `kolake-escape-portal` and `second-brain` sources; attach to audit environment or document private URLs.
5. Confirm n8n `kolake-marketing` webhook still registered (inspect UI; do not POST without approval).

### P2

1. Align channel names (brief vs buzz-factory) in one source of truth.
2. Fix Ko Lake “resort” wording in archived migration docs or mark superseded.
3. Add typed Buzz message schemas + idempotency keys to any workflow that creates records.
4. Inventory Hermes profile MCP via Hermes CLI on the Mac thin client.

### P3

1. Verify SuperStack Hermes skills actually installed under `~/.hermes/skills` on hermes-dev.
2. Document Goose bounded-task SOP once Goose config is available.

---

## 3. Unresolved questions

1. Where does Mac `~/code` currently live, and can a future Cloud environment mount or sync it?
2. Is `/root/buzz-bar` the same product as Buzz Desktop BuzzBar, or a custom relay service?
3. Is LiteLLM on hermes-dev `:4000` the intended router for all clients (vs historical Mac `:4000`)?
4. Should audit docs eventually move from `asimov-ai-lab` to `second-brain` / an ops repo?

---

## 4. Explicit non-actions this run

- No SSH, deploys, merges to production, webhook POSTs, Buzz messages, or identity edits.
- No fabricated GrokBuzzAgent or stub MCP servers.
- No heavy local inference on the thin client / this VM.
