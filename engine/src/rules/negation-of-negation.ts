import { findAll, makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const PATTERN = /\bnot\s+(?:un|in|im|ir|il|non-?)\w+\b/gi;

export const rule: Rule = {
  id: "negation-of-negation",
  name: "Negation of negation",
  severity: "info",
  description:
    "'Not unimportant', 'not impossible' — double negatives make the reader work to extract a simple positive.",
  check(ctx) {
    return findAll(ctx.prose, PATTERN).map((m) =>
      makeFinding(
        ctx,
        m.index,
        m.index + m[0].length,
        `Double negative: "${m[0]}". State the positive directly.`,
      ),
    );
  },
};
