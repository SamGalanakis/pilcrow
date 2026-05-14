import { makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const MIN_RUN = 4;
const MIN_WORD_LEN = 7;
const FUNCTION_WORDS = new Set([
  "however",
  "therefore",
  "moreover",
  "between",
  "through",
  "without",
  "within",
  "because",
  "although",
]);

export const rule: Rule = {
  id: "noun-stacking",
  name: "Noun-phrase stacking",
  severity: "info",
  description:
    "Long chains of complex nouns/adjectives crush comprehension. Break with prepositions or verbs.",
  check(ctx) {
    const out = [];
    let run = 0;
    let runStart = -1;
    for (let i = 0; i < ctx.words.length; i++) {
      const w = ctx.words[i];
      const lower = w.text.toLowerCase();
      const qualifies = w.text.length >= MIN_WORD_LEN && !FUNCTION_WORDS.has(lower);
      if (qualifies) {
        if (run === 0) runStart = w.start;
        run++;
        if (run === MIN_RUN) {
          out.push(
            makeFinding(
              ctx,
              runStart,
              w.end,
              `Noun-phrase stack: ${MIN_RUN}+ long words in a row. Break the chain.`,
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
