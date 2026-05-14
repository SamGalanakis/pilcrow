import { findAll, makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const PATTERN = /(?:^|[.!?]\s+|\n\s*)From\s+[A-Za-z][a-zA-Z-]+\s+to\s+[A-Za-z][a-zA-Z-]+,\s+[a-z]/g;

export const rule: Rule = {
  id: "from-x-to-y",
  name: "From-X-to-Y sweep",
  severity: "warning",
  description:
    "Sentence-initial \"From X to Y, …\" manufactures a survey-of-the-field tone. Lead with the specific case.",
  check(ctx) {
    return findAll(ctx.prose, PATTERN).map((m) => {
      const fromIdx = m[0].toLowerCase().indexOf("from");
      const start = m.index + fromIdx;
      return makeFinding(
        ctx,
        start,
        m.index + m[0].length - 1,
        `"From X to Y" sweep: "${m[0].slice(fromIdx).trim()}". Drop the survey gesture and lead with the case.`,
      );
    });
  },
};
