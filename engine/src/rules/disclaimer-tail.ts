import { fuzzyFindAny } from "../fuzzy.js";
import { makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const PHRASES = [
  "as an ai language model",
  "as an ai assistant",
  "as a large language model",
  "as an ai",
  "i do not have personal",
  "i dont have personal",
  "i cannot provide",
  "i am unable to",
  "my training data",
  "my knowledge cutoff",
  "i dont have access to",
  "i do not have access to",
  "as of my last update",
  "as of my knowledge cutoff",
];

export const rule: Rule = {
  id: "disclaimer-tail",
  name: "AI disclaimer fossil",
  severity: "error",
  description:
    "Verbatim AI self-disclosure or refusal language leaked into prose. Always delete.",
  phrases: PHRASES,
  check(ctx) {
    return fuzzyFindAny(ctx.prose, ctx.tokens, PHRASES, { allowInserts: 1 }).map((m) =>
      makeFinding(
        ctx,
        m.start,
        m.end,
        `AI disclaimer fossil: "${m.text}". Delete; this is model boilerplate.`,
      ),
    );
  },
};
