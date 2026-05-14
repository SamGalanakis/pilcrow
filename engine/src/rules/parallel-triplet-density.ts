import { findAll, makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const PATTERN = /\b\w[\w-]{2,}\s*,\s*\w[\w-]{2,}\s*,\s*and\s+\w[\w-]{2,}/gi;
const THRESHOLD_PER_1000 = 5;

export const rule: Rule = {
  id: "parallel-triplet-density",
  name: "Parallel-triplet density",
  severity: "info",
  description:
    "AI prose leans on the 'A, B, and C' triplet for rhythm. A few are fine; many in succession is a tell.",
  check(ctx) {
    const matches = findAll(ctx.prose, PATTERN);
    if (matches.length === 0) return [];
    const density = (matches.length / Math.max(1, ctx.totalWords)) * 1000;
    if (density < THRESHOLD_PER_1000 && matches.length < 4) return [];
    return matches.map((m) =>
      makeFinding(
        ctx,
        m.index,
        m.index + m[0].length,
        `Triplet cadence (${matches.length} in document, ${density.toFixed(1)}/1000 words). Break the rhythm.`,
      ),
    );
  },
};
