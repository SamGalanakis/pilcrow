import { findAll, makeFinding, phrasePattern } from "../helpers.js";
import type { Rule } from "../types.js";

const QUANTIFIERS = [
  "many",
  "some",
  "several",
  "various",
  "numerous",
  "a number of",
  "a variety of",
  "a range of",
  "a lot of",
  "lots of",
  "a few",
];
const PATTERN = phrasePattern(QUANTIFIERS);
const MIN_OCCURRENCES = 3;

export const rule: Rule = {
  id: "vague-quantifiers",
  name: "Vague quantifiers",
  severity: "info",
  description:
    "'Many', 'several', 'a number of' all dodge specifics. If you have a number, name it; if you don't, name what you do know.",
  phrases: QUANTIFIERS,
  check(ctx) {
    const matches = findAll(ctx.prose, PATTERN);
    if (matches.length < MIN_OCCURRENCES) return [];
    return matches.map((m) =>
      makeFinding(
        ctx,
        m.index,
        m.index + m[0].length,
        `Vague quantifier: "${m[0]}". Be specific or describe what you do know.`,
      ),
    );
  },
};
