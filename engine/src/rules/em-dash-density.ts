import { densityPer100, makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const THRESHOLD_PER_100 = 1.5;

export const rule: Rule = {
  id: "em-dash-density",
  name: "Em-dash density",
  severity: "warning",
  description:
    "Em-dashes used too frequently. AI prose leans on em-dashes for any pause; vary with commas, semicolons, or full stops.",
  check(ctx) {
    const matches: number[] = [];
    for (let i = 0; i < ctx.prose.length; i++) {
      if (ctx.prose[i] === "—") matches.push(i);
    }
    if (matches.length === 0) return [];
    const density = densityPer100(matches.length, ctx.totalWords);
    if (density < THRESHOLD_PER_100) return [];
    return matches.map((idx) =>
      makeFinding(
        ctx,
        idx,
        idx + 1,
        `Em-dash overuse (${density.toFixed(1)}/100 words). Vary punctuation; em-dashes lose impact when repeated.`,
      ),
    );
  },
};
