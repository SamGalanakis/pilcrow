import { makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const HEADER = /^(#{1,6})\s+(.+?)\s*$/gm;
const SMALL_WORDS = new Set([
  "a","an","the","and","or","but","nor","for","yet","so",
  "of","in","on","at","to","by","up","as","is","via",
  "with","from","into","over","under",
]);

const MIN_CONTENT_WORDS = 3;
const RATIO = 0.7;

function isCapitalized(word: string): boolean {
  if (word.length === 0) return false;
  const first = word[0];
  return first >= "A" && first <= "Z";
}

export const rule: Rule = {
  id: "title-case-headers",
  name: "Title Case headers",
  severity: "info",
  description:
    "Markdown headings written in Title Case. Sentence case is the modern default; Title Case in headings is a recognizable AI tic.",
  check(ctx) {
    const out = [];
    HEADER.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = HEADER.exec(ctx.text)) !== null) {
      const title = m[2];
      const words = title.match(/[A-Za-z][A-Za-z'-]*/g) ?? [];
      if (words.length < MIN_CONTENT_WORDS) continue;
      const content = words.filter((w) => !SMALL_WORDS.has(w.toLowerCase()));
      if (content.length < MIN_CONTENT_WORDS) continue;
      const capped = content.filter((w) => isCapitalized(w)).length;
      if (capped / content.length >= RATIO) {
        const start = m.index + m[0].indexOf(title);
        out.push(
          makeFinding(
            ctx,
            start,
            start + title.length,
            `Title Case heading: "${title}". Use sentence case.`,
          ),
        );
      }
    }
    return out;
  },
};
