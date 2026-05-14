import { countWords } from "../text.js";
import { makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const MIN_PARAGRAPHS = 3;
const TOLERANCE = 0.18;

export const rule: Rule = {
  id: "paragraph-monotony",
  name: "Paragraph monotony",
  severity: "info",
  description:
    "Many consecutive paragraphs of similar length give the page a wall-of-text feel. Vary paragraph weight.",
  check(ctx) {
    if (ctx.paragraphs.length < MIN_PARAGRAPHS) return [];
    const counts = ctx.paragraphs.map((p) => countWords(p.text));
    const out = [];
    for (let i = 0; i + 2 < counts.length; i++) {
      const window = [counts[i], counts[i + 1], counts[i + 2]];
      const mean = window.reduce((a, b) => a + b, 0) / 3;
      if (mean < 10) continue;
      const allClose = window.every((v) => Math.abs(v - mean) / mean < TOLERANCE);
      if (allClose) {
        const p = ctx.paragraphs[i];
        out.push(
          makeFinding(
            ctx,
            p.start,
            p.end,
            `Three consecutive paragraphs of similar length (~${Math.round(mean)} words). Vary paragraph weight.`,
          ),
        );
        i += 2;
      }
    }
    return out;
  },
};
