import { makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const IMPERATIVE_VERBS = new Set([
  "ship","build","scale","move","write","launch","run","grow",
  "deliver","unlock","unleash","empower","accelerate","transform","ignite",
  "elevate","optimize","master","achieve","drive","focus","stop","start",
  "create","make","do","be","go","get","find","discover","explore","learn",
  "design","craft","forge","shape","push","break","cut","save","earn","win",
  "fix","solve","think","stay","keep","sleep","work","play","dream","change",
  "automate","streamline","supercharge","boost","disrupt",
]);

const MIN_RUN = 3;
const MAX_WORDS = 6;

export const rule: Rule = {
  id: "hero-tagline-imperative",
  name: "Hero-tagline imperative",
  severity: "error",
  description:
    "Cross-sentence imperative-verb tricolon (\"Ship faster. Build smarter. Scale forever.\"). The single most recognizable AI marketing rhythm.",
  check(ctx) {
    if (ctx.sentences.length < MIN_RUN) return [];
    const out = [];
    let i = 0;
    while (i <= ctx.sentences.length - MIN_RUN) {
      let j = i;
      while (j < ctx.sentences.length) {
        const s = ctx.sentences[j];
        if (s.words > MAX_WORDS) break;
        const first = s.text.match(/^[A-Za-z]+/)?.[0]?.toLowerCase() ?? "";
        if (!IMPERATIVE_VERBS.has(first)) break;
        j++;
      }
      const run = j - i;
      if (run >= MIN_RUN) {
        out.push(
          makeFinding(
            ctx,
            ctx.sentences[i].start,
            ctx.sentences[j - 1].end,
            `Hero-tagline imperative cadence: ${run} short imperative sentences in a row. Stock marketing-copy rhythm.`,
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
