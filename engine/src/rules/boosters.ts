import { densityPer100, findAll, makeFinding, phrasePattern } from "../helpers.js";
import type { Rule } from "../types.js";

const THRESHOLD_PER_100 = 2.5;
const BOOSTERS = [
  "very",
  "really",
  "actually",
  "literally",
  "basically",
  "definitely",
  "totally",
  "absolutely",
  "completely",
  "obviously",
  "clearly",
  "extremely",
];
const PATTERN = phrasePattern(BOOSTERS);

export const rule: Rule = {
  id: "boosters",
  name: "Boosters",
  severity: "info",
  description:
    "Intensifiers that add no information. Cut them; the sentence almost always survives.",
  phrases: BOOSTERS,
  check(ctx) {
    const matches = findAll(ctx.prose, PATTERN);
    if (matches.length === 0) return [];
    const density = densityPer100(matches.length, ctx.totalWords);
    if (density < THRESHOLD_PER_100) return [];
    return matches.map((m) =>
      makeFinding(ctx, m.index, m.index + m[0].length, `Booster: "${m[0]}". Cut.`),
    );
  },
};
