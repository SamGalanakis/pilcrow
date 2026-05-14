import { fuzzyFindAny } from "../fuzzy.js";
import { makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const PHRASES = [
  "as i mentioned",
  "as discussed above",
  "as discussed earlier",
  "as previously noted",
  "as i said",
  "as we shall see",
  "as we will see",
  "we will see",
  "this section will",
  "in the following",
  "in this section",
  "this article will",
  "this post will",
  "this essay will",
  "in this article",
  "in this post",
  "let me break this down",
  "let me walk you through",
  "let me explain",
  "lets break it down",
  "lets walk through",
  "before we dive in",
  "without further ado",
];

export const rule: Rule = {
  id: "meta-discourse",
  name: "Meta-discourse",
  severity: "info",
  description:
    "Talking about the writing instead of writing. Cut self-reference; just say the thing.",
  phrases: PHRASES,
  check(ctx) {
    return fuzzyFindAny(ctx.prose, ctx.tokens, PHRASES, { allowInserts: 0 }).map((m) =>
      makeFinding(
        ctx,
        m.start,
        m.end,
        `Meta-discourse: "${m.text}". Cut and say the thing.`,
      ),
    );
  },
};
