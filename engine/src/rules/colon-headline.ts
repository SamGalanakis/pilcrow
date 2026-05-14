import { makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const HEADER = /^(#{1,6})\s+(.+?)\s*$/gm;
const COLON_TITLE = /^[A-Z][^:\n]{1,40}:\s+[A-Z][^\n]{2,}/;
const MIN_HEADERS = 3;
const RATIO = 0.5;

export const rule: Rule = {
  id: "colon-headline",
  name: "Colon-headline template",
  severity: "info",
  description:
    "Most headings shaped \"Topic: Descriptor\". A recognizable AI-listicle / mock-bookstore-spine template.",
  check(ctx) {
    const headers: { start: number; end: number; title: string }[] = [];
    HEADER.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = HEADER.exec(ctx.text)) !== null) {
      const start = m.index + m[0].indexOf(m[2]);
      headers.push({ start, end: start + m[2].length, title: m[2] });
    }
    if (headers.length < MIN_HEADERS) return [];
    const colon = headers.filter((h) => COLON_TITLE.test(h.title));
    if (colon.length / headers.length < RATIO || colon.length < MIN_HEADERS) return [];
    return colon.map((h) =>
      makeFinding(
        ctx,
        h.start,
        h.end,
        `Colon-headline: "${h.title}". The Topic-colon-Descriptor shape repeats across headings; pick one shape or vary.`,
      ),
    );
  },
};
