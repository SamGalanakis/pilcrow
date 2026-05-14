import { fuzzyFindAny } from "../fuzzy.js";
import { makeFinding, sentenceStartSet } from "../helpers.js";
import type { Rule } from "../types.js";

const OPENERS = [
  "it is important to note",
  "it is important to consider",
  "it is worth mentioning",
  "it is worth noting",
  "when it comes to",
  "in todays world",
  "first and foremost",
  "needless to say",
  "it should be noted",
  "let us examine",
  "let us explore",
  "without a doubt",
  "as a matter of fact",
  "generally speaking",
  "while it is true",
  "it could be argued that",
  "picture this",
  "as a business owner you know",
  "lets dive in",
  "lets explore",
  "imagine for a moment",
];

export const rule: Rule = {
  id: "throat-clearing-openers",
  name: "Throat-clearing openers",
  severity: "warning",
  description:
    "Sentences that start with filler delay the real opening. Cut the opener; lead with substance.",
  phrases: OPENERS,
  check(ctx) {
    const sentenceStarts = sentenceStartSet(ctx);
    return fuzzyFindAny(ctx.prose, ctx.tokens, OPENERS, {
      allowInserts: 1,
      anchorAtSentenceStart: true,
      sentenceStarts,
    }).map((m) =>
      makeFinding(
        ctx,
        m.start,
        m.end,
        `Throat-clearing opener: "${m.text}" (≈ "${m.phrase}"). Cut and lead with substance.`,
      ),
    );
  },
};
