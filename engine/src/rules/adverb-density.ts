import { densityPer100, findAll, makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const THRESHOLD_PER_100 = 5;
const EXCEPTIONS = new Set([
  "only",
  "early",
  "fly",
  "ally",
  "ply",
  "rely",
  "supply",
  "imply",
  "comply",
  "apply",
  "reply",
  "july",
  "italy",
  "family",
  "ugly",
  "lovely",
  "lonely",
  "likely",
  "deadly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "lately",
  "really",
  "actually",
  "literally",
  "basically",
  "definitely",
  "totally",
]);

const PATTERN = /\b[A-Za-z]+ly\b/g;

export const rule: Rule = {
  id: "adverb-density",
  name: "Adverb density",
  severity: "info",
  description:
    "High -ly adverb count. Adverbs usually mark a weak verb. Strengthen the verb and the adverb falls out.",
  check(ctx) {
    const all = findAll(ctx.prose, PATTERN);
    const adverbs = all.filter((m) => !EXCEPTIONS.has(m[0].toLowerCase()));
    if (adverbs.length === 0) return [];
    const density = densityPer100(adverbs.length, ctx.totalWords);
    if (density < THRESHOLD_PER_100) return [];
    return adverbs.map((m) =>
      makeFinding(
        ctx,
        m.index,
        m.index + m[0].length,
        `Adverb density high (${density.toFixed(1)}/100): "${m[0]}". Strengthen the verb instead.`,
      ),
    );
  },
};
