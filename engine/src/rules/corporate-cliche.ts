import { fuzzyFindAny } from "../fuzzy.js";
import { makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const PHRASES = [
  "moving forward",
  "low hanging fruit",
  "circle back",
  "touch base",
  "synergy",
  "synergies",
  "stakeholders",
  "actionable",
  "deep dive",
  "on the same page",
  "ducks in a row",
  "think outside the box",
  "boil the ocean",
  "move the needle",
  "north star",
  "leverage",
  "leveraging",
];

export const rule: Rule = {
  id: "corporate-cliche",
  name: "Corporate cliché",
  severity: "warning",
  description:
    "Boardroom jargon hides meaning. Use the plain word the jargon replaced.",
  phrases: PHRASES,
  check(ctx) {
    return fuzzyFindAny(ctx.prose, ctx.tokens, PHRASES, { allowInserts: 0 }).map((m) =>
      makeFinding(
        ctx,
        m.start,
        m.end,
        `Corporate cliché: "${m.text}" (≈ "${m.phrase}"). Use the plain word.`,
      ),
    );
  },
};
