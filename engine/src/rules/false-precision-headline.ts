import { findAll, makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const HEADING_PATTERN = /^#{1,6}\s+([^\n]+)$/gm;
const COUNT_NOUN = /\b(\d+)\s+(reasons|things|ways|tips|secrets|steps|signs|rules|patterns|principles|strategies|tricks|hacks|mistakes|lessons|truths)\b/i;
const MULTIPLIER = /\b\d+x\s+(faster|better|smarter|cheaper|more|easier|simpler)\b/i;

export const rule: Rule = {
  id: "false-precision-headline",
  name: "False-precision headline",
  severity: "warning",
  description:
    "Listicle / faux-precise headings (\"5 Reasons …\", \"10x Faster …\"). Cheap manufactured concreteness.",
  check(ctx) {
    const out = [];
    for (const m of findAll(ctx.text, HEADING_PATTERN)) {
      const heading = m[1];
      const hash = m[0].length - heading.length;
      const headingStart = m.index + hash;
      const countMatch = heading.match(COUNT_NOUN);
      const multMatch = heading.match(MULTIPLIER);
      if (countMatch) {
        const at = headingStart + (countMatch.index ?? 0);
        out.push(
          makeFinding(
            ctx,
            at,
            at + countMatch[0].length,
            `Listicle heading: "${countMatch[0]}". Faux-precise counts read as AI clickbait.`,
          ),
        );
      } else if (multMatch) {
        const at = headingStart + (multMatch.index ?? 0);
        out.push(
          makeFinding(
            ctx,
            at,
            at + multMatch[0].length,
            `Multiplier heading: "${multMatch[0]}". State the actual number or cut.`,
          ),
        );
      }
    }
    return out;
  },
};
