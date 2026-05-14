import { fuzzyFindAny } from "../fuzzy.js";
import { makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const CLICHES = [
  "game changer",
  "paradigm shift",
  "needle in a haystack",
  "silver lining",
  "once in a blue moon",
  "only time will tell",
  "double edged sword",
  "tip of the iceberg",
  "elephant in the room",
  "perfect storm",
  "from the ground up",
  "back to the drawing board",
  "the new normal",
  "raise the bar",
  "wake up call",
];

export const rule: Rule = {
  id: "cliche-list",
  name: "Cliché list",
  severity: "warning",
  description:
    "Tired phrases the reader skims past. Replace with a fresh image or plain statement.",
  phrases: CLICHES,
  check(ctx) {
    return fuzzyFindAny(ctx.prose, ctx.tokens, CLICHES, { allowInserts: 1 }).map((m) =>
      makeFinding(
        ctx,
        m.start,
        m.end,
        `Cliché: "${m.text}" (≈ "${m.phrase}"). Find a fresher way.`,
      ),
    );
  },
};
