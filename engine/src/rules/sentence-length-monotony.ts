import { makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const MIN_SENTENCES = 5;
const STDEV_THRESHOLD = 4;

function stdev(xs: number[]): number {
  if (xs.length === 0) return 0;
  const mean = xs.reduce((a, b) => a + b, 0) / xs.length;
  const variance = xs.reduce((acc, x) => acc + (x - mean) ** 2, 0) / xs.length;
  return Math.sqrt(variance);
}

export const rule: Rule = {
  id: "sentence-length-monotony",
  name: "Sentence-length monotony",
  severity: "warning",
  description:
    "Sentences of similar length lull the reader. Vary the rhythm: short sentences for impact, long ones for thinking.",
  check(ctx) {
    if (ctx.sentences.length < MIN_SENTENCES) return [];
    const lengths = ctx.sentences.map((s) => s.words);
    const sd = stdev(lengths);
    if (sd >= STDEV_THRESHOLD) return [];
    const first = ctx.sentences[0];
    return [
      makeFinding(
        ctx,
        first.start,
        first.end,
        `Monotonous rhythm: sentence-length stdev = ${sd.toFixed(1)} (target ≥ ${STDEV_THRESHOLD}). Mix short and long.`,
      ),
    ];
  },
};
