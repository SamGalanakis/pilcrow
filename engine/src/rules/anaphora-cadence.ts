import { makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const SKIP = new Set([
  "the","a","an","and","or","but","so","yet","for","nor",
  "i","you","he","she","they","we","it",
  "this","that","these","those",
  "in","on","at","to","by","with","from","of",
]);

const MIN_RUN = 3;

export const rule: Rule = {
  id: "anaphora-cadence",
  name: "Anaphora cadence",
  severity: "warning",
  description:
    "Three or more consecutive sentences open with the same content word. Vary the rhythm.",
  check(ctx) {
    if (ctx.sentences.length < MIN_RUN) return [];
    const out = [];
    let i = 0;
    while (i <= ctx.sentences.length - MIN_RUN) {
      const first = ctx.sentences[i].text.match(/^[A-Za-z]+/)?.[0]?.toLowerCase() ?? "";
      if (!first || SKIP.has(first)) {
        i++;
        continue;
      }
      let j = i + 1;
      while (j < ctx.sentences.length) {
        const w = ctx.sentences[j].text.match(/^[A-Za-z]+/)?.[0]?.toLowerCase() ?? "";
        if (w !== first) break;
        j++;
      }
      const run = j - i;
      if (run >= MIN_RUN) {
        out.push(
          makeFinding(
            ctx,
            ctx.sentences[i].start,
            ctx.sentences[j - 1].end,
            `Anaphora: ${run} consecutive sentences open with "${first}". Vary.`,
          ),
        );
      }
      i = j > i ? j : i + 1;
    }
    return out;
  },
};
