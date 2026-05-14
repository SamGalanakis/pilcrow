import { densityPer100, findAll, makeFinding, phrasePattern } from "../helpers.js";
import type { Rule } from "../types.js";

const MIN_WORDS = 200;
const THRESHOLD_PER_100 = 0.5;
const PRONOUNS = [
  "i",
  "me",
  "my",
  "mine",
  "myself",
  "we",
  "us",
  "our",
  "ours",
  "ourselves",
  "you",
  "your",
  "yours",
  "yourself",
];
const PATTERN = phrasePattern(PRONOUNS);

export const rule: Rule = {
  id: "pronoun-density-low",
  name: "Impersonal prose",
  severity: "info",
  description:
    "First- and second-person pronouns are absent. Prose reads as detached corporate-speak. Address the reader; own the claim.",
  check(ctx) {
    if (ctx.totalWords < MIN_WORDS) return [];
    const matches = findAll(ctx.prose, PATTERN);
    const density = densityPer100(matches.length, ctx.totalWords);
    if (density >= THRESHOLD_PER_100) return [];
    const start = ctx.sentences[0]?.start ?? 0;
    const end = ctx.sentences[0]?.end ?? Math.min(80, ctx.prose.length);
    return [
      makeFinding(
        ctx,
        start,
        end,
        `Impersonal prose: ${density.toFixed(2)}/100 first/second-person pronouns. Address the reader directly.`,
      ),
    ];
  },
};
