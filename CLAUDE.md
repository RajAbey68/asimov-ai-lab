# CLAUDE.md — ASIMOV AI Web Project

> Project-level rules. These are additive to and extend the global
> `~/.claude/CLAUDE.md`. On conflict, this file wins.

## Project identity

- **Product**: ASIMOV AI — asimov-ai.org
- **Purpose**: Standing AI Risk Counsel for boards and executives
- **Sprint 0 scope**: Marketing site scaffold, Supabase schema, CI pipeline

## Brand constraints (HARD)

| Token | Value |
|-------|-------|
| Primary background | `#0F1B33` (deep navy) |
| Accent | `#F5A623` (amber) |
| Text | `#FFFFFF` |
| Heading font | Playfair Display |
| Body font | Inter |

- Use CSS custom properties (`--color-navy`, `--color-amber`, `--color-white`,
  `--font-heading`, `--font-body`) — never hardcode hex values in components.
- The amber accent is for primary CTAs, highlights, and brand text only.
  Do not use it for body copy or decorative fills.

## Imagery — HARD DEPENDENCY

- **Real portraits only.** No stock imagery, no AI-generated faces, no avatars,
  no silhouettes, no abstract human shapes.
- If a real, rights-cleared photograph is not available, use a typographic or
  geometric treatment instead.
- This rule applies at every review gate — a PR with a stock image or
  placeholder face will be rejected regardless of other quality.

## Regulatory citations — HARD

- Every regulatory or legal claim displayed on the site must cite a tier-one
  primary source (legislation text, regulator guidance, standards body document).
- Source: URL, title, publication date, version.
- No citation → raise a gap item, never invent or paraphrase without attribution.
- The disclaimer paragraph is mandatory on every public page.

## Development methodology

1. **BMAD** — Analyst → PM → Architect → PO → Scrum Master → Dev → QA.
   Living artefacts versioned in `docs/`.
2. **Four-eyes** — every PR requires a second reviewer. Self-review does not
   count. QA persona sign-off is a distinct step.
3. **TDD** — tests are written before implementation. `vitest run --coverage`
   must pass at ≥ 80% on all thresholds before a PR is opened.
4. **Biome clean** — `biome check .` must return zero errors. The a11y rules
   (`noLabelWithoutControl`, `noAutofocus`, `noRedundantRoles`) are errors,
   not warnings.

## Tech stack

- React 19 + Vite 6 + TypeScript strict
- Tailwind 4 (via `@tailwindcss/vite`)
- shadcn/ui (installed per component, not as a bulk preset)
- Biome (lint + format — no ESLint, no Prettier)
- Vitest + Testing Library (unit/integration)
- Playwright (E2E)
- Supabase (PostgreSQL + Auth + Storage + Edge Functions + pgvector)
- RLS enabled on every table — no exceptions

## No-stock-imagery gate checklist

Before every PR:
- [ ] No `placeholder`, `unsplash`, `pexels`, `shutterstock`, `gettyimages`
      URLs in the codebase
- [ ] No `robot`, `avatar`, `icon-person`, `stock-photo` class names or
      file names
- [ ] All images have `alt` text describing the actual content
- [ ] Images section of PR description lists every image file changed and
      confirms real-portrait or typographic/geometric treatment

## Sprint 0 definition of done

- [ ] All 18 scaffold files present and passing CI
- [ ] `biome check .` — zero errors
- [ ] `tsc --noEmit` — zero errors
- [ ] `vitest run --coverage` — ≥ 80% all thresholds
- [ ] Playwright suite passing (5 tests)
- [ ] Supabase migration `001_initial_schema.sql` applied to project
- [ ] PR reviewed by second reviewer (four-eyes)
- [ ] No stock imagery anywhere in the codebase
