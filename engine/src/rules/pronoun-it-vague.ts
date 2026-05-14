import { makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const PATTERN = /^it\s+(?:is|was|seems|appears|may|might|can|could|would|should)\b/i;

export const rule: Rule = {
  id: "pronoun-it-vague",
  name: "Vague 'It' opener",
  severity: "info",
  description:
    "Sentences opening with 'It is/was/seems' use 'It' as a placeholder. Name what 'it' refers to.",
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
            `Vague 'It' opener: "${m[0]}". Name the real subject.`,
          ),
        );
      }
    }
    return out;
  },
};
