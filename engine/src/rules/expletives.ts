import { makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const PATTERN = /^(?:this|that|these|those|it)\s+(?:is|was|are|were)\s+(?:a|an|the|some|something|nothing|just)\b/i;

export const rule: Rule = {
  id: "expletives",
  name: "Expletive opener",
  severity: "info",
  description:
    "Sentences opening with a bare 'This is the...', 'That was a...', or 'It is the...' delay the real subject.",
  check(ctx) {
    const out = [];
    for (const s of ctx.sentences) {
      const m = PATTERN.exec(s.text);
      if (m) {
        out.push(
          makeFinding(
            ctx,
            s.start,
            s.start + m[0].length,
            `Expletive opener: "${m[0]}". Lead with the real subject.`,
          ),
        );
      }
    }
    return out;
  },
};
