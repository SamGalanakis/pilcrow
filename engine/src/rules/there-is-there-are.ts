import { makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const OPENERS = ["there is", "there are", "there was", "there were", "there's"];

export const rule: Rule = {
  id: "there-is-there-are",
  name: "There-is opener",
  severity: "info",
  description:
    "Sentences that open with 'There is/are' bury the subject. Recast so the real subject is at the front.",
  check(ctx) {
    const out = [];
    for (const s of ctx.sentences) {
      const lower = s.text.toLowerCase();
      for (const opener of OPENERS) {
        if (lower.startsWith(opener + " ")) {
          out.push(
            makeFinding(
              ctx,
              s.start,
              s.start + opener.length,
              `"${s.text.slice(0, opener.length)}" hides the subject. Recast.`,
            ),
          );
          break;
        }
      }
    }
    return out;
  },
};
