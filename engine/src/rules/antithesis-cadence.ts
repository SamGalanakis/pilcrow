import { findAll, makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const NOT_JUST_BUT =
  /\bnot\s+(?:just|simply|merely|only)\s+[a-z][a-z\s-]{2,40}?[,.]?\s+but\s+(?:also\s+|rather\s+)?\b/gi;
const ITS_NOT_ITS =
  /\b(?:it'?s|it is|this is|that'?s|that is)\s+not\s+(?:just\s+|simply\s+|merely\s+)?[a-z][a-z\s-]{2,30}?\s*[—,.]\s*(?:it'?s|it is|this is|that'?s|that is)\s+/gi;
const MORE_THAN_JUST =
  /\b(?:is|are|was|were)\s+more\s+than\s+(?:just\s+)?[a-z][a-z\s-]{2,30}?[,.]\s+(?:it'?s|it is|they'?re|they are)\s+/gi;
const GOES_BEYOND =
  /\bgoes\s+beyond\s+[a-z][a-z\s-]{2,30}?[—,.]\s+(?:it'?s|it is)\s+/gi;

const MIN_OCCURRENCES = 2;

export const rule: Rule = {
  id: "antithesis-cadence",
  name: "Antithesis cadence",
  severity: "warning",
  description:
    "The 'It's not X, it's Y' / 'Not just X but Y' rhythm is a signature AI structural tell. One instance is fine; the cadence becomes a fingerprint when it repeats.",
  check(ctx) {
    const matches = [
      ...findAll(ctx.prose, NOT_JUST_BUT),
      ...findAll(ctx.prose, ITS_NOT_ITS),
      ...findAll(ctx.prose, MORE_THAN_JUST),
      ...findAll(ctx.prose, GOES_BEYOND),
    ];
    if (matches.length < MIN_OCCURRENCES) return [];
    matches.sort((a, b) => a.index - b.index);
    return matches.map((m) =>
      makeFinding(
        ctx,
        m.index,
        m.index + m[0].length,
        `Antithesis cadence: "${m[0].trim()}". This rhetorical pattern is a strong AI fingerprint when repeated.`,
      ),
    );
  },
};
