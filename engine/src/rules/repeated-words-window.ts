import { makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const STOPWORDS = new Set([
  "the",
  "and",
  "for",
  "with",
  "that",
  "this",
  "these",
  "those",
  "have",
  "has",
  "had",
  "will",
  "would",
  "could",
  "should",
  "their",
  "there",
  "they",
  "them",
  "from",
  "into",
  "about",
  "which",
  "what",
  "when",
  "where",
  "while",
  "your",
  "yours",
  "than",
  "then",
  "been",
  "being",
  "were",
  "very",
  "more",
  "most",
  "some",
  "such",
  "also",
  "just",
  "only",
  "even",
  "still",
  "much",
  "many",
  "each",
  "other",
  "another",
  "between",
  "through",
]);
const WINDOW = 5;
const MIN_REPEATS = 3;

export const rule: Rule = {
  id: "repeated-words-window",
  name: "Repeated words in window",
  severity: "info",
  description:
    "Same content word three times in five sentences. Vary diction.",
  check(ctx) {
    const out = [];
    const reported = new Set<string>();
    for (let i = 0; i < ctx.sentences.length; i++) {
      const end = Math.min(ctx.sentences.length, i + WINDOW);
      const counts = new Map<string, number[]>();
      for (let j = i; j < end; j++) {
        const re = /[A-Za-z][A-Za-z'’-]{4,}/g;
        let m: RegExpExecArray | null;
        while ((m = re.exec(ctx.sentences[j].text)) !== null) {
          const w = m[0].toLowerCase();
          if (STOPWORDS.has(w)) continue;
          const arr = counts.get(w) ?? [];
          arr.push(ctx.sentences[j].start + m.index);
          counts.set(w, arr);
        }
      }
      for (const [word, positions] of counts) {
        if (positions.length >= MIN_REPEATS) {
          const key = `${word}-${positions[0]}`;
          if (reported.has(key)) continue;
          reported.add(key);
          out.push(
            makeFinding(
              ctx,
              positions[0],
              positions[0] + word.length,
              `"${word}" appears ${positions.length}× within ${WINDOW} sentences. Vary diction.`,
            ),
          );
        }
      }
      i = end - 1;
    }
    return out;
  },
};
