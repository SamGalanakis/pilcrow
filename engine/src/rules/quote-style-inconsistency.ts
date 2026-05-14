import { makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

export const rule: Rule = {
  id: "quote-style-inconsistency",
  name: "Quote style inconsistency",
  severity: "info",
  description:
    "Document mixes straight ASCII quotes (\") with curly quotes (“/”). Pick one and normalize.",
  check(ctx) {
    const straightIdx = ctx.prose.indexOf('"');
    const curlyOpen = ctx.prose.indexOf("“");
    const curlyClose = ctx.prose.indexOf("”");
    const hasCurly = curlyOpen >= 0 || curlyClose >= 0;
    const hasStraight = straightIdx >= 0;
    if (!(hasCurly && hasStraight)) return [];
    const firstStraight = straightIdx;
    return [
      makeFinding(
        ctx,
        firstStraight,
        firstStraight + 1,
        `Mixed quote style: straight \" and curly “/” both appear. Normalize.`,
      ),
    ];
  },
};
