import { countWords } from "../text.js";
import { makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const MIN_RUN = 3;
const MAX_WORDS = 15;

export const rule: Rule = {
  id: "fragment-cadence",
  name: "Fragment cadence",
  severity: "warning",
  description:
    "Three or more consecutive paragraphs that are each a single short sentence. Punchy-fragment rhythm reads as AI marketing.",
  check(ctx) {
    if (ctx.paragraphs.length < MIN_RUN) return [];
    const out = [];
    let i = 0;
    while (i <= ctx.paragraphs.length - MIN_RUN) {
      let j = i;
      while (j < ctx.paragraphs.length) {
        const p = ctx.paragraphs[j];
        const words = countWords(p.text);
        const sentenceCount = (p.text.match(/[.!?](?:\s|$)/g) ?? []).length;
        const isShortFragment = words > 0 && words <= MAX_WORDS && sentenceCount <= 1;
        if (!isShortFragment) break;
        j++;
      }
      const run = j - i;
      if (run >= MIN_RUN) {
        out.push(
          makeFinding(
            ctx,
            ctx.paragraphs[i].start,
            ctx.paragraphs[j - 1].end,
            `Fragment cadence: ${run} short single-sentence paragraphs in a row. Break the rhythm.`,
          ),
        );
        i = j;
      } else {
        i++;
      }
    }
    return out;
  },
};
