import { makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

export const rule: Rule = {
  id: "dash-style-inconsistency",
  name: "Dash style inconsistency",
  severity: "warning",
  description:
    "Document mixes em-dash, en-dash, and double-hyphen for parenthetical breaks. Pick one and use it consistently.",
  check(ctx) {
    const styles: Array<{ name: string; pattern: RegExp; sample: number }> = [
      { name: "em-dash", pattern: /\s—\s|\w—\w/g, sample: -1 },
      { name: "en-dash (between words)", pattern: /\s–\s/g, sample: -1 },
      { name: "double-hyphen", pattern: /\s--\s|\w--\w/g, sample: -1 },
    ];
    const used: typeof styles = [];
    for (const s of styles) {
      const re = new RegExp(s.pattern.source, "g");
      const m = re.exec(ctx.prose);
      if (m) {
        s.sample = m.index;
        used.push(s);
      }
    }
    if (used.length < 2) return [];
    return used.slice(1).map((s) =>
      makeFinding(
        ctx,
        s.sample,
        s.sample + 3,
        `Mixed dash style: document uses ${used.map((u) => u.name).join(" + ")}. Pick one.`,
      ),
    );
  },
};
