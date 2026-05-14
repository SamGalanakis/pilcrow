import { densityPer100, makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const THRESHOLD_PER_100 = 1.5;
const PATTERN = /\(([^)\n]{4,80})\)/g;

function isCitationLike(s: string): boolean {
  if (/^\d+(?:[,. ]\d+)*$/.test(s.trim())) return true;
  if (/^[A-Z][a-z]+,?\s+\d{4}$/.test(s.trim())) return true;
  if (/^(?:Fig|fig|Eq|eq|Table|table|p|pp|cf|e\.g|i\.e)\.?\s*\d*$/.test(s.trim())) return true;
  return false;
}

export const rule: Rule = {
  id: "parenthetical-aside-density",
  name: "Parenthetical aside density",
  severity: "info",
  description:
    "Parentheticals used as breath-marks (\"(yes, really)\", \"(more on that below)\"). A few are fine; many is an AI rhythm.",
  check(ctx) {
    const matches: RegExpExecArray[] = [];
    const re = new RegExp(PATTERN.source, "g");
    let m: RegExpExecArray | null;
    while ((m = re.exec(ctx.prose)) !== null) {
      if (m[0].length === 0) {
        re.lastIndex++;
        continue;
      }
      if (isCitationLike(m[1])) continue;
      matches.push(m);
    }
    if (matches.length === 0) return [];
    const density = densityPer100(matches.length, ctx.totalWords);
    if (density < THRESHOLD_PER_100 && matches.length < 4) return [];
    return matches.map((mm) =>
      makeFinding(
        ctx,
        mm.index,
        mm.index + mm[0].length,
        `Parenthetical aside (${matches.length} in document, ${density.toFixed(1)}/100 words). Vary your beats.`,
      ),
    );
  },
};
