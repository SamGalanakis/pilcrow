import { findAll, makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const SENTENCE_RATIO_THRESHOLD = 0.2;
const PATTERN =
  /\b(?:am|is|are|was|were|be|been|being)\s+(?:[a-z]+ly\s+)?[a-z]+(?:ed|en)\b/gi;

const IRREGULAR_OK = new Set([
  "is being",
  "are being",
  "was being",
  "were being",
]);

export const rule: Rule = {
  id: "passive-voice",
  name: "Passive voice",
  severity: "info",
  description:
    "Passive constructions hide the actor. Recast in active voice where the agent matters.",
  check(ctx) {
    const matches = findAll(ctx.prose, PATTERN).filter((m) => {
      const lower = m[0].toLowerCase();
      return !IRREGULAR_OK.has(lower);
    });
    if (matches.length === 0) return [];
    const sentencesWithPassive = new Set<number>();
    for (const m of matches) {
      for (let i = 0; i < ctx.sentences.length; i++) {
        const s = ctx.sentences[i];
        if (m.index >= s.start && m.index < s.end) {
          sentencesWithPassive.add(i);
          break;
        }
      }
    }
    if (ctx.sentences.length === 0) return [];
    const ratio = sentencesWithPassive.size / ctx.sentences.length;
    if (ratio < SENTENCE_RATIO_THRESHOLD) return [];
    return matches.map((m) =>
      makeFinding(
        ctx,
        m.index,
        m.index + m[0].length,
        `Passive: "${m[0]}" (${(ratio * 100).toFixed(0)}% of sentences). Name the agent.`,
      ),
    );
  },
};
