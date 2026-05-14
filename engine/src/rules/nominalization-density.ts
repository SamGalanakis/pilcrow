import { densityPer100, findAll, makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const THRESHOLD_PER_100 = 8;
const PATTERN = /\b[A-Za-z]{4,}(?:tion|ment|ity|ance|ence|ness|ism|ization|isation)\b/g;
const EXCEPTIONS = new Set([
  "function",
  "section",
  "addition",
  "mention",
  "fiction",
  "fashion",
  "passion",
  "mission",
  "vision",
  "version",
  "session",
  "tension",
  "person",
  "reason",
  "season",
  "lesson",
  "prison",
  "comparison",
]);

export const rule: Rule = {
  id: "nominalization-density",
  name: "Nominalization density",
  severity: "info",
  description:
    "Heavy use of -tion / -ment / -ity nouns. Turn nominalizations back into the verbs they hide.",
  check(ctx) {
    const matches = findAll(ctx.prose, PATTERN).filter(
      (m) => !EXCEPTIONS.has(m[0].toLowerCase()),
    );
    if (matches.length === 0) return [];
    const density = densityPer100(matches.length, ctx.totalWords);
    if (density < THRESHOLD_PER_100) return [];
    return matches.map((m) =>
      makeFinding(
        ctx,
        m.index,
        m.index + m[0].length,
        `Nominalization-heavy (${density.toFixed(1)}/100): "${m[0]}". Try the verb form.`,
      ),
    );
  },
};
