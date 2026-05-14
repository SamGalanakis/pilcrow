import { tokenize } from "./fuzzy.js";
import type { Paragraph, RuleContext, Sentence, Word } from "./types.js";

const ABBREVIATIONS = new Set([
  "etc",
  "e.g",
  "i.e",
  "vs",
  "mr",
  "mrs",
  "ms",
  "dr",
  "prof",
  "sr",
  "jr",
  "st",
  "fig",
  "cf",
  "ca",
  "no",
  "vol",
  "ed",
  "eds",
]);

export function stripMarkdown(text: string): string {
  let prose = text;
  prose = prose.replace(/^---\n[\s\S]*?\n---\n/, (m) => " ".repeat(m.length));
  prose = prose.replace(/```[\s\S]*?```/g, (m) => " ".repeat(m.length));
  prose = prose.replace(/`[^`\n]*`/g, (m) => " ".repeat(m.length));
  prose = prose.replace(/!\[[^\]]*\]\([^)]*\)/g, (m) => " ".repeat(m.length));
  prose = prose.replace(/\[([^\]]*)\]\([^)]*\)/g, (full, label) => {
    return label + " ".repeat(full.length - label.length);
  });
  prose = prose.replace(/^#{1,6}\s+/gm, (m) => " ".repeat(m.length));
  return prose;
}

export function buildLocator(text: string) {
  const lineStarts = [0];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "\n") lineStarts.push(i + 1);
  }
  return (offset: number) => {
    let lo = 0;
    let hi = lineStarts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >>> 1;
      if (lineStarts[mid] <= offset) lo = mid;
      else hi = mid - 1;
    }
    return { line: lo + 1, column: offset - lineStarts[lo] + 1 };
  };
}

export function splitSentences(prose: string): Sentence[] {
  const out: Sentence[] = [];
  const len = prose.length;
  let start = 0;
  let i = 0;
  while (i < len) {
    const ch = prose[i];
    if (ch === "." || ch === "!" || ch === "?") {
      const lookBack = prose.slice(Math.max(0, i - 5), i).toLowerCase();
      const tokenStart = lookBack.search(/[a-z.]+$/);
      const abbr = tokenStart >= 0 ? lookBack.slice(tokenStart).replace(/\.$/, "") : "";
      const isAbbrev = ABBREVIATIONS.has(abbr);
      const next = prose[i + 1];
      const endsSentence = !isAbbrev && (next === undefined || /\s/.test(next));
      if (endsSentence) {
        let end = i + 1;
        while (end < len && /["')\]”’]/.test(prose[end])) end++;
        const raw = prose.slice(start, end);
        const trimmed = raw.trim();
        if (trimmed.length > 0) {
          const leading = raw.length - raw.trimStart().length;
          const trailing = raw.length - raw.trimEnd().length;
          const s = start + leading;
          const e = end - trailing;
          out.push({
            text: prose.slice(s, e),
            start: s,
            end: e,
            words: countWords(prose.slice(s, e)),
          });
        }
        i = end;
        while (i < len && /\s/.test(prose[i])) i++;
        start = i;
        continue;
      }
    }
    i++;
  }
  const tail = prose.slice(start).trim();
  if (tail.length > 0) {
    const leading = prose.slice(start).length - prose.slice(start).trimStart().length;
    const s = start + leading;
    const e = s + tail.length;
    out.push({ text: tail, start: s, end: e, words: countWords(tail) });
  }
  return out;
}

export function splitParagraphs(prose: string): Paragraph[] {
  const out: Paragraph[] = [];
  const re = /[^\n]+(?:\n[^\n]+)*/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(prose)) !== null) {
    const raw = m[0];
    const trimmed = raw.trim();
    if (trimmed.length === 0) continue;
    const leading = raw.length - raw.trimStart().length;
    const s = m.index + leading;
    const e = s + trimmed.length;
    out.push({ text: trimmed, start: s, end: e });
  }
  return out;
}

export function splitWords(prose: string): Word[] {
  const out: Word[] = [];
  const re = /[A-Za-z][A-Za-z'’-]*/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(prose)) !== null) {
    out.push({ text: m[0], start: m.index, end: m.index + m[0].length });
  }
  return out;
}

export function countWords(s: string): number {
  let n = 0;
  const re = /[A-Za-z][A-Za-z'’-]*/g;
  while (re.exec(s) !== null) n++;
  return n;
}

export function buildContext(text: string): RuleContext {
  const prose = stripMarkdown(text);
  const sentences = splitSentences(prose);
  const paragraphs = splitParagraphs(prose);
  const words = splitWords(prose);
  const tokens = tokenize(prose);
  return {
    text,
    prose,
    sentences,
    paragraphs,
    words,
    tokens,
    totalWords: words.length,
    locate: buildLocator(text),
  };
}
