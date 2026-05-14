import { fuzzyFindAny } from "../fuzzy.js";
import { makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const PHRASES = [
  "i hope this helps",
  "hope this helps",
  "let me know if",
  "feel free to ask",
  "feel free to reach out",
  "if you have any questions",
  "happy to provide more details",
  "happy to clarify",
  "happy to help",
  "hope this finds you well",
  "i hope this clarifies",
  "i hope you find this useful",
];

export const rule: Rule = {
  id: "signoff-chatbot",
  name: "Chatbot sign-off",
  severity: "error",
  description:
    "Chat-style closing lines leaked from an assistant reply into prose. Cut entirely.",
  phrases: PHRASES,
  check(ctx) {
    return fuzzyFindAny(ctx.prose, ctx.tokens, PHRASES, { allowInserts: 1 }).map((m) =>
      makeFinding(
        ctx,
        m.start,
        m.end,
        `Chatbot sign-off: "${m.text}". Delete; this belongs in a chat reply, not in prose.`,
      ),
    );
  },
};
