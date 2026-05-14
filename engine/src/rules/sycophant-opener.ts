import { fuzzyFindAny } from "../fuzzy.js";
import { makeFinding, sentenceStartSet } from "../helpers.js";
import type { Rule } from "../types.js";

const OPENERS = [
  "great question",
  "what a great question",
  "what a brilliant question",
  "wonderful question",
  "fantastic question",
  "excellent question",
  "absolutely",
  "of course",
  "certainly",
  "you raise an interesting point",
  "thats a great point",
  "wonderful",
];

export const rule: Rule = {
  id: "sycophant-opener",
  name: "Sycophant opener",
  severity: "error",
  description:
    "Flattering acknowledgements (\"Great question!\", \"Absolutely!\") that praise the prompt or reader instead of starting. Cut.",
  phrases: OPENERS,
  check(ctx) {
    const sentenceStarts = sentenceStartSet(ctx);
    return fuzzyFindAny(ctx.prose, ctx.tokens, OPENERS, {
      allowInserts: 0,
      anchorAtSentenceStart: true,
      sentenceStarts,
    }).map((m) =>
      makeFinding(
        ctx,
        m.start,
        m.end,
        `Sycophant opener: "${m.text}". Delete and start with the answer.`,
      ),
    );
  },
};
