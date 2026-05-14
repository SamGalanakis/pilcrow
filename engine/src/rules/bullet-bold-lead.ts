import { makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const BULLET = /^(\s*)([-*+]|\d+\.)\s+(.+)$/gm;
const BOLD_LEAD = /^\*\*[^*\n]{1,60}\*\*\s*[:—–-]?\s*\S/;

const MIN_BULLETS = 3;
const RATIO = 0.6;

interface Bullet {
  start: number;
  end: number;
  indent: number;
  rest: string;
  isBoldLead: boolean;
}

export const rule: Rule = {
  id: "bullet-bold-lead",
  name: "Bullet bold-label lead",
  severity: "warning",
  description:
    "Bullet lists where most items start with a `**Bold label:**` followed by an explanation. Signature AI-assistant markdown shape.",
  check(ctx) {
    const bullets: Bullet[] = [];
    BULLET.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = BULLET.exec(ctx.text)) !== null) {
      bullets.push({
        start: m.index,
        end: m.index + m[0].length,
        indent: m[1].length,
        rest: m[3],
        isBoldLead: BOLD_LEAD.test(m[3]),
      });
    }
    if (bullets.length < MIN_BULLETS) return [];

    const out = [];
    let groupStart = 0;
    for (let i = 1; i <= bullets.length; i++) {
      const breakHere =
        i === bullets.length ||
        bullets[i].indent !== bullets[groupStart].indent ||
        bullets[i].start - bullets[i - 1].end > 80;
      if (!breakHere) continue;
      const group = bullets.slice(groupStart, i);
      if (group.length >= MIN_BULLETS) {
        const bold = group.filter((b) => b.isBoldLead).length;
        if (bold / group.length >= RATIO && bold >= MIN_BULLETS) {
          out.push(
            makeFinding(
              ctx,
              group[0].start,
              group[group.length - 1].end,
              `Bullet list with ${bold}/${group.length} items lead by **Bold:**. Drop the labels or write as prose.`,
            ),
          );
        }
      }
      groupStart = i;
    }
    return out;
  },
};
