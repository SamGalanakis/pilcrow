import { fuzzyFindAny } from "../fuzzy.js";
import { densityPer100, makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const THRESHOLD_PER_100 = 4;
const HEDGES = [
  "arguably",
  "perhaps",
  "some say",
  "it could be argued",
  "many believe",
  "it has been suggested",
  "it is said that",
  "often",
  "generally",
  "typically",
  "frequently",
  "occasionally",
  "in many cases",
  "in some cases",
  "more or less",
  "kind of",
  "sort of",
  "experts argue",
  "experts agree",
  "industry reports",
  "observers have cited",
  "it is widely believed",
  "it is widely accepted",
  "many people think",
  "several sources suggest",
];

export const rule: Rule = {
  id: "weasel-hedges",
  name: "Weasel hedges",
  severity: "warning",
  description:
    "Hedges weaken claims without naming real uncertainty. Make the claim or name the doubt.",
  phrases: HEDGES,
  check(ctx) {
    const matches = fuzzyFindAny(ctx.prose, ctx.tokens, HEDGES, { allowInserts: 0 });
    if (matches.length === 0) return [];
    const density = densityPer100(matches.length, ctx.totalWords);
    if (density < THRESHOLD_PER_100) return [];
    return matches.map((m) =>
      makeFinding(
        ctx,
        m.start,
        m.end,
        `Hedge: "${m.text}". State the claim or name the real uncertainty.`,
      ),
    );
  },
};
