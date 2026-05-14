import { findAll, makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const PATTERN = /,\s+(highlight|emphasiz|underscor|reflect|showcas|contribut|foster|shap|illustrat|signal|demonstrat)ing\s+(?:the|its|their|how|that|a|an)\s+[a-z][a-z\s-]{2,60}?[.!?]/gi;
const MIN_COUNT = 2;

export const rule: Rule = {
  id: "present-participle-tail",
  name: "Present-participle tail",
  severity: "warning",
  description:
    "Sentences ending in \", highlighting/emphasizing/underscoring …\" tack on faux-analysis. Cut the tail or replace with a specific consequence.",
  check(ctx) {
    const matches = findAll(ctx.prose, PATTERN);
    if (matches.length < MIN_COUNT) return [];
    return matches.map((m) =>
      makeFinding(
        ctx,
        m.index,
        m.index + m[0].length,
        `Trailing -ing significance clause: "${m[0].trim()}". Either name the consequence or cut.`,
      ),
    );
  },
};
