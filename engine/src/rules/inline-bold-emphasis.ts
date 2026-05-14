import { densityPer100, makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const BULLET_LINE = /^(\s*([-*+]|\d+\.)\s+|#{1,6}\s+)/;
const BOLD = /\*\*([^*\n]{1,50})\*\*/g;
const THRESHOLD_PER_100 = 1.5;

export const rule: Rule = {
  id: "inline-bold-emphasis",
  name: "Inline bold emphasis",
  severity: "warning",
  description:
    "Compulsive **bolding** of key terms inside running prose. Vary emphasis or trust the reader.",
  check(ctx) {
    const matches: { start: number; end: number; text: string }[] = [];
    const lines = ctx.text.split(/\n/);
    let offset = 0;
    for (const line of lines) {
      if (!BULLET_LINE.test(line)) {
        const re = new RegExp(BOLD.source, "g");
        let m: RegExpExecArray | null;
        while ((m = re.exec(line)) !== null) {
          if (m[0].length === 0) {
            re.lastIndex++;
            continue;
          }
          matches.push({
            start: offset + m.index,
            end: offset + m.index + m[0].length,
            text: m[1],
          });
        }
      }
      offset += line.length + 1;
    }
    if (matches.length === 0) return [];
    const density = densityPer100(matches.length, ctx.totalWords);
    if (density < THRESHOLD_PER_100 && matches.length < 4) return [];
    return matches.map((m) =>
      makeFinding(
        ctx,
        m.start,
        m.end,
        `Inline bold (${matches.length} in doc, ${density.toFixed(1)}/100 words). Trim emphasis.`,
      ),
    );
  },
};
