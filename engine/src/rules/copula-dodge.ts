import { fuzzyFindAny } from "../fuzzy.js";
import { densityPer100, makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const THRESHOLD_PER_100 = 0.6;
const MIN_COUNT = 2;

const PHRASES = [
  "serves as a",
  "serves as the",
  "stands as a",
  "stands as the",
  "marks a",
  "marks the",
  "represents a",
  "represents the",
  "boasts a",
  "boasts the",
  "embodies the",
  "exemplifies the",
  "constitutes a",
  "constitutes the",
  "remains a",
  "remains the",
];

export const rule: Rule = {
  id: "copula-dodge",
  name: "Copula dodge",
  severity: "warning",
  description:
    "AI prose substitutes plain \"is/are\" with inflated verbs (\"serves as\", \"stands as\", \"marks\", \"represents\"). One is fine; in aggregate it's a tell.",
  phrases: PHRASES,
  check(ctx) {
    const matches = fuzzyFindAny(ctx.prose, ctx.tokens, PHRASES, { allowInserts: 0 });
    if (matches.length < MIN_COUNT) return [];
    const density = densityPer100(matches.length, ctx.totalWords);
    if (density < THRESHOLD_PER_100 && matches.length < 3) return [];
    return matches.map((m) =>
      makeFinding(
        ctx,
        m.start,
        m.end,
        `Copula dodge: "${m.text}". Plain "is/are" usually does the job.`,
      ),
    );
  },
};
