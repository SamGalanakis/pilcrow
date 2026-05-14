import { findAll, makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const WITH_OXFORD = /\b\w[\w-]{2,}\s*,\s*\w[\w-]{2,}\s*,\s*and\s+\w[\w-]{2,}/gi;
const WITHOUT_OXFORD = /\b\w[\w-]{2,}\s*,\s*\w[\w-]{2,}\s+and\s+\w[\w-]{2,}/gi;

export const rule: Rule = {
  id: "oxford-comma-inconsistency",
  name: "Oxford comma inconsistency",
  severity: "info",
  description:
    "Document uses Oxford comma in some 3-item lists but not others. Pick one style.",
  check(ctx) {
    const withOx = findAll(ctx.prose, WITH_OXFORD);
    const withoutOx = findAll(ctx.prose, WITHOUT_OXFORD).filter((m) => {
      const before = ctx.prose.slice(Math.max(0, m.index - 2), m.index);
      return !before.endsWith(", ");
    });
    if (withOx.length === 0 || withoutOx.length === 0) return [];
    const minority = withOx.length <= withoutOx.length ? withOx : withoutOx;
    return minority.map((m) =>
      makeFinding(
        ctx,
        m.index,
        m.index + m[0].length,
        `Oxford comma inconsistency: document mixes ${withOx.length} with-comma and ${withoutOx.length} without-comma 3-item lists.`,
      ),
    );
  },
};
