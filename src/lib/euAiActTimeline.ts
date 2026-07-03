/**
 * EU AI Act applicability timeline — Regulation (EU) 2024/1689 AS AMENDED
 * by the Digital Omnibus on AI (COM(2025) 836; EP vote 16 Jun 2026, Council
 * adoption 29 Jun 2026; OJ publication pending as of 2026-07-03 — re-verify
 * the OJ number once published and update sourceRef notes accordingly).
 * Nothing else in the codebase reads dates from anywhere but this table;
 * update it and the tests together.
 */
export type Milestone = {
  id: string;
  /** ISO date on which the obligations start to apply */
  date: string;
  label: string;
  description: string;
  sourceRef: string;
  sourceUrl: string;
};

const EUR_LEX_URL = "https://eur-lex.europa.eu/eli/reg/2024/1689/oj";

export const EU_AI_ACT_MILESTONES: readonly Milestone[] = [
  {
    id: "entry-into-force",
    date: "2024-08-01",
    label: "Entry into force",
    description: "Regulation (EU) 2024/1689 entered into force.",
    sourceRef: "Art. 113",
    sourceUrl: EUR_LEX_URL,
  },
  {
    id: "prohibitions",
    date: "2025-02-02",
    label: "Prohibited practices & AI literacy apply",
    description:
      "Chapters I and II apply: prohibited AI practices and AI-literacy obligations for providers and deployers.",
    sourceRef: "Art. 113(a)",
    sourceUrl: EUR_LEX_URL,
  },
  {
    id: "gpai-governance",
    date: "2025-08-02",
    label: "GPAI obligations, governance & penalties apply",
    description:
      "Obligations for general-purpose AI models, the governance framework, and the penalties regime apply.",
    sourceRef: "Art. 113(b)",
    sourceUrl: EUR_LEX_URL,
  },
  {
    id: "general-application",
    date: "2026-08-02",
    label: "General application",
    description:
      "The Regulation's default application date: Art. 50 transparency obligations and Art. 6(2) classification rules apply. Annex III stand-alone high-risk obligations were deferred to 2 Dec 2027 by the 2026 Digital Omnibus.",
    sourceRef: "Art. 113 (as amended, Digital Omnibus on AI, adopted Jun 2026)",
    sourceUrl: EUR_LEX_URL,
  },
  {
    id: "marking-grace-ends",
    date: "2026-12-02",
    label: "AI-content marking grace period ends; new prohibitions apply",
    description:
      "Art. 50(2) marking/watermarking compliance date for existing systems, and the new prohibition on AI generating CSAM and non-consensual intimate imagery, per the Digital Omnibus.",
    sourceRef: "Digital Omnibus on AI amendments (adopted Jun 2026)",
    sourceUrl: EUR_LEX_URL,
  },
  {
    id: "gpai-legacy-models",
    date: "2027-08-02",
    label: "Pre-2025 GPAI models must comply",
    description:
      "GPAI models placed on the market before 2 Aug 2025 must be brought into compliance.",
    sourceRef: "Art. 111(3)",
    sourceUrl: EUR_LEX_URL,
  },
  {
    id: "annex-iii-high-risk",
    date: "2027-12-02",
    label: "Annex III high-risk obligations apply",
    description:
      "Stand-alone high-risk obligations (Annex III) for providers and deployers — deferred 16 months from 2 Aug 2026 by the Digital Omnibus. Professional services firms deploying in-scope AI are covered here.",
    sourceRef: "Art. 113 (as amended, Digital Omnibus on AI)",
    sourceUrl: EUR_LEX_URL,
  },
  {
    id: "embedded-high-risk",
    date: "2028-08-02",
    label: "Art. 6(1) product-embedded high-risk deadline",
    description:
      "High-risk AI embedded in regulated products (Art. 6(1), Annex I) must comply — deferred 12 months from 2 Aug 2027 by the Digital Omnibus.",
    sourceRef: "Art. 113(c) (as amended, Digital Omnibus on AI)",
    sourceUrl: EUR_LEX_URL,
  },
] as const;

const MS_PER_DAY = 86_400_000;

const midnightUtc = (isoDate: string): number => new Date(`${isoDate}T00:00:00Z`).getTime();

export function getNextMilestone(now: Date): Milestone | null {
  return EU_AI_ACT_MILESTONES.find((m) => midnightUtc(m.date) > now.getTime()) ?? null;
}

export function getCurrentPhase(now: Date): Milestone | null {
  const past = EU_AI_ACT_MILESTONES.filter((m) => midnightUtc(m.date) <= now.getTime());
  return past.length > 0 ? past[past.length - 1] : null;
}

export function daysUntil(milestone: Milestone, now: Date): number {
  return Math.ceil((midnightUtc(milestone.date) - now.getTime()) / MS_PER_DAY);
}

const BANNER_DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function formatBannerDate(isoDate: string): string {
  return BANNER_DATE_FORMAT.format(new Date(`${isoDate}T00:00:00Z`)).toUpperCase();
}

/**
 * Banner copy invariant (tested): a past deadline is never shown as upcoming.
 */
export function getBannerText(now: Date): string {
  const next = getNextMilestone(now);
  if (!next) {
    const last = EU_AI_ACT_MILESTONES[EU_AI_ACT_MILESTONES.length - 1];
    return `EU AI ACT: FULLY APPLICABLE SINCE ${formatBannerDate(last.date)}`;
  }
  const days = daysUntil(next, now);
  return `EU AI ACT: ${next.label.toUpperCase()} — ${formatBannerDate(next.date)} (${days} DAYS)`;
}
