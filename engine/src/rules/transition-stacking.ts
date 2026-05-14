import { makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const TRANSITIONS = new Set([
  "moreover",
  "furthermore",
  "additionally",
  "notably",
  "indeed",
  "hence",
  "thus",
  "therefore",
  "consequently",
  "subsequently",
  "first",
  "firstly",
  "second",
  "secondly",
  "third",
  "thirdly",
  "finally",
  "lastly",
]);

export const rule: Rule = {
  id: "transition-stacking",
  name: "Transition stacking",
  severity: "warning",
  description:
    "Three or more consecutive sentences starting with Moreover/Furthermore/etc. reads as machine-generated. Vary openings.",
  check(ctx) {
    const out = [];
    let run = 0;
    let runStart = -1;
    for (let i = 0; i < ctx.sentences.length; i++) {
      const s = ctx.sentences[i];
      const firstWord = s.text.match(/^[A-Za-z]+/)?.[0]?.toLowerCase() ?? "";
      if (TRANSITIONS.has(firstWord)) {
        if (run === 0) runStart = i;
        run++;
        if (run === 3) {
          const startS = ctx.sentences[runStart];
          out.push(
            makeFinding(
              ctx,
              startS.start,
              s.end,
              `Three consecutive sentences open with transition words. Vary.`,
            ),
          );
        }
      } else {
        run = 0;
      }
    }
    return out;
  },
};
