import { makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const MAX_WORDS = 40;

export const rule: Rule = {
  id: "sentence-too-long",
  name: "Sentence too long",
  severity: "warning",
  description:
    "Sentences over 40 words usually carry too many clauses. Break or cut.",
  check(ctx) {
    return ctx.sentences
      .filter((s) => s.words > MAX_WORDS)
      .map((s) =>
        makeFinding(
          ctx,
          s.start,
          s.end,
          `Long sentence (${s.words} words). Consider a period or a cut.`,
        ),
      );
  },
};
