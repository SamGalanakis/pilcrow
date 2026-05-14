import { findAll, makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const EMOJI = "(?:\\p{Extended_Pictographic}\\uFE0F?(?:\\u200D\\p{Extended_Pictographic}\\uFE0F?)*)";
const PATTERN = new RegExp(
  `^(?:#{1,6}\\s+|\\s*[-*+]\\s+|\\s*\\d+\\.\\s+)?${EMOJI}`,
  "gmu",
);

export const rule: Rule = {
  id: "decorative-emoji",
  name: "Decorative emoji",
  severity: "info",
  description:
    "Emoji used as decoration in headings or bullets (🚀, ✨, 📌, 💡). A recognizable AI-marketing tic; remove or replace with words.",
  check(ctx) {
    const out = [];
    for (const m of findAll(ctx.text, PATTERN)) {
      const emojiMatch = m[0].match(new RegExp(EMOJI, "u"));
      if (!emojiMatch || !emojiMatch[0]) continue;
      const emojiIdx = m.index + m[0].indexOf(emojiMatch[0]);
      out.push(
        makeFinding(
          ctx,
          emojiIdx,
          emojiIdx + emojiMatch[0].length,
          `Decorative emoji at line start. Cut, or replace with the word.`,
        ),
      );
    }
    return out;
  },
};
